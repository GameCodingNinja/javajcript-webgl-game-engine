
// 
//  FILE NAME:  sprite.js
//  DESC:       Sprite class
//

"use strict";

import { Object } from '../common/object';
import { VisualComponentQuad } from '../2d/visualcomponentquad';
import { VisualComponentSpriteSheet } from '../2d/visualcomponentspritesheet';
import { VisualComponentScaledFrame } from '../2d/visualcomponentscaledframe';
import { VisualComponentFont } from '../2d/visualcomponentfont';
import { VisualComponent3D } from '../3d/visualcomponent3d';
import { NullVisualComponent } from '../common/nullvisualcomponent';
import { PhysicsComponent2D } from '../physics/physicscomponent2d';
import { CollisionComponent } from '../collision/collisioncomponent';
import { Matrix } from '../utilities/matrix';
import * as defs from '../common/defs';

export class Sprite extends Object
{
    constructor( objData, parentNode = null )
    {
        super( parentNode );

        // The object data
        this.objData = objData
        
        // The visual part of the sprite
        this.visualComponent = null
        
        // The physics part of the sprite
        this.physicsComponent = null;

        // Collision part of the sprite.
        this.collisionComponent = null;
        
        // Allocate the sprite specific objects
        if( objData.is2D() )
        {
            if( objData.visualData.genType === defs.EGT_QUAD )
                this.visualComponent = new VisualComponentQuad( objData.visualData );
            
            else if( objData.visualData.genType === defs.EGT_SPRITE_SHEET )
                this.visualComponent = new VisualComponentSpriteSheet( objData.visualData );
            
            else if( objData.visualData.genType === defs.EGT_SCALED_FRAME )
                this.visualComponent = new VisualComponentScaledFrame( objData.visualData );
            
            else if( objData.visualData.genType === defs.EGT_FONT )
                this.visualComponent = new VisualComponentFont( objData.visualData );
            
            if( objData.physicsData.isActive() )
                this.physicsComponent = new PhysicsComponent2D( objData.physicsData );
        }
        else if( objData.is3D() )
        {
            // Matrix for rotations only, used for normal calculations
            this.rotMatrix = new Matrix;
            this.visualComponent = new VisualComponent3D( objData.visualData );
        }

        if( objData.collisionData.isActive() )
            this.collisionComponent = new CollisionComponent( objData, this );

        // Allocate the null component if no visual component was created
        if( this.visualComponent === null )
            this.visualComponent = new NullVisualComponent( objData );
    }
    
    // 
    //  DESC: Load from XML node
    //
    load( xmlNode )
    {
        // Load the transform data from node
        this.loadTransFromNode( xmlNode );

        // Load the script functions from node
        this.scriptComponent.initScriptIds( xmlNode );

        if( this.visualComponent.isFontSprite() )
            this.visualComponent.loadFontPropFromNode( xmlNode );

        // Set the frame of the animation
        let attr = xmlNode.getAttribute( 'frameIndex' );
        if( attr )
            this.setFrame( Number(attr) );
    }

    // 
    //  DESC: Reload from XML node
    //
    reload( xmlNode )
    {
        // Load the sprite data
        this.load( xmlNode );

        // Init
        this.init();
        
        if( this.physicsComponent )
            this.physicsComponent.setTransform(this.pos.x, this.pos.y, this.rot.z);
    }

    // 
    //  DESC: Reset from XML node
    //
    reset( xmlNode )
    {
        // Reset to factory defaults
        this.parameters.clear();
        this.parameters.add( defs.VISIBLE );
        this.pos.clear();
        this.rot.clear();
        this.scale.setXYZ( 1, 1, 1 );
        this.matrix.initilizeMatrix();

        if( this.collisionComponent && this.objData.collisionData.isActive() )
            this.collisionComponent.enable = true;

        // Reload from XML node
        this.reload( xmlNode );

        // Prepare any script functions that are flagged to prepareOnInit
        this.prepareScriptOnInit();
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
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        this.scriptComponent.handleEvent( event );
    }
    
    // 
    //  DESC: Update the physics
    //
    physicsUpdate()
    {
        if( this.physicsComponent )
            this.physicsComponent.update();
    }

    //
    //  DESC: Transform
    //
    transform( object = null )
    {
        super.transform( object );

        if( this.collisionComponent )
            this.collisionComponent.transform();
    }
    
    // 
    //  DESC: do the render
    //
    render( camera )
    {
        if( this.isVisible() )
        {
            this.visualComponent.render( this, camera );

            return true;
        }

        return false;
    }
    
    // 
    //  DESC: Set the color
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
                if( index < this.objData.visualData.spriteSheet.getCount() )
                    this.setCropOffset( this.objData.visualData.spriteSheet.getGlyph(index).cropOffset );
        }
    }
    
    // 
    //  DESC: Set the texture ID from index
    //
    getFrameCount()
    {
        return this.objData.visualData.getFrameCount();
    }

    //
    //  DESC: Is the physics active
    //
    isPhysicsActive()
    {
        if( this.physicsComponent && this.physicsComponent.isActive() )
            return true;

        return false;
    }

    //
    //  DESC: Is the physics awake
    //
    isPhysicsAwake()
    {
        if( this.isPhysicsActive() && this.physicsComponent.isAwake() )
            return true;

        return false;
    }

    //
    //  DESC: Apply the rotation
    //
    applyRotation( matrix )
    {
        // 3D light calculations require a rotation matrix without scale
        if( this.objData.is3D() )
        {
            // Add in the center point prior to rotation
            if( this.parameters.isSet( defs.CENTER_POINT ) )
                this.matrix.translate( this.centerPos );
            
            // Add in the rotation if this is NOT a physics transformation
            // NOTE: Don't have a 3D physics library yet
            //if( !this.parameters.isSet( defs.PHYSICS_TRANSFORM ) )
            {
                this.rotMatrix.initilizeMatrix();
                this.rotMatrix.rotate( this.rot );
            }

            // Since the rotation has already been done, multiply it into the matrix
            matrix.multiply3x3( this.rotMatrix.matrix );

            // Subtract the center point after rotation to put back in original position
            // Doing two inverts keeps us from having to new up a point that would be garbage collected
            if( this.parameters.isSet( defs.CENTER_POINT ) )
            {
                this.centerPos.invert();
                this.matrix.translate( this.centerPos );
                this.centerPos.invert();
            }
        }
        else
            super.applyRotation( matrix );
    }

    //
    //  DESC: Get the size of this sprite from orgin 0,0
    //
    getSize()
    {
        this._vSize = this.visualComponent.getSize();
        this._size = super.getSize();

        if( this._vSize !== null )
        {
            // If this sprite has a parent node, take the position into account
            // because it might add to the radius
            if(this.parentNode && this.parentNode.isChild())
            {
                this._size.w = (this._vSize.w + Math.abs(this.pos.x)) * this.scale.x;
                this._size.h = (this._vSize.h + Math.abs(this.pos.y)) * this.scale.y;
            }
            else
            {
                this._size.w = this._vSize.w * this.scale.x;
                this._size.h = this._vSize.h * this.scale.y;
            }
        }
        
        return this._size;
    }

    //
    //  DESC: Returns the current radius of this sprite only.
    //        Use this function if scale is constantly changing
    //
    getRadius()
    {
        return this.getSize().getLength() / 2;
    }

    //
    //  DESC: Get the rect of this sprite from orgin 0,0
    //
    getRect()
    {
        this._vSize = this.visualComponent.getSize();
        this._rect = super.getRect();

        this._halfX = this._vSize.w / 2;
        this._halfY = this._vSize.h / 2;

        this._rect.x1 = (-this._halfX + this.pos.x) * this.scale.x;
        this._rect.y1 = (this._halfY + this.pos.y) * this.scale.y;
        this._rect.x2 = (this._halfX + this.pos.x) * this.scale.x;
        this._rect.y2 = (-this._halfY + this.pos.y) * this.scale.y;

        return this._rect;
    }
}
