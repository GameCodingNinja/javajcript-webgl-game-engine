
// 
//  FILE NAME: titlescreenstate.js
//  DESC:      titles screen state class
//

"use strict";

import { CommonState } from './commonstate';
import { Sprite } from '../../../library/sprite/sprite';
import { Camera } from '../../../library/utilities/camera';
import { objectDataManager } from '../../../library/objectdatamanager/objectdatamanager';
import { shaderManager } from '../../../library/managers/shadermanager';
import { menuManager } from '../../../library/gui/menumanager';
import { device } from '../../../library/system/device';
import { ScriptComponent } from '../../../library/script/scriptcomponent';
import { highResTimer } from '../../../library/utilities/highresolutiontimer';
import { scriptManager } from '../../../library/script/scriptmanager';
import { loadManager } from '../../../library/managers/loadmanager';
import { assetHolder } from '../../../library/utilities/assetholder';
import * as state from './gamestate';
import * as defs from '../../../library/common/defs';
import * as genFunc from '../../../library/utilities/genfunc';
import * as slotDefs from '../../../library/slot/slotdefs';

export class TitleScreenState extends CommonState
{
    constructor( gameLoopCallback = null )
    {
        super( state.GAME_STATE_TITLESCREEN, state.GAME_STATE_LOAD, gameLoopCallback );
        
        this.background = new Sprite( objectDataManager.getData( '(title_screen)', 'background' ) );
        this.background.object.transform();
        
        this.camera = new Camera( 5, 1000 );
        
        this.cameraCube = new Camera( 5, 1000, 45 );
        this.cameraCube.setPosXYZ( 0, 0, 20 );
        this.cameraCube.setRotXYZ( 10, 0, 0 );
        this.cameraCube.transform();
        
        this.cube = new Sprite( objectDataManager.getData( '(cube)', 'cube' ) );
        this.cube.object.setScaleXYZ( 3, 3, 3 );
        
        // Create the script component and add a script
        this.scriptComponent = new ScriptComponent;
        this.scriptComponent.set( scriptManager.get('ScreenFade')( 0, 1, 500 ) );
    }
    
    // 
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        // Unblock the menu messaging and activate needed trees
        menuManager.allowEventHandling = true;
        menuManager.activateTree( ['title_screen_tree'] );
        
        // Reset the elapsed time before entering the render loop
        highResTimer.calcElapsedTime();
        
        // Start the game loop
        requestAnimationFrame( this.callback );
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Currently used for cleaning up after the font sprites
        unload();
    }
    
    // 
    //  DESC: handle events
    //
    handleEvent( event )
    {
        super.handleEvent( event );
        
        if( event instanceof CustomEvent )
        {
            // Check for the "game change state" message
            if( event.detail.type === defs.EGE_MENU_GAME_STATE_CHANGE )
            {
                if( event.detail.arg[0] === defs.ETC_BEGIN )
                    this.scriptComponent.set( scriptManager.get('ScreenFade')( 1, 0, 500, true ) );
            }
        }
    }
    
    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        super.update();
        
        this.scriptComponent.update();
        
        let rot = highResTimer.elapsedTime * 0.04;
        this.cube.object.incRotXYZ( rot, rot, 0 );
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        super.transform();
        
        this.cube.object.transform();
    }
    
    // 
    //  DESC: 2D/3D Render of game content
    //
    render()
    {
        super.render();
        
        this.background.render( this.camera );
        this.cube.render( this.cameraCube );
        
        menuManager.render( device.orthographicMatrix );
    }
}


// 
//  DESC: Unload files
//
function unload()
{
    objectDataManager.freeGroup( ['(title_screen)','(cube)'] );
}

// 
//  DESC: Load files
//
export function load()
{
    // Load the xml group
    loadManager.add(
        ( callback ) => objectDataManager.loadXMLGroup2D( ['(title_screen)'], callback ) );

    // Load all the textures associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadTextureGroup2D( ['(title_screen)'], callback ) );

    // Load all the meshes associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadMeshGroup2D( ['(title_screen)'], callback ) );

    // Create OpenGL objects from the loaded data
    loadManager.add(
        ( callback ) => objectDataManager.createFromData( ['(title_screen)'], callback ) );

    // Load the object data list table and (startup) group
    loadManager.add(
        ( callback ) => objectDataManager.loadXMLGroup3D( ['(cube)'], callback ) );

    // Load all the meshes associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadMeshGroup3D( ['(cube)'], callback ) );

    // Load all the textures associated with this group
    loadManager.add(
        ( callback ) => objectDataManager.loadTextureGroup3D( ['(cube)'], callback ) );

    // Combine the meshes with their textures
    loadManager.add(
        ( callback ) => objectDataManager.createFromData( ['(cube)'], callback ) );
}
