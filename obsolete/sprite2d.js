
// 
//  FILE NAME:  sprite2d.js
//  DESC:       2D sprite class
//

"use strict";

import { VisualComponent2D } from './visualcomponent2d';
import { PhysicsComponent2D } from '../physics/physicscomponent2d';
import { ScriptComponent } from '../script/scriptcomponent';
import { scriptManager } from '../script/scriptmanager';
import { SpriteData } from '../common/spritedata';
import { Object2D } from './object2d';
import { Matrix } from '../utilities/matrix';
import * as defs from '../common/defs';

export class Sprite2D extends Object2D
{
    constructor( objData, id = defs.SPRITE_DEFAULT_ID )
    {
        super();
        
        // The object data
        this.objData = objData;
        
        // The visual part of the 2d sprite
        this.visualComponent = new VisualComponent2D( objData.visualData );
        
        // The physics part of the 2d sprite
        this.physicsComponent = null;
        if( objData.physicsData.isActive() )
            this.physicsComponent = new PhysicsComponent2D( objData.physicsData );
        
        // The script part of the 2d sprite
        this.scriptComponent = new ScriptComponent;
        
        // Unique Id number
        this.id = id;
        
        // AI
        this.ai = null;
        
        // Script object map. Prepare scripts by name
        this.scriptFactoryMap = new Map;
        
        // If there's no visual data, set the hide flag
        this.setVisible( objData.visualData.isActive() );
        
        if( objData.visualData.genType === defs.EGT_SPRITE_SHEET )
            this.setCropOffset( objData.visualData.spriteSheet.getGlyph().cropOffset );
        
        // Set the sprite type
        this.parameters.add( defs.SPRITE2D );
    }
    
    // 
    //  DESC: Load from SpriteData or node
    //
    load( data )
    {
        if( data instanceof SpriteData )
        {
            this.copyTransform( data );
            this.createScriptFunctions( data );
            
            if( this.visualComponent.isFontSprite() && data.fontData )
                this.visualComponent.fontData.copy( data.fontData );
        }
        else if( data instanceof Element )
        {
            this.loadTransFromNode( data );
            this.initScriptFactoryFunctions( data );
            
            if( this.visualComponent.isFontSprite() )
                this.visualComponent.loadFontPropFromNode( data );
        }
    }
    
    // 
    //  DESC: Init the script factory functions and add them to the map
    //        This function loads the attribute info reguardless of what it is
    //
    initScriptFactoryFunctions( node )
    {
        // Check for scripting
        let scriptNode = node.getElementsByTagName( 'script' );

        for( let i = 0; i < scriptNode.length; ++i )
        {
            let attr = scriptNode[i].attributes[0];
            if( attr )
                // This allocates the script to the map
                this.scriptFactoryMap.set( attr.name, scriptManager.get(attr.value)(this) );
        }
    }
    
    // 
    //  DESC: Create the script functions from a map
    //
    createScriptFunctions( spriteData )
    {
        for( let [ key, scriptFactory ] of spriteData.scriptFunctionMap.entries() )
            this.scriptFactoryMap.set( key, scriptFactory(this) );
    }
    
    // 
    //  DESC: Prepare the script class to run from factory id
    //
    prepareScript( scriptFactoryId, forceUpdate = false )
    {
        let script = this.scriptFactoryMap.get( scriptFactoryId );
        if( script )
        {
            script.init();
            this.scriptComponent.set( script );
            
            if( forceUpdate )
                this.scriptComponent.update();
            
            return true;
        }
        
        return false;
    }

    prepareScriptFactory( scriptFactory, forceUpdate = false )
    {
        this.scriptComponent.set( scriptFactory(this) );
            
        if( forceUpdate )
            this.scriptComponent.update();
    }
    
    // 
    //  DESC: Init the sprite
    //
    init()
    {
        if( this.visualComponent.isFontSprite() )
            this.visualComponent.createFontStringFromData();
    }
    
    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        if( this.visualComponent.isFontSprite() )
            this.visualComponent.deleteFontVBO();
        
        if( this.physicsComponent )
            this.physicsComponent.destroyBody();
    }
    
    // 
    //  DESC: Init the physics
    //
    initPhysics()
    {
        if( this.physicsComponent )
            this.physicsComponent.init( this );
    }
    
    // 
    //  DESC: React to what the player is doing
    //
    handleEvent( event )
    {
        if( this.ai )
            this.ai.handleEvent( event );
    }

    // 
    //  DESC: React to what the player is doing
    //
    update()
    {
        this.scriptComponent.update();

        if( this.ai )
            this.ai.update();
    }
    
    // 
    //  DESC: Update the physics
    //
    physicsUpdate()
    {
        if( this.physicsComponent )
            this.physicsComponent.update( this );
    }
    
    // 
    //  DESC: do the render
    //
    render( matrix )
    {
        if( this.isVisible() )
        {
            this.visualComponent.render( this.matrix, matrix );
        }
    }
    
    // 
    //  DESC: Set the AI.
    //
    setAI( ai )
    {
        this.ai = ai;

        // Handle any initialization in a seperate function
        this.ai.init();
    }
    
    // 
    //  DESC: Set the AI.
    //
    setColor( color )
    {
        this.visualComponent.color.copy( color );
    }

    setRGBA( r, g, b, a )
    {
        // This function assumes values between 0.0 to 1.0.
        this.visualComponent.color.set( r, g, b, a );
    }
    
    // 
    //  DESC: Set the Alpha
    //
    setAlpha( alpha, allowToExceed = false )
    {
        if( allowToExceed || (alpha < this.objData.visualData.color.a) )
            this.visualComponent.color.a = alpha;
        else
            this.visualComponent.color.a = this.objData.visualData.color.a;
    }
    
    // 
    //  DESC: Get the Alpha
    //
    getAlpha()
    {
        return this.visualComponent.color.a;
    }
    
    // 
    //  DESC: Get the default Alpha
    //
    getDefaultAlpha()
    {
        return this.objData.visualData.color.a;
    }
    
    // 
    //  DESC: Set the default color
    //
    setDefaultColor()
    {
        this.visualComponent.color.copy( this.objData.visualData.color );
    }

    // 
    //  DESC: Get the color
    //
    getColor()
    {
        return this.visualComponent.color;
    }

    // 
    //  DESC: Get the color
    //
    getDefaultColor()
    {
        return this.objData.visualData.color;
    }
    
    // 
    //  DESC: Set the texture ID from index
    //
    setFrame( index = 0 )
    {
        if( this.visualComponent.frameIndex != index )
        {
            this.visualComponent.setFrame( index );

            if( this.objData.visualData.genType === defs.EGT_SPRITE_SHEET )
                this.setCropOffset( this.objData.visualData.spriteSheet.getGlyph(index).cropOffset );
        }
    }
    
    // 
    //  DESC: Set the texture ID from index
    //
    getFrameCount()
    {
        if( this.objData.visualData.spriteSheet )
            return this.objData.visualData.spriteSheet.getCount();
        
        return 1;
    }
}
