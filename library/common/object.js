
// 
//  FILE NAME:  object.js
//  DESC:       object class
//

"use strict";
import { Point } from './point';
import { Size } from './size';
import { Rect } from './rect';
import { BitMask } from '../utilities/bitmask';
import { Matrix } from '../utilities/matrix';
import { ScriptComponent } from '../script/scriptcomponent';
import * as parseHelper from '../utilities/xmlparsehelper';
import * as defs from '../common/defs';

// Reusable global objects so as to avoid exessive allocations and cleanup
var gDummyPoint = new Point;
var gSize = new Size;
var gRect = new Rect;

export class Object
{
    constructor( parentNode = null )
    {
        // parent node of this object
        this.parentNode = parentNode;

        // local matrix
        this.matrix = new Matrix;

        // Bitmask settings to record if the object needs to be transformed
        this.parameters = new BitMask(defs.VISIBLE);
    
        // Local position
        this.pos = new Point;

        // Local Rotation in radians
        this.rot = new Point;

        // Local scale
        this.scale = new Point( 1, 1, 1 );

        // The center point. Point of rotation
        // This is used for defining a different center point
        this.centerPos = new Point;

        // Offset due to a sprite sheet crop.
        this.cropOffset = new Size;

        // Translated position
        this.transPos = new Point;

        // The script part of the sprite
        this.scriptComponent = new ScriptComponent;
    }

    // 
    //  DESC: Prepare any script functions that are flagged to prepareOnInit
    //
    prepareScriptOnInit()
    {
        this.scriptComponent.prepareOnInit( this );
    }

    // 
    //  DESC: Prepare script functions. Script may also be recycled
    //
    prepareScript(...args)
    {
        // First time script creation
        switch(args.length)
        {
            case 1:
                return this.scriptComponent.prepare( args[0],this );

            case 2:
                return this.scriptComponent.prepare( args[0],this,args[1] );

            case 3:
                return this.scriptComponent.prepare( args[0],this,args[1],args[2] );

            case 4:
                return this.scriptComponent.prepare( args[0],this,args[1],args[2],args[3] );

            case 5:
                return this.scriptComponent.prepare( args[0],this,args[1],args[2],args[3],args[4] );

            case 6:
                return this.scriptComponent.prepare( args[0],this,args[1],args[2],args[3],args[4],args[5] );
        }
    }

    // 
    //  DESC: Update the sprite
    //
    update()
    {
        this.scriptComponent.update();
    }

    //
    //  DESC: Set the object's position
    //
    setPos( pos )
    {
        this.parameters.add( defs.TRANSLATE | defs.TRANSFORM );

        this.pos.set( pos );
    }
    
    setPosXYZ( x = 0, y = 0, z = 0 )
    {
        this.parameters.add( defs.TRANSLATE | defs.TRANSFORM );

        this.pos.setXYZ( x, y, z );
    }
    
    incPos( pos )
    {
        this.parameters.add( defs.TRANSLATE | defs.TRANSFORM );

        this.pos.inc( pos );
    }
    
    incPosXYZ( x = 0, y = 0, z = 0 )
    {
        this.parameters.add( defs.TRANSLATE | defs.TRANSFORM );

        this.pos.incXYZ( x, y, z );
    }
    
    //
    //  DESC: Set the pre-translation matrix
    //
    setRot( rot, convertToRadians = true )
    {
        this.parameters.add( defs.ROTATE | defs.TRANSFORM );
        
        if( convertToRadians )
            this.rot.setXYZ( rot.x * defs.DEG_TO_RAD, rot.y * defs.DEG_TO_RAD, rot.z * defs.DEG_TO_RAD );
        else
            this.rot.set( rot );
    }
    
    setRotXYZ( x = 0, y = 0, z = 0, convertToRadians = true )
    {
        this.parameters.add( defs.ROTATE | defs.TRANSFORM );

        if( convertToRadians )
            this.rot.setXYZ( x * defs.DEG_TO_RAD, y * defs.DEG_TO_RAD, z * defs.DEG_TO_RAD );
        else
            this.rot.setXYZ( x, y, z );
    }
    
    incRot( rot, convertToRadians = true )
    {
        this.parameters.add( defs.ROTATE | defs.TRANSFORM );

        if( convertToRadians )
            this.rot.incXYZ( rot.x * defs.DEG_TO_RAD, rot.y * defs.DEG_TO_RAD, rot.z * defs.DEG_TO_RAD );
        else
            this.rot.inc( rot );
        
        this.rot.cap( 360 * defs.DEG_TO_RAD );
    }
    
    incRotXYZ( x = 0, y = 0, z = 0, convertToRadians = true )
    {
        this.parameters.add( defs.ROTATE | defs.TRANSFORM );

        if( convertToRadians )
            this.rot.incXYZ( x * defs.DEG_TO_RAD, y * defs.DEG_TO_RAD, z * defs.DEG_TO_RAD );
        else
            this.rot.incXYZ( x, y, z );
        
        this.rot.cap( 360 * defs.DEG_TO_RAD );
    }
    
    //
    //  DESC: Set the pre-translation matrix
    //
    setScale( scale )
    {
        this.parameters.add( defs.SCALE | defs.TRANSFORM );

        this.scale.set( scale );
    }
    
    setScaleXYZ( x = 1, y = 1, z = 1 )
    {
        this.parameters.add( defs.SCALE | defs.TRANSFORM );

        this.scale.setXYZ( x, y, z );
    }
    
    incScale( scale )
    {
        this.parameters.add( defs.SCALE | defs.TRANSFORM );

        this.scale.inc( scale );
    }
    
    incScaleXYZ( x = 0, y = 0, z = 0 )
    {
        this.parameters.add( defs.SCALE | defs.TRANSFORM );

        this.scale.incXYZ( x, y, z );
    }
    
    //
    //  DESC: Set the object's center position
    //
    setCenterPos( pos )
    {
        this.parameters.add( defs.CENTER_POINT | defs.TRANSFORM );

        this.centerPos = pos;
    }
    
    setCenterPosXYZ( x = 0, y = 0, z = 0 )
    {
        this.parameters.add( defs.CENTER_POINT | defs.TRANSFORM );

        this.centerPos.setXYZ( x, y, z );
    }

    //
    //  DESC: Set the object's crop offset
    //
    setCropOffset( offset )
    {
        if( !this.centerPos.isEmpty() || ((offset !== null) && (!offset.isEmpty())) )
        {
            this.parameters.add( defs.CROP_OFFSET | defs.TRANSFORM );

            this.cropOffset = offset;
        }
    }

    //
    //  DESC: Set the object visible
    //
    setVisible( value )
    {
        if( value )
            this.parameters.add( defs.VISIBLE );
        else
            this.parameters.remove( defs.VISIBLE );
    }

    //
    //  DESC: Is the object visible
    //
    isVisible()
    {
        return this.parameters.isSet( defs.VISIBLE );
    }
    
    //
    //  DESC: Copy the transform to the passed in object
    //
    copyTransform( object )
    {
        if( object.parameters.isSet( defs.TRANSLATE ) )
            this.setPos( object.pos );

        if( object.parameters.isSet( defs.ROTATE ) )
            this.setRot( object.rot );

        if( object.parameters.isSet( defs.SCALE ) )
            this.setScale( object.scale );

        if( object.parameters.isSet( defs.CENTER_POINT ) )
            this.setCenterPos( object.centerPos );

        if( object.parameters.isSet( defs.CROP_OFFSET ) )
            this.setCropOffset( object.cropOffset );

        this.transPos.copy( this.pos );
    }
    
    //
    //  DESC: Load the transform data from xmlNode
    //
    loadTransFromNode( xmlNode )
    {
        // Set if visible. Is visible by default
        let attr = xmlNode.getAttribute( 'visible' );
        if( attr )
            this.setVisible( attr === 'true' );

        let pos = parseHelper.loadPosition( xmlNode );
        if( pos )
            this.setPos( pos );

        let rot = parseHelper.loadRotation( xmlNode );
        if( rot )
            this.setRot( rot );

        let scale = parseHelper.loadScale( xmlNode );
        if( scale )
            this.setScale( scale );

        let centerPos = parseHelper.loadCenterPos( xmlNode );
        if( centerPos )
            this.setCenterPos( centerPos );
        
        this.transPos.copy( this.pos );
    }

    //
    //  DESC: Transform the object in local space
    //
    transformLocal( matrix )
    {
        // Reset the matrices
        matrix.initilizeMatrix();

        // Apply the crop offset
        if( this.parameters.isSet( defs.CROP_OFFSET ) )
            matrix.translateSize( this.cropOffset );

        // Apply the scale
        if( this.parameters.isSet( defs.SCALE ) )
            this.applyScale();

        // Apply the rotation
        if( this.parameters.isSet( defs.ROTATE ) )
            this.applyRotation( matrix );

        // Apply the translation
        if( this.parameters.isSet( defs.TRANSLATE ) )
            matrix.translate( this.pos );

        // Clear the check parameter
        this.parameters.remove( defs.TRANSFORM );

        // Indicate that translation was done
        this.parameters.add( defs.WAS_TRANSFORMED );
    }
    
    //
    //  DESC: Transform
    //  
    //  NOTE: Child objects that are intermittenly transformed
    //        will need a transform even if it's just 0, 0, 0
    //        to force a transfor with it's parent
    //
    transform( object = null )
    {
        this.parameters.remove( defs.WAS_TRANSFORMED );
        
        if( object )
        {
            if( this.parameters.isSet( defs.TRANSFORM ) || object.wasWorldPosTranformed() )
            {
                this.transformLocal( this.matrix );
                this.matrix.mergeMatrix( object.matrix.matrix );
                this.matrix.transformPoint( this.transPos, gDummyPoint );
            }
        }
        else
        {
            if( this.parameters.isSet( defs.TRANSFORM ) )
            {
                this.transformLocal( this.matrix );
                this.transPos.copy( this.pos );
            }
        }
    }

    // 
    //  DESC: do the render
    //
    render( /* camera */ )
    {
        // Empty render function to help with recursion
        return this.isVisible();
    }

    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        // Empty render function to help with recursion
    }
    
    //
    //  DESC: Apply the scale
    //
    applyScale()
    {
        this.matrix.setScaleFromPoint( this.scale );
    }

    //
    //  DESC: Apply the scale
    //
    applyRotation( /*matrix*/ )
    {
        // Add in the center point prior to rotation
        if( this.parameters.isSet( defs.CENTER_POINT ) )
            this.matrix.translate( this.centerPos );

        this.matrix.rotate( this.rot );

        // Subtract the center point after rotation to put back in original position
        // Doing two inverts keeps us from having to new up a point that would be garbage collected
        if( this.parameters.isSet( defs.CENTER_POINT ) )
        {
            this.centerPos.invert();
            this.matrix.translate( this.centerPos );
            this.centerPos.invert();
        }
    }

    //
    //  DESC: Was the world position transformed?
    //
    wasWorldPosTranformed()
    {
        return this.parameters.isSet( defs.WAS_TRANSFORMED );
    }

    //
    //  DESC: Was the world position transformed?
    //
    forceTransform()
    {
        this.parameters.add( defs.TRANSFORM );
    }

    //
    //  DESC: Get the global resuable size scratch buffer
    //
    getSize()
    {
        return gSize;
    }

    //
    //  DESC: Get the global resuable rect scratch buffer
    //
    getRect()
    {
        gRect.clear();
        return gRect;
    }
}
