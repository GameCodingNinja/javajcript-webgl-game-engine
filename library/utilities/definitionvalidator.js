// 
//  FILE NAME: definitionvalidator.js
//  DESC:      Validates object definitions from XML data
//

"use strict";

export class ValidationError extends Error
{
    constructor( message, context = {} )
    {
        super( message );
        this.name = 'ValidationError';
        this.context = context;
    }
}

export class DefinitionValidator
{
    constructor()
    {
        this.warnings = [];
        this.errors = [];
    }

    //
    //  DESC: Clear previous validation results
    //
    clear()
    {
        this.warnings = [];
        this.errors = [];
    }

    //
    //  DESC: Add a warning
    //
    warn( message, context = {} )
    {
        this.warnings.push( { message, context } );
        console.warn( `[Validation Warning] ${message}`, context );
    }

    //
    //  DESC: Add an error
    //
    error( message, context = {} )
    {
        this.errors.push( { message, context } );
    }

    //
    //  DESC: Check if validation passed
    //
    isValid()
    {
        return this.errors.length === 0;
    }

    //
    //  DESC: Throw if there are errors
    //
    throwIfInvalid()
    {
        if( this.errors.length > 0 )
        {
            let messages = this.errors.map( e => e.message ).join( '; ' );
            throw new ValidationError( `Validation failed: ${messages}`, { errors: this.errors } );
        }
    }

    //
    //  DESC: Validate a required attribute exists
    //
    validateRequired( node, attrName, context = {} )
    {
        let value = node.getAttribute( attrName );
        if( value === null || value === '' )
        {
            this.error( `Missing required attribute: ${attrName}`, { ...context, node: node.nodeName } );
            return null;
        }
        return value;
    }

    //
    //  DESC: Validate a numeric attribute
    //
    validateNumber( node, attrName, options = {} )
    {
        let { min, max, defaultValue, required = false, context = {} } = options;
        let value = node.getAttribute( attrName );

        if( value === null || value === '' )
        {
            if( required )
                this.error( `Missing required numeric attribute: ${attrName}`, { ...context, node: node.nodeName } );
            return defaultValue;
        }

        let num = Number( value );
        if( isNaN( num ) )
        {
            this.error( `Invalid number for ${attrName}: "${value}"`, { ...context, node: node.nodeName } );
            return defaultValue;
        }

        if( min !== undefined && num < min )
        {
            this.warn( `${attrName} value ${num} is below minimum ${min}`, { ...context, node: node.nodeName } );
        }

        if( max !== undefined && num > max )
        {
            this.warn( `${attrName} value ${num} is above maximum ${max}`, { ...context, node: node.nodeName } );
        }

        return num;
    }

    //
    //  DESC: Validate an enum attribute
    //
    validateEnum( node, attrName, allowedValues, options = {} )
    {
        let { defaultValue, required = false, context = {} } = options;
        let value = node.getAttribute( attrName );

        if( value === null || value === '' )
        {
            if( required )
                this.error( `Missing required attribute: ${attrName}`, { ...context, node: node.nodeName } );
            return defaultValue;
        }

        if( !allowedValues.includes( value ) )
        {
            this.error( `Invalid value for ${attrName}: "${value}". Allowed: ${allowedValues.join(', ')}`, 
                { ...context, node: node.nodeName } );
            return defaultValue;
        }

        return value;
    }

    //
    //  DESC: Validate a boolean attribute
    //
    validateBoolean( node, attrName, defaultValue = false, context = {} )
    {
        let value = node.getAttribute( attrName );

        if( value === null || value === '' )
            return defaultValue;

        if( value !== 'true' && value !== 'false' )
        {
            this.warn( `Invalid boolean for ${attrName}: "${value}", expected "true" or "false"`, 
                { ...context, node: node.nodeName } );
            return defaultValue;
        }

        return value === 'true';
    }

    //
    //  DESC: Validate a file path attribute
    //
    validateFilePath( node, attrName, options = {} )
    {
        let { required = false, allowedExtensions, context = {} } = options;
        let value = node.getAttribute( attrName );

        if( value === null || value === '' )
        {
            if( required )
                this.error( `Missing required file path: ${attrName}`, { ...context, node: node.nodeName } );
            return null;
        }

        if( allowedExtensions && allowedExtensions.length > 0 )
        {
            let ext = value.split( '.' ).pop().toLowerCase();
            if( !allowedExtensions.includes( ext ) )
            {
                this.warn( `File extension ".${ext}" not in allowed list for ${attrName}: ${allowedExtensions.join(', ')}`,
                    { ...context, node: node.nodeName, filePath: value } );
            }
        }

        return value;
    }

    //
    //  DESC: Validate object definition node
    //
    validateObjectNode( node, group )
    {
        let context = { group };
        let name = this.validateRequired( node, 'name', context );

        if( name )
            context.objectName = name;

        // Validate size if present
        let sizeNode = node.getElementsByTagName( 'size' );
        if( sizeNode.length )
        {
            this.validateNumber( sizeNode[0], 'width', { min: 0, context } );
            this.validateNumber( sizeNode[0], 'height', { min: 0, context } );
        }

        return name;
    }

    //
    //  DESC: Validate visual node
    //
    validateVisualNode( node, context = {} )
    {
        let visualNode = node.getElementsByTagName( 'visual' );
        if( !visualNode.length )
            return;

        // Validate mesh genType if present
        let meshNode = visualNode[0].getElementsByTagName( 'mesh' );
        if( meshNode.length )
        {
            let genType = meshNode[0].getAttribute( 'genType' );
            if( genType )
            {
                let validGenTypes = ['null', 'quad', 'sprite_sheet', 'scaled_frame', 'mesh_file', 'font'];
                if( !validGenTypes.includes( genType ) )
                {
                    this.error( `Invalid mesh genType: "${genType}". Valid types: ${validGenTypes.join(', ')}`, context );
                }
            }
        }

        // Validate texture filter/wrap
        let textureNode = visualNode[0].getElementsByTagName( 'texture' );
        if( textureNode.length )
        {
            let filter = textureNode[0].getAttribute( 'filter' );
            if( filter && !['LINEAR', 'NEAREST'].includes( filter ) )
            {
                this.warn( `Unknown texture filter: "${filter}"`, context );
            }

            let wrap = textureNode[0].getAttribute( 'wrap' );
            if( wrap && !['REPEAT', 'CLAMP_TO_EDGE', 'MIRRORED_REPEAT'].includes( wrap ) )
            {
                this.warn( `Unknown texture wrap: "${wrap}"`, context );
            }
        }
    }

    //
    //  DESC: Validate physics node
    //
    validatePhysicsNode( node, context = {} )
    {
        let physicsNode = node.getElementsByTagName( 'physics' );
        if( !physicsNode.length )
            return;

        let bodyNode = physicsNode[0].getElementsByTagName( 'body' );
        if( bodyNode.length )
        {
            let bodyType = bodyNode[0].getAttribute( 'type' );
            if( bodyType )
            {
                let validTypes = ['static', 'dynamic', 'kinematic'];
                if( !validTypes.includes( bodyType ) )
                {
                    this.error( `Invalid physics body type: "${bodyType}". Valid types: ${validTypes.join(', ')}`, context );
                }
            }
        }

        let fixtureNode = physicsNode[0].getElementsByTagName( 'fixture' );
        for( let i = 0; i < fixtureNode.length; i++ )
        {
            let shape = fixtureNode[i].getAttribute( 'shape' );
            if( shape )
            {
                let validShapes = ['circle', 'box', 'polygon', 'edge', 'chain'];
                if( !validShapes.includes( shape ) )
                {
                    this.error( `Invalid fixture shape: "${shape}". Valid shapes: ${validShapes.join(', ')}`, context );
                }
            }
        }
    }
}

export var definitionValidator = new DefinitionValidator;
