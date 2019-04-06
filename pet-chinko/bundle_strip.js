(function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports;}
var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}
};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports;}
__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{enumerable:true,get:getter });}
};__webpack_require__.r=function(exports){if(typeof Symbol!=='undefined' && Symbol.toStringTag){Object.defineProperty(exports,Symbol.toStringTag,{value:'Module' });}
Object.defineProperty(exports,'__esModule',{value:true });};__webpack_require__.t=function(value,mode){if(mode & 1)value=__webpack_require__(value);if(mode & 8)return value;if((mode & 4)&& typeof value==='object' && value && value.__esModule)return value;var ns=Object.create(null);__webpack_require__.r(ns);Object.defineProperty(ns,'default',{enumerable:true,value:value });if(mode & 2 && typeof value!='string')for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key];}.bind(null,key));return ns;};__webpack_require__.n=function(module){var getter=module && module.__esModule ?
function getDefault(){return module['default'];}:
function getModuleExports(){return module;};__webpack_require__.d(getter,'a',getter);return getter;};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property);};__webpack_require__.p="";return __webpack_require__(__webpack_require__.s=0);})
([
(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _game_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1);var _library_node_nodemultilist__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(104);var game=new _game_js__WEBPACK_IMPORTED_MODULE_0__["Game"];}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Game",function(){return Game;});var _library_managers_signalmanager__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2);var _library_utilities_settings__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3);var _library_managers_texturemanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6);var _library_managers_meshmanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(10);var _library_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(15);var _library_utilities_genfunc__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(18);var _library_managers_shadermanager__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(19);var _state_startupstate__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(21);var _state_titlescreenstate__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(107);var _state_loadstate__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(112);var _state_level1state__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(113);var _smartGUI_smartconfirmbtn__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(116);var _ai_aiball__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(118);var _library_system_device__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(8);var _library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(26);var _library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(68);var _state_statedefs__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(24);class Game
{constructor()
{_library_managers_shadermanager__WEBPACK_IMPORTED_MODULE_6__["shaderManager"].initShaderCallback=this.shaderInitCallBack.bind(this);_library_managers_signalmanager__WEBPACK_IMPORTED_MODULE_0__["signalManager"].connect_smartGui(this.smartGuiControlCreateCallBack.bind(this));_library_managers_signalmanager__WEBPACK_IMPORTED_MODULE_0__["signalManager"].connect_aiCreate(this.aiCreateCallBack.bind(this));Object(_library_utilities_genfunc__WEBPACK_IMPORTED_MODULE_5__["downloadFile"])('xml','data/settings/settings.cfg',(xmlNode)=>
{_library_utilities_settings__WEBPACK_IMPORTED_MODULE_1__["settings"].load(xmlNode);this.init();});}
init()
{_library_system_device__WEBPACK_IMPORTED_MODULE_13__["device"].createProjMatrix();if(_library_utilities_settings__WEBPACK_IMPORTED_MODULE_1__["settings"].createStencilBuffer)
_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].stencilOp(_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].KEEP,_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].KEEP,_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].REPLACE);if(_library_utilities_settings__WEBPACK_IMPORTED_MODULE_1__["settings"].enableDepthBuffer)
_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].enable(_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].DEPTH_TEST);_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].clearColor(0.0,0.0,0.0,1.0);if(_library_utilities_settings__WEBPACK_IMPORTED_MODULE_1__["settings"].stencilBufferBitSize===1)
{_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].stencilFunc(_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].ALWAYS,1,0x1);_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].stencilMask(0x1);}
else if(_library_utilities_settings__WEBPACK_IMPORTED_MODULE_1__["settings"].stencilBufferBitSize===8)
{_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].stencilFunc(_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].ALWAYS,1,0xFF);_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].stencilMask(0xff);}
_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].frontFace(_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].CCW);_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].cullFace(_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].BACK);_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].enable(_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].CULL_FACE);_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].enable(_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].BLEND);_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].blendFunc(_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].SRC_ALPHA,_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].ONE_MINUS_SRC_ALPHA);_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].activeTexture(_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].TEXTURE0);if(_library_utilities_settings__WEBPACK_IMPORTED_MODULE_1__["settings"].clearTargetBuffer)
this.clearBufferMask|=_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].COLOR_BUFFER_BIT;if(_library_utilities_settings__WEBPACK_IMPORTED_MODULE_1__["settings"].enableDepthBuffer)
this.clearBufferMask|=_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].DEPTH_BUFFER_BIT;if(_library_utilities_settings__WEBPACK_IMPORTED_MODULE_1__["settings"].clearStencilBuffer)
this.clearBufferMask|=_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].STENCIL_BUFFER_BIT;_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].clear(this.clearBufferMask);this.gameState=new _state_startupstate__WEBPACK_IMPORTED_MODULE_7__["StartUpState"](this.gameLoop.bind(this));}
smartGuiControlCreateCallBack(control)
{if(control.faction==='decision_btn')
control.smartGui=new _smartGUI_smartconfirmbtn__WEBPACK_IMPORTED_MODULE_11__["SmartConfirmBtn"](control);}
aiCreateCallBack(aiName,obj)
{if(aiName==='aiBall')
obj.setAI(new _ai_aiball__WEBPACK_IMPORTED_MODULE_12__["aiBall"](obj));}
shaderInitCallBack(shaderId)
{_library_managers_shadermanager__WEBPACK_IMPORTED_MODULE_6__["shaderManager"].setShaderValue4fv(shaderId,'additive',[0,0,0,1]);}
doStateChange()
{if(this.gameState.doStateChange())
{this.gameState.cleanUp();if(this.gameState.nextState===_state_statedefs__WEBPACK_IMPORTED_MODULE_16__["EGS_TITLE_SCREEN"])
this.gameState=new _state_titlescreenstate__WEBPACK_IMPORTED_MODULE_8__["TitleScreenState"](this.gameLoop.bind(this));else if(this.gameState.nextState===_state_statedefs__WEBPACK_IMPORTED_MODULE_16__["EGS_GAME_LOAD"])
this.gameState=new _state_loadstate__WEBPACK_IMPORTED_MODULE_9__["LoadState"](this.gameState.stateMessage,this.gameLoop.bind(this));else if(this.gameState.nextState===_state_statedefs__WEBPACK_IMPORTED_MODULE_16__["EGS_LEVEL_1"])
this.gameState=new _state_level1state__WEBPACK_IMPORTED_MODULE_10__["Level1State"](this.gameLoop.bind(this));return true;}
return false;}
pollEvents()
{let event=null;while((event=_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_14__["eventManager"].pollEvent()))
this.handleEvent(event);}
handleEvent(event)
{this.gameState.handleEvent(event);}
gameLoop()
{if(this.doStateChange())
return;this.pollEvents();_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_15__["highResTimer"].calcElapsedTime();this.gameState.physics();this.gameState.update();this.gameState.transform();_library_system_device__WEBPACK_IMPORTED_MODULE_13__["gl"].clear(this.clearBufferMask);this.gameState.render();_library_managers_shadermanager__WEBPACK_IMPORTED_MODULE_6__["shaderManager"].unbind();_library_managers_texturemanager__WEBPACK_IMPORTED_MODULE_2__["textureManager"].unbind();_library_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_4__["vertexBufferManager"].unbind();requestAnimationFrame(this.gameLoop.bind(this));}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"signalManager",function(){return signalManager;});class SignalManager
{constructor()
{this.smartGuiControlSignal=[];this.smartMenuSignal=[];this.aiCreateSignal=[];this.loadCompleteSignal=[];this.resolutionChangeSignal=[];}
connect_smartGui(slot)
{this.smartGuiControlSignal.push(slot);}
connect_smartMenu(slot)
{this.smartMenuSignal.push(slot);}
connect_aiCreate(slot)
{this.aiCreateSignal.push(slot);}
connect_loadComplete(slot)
{this.loadCompleteSignal.push(slot);}
connect_resolutionChange(slot)
{this.resolutionChangeSignal.push(slot);}
clear_loadComplete()
{this.loadCompleteSignal=[];}
broadcast_smartGui(control)
{for(let i=0;i<this.smartGuiControlSignal.length;++i)
this.smartGuiControlSignal[i](control);}
broadcast_smartMenu(menu)
{for(let i=0;i<this.smartMenuSignal.length;++i)
this.smartMenuSignal[i](menu);}
broadcast_aiCreate(aiName,sprite)
{for(let i=0;i<this.aiCreateSignal.length;++i)
this.aiCreateSignal[i](aiName,sprite);}
broadcast_loadComplete()
{for(let i=0;i<this.loadCompleteSignal.length;++i)
this.loadCompleteSignal[i]();}
broadcast_resolutionChange()
{for(let i=0;i<this.resolutionChangeSignal.length;++i)
this.resolutionChangeSignal[i]();}
}
var signalManager=new SignalManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"settings",function(){return settings;});var _common_size__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(4);var _common_defs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);class Settings
{constructor()
{this.size=new _common_size__WEBPACK_IMPORTED_MODULE_0__["Size"];this.size_half=new _common_size__WEBPACK_IMPORTED_MODULE_0__["Size"];this.nativeSize=new _common_size__WEBPACK_IMPORTED_MODULE_0__["Size"];this.screenAspectRatio=new _common_size__WEBPACK_IMPORTED_MODULE_0__["Size"];this.orthoAspectRatio=new _common_size__WEBPACK_IMPORTED_MODULE_0__["Size"];this.defaultSize=new _common_size__WEBPACK_IMPORTED_MODULE_0__["Size"];this.defaultSize_half=new _common_size__WEBPACK_IMPORTED_MODULE_0__["Size"];this.enableDepthBuffer=false;this.createStencilBuffer=false;this.clearStencilBuffer=false;this.stencilBufferBitSize=1;this.clearTargetBuffer=true;this.projectionType=_common_defs__WEBPACK_IMPORTED_MODULE_1__["EPT_PERSPECTIVE"];this.viewAngle=45.0*_common_defs__WEBPACK_IMPORTED_MODULE_1__["DEG_TO_RAD"];this.minZdist=5.0;this.maxZdist=1000.5;this.sectorSize=0;this.sectorSizeHalf=0;}
load(node)
{if(node)
{let display=node.getElementsByTagName('display');if(display.length)
{let resolution=display[0].getElementsByTagName('resolution');if(resolution.length)
{this.size.w=Number(resolution[0].getAttribute('width'));this.size.h=Number(resolution[0].getAttribute('height'));}
let defaultRes=display[0].getElementsByTagName('default');if(defaultRes.length)
{this.nativeSize.w=Number(defaultRes[0].getAttribute('width'));this.nativeSize.h=Number(defaultRes[0].getAttribute('height'));this.defaultSize.h=this.nativeSize.h;}
}
let device=node.getElementsByTagName('device');if(device.length)
{let projection=device[0].getElementsByTagName('projection');if(projection.length)
{let attr=projection[0].getAttribute('projectType');if(attr &&(attr==='orthographic'))
this.projectionType=_common_defs__WEBPACK_IMPORTED_MODULE_1__["EPT_ORTHOGRAPHIC"];attr=projection[0].getAttribute('minZDist');if(attr)
this.minZdist=Number(attr);attr=projection[0].getAttribute('maxZDist');if(attr)
this.maxZdist=Number(attr);attr=projection[0].getAttribute('view_angle');if(attr)
this.viewAngle=Number(attr)*_common_defs__WEBPACK_IMPORTED_MODULE_1__["DEG_TO_RAD"];}
let depthStencilBuffer=device[0].getElementsByTagName('depthStencilBuffer');if(depthStencilBuffer.length)
{this.enableDepthBuffer=(depthStencilBuffer[0].getAttribute('enableDepthBuffer')==='true');this.createStencilBuffer=(depthStencilBuffer[0].getAttribute('createStencilBuffer')==='true');this.clearStencilBuffer=(depthStencilBuffer[0].getAttribute('clearStencilBuffer')==='true');this.stencilBufferBitSize=Number(depthStencilBuffer[0].getAttribute('stencilBufferBitSize'));}
let targetBuffer=device[0].getElementsByTagName('targetBuffer');if(targetBuffer.length)
this.clearTargetBuffer=(targetBuffer[0].getAttribute('clear')==='true');}
let worldNode=node.getElementsByTagName('world');if(worldNode.length)
{this.sectorSize=Number(worldNode[0].getAttribute('sectorSize'));this.sectorSizeHalf=Math.trunc(this.sectorSize/2);}
}
this.calcRatio();}
calcRatio()
{this.screenAspectRatio.w=this.size.w/this.size.h;this.screenAspectRatio.h=this.size.h/this.size.w;this.defaultSize.w=Math.floor((this.screenAspectRatio.w*this.defaultSize.h)+0.5);this.defaultSize_half.w=this.defaultSize.w/2;this.defaultSize_half.h=this.defaultSize.h/2;this.size_half.w=this.size.w/2;this.size_half.h=this.size.h/2;this.orthoAspectRatio.h=this.size.h/this.defaultSize.h;this.orthoAspectRatio.w=this.size.w/this.defaultSize.w;}
}
var settings=new Settings;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Size",function(){return Size;});class Size
{constructor(w=0,h=0)
{this.w=w;this.h=h;}
copy(obj)
{this.w=obj.w;this.h=obj.h;}
set(w=0,h=0)
{this.w=w;this.h=h;}
reset()
{this.w=0;this.h=0;}
isEmpty()
{if((this.w==0)&&(this.h==0))
return true;return false;}
round()
{this.w=Math.round(this.w);this.h=Math.round(this.h);}
set u(value){this.w=value;}
get u(){return this.w;}
set v(value){this.h=value;}
get v(){return this.h;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"DEG_TO_RAD",function(){return DEG_TO_RAD;});__webpack_require__.d(__webpack_exports__,"RAD_TO_DEG",function(){return RAD_TO_DEG;});__webpack_require__.d(__webpack_exports__,"EPSILON",function(){return EPSILON;});__webpack_require__.d(__webpack_exports__,"RGB_TO_DEC",function(){return RGB_TO_DEC;});__webpack_require__.d(__webpack_exports__,"SPRITE_DEFAULT_ID",function(){return SPRITE_DEFAULT_ID;});__webpack_require__.d(__webpack_exports__,"OBJECT_DEFAULT_ID",function(){return OBJECT_DEFAULT_ID;});__webpack_require__.d(__webpack_exports__,"NODE_DEFAULT_ID",function(){return NODE_DEFAULT_ID;});__webpack_require__.d(__webpack_exports__,"PARENT_NODE_DEFAULT_ID",function(){return PARENT_NODE_DEFAULT_ID;});__webpack_require__.d(__webpack_exports__,"RESET_VELOCITY",function(){return RESET_VELOCITY;});__webpack_require__.d(__webpack_exports__,"EGT_NULL",function(){return EGT_NULL;});__webpack_require__.d(__webpack_exports__,"EGT_QUAD",function(){return EGT_QUAD;});__webpack_require__.d(__webpack_exports__,"EGT_SPRITE_SHEET",function(){return EGT_SPRITE_SHEET;});__webpack_require__.d(__webpack_exports__,"EGT_SCALED_FRAME",function(){return EGT_SCALED_FRAME;});__webpack_require__.d(__webpack_exports__,"EGT_MESH_FILE",function(){return EGT_MESH_FILE;});__webpack_require__.d(__webpack_exports__,"EGT_FONT",function(){return EGT_FONT;});__webpack_require__.d(__webpack_exports__,"EPT_NULL",function(){return EPT_NULL;});__webpack_require__.d(__webpack_exports__,"EPT_PERSPECTIVE",function(){return EPT_PERSPECTIVE;});__webpack_require__.d(__webpack_exports__,"EPT_ORTHOGRAPHIC",function(){return EPT_ORTHOGRAPHIC;});__webpack_require__.d(__webpack_exports__,"EHA_HORZ_LEFT",function(){return EHA_HORZ_LEFT;});__webpack_require__.d(__webpack_exports__,"EHA_HORZ_CENTER",function(){return EHA_HORZ_CENTER;});__webpack_require__.d(__webpack_exports__,"EHA_HORZ_RIGHT",function(){return EHA_HORZ_RIGHT;});__webpack_require__.d(__webpack_exports__,"EVA_VERT_TOP",function(){return EVA_VERT_TOP;});__webpack_require__.d(__webpack_exports__,"EVA_VERT_CENTER",function(){return EVA_VERT_CENTER;});__webpack_require__.d(__webpack_exports__,"EVA_VERT_BOTTOM",function(){return EVA_VERT_BOTTOM;});__webpack_require__.d(__webpack_exports__,"CHAR_CODE_SPACE",function(){return CHAR_CODE_SPACE;});__webpack_require__.d(__webpack_exports__,"CHAR_CODE_PIPE",function(){return CHAR_CODE_PIPE;});__webpack_require__.d(__webpack_exports__,"EAP_IDLE",function(){return EAP_IDLE;});__webpack_require__.d(__webpack_exports__,"EAP_DOWN",function(){return EAP_DOWN;});__webpack_require__.d(__webpack_exports__,"EAP_UP",function(){return EAP_UP;});__webpack_require__.d(__webpack_exports__,"DEVICE_NULL",function(){return DEVICE_NULL;});__webpack_require__.d(__webpack_exports__,"KEYBOARD",function(){return KEYBOARD;});__webpack_require__.d(__webpack_exports__,"MOUSE",function(){return MOUSE;});__webpack_require__.d(__webpack_exports__,"GAMEPAD",function(){return GAMEPAD;});__webpack_require__.d(__webpack_exports__,"TRANSLATE",function(){return TRANSLATE;});__webpack_require__.d(__webpack_exports__,"ROTATE",function(){return ROTATE;});__webpack_require__.d(__webpack_exports__,"SCALE",function(){return SCALE;});__webpack_require__.d(__webpack_exports__,"CENTER_POINT",function(){return CENTER_POINT;});__webpack_require__.d(__webpack_exports__,"CROP_OFFSET",function(){return CROP_OFFSET;});__webpack_require__.d(__webpack_exports__,"TRANSFORM",function(){return TRANSFORM;});__webpack_require__.d(__webpack_exports__,"WAS_TRANSFORMED",function(){return WAS_TRANSFORMED;});__webpack_require__.d(__webpack_exports__,"MATRIX_ROTATION",function(){return MATRIX_ROTATION;});__webpack_require__.d(__webpack_exports__,"VISIBLE",function(){return VISIBLE;});__webpack_require__.d(__webpack_exports__,"SPRITE2D",function(){return SPRITE2D;});__webpack_require__.d(__webpack_exports__,"ACTOR2D",function(){return ACTOR2D;});__webpack_require__.d(__webpack_exports__,"ESSC_DELETE_SPRITE",function(){return ESSC_DELETE_SPRITE;});__webpack_require__.d(__webpack_exports__,"ESSC_CREATE_SPRITE",function(){return ESSC_CREATE_SPRITE;});__webpack_require__.d(__webpack_exports__,"ESSC_DELETE_PHYSICS",function(){return ESSC_DELETE_PHYSICS;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_TRANS_IN",function(){return EGE_MENU_TRANS_IN;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_TRANS_OUT",function(){return EGE_MENU_TRANS_OUT;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_ESCAPE_ACTION",function(){return EGE_MENU_ESCAPE_ACTION;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_TOGGLE_ACTION",function(){return EGE_MENU_TOGGLE_ACTION;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_BACK_ACTION",function(){return EGE_MENU_BACK_ACTION;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_TO_TREE",function(){return EGE_MENU_TO_TREE;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_TO_MENU",function(){return EGE_MENU_TO_MENU;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_GAME_STATE_CHANGE",function(){return EGE_MENU_GAME_STATE_CHANGE;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_UP_ACTION",function(){return EGE_MENU_UP_ACTION;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_DOWN_ACTION",function(){return EGE_MENU_DOWN_ACTION;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_LEFT_ACTION",function(){return EGE_MENU_LEFT_ACTION;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_RIGHT_ACTION",function(){return EGE_MENU_RIGHT_ACTION;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_CONTROL_STATE_CHANGE",function(){return EGE_MENU_CONTROL_STATE_CHANGE;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_SELECT_ACTION",function(){return EGE_MENU_SELECT_ACTION;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_SELECT_EXECUTE",function(){return EGE_MENU_SELECT_EXECUTE;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_SET_ACTIVE_CONTROL",function(){return EGE_MENU_SET_ACTIVE_CONTROL;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_REACTIVATE",function(){return EGE_MENU_REACTIVATE;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_SCROLL_UP",function(){return EGE_MENU_SCROLL_UP;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_SCROLL_DOWN",function(){return EGE_MENU_SCROLL_DOWN;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_SCROLL_LEFT",function(){return EGE_MENU_SCROLL_LEFT;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_SCROLL_RIGHT",function(){return EGE_MENU_SCROLL_RIGHT;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_TAB_LEFT",function(){return EGE_MENU_TAB_LEFT;});__webpack_require__.d(__webpack_exports__,"EGE_MENU_TAB_RIGHT",function(){return EGE_MENU_TAB_RIGHT;});__webpack_require__.d(__webpack_exports__,"EST_NULL",function(){return EST_NULL;});__webpack_require__.d(__webpack_exports__,"EST_OBJECT2D",function(){return EST_OBJECT2D;});__webpack_require__.d(__webpack_exports__,"EST_OBJECT3D",function(){return EST_OBJECT3D;});__webpack_require__.d(__webpack_exports__,"EST_SPRITE2D",function(){return EST_SPRITE2D;});__webpack_require__.d(__webpack_exports__,"EST_SPRITE3D",function(){return EST_SPRITE3D;});__webpack_require__.d(__webpack_exports__,"ENT_NULL",function(){return ENT_NULL;});__webpack_require__.d(__webpack_exports__,"ENT_OBJECT",function(){return ENT_OBJECT;});__webpack_require__.d(__webpack_exports__,"ENT_SPRITE",function(){return ENT_SPRITE;});__webpack_require__.d(__webpack_exports__,"ENT_OBJECT_MULTI_LIST",function(){return ENT_OBJECT_MULTI_LIST;});__webpack_require__.d(__webpack_exports__,"ENT_SPRITE_MULTI_LIST",function(){return ENT_SPRITE_MULTI_LIST;});__webpack_require__.d(__webpack_exports__,"ENT_UI_CONTROL",function(){return ENT_UI_CONTROL;});__webpack_require__.d(__webpack_exports__,"ESMA_PRESS_TYPE",function(){return ESMA_PRESS_TYPE;});__webpack_require__.d(__webpack_exports__,"ESMA_DEVICE_TYPE",function(){return ESMA_DEVICE_TYPE;});__webpack_require__.d(__webpack_exports__,"ESMA_MOUSE_X",function(){return ESMA_MOUSE_X;});__webpack_require__.d(__webpack_exports__,"ESMA_MOUSE_Y",function(){return ESMA_MOUSE_Y;});__webpack_require__.d(__webpack_exports__,"EMSC_STATE",function(){return EMSC_STATE;});__webpack_require__.d(__webpack_exports__,"EMSC_CONTROL",function(){return EMSC_CONTROL;});__webpack_require__.d(__webpack_exports__,"EMTS_INACTIVE",function(){return EMTS_INACTIVE;});__webpack_require__.d(__webpack_exports__,"EMTS_IDLE",function(){return EMTS_IDLE;});__webpack_require__.d(__webpack_exports__,"EMTS_ACTIVE",function(){return EMTS_ACTIVE;});__webpack_require__.d(__webpack_exports__,"EMTS_MAX_MENU_TREE_STATES",function(){return EMTS_MAX_MENU_TREE_STATES;});__webpack_require__.d(__webpack_exports__,"EMS_INACTIVE",function(){return EMS_INACTIVE;});__webpack_require__.d(__webpack_exports__,"EMS_IDLE",function(){return EMS_IDLE;});__webpack_require__.d(__webpack_exports__,"EMS_ACTIVE",function(){return EMS_ACTIVE;});__webpack_require__.d(__webpack_exports__,"EMS_MAX_MENU_STATES",function(){return EMS_MAX_MENU_STATES;});__webpack_require__.d(__webpack_exports__,"EMNS_NULL",function(){return EMNS_NULL;});__webpack_require__.d(__webpack_exports__,"EMNS_MOUSE",function(){return EMNS_MOUSE;});__webpack_require__.d(__webpack_exports__,"EMNS_GAMEPAD_KEYBAORD",function(){return EMNS_GAMEPAD_KEYBAORD;});__webpack_require__.d(__webpack_exports__,"ETC_RESET",function(){return ETC_RESET;});__webpack_require__.d(__webpack_exports__,"ETC_BEGIN",function(){return ETC_BEGIN;});__webpack_require__.d(__webpack_exports__,"ETC_END",function(){return ETC_END;});__webpack_require__.d(__webpack_exports__,"EAC_NULL",function(){return EAC_NULL;});__webpack_require__.d(__webpack_exports__,"EAC_FIRST_ACTIVE_CONTROL",function(){return EAC_FIRST_ACTIVE_CONTROL;});__webpack_require__.d(__webpack_exports__,"EAC_LAST_ACTIVE_CONTROL",function(){return EAC_LAST_ACTIVE_CONTROL;});__webpack_require__.d(__webpack_exports__,"EAR_UP",function(){return EAR_UP;});__webpack_require__.d(__webpack_exports__,"EAR_DOWN",function(){return EAR_DOWN;});__webpack_require__.d(__webpack_exports__,"EAR_LEFT",function(){return EAR_LEFT;});__webpack_require__.d(__webpack_exports__,"EAR_RIGHT",function(){return EAR_RIGHT;});__webpack_require__.d(__webpack_exports__,"EDO_NULL",function(){return EDO_NULL;});__webpack_require__.d(__webpack_exports__,"EDO_LEFT",function(){return EDO_LEFT;});__webpack_require__.d(__webpack_exports__,"EDO_RIGHT",function(){return EDO_RIGHT;});__webpack_require__.d(__webpack_exports__,"EDO_HORZ_CENTER",function(){return EDO_HORZ_CENTER;});__webpack_require__.d(__webpack_exports__,"EDO_TOP",function(){return EDO_TOP;});__webpack_require__.d(__webpack_exports__,"EDO_BOTTOM",function(){return EDO_BOTTOM;});__webpack_require__.d(__webpack_exports__,"EDO_VERT_CENTER",function(){return EDO_VERT_CENTER;});__webpack_require__.d(__webpack_exports__,"ENAV_NODE_UP",function(){return ENAV_NODE_UP;});__webpack_require__.d(__webpack_exports__,"ENAV_NODE_DOWN",function(){return ENAV_NODE_DOWN;});__webpack_require__.d(__webpack_exports__,"ENAV_NODE_LEFT",function(){return ENAV_NODE_LEFT;});__webpack_require__.d(__webpack_exports__,"ENAV_NODE_RIGHT",function(){return ENAV_NODE_RIGHT;});__webpack_require__.d(__webpack_exports__,"TOGGLE_STATE_ON",function(){return TOGGLE_STATE_ON;});__webpack_require__.d(__webpack_exports__,"TOGGLE_STATE_OFF",function(){return TOGGLE_STATE_OFF;});__webpack_require__.d(__webpack_exports__,"NO_ACTIVE_CONTROL",function(){return NO_ACTIVE_CONTROL;});__webpack_require__.d(__webpack_exports__,"BTN_DEC",function(){return BTN_DEC;});__webpack_require__.d(__webpack_exports__,"BTN_INC",function(){return BTN_INC;});__webpack_require__.d(__webpack_exports__,"ECT_NULL",function(){return ECT_NULL;});__webpack_require__.d(__webpack_exports__,"ECT_LABEL",function(){return ECT_LABEL;});__webpack_require__.d(__webpack_exports__,"ECT_BUTTON",function(){return ECT_BUTTON;});__webpack_require__.d(__webpack_exports__,"ECT_BUTTON_LIST",function(){return ECT_BUTTON_LIST;});__webpack_require__.d(__webpack_exports__,"ECT_CHECK_BOX",function(){return ECT_CHECK_BOX;});__webpack_require__.d(__webpack_exports__,"ECT_SLIDER",function(){return ECT_SLIDER;});__webpack_require__.d(__webpack_exports__,"ECT_SCROLL_BOX",function(){return ECT_SCROLL_BOX;});__webpack_require__.d(__webpack_exports__,"ECT_SUB_CONTROL",function(){return ECT_SUB_CONTROL;});__webpack_require__.d(__webpack_exports__,"ECT_METER",function(){return ECT_METER;});__webpack_require__.d(__webpack_exports__,"ECT_TAB_CONTROL",function(){return ECT_TAB_CONTROL;});__webpack_require__.d(__webpack_exports__,"ECT_PROGRESS_BAR",function(){return ECT_PROGRESS_BAR;});__webpack_require__.d(__webpack_exports__,"ECT_AMOUNT_BUTTON",function(){return ECT_AMOUNT_BUTTON;});__webpack_require__.d(__webpack_exports__,"ECS_NULL",function(){return ECS_NULL;});__webpack_require__.d(__webpack_exports__,"ECS_INIT",function(){return ECS_INIT;});__webpack_require__.d(__webpack_exports__,"ECS_DISABLED",function(){return ECS_DISABLED;});__webpack_require__.d(__webpack_exports__,"ECS_INACTIVE",function(){return ECS_INACTIVE;});__webpack_require__.d(__webpack_exports__,"ECS_ACTIVE",function(){return ECS_ACTIVE;});__webpack_require__.d(__webpack_exports__,"ECS_SELECTED",function(){return ECS_SELECTED;});__webpack_require__.d(__webpack_exports__,"ECAT_NULL",function(){return ECAT_NULL;});__webpack_require__.d(__webpack_exports__,"ECAT_ACTION",function(){return ECAT_ACTION;});__webpack_require__.d(__webpack_exports__,"ECAT_TO_TREE",function(){return ECAT_TO_TREE;});__webpack_require__.d(__webpack_exports__,"ECAT_TO_MENU",function(){return ECAT_TO_MENU;});__webpack_require__.d(__webpack_exports__,"ECAT_BACK",function(){return ECAT_BACK;});__webpack_require__.d(__webpack_exports__,"ECAT_CLOSE",function(){return ECAT_CLOSE;});__webpack_require__.d(__webpack_exports__,"ECAT_CHANGE_FOCUS",function(){return ECAT_CHANGE_FOCUS;});__webpack_require__.d(__webpack_exports__,"ECAT_GAME_STATE_CHANGE",function(){return ECAT_GAME_STATE_CHANGE;});__webpack_require__.d(__webpack_exports__,"ECAT_QUIT_GAME",function(){return ECAT_QUIT_GAME;});__webpack_require__.d(__webpack_exports__,"ECSF_ON_ACTIVE",function(){return ECSF_ON_ACTIVE;});__webpack_require__.d(__webpack_exports__,"ECSF_ON_SELECTED",function(){return ECSF_ON_SELECTED;});__webpack_require__.d(__webpack_exports__,"EO_HORIZONTAL",function(){return EO_HORIZONTAL;});__webpack_require__.d(__webpack_exports__,"EO_VERTICAL",function(){return EO_VERTICAL;});__webpack_require__.d(__webpack_exports__,"EM_NULL",function(){return EM_NULL;});__webpack_require__.d(__webpack_exports__,"EM_HORIZONTAL",function(){return EM_HORIZONTAL;});__webpack_require__.d(__webpack_exports__,"EM_VERTICAL",function(){return EM_VERTICAL;});__webpack_require__.d(__webpack_exports__,"EM_HORIZONTAL_VERTICAL",function(){return EM_HORIZONTAL_VERTICAL;});const DEG_TO_RAD=0.0174532925199432957,RAD_TO_DEG=57.29577951308232,EPSILON=8.854187817e-12,RGB_TO_DEC=0.00390625;const SPRITE_DEFAULT_ID=-1;const OBJECT_DEFAULT_ID=-1;const NODE_DEFAULT_ID=-1;const PARENT_NODE_DEFAULT_ID=-1;const RESET_VELOCITY=true;const EGT_NULL=0,EGT_QUAD=1,EGT_SPRITE_SHEET=2,EGT_SCALED_FRAME=3,EGT_MESH_FILE=4,EGT_FONT=5;const EPT_NULL=0,EPT_PERSPECTIVE=1,EPT_ORTHOGRAPHIC=2;const EHA_HORZ_LEFT=0,EHA_HORZ_CENTER=1,EHA_HORZ_RIGHT=2;const EVA_VERT_TOP=0,EVA_VERT_CENTER=1,EVA_VERT_BOTTOM=2;const CHAR_CODE_SPACE=32,CHAR_CODE_PIPE=124;const EAP_IDLE=0,EAP_DOWN=1,EAP_UP=2;const DEVICE_NULL=-1,KEYBOARD=0,MOUSE=1,GAMEPAD=2;const TRANSLATE=0x01,ROTATE=0x02,SCALE=0x04,CENTER_POINT=0x08,CROP_OFFSET=0x10;const TRANSFORM=0x20,WAS_TRANSFORMED=0x40;const MATRIX_ROTATION=0x80;const VISIBLE=0x100;const SPRITE2D=0x200,ACTOR2D=0x400;const ESSC_DELETE_SPRITE=0,ESSC_CREATE_SPRITE=1,ESSC_DELETE_PHYSICS=2;const EGE_MENU_TRANS_IN=100,EGE_MENU_TRANS_OUT=101,EGE_MENU_ESCAPE_ACTION=102,EGE_MENU_TOGGLE_ACTION=103,EGE_MENU_BACK_ACTION=104,EGE_MENU_TO_TREE=105,EGE_MENU_TO_MENU=106,EGE_MENU_GAME_STATE_CHANGE=107,EGE_MENU_UP_ACTION=108,EGE_MENU_DOWN_ACTION=109,EGE_MENU_LEFT_ACTION=110,EGE_MENU_RIGHT_ACTION=111,EGE_MENU_CONTROL_STATE_CHANGE=112,EGE_MENU_SELECT_ACTION=113,EGE_MENU_SELECT_EXECUTE=114,EGE_MENU_SET_ACTIVE_CONTROL=115,EGE_MENU_REACTIVATE=116,EGE_MENU_SCROLL_UP=117,EGE_MENU_SCROLL_DOWN=118,EGE_MENU_SCROLL_LEFT=119,EGE_MENU_SCROLL_RIGHT=120,EGE_MENU_TAB_LEFT=121,EGE_MENU_TAB_RIGHT=122;const EST_NULL=0,EST_OBJECT2D=1,EST_OBJECT3D=2,EST_SPRITE2D=3,EST_SPRITE3D=4;const ENT_NULL=0,ENT_OBJECT=1,ENT_SPRITE=2,ENT_OBJECT_MULTI_LIST=3,ENT_SPRITE_MULTI_LIST=4,ENT_UI_CONTROL=5;const ESMA_PRESS_TYPE=0,ESMA_DEVICE_TYPE=1,ESMA_MOUSE_X=2,ESMA_MOUSE_Y=3;const EMSC_STATE=0,EMSC_CONTROL=1;const EMTS_INACTIVE=0,EMTS_IDLE=1,EMTS_ACTIVE=2,EMTS_MAX_MENU_TREE_STATES=3;const EMS_INACTIVE=0,EMS_IDLE=1,EMS_ACTIVE=2,EMS_MAX_MENU_STATES=3;const EMNS_NULL=0,EMNS_MOUSE=1,EMNS_GAMEPAD_KEYBAORD=2;const ETC_RESET=0,ETC_BEGIN=1,ETC_END=2;const EAC_NULL=0,EAC_FIRST_ACTIVE_CONTROL=1,EAC_LAST_ACTIVE_CONTROL=2;const EAR_UP=1,EAR_DOWN=2,EAR_LEFT=4,EAR_RIGHT=8;const EDO_NULL=0,EDO_LEFT=1,EDO_RIGHT=2,EDO_HORZ_CENTER=4,EDO_TOP=8,EDO_BOTTOM=16,EDO_VERT_CENTER=32;const ENAV_NODE_UP=0,ENAV_NODE_DOWN=1,ENAV_NODE_LEFT=2,ENAV_NODE_RIGHT=3;const TOGGLE_STATE_ON=true,TOGGLE_STATE_OFF=false;const NO_ACTIVE_CONTROL=-1;const BTN_DEC=0,BTN_INC=1;const ECT_NULL=0,ECT_LABEL=1,ECT_BUTTON=2,ECT_BUTTON_LIST=3,ECT_CHECK_BOX=4,ECT_SLIDER=5,ECT_SCROLL_BOX=6,ECT_SUB_CONTROL=7,ECT_METER=8,ECT_TAB_CONTROL=9,ECT_PROGRESS_BAR=10,ECT_AMOUNT_BUTTON=11;const ECS_NULL=0,ECS_INIT=1,ECS_DISABLED=2,ECS_INACTIVE=3,ECS_ACTIVE=4,ECS_SELECTED=5;const ECAT_NULL=0,ECAT_ACTION=1,ECAT_TO_TREE=2,ECAT_TO_MENU=3,ECAT_BACK=4,ECAT_CLOSE=5,ECAT_CHANGE_FOCUS=6,ECAT_GAME_STATE_CHANGE=7,ECAT_QUIT_GAME=8;const ECSF_ON_ACTIVE=0,ECSF_ON_SELECTED=1;const EO_HORIZONTAL=0,EO_VERTICAL=1;const EM_NULL=0,EM_HORIZONTAL=1,EM_VERTICAL=2,EM_HORIZONTAL_VERTICAL=3;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"textureManager",function(){return textureManager;});var _common_texture__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7);var _system_device__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(8);class TextureManager
{constructor()
{this.textureForMapMap=new Map;this.currentTexture=null;}
load(group,filePath,image)
{if(!image.complete)
throw new Error(`Image file not completely loaded!(${group},${filePath}).`);let groupMap=this.textureForMapMap.get(group);if(groupMap===undefined)
{groupMap=new Map;this.textureForMapMap.set(group,groupMap);}
let texture=groupMap.get(filePath);if(texture===undefined)
{let texture=new _common_texture__WEBPACK_IMPORTED_MODULE_0__["Texture"];texture.id=_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].createTexture();texture.size.w=image.width;texture.size.h=image.height;_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].bindTexture(_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].TEXTURE_2D,texture.id);_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].texParameteri(_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].TEXTURE_2D,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].TEXTURE_WRAP_S,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].CLAMP_TO_EDGE);_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].texParameteri(_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].TEXTURE_2D,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].TEXTURE_WRAP_T,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].CLAMP_TO_EDGE);_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].texParameteri(_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].TEXTURE_2D,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].TEXTURE_MIN_FILTER,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].LINEAR);_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].texParameteri(_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].TEXTURE_2D,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].TEXTURE_MAG_FILTER,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].LINEAR);_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].texImage2D(_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].TEXTURE_2D,0,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].RGBA,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].RGBA,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].UNSIGNED_BYTE,image);_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].bindTexture(_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].TEXTURE_2D,null);groupMap.set(filePath,texture);}
return texture;}
deleteGroup(group)
{let groupMap=this.textureForMapMap.get(group);if(groupMap!==undefined)
{for(let [key,texture] of groupMap.entries())
_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].deleteTexture(texture.id);this.textureForMapMap.delete(group);}
}
getTexture(group,filePath)
{let groupMap=this.textureForMapMap.get(group);if(groupMap!==undefined)
{let texture=groupMap.get(filePath);if(texture!==undefined)
return texture;throw new Error(`Texture does not exists!(${group},${filePath}).`);}
else
{throw new Error(`Texture group does not exists!(${group},${filePath}).`);}
return null;}
bind(textureId)
{if(this.currentTexture!=textureId)
{this.currentTexture=textureId;_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].bindTexture(_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].TEXTURE_2D,textureId);}
}
unbind()
{this.currentTexture=null;_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].bindTexture(_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].TEXTURE_2D,null);}
}
var textureManager=new TextureManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Texture",function(){return Texture;});var _size__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(4);class Texture
{constructor()
{this.id=0;this.type=0;this.size=new _size__WEBPACK_IMPORTED_MODULE_0__["Size"];}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"device",function(){return device;});__webpack_require__.d(__webpack_exports__,"gl",function(){return gl;});var _utilities_settings__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(3);var _utilities_matrix__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(9);class Device
{constructor()
{this.perspectiveMatrix=new _utilities_matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"];this.orthographicMatrix=new _utilities_matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"];this.canvas=null;this.glContext=null;this.create();}
create()
{let parm={premultipliedAlpha:false,alpha:false,stencil:true,preserveDrawingBuffer:true};this.canvas=document.getElementById('game-surface');this.glContext=
this.canvas.getContext('webgl2',parm)||
this.canvas.getContext('webgl',parm)||
this.canvas.getContext('experimental-webgl',parm);if(!this.glContext)
alert('Your browser does not support WebGL');}
createProjMatrix()
{this.perspectiveMatrix.perspectiveFovRH(
_utilities_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].viewAngle,_utilities_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].screenAspectRatio.w,_utilities_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].minZdist,_utilities_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].maxZdist);this.orthographicMatrix.orthographicRH(
_utilities_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].defaultSize.w,_utilities_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].defaultSize.h,_utilities_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].minZdist,_utilities_settings__WEBPACK_IMPORTED_MODULE_0__["settings"].maxZdist);}
}
var device=new Device;var gl=device.glContext;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Matrix",function(){return Matrix;});const NO_ROT=0;const ROT_Z=1;const ROT_Y=2;const ROT_X=4;const ROT_ALL=ROT_Z| ROT_Y| ROT_X;var gTempMatrix=new Float32Array(16);var gTempMergeMatrix=new Float32Array(16);var gSwap=null;class Matrix
{constructor(matrix=null)
{this.matrix=new Float32Array(16);if(matrix===null)
this.initilizeMatrix();else
this.copy(matrix);}
copy(obj)
{let i=this.matrix.length;while(i--)
this.matrix[i]=obj.matrix[i];}
initilizeMatrix()
{this.initIdentityMatrix(this.matrix);}
initIdentityMatrix(mat)
{mat[0]=1.0;mat[1]=0.0;mat[2]=0.0;mat[3]=0.0;mat[4]=0.0;mat[5]=1.0;mat[6]=0.0;mat[7]=0.0;mat[8]=0.0;mat[9]=0.0;mat[10]=1.0;mat[11]=0.0;mat[12]=0.0;mat[13]=0.0;mat[14]=0.0;mat[15]=1.0;}
mergeMatrix(matrix)
{for(let i=0;i<4;++i)
{for(let j=0;j<4;++j)
{gTempMergeMatrix[(i*4)+j]=(this.matrix[i*4]*matrix[j])
+(this.matrix[(i*4)+1]*matrix[4+j])
+(this.matrix[(i*4)+2]*matrix[8+j])
+(this.matrix[(i*4)+3]*matrix[12+j]);}
}
gSwap=this.matrix;this.matrix=gTempMergeMatrix;gTempMergeMatrix=gSwap;}
rotate(point)
{let flags=NO_ROT;this.initIdentityMatrix(gTempMatrix);if(!point.isZEmpty())
{this.rotateZRad(gTempMatrix,point.z,flags);flags|=ROT_Z;}
if(!point.isYEmpty())
{this.rotateYRad(gTempMatrix,point.y,flags);flags|=ROT_Y;}
if(!point.isXEmpty())
{this.rotateXRad(gTempMatrix,point.x,flags);flags|=ROT_X;}
this.mergeMatrix(gTempMatrix);}
rotateZRad(dest,value)
{let cos=Math.cos(value);let sin=Math.sin(value);dest[0]=cos;dest[1]=sin;dest[4]=-sin;dest[5]=cos;}
rotateYRad(dest,value,rotFlags)
{let cos=Math.cos(value);let sin=Math.sin(value);switch(rotFlags)
{case ROT_Z:
{let tmp0,tmp1,tmp8,tmp9;tmp0=dest[0]*cos;tmp1=dest[1]*cos;tmp8=dest[0]*sin;tmp9=dest[1]*sin;dest[0]=tmp0;dest[1]=tmp1;dest[2]=-sin;dest[8]=tmp8;dest[9]=tmp9;dest[10]=cos;break;}
case NO_ROT:
{dest[0]=cos;dest[2]=-sin;dest[8]=sin;dest[10]=cos;break;}
}
}
rotateXRad(dest,value,rotFlags)
{let cos=Math.cos(value);let sin=Math.sin(value);switch(rotFlags)
{case ROT_Z:
{let tmp4,tmp5,tmp8,tmp9;tmp4=dest[4]*cos;tmp5=dest[5]*cos;tmp8=dest[4]*-sin;tmp9=dest[5]*-sin;dest[4]=tmp4;dest[5]=tmp5;dest[6]=sin;dest[8]=tmp8;dest[9]=tmp9;dest[10]=cos;break;}
case ROT_Y:
{let tmp4,tmp6,tmp8,tmp10;tmp4=dest[8]*sin;tmp6=dest[10]*sin;tmp8=dest[8]*cos;tmp10=dest[10]*cos;dest[4]=tmp4;dest[5]=cos;dest[6]=tmp6;dest[8]=tmp8;dest[9]=-sin;dest[10]=tmp10;break;}
case ROT_Z| ROT_Y:
{let tmp4,tmp5,tmp6,tmp8,tmp9,tmp10;tmp4=(dest[4]*cos)+(dest[8]*sin);tmp5=(dest[5]*cos)+(dest[9]*sin);tmp6=dest[10]*sin;tmp8=(dest[4]*-sin)+(dest[8]*cos);tmp9=(dest[5]*-sin)+(dest[9]*cos);tmp10=dest[10]*cos;dest[4]=tmp4;dest[5]=tmp5;dest[6]=tmp6;dest[8]=tmp8;dest[9]=tmp9;dest[10]=tmp10;break;}
case NO_ROT:
{dest[5]=cos;dest[6]=sin;dest[9]=-sin;dest[10]=cos;break;}
}
}
translate(point)
{this.matrix[12]+=point.x;this.matrix[13]+=point.y;this.matrix[14]+=point.z;}
translateSize(size)
{this.matrix[12]+=size.w;this.matrix[13]+=size.h;}
transformPoint(dest,source)
{dest.x=(source.x*this.matrix[0])
+(source.y*this.matrix[4])
+(source.z*this.matrix[8])
+this.matrix[12];dest.y=(source.x*this.matrix[1])
+(source.y*this.matrix[5])
+(source.z*this.matrix[9])
+this.matrix[13];dest.z=(source.x*this.matrix[2])
+(source.y*this.matrix[6])
+(source.z*this.matrix[10])
+this.matrix[14];}
transformRect(dest,source)
{dest.x1=(source.x1*this.matrix[0])
+(source.y1*this.matrix[4])
+this.matrix[12];dest.y1=(source.x1*this.matrix[1])
+(source.y1*this.matrix[5])
+this.matrix[13];dest.x2=(source.x2*this.matrix[0])
+(source.y2*this.matrix[4])
+this.matrix[12];dest.y2=(source.x2*this.matrix[1])
+(source.y2*this.matrix[5])
+this.matrix[13];}
transformQuad(dest,source)
{for(let i=0;i<4;++i)
this.transformPoint(dest.point[i],source.point[i]);}
setScaleFromPoint(point)
{this.matrix[0]*=point.x;this.matrix[5]*=point.y;this.matrix[10]*=point.z;}
setScaleFromSize(size)
{this.matrix[0]*=size.w;this.matrix[5]*=size.h;this.matrix[10]*=1.0;}
setScaleFromValue(scale)
{this.matrix[0]*=scale;this.matrix[5]*=scale;this.matrix[10]*=1.0;}
scaleFromPoint(point)
{this.mergeScale(point.x,point.y,point.z);}
scaleFromSize(size)
{this.mergeScale(size.w,size.h,1.0);}
scaleFromValue(scale)
{this.mergeScale(scale,scale,scale);}
mergeScale(x,y,z)
{this.initIdentityMatrix(gTempMatrix);gTempMatrix[0]=x;gTempMatrix[5]=y;gTempMatrix[10]=z;this.mergeMatrix(gTempMatrix);}
orthographicRH(w,h,zn,zf)
{this.matrix[0]=2/w;this.matrix[5]=2/h;this.matrix[10]=1/(zn-zf);this.matrix[14]=zn/(zn-zf);}
perspectiveFovRH(fovy,aspect,zn,zf)
{let yScale=1/Math.tan(fovy/2);let xScale=yScale/aspect;this.matrix[0]=xScale;this.matrix[5]=yScale;this.matrix[10]=zf/(zn-zf);this.matrix[11]=-1;this.matrix[14]=zn*zf/(zn-zf);}
invertX()
{this.matrix[12]=-this.matrix[12];}
invertY()
{this.matrix[13]=-this.matrix[13];}
invertZ()
{this.matrix[14]=-this.matrix[14];}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"meshManager",function(){return meshManager;});var _system_device__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(8);var _common_point__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(11);var _common_uv__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(12);var _common_meshbinaryfileheader__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(13);var _common_mesh3d__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(14);class MeshManager
{constructor()
{this.meshBufMapMap=new Map;this.counter=0;}
load(group,filePath,binaryData)
{let groupMap=this.meshBufMapMap.get(group);if(groupMap===undefined)
{groupMap=new Map;this.meshBufMapMap.set(group,groupMap);}
let meshGrp=groupMap.get(filePath);if(meshGrp===undefined)
{meshGrp=new _common_mesh3d__WEBPACK_IMPORTED_MODULE_4__["MeshGroup"];groupMap.set(filePath,meshGrp);this.loadData(group,filePath,binaryData,meshGrp);}
return meshGrp;}
loadData(group,filePath,binaryData,meshGrp)
{this.counter=0;let dataView=new DataView(binaryData);let fileHeader=this.loadFileHeader(dataView,group,filePath);this.tagCheck(dataView,(fileHeader.text_count>0),group,filePath);this.loadTexturePaths(dataView,fileHeader,meshGrp);this.tagCheck(dataView,true,group,filePath);let vertAry=[];this.loadVerts(dataView,fileHeader,vertAry);this.tagCheck(dataView,true,group,filePath);let normAry=[];this.loadNormals(dataView,fileHeader,normAry);this.tagCheck(dataView,(fileHeader.uv_count>0),group,filePath);let uvAry=[];this.loadUVs(dataView,fileHeader,uvAry);this.buildMeshes(dataView,group,filePath,fileHeader,meshGrp,vertAry,normAry,uvAry);}
loadFileHeader(dataView,group,filePath)
{let fileHeader=new _common_meshbinaryfileheader__WEBPACK_IMPORTED_MODULE_3__["MeshBinaryFileHeader"];fileHeader.file_header=dataView.getUint32(this.counter,true);this.counter+=4;fileHeader.vert_count=dataView.getUint16(this.counter,true);this.counter+=2;fileHeader.uv_count=dataView.getUint16(this.counter,true);this.counter+=2;fileHeader.vert_norm_count=dataView.getUint16(this.counter,true);this.counter+=2;fileHeader.face_group_count=dataView.getUint16(this.counter,true);this.counter+=2;fileHeader.text_count=dataView.getUint16(this.counter,true);this.counter+=2;fileHeader.joint_count=dataView.getUint16(this.counter,true);this.counter+=2;if(fileHeader.file_header!==_common_meshbinaryfileheader__WEBPACK_IMPORTED_MODULE_3__["MESH_FILE_HEADER"])
throw new Error(`File header mismatch!(${group},${filePath}).`);return fileHeader;}
loadTexturePaths(dataView,fileHeader,meshGrp)
{for(let i=0;i<fileHeader.text_count;++i)
{let uniqueTextAry=new _common_meshbinaryfileheader__WEBPACK_IMPORTED_MODULE_3__["BinaryTexture"];meshGrp.uniqueTexturePathAry.push(uniqueTextAry);uniqueTextAry.type=dataView.getInt8(this.counter,true);this.counter+=1;for(let j=0;j<_common_meshbinaryfileheader__WEBPACK_IMPORTED_MODULE_3__["TEXT_PATH_SIZE"];++j)
{let charCode=dataView.getInt8(this.counter,true);this.counter+=1;if(charCode)
{uniqueTextAry.path+=String.fromCharCode(charCode);}
else
{this.counter+=_common_meshbinaryfileheader__WEBPACK_IMPORTED_MODULE_3__["TEXT_PATH_SIZE"]-j-1;break;}
}
}
}
loadVerts(dataView,fileHeader,vertAry)
{for(let i=0;i<fileHeader.vert_count;++i)
{let data=[0,0,0];vertAry.push(data);for(let j=0;j<3;++j)
{data[j]=dataView.getFloat32(this.counter,true);this.counter+=4;}
}
}
loadNormals(dataView,fileHeader,normAry)
{for(let i=0;i<fileHeader.vert_norm_count;++i)
{let data=[0,0,0];normAry.push(data);for(let j=0;j<3;++j)
{data[j]=dataView.getFloat32(this.counter,true);this.counter+=4;}
}
}
loadUVs(dataView,fileHeader,uvAry)
{for(let i=0;i<fileHeader.uv_count;++i)
{let data=[0,0];uvAry.push(data);for(let j=0;j<2;++j)
{data[j]=dataView.getFloat32(this.counter,true);this.counter+=4;}
}
}
buildMeshes(dataView,group,filePath,fileHeader,meshGrp,vertAry,normAry,uvAry)
{let faceGroup=new _common_meshbinaryfileheader__WEBPACK_IMPORTED_MODULE_3__["BinaryFaceGroup"];for(let i=0;i<fileHeader.face_group_count;++i)
{this.tagCheck(dataView,true,group,filePath);let mesh=new _common_mesh3d__WEBPACK_IMPORTED_MODULE_4__["Mesh"];meshGrp.meshAry.push(mesh);faceGroup.groupFaceCount=dataView.getUint16(this.counter,true);this.counter+=2;faceGroup.vertexBufCount=dataView.getUint16(this.counter,true);this.counter+=2;faceGroup.indexBufCount=dataView.getUint16(this.counter,true);this.counter+=2;faceGroup.textureCount=dataView.getUint16(this.counter,true);this.counter+=2;for(let j=0;j<faceGroup.textureCount;++j)
{mesh.textureIndexAry.push(dataView.getUint16(this.counter,true));this.counter+=2;}
let vertBufAry=[];for(let j=0;j<faceGroup.vertexBufCount;++j)
{let binaryVertex=new _common_meshbinaryfileheader__WEBPACK_IMPORTED_MODULE_3__["BinaryVertex"];vertBufAry.push(binaryVertex);binaryVertex.vert=dataView.getUint16(this.counter,true);this.counter+=2;binaryVertex.norm=dataView.getUint16(this.counter,true);this.counter+=2;if(fileHeader.uv_count)
{binaryVertex.uv=dataView.getUint16(this.counter,true);this.counter+=2;}
}
let iboAry=[];for(let j=0;j<faceGroup.indexBufCount;++j)
{iboAry.push(dataView.getUint16(this.counter,true));this.counter+=2;}
let vboAry=[];for(let j=0;j<faceGroup.vertexBufCount;++j)
{Array.prototype.push.apply(vboAry,vertAry[vertBufAry[j].vert]);Array.prototype.push.apply(vboAry,normAry[vertBufAry[j].norm]);if(fileHeader.uv_count)
Array.prototype.push.apply(vboAry,uvAry[vertBufAry[j].uv]);}
mesh.vbo=_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].createBuffer();_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ARRAY_BUFFER,mesh.vbo);_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bufferData(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ARRAY_BUFFER,new Float32Array(vboAry),_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].STATIC_DRAW);_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ARRAY_BUFFER,null);mesh.ibo=_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].createBuffer();_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ELEMENT_ARRAY_BUFFER,mesh.ibo);_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bufferData(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ELEMENT_ARRAY_BUFFER,new Uint16Array(iboAry),_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].STATIC_DRAW);_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ELEMENT_ARRAY_BUFFER,null);mesh.iboCount=faceGroup.indexBufCount;}
}
tagCheck(dataView,allowCheck,group,filePath)
{if(allowCheck)
{let tag=dataView.getUint32(this.counter,true);this.counter+=4;if(tag!==_common_meshbinaryfileheader__WEBPACK_IMPORTED_MODULE_3__["TAG_CHECK"])
throw new Error(`Tag check mismatch!(${group},${filePath}).`);}
}
deleteGroup(group)
{let groupMap=this.meshBufMapMap.get(group);if(groupMap!==undefined)
{for(let [key,meshGrp] of groupMap.entries())
{for(let i=0;i<meshGrp.meshAry.length;++i)
{_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].deleteBuffer(meshGrp.meshAry[i].vbo);_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].deleteBuffer(meshGrp.meshAry[i].ibo);}
}
this.meshBufMapMap.delete(group);}
}
}
var meshManager=new MeshManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Point",function(){return Point;});var _common_defs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(5);class Point
{constructor(x=0,y=0,z=0)
{this.data=new Float32Array([x,y,z]);}
set x(value){this.data[0]=value;}
get x(){return this.data[0];}
set y(value){this.data[1]=value;}
get y(){return this.data[1];}
set z(value){this.data[2]=value;}
get z(){return this.data[2];}
copy(obj)
{this.data[0]=obj.data[0];this.data[1]=obj.data[1];this.data[2]=obj.data[2];}
convertToRads()
{this.x*=_common_defs__WEBPACK_IMPORTED_MODULE_0__["DEG_TO_RAD"];this.y*=_common_defs__WEBPACK_IMPORTED_MODULE_0__["DEG_TO_RAD"];this.z*=_common_defs__WEBPACK_IMPORTED_MODULE_0__["DEG_TO_RAD"];}
setXYZ(x=0,y=0,z=0)
{this.data[0]=x;this.data[1]=y;this.data[2]=z;}
set(point)
{this.data[0]=point.data[0];this.data[1]=point.data[1];this.data[2]=point.data[2];}
incXYZ(x=0,y=0,z=0)
{this.data[0]+=x;this.data[1]+=y;this.data[2]+=z;}
inc(point)
{this.data[0]+=point.data[0];this.data[1]+=point.data[1];this.data[2]+=point.data[2];}
cap(value)
{if(value>0)
{if(this.x>value)
{this.x-=value;}
else if(this.x<0)
{this.x+=value;}
if(this.y>value)
{this.y-=value;}
else if(this.y<0)
{this.y+=value;}
if(this.z>value)
{this.z-=value;}
else if(this.z<0)
{this.z+=value;}
}
else
{if(this.x>value)
{this.x+=value;}
else if(this.x<0)
{this.x-=value;}
if(this.y>value)
{this.y+=value;}
else if(this.y<0)
{this.y-=value;}
if(this.z>value)
{this.z+=value;}
else if(this.z<0)
{this.z-=value;}
}
}
getInvert()
{return new Point(-this.data[0],-this.data[1],-this.data[2]);}
invert()
{this.data[0]=-this.data[0];this.data[1]=-this.data[1];this.data[2]=-this.data[2];}
isEmpty()
{if((this.x==0)&&(this.y==0)&&(this.z==0))
return true;return false;}
isXEmpty()
{return(0===this.x);}
isYEmpty()
{return(0===this.y);}
isZEmpty()
{return(0===this.z);}
isEquilXYZ(x,y,z)
{if(this.data[0]===x)
{if(this.data[1]===y)
{if(this.data[2]===z)
{return true;}
}
}
return false;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"UV",function(){return UV;});class UV
{constructor(u=0,v=0)
{this.data=new Float32Array([u,v]);}
set u(value){this.data[0]=value;}
get u(){return this.data[0];}
set v(value){this.data[1]=value;}
get v(){return this.data[1];}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"MESH_FILE_HEADER",function(){return MESH_FILE_HEADER;});__webpack_require__.d(__webpack_exports__,"TAG_CHECK",function(){return TAG_CHECK;});__webpack_require__.d(__webpack_exports__,"TEXT_PATH_SIZE",function(){return TEXT_PATH_SIZE;});__webpack_require__.d(__webpack_exports__,"JOINT_NAME_SIZE",function(){return JOINT_NAME_SIZE;});__webpack_require__.d(__webpack_exports__,"MeshBinaryFileHeader",function(){return MeshBinaryFileHeader;});__webpack_require__.d(__webpack_exports__,"BinaryTexture",function(){return BinaryTexture;});__webpack_require__.d(__webpack_exports__,"BinaryFaceGroup",function(){return BinaryFaceGroup;});__webpack_require__.d(__webpack_exports__,"BinaryFace",function(){return BinaryFace;});__webpack_require__.d(__webpack_exports__,"BinaryVertex",function(){return BinaryVertex;});const MESH_FILE_HEADER=0x415382AE;const TAG_CHECK=0x6A82Fc4d;const TEXT_PATH_SIZE=128;const JOINT_NAME_SIZE=20;class MeshBinaryFileHeader
{constructor()
{this.file_header=0;this.vert_count=0;this.uv_count=0;this.vert_norm_count=0;this.face_group_count=0;this.text_count=0;this.joint_count=0;}
}
class BinaryTexture
{constructor()
{this.type=0;this.path='';}
};class BinaryFaceGroup
{constructor()
{this.groupFaceCount=0;this.vertexBufCount=0;this.indexBufCount=0;this.textureCount=0;}
};class BinaryFace
{constructor()
{this.vert=[];this.norm=[];this.uv=[];}
};class BinaryVertex
{constructor()
{this.vert=0;this.norm=0;this.uv=0;}
};}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"MeshGroup",function(){return MeshGroup;});__webpack_require__.d(__webpack_exports__,"Mesh",function(){return Mesh;});class MeshGroup
{constructor()
{this.uniqueTexturePathAry=[];this.meshAry=[];}
}
class Mesh
{constructor()
{this.textureIndexAry=[];this.textureAry=[];this.vbo=null;this.ibo=null;this.iboCount=0;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"vertexBufferManager",function(){return vertexBufferManager;});var _system_device__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(8);var _common_point__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(11);var _common_size__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4);var _common_quad2d__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(16);class VertexBufferManager
{constructor()
{this.vertexBufMapMap=new Map;this.indexBufMapMap=new Map;this.currentVBO=null;this.currentIBO=null;this.currentMaxFontIndices=0;}
createVBO(group,name,vertAry)
{let groupMap=this.vertexBufMapMap.get(group);if(groupMap===undefined)
{groupMap=new Map;this.vertexBufMapMap.set(group,groupMap);}
let vboID=groupMap.get(name);if(vboID===undefined)
{vboID=_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].createBuffer();_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ARRAY_BUFFER,vboID);_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bufferData(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ARRAY_BUFFER,new Float32Array(vertAry),_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].STATIC_DRAW);_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ARRAY_BUFFER,null);groupMap.set(name,vboID);}
return vboID;}
createIBO(group,name,indexAry,intAs8bit)
{let groupMap=this.indexBufMapMap.get(group);if(groupMap===undefined)
{groupMap=new Map;this.indexBufMapMap.set(group,groupMap);}
let iboID=groupMap.get(name);if(iboID===undefined)
{iboID=_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].createBuffer();_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ELEMENT_ARRAY_BUFFER,iboID);if(intAs8bit)
_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bufferData(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ELEMENT_ARRAY_BUFFER,new Uint8Array(indexAry),_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].STATIC_DRAW);else
_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bufferData(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ELEMENT_ARRAY_BUFFER,new Uint16Array(indexAry),_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].STATIC_DRAW);_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ELEMENT_ARRAY_BUFFER,null);groupMap.set(name,iboID);}
return iboID;}
createDynamicFontIBO(group,name,indexAry,maxIndicies)
{let groupMap=this.indexBufMapMap.get(group);if(groupMap===undefined)
{groupMap=new Map;this.indexBufMapMap.set(group,groupMap);}
let iboID=groupMap.get(name);if(iboID===undefined)
{iboID=_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].createBuffer();groupMap.set(name,iboID);} 
if(maxIndicies>this.currentMaxFontIndices)
{_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ELEMENT_ARRAY_BUFFER,iboID);_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bufferData(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ELEMENT_ARRAY_BUFFER,new Uint16Array(indexAry),_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].STATIC_DRAW);_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ELEMENT_ARRAY_BUFFER,null);this.currentMaxFontIndices=maxIndicies;}
return iboID;}
createScaledFrame(group,name,scaledFrame,textureSize,glyphSize,frameSize,spriteSheetOffset,meshFileVertAry=null)
{let groupMap=this.vertexBufMapMap.get(group);if(groupMap===undefined)
{groupMap=new Map;this.vertexBufMapMap.set(group,groupMap);}
let vboID=groupMap.get(name);if(vboID===undefined)
{let vertAry=[];this.generateScaledFrame(vertAry,scaledFrame,textureSize,glyphSize,frameSize,spriteSheetOffset);if(meshFileVertAry!==null)
Array.prototype.push.apply(vertAry,meshFileVertAry);vboID=_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].createBuffer();_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ARRAY_BUFFER,vboID);_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bufferData(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ARRAY_BUFFER,new Float32Array(vertAry),_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].STATIC_DRAW);_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ARRAY_BUFFER,null);groupMap.set(name,vboID);}
return vboID;}
generateScaledFrame(vertAry,scaledFrame,textureSize,glyphSize,frameSize,spriteSheetOffset)
{let center=new _common_point__WEBPACK_IMPORTED_MODULE_1__["Point"](frameSize.w/2,frameSize.h/2);let frameLgth=new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](frameSize.w-(scaledFrame.frame.w*2.0),frameSize.h-(scaledFrame.frame.h*2.0));let uvLgth=new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](glyphSize.w-(scaledFrame.frame.w*2.0),glyphSize.h-(scaledFrame.frame.h*2.0));let quadBuf=[new _common_quad2d__WEBPACK_IMPORTED_MODULE_3__["Quad2d"],new _common_quad2d__WEBPACK_IMPORTED_MODULE_3__["Quad2d"],new _common_quad2d__WEBPACK_IMPORTED_MODULE_3__["Quad2d"],new _common_quad2d__WEBPACK_IMPORTED_MODULE_3__["Quad2d"],new _common_quad2d__WEBPACK_IMPORTED_MODULE_3__["Quad2d"],new _common_quad2d__WEBPACK_IMPORTED_MODULE_3__["Quad2d"],new _common_quad2d__WEBPACK_IMPORTED_MODULE_3__["Quad2d"],new _common_quad2d__WEBPACK_IMPORTED_MODULE_3__["Quad2d"]];this.createQuad(
new _common_point__WEBPACK_IMPORTED_MODULE_1__["Point"](-center.x,center.y-scaledFrame.frame.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,-frameLgth.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](0,scaledFrame.frame.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,uvLgth.h),textureSize,frameSize,spriteSheetOffset,quadBuf[0]);this.createQuad(
new _common_point__WEBPACK_IMPORTED_MODULE_1__["Point"](-center.x,center.y),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,-scaledFrame.frame.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](0,0),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,scaledFrame.frame.h),textureSize,frameSize,spriteSheetOffset,quadBuf[1]);this.createQuad(
new _common_point__WEBPACK_IMPORTED_MODULE_1__["Point"](-(center.x-scaledFrame.frame.w),center.y),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](frameLgth.w,-scaledFrame.frame.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,0),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](uvLgth.w,scaledFrame.frame.h),textureSize,frameSize,spriteSheetOffset,quadBuf[2]);this.createQuad(
new _common_point__WEBPACK_IMPORTED_MODULE_1__["Point"](center.x-scaledFrame.frame.w,center.y),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,-scaledFrame.frame.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w+uvLgth.w,0),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,scaledFrame.frame.h),textureSize,frameSize,spriteSheetOffset,quadBuf[3]);this.createQuad(
new _common_point__WEBPACK_IMPORTED_MODULE_1__["Point"](center.x-scaledFrame.frame.w,center.y-scaledFrame.frame.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,-frameLgth.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w+uvLgth.w,scaledFrame.frame.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,uvLgth.h),textureSize,frameSize,spriteSheetOffset,quadBuf[4]);this.createQuad(
new _common_point__WEBPACK_IMPORTED_MODULE_1__["Point"](center.x-scaledFrame.frame.w,-(center.y-scaledFrame.frame.h)),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,-scaledFrame.frame.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w+uvLgth.w,scaledFrame.frame.h+uvLgth.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,scaledFrame.frame.h),textureSize,frameSize,spriteSheetOffset,quadBuf[5]);this.createQuad(
new _common_point__WEBPACK_IMPORTED_MODULE_1__["Point"](-(center.x-scaledFrame.frame.w),-(center.y-scaledFrame.frame.h)),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](frameLgth.w,-scaledFrame.frame.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,scaledFrame.frame.h+uvLgth.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](uvLgth.w,scaledFrame.frame.h),textureSize,frameSize,spriteSheetOffset,quadBuf[6]);this.createQuad(
new _common_point__WEBPACK_IMPORTED_MODULE_1__["Point"](-center.x,-(center.y-scaledFrame.frame.h)),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,-scaledFrame.frame.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](0,scaledFrame.frame.h+uvLgth.h),new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](scaledFrame.frame.w,scaledFrame.frame.h),textureSize,frameSize,spriteSheetOffset,quadBuf[7]);Array.prototype.push.apply(vertAry,quadBuf[0].vert[0].data);Array.prototype.push.apply(vertAry,quadBuf[0].vert[1].data);Array.prototype.push.apply(vertAry,quadBuf[0].vert[2].data);Array.prototype.push.apply(vertAry,quadBuf[0].vert[3].data);Array.prototype.push.apply(vertAry,quadBuf[1].vert[1].data);Array.prototype.push.apply(vertAry,quadBuf[1].vert[2].data);Array.prototype.push.apply(vertAry,quadBuf[2].vert[1].data);Array.prototype.push.apply(vertAry,quadBuf[2].vert[3].data);Array.prototype.push.apply(vertAry,quadBuf[3].vert[1].data);Array.prototype.push.apply(vertAry,quadBuf[3].vert[3].data);Array.prototype.push.apply(vertAry,quadBuf[4].vert[0].data);Array.prototype.push.apply(vertAry,quadBuf[4].vert[3].data);Array.prototype.push.apply(vertAry,quadBuf[5].vert[0].data);Array.prototype.push.apply(vertAry,quadBuf[5].vert[3].data);Array.prototype.push.apply(vertAry,quadBuf[6].vert[0].data);Array.prototype.push.apply(vertAry,quadBuf[7].vert[0].data);}
createQuad(vert,vSize,uv,uvSize,textureSize,frameSize,spriteSheetOffset,quadBuf)
{let additionalOffsetX=0;if(Math.trunc(frameSize.w)& 1!==0)
additionalOffsetX=0.5;let additionalOffsetY=0;if(Math.trunc(frameSize.h)& 2!==0)
additionalOffsetY=0.5;quadBuf.vert[0].x=vert.x+additionalOffsetX;quadBuf.vert[0].y=vert.y+additionalOffsetY+vSize.h;quadBuf.vert[0].u=spriteSheetOffset.x1+(uv.u/textureSize.w);quadBuf.vert[0].v=spriteSheetOffset.y1+((uv.v+uvSize.h)/textureSize.h);quadBuf.vert[1].x=vert.x+additionalOffsetX+vSize.w;quadBuf.vert[1].y=vert.y+additionalOffsetY;quadBuf.vert[1].u=spriteSheetOffset.x1+((uv.u+uvSize.w)/textureSize.w);quadBuf.vert[1].v=spriteSheetOffset.y1+(uv.v/textureSize.h);quadBuf.vert[2].x=quadBuf.vert[0].x;quadBuf.vert[2].y=quadBuf.vert[1].y;quadBuf.vert[2].u=quadBuf.vert[0].u;quadBuf.vert[2].v=quadBuf.vert[1].v;quadBuf.vert[3].x=quadBuf.vert[1].x;quadBuf.vert[3].y=quadBuf.vert[0].y;quadBuf.vert[3].u=quadBuf.vert[1].u;quadBuf.vert[3].v=quadBuf.vert[0].v;}
deleteGroup(group)
{let groupMap=this.vertexBufMapMap.get(group);if(groupMap!==undefined)
{for(let [key,vboID] of groupMap.entries())
_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].deleteBuffer(vboID);this.vertexBufMapMap.delete(group);}
groupMap=this.indexBufMapMap.get(group);if(groupMap!==undefined)
{for(let [key,iboID] of groupMap.entries())
_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].deleteBuffer(iboID);this.indexBufMapMap.delete(group);}
}
isVBO(group,name)
{let groupMap=this.vertexBufMapMap.get(group);if(groupMap===undefined)
return null;let vboId=groupMap.get(name);if(vboId===undefined)
return null;return vboId;}
bind(vbo,ibo)
{if(this.currentVBO!=vbo)
{this.currentVBO=vbo;_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ARRAY_BUFFER,vbo);}
if(this.currentIBO!=ibo)
{this.currentIBO=ibo;_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ELEMENT_ARRAY_BUFFER,ibo);}
}
unbind()
{this.currentVBO=null;this.currentIBO=null;_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ARRAY_BUFFER,null);_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_0__["gl"].ELEMENT_ARRAY_BUFFER,null);}
}
var vertexBufferManager=new VertexBufferManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Quad2d",function(){return Quad2d;});var _common_vertex2d__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(17);class Quad2d
{constructor()
{this.vert=[new _common_vertex2d__WEBPACK_IMPORTED_MODULE_0__["Vertex2d"],new _common_vertex2d__WEBPACK_IMPORTED_MODULE_0__["Vertex2d"],new _common_vertex2d__WEBPACK_IMPORTED_MODULE_0__["Vertex2d"],new _common_vertex2d__WEBPACK_IMPORTED_MODULE_0__["Vertex2d"]];}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Vertex2d",function(){return Vertex2d;});class Vertex2d
{constructor(x=0,y=0,z=0,u=0,v=0)
{this.data=[x,y,z,u,v];}
set x(value){this.data[0]=value;}
get x(){return this.data[0];}
set y(value){this.data[1]=value;}
get y(){return this.data[1];}
set z(value){this.data[2]=value;}
get z(){return this.data[2];}
set u(value){this.data[3]=value;}
get u(){return this.data[3];}
set v(value){this.data[4]=value;}
get v(){return this.data[4];}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"downloadFile",function(){return downloadFile;});__webpack_require__.d(__webpack_exports__,"countStrOccurrence",function(){return countStrOccurrence;});__webpack_require__.d(__webpack_exports__,"modulus",function(){return modulus;});__webpack_require__.d(__webpack_exports__,"randomInt",function(){return randomInt;});__webpack_require__.d(__webpack_exports__,"randomArbitrary",function(){return randomArbitrary;});__webpack_require__.d(__webpack_exports__,"shuffle",function(){return shuffle;});var _managers_signalmanager__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2);var sessionCacheBustNo=Math.random();function downloadFile(fileType,filepath,callback)
{let request=null;if(fileType!=='img')
request=new XMLHttpRequest();if(fileType==='xml')
{request.responseType='document';request.overrideMimeType('text/xml');}
else if(fileType==='txt')
{request.responseType='text';request.overrideMimeType('text/plain');}
else if(fileType==='binary')
{request.responseType='arraybuffer';}
else if(fileType==='img')
{}
if(request)
{request.onreadystatechange=
function()
{if(this.readyState===4)
{if((this.status>=200 && this.status<300)|| this.status===304)
{if(fileType==='xml' && this.responseXML)
callback(this.responseXML.childNodes[0]);else if(fileType==='txt' && this.responseText)
callback(this.responseText);else if(fileType==='binary' && this.response)
callback(this.response);else
console.log(`Error Loading:${filepath}`);_managers_signalmanager__WEBPACK_IMPORTED_MODULE_0__["signalManager"].broadcast_loadComplete();}
else
{throw new Error(`HTTP Request failed(${filepath}).`);}
}
}
request.open('GET',filepath+'?cache_buster='+sessionCacheBustNo,true);request.send();}
else
{let image=new Image();image.onload=()=>{callback(image);_managers_signalmanager__WEBPACK_IMPORTED_MODULE_0__["signalManager"].broadcast_loadComplete();}
image.onerror=(event)=>{throw new Error(`Error downloading file(${filepath})!`);}
image.src=filepath;}
}
function countStrOccurrence(searchStr,subStr)
{let result=0;let found=-1;do
{found=searchStr.indexOf(subStr,found+1);if(found!=-1)
++result;}
while(found!=-1);return result;}
function modulus(v1,v2)
{return(v1-v2*Math.floor(v1/v2));}
function randomInt(min,max)
{min=Math.ceil(min);max=Math.floor(max);return Math.floor(Math.random()*(max-min+1))+min;}
function randomArbitrary(min,max)
{return Math.floor(Math.random()*(max-min))+min;}
function shuffle(array)
{if(array.length>2)
{let currentIndex=array.length,temp,randomIndex;let oldLastElement=array[array.length-1];while(0!==currentIndex)
{randomIndex=Math.floor(Math.random()*currentIndex);currentIndex-=1;temp=array[currentIndex];array[currentIndex]=array[randomIndex];array[randomIndex]=temp;}
if(oldLastElement===array[0])
{randomIndex=Math.trunc(array.length/2);array[0]=array[randomIndex];array[randomIndex]=oldLastElement;}
}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"shaderManager",function(){return shaderManager;});var _common_shaderdata__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(20);var _system_device__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(8);var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(18);class ShaderManager
{constructor()
{this.shaderMap=new Map;this.currentShaderData=null;this.currentAttributeCount=0;this.loadCompleteCallback=null;this.loadCounter=0;this.initShaderCallback=null;}
load(filePath,callback)
{_utilities_genfunc__WEBPACK_IMPORTED_MODULE_2__["downloadFile"]('xml',filePath,(xmlNode)=>this.loadFromNode(xmlNode,callback));}
loadFromNode(xmlNode,callback)
{if(xmlNode)
{let shader=xmlNode.getElementsByTagName('shader');if(shader)
{this.loadCompleteCallback=callback;for(let i=0;i<shader.length;++i)
{++this.loadCounter;this.createShader(shader[i]);}
}
}
else
callback();}
createShader(node)
{let shaderTxtId=node.getAttribute('Id');let vertexNode=node.getElementsByTagName('vertDataLst');let fragmentNode=node.getElementsByTagName('fragDataLst');if(this.shaderMap.has(shaderTxtId))
throw new Error(`Shader of this name already exists(${shaderTxtId}).`);let shaderData=new _common_shaderdata__WEBPACK_IMPORTED_MODULE_0__["ShaderData"];this.shaderMap.set(shaderTxtId,shaderData);_utilities_genfunc__WEBPACK_IMPORTED_MODULE_2__["downloadFile"]('txt',vertexNode[0].getAttribute('file'),(vertText)=>
{this.create(_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].VERTEX_SHADER,shaderData,shaderTxtId,vertText);_utilities_genfunc__WEBPACK_IMPORTED_MODULE_2__["downloadFile"]('txt',fragmentNode[0].getAttribute('file'),(fragText)=>
{this.create(_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].FRAGMENT_SHADER,shaderData,shaderTxtId,fragText);this.createProgram(shaderData);this.locateShaderVariables(shaderData,vertexNode[0].getElementsByTagName('dataType'),fragmentNode[0].getElementsByTagName('dataType'));this.initShaderCallback(shaderTxtId);--this.loadCounter;if(this.loadCounter===0)
this.loadCompleteCallback();});});}
create(shaderType,shaderData,shaderTxtId,shaderTxt)
{let id=_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].createShader(shaderType);if(id===0)
throw new Error(`Error creating shader(${shaderTxtId}).`);_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].shaderSource(id,shaderTxt);_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].compileShader(id);if(!_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].getShaderParameter(id,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].COMPILE_STATUS))
throw new Error(`ERROR compiling shader!(${_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].getShaderInfoLog(id)}).`);if(shaderType===_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].VERTEX_SHADER)
shaderData.vertexId=id;else
shaderData.fragmentId=id;}
createProgram(shaderData)
{shaderData.programId=_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].createProgram();_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].attachShader(shaderData.programId,shaderData.vertexId);_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].attachShader(shaderData.programId,shaderData.fragmentId);_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].linkProgram(shaderData.programId);if(!_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].getProgramParameter(shaderData.programId,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].LINK_STATUS))
throw new Error(`ERROR linking program!(${_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].getProgramInfoLog(shaderData.programId)}).`);_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].validateProgram(shaderData.programId);if(!_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].getProgramParameter(shaderData.programId,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].VALIDATE_STATUS))
throw new Error(`ERROR validating program!(${_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].getProgramInfoLog(shaderData.programId)}).`);}
locateShaderVariables(shaderData,vertNode,fragNode)
{for(let i=0;i<vertNode.length;++i)
{let name=vertNode[i].getAttribute('name');if(vertNode[i].getAttribute('location'))
{shaderData.locationMap.set(name,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].getAttribLocation(shaderData.programId,name));++shaderData.attributeCount;}
else
{shaderData.locationMap.set(name,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].getUniformLocation(shaderData.programId,name));}
}
for(let i=0;i<fragNode.length;++i)
{let name=fragNode[i].getAttribute('name');shaderData.locationMap.set(name,_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].getUniformLocation(shaderData.programId,name));}
}
bind(shaderData)
{if(this.currentShaderData!=shaderData)
{let gl=_system_device__WEBPACK_IMPORTED_MODULE_1__["device"].glContext;if(this.currentShaderData===null)
{this.currentAttributeCount=shaderData.attributeCount;for(let i=0;i<this.currentAttributeCount;++i)
gl.enableVertexAttribArray(i);}
else if(this.currentAttributeCount!=shaderData.attributeCount)
{if(this.currentAttributeCount<shaderData.attributeCount)
{for(let i=this.currentAttributeCount;i<shaderData.attributeCount;++i)
gl.enableVertexAttribArray(i);}
else
{for(let i=shaderData.attributeCount;i<this.currentAttributeCount;++i)
gl.disableVertexAttribArray(i);}
this.currentAttributeCount=shaderData.attributeCount;}
this.currentShaderData=shaderData;gl.useProgram(shaderData.programId);}
}
unbind()
{for(let i=0;i<this.currentAttributeCount;++i)
_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].disableVertexAttribArray(i);this.currentShaderData=null;this.currentAttributeCount=0;_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].useProgram(null);}
getShaderData(shaderId)
{let shader=this.shaderMap.get(shaderId);if(shader!==undefined)
return shader;else
throw new Error(`ERROR Shader has not been created!(${shaderId}).`);return null;}
setShaderValue4fv(shaderId,locationId,data)
{let shaderData=this.getShaderData(shaderId);if(shaderData.hasLocation(locationId))
{let location=shaderData.getLocation(locationId);this.bind(shaderData);_system_device__WEBPACK_IMPORTED_MODULE_1__["gl"].uniform4fv(location,data);this.unbind();}
}
setAllShaderValue4fv(locationId,data)
{for(let [key,shaderData] of this.shaderMap.entries())
this.setShaderValue4fv(key,locationId,data);}
}
var shaderManager=new ShaderManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ShaderData",function(){return ShaderData;});class ShaderData
{constructor()
{this.programId=0;this.vertexId=0;this.fragmentId=0;this.attributeCount=0;this.locationMap=new Map;}
getLocation(id)
{let loc=this.locationMap.get(id);if(loc!==undefined)
return loc;else
throw new Error('ERROR Shader variable location does not exist!('+id+').');return null;}
hasLocation(id)
{return this.locationMap.has(id);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"StartUpState",function(){return StartUpState;});var _gamestate__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(22);var _library_managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(19);var _library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(25);var _library_managers_texturemanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(6);var _library_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(15);var _library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(26);var _library_managers_fontmanager__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(27);var _library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(30);var _library_managers_actionmanager__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(47);var _library_gui_menumanager__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(49);var _library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(89);var _library_managers_cameramanager__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(88);var _library_managers_signalmanager__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(2);var _library_managers_soundmanager__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(90);var _library_managers_spritesheetmanager__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(32);var _library_physics_physicsworldmanager__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(66);var _library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(93);var _library_strategy_strategyloader__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(94);var _library_system_device__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(8);var _library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(68);var _library_utilities_assetholder__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(39);var _library_gui_uiprogressbar__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(86);var _library_script_scriptcomponent__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__(70);var _library_strategy_actorstrategy__WEBPACK_IMPORTED_MODULE_23__=__webpack_require__(95);var _state_titlescreenstate__WEBPACK_IMPORTED_MODULE_24__=__webpack_require__(107);var _scripts_utilityscripts__WEBPACK_IMPORTED_MODULE_25__=__webpack_require__(109);var _scripts_statescripts__WEBPACK_IMPORTED_MODULE_26__=__webpack_require__(110);var _scripts_menuscripts__WEBPACK_IMPORTED_MODULE_27__=__webpack_require__(111);var _statedefs__WEBPACK_IMPORTED_MODULE_28__=__webpack_require__(24);const STARTUP_ASSET_COUNT=52,MIN_LOAD_TIME=1500;class StartUpState extends _gamestate__WEBPACK_IMPORTED_MODULE_0__["GameState"]
{constructor(gameLoopCallback)
{super(_statedefs__WEBPACK_IMPORTED_MODULE_28__["EGS_STARTUP"],_statedefs__WEBPACK_IMPORTED_MODULE_28__["EGS_TITLE_SCREEN"],gameLoopCallback);_scripts_utilityscripts__WEBPACK_IMPORTED_MODULE_25__["loadScripts"]();_scripts_statescripts__WEBPACK_IMPORTED_MODULE_26__["loadScripts"]();this.scriptComponent=new _library_script_scriptcomponent__WEBPACK_IMPORTED_MODULE_22__["ScriptComponent"];this.scriptComponent.set(_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_2__["scriptManager"].get('ScreenFade')(0,1,500));this.preload();}
preload()
{let groupAry=['(startup)'];_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__["shaderManager"].load('data/shaders/shader.cfg',callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__["objectDataManager"].loadListTable('data/objects/2d/objectDataList/dataListTable.lst',callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__["objectDataManager"].loadXMLGroup2D(groupAry,callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__["objectDataManager"].loadAssets2D(groupAry,callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__["objectDataManager"].createFromData(groupAry,callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_managers_cameramanager__WEBPACK_IMPORTED_MODULE_11__["cameraManager"].load('data/objects/camera.lst',callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_16__["strategyManager"].loadListTable('data/objects/strategy/strageyListTable.lst',callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_16__["strategyManager"].addStrategy('_startup_',new _library_strategy_actorstrategy__WEBPACK_IMPORTED_MODULE_23__["ActorStrategy"],callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_strategy_strategyloader__WEBPACK_IMPORTED_MODULE_17__["strategyLoader"].load('data/objects/strategy/state/startup.loader',this.preloadComplete.bind(this)));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].load();}
preloadComplete()
{this.camera=_library_managers_cameramanager__WEBPACK_IMPORTED_MODULE_11__["cameraManager"].getDefault();this.progressBar=_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_16__["strategyManager"].get('_startup_').get('UIProgressBar').getControl();this.progressBar.setProgressBarMax(STARTUP_ASSET_COUNT);_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_16__["strategyManager"].activateStrategy('_startup_');_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_19__["highResTimer"].calcElapsedTime();requestAnimationFrame(this.callback);}
handleEvent(event)
{if(event instanceof CustomEvent)
{if(event.detail.type===_statedefs__WEBPACK_IMPORTED_MODULE_28__["ESE_FADE_IN_COMPLETE"])
{this.assetLoad();}
else if(event.detail.type===_statedefs__WEBPACK_IMPORTED_MODULE_28__["ESE_FADE_OUT_COMPLETE"])
{this.stateChange=true;}
else if(event.detail.type===_statedefs__WEBPACK_IMPORTED_MODULE_28__["ESE_ASSET_LOAD_COMPLETE"])
{let loadTime=_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_19__["highResTimer"].timerStop();if(loadTime>MIN_LOAD_TIME)
this.scriptComponent.set(_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_2__["scriptManager"].get('ScreenFade')(1,0,500));else
setTimeout(()=>this.scriptComponent.set(_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_2__["scriptManager"].get('ScreenFade')(1,0,500)),MIN_LOAD_TIME-loadTime);_library_managers_signalmanager__WEBPACK_IMPORTED_MODULE_12__["signalManager"].clear_loadComplete();console.log('StartUp State load complete!:'+this.progressBar.curValue);}
}
}
update()
{this.scriptComponent.update();_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_16__["strategyManager"].update();}
transform()
{_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_16__["strategyManager"].transform();}
render()
{_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_16__["strategyManager"].render();}
assetLoad()
{_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_19__["highResTimer"].timerStart();_library_managers_signalmanager__WEBPACK_IMPORTED_MODULE_12__["signalManager"].connect_loadComplete(this.loadCallback.bind(this));let groupAry=['(menu)'];_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_managers_soundmanager__WEBPACK_IMPORTED_MODULE_13__["soundManager"].loadListTable('data/sound/soundListTable.lst',callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_physics_physicsworldmanager__WEBPACK_IMPORTED_MODULE_15__["physicsWorldManager"].loadListTable('data/objects/2d/physics/physicsListTable.lst',callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_9__["menuManager"].loadListTable('data/objects/2d/menu/menuListTable.lst',callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_managers_fontmanager__WEBPACK_IMPORTED_MODULE_6__["fontManager"].load('data/textures/fonts/font.lst',callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__["objectDataManager"].loadXMLGroup2D(groupAry,callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__["objectDataManager"].loadAssets2D(groupAry,callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__["objectDataManager"].createFromData(groupAry,callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_managers_soundmanager__WEBPACK_IMPORTED_MODULE_13__["soundManager"].loadGroup(groupAry,callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_managers_actionmanager__WEBPACK_IMPORTED_MODULE_8__["actionManager"].load('data/settings/controllerMapping.cfg',callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_9__["menuManager"].loadMenuAction('data/objects/2d/menu/menu_action.list',callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_9__["menuManager"].preloadGroup(['(menu)'],callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add(
(callback)=>
{_scripts_menuscripts__WEBPACK_IMPORTED_MODULE_27__["loadScripts"]();_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_9__["menuManager"].setDefaultCamera();_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_9__["menuManager"].createGroup(['(menu)']);callback();});_state_titlescreenstate__WEBPACK_IMPORTED_MODULE_24__["load"]();_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add((callback)=>_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_5__["eventManager"].dispatchEvent(_statedefs__WEBPACK_IMPORTED_MODULE_28__["ESE_ASSET_LOAD_COMPLETE"]));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].load();}
loadCallback()
{this.progressBar.incCurrentValue();}
cleanUp()
{_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_16__["strategyManager"].deleteStrategy(['_startup_']);_library_utilities_assetholder__WEBPACK_IMPORTED_MODULE_20__["assetHolder"].clear();_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__["objectDataManager"].freeGroup(['(startup)']);_library_managers_spritesheetmanager__WEBPACK_IMPORTED_MODULE_14__["spriteSheetManager"].clear();}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"GameState",function(){return GameState;});var _statemessage__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(23);var _statedefs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(24);class GameState
{constructor(gameState,nextState,callback)
{this.stateChange=false;this.gameState=gameState;this.nextState=nextState;this.callback=callback;this.stateMessage=new _statemessage__WEBPACK_IMPORTED_MODULE_0__["StateMessage"];}
cleanUp()
{}
handleEvent(event)
{}
doStateChange()
{return this.stateChange;}
physics()
{}
update()
{}
transform()
{}
render()
{}
getGameState(gameStateStr)
{if(gameStateStr==='title_screen_state')
return _statedefs__WEBPACK_IMPORTED_MODULE_1__["EGS_TITLE_SCREEN"];else if(gameStateStr==='level_1_state')
return _statedefs__WEBPACK_IMPORTED_MODULE_1__["EGS_LEVEL_1"];throw new Error(`State does not exist!.(${gameStateStr})`);}
getStateStr(gameState)
{if(gameState===_statedefs__WEBPACK_IMPORTED_MODULE_1__["EGS_TITLE_SCREEN"])
return 'title_screen_state';else if(gameState===_statedefs__WEBPACK_IMPORTED_MODULE_1__["EGS_LEVEL_1"])
return 'level_1_state';throw new Error(`State does not exist!.(${gameState})`);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"StateMessage",function(){return StateMessage;});class StateMessage
{constructor()
{this.loadState=0;this.unloadState=0;}
setMsg(loadState,unloadState)
{this.loadState=loadState;this.unloadState=unloadState;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"EGS_NULL",function(){return EGS_NULL;});__webpack_require__.d(__webpack_exports__,"EGS_STARTUP",function(){return EGS_STARTUP;});__webpack_require__.d(__webpack_exports__,"EGS_TITLE_SCREEN",function(){return EGS_TITLE_SCREEN;});__webpack_require__.d(__webpack_exports__,"EGS_GAME_LOAD",function(){return EGS_GAME_LOAD;});__webpack_require__.d(__webpack_exports__,"EGS_LEVEL_1",function(){return EGS_LEVEL_1;});__webpack_require__.d(__webpack_exports__,"ESE_STATE_EVENTS",function(){return ESE_STATE_EVENTS;});__webpack_require__.d(__webpack_exports__,"ESE_FADE_IN_COMPLETE",function(){return ESE_FADE_IN_COMPLETE;});__webpack_require__.d(__webpack_exports__,"ESE_FADE_OUT_COMPLETE",function(){return ESE_FADE_OUT_COMPLETE;});__webpack_require__.d(__webpack_exports__,"ESE_ASSET_LOAD_COMPLETE",function(){return ESE_ASSET_LOAD_COMPLETE;});const EGS_NULL=0,EGS_STARTUP=1,EGS_TITLE_SCREEN=2,EGS_GAME_LOAD=3,EGS_LEVEL_1=4;const ESE_STATE_EVENTS=1000,ESE_FADE_IN_COMPLETE=1001,ESE_FADE_OUT_COMPLETE=1002,ESE_ASSET_LOAD_COMPLETE=1003;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"scriptManager",function(){return scriptManager;});class ScriptManager
{constructor()
{this.scriptMap=new Map;}
set(name,factory)
{if(this.scriptMap.has(name))
{throw new Error(`Script name has already been added(${name}).`);return;}
this.scriptMap.set(name,factory);}
get(name)
{let scriptFactory=this.scriptMap.get(name);if(scriptFactory===undefined)
{throw new Error(`Script name could not be found!(${name})`);return null;}
return scriptFactory;}
}
var scriptManager=new ScriptManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"eventManager",function(){return eventManager;});class EventManager
{constructor()
{this.canvas=document.getElementById('game-surface');this.queue=[];this.canvas.addEventListener('mousedown',this.onMouseDown.bind(this));this.canvas.addEventListener('mouseup',this.onMouseUp.bind(this));this.canvas.addEventListener('mousemove',this.onMouseMove.bind(this));document.addEventListener('keydown',this.onKeyDown.bind(this));document.addEventListener('keyup',this.onKeyUp.bind(this));document.addEventListener('scroll',this.onScroll.bind(this));this.lastMouseMoveX=0;this.lastMouseMoveY=0;this.mouseMoveRelX=0;this.mouseMoveRelY=0;this.mouseMoveOffsetX=(document.documentElement.scrollLeft-this.canvas.offsetLeft);this.mouseMoveOffsetY=(document.documentElement.scrollTop-this.canvas.offsetTop);}
get mouseX(){return this.lastMouseMoveX;}
get mouseY(){return this.lastMouseMoveY;}
get mouseRelX(){return this.mouseMoveRelX;}
get mouseRelY(){return this.mouseMoveRelY;}
get mouseOffsetX(){return this.mouseMoveOffsetX;}
get mouseOffsetY(){return this.mouseMoveOffsetY;}
pollEvent()
{if(this.queue.length)
return this.queue.shift();return null;}
dispatchEvent(_type,...args)
{let event=new CustomEvent('customEvent',{detail:
{type:_type,arg:args
}
});this.queue.push(event);}
onScroll(event)
{this.mouseMoveOffsetX=(document.documentElement.scrollLeft-this.canvas.offsetLeft);this.mouseMoveOffsetY=(document.documentElement.scrollTop-this.canvas.offsetTop);}
onMouseDown(event)
{this.queue.push(event);}
onMouseUp(event)
{this.queue.push(event);}
onMouseMove(event)
{this.queue.push(event);this.mouseMoveRelX=event.movementX;this.mouseMoveRelY=event.movementY;this.lastMouseMoveX=event.clientX+this.mouseMoveOffsetX;this.lastMouseMoveY=event.clientY+this.mouseMoveOffsetY;}
onKeyDown(event)
{if(event.repeat===false)
{this.queue.push(event);}
}
onKeyUp(event)
{this.queue.push(event);}
onCustomEvent(event)
{this.queue.push(event);}
clear()
{this.queue=[];}
}
var eventManager=new EventManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"fontManager",function(){return fontManager;});var _2d_font__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(28);var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(18);var _managers_texturemanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6);class FontManager
{constructor()
{this.fontMap=new Map;this.group='';this.loadCompleteCallback=null;this.loadCounter=0;}
load(filePath,callback)
{_utilities_genfunc__WEBPACK_IMPORTED_MODULE_1__["downloadFile"]('xml',filePath,(xmlNode)=>this.loadFromNode(xmlNode,callback));}
loadFromNode(node,callback)
{if(node)
{this.loadCompleteCallback=callback;let listGroupNode=node.getElementsByTagName('listGroup');this.group=listGroupNode[0].getAttribute('name');let fontNode=node.getElementsByTagName('font');for(let i=0;i<fontNode.length;++i)
{let name=fontNode[i].getAttribute('name');if(this.fontMap.has(name))
{throw new Error(`Font name has already been loaded(${name}).`);return;}
this.fontMap.set(name,new _2d_font__WEBPACK_IMPORTED_MODULE_0__["Font"]);++this.loadCounter;this.downloadFontFiles(name,fontNode[i].getAttribute('file'));}
}
else
callback();}
downloadFontFiles(name,filePath)
{_utilities_genfunc__WEBPACK_IMPORTED_MODULE_1__["downloadFile"]('img',filePath+'.png',(image)=>
{_managers_texturemanager__WEBPACK_IMPORTED_MODULE_2__["textureManager"].load(this.group,name,image);_utilities_genfunc__WEBPACK_IMPORTED_MODULE_1__["downloadFile"]('xml',filePath+'.fnt',(xmlNode)=>
{this.loadFont(name,xmlNode);--this.loadCounter;if(this.loadCounter===0)
{this.loadCompleteCallback();}
});});}
loadFont(name,xmlNode)
{let font=this.fontMap.get(name);if(font===undefined)
throw new Error(`Font name has not been added to the map(${name}).`);font.loadFromNode(this.group,name,xmlNode);}
getFont(name)
{let font=this.fontMap.get(name);if(font===undefined)
throw new Error(`Font name can't be found(${name}).`);return font;}
isFont(name)
{let font=this.fontMap.get(name);if(font===undefined)
throw new Error(`Font name can't be found(${name}).`);}
get groupName(){return this.group;}
}
var fontManager=new FontManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"CharData",function(){return CharData;});__webpack_require__.d(__webpack_exports__,"Font",function(){return Font;});var _common_size__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(4);var _common_rect__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(29);var _common_texture__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(7);var _managers_texturemanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(6);class CharData
{constructor()
{this.offset=new _common_size__WEBPACK_IMPORTED_MODULE_0__["Size"];this.rect=new _common_rect__WEBPACK_IMPORTED_MODULE_1__["Rect"];this.xAdvance=0;}
}
class Font
{constructor()
{this.charDataMap=new Map;this.lineHeight=0;this.baselineOffset=0;this.horzPadding=0;this.vertPadding=0;this.texture=null;}
loadFromNode(group,name,xmlNode)
{this.texture=_managers_texturemanager__WEBPACK_IMPORTED_MODULE_3__["textureManager"].getTexture(group,name);let padding=xmlNode.getElementsByTagName('info')[0].getAttribute('padding');this.horzPadding=Number(padding.substr(6,1));this.vertPadding=Number(padding.substr(0,1));let commonNode=xmlNode.getElementsByTagName('common');this.lineHeight=Number(commonNode[0].getAttribute('lineHeight'));this.baselineOffset=Number(commonNode[0].getAttribute('base'));let charNode=xmlNode.getElementsByTagName('char');for(let i=0;i<charNode.length;++i)
{let charData=new CharData;charData.offset.w=Number(charNode[i].getAttribute('xoffset'));charData.offset.h=Number(charNode[i].getAttribute('yoffset'));charData.xAdvance=Number(charNode[i].getAttribute('xadvance'));charData.rect.x1=Number(charNode[i].getAttribute('x'));charData.rect.y1=Number(charNode[i].getAttribute('y'));charData.rect.x2=Number(charNode[i].getAttribute('width'));charData.rect.y2=Number(charNode[i].getAttribute('height'));let id=Number(charNode[i].getAttribute('id'));this.charDataMap.set(id,charData);}
}
getCharData(id)
{let charData=this.charDataMap.get(id);if(charData===undefined)
throw new Error(`Font character ID can't be found(${id}).`);return charData;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Rect",function(){return Rect;});class Rect
{constructor(x1=0,y1=0,x2=0,y2=0)
{this.data=new Float32Array([x1,y1,x2,y2]);}
set(x1=0,y1=0,x2=0,y2=0)
{this.data[0]=x1;this.data[1]=y1;this.data[2]=x2;this.data[3]=y2;}
set x1(value){this.data[0]=value;}
get x1(){return this.data[0];}
set y1(value){this.data[1]=value;}
get y1(){return this.data[1];}
set x2(value){this.data[2]=value;}
get x2(){return this.data[2];}
set y2(value){this.data[3]=value;}
get y2(){return this.data[3];}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"objectDataManager",function(){return objectDataManager;});var _managers_managerbase__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(31);var _managers_texturemanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(6);var _managers_meshmanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(10);var _managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(15);var _managers_spritesheetmanager__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(32);var _utilities_assetholder__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(39);var _objectdata2d__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(40);var _objectdata3d__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(45);var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(18);var _common_defs__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(5);const LOAD_2D=0;const LOAD_3D=1;class ObjectDataManager extends _managers_managerbase__WEBPACK_IMPORTED_MODULE_0__["ManagerBase"]
{constructor()
{super();this.loadType;this.objectDataMapMap=new Map;}
loadXMLGroup2D(groupAry,finishCallback)
{this.loadType=LOAD_2D;super.loadGroup('Object data list',this.objectDataMapMap,groupAry,finishCallback);}
loadXMLGroup3D(groupAry,finishCallback)
{this.loadType=LOAD_3D;super.loadGroup('Object data list',this.objectDataMapMap,groupAry,finishCallback);}
loadFromNode(group,node,filePath,finishCallback)
{let groupMap=this.objectDataMapMap.get(group);let defaultData;if(this.loadType===LOAD_2D)
defaultData=new _objectdata2d__WEBPACK_IMPORTED_MODULE_6__["ObjectData2D"];else
defaultData=new _objectdata3d__WEBPACK_IMPORTED_MODULE_7__["ObjectData3D"];defaultData.loadObjData(node.getElementsByTagName('default')[0],'','');let objNode=node.getElementsByTagName('object');for(let i=0;i<objNode.length;++i)
{let name=objNode[i].getAttribute('name');if(groupMap.get(name)===undefined)
{let objData
if(this.loadType===LOAD_2D)
objData=new _objectdata2d__WEBPACK_IMPORTED_MODULE_6__["ObjectData2D"];else
objData=new _objectdata3d__WEBPACK_IMPORTED_MODULE_7__["ObjectData3D"];objData.copy(defaultData);objData.loadObjData(objNode[i],group,name);groupMap.set(name,objData);}
else
{throw new Error(`Group object already exists(${group},${name})!`);}
}
}
loadAssets2D(groupAry,finishCallback)
{for(let grp=0;grp<groupAry.length;++grp)
{let group=groupAry[grp];let groupMap=this.objectDataMapMap.get(group);if(groupMap!==undefined)
{let dupPathCheck=[];for(let [key,objData] of groupMap.entries())
{let filePathAry=objData.visualData.getTextureFilePathAry();for(let i=0;i<filePathAry.length;++i)
{let filePath=filePathAry[i];if(filePath &&(dupPathCheck.indexOf(filePath)===-1))
{dupPathCheck.push(filePath);this.downloadFile('img',group,filePath,finishCallback,(group,image,filePath,finishCallback)=>
{_managers_texturemanager__WEBPACK_IMPORTED_MODULE_1__["textureManager"].load(group,filePath,image);});}
}
filePathAry=[objData.visualData.meshFilePath,objData.visualData.spriteSheetFilePath];for(let i=0;i<filePathAry.length;++i)
{if(filePathAry[i] &&(dupPathCheck.indexOf(filePathAry[i])===-1))
{dupPathCheck.push(filePathAry[i]);this.downloadFile('xml',group,filePathAry[i],finishCallback,(group,xmlNode,filePath,finishCallback)=>
{if(filePath===objData.visualData.spriteSheetFilePath)
_managers_spritesheetmanager__WEBPACK_IMPORTED_MODULE_4__["spriteSheetManager"].loadFromNode(filePath,xmlNode);else
_utilities_assetholder__WEBPACK_IMPORTED_MODULE_5__["assetHolder"].set(group,filePath,xmlNode);});}
}
}
if(this.loadCounter===0)
finishCallback();}
else
{throw new Error(`Can't download asset because object group does not exist(${group})!`);}
}
}
loadAssets3D(groupAry,finishCallback)
{for(let grp=0;grp<groupAry.length;++grp)
{let group=groupAry[grp];let groupMap=this.objectDataMapMap.get(group);if(groupMap!==undefined)
{let dupPathCheck=[];for(let [key,objData] of groupMap.entries())
{let filePath=objData.visualData.meshFilePath;if(filePath &&(dupPathCheck.indexOf(filePath)===-1))
{dupPathCheck.push(filePath);this.downloadFile('binary',group,filePath,finishCallback,(group,binaryFile,filePath,finishCallback)=>
{objData.visualData.meshGrp=
_managers_meshmanager__WEBPACK_IMPORTED_MODULE_2__["meshManager"].load(group,filePath,binaryFile);for(let i=0;i<objData.visualData.meshGrp.uniqueTexturePathAry.length;++i)
{filePath=objData.visualData.meshGrp.uniqueTexturePathAry[i].path;if(filePath &&(dupPathCheck.indexOf(filePath)===-1))
{dupPathCheck.push(filePath);this.downloadFile('img',group,filePath,finishCallback,(group,image,filePath,finishCallback)=>
{_managers_texturemanager__WEBPACK_IMPORTED_MODULE_1__["textureManager"].load(group,filePath,image);});}
}
});}
}
if(this.loadCounter===0)
finishCallback();}
else
{throw new Error(`Can't load mesh data because object group does not exist(${group})!`);}
}
}
createFromData(groupAry,callback)
{for(let grp=0;grp<groupAry.length;++grp)
{let group=groupAry[grp];let groupMap=this.objectDataMapMap.get(group);if(groupMap!==undefined)
{for(let [key,objData] of groupMap.entries())
objData.createFromData(group);}
}
callback();}
freeGroup(groupAry)
{for(let grp=0;grp<groupAry.length;++grp)
{let group=groupAry[grp];if(this.listTableMap.get(group)===undefined)
throw new Error(`Object data list group name can't be found(${group})!`);if(this.objectDataMapMap.has(group))
{_managers_texturemanager__WEBPACK_IMPORTED_MODULE_1__["textureManager"].deleteGroup(group);_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_3__["vertexBufferManager"].deleteGroup(group);_managers_meshmanager__WEBPACK_IMPORTED_MODULE_2__["meshManager"].deleteGroup(group);this.objectDataMapMap.delete(group);}
}
}
getData(group,name)
{let groupMap=this.objectDataMapMap.get(group);if(groupMap!==undefined)
{let objData=groupMap.get(name);if(objData)
return objData;else
throw new Error(`Object data not found(${group},${name})!`);}
else
throw new Error(`Object group not found(${group},${name})!`);return null;}
}
var objectDataManager=new ObjectDataManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ManagerBase",function(){return ManagerBase;});var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(18);class ManagerBase
{constructor()
{this.listTableMap=new Map;this.loadCounter=0;}
loadListTable(filePath,callback)
{_utilities_genfunc__WEBPACK_IMPORTED_MODULE_0__["downloadFile"]('xml',filePath,(xmlNode)=>
{this.loadListTableFromNode(xmlNode);callback();});}
loadListTableFromNode(xmlNode)
{if(xmlNode)
{let groupLst=xmlNode.getElementsByTagName('groupList');for(let i=0;i<groupLst.length;++i)
{let groupName=groupLst[i].getAttribute('groupName');let fileLst=groupLst[i].getElementsByTagName('file');if(fileLst.length)
{let pathAry=[];for(let j=0;j<fileLst.length;++j)
{pathAry.push(fileLst[j].getAttribute('path'));}
this.listTableMap.set(groupName,pathAry);}
}
}
}
downloadFile(fileType,group,filePath,finishCallback,loadCallback)
{++this.loadCounter;_utilities_genfunc__WEBPACK_IMPORTED_MODULE_0__["downloadFile"](fileType,filePath,(fileData)=>
{loadCallback(group,fileData,filePath,finishCallback);--this.loadCounter;if(this.loadCounter===0)
finishCallback();});}
loadGroup(groupNameStr,groupMapMap,groupAry,finishCallback)
{for(let grp=0;grp<groupAry.length;++grp)
{let group=groupAry[grp];let pathAry=this.listTableMap.get(group);if(pathAry!==undefined)
{if(groupMapMap.get(group)===undefined)
{groupMapMap.set(group,new Map);this.load(group,finishCallback);}
else
{throw new Error(`${groupNameStr} group has alread been loaded(${group})!`);}
}
else
{throw new Error(`${groupNameStr} group name can't be found(${group})!`);}
}
}
load(group,finishCallback)
{let pathAry=this.listTableMap.get(group);if(pathAry!==undefined)
{for(let i=0;i<pathAry.length;++i)
{this.downloadFile('xml',group,pathAry[i],finishCallback,(group,xmlNode,filePath,finishCallback)=>
{this.loadFromNode(group,xmlNode,filePath,finishCallback);});}
if(this.loadCounter===0)
finishCallback();}
else
{if(this.listTableMap.size==0)
throw new Error(`Need to load the list table(${group})!`);else
throw new Error(`Group description in list table does not exist(${group})!`);}
}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"spriteSheetManager",function(){return spriteSheetManager;});var _sprite_spritesheet__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(33);class SpriteSheetManager
{constructor()
{this.spriteSheetMap=new Map;}
loadFromNode(filePath,node)
{let spriteSheet=this.spriteSheetMap.get(filePath);if(spriteSheet===undefined)
{spriteSheet=new _sprite_spritesheet__WEBPACK_IMPORTED_MODULE_0__["SpriteSheet"];spriteSheet.loadFromNode(node);this.spriteSheetMap.set(filePath,spriteSheet);}
}
getSpriteSheet(filePath)
{let spriteSheet=this.spriteSheetMap.get(filePath);if(spriteSheet===undefined)
throw new Error('Sprite sheet mesh file missing('+filePath+')!');return spriteSheet;}
clear()
{if(this.spriteSheetMap.size)
this.spriteSheetMap.clear();}
}
var spriteSheetManager=new SpriteSheetManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"SpriteSheet",function(){return SpriteSheet;});var _spritesheetglyph__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(34);var _common_size__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(4);var _common_rect__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(29);var _utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(35);class SpriteSheet
{constructor(defaultIndex=0,glyphCount=0,columns=0)
{this.defaultIndex=defaultIndex;this.glyphCount=glyphCount;this.columns=columns;this.glyphAry=null;this.glyphMap=null;}
copy(obj)
{this.defaultIndex=obj.defaultIndex;this.glyphCount=obj.glyphCount;this.columns=obj.columns;if(obj.glyphAry)
{if(this.glyphAry===null)
this.glyphAry=[];for(let i=0;i<obj.glyphAry.length;++i)
{let glyph=obj.glyphAry[i];let size=new _common_size__WEBPACK_IMPORTED_MODULE_1__["Size"](glyph.size.w,glyph.size.h);let rect=new _common_rect__WEBPACK_IMPORTED_MODULE_2__["Rect"](glyph.uv.x1,glyph.uv.y1,glyph.uv.x2,glyph.uv.y2);let cropOffset=null;if(glyph.cropOffset)
cropOffset=new _common_size__WEBPACK_IMPORTED_MODULE_1__["Size"](glyph.cropOffset.w,glyph.cropOffset.h);this.glyphAry.push(new _spritesheetglyph__WEBPACK_IMPORTED_MODULE_0__["SpriteSheetGlyph"](size,rect,cropOffset));}
}
}
build(sheetSize)
{if((this.glyphCount!=0)&&(this.columns!=0))
{this.glyphAry=[];let rows=Math.trunc(this.glyphCount/this.columns);if((this.glyphCount % this.columns)>0)
++rows;let size=new _common_size__WEBPACK_IMPORTED_MODULE_1__["Size"](sheetSize.w/this.columns,sheetSize.h/rows);for(let i=0;i<rows;++i)
{for(let j=0;j<this.columns;++j)
{let rect=new _common_rect__WEBPACK_IMPORTED_MODULE_2__["Rect"](
(j*size.w)/sheetSize.w,(i*size.h)/sheetSize.h,size.w/sheetSize.w,size.h/sheetSize.h);this.glyphAry.push(new _spritesheetglyph__WEBPACK_IMPORTED_MODULE_0__["SpriteSheetGlyph"](size,rect));if(this.glyphAry.length===this.glyphCount)
break;}
}
}
}
loadFromNode(node)
{this.glyphMap=new Map;let sheetSize=new _common_size__WEBPACK_IMPORTED_MODULE_1__["Size"];let attr=node.getAttribute('width');if(attr)
sheetSize.w=Number(attr);attr=node.getAttribute('height');if(attr)
sheetSize.h=Number(attr);let rectNode=node.getElementsByTagName('rect');if(rectNode.length)
{for(let i=0;i<rectNode.length;++i)
{let rect=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_3__["loadRectFromChild"](rectNode[i]);let size=new _common_size__WEBPACK_IMPORTED_MODULE_1__["Size"](rect.x2,rect.y2);let uv=new _common_rect__WEBPACK_IMPORTED_MODULE_2__["Rect"](
rect.x1/sheetSize.w,rect.y1/sheetSize.h,rect.x2/sheetSize.w,rect.y2/sheetSize.h);let cropOffset=new _common_size__WEBPACK_IMPORTED_MODULE_1__["Size"](
Number(rectNode[i].getAttribute('cx')),Number(rectNode[i].getAttribute('cy')));let strId=rectNode[i].getAttribute('name');this.glyphMap.set(strId,new _spritesheetglyph__WEBPACK_IMPORTED_MODULE_0__["SpriteSheetGlyph"](size,uv,cropOffset));}
}
}
getGlyph(index=-1)
{if(index>-1)
return this.glyphAry[index];else
return this.glyphAry[this.defaultIndex];}
findGlyph(glyphId)
{let glyph=this.glyphMap.get(glyphId);if(glyph===undefined)
{throw new Error('Glyph name is missing('+glyphId+')!');}
return glyph;}
setGlyph(spriteSheet,glyphId)
{let glyph=this.glyphMap.get(glyphId);if(glyph!==undefined)
{if(spriteSheet.glyphAry===null)
spriteSheet.glyphAry=[];spriteSheet.glyphAry.push(glyph);}
else
{throw new Error('Glyph name is missing('+glyphId+')!');}
}
getCount()
{if((this.glyphAry!==null)&&(this.glyphAry.length))
return this.glyphAry.length;else if((this.glyphMap!==null)&&(this.glyphMap.length))
return this.glyphMap.length;return this.glyphCount;}
copyTo(spriteSheet,strIdAry)
{if(strIdAry.length===0)
{spriteSheet.glyphAry=this.glyphAry;}
else if(this.glyphMap.size)
{if(spriteSheet.glyphCount===0)
{for(let i=0;i<strIdAry.length;++i)
this.setGlyph(spriteSheet,strIdAry[i]);}
else
{if(strIdAry.length===1)
{for(let i=0;i<spriteSheet.glyphCount;++i)
this.setGlyph(spriteSheet,strIdAry[0]+i);}
else
{throw new Error('Sprite Sheet Incorrect configuration!');}
}
}
}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"SpriteSheetGlyph",function(){return SpriteSheetGlyph;});var _common_rect__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(29);var _common_size__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(4);class SpriteSheetGlyph
{constructor(size,uv,cropOffset=null)
{this.size=size;this.uv=uv;this.cropOffset=cropOffset;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"loadVertex2d",function(){return loadVertex2d;});__webpack_require__.d(__webpack_exports__,"loadPosition",function(){return loadPosition;});__webpack_require__.d(__webpack_exports__,"loadRotation",function(){return loadRotation;});__webpack_require__.d(__webpack_exports__,"loadScale",function(){return loadScale;});__webpack_require__.d(__webpack_exports__,"loadCenterPos",function(){return loadCenterPos;});__webpack_require__.d(__webpack_exports__,"loadXYZ",function(){return loadXYZ;});__webpack_require__.d(__webpack_exports__,"loadColor",function(){return loadColor;});__webpack_require__.d(__webpack_exports__,"loadSize",function(){return loadSize;});__webpack_require__.d(__webpack_exports__,"loadRect",function(){return loadRect;});__webpack_require__.d(__webpack_exports__,"loadRectFromChild",function(){return loadRectFromChild;});__webpack_require__.d(__webpack_exports__,"loadHorzAlignment",function(){return loadHorzAlignment;});__webpack_require__.d(__webpack_exports__,"loadVertAlignment",function(){return loadVertAlignment;});__webpack_require__.d(__webpack_exports__,"loadDynamicOffset",function(){return loadDynamicOffset;});var _common_color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(36);var _common_size__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(4);var _common_point__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(11);var _common_rect__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(29);var _common_vertex2d__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(17);var _common_dynamicoffset__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(37);var _common_defs__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(5);function loadVertex2d(node)
{if(node)
{let vert2d=new _common_vertex2d__WEBPACK_IMPORTED_MODULE_4__["Vertex2d"];let attr=node.getAttribute('x');if(attr)
vert2d.x=Number(attr);attr=node.getAttribute('y');if(attr)
vert2d.y=Number(attr);attr=node.getAttribute('z');if(attr)
vert2d.z=Number(attr);attr=node.getAttribute('u');if(attr)
vert2d.u=Number(attr);attr=node.getAttribute('v');if(attr)
vert2d.v=Number(attr);return vert2d;}
return null;}
function loadPosition(node)
{let positionNode=node.getElementsByTagName('position');if(positionNode.length)
{let point=new _common_point__WEBPACK_IMPORTED_MODULE_2__["Point"];let attr=positionNode[0].getAttribute('x');if(attr)
point.x=Number(attr);attr=positionNode[0].getAttribute('y');if(attr)
point.y=Number(attr);attr=positionNode[0].getAttribute('z');if(attr)
point.z=Number(attr);return point;}
return null;}
function loadRotation(node)
{let rotationNode=node.getElementsByTagName('rotation');if(rotationNode.length)
{let rotation=new _common_point__WEBPACK_IMPORTED_MODULE_2__["Point"];let attr=rotationNode[0].getAttribute('x');if(attr)
rotation.x=Number(attr);attr=rotationNode[0].getAttribute('y');if(attr)
rotation.y=Number(attr);attr=rotationNode[0].getAttribute('z');if(attr)
rotation.z=Number(attr);return rotation;}
return null;}
function loadScale(node)
{let scaleNode=node.getElementsByTagName('scale');if(scaleNode.length)
{let scale=new _common_point__WEBPACK_IMPORTED_MODULE_2__["Point"];let attr=scaleNode[0].getAttribute('x');if(attr)
scale.x=Number(attr);attr=scaleNode[0].getAttribute('y');if(attr)
scale.y=Number(attr);attr=scaleNode[0].getAttribute('z');if(attr)
scale.z=Number(attr);return scale;}
return null;}
function loadCenterPos(node)
{let centerPosNode=node.getElementsByTagName('centerPos');if(centerPosNode.length)
{let centerPos=new _common_point__WEBPACK_IMPORTED_MODULE_2__["Point"];let attr=centerPosNode[0].getAttribute('x');if(attr)
centerPos.x=Number(attr);attr=centerPosNode[0].getAttribute('y');if(attr)
centerPos.y=Number(attr);attr=centerPosNode[0].getAttribute('z');if(attr)
centerPos.z=Number(attr);return centerPos;}
return null;}
function loadXYZ(node)
{let point=new _common_point__WEBPACK_IMPORTED_MODULE_2__["Point"];let attr=node.getAttribute('x');if(attr)
point.x=Number(attr);attr=node.getAttribute('y');if(attr)
point.y=Number(attr);attr=node.getAttribute('z');if(attr)
point.z=Number(attr);return point;}function loadColor(node,currentColor=null)
{let color=new _common_color__WEBPACK_IMPORTED_MODULE_0__["Color"];if(currentColor)
color.copy(currentColor);let colorNode=node.getElementsByTagName('color');if(colorNode.length)
{let attr=colorNode[0].getAttribute('r');if(attr)
color.r=Number(attr);attr=colorNode[0].getAttribute('g');if(attr)
color.g=Number(attr);attr=colorNode[0].getAttribute('b');if(attr)
color.b=Number(attr);attr=colorNode[0].getAttribute('a');if(attr)
color.a=Number(attr);color.convert();}
return color;}
function loadSize(node,currentSize=null)
{let size=new _common_size__WEBPACK_IMPORTED_MODULE_1__["Size"];if(currentSize)
size.copy(currentSize);let sizeNode=node.getElementsByTagName('size');if(sizeNode.length)
{let attr=sizeNode[0].getAttribute('width');if(attr)
size.w=Number(attr);attr=sizeNode[0].getAttribute('height');if(attr)
size.h=Number(attr);}
return size;}
function loadRect(node)
{let rectNode=node.getElementsByTagName('rect');if(rectNode.length)
return loadRectFromChild(rectNode[0]);return new _common_rect__WEBPACK_IMPORTED_MODULE_3__["Rect"];}
function loadRectFromChild(node)
{let rect=new _common_rect__WEBPACK_IMPORTED_MODULE_3__["Rect"];let attr=node.getAttribute('x1');if(attr)
rect.x1=Number(attr);attr=node.getAttribute('y1');if(attr)
rect.y1=Number(attr);attr=node.getAttribute('x2');if(attr)
rect.x2=Number(attr);attr=node.getAttribute('y2');if(attr)
rect.y2=Number(attr);return rect;}
function loadHorzAlignment(node,aHorzAlign)
{let horzAlign=aHorzAlign;let horzAlignAttr=node.getAttribute('horzAlign');if(horzAlignAttr)
{if(horzAlignAttr==='left')
horzAlign=_common_defs__WEBPACK_IMPORTED_MODULE_6__["EHA_HORZ_LEFT"];else if(horzAlignAttr==='center')
horzAlign=_common_defs__WEBPACK_IMPORTED_MODULE_6__["EHA_HORZ_CENTER"];else if(horzAlignAttr==='right')
horzAlign=_common_defs__WEBPACK_IMPORTED_MODULE_6__["EHA_HORZ_RIGHT"];}
return horzAlign;}
function loadVertAlignment(node,aVertAlign)
{let vertAlign=aVertAlign;let vertAlignAttr=node.getAttribute('vertAlign');if(vertAlignAttr)
{if(vertAlignAttr==='top')
vertAlign=_common_defs__WEBPACK_IMPORTED_MODULE_6__["EVA_VERT_TOP"];else if(vertAlignAttr==='center')
vertAlign=_common_defs__WEBPACK_IMPORTED_MODULE_6__["EVA_VERT_CENTER"];else if(vertAlignAttr==='bottom')
vertAlign=_common_defs__WEBPACK_IMPORTED_MODULE_6__["EVA_VERT_BOTTOM"];}
return vertAlign;}
function loadDynamicOffset(node)
{let dynamicOffsetNode=node.getElementsByTagName('dynamicOffset');if(dynamicOffsetNode.length)
{let dynamicOffset=new _common_dynamicoffset__WEBPACK_IMPORTED_MODULE_5__["DynamicOffset"];let attr=dynamicOffsetNode[0].getAttribute('left');if(attr)
{dynamicOffset.add(_common_defs__WEBPACK_IMPORTED_MODULE_6__["EDO_LEFT"]);dynamicOffset.setX(Number(attr));}
else
{attr=dynamicOffsetNode[0].getAttribute('right');if(attr)
{dynamicOffset.add(_common_defs__WEBPACK_IMPORTED_MODULE_6__["EDO_RIGHT"]);dynamicOffset.setX(Number(attr));}
else
{attr=dynamicOffsetNode[0].getAttribute('horzCenter');if(attr)
{dynamicOffset.add(_common_defs__WEBPACK_IMPORTED_MODULE_6__["EDO_HORZ_CENTER"]);dynamicOffset.setX(Number(attr));}
}
}
attr=dynamicOffsetNode[0].getAttribute('top');if(attr)
{dynamicOffset.add(_common_defs__WEBPACK_IMPORTED_MODULE_6__["EDO_TOP"]);dynamicOffset.setY(Number(attr));}
else
{attr=dynamicOffsetNode[0].getAttribute('bottom');if(attr)
{dynamicOffset.add(_common_defs__WEBPACK_IMPORTED_MODULE_6__["EDO_BOTTOM"]);dynamicOffset.setY(Number(attr));}
else
{attr=dynamicOffsetNode[0].getAttribute('vertCenter');if(attr)
{dynamicOffset.add(_common_defs__WEBPACK_IMPORTED_MODULE_6__["EDO_VERT_CENTER"]);dynamicOffset.setX(Number(attr));}
}
}
return dynamicOffset;}
return null;}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Color",function(){return Color;});var _defs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(5);class Color
{constructor(r=1,g=1,b=1,a=1)
{this.data=new Float32Array([r,g,b,a]);}
set(r=1,g=1,b=1,a=1)
{if(r>1.5)
this.data[0]=r*_defs__WEBPACK_IMPORTED_MODULE_0__["RGB_TO_DEC"];else
this.data[0]=r;if(g>1.5)
this.data[1]=g*_defs__WEBPACK_IMPORTED_MODULE_0__["RGB_TO_DEC"];else
this.data[1]=g;if(b>1.5)
this.data[2]=b*_defs__WEBPACK_IMPORTED_MODULE_0__["RGB_TO_DEC"];else
this.data[2]=b;if(a>1.5)
this.data[3]=a*_defs__WEBPACK_IMPORTED_MODULE_0__["RGB_TO_DEC"];else
this.data[3]=a;}
copy(obj)
{this.data[0]=obj.data[0];this.data[1]=obj.data[1];this.data[2]=obj.data[2];this.data[3]=obj.data[3];}
set r(value)
{if(value>1.5)
value*=_defs__WEBPACK_IMPORTED_MODULE_0__["RGB_TO_DEC"];this.data[0]=value;}
get r(){return this.data[0];}
set g(value)
{if(value>1.5)
value*=_defs__WEBPACK_IMPORTED_MODULE_0__["RGB_TO_DEC"];this.data[1]=value;}
get g(){return this.data[1];}
set b(value)
{if(value>1.5)
value*=_defs__WEBPACK_IMPORTED_MODULE_0__["RGB_TO_DEC"];this.data[2]=value;}
get b(){return this.data[2];}
set a(value)
{if(value>1.5)
value*=_defs__WEBPACK_IMPORTED_MODULE_0__["RGB_TO_DEC"];this.data[3]=value;}
get a(){return this.data[3];}
convert()
{if(this.r>1.5)
this.r*=_defs__WEBPACK_IMPORTED_MODULE_0__["RGB_TO_DEC"];if(this.g>1.5)
this.g*=_defs__WEBPACK_IMPORTED_MODULE_0__["RGB_TO_DEC"];;if(this.b>1.5)
this.b*=_defs__WEBPACK_IMPORTED_MODULE_0__["RGB_TO_DEC"];if(this.a>1.5)
this.a*=_defs__WEBPACK_IMPORTED_MODULE_0__["RGB_TO_DEC"];}
transformHSV(hue,sat,val)
{let VSU=val*sat*Math.cos(hue*_defs__WEBPACK_IMPORTED_MODULE_0__["DEG_TO_RAD"]);let VSW=val*sat*Math.sin(hue*_defs__WEBPACK_IMPORTED_MODULE_0__["DEG_TO_RAD"]);let _r=this.data[0],_g=this.data[1],_b=this.data[2];this.data[0]=(.299*val+.701*VSU+.168*VSW)*_r
+(.587*val-.587*VSU+.330*VSW)*_g
+(.114*val-.114*VSU-.497*VSW)*_b;this.data[1]=(.299*val-.299*VSU-.328*VSW)*_r
+(.587*val+.413*VSU+.035*VSW)*_g
+(.114*val-.114*VSU+.292*VSW)*_b;this.data[2]=(.299*val-.3*VSU+1.25*VSW)*_r
+(.587*val-.588*VSU-1.05*VSW)*_g
+(.114*val+.886*VSU-.203*VSW)*_b;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"DynamicOffset",function(){return DynamicOffset;});var _utilities_bitmask__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(38);var _point__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(11);var _size__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4);var _common_defs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(5);class DynamicOffset
{constructor()
{this.parameters=new _utilities_bitmask__WEBPACK_IMPORTED_MODULE_0__["BitMask"];this.point=new _point__WEBPACK_IMPORTED_MODULE_1__["Point"];}
add(value)
{this.parameters.add(value);}
setX(value)
{this.point.x=value;}
setY(value)
{this.point.y=value;}
isEmpty()
{return this.parameters.isEmpty();}
getPos(defaultHalfSize)
{let pos=new _point__WEBPACK_IMPORTED_MODULE_1__["Point"];let halfSize=new _size__WEBPACK_IMPORTED_MODULE_2__["Size"](defaultHalfSize.w,defaultHalfSize.h);halfSize.round();if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EDO_LEFT"]))
pos.x=-(halfSize.w-this.point.x);else if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EDO_RIGHT"]))
pos.x=halfSize.w-this.point.x;else if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EDO_HORZ_CENTER"]))
pos.x=this.point.x;if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EDO_TOP"]))
pos.y=halfSize.h-this.point.y;else if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EDO_BOTTOM"]))
pos.y=-(halfSize.h-this.point.y);else if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EDO_VERT_CENTER"]))
pos.y=this.point.y;return pos;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"BitMask",function(){return BitMask;});class BitMask
{constructor(value=0)
{this.bitmask=value;}
add(args)
{this.bitmask|=args;}
remove(args)
{this.bitmask &=args ^-1;}
removeAllExcept(args)
{this.bitmask &=args;}
clear()
{this.bitmask=0;}
isEmpty()
{return(this.bitmask===0);}
isSet(args)
{return(this.bitmask & args)!==0;}
areAllSet(args)
{return(this.bitmask & args)===args;}
getIncluding(args)
{return this.bitmask| args;}
getExcluding(args)
{return this.bitmask &(args ^-1);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"assetHolder",function(){return assetHolder;});class AssetHolder
{constructor()
{this.loadMapMap=new Map;}
has(group,name)
{let groupMap=this.loadMapMap.get(group);if(groupMap===undefined)
return false;return groupMap.has(name);}
set(group,name,data=null)
{let groupMap=this.loadMapMap.get(group);if(groupMap===undefined)
{groupMap=new Map;this.loadMapMap.set(group,groupMap);}
groupMap.set(name,data);}
get(group,name)
{let groupMap=this.loadMapMap.get(group);if(groupMap===undefined)
throw new Error(`Group does not exist!(${group}).`);let data=groupMap.get(name);if(data===undefined)
throw new Error(`Data does not exist!(${name}).`);return data;}
deleteGroup(groupAry)
{for(let i=0;i<groupAry.length;++i)
this.loadMapMap.delete(groupAry[i]);}
clear()
{if(this.loadMapMap.size)
this.loadMapMap.clear();}
}
var assetHolder=new AssetHolder;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ObjectData2D",function(){return ObjectData2D;});var _objectphysicsdata2d__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(41);var _objectvisualdata2d__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(43);var _common_size__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4);var _common_defs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(5);var _utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(35);class ObjectData2D
{constructor()
{this.visualData=new _objectvisualdata2d__WEBPACK_IMPORTED_MODULE_1__["ObjectVisualData2D"];this.physicsData=new _objectphysicsdata2d__WEBPACK_IMPORTED_MODULE_0__["ObjectPhysicsData2D"];this.name=null;this.group=null;this.size=new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"];}
copy(obj)
{this.visualData.copy(obj.visualData);this.physicsData.copy(obj.physicsData);this.size.copy(obj.size);}
loadObjData(node,group,name)
{this.name=name;this.group=group;this.size=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_4__["loadSize"](node,this.size);this.visualData.loadObjData(node);this.physicsData.loadObjData(node);}
createFromData(group)
{this.visualData.createFromData(group,this.size);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Fixture",function(){return Fixture;});__webpack_require__.d(__webpack_exports__,"ObjectPhysicsData2D",function(){return ObjectPhysicsData2D;});var _Box2D_planck_min__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(42);var _Box2D_planck_min__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_0__);class Fixture
{constructor()
{this.shape=null;this.radius=0.0;this.friction=0.2;this.density=0.2;this.restitution=0.2;this.topMod=0;this.bottomMod=0;this.leftMod=0;this.rightMod=0;this.chainLoop=false;this.sensor=false;this.filterGroupIndex=0;this.filterCategoryBits=1;this.filterMaskBits=65535;this.vertAry=[];}
copy(obj)
{this.shape=obj.shape;this.radius=obj.radius;this.friction=obj.friction;this.density=obj.density;this.restitution=obj.restitution;this.topMod=obj.topMod;this.bottomMod=obj.bottomMod;this.leftMod=obj.leftMod;this.rightMod=obj.rightMod;this.chainLoop=obj.chainLoop;this.sensor=obj.sensor;this.filterGroupIndex=obj.filterGroupIndex;this.filterCategoryBits=obj.filterCategoryBits;this.filterMaskBits=obj.filterMaskBits;for(let i=0;i<obj.vertAry.length;++i)
{let vert=obj.vertAry[i];this.vertAry.push(new _Box2D_planck_min__WEBPACK_IMPORTED_MODULE_0__["Vec2"](vert.x,vert.y));}
}
}
class ObjectPhysicsData2D
{constructor()
{this.world=null;this.bodyType=null;this.linearDamping=0;this.angularDamping=0;this.fixedRotation=false;this.fixtureAry=[];}
copy(obj)
{this.world=obj.world;this.bodyType=obj.bodyType;this.linearDamping=obj.linearDamping;this.angularDamping=obj.angularDamping;this.fixedRotation=obj.fixedRotation;for(let i=0;i<obj.fixtureAry.length;++i)
{let fixture=new Fixture;fixture.copy(obj.fixtureAry[i]);this.fixtureAry.push(fixture);}
}
loadObjData(node)
{let physicsNode=node.getElementsByTagName('physics');if(physicsNode.length)
{let attr=physicsNode[0].getAttribute('world');if(attr)
this.world=attr;let bodyNode=physicsNode[0].getElementsByTagName('body');if(bodyNode.length)
{attr=bodyNode[0].getAttribute('type');if(attr)
this.bodyType=attr;attr=bodyNode[0].getAttribute('linearDamping');if(attr)
this.linearDamping=Number(attr);attr=bodyNode[0].getAttribute('angularDamping');if(attr)
this.angularDamping=Number(attr);attr=bodyNode[0].getAttribute('fixedRotation');if(attr)
this.fixedRotation=(attr==='true');}
let fixtureNode=physicsNode[0].getElementsByTagName('fixture');for(let i=0;i<fixtureNode.length;++i)
{let fixture=this.fixtureAry[i];if(fixture===undefined)
{fixture=new Fixture;this.fixtureAry.push(fixture);}
attr=fixtureNode[i].getAttribute('shape');if(attr)
fixture.shape=attr;attr=fixtureNode[i].getAttribute('friction');if(attr)
fixture.friction=Number(attr);attr=fixtureNode[i].getAttribute('density');if(attr)
fixture.density=Number(attr);attr=fixtureNode[i].getAttribute('restitution');if(attr)
fixture.restitution=Number(attr);attr=fixtureNode[i].getAttribute('radius');if(attr)
fixture.radius=Number(attr);attr=fixtureNode[i].getAttribute('chainLoop');if(attr)
fixture.chainLoop=(attr==='true');attr=fixtureNode[i].getAttribute('sensor');if(attr)
fixture.sensor=(attr==='true');let vertNode=fixtureNode[i].getElementsByTagName('vert');for(let j=0;j<vertNode.length;++j)
{fixture.vertAry.push(
new _Box2D_planck_min__WEBPACK_IMPORTED_MODULE_0__["Vec2"](
Number(vertNode[j].getAttribute('x')),Number(vertNode[j].getAttribute('y'))));}
let filterNode=fixtureNode[i].getElementsByTagName('collisionFilter');if(filterNode.length)
{attr=filterNode[0].getAttribute('categoryBits');if(attr)
fixture.filterGroupIndex=Number(attr);attr=filterNode[0].getAttribute('maskBits');if(attr)
fixture.filterMaskBits=Number(attr);attr=filterNode[0].getAttribute('groupIndex');if(attr)
fixture.filterGroupIndex=Number(attr);}
let sizeModNode=fixtureNode[i].getElementsByTagName('sizeMod');if(sizeModNode.length)
{attr=sizeModNode[0].getAttribute('top');if(attr)
fixture.topMod=Number(attr);attr=sizeModNode[0].getAttribute('bottom');if(attr)
fixture.bottomMod=Number(attr);attr=sizeModNode[0].getAttribute('left');if(attr)
fixture.leftMod=Number(attr);attr=sizeModNode[0].getAttribute('right');if(attr)
fixture.rightMod=Number(attr);}
}
}
}
isActive()
{return(this.bodyType!==null);}
}
}),(function(module,exports,__webpack_require__){var require;var require;!function(t){if(true)module.exports=t();else{var i;}}(function(){return function t(i,o,e){function s(r,m){if(!o[r]){if(!i[r]){var a="function"==typeof require&&require;if(!m&&a)return require(r,!0);if(n)return n(r,!0);var h=new Error("Cannot find module '"+r+"'");throw h.code="MODULE_NOT_FOUND",h}var c=o[r]={exports:{}};i[r][0].call(c.exports,function(t){var o=i[r][1][t];return s(o?o:t)},c,c.exports,t,i,o,e)}return o[r].exports}for(var n="function"==typeof require&&require,r=0;r<e.length;r++)s(e[r]);return s}({1:[function(t,i,o){o.internal={},o.Math=t("./common/Math"),o.Vec2=t("./common/Vec2"),o.Transform=t("./common/Transform"),o.Rot=t("./common/Rot"),o.AABB=t("./collision/AABB"),o.Shape=t("./Shape"),o.Fixture=t("./Fixture"),o.Body=t("./Body"),o.Contact=t("./Contact"),o.Joint=t("./Joint"),o.World=t("./World"),o.Circle=t("./shape/CircleShape"),o.Edge=t("./shape/EdgeShape"),o.Polygon=t("./shape/PolygonShape"),o.Chain=t("./shape/ChainShape"),o.Box=t("./shape/BoxShape"),t("./shape/CollideCircle"),t("./shape/CollideEdgeCircle"),o.internal.CollidePolygons=t("./shape/CollidePolygon"),t("./shape/CollideCirclePolygone"),t("./shape/CollideEdgePolygon"),o.DistanceJoint=t("./joint/DistanceJoint"),o.FrictionJoint=t("./joint/FrictionJoint"),o.GearJoint=t("./joint/GearJoint"),o.MotorJoint=t("./joint/MotorJoint"),o.MouseJoint=t("./joint/MouseJoint"),o.PrismaticJoint=t("./joint/PrismaticJoint"),o.PulleyJoint=t("./joint/PulleyJoint"),o.RevoluteJoint=t("./joint/RevoluteJoint"),o.RopeJoint=t("./joint/RopeJoint"),o.WeldJoint=t("./joint/WeldJoint"),o.WheelJoint=t("./joint/WheelJoint"),o.internal.Sweep=t("./common/Sweep"),o.internal.stats=t("./common/stats"),o.internal.Manifold=t("./Manifold"),o.internal.Distance=t("./collision/Distance"),o.internal.TimeOfImpact=t("./collision/TimeOfImpact"),o.internal.DynamicTree=t("./collision/DynamicTree"),o.internal.Settings=t("./Settings")},{"./Body":2,"./Contact":3,"./Fixture":4,"./Joint":5,"./Manifold":6,"./Settings":7,"./Shape":8,"./World":10,"./collision/AABB":11,"./collision/Distance":13,"./collision/DynamicTree":14,"./collision/TimeOfImpact":15,"./common/Math":18,"./common/Rot":20,"./common/Sweep":21,"./common/Transform":22,"./common/Vec2":23,"./common/stats":26,"./joint/DistanceJoint":27,"./joint/FrictionJoint":28,"./joint/GearJoint":29,"./joint/MotorJoint":30,"./joint/MouseJoint":31,"./joint/PrismaticJoint":32,"./joint/PulleyJoint":33,"./joint/RevoluteJoint":34,"./joint/RopeJoint":35,"./joint/WeldJoint":36,"./joint/WheelJoint":37,"./shape/BoxShape":38,"./shape/ChainShape":39,"./shape/CircleShape":40,"./shape/CollideCircle":41,"./shape/CollideCirclePolygone":42,"./shape/CollideEdgeCircle":43,"./shape/CollideEdgePolygon":44,"./shape/CollidePolygon":45,"./shape/EdgeShape":46,"./shape/PolygonShape":47}],2:[function(t,i,o){function e(t,i){i=n(i,d),this.m_world=t,this.m_awakeFlag=i.awake,this.m_autoSleepFlag=i.allowSleep,this.m_bulletFlag=i.bullet,this.m_fixedRotationFlag=i.fixedRotation,this.m_activeFlag=i.active,this.m_islandFlag=!1,this.m_toiFlag=!1,this.m_userData=i.userData,this.m_type=i.type,this.m_type==y?(this.m_mass=1,this.m_invMass=1):(this.m_mass=0,this.m_invMass=0),this.m_I=0,this.m_invI=0,this.m_xf=h.identity(),this.m_xf.p=r.clone(i.position),this.m_xf.q.setAngle(i.angle),this.m_sweep=new a,this.m_sweep.setTransform(this.m_xf),this.c_velocity=new c,this.c_position=new _,this.m_force=r.zero(),this.m_torque=0,this.m_linearVelocity=r.clone(i.linearVelocity),this.m_angularVelocity=i.angularVelocity,this.m_linearDamping=i.linearDamping,this.m_angularDamping=i.angularDamping,this.m_gravityScale=i.gravityScale,this.m_sleepTime=0,this.m_jointList=null,this.m_contactList=null,this.m_fixtureList=null,this.m_prev=null,this.m_next=null}function s(){this.mass=0,this.center=r.zero(),this.I=0}DEBUG=!1,ASSERT=!1,i.exports=e;var n=(t("./util/common"),t("./util/options")),r=t("./common/Vec2"),m=t("./common/Rot"),a=(t("./common/Math"),t("./common/Sweep")),h=t("./common/Transform"),c=t("./common/Velocity"),_=t("./common/Position"),l=t("./Fixture"),u=(t("./Shape"),t("./World"),e.STATIC="static"),p=e.KINEMATIC="kinematic",y=e.DYNAMIC="dynamic",d={type:u,position:r.zero(),angle:0,linearVelocity:r.zero(),angularVelocity:0,linearDamping:0,angularDamping:0,fixedRotation:!1,bullet:!1,gravityScale:1,allowSleep:!0,awake:!0,active:!0,userData:null};e.prototype.isWorldLocked=function(){return!(!this.m_world||!this.m_world.isLocked())},e.prototype.getWorld=function(){return this.m_world},e.prototype.getNext=function(){return this.m_next},e.prototype.setUserData=function(t){this.m_userData=t},e.prototype.getUserData=function(){return this.m_userData},e.prototype.getFixtureList=function(){return this.m_fixtureList},e.prototype.getJointList=function(){return this.m_jointList},e.prototype.getContactList=function(){return this.m_contactList},e.prototype.isStatic=function(){return this.m_type==u},e.prototype.isDynamic=function(){return this.m_type==y},e.prototype.isKinematic=function(){return this.m_type==p},e.prototype.setStatic=function(){return this.setType(u),this},e.prototype.setDynamic=function(){return this.setType(y),this},e.prototype.setKinematic=function(){return this.setType(p),this},e.prototype.getType=function(){return this.m_type},e.prototype.setType=function(t){if(1!=this.isWorldLocked()&&this.m_type!=t){this.m_type=t,this.resetMassData(),this.m_type==u&&(this.m_linearVelocity.setZero(),this.m_angularVelocity=0,this.m_sweep.forward(),this.synchronizeFixtures()),this.setAwake(!0),this.m_force.setZero(),this.m_torque=0;for(var i=this.m_contactList;i;){var o=i;i=i.next,this.m_world.destroyContact(o.contact)}this.m_contactList=null;for(var e=this.m_world.m_broadPhase,s=this.m_fixtureList;s;s=s.m_next)for(var n=s.m_proxyCount,r=0;r<n;++r)e.touchProxy(s.m_proxies[r].proxyId)}},e.prototype.isBullet=function(){return this.m_bulletFlag},e.prototype.setBullet=function(t){this.m_bulletFlag=!!t},e.prototype.isSleepingAllowed=function(){return this.m_autoSleepFlag},e.prototype.setSleepingAllowed=function(t){this.m_autoSleepFlag=!!t,0==this.m_autoSleepFlag&&this.setAwake(!0)},e.prototype.isAwake=function(){return this.m_awakeFlag},e.prototype.setAwake=function(t){t?0==this.m_awakeFlag&&(this.m_awakeFlag=!0,this.m_sleepTime=0):(this.m_awakeFlag=!1,this.m_sleepTime=0,this.m_linearVelocity.setZero(),this.m_angularVelocity=0,this.m_force.setZero(),this.m_torque=0)},e.prototype.isActive=function(){return this.m_activeFlag},e.prototype.setActive=function(t){if(t!=this.m_activeFlag)if(this.m_activeFlag=!!t,this.m_activeFlag)for(var i=this.m_world.m_broadPhase,o=this.m_fixtureList;o;o=o.m_next)o.createProxies(i,this.m_xf);else{for(var i=this.m_world.m_broadPhase,o=this.m_fixtureList;o;o=o.m_next)o.destroyProxies(i);for(var e=this.m_contactList;e;){var s=e;e=e.next,this.m_world.destroyContact(s.contact)}this.m_contactList=null}},e.prototype.isFixedRotation=function(){return this.m_fixedRotationFlag},e.prototype.setFixedRotation=function(t){this.m_fixedRotationFlag!=t&&(this.m_fixedRotationFlag=!!t,this.m_angularVelocity=0,this.resetMassData())},e.prototype.getTransform=function(){return this.m_xf},e.prototype.setTransform=function(t,i){if(1!=this.isWorldLocked()){this.m_xf.set(t,i),this.m_sweep.setTransform(this.m_xf);for(var o=this.m_world.m_broadPhase,e=this.m_fixtureList;e;e=e.m_next)e.synchronize(o,this.m_xf,this.m_xf)}},e.prototype.synchronizeTransform=function(){this.m_sweep.getTransform(this.m_xf,1)},e.prototype.synchronizeFixtures=function(){var t=h.identity();this.m_sweep.getTransform(t,0);for(var i=this.m_world.m_broadPhase,o=this.m_fixtureList;o;o=o.m_next)o.synchronize(i,t,this.m_xf)},e.prototype.advance=function(t){this.m_sweep.advance(t),this.m_sweep.c.set(this.m_sweep.c0),this.m_sweep.a=this.m_sweep.a0,this.m_sweep.getTransform(this.m_xf,1)},e.prototype.getPosition=function(){return this.m_xf.p},e.prototype.setPosition=function(t){this.setTransform(t,this.m_sweep.a)},e.prototype.getAngle=function(){return this.m_sweep.a},e.prototype.setAngle=function(t){this.setTransform(this.m_xf.p,t)},e.prototype.getWorldCenter=function(){return this.m_sweep.c},e.prototype.getLocalCenter=function(){return this.m_sweep.localCenter},e.prototype.getLinearVelocity=function(){return this.m_linearVelocity},e.prototype.getLinearVelocityFromWorldPoint=function(t){var i=r.sub(t,this.m_sweep.c);return r.add(this.m_linearVelocity,r.cross(this.m_angularVelocity,i))},e.prototype.getLinearVelocityFromLocalPoint=function(t){return this.getLinearVelocityFromWorldPoint(this.getWorldPoint(t))},e.prototype.setLinearVelocity=function(t){this.m_type!=u&&(r.dot(t,t)>0&&this.setAwake(!0),this.m_linearVelocity.set(t))},e.prototype.getAngularVelocity=function(){return this.m_angularVelocity},e.prototype.setAngularVelocity=function(t){this.m_type!=u&&(t*t>0&&this.setAwake(!0),this.m_angularVelocity=t)},e.prototype.getLinearDamping=function(){return this.m_linearDamping},e.prototype.setLinearDamping=function(t){this.m_linearDamping=t},e.prototype.getAngularDamping=function(){return this.m_angularDamping},e.prototype.setAngularDamping=function(t){this.m_angularDamping=t},e.prototype.getGravityScale=function(){return this.m_gravityScale},e.prototype.setGravityScale=function(t){this.m_gravityScale=t},e.prototype.getMass=function(){return this.m_mass},e.prototype.getInertia=function(){return this.m_I+this.m_mass*r.dot(this.m_sweep.localCenter,this.m_sweep.localCenter)},e.prototype.getMassData=function(t){t.mass=this.m_mass,t.I=this.getInertia(),t.center.set(this.m_sweep.localCenter)},e.prototype.resetMassData=function(){if(this.m_mass=0,this.m_invMass=0,this.m_I=0,this.m_invI=0,this.m_sweep.localCenter.setZero(),this.isStatic()||this.isKinematic())return this.m_sweep.c0.set(this.m_xf.p),this.m_sweep.c.set(this.m_xf.p),void(this.m_sweep.a0=this.m_sweep.a);for(var t=r.zero(),i=this.m_fixtureList;i;i=i.m_next)if(0!=i.m_density){var o=new s;i.getMassData(o),this.m_mass+=o.mass,t.wAdd(o.mass,o.center),this.m_I+=o.I}this.m_mass>0?(this.m_invMass=1/this.m_mass,t.mul(this.m_invMass)):(this.m_mass=1,this.m_invMass=1),this.m_I>0&&0==this.m_fixedRotationFlag?(this.m_I-=this.m_mass*r.dot(t,t),this.m_invI=1/this.m_I):(this.m_I=0,this.m_invI=0);var e=r.clone(this.m_sweep.c);this.m_sweep.setLocalCenter(t,this.m_xf),this.m_linearVelocity.add(r.cross(this.m_angularVelocity,r.sub(this.m_sweep.c,e)))},e.prototype.setMassData=function(t){if(1!=this.isWorldLocked()&&this.m_type==y){this.m_invMass=0,this.m_I=0,this.m_invI=0,this.m_mass=t.mass,this.m_mass<=0&&(this.m_mass=1),this.m_invMass=1/this.m_mass,t.I>0&&0==this.m_fixedRotationFlag&&(this.m_I=t.I-this.m_mass*r.dot(t.center,t.center),this.m_invI=1/this.m_I);var i=r.clone(this.m_sweep.c);this.m_sweep.setLocalCenter(t.center,this.m_xf),this.m_linearVelocity.add(r.cross(this.m_angularVelocity,r.sub(this.m_sweep.c,i)))}},e.prototype.applyForce=function(t,i,o){this.m_type==y&&(o&&0==this.m_awakeFlag&&this.setAwake(!0),this.m_awakeFlag&&(this.m_force.add(t),this.m_torque+=r.cross(r.sub(i,this.m_sweep.c),t)))},e.prototype.applyForceToCenter=function(t,i){this.m_type==y&&(i&&0==this.m_awakeFlag&&this.setAwake(!0),this.m_awakeFlag&&this.m_force.add(t))},e.prototype.applyTorque=function(t,i){this.m_type==y&&(i&&0==this.m_awakeFlag&&this.setAwake(!0),this.m_awakeFlag&&(this.m_torque+=t))},e.prototype.applyLinearImpulse=function(t,i,o){this.m_type==y&&(o&&0==this.m_awakeFlag&&this.setAwake(!0),this.m_awakeFlag&&(this.m_linearVelocity.wAdd(this.m_invMass,t),this.m_angularVelocity+=this.m_invI*r.cross(r.sub(i,this.m_sweep.c),t)))},e.prototype.applyAngularImpulse=function(t,i){this.m_type==y&&(i&&0==this.m_awakeFlag&&this.setAwake(!0),this.m_awakeFlag&&(this.m_angularVelocity+=this.m_invI*t))},e.prototype.shouldCollide=function(t){if(this.m_type!=y&&t.m_type!=y)return!1;for(var i=this.m_jointList;i;i=i.next)if(i.other==t&&0==i.joint.m_collideConnected)return!1;return!0},e.prototype.createFixture=function(t,i){if(1==this.isWorldLocked())return null;var o=new l(this,t,i);if(this.m_activeFlag){var e=this.m_world.m_broadPhase;o.createProxies(e,this.m_xf)}return o.m_next=this.m_fixtureList,this.m_fixtureList=o,o.m_density>0&&this.resetMassData(),this.m_world.m_newFixture=!0,o},e.prototype.destroyFixture=function(t){if(1!=this.isWorldLocked()){for(var i=this.m_fixtureList,o=!1;null!=i;){if(i==t){i=t.m_next,o=!0;break}i=i.m_next}for(var e=this.m_contactList;e;){var s=e.contact;e=e.next;var n=s.getFixtureA(),r=s.getFixtureB();t!=n&&t!=r||this.m_world.destroyContact(s)}if(this.m_activeFlag){var m=this.m_world.m_broadPhase;t.destroyProxies(m)}t.m_body=null,t.m_next=null,this.m_world.publish("remove-fixture",t),this.resetMassData()}},e.prototype.getWorldPoint=function(t){return h.mul(this.m_xf,t)},e.prototype.getWorldVector=function(t){return m.mul(this.m_xf.q,t)},e.prototype.getLocalPoint=function(t){return h.mulT(this.m_xf,t)},e.prototype.getLocalVector=function(t){return m.mulT(this.m_xf.q,t)}},{"./Fixture":4,"./Shape":8,"./World":10,"./common/Math":18,"./common/Position":19,"./common/Rot":20,"./common/Sweep":21,"./common/Transform":22,"./common/Vec2":23,"./common/Velocity":25,"./util/common":50,"./util/options":52}],3:[function(t,i,o){function e(t){this.contact=t,this.prev,this.next,this.other}function s(t,i,o,s,n){this.m_nodeA=new e(this),this.m_nodeB=new e(this),this.m_fixtureA=t,this.m_fixtureB=o,this.m_indexA=i,this.m_indexB=s,this.m_evaluateFcn=n,this.m_manifold=new y,this.m_prev=null,this.m_next=null,this.m_toi=1,this.m_toiCount=0,this.m_toiFlag=!1,this.m_friction=r(this.m_fixtureA.m_friction,this.m_fixtureB.m_friction),this.m_restitution=m(this.m_fixtureA.m_restitution,this.m_fixtureB.m_restitution),this.m_tangentSpeed=0,this.m_enabledFlag=!0,this.m_islandFlag=!1,this.m_touchingFlag=!1,this.m_filterFlag=!1,this.m_bulletHitFlag=!1,this.v_points=[],this.v_normal=c.zero(),this.v_normalMass=new l,this.v_K=new l,this.v_pointCount,this.v_tangentSpeed,this.v_friction,this.v_restitution,this.v_invMassA,this.v_invMassB,this.v_invIA,this.v_invIB,this.p_localPoints=[],this.p_localNormal=c.zero(),this.p_localPoint=c.zero(),this.p_localCenterA=c.zero(),this.p_localCenterB=c.zero(),this.p_type,this.p_radiusA,this.p_radiusB,this.p_pointCount,this.p_invMassA,this.p_invMassB,this.p_invIA,this.p_invIB}function n(){this.rA=c.zero(),this.rB=c.zero(),this.normalImpulse=0,this.tangentImpulse=0,this.normalMass=0,this.tangentMass=0,this.velocityBias=0}function r(t,i){return h.sqrt(t*i)}function m(t,i){return t>i?t:i}DEBUG=!1,ASSERT=!1;var a=!1,h=(t("./util/common"),t("./common/Math")),c=t("./common/Vec2"),_=t("./common/Transform"),l=t("./common/Mat22"),u=t("./common/Rot"),p=t("./Settings"),y=t("./Manifold"),d=t("./collision/Distance");i.exports=s,s.prototype.initConstraint=function(t){var i=this.m_fixtureA,o=this.m_fixtureB,e=i.getShape(),s=o.getShape(),r=i.getBody(),m=o.getBody(),a=this.getManifold(),h=a.pointCount;this.v_invMassA=r.m_invMass,this.v_invMassB=m.m_invMass,this.v_invIA=r.m_invI,this.v_invIB=m.m_invI,this.v_friction=this.m_friction,this.v_restitution=this.m_restitution,this.v_tangentSpeed=this.m_tangentSpeed,this.v_pointCount=h,this.v_K.setZero(),this.v_normalMass.setZero(),this.p_invMassA=r.m_invMass,this.p_invMassB=m.m_invMass,this.p_invIA=r.m_invI,this.p_invIB=m.m_invI,this.p_localCenterA=c.clone(r.m_sweep.localCenter),this.p_localCenterB=c.clone(m.m_sweep.localCenter),this.p_radiusA=e.m_radius,this.p_radiusB=s.m_radius,this.p_type=a.type,this.p_localNormal=c.clone(a.localNormal),this.p_localPoint=c.clone(a.localPoint),this.p_pointCount=h;for(var _=0;_<h;++_){var l=a.points[_],u=this.v_points[_]=new n;t.warmStarting?(u.normalImpulse=t.dtRatio*l.normalImpulse,u.tangentImpulse=t.dtRatio*l.tangentImpulse):(u.normalImpulse=0,u.tangentImpulse=0),u.rA.setZero(),u.rB.setZero(),u.normalMass=0,u.tangentMass=0,u.velocityBias=0,this.p_localPoints[_]=c.clone(l.localPoint)}},s.prototype.getManifold=function(){return this.m_manifold},s.prototype.getWorldManifold=function(t){var i=this.m_fixtureA.getBody(),o=this.m_fixtureB.getBody(),e=this.m_fixtureA.getShape(),s=this.m_fixtureB.getShape();return this.m_manifold.getWorldManifold(t,i.getTransform(),e.m_radius,o.getTransform(),s.m_radius)},s.prototype.setEnabled=function(t){this.m_enabledFlag=!!t},s.prototype.isEnabled=function(){return this.m_enabledFlag},s.prototype.isTouching=function(){return this.m_touchingFlag},s.prototype.getNext=function(){return this.m_next},s.prototype.getFixtureA=function(){return this.m_fixtureA},s.prototype.getFixtureB=function(){return this.m_fixtureB},s.prototype.getChildIndexA=function(){return this.m_indexA},s.prototype.getChildIndexB=function(){return this.m_indexB},s.prototype.flagForFiltering=function(){this.m_filterFlag=!0},s.prototype.setFriction=function(t){this.m_friction=t},s.prototype.getFriction=function(){return this.m_friction},s.prototype.resetFriction=function(){this.m_friction=r(this.m_fixtureA.m_friction,this.m_fixtureB.m_friction)},s.prototype.setRestitution=function(t){this.m_restitution=t},s.prototype.getRestitution=function(){return this.m_restitution},s.prototype.resetRestitution=function(){this.m_restitution=m(this.m_fixtureA.m_restitution,this.m_fixtureB.m_restitution)},s.prototype.setTangentSpeed=function(t){this.m_tangentSpeed=t},s.prototype.getTangentSpeed=function(){return this.m_tangentSpeed},s.prototype.evaluate=function(t,i,o){this.m_evaluateFcn(t,i,this.m_fixtureA,this.m_indexA,o,this.m_fixtureB,this.m_indexB)},s.prototype.update=function(t){this.m_enabledFlag=!0;var i=!1,o=this.m_touchingFlag,e=this.m_fixtureA.isSensor(),s=this.m_fixtureB.isSensor(),n=e||s,r=this.m_fixtureA.getBody(),m=this.m_fixtureB.getBody(),a=r.getTransform(),h=m.getTransform();if(n){var c=this.m_fixtureA.getShape(),_=this.m_fixtureB.getShape();i=d.testOverlap(c,this.m_indexA,_,this.m_indexB,a,h),this.m_manifold.pointCount=0}else{var l=this.m_manifold;this.m_manifold=new y,this.evaluate(this.m_manifold,a,h),i=this.m_manifold.pointCount>0;for(var u=0;u<this.m_manifold.pointCount;++u){var p=this.m_manifold.points[u];p.normalImpulse=0,p.tangentImpulse=0;for(var v=0;v<l.pointCount;++v){var f=l.points[v];if(f.id.key==p.id.key){p.normalImpulse=f.normalImpulse,p.tangentImpulse=f.tangentImpulse;break}}}i!=o&&(r.setAwake(!0),m.setAwake(!0))}this.m_touchingFlag=i,0==o&&1==i&&t&&t.beginContact(this),1==o&&0==i&&t&&t.endContact(this),0==n&&i&&t&&t.preSolve(this,l)},s.prototype.solvePositionConstraint=function(t){return this._solvePositionConstraint(t,!1)},s.prototype.solvePositionConstraintTOI=function(t,i,o){return this._solvePositionConstraint(t,!0,i,o)},s.prototype._solvePositionConstraint=function(t,i,o,e){var s=this.m_fixtureA,n=this.m_fixtureB,r=s.getBody(),m=n.getBody(),a=(r.c_velocity,m.c_velocity,r.c_position),l=m.c_position,d=c.clone(this.p_localCenterA),v=c.clone(this.p_localCenterB),f=0,A=0;i&&r!=o&&r!=e||(f=this.p_invMassA,A=this.p_invIA);var x=0,g=0;i&&m!=o&&m!=e||(x=this.p_invMassB,g=this.p_invIB);for(var b=c.clone(a.c),B=a.a,w=c.clone(l.c),S=l.a,C=0,M=0;M<this.p_pointCount;++M){var I=_.identity(),T=_.identity();I.q.set(B),T.q.set(S),I.p=c.sub(b,u.mul(I.q,d)),T.p=c.sub(w,u.mul(T.q,v));var P,V,z;switch(this.p_type){case y.e_circles:var L=_.mul(I,this.p_localPoint),R=_.mul(T,this.p_localPoints[0]);P=c.sub(R,L),P.normalize(),V=c.wAdd(.5,L,.5,R),z=c.dot(c.sub(R,L),P)-this.p_radiusA-this.p_radiusB;break;case y.e_faceA:P=u.mul(I.q,this.p_localNormal);var F=_.mul(I,this.p_localPoint),D=_.mul(T,this.p_localPoints[M]);z=c.dot(c.sub(D,F),P)-this.p_radiusA-this.p_radiusB,V=D;break;case y.e_faceB:P=u.mul(T.q,this.p_localNormal);var F=_.mul(T,this.p_localPoint),D=_.mul(I,this.p_localPoints[M]);z=c.dot(c.sub(D,F),P)-this.p_radiusA-this.p_radiusB,V=D,P.mul(-1)}var q=c.sub(V,b),E=c.sub(V,w);C=h.min(C,z);var k=i?p.toiBaugarte:p.baumgarte,j=p.linearSlop,J=p.maxLinearCorrection,O=h.clamp(k*(z+j),-J,0),N=c.cross(q,P),G=c.cross(E,P),U=f+x+A*N*N+g*G*G,W=U>0?-O/U:0,Y=c.mul(W,P);b.wSub(f,Y),B-=A*c.cross(q,Y),w.wAdd(x,Y),S+=g*c.cross(E,Y)}return a.c.set(b),a.a=B,l.c.set(w),l.a=S,C},s.prototype.initVelocityConstraint=function(t){var i=this.m_fixtureA,o=this.m_fixtureB,e=i.getBody(),s=o.getBody(),n=e.c_velocity,r=s.c_velocity,m=e.c_position,a=s.c_position,h=this.p_radiusA,l=this.p_radiusB,y=this.getManifold(),d=this.v_invMassA,v=this.v_invMassB,f=this.v_invIA,A=this.v_invIB,x=c.clone(this.p_localCenterA),g=c.clone(this.p_localCenterB),b=c.clone(m.c),B=m.a,w=c.clone(n.v),S=n.w,C=c.clone(a.c),M=a.a,I=c.clone(r.v),T=r.w,P=_.identity(),V=_.identity();P.q.set(B),V.q.set(M),P.p.wSet(1,b,-1,u.mul(P.q,x)),V.p.wSet(1,C,-1,u.mul(V.q,g));var z=y.getWorldManifold(null,P,h,V,l);this.v_normal.set(z.normal);for(var L=0;L<this.v_pointCount;++L){var R=this.v_points[L];R.rA.set(c.sub(z.points[L],b)),R.rB.set(c.sub(z.points[L],C));var F=c.cross(R.rA,this.v_normal),D=c.cross(R.rB,this.v_normal),q=d+v+f*F*F+A*D*D;R.normalMass=q>0?1/q:0;var E=c.cross(this.v_normal,1),k=c.cross(R.rA,E),j=c.cross(R.rB,E),J=d+v+f*k*k+A*j*j;R.tangentMass=J>0?1/J:0,R.velocityBias=0;var O=c.dot(this.v_normal,I)+c.dot(this.v_normal,c.cross(T,R.rB))-c.dot(this.v_normal,w)-c.dot(this.v_normal,c.cross(S,R.rA));O<-p.velocityThreshold&&(R.velocityBias=-this.v_restitution*O)}if(2==this.v_pointCount&&t.blockSolve){var N=this.v_points[0],G=this.v_points[1],U=c.cross(N.rA,this.v_normal),W=c.cross(N.rB,this.v_normal),Y=c.cross(G.rA,this.v_normal),H=c.cross(G.rB,this.v_normal),Z=d+v+f*U*U+A*W*W,K=d+v+f*Y*Y+A*H*H,X=d+v+f*U*Y+A*W*H,Q=1e3;Z*Z<Q*(Z*K-X*X)?(this.v_K.ex.set(Z,X),this.v_K.ey.set(X,K),this.v_normalMass.set(this.v_K.getInverse())):this.v_pointCount=1}m.c.set(b),m.a=B,n.v.set(w),n.w=S,a.c.set(C),a.a=M,r.v.set(I),r.w=T},s.prototype.warmStartConstraint=function(t){for(var i=this.m_fixtureA,o=this.m_fixtureB,e=i.getBody(),s=o.getBody(),n=e.c_velocity,r=s.c_velocity,m=(e.c_position,s.c_position,this.v_invMassA),a=this.v_invIA,h=this.v_invMassB,_=this.v_invIB,l=c.clone(n.v),u=n.w,p=c.clone(r.v),y=r.w,d=this.v_normal,v=c.cross(d,1),f=0;f<this.v_pointCount;++f){var A=this.v_points[f],x=c.wAdd(A.normalImpulse,d,A.tangentImpulse,v);u-=a*c.cross(A.rA,x),l.wSub(m,x),y+=_*c.cross(A.rB,x),p.wAdd(h,x)}n.v.set(l),n.w=u,r.v.set(p),r.w=y},s.prototype.storeConstraintImpulses=function(t){for(var i=this.m_manifold,o=0;o<this.v_pointCount;++o)i.points[o].normalImpulse=this.v_points[o].normalImpulse,i.points[o].tangentImpulse=this.v_points[o].tangentImpulse},s.prototype.solveVelocityConstraint=function(t){for(var i=this.m_fixtureA.m_body,o=this.m_fixtureB.m_body,e=i.c_velocity,s=(i.c_position,o.c_velocity),n=(o.c_position,this.v_invMassA),r=this.v_invIA,m=this.v_invMassB,_=this.v_invIB,u=c.clone(e.v),p=e.w,y=c.clone(s.v),d=s.w,v=this.v_normal,f=c.cross(v,1),A=this.v_friction,x=0;x<this.v_pointCount;++x){var g=this.v_points[x],b=c.zero();b.wAdd(1,y,1,c.cross(d,g.rB)),b.wSub(1,u,1,c.cross(p,g.rA));var B=c.dot(b,f)-this.v_tangentSpeed,w=g.tangentMass*-B,S=A*g.normalImpulse,C=h.clamp(g.tangentImpulse+w,-S,S);w=C-g.tangentImpulse,g.tangentImpulse=C;var M=c.mul(w,f);u.wSub(n,M),p-=r*c.cross(g.rA,M),y.wAdd(m,M),d+=_*c.cross(g.rB,M)}if(1==this.v_pointCount||0==t.blockSolve)for(var I=0;I<this.v_pointCount;++I){var g=this.v_points[I],b=c.zero();b.wAdd(1,y,1,c.cross(d,g.rB)),b.wSub(1,u,1,c.cross(p,g.rA));var T=c.dot(b,v),w=-g.normalMass*(T-g.velocityBias),C=h.max(g.normalImpulse+w,0);w=C-g.normalImpulse,g.normalImpulse=C;var M=c.mul(w,v);u.wSub(n,M),p-=r*c.cross(g.rA,M),y.wAdd(m,M),d+=_*c.cross(g.rB,M)}else{var P=this.v_points[0],V=this.v_points[1],z=c.neo(P.normalImpulse,V.normalImpulse),L=c.zero().add(y).add(c.cross(d,P.rB)).sub(u).sub(c.cross(p,P.rA)),R=c.zero().add(y).add(c.cross(d,V.rB)).sub(u).sub(c.cross(p,V.rA)),F=c.dot(L,v),D=c.dot(R,v),q=c.neo(F-P.velocityBias,D-V.velocityBias);q.sub(l.mul(this.v_K,z));for(;;){var E=c.neg(l.mul(this.v_normalMass,q));if(E.x>=0&&E.y>=0){var k=c.sub(E,z),j=c.mul(k.x,v),J=c.mul(k.y,v);u.wSub(n,j,n,J),p-=r*(c.cross(P.rA,j)+c.cross(V.rA,J)),y.wAdd(m,j,m,J),d+=_*(c.cross(P.rB,j)+c.cross(V.rB,J)),P.normalImpulse=E.x,V.normalImpulse=E.y,a&&(L=y+c.cross(d,P.rB)-u-c.cross(p,P.rA),R=y+c.cross(d,V.rB)-u-c.cross(p,V.rA),F=Dot(L,v),D=Dot(R,v));break}if(E.x=-P.normalMass*q.x,E.y=0,F=0,D=this.v_K.ex.y*E.x+q.y,E.x>=0&&D>=0){var k=c.sub(E,z),j=c.mul(k.x,v),J=c.mul(k.y,v);if(u.wSub(n,j,n,J),p-=r*(c.cross(P.rA,j)+c.cross(V.rA,J)),y.wAdd(m,j,m,J),d+=_*(c.cross(P.rB,j)+c.cross(V.rB,J)),P.normalImpulse=E.x,V.normalImpulse=E.y,a){var O=c.add(y,c.cross(d,P.rB)),N=c.add(u,c.cross(p,P.rA)),L=c.sub(O,N);F=c.dot(L,v)}break}if(E.x=0,E.y=-V.normalMass*q.y,F=this.v_K.ey.x*E.y+q.x,D=0,E.y>=0&&F>=0){var k=c.sub(E,z),j=c.mul(k.x,v),J=c.mul(k.y,v);if(u.wSub(n,j,n,J),p-=r*(c.cross(P.rA,j)+c.cross(V.rA,J)),y.wAdd(m,j,m,J),d+=_*(c.cross(P.rB,j)+c.cross(V.rB,J)),P.normalImpulse=E.x,V.normalImpulse=E.y,a){var G=c.add(y,c.cross(d,V.rB)),U=c.add(u,c.cross(p,V.rA)),L=c.sub(G,U);D=c.dot(R,v)}break}if(E.x=0,E.y=0,F=q.x,D=q.y,F>=0&&D>=0){var k=c.sub(E,z),j=c.mul(k.x,v),J=c.mul(k.y,v);u.wSub(n,j,n,J),p-=r*(c.cross(P.rA,j)+c.cross(V.rA,J)),y.wAdd(m,j,m,J),d+=_*(c.cross(P.rB,j)+c.cross(V.rB,J)),P.normalImpulse=E.x,V.normalImpulse=E.y;break}break}}e.v.set(u),e.w=p,s.v.set(y),s.w=d};var v=[];s.addType=function(t,i,o){v[t]=v[t]||{},v[t][i]=o},s.create=function(t,i,o,e){var n,r,m=t.getType(),a=o.getType();if(r=v[m]&&v[m][a])n=new s(t,i,o,e,r);else{if(!(r=v[a]&&v[a][m]))return null;n=new s(o,e,t,i,r)}t=n.getFixtureA(),o=n.getFixtureB(),i=n.getChildIndexA(),e=n.getChildIndexB();var h=t.getBody(),c=o.getBody();return n.m_nodeA.contact=n,n.m_nodeA.other=c,n.m_nodeA.prev=null,n.m_nodeA.next=h.m_contactList,null!=h.m_contactList&&(h.m_contactList.prev=n.m_nodeA),h.m_contactList=n.m_nodeA,n.m_nodeB.contact=n,n.m_nodeB.other=h,n.m_nodeB.prev=null,n.m_nodeB.next=c.m_contactList,null!=c.m_contactList&&(c.m_contactList.prev=n.m_nodeB),c.m_contactList=n.m_nodeB,0==t.isSensor()&&0==o.isSensor()&&(h.setAwake(!0),c.setAwake(!0)),n},s.destroy=function(t,i){var o=t.m_fixtureA,e=t.m_fixtureB,s=o.getBody(),n=e.getBody();t.isTouching()&&i.endContact(t),t.m_nodeA.prev&&(t.m_nodeA.prev.next=t.m_nodeA.next),t.m_nodeA.next&&(t.m_nodeA.next.prev=t.m_nodeA.prev),t.m_nodeA==s.m_contactList&&(s.m_contactList=t.m_nodeA.next),t.m_nodeB.prev&&(t.m_nodeB.prev.next=t.m_nodeB.next),t.m_nodeB.next&&(t.m_nodeB.next.prev=t.m_nodeB.prev),t.m_nodeB==n.m_contactList&&(n.m_contactList=t.m_nodeB.next),t.m_manifold.pointCount>0&&0==o.isSensor()&&0==e.isSensor()&&(s.setAwake(!0),n.setAwake(!0));var r=o.getType(),m=e.getType(),a=v[r][m].destroyFcn;"function"==typeof a&&a(t)}},{"./Manifold":6,"./Settings":7,"./collision/Distance":13,"./common/Mat22":16,"./common/Math":18,"./common/Rot":20,"./common/Transform":22,"./common/Vec2":23,"./util/common":50}],4:[function(t,i,o){function e(t,i){this.aabb=new m,this.fixture=t,this.childIndex=i,this.proxyId}function s(t,i,o){i.shape?(o=i,i=i.shape):"number"==typeof o&&(o={density:o}),o=n(o,a),this.m_body=t,this.m_friction=o.friction,this.m_restitution=o.restitution,this.m_density=o.density,this.m_isSensor=o.isSensor,this.m_filterGroupIndex=o.filterGroupIndex,this.m_filterCategoryBits=o.filterCategoryBits,this.m_filterMaskBits=o.filterMaskBits,this.m_shape=i,this.m_next=null,this.m_proxies=[],this.m_proxyCount=0;for(var s=this.m_shape.getChildCount(),r=0;r<s;++r)this.m_proxies[r]=new e(this,r);this.m_userData=o.userData}DEBUG=!1,ASSERT=!1,i.exports=s;var n=(t("./util/common"),t("./util/options")),r=t("./common/Vec2"),m=t("./collision/AABB"),a={userData:null,friction:.2,restitution:0,density:0,isSensor:!1,filterGroupIndex:0,filterCategoryBits:1,filterMaskBits:65535};s.prototype.getType=function(){return this.m_shape.getType()},s.prototype.getShape=function(){return this.m_shape},s.prototype.isSensor=function(){return this.m_isSensor},s.prototype.setSensor=function(t){t!=this.m_isSensor&&(this.m_body.setAwake(!0),this.m_isSensor=t)},s.prototype.getUserData=function(){return this.m_userData},s.prototype.setUserData=function(t){this.m_userData=t},s.prototype.getBody=function(){return this.m_body},s.prototype.getNext=function(){return this.m_next},s.prototype.getDensity=function(){return this.m_density},s.prototype.setDensity=function(t){this.m_density=t},s.prototype.getFriction=function(){return this.m_friction},s.prototype.setFriction=function(t){this.m_friction=t},s.prototype.getRestitution=function(){return this.m_restitution},s.prototype.setRestitution=function(t){this.m_restitution=t},s.prototype.testPoint=function(t){return this.m_shape.testPoint(this.m_body.getTransform(),t)},s.prototype.rayCast=function(t,i,o){return this.m_shape.rayCast(t,i,this.m_body.getTransform(),o)},s.prototype.getMassData=function(t){this.m_shape.computeMass(t,this.m_density)},s.prototype.getAABB=function(t){return this.m_proxies[t].aabb},s.prototype.createProxies=function(t,i){this.m_proxyCount=this.m_shape.getChildCount();for(var o=0;o<this.m_proxyCount;++o){var e=this.m_proxies[o];this.m_shape.computeAABB(e.aabb,i,o),e.proxyId=t.createProxy(e.aabb,e)}},s.prototype.destroyProxies=function(t){for(var i=0;i<this.m_proxyCount;++i){var o=this.m_proxies[i];t.destroyProxy(o.proxyId),o.proxyId=null}this.m_proxyCount=0},s.prototype.synchronize=function(t,i,o){for(var e=0;e<this.m_proxyCount;++e){var s=this.m_proxies[e],n=new m,a=new m;this.m_shape.computeAABB(n,i,s.childIndex),this.m_shape.computeAABB(a,o,s.childIndex),s.aabb.combine(n,a);var h=r.sub(o.p,i.p);t.moveProxy(s.proxyId,s.aabb,h)}},s.prototype.setFilterData=function(t){this.m_filterGroupIndex=t.groupIndex,this.m_filterCategoryBits=t.categoryBits,this.m_filterMaskBits=t.maskBits,this.refilter()},s.prototype.getFilterGroupIndex=function(){return this.m_filterGroupIndex},s.prototype.getFilterCategoryBits=function(){return this.m_filterCategoryBits},s.prototype.getFilterMaskBits=function(){return this.m_filterMaskBits},s.prototype.refilter=function(){if(null!=this.m_body){for(var t=this.m_body.getContactList();t;){var i=t.contact,o=i.getFixtureA(),e=i.getFixtureB();o!=this&&e!=this||i.flagForFiltering(),t=t.next}var s=this.m_body.getWorld();if(null!=s)for(var n=s.m_broadPhase,r=0;r<this.m_proxyCount;++r)n.touchProxy(this.m_proxies[r].proxyId)}},s.prototype.shouldCollide=function(t){if(t.m_filterGroupIndex==this.m_filterGroupIndex&&0!=t.m_filterGroupIndex)return t.m_filterGroupIndex>0;var i=0!=(t.m_filterMaskBits&this.m_filterCategoryBits)&&0!=(t.m_filterCategoryBits&this.m_filterMaskBits);return i}},{"./collision/AABB":11,"./common/Vec2":23,"./util/common":50,"./util/options":52}],5:[function(t,i,o){function e(){this.other=null,this.joint=null,this.prev=null,this.next=null}function s(t,i,o){i=t.bodyA||i,o=t.bodyB||o,this.m_type="unknown-joint",this.m_bodyA=i,this.m_bodyB=o,this.m_index=0,this.m_collideConnected=!!t.collideConnected,this.m_prev=null,this.m_next=null,this.m_edgeA=new e,this.m_edgeB=new e,this.m_islandFlag=!1,this.m_userData=t.userData}DEBUG=!1,ASSERT=!1,i.exports=s;t("./util/common");s.prototype.isActive=function(){return this.m_bodyA.isActive()&&this.m_bodyB.isActive()},s.prototype.getType=function(){return this.m_type},s.prototype.getBodyA=function(){return this.m_bodyA},s.prototype.getBodyB=function(){return this.m_bodyB},s.prototype.getNext=function(){return this.m_next},s.prototype.getUserData=function(){return this.m_userData},s.prototype.setUserData=function(t){this.m_userData=t},s.prototype.getCollideConnected=function(){return this.m_collideConnected},s.prototype.getAnchorA=function(){},s.prototype.getAnchorB=function(){},s.prototype.getReactionForce=function(t){},s.prototype.getReactionTorque=function(t){},s.prototype.shiftOrigin=function(t){},s.prototype.initVelocityConstraints=function(t){},s.prototype.solveVelocityConstraints=function(t){},s.prototype.solvePositionConstraints=function(t){}},{"./util/common":50}],6:[function(t,i,o){function e(){this.type,this.localNormal=_.zero(),this.localPoint=_.zero(),this.points=[new s,new s],this.pointCount=0}function s(){this.localPoint=_.zero(),this.normalImpulse=0,this.tangentImpulse=0,this.id=new n}function n(){this.cf=new r,this.key}function r(){this.indexA,this.indexB,this.typeA,this.typeB}function m(){this.normal,this.points=[],this.separations=[]}function a(t,i,o,e){for(var s=0;s<o.pointCount;++s){var n=o.points[s].id;t[s]=y.removeState;for(var r=0;r<e.pointCount;++r)if(e.points[r].id.key==n.key){t[s]=y.persistState;break}}for(var s=0;s<e.pointCount;++s){var n=e.points[s].id;i[s]=y.addState;for(var r=0;r<o.pointCount;++r)if(o.points[r].id.key==n.key){i[s]=y.persistState;break}}}function h(){this.v=_.zero(),this.id=new n}function c(t,i,o,e,s){var n=0,m=_.dot(o,i[0].v)-e,a=_.dot(o,i[1].v)-e;if(m<=0&&t[n++].set(i[0]),a<=0&&t[n++].set(i[1]),m*a<0){var h=m/(m-a);t[n].v.wSet(1-h,i[0].v,h,i[1].v),t[n].id.cf.indexA=s,t[n].id.cf.indexB=i[0].id.cf.indexB,t[n].id.cf.typeA=r.e_vertex,t[n].id.cf.typeB=r.e_face,++n}return n}DEBUG=!1,ASSERT=!1;var _=(t("./util/common"),t("./common/Vec2")),l=t("./common/Transform"),u=t("./common/Math"),p=t("./common/Rot");i.exports=e,i.exports.clipSegmentToLine=c,i.exports.clipVertex=h,i.exports.getPointStates=a,i.exports.PointState=y,e.e_circles=0,e.e_faceA=1,e.e_faceB=2,e.e_vertex=0,e.e_face=1,n.prototype.set=function(t){this.key=t.key,this.cf.set(t.cf)},r.prototype.set=function(t){this.indexA=t.indexA,this.indexB=t.indexB,this.typeA=t.typeA,this.typeB=t.typeB},e.prototype.getWorldManifold=function(t,i,o,s,n){if(0!=this.pointCount){t=t||new m;var r=t.normal,a=t.points,h=t.separations;switch(this.type){case e.e_circles:r=_.neo(1,0);var c=l.mul(i,this.localPoint),y=l.mul(s,this.points[0].localPoint),d=_.sub(y,c);_.lengthSquared(d)>u.EPSILON*u.EPSILON&&(r.set(d),r.normalize()),a[0]=_.mid(c,y),h[0]=-n-o,a.length=1,h.length=1;break;case e.e_faceA:r=p.mul(i.q,this.localNormal);for(var v=l.mul(i,this.localPoint),f=0;f<this.pointCount;++f){var A=l.mul(s,this.points[f].localPoint),x=_.clone(A).wAdd(o-_.dot(_.sub(A,v),r),r),g=_.clone(A).wSub(n,r);a[f]=_.mid(x,g),h[f]=_.dot(_.sub(g,x),r)}a.length=this.pointCount,h.length=this.pointCount;break;case e.e_faceB:r=p.mul(s.q,this.localNormal);for(var v=l.mul(s,this.localPoint),f=0;f<this.pointCount;++f){var A=l.mul(i,this.points[f].localPoint),g=_.zero().wSet(1,A,n-_.dot(_.sub(A,v),r),r),x=_.zero().wSet(1,A,-o,r);a[f]=_.mid(x,g),h[f]=_.dot(_.sub(x,g),r)}a.length=this.pointCount,h.length=this.pointCount,r.mul(-1)}return t.normal=r,t.points=a,t.separations=h,t}};var y={nullState:0,addState:1,persistState:2,removeState:3};h.prototype.set=function(t){this.v.set(t.v),this.id.set(t.id)}},{"./common/Math":18,"./common/Rot":20,"./common/Transform":22,"./common/Vec2":23,"./util/common":50}],7:[function(t,i,o){DEBUG=!1,ASSERT=!1;var e=o;e.maxManifoldPoints=2,e.maxPolygonVertices=12,e.aabbExtension=.1,e.aabbMultiplier=2,e.linearSlop=.005,e.linearSlopSquared=e.linearSlop*e.linearSlop,e.angularSlop=2/180*Math.PI,e.polygonRadius=2*e.linearSlop,e.maxSubSteps=8,e.maxTOIContacts=32,e.maxTOIIterations=20,e.maxDistnceIterations=20,e.velocityThreshold=1,e.maxLinearCorrection=.2,e.maxAngularCorrection=8/180*Math.PI,e.maxTranslation=2,e.maxTranslationSquared=e.maxTranslation*e.maxTranslation,e.maxRotation=.5*Math.PI,e.maxRotationSquared=e.maxRotation*e.maxRotation,e.baumgarte=.2,e.toiBaugarte=.75,e.timeToSleep=.5,e.linearSleepTolerance=.01,e.linearSleepToleranceSqr=Math.pow(e.linearSleepTolerance,2),e.angularSleepTolerance=2/180*Math.PI,e.angularSleepToleranceSqr=Math.pow(e.angularSleepTolerance,2)},{}],8:[function(t,i,o){function e(){this.m_type,this.m_radius}DEBUG=!1,ASSERT=!1,i.exports=e;t("./common/Math");e.isValid=function(t){return!!t},e.prototype.getRadius=function(){return this.m_radius},e.prototype.getType=function(){return this.m_type},e.prototype._clone=function(){},e.prototype.getChildCount=function(){},e.prototype.testPoint=function(t,i){},e.prototype.rayCast=function(t,i,o,e){},e.prototype.computeAABB=function(t,i,o){},e.prototype.computeMass=function(t,i){},e.prototype.computeDistanceProxy=function(t){}},{"./common/Math":18}],9:[function(t,i,o){function e(){this.solveInit,this.solveVelocity,this.solvePosition}function s(t){this.dt=0,this.inv_dt=0,this.velocityIterations=0,this.positionIterations=0,this.warmStarting=!1,this.blockSolve=!0,this.inv_dt0=0,this.dtRatio=1}function n(t){this.m_world=t,this.m_profile=new e,this.m_stack=[],this.m_bodies=[],this.m_contacts=[],this.m_joints=[]}function r(){this.normalImpulses=[],this.tangentImpulses=[]}DEBUG=!1,ASSERT=!1,i.exports=n,i.exports.TimeStep=s;var m=t("./Settings"),a=t("./util/common"),h=t("./util/Timer"),c=t("./common/Vec2"),_=t("./common/Math"),l=(t("./Body"),t("./Contact"),t("./Joint"),t("./collision/TimeOfImpact")),u=l.Input,p=l.Output,y=t("./collision/Distance");y.Input,y.Output,y.Proxy,y.Cache;s.prototype.reset=function(t){this.dt>0&&(this.inv_dt0=this.inv_dt),this.dt=t,this.inv_dt=0==t?0:1/t,this.dtRatio=t*this.inv_dt0},n.prototype.clear=function(){this.m_stack.length=0,this.m_bodies.length=0,this.m_contacts.length=0,this.m_joints.length=0},n.prototype.addBody=function(t){this.m_bodies.push(t)},n.prototype.addContact=function(t){this.m_contacts.push(t)},n.prototype.addJoint=function(t){this.m_joints.push(t)},n.prototype.solveWorld=function(t){var i=this.m_world,o=this.m_profile;o.solveInit=0,o.solveVelocity=0,o.solvePosition=0;for(var e=i.m_bodyList;e;e=e.m_next)e.m_islandFlag=!1;for(var s=i.m_contactList;s;s=s.m_next)s.m_islandFlag=!1;for(var n=i.m_jointList;n;n=n.m_next)n.m_islandFlag=!1;for(var r=this.m_stack,m=-1,a=i.m_bodyList;a;a=a.m_next)if(m++,!a.m_islandFlag&&0!=a.isAwake()&&0!=a.isActive()&&!a.isStatic()){for(this.clear(),r.push(a),a.m_islandFlag=!0;r.length>0;){var e=r.pop();if(this.addBody(e),e.setAwake(!0),!e.isStatic()){for(var h=e.m_contactList;h;h=h.next){var c=h.contact;if(!c.m_islandFlag&&0!=c.isEnabled()&&0!=c.isTouching()){var _=c.m_fixtureA.m_isSensor,l=c.m_fixtureB.m_isSensor;if(!_&&!l){this.addContact(c),c.m_islandFlag=!0;var u=h.other;u.m_islandFlag||(r.push(u),u.m_islandFlag=!0)}}}for(var p=e.m_jointList;p;p=p.next)if(1!=p.joint.m_islandFlag){var u=p.other;0!=u.isActive()&&(this.addJoint(p.joint),p.joint.m_islandFlag=!0,u.m_islandFlag||(r.push(u),u.m_islandFlag=!0))}}}this.solveIsland(t);for(var y=0;y<this.m_bodies.length;++y){var e=this.m_bodies[y];e.isStatic()&&(e.m_islandFlag=!1)}}},n.prototype.solveIsland=function(t){for(var i=this.m_world,o=this.m_profile,e=i.m_gravity,s=i.m_allowSleep,n=h.now(),r=t.dt,l=0;l<this.m_bodies.length;++l){var u=this.m_bodies[l],p=c.clone(u.m_sweep.c),y=u.m_sweep.a,d=c.clone(u.m_linearVelocity),v=u.m_angularVelocity;u.m_sweep.c0.set(u.m_sweep.c),u.m_sweep.a0=u.m_sweep.a,u.isDynamic()&&(d.wAdd(r*u.m_gravityScale,e),d.wAdd(r*u.m_invMass,u.m_force),v+=r*u.m_invI*u.m_torque,d.mul(1/(1+r*u.m_linearDamping)),v*=1/(1+r*u.m_angularDamping)),a.debug("A:",y,p.x,p.y,v,d.x,d.y),u.c_position.c=p,u.c_position.a=y,u.c_velocity.v=d,u.c_velocity.w=v}n=h.now();for(var l=0;l<this.m_contacts.length;++l){var f=this.m_contacts[l];f.initConstraint(t)}for(var l=0;l<this.m_contacts.length;++l){var f=this.m_contacts[l];f.initVelocityConstraint(t)}if(t.warmStarting)for(var l=0;l<this.m_contacts.length;++l){var f=this.m_contacts[l];f.warmStartConstraint(t)}for(var l=0;l<this.m_joints.length;++l){var A=this.m_joints[l];A.initVelocityConstraints(t)}o.solveInit=h.diff(n),n=h.now();for(var l=0;l<t.velocityIterations;++l){for(var x=0;x<this.m_joints.length;++x){var A=this.m_joints[x];A.solveVelocityConstraints(t)}for(var x=0;x<this.m_contacts.length;++x){var f=this.m_contacts[x];f.solveVelocityConstraint(t)}}for(var l=0;l<this.m_contacts.length;++l){var f=this.m_contacts[l];f.storeConstraintImpulses(t)}o.solveVelocity=h.diff(n);for(var l=0;l<this.m_bodies.length;++l){var u=this.m_bodies[l],p=c.clone(u.c_position.c),y=u.c_position.a,d=c.clone(u.c_velocity.v),v=u.c_velocity.w,g=c.mul(r,d);if(c.lengthSquared(g)>m.maxTranslationSquared){var b=m.maxTranslation/g.length();d.mul(b)}var B=r*v;if(B*B>m.maxRotationSquared){var b=m.maxRotation/_.abs(B);v*=b}p.wAdd(r,d),y+=r*v,u.c_position.c.set(p),u.c_position.a=y,u.c_velocity.v.set(d),u.c_velocity.w=v}n=h.now();for(var w=!1,l=0;l<t.positionIterations;++l){for(var S=0,x=0;x<this.m_contacts.length;++x){var f=this.m_contacts[x],C=f.solvePositionConstraint(t);S=_.min(S,C)}for(var M=S>=-3*m.linearSlop,I=!0,x=0;x<this.m_joints.length;++x){var A=this.m_joints[x],T=A.solvePositionConstraints(t);I=I&&T}if(M&&I){w=!0;break}}for(var l=0;l<this.m_bodies.length;++l){var u=this.m_bodies[l];u.m_sweep.c.set(u.c_position.c),u.m_sweep.a=u.c_position.a,u.m_linearVelocity.set(u.c_velocity.v),u.m_angularVelocity=u.c_velocity.w,u.synchronizeTransform()}if(o.solvePosition=h.diff(n),this.postSolveIsland(),s){for(var P=1/0,V=m.linearSleepToleranceSqr,z=m.angularSleepToleranceSqr,l=0;l<this.m_bodies.length;++l){var u=this.m_bodies[l];u.isStatic()||(0==u.m_autoSleepFlag||u.m_angularVelocity*u.m_angularVelocity>z||c.lengthSquared(u.m_linearVelocity)>V?(u.m_sleepTime=0,P=0):(u.m_sleepTime+=r,P=_.min(P,u.m_sleepTime)))}if(P>=m.timeToSleep&&w)for(var l=0;l<this.m_bodies.length;++l){var u=this.m_bodies[l];u.setAwake(!1)}}},n.prototype.printBodies=function(t){for(var i=0;i<this.m_bodies.length;++i){var o=this.m_bodies[i];a.debug(t,o.c_position.a,o.c_position.c.x,o.c_position.c.y,o.c_velocity.w,o.c_velocity.v.x,o.c_velocity.v.y)}};var d=new s;n.prototype.solveWorldTOI=function(t){var i=this.m_world;this.m_profile;if(i.m_stepComplete){for(var o=i.m_bodyList;o;o=o.m_next)o.m_islandFlag=!1,o.m_sweep.alpha0=0;for(var e=i.m_contactList;e;e=e.m_next)e.m_toiFlag=!1,e.m_islandFlag=!1,e.m_toiCount=0,e.m_toi=1}for(var e;;){for(var s=null,n=1,e=i.m_contactList;e;e=e.m_next)if(0!=e.isEnabled()&&!(e.m_toiCount>m.maxSubSteps)){var r=1;if(e.m_toiFlag)r=e.m_toi;else{var a=e.getFixtureA(),h=e.getFixtureB();if(a.isSensor()||h.isSensor())continue;var c=a.getBody(),y=h.getBody(),v=c.isAwake()&&!c.isStatic(),f=y.isAwake()&&!y.isStatic();if(0==v&&0==f)continue;var A=c.isBullet()||!c.isDynamic(),x=y.isBullet()||!y.isDynamic();if(0==A&&0==x)continue;var g=c.m_sweep.alpha0;c.m_sweep.alpha0<y.m_sweep.alpha0?(g=y.m_sweep.alpha0,c.m_sweep.advance(g)):y.m_sweep.alpha0<c.m_sweep.alpha0&&(g=c.m_sweep.alpha0,y.m_sweep.advance(g));var b=e.getChildIndexA(),B=e.getChildIndexB(),w=(c.m_sweep,y.m_sweep,new u);w.proxyA.set(a.getShape(),b),w.proxyB.set(h.getShape(),B),w.sweepA.set(c.m_sweep),w.sweepB.set(y.m_sweep),w.tMax=1;var S=new p;l(S,w);var C=S.t;r=S.state==p.e_touching?_.min(g+(1-g)*C,1):1,e.m_toi=r,e.m_toiFlag=!0}r<n&&(s=e,n=r)}if(null==s||1-10*_.EPSILON<n){i.m_stepComplete=!0;break}var a=s.getFixtureA(),h=s.getFixtureB(),c=a.getBody(),y=h.getBody(),M=c.m_sweep.clone(),I=y.m_sweep.clone();if(c.advance(n),y.advance(n),s.update(i),s.m_toiFlag=!1,++s.m_toiCount,0!=s.isEnabled()&&0!=s.isTouching()){c.setAwake(!0),y.setAwake(!0),this.clear(),this.addBody(c),this.addBody(y),this.addContact(s),c.m_islandFlag=!0,y.m_islandFlag=!0,s.m_islandFlag=!0;for(var T=[c,y],P=0;P<T.length;++P){var V=T[P];if(V.isDynamic())for(var z=V.m_contactList;z;z=z.next){var L=z.contact;if(!L.m_islandFlag){var R=z.other;if(!R.isDynamic()||V.isBullet()||R.isBullet()){var F=L.m_fixtureA.m_isSensor,D=L.m_fixtureB.m_isSensor;if(!F&&!D){var q=R.m_sweep.clone();0==R.m_islandFlag&&R.advance(n),L.update(i),0!=L.isEnabled()&&0!=L.isTouching()?(L.m_islandFlag=!0,this.addContact(L),R.m_islandFlag||(R.m_islandFlag=!0,R.isStatic()||R.setAwake(!0),this.addBody(R))):(R.m_sweep.set(q),R.synchronizeTransform())}}}}}d.reset((1-n)*t.dt),d.dtRatio=1,d.positionIterations=20,d.velocityIterations=t.velocityIterations,d.warmStarting=!1,this.solveIslandTOI(d,c,y);for(var P=0;P<this.m_bodies.length;++P){var V=this.m_bodies[P];if(V.m_islandFlag=!1,V.isDynamic()){V.synchronizeFixtures();for(var z=V.m_contactList;z;z=z.next)z.contact.m_toiFlag=!1,z.contact.m_islandFlag=!1}}if(i.findNewContacts(),i.m_subStepping){i.m_stepComplete=!1;break}}else s.setEnabled(!1),c.m_sweep.set(M),y.m_sweep.set(I),c.synchronizeTransform(),y.synchronizeTransform()}var o,e},n.prototype.solveIslandTOI=function(t,i,o){for(var e=(this.m_world,this.m_profile,0);e<this.m_bodies.length;++e){var s=this.m_bodies[e];s.c_position.c.set(s.m_sweep.c),s.c_position.a=s.m_sweep.a,s.c_velocity.v.set(s.m_linearVelocity),s.c_velocity.w=s.m_angularVelocity}for(var e=0;e<this.m_contacts.length;++e){var n=this.m_contacts[e];n.initConstraint(t)}for(var e=0;e<t.positionIterations;++e){for(var r=0,a=0;a<this.m_contacts.length;++a){var n=this.m_contacts[a],h=n.solvePositionConstraintTOI(t,i,o);r=_.min(r,h)}var l=r>=-1.5*m.linearSlop;if(l)break}var e,u;i.m_sweep.c0.set(i.c_position.c),i.m_sweep.a0=i.c_position.a,o.m_sweep.c0.set(o.c_position.c),o.m_sweep.a0=o.c_position.a;for(var e=0;e<this.m_contacts.length;++e){var n=this.m_contacts[e];n.initVelocityConstraint(t)}for(var e=0;e<t.velocityIterations;++e)for(var a=0;a<this.m_contacts.length;++a){var n=this.m_contacts[a];n.solveVelocityConstraint(t)}for(var p=t.dt,e=0;e<this.m_bodies.length;++e){var s=this.m_bodies[e],u=c.clone(s.c_position.c),y=s.c_position.a,d=c.clone(s.c_velocity.v),v=s.c_velocity.w,f=c.mul(p,d);if(c.dot(f,f)>m.maxTranslationSquared){var A=m.maxTranslation/f.length();d.mul(A)}var x=p*v;if(x*x>m.maxRotationSquared){var A=m.maxRotation/_.abs(x);v*=A}u.wAdd(p,d),y+=p*v,s.c_position.c=u,s.c_position.a=y,s.c_velocity.v=d,s.c_velocity.w=v,s.m_sweep.c=u,s.m_sweep.a=y,s.m_linearVelocity=d,s.m_angularVelocity=v,s.synchronizeTransform()}this.postSolveIsland()},n.prototype.postSolveIsland=function(){for(var t=new r,i=0;i<this.m_contacts.length;++i){for(var o=this.m_contacts[i],e=0;e<o.v_points.length;++e)t.normalImpulses.push(o.v_points[e].normalImpulse),t.tangentImpulses.push(o.v_points[e].tangentImpulse);this.m_world.postSolve(o,t)}}},{"./Body":2,"./Contact":3,"./Joint":5,"./Settings":7,"./collision/Distance":13,"./collision/TimeOfImpact":15,"./common/Math":18,"./common/Vec2":23,"./util/Timer":49,"./util/common":50}],10:[function(t,i,o){function e(t){return this instanceof e?(t&&n.isValid(t)&&(t={gravity:t}),t=s(t,c),this.m_solver=new m(this),this.m_broadPhase=new r,this.m_contactList=null,this.m_contactCount=0,this.m_bodyList=null,this.m_bodyCount=0,this.m_jointList=null,this.m_jointCount=0,this.m_stepComplete=!0,this.m_allowSleep=t.allowSleep,this.m_gravity=n.clone(t.gravity),this.m_clearForces=!0,this.m_newFixture=!1,this.m_locked=!1,this.m_warmStarting=t.warmStarting,this.m_continuousPhysics=t.continuousPhysics,this.m_subStepping=t.subStepping,this.m_blockSolve=t.blockSolve,this.m_velocityIterations=t.velocityIterations,this.m_positionIterations=t.positionIterations,this.m_t=0,this.m_stepCount=0,void(this.addPair=this.createContact.bind(this))):new e(t)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("./util/options"),n=(t("./util/common"),t("./util/Timer"),t("./common/Vec2")),r=t("./collision/BroadPhase"),m=t("./Solver"),a=t("./Body"),h=t("./Contact"),c={gravity:n.zero(),allowSleep:!0,warmStarting:!0,continuousPhysics:!0,subStepping:!1,blockSolve:!0,velocityIterations:8,positionIterations:3};e.prototype.getBodyList=function(){return this.m_bodyList},e.prototype.getJointList=function(){return this.m_jointList},e.prototype.getContactList=function(){return this.m_contactList},e.prototype.getBodyCount=function(){return this.m_bodyCount},e.prototype.getJointCount=function(){return this.m_jointCount},e.prototype.getContactCount=function(){return this.m_contactCount},e.prototype.setGravity=function(t){this.m_gravity=t},e.prototype.getGravity=function(){return this.m_gravity},e.prototype.isLocked=function(){return this.m_locked},e.prototype.setAllowSleeping=function(t){if(t!=this.m_allowSleep&&(this.m_allowSleep=t,0==this.m_allowSleep))for(var i=this.m_bodyList;i;i=i.m_next)i.setAwake(!0)},e.prototype.getAllowSleeping=function(){return this.m_allowSleep},e.prototype.setWarmStarting=function(t){this.m_warmStarting=t},e.prototype.getWarmStarting=function(){return this.m_warmStarting},e.prototype.setContinuousPhysics=function(t){this.m_continuousPhysics=t},e.prototype.getContinuousPhysics=function(){return this.m_continuousPhysics},e.prototype.setSubStepping=function(t){this.m_subStepping=t},e.prototype.getSubStepping=function(){return this.m_subStepping},e.prototype.setAutoClearForces=function(t){this.m_clearForces=t},e.prototype.getAutoClearForces=function(){return this.m_clearForces},e.prototype.clearForces=function(){for(var t=this.m_bodyList;t;t=t.getNext())t.m_force.setZero(),t.m_torque=0},e.prototype.queryAABB=function(t,i){var o=this.m_broadPhase;this.m_broadPhase.query(t,function(t){var e=o.getUserData(t);return i(e.fixture)})},e.prototype.rayCast=function(t,i,o){var e=this.m_broadPhase;this.m_broadPhase.rayCast({maxFraction:1,p1:t,p2:i},function(t,i){var s=e.getUserData(i),r=s.fixture,m=s.childIndex,a={},h=r.rayCast(a,t,m);if(h){var c=a.fraction,_=n.add(n.mul(1-c,t.p1),n.mul(c,t.p2));return o(r,_,a.normal,c)}return t.maxFraction})},e.prototype.getProxyCount=function(){return this.m_broadPhase.getProxyCount()},e.prototype.getTreeHeight=function(){return this.m_broadPhase.getTreeHeight()},e.prototype.getTreeBalance=function(){return this.m_broadPhase.getTreeBalance()},e.prototype.getTreeQuality=function(){return this.m_broadPhase.getTreeQuality()},e.prototype.shiftOrigin=function(t){if(!this.m_locked){for(var i=this.m_bodyList;i;i=i.m_next)i.m_xf.p.sub(t),i.m_sweep.c0.sub(t),i.m_sweep.c.sub(t);for(var o=this.m_jointList;o;o=o.m_next)o.shiftOrigin(t);this.m_broadPhase.shiftOrigin(t)}},e.prototype.createBody=function(t,i){if(this.isLocked())return null;t&&n.isValid(t)&&(t={position:t,angle:i});var o=new a(this,t);return o.m_prev=null,o.m_next=this.m_bodyList,this.m_bodyList&&(this.m_bodyList.m_prev=o),this.m_bodyList=o,++this.m_bodyCount,o},e.prototype.createDynamicBody=function(t,i){return t?n.isValid(t)&&(t={position:t,angle:i}):t={},t.type="dynamic",this.createBody(t)},e.prototype.createKinematicBody=function(t,i){return t?n.isValid(t)&&(t={position:t,angle:i}):t={},t.type="kinematic",this.createBody(t)},e.prototype.destroyBody=function(t){if(!this.isLocked()){if(t.m_destroyed)return!1;for(var i=t.m_jointList;i;){var o=i;i=i.next,this.publish("remove-joint",o.joint),this.destroyJoint(o.joint),t.m_jointList=i}t.m_jointList=null;for(var e=t.m_contactList;e;){var s=e;e=e.next,this.destroyContact(s.contact),t.m_contactList=e}t.m_contactList=null;for(var n=t.m_fixtureList;n;){var r=n;n=n.m_next,this.publish("remove-fixture",r),r.destroyProxies(this.m_broadPhase),t.m_fixtureList=n}return t.m_fixtureList=null,t.m_prev&&(t.m_prev.m_next=t.m_next),t.m_next&&(t.m_next.m_prev=t.m_prev),t==this.m_bodyList&&(this.m_bodyList=t.m_next),t.m_destroyed=!0,--this.m_bodyCount,!0}},e.prototype.createJoint=function(t){if(this.isLocked())return null;if(t.m_prev=null,t.m_next=this.m_jointList,this.m_jointList&&(this.m_jointList.m_prev=t),this.m_jointList=t,++this.m_jointCount,t.m_edgeA.joint=t,t.m_edgeA.other=t.m_bodyB,t.m_edgeA.prev=null,t.m_edgeA.next=t.m_bodyA.m_jointList,t.m_bodyA.m_jointList&&(t.m_bodyA.m_jointList.prev=t.m_edgeA),t.m_bodyA.m_jointList=t.m_edgeA,t.m_edgeB.joint=t,t.m_edgeB.other=t.m_bodyA,t.m_edgeB.prev=null,t.m_edgeB.next=t.m_bodyB.m_jointList,t.m_bodyB.m_jointList&&(t.m_bodyB.m_jointList.prev=t.m_edgeB),t.m_bodyB.m_jointList=t.m_edgeB,0==t.m_collideConnected)for(var i=t.m_bodyB.getContactList();i;i=i.next)i.other==t.m_bodyA&&i.contact.flagForFiltering();return t},e.prototype.destroyJoint=function(t){if(!this.isLocked()){t.m_prev&&(t.m_prev.m_next=t.m_next),t.m_next&&(t.m_next.m_prev=t.m_prev),t==this.m_jointList&&(this.m_jointList=t.m_next);var i=t.m_bodyA,o=t.m_bodyB;if(i.setAwake(!0),o.setAwake(!0),t.m_edgeA.prev&&(t.m_edgeA.prev.next=t.m_edgeA.next),t.m_edgeA.next&&(t.m_edgeA.next.prev=t.m_edgeA.prev),t.m_edgeA==i.m_jointList&&(i.m_jointList=t.m_edgeA.next),t.m_edgeA.prev=null,t.m_edgeA.next=null,t.m_edgeB.prev&&(t.m_edgeB.prev.next=t.m_edgeB.next),t.m_edgeB.next&&(t.m_edgeB.next.prev=t.m_edgeB.prev),t.m_edgeB==o.m_jointList&&(o.m_jointList=t.m_edgeB.next),t.m_edgeB.prev=null,t.m_edgeB.next=null,--this.m_jointCount,0==t.m_collideConnected)for(var e=o.getContactList();e;)e.other==i&&e.contact.flagForFiltering(),e=e.next;this.publish("remove-joint",t)}};var _=new m.TimeStep;e.prototype.step=function(t,i,o){if((0|i)!==i&&(i=0),i=i||this.m_velocityIterations,o=o||this.m_positionIterations,this.m_stepCount++,this.m_newFixture&&(this.findNewContacts(),this.m_newFixture=!1),this.m_locked=!0,_.reset(t),_.velocityIterations=i,_.positionIterations=o,_.warmStarting=this.m_warmStarting,_.blockSolve=this.m_blockSolve,this.updateContacts(),this.m_stepComplete&&t>0){this.m_solver.solveWorld(_);for(var e=this.m_bodyList;e;e=e.getNext())0!=e.m_islandFlag&&(e.isStatic()||e.synchronizeFixtures());this.findNewContacts()}this.m_continuousPhysics&&t>0&&this.m_solver.solveWorldTOI(_),this.m_clearForces&&this.clearForces(),this.m_locked=!1},e.prototype.findNewContacts=function(){this.m_broadPhase.updatePairs(this.addPair)},e.prototype.createContact=function(t,i){var o=t.fixture,e=i.fixture,s=t.childIndex,n=i.childIndex,r=o.getBody(),m=e.getBody();if(r!=m){for(var a=m.getContactList();a;){if(a.other==r){var c=a.contact.getFixtureA(),_=a.contact.getFixtureB(),l=a.contact.getChildIndexA(),u=a.contact.getChildIndexB();if(c==o&&_==e&&l==s&&u==n)return;if(c==e&&_==o&&l==n&&u==s)return}a=a.next}if(0!=m.shouldCollide(r)&&0!=e.shouldCollide(o)){var p=h.create(o,s,e,n);null!=p&&(p.m_prev=null,null!=this.m_contactList&&(p.m_next=this.m_contactList,this.m_contactList.m_prev=p),this.m_contactList=p,++this.m_contactCount)}}},e.prototype.updateContacts=function(){for(var t,i=this.m_contactList;t=i;){i=t.getNext();var o=t.getFixtureA(),e=t.getFixtureB(),s=t.getChildIndexA(),n=t.getChildIndexB(),r=o.getBody(),m=e.getBody();if(t.m_filterFlag){if(0==m.shouldCollide(r)){this.destroyContact(t);continue}if(0==e.shouldCollide(o)){this.destroyContact(t);continue}t.m_filterFlag=!1}var a=r.isAwake()&&!r.isStatic(),h=m.isAwake()&&!m.isStatic();if(0!=a||0!=h){var c=o.m_proxies[s].proxyId,_=e.m_proxies[n].proxyId,l=this.m_broadPhase.testOverlap(c,_);0!=l?t.update(this):this.destroyContact(t)}}},e.prototype.destroyContact=function(t){h.destroy(t,this),t.m_prev&&(t.m_prev.m_next=t.m_next),t.m_next&&(t.m_next.m_prev=t.m_prev),t==this.m_contactList&&(this.m_contactList=t.m_next),--this.m_contactCount},e.prototype._listeners=null,e.prototype.on=function(t,i){return"string"!=typeof t||"function"!=typeof i?this:(this._listeners||(this._listeners={}),this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(i),this)},e.prototype.off=function(t,i){if("string"!=typeof t||"function"!=typeof i)return this;var o=this._listeners&&this._listeners[t];if(!o||!o.length)return this;var e=o.indexOf(i);return e>=0&&o.splice(e,1),this},e.prototype.publish=function(t,i,o,e){var s=this._listeners&&this._listeners[t];if(!s||!s.length)return 0;for(var n=0;n<s.length;n++)s[n].call(this,i,o,e);return s.length},e.prototype.beginContact=function(t){this.publish("begin-contact",t)},e.prototype.endContact=function(t){this.publish("end-contact",t)},e.prototype.preSolve=function(t,i){this.publish("pre-solve",t,i)},e.prototype.postSolve=function(t,i){this.publish("post-solve",t,i)}},{"./Body":2,"./Contact":3,"./Solver":9,"./collision/BroadPhase":12,"./common/Vec2":23,"./util/Timer":49,"./util/common":50,"./util/options":52}],11:[function(t,i,o){function e(t,i){return this instanceof e?(this.lowerBound=n.zero(),this.upperBound=n.zero(),"object"==typeof t&&this.lowerBound.set(t),void("object"==typeof i&&this.upperBound.set(i))):new e(t,i)}DEBUG=!1,ASSERT=!1;var s=(t("../Settings"),t("../common/Math")),n=t("../common/Vec2");i.exports=e,e.prototype.isValid=function(){return e.isValid(this)},e.isValid=function(t){var i=n.sub(t.upperBound,t.lowerBound),o=i.x>=0&&i.y>=0&&n.isValid(t.lowerBound)&&n.isValid(t.upperBound);return o},e.prototype.getCenter=function(){return n.neo(.5*(this.lowerBound.x+this.upperBound.x),.5*(this.lowerBound.y+this.upperBound.y))},e.prototype.getExtents=function(){return n.neo(.5*(this.upperBound.x-this.lowerBound.x),.5*(this.upperBound.y-this.lowerBound.y))},e.prototype.getPerimeter=function(){return 2*(this.upperBound.x-this.lowerBound.x+this.upperBound.y-this.lowerBound.y)},e.prototype.combine=function(t,i){i=i||this,this.lowerBound.set(s.min(t.lowerBound.x,i.lowerBound.x),s.min(t.lowerBound.y,i.lowerBound.y)),this.upperBound.set(s.max(t.upperBound.x,i.upperBound.x),s.max(t.upperBound.y,i.upperBound.y))},e.prototype.combinePoints=function(t,i){this.lowerBound.set(s.min(t.x,i.x),s.min(t.y,i.y)),this.upperBound.set(s.max(t.x,i.x),s.max(t.y,i.y))},e.prototype.set=function(t){this.lowerBound.set(t.lowerBound.x,t.lowerBound.y),this.upperBound.set(t.upperBound.x,t.upperBound.y)},e.prototype.contains=function(t){var i=!0;return i=i&&this.lowerBound.x<=t.lowerBound.x,i=i&&this.lowerBound.y<=t.lowerBound.y,i=i&&t.upperBound.x<=this.upperBound.x,i=i&&t.upperBound.y<=this.upperBound.y},e.prototype.extend=function(t){e.extend(this,t)},e.extend=function(t,i){t.lowerBound.x-=i,t.lowerBound.y-=i,t.upperBound.x+=i,t.upperBound.y+=i},e.testOverlap=function(t,i){var o=i.lowerBound.x-t.upperBound.x,e=t.lowerBound.x-i.upperBound.x,s=i.lowerBound.y-t.upperBound.y,n=t.lowerBound.y-i.upperBound.y;return!(o>0||s>0||e>0||n>0)},e.areEqual=function(t,i){return n.areEqual(t.lowerBound,i.lowerBound)&&n.areEqual(t.upperBound,i.upperBound)},e.diff=function(t,i){var o=s.max(0,s.min(t.upperBound.x,i.upperBound.x)-s.max(i.lowerBound.x,t.lowerBound.x)),e=s.max(0,s.min(t.upperBound.y,i.upperBound.y)-s.max(i.lowerBound.y,t.lowerBound.y)),n=t.upperBound.x-t.lowerBound.x,r=t.upperBound.y-t.lowerBound.y,m=i.upperBound.y-i.lowerBound.y,m=i.upperBound.y-i.lowerBound.y;return n*r+wB*m-o*e},e.prototype.rayCast=function(t,i){for(var o=-(1/0),e=1/0,r=i.p1,m=n.sub(i.p2,i.p1),a=n.abs(m),h=n.zero(),c="x";null!==c;c="x"===c?"y":null)if(a.x<s.EPSILON){if(r[c]<this.lowerBound[c]||this.upperBound[c]<r[c])return!1}else{var _=1/m[c],l=(this.lowerBound[c]-r[c])*_,u=(this.upperBound[c]-r[c])*_,p=-1;if(l>u){var y=l;l=u,u=y,p=1}if(l>o&&(h.setZero(),h[c]=p,o=l),e=s.min(e,u),o>e)return!1}return!(o<0||i.maxFraction<o)&&(t.fraction=o,t.normal=h,!0)},e.prototype.toString=function(){return JSON.stringify(this)}},{"../Settings":7,"../common/Math":18,"../common/Vec2":23}],12:[function(t,i,o){function e(){this.m_tree=new r,this.m_proxyCount=0,this.m_moveBuffer=[],this.queryCallback=this.queryCallback.bind(this)}DEBUG=!1,ASSERT=!1;var s=(t("../Settings"),t("../util/common"),t("../common/Math")),n=t("./AABB"),r=t("./DynamicTree");i.exports=e,e.prototype.getUserData=function(t){return this.m_tree.getUserData(t)},e.prototype.testOverlap=function(t,i){var o=this.m_tree.getFatAABB(t),e=this.m_tree.getFatAABB(i);return n.testOverlap(o,e)},e.prototype.getFatAABB=function(t){return this.m_tree.getFatAABB(t)},e.prototype.getProxyCount=function(){return this.m_proxyCount},e.prototype.getTreeHeight=function(){return this.m_tree.getHeight()},e.prototype.getTreeBalance=function(){return this.m_tree.getMaxBalance()},e.prototype.getTreeQuality=function(){return this.m_tree.getAreaRatio()},e.prototype.query=function(t,i){this.m_tree.query(t,i)},e.prototype.rayCast=function(t,i){this.m_tree.rayCast(t,i)},e.prototype.shiftOrigin=function(t){this.m_tree.shiftOrigin(t)},e.prototype.createProxy=function(t,i){var o=this.m_tree.createProxy(t,i);return this.m_proxyCount++,this.bufferMove(o),o},e.prototype.destroyProxy=function(t){this.unbufferMove(t),this.m_proxyCount--,this.m_tree.destroyProxy(t)},e.prototype.moveProxy=function(t,i,o){var e=this.m_tree.moveProxy(t,i,o);e&&this.bufferMove(t)},e.prototype.touchProxy=function(t){this.bufferMove(t)},e.prototype.bufferMove=function(t){this.m_moveBuffer.push(t)},e.prototype.unbufferMove=function(t){for(var i=0;i<this.m_moveBuffer.length;++i)this.m_moveBuffer[i]==t&&(this.m_moveBuffer[i]=null)},e.prototype.updatePairs=function(t){for(this.m_callback=t;this.m_moveBuffer.length>0;)if(this.m_queryProxyId=this.m_moveBuffer.pop(),null!==this.m_queryProxyId){var i=this.m_tree.getFatAABB(this.m_queryProxyId);this.m_tree.query(i,this.queryCallback)}},e.prototype.queryCallback=function(t){if(t==this.m_queryProxyId)return!0;var i=s.min(t,this.m_queryProxyId),o=s.max(t,this.m_queryProxyId),e=this.m_tree.getUserData(i),n=this.m_tree.getUserData(o);return this.m_callback(e,n),!0}},{"../Settings":7,"../common/Math":18,"../util/common":50,"./AABB":11,"./DynamicTree":14}],13:[function(t,i,o){function e(){this.proxyA=new m,this.proxyB=new m,this.transformA=null,this.transformB=null,this.useRadii=!1}function s(){this.pointA=u.zero(),this.pointB=u.zero(),this.distance,this.iterations}function n(){this.metric=0,this.indexA=[],this.indexB=[],this.count=0}function r(t,i,o){++_.gjkCalls;var e=o.proxyA,s=o.proxyB,n=o.transformA,r=o.transformB,m=new h;m.readCache(i,e,n,s,r);for(var a=m.m_v,d=c.maxDistnceIterations,v=[],f=[],A=0,x=1/0,g=1/0,b=0;b<d;){A=m.m_count;for(var B=0;B<A;++B)v[B]=a[B].indexA,f[B]=a[B].indexB;if(m.solve(),3==m.m_count)break;var w=m.getClosestPoint();g=w.lengthSquared(),x=g;var S=m.getSearchDirection();if(S.lengthSquared()<l.EPSILON*l.EPSILON)break;var C=a[m.m_count];C.indexA=e.getSupport(p.mulT(n.q,u.neg(S))),C.wA=y.mul(n,e.getVertex(C.indexA)),C.indexB=s.getSupport(p.mulT(r.q,S)),C.wB=y.mul(r,s.getVertex(C.indexB)),C.w=u.sub(C.wB,C.wA),++b,++_.gjkIters;for(var M=!1,B=0;B<A;++B)if(C.indexA==v[B]&&C.indexB==f[B]){M=!0;break}if(M)break;++m.m_count}if(_.gjkMaxIters=l.max(_.gjkMaxIters,b),m.getWitnessPoints(t.pointA,t.pointB),t.distance=u.distance(t.pointA,t.pointB),t.iterations=b,m.writeCache(i),o.useRadii){var I=e.m_radius,T=s.m_radius;if(t.distance>I+T&&t.distance>l.EPSILON){t.distance-=I+T;var P=u.sub(t.pointB,t.pointA);P.normalize(),t.pointA.wAdd(I,P),t.pointB.wSub(T,P)}else{var w=u.mid(t.pointA,t.pointB);t.pointA.set(w),t.pointB.set(w),t.distance=0}}}function m(){this.m_buffer=[],this.m_vertices=[],this.m_count=0,this.m_radius=0}function a(){this.indexA,this.indexB,this.wA=u.zero(),this.wB=u.zero(),this.w=u.zero(),this.a}function h(){this.m_v1=new a,this.m_v2=new a,this.m_v3=new a,this.m_v=[this.m_v1,this.m_v2,this.m_v3],this.m_count}DEBUG=!1,ASSERT=!1,i.exports=r,i.exports.Input=e,i.exports.Output=s,i.exports.Proxy=m,i.exports.Cache=n;var c=t("../Settings"),_=(t("../util/common"),t("../util/Timer"),t("../common/stats")),l=t("../common/Math"),u=t("../common/Vec2"),p=(t("../common/Vec3"),t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),y=(t("../common/Sweep"),t("../common/Transform"));t("../common/Velocity"),t("../common/Position");_.gjkCalls=0,_.gjkIters=0,_.gjkMaxIters=0,m.prototype.getVertexCount=function(){return this.m_count},m.prototype.getVertex=function(t){return this.m_vertices[t]},m.prototype.getSupport=function(t){for(var i=0,o=u.dot(this.m_vertices[0],t),e=0;e<this.m_count;++e){var s=u.dot(this.m_vertices[e],t);s>o&&(i=e,o=s)}return i},m.prototype.getSupportVertex=function(t){return this.m_vertices[this.getSupport(t)]},m.prototype.set=function(t,i){t.computeDistanceProxy(this,i)},a.prototype.set=function(t){this.indexA=t.indexA,this.indexB=t.indexB,this.wA=u.clone(t.wA),this.wB=u.clone(t.wB),this.w=u.clone(t.w),this.a=t.a},h.prototype.print=function(){return 3==this.m_count?["+"+this.m_count,this.m_v1.a,this.m_v1.wA.x,this.m_v1.wA.y,this.m_v1.wB.x,this.m_v1.wB.y,this.m_v2.a,this.m_v2.wA.x,this.m_v2.wA.y,this.m_v2.wB.x,this.m_v2.wB.y,this.m_v3.a,this.m_v3.wA.x,this.m_v3.wA.y,this.m_v3.wB.x,this.m_v3.wB.y].toString():2==this.m_count?["+"+this.m_count,this.m_v1.a,this.m_v1.wA.x,this.m_v1.wA.y,this.m_v1.wB.x,this.m_v1.wB.y,this.m_v2.a,this.m_v2.wA.x,this.m_v2.wA.y,this.m_v2.wB.x,this.m_v2.wB.y].toString():1==this.m_count?["+"+this.m_count,this.m_v1.a,this.m_v1.wA.x,this.m_v1.wA.y,this.m_v1.wB.x,this.m_v1.wB.y].toString():"+"+this.m_count},h.prototype.readCache=function(t,i,o,e,s){this.m_count=t.count;for(var n=0;n<this.m_count;++n){var r=this.m_v[n];r.indexA=t.indexA[n],r.indexB=t.indexB[n];var m=i.getVertex(r.indexA),a=e.getVertex(r.indexB);r.wA=y.mul(o,m),r.wB=y.mul(s,a),r.w=u.sub(r.wB,r.wA),r.a=0}if(this.m_count>1){var h=t.metric,c=this.getMetric();(c<.5*h||2*h<c||c<l.EPSILON)&&(this.m_count=0)}if(0==this.m_count){var r=this.m_v[0];r.indexA=0,r.indexB=0;var m=i.getVertex(0),a=e.getVertex(0);r.wA=y.mul(o,m),r.wB=y.mul(s,a),r.w=u.sub(r.wB,r.wA),r.a=1,this.m_count=1}},h.prototype.writeCache=function(t){t.metric=this.getMetric(),t.count=this.m_count;for(var i=0;i<this.m_count;++i)t.indexA[i]=this.m_v[i].indexA,t.indexB[i]=this.m_v[i].indexB},h.prototype.getSearchDirection=function(){switch(this.m_count){case 1:return u.neg(this.m_v1.w);case 2:var t=u.sub(this.m_v2.w,this.m_v1.w),i=u.cross(t,u.neg(this.m_v1.w));return i>0?u.cross(1,t):u.cross(t,1);default:return u.zero()}},h.prototype.getClosestPoint=function(){switch(this.m_count){case 0:return u.zero();case 1:return u.clone(this.m_v1.w);case 2:return u.wAdd(this.m_v1.a,this.m_v1.w,this.m_v2.a,this.m_v2.w);case 3:return u.zero();default:return u.zero()}},h.prototype.getWitnessPoints=function(t,i){switch(this.m_count){case 0:break;case 1:t.set(this.m_v1.wA),i.set(this.m_v1.wB);break;case 2:t.wSet(this.m_v1.a,this.m_v1.wA,this.m_v2.a,this.m_v2.wA),i.wSet(this.m_v1.a,this.m_v1.wB,this.m_v2.a,this.m_v2.wB);break;case 3:t.wSet(this.m_v1.a,this.m_v1.wA,this.m_v2.a,this.m_v2.wA),t.wAdd(this.m_v3.a,this.m_v3.wA),i.set(t)}},h.prototype.getMetric=function(){switch(this.m_count){case 0:return 0;case 1:return 0;case 2:return u.distance(this.m_v1.w,this.m_v2.w);case 3:return u.cross(u.sub(this.m_v2.w,this.m_v1.w),u.sub(this.m_v3.w,this.m_v1.w));default:return 0}},h.prototype.solve=function(){switch(this.m_count){case 1:break;case 2:this.solve2();break;case 3:this.solve3()}},h.prototype.solve2=function(){var t=this.m_v1.w,i=this.m_v2.w,o=u.sub(i,t),e=-u.dot(t,o);if(e<=0)return this.m_v1.a=1,void(this.m_count=1);var s=u.dot(i,o);if(s<=0)return this.m_v2.a=1,this.m_count=1,void this.m_v1.set(this.m_v2);var n=1/(s+e);this.m_v1.a=s*n,this.m_v2.a=e*n,this.m_count=2},h.prototype.solve3=function(){var t=this.m_v1.w,i=this.m_v2.w,o=this.m_v3.w,e=u.sub(i,t),s=u.dot(t,e),n=u.dot(i,e),r=n,m=-s,a=u.sub(o,t),h=u.dot(t,a),c=u.dot(o,a),_=c,l=-h,p=u.sub(o,i),y=u.dot(i,p),d=u.dot(o,p),v=d,f=-y,A=u.cross(e,a),x=A*u.cross(i,o),g=A*u.cross(o,t),b=A*u.cross(t,i);if(m<=0&&l<=0)return this.m_v1.a=1,void(this.m_count=1);if(r>0&&m>0&&b<=0){var B=1/(r+m);return this.m_v1.a=r*B,this.m_v2.a=m*B,void(this.m_count=2)}if(_>0&&l>0&&g<=0){var w=1/(_+l);return this.m_v1.a=_*w,this.m_v3.a=l*w,this.m_count=2,void this.m_v2.set(this.m_v3)}if(r<=0&&f<=0)return this.m_v2.a=1,this.m_count=1,void this.m_v1.set(this.m_v2);if(_<=0&&v<=0)return this.m_v3.a=1,this.m_count=1,void this.m_v1.set(this.m_v3);if(v>0&&f>0&&x<=0){var S=1/(v+f);return this.m_v2.a=v*S,this.m_v3.a=f*S,this.m_count=2,void this.m_v1.set(this.m_v3)}var C=1/(x+g+b);this.m_v1.a=x*C,this.m_v2.a=g*C,this.m_v3.a=b*C,this.m_count=3},r.testOverlap=function(t,i,o,m,a,h){var c=new e;c.proxyA.set(t,i),c.proxyB.set(o,m),c.transformA=a,c.transformB=h,c.useRadii=!0;var _=new n,u=new s;return r(u,_,c),u.distance<10*l.EPSILON}},{"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../common/stats":26,"../util/Timer":49,"../util/common":50}],14:[function(t,i,o){function e(t){this.id=t,this.aabb=new c,this.userData=null,this.parent=null,this.child1=null,this.child2=null,this.height=-1,this.toString=function(){return this.id+":"+this.userData}}function s(){this.m_root=null,this.m_nodes={},this.m_lastProxyId=0,this.m_pool=new m({create:function(){return new e}})}function n(){var t=[],i=[];return{preorder:function(o){return t.length=0,t.push(o),i.length=0,i.push(0),this},next:function(){for(;t.length>0;){var o=t.length-1,e=t[o];if(0===i[o])return i[o]=1,e;if(1===i[o]&&(i[o]=2,e.child1))return t.push(e.child1),i.push(1),e.child1;if(2===i[o]&&(i[o]=3,e.child2))return t.push(e.child2),i.push(1),e.child2;t.pop(),i.pop()}},close:function(){t.length=0}}}DEBUG=!1,ASSERT=!1;var r=t("../Settings"),m=(t("../util/common"),t("../util/Pool")),a=t("../common/Vec2"),h=t("../common/Math"),c=t("./AABB");i.exports=s,e.prototype.isLeaf=function(){return null==this.child1},s.prototype.getUserData=function(t){var i=this.m_nodes[t];return i.userData},s.prototype.getFatAABB=function(t){var i=this.m_nodes[t];return i.aabb},s.prototype.allocateNode=function(){var t=this.m_pool.allocate();return t.id=++this.m_lastProxyId,t.userData=null,t.parent=null,t.child1=null,t.child2=null,t.height=-1,this.m_nodes[t.id]=t,t},s.prototype.freeNode=function(t){this.m_pool.release(t),t.height=-1,delete this.m_nodes[t.id]},s.prototype.createProxy=function(t,i){var o=this.allocateNode();return o.aabb.set(t),c.extend(o.aabb,r.aabbExtension),o.userData=i,o.height=0,this.insertLeaf(o),o.id},s.prototype.destroyProxy=function(t){var i=this.m_nodes[t];this.removeLeaf(i),this.freeNode(i)},s.prototype.moveProxy=function(t,i,o){var e=this.m_nodes[t];return!e.aabb.contains(i)&&(this.removeLeaf(e),e.aabb.set(i),i=e.aabb,c.extend(i,r.aabbExtension),o.x<0?i.lowerBound.x+=o.x*r.aabbMultiplier:i.upperBound.x+=o.x*r.aabbMultiplier,o.y<0?i.lowerBound.y+=o.y*r.aabbMultiplier:i.upperBound.y+=o.y*r.aabbMultiplier,this.insertLeaf(e),!0)},s.prototype.insertLeaf=function(t){if(null==this.m_root)return this.m_root=t,void(this.m_root.parent=null);for(var i=t.aabb,o=this.m_root;0==o.isLeaf();){var e=o.child1,s=o.child2,n=o.aabb.getPerimeter(),r=new c;r.combine(o.aabb,i);var m,a=r.getPerimeter(),_=2*a,l=2*(a-n);if(e.isLeaf()){var u=new c;u.combine(i,e.aabb),m=u.getPerimeter()+l}else{var u=new c;u.combine(i,e.aabb);var p=e.aabb.getPerimeter(),y=u.getPerimeter();m=y-p+l}var d;if(s.isLeaf()){var u=new c;u.combine(i,s.aabb),d=u.getPerimeter()+l}else{var u=new c;u.combine(i,s.aabb);var p=s.aabb.getPerimeter(),y=u.getPerimeter();d=y-p+l}if(_<m&&_<d)break;o=m<d?e:s}var v=o,f=v.parent,A=this.allocateNode();for(A.parent=f,A.userData=null,A.aabb.combine(i,v.aabb),A.height=v.height+1,null!=f?(f.child1==v?f.child1=A:f.child2=A,A.child1=v,A.child2=t,v.parent=A,t.parent=A):(A.child1=v,A.child2=t,v.parent=A,t.parent=A,this.m_root=A),o=t.parent;null!=o;){o=this.balance(o);var e=o.child1,s=o.child2;o.height=1+h.max(e.height,s.height),o.aabb.combine(e.aabb,s.aabb),o=o.parent}},s.prototype.removeLeaf=function(t){if(t==this.m_root)return void(this.m_root=null);var i,o=t.parent,e=o.parent;if(i=o.child1==t?o.child2:o.child1,null!=e){e.child1==o?e.child1=i:e.child2=i,i.parent=e,this.freeNode(o);for(var s=e;null!=s;){s=this.balance(s);var n=s.child1,r=s.child2;s.aabb.combine(n.aabb,r.aabb),s.height=1+h.max(n.height,r.height),s=s.parent}}else this.m_root=i,i.parent=null,this.freeNode(o)},s.prototype.balance=function(t){var i=t;if(i.isLeaf()||i.height<2)return t;var o=i.child1,e=i.child2,s=e.height-o.height;if(s>1){var n=e.child1,r=e.child2;return e.child1=i,e.parent=i.parent,i.parent=e,null!=e.parent?e.parent.child1==t?e.parent.child1=e:e.parent.child2=e:this.m_root=e,n.height>r.height?(e.child2=n,i.child2=r,r.parent=i,i.aabb.combine(o.aabb,r.aabb),e.aabb.combine(i.aabb,n.aabb),i.height=1+h.max(o.height,r.height),e.height=1+h.max(i.height,n.height)):(e.child2=r,i.child2=n,n.parent=i,i.aabb.combine(o.aabb,n.aabb),e.aabb.combine(i.aabb,r.aabb),i.height=1+h.max(o.height,n.height),e.height=1+h.max(i.height,r.height)),e}if(s<-1){var m=o.child1,a=o.child2;return o.child1=i,o.parent=i.parent,i.parent=o,null!=o.parent?o.parent.child1==i?o.parent.child1=o:o.parent.child2=o:this.m_root=o,m.height>a.height?(o.child2=m,i.child1=a,a.parent=i,i.aabb.combine(e.aabb,a.aabb),o.aabb.combine(i.aabb,m.aabb),i.height=1+h.max(e.height,a.height),o.height=1+h.max(i.height,m.height)):(o.child2=a,i.child1=m,m.parent=i,i.aabb.combine(e.aabb,m.aabb),o.aabb.combine(i.aabb,a.aabb),i.height=1+h.max(e.height,m.height),o.height=1+h.max(i.height,a.height)),o}return i},s.prototype.getHeight=function(){return null==this.m_root?0:this.m_root.height},s.prototype.getAreaRatio=function(){if(null==this.m_root)return 0;for(var t,i=this.m_root,o=i.aabb.getPerimeter(),e=0,s=u.allocate().preorder();t=s.next();)t.height<0||(e+=t.aabb.getPerimeter());return u.release(s),e/o},s.prototype.computeHeight=function(t){var i;if(i="undefined"!=typeof t?this.m_nodes[t]:this.m_root,i.isLeaf())return 0;var o=ComputeHeight(i.child1),e=ComputeHeight(i.child2);return 1+h.max(o,e)},s.prototype.validateStructure=function(t){if(null!=t){t==this.m_root;var i=t.child1,o=t.child2;t.isLeaf()||(this.validateStructure(i),this.validateStructure(o))}},s.prototype.validateMetrics=function(t){if(null!=t){var i=t.child1,o=t.child2;if(!t.isLeaf()){var e=this.m_nodes[i].height,s=this.m_nodes[o].height,n=(1+h.max(e,s),new c);n.combine(i.aabb,o.aabb),this.validateMetrics(i),this.validateMetrics(o)}}},s.prototype.validate=function(){ValidateStructure(this.m_root),ValidateMetrics(this.m_root)},s.prototype.getMaxBalance=function(){for(var t,i=0,o=u.allocate().preorder();t=o.next();)if(!(t.height<=1)){var e=h.abs(t.child2.height-t.child1.height);i=h.max(i,e)}return u.release(o),i},s.prototype.rebuildBottomUp=function(){for(var t,i=[],o=0,e=u.allocate().preorder();t=e.next();)t.height<0||(t.isLeaf()?(t.parent=null,i[o]=t,++o):this.freeNode(t));for(u.release(e);o>1;){for(var s=1/0,n=-1,r=-1,m=0;m<o;++m)for(var a=i[m].aabb,_=m+1;_<o;++_){var l=i[_].aabb,p=new c;p.combine(a,l);var y=p.getPerimeter();y<s&&(n=m,r=_,s=y)}var d=i[n],v=i[r],f=this.allocateNode();f.child1=d,f.child2=v,f.height=1+h.max(d.height,v.height),f.aabb.combine(d.aabb,v.aabb),f.parent=null,d.parent=f,v.parent=f,i[r]=i[o-1],i[n]=f,--o}this.m_root=i[0],this.validate()},s.prototype.shiftOrigin=function(t){for(var i,o=u.allocate().preorder();i=o.next();){var e=i.aabb;e.lowerBound.x-=t.x,e.lowerBound.y-=t.y,e.lowerBound.x-=t.x,e.lowerBound.y-=t.y}u.release(o)},s.prototype.query=function(t,i){var o=l.allocate();for(o.push(this.m_root);o.length>0;){var e=o.pop();if(null!=e&&c.testOverlap(e.aabb,t))if(e.isLeaf()){var s=i(e.id);if(0==s)return}else o.push(e.child1),o.push(e.child2)}l.release(o)},s.prototype.rayCast=function(t,i){var o=t.p1,e=t.p2,s=a.sub(e,o);s.normalize();var n=a.cross(1,s),r=a.abs(n),m=t.maxFraction,u=new c,p=a.wAdd(1-m,o,m,e);u.combinePoints(o,p);var y=l.allocate(),d=_.allocate();for(y.push(this.m_root);y.length>0;){var v=y.pop();if(null!=v&&0!=c.testOverlap(v.aabb,u)){var f=v.aabb.getCenter(),A=v.aabb.getExtents(),x=h.abs(a.dot(n,a.sub(o,f)))-a.dot(r,A);if(!(x>0))if(v.isLeaf()){d.p1=a.clone(t.p1),d.p2=a.clone(t.p2),d.maxFraction=m;var g=i(d,v.id);if(0==g)return;g>0&&(m=g,p=a.wAdd(1-m,o,m,e),u.combinePoints(o,p))}else y.push(v.child1),y.push(v.child2)}}l.release(y),_.release(d)};var _=new m({create:function(){return{}},release:function(t){}}),l=new m({create:function(){return[]},release:function(t){t.length=0}}),u=new m({create:function(){return new n},release:function(t){t.close()}})},{"../Settings":7,"../common/Math":18,"../common/Vec2":23,"../util/Pool":48,"../util/common":50,"./AABB":11}],15:[function(t,i,o){function e(){this.proxyA=new f,this.proxyB=new f,this.sweepA=new u,this.sweepB=new u,this.tMax}function s(){this.state,this.t}function n(t,i){var o=a.now();++h.toiCalls,t.state=s.e_unknown,t.t=i.tMax;var e=i.proxyA,n=i.proxyB,_=i.sweepA,l=i.sweepB;_.normalize(),l.normalize();var u=i.tMax,f=e.m_radius+n.m_radius,x=c.max(m.linearSlop,f-3*m.linearSlop),g=.25*m.linearSlop,b=0,B=m.maxTOIIterations,w=0,S=new A,C=new d;for(C.proxyA=i.proxyA,C.proxyB=i.proxyB,C.useRadii=!1;;){var M=p.identity(),I=p.identity();_.getTransform(M,b),l.getTransform(I,b),C.transformA=M,C.transformB=I;var T=new v;if(y(T,S,C),T.distance<=0){t.state=s.e_overlapped,t.t=0;break}if(T.distance<x+g){t.state=s.e_touching,t.t=b;break}var P=new r;P.initialize(S,e,_,n,l,b);for(var V=!1,z=u,L=0;;){var R=P.findMinSeparation(z);P.indexA,P.indexB;if(R>x+g){t.state=s.e_separated,t.t=u,V=!0;break}if(R>x-g){b=z;break}var F=P.evaluate(b);P.indexA,P.indexB;if(F<x-g){t.state=s.e_failed,t.t=b,V=!0;break}if(F<=x+g){t.state=s.e_touching,t.t=b,V=!0;break}for(var D=0,q=b,E=z;;){var k;k=1&D?q+(x-F)*(E-q)/(R-F):.5*(q+E),++D,++h.toiRootIters;var j=P.evaluate(k);P.indexA,P.indexB;if(c.abs(j-x)<g){z=k;break}if(j>x?(q=k,F=j):(E=k,R=j),50==D)break}if(h.toiMaxRootIters=c.max(h.toiMaxRootIters,D),++L,L==m.maxPolygonVertices)break}if(++w,++h.toiIters,V)break;if(w==B){t.state=s.e_failed,t.t=b;break}}h.toiMaxIters=c.max(h.toiMaxIters,w);var J=a.diff(o);h.toiMaxTime=c.max(h.toiMaxTime,J),h.toiTime+=J}function r(){this.m_proxyA=new f,this.m_proxyB=new f,this.m_sweepA,this.m_sweepB,this.m_type,this.m_localPoint=_.zero(),this.m_axis=_.zero()}DEBUG=!1,ASSERT=!1,i.exports=n,i.exports.Input=e,i.exports.Output=s;var m=t("../Settings"),a=(t("../util/common"),t("../util/Timer")),h=t("../common/stats"),c=t("../common/Math"),_=t("../common/Vec2"),l=(t("../common/Vec3"),t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),u=t("../common/Sweep"),p=t("../common/Transform"),y=(t("../common/Velocity"),t("../common/Position"),t("./Distance")),d=y.Input,v=y.Output,f=y.Proxy,A=y.Cache;s.e_unknown=0,s.e_failed=1,s.e_overlapped=2,s.e_touching=3,s.e_separated=4,h.toiTime=0,h.toiMaxTime=0,h.toiCalls=0,h.toiIters=0,h.toiMaxIters=0,h.toiRootIters=0,h.toiMaxRootIters=0;var x=1,g=2,b=3;r.prototype.initialize=function(t,i,o,e,s,n){this.m_proxyA=i,this.m_proxyB=e;var r=t.count;this.m_sweepA=o,this.m_sweepB=s;var m=p.identity(),a=p.identity();if(this.m_sweepA.getTransform(m,n),this.m_sweepB.getTransform(a,n),1==r){this.m_type=x;var h=this.m_proxyA.getVertex(t.indexA[0]),c=this.m_proxyB.getVertex(t.indexB[0]),u=p.mul(m,h),y=p.mul(a,c);this.m_axis.wSet(1,y,-1,u);var d=this.m_axis.normalize();return d}if(t.indexA[0]==t.indexA[1]){this.m_type=b;var v=e.getVertex(t.indexB[0]),f=e.getVertex(t.indexB[1]);this.m_axis=_.cross(_.sub(f,v),1),this.m_axis.normalize();var A=l.mul(a.q,this.m_axis);this.m_localPoint=_.mid(v,f);var y=p.mul(a,this.m_localPoint),h=i.getVertex(t.indexA[0]),u=p.mul(m,h),d=_.dot(u,A)-_.dot(y,A);return d<0&&(this.m_axis=_.neg(this.m_axis),d=-d),d}this.m_type=g;var B=this.m_proxyA.getVertex(t.indexA[0]),w=this.m_proxyA.getVertex(t.indexA[1]);this.m_axis=_.cross(_.sub(w,B),1),this.m_axis.normalize();var A=l.mul(m.q,this.m_axis);this.m_localPoint=_.mid(B,w);var u=p.mul(m,this.m_localPoint),c=this.m_proxyB.getVertex(t.indexB[0]),y=p.mul(a,c),d=_.dot(y,A)-_.dot(u,A);return d<0&&(this.m_axis=_.neg(this.m_axis),d=-d),d},r.prototype.compute=function(t,i){var o=p.identity(),e=p.identity();switch(this.m_sweepA.getTransform(o,i),this.m_sweepB.getTransform(e,i),this.m_type){case x:if(t){var s=l.mulT(o.q,this.m_axis),n=l.mulT(e.q,_.neg(this.m_axis));this.indexA=this.m_proxyA.getSupport(s),this.indexB=this.m_proxyB.getSupport(n)}var r=this.m_proxyA.getVertex(this.indexA),m=this.m_proxyB.getVertex(this.indexB),a=p.mul(o,r),h=p.mul(e,m),c=_.dot(h,this.m_axis)-_.dot(a,this.m_axis);return c;case g:var u=l.mul(o.q,this.m_axis),a=p.mul(o,this.m_localPoint);if(t){var n=l.mulT(e.q,_.neg(u));this.indexA=-1,this.indexB=this.m_proxyB.getSupport(n)}var m=this.m_proxyB.getVertex(this.indexB),h=p.mul(e,m),c=_.dot(h,u)-_.dot(a,u);return c;case b:var u=l.mul(e.q,this.m_axis),h=p.mul(e,this.m_localPoint);if(t){var s=l.mulT(o.q,_.neg(u));this.indexB=-1,this.indexA=this.m_proxyA.getSupport(s)}var r=this.m_proxyA.getVertex(this.indexA),a=p.mul(o,r),c=_.dot(a,u)-_.dot(h,u);return c;default:return t&&(this.indexA=-1,this.indexB=-1),0}},r.prototype.findMinSeparation=function(t){return this.compute(!0,t)},r.prototype.evaluate=function(t){return this.compute(!1,t)}},{"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../common/stats":26,"../util/Timer":49,"../util/common":50,"./Distance":13}],16:[function(t,i,o){function e(t,i,o,e){"object"==typeof t&&null!==t?(this.ex=s.clone(t),this.ey=s.clone(i)):"number"==typeof t?(this.ex=s.neo(t,o),this.ey=s.neo(i,e)):(this.ex=s.zero(),this.ey=s.zero())}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Math"),t("./Vec2"));e.prototype.toString=function(){return JSON.stringify(this)},e.isValid=function(t){return t&&s.isValid(t.ex)&&s.isValid(t.ey)},e.assert=function(t){},e.prototype.set=function(t,i,o,e){"number"==typeof t&&"number"==typeof i&&"number"==typeof o&&"number"==typeof e?(this.ex.set(t,o),this.ey.set(i,e)):"object"==typeof t&&"object"==typeof i?(this.ex.set(t),this.ey.set(i)):"object"==typeof t&&(this.ex.set(t.ex),this.ey.set(t.ey))},e.prototype.setIdentity=function(){this.ex.x=1,this.ey.x=0,this.ex.y=0,this.ey.y=1},e.prototype.setZero=function(){this.ex.x=0,this.ey.x=0,this.ex.y=0,this.ey.y=0},e.prototype.getInverse=function(){var t=this.ex.x,i=this.ey.x,o=this.ex.y,s=this.ey.y,n=t*s-i*o;0!=n&&(n=1/n);var r=new e;return r.ex.x=n*s,r.ey.x=-n*i,r.ex.y=-n*o,r.ey.y=n*t,r},e.prototype.solve=function(t){var i=this.ex.x,o=this.ey.x,e=this.ex.y,n=this.ey.y,r=i*n-o*e;0!=r&&(r=1/r);var m=s.zero();return m.x=r*(n*t.x-o*t.y),m.y=r*(i*t.y-e*t.x),m},e.mul=function(t,i){if(i&&"x"in i&&"y"in i){var o=t.ex.x*i.x+t.ey.x*i.y,n=t.ex.y*i.x+t.ey.y*i.y;return s.neo(o,n)}if(i&&"ex"in i&&"ey"in i)return new e(s.mul(t,i.ex),s.mul(t,i.ey))},e.mulT=function(t,i){if(i&&"x"in i&&"y"in i)return s.neo(s.dot(i,t.ex),s.dot(i,t.ey));if(i&&"ex"in i&&"ey"in i){var o=s.neo(s.dot(t.ex,i.ex),s.dot(t.ey,i.ex)),n=s.neo(s.dot(t.ex,i.ey),s.dot(t.ey,i.ey));return new e(o,n)}},e.abs=function(t){return new e(s.abs(t.ex),s.abs(t.ey))},e.add=function(t,i){return new e(s.add(t.ex+i.ex),s.add(t.ey+i.ey))}},{"../util/common":50,"./Math":18,"./Vec2":23}],17:[function(t,i,o){function e(t,i,o){"object"==typeof t&&null!==t?(this.ex=n.clone(t),this.ey=n.clone(i),this.ez=n.clone(o)):(this.ex=n(),this.ey=n(),this.ez=n())}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Math"),t("./Vec2")),n=t("./Vec3");e.prototype.toString=function(){return JSON.stringify(this)},e.isValid=function(t){return t&&n.isValid(t.ex)&&n.isValid(t.ey)&&n.isValid(t.ez)},e.assert=function(t){},e.prototype.setZero=function(){return this.ex.setZero(),this.ey.setZero(),this.ez.setZero(),this},e.prototype.solve33=function(t){var i=n.dot(this.ex,n.cross(this.ey,this.ez));0!=i&&(i=1/i);var o=new n;return o.x=i*n.dot(t,n.cross(this.ey,this.ez)),o.y=i*n.dot(this.ex,n.cross(t,this.ez)),o.z=i*n.dot(this.ex,n.cross(this.ey,t)),o},e.prototype.solve22=function(t){var i=this.ex.x,o=this.ey.x,e=this.ex.y,n=this.ey.y,r=i*n-o*e;0!=r&&(r=1/r);var m=s.zero();return m.x=r*(n*t.x-o*t.y),m.y=r*(i*t.y-e*t.x),m},e.prototype.getInverse22=function(t){var i=this.ex.x,o=this.ey.x,e=this.ex.y,s=this.ey.y,n=i*s-o*e;0!=n&&(n=1/n),t.ex.x=n*s,t.ey.x=-n*o,t.ex.z=0,t.ex.y=-n*e,t.ey.y=n*i,t.ey.z=0,t.ez.x=0,t.ez.y=0,t.ez.z=0},e.prototype.getSymInverse33=function(t){var i=n.dot(this.ex,n.cross(this.ey,this.ez));0!=i&&(i=1/i);var o=this.ex.x,e=this.ey.x,s=this.ez.x,r=this.ey.y,m=this.ez.y,a=this.ez.z;t.ex.x=i*(r*a-m*m),t.ex.y=i*(s*m-e*a),t.ex.z=i*(e*m-s*r),t.ey.x=t.ex.y,t.ey.y=i*(o*a-s*s),t.ey.z=i*(s*e-o*m),t.ez.x=t.ex.z,t.ez.y=t.ey.z,t.ez.z=i*(o*r-e*e)},e.mul=function(t,i){if(i&&"z"in i&&"y"in i&&"x"in i){var o=t.ex.x*i.x+t.ey.x*i.y+t.ez.x*i.z,e=t.ex.y*i.x+t.ey.y*i.y+t.ez.y*i.z,r=t.ex.z*i.x+t.ey.z*i.y+t.ez.z*i.z;return new n(o,e,r)}if(i&&"y"in i&&"x"in i){var o=t.ex.x*i.x+t.ey.x*i.y,e=t.ex.y*i.x+t.ey.y*i.y;return s.neo(o,e)}},e.add=function(t,i){return new n(t.x+i.x,t.y+i.y,t.z+i.z)}},{"../util/common":50,"./Math":18,"./Vec2":23,"./Vec3":24}],18:[function(t,i,o){DEBUG=!1,ASSERT=!1;var e=(t("../util/common"),t("../util/create")),s=Math,n=i.exports=e(s);n.EPSILON=1e-9,n.isFinite=function(t){return"number"==typeof t&&isFinite(t)&&!isNaN(t)},n.assert=function(t){},n.invSqrt=function(t){return 1/s.sqrt(t)},n.nextPowerOfTwo=function(t){return t|=t>>1,t|=t>>2,t|=t>>4,t|=t>>8,t|=t>>16,t+1},n.isPowerOfTwo=function(t){return t>0&&0==(t&t-1)},n.mod=function(t,i,o){return"undefined"==typeof i?(o=1,i=0):"undefined"==typeof o&&(o=i,i=0),o>i?(t=(t-i)%(o-i),t+(t<0?o:i)):(t=(t-o)%(i-o),t+(t<=0?i:o))},n.clamp=function(t,i,o){return t<i?i:t>o?o:t},n.random=function(t,i){return"undefined"==typeof t?(i=1,t=0):"undefined"==typeof i&&(i=t,t=0),t==i?t:s.random()*(i-t)+t}},{"../util/common":50,"../util/create":51}],19:[function(t,i,o){function e(){this.c=s.zero(),this.a=0}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("./Vec2"),n=t("./Rot");e.prototype.getTransform=function(t,i){return t.q.set(this.a),t.p.set(s.sub(this.c,n.mul(t.q,i))),t}},{"./Rot":20,"./Vec2":23}],20:[function(t,i,o){function e(t){return this instanceof e?void("number"==typeof t?this.setAngle(t):"object"==typeof t?this.set(t):this.setIdentity()):new e(t)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Vec2")),n=t("./Math");e.neo=function(t){var i=Object.create(e.prototype);return i.setAngle(t),i},e.clone=function(t){Object.create(e.prototype);return ojb.s=t.s,ojb.c=t.c,ojb},e.identity=function(t){var i=Object.create(e.prototype);return i.s=0,i.c=1,i},e.isValid=function(t){return t&&n.isFinite(t.s)&&n.isFinite(t.c)},e.assert=function(t){},e.prototype.setIdentity=function(){this.s=0,this.c=1},e.prototype.set=function(t){"object"==typeof t?(this.s=t.s,this.c=t.c):(this.s=n.sin(t),this.c=n.cos(t))},e.prototype.setAngle=function(t){this.s=n.sin(t),this.c=n.cos(t)},e.prototype.getAngle=function(){return n.atan2(this.s,this.c)},e.prototype.getXAxis=function(){return s.neo(this.c,this.s)},e.prototype.getYAxis=function(){return s.neo(-this.s,this.c)},e.mul=function(t,i){if("c"in i&&"s"in i){var o=e.identity();return o.s=t.s*i.c+t.c*i.s,o.c=t.c*i.c-t.s*i.s,o}if("x"in i&&"y"in i)return s.neo(t.c*i.x-t.s*i.y,t.s*i.x+t.c*i.y)},e.mulSub=function(t,i,o){var e=t.c*(i.x-o.x)-t.s*(i.y-o.y),n=t.s*(i.x-o.y)+t.c*(i.y-o.y);return s.neo(e,n)},e.mulT=function(t,i){if("c"in i&&"s"in i){var o=e.identity();return o.s=t.c*i.s-t.s*i.c,o.c=t.c*i.c+t.s*i.s,o}if("x"in i&&"y"in i)return s.neo(t.c*i.x+t.s*i.y,-t.s*i.x+t.c*i.y)}},{"../util/common":50,"./Math":18,"./Vec2":23}],21:[function(t,i,o){function e(t,i){this.localCenter=n.zero(),this.c=n.zero(),this.a=0,this.alpha0=0,this.c0=n.zero(),this.a0=0}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Math")),n=t("./Vec2"),r=t("./Rot"),m=t("./Transform");e.prototype.setTransform=function(t){var i=m.mul(t,this.localCenter);this.c.set(i),this.c0.set(i),this.a=t.q.getAngle(),this.a0=t.q.getAngle()},e.prototype.setLocalCenter=function(t,i){this.localCenter.set(t);var o=m.mul(i,this.localCenter);this.c.set(o),this.c0.set(o)},e.prototype.getTransform=function(t,i){i="undefined"==typeof i?0:i,t.q.setAngle((1-i)*this.a0+i*this.a),t.p.wSet(1-i,this.c0,i,this.c),t.p.sub(r.mul(t.q,this.localCenter))},e.prototype.advance=function(t){var i=(t-this.alpha0)/(1-this.alpha0);this.c0.wSet(i,this.c,1-i,this.c0),this.a0=i*this.a+(1-i)*this.a0,this.alpha0=t},e.prototype.forward=function(){this.a0=this.a,this.c0.set(this.c)},e.prototype.normalize=function(){var t=s.mod(this.a0,-s.PI,+s.PI);this.a-=this.a0-t,this.a0=t},e.prototype.clone=function(){var t=new e;return t.localCenter.set(this.localCenter),t.alpha0=this.alpha0,t.a0=this.a0,t.a=this.a,t.c0.set(this.c0),t.c.set(this.c),t},e.prototype.set=function(t){this.localCenter.set(t.localCenter),this.alpha0=t.alpha0,this.a0=t.a0,this.a=t.a,this.c0.set(t.c0),this.c.set(t.c)}},{"../util/common":50,"./Math":18,"./Rot":20,"./Transform":22,"./Vec2":23}],22:[function(t,i,o){function e(t,i){return this instanceof e?(this.p=s.zero(),this.q=n.identity(),"undefined"!=typeof t&&this.p.set(t),void("undefined"!=typeof i&&this.q.set(i))):new e(t,i)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Vec2")),n=t("./Rot");e.clone=function(t){var i=Object.create(e.prototype);return i.p=s.clone(t.p),i.q=n.clone(t.q),i},e.neo=function(t,i){var o=Object.create(e.prototype);return o.p=s.clone(t),o.q=n.clone(i),o},e.identity=function(){var t=Object.create(e.prototype);return t.p=s.zero(),t.q=n.identity(),t},e.prototype.setIdentity=function(){this.p.setZero(),this.q.setIdentity()},e.prototype.set=function(t,i){e.isValid(t)?(this.p.set(t.p),this.q.set(t.q)):(this.p.set(t),this.q.set(i))},e.isValid=function(t){return t&&s.isValid(t.p)&&n.isValid(t.q)},e.assert=function(t){},e.mul=function(t,i){if(Array.isArray(i)){for(var o=[],r=0;r<i.length;r++)o[r]=e.mul(t,i[r]);return o}if("x"in i&&"y"in i){var m=t.q.c*i.x-t.q.s*i.y+t.p.x,a=t.q.s*i.x+t.q.c*i.y+t.p.y;return s.neo(m,a)}if("p"in i&&"q"in i){var h=e.identity();return h.q=n.mul(t.q,i.q),h.p=s.add(n.mul(t.q,i.p),t.p),h}},e.mulT=function(t,i){if("x"in i&&"y"in i){var o=i.x-t.p.x,r=i.y-t.p.y,m=t.q.c*o+t.q.s*r,a=-t.q.s*o+t.q.c*r;return s.neo(m,a)}if("p"in i&&"q"in i){var h=e.identity();return h.q.set(n.mulT(t.q,i.q)),h.p.set(n.mulT(t.q,s.sub(i.p,t.p))),h}}},{"../util/common":50,"./Rot":20,"./Vec2":23}],23:[function(t,i,o){function e(t,i){return this instanceof e?void("undefined"==typeof t?(this.x=0,this.y=0):"object"==typeof t?(this.x=t.x,this.y=t.y):(this.x=t,this.y=i)):new e(t,i)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Math"));e.zero=function(){var t=Object.create(e.prototype);return t.x=0,t.y=0,t},e.neo=function(t,i){var o=Object.create(e.prototype);return o.x=t,o.y=i,o},e.clone=function(t,i){return e.neo(t.x,t.y)},e.prototype.toString=function(){return JSON.stringify(this)},e.isValid=function(t){return t&&s.isFinite(t.x)&&s.isFinite(t.y)},e.assert=function(t){},e.prototype.clone=function(t){return e.clone(this,t)},e.prototype.setZero=function(){return this.x=0,this.y=0,this},e.prototype.set=function(t,i){return"object"==typeof t?(this.x=t.x,this.y=t.y):(this.x=t,this.y=i),this},e.prototype.wSet=function(t,i,o,e){var s=t*i.x,n=t*i.y;return"undefined"==typeof o&&"undefined"==typeof e||(s+=o*e.x,n+=o*e.y),this.x=s,this.y=n,this},e.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},e.prototype.wAdd=function(t,i,o,e){var s=t*i.x,n=t*i.y;return"undefined"==typeof o&&"undefined"==typeof e||(s+=o*e.x,n+=o*e.y),this.x+=s,this.y+=n,this},e.prototype.wSub=function(t,i,o,e){var s=t*i.x,n=t*i.y;return"undefined"==typeof o&&"undefined"==typeof e||(s+=o*e.x,n+=o*e.y),this.x-=s,this.y-=n,this},e.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this},e.prototype.mul=function(t){return this.x*=t,this.y*=t,this},e.prototype.length=function(){return e.lengthOf(this)},e.prototype.lengthSquared=function(){return e.lengthSquared(this)},e.prototype.normalize=function(){var t=this.length();if(t<s.EPSILON)return 0;var i=1/t;return this.x*=i,this.y*=i,t},e.lengthOf=function(t){return s.sqrt(t.x*t.x+t.y*t.y)},e.lengthSquared=function(t){return t.x*t.x+t.y*t.y},e.distance=function(t,i){var o=t.x-i.x,e=t.y-i.y;return s.sqrt(o*o+e*e)},e.distanceSquared=function(t,i){var o=t.x-i.x,e=t.y-i.y;return o*o+e*e},e.areEqual=function(t,i){return t==i||"object"==typeof i&&null!==i&&t.x==i.x&&t.y==i.y},e.skew=function(t){return e.neo(-t.y,t.x)},e.dot=function(t,i){return t.x*i.x+t.y*i.y},e.cross=function(t,i){return"number"==typeof i?e.neo(i*t.y,-i*t.x):"number"==typeof t?e.neo(-t*i.y,t*i.x):t.x*i.y-t.y*i.x},e.addCross=function(t,i,o){return"number"==typeof o?e.neo(o*i.y+t.x,-o*i.x+t.y):"number"==typeof i?e.neo(-i*o.y+t.x,i*o.x+t.y):void 0},e.add=function(t,i){return e.neo(t.x+i.x,t.y+i.y)},e.wAdd=function(t,i,o,s){var n=e.zero();return n.wAdd(t,i,o,s),n},e.sub=function(t,i){return e.neo(t.x-i.x,t.y-i.y)},e.mul=function(t,i){return"object"==typeof t?e.neo(t.x*i,t.y*i):"object"==typeof i?e.neo(t*i.x,t*i.y):void 0},e.prototype.neg=function(){return this.x=-this.x,this.y=-this.y,this},e.neg=function(t){return e.neo(-t.x,-t.y)},e.abs=function(t){return e.neo(s.abs(t.x),s.abs(t.y))},e.mid=function(t,i){return e.neo(.5*(t.x+i.x),.5*(t.y+i.y))},e.upper=function(t,i){return e.neo(s.max(t.x,i.x),s.max(t.y,i.y))},e.lower=function(t,i){return e.neo(s.min(t.x,i.x),s.min(t.y,i.y))},e.prototype.clamp=function(t){var i=this.x*this.x+this.y*this.y;if(i>t*t){var o=s.invSqrt(i);this.x*=o*t,this.y*=o*t}return this},e.clamp=function(t,i){return t=e.neo(t.x,t.y),t.clamp(i),t}},{"../util/common":50,"./Math":18}],24:[function(t,i,o){function e(t,i,o){return this instanceof e?void("undefined"==typeof t?(this.x=0,this.y=0,this.z=0):"object"==typeof t?(this.x=t.x,this.y=t.y,this.z=t.z):(this.x=t,this.y=i,this.z=o)):new e(t,i,o)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Math"));e.prototype.toString=function(){return JSON.stringify(this)},e.isValid=function(t){return t&&s.isFinite(t.x)&&s.isFinite(t.y)&&s.isFinite(t.z)},e.assert=function(t){},e.prototype.setZero=function(){return this.x=0,this.y=0,this.z=0,this},e.prototype.set=function(t,i,o){return this.x=t,this.y=i,this.z=o,this},e.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this},e.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this},e.prototype.mul=function(t){return this.x*=t,this.y*=t,this.z*=t,this},e.areEqual=function(t,i){return t==i||"object"==typeof i&&null!==i&&t.x==i.x&&t.y==i.y&&t.z==i.z},e.dot=function(t,i){return t.x*i.x+t.y*i.y+t.z*i.z},e.cross=function(t,i){return new e(t.y*i.z-t.z*i.y,t.z*i.x-t.x*i.z,t.x*i.y-t.y*i.x)},e.add=function(t,i){return new e(t.x+i.x,t.y+i.y,t.z+i.z)},e.sub=function(t,i){return new e(t.x-i.x,t.y-i.y,t.z-i.z)},e.mul=function(t,i){return new e(i*t.x,i*t.y,i*t.z)},e.prototype.neg=function(t){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this},e.neg=function(t){return new e((-t.x),(-t.y),(-t.z))}},{"../util/common":50,"./Math":18}],25:[function(t,i,o){function e(){this.v=s.zero(),this.w=0}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("./Vec2")},{"./Vec2":23}],26:[function(t,i,o){DEBUG=!1,ASSERT=!1,o.toString=function(t){t="string"==typeof t?t:"\n";var i="";for(var o in this)"function"!=typeof this[o]&&"object"!=typeof this[o]&&(i+=o+":"+this[o]+t);return i}},{}],27:[function(t,i,o){function e(t,i,o,n,r){return this instanceof e?(t=s(t,_),c.call(this,t,i,n),this.m_type=e.TYPE,this.m_localAnchorA=t.localAnchorA||i.getLocalPoint(o),this.m_localAnchorB=t.localAnchorB||n.getLocalPoint(r),this.m_length=a.distance(r,o),this.m_frequencyHz=t.frequencyHz,this.m_dampingRatio=t.dampingRatio,this.m_impulse=0,this.m_gamma=0,this.m_bias=0,this.m_u,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,void this.m_mass):new e(t,i,o,n,r)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("../util/options"),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=(t("../common/Vec3"),t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),c=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="distance-joint",e._super=c,e.prototype=n(e._super.prototype);var _={frequencyHz:0,dampingRatio:0};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.setLength=function(t){this.m_length=t},e.prototype.getLength=function(){return this.m_length},e.prototype.setFrequency=function(t){this.m_frequencyHz=t},e.prototype.getFrequency=function(){return this.m_frequencyHz},e.prototype.setDampingRatio=function(t){this.m_dampingRatio=t},e.prototype.getDampingRatio=function(){return this.m_dampingRatio},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){var i=a.mul(t*this.m_impulse,this.m_u);return i},e.prototype.getReactionTorque=function(t){return 0},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,n=this.m_bodyB.c_position.c,c=this.m_bodyB.c_position.a,_=this.m_bodyB.c_velocity.v,l=this.m_bodyB.c_velocity.w,u=h.neo(o),p=h.neo(c);this.m_rA=h.mul(u,a.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=h.mul(p,a.sub(this.m_localAnchorB,this.m_localCenterB)),this.m_u=a.sub(a.add(n,this.m_rB),a.add(i,this.m_rA));var y=this.m_u.length();y>r.linearSlop?this.m_u.mul(1/y):this.m_u.set(0,0);var d=a.cross(this.m_rA,this.m_u),v=a.cross(this.m_rB,this.m_u),f=this.m_invMassA+this.m_invIA*d*d+this.m_invMassB+this.m_invIB*v*v;if(this.m_mass=0!=f?1/f:0,this.m_frequencyHz>0){var A=y-this.m_length,x=2*m.PI*this.m_frequencyHz,g=2*this.m_mass*this.m_dampingRatio*x,b=this.m_mass*x*x,B=t.dt;this.m_gamma=B*(g+B*b),this.m_gamma=0!=this.m_gamma?1/this.m_gamma:0,this.m_bias=A*B*b*this.m_gamma,f+=this.m_gamma,this.m_mass=0!=f?1/f:0}else this.m_gamma=0,this.m_bias=0;if(t.warmStarting){this.m_impulse*=t.dtRatio;var w=a.mul(this.m_impulse,this.m_u);e.wSub(this.m_invMassA,w),s-=this.m_invIA*a.cross(this.m_rA,w),_.wAdd(this.m_invMassB,w),l+=this.m_invIB*a.cross(this.m_rB,w)}else this.m_impulse=0;this.m_bodyA.c_velocity.v.set(e),this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v.set(_),this.m_bodyB.c_velocity.w=l},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=a.add(i,a.cross(o,this.m_rA)),r=a.add(e,a.cross(s,this.m_rB)),m=a.dot(this.m_u,r)-a.dot(this.m_u,n),h=-this.m_mass*(m+this.m_bias+this.m_gamma*this.m_impulse);this.m_impulse+=h;var c=a.mul(h,this.m_u);i.wSub(this.m_invMassA,c),o-=this.m_invIA*a.cross(this.m_rA,c),e.wAdd(this.m_invMassB,c),s+=this.m_invIB*a.cross(this.m_rB,c),this.m_bodyA.c_velocity.v.set(i),this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v.set(e),this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){if(this.m_frequencyHz>0)return!0;var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyB.c_position.c,s=this.m_bodyB.c_position.a,n=h.neo(o),c=h.neo(s),_=h.mulSub(n,this.m_localAnchorA,this.m_localCenterA),l=h.mulSub(c,this.m_localAnchorB,this.m_localCenterB),u=a.sub(a.add(e,l),a.add(i,_)),p=u.normalize(),y=p-this.m_length;y=m.clamp(y,-r.maxLinearCorrection,r.maxLinearCorrection);var d=-this.m_mass*y,v=a.mul(d,u);return i.wSub(this.m_invMassA,v),o-=this.m_invIA*a.cross(_,v),e.wAdd(this.m_invMassB,v),s+=this.m_invIB*a.cross(l,v),this.m_bodyA.c_position.c.set(i),this.m_bodyA.c_position.a=o,this.m_bodyB.c_position.c.set(e),this.m_bodyB.c_position.a=s,m.abs(y)<r.linearSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":51,"../util/options":52}],28:[function(t,i,o){function e(t,i,o,n){return this instanceof e?(t=s(t,_),c.call(this,t,i,o),this.m_type=e.TYPE,n?(this.m_localAnchorA=i.getLocalPoint(n),this.m_localAnchorB=o.getLocalPoint(n)):(this.m_localAnchorA=m.zero(),this.m_localAnchorB=m.zero()),this.m_linearImpulse=m.zero(),this.m_angularImpulse=0,this.m_maxForce=t.maxForce,this.m_maxTorque=t.maxTorque,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,this.m_linearMass,void this.m_angularMass):new e(t,i,o,n)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=(t("../Settings"),t("../common/Math")),m=t("../common/Vec2"),a=(t("../common/Vec3"),t("../common/Mat22")),h=(t("../common/Mat33"),t("../common/Rot")),c=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="friction-joint",e._super=c,e.prototype=n(e._super.prototype);var _={maxForce:0,maxTorque:0};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.setMaxForce=function(t){this.m_maxForce=t},e.prototype.getMaxForce=function(){return this.m_maxForce},e.prototype.setMaxTorque=function(t){this.m_maxTorque=t},e.prototype.getMaxTorque=function(){return this.m_maxTorque},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){return t*this.m_linearImpulse},e.prototype.getReactionTorque=function(t){return t*this.m_angularImpulse},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.a,o=this.m_bodyA.c_velocity.v,e=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_position.a,n=this.m_bodyB.c_velocity.v,r=this.m_bodyB.c_velocity.w,c=h.neo(i),_=h.neo(s);this.m_rA=h.mul(c,m.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=h.mul(_,m.sub(this.m_localAnchorB,this.m_localCenterB));var l=this.m_invMassA,u=this.m_invMassB,p=this.m_invIA,y=this.m_invIB,d=new a;if(d.ex.x=l+u+p*this.m_rA.y*this.m_rA.y+y*this.m_rB.y*this.m_rB.y,d.ex.y=-p*this.m_rA.x*this.m_rA.y-y*this.m_rB.x*this.m_rB.y,d.ey.x=d.ex.y,d.ey.y=l+u+p*this.m_rA.x*this.m_rA.x+y*this.m_rB.x*this.m_rB.x,this.m_linearMass=d.getInverse(),this.m_angularMass=p+y,this.m_angularMass>0&&(this.m_angularMass=1/this.m_angularMass),t.warmStarting){this.m_linearImpulse.mul(t.dtRatio),this.m_angularImpulse*=t.dtRatio;var v=m.neo(this.m_linearImpulse.x,this.m_linearImpulse.y);o.wSub(l,v),e-=p*(m.cross(this.m_rA,v)+this.m_angularImpulse),n.wAdd(u,v),r+=y*(m.cross(this.m_rB,v)+this.m_angularImpulse)}else this.m_linearImpulse.setZero(),this.m_angularImpulse=0;this.m_bodyA.c_velocity.v=o,this.m_bodyA.c_velocity.w=e,this.m_bodyB.c_velocity.v=n,this.m_bodyB.c_velocity.w=r},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=this.m_invMassA,h=this.m_invMassB,c=this.m_invIA,_=this.m_invIB,l=t.dt,u=s-o,p=-this.m_angularMass*u,y=this.m_angularImpulse,d=l*this.m_maxTorque;this.m_angularImpulse=r.clamp(this.m_angularImpulse+p,-d,d),p=this.m_angularImpulse-y,o-=c*p,s+=_*p;var u=m.sub(m.add(e,m.cross(s,this.m_rB)),m.add(i,m.cross(o,this.m_rA))),p=m.neg(a.mul(this.m_linearMass,u)),y=this.m_linearImpulse;this.m_linearImpulse.add(p);var d=l*this.m_maxForce;this.m_linearImpulse.lengthSquared()>d*d&&(this.m_linearImpulse.normalize(),this.m_linearImpulse.mul(d)),p=m.sub(this.m_linearImpulse,y),i.wSub(n,p),o-=c*m.cross(this.m_rA,p),e.wAdd(h,p),s+=_*m.cross(this.m_rB,p),this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){return!0}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],29:[function(t,i,o){function e(t,i,o,n,r,l){if(!(this instanceof e))return new e(t,i,o,n,r,l);t=s(t,_),h.call(this,t,i,o),this.m_type=e.TYPE,this.m_joint1=n,this.m_joint2=r,this.m_type1=this.m_joint1.getType(),this.m_type2=this.m_joint2.getType();var u,p;this.m_bodyC=this.m_joint1.getBodyA(),this.m_bodyA=this.m_joint1.getBodyB();var y=this.m_bodyA.m_xf,d=this.m_bodyA.m_sweep.a,v=this.m_bodyC.m_xf,f=this.m_bodyC.m_sweep.a;if(this.m_type1==c.TYPE){var A=n;this.m_localAnchorC=A.m_localAnchorA,this.m_localAnchorA=A.m_localAnchorB,this.m_referenceAngleA=A.m_referenceAngle,this.m_localAxisC=m.zero(),u=d-f-this.m_referenceAngleA}else{var x=n;this.m_localAnchorC=x.m_localAnchorA,this.m_localAnchorA=x.m_localAnchorB,this.m_referenceAngleA=x.m_referenceAngle,this.m_localAxisC=x.m_localXAxisA;var g=this.m_localAnchorC,b=a.mulT(v.q,m.add(a.mul(y.q,this.m_localAnchorA),m.sub(y.p,v.p)));u=m.dot(b,this.m_localAxisC)-m.dot(g,this.m_localAxisC)}this.m_bodyD=this.m_joint2.getBodyA(),this.m_bodyB=this.m_joint2.getBodyB();var B=this.m_bodyB.m_xf,w=this.m_bodyB.m_sweep.a,S=this.m_bodyD.m_xf,C=this.m_bodyD.m_sweep.a;if(this.m_type2==c.TYPE){var A=r;this.m_localAnchorD=A.m_localAnchorA,this.m_localAnchorB=A.m_localAnchorB,this.m_referenceAngleB=A.m_referenceAngle,this.m_localAxisD=m.zero(),p=w-C-this.m_referenceAngleB}else{var x=r;this.m_localAnchorD=x.m_localAnchorA,this.m_localAnchorB=x.m_localAnchorB,this.m_referenceAngleB=x.m_referenceAngle,this.m_localAxisD=x.m_localXAxisA;var M=this.m_localAnchorD,I=a.mulT(S.q,m.add(a.mul(B.q,this.m_localAnchorB),m.sub(B.p,S.p)));p=m.dot(I,this.m_localAxisD)-m.dot(M,this.m_localAxisD)}this.m_ratio=l||t.ratio,this.m_constant=u+this.m_ratio*p,this.m_impulse=0,this.m_lcA,this.m_lcB,this.m_lcC,this.m_lcD,this.m_mA,this.m_mB,this.m_mC,this.m_mD,this.m_iA,this.m_iB,this.m_iC,this.m_iD,this.m_JvAC,this.m_JvBD,this.m_JwA,this.m_JwB,this.m_JwC,this.m_JwD,this.m_mass}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=t("../Settings"),m=(t("../common/Math"),t("../common/Vec2")),a=(t("../common/Vec3"),t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),h=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint")),c=t("./RevoluteJoint");t("./PrismaticJoint");e.TYPE="gear-joint",e._super=h,e.prototype=n(e._super.prototype);var _={ratio:1};e.prototype.getJoint1=function(){return this.m_joint1},e.prototype.getJoint2=function(){return this.m_joint2},e.prototype.setRatio=function(t){this.m_ratio=t},e.prototype.setRatio=function(){return this.m_ratio},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){var i=this.m_impulse*this.m_JvAC;return t*i},e.prototype.getReactionTorque=function(t){var i=this.m_impulse*this.m_JwA;return t*i},e.prototype.initVelocityConstraints=function(t){this.m_lcA=this.m_bodyA.m_sweep.localCenter,this.m_lcB=this.m_bodyB.m_sweep.localCenter,this.m_lcC=this.m_bodyC.m_sweep.localCenter,this.m_lcD=this.m_bodyD.m_sweep.localCenter,this.m_mA=this.m_bodyA.m_invMass,this.m_mB=this.m_bodyB.m_invMass,this.m_mC=this.m_bodyC.m_invMass,this.m_mD=this.m_bodyD.m_invMass,this.m_iA=this.m_bodyA.m_invI,this.m_iB=this.m_bodyB.m_invI,this.m_iC=this.m_bodyC.m_invI,this.m_iD=this.m_bodyD.m_invI;var i=this.m_bodyA.c_position.a,o=this.m_bodyA.c_velocity.v,e=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_position.a,n=this.m_bodyB.c_velocity.v,r=this.m_bodyB.c_velocity.w,h=this.m_bodyC.c_position.a,_=this.m_bodyC.c_velocity.v,l=this.m_bodyC.c_velocity.w,u=this.m_bodyD.c_position.a,p=this.m_bodyD.c_velocity.v,y=this.m_bodyD.c_velocity.w,d=a.neo(i),v=a.neo(s),f=a.neo(h),A=a.neo(u);if(this.m_mass=0,this.m_type1==c.TYPE)this.m_JvAC=m.zero(),this.m_JwA=1,this.m_JwC=1,this.m_mass+=this.m_iA+this.m_iC;else{var x=a.mul(f,this.m_localAxisC),g=a.mulSub(f,this.m_localAnchorC,this.m_lcC),b=a.mulSub(d,this.m_localAnchorA,this.m_lcA);this.m_JvAC=x,this.m_JwC=m.cross(g,x),this.m_JwA=m.cross(b,x),this.m_mass+=this.m_mC+this.m_mA+this.m_iC*this.m_JwC*this.m_JwC+this.m_iA*this.m_JwA*this.m_JwA}if(this.m_type2==c.TYPE)this.m_JvBD=m.zero(),this.m_JwB=this.m_ratio,this.m_JwD=this.m_ratio,this.m_mass+=this.m_ratio*this.m_ratio*(this.m_iB+this.m_iD);else{var x=a.mul(A,this.m_localAxisD),B=a.mulSub(A,this.m_localAnchorD,this.m_lcD),w=a.mulSub(v,this.m_localAnchorB,this.m_lcB);this.m_JvBD=m.mul(this.m_ratio,x),this.m_JwD=this.m_ratio*m.cross(B,x),this.m_JwB=this.m_ratio*m.cross(w,x),this.m_mass+=this.m_ratio*this.m_ratio*(this.m_mD+this.m_mB)+this.m_iD*this.m_JwD*this.m_JwD+this.m_iB*this.m_JwB*this.m_JwB}this.m_mass=this.m_mass>0?1/this.m_mass:0,t.warmStarting?(o.wAdd(this.m_mA*this.m_impulse,this.m_JvAC),e+=this.m_iA*this.m_impulse*this.m_JwA,n.wAdd(this.m_mB*this.m_impulse,this.m_JvBD),r+=this.m_iB*this.m_impulse*this.m_JwB,_.wSub(this.m_mC*this.m_impulse,this.m_JvAC),l-=this.m_iC*this.m_impulse*this.m_JwC,p.wSub(this.m_mD*this.m_impulse,this.m_JvBD),y-=this.m_iD*this.m_impulse*this.m_JwD):this.m_impulse=0,this.m_bodyA.c_velocity.v.set(o),this.m_bodyA.c_velocity.w=e,this.m_bodyB.c_velocity.v.set(n),this.m_bodyB.c_velocity.w=r,this.m_bodyC.c_velocity.v.set(_),this.m_bodyC.c_velocity.w=l,this.m_bodyD.c_velocity.v.set(p),this.m_bodyD.c_velocity.w=y},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=this.m_bodyC.c_velocity.v,r=this.m_bodyC.c_velocity.w,a=this.m_bodyD.c_velocity.v,h=this.m_bodyD.c_velocity.w,c=m.dot(this.m_JvAC,i)-m.dot(this.m_JvAC,n)+m.dot(this.m_JvBD,e)-m.dot(this.m_JvBD,a);c+=this.m_JwA*o-this.m_JwC*r+(this.m_JwB*s-this.m_JwD*h);var _=-this.m_mass*c;this.m_impulse+=_,i.wAdd(this.m_mA*_,this.m_JvAC),o+=this.m_iA*_*this.m_JwA,e.wAdd(this.m_mB*_,this.m_JvBD),s+=this.m_iB*_*this.m_JwB,n.wSub(this.m_mC*_,this.m_JvAC),r-=this.m_iC*_*this.m_JwC,a.wSub(this.m_mD*_,this.m_JvBD),h-=this.m_iD*_*this.m_JwD,this.m_bodyA.c_velocity.v.set(i),this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v.set(e),this.m_bodyB.c_velocity.w=s,this.m_bodyC.c_velocity.v.set(n),this.m_bodyC.c_velocity.w=r,this.m_bodyD.c_velocity.v.set(a),this.m_bodyD.c_velocity.w=h},e.prototype.solvePositionConstraints=function(t){var i,o,e,s,n,h,_,l,u=this.m_bodyA.c_position.c,p=this.m_bodyA.c_position.a,y=this.m_bodyB.c_position.c,d=this.m_bodyB.c_position.a,v=this.m_bodyC.c_position.c,f=this.m_bodyC.c_position.a,A=this.m_bodyD.c_position.c,x=this.m_bodyD.c_position.a,g=a.neo(p),b=a.neo(d),B=a.neo(f),w=a.neo(x),S=0,C=0;if(this.m_type1==c.TYPE)e=m.zero(),n=1,_=1,C+=this.m_iA+this.m_iC,i=p-f-this.m_referenceAngleA;else{var M=a.mul(B,this.m_localAxisC),I=a.mulSub(B,this.m_localAnchorC,this.m_lcC),T=a.mulSub(g,this.m_localAnchorA,this.m_lcA);e=M,_=m.cross(I,M),n=m.cross(T,M),C+=this.m_mC+this.m_mA+this.m_iC*_*_+this.m_iA*n*n;var P=this.m_localAnchorC-this.m_lcC,V=a.mulT(B,m.add(T,m.sub(u,v)));i=Dot(V-P,this.m_localAxisC)}if(this.m_type2==c.TYPE)s=m.zero(),h=this.m_ratio,l=this.m_ratio,C+=this.m_ratio*this.m_ratio*(this.m_iB+this.m_iD),o=d-x-this.m_referenceAngleB;else{var M=a.mul(w,this.m_localAxisD),z=a.mulSub(w,this.m_localAnchorD,this.m_lcD),L=a.mulSub(b,this.m_localAnchorB,this.m_lcB);s=m.mul(this.m_ratio,M),l=this.m_ratio*m.cross(z,M),h=this.m_ratio*m.cross(L,M),C+=this.m_ratio*this.m_ratio*(this.m_mD+this.m_mB)+this.m_iD*l*l+this.m_iB*h*h;var R=m.sub(this.m_localAnchorD,this.m_lcD),F=a.mulT(w,m.add(L,m.sub(y,A)));o=m.dot(F,this.m_localAxisD)-m.dot(R,this.m_localAxisD)}var D=i+this.m_ratio*o-this.m_constant,q=0;return C>0&&(q=-D/C),u.wAdd(this.m_mA*q,e),p+=this.m_iA*q*n,y.wAdd(this.m_mB*q,s),d+=this.m_iB*q*h,v.wAdd(this.m_mC*q,e),f-=this.m_iC*q*_,A.wAdd(this.m_mD*q,s),x-=this.m_iD*q*l,this.m_bodyA.c_position.c.set(u),this.m_bodyA.c_position.a=p,this.m_bodyB.c_position.c.set(y),this.m_bodyB.c_position.a=d,this.m_bodyC.c_position.c.set(v),this.m_bodyC.c_position.a=f,this.m_bodyD.c_position.c.set(A),this.m_bodyD.c_position.a=x,S<r.linearSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52,"./PrismaticJoint":32,"./RevoluteJoint":34}],30:[function(t,i,o){function e(t,i,o){if(!(this instanceof e))return new e(t,i,o);t=s(t,_),c.call(this,t,i,o),this.m_type=e.TYPE;var n=o.getPosition();this.m_linearOffset=i.getLocalPoint(n);var r=i.getAngle(),a=o.getAngle();this.m_angularOffset=a-r,this.m_linearImpulse=m.zero(),this.m_angularImpulse=0,this.m_maxForce=t.maxForce,this.m_maxTorque=t.maxTorque,this.m_correctionFactor=t.correctionFactor,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_linearError,this.m_angularError,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,this.m_linearMass,this.m_angularMass}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=(t("../Settings"),t("../common/Math")),m=t("../common/Vec2"),a=(t("../common/Vec3"),t("../common/Mat22")),h=(t("../common/Mat33"),t("../common/Rot")),c=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="motor-joint",e._super=c,e.prototype=n(e._super.prototype);var _={maxForce:1,maxTorque:1,correctionFactor:.3};e.prototype.setMaxForce=function(t){this.m_maxForce=t},e.prototype.getMaxForce=function(){return this.m_maxForce},e.prototype.setMaxTorque=function(t){this.m_maxTorque=t},e.prototype.getMaxTorque=function(){return this.m_maxTorque},e.prototype.setCorrectionFactor=function(t){this.m_correctionFactor=t},e.prototype.getCorrectionFactor=function(){return this.m_correctionFactor},e.prototype.setLinearOffset=function(t){t.x==this.m_linearOffset.x&&t.y==this.m_linearOffset.y||(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_linearOffset=t)},e.prototype.getLinearOffset=function(){return this.m_linearOffset},e.prototype.setAngularOffset=function(t){t!=this.m_angularOffset&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_angularOffset=t)},e.prototype.getAngularOffset=function(){return this.m_angularOffset},e.prototype.getAnchorA=function(){return this.m_bodyA.getPosition()},e.prototype.getAnchorB=function(){return this.m_bodyB.getPosition()},e.prototype.getReactionForce=function(t){return t*this.m_linearImpulse},e.prototype.getReactionTorque=function(t){return t*this.m_angularImpulse},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,n=this.m_bodyB.c_position.c,r=this.m_bodyB.c_position.a,c=this.m_bodyB.c_velocity.v,_=this.m_bodyB.c_velocity.w,l=h.neo(o),u=h.neo(r);this.m_rA=h.mul(l,m.neg(this.m_localCenterA)),this.m_rB=h.mul(u,m.neg(this.m_localCenterB));var p=this.m_invMassA,y=this.m_invMassB,d=this.m_invIA,v=this.m_invIB,f=new a;if(f.ex.x=p+y+d*this.m_rA.y*this.m_rA.y+v*this.m_rB.y*this.m_rB.y,f.ex.y=-d*this.m_rA.x*this.m_rA.y-v*this.m_rB.x*this.m_rB.y,f.ey.x=f.ex.y,f.ey.y=p+y+d*this.m_rA.x*this.m_rA.x+v*this.m_rB.x*this.m_rB.x,this.m_linearMass=f.getInverse(),this.m_angularMass=d+v,this.m_angularMass>0&&(this.m_angularMass=1/this.m_angularMass),this.m_linearError=m.zero(),this.m_linearError.wAdd(1,n,1,this.m_rB),this.m_linearError.wSub(1,i,1,this.m_rA),this.m_linearError.sub(h.mul(l,this.m_linearOffset)),this.m_angularError=r-o-this.m_angularOffset,t.warmStarting){this.m_linearImpulse.mul(t.dtRatio),this.m_angularImpulse*=t.dtRatio;var A=m.neo(this.m_linearImpulse.x,this.m_linearImpulse.y);e.wSub(p,A),s-=d*(m.cross(this.m_rA,A)+this.m_angularImpulse),c.wAdd(y,A),_+=v*(m.cross(this.m_rB,A)+this.m_angularImpulse)}else this.m_linearImpulse.setZero(),this.m_angularImpulse=0;this.m_bodyA.c_velocity.v=e,this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v=c,this.m_bodyB.c_velocity.w=_},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=this.m_invMassA,h=this.m_invMassB,c=this.m_invIA,_=this.m_invIB,l=t.dt,u=t.inv_dt,p=s-o+u*this.m_correctionFactor*this.m_angularError,y=-this.m_angularMass*p,d=this.m_angularImpulse,v=l*this.m_maxTorque;this.m_angularImpulse=r.clamp(this.m_angularImpulse+y,-v,v),y=this.m_angularImpulse-d,o-=c*y,s+=_*y;var p=m.zero();p.wAdd(1,e,1,m.cross(s,this.m_rB)),p.wSub(1,i,1,m.cross(o,this.m_rA)),p.wAdd(u*this.m_correctionFactor,this.m_linearError);var y=m.neg(a.mul(this.m_linearMass,p)),d=m.clone(this.m_linearImpulse);this.m_linearImpulse.add(y);var v=l*this.m_maxForce;this.m_linearImpulse.clamp(v),y=m.sub(this.m_linearImpulse,d),i.wSub(n,y),o-=c*m.cross(this.m_rA,y),e.wAdd(h,y),s+=_*m.cross(this.m_rB,y),this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){return!0}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],31:[function(t,i,o){function e(t,i,o,n){return this instanceof e?(t=s(t,l),_.call(this,t,i,o),this.m_type=e.TYPE,this.m_targetA=m.clone(n),this.m_localAnchorB=c.mulT(this.m_bodyB.getTransform(),this.m_targetA),this.m_maxForce=t.maxForce,this.m_impulse=m.zero(),this.m_frequencyHz=t.frequencyHz,this.m_dampingRatio=t.dampingRatio,this.m_beta=0,this.m_gamma=0,this.m_rB=m.zero(),this.m_localCenterB=m.zero(),this.m_invMassB=0,this.m_invIB=0,this.mass=new a,void(this.m_C=m.zero())):new e(t,i,o,n)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=t("../common/Math"),m=t("../common/Vec2"),a=(t("../common/Vec3"),t("../common/Mat22")),h=(t("../common/Mat33"),t("../common/Rot")),c=(t("../common/Sweep"),t("../common/Transform")),_=(t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="mouse-joint",e._super=_,e.prototype=n(e._super.prototype);var l={maxForce:0,frequencyHz:5,dampingRatio:.7};e.prototype.setTarget=function(t){0==this.m_bodyB.isAwake()&&this.m_bodyB.setAwake(!0),this.m_targetA=m.clone(t)},e.prototype.getTarget=function(){return this.m_targetA},e.prototype.setMaxForce=function(t){this.m_maxForce=t},e.getMaxForce=function(){return this.m_maxForce},e.prototype.setFrequency=function(t){this.m_frequencyHz=t},e.prototype.getFrequency=function(){return this.m_frequencyHz},e.prototype.setDampingRatio=function(t){this.m_dampingRatio=t},e.prototype.getDampingRatio=function(){return this.m_dampingRatio},e.prototype.getAnchorA=function(){return m.clone(this.m_targetA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){return m.mul(t,this.m_impulse)},e.prototype.getReactionTorque=function(t){return 0*t},e.prototype.shiftOrigin=function(t){this.m_targetA.sub(t)},e.prototype.initVelocityConstraints=function(t){this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyB.c_position,o=this.m_bodyB.c_velocity,e=i.c,s=i.a,n=o.v,c=o.w,_=h.neo(s),l=this.m_bodyB.getMass(),u=2*r.PI*this.m_frequencyHz,p=2*l*this.m_dampingRatio*u,y=l*(u*u),d=t.dt;this.m_gamma=d*(p+d*y),0!=this.m_gamma&&(this.m_gamma=1/this.m_gamma),this.m_beta=d*y*this.m_gamma,this.m_rB=h.mul(_,m.sub(this.m_localAnchorB,this.m_localCenterB));var v=new a;v.ex.x=this.m_invMassB+this.m_invIB*this.m_rB.y*this.m_rB.y+this.m_gamma,v.ex.y=-this.m_invIB*this.m_rB.x*this.m_rB.y,v.ey.x=v.ex.y,v.ey.y=this.m_invMassB+this.m_invIB*this.m_rB.x*this.m_rB.x+this.m_gamma,this.m_mass=v.getInverse(),this.m_C.set(e),this.m_C.wAdd(1,this.m_rB,-1,this.m_targetA),this.m_C.mul(this.m_beta),c*=.98,t.warmStarting?(this.m_impulse.mul(t.dtRatio),n.wAdd(this.m_invMassB,this.m_impulse),c+=this.m_invIB*m.cross(this.m_rB,this.m_impulse)):this.m_impulse.setZero(),o.v.set(n),o.w=c},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyB.c_velocity,o=m.clone(i.v),e=i.w,s=m.cross(e,this.m_rB);s.add(o),s.wAdd(1,this.m_C,this.m_gamma,this.m_impulse),s.neg();var n=a.mul(this.m_mass,s),r=m.clone(this.m_impulse);this.m_impulse.add(n);var h=t.dt*this.m_maxForce;this.m_impulse.clamp(h),n=m.sub(this.m_impulse,r),o.wAdd(this.m_invMassB,n),e+=this.m_invIB*m.cross(this.m_rB,n),i.v.set(o),i.w=e},e.prototype.solvePositionConstraints=function(t){return!0}},{"../Joint":5,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],32:[function(t,i,o){function e(t,i,o,n,r){return this instanceof e?(t=s(t,f),u.call(this,t,i,o),this.m_type=e.TYPE,this.m_localAnchorA=t.localAnchorA||i.getLocalPoint(n),this.m_localAnchorB=t.localAnchorB||o.getLocalPoint(n),this.m_localXAxisA=t.localAxisA||i.getLocalVector(r),this.m_localXAxisA.normalize(),this.m_localYAxisA=a.cross(1,this.m_localXAxisA),this.m_referenceAngle=o.getAngle()-i.getAngle(),this.m_impulse=h(),this.m_motorMass=0,this.m_motorImpulse=0,this.m_lowerTranslation=t.lowerTranslation,this.m_upperTranslation=t.upperTranslation,this.m_maxMotorForce=t.maxMotorForce,this.m_motorSpeed=t.motorSpeed,this.m_enableLimit=t.enableLimit,this.m_enableMotor=t.enableMotor,this.m_limitState=p,this.m_axis=a.zero(),this.m_perp=a.zero(),this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,this.m_axis,this.m_perp,this.m_s1,this.m_s2,this.m_a1,this.m_a2,this.m_K=new _,void this.m_motorMass):new e(t,i,o,n,r)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=t("../common/Vec3"),c=t("../common/Mat22"),_=t("../common/Mat33"),l=t("../common/Rot"),u=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint")),p=0,y=1,d=2,v=3;e.TYPE="prismatic-joint",e._super=u,e.prototype=n(e._super.prototype);var f={enableLimit:!1,lowerTranslation:0,upperTranslation:0,enableMotor:!1,maxMotorForce:0,motorSpeed:0};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.getLocalAxisA=function(){return this.m_localXAxisA},e.prototype.getReferenceAngle=function(){return this.m_referenceAngle},e.prototype.getJointTranslation=function(){var t=this.m_bodyA.getWorldPoint(this.m_localAnchorA),i=this.m_bodyB.getWorldPoint(this.m_localAnchorB),o=a.sub(i,t),e=this.m_bodyA.getWorldVector(this.m_localXAxisA),s=a.dot(o,e);return s},e.prototype.getJointSpeed=function(){var t=this.m_bodyA,i=this.m_bodyB,o=Mul(t.m_xf.q,this.m_localAnchorA-t.m_sweep.localCenter),e=Mul(i.m_xf.q,this.m_localAnchorB-i.m_sweep.localCenter),s=t.m_sweep.c+o,n=i.m_sweep.c+e,r=n-s,m=Mul(t.m_xf.q,this.m_localXAxisA),a=t.m_linearVelocity,h=i.m_linearVelocity,c=t.m_angularVelocity,_=i.m_angularVelocity,l=Dot(r,Cross(c,m))+Dot(m,h+Cross(_,e)-a-Cross(c,o));return l},e.prototype.isLimitEnabled=function(){return this.m_enableLimit},e.prototype.enableLimit=function(t){t!=this.m_enableLimit&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableLimit=t,this.m_impulse.z=0)},e.prototype.getLowerLimit=function(){return this.m_lowerTranslation},e.prototype.getUpperLimit=function(){return this.m_upperTranslation},e.prototype.setLimits=function(t,i){t==this.m_lowerTranslation&&i==this.m_upperTranslation||(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_lowerTranslation=t,this.m_upperTranslation=i,this.m_impulse.z=0)},e.prototype.isMotorEnabled=function(){return this.m_enableMotor},e.prototype.enableMotor=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableMotor=t},e.prototype.setMotorSpeed=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_motorSpeed=t},e.prototype.setMaxMotorForce=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_maxMotorForce=t},e.prototype.getMotorSpeed=function(){return this.m_motorSpeed},e.prototype.getMotorForce=function(t){return t*this.m_motorImpulse},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){return t*(this.m_impulse.x*this.m_perp+(this.m_motorImpulse+this.m_impulse.z)*this.m_axis)},e.prototype.getReactionTorque=function(t){return t*this.m_impulse.y},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,n=this.m_bodyB.c_position.c,h=this.m_bodyB.c_position.a,c=this.m_bodyB.c_velocity.v,_=this.m_bodyB.c_velocity.w,u=l.neo(o),f=l.neo(h),A=l.mul(u,a.sub(this.m_localAnchorA,this.m_localCenterA)),x=l.mul(f,a.sub(this.m_localAnchorB,this.m_localCenterB)),g=a.zero();g.wAdd(1,n,1,x),g.wSub(1,i,1,A);var b=this.m_invMassA,B=this.m_invMassB,w=this.m_invIA,S=this.m_invIB;this.m_axis=l.mul(u,this.m_localXAxisA),this.m_a1=a.cross(a.add(g,A),this.m_axis),this.m_a2=a.cross(x,this.m_axis),this.m_motorMass=b+B+w*this.m_a1*this.m_a1+S*this.m_a2*this.m_a2,this.m_motorMass>0&&(this.m_motorMass=1/this.m_motorMass),this.m_perp=l.mul(u,this.m_localYAxisA),this.m_s1=a.cross(a.add(g,A),this.m_perp),this.m_s2=a.cross(x,this.m_perp);var C=(a.cross(A,this.m_perp),b+B+w*this.m_s1*this.m_s1+S*this.m_s2*this.m_s2),M=w*this.m_s1+S*this.m_s2,I=w*this.m_s1*this.m_a1+S*this.m_s2*this.m_a2,T=w+S;0==T&&(T=1);var P=w*this.m_a1+S*this.m_a2,V=b+B+w*this.m_a1*this.m_a1+S*this.m_a2*this.m_a2;if(this.m_K.ex.set(C,M,I),this.m_K.ey.set(M,T,P),this.m_K.ez.set(I,P,V),this.m_enableLimit){var z=a.dot(this.m_axis,g);m.abs(this.m_upperTranslation-this.m_lowerTranslation)<2*r.linearSlop?this.m_limitState=v:z<=this.m_lowerTranslation?this.m_limitState!=y&&(this.m_limitState=y,this.m_impulse.z=0):z>=this.m_upperTranslation?this.m_limitState!=d&&(this.m_limitState=d,this.m_impulse.z=0):(this.m_limitState=p,this.m_impulse.z=0)}else this.m_limitState=p,this.m_impulse.z=0;if(0==this.m_enableMotor&&(this.m_motorImpulse=0),t.warmStarting){this.m_impulse.mul(t.dtRatio),this.m_motorImpulse*=t.dtRatio;var L=a.wAdd(this.m_impulse.x,this.m_perp,this.m_motorImpulse+this.m_impulse.z,this.m_axis),R=this.m_impulse.x*this.m_s1+this.m_impulse.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_a1,F=this.m_impulse.x*this.m_s2+this.m_impulse.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_a2;e.wSub(b,L),s-=w*R,c.wAdd(B,L),_+=S*F}else this.m_impulse.setZero(),this.m_motorImpulse=0;this.m_bodyA.c_velocity.v.set(e),this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v.set(c),this.m_bodyB.c_velocity.w=_},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=this.m_invMassA,r=this.m_invMassB,c=this.m_invIA,_=this.m_invIB;if(this.m_enableMotor&&this.m_limitState!=v){var l=a.dot(this.m_axis,a.sub(e,i))+this.m_a2*s-this.m_a1*o,u=this.m_motorMass*(this.m_motorSpeed-l),f=this.m_motorImpulse,A=t.dt*this.m_maxMotorForce;this.m_motorImpulse=m.clamp(this.m_motorImpulse+u,-A,A),u=this.m_motorImpulse-f;var x=a.zero().wSet(u,this.m_axis),g=u*this.m_a1,b=u*this.m_a2;i.wSub(n,x),o-=c*g,e.wAdd(r,x),s+=_*b}var B=a.zero();if(B.x+=a.dot(this.m_perp,e)+this.m_s2*s,B.x-=a.dot(this.m_perp,i)+this.m_s1*o,B.y=s-o,this.m_enableLimit&&this.m_limitState!=p){var w=0;w+=a.dot(this.m_axis,e)+this.m_a2*s,w-=a.dot(this.m_axis,i)+this.m_a1*o;var l=h(B.x,B.y,w),S=h(this.m_impulse),C=this.m_K.solve33(h.neg(l));this.m_impulse.add(C),this.m_limitState==y?this.m_impulse.z=m.max(this.m_impulse.z,0):this.m_limitState==d&&(this.m_impulse.z=m.min(this.m_impulse.z,0));var M=a.wAdd(-1,B,-(this.m_impulse.z-S.z),a.neo(this.m_K.ez.x,this.m_K.ez.y)),I=a.add(this.m_K.solve22(M),a.neo(S.x,S.y));this.m_impulse.x=I.x,this.m_impulse.y=I.y,C=h.sub(this.m_impulse,S);var x=a.wAdd(C.x,this.m_perp,C.z,this.m_axis),g=C.x*this.m_s1+C.y+C.z*this.m_a1,b=C.x*this.m_s2+C.y+C.z*this.m_a2;i.wSub(n,x),o-=c*g,e.wAdd(r,x),s+=_*b}else{var C=this.m_K.solve22(a.neg(B));this.m_impulse.x+=C.x,this.m_impulse.y+=C.y;var x=a.zero().wAdd(C.x,this.m_perp),g=C.x*this.m_s1+C.y,b=C.x*this.m_s2+C.y;i.wSub(n,x),o-=c*g,e.wAdd(r,x),s+=_*b}this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyB.c_position.c,s=this.m_bodyB.c_position.a,n=l.neo(o),u=l.neo(s),p=this.m_invMassA,y=this.m_invMassB,d=this.m_invIA,v=this.m_invIB,f=l.mul(n,a.sub(this.m_localAnchorA,this.m_localCenterA)),A=l.mul(u,a.sub(this.m_localAnchorB,this.m_localCenterB)),x=a.sub(a.add(e,A),a.add(i,f)),g=l.mul(n,this.m_localXAxisA),b=a.cross(a.add(x,f),g),B=a.cross(A,g),w=l.mul(n,this.m_localYAxisA),S=a.cross(a.add(x,f),w),C=a.cross(A,w),M=h(),I=a.zero();I.x=a.dot(w,x),I.y=s-o-this.m_referenceAngle;var T=m.abs(I.x),P=m.abs(I.y),V=r.linearSlop,z=r.maxLinearCorrection,L=!1,R=0;if(this.m_enableLimit){var F=a.dot(g,x);m.abs(this.m_upperTranslation-this.m_lowerTranslation)<2*V?(R=m.clamp(F,-z,z),T=m.max(T,m.abs(F)),L=!0):F<=this.m_lowerTranslation?(R=m.clamp(F-this.m_lowerTranslation+V,-z,0),T=m.max(T,this.m_lowerTranslation-F),L=!0):F>=this.m_upperTranslation&&(R=m.clamp(F-this.m_upperTranslation-V,0,z),T=m.max(T,F-this.m_upperTranslation),L=!0)}if(L){var D=p+y+d*S*S+v*C*C,q=d*S+v*C,E=d*S*b+v*C*B,k=d+v;0==k&&(k=1);var j=d*b+v*B,J=p+y+d*b*b+v*B*B,O=new _;O.ex.set(D,q,E),O.ey.set(q,k,j),O.ez.set(E,j,J);var N=h();N.x=I.x,N.y=I.y,N.z=R,M=O.solve33(h.neg(N))}else{var D=p+y+d*S*S+v*C*C,q=d*S+v*C,k=d+v;0==k&&(k=1);var O=new c;O.ex.set(D,q),O.ey.set(q,k);var G=O.solve(a.neg(I));M.x=G.x,M.y=G.y,M.z=0}var U=a.wAdd(M.x,w,M.z,g),W=M.x*S+M.y+M.z*b,Y=M.x*C+M.y+M.z*B;return i.wSub(p,U),o-=d*W,e.wAdd(y,U),s+=v*Y,this.m_bodyA.c_position.c=i,this.m_bodyA.c_position.a=o,this.m_bodyB.c_position.c=e,this.m_bodyB.c_position.a=s,T<=r.linearSlop&&P<=r.angularSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],33:[function(t,i,o){function e(t,i,o,n,r,m,h,c){return this instanceof e?(t=s(t,l),_.call(this,t,i,o),this.m_type=e.TYPE,this.m_groundAnchorA=n,this.m_groundAnchorB=r,this.m_localAnchorA=i.getLocalPoint(m),this.m_localAnchorB=o.getLocalPoint(h),this.m_lengthA=a.distance(m,n),this.m_lengthB=a.distance(h,r),this.m_ratio=t.ratio||c,this.m_constant=this.m_lengthA+this.m_ratio*this.m_lengthB,this.m_impulse=0,this.m_uA,this.m_uB,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,void this.m_mass):new e(t,i,o,n,r,m,h,c)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=t("../common/Vec3"),c=(t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),_=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="pulley-joint",e.MIN_PULLEY_LENGTH=2,e._super=_,e.prototype=n(e._super.prototype);var l={collideConnected:!0};e.prototype.getGroundAnchorA=function(){return this.m_groundAnchorA},e.prototype.getGroundAnchorB=function(){return this.m_groundAnchorB},e.prototype.getLengthA=function(){return this.m_lengthA},e.prototype.getLengthB=function(){return this.m_lengthB},e.prototype.setRatio=function(){return this.m_ratio},e.prototype.getCurrentLengthA=function(){var t=this.m_bodyA.getWorldPoint(this.m_localAnchorA),i=this.m_groundAnchorA;return a.distance(t,i)},e.prototype.getCurrentLengthB=function(){var t=this.m_bodyB.getWorldPoint(this.m_localAnchorB),i=this.m_groundAnchorB;return a.distance(t,i)},e.prototype.shiftOrigin=function(t){this.m_groundAnchorA-=t,this.m_groundAnchorB-=t},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){return h.mul(t*this.m_impulse,this.m_uB)},e.prototype.getReactionTorque=function(t){return 0},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,n=this.m_bodyB.c_position.c,m=this.m_bodyB.c_position.a,h=this.m_bodyB.c_velocity.v,_=this.m_bodyB.c_velocity.w,l=c.neo(o),u=c.neo(m);this.m_rA=c.mul(l,a.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=c.mul(u,a.sub(this.m_localAnchorB,this.m_localCenterB)),this.m_uA=a.sub(a.add(i,this.m_rA),this.m_groundAnchorA),this.m_uB=a.sub(a.add(n,this.m_rB),this.m_groundAnchorB);var p=this.m_uA.length(),y=this.m_uB.length();p>10*r.linearSlop?this.m_uA.mul(1/p):this.m_uA.setZero(),y>10*r.linearSlop?this.m_uB.mul(1/y):this.m_uB.setZero();var d=a.cross(this.m_rA,this.m_uA),v=a.cross(this.m_rB,this.m_uB),f=this.m_invMassA+this.m_invIA*d*d,A=this.m_invMassB+this.m_invIB*v*v;if(this.m_mass=f+this.m_ratio*this.m_ratio*A,this.m_mass>0&&(this.m_mass=1/this.m_mass),t.warmStarting){this.m_impulse*=t.dtRatio;var x=a.mul(-this.m_impulse,this.m_uA),g=a.mul(-this.m_ratio*this.m_impulse,this.m_uB);e.wAdd(this.m_invMassA,x),s+=this.m_invIA*a.cross(this.m_rA,x),h.wAdd(this.m_invMassB,g),_+=this.m_invIB*a.cross(this.m_rB,g)}else this.m_impulse=0;this.m_bodyA.c_velocity.v=e,this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v=h,this.m_bodyB.c_velocity.w=_},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=a.add(i,a.cross(o,this.m_rA)),r=a.add(e,a.cross(s,this.m_rB)),m=-a.dot(this.m_uA,n)-this.m_ratio*a.dot(this.m_uB,r),h=-this.m_mass*m;this.m_impulse+=h;var c=a.zero().wSet(-h,this.m_uA),_=a.zero().wSet(-this.m_ratio*h,this.m_uB);i.wAdd(this.m_invMassA,c),o+=this.m_invIA*a.cross(this.m_rA,c),e.wAdd(this.m_invMassB,_),s+=this.m_invIB*a.cross(this.m_rB,_),this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyB.c_position.c,s=this.m_bodyB.c_position.a,n=c.neo(o),h=c.neo(s),_=c.mul(n,a.sub(this.m_localAnchorA,this.m_localCenterA)),l=c.mul(h,a.sub(this.m_localAnchorB,this.m_localCenterB)),u=a.sub(a.add(i,this.m_rA),this.m_groundAnchorA),p=a.sub(a.add(e,this.m_rB),this.m_groundAnchorB),y=u.length(),d=p.length();y>10*r.linearSlop?u.mul(1/y):u.setZero(),d>10*r.linearSlop?p.mul(1/d):p.setZero();var v=a.cross(_,u),f=a.cross(l,p),A=this.m_invMassA+this.m_invIA*v*v,x=this.m_invMassB+this.m_invIB*f*f,g=A+this.m_ratio*this.m_ratio*x;g>0&&(g=1/g);var b=this.m_constant-y-this.m_ratio*d,B=m.abs(b),w=-g*b,S=a.zero().wSet(-w,u),C=a.zero().wSet(-this.m_ratio*w,p);return i.wAdd(this.m_invMassA,S),o+=this.m_invIA*a.cross(_,S),e.wAdd(this.m_invMassB,C),s+=this.m_invIB*a.cross(l,C),this.m_bodyA.c_position.c=i,this.m_bodyA.c_position.a=o,this.m_bodyB.c_position.c=e,this.m_bodyB.c_position.a=s,B<r.linearSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],34:[function(t,i,o){function e(t,i,o,n){return this instanceof e?(t=s(t,f),u.call(this,t,i,o),this.m_type=e.TYPE,this.m_localAnchorA=t.localAnchorA||i.getLocalPoint(n),this.m_localAnchorB=t.localAnchorB||o.getLocalPoint(n),this.m_referenceAngle=o.getAngle()-i.getAngle(),this.m_impulse=h(),this.m_motorImpulse=0,this.m_lowerAngle=t.lowerAngle,this.m_upperAngle=t.upperAngle,this.m_maxMotorTorque=t.maxMotorTorque,this.m_motorSpeed=t.motorSpeed,this.m_enableLimit=t.enableLimit,this.m_enableMotor=t.enableMotor,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,this.m_mass=new _,this.m_motorMass,void(this.m_limitState=p)):new e(t,i,o,n)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=t("../common/Vec3"),c=t("../common/Mat22"),_=t("../common/Mat33"),l=t("../common/Rot"),u=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint")),p=0,y=1,d=2,v=3;e.TYPE="revolute-joint",e._super=u,e.prototype=n(e._super.prototype);var f={lowerAngle:0,upperAngle:0,maxMotorTorque:0,motorSpeed:0,enableLimit:!1,enableMotor:!1};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.getReferenceAngle=function(){return this.m_referenceAngle},e.prototype.getJointAngle=function(){var t=this.m_bodyA,i=this.m_bodyB;return i.m_sweep.a-t.m_sweep.a-this.m_referenceAngle},e.prototype.getJointSpeed=function(){var t=this.m_bodyA,i=this.m_bodyB;return i.m_angularVelocity-t.m_angularVelocity},e.prototype.isMotorEnabled=function(){return this.m_enableMotor},e.prototype.enableMotor=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableMotor=t},e.prototype.getMotorTorque=function(t){return t*this.m_motorImpulse},e.prototype.setMotorSpeed=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_motorSpeed=t},e.prototype.getMotorSpeed=function(){return this.m_motorSpeed},e.prototype.setMaxMotorTorque=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_maxMotorTorque=t},e.prototype.isLimitEnabled=function(){return this.m_enableLimit},e.prototype.enableLimit=function(t){t!=this.m_enableLimit&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableLimit=t,this.m_impulse.z=0)},e.prototype.getLowerLimit=function(){return this.m_lowerAngle},e.prototype.getUpperLimit=function(){return this.m_upperAngle},e.prototype.setLimits=function(t,i){t==this.m_lowerAngle&&i==this.m_upperAngle||(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_impulse.z=0,this.m_lowerAngle=t,this.m_upperAngle=i)},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){var i=a.neo(this.m_impulse.x,this.m_impulse.y);return t*i},e.prototype.getReactionTorque=function(t){return t*this.m_impulse.z},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.a,o=this.m_bodyA.c_velocity.v,e=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_position.a,n=this.m_bodyB.c_velocity.v,h=this.m_bodyB.c_velocity.w,c=l.neo(i),_=l.neo(s);this.m_rA=l.mul(c,a.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=l.mul(_,a.sub(this.m_localAnchorB,this.m_localCenterB));var u=this.m_invMassA,f=this.m_invMassB,A=this.m_invIA,x=this.m_invIB,g=A+x==0;if(this.m_mass.ex.x=u+f+this.m_rA.y*this.m_rA.y*A+this.m_rB.y*this.m_rB.y*x,this.m_mass.ey.x=-this.m_rA.y*this.m_rA.x*A-this.m_rB.y*this.m_rB.x*x,this.m_mass.ez.x=-this.m_rA.y*A-this.m_rB.y*x,this.m_mass.ex.y=this.m_mass.ey.x,this.m_mass.ey.y=u+f+this.m_rA.x*this.m_rA.x*A+this.m_rB.x*this.m_rB.x*x,this.m_mass.ez.y=this.m_rA.x*A+this.m_rB.x*x,this.m_mass.ex.z=this.m_mass.ez.x,this.m_mass.ey.z=this.m_mass.ez.y,this.m_mass.ez.z=A+x,this.m_motorMass=A+x,this.m_motorMass>0&&(this.m_motorMass=1/this.m_motorMass),(0==this.m_enableMotor||g)&&(this.m_motorImpulse=0),this.m_enableLimit&&0==g){var b=s-i-this.m_referenceAngle;m.abs(this.m_upperAngle-this.m_lowerAngle)<2*r.angularSlop?this.m_limitState=v:b<=this.m_lowerAngle?(this.m_limitState!=y&&(this.m_impulse.z=0),this.m_limitState=y):b>=this.m_upperAngle?(this.m_limitState!=d&&(this.m_impulse.z=0),this.m_limitState=d):(this.m_limitState=p,this.m_impulse.z=0)}else this.m_limitState=p;if(t.warmStarting){this.m_impulse.mul(t.dtRatio),this.m_motorImpulse*=t.dtRatio;var B=a.neo(this.m_impulse.x,this.m_impulse.y);o.wSub(u,B),e-=A*(a.cross(this.m_rA,B)+this.m_motorImpulse+this.m_impulse.z),n.wAdd(f,B),h+=x*(a.cross(this.m_rB,B)+this.m_motorImpulse+this.m_impulse.z)}else this.m_impulse.setZero(),this.m_motorImpulse=0;this.m_bodyA.c_velocity.v=o,this.m_bodyA.c_velocity.w=e,this.m_bodyB.c_velocity.v=n,this.m_bodyB.c_velocity.w=h},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=this.m_invMassA,r=this.m_invMassB,c=this.m_invIA,_=this.m_invIB,l=c+_==0;if(this.m_enableMotor&&this.m_limitState!=v&&0==l){var u=s-o-this.m_motorSpeed,f=-this.m_motorMass*u,A=this.m_motorImpulse,x=t.dt*this.m_maxMotorTorque;this.m_motorImpulse=m.clamp(this.m_motorImpulse+f,-x,x),f=this.m_motorImpulse-A,o-=c*f,s+=_*f}if(this.m_enableLimit&&this.m_limitState!=p&&0==l){var g=a.zero();g.wAdd(1,e,1,a.cross(s,this.m_rB)),g.wSub(1,i,1,a.cross(o,this.m_rA));var b=s-o,u=h(g.x,g.y,b),f=h.neg(this.m_mass.solve33(u));if(this.m_limitState==v)this.m_impulse.add(f);else if(this.m_limitState==y){var B=this.m_impulse.z+f.z;if(B<0){var w=a.wAdd(-1,g,this.m_impulse.z,a.neo(this.m_mass.ez.x,this.m_mass.ez.y)),S=this.m_mass.solve22(w);f.x=S.x,f.y=S.y,f.z=-this.m_impulse.z,this.m_impulse.x+=S.x,this.m_impulse.y+=S.y,this.m_impulse.z=0}else this.m_impulse.add(f)}else if(this.m_limitState==d){var B=this.m_impulse.z+f.z;if(B>0){var w=a.wAdd(-1,g,this.m_impulse.z,a.neo(this.m_mass.ez.x,this.m_mass.ez.y)),S=this.m_mass.solve22(w);f.x=S.x,f.y=S.y,f.z=-this.m_impulse.z,this.m_impulse.x+=S.x,this.m_impulse.y+=S.y,this.m_impulse.z=0}else this.m_impulse.add(f)}var C=a.neo(f.x,f.y);i.wSub(n,C),o-=c*(a.cross(this.m_rA,C)+f.z),e.wAdd(r,C),s+=_*(a.cross(this.m_rB,C)+f.z)}else{var u=a.zero();u.wAdd(1,e,1,a.cross(s,this.m_rB)),u.wSub(1,i,1,a.cross(o,this.m_rA));var f=this.m_mass.solve22(a.neg(u));this.m_impulse.x+=f.x,this.m_impulse.y+=f.y,i.wSub(n,f),o-=c*a.cross(this.m_rA,f),e.wAdd(r,f),s+=_*a.cross(this.m_rB,f)}this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyB.c_position.c,s=this.m_bodyB.c_position.a,n=l.neo(o),h=l.neo(s),_=0,u=0,f=this.m_invIA+this.m_invIB==0;if(this.m_enableLimit&&this.m_limitState!=p&&0==f){var A=s-o-this.m_referenceAngle,x=0;if(this.m_limitState==v){var g=m.clamp(A-this.m_lowerAngle,-r.maxAngularCorrection,r.maxAngularCorrection);x=-this.m_motorMass*g,_=m.abs(g)}else if(this.m_limitState==y){var g=A-this.m_lowerAngle;_=-g,g=m.clamp(g+r.angularSlop,-r.maxAngularCorrection,0),x=-this.m_motorMass*g}else if(this.m_limitState==d){var g=A-this.m_upperAngle;_=g,g=m.clamp(g-r.angularSlop,0,r.maxAngularCorrection),x=-this.m_motorMass*g}o-=this.m_invIA*x,s+=this.m_invIB*x}n.set(o),h.set(s);var b=l.mul(n,a.sub(this.m_localAnchorA,this.m_localCenterA)),B=l.mul(h,a.sub(this.m_localAnchorB,this.m_localCenterB)),g=a.zero();g.wAdd(1,e,1,B),g.wSub(1,i,1,b),u=g.length();var w=this.m_invMassA,S=this.m_invMassB,C=this.m_invIA,M=this.m_invIB,I=new c;I.ex.x=w+S+C*b.y*b.y+M*B.y*B.y,I.ex.y=-C*b.x*b.y-M*B.x*B.y,I.ey.x=I.ex.y,I.ey.y=w+S+C*b.x*b.x+M*B.x*B.x;var T=a.neg(I.solve(g));return i.wSub(w,T),o-=C*a.cross(b,T),e.wAdd(S,T),s+=M*a.cross(B,T),this.m_bodyA.c_position.c.set(i),this.m_bodyA.c_position.a=o,this.m_bodyB.c_position.c.set(e),this.m_bodyB.c_position.a=s,u<=r.linearSlop&&_<=r.angularSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],35:[function(t,i,o){function e(t,i,o,n){return this instanceof e?(t=s(t,u),c.call(this,t,i,o),this.m_type=e.TYPE,this.m_localAnchorA=t.localAnchorA||i.getLocalPoint(n),this.m_localAnchorB=t.localAnchorB||o.getLocalPoint(n),this.m_maxLength=t.maxLength,this.m_mass=0,this.m_impulse=0,this.m_length=0,this.m_state=_,this.m_u,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,void this.m_mass):new e(t,i,o,n)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("../util/options"),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=(t("../common/Vec3"),t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),c=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint")),_=0,l=2;e.TYPE="rope-joint",e._super=c,e.prototype=n(e._super.prototype);var u={maxLength:0};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.setMaxLength=function(t){this.m_maxLength=t},e.prototype.getMaxLength=function(){return this.m_maxLength},e.prototype.getLimitState=function(){return this.m_state},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){var i=t*this.m_impulse*this.m_u;return i},e.prototype.getReactionTorque=function(t){return 0},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,n=this.m_bodyB.c_position.c,m=this.m_bodyB.c_position.a,c=this.m_bodyB.c_velocity.v,u=this.m_bodyB.c_velocity.w,p=h.neo(o),y=h.neo(m);this.m_rA=h.mulSub(p,this.m_localAnchorA,this.m_localCenterA),this.m_rB=h.mulSub(y,this.m_localAnchorB,this.m_localCenterB),this.m_u=a.zero(),this.m_u.wAdd(1,n,1,this.m_rB),this.m_u.wSub(1,i,1,this.m_rA),this.m_length=this.m_u.length();var d=this.m_length-this.m_maxLength;if(d>0?this.m_state=l:this.m_state=_,!(this.m_length>r.linearSlop))return this.m_u.setZero(),this.m_mass=0,void(this.m_impulse=0);this.m_u.mul(1/this.m_length);var v=a.cross(this.m_rA,this.m_u),f=a.cross(this.m_rB,this.m_u),A=this.m_invMassA+this.m_invIA*v*v+this.m_invMassB+this.m_invIB*f*f;if(this.m_mass=0!=A?1/A:0,t.warmStarting){this.m_impulse*=t.dtRatio;var x=a.mul(this.m_impulse,this.m_u);e.wSub(this.m_invMassA,x),s-=this.m_invIA*a.cross(this.m_rA,x),c.wAdd(this.m_invMassB,x),u+=this.m_invIB*a.cross(this.m_rB,x)}else this.m_impulse=0;this.m_bodyA.c_velocity.v.set(e),this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v.set(c),this.m_bodyB.c_velocity.w=u},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=a.addCross(i,o,this.m_rA),r=a.addCross(e,s,this.m_rB),h=this.m_length-this.m_maxLength,c=a.dot(this.m_u,a.sub(r,n));h<0&&(c+=t.inv_dt*h);var _=-this.m_mass*c,l=this.m_impulse;this.m_impulse=m.min(0,this.m_impulse+_),_=this.m_impulse-l;var u=a.mul(_,this.m_u);i.wSub(this.m_invMassA,u),o-=this.m_invIA*a.cross(this.m_rA,u),e.wAdd(this.m_invMassB,u),s+=this.m_invIB*a.cross(this.m_rB,u),this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyB.c_position.c,s=this.m_bodyB.c_position.a,n=h.neo(o),c=h.neo(s),_=h.mulSub(n,this.m_localAnchorA,this.m_localCenterA),l=h.mulSub(c,this.m_localAnchorB,this.m_localCenterB),u=a.zero();u.wAdd(1,e,1,l),u.wSub(1,i,1,_);var p=u.normalize(),y=p-this.m_maxLength;y=m.clamp(y,0,r.maxLinearCorrection);var d=-this.m_mass*y,v=a.mul(d,u);return i.wSub(this.m_invMassA,v),o-=this.m_invIA*a.cross(_,v),e.wAdd(this.m_invMassB,v),s+=this.m_invIB*a.cross(l,v),this.m_bodyA.c_position.c.set(i),this.m_bodyA.c_position.a=o,this.m_bodyB.c_position.c.set(e),this.m_bodyB.c_position.a=s,p-this.m_maxLength<r.linearSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":51,"../util/options":52}],36:[function(t,i,o){function e(t,i,o,n){return this instanceof e?(t=s(t,u),l.call(this,t,i,o),this.m_type=e.TYPE,this.m_localAnchorA=i.getLocalPoint(n),this.m_localAnchorB=o.getLocalPoint(n),this.m_referenceAngle=o.getAngle()-i.getAngle(),this.m_frequencyHz=t.frequencyHz,this.m_dampingRatio=t.dampingRatio,this.m_impulse=h(),this.m_bias=0,this.m_gamma=0,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,void(this.m_mass=new c)):new e(t,i,o,n)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("../util/options"),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=t("../common/Vec3"),c=(t("../common/Mat22"),t("../common/Mat33")),_=t("../common/Rot"),l=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="weld-joint",e._super=l,e.prototype=n(e._super.prototype);var u={frequencyHz:0,dampingRatio:0};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.getReferenceAngle=function(){return this.m_referenceAngle},e.prototype.setFrequency=function(t){this.m_frequencyHz=t},e.prototype.getFrequency=function(){return this.m_frequencyHz},e.prototype.setDampingRatio=function(t){this.m_dampingRatio=t},e.prototype.getDampingRatio=function(){return this.m_dampingRatio},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){var i=a.neo(this.m_impulse.x,this.m_impulse.y);return t*i},e.prototype.getReactionTorque=function(t){return t*this.m_impulse.z},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.a,o=this.m_bodyA.c_velocity.v,e=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_position.a,n=this.m_bodyB.c_velocity.v,r=this.m_bodyB.c_velocity.w,h=_.neo(i),l=_.neo(s);this.m_rA=_.mul(h,a.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=_.mul(l,a.sub(this.m_localAnchorB,this.m_localCenterB));var u=this.m_invMassA,p=this.m_invMassB,y=this.m_invIA,d=this.m_invIB,v=new c;if(v.ex.x=u+p+this.m_rA.y*this.m_rA.y*y+this.m_rB.y*this.m_rB.y*d,v.ey.x=-this.m_rA.y*this.m_rA.x*y-this.m_rB.y*this.m_rB.x*d,v.ez.x=-this.m_rA.y*y-this.m_rB.y*d,v.ex.y=v.ey.x,v.ey.y=u+p+this.m_rA.x*this.m_rA.x*y+this.m_rB.x*this.m_rB.x*d,v.ez.y=this.m_rA.x*y+this.m_rB.x*d,v.ex.z=v.ez.x,v.ey.z=v.ez.y,v.ez.z=y+d,this.m_frequencyHz>0){v.getInverse22(this.m_mass);var f=y+d,A=f>0?1/f:0,x=s-i-this.m_referenceAngle,g=2*m.PI*this.m_frequencyHz,b=2*A*this.m_dampingRatio*g,B=A*g*g,w=t.dt;this.m_gamma=w*(b+w*B),this.m_gamma=0!=this.m_gamma?1/this.m_gamma:0,this.m_bias=x*w*B*this.m_gamma,f+=this.m_gamma,this.m_mass.ez.z=0!=f?1/f:0}else 0==v.ez.z?(v.getInverse22(this.m_mass),this.m_gamma=0,this.m_bias=0):(v.getSymInverse33(this.m_mass),this.m_gamma=0,this.m_bias=0);if(t.warmStarting){this.m_impulse.mul(t.dtRatio);var S=a.neo(this.m_impulse.x,this.m_impulse.y);o.wSub(u,S),e-=y*(a.cross(this.m_rA,S)+this.m_impulse.z),n.wAdd(p,S),r+=d*(a.cross(this.m_rB,S)+this.m_impulse.z)}else this.m_impulse.setZero();this.m_bodyA.c_velocity.v=o,this.m_bodyA.c_velocity.w=e,this.m_bodyB.c_velocity.v=n,this.m_bodyB.c_velocity.w=r},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=this.m_invMassA,r=this.m_invMassB,m=this.m_invIA,_=this.m_invIB;if(this.m_frequencyHz>0){var l=s-o,u=-this.m_mass.ez.z*(l+this.m_bias+this.m_gamma*this.m_impulse.z);this.m_impulse.z+=u,o-=m*u,s+=_*u;var p=a.zero();p.wAdd(1,e,1,a.cross(s,this.m_rB)),p.wSub(1,i,1,a.cross(o,this.m_rA));var y=a.neg(c.mul(this.m_mass,p));this.m_impulse.x+=y.x,this.m_impulse.y+=y.y;var d=a.clone(y);i.wSub(n,d),o-=m*a.cross(this.m_rA,d),e.wAdd(r,d),s+=_*a.cross(this.m_rB,d)}else{var p=a.zero();p.wAdd(1,e,1,a.cross(s,this.m_rB)),p.wSub(1,i,1,a.cross(o,this.m_rA));var l=s-o,v=h(p.x,p.y,l),f=h.neg(c.mul(this.m_mass,v));this.m_impulse.add(f);var d=a.neo(f.x,f.y);i.wSub(n,d),o-=m*(a.cross(this.m_rA,d)+f.z),e.wAdd(r,d),s+=_*(a.cross(this.m_rB,d)+f.z)}this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){var i,o,e=this.m_bodyA.c_position.c,s=this.m_bodyA.c_position.a,n=this.m_bodyB.c_position.c,l=this.m_bodyB.c_position.a,u=_.neo(s),p=_.neo(l),y=this.m_invMassA,d=this.m_invMassB,v=this.m_invIA,f=this.m_invIB,A=_.mul(u,a.sub(this.m_localAnchorA,this.m_localCenterA)),x=_.mul(p,a.sub(this.m_localAnchorB,this.m_localCenterB)),g=new c;if(g.ex.x=y+d+A.y*A.y*v+x.y*x.y*f,g.ey.x=-A.y*A.x*v-x.y*x.x*f,g.ez.x=-A.y*v-x.y*f,g.ex.y=g.ey.x,g.ey.y=y+d+A.x*A.x*v+x.x*x.x*f,g.ez.y=A.x*v+x.x*f,g.ex.z=g.ez.x,g.ey.z=g.ez.y,g.ez.z=v+f,this.m_frequencyHz>0){var b=a.zero();b.wAdd(1,n,1,x),b.wSub(1,e,1,A),i=b.length(),o=0;var B=a.neg(g.solve22(b));e.wSub(y,B),s-=v*a.cross(A,B),n.wAdd(d,B),l+=f*a.cross(x,B)}else{var b=a.zero();b.wAdd(1,n,1,x),b.wSub(1,e,1,A);var w=l-s-this.m_referenceAngle;i=b.length(),o=m.abs(w);var S=h(b.x,b.y,w),C=h();if(g.ez.z>0)C=h.neg(g.solve33(S));else{var M=a.neg(g.solve22(b));C.set(M.x,M.y,0)}var B=a.neo(C.x,C.y);e.wSub(y,B),s-=v*(a.cross(A,B)+C.z),n.wAdd(d,B),l+=f*(a.cross(x,B)+C.z)}return this.m_bodyA.c_position.c=e,this.m_bodyA.c_position.a=s,this.m_bodyB.c_position.c=n,this.m_bodyB.c_position.a=l,i<=r.linearSlop&&o<=r.angularSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":51,"../util/options":52}],37:[function(t,i,o){function e(t,i,o,n,r){return this instanceof e?(t=s(t,_),c.call(this,t,i,o),this.m_type=e.TYPE,this.m_localAnchorA=i.getLocalPoint(n),this.m_localAnchorB=o.getLocalPoint(n),this.m_localXAxisA=i.getLocalVector(r||a.neo(1,0)),this.m_localYAxisA=a.cross(1,this.m_localXAxisA),this.m_mass=0,this.m_impulse=0,this.m_motorMass=0,this.m_motorImpulse=0,this.m_springMass=0,this.m_springImpulse=0,this.m_maxMotorTorque=t.maxMotorTorque,this.m_motorSpeed=t.motorSpeed,this.m_enableMotor=t.enableMotor,this.m_frequencyHz=t.frequencyHz,this.m_dampingRatio=t.dampingRatio,this.m_bias=0,this.m_gamma=0,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,this.m_ax=a.zero(),this.m_ay=a.zero(),this.m_sAx,this.m_sBx,this.m_sAy,void this.m_sBy):new e(t,i,o,n,r)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("../util/options"),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=(t("../common/Vec3"),t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),c=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="wheel-joint",e._super=c,e.prototype=n(e._super.prototype);var _={enableMotor:!1,maxMotorTorque:0,motorSpeed:0,frequencyHz:2,dampingRatio:.7};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.getLocalAxisA=function(){return this.m_localXAxisA},e.prototype.getJointTranslation=function(){var t=this.m_bodyA,i=this.m_bodyB,o=t.getWorldPoint(this.m_localAnchorA),e=i.getWorldPoint(this.m_localAnchorB),s=e-o,n=t.getWorldVector(this.m_localXAxisA),r=Dot(s,n);return r},e.prototype.getJointSpeed=function(){var t=this.m_bodyA.m_angularVelocity,i=this.m_bodyB.m_angularVelocity;return i-t},e.prototype.isMotorEnabled=function(){return this.m_enableMotor},e.prototype.enableMotor=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableMotor=t},e.prototype.setMotorSpeed=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_motorSpeed=t},e.prototype.getMotorSpeed=function(){return this.m_motorSpeed},e.prototype.setMaxMotorTorque=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_maxMotorTorque=t},e.prototype.getMaxMotorTorque=function(){return this.m_maxMotorTorque},e.prototype.getMotorTorque=function(t){return t*this.m_motorImpulse},e.prototype.setSpringFrequencyHz=function(t){this.m_frequencyHz=t},e.prototype.getSpringFrequencyHz=function(){return this.m_frequencyHz},e.prototype.setSpringDampingRatio=function(t){this.m_dampingRatio=t},e.prototype.getSpringDampingRatio=function(){return this.m_dampingRatio},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){return t*(this.m_impulse*this.m_ay+this.m_springImpulse*this.m_ax)},e.prototype.getReactionTorque=function(t){return t*this.m_motorImpulse},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_invMassA,o=this.m_invMassB,e=this.m_invIA,s=this.m_invIB,n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,c=this.m_bodyA.c_velocity.v,_=this.m_bodyA.c_velocity.w,l=this.m_bodyB.c_position.c,u=this.m_bodyB.c_position.a,p=this.m_bodyB.c_velocity.v,y=this.m_bodyB.c_velocity.w,d=h.neo(r),v=h.neo(u),f=h.mul(d,a.sub(this.m_localAnchorA,this.m_localCenterA)),A=h.mul(v,a.sub(this.m_localAnchorB,this.m_localCenterB)),x=a.zero();if(x.wAdd(1,l,1,A),x.wSub(1,n,1,f),this.m_ay=h.mul(d,this.m_localYAxisA),this.m_sAy=a.cross(a.add(x,f),this.m_ay),this.m_sBy=a.cross(A,this.m_ay),this.m_mass=i+o+e*this.m_sAy*this.m_sAy+s*this.m_sBy*this.m_sBy,this.m_mass>0&&(this.m_mass=1/this.m_mass),this.m_springMass=0,this.m_bias=0,this.m_gamma=0,this.m_frequencyHz>0){this.m_ax=h.mul(d,this.m_localXAxisA),this.m_sAx=a.cross(a.add(x,f),this.m_ax),this.m_sBx=a.cross(A,this.m_ax);var g=i+o+e*this.m_sAx*this.m_sAx+s*this.m_sBx*this.m_sBx;if(g>0){this.m_springMass=1/g;var b=a.dot(x,this.m_ax),B=2*m.PI*this.m_frequencyHz,x=2*this.m_springMass*this.m_dampingRatio*B,w=this.m_springMass*B*B,S=t.dt;this.m_gamma=S*(x+S*w),this.m_gamma>0&&(this.m_gamma=1/this.m_gamma),this.m_bias=b*S*w*this.m_gamma,this.m_springMass=g+this.m_gamma,this.m_springMass>0&&(this.m_springMass=1/this.m_springMass)}}else this.m_springImpulse=0;if(this.m_enableMotor?(this.m_motorMass=e+s,this.m_motorMass>0&&(this.m_motorMass=1/this.m_motorMass)):(this.m_motorMass=0,this.m_motorImpulse=0),t.warmStarting){this.m_impulse*=t.dtRatio,this.m_springImpulse*=t.dtRatio,this.m_motorImpulse*=t.dtRatio;var C=a.wAdd(this.m_impulse,this.m_ay,this.m_springImpulse,this.m_ax),M=this.m_impulse*this.m_sAy+this.m_springImpulse*this.m_sAx+this.m_motorImpulse,I=this.m_impulse*this.m_sBy+this.m_springImpulse*this.m_sBx+this.m_motorImpulse;c.wSub(this.m_invMassA,C),_-=this.m_invIA*M,p.wAdd(this.m_invMassB,C),y+=this.m_invIB*I}else this.m_impulse=0,this.m_springImpulse=0,this.m_motorImpulse=0;this.m_bodyA.c_velocity.v.set(c),this.m_bodyA.c_velocity.w=_,this.m_bodyB.c_velocity.v.set(p),this.m_bodyB.c_velocity.w=y},e.prototype.solveVelocityConstraints=function(t){var i=this.m_invMassA,o=this.m_invMassB,e=this.m_invIA,s=this.m_invIB,n=this.m_bodyA.c_velocity.v,r=this.m_bodyA.c_velocity.w,h=this.m_bodyB.c_velocity.v,c=this.m_bodyB.c_velocity.w,_=a.dot(this.m_ax,h)-a.dot(this.m_ax,n)+this.m_sBx*c-this.m_sAx*r,l=-this.m_springMass*(_+this.m_bias+this.m_gamma*this.m_springImpulse);this.m_springImpulse+=l;var u=a.zero().wSet(l,this.m_ax),p=l*this.m_sAx,y=l*this.m_sBx;n.wSub(i,u),r-=e*p,h.wAdd(o,u),c+=s*y;var _=c-r-this.m_motorSpeed,l=-this.m_motorMass*_,d=this.m_motorImpulse,v=t.dt*this.m_maxMotorTorque;this.m_motorImpulse=m.clamp(this.m_motorImpulse+l,-v,v),l=this.m_motorImpulse-d,r-=e*l,c+=s*l;var _=a.dot(this.m_ay,h)-a.dot(this.m_ay,n)+this.m_sBy*c-this.m_sAy*r,l=-this.m_mass*_;this.m_impulse+=l;var u=a.zero().wSet(l,this.m_ay),p=l*this.m_sAy,y=l*this.m_sBy;n.wSub(i,u),r-=e*p,h.wAdd(o,u),c+=s*y,this.m_bodyA.c_velocity.v.set(n),this.m_bodyA.c_velocity.w=r,this.m_bodyB.c_velocity.v.set(h),this.m_bodyB.c_velocity.w=c},e.prototype.solvePositionConstraints=function(t){var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyB.c_position.c,s=this.m_bodyB.c_position.a,n=h.neo(o),c=h.neo(s),_=h.mul(n,a.sub(this.m_localAnchorA,this.m_localCenterA)),l=h.mul(c,a.sub(this.m_localAnchorB,this.m_localCenterB)),u=a.zero();u.wAdd(1,e,1,l),u.wSub(1,i,1,_);var p,y=h.mul(n,this.m_localYAxisA),d=a.cross(a.sub(u,_),y),v=a.cross(l,y),f=a.dot(u,y),A=this.m_invMassA+this.m_invMassB+this.m_invIA*this.m_sAy*this.m_sAy+this.m_invIB*this.m_sBy*this.m_sBy;p=0!=A?-f/A:0;var x=a.zero().wSet(p,y),g=p*d,b=p*v;return i.wSub(this.m_invMassA,x),o-=this.m_invIA*g,e.wAdd(this.m_invMassB,x),s+=this.m_invIB*b,this.m_bodyA.c_position.c.set(i),this.m_bodyA.c_position.a=o,this.m_bodyB.c_position.c.set(e),this.m_bodyB.c_position.a=s,m.abs(f)<=r.linearSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":51,"../util/options":52}],38:[function(t,i,o){function e(t,i,o,s){if(!(this instanceof e))return new e(t,i,o,s);if(e._super.call(this),this.m_vertices[0]=m.neo(-t,-i),this.m_vertices[1]=m.neo(t,-i),this.m_vertices[2]=m.neo(t,i),this.m_vertices[3]=m.neo(-t,i),this.m_normals[0]=m.neo(0,-1),this.m_normals[1]=m.neo(1,0),this.m_normals[2]=m.neo(0,1),this.m_normals[3]=m.neo(-1,0),this.m_count=4,o&&"x"in o&&"y"in o){s=s||0,this.m_centroid.set(o);var a=n.identity();a.p.set(o),a.q.set(s);for(var h=0;h<this.m_count;++h)this.m_vertices[h]=n.mul(a,this.m_vertices[h]),this.m_normals[h]=r.mul(a.q,this.m_normals[h])}}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/create")),n=(t("../util/options"),t("../common/Math"),t("../common/Transform")),r=t("../common/Rot"),m=t("../common/Vec2"),a=(t("../collision/AABB"),t("../Settings"),t("./PolygonShape"));e._super=a,e.prototype=s(e._super.prototype),e.TYPE="polygon"},{"../Settings":7,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"../util/options":52,"./PolygonShape":47}],39:[function(t,i,o){function e(t,i){return this instanceof e?(e._super.call(this),this.m_type=e.TYPE,this.m_radius=m.polygonRadius,this.m_vertices=[],this.m_count=0,this.m_prevVertex=null,this.m_nextVertex=null,this.m_hasPrevVertex=!1,this.m_hasNextVertex=!1,void(t&&t.length&&(i?this._createLoop(t):this._createChain(t)))):new e(t,i)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/create")),n=(t("../util/options"),t("../common/Math"),t("../common/Transform")),r=(t("../common/Rot"),t("../common/Vec2")),m=(t("../collision/AABB"),t("../Settings")),a=t("../Shape"),h=t("./EdgeShape");e._super=a,e.prototype=s(e._super.prototype),e.TYPE="chain",e.prototype._createLoop=function(t){for(var i=1;i<t.length;++i){t[i-1],t[i]}this.m_vertices.length=0,this.m_count=t.length+1;for(var i=0;i<t.length;++i)this.m_vertices[i]=t[i].clone();return this.m_vertices[t.length]=t[0].clone(),this.m_prevVertex=this.m_vertices[this.m_count-2],this.m_nextVertex=this.m_vertices[1],this.m_hasPrevVertex=!0,this.m_hasNextVertex=!0,this},e.prototype._createChain=function(t){for(var i=1;i<t.length;++i){t[i-1],t[i]}this.m_count=t.length;for(var i=0;i<t.length;++i)this.m_vertices[i]=t[i].clone();return this.m_hasPrevVertex=!1,this.m_hasNextVertex=!1,this.m_prevVertex=null,this.m_nextVertex=null,this},e.prototype._setPrevVertex=function(t){this.m_prevVertex=t,this.m_hasPrevVertex=!0},e.prototype._setNextVertex=function(t){this.m_nextVertex=t,this.m_hasNextVertex=!0},e.prototype._clone=function(){var t=new e;return t.createChain(this.m_vertices),t.m_type=this.m_type,t.m_radius=this.m_radius,t.m_prevVertex=this.m_prevVertex,t.m_nextVertex=this.m_nextVertex,t.m_hasPrevVertex=this.m_hasPrevVertex,t.m_hasNextVertex=this.m_hasNextVertex,t},e.prototype.getChildCount=function(){return this.m_count-1},e.prototype.getChildEdge=function(t,i){t.m_type=h.TYPE,t.m_radius=this.m_radius,t.m_vertex1=this.m_vertices[i],t.m_vertex2=this.m_vertices[i+1],i>0?(t.m_vertex0=this.m_vertices[i-1],t.m_hasVertex0=!0):(t.m_vertex0=this.m_prevVertex,t.m_hasVertex0=this.m_hasPrevVertex),i<this.m_count-2?(t.m_vertex3=this.m_vertices[i+2],t.m_hasVertex3=!0):(t.m_vertex3=this.m_nextVertex,t.m_hasVertex3=this.m_hasNextVertex)},e.prototype.getVertex=function(t){return t<this.m_count?this.m_vertices[t]:this.m_vertices[0]},e.prototype.testPoint=function(t,i){return!1},e.prototype.rayCast=function(t,i,o,e){var s=new h(this.getVertex(e),this.getVertex(e+1));return s.rayCast(t,i,o,0)},e.prototype.computeAABB=function(t,i,o){var e=n.mul(i,this.getVertex(o)),s=n.mul(i,this.getVertex(o+1));t.combinePoints(e,s)},e.prototype.computeMass=function(t,i){t.mass=0,t.center=r.neo(),t.I=0},e.prototype.computeDistanceProxy=function(t,i){t.m_buffer[0]=this.getVertex(i),t.m_buffer[1]=this.getVertex(i+1),t.m_vertices=t.m_buffer,t.m_count=2,t.m_radius=this.m_radius}},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"../util/options":52,"./EdgeShape":46}],40:[function(t,i,o){function e(t,i){return this instanceof e?(e._super.call(this),this.m_type=e.TYPE,this.m_p=m.zero(),this.m_radius=1,void("object"==typeof t&&m.isValid(t)?(this.m_p.set(t),"number"==typeof i&&(this.m_radius=i)):"number"==typeof t&&(this.m_radius=t))):new e(t,i)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/create")),n=(t("../util/options"),t("../common/Math")),r=(t("../common/Transform"),t("../common/Rot")),m=t("../common/Vec2"),a=(t("../collision/AABB"),t("../Settings"),t("../Shape"));e._super=a,e.prototype=s(e._super.prototype),e.TYPE="circle",e.prototype.getRadius=function(){return this.m_radius},e.prototype.getCenter=function(){return this.m_p},e.prototype.getSupportVertex=function(t){return this.m_p},e.prototype.getVertex=function(t){return this.m_p},e.prototype.getVertexCount=function(t){return 1},e.prototype._clone=function(){var t=new e;return t.m_type=this.m_type,t.m_radius=this.m_radius,t.m_p=this.m_p.clone(),t},e.prototype.getChildCount=function(){return 1},e.prototype.testPoint=function(t,i){var o=m.add(t.p,r.mul(t.q,this.m_p)),e=m.sub(i,o);return m.dot(e,e)<=this.m_radius*this.m_radius},e.prototype.rayCast=function(t,i,o,e){var s=m.add(o.p,r.mul(o.q,this.m_p)),a=m.sub(i.p1,s),h=m.dot(a,a)-this.m_radius*this.m_radius,c=m.sub(i.p2,i.p1),_=m.dot(a,c),l=m.dot(c,c),u=_*_-l*h;if(u<0||l<n.EPSILON)return!1;var p=-(_+n.sqrt(u));return 0<=p&&p<=i.maxFraction*l&&(p/=l,t.fraction=p,t.normal=m.add(a,m.mul(p,c)),t.normal.normalize(),!0)},e.prototype.computeAABB=function(t,i,o){var e=m.add(i.p,r.mul(i.q,this.m_p));t.lowerBound.set(e.x-this.m_radius,e.y-this.m_radius),t.upperBound.set(e.x+this.m_radius,e.y+this.m_radius)},e.prototype.computeMass=function(t,i){t.mass=i*n.PI*this.m_radius*this.m_radius,t.center=this.m_p,t.I=t.mass*(.5*this.m_radius*this.m_radius+m.dot(this.m_p,this.m_p))},e.prototype.computeDistanceProxy=function(t){t.m_vertices.push(this.m_p),t.m_count=1,t.m_radius=this.m_radius}},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"../util/options":52}],41:[function(t,i,o){function e(t,i,o,e,n,r,m){s(t,o.getShape(),i,r.getShape(),n)}function s(t,i,o,e,s){t.pointCount=0;var m=n.mul(o,i.m_p),h=n.mul(s,e.m_p),c=r.distanceSquared(h,m),_=i.m_radius,l=e.m_radius,u=_+l;c>u*u||(t.type=a.e_circles,t.localPoint.set(i.m_p),t.localNormal.setZero(),t.pointCount=1,t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0)}DEBUG=!1,ASSERT=!1;var n=(t("../util/common"),t("../util/create"),t("../common/Math"),t("../common/Transform")),r=t("../common/Vec2"),m=(t("../Settings"),t("../Shape"),t("../Contact")),a=t("../Manifold"),h=t("./CircleShape");m.addType(h.TYPE,h.TYPE,e),o.CollideCircles=s},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../common/Math":18,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"./CircleShape":40}],42:[function(t,i,o){function e(t,i,o,e,n,r,m){s(t,o.getShape(),i,r.getShape(),n)}function s(t,i,o,e,s){t.pointCount=0;for(var h=r.mul(s,e.m_p),c=r.mulT(o,h),_=0,l=-(1/0),u=i.m_radius+e.m_radius,p=i.m_count,y=i.m_vertices,d=i.m_normals,v=0;v<p;++v){var f=m.dot(d[v],m.sub(c,y[v]));if(f>u)return;f>l&&(l=f,_=v)}var A=_,x=A+1<p?A+1:0,g=y[A],b=y[x];if(l<n.EPSILON)return t.pointCount=1,t.type=a.e_faceA,t.localNormal.set(d[_]),t.localPoint.wSet(.5,g,.5,b),t.points[0].localPoint=e.m_p,void(t.points[0].id.key=0);var B=m.dot(m.sub(c,g),m.sub(b,g)),w=m.dot(m.sub(c,b),m.sub(g,b));if(B<=0){if(m.distanceSquared(c,g)>u*u)return;t.pointCount=1,t.type=a.e_faceA,t.localNormal.wSet(1,c,-1,g),t.localNormal.normalize(),t.localPoint=g,t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0}else if(w<=0){if(m.distanceSquared(c,b)>u*u)return;t.pointCount=1,t.type=a.e_faceA,t.localNormal.wSet(1,c,-1,b),t.localNormal.normalize(),t.localPoint.set(b),t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0}else{var S=m.mid(g,b),l=m.dot(c,d[A])-m.dot(S,d[A]);if(l>u)return;t.pointCount=1,t.type=a.e_faceA,t.localNormal.set(d[A]),t.localPoint.set(S),t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0}}DEBUG=!1,ASSERT=!1;var n=(t("../util/common"),t("../common/Math")),r=t("../common/Transform"),m=(t("../common/Rot"),t("../common/Vec2")),a=(t("../collision/AABB"),t("../Settings"),t("../Manifold")),h=t("../Contact"),c=(t("../Shape"),t("./CircleShape")),_=t("./PolygonShape");h.addType(_.TYPE,c.TYPE,e)},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"./CircleShape":40,"./PolygonShape":47}],43:[function(t,i,o){function e(t,i,o,e,s,r,m){var a=o.getShape(),h=r.getShape();n(t,a,i,h,s)}function s(t,i,o,e,s,r,m){var a=o.getShape(),h=new c;a.getChildEdge(h,e);var _=h,l=r.getShape();n(t,_,i,l,s)}function n(t,i,o,e,s){t.pointCount=0;var n=r.mulT(o,r.mul(s,e.m_p)),a=i.m_vertex1,c=i.m_vertex2,_=m.sub(c,a),l=m.dot(_,m.sub(c,n)),u=m.dot(_,m.sub(n,a)),p=i.m_radius+e.m_radius;if(u<=0){var y=m.clone(a),d=m.sub(n,y),v=m.dot(d,d);if(v>p*p)return;if(i.m_hasVertex0){var f=i.m_vertex0,A=a,x=m.sub(A,f),g=m.dot(x,m.sub(A,n));if(g>0)return}return t.type=h.e_circles,t.localNormal.setZero(),t.localPoint.set(y),t.pointCount=1,t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0,t.points[0].id.cf.indexA=0,t.points[0].id.cf.typeA=h.e_vertex,t.points[0].id.cf.indexB=0,void(t.points[0].id.cf.typeB=h.e_vertex)}if(l<=0){var y=m.clone(c),d=m.sub(n,y),v=m.dot(d,d);if(v>p*p)return;if(i.m_hasVertex3){var b=i.m_vertex3,B=c,w=m.sub(b,B),S=m.dot(w,m.sub(n,B));if(S>0)return}return t.type=h.e_circles,t.localNormal.setZero(),t.localPoint.set(y),t.pointCount=1,t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0,t.points[0].id.cf.indexA=1,t.points[0].id.cf.typeA=h.e_vertex,t.points[0].id.cf.indexB=0,void(t.points[0].id.cf.typeB=h.e_vertex)}var C=m.dot(_,_),y=m.wAdd(l/C,a,u/C,c),d=m.sub(n,y),v=m.dot(d,d);if(!(v>p*p)){var M=m.neo(-_.y,_.x);m.dot(M,m.sub(n,a))<0&&M.set(-M.x,-M.y),M.normalize(),t.type=h.e_faceA,t.localNormal=M,t.localPoint.set(a),t.pointCount=1,t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0,t.points[0].id.cf.indexA=0,t.points[0].id.cf.typeA=h.e_face,t.points[0].id.cf.indexB=0,t.points[0].id.cf.typeB=h.e_vertex}}DEBUG=!1,ASSERT=!1;var r=(t("../util/common"),t("../util/create"),t("../common/Math"),t("../common/Transform")),m=t("../common/Vec2"),a=(t("../common/Rot"),t("../Settings"),t("../Shape"),t("../Contact")),h=t("../Manifold"),c=t("./EdgeShape"),_=t("./ChainShape"),l=t("./CircleShape");a.addType(c.TYPE,l.TYPE,e),a.addType(_.TYPE,l.TYPE,s)},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"./ChainShape":39,"./CircleShape":40,"./EdgeShape":46}],44:[function(t,i,o){function e(t,i,o,e,s,n,r){a(t,o.getShape(),i,n.getShape(),s)}function s(t,i,o,e,s,n,r){var m=o.getShape(),h=new d;m.getChildEdge(h,e),a(t,h,i,n.getShape(),s)}function n(){this.type,this.index,this.separation}function r(){this.vertices=[],this.normals=[],this.count=0}function m(){this.i1,this.i2,this.v1,this.v2,this.normal=_.zero(),this.sideNormal1=_.zero(),this.sideOffset1,this.sideNormal2=_.zero(),this.sideOffset2}function a(t,i,o,e,s){var n=c.mulT(o,s),r=c.mul(n,e.m_centroid),m=i.m_vertex0,a=i.m_vertex1,p=i.m_vertex2,d=i.m_vertex3,v=i.m_hasVertex0,f=i.m_hasVertex3,C=_.sub(p,a);C.normalize();var M=_.neo(C.y,-C.x),I=_.dot(M,_.sub(r,a)),T=0,P=0,V=!1,z=!1;if(v){var L=_.sub(a,m);L.normalize();var R=_.neo(L.y,-L.x);V=_.cross(L,C)>=0,T=_.dot(R,r)-_.dot(R,m)}if(f){var F=_.sub(d,p);F.normalize();var D=_.neo(F.y,-F.x);z=_.cross(C,F)>0,P=_.dot(D,r)-_.dot(D,p)}var q,E=_.zero(),k=_.zero(),j=_.zero();v&&f?V&&z?(q=T>=0||I>=0||P>=0,q?(E.set(M),k.set(R),j.set(D)):(E.wSet(-1,M),k.wSet(-1,M),j.wSet(-1,M))):V?(q=T>=0||I>=0&&P>=0,q?(E.set(M),k.set(R),j.set(M)):(E.wSet(-1,M),k.wSet(-1,D),j.wSet(-1,M))):z?(q=P>=0||T>=0&&I>=0,q?(E.set(M),k.set(M),j.set(D)):(E.wSet(-1,M),k.wSet(-1,M),j.wSet(-1,R))):(q=T>=0&&I>=0&&P>=0,q?(E.set(M),k.set(M),j.set(M)):(E.wSet(-1,M),k.wSet(-1,D),j.wSet(-1,R))):v?V?(q=T>=0||I>=0,q?(E.set(M),k.set(R),j.wSet(-1,M)):(E.wSet(-1,M),k.set(M),j.wSet(-1,M))):(q=T>=0&&I>=0,q?(E.set(M),k.set(M),j.wSet(-1,M)):(E.wSet(-1,M),k.set(M),j.wSet(-1,R))):f?z?(q=I>=0||P>=0,q?(E.set(M),k.wSet(-1,M),j.set(D)):(E.wSet(-1,M),k.wSet(-1,M),j.set(M))):(q=I>=0&&P>=0,q?(E.set(M),k.wSet(-1,M),j.set(M)):(E.wSet(-1,M),k.wSet(-1,D),j.set(M))):(q=I>=0,q?(E.set(M),k.wSet(-1,M),j.wSet(-1,M)):(E.wSet(-1,M),k.set(M),j.set(M))),w.count=e.m_count;for(var J=0;J<e.m_count;++J)w.vertices[J]=c.mul(n,e.m_vertices[J]),w.normals[J]=l.mul(n.q,e.m_normals[J]);var O=2*u.polygonRadius;t.pointCount=0,b.type=x,b.index=q?0:1,b.separation=1/0;for(var J=0;J<w.count;++J){var N=_.dot(E,_.sub(w.vertices[J],a));N<b.separation&&(b.separation=N)}if(b.type!=A&&!(b.separation>O)){B.type=A,B.index=-1,B.separation=-(1/0);for(var G=_.neo(-E.y,E.x),J=0;J<w.count;++J){var U=_.neg(w.normals[J]),W=_.dot(U,_.sub(w.vertices[J],a)),Y=_.dot(U,_.sub(w.vertices[J],p)),N=h.min(W,Y);if(N>O){B.type=g,B.index=J,B.separation=N;break}if(_.dot(U,G)>=0){if(_.dot(_.sub(U,j),E)<-u.angularSlop)continue}else if(_.dot(_.sub(U,k),E)<-u.angularSlop)continue;N>B.separation&&(B.type=g,B.index=J,B.separation=N)}if(!(B.type!=A&&B.separation>O)){var H,Z=.98,K=.001;H=B.type==A?b:B.separation>Z*b.separation+K?B:b;var X=[new y.clipVertex,new y.clipVertex];if(H.type==x){t.type=y.e_faceA;for(var Q=0,$=_.dot(E,w.normals[0]),J=1;J<w.count;++J){var tt=_.dot(E,w.normals[J]);tt<$&&($=tt,Q=J)}var it=Q,ot=it+1<w.count?it+1:0;X[0].v=w.vertices[it],X[0].id.cf.indexA=0,X[0].id.cf.indexB=it,X[0].id.cf.typeA=y.e_face,X[0].id.cf.typeB=y.e_vertex,X[1].v=w.vertices[ot],X[1].id.cf.indexA=0,X[1].id.cf.indexB=ot,X[1].id.cf.typeA=y.e_face,X[1].id.cf.typeB=y.e_vertex,q?(S.i1=0,S.i2=1,S.v1=a,S.v2=p,S.normal.set(M)):(S.i1=1,S.i2=0,S.v1=p,S.v2=a,S.normal.wSet(-1,M))}else t.type=y.e_faceB,X[0].v=a,X[0].id.cf.indexA=0,X[0].id.cf.indexB=H.index,X[0].id.cf.typeA=y.e_vertex,X[0].id.cf.typeB=y.e_face,X[1].v=p,X[1].id.cf.indexA=0,X[1].id.cf.indexB=H.index,X[1].id.cf.typeA=y.e_vertex,X[1].id.cf.typeB=y.e_face,S.i1=H.index,S.i2=S.i1+1<w.count?S.i1+1:0,S.v1=w.vertices[S.i1],S.v2=w.vertices[S.i2],S.normal.set(w.normals[S.i1]);S.sideNormal1.set(S.normal.y,-S.normal.x),S.sideNormal2.wSet(-1,S.sideNormal1),S.sideOffset1=_.dot(S.sideNormal1,S.v1),S.sideOffset2=_.dot(S.sideNormal2,S.v2);var et,st=[new y.clipVertex,new y.clipVertex],nt=[new y.clipVertex,new y.clipVertex];if(et=y.clipSegmentToLine(st,X,S.sideNormal1,S.sideOffset1,S.i1),!(et<u.maxManifoldPoints||(et=y.clipSegmentToLine(nt,st,S.sideNormal2,S.sideOffset2,S.i2),et<u.maxManifoldPoints))){H.type==x?(t.localNormal=_.clone(S.normal),t.localPoint=_.clone(S.v1)):(t.localNormal=_.clone(e.m_normals[S.i1]),t.localPoint=_.clone(e.m_vertices[S.i1]));for(var rt=0,J=0;J<u.maxManifoldPoints;++J){var mt=_.dot(S.normal,_.sub(nt[J].v,S.v1));if(mt<=O){var at=t.points[rt];H.type==x?(at.localPoint=c.mulT(n,nt[J].v),at.id=nt[J].id):(at.localPoint=nt[J].v,at.id.cf.typeA=nt[J].id.cf.typeB,at.id.cf.typeB=nt[J].id.cf.typeA,at.id.cf.indexA=nt[J].id.cf.indexB,at.id.cf.indexB=nt[J].id.cf.indexA),++rt}}t.pointCount=rt}}}}DEBUG=!1,ASSERT=!1;var h=(t("../util/common"),t("../util/create"),t("../common/Math")),c=t("../common/Transform"),_=t("../common/Vec2"),l=t("../common/Rot"),u=t("../Settings"),p=(t("../Shape"),t("../Contact")),y=t("../Manifold"),d=t("./EdgeShape"),v=t("./ChainShape"),f=t("./PolygonShape");p.addType(d.TYPE,f.TYPE,e),p.addType(v.TYPE,f.TYPE,s);var A=-1,x=1,g=2,b=new n,B=new n,w=new r,S=new m},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"./ChainShape":39,"./EdgeShape":46,"./PolygonShape":47}],45:[function(t,i,o){function e(t,i,o,e,s,n,m){r(t,o.getShape(),i,n.getShape(),s)}function s(t,i,o,e){for(var n=t.m_count,r=o.m_count,c=t.m_normals,_=t.m_vertices,l=o.m_vertices,u=m.mulT(e,i),p=0,y=-(1/0),d=0;d<n;++d){for(var v=a.mul(u.q,c[d]),f=m.mul(u,_[d]),A=1/0,x=0;x<r;++x){var g=h.dot(v,l[x])-h.dot(v,f);g<A&&(A=g)}A>y&&(y=A,p=d)}s._maxSeparation=y,s._bestIndex=p}function n(t,i,o,e,s,n){for(var r=i.m_normals,c=s.m_count,l=s.m_vertices,u=s.m_normals,p=a.mulT(n.q,a.mul(o.q,r[e])),y=0,d=1/0,v=0;v<c;++v){var f=h.dot(p,u[v]);f<d&&(d=f,y=v)}var A=y,x=A+1<c?A+1:0;t[0].v=m.mul(n,l[A]),t[0].id.cf.indexA=e,t[0].id.cf.indexB=A,t[0].id.cf.typeA=_.e_face,t[0].id.cf.typeB=_.e_vertex,t[1].v=m.mul(n,l[x]),t[1].id.cf.indexA=e,t[1].id.cf.indexB=x,t[1].id.cf.typeA=_.e_face,t[1].id.cf.typeB=_.e_vertex}function r(t,i,o,e,r){t.pointCount=0;var l=i.m_radius+e.m_radius;s(i,o,e,r);var u=s._bestIndex,p=s._maxSeparation;if(!(p>l)){s(e,r,i,o);var y=s._bestIndex,d=s._maxSeparation;if(!(d>l)){var v,f,A,x,g,b,B=.1*c.linearSlop;d>p+B?(v=e,f=i,A=r,x=o,g=y,t.type=_.e_faceB,b=1):(v=i,f=e,A=o,x=r,g=u,t.type=_.e_faceA,b=0);var w=[new _.clipVertex,new _.clipVertex];n(w,v,A,g,f,x);var S=v.m_count,C=v.m_vertices,M=g,I=g+1<S?g+1:0,T=C[M],P=C[I],V=h.sub(P,T);V.normalize();var z=h.cross(V,1),L=h.wAdd(.5,T,.5,P),R=a.mul(A.q,V),F=h.cross(R,1);T=m.mul(A,T),P=m.mul(A,P);var D,q=h.dot(F,T),E=-h.dot(R,T)+l,k=h.dot(R,P)+l,j=[new _.clipVertex,new _.clipVertex],J=[new _.clipVertex,new _.clipVertex];if(D=_.clipSegmentToLine(j,w,h.neg(R),E,M),!(D<2||(D=_.clipSegmentToLine(J,j,R,k,I),D<2))){t.localNormal=z,t.localPoint=L;for(var O=0,N=0;N<J.length;++N){var G=h.dot(F,J[N].v)-q;if(G<=l){var U=t.points[O];if(U.localPoint.set(m.mulT(x,J[N].v)),U.id=J[N].id,b){var W=U.id.cf,Y=W.indexA,H=W.indexB,Z=W.typeA,K=W.typeB;W.indexA=H,W.indexB=Y,W.typeA=K,W.typeB=Z}++O}}t.pointCount=O}}}}DEBUG=!1,ASSERT=!1;var m=(t("../util/common"),t("../common/Math"),t("../common/Transform")),a=t("../common/Rot"),h=t("../common/Vec2"),c=(t("../collision/AABB"),t("../Settings")),_=t("../Manifold"),l=t("../Contact"),u=(t("../Shape"),t("./PolygonShape"));i.exports=r,l.addType(u.TYPE,u.TYPE,e)},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"./PolygonShape":47}],46:[function(t,i,o){function e(t,i){return this instanceof e?(e._super.call(this),this.m_type=e.TYPE,this.m_radius=n.polygonRadius,this.m_vertex1=t?h.clone(t):h.zero(),this.m_vertex2=i?h.clone(i):h.zero(),this.m_vertex0=h.zero(),this.m_vertex3=h.zero(),this.m_hasVertex0=!1,void(this.m_hasVertex3=!1)):new e(t,i)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("../util/create"),n=(t("../util/options"),t("../Settings")),r=t("../Shape"),m=(t("../common/Math"),t("../common/Transform")),a=t("../common/Rot"),h=t("../common/Vec2");t("../collision/AABB");e._super=r,e.prototype=s(e._super.prototype),e.TYPE="edge",e.prototype.setNext=function(t){return t?(this.m_vertex3.set(t),this.m_hasVertex3=!0):(this.m_vertex3.setZero(),this.m_hasVertex3=!1),this},e.prototype.setPrev=function(t){return t?(this.m_vertex0.set(t),this.m_hasVertex0=!0):(this.m_vertex0.setZero(),this.m_hasVertex0=!1),this},e.prototype._set=function(t,i){return this.m_vertex1.set(t),this.m_vertex2.set(i),this.m_hasVertex0=!1,this.m_hasVertex3=!1,this},e.prototype._clone=function(){var t=new e;return t.m_type=this.m_type,t.m_radius=this.m_radius,t.m_vertex1.set(this.m_vertex1),t.m_vertex2.set(this.m_vertex2),t.m_vertex0.set(this.m_vertex0),t.m_vertex3.set(this.m_vertex3),t.m_hasVertex0=this.m_hasVertex0,t.m_hasVertex3=this.m_hasVertex3,t},e.prototype.getChildCount=function(){return 1},e.prototype.testPoint=function(t,i){return!1},e.prototype.rayCast=function(t,i,o,e){var s=a.mulT(o.q,h.sub(i.p1,o.p)),n=a.mulT(o.q,h.sub(i.p2,o.p)),r=h.sub(n,s),m=this.m_vertex1,c=this.m_vertex2,_=h.sub(c,m),l=h.neo(_.y,-_.x);l.normalize();var u=h.dot(l,h.sub(m,s)),p=h.dot(l,r);if(0==p)return!1;var y=u/p;if(y<0||i.maxFraction<y)return!1;var d=h.add(s,h.mul(y,r)),v=h.sub(c,m),f=h.dot(v,v);if(0==f)return!1;var A=h.dot(h.sub(d,m),v)/f;return!(A<0||1<A)&&(t.fraction=y,u>0?t.normal=a.mul(o.q,l).neg():t.normal=a.mul(o.q,l),!0)},e.prototype.computeAABB=function(t,i,o){var e=m.mul(i,this.m_vertex1),s=m.mul(i,this.m_vertex2);t.combinePoints(e,s),t.extend(this.m_radius)},e.prototype.computeMass=function(t,i){t.mass=0,t.center.wSet(.5,this.m_vertex1,.5,this.m_vertex2),t.I=0},e.prototype.computeDistanceProxy=function(t){t.m_vertices.push(this.m_vertex1),t.m_vertices.push(this.m_vertex2),t.m_count=2,t.m_radius=this.m_radius}},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/create":51,"../util/options":52}],47:[function(t,i,o){function e(t){return this instanceof e?(e._super.call(this),this.m_type=e.TYPE,this.m_radius=c.polygonRadius,this.m_centroid=h.zero(),this.m_vertices=[],this.m_normals=[],this.m_count=0,void(t&&t.length&&this._set(t))):new e(t)}function s(t,i){for(var o,e=h.zero(),s=0,n=h.zero(),r=1/3,o=0;o<i;++o){var m=n,a=t[o],c=o+1<i?t[o+1]:t[0],_=h.sub(a,m),l=h.sub(c,m),u=h.cross(_,l),p=.5*u;s+=p,e.wAdd(p*r,m),e.wAdd(p*r,a),e.wAdd(p*r,c)}return e.mul(1/s),e}DEBUG=!1,ASSERT=!1,i.exports=e;var n=(t("../util/common"),t("../util/create")),r=(t("../util/options"),t("../common/Math")),m=t("../common/Transform"),a=t("../common/Rot"),h=t("../common/Vec2"),c=(t("../collision/AABB"),t("../Settings")),_=t("../Shape");e._super=_,e.prototype=n(e._super.prototype),e.TYPE="polygon",e.prototype.getVertex=function(t){return this.m_vertices[t]},e.prototype._clone=function(){var t=new e;t.m_type=this.m_type,t.m_radius=this.m_radius,t.m_count=this.m_count,t.m_centroid.set(this.m_centroid);for(var i=0;i<this.m_count;i++)t.m_vertices.push(this.m_vertices[i].clone());for(var i=0;i<this.m_normals.length;i++)t.m_normals.push(this.m_normals[i].clone());return t},e.prototype.getChildCount=function(){return 1},e.prototype._set=function(t){if(t.length<3)return void SetAsBox(1,1);for(var i=r.min(t.length,c.maxPolygonVertices),o=[],e=0,n=0;n<i;++n){for(var m=t[n],a=!0,_=0;_<e;++_)if(h.distanceSquared(m,o[_])<.25*c.linearSlopSquared){a=!1;break}a&&(o[e++]=m)}if(i=e,i<3)return void SetAsBox(1,1);for(var l=0,u=o[0].x,n=1;n<i;++n){var p=o[n].x;(p>u||p==u&&o[n].y<o[l].y)&&(l=n,u=p)}for(var y=[],d=0,v=l;;){y[d]=v;for(var f=0,_=1;_<i;++_)if(f!=v){var A=h.sub(o[f],o[y[d]]),m=h.sub(o[_],o[y[d]]),x=h.cross(A,m);x<0&&(f=_),0==x&&m.lengthSquared()>A.lengthSquared()&&(f=_)}else f=_;if(++d,v=f,f==l)break}if(d<3)return void SetAsBox(1,1);this.m_count=d;for(var n=0;n<d;++n)this.m_vertices[n]=o[y[n]];for(var n=0;n<d;++n){var g=n,b=n+1<d?n+1:0,B=h.sub(this.m_vertices[b],this.m_vertices[g]);this.m_normals[n]=h.cross(B,1),this.m_normals[n].normalize()}this.m_centroid=s(this.m_vertices,d)},e.prototype.testPoint=function(t,i){for(var o=a.mulT(t.q,h.sub(i,t.p)),e=0;e<this.m_count;++e){var s=h.dot(this.m_normals[e],h.sub(o,this.m_vertices[e]));if(s>0)return!1}return!0},e.prototype.rayCast=function(t,i,o,e){for(var s=a.mulT(o.q,h.sub(i.p1,o.p)),n=a.mulT(o.q,h.sub(i.p2,o.p)),r=h.sub(n,s),m=0,c=i.maxFraction,_=-1,l=0;l<this.m_count;++l){var u=h.dot(this.m_normals[l],h.sub(this.m_vertices[l],s)),p=h.dot(this.m_normals[l],r);if(0==p){if(u<0)return!1}else p<0&&u<m*p?(m=u/p,_=l):p>0&&u<c*p&&(c=u/p);if(c<m)return!1}return _>=0&&(t.fraction=m,t.normal=a.mul(o.q,this.m_normals[_]),!0)},e.prototype.computeAABB=function(t,i,o){for(var e=1/0,s=1/0,n=-(1/0),a=-(1/0),h=0;h<this.m_count;++h){var c=m.mul(i,this.m_vertices[h]);e=r.min(e,c.x),n=r.max(n,c.x),s=r.min(s,c.y),a=r.max(a,c.y)}t.lowerBound.set(e,s),t.upperBound.set(n,a),t.extend(this.m_radius)},e.prototype.computeMass=function(t,i){for(var o=h.zero(),e=0,s=0,n=h.zero(),r=0;r<this.m_count;++r)n.add(this.m_vertices[r]);n.mul(1/this.m_count);for(var m=1/3,r=0;r<this.m_count;++r){var a=h.sub(this.m_vertices[r],n),c=r+1<this.m_count?h.sub(this.m_vertices[r+1],n):h.sub(this.m_vertices[0],n),_=h.cross(a,c),l=.5*_;e+=l,o.wAdd(l*m,a,l*m,c);var u=a.x,p=a.y,y=c.x,d=c.y,v=u*u+y*u+y*y,f=p*p+d*p+d*d;s+=.25*m*_*(v+f)}t.mass=i*e,o.mul(1/e),t.center.wSet(1,o,1,n),t.I=i*s,t.I+=t.mass*(h.dot(t.center,t.center)-h.dot(o,o))},e.prototype.validate=function(){for(var t=0;t<this.m_count;++t)for(var i=t,o=t<this.m_count-1?i+1:0,e=this.m_vertices[i],s=h.sub(this.m_vertices[o],e),n=0;n<this.m_count;++n)if(n!=i&&n!=o){var r=h.sub(this.m_vertices[n],e),m=h.cross(s,r);if(m<0)return!1}return!0},e.prototype.computeDistanceProxy=function(t){t.m_vertices=this.m_vertices,t.m_count=this.m_count,t.m_radius=this.m_radius}},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"../util/options":52}],48:[function(t,i,o){function e(t){var i=[],o=t.max||1/0,e=t.create,s=t.allocate,n=t.release,r=t.discard,m=0,a=0,h=0,c=0;this.max=function(t){return"number"==typeof t?(o=t,this):o},this.size=function(){return i.length},this.allocate=function(){var t;return i.length>0?t=i.shift():(m++,t="function"==typeof e?e():{}),a++,"function"==typeof s&&s(t),t},this.release=function(t){i.length<o?(h++,"function"==typeof n&&n(t),i.push(t)):(c++,"function"==typeof r&&(t=r(t)))},this.toString=function(){return"+"+m+">"+a+"<"+h+"-"+c+"="+i.length+"/"+o}}DEBUG=!1,ASSERT=!1,i.exports=e},{}],49:[function(t,i,o){DEBUG=!1,ASSERT=!1,i.exports.now=function(){return Date.now()},i.exports.diff=function(t){return Date.now()-t}},{}],50:[function(t,i,o){DEBUG=!1,ASSERT=!1,o.debug=function(){},o.assert=function(t,i,o){}},{}],51:[function(t,i,o){function e(){}"function"==typeof Object.create?i.exports=function(t,i){return Object.create.call(Object,t,i)}:i.exports=function(t,i){if(i)throw Error("Second argument is not supported!");if("object"!=typeof t||null===t)throw Error("Invalid prototype!");return e.prototype=t,new e}},{}],52:[function(t,i,o){DEBUG=!1,ASSERT=!1;Object.prototype.propertyIsEnumerable;i.exports=function(t,i){null!==t&&"undefined"!=typeof t||(t={});for(var o in i)i.hasOwnProperty(o)&&"undefined"==typeof t[o]&&(t[o]=i[o]);if("function"==typeof Object.getOwnPropertySymbols)for(var e=Object.getOwnPropertySymbols(i),s=0;s<e.length;s++){var n=e[s];i.propertyIsEnumerable(n)&&"undefined"==typeof t[o]&&(t[n]=i[n])}return t}},{}]},{},[1])(1)});}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ObjectVisualData2D",function(){return ObjectVisualData2D;});var _common_rect__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(29);var _common_color__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(36);var _common_size__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4);var _common_vertex2d__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(17);var _common_scaledframe__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(44);var _sprite_spritesheet__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(33);var _managers_texturemanager__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(6);var _managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(15);var _managers_spritesheetmanager__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(32);var _utilities_assetholder__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(39);var _common_defs__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(5);var _utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(35);var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(18);class ObjectVisualData2D
{constructor()
{this.textureAry=[];this.vbo=null;this.ibo=null;this.genType=_common_defs__WEBPACK_IMPORTED_MODULE_10__["EGT_NULL"];this.shaderID=null;this.color=new _common_color__WEBPACK_IMPORTED_MODULE_1__["Color"];this.textureFilePath='';this.textureSequenceCount=0;this.meshFilePath=null;this.spriteSheetFilePath=null;this.iboCount=0;this.vertexScale=new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"];this.scaledFrame=null;this.spriteSheet=null;this.glyphIDs=null;this.defaultUniformScale=1;this.mirror=_common_defs__WEBPACK_IMPORTED_MODULE_10__["EM_NULL"];}
copy(obj)
{this.genType=obj.genType;this.shaderID=obj.shaderID;this.textureFilePath=obj.textureFilePath;this.textureSequenceCount=obj.textureSequenceCount;this.meshFilePath=obj.meshFilePath;this.spriteSheetFilePath=obj.spriteSheetFilePath;this.defaultUniformScale=obj.defaultUniformScale;this.mirror=obj.mirror;this.color.copy(obj.color);if(obj.glyphIDs)
{if(this.glyphIDs===null)
this.glyphIDs=[];for(let i=0;i<obj.glyphIDs.length;++i)
this.glyphIDs[i]=obj.glyphIDs[i];}
if(obj.scaledFrame)
{this.scaledFrame=new _common_scaledframe__WEBPACK_IMPORTED_MODULE_4__["ScaledFrame"];this.scaledFrame.copy(obj.scaledFrame);}
if(obj.spriteSheet)
{this.spriteSheet=new _sprite_spritesheet__WEBPACK_IMPORTED_MODULE_5__["SpriteSheet"];this.spriteSheet.copy(obj.spriteSheet);}
}
loadObjData(node)
{let visualNode=node.getElementsByTagName('visual');if(visualNode.length)
{let attr=visualNode[0].getAttribute('defaultUniformScale');if(attr!==null)
this.defaultUniformScale=Number(attr);let textureNode=visualNode[0].getElementsByTagName('texture');if(textureNode.length)
{let attr=textureNode[0].getAttribute('file');if(attr!==null)
this.textureFilePath=attr;attr=textureNode[0].getAttribute('count');if(attr!==null)
this.textureSequenceCount=Number(attr);}
let meshNode=visualNode[0].getElementsByTagName('mesh');if(meshNode.length)
{let genTypeStr=meshNode[0].getAttribute('genType');if(genTypeStr)
{if(genTypeStr==='quad')
this.genType=_common_defs__WEBPACK_IMPORTED_MODULE_10__["EGT_QUAD"];else if(genTypeStr==='sprite_sheet')
this.genType=_common_defs__WEBPACK_IMPORTED_MODULE_10__["EGT_SPRITE_SHEET"];else if(genTypeStr==='scaled_frame')
this.genType=_common_defs__WEBPACK_IMPORTED_MODULE_10__["EGT_SCALED_FRAME"];else if(genTypeStr==='mesh_file')
this.genType=_common_defs__WEBPACK_IMPORTED_MODULE_10__["EGT_MESH_FILE"];else if(genTypeStr==='font')
this.genType=_common_defs__WEBPACK_IMPORTED_MODULE_10__["EGT_FONT"];}
let mirrorStr=meshNode[0].getAttribute('mirror');if(mirrorStr)
{if(mirrorStr==='horizontal')
this.mirror=_common_defs__WEBPACK_IMPORTED_MODULE_10__["EM_HORIZONTAL"];else if(mirrorStr==='vertical')
this.mirror=_common_defs__WEBPACK_IMPORTED_MODULE_10__["EM_VERTICAL"];else if(mirrorStr==='horizontal_vertical')
this.mirror=_common_defs__WEBPACK_IMPORTED_MODULE_10__["EM_HORIZONTAL_VERTICAL"];}
let spriteSheetNode=meshNode[0].getElementsByTagName('spriteSheet');if(spriteSheetNode.length)
{let defaultIndex=0;let glyphCount=0;let columns=0;let attr=spriteSheetNode[0].getAttribute('defIndex');if(attr!==null)
defaultIndex=Number(attr);attr=spriteSheetNode[0].getAttribute('glyphCount');if(attr!==null)
{glyphCount=Number(attr);attr=spriteSheetNode[0].getAttribute('columns');if(attr!==null)
columns=Number(attr);}
attr=spriteSheetNode[0].getAttribute('file');if(attr!==null)
this.spriteSheetFilePath=attr;let glyphNode=spriteSheetNode[0].getElementsByTagName('glyph');if(glyphNode.length)
{this.glyphIDs=[];for(let i=0;i<glyphNode.length;++i)
this.glyphIDs.push(glyphNode[i].getAttribute('id'));}
if((this.spriteSheet===null)&&(this.glyphIDs|| defaultIndex|| glyphCount|| columns))
this.spriteSheet=new _sprite_spritesheet__WEBPACK_IMPORTED_MODULE_5__["SpriteSheet"](defaultIndex,glyphCount,columns);}
let scaledFrameNode=meshNode[0].getElementsByTagName('scaledFrame');if(scaledFrameNode.length)
{if(this.scaledFrame===null)
this.scaledFrame=new _common_scaledframe__WEBPACK_IMPORTED_MODULE_4__["ScaledFrame"];this.scaledFrame.frame.w=Number(scaledFrameNode[0].getAttribute('thicknessWidth'));this.scaledFrame.frame.h=Number(scaledFrameNode[0].getAttribute('thicknessHeight'));let centerQuadAttr=scaledFrameNode[0].getAttribute('centerQuad');if(centerQuadAttr)
this.scaledFrame.centerQuad=(centerQuadAttr==='true');let frameBottomAttr=scaledFrameNode[0].getAttribute('frameBottom');if(frameBottomAttr)
this.scaledFrame.bottomFrame=(frameBottomAttr==='true');}
let fileNode=meshNode[0].getElementsByTagName('file');if(fileNode.length)
this.meshFilePath=fileNode[0].getAttribute('name');}
let shaderNode=visualNode[0].getElementsByTagName('shader');if(shaderNode.length)
{this.shaderID=shaderNode[0].getAttribute('id');}
this.color=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_11__["loadColor"](visualNode[0],this.color);if((this.genType!=_common_defs__WEBPACK_IMPORTED_MODULE_10__["EGT_NULL"])&&(this.shaderID===null))
throw new Error('Shader effect or techique not set!');}
}
createFromData(group,size)
{if(this.textureFilePath.length)
{if(this.textureSequenceCount)
{for(let i=0;i<this.textureSequenceCount;++i)
{let NUM=i;let filePath=eval('`'+this.textureFilePath+'`');this.textureAry.push(_managers_texturemanager__WEBPACK_IMPORTED_MODULE_6__["textureManager"].getTexture(group,filePath));}
}
else
this.textureAry.push(_managers_texturemanager__WEBPACK_IMPORTED_MODULE_6__["textureManager"].getTexture(group,this.textureFilePath));if(size.isEmpty())
size.copy(this.textureAry[0].size);}
if(this.genType===_common_defs__WEBPACK_IMPORTED_MODULE_10__["EGT_QUAD"])
{this.generateQuad(group);this.vertexScale.w=size.w*this.defaultUniformScale;this.vertexScale.h=size.h*this.defaultUniformScale;size.w=Math.trunc(this.vertexScale.w);size.h=Math.trunc(this.vertexScale.h);}
else if(this.genType===_common_defs__WEBPACK_IMPORTED_MODULE_10__["EGT_SPRITE_SHEET"])
{if(this.spriteSheetFilePath===null)
this.spriteSheet.build(size);else
{let spriteSheet=_managers_spritesheetmanager__WEBPACK_IMPORTED_MODULE_8__["spriteSheetManager"].getSpriteSheet(this.spriteSheetFilePath);spriteSheet.copyTo(this.spriteSheet,this.glyphIDs);}
this.generateQuad(group);let glyphSize=this.spriteSheet.getGlyph().size;this.vertexScale.w=glyphSize.w*this.defaultUniformScale;this.vertexScale.h=glyphSize.h*this.defaultUniformScale;size.w=Math.trunc(this.vertexScale.w);size.h=Math.trunc(this.vertexScale.h);}
else if(this.genType===_common_defs__WEBPACK_IMPORTED_MODULE_10__["EGT_SCALED_FRAME"])
{if(this.glyphIDs!==null)
{let spriteSheet=_managers_spritesheetmanager__WEBPACK_IMPORTED_MODULE_8__["spriteSheetManager"].getSpriteSheet(this.spriteSheetFilePath);let glyph=spriteSheet.findGlyph(this.glyphIDs[0]);if(this.meshFilePath)
this.generateScaledFrameMeshFile(group,this.textureAry[0].size,glyph.size,size,glyph.uv);else
this.generateScaledFrame(group,this.textureAry[0].size,glyph.size,size,glyph.uv);}
else if(this.meshFilePath)
this.generateScaledFrameMeshFile(group,this.textureAry[0].size,this.textureAry[0].size,size,new _common_rect__WEBPACK_IMPORTED_MODULE_0__["Rect"]);else
this.generateScaledFrame(group,this.textureAry[0].size,this.textureAry[0].size,size,new _common_rect__WEBPACK_IMPORTED_MODULE_0__["Rect"]);}
}
generateQuad(group)
{let vertAry=
[
0.5,0.5,0.0,1.0,0.0,-0.5,0.5,0.0,0.0,0.0,-0.5,-0.5,0.0,0.0,1.0,0.5,-0.5,0.0,1.0,1.0
];let horzStr='';let vertStr='';if((this.mirror===_common_defs__WEBPACK_IMPORTED_MODULE_10__["EM_HORIZONTAL"])||(this.mirror===_common_defs__WEBPACK_IMPORTED_MODULE_10__["EM_HORIZONTAL_VERTICAL"]))
{horzStr='_horz';vertAry[5*0+3]=0.0;vertAry[5*1+3]=1.0;vertAry[5*2+3]=1.0;vertAry[5*3+3]=0.0;}
if((this.mirror===_common_defs__WEBPACK_IMPORTED_MODULE_10__["EM_VERTICAL"])||(this.mirror===_common_defs__WEBPACK_IMPORTED_MODULE_10__["EM_HORIZONTAL_VERTICAL"]))
{vertStr='_vert';vertAry[5*0+4]=1.0;vertAry[5*1+4]=1.0;vertAry[5*2+4]=0.0;vertAry[5*3+4]=0.0;}
this.vbo=_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_7__["vertexBufferManager"].createVBO(group,'guad_0011'+horzStr+vertStr,vertAry);this.ibo=_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_7__["vertexBufferManager"].createIBO(group,'quad_0123',[0,1,2,3],true);this.iboCount=4;}
generateScaledFrame(group,textureSize,glyphSize,frameSize,textureOffset)
{let frame=this.scaledFrame.frame;let tSize=textureSize;let gSize=glyphSize;let vboName='scaled_frame_'+frameSize.w+'_'+frameSize.h+'_'+frame.w+'_'+frame.h+'_'+tSize.w+'_'+tSize.h+'_'+gSize.w+'_'+gSize.h;this.vbo=_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_7__["vertexBufferManager"].createScaledFrame(
group,vboName,this.scaledFrame,textureSize,glyphSize,frameSize,textureOffset);let iboAry=[
0,1,2,0,3,1,2,4,5,2,1,4,1,6,4,1,7,6,7,8,6,7,9,8,10,9,7,10,11,9,12,11,10,12,13,11,14,10,3,14,12,10,15,3,0,15,14,3,3,7,1,3,10,7];this.ibo=_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_7__["vertexBufferManager"].createIBO(group,'scaled_frame',iboAry,true);this.iboCount=6*8;if(this.scaledFrame.centerQuad)
this.iboCount+=6;else if(!this.scaledFrame.bottomFrame)
this.iboCount-=6*3;}
generateScaledFrameMeshFile(group,textureSize,glyphSize,frameSize,textureOffset)
{let name='scaled_frame_mesh_'+this.meshFilePath;let iboAry=[
0,1,2,0,3,1,2,4,5,2,1,4,1,6,4,1,7,6,7,8,6,7,9,8,10,9,7,10,11,9,12,11,10,12,13,11,14,10,3,14,12,10,15,3,0,15,14,3];if(this.scaledFrame.centerQuad)
Array.prototype.push.apply(iboAry,[3,7,1,3,10,7]);this.vbo=_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_7__["vertexBufferManager"].isVBO(group,name);if(this.vbo===null)
{let meshFileVertAry=[];this.loadMeshFromXML(group,textureSize,frameSize,textureOffset,16,meshFileVertAry,iboAry);this.vbo=_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_7__["vertexBufferManager"].createScaledFrame(
group,name,this.scaledFrame,textureSize,glyphSize,frameSize,textureOffset,meshFileVertAry);}
this.ibo=_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_7__["vertexBufferManager"].createIBO(group,name,iboAry,true);this.iboCount=iboAry.length;}
loadMeshFromXML(group,textureSize,frameSize,textureOffset,iboOffset,vertAry,iboAry)
{let additionalOffsetX=0;if(Math.trunc(frameSize.w)% 2!=0)
additionalOffsetX=0.5;let additionalOffsetY=0;if(Math.trunc(frameSize.h)% 2!=0)
additionalOffsetY=0.5;let centerAlignSize=new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](-(frameSize.w/2),(frameSize.h/2));let node=_utilities_assetholder__WEBPACK_IMPORTED_MODULE_9__["assetHolder"].get(group,this.meshFilePath);let vboNode=node.getElementsByTagName('vbo');if(vboNode.length)
{let vertNode=vboNode[0].getElementsByTagName('vert');for(let i=0;i<vertNode.length;++i)
{let vert=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_11__["loadVertex2d"](vertNode[i]);vertAry.push(centerAlignSize.w+vert.x+additionalOffsetX);vertAry.push(centerAlignSize.h-vert.y+additionalOffsetY);vertAry.push(vert.z);vertAry.push(textureOffset.x1+(vert.u/textureSize.w));vertAry.push(textureOffset.y1+(vert.v/textureSize.h));}
}
let iboNode=node.getElementsByTagName('ibo');if(iboNode.length)
{let iNode=iboNode[0].getElementsByTagName('i');for(let i=0;i<iNode.length;++i)
iboAry.push(iboOffset+Number(iNode[i].childNodes[0].nodeValue));}
}
isActive()
{return(this.genType!==_common_defs__WEBPACK_IMPORTED_MODULE_10__["EGT_NULL"]);}
getFrameCount()
{if(this.genType===_common_defs__WEBPACK_IMPORTED_MODULE_10__["EGT_SPRITE_SHEET"])
return this.spriteSheet.getCount();else
return this.textureAry.length;return 0;}
getTexture(index=0)
{if(this.textureAry.length>index)
return this.textureAry[index];return null;}
getTextureFilePathAry()
{let filePathAry=[];if(this.textureSequenceCount)
{for(let i=0;i<this.textureSequenceCount;++i)
{let NUM=i;filePathAry.push(eval('`'+this.textureFilePath+'`'));}
}
else if(this.textureFilePath.length)
filePathAry.push(this.textureFilePath);return filePathAry;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ScaledFrame",function(){return ScaledFrame;});var _common_size__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(4);class ScaledFrame
{constructor()
{this.frame=new _common_size__WEBPACK_IMPORTED_MODULE_0__["Size"];this.centerQuad=true;this.bottomFrame=true;}
copy(obj)
{this.frame.copy(obj.frame);this.centerQuad=obj.centerQuad;this.bottomFrame=obj.bottomFrame;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ObjectData3D",function(){return ObjectData3D;});var _objectvisualdata3d__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(46);var _utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(35);class ObjectData3D
{constructor()
{this.visualData=new _objectvisualdata3d__WEBPACK_IMPORTED_MODULE_0__["ObjectVisualData3D"];this.name=null;this.group=null;}
copy(obj)
{this.visualData.copy(obj.visualData);}
loadObjData(node,group,name)
{this.name=name;this.group=group;this.visualData.loadObjData(node);}
createFromData(group)
{this.visualData.addTexturesToMesh(group);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ObjectVisualData3D",function(){return ObjectVisualData3D;});var _common_color__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(36);var _managers_texturemanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(6);var _utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(35);class ObjectVisualData3D
{constructor()
{this.meshGrp=null;this.shaderID=null;this.color=new _common_color__WEBPACK_IMPORTED_MODULE_0__["Color"];this.meshFilePath=null;}
copy(obj)
{this.shaderID=obj.shaderID;this.meshFilePath=obj.meshFilePath;this.color.copy(obj.color);this.meshGrp=obj.meshGrp;}
loadObjData(node)
{let visualNode=node.getElementsByTagName('visual');if(visualNode.length)
{let attr=visualNode[0].getAttribute('file');if(attr!==null)
this.meshFilePath=attr;let shaderNode=visualNode[0].getElementsByTagName('shader');if(shaderNode.length)
{this.shaderID=shaderNode[0].getAttribute('id');}
this.color=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_2__["loadColor"](visualNode[0],this.color);}
}
addTexturesToMesh(group)
{for(let i=0;i<this.meshGrp.meshAry.length;++i)
{for(let j=0;j<this.meshGrp.meshAry[i].textureIndexAry.length;++j)
{let textIndex=this.meshGrp.meshAry[i].textureIndexAry[j]
let textPath=this.meshGrp.uniqueTexturePathAry[textIndex].path;this.meshGrp.meshAry[i].textureAry.push(_managers_texturemanager__WEBPACK_IMPORTED_MODULE_1__["textureManager"].getTexture(group,textPath));}
}
}
isActive()
{return(this.meshGrp!==null);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"actionManager",function(){return actionManager;});var _common_keycodeaction__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(48);var _common_point__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(11);var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(18);var _common_defs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(5);class ActionManager
{constructor()
{this.keyboardKeyCodeMap=new Map;this.mouseKeyCodeMap=new Map;this.keyboardActionMap=new Map;this.mouseActionMap=new Map;this.gamepadActionMap=new Map;this.allowAction=true;this.lastDeviceUsed=_common_defs__WEBPACK_IMPORTED_MODULE_3__["DEVICE_NULL"];this.keyboardKeyCodeMap.set('---',-1);this.keyboardKeyCodeMap.set('RETURN',13);this.keyboardKeyCodeMap.set('ESCAPE',27);this.keyboardKeyCodeMap.set('ARROW UP',38);this.keyboardKeyCodeMap.set('ARROW DOWN',40);this.keyboardKeyCodeMap.set('ARROW LEFT',37);this.keyboardKeyCodeMap.set('ARROW RIGHT',39);this.keyboardKeyCodeMap.set('A','A'.charCodeAt(0));this.keyboardKeyCodeMap.set('B','B'.charCodeAt(0));this.keyboardKeyCodeMap.set('C','C'.charCodeAt(0));this.keyboardKeyCodeMap.set('D','D'.charCodeAt(0));this.keyboardKeyCodeMap.set('E','E'.charCodeAt(0));this.keyboardKeyCodeMap.set('F','F'.charCodeAt(0));this.keyboardKeyCodeMap.set('G','G'.charCodeAt(0));this.keyboardKeyCodeMap.set('H','H'.charCodeAt(0));this.keyboardKeyCodeMap.set('I','I'.charCodeAt(0));this.keyboardKeyCodeMap.set('J','J'.charCodeAt(0));this.keyboardKeyCodeMap.set('K','K'.charCodeAt(0));this.keyboardKeyCodeMap.set('L','L'.charCodeAt(0));this.keyboardKeyCodeMap.set('M','M'.charCodeAt(0));this.keyboardKeyCodeMap.set('N','N'.charCodeAt(0));this.keyboardKeyCodeMap.set('O','O'.charCodeAt(0));this.keyboardKeyCodeMap.set('P','P'.charCodeAt(0));this.keyboardKeyCodeMap.set('Q','Q'.charCodeAt(0));this.keyboardKeyCodeMap.set('R','R'.charCodeAt(0));this.keyboardKeyCodeMap.set('S','S'.charCodeAt(0));this.keyboardKeyCodeMap.set('T','T'.charCodeAt(0));this.keyboardKeyCodeMap.set('U','U'.charCodeAt(0));this.keyboardKeyCodeMap.set('V','V'.charCodeAt(0));this.keyboardKeyCodeMap.set('W','W'.charCodeAt(0));this.keyboardKeyCodeMap.set('X','X'.charCodeAt(0));this.keyboardKeyCodeMap.set('Y','Y'.charCodeAt(0));this.keyboardKeyCodeMap.set('Z','Z'.charCodeAt(0));this.keyboardKeyCodeMap.set('0','0'.charCodeAt(0));this.keyboardKeyCodeMap.set('1','1'.charCodeAt(0));this.keyboardKeyCodeMap.set('2','2'.charCodeAt(0));this.keyboardKeyCodeMap.set('3','3'.charCodeAt(0));this.keyboardKeyCodeMap.set('4','4'.charCodeAt(0));this.keyboardKeyCodeMap.set('5','5'.charCodeAt(0));this.keyboardKeyCodeMap.set('6','6'.charCodeAt(0));this.keyboardKeyCodeMap.set('7','7'.charCodeAt(0));this.keyboardKeyCodeMap.set('8','8'.charCodeAt(0));this.keyboardKeyCodeMap.set('9','9'.charCodeAt(0));this.keyboardKeyCodeMap.set('F1',112);this.keyboardKeyCodeMap.set('F2',113);this.keyboardKeyCodeMap.set('F3',114);this.keyboardKeyCodeMap.set('F4',115);this.keyboardKeyCodeMap.set('F5',116);this.keyboardKeyCodeMap.set('F6',117);this.keyboardKeyCodeMap.set('F7',118);this.keyboardKeyCodeMap.set('F8',119);this.keyboardKeyCodeMap.set('F9',120);this.keyboardKeyCodeMap.set('F10',121);this.keyboardKeyCodeMap.set('F11',122);this.keyboardKeyCodeMap.set('F12',123);this.keyboardKeyCodeMap.set('NUMPAD 0',96);this.keyboardKeyCodeMap.set('NUMPAD 1',97);this.keyboardKeyCodeMap.set('NUMPAD 2',98);this.keyboardKeyCodeMap.set('NUMPAD 3',99);this.keyboardKeyCodeMap.set('NUMPAD 4',100);this.keyboardKeyCodeMap.set('NUMPAD 5',101);this.keyboardKeyCodeMap.set('NUMPAD 6',102);this.keyboardKeyCodeMap.set('NUMPAD 7',103);this.keyboardKeyCodeMap.set('NUMPAD 8',104);this.keyboardKeyCodeMap.set('NUMPAD 9',105);this.keyboardKeyCodeMap.set('NUM LOCK',144);this.keyboardKeyCodeMap.set('NUMPAD/',111);this.keyboardKeyCodeMap.set('NUMPAD*',106);this.keyboardKeyCodeMap.set('NUMPAD-',109);this.keyboardKeyCodeMap.set('NUMPAD+',107);this.keyboardKeyCodeMap.set('NUMPAD ENTER',13);this.keyboardKeyCodeMap.set('NUMPAD .',110);this.keyboardKeyCodeMap.set('CTRL',17);this.keyboardKeyCodeMap.set('SHIFT',16);this.keyboardKeyCodeMap.set('ALT',18);this.keyboardKeyCodeMap.set('PRINT SCREEN',42);this.keyboardKeyCodeMap.set('SCROLL LOCK',145);this.keyboardKeyCodeMap.set('PAUSE',19);this.keyboardKeyCodeMap.set('END',35);this.keyboardKeyCodeMap.set('INSERT',45);this.keyboardKeyCodeMap.set('DELETE',46);this.keyboardKeyCodeMap.set('HOME',36);this.keyboardKeyCodeMap.set('PAGE UP',33);this.keyboardKeyCodeMap.set('PAGE DOWN',34);this.keyboardKeyCodeMap.set('BACKSPACE',8);this.keyboardKeyCodeMap.set('TAB',9);this.keyboardKeyCodeMap.set('SPACE',32);this.keyboardKeyCodeMap.set(',',188);this.keyboardKeyCodeMap.set('-',173);this.keyboardKeyCodeMap.set('.',190);this.keyboardKeyCodeMap.set('/',191);this.keyboardKeyCodeMap.set('=',61);this.keyboardKeyCodeMap.set(';',59);this.keyboardKeyCodeMap.set('[',219);this.keyboardKeyCodeMap.set('\\',220);this.keyboardKeyCodeMap.set(']',221);this.keyboardKeyCodeMap.set('`',192);this.keyboardKeyCodeMap.set("'",222);this.mouseKeyCodeMap.set('---',-1);this.mouseKeyCodeMap.set('LEFT MOUSE',0);this.mouseKeyCodeMap.set('MIDDLE MOUSE',1);this.mouseKeyCodeMap.set('RIGHT MOUSE',2);}
load(filePath,callback)
{_utilities_genfunc__WEBPACK_IMPORTED_MODULE_2__["downloadFile"]('xml',filePath,(xmlNode)=>
{this.loadFromNode(xmlNode);callback();});}
loadFromNode(xmlNode)
{if(xmlNode)
{this.loadKeyboardMappingFromNode(xmlNode.getElementsByTagName('keyboardMapping'));this.loadMouseMappingFromNode(xmlNode.getElementsByTagName('mouseMapping'));}
}
loadKeyboardMappingFromNode(node)
{this.loadActionFromNode(node[0].getElementsByTagName('playerHidden'),this.keyboardKeyCodeMap,this.keyboardActionMap);this.loadActionFromNode(node[0].getElementsByTagName('playerVisible'),this.keyboardKeyCodeMap,this.keyboardActionMap);}
loadMouseMappingFromNode(node)
{this.loadActionFromNode(node[0].getElementsByTagName('playerHidden'),this.mouseKeyCodeMap,this.mouseActionMap);this.loadActionFromNode(node[0].getElementsByTagName('playerVisible'),this.mouseKeyCodeMap,this.mouseActionMap);}
loadActionFromNode(node,keyCodeMap,actionMap)
{if(node.length)
{let actionNode=node[0].getElementsByTagName('actionMap');for(let i=0;i<actionNode.length;++i)
{let componentIdStr=actionNode[i].getAttribute('componetId');let keyCode=keyCodeMap.get(componentIdStr);if(keyCode!==undefined)
{let actionStr=actionNode[i].getAttribute('action');let action=actionMap.get(actionStr);if(action!==undefined)
{action.setId(keyCode);}
else
{actionMap.set(actionStr,new _common_keycodeaction__WEBPACK_IMPORTED_MODULE_0__["KeyCodeAction"](keyCode));}
}
}
}
}
wasActionPress(event,actionStr,actionPress)
{if(this.wasAction(event,actionStr)===actionPress)
return true;return false;}
wasAction(event,actionStr)
{let result=_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAP_IDLE"];if(this.allowAction)
{if(event instanceof KeyboardEvent)
{this.lastDeviceUsed=_common_defs__WEBPACK_IMPORTED_MODULE_3__["KEYBOARD"];if(this.wasActionMap(event.keyCode,actionStr,this.keyboardActionMap))
{result=_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAP_UP"];if(event.type.charCodeAt(3)===100)
{result=_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAP_DOWN"];}
}
}
else if(event instanceof MouseEvent)
{this.lastDeviceUsed=_common_defs__WEBPACK_IMPORTED_MODULE_3__["MOUSE"];if(this.wasActionMap(event.button,actionStr,this.mouseActionMap))
{result=_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAP_UP"];if(event.type.charCodeAt(5)===100)
{result=_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAP_DOWN"];}
}
}
}
return result;}
wasActionMap(id,actionStr,actionMap)
{let result=false;let action=actionMap.get(actionStr);if(action!==undefined)
{result=action.wasAction(id);}
return result;}
wasLastDeviceGamepad()
{return(this.lastDeviceUsed===_common_defs__WEBPACK_IMPORTED_MODULE_3__["GAMEPAD"]);}
wasLastDeviceKeyboard()
{return(this.lastDeviceUsed===_common_defs__WEBPACK_IMPORTED_MODULE_3__["KEYBOARD"]);}
wasLastDeviceMouse()
{return(this.lastDeviceUsed===_common_defs__WEBPACK_IMPORTED_MODULE_3__["MOUSE"]);}
}
var actionManager=new ActionManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"KeyCodeAction",function(){return KeyCodeAction;});class KeyCodeAction
{constructor(id)
{this.idAry=[id];}
setId(id)
{if(id>-1)
this.idAry.push(id);}
removeId(id)
{var index=this.idAry.indexOf(id);if(index>-1)
this.idAry.splice(index,1);}
wasAction(id)
{if(this.idAry.indexOf(id)>-1)
return true;return false;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"menuManager",function(){return menuManager;});var _managers_managerbase__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(31);var _managers_actionmanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(47);var _managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(26);var _managers_signalmanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(2);var _utilities_assetholder__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(39);var _gui_menu__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(50);var _gui_menutree__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(87);var _managers_cameramanager__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(88);var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(18);var _common_defs__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(5);class MenuManager extends _managers_managerbase__WEBPACK_IMPORTED_MODULE_0__["ManagerBase"]
{constructor()
{super();this.menuTreeMapMap=new Map;this.menuMapMap=new Map;this.activeMenuTreeAry=[];this.activeInterTreeAry=[];this.active=false;this.backAction;this.toggleAction;this.escapeAction;this.selectAction;this.upAction;this.downAction;this.leftAction;this.rightAction;this.tabLeft;this.tabRight;this.defaultTree;this.scrollTimerId=0;this.allow=false;}
setDefaultCamera()
{this.camera=_managers_cameramanager__WEBPACK_IMPORTED_MODULE_7__["cameraManager"].getDefault();}
setCamera(cameraId)
{this.camera=_managers_cameramanager__WEBPACK_IMPORTED_MODULE_7__["cameraManager"].get(cameraId);}
preloadGroup(groupAry,finishCallback)
{for(let grp=0;grp<groupAry.length;++grp)
{let group=groupAry[grp];let pathAry=this.listTableMap.get(group);if(pathAry!==undefined)
{if(this.menuMapMap.get(group)===undefined)
{this.menuMapMap.set(group,new Map);this.menuTreeMapMap.set(group,new Map);for(let i=0;i<pathAry.length;++i)
this.downloadFile('xml',group,pathAry[i],finishCallback,this.preload.bind(this));}
else
{throw new Error(`Menu group has alread been loaded(${group})!`);}
}
else
{throw new Error(`Menu Manager list group name can't be found(${group})!`);}
}
}
preload(group,node,filePath,finishCallback)
{this.preloadMenuXML(group,node,finishCallback);this.loadTreesFromNode(group,node);}
preloadMenuXML(group,node,finishCallback)
{let groupMap=this.menuMapMap.get(group);let menuNode=node.getElementsByTagName('menu');for(let i=0;i<menuNode.length;++i)
{let name=menuNode[i].getAttribute('name');let filePath=menuNode[i].getAttribute('file');if(groupMap.get(name)!==undefined)
throw new Error(`Duplicate menu name!(${name}).`);let menu=new _gui_menu__WEBPACK_IMPORTED_MODULE_5__["Menu"](name,group,filePath);groupMap.set(name,menu);menu.loadTransFromNode(menuNode[i]);menu.loadDynamicOffsetFromNode(menuNode[i]);if(!_utilities_assetholder__WEBPACK_IMPORTED_MODULE_4__["assetHolder"].has(group,filePath))
{_utilities_assetholder__WEBPACK_IMPORTED_MODULE_4__["assetHolder"].set(group,filePath);this.downloadFile('xml',group,filePath,finishCallback,(group,xmlNode,filePath,finishCallback)=>
{_utilities_assetholder__WEBPACK_IMPORTED_MODULE_4__["assetHolder"].set(group,filePath,xmlNode);this.preloadControlXML(group,xmlNode,finishCallback);});}
}
}
loadTreesFromNode(group,node)
{let menuGroupMap=this.menuMapMap.get(group);let treeGroupMap=this.menuTreeMapMap.get(group);let treeNode=node.getElementsByTagName('tree');for(let i=0;i<treeNode.length;++i)
{let name=treeNode[i].getAttribute('name');let rootMenu=treeNode[i].getAttribute('root');let defaultMenu=treeNode[i].getAttribute('default');let interfaceMenu=(treeNode[i].getAttribute('interfaceMenu')==='true');if(treeGroupMap.get(name)!==undefined)
throw new Error(`Duplicate tree name!(${name}).`);treeGroupMap.set(name,new _gui_menutree__WEBPACK_IMPORTED_MODULE_6__["MenuTree"](name,menuGroupMap,rootMenu,defaultMenu,interfaceMenu));if(rootMenu!=='')
{if(menuGroupMap.get(rootMenu)===undefined)
throw new Error(`Root menu doesn't exist!(${name}).`);}
else if(defaultMenu!=='')
{if(menuGroupMap.get(defaultMenu)===undefined)
throw new Error(`Default menu doesn't exist!(${name}).`);}
}
}
preloadControlXML(group,node,finishCallback)
{let controlLst=['staticMenuControls','mouseOnlyControls','menuControls','subControlList','scrollBoxControlList'];for(let i=0;i<controlLst.length;++i)
{let nodeLst=node.getElementsByTagName(controlLst[i]);if(nodeLst.length)
{let controlNode=nodeLst[0].getElementsByTagName('control');for(let j=0;j<controlNode.length;++j)
{let filePathNode=controlNode[j].getElementsByTagName('filePath');if(filePathNode.length)
{let filePath=filePathNode[0].getAttribute('file');if(filePath)
{if(!_utilities_assetholder__WEBPACK_IMPORTED_MODULE_4__["assetHolder"].has(group,filePath))
{_utilities_assetholder__WEBPACK_IMPORTED_MODULE_4__["assetHolder"].set(group,filePath);this.downloadFile('xml',group,filePath,finishCallback,(group,xmlNode,filePath,finishCallback)=>
{_utilities_assetholder__WEBPACK_IMPORTED_MODULE_4__["assetHolder"].set(group,filePath,xmlNode);this.preloadControlXML(group,xmlNode,finishCallback);});}
}
}
}
}
}
}
createGroup(groupAry,doInit=true)
{for(let grp=0;grp<groupAry.length;++grp)
{let group=groupAry[grp];let groupMap=this.menuMapMap.get(group);if(groupMap===undefined)
throw new Error(`Group map can't be found!(${group}).`);for(let [key,menu] of groupMap.entries())
{let node=_utilities_assetholder__WEBPACK_IMPORTED_MODULE_4__["assetHolder"].get(group,menu.filePath);menu.loadFromNode(node);_managers_signalmanager__WEBPACK_IMPORTED_MODULE_3__["signalManager"].broadcast_smartMenu(menu);menu.smartCreate();}
if(doInit)
this.initGroup(group);}
}
freeGroup(groupAry)
{for(let grp=0;grp<groupAry.length;++grp)
{let group=groupAry[grp];if(this.listTableMap.get(group)===undefined)
throw new Error(`Object data list group name can't be found(${group})!`);let groupMap=this.menuTreeMapMap.get(group);if(groupMap!==undefined)
{for(let [key,menuTree] of groupMap.entries())
{if(menuTree.interfaceMenu)
{let index=this.activeInterTreeAry.indexOf(menuTree);if(index>-1)
this.activeInterTreeAry.splice(index,1);}
else
{let index=this.activeMenuTreeAry.indexOf(menuTree);if(index>-1)
this.activeMenuTreeAry.splice(index,1);}
}
this.menuTreeMapMap.delete(group);this.menuMapMap.delete(group);}
}
}
initGroup(group)
{let groupMap=this.menuMapMap.get(group);if(groupMap!==undefined)
{for(let [key,menu] of groupMap.entries())
menu.init();}
else
{throw new Error(`Menu group name can't be found to init(${group})!`);}
}
cleanUpGroup(group)
{let groupMap=this.menuMapMap.get(group);if(groupMap!==undefined)
{for(let [key,menu] of groupMap.entries())
menu.cleanUp();}
else
{throw new Error(`Menu group name can't be found to clean up(${group})!`);}
}
loadMenuAction(filePath,callback)
{_utilities_genfunc__WEBPACK_IMPORTED_MODULE_8__["downloadFile"]('xml',filePath,(xmlNode)=>
{this.loadMenuActionFromNode(xmlNode);callback();});}
loadMenuActionFromNode(node)
{this.backAction=node.getElementsByTagName('backAction')[0].childNodes[0].nodeValue;this.toggleAction=node.getElementsByTagName('toggleAction')[0].childNodes[0].nodeValue;this.escapeAction=node.getElementsByTagName('escapeAction')[0].childNodes[0].nodeValue;this.selectAction=node.getElementsByTagName('selectAction')[0].childNodes[0].nodeValue;this.upAction=node.getElementsByTagName('upAction')[0].childNodes[0].nodeValue;this.downAction=node.getElementsByTagName('downAction')[0].childNodes[0].nodeValue;this.leftAction=node.getElementsByTagName('leftAction')[0].childNodes[0].nodeValue;this.rightAction=node.getElementsByTagName('rightAction')[0].childNodes[0].nodeValue;this.tabLeft=node.getElementsByTagName('tabLeft')[0].childNodes[0].nodeValue;this.tabRight=node.getElementsByTagName('tabRight')[0].childNodes[0].nodeValue;this.defaultTree=node.getElementsByTagName('defaultTree')[0].childNodes[0].nodeValue;}
activateTree(treeAry)
{for(let tree=0;tree<treeAry.length;++tree)
{let treeStr=treeAry[tree];let found=false;for(let [groupKey,groupMap] of this.menuTreeMapMap.entries())
{for(let [key,tree] of groupMap.entries())
{if(key===treeStr)
{this.activateTreeGroup(groupKey,key);found=true;break;}
}
if(found)
break;}
if(!found)
throw new Error(`Menu tree doesn't exist(${treeStr})!`);}
}
activateTreeGroup(group,treeStr)
{let groupMap=this.menuTreeMapMap.get(group);if(groupMap!==undefined)
{let tree=groupMap.get(treeStr);if(tree!==undefined)
{if(tree.interfaceMenu)
{if(this.activeInterTreeAry.indexOf(tree)!==-1)
throw new Error(`Menu tree already active(${group}-${treeStr})!`);this.activeInterTreeAry.push(tree);}
else
{if(this.activeMenuTreeAry.indexOf(tree)!==-1)
throw new Error(`Menu tree already active(${group}-${treeStr})!`);this.activeMenuTreeAry.push(tree);}
tree.init();}
else
{throw new Error(`Menu tree doesn't exist(${group}-${treeStr})!`);}
}
else
{throw new Error(`Menu tree group doesn't exist(${group}-${treeStr})!`);}
this.setActiveState();}
deactivateTree(treeStr)
{for(let [groupKey,groupMap] of this.menuTreeMapMap.entries())
{for(let [key,tree] of groupMap.entries())
{if(key===treeStr)
{ActivateTree(groupIter.first,treeIter.first);return;}
}
}
throw new Error(`Menu tree doesn't exist(${treeStr})!`);}
deactivateTreeGroup(group,treeStr)
{let groupMap=this.menuTreeMapMap.get(group);if(groupMap!==undefined)
{let tree=groupMap.get(treeStr);if(tree!==undefined)
{if(tree.interfaceMenu)
{let index=this.activeInterTreeAry.indexOf(tree);if(index>-1)
this.activeInterTreeAry.splice(index,1);}
else
{let index=this.activeMenuTreeAry.indexOf(tree);if(index>-1)
this.activeMenuTreeAry.splice(index,1);}
}
else
{throw new Error(`Menu tree doesn't exist(${group}-${treeStr})!`);}
}
else
{throw new Error(`Menu tree group doesn't exist(${group}-${treeStr})!`);}
this.setActiveState();}
clearActiveTrees()
{this.active=false;if(this.scrollTimerId!==0)
clearInterval(this.scrollTimerId);this.activeMenuTreeAry=[];this.activeInterTreeAry=[];}
handleEvent(event)
{if(this.allow)
{if(event instanceof CustomEvent)
{if((event.detail.type>=_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_UP_ACTION"])&&(event.detail.type<=_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_RIGHT_ACTION"]))
{if(this.scrollTimerId!=0)
clearTimeout(this.scrollTimerId);this.scrollTimerId=0;if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_DOWN"])
this.handleEventForScrolling(event);}
this.handleEventForTrees(event);this.setActiveState();}
else
{if(_managers_actionmanager__WEBPACK_IMPORTED_MODULE_1__["actionManager"].wasActionPress(event,this.escapeAction,_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_DOWN"]))
{let tree=this.getActiveTree();if(tree===null)
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_ESCAPE_ACTION"],this.defaultTree);else
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_ESCAPE_ACTION"],tree.name);}
else if(_managers_actionmanager__WEBPACK_IMPORTED_MODULE_1__["actionManager"].wasActionPress(event,this.toggleAction,_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_DOWN"]))
{let tree=this.getActiveTree();if(tree===null)
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_TOGGLE_ACTION"],this.defaultTree);else
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_TOGGLE_ACTION"],tree.name);}
else if(this.active)
{let pressType;if(event.type==='mousemove')
{this.handleEventForTrees(event);}
else if((pressType=_managers_actionmanager__WEBPACK_IMPORTED_MODULE_1__["actionManager"].wasAction(event,this.selectAction))>_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_IDLE"])
{if(event instanceof KeyboardEvent)
{_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_SELECT_ACTION"],pressType,_common_defs__WEBPACK_IMPORTED_MODULE_9__["KEYBOARD"]);}
else if(event instanceof MouseEvent)
{_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(
_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_SELECT_ACTION"],pressType,_common_defs__WEBPACK_IMPORTED_MODULE_9__["MOUSE"],event.clientX+_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].mouseOffsetX,event.clientY+_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].mouseOffsetY);}
}
else if(_managers_actionmanager__WEBPACK_IMPORTED_MODULE_1__["actionManager"].wasActionPress(event,this.backAction,_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_DOWN"]))
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_BACK_ACTION"]);else if((pressType=_managers_actionmanager__WEBPACK_IMPORTED_MODULE_1__["actionManager"].wasAction(event,this.upAction))>_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_IDLE"])
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_UP_ACTION"],pressType);else if((pressType=_managers_actionmanager__WEBPACK_IMPORTED_MODULE_1__["actionManager"].wasAction(event,this.downAction))>_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_IDLE"])
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_DOWN_ACTION"],pressType);else if((pressType=_managers_actionmanager__WEBPACK_IMPORTED_MODULE_1__["actionManager"].wasAction(event,this.leftAction))>_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_IDLE"])
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_LEFT_ACTION"],pressType);else if((pressType=_managers_actionmanager__WEBPACK_IMPORTED_MODULE_1__["actionManager"].wasAction(event,this.rightAction))>_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_IDLE"])
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_RIGHT_ACTION"],pressType);else if((pressType=_managers_actionmanager__WEBPACK_IMPORTED_MODULE_1__["actionManager"].wasAction(event,this.tabLeft))>_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_IDLE"])
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_TAB_LEFT"],pressType);else if((pressType=_managers_actionmanager__WEBPACK_IMPORTED_MODULE_1__["actionManager"].wasAction(event,this.tabRight))>_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_IDLE"])
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_TAB_RIGHT"],pressType);else
{this.handleEventForTrees(event);}
}
}
}
}
handleEventForTrees(event)
{let menuActive=false;for(let i=0;i<this.activeMenuTreeAry.length;++i)
{menuActive|=this.activeMenuTreeAry[i].isActive();this.activeMenuTreeAry[i].handleEvent(event);}
if(!menuActive)
{for(let i=0;i<this.activeInterTreeAry.length;++i)
{if(this.activeInterTreeAry[i].isActive())
this.activeInterTreeAry[i].handleEvent(event);}
}
}
handleEventForScrolling(event)
{if(this.active)
{if(!this.handleMenuScrolling(event,this.activeMenuTreeAry))
{this.handleMenuScrolling(event,this.activeInterTreeAry);}
}
}
handleMenuScrolling(event,activeTreeAry)
{let menuActive=false;for(let i=0;i<activeTreeAry.length;++i)
{if(activeTreeAry[i].isActive())
{menuActive=true;let scrollParam=activeTreeAry[i].getScrollParam(event.detail.type);if(scrollParam.canScroll(event.detail.type))
{this.scrollTimerId=setTimeout(
()=>
{this.scrollTimerId=setInterval(
()=>_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(scrollParam.msg),scrollParam.scrollDelay);_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(scrollParam.msg);},scrollParam.startDelay);break;}
}
}
return menuActive;}
update()
{if(this.active)
{if(!this.updateMenu(this.activeMenuTreeAry))
{this.updateMenu(this.activeInterTreeAry);}
}
}
updateMenu(activeTreeAry)
{let menuActive=false;for(let i=0;i<activeTreeAry.length;++i)
{if(activeTreeAry[i].isActive())
{menuActive=true;activeTreeAry[i].update();}
}
return menuActive;}
transform()
{if(this.active)
{if(!this.transformMenu(this.activeMenuTreeAry))
{this.transformMenu(this.activeInterTreeAry);}
}
}
transformMenu(activeTreeAry)
{let menuActive=false;for(let i=0;i<activeTreeAry.length;++i)
{if(activeTreeAry[i].isActive())
{menuActive=true;activeTreeAry[i].transform();}
}
return menuActive;}
render()
{if(this.active)
{for(let i=0;i<this.activeMenuTreeAry.length;++i)
if(this.activeMenuTreeAry[i].isActive())
this.activeMenuTreeAry[i].render(this.camera);}
}
renderInterface(matrix)
{if(this.active)
{for(let i=0;i<this.activeInterTreeAry.length;++i)
if(this.activeInterTreeAry[i].isActive())
this.activeInterTreeAry[i].render(matrix);}
}
isMenuActive()
{if(this.active)
for(let i=0;i<this.activeMenuTreeAry.length;++i)
if(this.activeMenuTreeAry[i].isActive())
return true;return false;}
isMenuItemActive()
{let result=false;if(this.active)
{for(let i=0;i<this.activeMenuTreeAry.length;++i)
{if(this.activeMenuTreeAry[i].isActive())
{result=this.activeMenuTreeAry[i].isMenuItemActive();break;}
}
}
return result;}
isInterfaceItemActive()
{let result=false;if(this.active)
{for(let i=0;i<this.activeInterTreeAry.length;++i)
{if(this.activeInterTreeAry[i].isActive())
{result=this.activeInterTreeAry[i].isMenuItemActive();break;}
}
}
return result;}
setActiveState()
{this.active=false;for(let i=0;i<this.activeMenuTreeAry.length;++i)
{if(this.activeMenuTreeAry[i].isActive())
{this.active=true;break;}
}
if(!this.active)
{for(let i=0;i<this.activeInterTreeAry.length;++i)
{if(this.activeInterTreeAry[i].isActive())
{this.active=true;break;}
}
}
}
getMenu(name)
{let menu=undefined;for(let [groupKey,groupMap] of this.menuMapMap.entries())
{menu=groupMap.get(name);if(menu!==undefined)
break;}
if(menu===undefined)
throw new Error(`Menu being asked for is missing(${name})!`);return menu;}
getMenuControl(name,controlName)
{let menu=this.getMenu(name);let control=menu.getControl(controlName);if(control===null)
throw new Error(`Menu control being asked for is missing(${name})!`);return control;}
getActiveControl(name)
{let menu=this.getMenu(name);return menu.GetActiveControl();}
getActiveMenu()
{let menu=null;for(let i=0;i<this.activeMenuTreeAry.length;++i)
{if(this.activeMenuTreeAry[i].isActive())
{menu=this.activeMenuTreeAry[i].getActiveMenu();break;}
}
if(menu===null)
throw new Error('There is no active menu!');return menu;}
getActiveTree()
{let tree=null;for(let i=0;i<this.activeMenuTreeAry.length;++i)
{if(this.activeMenuTreeAry[i].isActive())
{tree=this.activeMenuTreeAry[i];break;}
}
return tree;}
resetTransform()
{for(let [groupKey,groupMap] of this.menuMapMap.entries())
for(let [key,menu] of groupMap.entries())
menu.forceTransform();}
resetDynamicOffset()
{for(let [groupKey,groupMap] of this.menuMapMap.entries())
for(let [key,menu] of groupMap.entries())
menu.resetDynamicPos();}
get allowEventHandling(){return this.allow;}
set allowEventHandling(value){this.allow=value;}
}
var menuManager=new MenuManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Menu",function(){return Menu;});var _2d_object2d__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(51);var _common_dynamicoffset__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(37);var _scrollparam__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(53);var _utilities_settings__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(3);var _sprite_sprite__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(54);var _managers_eventmanager__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(26);var _gui_uicontrolnavnode__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(72);var _objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(30);var _script_scriptcomponent__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(70);var _script_scriptmanager__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(25);var _uicontrolfactory__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(76);var _utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(35);var _common_defs__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(5);class Menu extends _2d_object2d__WEBPACK_IMPORTED_MODULE_0__["Object2D"]
{constructor(name,group,filePath)
{super();this.name=name;this.group=group;this.filePath=filePath;this.spriteAry=[];this.staticControlAry=[];this.mouseOnlyControlAry=[];this.controlAry=[];this.controlNodeAry=[];this.controlMap=new Map;this.activeNode=null;this.state=_common_defs__WEBPACK_IMPORTED_MODULE_12__["ECS_NULL"];this.dynamicOffset=new _common_dynamicoffset__WEBPACK_IMPORTED_MODULE_1__["DynamicOffset"];this.scrollParam=new _scrollparam__WEBPACK_IMPORTED_MODULE_2__["ScrollParam"];this.smartGui=null;this.alpha=0;this.scriptComponent=new _script_scriptcomponent__WEBPACK_IMPORTED_MODULE_8__["ScriptComponent"];this.scriptFactoryMap=new Map;this.setVisible(false);}
loadFromNode(node)
{this.initScriptFactoryFunctions(node);this.scrollParam.loadFromNode(node.getElementsByTagName('scroll'));let nodeLst=node.getElementsByTagName('spriteList');if(nodeLst.length)
{let spriteNode=nodeLst[0].children;for(let i=0;i<spriteNode.length;++i)
this.loadStaticSpriteFromNode(spriteNode[i]);}
nodeLst=node.getElementsByTagName('staticMenuControls');if(nodeLst.length)
{let controlNode=nodeLst[0].children;for(let i=0;i<controlNode.length;++i)
this.loadStaticControlFromNode(controlNode[i]);}
nodeLst=node.getElementsByTagName('mouseOnlyControls');if(nodeLst.length)
{let controlNode=nodeLst[0].children;for(let i=0;i<controlNode.length;++i)
this.loadMouseOnlyControlFromNode(controlNode[i]);}
nodeLst=node.getElementsByTagName('menuControls');if(nodeLst.length)
{let controlNode=nodeLst[0].children;let navNodeMap=new Map;for(let i=0;i<controlNode.length;++i)
this.loadControlFromNode(controlNode[i],navNodeMap);for(let i=0;i<controlNode.length;++i)
this.findNodes(controlNode[i],i,navNodeMap);}
}
initScriptFactoryFunctions(node)
{let scriptLst=node.getElementsByTagName('scriptLst');if(scriptLst.length)
{let scriptNode=scriptLst[0].children;for(let i=0;i<scriptNode.length;++i)
{let attr=scriptNode[i].attributes[0];if(attr)
this.scriptFactoryMap.set(attr.name,_script_scriptmanager__WEBPACK_IMPORTED_MODULE_9__["scriptManager"].get(attr.value)(this));}
}
}
loadStaticSpriteFromNode(node)
{let objectName=node.getAttribute('objectName');let sprite=new _sprite_sprite__WEBPACK_IMPORTED_MODULE_4__["Sprite"](_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__["objectDataManager"].getData(this.group,objectName));this.spriteAry.push(sprite);sprite.load(node);sprite.initScriptFactoryFunctions(node);}
loadStaticControlFromNode(node)
{let control=_uicontrolfactory__WEBPACK_IMPORTED_MODULE_10__["create"](node,this.group);this.staticControlAry.push(control);if(control.name)
this.controlMap.set(control.name,control);}
loadMouseOnlyControlFromNode(node)
{let control=_uicontrolfactory__WEBPACK_IMPORTED_MODULE_10__["create"](node,this.group);this.mouseOnlyControlAry.push(control);if(control.name)
this.controlMap.set(control.name,control);}
loadControlFromNode(node,navNodeMap)
{let control=_uicontrolfactory__WEBPACK_IMPORTED_MODULE_10__["create"](node,this.group);this.controlAry.push(control);if(control.name)
{if(this.controlMap.has(control.name))
throw new Error(`Duplicate control name!(${control.name})`);this.controlMap.set(control.name,control);let navNode=new _gui_uicontrolnavnode__WEBPACK_IMPORTED_MODULE_6__["UIControlNavNode"](control);this.controlNodeAry.push(navNode);navNodeMap.set(control.name,navNode);}
}
loadDynamicOffsetFromNode(node)
{this.dynamicOffset=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_11__["loadDynamicOffset"](node);this.setDynamicPos();}
setDynamicPos()
{if(this.dynamicOffset)
this.setPos(this.dynamicOffset.getPos(_utilities_settings__WEBPACK_IMPORTED_MODULE_3__["settings"].defaultSize_half));} 
resetDynamicPos()
{this.setDynamicPos();for(let i=0;i<this.staticControlAry.length;++i)
this.staticControlAry[i].setDynamicPos();for(let i=0;i<this.mouseOnlyControlAry.length;++i)
this.mouseOnlyControlAry[i].setDynamicPos();for(let i=0;i<this.controlAry.length;++i)
this.controlAry[i].setDynamicPos();}
findNodes(node,nodeIndex,navNodeMap)
{let navNode=node.getElementsByTagName('navigate');if(navNode.length)
{this.setNodes(navNode,nodeIndex,'up',_common_defs__WEBPACK_IMPORTED_MODULE_12__["ENAV_NODE_UP"],navNodeMap);this.setNodes(navNode,nodeIndex,'down',_common_defs__WEBPACK_IMPORTED_MODULE_12__["ENAV_NODE_DOWN"],navNodeMap);this.setNodes(navNode,nodeIndex,'left',_common_defs__WEBPACK_IMPORTED_MODULE_12__["ENAV_NODE_LEFT"],navNodeMap);this.setNodes(navNode,nodeIndex,'right',_common_defs__WEBPACK_IMPORTED_MODULE_12__["ENAV_NODE_RIGHT"],navNodeMap);}
}
setNodes(node,nodeIndex,attrStr,navId,navNodeMap)
{let attr=node[0].getAttribute(attrStr);if(attr)
{let ctrlNode=navNodeMap.get(attr);if(ctrlNode!==undefined)
this.controlNodeAry[nodeIndex].setNode(navId,ctrlNode);else
throw new Error(`Control node doesn't exist!(${attr},${attrStr})`);}
}
init()
{for(let i=0;i<this.staticControlAry.length;++i)
this.staticControlAry[i].init();for(let i=0;i<this.mouseOnlyControlAry.length;++i)
this.mouseOnlyControlAry[i].init();for(let i=0;i<this.controlAry.length;++i)
this.controlAry[i].init();}cleanUp()
{for(let i=0;i<this.staticControlAry.length;++i)
this.staticControlAry[i].cleanUp();for(let i=0;i<this.mouseOnlyControlAry.length;++i)
this.mouseOnlyControlAry[i].cleanUp();for(let i=0;i<this.controlAry.length;++i)
this.controlAry[i].cleanUp();}activateMenu()
{this.state=_common_defs__WEBPACK_IMPORTED_MODULE_12__["EMS_IDLE"];this.setVisible(true);this.setAlpha(1);this.activateFirstInactiveControl();}
update()
{this.scriptComponent.update();if(this.isVisible())
{for(let i=0;i<this.spriteAry.length;++i)
this.spriteAry[i].update();for(let i=0;i<this.staticControlAry.length;++i)
this.staticControlAry[i].update();for(let i=0;i<this.mouseOnlyControlAry.length;++i)
this.mouseOnlyControlAry[i].update();for(let i=0;i<this.controlAry.length;++i)
this.controlAry[i].update();}
}
transform()
{if(this.isVisible())
{super.transform();for(let i=0;i<this.spriteAry.length;++i)
this.spriteAry[i].object.transform(this);for(let i=0;i<this.staticControlAry.length;++i)
this.staticControlAry[i].transform(this);for(let i=0;i<this.mouseOnlyControlAry.length;++i)
this.mouseOnlyControlAry[i].transform(this);for(let i=0;i<this.controlAry.length;++i)
this.controlAry[i].transform(this);}
}
render(camera)
{if(this.isVisible())
{for(let i=0;i<this.spriteAry.length;++i)
this.spriteAry[i].render(camera);for(let i=0;i<this.staticControlAry.length;++i)
this.staticControlAry[i].render(camera);for(let i=0;i<this.mouseOnlyControlAry.length;++i)
this.mouseOnlyControlAry[i].render(camera);for(let i=0;i<this.controlAry.length;++i)
this.controlAry[i].render(camera);}
}
handleEvent(event)
{if(event instanceof CustomEvent)
{for(let i=0;i<this.controlAry.length;++i)
this.controlAry[i].handleEvent(event);for(let i=0;i<this.mouseOnlyControlAry.length;++i)
this.mouseOnlyControlAry[i].handleEvent(event);if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_TRANS_IN"])
{this.onTransIn(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_TRANS_OUT"])
{this.onTransOut(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_REACTIVATE"])
{this.onReactivate(event);}
else if(this.state===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EMS_IDLE"])
{if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_SELECT_ACTION"])
{this.onSelectAction(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_SET_ACTIVE_CONTROL"])
{this.onSetActiveControl(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_SCROLL_UP"])
{this.onUpAction(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_SCROLL_DOWN"])
{this.onDownAction(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_SCROLL_LEFT"])
{this.onLeftAction(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_SCROLL_RIGHT"])
{this.onRightAction(event);}
else if((event.detail.type>=_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_UP_ACTION"])&&
(event.detail.type<=_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_RIGHT_ACTION"]))
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EAP_DOWN"])
{if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_UP_ACTION"])
{this.onUpAction(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_DOWN_ACTION"])
{this.onDownAction(event);}
if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_LEFT_ACTION"])
{this.onLeftAction(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_RIGHT_ACTION"])
{this.onRightAction(event);}
}
}
}
}
else if(this.state===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EMS_IDLE"])
{if(event.type==='mousemove')
{this.onMouseMove(event);}
}
this.smartHandleEvent(event);}
onUpAction(event)
{this.navigateMenu(_common_defs__WEBPACK_IMPORTED_MODULE_12__["ENAV_NODE_UP"]);}
onDownAction(event)
{this.navigateMenu(_common_defs__WEBPACK_IMPORTED_MODULE_12__["ENAV_NODE_DOWN"]);}
onLeftAction(event)
{this.navigateMenu(_common_defs__WEBPACK_IMPORTED_MODULE_12__["ENAV_NODE_LEFT"]);}
onRightAction(event)
{this.navigateMenu(_common_defs__WEBPACK_IMPORTED_MODULE_12__["ENAV_NODE_RIGHT"]);}
navigateMenu(navNodeAction)
{if(this.activeNode!==null)
{let navNode=this.activeNode;do
{navNode=navNode.getNode(navNodeAction);if(navNode===null)
{break;}
else if(!navNode.uiControl.isDisabled())
{this.activeNode=navNode;_managers_eventmanager__WEBPACK_IMPORTED_MODULE_5__["eventManager"].dispatchEvent(
_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_CONTROL_STATE_CHANGE"],_common_defs__WEBPACK_IMPORTED_MODULE_12__["ECS_ACTIVE"],navNode.uiControl);break;}
}
while(true);}
}
onMouseMove(event)
{for(let i=0;i<this.controlNodeAry.length;++i)
{if(this.controlNodeAry[i].uiControl.onMouseMove(event))
this.activeNode=this.controlNodeAry[i];else
this.controlNodeAry[i].uiControl.deactivateControl();}
for(let i=0;i<this.mouseOnlyControlAry.length;++i)
if(!this.mouseOnlyControlAry[i].onMouseMove(event))
this.mouseOnlyControlAry[i].deactivateControl();}
onSelectAction(event)
{let selectionFound=false;if((this.activeNode!==null)&&
(this.activeNode.uiControl.handleSelectAction(event)))
{selectionFound=true;if(this.activeNode.uiControl.actionType>_common_defs__WEBPACK_IMPORTED_MODULE_12__["ECAT_NULL"])
this.state=_common_defs__WEBPACK_IMPORTED_MODULE_12__["EMS_ACTIVE"];}
else if(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_12__["ESMA_DEVICE_TYPE"]]===_common_defs__WEBPACK_IMPORTED_MODULE_12__["MOUSE"])
{for(let i=0;i<this.mouseOnlyControlAry.length;++i)
{if(this.mouseOnlyControlAry[i].handleSelectAction(event))
{selectionFound=true;if(this.mouseOnlyControlAry[i].actionType>_common_defs__WEBPACK_IMPORTED_MODULE_12__["ECAT_NULL"])
this.state=_common_defs__WEBPACK_IMPORTED_MODULE_12__["EMS_ACTIVE"];break;}
}
}
if(!selectionFound && event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_12__["ESMA_DEVICE_TYPE"]]===_common_defs__WEBPACK_IMPORTED_MODULE_12__["MOUSE"])
{if((this.activeNode!==null)&&
(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_12__["ESMA_PRESS_TYPE"]]===this.activeNode.uiControl.mouseSelectType))
{this.activeNode.uiControl.deactivateControl();for(let i=0;i<this.controlAry.length;++i)
{if(this.controlAry[i].handleSelectAction(event))
{if(this.activeNode.uiControl.actionType>_common_defs__WEBPACK_IMPORTED_MODULE_12__["ECAT_NULL"])
this.state=_common_defs__WEBPACK_IMPORTED_MODULE_12__["EMS_ACTIVE"];break;}
}
}
}
}
onSetActiveControl(event)
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EAC_FIRST_ACTIVE_CONTROL"])
this.activateFirstInactiveControl();}
onReactivate(event)
{this.state=_common_defs__WEBPACK_IMPORTED_MODULE_12__["EMS_IDLE"];}
onTransIn(event)
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_12__["ETC_BEGIN"])
{this.prepare('transIn');this.state=_common_defs__WEBPACK_IMPORTED_MODULE_12__["EMS_ACTIVE"];}
else if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_12__["ETC_END"])
{this.state=_common_defs__WEBPACK_IMPORTED_MODULE_12__["EMS_IDLE"];}
}
onTransOut(event)
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_12__["ETC_BEGIN"])
{this.prepare('transOut');this.state=_common_defs__WEBPACK_IMPORTED_MODULE_12__["EMS_ACTIVE"];}
else if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_12__["ETC_END"])
{this.state=_common_defs__WEBPACK_IMPORTED_MODULE_12__["EMS_INACTIVE"];}
}
prepare(scriptFactoryId)
{let script=this.scriptFactoryMap.get(scriptFactoryId);if(script)
{script.init();this.scriptComponent.set(script);}
}
activateFirstInactiveControl()
{let found=false;for(let i=0;i<this.controlNodeAry.length;++i)
{if(!found && this.controlNodeAry[i].uiControl.activateFirstInactiveControl())
{this.activeNode=this.controlNodeAry[i];found=true;}
else
{this.controlNodeAry[i].uiControl.deactivateControl();}
}
}
reset()
{for(let i=0;i<this.controlAry.length;++i)
this.controlAry[i].reset(true);for(let i=0;i<this.mouseOnlyControlAry.length;++i)
this.mouseOnlyControlAry[i].reset(true);}
getControl(name)
{let control=this.controlMap.get(name);if(control===undefined)
throw new Error(`Control being asked for is missing!(${name}).`);return control;}
getActiveControl()
{let result=null;for(let i=0;i<this.controlAry.length;++i)
{if(this.controlAry[i].state>_common_defs__WEBPACK_IMPORTED_MODULE_12__["ECS_INACTIVE"])
{result=this.controlAry[i].getActiveControl();break;}
}
return result;}
isDynamicOffset()
{return!this.dynamicOffset.isEmpty();}
getScrollParam(msg)
{if((this.activeNode!=null)&&
this.activeNode.uiControl.canScroll(msg))
{return this.activeNode.uiControl.scrollParam;}
return this.scrollParam;}
smartCreate()
{if(this.smartGui)
this.smartGui.create();}
smartHandleEvent(event)
{if(this.smartGui)
this.smartGui.handleEvent(event);}
setAlpha(alpha)
{if(this.isVisible())
{for(let i=0;i<this.spriteAry.length;++i)
this.spriteAry[i].setAlpha(alpha);for(let i=0;i<this.staticControlAry.length;++i)
this.staticControlAry[i].setAlpha(alpha);for(let i=0;i<this.mouseOnlyControlAry.length;++i)
this.mouseOnlyControlAry[i].setAlpha(alpha);for(let i=0;i<this.controlAry.length;++i)
this.controlAry[i].setAlpha(alpha);}
this.alpha=alpha;}
getAlpha()
{return this.alpha;}
isIdle()
{return(this.state===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EMS_IDLE"]);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Object2D",function(){return Object2D;});var _common_object__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(52);var _utilities_matrix__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(9);var _common_defs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(5);class Object2D extends _common_object__WEBPACK_IMPORTED_MODULE_0__["Object"]
{constructor()
{super();this.matrix=new _utilities_matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"];}
transformLocal(matrix)
{matrix.initilizeMatrix();if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_2__["CROP_OFFSET"]))
matrix.translateSize(this.cropOffset);if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_2__["SCALE"]))
this.applyScale(matrix);if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_2__["ROTATE"]))
this.applyRotation(matrix);if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_2__["TRANSLATE"]))
matrix.translate(this.pos);this.parameters.remove(_common_defs__WEBPACK_IMPORTED_MODULE_2__["TRANSFORM"]);this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_2__["WAS_TRANSFORMED"]);}
transform(object=null)
{this.parameters.remove(_common_defs__WEBPACK_IMPORTED_MODULE_2__["WAS_TRANSFORMED"]);if(object)
{if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_2__["TRANSFORM"])|| object.wasWorldPosTranformed())
{this.transformLocal(this.matrix);this.matrix.mergeMatrix(object.matrix.matrix);}
}
else
{if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_2__["TRANSFORM"]))
this.transformLocal(this.matrix);}
}
applyScale(matrix)
{this.matrix.setScaleFromPoint(this.scale);}
applyRotation(matrix)
{if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_2__["CENTER_POINT"]))
this.matrix.translate(this.centerPos);this.matrix.rotate(this.rot);if(this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_2__["CENTER_POINT"]))
{this.centerPos.invert();this.matrix.translate(this.centerPos);this.centerPos.invert();}
}
wasWorldPosTranformed()
{return this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_2__["WAS_TRANSFORMED"]);}
forceTransform()
{this.parameters.Add(_common_defs__WEBPACK_IMPORTED_MODULE_2__["TRANSFORM"]);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Object",function(){return Object;});var _point__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(11);var _size__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(4);var _utilities_bitmask__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(38);var _utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(35);var _common_defs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(5);class Object
{constructor()
{this.parameters=new _utilities_bitmask__WEBPACK_IMPORTED_MODULE_2__["BitMask"](_common_defs__WEBPACK_IMPORTED_MODULE_4__["VISIBLE"]);this.pos=new _point__WEBPACK_IMPORTED_MODULE_0__["Point"];this.rot=new _point__WEBPACK_IMPORTED_MODULE_0__["Point"];this.scale=new _point__WEBPACK_IMPORTED_MODULE_0__["Point"](1,1,1);this.centerPos=new _point__WEBPACK_IMPORTED_MODULE_0__["Point"];this.cropOffset=new _size__WEBPACK_IMPORTED_MODULE_1__["Size"];}
setPos(pos)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSLATE"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);this.pos.set(pos);}
setPosXYZ(x=0,y=0,z=0)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSLATE"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);this.pos.setXYZ(x,y,z);}
incPos(pos)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSLATE"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);this.pos.inc(pos);}
incPosXYZ(x=0,y=0,z=0)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSLATE"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);this.pos.incXYZ(x,y,z);}
setRot(rot,convertToRadians=true)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["ROTATE"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);if(convertToRadians)
this.rot.setXYZ(rot.x*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"],rot.y*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"],rot.z*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"]);else
this.rot.set(rot);}
setRotXYZ(x=0,y=0,z=0,convertToRadians=true)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["ROTATE"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);if(convertToRadians)
this.rot.setXYZ(x*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"],y*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"],z*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"]);else
this.rot.setXYZ(x,y,z);}
incRot(rot,convertToRadians=true)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["ROTATE"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);if(convertToRadians)
this.rot.incXYZ(rot.x*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"],rot.y*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"],rot.z*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"]);else
this.rot.inc(rot);this.rot.cap(360*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"]);}
incRotXYZ(x=0,y=0,z=0,convertToRadians=true)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["ROTATE"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);if(convertToRadians)
this.rot.incXYZ(x*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"],y*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"],z*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"]);else
this.rot.incXYZ(x,y,z);this.rot.cap(360*_common_defs__WEBPACK_IMPORTED_MODULE_4__["DEG_TO_RAD"]);}
setScale(scale)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["SCALE"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);this.scale.set(scale);}
setScaleXYZ(x=1,y=1,z=1)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["SCALE"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);this.scale.setXYZ(x,y,z);}
incScale(scale)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["SCALE"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);this.scale.inc(scale);}
incScaleXYZ(x=1,y=1,z=1)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["SCALE"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);this.scale.incXYZ(x,y,z);}
setCenterPos(pos)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["CENTER_POINT"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);this.centerPos=pos;}
setCenterPosXYZ(x=0,y=0,z=0)
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["CENTER_POINT"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);this.centerPos.setXYZ(x,y,z);}
setCropOffset(offset)
{if(!this.centerPos.isEmpty()||((offset!==null)&&(!offset.isEmpty())))
{this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["CROP_OFFSET"]| _common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSFORM"]);this.cropOffset=offset;}
}
setVisible(value)
{if(value)
this.parameters.add(_common_defs__WEBPACK_IMPORTED_MODULE_4__["VISIBLE"]);else
this.parameters.remove(_common_defs__WEBPACK_IMPORTED_MODULE_4__["VISIBLE"]);}
isVisible()
{return this.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_4__["VISIBLE"]);}
copyTransform(object)
{if(object.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_4__["TRANSLATE"]))
this.setPos(object.pos);if(object.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_4__["ROTATE"]))
this.setRot(object.rot);if(object.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_4__["SCALE"]))
this.setScale(object.scale);if(object.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_4__["CENTER_POINT"]))
this.setCenterPos(object.centerPos);if(object.parameters.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_4__["CROP_OFFSET"]))
this.setCropOffset(object.cropOffset);}
loadTransFromNode(node)
{let pos=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_3__["loadPosition"](node);if(pos)
this.setPos(pos);let rot=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_3__["loadRotation"](node);if(rot)
this.setRot(rot);let scale=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_3__["loadScale"](node);if(scale)
this.setScale(scale);let centerPos=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_3__["loadCenterPos"](node);if(centerPos)
this.setCenterPos(centerPos);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ScrollParam",function(){return ScrollParam;});var _common_defs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(5);class ScrollParam
{constructor()
{this.scrollTypesMap=null;this.startDelay=-1;this.scrollDelay=-1;this.msg=-1;}
loadFromNode(node)
{if(node.length)
{this.scrollTypesMap=new Map;this.startDelay=Number(node[0].getAttribute('startDelay'));this.scrollDelay=Number(node[0].getAttribute('scrollDelay'));if(node[0].getAttribute('up')==='true')
this.scrollTypesMap.set(_common_defs__WEBPACK_IMPORTED_MODULE_0__["EGE_MENU_UP_ACTION"],_common_defs__WEBPACK_IMPORTED_MODULE_0__["EGE_MENU_SCROLL_UP"]);if(node[0].getAttribute('down')==='true')
this.scrollTypesMap.set(_common_defs__WEBPACK_IMPORTED_MODULE_0__["EGE_MENU_DOWN_ACTION"],_common_defs__WEBPACK_IMPORTED_MODULE_0__["EGE_MENU_SCROLL_DOWN"]);if(node[0].getAttribute('left')==='true')
this.scrollTypesMap.set(_common_defs__WEBPACK_IMPORTED_MODULE_0__["EGE_MENU_LEFT_ACTION"],_common_defs__WEBPACK_IMPORTED_MODULE_0__["EGE_MENU_SCROLL_LEFT"]);if(node[0].getAttribute('right')==='true')
this.scrollTypesMap.set(_common_defs__WEBPACK_IMPORTED_MODULE_0__["EGE_MENU_RIGHT_ACTION"],_common_defs__WEBPACK_IMPORTED_MODULE_0__["EGE_MENU_SCROLL_RIGHT"]);}
}
canScroll(msg)
{if(this.scrollTypesMap)
{this.msg=-1;let result=this.scrollTypesMap.get(msg);if(result)
{this.msg=result;return true;}
}
return false;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Sprite",function(){return Sprite;});var _2d_visualcomponentquad__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(55);var _2d_visualcomponentspritesheet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(61);var _2d_visualcomponentscaledframe__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(62);var _2d_visualcomponentfont__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(63);var _3d_visualcomponent3d__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(64);var _physics_physicscomponent2d__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(65);var _script_scriptcomponent__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(70);var _script_scriptmanager__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(25);var _spritedata__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(71);var _2d_object2d__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(51);var _3d_object3d__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(60);var _utilities_matrix__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(9);var _common_defs__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(5);class Sprite
{constructor(objData,id=_common_defs__WEBPACK_IMPORTED_MODULE_12__["SPRITE_DEFAULT_ID"])
{this.objData=objData
this.id=id
this.ai=null
this.object=null
this.visualComponent=null
this.physicsComponent=null;this.scriptFactoryMap=new Map;this.scriptComponent=new _script_scriptcomponent__WEBPACK_IMPORTED_MODULE_6__["ScriptComponent"];if(this.objData.constructor.name=='ObjectData2D')
{this.object=new _2d_object2d__WEBPACK_IMPORTED_MODULE_9__["Object2D"]
if(objData.visualData.genType===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGT_QUAD"])
this.visualComponent=new _2d_visualcomponentquad__WEBPACK_IMPORTED_MODULE_0__["VisualComponentQuad"](objData.visualData);else if(objData.visualData.genType===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGT_SPRITE_SHEET"])
this.visualComponent=new _2d_visualcomponentspritesheet__WEBPACK_IMPORTED_MODULE_1__["VisualComponentSpriteSheet"](objData.visualData);else if(objData.visualData.genType===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGT_SCALED_FRAME"])
this.visualComponent=new _2d_visualcomponentscaledframe__WEBPACK_IMPORTED_MODULE_2__["VisualComponentScaledFrame"](objData.visualData);else if(objData.visualData.genType===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGT_FONT"])
this.visualComponent=new _2d_visualcomponentfont__WEBPACK_IMPORTED_MODULE_3__["VisualComponentFont"](objData.visualData);if(objData.physicsData.isActive())
this.physicsComponent=new _physics_physicscomponent2d__WEBPACK_IMPORTED_MODULE_5__["PhysicsComponent2D"](objData.physicsData);}
else if(this.objData.constructor.name=='ObjectData3D')
{this.object=new _3d_object3d__WEBPACK_IMPORTED_MODULE_10__["Object3D"]
this.visualComponent=new _3d_visualcomponent3d__WEBPACK_IMPORTED_MODULE_4__["VisualComponent3D"](objData.visualData);}
this.object.setVisible(objData.visualData.isActive());}
load(xmlNode)
{this.object.loadTransFromNode(xmlNode);this.initScriptFactoryFunctions(xmlNode);if(this.visualComponent.isFontSprite())
this.visualComponent.loadFontPropFromNode(xmlNode);}
initScriptFactoryFunctions(xmlNode)
{let scriptNode=xmlNode.getElementsByTagName('script');for(let i=0;i<scriptNode.length;++i)
{let attr=scriptNode[i].attributes[0];if(attr)
this.scriptFactoryMap.set(attr.name,_script_scriptmanager__WEBPACK_IMPORTED_MODULE_7__["scriptManager"].get(attr.value)(this));}
}
createScriptFunctions(spriteData)
{for(let [key,scriptFactory] of spriteData.scriptFunctionMap.entries())
this.scriptFactoryMap.set(key,scriptFactory(this));}
prepareScript(scriptFactoryId,forceUpdate=false)
{let script=this.scriptFactoryMap.get(scriptFactoryId);if(script)
{script.init();this.scriptComponent.set(script);if(forceUpdate)
this.scriptComponent.update();return true;}
return false;}
prepareScriptFactory(scriptFactory,forceUpdate=false)
{this.scriptComponent.set(scriptFactory(this));if(forceUpdate)
this.scriptComponent.update();}
init()
{if(this.visualComponent.isFontSprite())
this.visualComponent.createFontStringFromData();}
cleanUp()
{if(this.visualComponent.isFontSprite())
this.visualComponent.deleteFontVBO();if(this.physicsComponent)
this.physicsComponent.destroyBody();}
initPhysics()
{if(this.physicsComponent)
this.physicsComponent.init(this);}
handleEvent(event)
{if(this.ai)
this.ai.handleEvent(event);}
update()
{this.scriptComponent.update();if(this.ai)
this.ai.update();}
physicsUpdate()
{if(this.physicsComponent)
this.physicsComponent.update(this);}
render(camera)
{if(this.object.isVisible())
this.visualComponent.render(this.object,camera);}
setAI(ai)
{this.ai=ai;this.ai.init();}
setColor(color)
{this.visualComponent.color.copy(color);}
setRGBA(r,g,b,a)
{this.visualComponent.color.set(r,g,b,a);}
setAlpha(alpha,allowToExceed=false)
{if(allowToExceed||(alpha<this.objData.visualData.color.a))
this.visualComponent.color.a=alpha;else
this.visualComponent.color.a=this.objData.visualData.color.a;}
getAlpha()
{return this.visualComponent.color.a;}
getDefaultAlpha()
{return this.objData.visualData.color.a;}
setDefaultColor()
{this.visualComponent.color.copy(this.objData.visualData.color);}
getColor()
{return this.visualComponent.color;}
getDefaultColor()
{return this.objData.visualData.color;}
setFrame(index=0)
{if(this.visualComponent.frameIndex!=index)
{this.visualComponent.setFrame(index);if(this.objData.visualData.genType===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGT_SPRITE_SHEET"])
this.object.setCropOffset(this.objData.visualData.spriteSheet.getGlyph(index).cropOffset);}
}
getFrameCount()
{if(this.objData.visualData.spriteSheet)
return this.objData.visualData.spriteSheet.getCount();return 1;}
getId()
{return this.id;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"VisualComponentQuad",function(){return VisualComponentQuad;});var _common_ivisualcomponent__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(56);var _managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(19);var _managers_texturemanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6);var _managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(15);var _managers_fontmanager__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(27);var _common_fontdata__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(57);var _utilities_matrix__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(9);var _common_color__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(36);var _common_size__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(4);var _common_vertex2d__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(17);var _common_camera__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(59);var _system_device__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(8);var _common_defs__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(5);var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(18);var gFinalMatrix=new _utilities_matrix__WEBPACK_IMPORTED_MODULE_6__["Matrix"];class VisualComponentQuad extends _common_ivisualcomponent__WEBPACK_IMPORTED_MODULE_0__["ivisualComponent"]
{constructor(visualData)
{super();this.visualData=visualData;this.shaderData=null;this.vertexLocation=null;this.text0Location=null;this.uvLocation=null;this.matrixLocation=null;this.colorLocation=null;this.VERTEX_BUF_SIZE=20;this.frameIndex=0;this.vbo=visualData.vbo;this.ibo=visualData.ibo;this.iboCount=visualData.iboCount;this.texture=visualData.getTexture();this.color=new _common_color__WEBPACK_IMPORTED_MODULE_7__["Color"];if(visualData.isActive())
{this.shaderData=_managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__["shaderManager"].getShaderData(visualData.shaderID);this.vertexLocation=this.shaderData.getLocation('in_position');this.matrixLocation=this.shaderData.getLocation('cameraViewProjMatrix');this.colorLocation=this.shaderData.getLocation('color');if(this.texture!==null)
{this.uvLocation=this.shaderData.getLocation('in_uv');this.text0Location=this.shaderData.getLocation('text0');}
this.color.copy(this.visualData.color);}
}
render(object,camera)
{if(this.allowRender())
{_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_3__["vertexBufferManager"].bind(this.vbo,this.ibo);_managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__["shaderManager"].bind(this.shaderData);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].vertexAttribPointer(this.vertexLocation,3,_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].FLOAT,false,this.VERTEX_BUF_SIZE,0);if(this.texture)
{_managers_texturemanager__WEBPACK_IMPORTED_MODULE_2__["textureManager"].bind(this.texture.id);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].uniform1i(this.text0Location,0);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].vertexAttribPointer(this.uvLocation,2,_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].FLOAT,false,this.VERTEX_BUF_SIZE,12);}
_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].uniform4fv(this.colorLocation,this.color.data);gFinalMatrix.initilizeMatrix();gFinalMatrix.setScaleFromSize(this.visualData.vertexScale);gFinalMatrix.mergeMatrix(object.matrix.matrix);gFinalMatrix.mergeMatrix(camera.finalMatrix.matrix);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].uniformMatrix4fv(this.matrixLocation,false,gFinalMatrix.matrix);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].drawElements(_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].TRIANGLE_FAN,this.iboCount,_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].UNSIGNED_BYTE,0);}
}
allowRender()
{return(this.visualData.genType!=_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGT_NULL"]);}
setFrame(index)
{this.frameIndex=index;this.texture=this.visualData.getTexture(index);}
getFrameCount()
{return this.visualData.getFrameCount();}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ivisualComponent",function(){return ivisualComponent;});class ivisualComponent
{constructor()
{}
deleteFontVBO()
{}
isFontSprite()
{return false;}
setFrame(index)
{}
getFrameCount()
{return 1;}
getFontSize()
{return 0;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"FontData",function(){return FontData;});var _fontproperties__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(58);var _size__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(4);class FontData
{constructor()
{this.fontString='';this.fontProp=new _fontproperties__WEBPACK_IMPORTED_MODULE_0__["FontProperties"];this.fontStrSize=new _size__WEBPACK_IMPORTED_MODULE_1__["Size"];}
copy(obj)
{this.fontString=obj.fontString;this.fontProp.copy(obj.fontProp);this.fontStrSize.copy(obj.fontStrSize);}
loadFromNode(node)
{let fontNode=node.getElementsByTagName('font');if(fontNode.length)
{let attr=fontNode[0].getAttribute('fontString');if(attr)
this.fontString=attr;this.fontProp.loadFromNode(fontNode[0]);}
}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"FontProperties",function(){return FontProperties;});var _managers_fontmanager__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(27);var _utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(35);var _defs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(5);class FontProperties
{constructor(fontName=null,hAlign=_defs__WEBPACK_IMPORTED_MODULE_2__["EHA_HORZ_CENTER"],vAlign=_defs__WEBPACK_IMPORTED_MODULE_2__["EVA_VERT_CENTER"],kerning=0,spaceCharKerning=0,lineWrapWidth=-1,lineWrapHeight=0)
{this.fontName=fontName;this.hAlign=hAlign;this.vAlign=vAlign;this.kerning=kerning;this.spaceCharKerning=spaceCharKerning;this.lineWrapWidth=lineWrapWidth;this.lineWrapHeight=0;if(this.fontName)
_managers_fontmanager__WEBPACK_IMPORTED_MODULE_0__["fontManager"].isFont(this.fontName);}
copy(obj)
{this.fontName=obj.fontName;this.hAlign=obj.hAlign;this.vAlign=obj.vAlign;this.kerning=obj.kerning;this.spaceCharKerning=obj.spaceCharKerning;this.lineWrapWidth=obj.lineWrapWidth;this.lineWrapHeight=obj.lineWrapHeight;_managers_fontmanager__WEBPACK_IMPORTED_MODULE_0__["fontManager"].isFont(this.fontName);}
loadFromNode(node)
{let attr=node.getAttribute('fontName');if(attr)
this.fontName=attr;_managers_fontmanager__WEBPACK_IMPORTED_MODULE_0__["fontManager"].isFont(this.fontName);let attrNode=node.getElementsByTagName('attributes');if(attrNode.length)
{attr=attrNode[0].getAttribute('kerning');if(attr)
this.kerning=Number(attr);attr=attrNode[0].getAttribute('spaceCharKerning');if(attr)
this.spaceCharKerning=Number(attr);attr=attrNode[0].getAttribute('lineWrapWidth');if(attr)
this.lineWrapWidth=Number(attr);attr=attrNode[0].getAttribute('lineWrapHeight');if(attr)
this.lineWrapHeight=Number(attr);}
let alignmentNode=node.getElementsByTagName('alignment');if(alignmentNode.length)
{this.hAlign=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_1__["loadHorzAlignment"](alignmentNode[0],_defs__WEBPACK_IMPORTED_MODULE_2__["EHA_HORZ_CENTER"]);this.vAlign=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_1__["loadVertAlignment"](alignmentNode[0],_defs__WEBPACK_IMPORTED_MODULE_2__["EVA_VERT_CENTER"]);}
}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Camera",function(){return Camera;});var _utilities_matrix__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(9);var _3d_object3d__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(60);var _utilities_settings__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(3);var _defs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(5);class Camera extends _3d_object3d__WEBPACK_IMPORTED_MODULE_1__["Object3D"]
{constructor()
{super();this.projectionMatrix=new _utilities_matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix"];this.finalMatrix=new _utilities_matrix__WEBPACK_IMPORTED_MODULE_0__["Matrix"];this.projType=_utilities_settings__WEBPACK_IMPORTED_MODULE_2__["settings"].projectionType;this.minZDist=_utilities_settings__WEBPACK_IMPORTED_MODULE_2__["settings"].minZdist;this.maxZDist=_utilities_settings__WEBPACK_IMPORTED_MODULE_2__["settings"].maxZdist;this.angle=_utilities_settings__WEBPACK_IMPORTED_MODULE_2__["settings"].viewAngle;this.createProjectionMatrix();super.transform();this.calcFinalMatrix();}
initFromXml(xmlNode)
{let attr=xmlNode.getAttribute('projectType');if(attr)
{if(attr==='orthographic')
this.projType=_defs__WEBPACK_IMPORTED_MODULE_3__["EPT_ORTHOGRAPHIC"];else
this.projType=_defs__WEBPACK_IMPORTED_MODULE_3__["EPT_PERSPECTIVE"];}
attr=xmlNode.getAttribute('minZDist');if(attr)
this.minZDist=Number(attr);attr=xmlNode.getAttribute('maxZDist');if(attr)
this.maxZDist=Number(attr);attr=xmlNode.getAttribute('view_angle');if(attr)
this.angle=Number(attr)*_defs__WEBPACK_IMPORTED_MODULE_3__["DEG_TO_RAD"];this.loadTransFromNode(xmlNode);this.createProjectionMatrix();super.transform();this.calcFinalMatrix();}
init(projType,minZDist,maxZDist,angle)
{this.projType=projType;this.minZDist=minZDist;this.maxZDist=maxZDist;this.angle=angle;this.createProjectionMatrix();super.transform();this.calcFinalMatrix();}
createProjectionMatrix()
{if(this.projType==_defs__WEBPACK_IMPORTED_MODULE_3__["EPT_PERSPECTIVE"])
{this.projectionMatrix.perspectiveFovRH(
this.angle,_utilities_settings__WEBPACK_IMPORTED_MODULE_2__["settings"].screenAspectRatio.w,this.minZDist,this.maxZDist);}
else
{this.projectionMatrix.orthographicRH(
_utilities_settings__WEBPACK_IMPORTED_MODULE_2__["settings"].defaultSize.w,_utilities_settings__WEBPACK_IMPORTED_MODULE_2__["settings"].defaultSize.h,this.minZDist,this.maxZDist);}
}
setPos(pos)
{super.setPosXYZ(-pos.x,-pos.y,-pos.z);}
setPosXYZ(x=0,y=0,z=0)
{super.setPosXYZ(-x,-y,-z);}
incPos(pos)
{super.incPosXYZ(-pos.x,-pos.y,-pos.z);}
incPosXYZ(x=0,y=0,z=0)
{super.incPosXYZ(-x,-y,-z);}
transform()
{let wasTransformed=this.parameters.isSet(_defs__WEBPACK_IMPORTED_MODULE_3__["TRANSFORM"]);super.transform();if(wasTransformed)
this.calcFinalMatrix();}
calcFinalMatrix()
{this.finalMatrix.initilizeMatrix();this.finalMatrix.mergeMatrix(this.matrix.matrix);this.finalMatrix.mergeMatrix(this.projectionMatrix.matrix);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Object3D",function(){return Object3D;});var _2d_object2d__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(51);var _utilities_matrix__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(9);var _common_defs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(5);class Object3D extends _2d_object2d__WEBPACK_IMPORTED_MODULE_0__["Object2D"]
{constructor()
{super();this.rotMatrix=new _utilities_matrix__WEBPACK_IMPORTED_MODULE_1__["Matrix"];}
applyRotation(matrix)
{super.applyRotation(matrix);this.rotMatrix.initilizeMatrix();this.rotMatrix.rotate(this.rot);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"VisualComponentSpriteSheet",function(){return VisualComponentSpriteSheet;});var _2d_visualcomponentquad__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(55);var _managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(19);var _managers_texturemanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6);var _managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(15);var _managers_fontmanager__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(27);var _common_fontdata__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(57);var _utilities_matrix__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(9);var _common_color__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(36);var _common_size__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(4);var _common_vertex2d__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(17);var _common_camera__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(59);var _system_device__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(8);var _common_defs__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(5);var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(18);var gFinalMatrix=new _utilities_matrix__WEBPACK_IMPORTED_MODULE_6__["Matrix"];class VisualComponentSpriteSheet extends _2d_visualcomponentquad__WEBPACK_IMPORTED_MODULE_0__["VisualComponentQuad"]
{constructor(visualData)
{super(visualData);if(visualData.isActive())
{this.glyphLocation=this.shaderData.getLocation('glyphRect');this.glyphUV=visualData.spriteSheet.getGlyph().uv;this.frameIndex=visualData.spriteSheet.defaultIndex;this.vertexScale=new _common_size__WEBPACK_IMPORTED_MODULE_8__["Size"];this.vertexScale.copy(this.visualData.vertexScale);}
}
render(object,camera)
{if(this.allowRender())
{_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_3__["vertexBufferManager"].bind(this.vbo,this.ibo);_managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__["shaderManager"].bind(this.shaderData);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].vertexAttribPointer(this.vertexLocation,3,_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].FLOAT,false,this.VERTEX_BUF_SIZE,0);if(this.texture)
{_managers_texturemanager__WEBPACK_IMPORTED_MODULE_2__["textureManager"].bind(this.texture.id);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].uniform1i(this.text0Location,0);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].vertexAttribPointer(this.uvLocation,2,_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].FLOAT,false,this.VERTEX_BUF_SIZE,12);}
_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].uniform4fv(this.colorLocation,this.color.data);gFinalMatrix.initilizeMatrix();gFinalMatrix.setScaleFromSize(this.vertexScale);gFinalMatrix.mergeMatrix(object.matrix.matrix);gFinalMatrix.mergeMatrix(camera.finalMatrix.matrix);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].uniformMatrix4fv(this.matrixLocation,false,gFinalMatrix.matrix);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].uniform4fv(this.glyphLocation,this.glyphUV.data);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].drawElements(_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].TRIANGLE_FAN,this.iboCount,_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].UNSIGNED_BYTE,0);}
}
setFrame(index)
{this.frameIndex=index;let glyph=this.visualData.spriteSheet.getGlyph(index);this.vertexScale.w=glyph.size.w*this.visualData.defaultUniformScale;this.vertexScale.h=glyph.size.h*this.visualData.defaultUniformScale;this.glyphUV=glyph.uv;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"VisualComponentScaledFrame",function(){return VisualComponentScaledFrame;});var _2d_visualcomponentquad__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(55);var _managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(19);var _managers_texturemanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6);var _managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(15);var _managers_fontmanager__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(27);var _common_fontdata__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(57);var _utilities_matrix__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(9);var _common_color__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(36);var _common_size__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(4);var _common_vertex2d__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(17);var _common_camera__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(59);var _system_device__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(8);var _common_defs__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(5);var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(18);var gFinalMatrix=new _utilities_matrix__WEBPACK_IMPORTED_MODULE_6__["Matrix"];class VisualComponentScaledFrame extends _2d_visualcomponentquad__WEBPACK_IMPORTED_MODULE_0__["VisualComponentQuad"]
{constructor(visualData)
{super(visualData);}
render(object,camera)
{if(this.allowRender())
{_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_3__["vertexBufferManager"].bind(this.vbo,this.ibo);_managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__["shaderManager"].bind(this.shaderData);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].vertexAttribPointer(this.vertexLocation,3,_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].FLOAT,false,this.VERTEX_BUF_SIZE,0);if(this.texture)
{_managers_texturemanager__WEBPACK_IMPORTED_MODULE_2__["textureManager"].bind(this.texture.id);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].uniform1i(this.text0Location,0);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].vertexAttribPointer(this.uvLocation,2,_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].FLOAT,false,this.VERTEX_BUF_SIZE,12);}
_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].uniform4fv(this.colorLocation,this.color.data);gFinalMatrix.initilizeMatrix();gFinalMatrix.mergeMatrix(object.matrix.matrix);gFinalMatrix.mergeMatrix(camera.finalMatrix.matrix);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].uniformMatrix4fv(this.matrixLocation,false,gFinalMatrix.matrix);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].drawElements(_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].TRIANGLES,this.iboCount,_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].UNSIGNED_BYTE,0);}
}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"VisualComponentFont",function(){return VisualComponentFont;});var _2d_visualcomponentquad__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(55);var _managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(19);var _managers_texturemanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6);var _managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(15);var _managers_fontmanager__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(27);var _common_fontdata__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(57);var _utilities_matrix__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(9);var _common_color__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(36);var _common_size__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(4);var _common_vertex2d__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(17);var _common_camera__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(59);var _system_device__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(8);var _common_defs__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(5);var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(18);var gFinalMatrix=new _utilities_matrix__WEBPACK_IMPORTED_MODULE_6__["Matrix"];class VisualComponentFont extends _2d_visualcomponentquad__WEBPACK_IMPORTED_MODULE_0__["VisualComponentQuad"]
{constructor(visualData)
{super(visualData);if(visualData.isActive())
{this.uvLocation=this.shaderData.getLocation('in_uv');this.text0Location=this.shaderData.getLocation('text0');this.fontData=new _common_fontdata__WEBPACK_IMPORTED_MODULE_5__["FontData"];}
}
deleteFontVBO()
{if((this.visualData.genType===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGT_FONT"])&&(this.vbo!==null))
{_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].deleteBuffer(this.vbo);this.vbo=null;}
}
render(object,camera)
{if(this.allowRender())
{_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_3__["vertexBufferManager"].bind(this.vbo,this.ibo);_managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__["shaderManager"].bind(this.shaderData);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].vertexAttribPointer(this.vertexLocation,3,_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].FLOAT,false,this.VERTEX_BUF_SIZE,0);if(this.texture)
{_managers_texturemanager__WEBPACK_IMPORTED_MODULE_2__["textureManager"].bind(this.texture.id);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].uniform1i(this.text0Location,0);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].vertexAttribPointer(this.uvLocation,2,_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].FLOAT,false,this.VERTEX_BUF_SIZE,12);}
_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].uniform4fv(this.colorLocation,this.color.data);gFinalMatrix.initilizeMatrix();gFinalMatrix.mergeMatrix(object.matrix.matrix);gFinalMatrix.mergeMatrix(camera.finalMatrix.matrix);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].uniformMatrix4fv(this.matrixLocation,false,gFinalMatrix.matrix);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].drawElements(_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].TRIANGLES,this.iboCount,_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].UNSIGNED_SHORT,0);}
}
allowRender()
{return(this.fontData.fontString && this.vbo);}
isFontSprite()
{return true;}
loadFontPropFromNode(node)
{if(this.fontData)
this.fontData.loadFromNode(node);}
setFontProperties(fontName,hAlign=null,vAlign=null,kerning=null,sKern=null,lineWrapWidth=null,lineWrapHeight=null)
{if(this.fontData)
{this.fontData.fontProp.fontName=fontName;if(hAlign)
this.fontData.fontProp.hAlign=hAlign;if(vAlign)
this.fontData.fontProp.hAlign=vAlign;if(kerning)
this.fontData.fontProp.kerning=kerning;if(sKern)
this.fontData.fontProp.spaceCharKerning=sKern;if(lineWrapWidth)
this.fontData.fontProp.lineWrapWidth=lineWrapWidth;if(lineWrapHeight)
this.fontData.fontProp.lineWrapHeight=lineWrapHeight;}
}
createFontStringFromData()
{if((this.fontData!==null)&& this.fontData.fontString)
this.createFontString(this.fontData.fontString);}
createFontString(fontString)
{if((this.fontData!==null)&&
(fontString!=='')&&
(this.fontData.fontProp.fontName!==null)&&
((fontString!==this.fontData.fontString)||(this.vbo===null)))
{this.fontData.fontStrSize.reset();let lastCharDif=0;let font=_managers_fontmanager__WEBPACK_IMPORTED_MODULE_4__["fontManager"].getFont(this.fontData.fontProp.fontName);this.texture=font.texture;this.fontData.fontString=fontString;let spaceCharCount=_utilities_genfunc__WEBPACK_IMPORTED_MODULE_13__["countStrOccurrence"](this.fontData.fontString,' ');let barCharCount=_utilities_genfunc__WEBPACK_IMPORTED_MODULE_13__["countStrOccurrence"](this.fontData.fontString,'|');const charCount=this.fontData.fontString.length-spaceCharCount-barCharCount;this.iboCount=charCount*6;const BUILD_FONT_IBO=(this.iboCount>_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_3__["vertexBufferManager"].currentMaxFontIndices);let vertAry=new Array(charCount*4*5);let indexAry=null;if(BUILD_FONT_IBO)
indexAry=new Array(this.iboCount);let xOffset=0;let width=0;let lineHeightOffset=0;let lineHeightWrap=font.lineHeight+font.vertPadding+this.fontData.fontProp.lineWrapHeight;let initialHeightOffset=font.baselineOffset+font.vertPadding;let lineSpace=font.lineHeight-font.baselineOffset;let counter=0;let vertAryIndex=0;let lineCount=0;let textureSize=font.texture.size;let lineWidthOffsetAry=this.calcLineWidthOffset(font,this.fontData.fontString);xOffset=lineWidthOffsetAry[lineCount++];if(this.fontData.fontProp.vAlign===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EVA_VERT_TOP"])
lineHeightOffset=-initialHeightOffset;if(this.fontData.fontProp.vAlign===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EVA_VERT_CENTER"])
{lineHeightOffset=-(initialHeightOffset-((font.baselineOffset-lineSpace)/2)-font.vertPadding);if(lineWidthOffsetAry.length>1)
lineHeightOffset=((lineHeightWrap*lineWidthOffsetAry.length)/2)-font.baselineOffset;}
else if(this.fontData.fontProp.vAlign===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EVA_VERT_BOTTOM"])
{lineHeightOffset=-(initialHeightOffset-font.baselineOffset-font.vertPadding);if(lineWidthOffsetAry.length>1)
lineHeightOffset+=(lineHeightWrap*(lineWidthOffsetAry.length-1));}
lineHeightOffset=Math.trunc(lineHeightOffset);for(let i=0;i<this.fontData.fontString.length;++i)
{let id=this.fontData.fontString.charCodeAt(i);if(id===_common_defs__WEBPACK_IMPORTED_MODULE_12__["CHAR_CODE_PIPE"])
{xOffset=lineWidthOffsetAry[lineCount];width=0;lineHeightOffset+=-lineHeightWrap;++lineCount;}
else
{let charData=font.getCharData(id);if(id!=_common_defs__WEBPACK_IMPORTED_MODULE_12__["CHAR_CODE_SPACE"])
{let rect=charData.rect;let yOffset=(font.lineHeight-rect.y2-charData.offset.h)+lineHeightOffset;let additionalOffsetX=0;if(Math.trunc(rect.x2)& 1!==0)
additionalOffsetX=0.5;let additionalOffsetY=0;if(Math.trunc(rect.y2)& 1!==0)
additionalOffsetY=0.5;vertAry[vertAryIndex]=xOffset+charData.offset.w+additionalOffsetX;vertAry[vertAryIndex+1]=yOffset+additionalOffsetY;vertAry[vertAryIndex+2]=0;vertAry[vertAryIndex+3]=rect.x1/textureSize.w;vertAry[vertAryIndex+4]=(rect.y1+rect.y2)/textureSize.h;vertAry[vertAryIndex+5]=xOffset+rect.x2+charData.offset.w+additionalOffsetX;vertAry[vertAryIndex+6]=yOffset+rect.y2+additionalOffsetY;vertAry[vertAryIndex+7]=0;vertAry[vertAryIndex+8]=(rect.x1+rect.x2)/textureSize.w;vertAry[vertAryIndex+9]=rect.y1/textureSize.h;vertAry[vertAryIndex+10]=vertAry[vertAryIndex];vertAry[vertAryIndex+11]=vertAry[vertAryIndex+6];vertAry[vertAryIndex+12]=0;vertAry[vertAryIndex+13]=vertAry[vertAryIndex+3];vertAry[vertAryIndex+14]=vertAry[vertAryIndex+9];vertAry[vertAryIndex+15]=vertAry[vertAryIndex+5];vertAry[vertAryIndex+16]=vertAry[vertAryIndex+1];vertAry[vertAryIndex+17]=0;vertAry[vertAryIndex+18]=vertAry[vertAryIndex+8];vertAry[vertAryIndex+19]=vertAry[vertAryIndex+4];vertAryIndex+=20;if(BUILD_FONT_IBO)
{let arrayIndex=counter*6;let vertIndex=counter*4;indexAry[arrayIndex]=vertIndex;indexAry[arrayIndex+1]=vertIndex+1;indexAry[arrayIndex+2]=vertIndex+2;indexAry[arrayIndex+3]=vertIndex;indexAry[arrayIndex+4]=vertIndex+3;indexAry[arrayIndex+5]=vertIndex+1;}
++counter;}
let inc=charData.xAdvance+this.fontData.fontProp.kerning+font.horzPadding;if(id===_common_defs__WEBPACK_IMPORTED_MODULE_12__["CHAR_CODE_SPACE"])
inc+=this.fontData.fontProp.spaceCharKerning;width+=inc;xOffset+=inc;if(this.fontData.fontStrSize.w<width)
{this.fontData.fontStrSize.w=width;lastCharDif=inc-charData.rect.x2;}
if((id===_common_defs__WEBPACK_IMPORTED_MODULE_12__["CHAR_CODE_SPACE"])&&(this.fontData.fontProp.lineWrapWidth>0))
{let nextWord=0;for(let j=i+1;j<this.fontData.fontString.length;++j)
{id=this.fontData.fontString[j];if(id!=_common_defs__WEBPACK_IMPORTED_MODULE_12__["CHAR_CODE_PIPE"])
{let anotherCharData=font.getCharData(id);if(id===_common_defs__WEBPACK_IMPORTED_MODULE_12__["CHAR_CODE_SPACE"])
break;nextWord+=anotherCharData.xAdvance+this.fontData.fontProp.kerning+font.horzPadding;}
}
if(width+nextWord>=this.fontData.fontProp.lineWrapWidth)
{xOffset=lineWidthOffsetAry[lineCount++];width=0;lineHeightOffset+=-lineHeightWrap;}
}
}
}
this.fontData.fontStrSize.w-=lastCharDif;this.fontData.fontStrSize.h=font.lineHeight;if(this.vbo===null)
this.vbo=_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].createBuffer();_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].ARRAY_BUFFER,this.vbo);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].bufferData(_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].ARRAY_BUFFER,new Float32Array(vertAry),_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].STATIC_DRAW);_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].bindBuffer(_system_device__WEBPACK_IMPORTED_MODULE_11__["gl"].ARRAY_BUFFER,null);this.ibo=_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_3__["vertexBufferManager"].createDynamicFontIBO(_managers_fontmanager__WEBPACK_IMPORTED_MODULE_4__["fontManager"].groupName,'dynamic_font_ibo',indexAry,this.iboCount);}
else if((this.fontData!==null)&&
(fontString!=='')&&
(fontString!==this.fontData.fontString)&&
(this.vbo!==null))
{this.fontData.fontString='';}
}
calcLineWidthOffset(font,str)
{let firstCharOffset=0;let lastCharOffset=0;let spaceWidth=0;let width=0;let counter=0;let lineWidthOffsetAry=[];for(let i=0;i<str.length;++i)
{let id=str.charCodeAt(i);if(id===_common_defs__WEBPACK_IMPORTED_MODULE_12__["CHAR_CODE_PIPE"])
{this.addLineWithToAry(font,lineWidthOffsetAry,this.fontData.fontProp.hAlign,width,firstCharOffset,lastCharOffset);counter=0;width=0;}
else
{let charData=font.getCharData(id);if(counter===0)
firstCharOffset=charData.offset.w;spaceWidth=charData.xAdvance+this.fontData.fontProp.kerning+font.horzPadding;if(id===_common_defs__WEBPACK_IMPORTED_MODULE_12__["CHAR_CODE_SPACE"])
spaceWidth+=this.fontData.fontProp.spaceCharKerning;width+=spaceWidth;if(id!=_common_defs__WEBPACK_IMPORTED_MODULE_12__["CHAR_CODE_SPACE"])
lastCharOffset=charData.offset.w;++counter;}
if((id===_common_defs__WEBPACK_IMPORTED_MODULE_12__["CHAR_CODE_SPACE"])&&(this.fontData.fontProp.lineWrapWidth>0))
{let nextWord=0;for(let j=i+1;j<str.length;++j)
{id=str[j];if(id!=_common_defs__WEBPACK_IMPORTED_MODULE_12__["CHAR_CODE_PIPE"])
{let charData=font.getCharData(id);if(id===_common_defs__WEBPACK_IMPORTED_MODULE_12__["CHAR_CODE_SPACE"])
break;nextWord+=charData.xAdvance+this.fontData.fontProp.kerning+font.horzPadding;}
}
if(width+nextWord>=this.fontData.fontProp.lineWrapWidth)
{this.addLineWithToAry(font,lineWidthOffsetAry,this.fontData.fontProp.hAlign,width-spaceWidth,firstCharOffset,lastCharOffset);counter=0;width=0;}
}
}
this.addLineWithToAry(font,lineWidthOffsetAry,this.fontData.fontProp.hAlign,width,firstCharOffset,lastCharOffset);return lineWidthOffsetAry;}
addLineWithToAry(font,lineWidthOffsetAry,hAlign,width,firstCharOffset,lastCharOffset)
{if(hAlign===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EHA_HORZ_LEFT"])
lineWidthOffsetAry.push(-(firstCharOffset+font.horzPadding));else if(hAlign===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EHA_HORZ_CENTER"])
lineWidthOffsetAry.push(-((width-font.horzPadding)/2));else if(hAlign===_common_defs__WEBPACK_IMPORTED_MODULE_12__["EHA_HORZ_RIGHT"])
lineWidthOffsetAry.push(-(width-lastCharOffset-font.horzPadding));lineWidthOffsetAry[lineWidthOffsetAry.length-1]=Math.trunc(lineWidthOffsetAry[lineWidthOffsetAry.length-1]);}
getFontString()
{if(this.fontData===null)
throw new Error(`Can't ask for the font string from a sprite that is not a sprite font!`);return this.fontData.fontString;}
setFontString(fontString)
{if(this.fontData===null)
throw new Error(`Can't set a font string for a sprite that is not a sprite font!`);this.fontData.fontString=fontString;}
getFontSize()
{if(!this.fontData)
{throw new Error(`Can't ask for the font size from a sprite that is not defined!`);return null;}
return this.fontData.fontStrSize;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"VisualComponent3D",function(){return VisualComponent3D;});var _common_ivisualcomponent__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(56);var _managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(15);var _managers_shadermanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(19);var _managers_texturemanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(6);var _utilities_matrix__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(9);var _common_color__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(36);var _system_device__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(8);var _common_defs__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(5);var gFinalMatrix=new _utilities_matrix__WEBPACK_IMPORTED_MODULE_4__["Matrix"];class VisualComponent3D extends _common_ivisualcomponent__WEBPACK_IMPORTED_MODULE_0__["ivisualComponent"]
{constructor(visualData)
{super();this.visualData=visualData;this.shaderData=null;this.vertexLocation=null;this.normalLocation=null;this.uvLocation=null;this.text0Location=null;this.colorLocation=null;this.matrixLocation=null;this.normalMatrixLocation=null;this.VERTEX_BUF_SIZE=24;this.color=new _common_color__WEBPACK_IMPORTED_MODULE_5__["Color"];if(visualData.isActive())
{this.meshAry=visualData.meshGrp.meshAry;this.shaderData=_managers_shadermanager__WEBPACK_IMPORTED_MODULE_2__["shaderManager"].getShaderData(visualData.shaderID);this.vertexLocation=this.shaderData.getLocation('in_position');this.normalLocation=this.shaderData.getLocation('in_normal');this.matrixLocation=this.shaderData.getLocation('cameraViewProjMatrix');this.normalMatrixLocation=this.shaderData.getLocation('normalMatrix');this.colorLocation=this.shaderData.getLocation('color');if(this.meshAry[0].textureAry.length)
{this.VERTEX_BUF_SIZE=32;this.uvLocation=this.shaderData.getLocation('in_uv');this.text0Location=this.shaderData.getLocation('text0');}
this.color.copy(this.visualData.color);}
}
render(object,camera)
{for(let i=0;i<this.meshAry.length;++i)
{_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_1__["vertexBufferManager"].bind(this.meshAry[i].vbo,this.meshAry[i].ibo);_managers_shadermanager__WEBPACK_IMPORTED_MODULE_2__["shaderManager"].bind(this.shaderData);_system_device__WEBPACK_IMPORTED_MODULE_6__["gl"].vertexAttribPointer(this.vertexLocation,3,_system_device__WEBPACK_IMPORTED_MODULE_6__["gl"].FLOAT,false,this.VERTEX_BUF_SIZE,0);_system_device__WEBPACK_IMPORTED_MODULE_6__["gl"].vertexAttribPointer(this.normalLocation,3,_system_device__WEBPACK_IMPORTED_MODULE_6__["gl"].FLOAT,false,this.VERTEX_BUF_SIZE,12);if(this.uvLocation)
{for(let j=0;j<this.meshAry[i].textureAry.length;++j)
{_managers_texturemanager__WEBPACK_IMPORTED_MODULE_3__["textureManager"].bind(this.meshAry[i].textureAry[j].id);_system_device__WEBPACK_IMPORTED_MODULE_6__["gl"].uniform1i(this.text0Location,0);}
_system_device__WEBPACK_IMPORTED_MODULE_6__["gl"].vertexAttribPointer(this.uvLocation,2,_system_device__WEBPACK_IMPORTED_MODULE_6__["gl"].FLOAT,false,this.VERTEX_BUF_SIZE,24);}
_system_device__WEBPACK_IMPORTED_MODULE_6__["gl"].uniform4fv(this.colorLocation,this.color.data);gFinalMatrix.initilizeMatrix();gFinalMatrix.mergeMatrix(object.matrix.matrix);gFinalMatrix.mergeMatrix(camera.finalMatrix.matrix);_system_device__WEBPACK_IMPORTED_MODULE_6__["gl"].uniformMatrix4fv(this.matrixLocation,false,gFinalMatrix.matrix);gFinalMatrix.initilizeMatrix();gFinalMatrix.mergeMatrix(object.rotMatrix.matrix);gFinalMatrix.mergeMatrix(camera.rotMatrix.matrix);_system_device__WEBPACK_IMPORTED_MODULE_6__["gl"].uniformMatrix4fv(this.normalMatrixLocation,false,gFinalMatrix.matrix);_system_device__WEBPACK_IMPORTED_MODULE_6__["gl"].drawElements(_system_device__WEBPACK_IMPORTED_MODULE_6__["gl"].TRIANGLES,this.meshAry[i].iboCount,_system_device__WEBPACK_IMPORTED_MODULE_6__["gl"].UNSIGNED_SHORT,0);}
}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"PhysicsComponent2D",function(){return PhysicsComponent2D;});var _physicsworldmanager__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(66);var _common_size__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(4);var _Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(42);var _Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__);class PhysicsComponent2D
{constructor(physicsData)
{this.bodyType=null;this.body=null;this.pixelsToMeters=0;this.metersToPixels=0;this.world=null;this.staticBody=false;if(physicsData.isActive())
{this.world=_physicsworldmanager__WEBPACK_IMPORTED_MODULE_0__["physicsWorldManager"].getWorld(physicsData.world);this.metersToPixels=this.world.pixelsPerMeter;this.pixelsToMeters=1.0/this.metersToPixels;}
}
init(sprite)
{if(this.world!==null)
{this.createBody(sprite);this.createFixture(sprite);}
}
createBody(sprite)
{if(!this.body)
{let physicsData=sprite.objData.physicsData;let worldDef={type:physicsData.bodyType,position:_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Vec2"](sprite.object.pos.x*this.pixelsToMeters,-(sprite.object.pos.y*this.pixelsToMeters)),angle:-sprite.object.rot.z,linearVelocity:_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Vec2"].zero(),angularVelocity:0.0,linearDamping:physicsData.linearDamping,angularDamping:physicsData.angularDamping,fixedRotation:physicsData.fixedRotation,bullet:false,gravityScale:1.0,allowSleep:true,awake:true,active:true,userData:sprite };this.body=this.world.createBody(worldDef);if(physicsData.bodyType==='static')
this.staticBody=true;}
}
createFixture(sprite)
{let fixtureAry=sprite.objData.physicsData.fixtureAry;for(let i=0;i<fixtureAry.length;++i)
{if(fixtureAry[i].shape===_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Circle"].TYPE)
this.createCircularShapeFixture(sprite,fixtureAry[i]);else if(fixtureAry[i].shape===_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Edge"].TYPE)
this.createEdgeShapeFixture(sprite,fixtureAry[i]);else if(fixtureAry[i].shape===_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Polygon"].TYPE)
this.createPolygonShapeFixture(sprite,fixtureAry[i]);else if(fixtureAry[i].shape===_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Chain"].TYPE)
this.createChainShapeFixture(sprite,fixtureAry[i]);}
}
getFixtureDef(sprite,fixture)
{let fixtureDef={userData:sprite,friction:fixture.friction,restitution:fixture.restitution,density:fixture.density,isSensor:fixture.sensor,filterGroupIndex:0,filterCategoryBits:0x0001,filterMaskBits:0xFFFF };return fixtureDef;}
createCircularShapeFixture(sprite,fixture)
{this.body.createFixture(
_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Circle"]((fixture.radius*sprite.object.scale.x)*this.pixelsToMeters),this.getFixtureDef(sprite,fixture));}
createEdgeShapeFixture(sprite,fixture)
{if(fixture.vertAry.length!==2)
throw new Error(`Physics object has incorrect number of points defined(${fixture.vertAry.length})!`);let size=new _common_size__WEBPACK_IMPORTED_MODULE_1__["Size"](
sprite.objData.size.w*sprite.object.scale.x*0.5,sprite.objData.size.h*sprite.object.scale.y*0.5);let Vec2Ary=[];this.convertPoints(Vec2Ary,fixture,size,sprite.object.scale);this.body.createFixture(
_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Edge"](Vec2Ary[0],Vec2Ary[1]),this.getFixtureDef(sprite,fixture));}
createPolygonShapeFixture(sprite,fixture)
{let Vec2Ary=[];let size=new _common_size__WEBPACK_IMPORTED_MODULE_1__["Size"](
sprite.objData.size.w*sprite.object.scale.x*0.5,sprite.objData.size.h*sprite.object.scale.y*0.5);if(fixture.vertAry.length)
{this.convertPoints(Vec2Ary,fixture,size,sprite.object.scale);}
else
{let topMod=fixture.topMod*sprite.object.scale.y;let bottomMod=-fixture.bottomMod*sprite.object.scale.y;let leftMod=-fixture.leftMod*sprite.object.scale.x;let rightMod=fixture.rightMod*sprite.object.scale.x;Vec2Ary.push(
_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Vec2"](
(-size.w+leftMod)*this.pixelsToMeters,(size.h+topMod)*this.pixelsToMeters));Vec2Ary.push(
_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Vec2"](
(-size.w+leftMod)*this.pixelsToMeters,(-size.h+bottomMod)*this.pixelsToMeters));Vec2Ary.push(
_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Vec2"](
(size.w+rightMod)*this.pixelsToMeters,(-size.h+bottomMod)*this.pixelsToMeters));Vec2Ary.push(
_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Vec2"](
(size.w+rightMod)*this.pixelsToMeters,(size.h+topMod)*this.pixelsToMeters));}
this.body.createFixture(
_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Polygon"](Vec2Ary),this.getFixtureDef(sprite,fixture));}
createChainShapeFixture(sprite,fixture)
{if(fixture.vertAry.length>1)
throw new Error(`Physics object has incorrect number of points defined(${fixture.vertAry.length})!`);let size=new _common_size__WEBPACK_IMPORTED_MODULE_1__["Size"](
sprite.objData.size.w*sprite.object.scale.x*0.5,sprite.objData.size.h*sprite.object.scale.y*0.5);let Vec2Ary=[];this.convertPoints(Vec2Ary,fixture,size,sprite.object.scale);this.body.createFixture(
_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Chain"](Vec2Ary,fixture.chainLoop),this.getFixtureDef(sprite,fixture));}
convertPoints(polyPointAry,fixture,size,scale)
{for(let i=0;i<fixture.vertAry.length;++i)
{polyPointAry.push(
_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Vec2"](((fixture.vertAry[i].x*scale.x)-size.w)*this.pixelsToMeters,((fixture.vertAry[i].y*scale.y)-size.h)*this.pixelsToMeters));}
}
update(sprite)
{if(this.isActive())
{if(!this.staticBody && this.body.isAwake())
{let pos=this.body.getPosition();let angle=this.body.getAngle();sprite.object.setPosXYZ(pos.x*this.metersToPixels,-(pos.y*this.metersToPixels));sprite.object.setRotXYZ(0,0,-angle,false);}
}
}
isActive()
{return(this.body!==null);}
destroyBody()
{if(this.body!==null)
{this.world.destroyBody(this.body);this.body=null;}
}
setTransform(x,y,angle,resetVelocity)
{if(this.body!==null)
{this.body.setTransform(_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Vec2"](x*this.pixelsToMeters,-(y*this.pixelsToMeters)),angle);if(resetVelocity)
{this.body.setLinearVelocity(_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Vec2"].zero());this.body.setAngularVelocity(0);}
}
}
setLinearVelocity(x,y)
{if(this.body!==null)
this.body.setLinearVelocity(_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Vec2"](x*this.pixelsToMeters,-(y*this.pixelsToMeters)));}
setAngularVelocity(value)
{if(this.body!==null)
this.body.setAngularVelocity(value);}
applyAngularImpulse(value,wake=false)
{if(this.body!==null)
this.body.applyAngularImpulse(value,wake);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"physicsWorldManager",function(){return physicsWorldManager;});var _managers_managerbase__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(31);var _physicsworld2d__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(67);var _physicsworld3d__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(69);const LOAD_2D=0;const LOAD_3D=1;class PhysicsWorldManager extends _managers_managerbase__WEBPACK_IMPORTED_MODULE_0__["ManagerBase"]
{constructor()
{super();this.worldMap=new Map;}
loadWorldGroup2D(group,finishCallback)
{this.loadWorldGroup(LOAD_2D,group,finishCallback);}
loadWorldGroup3D(group,finishCallback)
{this.loadWorldGroup(LOAD_3D,group,finishCallback);}
loadWorldGroup(loadType,group,finishCallback)
{let pathAry=this.listTableMap.get(group);if(pathAry!==undefined)
{if(this.worldMap.get(group)===undefined)
{if(loadType===LOAD_2D)
this.worldMap.set(group,new _physicsworld2d__WEBPACK_IMPORTED_MODULE_1__["PhysicsWorld2D"]);else
this.worldMap.set(group,new _physicsworld3d__WEBPACK_IMPORTED_MODULE_2__["PhysicsWorld3D"]);let filePath=pathAry[0];this.downloadFile('xml',group,filePath,finishCallback,(group,xmlNode,filePath,finishCallback)=>
{this.loadFromNode(group,xmlNode,filePath);});if(this.loadCounter===0)
finishCallback();}
else
{throw new Error(`Physics world group has alread been loaded(${group})!`);}
}
else
{throw new Error(`Physics world list group name can't be found(${group})!`);}
}
loadFromNode(group,node,filePath)
{let world=this.worldMap.get(group);if(world===undefined)
throw new Error(`Physics World doesn't exist(${group},${filePath})!`);world.loadFromNode(node);}
getWorld(group)
{let world=this.worldMap.get(group);if(world===undefined)
throw new Error(`Physics World doesn't exist(${group})!`);return world;}
destroyWorld(group)
{this.worldMap.delete(group);}
}
var physicsWorldManager=new PhysicsWorldManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"PhysicsWorld2D",function(){return PhysicsWorld2D;});var _utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(68);var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(18);var _Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(42);var _Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__);class PhysicsWorld2D
{constructor()
{this.world=_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["World"]();this.bodyAry=[];this.active=false;this.beginStep=0;this.timer=0;this.stepTime=0;this.stepTimeSec=0;this.velStepCount=0;this.posStepCount=0;this.pixelsPerMeter=0;}
loadFromNode(node)
{let settingsNode=node.getElementsByTagName("settings");if(settingsNode.length)
{let attr=settingsNode[0].getAttribute('active');if(attr)
this.active=(attr==='true');}
let gravityNode=node.getElementsByTagName("gravity");if(gravityNode.length)
{let gravity=_Box2D_planck_min__WEBPACK_IMPORTED_MODULE_2__["Vec2"](
Number(gravityNode[0].getAttribute("x")),Number(gravityNode[0].getAttribute("y")));this.world.setGravity(gravity);}
let steppingNode=node.getElementsByTagName("stepping");if(steppingNode.length)
{this.velStepCount=Number(steppingNode[0].getAttribute("velocity"));this.posStepCount=Number(steppingNode[0].getAttribute("position"));let fps=Number(steppingNode[0].getAttribute("fps"));this.setFPS(fps);}
let conversionNode=node.getElementsByTagName("conversion");if(conversionNode.length)
this.pixelsPerMeter=Number(conversionNode[0].getAttribute("pixelsPerMeter"));}
createBody(def)
{let body=this.world.createBody(def);if(body===null)
throw new Error(`Error creating physics body!`);this.bodyAry.push(body);return body;}
destroyBody(body)
{let index=this.bodyAry.indexOf(body);if(index!==-1)
{this.world.destroyBody(body);this.bodyAry.splice(index,1);}
}
fixedTimeStep()
{if(this.active)
{this.timer+=_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime;if(this.timer>this.stepTime)
{this.timer=_utilities_genfunc__WEBPACK_IMPORTED_MODULE_1__["modulus"](this.timer,this.stepTime);this.world.step(this.stepTimeSec,this.velStepCount,this.posStepCount);}
}
}
variableTimeStep()
{if(this.active)
{this.world.step(_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime/1000.0,this.velStepCount,this.posStepCount);}
}
setFPS(fps)
{if(fps>1.0)
{this.stepTimeSec=1.0/fps;this.stepTime=this.stepTimeSec*1000.0;this.timer=this.stepTime;}
}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"highResTimer",function(){return highResTimer;});class HighResTimer
{constructor()
{this.lastTime=performance.now();this.timer;this.elapsedTime;this.fps;}
timerStart()
{this.timer=performance.now();}
timerStop()
{return(performance.now()-this.timer);}
calcElapsedTime()
{let time=performance.now();this.elapsedTime=time-this.lastTime;this.fps=1000.0/this.elapsedTime;if(this.elapsedTime>100.0)
this.elapsedTime=100.0;this.lastTime=time;}
}
var highResTimer=new HighResTimer;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"PhysicsWorld3D",function(){return PhysicsWorld3D;});class PhysicsWorld3D
{constructor()
{}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ScriptComponent",function(){return ScriptComponent;});class ScriptComponent
{constructor()
{this.scriptAry=[];}
set(script)
{this.scriptAry.push(script);}
update()
{for(let i=this.scriptAry.length-1;i>-1;--i)
{this.scriptAry[i].execute();if(this.scriptAry[i].isFinished())
this.scriptAry.splice(i,1);}
}
isActive()
{return(this.scriptAry.length>0);}
reset()
{this.scriptAry=[];}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"SpriteData",function(){return SpriteData;});var _common_fontdata__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(57);var _script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(25);var _common_defs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(5);class SpriteData
{constructor(xmlNode,defGroup,defObjName,defAIName="",defId=_common_defs__WEBPACK_IMPORTED_MODULE_2__["SPRITE_DEFAULT_ID"])
{this.xmlNode=xmlNode;this.name=null;this.group=defGroup;this.objectName=defObjName;this.aiName=defAIName;this.id=defId;this.spriteType=_common_defs__WEBPACK_IMPORTED_MODULE_2__["EST_NULL"];let attr=xmlNode.getAttribute('name');if(attr)
this.name=attr;attr=xmlNode.getAttribute('group');if(attr)
this.group=attr;attr=xmlNode.getAttribute('objectName');if(attr)
this.objectName=attr;attr=xmlNode.getAttribute('aiName');if(attr!==null)
this.aiName=attr;attr=xmlNode.getAttribute("id");if(attr)
this.id=Number(attr);if(xmlNode.nodeName=='object2d')
this.spriteType=_common_defs__WEBPACK_IMPORTED_MODULE_2__["EST_OBJECT2D"];else if(xmlNode.nodeName=='object3d')
this.spriteType=_common_defs__WEBPACK_IMPORTED_MODULE_2__["EST_OBJECT3D"];else if(xmlNode.nodeName=='sprite2d')
this.spriteType=_common_defs__WEBPACK_IMPORTED_MODULE_2__["EST_SPRITE2D"];else if(xmlNode.nodeName=='sprite3d')
this.spriteType=_common_defs__WEBPACK_IMPORTED_MODULE_2__["EST_SPRITE3D"];}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"UIControlNavNode",function(){return UIControlNavNode;});var _uicontrol__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(73);var _common_defs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);class UIControlNavNode
{constructor(uiControl=null)
{this.uiControl=uiControl;this.upNode=null;this.downNode=null;this.leftNode=null;this.rightNode=null;}
setNode(navId,node)
{if(navId===_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENAV_NODE_UP"])
this.upNode=node;else if(navId===_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENAV_NODE_DOWN"])
this.downNode=node;else if(navId===_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENAV_NODE_LEFT"])
this.leftNode=node;else if(navId===_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENAV_NODE_RIGHT"])
this.rightNode=node;}
getNode(navNode)
{if(navNode===_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENAV_NODE_UP"])
return this.upNode;else if(navNode===_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENAV_NODE_DOWN"])
return this.downNode;else if(navNode===_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENAV_NODE_LEFT"])
return this.leftNode;else if(navNode===_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENAV_NODE_RIGHT"])
return this.rightNode;return null;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"UIControl",function(){return UIControl;});var _controlbase__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(74);var _scrollparam__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(53);var _sprite_sprite__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(54);var _common_size__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(4);var _common_point__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(11);var _common_quad__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(75);var _common_rect__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(29);var _utilities_matrix__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(9);var _utilities_settings__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(3);var _objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(30);var _managers_eventmanager__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(26);var _managers_actionmanager__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(47);var _script_scriptcomponent__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(70);var _script_scriptmanager__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(25);var _utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(35);var _common_defs__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(5);class UIControl extends _controlbase__WEBPACK_IMPORTED_MODULE_0__["ControlBase"]
{constructor(group)
{super(group);this.spriteAry=[];this.scriptComponent=new _script_scriptcomponent__WEBPACK_IMPORTED_MODULE_12__["ScriptComponent"];this.defaultState;this.state=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_NULL"];this.lastState=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_NULL"];this.executionAction;this.actionType=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_NULL"];this.size=new _common_size__WEBPACK_IMPORTED_MODULE_3__["Size"];this.sizeModifier=new _common_rect__WEBPACK_IMPORTED_MODULE_6__["Rect"];this.collisionQuad=new _common_quad__WEBPACK_IMPORTED_MODULE_5__["Quad"];this.collisionCenter=new _common_point__WEBPACK_IMPORTED_MODULE_4__["Point"];this.smartGui=null;this.mouseSelectType=_common_defs__WEBPACK_IMPORTED_MODULE_15__["EAP_UP"];this.scriptFactoryMap=new Map;this.scrollParam=null;this.executionActionCallback=null;}
loadFromNode(xmlNode)
{super.loadFromNode(xmlNode);let attr=xmlNode.getAttribute('defaultState');if(attr)
this.setDefaultState(attr);attr=xmlNode.getAttribute('mouseSelectDown');if(attr &&(attr==='true'))
this.mouseSelectType=_common_defs__WEBPACK_IMPORTED_MODULE_15__["EAP_DOWN"];let actionNode=xmlNode.getElementsByTagName('action');if(actionNode.length)
{attr=actionNode[0].getAttribute('actionType')
if(attr)
this.setActionType(attr);attr=actionNode[0].getAttribute('executionAction')
if(attr)
this.executionAction=attr;}
let stateScriptNode=xmlNode.getElementsByTagName('stateScript');if(stateScriptNode.length)
{let attr=stateScriptNode[0].getAttribute("onDisabled");if(attr)
this.scriptFactoryMap.set(_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_DISABLED"],_script_scriptmanager__WEBPACK_IMPORTED_MODULE_13__["scriptManager"].get(attr)(this));attr=stateScriptNode[0].getAttribute("onInactive");if(attr)
this.scriptFactoryMap.set(_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_INACTIVE"],_script_scriptmanager__WEBPACK_IMPORTED_MODULE_13__["scriptManager"].get(attr)(this));attr=stateScriptNode[0].getAttribute("onActive");if(attr)
this.scriptFactoryMap.set(_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_ACTIVE"],_script_scriptmanager__WEBPACK_IMPORTED_MODULE_13__["scriptManager"].get(attr)(this));attr=stateScriptNode[0].getAttribute("onSelect");if(attr)
this.scriptFactoryMap.set(_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_SELECTED"],_script_scriptmanager__WEBPACK_IMPORTED_MODULE_13__["scriptManager"].get(attr)(this));}
let scrollParamNode=xmlNode.getElementsByTagName('scroll');if(scrollParamNode.length)
{this.scrollParam=new _scrollparam__WEBPACK_IMPORTED_MODULE_1__["ScrollParam"];this.scrollParam.loadFromNode(scrollParamNode);}
this.sizeModifier=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_14__["loadRect"](xmlNode);this.revertToDefaultState();}
loadControlFromNode(xmlNode)
{let spriteNode=xmlNode.getElementsByTagName('sprite');if(spriteNode.length)
{let fontSpriteCount=[0];for(let i=0;i<spriteNode.length;++i)
this.loadSpriteFromNode(spriteNode[i],fontSpriteCount);}
}
loadSpriteFromNode(xmlNode,fontSpriteCount)
{let objectName=xmlNode.getAttribute('objectName');let sprite=new _sprite_sprite__WEBPACK_IMPORTED_MODULE_2__["Sprite"](_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_9__["objectDataManager"].getData(this.group,objectName));this.spriteAry.push(sprite);sprite.load(xmlNode);if(sprite.visualComponent.isFontSprite())
{if(this.stringAry.length &&(fontSpriteCount[0]<this.stringAry.length)&&(sprite.visualComponent.fontData.fontString===''))
{sprite.visualComponent.setFontString(this.stringAry[fontSpriteCount[0]]);++fontSpriteCount[0];}
sprite.visualComponent.color=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_14__["loadColor"](xmlNode,sprite.visualComponent.color);}
else
{let width=sprite.objData.size.w+Math.abs(sprite.object.pos.x);let height=sprite.objData.size.h+Math.abs(sprite.object.pos.y);if(width>this.size.w)
this.size.w=width;if(height>this.size.h)
this.size.h=height;}
}
update()
{this.scriptComponent.update();for(let i=0;i<this.spriteAry.length;++i)
this.spriteAry[i].update();}
transform(object=null)
{if(object)
super.transform(object);else
super.transform();for(let i=0;i<this.spriteAry.length;++i)
this.spriteAry[i].object.transform(this);this.transformCollision();}
transformCollision()
{if(this.wasWorldPosTranformed()&&!this.size.isEmpty())
{let finalMatrix=new _utilities_matrix__WEBPACK_IMPORTED_MODULE_7__["Matrix"](this.matrix);finalMatrix.scaleFromValue(_utilities_settings__WEBPACK_IMPORTED_MODULE_8__["settings"].orthoAspectRatio.h);finalMatrix.invertY();let screenHalf=_utilities_settings__WEBPACK_IMPORTED_MODULE_8__["settings"].size_half;let halfwidth=this.size.w*0.5;let halfHeight=this.size.h*0.5;let quad=new _common_quad__WEBPACK_IMPORTED_MODULE_5__["Quad"];quad.point[0].x=-halfwidth+-this.sizeModifier.x1;quad.point[0].y=-halfHeight+-this.sizeModifier.y1;quad.point[1].x=halfwidth+this.sizeModifier.x2;quad.point[1].y=-halfHeight+-this.sizeModifier.y1;quad.point[2].x=halfwidth+this.sizeModifier.x2;quad.point[2].y=halfHeight+this.sizeModifier.y2;quad.point[3].x=-halfwidth+-this.sizeModifier.x1;quad.point[3].y=halfHeight+this.sizeModifier.y2;finalMatrix.transformQuad(this.collisionQuad,quad);this.collisionQuad.point[0].x+=screenHalf.w;this.collisionQuad.point[0].y+=screenHalf.h;this.collisionQuad.point[1].x+=screenHalf.w;this.collisionQuad.point[1].y+=screenHalf.h;this.collisionQuad.point[2].x+=screenHalf.w;this.collisionQuad.point[2].y+=screenHalf.h;this.collisionQuad.point[3].x+=screenHalf.w;this.collisionQuad.point[3].y+=screenHalf.h;finalMatrix.transformPoint(this.collisionCenter,new _common_point__WEBPACK_IMPORTED_MODULE_4__["Point"]);this.collisionCenter.x+=screenHalf.w;this.collisionCenter.y+=screenHalf.h;}
}
render(camera)
{for(let i=0;i<this.spriteAry.length;++i)
this.spriteAry[i].render(camera);}
handleEvent(event)
{if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_15__["EGE_MENU_CONTROL_STATE_CHANGE"])
{this.onStateChange(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_15__["EGE_MENU_SELECT_EXECUTE"])
{this.onSelectExecute(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_15__["EGE_MENU_SET_ACTIVE_CONTROL"])
{this.onSetActiveControl(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_15__["EGE_MENU_REACTIVATE"])
{this.onReactivate(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_15__["EGE_MENU_TRANS_IN"])
{this.onTransIn(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_15__["EGE_MENU_TRANS_OUT"])
{this.onTransOut(event);}
this.smartHandleEvent(event);}
onTransIn(event)
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ETC_BEGIN"])
{if(this.lastState!=this.state)
this.setDisplayState();}
}
onTransOut(event)
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ETC_BEGIN"])
{this.reset();this.resetSpriteScript();if(this.lastState!=this.state)
this.setDisplayState();}
}
onStateChange(event)
{if(event.detail.arg[1]===this)
this.changeState(event.detail.arg[0]);else
this.deactivateControl();}
onSelectExecute(event)
{if(this.state===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_SELECTED"])
{if(this.actionType===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_TO_TREE"])
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_10__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_15__["EGE_MENU_TO_TREE"],this.executionAction);else if(this.actionType===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_TO_MENU"])
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_10__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_15__["EGE_MENU_TO_MENU"],this.executionAction,this);else if(this.actionType===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_BACK"])
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_10__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_15__["EGE_MENU_BACK_ACTION"]);else if(this.actionType===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_CLOSE"])
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_10__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_15__["EGE_MENU_TOGGLE_ACTION"]);else if(this.actionType===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_GAME_STATE_CHANGE"])
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_10__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_15__["EGE_MENU_GAME_STATE_CHANGE"],_common_defs__WEBPACK_IMPORTED_MODULE_15__["ETC_BEGIN"],this.executionAction);this.smartExecuteAction();if(this.executionActionCallback!==null)
for(let i=0;i<this.executionActionCallback.length;++i)
this.executionActionCallback[i](this);}
}
onSetActiveControl(event)
{if((event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_15__["EAC_LAST_ACTIVE_CONTROL"])&&
(this.lastState>_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_INACTIVE"]))
{this.lastState=this.state=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_ACTIVE"];if(!_managers_actionmanager__WEBPACK_IMPORTED_MODULE_11__["actionManager"].wasLastDeviceMouse())
{this.resetSpriteScript();this.setDisplayState();}
}
}
onReactivate(event)
{if(this.state>_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_INACTIVE"])
{this.lastState=this.state=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_ACTIVE"];if(!_managers_actionmanager__WEBPACK_IMPORTED_MODULE_11__["actionManager"].wasLastDeviceMouse()||
this.isPointInControl(_managers_eventmanager__WEBPACK_IMPORTED_MODULE_10__["eventManager"].mouseX,_managers_eventmanager__WEBPACK_IMPORTED_MODULE_10__["eventManager"].mouseY))
{this.resetSpriteScript();this.setDisplayState();}
}
}
onMouseMove(event)
{let result=false;if(!this.isDisabled()&& this.isPointInControl(event.clientX+_managers_eventmanager__WEBPACK_IMPORTED_MODULE_10__["eventManager"].mouseOffsetX,event.clientY+_managers_eventmanager__WEBPACK_IMPORTED_MODULE_10__["eventManager"].mouseOffsetY))
{result=true;if(!this.isActive())
{_managers_eventmanager__WEBPACK_IMPORTED_MODULE_10__["eventManager"].dispatchEvent(
_common_defs__WEBPACK_IMPORTED_MODULE_15__["EGE_MENU_CONTROL_STATE_CHANGE"],_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_ACTIVE"],this);}
}
return result;}
changeState(state)
{if(this.state!==state)
{this.state=state;this.prepareControlScriptFactory(this.state);this.resetSpriteScript();this.setDisplayState();this.lastState=this.state;}
}
activateControl()
{if(!this.isDisabled())
{this.lastState=this.state=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_ACTIVE"];this.resetSpriteScript();this.setDisplayState();return true;}
return false;}
deactivateControl()
{if((this.lastState===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_NULL"])||
(this.lastState>_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_INACTIVE"]))
{this.reset();this.resetSpriteScript();this.setDisplayState();this.lastState=this.state;}
}
disableControl()
{if((this.lastState===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_NULL"])||
(this.lastState>_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_DISABLED"]))
{this.lastState=this.state=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_DISABLED"];this.resetSpriteScript();this.setDisplayState();}
}
enableControl()
{if(this.lastState<=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_DISABLED"])
{this.lastState=this.state=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_INACTIVE"];this.resetSpriteScript();this.setDisplayState();}
}
setDisplayState()
{this.prepareSpriteScriptFactoryFunction(this.state);}
init()
{for(let i=0;i<this.spriteAry.length;++i)
this.spriteAry[i].init();this.prepareSpriteScriptFactoryFunction(_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_INIT"]);}
cleanUp()
{for(let i=0;i<this.spriteAry.length;++i)
this.spriteAry[i].cleanUp();}
prepareSpriteScriptFactoryFunction(controlState)
{let scriptFactoryMapKey;let forceUpdate=false;switch(controlState)
{case _common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_INIT"]:
scriptFactoryMapKey="init";forceUpdate=true;break;case _common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_DISABLED"]:
scriptFactoryMapKey="disabled";forceUpdate=true;break;case _common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_INACTIVE"]:
scriptFactoryMapKey="inactive";forceUpdate=true;break;case _common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_ACTIVE"]:
scriptFactoryMapKey="active";break;case _common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_SELECTED"]:
scriptFactoryMapKey="selected";break;};this.prepareSpriteScriptFactory(scriptFactoryMapKey,forceUpdate);}
prepareSpriteScriptFactory(scriptFactoryMapKey,forceUpdate)
{for(let i=0;i<this.spriteAry.length;++i)
this.spriteAry[i].prepareScript(scriptFactoryMapKey,forceUpdate);}
prepareControlScriptFactory(controlState)
{let script=this.scriptFactoryMap.get(controlState);if(script)
{script.init();this.scriptComponent.set(script);}
}
reset(complete=false)
{if(this.state>_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_INACTIVE"])
this.state=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_INACTIVE"];if(complete)
this.lastState=this.state;}
resetSpriteScript()
{for(let i=0;i<this.spriteAry.length;++i)
this.spriteAry[i].scriptComponent.reset();}
setDefaultState(value)
{if(value==='inactive')
this.defaultState=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_INACTIVE"];else if(value==='active')
this.defaultState=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_ACTIVE"];else if(value==='disabled')
this.defaultState=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_DISABLED"];else if(value==='selected')
this.defaultState=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_SELECTED"];}
smartCreate()
{if(this.smartGui)
this.smartGui.create();}
smartHandleEvent(event)
{if(this.smartGui)
this.smartGui.handleEvent(event);}
smartExecuteAction()
{if(this.smartGui)
this.smartGui.execute();}
revertToDefaultState()
{this.state=this.defaultState;}
setState(state,setLastState)
{this.state=state;if(setLastState)
this.lastState=state;}
setActionType(value)
{if(value==='action')
this.actionType=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_ACTION"];else if(value==='to_tree')
this.actionType=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_TO_TREE"];else if(value==='to_menu')
this.actionType=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_TO_MENU"];else if(value==='back')
this.actionType=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_BACK"];else if(value==='close')
this.actionType=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_CLOSE"];else if(value==='change_focus')
this.actionType=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_CHANGE_FOCUS"];else if(value==='game_state_change')
this.actionType=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_GAME_STATE_CHANGE"];else if(value==='quit_game')
this.actionType=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECAT_QUIT_GAME"];}
createFontStr(fontString,spriteIndex=0)
{let fontSpriteCounter=0;for(let i=0;i<this.spriteAry.length;++i)
{if(this.spriteAry[i].visualComponent.isFontSprite())
{if(fontSpriteCounter===spriteIndex)
{this.spriteAry[i].visualComponent.createFontString(fontString);break;}
++fontSpriteCounter;}
}
}
createFontString(stringIndex=0,spriteIndex=0)
{if(this.stringAry.length)
this.createFontStr(this.stringAry[stringIndex],spriteIndex);}
setFontString(fontString,spriteIndex=0)
{let fontSpriteCounter=0;for(let i=0;i<this.spriteAry.length;++i)
{if(this.spriteAry[i].visualComponent.isFontSprite())
{if(fontSpriteCounter===spriteIndex)
{this.spriteAry[i].visualComponent.setFontString(fontString);break;}
++fontSpriteCounter;}
}
}
handleSelectAction(event)
{if((this.isSelectable()&&
(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_15__["ESMA_DEVICE_TYPE"]]===_common_defs__WEBPACK_IMPORTED_MODULE_15__["MOUSE"])&&
(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_15__["ESMA_PRESS_TYPE"]]===this.mouseSelectType)&&
this.isPointInControl(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_15__["ESMA_MOUSE_X"]],event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_15__["ESMA_MOUSE_Y"]]))||
(this.isActive()&&(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_15__["ESMA_DEVICE_TYPE"]]!==_common_defs__WEBPACK_IMPORTED_MODULE_15__["MOUSE"])&&(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_15__["ESMA_PRESS_TYPE"]]===_common_defs__WEBPACK_IMPORTED_MODULE_15__["EAP_DOWN"])))
{_managers_eventmanager__WEBPACK_IMPORTED_MODULE_10__["eventManager"].dispatchEvent(
_common_defs__WEBPACK_IMPORTED_MODULE_15__["EGE_MENU_CONTROL_STATE_CHANGE"],_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_SELECTED"],this);return true;}
return false;}
activateFirstInactiveControl()
{if(_managers_actionmanager__WEBPACK_IMPORTED_MODULE_11__["actionManager"].wasLastDeviceMouse())
{if(!this.isDisabled())
{this.lastState=this.state=_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_ACTIVE"];return true;}
return false;}
return this.activateControl();}
isPointInControl(x,y)
{return this.collisionQuad.isPointInQuad(x,y);}
findControlByName(name)
{if(this.name===name)
return this;return null;}
findControlByRef(ctrl)
{if(ctrl===this)
return this;return null;}
setStringToList(str)
{this.stringAry.push(str);}
isDisabled()
{return this.state===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_DISABLED"];}
isInactive()
{return this.state===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_INACTIVE"];}
isActive()
{return(this.state===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_ACTIVE"]);}
isSelected()
{return(this.state===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_SELECTED"]);}
isSelectable()
{return((this.state===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_INACTIVE"])||(this.state===_common_defs__WEBPACK_IMPORTED_MODULE_15__["ECS_ACTIVE"]));}
isSubControl()
{return false;}
connect_ExecutionAction(callback)
{if(this.executionActionCallback===null)
this.executionActionCallback=[];this.executionActionCallback.push(callback);}
getActiveControl()
{return this;}
setAlpha(alpha)
{for(let i=0;i<this.spriteAry.length;++i)
this.spriteAry[i].setAlpha(alpha);}
canScroll(msg)
{if(this.isActive()&& this.scrollParam && this.scrollParam.canScroll(msg))
return true;return false;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ControlBase",function(){return ControlBase;});var _2d_object2d__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(51);var _utilities_settings__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3);var _common_dynamicoffset__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(37);var _utilities_assetholder__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(39);var _utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(35);class ControlBase extends _2d_object2d__WEBPACK_IMPORTED_MODULE_0__["Object2D"]
{constructor(group)
{super();this.group=group;this.name=null;this.type=null;this.stringAry=[];this.faction=null;this.dynamicOffset=null;}
loadFromNode(xmlNode)
{let attr=xmlNode.getAttribute('name');if(attr)
this.name=attr;attr=xmlNode.getAttribute('faction');if(attr)
this.faction=attr;this.loadTransFromNode(xmlNode);this.loadDynamicOffsetFromNode(xmlNode);let stringLstNode=xmlNode.getElementsByTagName('fontStringLst');if(stringLstNode.length)
{let stringNode=stringLstNode[0].getElementsByTagName('string');for(let i=0;i<stringNode.length;++i)
this.stringAry.push(stringNode[i].getAttribute('text'));}
let filePathNode=xmlNode.getElementsByTagName('filePath');if(filePathNode.length)
{let controlFilePath=filePathNode[0].getAttribute('file');this.loadControlFromNode(_utilities_assetholder__WEBPACK_IMPORTED_MODULE_3__["assetHolder"].get(this.group,controlFilePath));}
else if(xmlNode.getElementsByTagName('spriteLst').length)
{this.loadControlFromNode(xmlNode);}
}
loadControlFromNode(xmlNode)
{}
loadDynamicOffsetFromNode(xmlNode)
{this.dynamicOffset=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_4__["loadDynamicOffset"](xmlNode);this.setDynamicPos();}
setDynamicPos()
{if(this.dynamicOffset)
this.setPos(this.dynamicOffset.getPos(_utilities_settings__WEBPACK_IMPORTED_MODULE_1__["settings"].defaultSize_half));}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Quad",function(){return Quad;});var _common_point__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(11);class Quad
{constructor()
{this.point=[new _common_point__WEBPACK_IMPORTED_MODULE_0__["Point"],new _common_point__WEBPACK_IMPORTED_MODULE_0__["Point"],new _common_point__WEBPACK_IMPORTED_MODULE_0__["Point"],new _common_point__WEBPACK_IMPORTED_MODULE_0__["Point"]];}
isPointInQuad(x,y)
{let result=false;for(let i=0,j=3;i<4;j=i++)
{if(((this.point[i].y>y)!=(this.point[j].y>y))&& 
(x<(this.point[j].x-this.point[i].x)*(y-this.point[i].y)/(this.point[j].y-this.point[i].y)+this.point[i].x))
{result=!result;}
}
return result;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"create",function(){return create;});var _managers_signalmanager__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2);var _uilabel__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(77);var _uibutton__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(78);var _uisubcontrol__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(79);var _uibuttonlist__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(80);var _uicheckbox__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(81);var _uislider__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(82);var _uiscrollbox__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(83);var _uimeter__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(84);var _uiprogressbar__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(86);function create(node,group)
{let control=null;let ctrlType=node.getAttribute('controlType');if(ctrlType==='label')
control=new _uilabel__WEBPACK_IMPORTED_MODULE_1__["UILabel"](group);else if(ctrlType==='button')
control=new _uibutton__WEBPACK_IMPORTED_MODULE_2__["UIButton"](group);else if(ctrlType==='sub_control')
control=new _uisubcontrol__WEBPACK_IMPORTED_MODULE_3__["UISubControl"](group);else if(ctrlType==='button_list')
control=new _uibuttonlist__WEBPACK_IMPORTED_MODULE_4__["UIButtonList"](group);else if(ctrlType==='check_box')
control=new _uicheckbox__WEBPACK_IMPORTED_MODULE_5__["UICheckBox"](group);else if(ctrlType==='slider')
control=new _uislider__WEBPACK_IMPORTED_MODULE_6__["UISlider"](group);else if(ctrlType==='scroll_box')
control=new _uiscrollbox__WEBPACK_IMPORTED_MODULE_7__["UIScrollBox"](group);else if(ctrlType==='meter')
control=new _uimeter__WEBPACK_IMPORTED_MODULE_8__["UIMeter"](group);else if(ctrlType==='progress_bar')
control=new _uiprogressbar__WEBPACK_IMPORTED_MODULE_9__["UIProgressBar"](group);else
throw new Error(`UI Control not defined!(${ctrlType})`);control.loadFromNode(node);_managers_signalmanager__WEBPACK_IMPORTED_MODULE_0__["signalManager"].broadcast_smartGui(control);control.smartCreate();return control;}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"UILabel",function(){return UILabel;});var _uicontrol__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(73);var _common_defs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);class UILabel extends _uicontrol__WEBPACK_IMPORTED_MODULE_0__["UIControl"]
{constructor(group)
{super(group);this.type=_common_defs__WEBPACK_IMPORTED_MODULE_1__["ECT_LABEL"];}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"UIButton",function(){return UIButton;});var _uicontrol__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(73);var _common_defs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);class UIButton extends _uicontrol__WEBPACK_IMPORTED_MODULE_0__["UIControl"]
{constructor(group)
{super(group);this.type=_common_defs__WEBPACK_IMPORTED_MODULE_1__["ECT_BUTTON"];}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"UISubControl",function(){return UISubControl;});var _uicontrol__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(73);var _gui_uicontrolnavnode__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(72);var _uicontrolfactory__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(76);var _common_defs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(5);class UISubControl extends _uicontrol__WEBPACK_IMPORTED_MODULE_0__["UIControl"]
{constructor(group)
{super(group);this.type=_common_defs__WEBPACK_IMPORTED_MODULE_3__["ECT_SUB_CONTROL"];this.subControlAry=[];this.controlNodeAry=[];this.activeNode=null;this.respondsToSelectMsg=false;}
loadControlFromNode(node)
{super.loadControlFromNode(node);let subControlSettingsNode=node.getElementsByTagName('subControlSettings');if(subControlSettingsNode.length)
{let attr=subControlSettingsNode[0].getAttribute('respondsToSelectMsg');if(attr==='true')
this.respondsToSelectMsg=true;}
let controlListNode=node.getElementsByTagName('subControlList');if(controlListNode.length)
{let navNodeMap=new Map;let controlNode=controlListNode[0].getElementsByTagName('control');for(let i=0;i<controlNode.length;++i)
{let control=_uicontrolfactory__WEBPACK_IMPORTED_MODULE_2__["create"](controlNode[i],this.group);this.subControlAry.push(control);if(control.name)
{let navNode=new _gui_uicontrolnavnode__WEBPACK_IMPORTED_MODULE_1__["UIControlNavNode"](control);this.controlNodeAry.push(navNode);navNodeMap.set(control.name,navNode);}
}
if(navNodeMap.size>0)
{for(let i=0;i<controlNode.length;++i)
this.findNodes(controlNode[i],i,navNodeMap);}
}
}
init()
{super.init();for(let i=0;i<this.subControlAry.length;++i)
this.subControlAry[i].init();}
cleanUp()
{super.cleanUp();for(let i=0;i<this.subControlAry.length;++i)
this.subControlAry[i].cleanUp();}
findNodes(node,nodeIndex,navNodeMap)
{let navNode=node.getElementsByTagName('navigate');if(navNode.length)
{this.setNodes(navNode,nodeIndex,'up',_common_defs__WEBPACK_IMPORTED_MODULE_3__["ENAV_NODE_UP"],navNodeMap);this.setNodes(navNode,nodeIndex,'down',_common_defs__WEBPACK_IMPORTED_MODULE_3__["ENAV_NODE_DOWN"],navNodeMap);this.setNodes(navNode,nodeIndex,'left',_common_defs__WEBPACK_IMPORTED_MODULE_3__["ENAV_NODE_LEFT"],navNodeMap);this.setNodes(navNode,nodeIndex,'right',_common_defs__WEBPACK_IMPORTED_MODULE_3__["ENAV_NODE_RIGHT"],navNodeMap);}
}
setNodes(node,nodeIndex,attrStr,navId,navNodeMap)
{let attr=node[0].getAttribute(attrStr);if(attr)
{let ctrlNode=navNodeMap.get(attr);if(ctrlNode!==undefined)
this.controlNodeAry[nodeIndex].setNode(navId,ctrlNode);else
throw new Error(`Control node doesn't exist!(${name})`);}
}
update()
{super.update();for(let i=0;i<this.subControlAry.length;++i)
this.subControlAry[i].update();}
transform(object)
{super.transform(object);for(let i=0;i<this.subControlAry.length;++i)
this.subControlAry[i].transform(this);}
render(camera)
{super.render(camera);for(let i=0;i<this.subControlAry.length;++i)
this.subControlAry[i].render(camera);}
handleEvent(event)
{super.handleEvent(event);for(let i=0;i<this.subControlAry.length;++i)
this.subControlAry[i].handleEvent(event);if(this.isActive()&&(event instanceof CustomEvent))
{if((event.detail.type>=_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_UP_ACTION"])&&
(event.detail.type<=_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_RIGHT_ACTION"]))
{if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_UP_ACTION"])
{this.onUpAction(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_DOWN_ACTION"])
{this.onDownAction(event);}
if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_LEFT_ACTION"])
{this.onLeftAction(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_RIGHT_ACTION"])
{this.onRightAction(event);}
}
else if((event.detail.type>=_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_SCROLL_UP"])&&
(event.detail.type<=_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_SCROLL_RIGHT"]))
{if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_SCROLL_UP"])
{this.onUpScroll(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_SCROLL_DOWN"])
{this.onDownScroll(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_SCROLL_LEFT"])
{this.onLeftScroll(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_SCROLL_RIGHT"])
{this.onRightScroll(event);}
}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_TAB_LEFT"])
{this.onTabLeft(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_TAB_RIGHT"])
{this.onTabRight(event);}
}
}
onUpAction(event)
{this.navigateMenu(_common_defs__WEBPACK_IMPORTED_MODULE_3__["ENAV_NODE_UP"]);}
onDownAction(event)
{this.navigateMenu(_common_defs__WEBPACK_IMPORTED_MODULE_3__["ENAV_NODE_DOWN"]);}
onLeftAction(event)
{this.navigateMenu(_common_defs__WEBPACK_IMPORTED_MODULE_3__["ENAV_NODE_LEFT"]);}
onRightAction(event)
{this.navigateMenu(_common_defs__WEBPACK_IMPORTED_MODULE_3__["ENAV_NODE_RIGHT"]);}
onUpScroll(event)
{this.navigateMenu(_common_defs__WEBPACK_IMPORTED_MODULE_3__["ENAV_NODE_UP"]);}
onDownScroll(event)
{this.navigateMenu(_common_defs__WEBPACK_IMPORTED_MODULE_3__["ENAV_NODE_DOWN"]);}
onLeftScroll(event)
{this.navigateMenu(_common_defs__WEBPACK_IMPORTED_MODULE_3__["ENAV_NODE_LEFT"]);}
onRightScroll(event)
{this.navigateMenu(_common_defs__WEBPACK_IMPORTED_MODULE_3__["ENAV_NODE_RIGHT"]);}
onTabLeft(event)
{}
onTabRight(event)
{}
navigateMenu(navNode)
{if(this.activeNode!==null)
{let navNode=this.activeNode;do
{navNode=navNode.getNode(navNode);if(navNode===null)
{break;}
else if(!navNode.uiControl.isDisabled())
{this.activeNode=navNode;eventManager.dispatchEvent(
_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_CONTROL_STATE_CHANGE"],_common_defs__WEBPACK_IMPORTED_MODULE_3__["ECS_ACTIVE"],navNode.uiControl);break;}
}
while(true);}
}
onStateChange(event)
{if(this.respondsToSelectMsg)
{super.onStateChange(event);}
else
{let state=event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_3__["EMSC_STATE"]];let ctrl=this.findSubControlByRef(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_3__["EMSC_CONTROL"]]);if((state===_common_defs__WEBPACK_IMPORTED_MODULE_3__["ECS_ACTIVE"])&&(ctrl!==null))
{if(ctrl.state!=state)
{this.setState(state,true);this.resetSpriteScript();this.setDisplayState();}
}
else if(state<_common_defs__WEBPACK_IMPORTED_MODULE_3__["ECS_SELECTED"])
super.onStateChange(event);}
}
reset(complete)
{super.reset(complete);for(let i=0;i<this.subControlAry.length;++i)
this.subControlAry[i].reset(complete);}
onMouseMove(event)
{let result=super.onMouseMove(event);let found=this.onSubControlMouseMove(event);if(result &&!found)
this.deactivateSubControl();return result|| found;}
onSubControlMouseMove(event)
{let result=false;for(let i=0;i<this.subControlAry.length &&!result;++i)
result=this.subControlAry[i].onMouseMove(event);return result;}
handleSelectAction(event)
{if(this.respondsToSelectMsg)
{return super.handleSelectAction(event);}
else
{for(let i=0;i<this.subControlAry.length;++i)
if(this.subControlAry[i].handleSelectAction(event))
return true;}
return false;}
findControlByName(name)
{let ctrl=super.findControlByName(name);if(ctrl===null)
ctrl=this.findSubControlByName(name);return ctrl;}
findControlByRef(control)
{let ctrl=super.findControlByRef(control);if(ctrl===null)
ctrl=this.findSubControlByRef(control);return ctrl;}
findSubControlByName(name)
{let ctrl=null;for(let i=0;i<this.subControlAry.length &&!ctrl;++i)
ctrl=this.subControlAry[i].findControlByName(name);return ctrl;}
findSubControlByRef(control)
{let ctrl=null;for(let i=0;i<this.subControlAry.length &&!ctrl;++i)
ctrl=this.subControlAry[i].findControlByRef(control);return ctrl;}
activateFirstInactiveControl()
{if(super.activateFirstInactiveControl())
{let found=false;for(let i=0;i<this.controlNodeAry.length;++i)
{if(!found && this.controlNodeAry[i].uiControl.activateFirstInactiveControl())
{this.activeNode=controlNodeAry[i];found=true;}
else
{this.controlNodeAry[i].uiControl.deactivateControl();}
}
return true;}
return false;}
baseActivateFirstInactiveControl()
{return super.activateFirstInactiveControl();}
deactivateControl()
{super.deactivateControl();this.deactivateSubControl();}
deactivateSubControl()
{for(let i=0;i<this.subControlAry.length;++i)
this.subControlAry[i].deactivateControl();}
isSubControl()
{return true;}
disableControl()
{super.disableControl();for(let i=0;i<this.subControlAry.length;++i)
this.subControlAry[i].disableControl();}
enableControl()
{super.enableControl();for(let i=0;i<this.subControlAry.length;++i)
this.subControlAry[i].enableControl();}
setAlpha(alpha)
{super.setAlpha(alpha);for(let i=0;i<this.subControlAry.length;++i)
this.subControlAry[i].setAlpha(alpha);}
getActiveControl()
{let result=null;for(let i=0;i<this.subControlAry.length;++i)
{if(this.subControlAry[i].getState()>_common_defs__WEBPACK_IMPORTED_MODULE_3__["ECS_INACTIVE"])
{result=this.subControlAry[i].getActiveControl();break;}
}
return result;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"UIButtonList",function(){return UIButtonList;});var _uisubcontrol__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(79);var _utilities_bitmask__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(38);var _managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(26);var _common_defs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(5);class UIButtonList extends _uisubcontrol__WEBPACK_IMPORTED_MODULE_0__["UISubControl"]
{constructor(group)
{super(group);this.type=_common_defs__WEBPACK_IMPORTED_MODULE_3__["ECT_BUTTON_LIST"];this.activeIndex=0;this.imageLstIndex=-1;this.lastFontSpriteIndex=0;this.actionMask=new _utilities_bitmask__WEBPACK_IMPORTED_MODULE_1__["BitMask"];}
loadFromNode(node)
{super.loadFromNode(node);let actionResponseNode=node.getElementsByTagName('actionResponse');let attr=actionResponseNode[0].getAttribute('up');if(attr &&(attr==='true'))
{this.actionMask.add(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAR_UP"]);}
attr=actionResponseNode[0].getAttribute('down');if(attr &&(attr==='true'))
{this.actionMask.add(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAR_DOWN"]);}
attr=actionResponseNode[0].getAttribute('left');if(attr &&(attr==='true'))
{this.actionMask.add(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAR_LEFT"]);}
attr=actionResponseNode[0].getAttribute('right');if(attr &&(attr==='true'))
{this.actionMask.add(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAR_RIGHT"]);}
}
loadControlFromNode(node)
{super.loadControlFromNode(node);for(let i=0;i<this.spriteAry.length;++i)
{if(this.spriteAry[i].objData.visualData.getFrameCount()>1)
{this.imageLstIndex=i;break;}
}
let fontSpriteCounter=0;for(let i=0;i<this.spriteAry.length;++i)
{if(this.spriteAry[i].visualComponent.isFontSprite())
{this.lastFontSpriteIndex=fontSpriteCounter;++fontSpriteCounter;}
}
}
inc()
{_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(
_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_CONTROL_STATE_CHANGE"],_common_defs__WEBPACK_IMPORTED_MODULE_3__["ECS_SELECTED"],this.subControlAry[_common_defs__WEBPACK_IMPORTED_MODULE_3__["BTN_INC"]]);}
dec()
{_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(
_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_CONTROL_STATE_CHANGE"],_common_defs__WEBPACK_IMPORTED_MODULE_3__["ECS_SELECTED"],this.subControlAry[_common_defs__WEBPACK_IMPORTED_MODULE_3__["BTN_DEC"]]);}
onDownAction(event)
{if((event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAP_DOWN"])&& this.actionMask.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAR_DOWN"]))
this.dec();}
onUpAction(event)
{if((event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAP_DOWN"])&& this.actionMask.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAR_UP"]))
this.inc();}
onLeftAction(event)
{if((event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAP_DOWN"])&& this.actionMask.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAR_LEFT"]))
this.dec();}
onRightAction(event)
{if((event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAP_DOWN"])&& this.actionMask.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAR_RIGHT"]))
this.inc();}
onDownScroll(event)
{if(this.actionMask.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAR_DOWN"]))
this.dec();}
onUpScroll(event)
{if(this.actionMask.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAR_UP"]))
this.inc();}
onLeftScroll(event)
{if(this.actionMask.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAR_LEFT"]))
this.dec();}
onRightScroll(event)
{if(this.actionMask.isSet(_common_defs__WEBPACK_IMPORTED_MODULE_3__["EAR_RIGHT"]))
this.inc();}
onStateChange(event)
{super.onStateChange(event);let state=event.detail.arg[0];if(state===_common_defs__WEBPACK_IMPORTED_MODULE_3__["ECS_SELECTED"])
{if(this.subControlAry[_common_defs__WEBPACK_IMPORTED_MODULE_3__["BTN_DEC"]]==event.detail.arg[1])
{this.decList();this.updateDisplay(this.activeIndex);}
else if(this.subControlAry[_common_defs__WEBPACK_IMPORTED_MODULE_3__["BTN_INC"]]==event.detail.arg[1])
{this.incList();this.updateDisplay(this.activeIndex);}
}
}
incList()
{if(this.stringAry.length)
this.activeIndex=(this.activeIndex+1)% this.stringAry.length;}
decList()
{if(this.stringAry.length)
{if(this.activeIndex>0)
this.activeIndex=(this.activeIndex-1)% this.stringAry.length;else
this.activeIndex=this.stringAry.length-1;}
}
updateDisplay(index)
{this.activeIndex=index;this.createFontString(this.activeIndex,this.lastFontSpriteIndex);if(this.imageLstIndex>-1)
this.spriteAry[this.imageLstIndex].visualComponent.setFrame(this.activeIndex);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"UICheckBox",function(){return UICheckBox;});var _uicontrol__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(73);var _common_defs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);class UICheckBox extends _uicontrol__WEBPACK_IMPORTED_MODULE_0__["UIControl"]
{constructor(group)
{super(group);this.type=_common_defs__WEBPACK_IMPORTED_MODULE_1__["ECT_CHECK_BOX"];this.toggleState=false;}
onSelectExecute(event)
{if(this.state===_common_defs__WEBPACK_IMPORTED_MODULE_1__["ECS_SELECTED"])
this.toggleState=!this.toggleState;super.onSelectExecute(event);}
render(matrix)
{for(let i=0;i<this.spriteAry.length-1;++i)
this.spriteAry[i].render(matrix);if(this.toggleState===_common_defs__WEBPACK_IMPORTED_MODULE_1__["TOGGLE_STATE_ON"])
this.spriteAry[this.spriteAry.length-1].render(matrix);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"UISlider",function(){return UISlider;});var _uisubcontrol__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(79);var _common_point__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(11);var _utilities_settings__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(3);var _managers_eventmanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(26);var _common_defs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(5);class UISlider extends _uisubcontrol__WEBPACK_IMPORTED_MODULE_0__["UISubControl"]
{constructor(group)
{super(group);this.type=_common_defs__WEBPACK_IMPORTED_MODULE_4__["ECT_SLIDER"];this.travelDistPixels=0;this.orientation=_common_defs__WEBPACK_IMPORTED_MODULE_4__["EO_HORIZONTAL"];this.minValue=0;this.maxValue=0;this.curValue=0;this.incValue=0;this.displayValueAsInt=false;this.defaultPos=new _common_point__WEBPACK_IMPORTED_MODULE_1__["Point"];this.sliderBtnHold=false;this.pressType=_common_defs__WEBPACK_IMPORTED_MODULE_4__["EAP_IDLE"];}
loadFromNode(node)
{super.loadFromNode(node);let settingsNode=node.getElementsByTagName('settings');if(settingsNode.length)
{let attr=settingsNode[0].getAttribute('orientation');if(attr &&(attr==='VERT'))
this.orientation=_common_defs__WEBPACK_IMPORTED_MODULE_4__["EO_VERTICAL"];attr=settingsNode[0].getAttribute('minValue');if(attr)
this.minValue=Number(attr);attr=settingsNode[0].getAttribute('maxValue');if(attr)
this.maxValue=Number(attr);attr=settingsNode[0].getAttribute('incValue');if(attr)
this.incValue=Number(attr);attr=settingsNode[0].getAttribute('defValue');if(attr)
this.curValue=Number(attr);attr=settingsNode[0].getAttribute('displayValueAsInt');if(attr &&(attr==='true'))
this.displayValueAsInt=true;}
}
loadControlFromNode(node)
{super.loadControlFromNode(node);this.defaultPos.copy(this.subControlAry[0].pos);let settingsNode=node.getElementsByTagName('settings');if(settingsNode.length)
{let attr=settingsNode[0].getAttribute('maxTravelDistPixels');if(attr)
this.travelDistPixels=Number(attr);}
}
init()
{super.init();this.updateSlider();}
onLeftAction(event)
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_4__["EAP_DOWN"])
this.handleSliderChange(-this.incValue,true);}
onRightAction(event)
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_4__["EAP_DOWN"])
this.handleSliderChange(this.incValue,true);}
onLeftScroll(event)
{this.handleSliderChange(-this.incValue);}
onRightScroll(event)
{this.handleSliderChange(this.incValue);}
onMouseMove(event)
{let result=super.onMouseMove(event);if(this.isActive()&&(this.pressType===_common_defs__WEBPACK_IMPORTED_MODULE_4__["EAP_DOWN"]))
{let oneOverAspectRatio=1.0/_utilities_settings__WEBPACK_IMPORTED_MODULE_2__["settings"].orthoAspectRatio.h;if(this.orientation===_common_defs__WEBPACK_IMPORTED_MODULE_4__["EO_HORIZONTAL"])
this.incSliderMovePos(event.movementX*oneOverAspectRatio);else
this.incSliderMovePos(event.movementY*oneOverAspectRatio);this.smartExecuteAction();}
return result;}
handleSelectAction(event)
{let result=this.isActive()&&
(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_4__["ESMA_DEVICE_TYPE"]]===_common_defs__WEBPACK_IMPORTED_MODULE_4__["MOUSE"])&&
this.isPointInControl(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_4__["ESMA_MOUSE_X"]],event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_4__["ESMA_MOUSE_Y"]]);if(result &&(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_4__["ESMA_PRESS_TYPE"]]===this.mouseSelectType))
{this.pressType=this.mouseSelectType;if(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_4__["ESMA_PRESS_TYPE"]]===_common_defs__WEBPACK_IMPORTED_MODULE_4__["EAP_DOWN"])
{this.prepareControlScriptFactory(_common_defs__WEBPACK_IMPORTED_MODULE_4__["ECS_SELECTED"]);let ratio=1.0/_utilities_settings__WEBPACK_IMPORTED_MODULE_2__["settings"].orthoAspectRatio.h;if(this.orientation===_common_defs__WEBPACK_IMPORTED_MODULE_4__["EO_HORIZONTAL"])
this.incSliderMovePos((event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_4__["ESMA_MOUSE_X"]]-this.subControlAry[0].collisionCenter.x)*ratio);else
this.incSliderMovePos((event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_4__["ESMA_MOUSE_Y"]]-this.subControlAry[0].collisionCenter.y)*ratio);this.smartExecuteAction();}
}
else if(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_4__["ESMA_PRESS_TYPE"]]!==this.mouseSelectType)
{this.pressType=_common_defs__WEBPACK_IMPORTED_MODULE_4__["EAP_IDLE"];}
return result;}
deactivateControl()
{super.deactivateControl();this.pressType=_common_defs__WEBPACK_IMPORTED_MODULE_4__["EAP_IDLE"];}
handleSliderChange(value,prepareOnSelect=false)
{if(this.isActive())
{if(prepareOnSelect)
this.prepareControlScriptFactory(_common_defs__WEBPACK_IMPORTED_MODULE_4__["ECS_SELECTED"]);_managers_eventmanager__WEBPACK_IMPORTED_MODULE_3__["eventManager"].dispatchEvent(
_common_defs__WEBPACK_IMPORTED_MODULE_4__["EGE_MENU_CONTROL_STATE_CHANGE"],_common_defs__WEBPACK_IMPORTED_MODULE_4__["ECS_SELECTED"],this.subControlAry[0]);this.incSlider(value);this.smartExecuteAction();}
}
setSlider(value=0)
{this.curValue=value;this.updateSlider();}
incSlider(value=0)
{this.curValue+=value;this.updateSlider();}
incSliderMovePos(value)
{this.curValue+=value*((this.maxValue-this.minValue)/this.travelDistPixels);this.updateSlider();}
updateSlider()
{this.capSliderValue();this.setSliderPos();if(this.stringAry.length)
{let valueStr;if(this.displayValueAsInt)
valueStr=this.stringAry[this.stringAry.length-1].replace(/%d/i,Math.trunc(this.curValue));else
valueStr=this.stringAry[this.stringAry.length-1].replace(/%d/i,this.curValue);this.createFontStr(valueStr);}
}
capSliderValue()
{if(this.curValue<this.minValue)
this.curValue=this.minValue;else if(this.curValue>this.maxValue)
this.curValue=this.maxValue;}
setSliderPos()
{if(Math.abs(this.maxValue)>0.001)
{let startPos=-(this.travelDistPixels/2);let pixelsPerValue=this.travelDistPixels/(this.maxValue-this.minValue);let pos=startPos+(pixelsPerValue*(this.curValue-this.minValue));if(this.orientation===_common_defs__WEBPACK_IMPORTED_MODULE_4__["EO_HORIZONTAL"])
this.subControlAry[0].setPosXYZ(this.defaultPos.x+pos,this.defaultPos.y);else
this.subControlAry[0].setPosXYZ(this.defaultPos.x,this.defaultPos.y+-pos);}
}
isMouseDown()
{return(this.pressType===_common_defs__WEBPACK_IMPORTED_MODULE_4__["EAP_DOWN"]);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"UIScrollBox",function(){return UIScrollBox;});var _uisubcontrol__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(79);var _common_point__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(11);var _sprite_sprite__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(54);var _objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(30);var _system_device__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(8);var _managers_eventmanager__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(26);var _utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(68);var _utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(35);var _uicontrolfactory__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(76);var _common_defs__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(5);const IN_VIEWABLE_AREA=1;const NEW_ACTIVE_CTRL=2;class UIScrollBox extends _uisubcontrol__WEBPACK_IMPORTED_MODULE_0__["UISubControl"]
{constructor(group)
{super(group);this.type=_common_defs__WEBPACK_IMPORTED_MODULE_9__["ECT_SCROLL_BOX"];this.scrollControlAry=[];this.initialOffset=new _common_point__WEBPACK_IMPORTED_MODULE_1__["Point"];this.cullHeight=0;this.controlHeight=0;this.scrollCurPos=0;this.visibleCount=0;this.visStartPos=0;this.visEndPos=0;this.maxMoveAmount=0;this.stencilMaskSprite;this.activeScrollCtrl=_common_defs__WEBPACK_IMPORTED_MODULE_9__["NO_ACTIVE_CONTROL"];this.firstScrollCtrlIndex=0;this.defaultOffsetAry=[];this.scrollSpeed=0.05;this.pageSpeed=0.05;this.scrollVector=0;this.paging=0;this.scrollCounter=0;this.scrollDistance=0;this.endScroll=false;this.scrollMsg=false;this.endScrollSelection=false;}
loadFromNode(node)
{super.loadFromNode(node);this.subControlAry[0].maxValue=this.maxMoveAmount;this.subControlAry[0].setSlider();let scrollNode=node.getElementsByTagName('scroll');if(scrollNode.length)
{let attr=scrollNode[0].getAttribute('scrollSpeed');if(attr)
this.scrollSpeed=Number(attr);attr=scrollNode[0].getAttribute('pageSpeed');if(attr)
this.pageSpeed=Number(attr);}
this.setStartEndPos();}
loadControlFromNode(node)
{super.loadControlFromNode(node);let menuControlsNode=node.getElementsByTagName("scrollBoxControlList");if(menuControlsNode.length)
{this.initialOffset=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_7__["loadPosition"](menuControlsNode[0]);let controlInfoNode=menuControlsNode[0].getElementsByTagName("controlInfo");this.controlHeight=Number(controlInfoNode[0].getAttribute("height"));this.visibleCount=Number(controlInfoNode[0].getAttribute("visibleInScrollBox"));let scrollControlNode=menuControlsNode[0].getElementsByTagName("control");for(let i=0;i<scrollControlNode.length;++i)
this.addScrollControlFromNode(scrollControlNode[i]);}
let stencilMaskNode=node.getElementsByTagName("stencilMask");if(stencilMaskNode.length)
{let objectName=stencilMaskNode[0].getAttribute("objectName");this.stencilMaskSprite=new _sprite_sprite__WEBPACK_IMPORTED_MODULE_2__["Sprite"](_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_3__["objectDataManager"].getData(this.group,objectName));this.cullHeight=(this.stencilMaskSprite.objData.size.w+this.controlHeight)/2;this.stencilMaskSprite.load(stencilMaskNode[0]);}
}
addScrollControlFromNode(node)
{let ctrl=_uicontrolfactory__WEBPACK_IMPORTED_MODULE_8__["create"](node,this.group);this.scrollControlAry.push(ctrl);let posY=this.initialOffset.y-(this.controlHeight*(this.scrollControlAry.length-1));this.defaultOffsetAry.push(posY);ctrl.setPosXYZ(this.initialOffset.x,posY,this.initialOffset.z);ctrl.deactivateControl();if(this.scrollControlAry.length>this.visibleCount)
this.maxMoveAmount=(this.scrollControlAry.length-this.visibleCount)*this.controlHeight;return ctrl;}
init()
{super.init();for(let i=0;i<this.scrollControlAry.length;++i)
this.scrollControlAry[i].init();}
cleanUp()
{super.cleanUp();for(let i=0;i<this.scrollControlAry.length;++i)
this.scrollControlAry[i].cleanUp();}
handleEvent(event)
{super.handleEvent(event);for(let i=this.visStartPos;i<this.visEndPos;++i)
this.scrollControlAry[i].handleEvent(event);}
onUpAction(event)
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_DOWN"])
this.handleKeyboardGamepadScroll(-1);else if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_UP"])
this.endScroll=true;}
onDownAction(event)
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_DOWN"])
this.handleKeyboardGamepadScroll(1);else if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_UP"])
this.endScroll=true;}
onUpScroll(event)
{this.handleKeyboardGamepadScroll(-1);this.scrollMsg=true;}
onDownScroll(event)
{this.handleKeyboardGamepadScroll(1);this.scrollMsg=true;}onTabLeft(event)
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_DOWN"])
this.handlePageScroll(-1);}
onTabRight(event)
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_DOWN"])
this.handlePageScroll(1);}
onMouseMove(event)
{let result=super.onMouseMove(event);this.activeScrollCtrl=_common_defs__WEBPACK_IMPORTED_MODULE_9__["NO_ACTIVE_CONTROL"];if(this.subControlAry[0].isMouseDown())
{this.scrollCurPos=this.subControlAry[0].curValue;this.setStartEndPos();this.repositionScrollControls();}
return result;}
update()
{super.update();for(let i=this.visStartPos;i<this.visEndPos;++i)
this.scrollControlAry[i].update();this.handleScrollUpdate();}
transform(object)
{super.transform(object);for(let i=this.visStartPos;i<this.visEndPos;++i)
this.scrollControlAry[i].transform(this);this.stencilMaskSprite.object.transform(this);}
render(camera)
{super.render(camera);_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].colorMask(false,false,false,false);_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].depthMask(false);_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].enable(_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].STENCIL_TEST);_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].stencilFunc(_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].ALWAYS,0x1,0x1);_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].stencilOp(_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].REPLACE,_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].REPLACE,_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].REPLACE);this.stencilMaskSprite.render(camera);_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].colorMask(true,true,true,true);_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].stencilFunc(_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].EQUAL,0x1,0x1);_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].stencilOp(_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].KEEP,_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].KEEP,_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].KEEP);_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].depthMask(true);for(let i=this.visStartPos;i<this.visEndPos;++i)
this.scrollControlAry[i].render(camera);_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].disable(_system_device__WEBPACK_IMPORTED_MODULE_4__["gl"].STENCIL_TEST);}
activateFirstInactiveControl()
{if(super.baseActivateFirstInactiveControl())
{for(let i=0;i<this.scrollControlAry.length;++i)
{if(this.scrollControlAry[i].activateFirstInactiveControl())
{this.activeScrollCtrl=i;break;}
}
}
return this.activeScrollCtrl!=_common_defs__WEBPACK_IMPORTED_MODULE_9__["NO_ACTIVE_CONTROL"];}
handleSelectAction(event)
{let result=super.handleSelectAction(event);for(let i=0;i<this.scrollControlAry.length;++i)
this.scrollControlAry[i].handleSelectAction(event);if((event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_9__["ESMA_DEVICE_TYPE"]]===_common_defs__WEBPACK_IMPORTED_MODULE_9__["MOUSE"])&&
(event.detail.arg[_common_defs__WEBPACK_IMPORTED_MODULE_9__["ESMA_PRESS_TYPE"]]===_common_defs__WEBPACK_IMPORTED_MODULE_9__["EAP_DOWN"]))
{this.scrollCurPos=this.subControlAry[0].curValue;this.setStartEndPos();this.repositionScrollControls();}
return result;}
handlePageScroll(scrollVector)
{if(this.scrollVector==0)
{if(!this.selectAndRepositionCtrl(scrollVector))
{const SCROLL_DOWN=(scrollVector>0);const SCROLL_UP=(scrollVector<0);if((SCROLL_UP &&(this.firstScrollCtrlIndex>0))||
(SCROLL_DOWN &&(this.firstScrollCtrlIndex+this.visibleCount<this.scrollControlAry.length)))
{let visibleCount=this.visibleCount;if(SCROLL_UP &&(visibleCount>this.firstScrollCtrlIndex))
{visibleCount=this.firstScrollCtrlIndex;}
else if(SCROLL_DOWN &&
((visibleCount+this.firstScrollCtrlIndex+this.visibleCount-1)>=this.scrollControlAry.length))
{visibleCount=this.scrollControlAry.length-this.firstScrollCtrlIndex-this.visibleCount;}
this.initScrolling(scrollVector,this.controlHeight*visibleCount,true,true);if(this.scrollVector)
{if(this.activeScrollCtrl!=_common_defs__WEBPACK_IMPORTED_MODULE_9__["NO_ACTIVE_CONTROL"])
this.scrollControlAry[this.activeScrollCtrl].deactivateControl();}
}
else
{this.activeScrollCtrl=this.firstScrollCtrlIndex;if(SCROLL_DOWN)
this.activeScrollCtrl+=this.visibleCount-1;if(!this.activateScrollCtrl(this.activeScrollCtrl))
this.selectNextControl(-scrollVector);}
}
}
}
handleKeyboardGamepadScroll(scrollVector)
{if(!this.selectAndRepositionCtrl(scrollVector))
{let scrollResult=this.selectNextControl(scrollVector);if(!(scrollResult & IN_VIEWABLE_AREA))
{this.initScrolling(scrollVector,this.controlHeight);}
}
}
selectNextControl(scrollVector)
{this.setActiveCtrlToViewableArea(scrollVector);let scrollResult=this.scrollToTheNextCtrlInViewableArea(scrollVector);if((scrollResult & IN_VIEWABLE_AREA)&&!(scrollResult & NEW_ACTIVE_CTRL))
{_managers_eventmanager__WEBPACK_IMPORTED_MODULE_5__["eventManager"].dispatchEvent(
_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_CONTROL_STATE_CHANGE"],_common_defs__WEBPACK_IMPORTED_MODULE_9__["ECS_ACTIVE"],this.scrollControlAry[this.activeScrollCtrl]);}
return scrollResult;}
selectAndRepositionCtrl(scrollVector)
{if(this.setActiveCtrlToViewableArea(scrollVector))
{if(!this.activateScrollCtrl(this.activeScrollCtrl))
this.selectNextControl(1);let diff=this.getControlAlignment();if(diff>0.1)
{let pos=this.scrollCurPos/this.controlHeight;let nextCtrl=(this.activeScrollCtrl-this.firstScrollCtrlIndex)*this.controlHeight;if(nextCtrl||(this.firstScrollCtrlIndex>pos))
this.initScrolling(1,this.controlHeight-diff,false);else
this.initScrolling(-1,diff,false);}
return true;}
return false;}
selectPagedControl(scrollVector)
{this.activeScrollCtrl+=scrollVector*this.visibleCount;if(this.activeScrollCtrl<=0)
{this.activeScrollCtrl=0;scrollVector=1;}
else if(this.activeScrollCtrl>=this.scrollControlAry.length-1)
{this.activeScrollCtrl=this.scrollControlAry.size()-1;scrollVector=-1;}
if(!this.activateScrollCtrl(this.activeScrollCtrl))
this.selectNextControl(scrollVector);}
setActiveCtrlToViewableArea(scrollVector)
{if((this.activeScrollCtrl<this.firstScrollCtrlIndex)||(this.activeScrollCtrl>=(this.firstScrollCtrlIndex+this.visibleCount)))
{if(this.activeScrollCtrl!=_common_defs__WEBPACK_IMPORTED_MODULE_9__["NO_ACTIVE_CONTROL"])
this.scrollControlAry[this.activeScrollCtrl].deactivateControl();this.activeScrollCtrl=this.firstScrollCtrlIndex;return true;}
return false;}
scrollToTheNextCtrlInViewableArea(scrollVector)
{let newActiveCtrl=0;let inView=this.inView(this.activeScrollCtrl,scrollVector);if(inView)
{let tmpScrollCtrl=this.activeScrollCtrl;do
{tmpScrollCtrl+=scrollVector;if(this.activateScrollCtrl(tmpScrollCtrl))
{newActiveCtrl=NEW_ACTIVE_CTRL;this.activeScrollCtrl=tmpScrollCtrl;break;}
inView=this.inView(tmpScrollCtrl,scrollVector);}
while(inView);}
let result=inView| newActiveCtrl;return result;}
activateScrollCtrl(scrollControlIndex)
{if((scrollControlIndex!=_common_defs__WEBPACK_IMPORTED_MODULE_9__["NO_ACTIVE_CONTROL"])&&
(scrollControlIndex<this.scrollControlAry.length)&&
!this.scrollControlAry[scrollControlIndex].isDisabled())
{_managers_eventmanager__WEBPACK_IMPORTED_MODULE_5__["eventManager"].dispatchEvent(
_common_defs__WEBPACK_IMPORTED_MODULE_9__["EGE_MENU_CONTROL_STATE_CHANGE"],_common_defs__WEBPACK_IMPORTED_MODULE_9__["ECS_ACTIVE"],this.scrollControlAry[scrollControlIndex]);return true;}
return false;}
initScrolling(scrollVector,distance,endScrollSelection=true,paging=false)
{if(this.scrollVector===0)
{const SCROLL_DOWN=(scrollVector>0);const SCROLL_UP=(scrollVector<0);if(((SCROLL_UP &&(this.scrollCurPos>0))||
(SCROLL_DOWN &&(this.scrollCurPos<this.maxMoveAmount))))
{this.scrollVector=scrollVector;this.scrollCounter=0;this.endScroll=false;this.scrollMsg=false;this.paging=paging;this.endScrollSelection=endScrollSelection;this.scrollDistance=distance;}
}
}
handleScrollUpdate()
{if(this.scrollVector)
{let dist=_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_6__["highResTimer"].elapsedTime*this.scrollSpeed;if(this.paging)
dist=_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_6__["highResTimer"].elapsedTime*this.pageSpeed;if(this.scrollVector>0)
this.scrollCurPos+=dist;else
this.scrollCurPos-=dist;this.subControlAry[0].setSlider(this.scrollCurPos);this.scrollCounter+=dist;this.setStartEndPos();if(this.scrollCounter>=this.scrollDistance)
{if(this.endScroll||!this.scrollMsg|| this.paging)
{this.alignScrollPostion();if(this.endScrollSelection)
{if(this.paging)
this.selectPagedControl(this.scrollVector);else
this.selectNextControl(this.scrollVector);}
this.scrollVector=0;}
else
{this.scrollDistance+=this.controlHeight;}
}
else if((this.scrollCurPos<0)||(this.scrollCurPos>this.maxMoveAmount))
{this.alignScrollPostion();this.scrollVector=0;}
this.repositionScrollControls();}
}
getControlAlignment()
{let pos=this.scrollCurPos/this.controlHeight;return this.controlHeight*Math.trunc(pos);}
inView(scrollIndex,scrollVector)
{return((scrollVector<0)&&(scrollIndex>this.firstScrollCtrlIndex))||
(((scrollVector>0))&&(scrollIndex<(this.firstScrollCtrlIndex+this.visibleCount-1)));}
findSubControlByName(name)
{let ctrl=super.findSubControlByName(name);for(let i=this.visStartPos;i<this.visEndPos &&(ctrl===null);++i)
ctrl=this.scrollControlAry[i].findControlByName(name);return ctrl;}
findSubControlByRef(control)
{let ctrl=super.findSubControlByRef(control);for(let i=this.visStartPos;i<this.visEndPos &&(ctrl===null);++i)
if(this.scrollControlAry[i]===control)
ctrl=this.scrollControlAry[i];return ctrl;}
onSubControlMouseMove(event)
{let result=super.onSubControlMouseMove(event);if(!result && this.isPointInControl(event.clientX+_managers_eventmanager__WEBPACK_IMPORTED_MODULE_5__["eventManager"].mouseOffsetX,event.clientY+_managers_eventmanager__WEBPACK_IMPORTED_MODULE_5__["eventManager"].mouseOffsetY))
{for(let i=this.visStartPos;i<this.visEndPos &&!result;++i)
{result=this.scrollControlAry[i].onMouseMove(event);if(result)
this.activeScrollCtrl=i;}
}
return result;}
deactivateSubControl()
{super.deactivateSubControl();for(let i=this.visStartPos;i<this.visEndPos;++i)
this.scrollControlAry[i].deactivateControl();}
setStartEndPos()
{let pos=this.scrollCurPos/this.controlHeight;this.firstScrollCtrlIndex=Math.trunc(pos+0.7);this.visStartPos=Math.trunc(pos);this.visEndPos=this.visStartPos+this.visibleCount+1;if(this.visStartPos<0)
this.visStartPos=0;if(this.visEndPos>this.scrollControlAry.length)
this.visEndPos=this.scrollControlAry.length;}
repositionScrollControls()
{for(let i=this.visStartPos;i<this.visEndPos;++i)
{let pos=this.scrollControlAry[i].pos;let y=this.defaultOffsetAry[i]+this.scrollCurPos;this.scrollControlAry[i].setPosXYZ(pos.x,y,pos.z);}
}
alignScrollPostion()
{if(this.firstScrollCtrlIndex<0)
this.firstScrollCtrlIndex=0;else if((this.firstScrollCtrlIndex+this.visibleCount)>this.scrollControlAry.length)
this.firstScrollCtrlIndex=this.scrollControlAry.length-this.visibleCount;this.scrollCurPos=this.firstScrollCtrlIndex*this.controlHeight;}
deactivateControl()
{this.deactivateSubControl();}
setAlpha(alpha)
{super.setAlpha(alpha);for(let i=this.visStartPos;i<this.visEndPos;++i)
this.scrollControlAry[i].setAlpha(alpha);}
getActiveControl()
{let result=super.getActiveControl();if(result===null)
{for(let i=0;i<this.scrollControlAry.length;++i)
{if(this.scrollControlAry[i].state>_common_defs__WEBPACK_IMPORTED_MODULE_9__["ECS_INACTIVE"])
{result=scrollControlAry[i].getActiveControl();break;}
}
}
return result;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"UIMeter",function(){return UIMeter;});var _utilities_timer__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(85);var _utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(68);var _common_size__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4);var _uicontrol__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(73);var _script_scriptmanager__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(25);var _common_defs__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(5);var _utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(35);const EBT_RAMP_UP=0,EBT_LINEAR=1,EBT_HYBRID=2;const EST_AXIS=0,EST_ACCURATE=1;class BangRange
{constructor(target,bangType,velocity,estimatedTime,slowStartTime)
{this.target=target;this.bangType=bangType;this.velocity=velocity;this.estimatedTime=estimatedTime;this.slowStartTime=slowStartTime;}
}
class UIMeter extends _uicontrol__WEBPACK_IMPORTED_MODULE_3__["UIControl"]
{constructor(group)
{super(group);this.type=_common_defs__WEBPACK_IMPORTED_MODULE_5__["ECT_METER"];this.currentValue=0;this.targetValue=0;this.velocity=0;this.terminalVelocity=0;this.acceleration=0;this.impulse=0;this.lastValue=0;this.fastBangTime=0;this.bangUp=false;this.startUpTimer=new _utilities_timer__WEBPACK_IMPORTED_MODULE_0__["Timer"];this.bangRange=new BangRange;this.fontSprite=null;this.bangRangeAry=[];this.maxFontStrSize=null;this.bangScaleAdjustment=new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"](1,1);this.scaleType=EST_AXIS;}
loadFromNode(node)
{super.loadFromNode(node);let bangRangeNode=node.getElementsByTagName('bangRange');if(bangRangeNode.length)
{this.fastBangTime=Number(bangRangeNode[0].getAttribute('fastBangTime'));if(bangRangeNode[0].getAttribute('scaleType')==='accurate')
this.scaleType=EST_ACCURATE;let rangeNode=bangRangeNode[0].getElementsByTagName('range');for(let i=0;i<rangeNode.length;++i)
{let attr=rangeNode[i].getAttribute('bangUpType');let bangType=EBT_RAMP_UP;if(attr==='linear')
bangType=EBT_LINEAR;else if(attr==='hybrid')
bangType=EBT_HYBRID;this.bangRangeAry.push(new BangRange(
Number(rangeNode[i].getAttribute('target')),bangType,Number(rangeNode[i].getAttribute('velocity')),Number(rangeNode[i].getAttribute('estimatedTime')),Number(rangeNode[i].getAttribute('slowStartTime'))));}
}
this.maxFontStrSize=_utilities_xmlparsehelper__WEBPACK_IMPORTED_MODULE_6__["loadSize"](node);if(node.getElementsByTagName('meterScript').length==0)
this.displayValue();}
loadControlFromNode(controlNode)
{super.loadControlFromNode(controlNode);this.findFontSprite();}
findFontSprite()
{for(let i=0;i<this.spriteAry.length;++i)
{if(this.spriteAry[i].visualComponent.isFontSprite())
this.fontSprite=this.spriteAry[i];}
if(this.fontSprite==null)
throw new Error(`UI Meter doesn't have a sprite for rendering a font string(${this.name}).`);}
set(amount)
{if(amount!==this.currentValue)
{this.lastValue=this.currentValue;this.currentValue=this.targetValue=amount;this.displayValue();}
}
startBangUp(amount)
{if(amount!==this.currentValue)
{this.targetValue=amount;this.bangUp=true;this.setBangRange();}
}
setBangRange()
{let found=false;for(let i=0;i<this.bangRangeAry.length;++i)
{if((this.targetValue-this.currentValue)<=this.bangRangeAry[i].target)
{found=true;this.initBangRange(this.bangRangeAry[i]);break;}
}
if(!found)
this.initBangRange(this.bangRangeAry[this.bangRangeAry.length-1]);}
initBangRange(bangRange)
{this.bangRange=bangRange;this.terminalVelocity=0.0;this.acceleration=0.0;this.impulse=0.0;this.bangScaleAdjustment.set(1,1);this.fontSprite.object.setScaleXYZ(1,1,1);this.velocity=bangRange.velocity/1000.0;let range=this.targetValue-this.currentValue;if(bangRange.bangType===EBT_RAMP_UP)
{this.impulse=range/(bangRange.estimatedTime*bangRange.estimatedTime*1000.0);this.acceleration=this.impulse;}
else if(bangRange.bangType===EBT_LINEAR)
{this.acceleration=range/(bangRange.estimatedTime*1000.0);}
else if(bangRange.bangType===EBT_HYBRID)
{this.terminalVelocity=range/(bangRange.estimatedTime*1000.0);this.impulse=range/(bangRange.estimatedTime*bangRange.estimatedTime*500.0);this.acceleration=impulse;}
this.startUpTimer.set(bangRange.slowStartTime);this.fontSprite.prepareScript('start');}
fastBang()
{if(this.bangUp)
{let acceleration=(this.targetValue-this.currentValue)/this.fastBangTime;if(this.acceleration<acceleration)
this.acceleration=acceleration;}
}
update()
{super.update();if(this.bangUp)
{let elapsedTime=_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_1__["highResTimer"].elapsedTime;if(this.bangRange.bangType===EBT_RAMP_UP)
{this.currentValue+=this.velocity*elapsedTime;if(this.startUpTimer.expired())
{this.velocity+=this.acceleration*elapsedTime;this.acceleration+=this.impulse*elapsedTime;}
else
{this.velocity+=this.acceleration*elapsedTime;}
}
else if(this.bangRange.this.bangType===EBT_LINEAR)
{this.currentValue+=this.velocity;if(this.startUpTimer.expired())
this.velocity+=this.acceleration*elapsedTime;}
else if(this.bangRange.bangType===EBT_HYBRID)
{this.currentValue+=this.velocity;if(this.startUpTimer.expired())
{if(this.terminalVelocity>this.acceleration)
{this.velocity+=this.acceleration*elapsedTime;this.acceleration+=this.impulse*elapsedTime;}
else
{this.velocity+=this.acceleration*elapsedTime;}
}
else
{this.velocity+=this.acceleration*elapsedTime;}
}
if(this.lastValue!=this.currentValue)
{this.lastValue=this.currentValue;if(this.currentValue>this.targetValue)
{this.currentValue=this.targetValue;this.bangUp=false;this.fontSprite.prepareScript('stop');}
this.displayValue();}
}
}
displayValue()
{this.fontSprite.visualComponent.createFontString(Math.trunc(this.currentValue).toString());let size=this.fontSprite.visualComponent.getFontSize();if((size.w>this.maxFontStrSize.w)||(size.h>this.maxFontStrSize.h))
{let difW=this.maxFontStrSize.w/size.w;let difH=this.maxFontStrSize.h/size.h;if((difW<this.bangScaleAdjustment.w)||(difH<this.bangScaleAdjustment.h))
{this.bangScaleAdjustment.set(difW,difH);let scaleX=this.fontSprite.scale.x;let scaleY=this.fontSprite.scale.y;if(difW<difH)
{scaleX=difW;if(this.scaleType!==EST_AXIS)
scaleY=difW;}
else
{scaleY=difH;if(this.scaleType!==EST_AXIS)
scaleX=difH;}
this.fontSprite.setScaleXYZ(scaleX,scaleY);}
}
}
clear()
{this.lastValue=this.currentValue=this.targetValue=0;this.bangUp=false;if(!this.fontSprite.prepareScript('clear'))
this.fontSprite.visualComponent.createFontString(this.currentValue.toString());}
isBanging()
{return this.bangUp;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Timer",function(){return Timer;});class Timer
{constructor(interval=0,startExpired=false)
{this.expiredTime=false;this.timeInterval=interval;this.disabled=false;this.disableValue=false;if(startExpired)
this.setExpired();else
this.reset();}
reset()
{this.expiredTime=this.timeInterval+performance.now();this.disabled=false;}
setExpired()
{this.expiredTime=performance.now();}
set(interval)
{this.timeInterval=interval;this.reset();}
expired(resetOnExpire)
{if(this.disabled)
return this.disableValue;let result=false;if(performance.now()>this.expiredTime)
{result=true;if(resetOnExpire)
this.reset();}
return result;}
disable(disabled)
{this.disabled=disabled;}
setDisableValue(disableValue)
{this.disableValue=disableValue;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"UIProgressBar",function(){return UIProgressBar;});var _uicontrol__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(73);var _sprite_sprite__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(54);var _common_size__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4);var _common_point__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(11);var _objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(30);var _system_device__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(8);var _common_defs__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(5);class UIProgressBar extends _uicontrol__WEBPACK_IMPORTED_MODULE_0__["UIControl"]
{constructor(group)
{super(group);this.type=_common_defs__WEBPACK_IMPORTED_MODULE_6__["ECT_PROGRESS_BAR"];this.stencilMaskSprite;this.curValue=0;this.minValue=0;this.maxValue=1;this.spriteApplyIndex=-1;this.orentation=_common_defs__WEBPACK_IMPORTED_MODULE_6__["EO_HORIZONTAL"];this.alignment=_common_defs__WEBPACK_IMPORTED_MODULE_6__["EHA_HORZ_LEFT"];this.progressBarSize=new _common_size__WEBPACK_IMPORTED_MODULE_2__["Size"];this.progressBarPos=new _common_point__WEBPACK_IMPORTED_MODULE_3__["Point"];this.progressBarScale=new _common_point__WEBPACK_IMPORTED_MODULE_3__["Point"];}
loadFromNode(xmlNode)
{super.loadFromNode(xmlNode);let rangeNode=xmlNode.getElementsByTagName('range');if(rangeNode.length)
{let attr=rangeNode[0].getAttribute('cur');if(attr)
this.curValue=Number(attr);attr=rangeNode[0].getAttribute('min');if(attr)
this.minValue=Number(attr);attr=rangeNode[0].getAttribute('max');if(attr)
this.maxValue=Number(attr);}
let orentNode=xmlNode.getElementsByTagName("orentation");if(orentNode.length)
{let attr=orentNode[0].getAttribute("type");if(attr==='vert')
this.orentation=_common_defs__WEBPACK_IMPORTED_MODULE_6__["EO_VERTICAL"];attr=orentNode[0].getAttribute("alignment");if(attr)
{if(this.orentation===_common_defs__WEBPACK_IMPORTED_MODULE_6__["EO_HORIZONTAL"])
{if(attr==='right')
this.alignment=_common_defs__WEBPACK_IMPORTED_MODULE_6__["EHA_HORZ_RIGHT"];else if(attr==='center')
this.alignment=_common_defs__WEBPACK_IMPORTED_MODULE_6__["EHA_HORZ_CENTER"];}
else
{if(attr==='bottom')
this.alignment=_common_defs__WEBPACK_IMPORTED_MODULE_6__["EVA_VERT_BOTTOM"];else if(attr==='center')
this.alignment=_common_defs__WEBPACK_IMPORTED_MODULE_6__["EVA_VERT_CENTER"];}
}
}
this.setSizePos();}
loadControlFromNode(controlNode)
{super.loadControlFromNode(controlNode);let stencilMaskNode=controlNode.getElementsByTagName("stencilMask");if(stencilMaskNode.length)
{let stencilMaskSprite=stencilMaskNode[0].getAttribute("objectName");this.spriteApplyIndex=Number(stencilMaskNode[0].getAttribute("spriteIndex"));this.initSizePosScale(this.spriteApplyIndex,stencilMaskSprite);}
}
setProgressBarMax(max)
{this.maxValue=max;this.setSizePos();}
initSizePosScale(spriteApplyIndex,stencilMaskSprite=null)
{this.spriteApplyIndex=spriteApplyIndex;if(stencilMaskSprite)
{this.stencilMaskSprite=new _sprite_sprite__WEBPACK_IMPORTED_MODULE_1__["Sprite"](_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_4__["objectDataManager"].getData(this.group,stencilMaskSprite));this.progressBarSize.copy(this.stencilMaskSprite.object.objData.size);this.progressBarPos.copy(this.stencilMaskSprite.object.pos);this.progressBarScale.copy(this.stencilMaskSprite.object.scale);}
else
{this.progressBarSize.copy(this.spriteAry[this.spriteApplyIndex].objData.size);this.progressBarPos.copy(this.spriteAry[this.spriteApplyIndex].object.pos);this.progressBarScale.copy(this.spriteAry[this.spriteApplyIndex].object.scale);}
}
setCurrentValue(cur)
{this.curValue=cur;this.setSizePos();}
incCurrentValue()
{++this.curValue;this.setSizePos();}
transform(object)
{super.transform(object);if(this.stencilMaskSprite)
this.stencilMaskSprite.object.transform(this);}
transformCollision()
{}
render(camera)
{if(this.stencilMaskSprite)
{for(let i=0;i<this.spriteAry.length;++i)
{if(i===this.spriteApplyIndex)
{_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].colorMask(false,false,false,false);_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].depthMask(false);_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].enable(_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].STENCIL_TEST);_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].stencilFunc(_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].ALWAYS,0x1,0x1);_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].stencilOp(_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].REPLACE,_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].REPLACE,_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].REPLACE);this.stencilMaskSprite.render(camera);_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].colorMask(true,true,true,true);_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].stencilFunc(_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].EQUAL,0x1,0x1);_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].stencilOp(_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].KEEP,_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].KEEP,_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].KEEP);_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].depthMask(true);this.spriteAry[i].render(matrix);_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].disable(_system_device__WEBPACK_IMPORTED_MODULE_5__["gl"].STENCIL_TEST);}
else
this.spriteAry[i].render(camera);}
}
else
{super.render(camera);}
}
setSizePos()
{let scaleX=this.progressBarScale.x;let scaleY=this.progressBarScale.y;let posX=this.progressBarPos.x;let posY=this.progressBarPos.y;let scaler=(this.curValue-this.minValue)/(this.maxValue-this.minValue);if(this.orentation==_common_defs__WEBPACK_IMPORTED_MODULE_6__["EO_HORIZONTAL"])
{scaleX=this.progressBarScale.x*scaler;let offset=this.progressBarSize.w*scaler;if(this.alignment==_common_defs__WEBPACK_IMPORTED_MODULE_6__["EHA_HORZ_LEFT"])
posX-=(this.progressBarSize.w-offset)/2;else if(m_alignment.horz==_common_defs__WEBPACK_IMPORTED_MODULE_6__["EHA_HORZ_RIGHT"])
posX+=(this.progressBarSize.w-offset)/2;}
else
{scaleY=this.progressBarScale.y*scaler;let offset=this.progressBarSize.h*scaler;if(this.alignment===_common_defs__WEBPACK_IMPORTED_MODULE_6__["EVA_VERT_TOP"])
posY+=(this.progressBarSize.h-offset)/2;else if(this.alignment===_common_defs__WEBPACK_IMPORTED_MODULE_6__["EVA_VERT_BOTTOM"])
posY-=(this.progressBarSize.h-offset)/2;}
if(this.stencilMaskSprite)
{this.stencilMaskSprite.object.setScaleXYZ(scaleX,scaleY,1);this.stencilMaskSprite.object.setPosXYZ(posX,posY);}
else
{this.spriteAry[this.spriteApplyIndex].object.setScaleXYZ(scaleX,scaleY,1);this.spriteAry[this.spriteApplyIndex].object.setPosXYZ(posX,posY,0);}
}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"MenuTree",function(){return MenuTree;});var _managers_eventmanager__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(26);var _common_defs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);class MenuTree
{constructor(name,menuMap,rootMenu,defaultMenu,interfaceMenu=false)
{this.name=name;this.menuMap=menuMap;this.rootMenu=menuMap.get(rootMenu);this.defaultMenu=menuMap.get(defaultMenu);this.interfaceMenu=interfaceMenu;this.toMenu='';this.menuPathAry=[];this.state=_common_defs__WEBPACK_IMPORTED_MODULE_1__["EMTS_IDLE"];}
init()
{this.menuPathAry=[];if(this.rootMenu!==undefined)
{this.menuPathAry.push(this.rootMenu);this.rootMenu.activateMenu();}
}
update()
{if(this.menuPathAry.length)
this.menuPathAry[this.menuPathAry.length-1].update();}
transform()
{if(this.menuPathAry.length)
this.menuPathAry[this.menuPathAry.length-1].transform();}
render(camera)
{if(this.menuPathAry.length)
this.menuPathAry[this.menuPathAry.length-1].render(camera);}
isActive()
{return(this.menuPathAry.length>0);}
hasRootMenu()
{return(this.rootMenu!=undefined);}
handleEvent(event)
{if(!this.interfaceMenu)
{if(this.menuPathAry.length)
this.menuPathAry[this.menuPathAry.length-1].handleEvent(event);if(event instanceof CustomEvent)
{if(this.state===_common_defs__WEBPACK_IMPORTED_MODULE_1__["EMTS_IDLE"])
{if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_ESCAPE_ACTION"])
{this.onEscape(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_TOGGLE_ACTION"])
{this.onToggle(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_BACK_ACTION"])
{this.onBack(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_TO_TREE"])
{this.onToTree(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_TO_MENU"])
{this.onToMenu(event);}
}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_TRANS_IN"])
{this.onTransIn(event);}
else if(event.detail.type===_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_TRANS_OUT"])
{this.onTransOut(event);}
}
}
else
{if((event instanceof CustomEvent)&& event.detail.type<=_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_GAME_STATE_CHANGE"])
return;if(this.menuPathAry.length)
this.menuPathAry[this.menuPathAry.length-1].handleEvent(event);}
}
transitionMenu()
{if(this.menuPathAry.length===0)
{if(this.defaultMenu===undefined)
throw new Error('Default menu does not exist!');this.menuPathAry.push(this.defaultMenu);this.toMenu=this.defaultMenu.name;this.state=_common_defs__WEBPACK_IMPORTED_MODULE_1__["EMTS_ACTIVE"];_managers_eventmanager__WEBPACK_IMPORTED_MODULE_0__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_TRANS_IN"],_common_defs__WEBPACK_IMPORTED_MODULE_1__["ETC_BEGIN"]);}
else
{if(this.menuPathAry[this.menuPathAry.length-1]!=this.rootMenu)
{this.state=_common_defs__WEBPACK_IMPORTED_MODULE_1__["EMTS_ACTIVE"];_managers_eventmanager__WEBPACK_IMPORTED_MODULE_0__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_TRANS_OUT"],_common_defs__WEBPACK_IMPORTED_MODULE_1__["ETC_BEGIN"]);}
}
}
onEscape(event)
{let nameStr=event.detail.arg[0];if(this.menuPathAry.length||((nameStr!==null)&&(nameStr===this.name)))
{this.transitionMenu();}
}
onToggle(event)
{let nameStr=event.detail.arg[0];if(this.menuPathAry.length||((nameStr!==null)&&(nameStr===this.name)))
{if(this.rootMenu===undefined)
{this.transitionMenu();if(this.menuPathAry.length>1)
{let curMenu=this.menuPathAry[this.menuPathAry.length-1];this.menuPathAry=[];this.menuPathAry.push(curMenu);}
}
else
{if(this.menuPathAry.length>1)
this.transitionMenu();if(this.menuPathAry.length>2)
{let curMenu=this.menuPathAry[this.menuPathAry.length-1];this.menuPathAry=[];this.menuPathAry.push(this.rootMenu);this.menuPathAry.push(curMenu);}
}
}
}
onBack(event)
{if(this.menuPathAry.length &&(this.menuPathAry[this.menuPathAry.length-1]!=this.rootMenu))
{this.transitionMenu();}
}
onToTree(event)
{let nameStr=event.detail.arg[0];if((nameStr!==null)&&(nameStr===this.name))
{if(this.rootMenu===undefined)
this.transitionMenu();}
}
onToMenu(event)
{if(this.menuPathAry.length && 
(this.menuPathAry[this.menuPathAry.length-1].getActiveControl()==event.detail.arg[1]))
{this.state=_common_defs__WEBPACK_IMPORTED_MODULE_1__["EMTS_ACTIVE"];this.toMenu=event.detail.arg[0];if(this.menuMap.get(this.toMenu)===undefined)
throw new Error(`Menu does not exist!(${this.toMenu}).`);_managers_eventmanager__WEBPACK_IMPORTED_MODULE_0__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_TRANS_OUT"],_common_defs__WEBPACK_IMPORTED_MODULE_1__["ETC_BEGIN"]);}
}
onTransOut(event)
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_1__["ETC_END"])
{if(this.toMenu.length)
{this.menuPathAry.push(this.menuMap.get(this.toMenu));_managers_eventmanager__WEBPACK_IMPORTED_MODULE_0__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_TRANS_IN"],_common_defs__WEBPACK_IMPORTED_MODULE_1__["ETC_BEGIN"]);}
else if(this.menuPathAry.length &&(this.menuPathAry[this.menuPathAry.length-1]!==this.rootMenu))
{let menu=this.menuPathAry.pop();menu.reset();if(this.menuPathAry.length)
_managers_eventmanager__WEBPACK_IMPORTED_MODULE_0__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_TRANS_IN"],_common_defs__WEBPACK_IMPORTED_MODULE_1__["ETC_BEGIN"]);}
if(this.menuPathAry.length===0)
this.state=_common_defs__WEBPACK_IMPORTED_MODULE_1__["EMTS_IDLE"];}
}
onTransIn(event)
{if(event.detail.arg[0]===_common_defs__WEBPACK_IMPORTED_MODULE_1__["ETC_END"])
{_managers_eventmanager__WEBPACK_IMPORTED_MODULE_0__["eventManager"].dispatchEvent(_common_defs__WEBPACK_IMPORTED_MODULE_1__["EGE_MENU_SET_ACTIVE_CONTROL"],(this.toMenu.length===0)? _common_defs__WEBPACK_IMPORTED_MODULE_1__["EAC_LAST_ACTIVE_CONTROL"]:_common_defs__WEBPACK_IMPORTED_MODULE_1__["EAC_FIRST_ACTIVE_CONTROL"]);this.state=_common_defs__WEBPACK_IMPORTED_MODULE_1__["EMTS_IDLE"];this.toMenu='';}
}
getActiveMenu()
{if(this.menuPathAry.length===0)
throw new Error('There is no active menu!');return this.menuPathAry[this.menuPathAry.length-1];}
getScrollParam(msg)
{if(this.menuPathAry.length===0)
throw new Error('There is no active menu!');return this.menuPathAry[this.menuPathAry.length-1].getScrollParam(msg);}
isMenuItemActive()
{if(this.isActive())
{if(this.getActiveMenu().getActiveControl()!==null)
return false;}
return false;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"cameraManager",function(){return cameraManager;});var _common_camera__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(59);var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(18);class CameraManager
{constructor()
{this.defaultCamera=null;this.cameraMap=new Map;this.transformAry=[];}
load(filePath,callback)
{_utilities_genfunc__WEBPACK_IMPORTED_MODULE_1__["downloadFile"]('xml',filePath,(xmlNode)=>
{this.loadFromNode(xmlNode);callback();});}
loadFromNode(xmlNode)
{if(xmlNode)
{let defCamera=xmlNode.getElementsByTagName('default');if(defCamera.length)
{this.defaultCamera=new _common_camera__WEBPACK_IMPORTED_MODULE_0__["Camera"]();this.defaultCamera.initFromXml(defCamera[0]);}
else
{throw new Error(`Default camera is not defined!`);}
let cameraLst=xmlNode.getElementsByTagName('camera');for(let i=0;i<cameraLst.length;++i)
{let id=cameraLst[i].getAttribute('id');if(id==null)
throw new Error(`Camera does not have a id!`);if(this.cameraMap.has(id))
throw new Error(`Duplicate camera id(${id})!`);let camera=new _common_camera__WEBPACK_IMPORTED_MODULE_0__["Camera"]();camera.initFromXml(cameraLst[i]);this.cameraMap.set(id,camera);}
}
}
getDefault()
{if(this.defaultCamera==null)
throw new Error(`Default camera is not defined!Need to load camera objects before using manager`);return this.defaultCamera;}
get(cameraId)
{if(!this.cameraMap.has(cameraId))
throw new Error(`Camera id is not defined(${cameraId})!`);return this.cameraMap.get(cameraId);}
addToTransform(cameraId)
{let camera=this.cameraMap.get(cameraId);if(camera)
{let index=this.transformAry.findIndex((obj)=>obj===camera);if(index!==-1)
console.log(`Camera is already being transformed(${cameraId})!`);else
this.transformAry.push(camera);}
else
throw new Error(`Camera id is not defined(${cameraId})!`);}
removeFromTransform(cameraId)
{let camera=this.cameraMap.get(cameraId);if(camera)
{let index=this.transformAry.findIndex((obj)=>obj===camera);if(index===-1)
console.log(`Camera is not being transformed(${cameraId})!`);else
this.transformAry.splice(index,1);}
else
throw new Error(`Camera id is not defined(${cameraId})!`);}
transform()
{for(let i=0;i<this.transformAry.length;i++)
this.transformAry[i].transform();}
clear()
{this.defaultCamera=null;this.cameraMap=new Map;this.transformAry=[];}
clearTransAry()
{this.transformAry=[];}
}
var cameraManager=new CameraManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"loadManager",function(){return loadManager;});class LoadManager
{constructor()
{this.objects=[];}
add(obj)
{this.objects.push(obj);}
load()
{if(this.objects.length>0)
{let obj=this.objects.shift();obj(this.load.bind(this));}
}
}
var loadManager=new LoadManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"soundManager",function(){return soundManager;});var _managers_managerbase__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(31);var _common_sound__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(91);var _common_playlist__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(92);class SoundManager extends _managers_managerbase__WEBPACK_IMPORTED_MODULE_0__["ManagerBase"]
{constructor()
{super();this.context=null;if(typeof AudioContext!=='undefined')
this.context=new AudioContext();else if(typeof webkitAudioContext!=='undefined')
this.context=new webkitAudioContext();else
throw new Error('AudioContext not supported.');this.soundMapMap=new Map;this.playListMapMap=new Map;}
loadGroup(groupAry,finishCallback)
{super.loadGroup('Sound',this.soundMapMap,groupAry,finishCallback);}
loadFromNode(group,node,filePath,finishCallback)
{let groupMap=this.soundMapMap.get(group);let loadFilesNode=node.getElementsByTagName('load');for(let i=0;i<loadFilesNode.length;++i)
{let id=loadFilesNode[i].getAttribute('id');let filePath=loadFilesNode[i].getAttribute('file');if(groupMap.has(id))
throw new Error(`Duplicate sound group id(${id},${group},${filePath})!`);let snd=new _common_sound__WEBPACK_IMPORTED_MODULE_1__["Sound"];groupMap.set(id,snd);snd.loadFromNode(loadFilesNode[i]);this.downloadFile('binary',group,filePath,finishCallback,(group,audioData,filePath,finishCallback)=>
{this.loadFromBinaryData(group,id,audioData,filePath,finishCallback);});}
let playListNode=node.getElementsByTagName('playList');if(playListNode.length)
{let groupMap=new Map;this.playListMapMap.set(group,groupMap);for(let i=0;i<playListNode.length;++i)
{let id=playListNode[i].getAttribute('id');if(groupMap.has(id))
throw new Error(`Duplicate playlist group id(${id},${group},${filePath})!`);let playLst=new _common_playlist__WEBPACK_IMPORTED_MODULE_2__["PlayList"];groupMap.set(id,playLst);playLst.loadFromNode(playListNode[i],this.soundMapMap.get(group),group,filePath);}
}
}
loadFromBinaryData(group,id,audioData,filePath,finishCallback)
{++this.loadCounter;let groupMap=this.soundMapMap.get(group);let sound=groupMap.get(id);this.context.decodeAudioData(audioData,(soundBuffer)=>
{sound.init(this.context,soundBuffer);--this.loadCounter;if(this.loadCounter===0)
finishCallback();},(error)=>console.log(`Error decoding audio data(${error.err})!`));}
freeGroup(groupAry)
{for(let grp=0;grp<groupAry.length;++grp)
{let group=groupAry[grp];if(this.listTableMap.get(group)===undefined)
throw new Error(`Sound group name can't be found(${group})!`);let groupMap=this.soundMapMap.get(group);for(let [key,sound] of groupMap.entries())
sound.stop();if(this.soundMapMap.has(group))
this.soundMapMap.delete(group);if(this.playListMapMap.has(group))
this.playListMapMap.delete(group);}
}
getSound(group,soundID)
{let playLst=this.getPlayList(group,soundID);if(playLst)
{return playLst.getSound();}
let groupMap=this.soundMapMap.get(group);if(!groupMap)
throw new Error(`Sound group name can't be found(${group})!`);let snd=groupMap.get(soundID);if(!snd)
throw new Error(`Sound ID can't be found(${group},${soundID})!`);return snd;}
getPlayList(group,playLstID)
{let groupMap=this.playListMapMap.get(group);if(groupMap)
{return groupMap.get(playLstID);}
return undefined;}
play(group,soundID,loop=false)
{this.getSound(group,soundID).play(loop);}
pause(group,soundID)
{this.getSound(group,soundID).pause();}
resume(group,soundID)
{this.getSound(group,soundID).resume();}
stop(group,soundID)
{this.getSound(group,soundID).stop();}
setVolume(group,soundID,volume)
{this.getSound(group,soundID).setVolume(volume);}
getVolume(group,soundID)
{return this.getSound(group,soundID).getVolume();}
isPlaying(group,soundID)
{return this.getSound(group,soundID).isPlaying();}
isPaused(group,soundID)
{return this.getSound(group,soundID).isPaused();}
}
var soundManager=new SoundManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Sound",function(){return Sound;});class Sound
{constructor()
{this.context=null;this.buffer=null;this.source=null;this.defaultVolume=1;this.gainNode=null;this.startTime=0;this.paused=false;}
loadFromNode(node)
{let attr=node.getAttribute('volume');if(attr)
this.defaultVolume=Number(attr);}
init(context,buffer)
{this.context=context;this.buffer=buffer;this.gainNode=this.context.createGain();this.gainNode.gain.value=this.defaultVolume;}
play(loop=false,offset=0)
{this.stop();this.source=this.context.createBufferSource();this.source.buffer=this.buffer;this.source.loop=loop;this.source.connect(this.gainNode);this.gainNode.connect(this.context.destination);this.source.start(0,offset % this.buffer.duration);this.startTime=this.context.currentTime-offset;}
stop()
{if(this.startTime)
{if(!this.source.loop)
this.startTime=0;this.paused=false;this.source.stop();}
}
pause()
{if(!this.paused && this.startTime)
{this.paused=true;this.source.stop();this.startTime=(this.context.currentTime-this.startTime);}
}
resume()
{if(this.paused)
{this.paused=false;this.play(this.source.loop,this.startTime);}
}
setVolume(volume)
{let cappedVolume=volume;if(this.gainNode)
{if(cappedVolume<0)
cappedVolume=0;else if(cappedVolume>1)
cappedVolume=1;this.gainNode.gain.value=cappedVolume;}
}
getVolume()
{if(this.gainNode)
return this.gainNode.gain.value;return 0;}
isPlaying()
{if(this.startTime && this.source.loop)
return true;return(this.startTime &&((this.context.currentTime-this.startTime)<this.source.buffer.duration));}
isPaused()
{return this.paused;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"EST_NULL",function(){return EST_NULL;});__webpack_require__.d(__webpack_exports__,"EST_RANDOM",function(){return EST_RANDOM;});__webpack_require__.d(__webpack_exports__,"EST_SEQUENTIAL",function(){return EST_SEQUENTIAL;});__webpack_require__.d(__webpack_exports__,"PlayList",function(){return PlayList;});var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(18);const EST_NULL=0,EST_RANDOM=1,EST_SEQUENTIAL=2;class PlayList
{constructor()
{this.counter=0;this.current=0;this.type=EST_NULL;this.soundAry=[];}
loadFromNode(node,soundGroupMap,group,filePath)
{let playtype=node.getAttribute('playtype');if(playtype)
{if(playtype==='random')
this.type=EST_RANDOM;else if(playtype==='sequential')
this.type=EST_SEQUENTIAL;}
let soundNode=node.children;if(soundNode.length)
{for(let i=0;i<soundNode.length;++i)
{let id=soundNode[i].getAttribute("id");let snd=soundGroupMap.get(id);if(snd)
this.soundAry.push(snd);else
throw new Error(`Playlist sound Id does not exist(${id},${group},${filePath})!`);}
}
}
getSound()
{if((this.type===EST_RANDOM)&&(this.counter===0))
_utilities_genfunc__WEBPACK_IMPORTED_MODULE_0__["shuffle"](this.soundAry);this.current=this.counter;this.counter=(this.counter+1)% this.soundAry.length;return this.soundAry[this.current];}
play(channel,loopCount)
{if((this.type===EST_RANDOM)&&(this.counter===0))
_utilities_genfunc__WEBPACK_IMPORTED_MODULE_0__["shuffle"](this.soundAry);this.current=this.counter;this.soundAry[tihs.current].play(channel,loopCount);this.counter=(this.counter+1)% this.soundAry.length;}
stop()
{this.soundAry[this.current].stop();}
pause()
{this.soundAry[this.current].pause();}
resume()
{this.soundAry[this.current].resume();}
setVolume(volume)
{this.soundAry[this.current].setVolume(volume);}
getVolume()
{return this.soundAry[this.current].getVolume();}
isPlaying()
{return this.soundAry[this.current].isPlaying();}
isPaused()
{return this.soundAry[this.current].isPaused();}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"strategyManager",function(){return strategyManager;});var _managers_managerbase__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(31);class StrategyManager extends _managers_managerbase__WEBPACK_IMPORTED_MODULE_0__["ManagerBase"]
{constructor()
{super();this.strategyMap=new Map;this.strategyAry=[];}
addStrategy(strategyId,strategy,finishCallback)
{if(this.strategyMap.has(strategyId))
throw new Error(`Duplicate strategy id(${strategyId})!`);this.strategyMap.set(strategyId,strategy);super.load(strategyId,finishCallback);}
loadFromNode(strategyId,node,filePath,finishCallback)
{let strategy=this.strategyMap.get(strategyId);strategy.loadFromNode(strategyId,node,filePath,this.downloadFile.bind(this),finishCallback);}
activateStrategy(strategyId)
{let strategy=this.strategyMap.get(strategyId);if(strategy)
{let index=this.strategyAry.findIndex((obj)=>obj===strategy);if(index===-1)
this.strategyAry.push(strategy);else
console.log(`Strategy is already active(${strategyId})!`);}
else
throw new Error(`Strategy id can't be found(${strategyId})!`);return strategy;}
deactivateStrategy(strategyId)
{let strategy=this.strategyMap.get(strategyId);if(strategy)
{let index=this.strategyAry.findIndex((obj)=>obj===strategy);if(index!==-1)
this.strategyAry.splice(index,1);else
console.log(`Strategy is not active(${strategyId})!`);}
else
console.log(`Strategy id can't be found to deactivate(${strategyId})!`);return strategy;}
deleteStrategy(strategyGrp)
{for(let i=0;i<strategyGrp.length;++i)
{this.deactivateStrategy(strategyGrp[i]);let strategy=this.strategyMap.get(strategyGrp[i]);if(strategy)
{strategy.cleanUp();this.strategyMap.delete(strategyGrp[i]);}
else
console.log(`Strategy id can't be found to clean up(${strategyGrp[i]})!`);}
}
get(strategyId)
{let strategy=this.strategyMap.get(strategyId);if(!strategy)
throw new Error(`Sprite Manager strategy Id can't be found(${strategyId})!`);return strategy;}
clear()
{this.cleanUp();this.strategyMap.clear();this.strategyAry=[];}
cleanUp()
{for(let [key,strategy] of this.strategyMap.entries())
strategy.cleanUp();}
update()
{for(let i=0;i<this.strategyAry.length;i++)
this.strategyAry[i].update();}
transform()
{for(let i=0;i<this.strategyAry.length;i++)
this.strategyAry[i].transform();}
render()
{for(let i=0;i<this.strategyAry.length;i++)
this.strategyAry[i].render();}
}
var strategyManager=new StrategyManager;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"strategyLoader",function(){return strategyLoader;});var _strategy_strategymanager__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(93);var _utilities_genfunc__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(18);class Strategyloader
{constructor()
{}
load(filePath,callback)
{_utilities_genfunc__WEBPACK_IMPORTED_MODULE_1__["downloadFile"]('xml',filePath,(xmlNode)=>this.loadStartegy(xmlNode,filePath,callback));}
loadStartegy(xmlNode,filePath,callback)
{let strategyNode=xmlNode.getElementsByTagName('strategy');for(let i=0;i<strategyNode.length;++i)
{let strategyName=strategyNode[i].getAttribute('name');if(!strategyName)
throw new Error(`Strategy name not defined(${filePath}).`);let strategy=_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_0__["strategyManager"].get(strategyName);if(!strategy)
throw new Error(`Strategy name not defined(${strategyName},${filePath}).`);let cameraId=strategyNode[i].getAttribute('camera');if(cameraId)
strategy.setCamera(cameraId);this.populateStartegy(strategyNode[i],strategy,filePath);}
callback();}
populateStartegy(xmlNode,strategy,filePath)
{let nodeLst=xmlNode.getElementsByTagName('node');for(let i=0;i<nodeLst.length;++i)
{let name=nodeLst[i].getAttribute('name');let instance=nodeLst[i].getAttribute('instance');let active=nodeLst[i].getAttribute('active');let node=strategy.create(name,instance,(!active|| active==='true'));let spriteNode=nodeLst[i].getElementsByTagName('sprite');if(spriteNode.length)
this.initSprite(spriteNode[0],node.getSprite(),filePath);}
}
initSprite(xmlNode,sprite,filePath)
{sprite.object.loadTransFromNode(xmlNode);let scriptLst=xmlNode.getElementsByTagName('script');for(let i=0;i<scriptLst.length;++i)
{let attr=scriptLst[i].getAttribute('prepare');if(attr)
sprite.prepareScript(attr);}
}
}
var strategyLoader=new Strategyloader;}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ActorStrategy",function(){return ActorStrategy;});var _istrategy__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(96);var _node_nodedatalist__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(97);var _sprite_sprite__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(54);var _node_nodefactory__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(99);class ActorStrategy extends _istrategy__WEBPACK_IMPORTED_MODULE_0__["iStrategy"]
{constructor()
{super();this.idOffset=0;this.idDir=1;this.idInc=0;this.dataMap=new Map;this.nodeMap=new Map;this.nodeAry=[];this.activateAry=[];this.deactivateAry=[];this.deleteAry=[];}
loadFromNode(strategyId,node,filePath,downloadFileCallback,finishCallback)
{let defaultGroup='';let defaultObjName='';let defaultAIName='';let defaultId=-1;let attr=node.getAttribute('defaultGroup');if(attr!==null)
defaultGroup=attr;attr=node.getAttribute('defaultObjectName');if(attr!==null)
defaultObjName=attr;attr=node.getAttribute('defaultAIName');if(attr!==null)
defaultAIName=attr;attr=node.getAttribute('defaultId');if(attr!==null)
defaultId=Number(attr);for(let i=0;i<node.children.length;++i)
{let nodeName=node.children[i].getAttribute('name');if(!nodeName)
throw new Error(`Actor strategy missing node name!`);this.dataMap.set(nodeName,new _node_nodedatalist__WEBPACK_IMPORTED_MODULE_1__["NodeDataList"](node.children[i],defaultGroup,defaultObjName,defaultAIName));}
}
cleanUp()
{for(let i=0;i<this.nodeAry.length;i++)
this.nodeAry[i].cleanUp();}
getData(name)
{let data=this.dataMap.get(name);if(!data)
throw new Error(`Error finding sprite data(${name})!`);return data;}
create(dataName,instanceName=null,makeActive=true)
{let nodeId=((this.idInc++)+this.idOffset)*this.idDir;let nodeLst=this.getData(dataName).dataAry;let headNode=null;for(let i=0;i<nodeLst.length;i++)
{let node=_node_nodefactory__WEBPACK_IMPORTED_MODULE_3__["create"](nodeLst[i],nodeId);if(headNode===null)
headNode=node;else if(!headNode.addNode(node,nodeLst[i].nodeName))
throw new Error(`Parent node not found or node does not support adding children(${nodeLst[i].nodeName},${node.parentId})!`);}
if(!instanceName|| makeActive)
this.activateAry.push(headNode);if(instanceName)
{if(this.nodeMap.has(instanceName))
throw new Error(`Duplicate node instance name(${instanceName})!`);this.nodeMap.set(instanceName,headNode);}
return headNode;}
activateNode(instanceName)
{let node=this.nodeMap.get(instanceName);if(node)
{let index=this.nodeAry.findIndex((obj)=>obj===node);if(index!==-1)
console.log(`Node is already active(${instanceName})!`);else
this.activateAry.push(node);}
else
throw new Error(`Node can't be found(%s)(${instanceName})!`);return node;}
deactivateNode(instanceName)
{let node=this.nodeMap.get(instanceName);if(node)
{let index=this.nodeAry.findIndex((obj)=>obj===node);if(index!==-1)
console.log(`Node is not active(${instanceName})!`);else
this.deactivateAry.push(this.nodeAry[index]);}
else
console.log(`Node can't be found(%s)(${instanceName})!`);}
destroy(node)
{this.deleteAry.push(node);}
get(id)
{let node=null;if(typeof id==='string')
{node=this.nodeMap.get(id);if(!node)
throw new Error(`Node instance name can't be found(${id})!`);}
else
{let index=this.nodeAry.findIndex((node)=>node.getId()===id);if(index!==-1)
node=this.nodeAry[index];else
throw new Error(`Node index can't be found(${id})!`);}
return node;}
update()
{for(let i=0;i<this.nodeAry.length;i++)
this.nodeAry[i].update();this.addToActiveList();this.removeFromActiveList();this.deleteFromActiveList();}
transform()
{for(let i=0;i<this.nodeAry.length;i++)
this.nodeAry[i].transform();}
render()
{for(let i=0;i<this.nodeAry.length;i++)
this.nodeAry[i].render(this.camera);}
addToActiveList()
{if(this.activateAry.length)
{for(let i=0;i<this.activateAry.length;i++)
{this.activateAry[i].update();this.nodeAry.push(this.activateAry[i]);}
this.activateAry=[];}
}
removeFromActiveList()
{if(this.deactivateAry.length)
{for(let i=0;i<this.deactivateAry.length;i++)
{let node=this.deactivateAry[i];let index=this.nodeAry.findIndex((obj)=>obj===node);if(index!==-1)
this.nodeAry.splice(index,1);else
throw new Error(`Node id can't be found(${id})!`);}
}
}
deleteFromActiveList()
{if(this.deleteAry.length)
{for(let i=0;i<this.deleteAry.length;i++)
{let node=this.deleteAry[i];let index=this.nodeAry.findIndex((obj)=>obj===node);if(index!==-1)
{this.nodeAry[index].cleanUp();this.nodeAry.splice(index,1);}
else
throw new Error(`Node id can't be found(${id})!`);for(let [key,obj] of this.nodeMap.entries())
{if(obj===node)
{this.nodeMap.delete(key);break;}
}
}
this.deleteAry=[];}
}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"iStrategy",function(){return iStrategy;});var _managers_cameramanager__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(88);class iStrategy
{constructor()
{this.camera=_managers_cameramanager__WEBPACK_IMPORTED_MODULE_0__["cameraManager"].getDefault();}
setCamera(cameraId)
{this.camera=_managers_cameramanager__WEBPACK_IMPORTED_MODULE_0__["cameraManager"].get(cameraId);}
create(dataName,instanceName=null)
{throw new Error(`This strategy does not support dynamic node creation!`);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"NodeDataList",function(){return NodeDataList;});var _nodedata__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(98);var _common_defs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);class NodeDataList
{constructor(
node,defGroup='',defObjName='',defAIName='',defId=_common_defs__WEBPACK_IMPORTED_MODULE_1__["SPRITE_DEFAULT_ID"])
{this.dataAry=[];let defaultGroup=defGroup;let defaultObjName=defObjName;let defaultAIName=defAIName;let nodeName='';let attr=node.getAttribute('defaultGroup');if(attr)
defaultGroup=attr;attr=node.getAttribute('defaultObjectName');if(attr)
defaultObjName=attr;attr=node.getAttribute('defaultAIName');if(attr!==null)
defaultAIName=attr;attr=node.getAttribute('defaultId');if(attr)
defId=Number(attr);attr=node.getAttribute('name');if(attr)
nodeName=attr;this.idCounter=_common_defs__WEBPACK_IMPORTED_MODULE_1__["NODE_DEFAULT_ID"];let nodeData=new _nodedata__WEBPACK_IMPORTED_MODULE_0__["NodeData"](node,nodeName,this.idCounter++,_common_defs__WEBPACK_IMPORTED_MODULE_1__["PARENT_NODE_DEFAULT_ID"],defaultGroup,defaultObjName,defaultAIName,defId);this.dataAry.push(nodeData);this.loadNode(node,nodeData,defaultGroup,defaultObjName,defaultAIName,defId);}
loadNode(node,nodeData,defaultGroup,defaultObjName,defaultAIName,defId)
{for(let i=0;i<node.children.length;++i)
{if(node.children[i].nodeName=='node')
{let nodeName='';let attr=node.children[i].getAttribute('name');if(attr)
nodeName=attr;let childNodeData=new _nodedata__WEBPACK_IMPORTED_MODULE_0__["NodeData"](node,nodeName,this.idCounter++,nodeData.nodeId,defaultGroup,defaultObjName,defaultAIName,defId);this.dataAry.push(childNodeData);this.loadNode(node.children[i],childNodeData,defaultGroup,defaultObjName,defaultAIName,defId);}
}
}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"NodeData",function(){return NodeData;});var _sprite_spritedata__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(71);var _common_defs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);class NodeData extends _sprite_spritedata__WEBPACK_IMPORTED_MODULE_0__["SpriteData"]
{constructor(
xmlNode,nodeName,nodeId=_common_defs__WEBPACK_IMPORTED_MODULE_1__["NODE_DEFAULT_ID"],parenNodetId=_common_defs__WEBPACK_IMPORTED_MODULE_1__["PARENT_NODE_DEFAULT_ID"],defGroup='',defObjName='',defAIName='',defId=_common_defs__WEBPACK_IMPORTED_MODULE_1__["SPRITE_DEFAULT_ID"])
{super(xmlNode.firstElementChild,defGroup,defObjName,defAIName,defId);this.nodeName=nodeName;this.nodeId=nodeId;this.parenNodetId=parenNodetId;this.nodeType=_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENT_NULL"];let attr=xmlNode.getAttribute('type');if(attr=="spriteNode")
this.nodeType=_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENT_SPRITE"];else if(attr=="objectNodeMultiList")
this.nodeType=_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENT_OBJECT_MULTI_LIST"];else if(attr=="spriteNodeMultiList")
this.nodeType=_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENT_SPRITE_MULTI_LIST"];else if(attr=="uiControlNode")
{this.nodeType=_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENT_UI_CONTROL"];if(xmlNode.firstElementChild.nodeName=='uiProgressBar')
this.uiControlType=_common_defs__WEBPACK_IMPORTED_MODULE_1__["ECT_PROGRESS_BAR"];else if(xmlNode.firstElementChild.nodeName=='uiMeter')
this.uiControlType=_common_defs__WEBPACK_IMPORTED_MODULE_1__["ECT_METER"];else
throw new Error(`Control type node not defined(${xmlNode.firstElementChild.nodeName}).`);}
}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"create",function(){return create;});var _objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(30);var _managers_signalmanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2);var _sprite_sprite__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(54);var _gui_uiprogressbar__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(86);var _gui_uimeter__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(84);var _node_spritenode__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(100);var _node_uicontrolnode__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(102);var _node_objectnodemultilist__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(103);var _node_spritenodemultilist__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(106);var _common_defs__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(5);function create(nodeData,nodeId)
{let node=null;if(nodeData.nodeType===_common_defs__WEBPACK_IMPORTED_MODULE_9__["ENT_SPRITE"])
{node=new _node_spritenode__WEBPACK_IMPORTED_MODULE_5__["SpriteNode"](_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_0__["objectDataManager"].getData(nodeData.group,nodeData.objectName),nodeId);LoadSprite(node,nodeData);}
else if(nodeData.nodeType===_common_defs__WEBPACK_IMPORTED_MODULE_9__["ENT_OBJECT_MULTI_LIST"])
{node=new _node_objectnodemultilist__WEBPACK_IMPORTED_MODULE_7__["ObjectNodeMultiLst"](nodeId,nodeData.nodeId,nodeData.parenNodetId);LoadObject(node,nodeData);}
else if(nodeData.nodeType===_common_defs__WEBPACK_IMPORTED_MODULE_9__["ENT_SPRITE_MULTI_LIST"])
{node=new _node_spritenodemultilist__WEBPACK_IMPORTED_MODULE_8__["SpriteNodeMultiLst"](_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_0__["objectDataManager"].getData(nodeData.group,nodeData.objectName),nodeId,nodeData.nodeId,nodeData.parenNodetId);LoadSprite(node,nodeData);}
else if(nodeData.nodeType===_common_defs__WEBPACK_IMPORTED_MODULE_9__["ENT_UI_CONTROL"])
{node=CreateUIControlNode(nodeData,nodeId);}
else
throw new Error(`Node type not defined(${nodeData.nodeName}).`);return node;}
function LoadSprite(node,nodeData)
{node.sprite.load(nodeData.xmlNode);node.sprite.init();node.sprite.initPhysics();if(nodeData.aiName!=='')
_managers_signalmanager__WEBPACK_IMPORTED_MODULE_1__["signalManager"].broadcast_aiCreate(nodeData.aiName,node);}
function LoadObject(object,nodeData)
{object.loadTransFromNode(nodeData.xmlNode);}
function CreateUIControlNode(nodeData,nodeId)
{let control=null;if(nodeData.uiControlType==_common_defs__WEBPACK_IMPORTED_MODULE_9__["ECT_PROGRESS_BAR"])
control=new _gui_uiprogressbar__WEBPACK_IMPORTED_MODULE_3__["UIProgressBar"](nodeData.group);else if(nodeData.uiControlType==_common_defs__WEBPACK_IMPORTED_MODULE_9__["ECT_METER"])
control=new _gui_uimeter__WEBPACK_IMPORTED_MODULE_4__["UIMeter"](nodeData.group);else
throw new Error(`Node control type not defined(${nodeData.nodeName}).`);control.loadFromNode(nodeData.xmlNode);control.init();return new _node_uicontrolnode__WEBPACK_IMPORTED_MODULE_6__["UIControlNode"](control);}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"SpriteNode",function(){return SpriteNode;});var _inode__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(101);var _sprite_sprite__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(54);var _common_defs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(5);var _objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(30);class SpriteNode extends _inode__WEBPACK_IMPORTED_MODULE_0__["iNode"]
{constructor(objectData,spriteId=_common_defs__WEBPACK_IMPORTED_MODULE_2__["SPRITE_DEFAULT_ID"])
{super();this.sprite=new _sprite_sprite__WEBPACK_IMPORTED_MODULE_1__["Sprite"](objectData,spriteId);this.type=_common_defs__WEBPACK_IMPORTED_MODULE_2__["ENT_SPRITE"];}
update()
{this.sprite.update();this.sprite.physicsUpdate();}
transform(object=null)
{if(object)
this.sprite.object.transform(object);else
this.sprite.object.transform();}
render(camera)
{this.sprite.render(camera);}
getSprite()
{return this.sprite;}
getId()
{return this.sprite.id;}
setAI(ai)
{this.sprite.setAI(ai);}
cleanUp()
{this.sprite.cleanUp();}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"iNode",function(){return iNode;});var _common_defs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(5);class iNode
{constructor()
{this.type=_common_defs__WEBPACK_IMPORTED_MODULE_0__["ENT_NULL"];}
getId()
{return _common_defs__WEBPACK_IMPORTED_MODULE_0__["NODE_DEFAULT_ID"];}
getParentId()
{return _common_defs__WEBPACK_IMPORTED_MODULE_0__["PARENT_NODE_DEFAULT_ID"];}
next()
{return null;}
findParent(searchNode)
{return null;}
resetIndexes()
{}
reset()
{}
getChildNode(nodeName)
{return null;}
getControl()
{return null;}
getSprite()
{return null;}
getObject()
{return null;}
setAI(ai)
{}
cleanUp()
{}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"UIControlNode",function(){return UIControlNode;});var _inode__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(101);var _common_defs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);class UIControlNode extends _inode__WEBPACK_IMPORTED_MODULE_0__["iNode"]
{constructor(uiControl)
{super();this.uiControl=uiControl;this.type=_common_defs__WEBPACK_IMPORTED_MODULE_1__["ENT_UI_CONTROL"];}
update()
{this.uiControl.update();}
transform(object=null)
{if(object)
this.uiControl.transform(object);else
this.uiControl.transform();}
render(camera)
{this.uiControl.render(camera);}
getControl()
{return this.uiControl;}
getId()
{return _common_defs__WEBPACK_IMPORTED_MODULE_1__["SPRITE_DEFAULT_ID"];}
cleanUp()
{this.uiControl.cleanUp();}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ObjectNodeMultiLst",function(){return ObjectNodeMultiLst;});var _2d_object2d__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(51);var _nodemultilist__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(104);var _common_defs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(5);class ObjectNodeMultiLst extends _nodemultilist__WEBPACK_IMPORTED_MODULE_1__["NodeMultiLst"]
{constructor(
objectId=_common_defs__WEBPACK_IMPORTED_MODULE_2__["OBJECT_DEFAULT_ID"],nodeId=_common_defs__WEBPACK_IMPORTED_MODULE_2__["NODE_DEFAULT_ID"],parentId=_common_defs__WEBPACK_IMPORTED_MODULE_2__["PARENT_NODE_DEFAULT_ID"])
{super(nodeId,parentId);this.object=new _2d_object2d__WEBPACK_IMPORTED_MODULE_0__["Object2D"];this.objectId=objectId;this.ai=null;}
update()
{if(this.ai)
this.ai.update();}
transform(object)
{if(object)
this.object.transform(object);else
this.object.transform();super.transform();}
getObject()
{return this.object;}
getId()
{return this.objectId;}
setAI(ai)
{this.ai=ai;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"NodeMultiLst",function(){return NodeMultiLst;});var _node__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(105);var _common_defs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);class NodeMultiLst extends _node__WEBPACK_IMPORTED_MODULE_0__["Node"]
{constructor(id=_common_defs__WEBPACK_IMPORTED_MODULE_1__["NODE_DEFAULT_ID"],parentId=_common_defs__WEBPACK_IMPORTED_MODULE_1__["PARENT_NODE_DEFAULT_ID"])
{super(id,parentId)
this.allNodeMap=null
}
cleanUp()
{this.cleanUpRecursive(this);this.resetIndexes();}
cleanUpRecursive(node)
{if(node!==null)
{let nextNode;do
{nextNode=node.next();if(nextNode!==null)
{if(nextNode.getSprite()!==null)
nextNode.getSprite().cleanUp();this.updateRecursive(nextNode);}
}
while(nextNode!==null);}
}
update()
{this.updateRecursive(this);this.resetIndexes();}
updateRecursive(node)
{if(node!==null)
{let nextNode;do
{nextNode=node.next();if(nextNode!==null)
{if(nextNode.getSprite()!==null)
{nextNode.getSprite().physicsUpdate();nextNode.getSprite().update();}
this.updateRecursive(nextNode);}
}
while(nextNode!==null);}
}
transform()
{this.transformRecursive(this);this.resetIndexes();}
transformRecursive(node)
{if(node!==null)
{let nextNode;do
{nextNode=node.next();if(nextNode!=null)
{let nextObj=null;let obj=null;if(nextNode.getSprite()!==null)
nextObj=nextNode.getSprite().object;else if(nextNode.getObject()!==null)
nextObj=nextNode.getObject();if(node.getSprite()!==null)
obj=node.getSprite().object;else if(node.getObject()!==null)
obj=node.getObject();nextObj.transform(obj);this.transformRecursive(nextNode);}
}
while(nextNode!==null);}
}
render(camera)
{this.renderRecursive(this,camera);this.resetIndexes();}
renderRecursive(node,camera)
{if(node!==null)
{let nextNode;do
{nextNode=node.next();if(nextNode!=null)
{if(nextNode.getSprite()!==null)
nextNode.getSprite().render(camera);this.renderRecursive(nextNode,camera);}
}
while(nextNode!==null);}
}
addNode(node,nodeName)
{if(this.allNodeMap===null)
this.allNodeMap=new Map;let name;if(nodeName)
name=nodeName
else
name=`blank_${this.allNodeMap.size}`;if(this.allNodeMap.has(name))
throw new Error(`Duplicate node name(${name})!`);this.allNodeMap.set(name,node);let result=super.addNode(node);this.resetIndexes();return result;}
resetIndexes()
{super.reset();for(let [key,node] of this.allNodeMap.entries())
node.reset();}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Node",function(){return Node;});var _inode__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(101);var _common_defs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);class Node extends _inode__WEBPACK_IMPORTED_MODULE_0__["iNode"]
{constructor(id,parentId)
{super();this.nodeAry=[];this.index=0;this.id=id;this.parentId=parentId;}
next()
{let result=null;if(this.index<this.nodeAry.length)
{result=this.nodeAry[this.index];this.index++;}
return result;}
addNode(node)
{let parentNode=this.findParent(node);if(parentNode!=null)
parentNode.pushNode(node);else
return false;return true;}
pushNode(node)
{this.nodeAry.push(node);}
findParent(searchNode)
{let result=null;if(searchNode!=null)
{if(this.id==searchNode.getParentId())
{result=this;}
else
{let nextNode;do
{nextNode=this.next();if(nextNode!=null)
{result=nextNode.findParent(searchNode);}
}
while(nextNode!=null);}
}
return result;}
getParentId()
{return this.parentId;}
reset()
{this.index=0;}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"SpriteNodeMultiLst",function(){return SpriteNodeMultiLst;});var _nodemultilist__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(104);var _sprite_sprite__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(54);var _common_defs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(5);var _objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(30);class SpriteNodeMultiLst extends _nodemultilist__WEBPACK_IMPORTED_MODULE_0__["NodeMultiLst"]
{constructor(
objectData,spriteId=_common_defs__WEBPACK_IMPORTED_MODULE_2__["SPRITE_DEFAULT_ID"],nodeId=_common_defs__WEBPACK_IMPORTED_MODULE_2__["NODE_DEFAULT_ID"],parentId=_common_defs__WEBPACK_IMPORTED_MODULE_2__["PARENT_NODE_DEFAULT_ID"])
{super(nodeId,parentId);this.sprite=new _sprite_sprite__WEBPACK_IMPORTED_MODULE_1__["Sprite"](objectData,spriteId);this.type=_common_defs__WEBPACK_IMPORTED_MODULE_2__["ENT_SPRITE_MULTI_LIST"];}
update()
{this.sprite.update();this.sprite.physicsUpdate();super.update();}
transform(object)
{if(object)
this.sprite.object.transform(object);else
this.sprite.object.transform();super.transform();}
render(camera)
{this.sprite.render(camera);super.render(camera);}
getSprite()
{return this.sprite;}
getId()
{return this.sprite.id;}
setAI(ai)
{this.sprite.setAI(ai);}
cleanUp()
{this.sprite.cleanUp();}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ASSET_COUNT",function(){return ASSET_COUNT;});__webpack_require__.d(__webpack_exports__,"TitleScreenState",function(){return TitleScreenState;});__webpack_require__.d(__webpack_exports__,"load",function(){return load;});var _library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(26);var _commonstate__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(108);var _library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(30);var _library_gui_menumanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(49);var _library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(93);var _library_strategy_actorstrategy__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(95);var _library_strategy_strategyloader__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(94);var _library_script_scriptcomponent__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(70);var _library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(68);var _library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(25);var _library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(89);var _library_utilities_assetholder__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(39);var _library_common_defs__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(5);var _statedefs__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(24);const ASSET_COUNT=4;class TitleScreenState extends _commonstate__WEBPACK_IMPORTED_MODULE_1__["CommonState"]
{constructor(gameLoopCallback)
{super(_statedefs__WEBPACK_IMPORTED_MODULE_13__["EGS_TITLE_SCREEN"],_statedefs__WEBPACK_IMPORTED_MODULE_13__["EGS_GAME_LOAD"],gameLoopCallback);_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_4__["strategyManager"].activateStrategy('_title-screen_');this.scriptComponent=new _library_script_scriptcomponent__WEBPACK_IMPORTED_MODULE_7__["ScriptComponent"];this.scriptComponent.set(_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_9__["scriptManager"].get('ScreenFade')(0,1,500));_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_3__["menuManager"].allowEventHandling=true;_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_3__["menuManager"].activateTree(['title_screen_tree']);_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_0__["eventManager"].clear();_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_8__["highResTimer"].calcElapsedTime();requestAnimationFrame(this.callback);}
cleanUp()
{unload();}
handleEvent(event)
{super.handleEvent(event);if(event instanceof CustomEvent)
{if(event.detail.type===_library_common_defs__WEBPACK_IMPORTED_MODULE_12__["EGE_MENU_GAME_STATE_CHANGE"])
{if(event.detail.arg[0]===_library_common_defs__WEBPACK_IMPORTED_MODULE_12__["ETC_BEGIN"])
this.scriptComponent.set(_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_9__["scriptManager"].get('ScreenFade')(1,0,500,true));}
}
}
update()
{super.update();this.scriptComponent.update();_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_4__["strategyManager"].update();}
transform()
{super.transform();_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_4__["strategyManager"].transform();}
render()
{super.render();_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_4__["strategyManager"].render();_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_3__["menuManager"].render();}
}
function unload()
{_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_4__["strategyManager"].deleteStrategy(['_title-screen_']);_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_2__["objectDataManager"].freeGroup(['(title_screen)']);}
function load()
{_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add(
(callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_2__["objectDataManager"].loadXMLGroup2D(['(title_screen)'],callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add(
(callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_2__["objectDataManager"].loadAssets2D(['(title_screen)'],callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add(
(callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_2__["objectDataManager"].createFromData(['(title_screen)'],callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add(
(callback)=>_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_4__["strategyManager"].addStrategy('_title-screen_',new _library_strategy_actorstrategy__WEBPACK_IMPORTED_MODULE_5__["ActorStrategy"],callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_10__["loadManager"].add(
(callback)=>_library_strategy_strategyloader__WEBPACK_IMPORTED_MODULE_6__["strategyLoader"].load('data/objects/strategy/state/titlescreen.loader',callback));}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"CommonState",function(){return CommonState;});var _gamestate__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(22);var _library_gui_menumanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(49);var _library_system_device__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(8);var _library_common_defs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(5);var _statedefs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(24);class CommonState extends _gamestate__WEBPACK_IMPORTED_MODULE_0__["GameState"]
{constructor(gameState,nextState,callBack)
{super(gameState,nextState,callBack);}
handleEvent(event)
{_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_1__["menuManager"].handleEvent(event);if(event instanceof CustomEvent)
{if(event.detail.type===_library_common_defs__WEBPACK_IMPORTED_MODULE_3__["EGE_MENU_GAME_STATE_CHANGE"])
{if(event.detail.arg[0]===_library_common_defs__WEBPACK_IMPORTED_MODULE_3__["ETC_BEGIN"])
{_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_1__["menuManager"].allowEventHandling=false;this.stateMessage.setMsg(this.getGameState(event.detail.arg[1]),this.gameState);}
}
else if(event.detail.type===_statedefs__WEBPACK_IMPORTED_MODULE_4__["ESE_FADE_OUT_COMPLETE"])
{_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_1__["menuManager"].clearActiveTrees();this.stateChange=true;}
}
}
update()
{_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_1__["menuManager"].update();}
transform()
{_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_1__["menuManager"].transform();}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Hold",function(){return Hold;});__webpack_require__.d(__webpack_exports__,"PlayAnim",function(){return PlayAnim;});__webpack_require__.d(__webpack_exports__,"FrameExecute",function(){return FrameExecute;});__webpack_require__.d(__webpack_exports__,"FadeTo",function(){return FadeTo;});__webpack_require__.d(__webpack_exports__,"ColorTo",function(){return ColorTo;});__webpack_require__.d(__webpack_exports__,"loadScripts",function(){return loadScripts;});var _library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(68);var _library_managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(19);var _library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(25);var _library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(26);var _library_common_color__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(36);var _state_statedefs__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(24);class Hold
{constructor(sprite)
{this.time=0;this.finished=false;}
init(time)
{this.time=time;this.finished=false;}
execute()
{this.time-=_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime;if(this.time<0)
{this.finished=true;}
}
}
class PlayAnim
{constructor(sprite)
{this.sprite=sprite;this.frameCount=this.sprite.getFrameCount();this.time=0;this.fps=0;this.counter=0;this.loop=false;this.finished=false;}
init(fps,loop=false)
{this.fps=fps;this.time=1000.0/this.fps;this.loop=loop;this.counter=0;this.finished=false;}
execute()
{this.time-=_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime;if(this.time<0)
{this.time=1000.0/this.fps;this.counter++;if(this.counter<this.frameCount)
{this.sprite.setFrame(this.counter);}
else
{if(this.loop)
{this.counter=0;this.sprite.setFrame(this.counter);}
else
this.finished=true;}
}
}
isFinished(){return this.finished;}
}
class FrameExecute
{constructor(sprite)
{this.sprite=sprite;this.time=0;this.fps=0;this.finished=false;}
init(fps)
{this.fps=fps;this.time=1000.0/this.fps;this.finished=false;}
execute()
{this.time-=_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime;if(this.time<0)
{this.time=1000.0/this.fps;this.frame();}
}
frame()
{}
isFinished(){return this.finished;}
}
class FadeTo
{constructor()
{this.current=0;this.final=0;this.time=0;this.inc=0;this.finished=false;}
init(current,final,time)
{this.current=current;this.final=final;this.time=time;this.inc=(this.final-this.current)/this.time;this.finished=false;}
execute()
{this.time-=_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime;if(this.time<0)
this.finished=true;else
this.current+=(this.inc*_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime);}
}
class ColorTo
{constructor()
{this.current=new _library_common_color__WEBPACK_IMPORTED_MODULE_4__["Color"];this.inc=new _library_common_color__WEBPACK_IMPORTED_MODULE_4__["Color"];this.final;this.time;}
init(current,final,time)
{this.time=time;this.final=final;this.current.copy(current);for(let i=0;i<4;++i)
this.inc.data[i]=(this.final.data[i]-this.current.data[i])/this.time;this.finished=false;}
execute()
{this.time-=_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime;if(this.time<0)
{this.finished=true;}
else
{for(let i=0;i<4;++i)
this.current.data[i]+=this.inc.data[i]*_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime;}
}
get color()
{if(this.finished)
return this.final;else
return this.current;}
isFinished(){return this.finished;}
}
class ScreenFade extends FadeTo
{constructor(current,final,time)
{super();this.init(current,final,time);}
execute()
{super.execute();if(this.finished)
{_library_managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__["shaderManager"].setAllShaderValue4fv('additive',[this.final,this.final,this.final,1]);if(this.inc>0)
_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_3__["eventManager"].dispatchEvent(_state_statedefs__WEBPACK_IMPORTED_MODULE_5__["ESE_FADE_IN_COMPLETE"]);else
_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_3__["eventManager"].dispatchEvent(_state_statedefs__WEBPACK_IMPORTED_MODULE_5__["ESE_FADE_OUT_COMPLETE"]);}
else
{_library_managers_shadermanager__WEBPACK_IMPORTED_MODULE_1__["shaderManager"].setAllShaderValue4fv('additive',[this.current,this.current,this.current,1]);}
}
isFinished(){return this.finished;}
}
function loadScripts()
{_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_2__["scriptManager"].set('ScreenFade',(current,final,time)=>{return new ScreenFade(current,final,time);});}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"loadScripts",function(){return loadScripts;});var _library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(25);var _library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(68);var _utilityscripts__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(109);class State_PlayLoadAnim extends _utilityscripts__WEBPACK_IMPORTED_MODULE_2__["FrameExecute"]
{constructor(sprite)
{super(sprite);}
init()
{super.init(10);}
frame()
{this.sprite.object.incRotXYZ(0.0,0.0,-30.0);}
}
function loadScripts()
{_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_0__["scriptManager"].set('State_PlayLoadAnim',(sprite)=>{return new State_PlayLoadAnim(sprite);});}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"loadScripts",function(){return loadScripts;});var _library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(68);var _library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(25);var _library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(26);var _library_managers_soundmanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(90);var _library_common_color__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(36);var _utilityscripts__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(109);var _library_common_defs__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(5);class Control_OnActive
{constructor(control)
{this.control=control;}
init()
{}
execute()
{_library_managers_soundmanager__WEBPACK_IMPORTED_MODULE_3__["soundManager"].play('(menu)','active');}
isFinished(){return true;}
}
class Control_OnSelect
{constructor(control)
{this.control=control;}
init()
{}
execute()
{_library_managers_soundmanager__WEBPACK_IMPORTED_MODULE_3__["soundManager"].play('(menu)','select');}
isFinished(){return true;}
}
class Menu_TransIn extends _utilityscripts__WEBPACK_IMPORTED_MODULE_5__["FadeTo"]
{constructor(menu)
{super();this.menu=menu;}
init()
{super.init(0,1,250);this.menu.setAlpha(this.current);this.menu.setVisible(true);}
execute()
{super.execute();if(this.finished)
{this.menu.setAlpha(this.final);_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_library_common_defs__WEBPACK_IMPORTED_MODULE_6__["EGE_MENU_TRANS_IN"],_library_common_defs__WEBPACK_IMPORTED_MODULE_6__["ETC_END"]);}
else
{this.menu.setAlpha(this.current);}
}
isFinished(){return this.finished;}
}
class Menu_TransOut extends _utilityscripts__WEBPACK_IMPORTED_MODULE_5__["FadeTo"]
{constructor(menu)
{super();this.menu=menu;}
init()
{super.init(1,0,250);this.menu.setAlpha(this.current);this.menu.setVisible(true);}
execute()
{super.execute();if(this.finished)
{this.menu.setAlpha(this.final);this.menu.setVisible(false);_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_library_common_defs__WEBPACK_IMPORTED_MODULE_6__["EGE_MENU_TRANS_OUT"],_library_common_defs__WEBPACK_IMPORTED_MODULE_6__["ETC_END"]);}
else
{this.menu.setAlpha(this.current);}
}
isFinished(){return this.finished;}
}
class Control_Disabled
{constructor(sprite)
{this.sprite=sprite;}
init()
{}
execute()
{let color=new _library_common_color__WEBPACK_IMPORTED_MODULE_4__["Color"];color.copy(this.sprite.getDefaultColor());color.transformHSV(0,0,1);this.sprite.setColor(color);this.finished=true;}
isFinished(){return this.finished;}
}
class Control_Inactive
{constructor(sprite)
{this.sprite=sprite;}
init()
{}
execute()
{this.sprite.setColor(this.sprite.getDefaultColor());this.finished=true;}
isFinished(){return this.finished;}
}
class Control_Hidden
{constructor(sprite)
{this.sprite=sprite;}
init()
{}
execute()
{this.sprite.object.setVisible(false);this.finished=true;}
isFinished(){return this.finished;}
}
class Base_Control_Active
{constructor(sprite)
{this.sprite=sprite;this.hiColor=new _library_common_color__WEBPACK_IMPORTED_MODULE_4__["Color"];this.lowColor=new _library_common_color__WEBPACK_IMPORTED_MODULE_4__["Color"];this.colorTo=new _utilityscripts__WEBPACK_IMPORTED_MODULE_5__["ColorTo"];this.toggle=false;}
init(hiHSV,lowHSV)
{this.sprite.object.setVisible(true);this.hiColor.copy(this.sprite.getDefaultColor());this.hiColor.transformHSV(0,1,hiHSV);this.lowColor.copy(this.sprite.getDefaultColor());this.lowColor.transformHSV(0,1,lowHSV);this.colorTo.init(this.sprite.getColor(),this.hiColor,500);this.toggle=false;}
execute()
{this.colorTo.execute();this.sprite.setColor(this.colorTo.color);if(this.colorTo.isFinished())
{if(this.toggle)
this.colorTo.init(this.sprite.getColor(),this.hiColor,500);else
this.colorTo.init(this.sprite.getColor(),this.lowColor,500);this.toggle=!this.toggle;}
}
}
class Control_Active extends Base_Control_Active
{constructor(sprite)
{super(sprite);}
init()
{super.init(1.3,0.5);}
execute()
{super.execute();}
isFinished(){return false;}
}
class Control_Solid_Active extends Base_Control_Active
{constructor(sprite)
{super(sprite);}
init()
{super.init(1.1,0.5);}
execute()
{super.execute();}
isFinished(){return false;}
}
class Base_Control_Selected
{constructor(sprite)
{this.sprite=sprite;this.hiColor=new _library_common_color__WEBPACK_IMPORTED_MODULE_4__["Color"];this.lowColor=new _library_common_color__WEBPACK_IMPORTED_MODULE_4__["Color"];this.colorTo=new _utilityscripts__WEBPACK_IMPORTED_MODULE_5__["ColorTo"];this.toggle=false;this.finished=false;}
init(hiHSV,lowHSV)
{this.sprite.object.setVisible(true);this.hiColor.copy(this.sprite.getDefaultColor());this.hiColor.transformHSV(0,1,hiHSV);this.lowColor.copy(this.sprite.getDefaultColor());this.lowColor.transformHSV(0,1,lowHSV);this.colorTo.init(this.hiColor,this.lowColor,120);this.toggle=false;this.finished=false;}
execute()
{this.colorTo.execute();this.sprite.setColor(this.colorTo.color);if(this.colorTo.isFinished())
{if(this.toggle)
{this.sprite.setColor(this.sprite.getDefaultColor());this.finished=true;}
else
{this.colorTo.init(this.sprite.getColor(),this.hiColor,100);this.toggle=true;}
}
}
}
class Control_Selected_Dispatch_Exe extends Base_Control_Selected
{constructor(sprite)
{super(sprite);}
init()
{super.init(1.7,0.6);}
execute()
{super.execute();if(this.finished)
{_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_library_common_defs__WEBPACK_IMPORTED_MODULE_6__["EGE_MENU_SELECT_EXECUTE"]);}
}
isFinished(){return this.finished;}
}
class Control_Selected_Dispatch_Exe_Act extends Base_Control_Selected
{constructor(sprite)
{super(sprite);}
init()
{super.init(1.7,0.6);}
execute()
{super.execute();if(this.finished)
{_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_library_common_defs__WEBPACK_IMPORTED_MODULE_6__["EGE_MENU_SELECT_EXECUTE"]);_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_library_common_defs__WEBPACK_IMPORTED_MODULE_6__["EGE_MENU_REACTIVATE"]);}
}
isFinished(){return this.finished;}
}
class Control_Selected_Visible extends Base_Control_Selected
{constructor(sprite)
{super(sprite);}
init()
{super.init(1.7,0.6);}
execute()
{super.execute();}
isFinished(){return this.finished;}
}
class Control_Solid_Selected_visible extends Base_Control_Selected
{constructor(sprite)
{super(sprite);}
init()
{super.init(1.5,0.6);}
execute()
{super.execute();}
isFinished(){return this.finished;}
}
class Control_Selected extends Base_Control_Selected
{constructor(sprite)
{super(sprite);}
init()
{super.init(1.7,0.6);}
execute()
{super.execute();if(this.finished)
this.sprite.object.setVisible(false);}
isFinished(){return this.finished;}
}
class Control_Solid_Selected extends Base_Control_Selected
{constructor(sprite)
{super(sprite);}
init()
{super.init(1.5,0.6);}
execute()
{super.execute();if(this.finished)
this.sprite.object.setVisible(false);}
isFinished(){return this.finished;}
}
class Control_Selected_frame_highlight extends Base_Control_Selected
{constructor(sprite)
{super(sprite);}
init()
{super.init(1.7,0.6);}
execute()
{super.execute();if(this.finished)
this.sprite.setRGBA(1,1,1,1);}
isFinished(){return this.finished;}
}
class Base_Control_Fast_Selected
{constructor(sprite)
{this.sprite=sprite;this.hiColor=new _library_common_color__WEBPACK_IMPORTED_MODULE_4__["Color"];this.finished=false;}
init(hiHSV)
{this.sprite.object.setVisible(true);this.hiColor.copy(this.sprite.getDefaultColor());this.hiColor.transformHSV(0,1,hiHSV);this.finished=false;this.sprite.setColor(this.hiColor);}
}
class Control_Fast_Face_Selected extends Base_Control_Fast_Selected
{constructor(sprite)
{super(sprite);this.time=0;}
init()
{this.time=80;super.init(1.7);}
execute()
{this.time-=_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime;if(this.time<0)
{this.sprite.setDefaultColor();this.finished=true;}
}
isFinished(){return this.finished;}
}
class Control_Fast_Face_Selected_Act extends Base_Control_Fast_Selected
{constructor(sprite)
{super(sprite);this.time=0;}
init()
{this.time=80;super.init(1.7);}
execute()
{this.time-=_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime;if(this.time<0)
{this.sprite.setDefaultColor();_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_library_common_defs__WEBPACK_IMPORTED_MODULE_6__["EGE_MENU_REACTIVATE"]);this.finished=true;}
}
isFinished(){return this.finished;}
}
class Control_Fast_Face_Selected_Exe_Act extends Base_Control_Fast_Selected
{constructor(sprite)
{super(sprite);this.time=0;}
init()
{this.time=80;super.init(1.7);}
execute()
{this.time-=_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime;if(this.time<0)
{this.sprite.setDefaultColor();_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_library_common_defs__WEBPACK_IMPORTED_MODULE_6__["EGE_MENU_SELECT_EXECUTE"]);_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_2__["eventManager"].dispatchEvent(_library_common_defs__WEBPACK_IMPORTED_MODULE_6__["EGE_MENU_REACTIVATE"]);this.finished=true;}
}
isFinished(){return this.finished;}
}
class Control_Fast_Selected extends Base_Control_Fast_Selected
{constructor(sprite)
{super(sprite);this.time=80;}
init()
{this.time=80;super.init(1.7);}
execute()
{this.time-=_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime;if(this.time<0)
{this.sprite.object.setVisible(false);this.finished=true;}
}
isFinished(){return this.finished;}
}
class Control_Fast_Solid_Selected extends Base_Control_Fast_Selected
{constructor(sprite)
{super(sprite);this.time=80;}
init()
{this.time=80;super.init(1.7);}
execute()
{this.time-=_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_0__["highResTimer"].elapsedTime;if(this.time<0)
{this.sprite.object.setVisible(false);this.finished=true;}
}
isFinished(){return this.finished;}
}
class Control_slider_btn_Selected extends Base_Control_Fast_Selected
{constructor(sprite)
{super(sprite);}
init()
{super.init(1.7);}
execute()
{}
isFinished(){return true;}
}
function loadScripts()
{_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_OnActive',(control)=>{return new Control_OnActive(control);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_OnSelect',(control)=>{return new Control_OnSelect(control);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Menu_TransIn',(menu)=>{return new Menu_TransIn(menu);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Menu_TransOut',(menu)=>{return new Menu_TransOut(menu);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Disabled',(sprite)=>{return new Control_Disabled(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Inactive',(sprite)=>{return new Control_Inactive(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Hidden',(sprite)=>{return new Control_Hidden(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Active',(sprite)=>{return new Control_Active(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Solid_Active',(sprite)=>{return new Control_Solid_Active(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Selected_Dispatch_Exe',(sprite)=>{return new Control_Selected_Dispatch_Exe(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Selected_Dispatch_Exe_Act',(sprite)=>{return new Control_Selected_Dispatch_Exe_Act(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Selected_Visible',(sprite)=>{return new Control_Selected_Visible(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Solid_Selected_visible',(sprite)=>{return new Control_Solid_Selected_visible(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Selected',(sprite)=>{return new Control_Selected(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Solid_Selected',(sprite)=>{return new Control_Solid_Selected(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Selected_frame_highlight',(sprite)=>{return new Control_Selected_frame_highlight(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Fast_Face_Selected',(sprite)=>{return new Control_Fast_Face_Selected(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Fast_Face_Selected_Act',(sprite)=>{return new Control_Fast_Face_Selected_Act(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Fast_Face_Selected_Exe_Act',(sprite)=>{return new Control_Fast_Face_Selected_Exe_Act(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Fast_Selected',(sprite)=>{return new Control_Fast_Selected(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_Fast_Solid_Selected',(sprite)=>{return new Control_Fast_Solid_Selected(sprite);});_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].set('Control_slider_btn_Selected',(sprite)=>{return new Control_slider_btn_Selected(sprite);});}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"LoadState",function(){return LoadState;});var _gamestate__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(22);var _library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(25);var _library_managers_texturemanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6);var _library_managers_vertexbuffermanager__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(15);var _library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(26);var _library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(89);var _library_managers_spritesheetmanager__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(32);var _library_utilities_assetholder__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(39);var _library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(30);var _library_managers_signalmanager__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(2);var _library_strategy_actorstrategy__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(95);var _library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(93);var _library_strategy_strategyloader__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(94);var _library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(68);var _library_script_scriptcomponent__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(70);var _library_utilities_settings__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(3);var _state_titlescreenstate__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(107);var _state_level1state__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(113);var _statedefs__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(24);const MIN_LOAD_TIME=1000;class LoadState extends _gamestate__WEBPACK_IMPORTED_MODULE_0__["GameState"]
{constructor(stateMessage,gameLoopCallback)
{super(_statedefs__WEBPACK_IMPORTED_MODULE_18__["EGS_GAME_LOAD"],stateMessage.loadState,gameLoopCallback);this.stateMessage.loadState=stateMessage.loadState;this.stateMessage.unloadState=stateMessage.unloadState;this.loadCounter=0;this.maxLoadCount=0;this.scriptComponent=new _library_script_scriptcomponent__WEBPACK_IMPORTED_MODULE_14__["ScriptComponent"];this.scriptComponent.set(_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].get('ScreenFade')(0,1,250));_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_4__["eventManager"].clear();this.preload();}
preload()
{let groupAry=['(loadingScreen)'];_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_5__["loadManager"].add(
(callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_8__["objectDataManager"].loadXMLGroup2D(groupAry,callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_5__["loadManager"].add(
(callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_8__["objectDataManager"].loadAssets2D(groupAry,callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_5__["loadManager"].add(
(callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_8__["objectDataManager"].createFromData(groupAry,callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_5__["loadManager"].add(
(callback)=>_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_11__["strategyManager"].addStrategy('_loading-screen_',new _library_strategy_actorstrategy__WEBPACK_IMPORTED_MODULE_10__["ActorStrategy"],callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_5__["loadManager"].add(
(callback)=>_library_strategy_strategyloader__WEBPACK_IMPORTED_MODULE_12__["strategyLoader"].load('data/objects/strategy/state/loadscreen.loader',this.preloadComplete.bind(this)));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_5__["loadManager"].load();}
preloadComplete()
{let strategy=_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_11__["strategyManager"].activateStrategy('_loading-screen_');strategy.get('loadAnim').getSprite().object.setPosXYZ(_library_utilities_settings__WEBPACK_IMPORTED_MODULE_15__["settings"].defaultSize_half.w-150,-(_library_utilities_settings__WEBPACK_IMPORTED_MODULE_15__["settings"].defaultSize_half.h-150),0);this.loadFont=strategy.get('load_font').getSprite();this.loadFont.object.setPosXYZ(_library_utilities_settings__WEBPACK_IMPORTED_MODULE_15__["settings"].defaultSize_half.w-150,-(_library_utilities_settings__WEBPACK_IMPORTED_MODULE_15__["settings"].defaultSize_half.h-150),0);_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_13__["highResTimer"].calcElapsedTime();requestAnimationFrame(this.callback);}
loadCallback()
{++this.loadCounter;this.loadFont.visualComponent.createFontString(`${Math.trunc((this.loadCounter/this.maxLoadCount)*100)}%`);}
handleEvent(event)
{if(event instanceof CustomEvent)
{if(event.detail.type===_statedefs__WEBPACK_IMPORTED_MODULE_18__["ESE_FADE_IN_COMPLETE"])
{this.assetLoad();}
else if(event.detail.type===_statedefs__WEBPACK_IMPORTED_MODULE_18__["ESE_FADE_OUT_COMPLETE"])
{this.stateChange=true;}
else if(event.detail.type===_statedefs__WEBPACK_IMPORTED_MODULE_18__["ESE_ASSET_LOAD_COMPLETE"])
{let loadTime=_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_13__["highResTimer"].timerStop();if(loadTime>MIN_LOAD_TIME)
this.scriptComponent.set(_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].get('ScreenFade')(1,0,500));else
setTimeout(()=>this.scriptComponent.set(_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_1__["scriptManager"].get('ScreenFade')(1,0,500)),MIN_LOAD_TIME-loadTime);_library_managers_signalmanager__WEBPACK_IMPORTED_MODULE_9__["signalManager"].clear_loadComplete();console.log(`${this.getStateStr(this.stateMessage.loadState)} Count:${this.loadCounter}`);}
}
}
update()
{this.scriptComponent.update();_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_11__["strategyManager"].update();}
transform()
{_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_11__["strategyManager"].transform();}
render()
{_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_11__["strategyManager"].render();}
assetLoad()
{_library_managers_signalmanager__WEBPACK_IMPORTED_MODULE_9__["signalManager"].connect_loadComplete(this.loadCallback.bind(this));_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_13__["highResTimer"].timerStart();if(this.stateMessage.loadState===_statedefs__WEBPACK_IMPORTED_MODULE_18__["EGS_TITLE_SCREEN"])
{this.maxLoadCount=_state_titlescreenstate__WEBPACK_IMPORTED_MODULE_16__["ASSET_COUNT"];_state_titlescreenstate__WEBPACK_IMPORTED_MODULE_16__["load"]();}
else if(this.stateMessage.loadState===_statedefs__WEBPACK_IMPORTED_MODULE_18__["EGS_LEVEL_1"])
{this.maxLoadCount=_state_level1state__WEBPACK_IMPORTED_MODULE_17__["ASSET_COUNT"];_state_level1state__WEBPACK_IMPORTED_MODULE_17__["load"]();}
_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_5__["loadManager"].add(
(callback)=>_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_4__["eventManager"].dispatchEvent(_statedefs__WEBPACK_IMPORTED_MODULE_18__["ESE_ASSET_LOAD_COMPLETE"]));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_5__["loadManager"].load();}
cleanUp()
{_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_8__["objectDataManager"].freeGroup(['(loadingScreen)']);_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_11__["strategyManager"].deleteStrategy(['_loading-screen_']);_library_managers_spritesheetmanager__WEBPACK_IMPORTED_MODULE_6__["spriteSheetManager"].clear();_library_utilities_assetholder__WEBPACK_IMPORTED_MODULE_7__["assetHolder"].clear();}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ASSET_COUNT",function(){return ASSET_COUNT;});__webpack_require__.d(__webpack_exports__,"Level1State",function(){return Level1State;});__webpack_require__.d(__webpack_exports__,"load",function(){return load;});var _commonstate__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(108);var _library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(26);var _library_gui_menumanager__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(49);var _library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(68);var _library_script_scriptcomponent__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(70);var _library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(25);var _library_physics_physicsworldmanager__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(66);var _library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(30);var _library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(89);var _library_managers_soundmanager__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(90);var _library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(93);var _library_strategy_stagestrategy__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(114);var _library_strategy_actorstrategy__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(95);var _library_strategy_strategyloader__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(94);var _library_utilities_settings__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(3);var _library_common_point__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(11);var _library_common_defs__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(5);var _statedefs__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(24);var _library_utilities_genfunc__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(18);const ASSET_COUNT=13;const SPRITE_PEG=-2,STRAWBERRY=0;class Level1State extends _commonstate__WEBPACK_IMPORTED_MODULE_0__["CommonState"]
{constructor(gameLoopCallback=null)
{super(_statedefs__WEBPACK_IMPORTED_MODULE_17__["EGS_LEVEL_1"],_statedefs__WEBPACK_IMPORTED_MODULE_17__["EGS_GAME_LOAD"],gameLoopCallback);this.physicsWorld=_library_physics_physicsworldmanager__WEBPACK_IMPORTED_MODULE_6__["physicsWorldManager"].getWorld("(game)");this.physicsWorld.world.on('begin-contact',this.beginContact.bind(this));this.physicsWorld.world.on('end-contact',this.endContact.bind(this));this.scriptComponent=new _library_script_scriptcomponent__WEBPACK_IMPORTED_MODULE_4__["ScriptComponent"];this.scriptComponent.set(_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_5__["scriptManager"].get('ScreenFade')(0,1,500));_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_2__["menuManager"].allowEventHandling=true;_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_2__["menuManager"].activateTree(['pause_tree']);_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_1__["eventManager"].clear();_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_10__["strategyManager"].activateStrategy('_level-1-stage_');this.gameStrategy=_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_10__["strategyManager"].activateStrategy('_level-1-game_');let uiStrategy=_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_10__["strategyManager"].activateStrategy('_level-ui_');this.uiMeter=uiStrategy.get('UIMeter');this.multiplier=uiStrategy.get('multiplier');_library_utilities_highresolutiontimer__WEBPACK_IMPORTED_MODULE_3__["highResTimer"].calcElapsedTime();requestAnimationFrame(this.callback);}
handleEvent(event)
{super.handleEvent(event);if(event.type==='mouseup' &&!_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_2__["menuManager"].isMenuActive())
{let ratio=1.0/_library_utilities_settings__WEBPACK_IMPORTED_MODULE_14__["settings"].orthoAspectRatio.h;let y=600;let x=(ratio*(event.clientX+_library_managers_eventmanager__WEBPACK_IMPORTED_MODULE_1__["eventManager"].mouseOffsetX))-_library_utilities_settings__WEBPACK_IMPORTED_MODULE_14__["settings"].defaultSize_half.w;let angle=_library_utilities_genfunc__WEBPACK_IMPORTED_MODULE_18__["randomInt"](0,350)*_library_common_defs__WEBPACK_IMPORTED_MODULE_16__["DEG_TO_RAD"];let rot=_library_utilities_genfunc__WEBPACK_IMPORTED_MODULE_18__["randomArbitrary"](-3,3);let ball='tennis_ball_green';if(_library_utilities_genfunc__WEBPACK_IMPORTED_MODULE_18__["randomInt"](0,1))
ball='tennis_ball_pink';let node=this.gameStrategy.create(ball);node.getSprite().physicsComponent.setTransform(x,y,angle,true);node.getSprite().physicsComponent.applyAngularImpulse(rot);}
else if(event instanceof CustomEvent)
{if(event.detail.type===_library_common_defs__WEBPACK_IMPORTED_MODULE_16__["EGE_MENU_GAME_STATE_CHANGE"])
{if(event.detail.arg[0]===_library_common_defs__WEBPACK_IMPORTED_MODULE_16__["ETC_BEGIN"])
this.scriptComponent.set(_library_script_scriptmanager__WEBPACK_IMPORTED_MODULE_5__["scriptManager"].get('ScreenFade')(1,0,500,true));}
}
}
cleanUp()
{_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_10__["strategyManager"].deleteStrategy(['_level-1-stage_','_level-1-game_','_level-ui_']);_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__["objectDataManager"].freeGroup(['(level_1)']);_library_physics_physicsworldmanager__WEBPACK_IMPORTED_MODULE_6__["physicsWorldManager"].destroyWorld("(game)");}
physics()
{if(!_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_2__["menuManager"].active)
this.physicsWorld.variableTimeStep();}
update()
{super.update();this.scriptComponent.update();if(!_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_2__["menuManager"].active)
_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_10__["strategyManager"].update();}
transform()
{super.transform();_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_10__["strategyManager"].transform();}
render()
{super.render();_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_10__["strategyManager"].render();_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_2__["menuManager"].render();}
beginContact(contact)
{let spriteA=contact.m_fixtureA.m_userData;let spriteB=contact.m_fixtureB.m_userData;if(spriteA && spriteB)
{if(spriteA.id===SPRITE_PEG)
spriteA.setFrame(1);else if(spriteB.id===SPRITE_PEG)
spriteB.setFrame(1);}
}
endContact(contact)
{let spriteA=contact.m_fixtureA.m_userData;let spriteB=contact.m_fixtureB.m_userData;if(spriteA && spriteB)
{if(spriteA.id===SPRITE_PEG)
spriteA.setFrame(0);else if(spriteB.id===SPRITE_PEG)
spriteB.setFrame(0);}
}
removeFixture(object)
{}
}
function load()
{_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_8__["loadManager"].add(
(callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__["objectDataManager"].loadXMLGroup2D(['(level_1)'],callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_8__["loadManager"].add(
(callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__["objectDataManager"].loadAssets2D(['(level_1)'],callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_8__["loadManager"].add(
(callback)=>_library_objectdatamanager_objectdatamanager__WEBPACK_IMPORTED_MODULE_7__["objectDataManager"].createFromData(['(level_1)'],callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_8__["loadManager"].add(
(callback)=>_library_physics_physicsworldmanager__WEBPACK_IMPORTED_MODULE_6__["physicsWorldManager"].loadWorldGroup2D('(game)',callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_8__["loadManager"].add(
(callback)=>_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_10__["strategyManager"].addStrategy('_level-1-stage_',new _library_strategy_stagestrategy__WEBPACK_IMPORTED_MODULE_11__["StageStrategy"],callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_8__["loadManager"].add(
(callback)=>_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_10__["strategyManager"].addStrategy('_level-1-game_',new _library_strategy_actorstrategy__WEBPACK_IMPORTED_MODULE_12__["ActorStrategy"],callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_8__["loadManager"].add(
(callback)=>_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_10__["strategyManager"].addStrategy('_level-ui_',new _library_strategy_actorstrategy__WEBPACK_IMPORTED_MODULE_12__["ActorStrategy"],callback));_library_managers_loadmanager__WEBPACK_IMPORTED_MODULE_8__["loadManager"].add(
(callback)=>_library_strategy_strategyloader__WEBPACK_IMPORTED_MODULE_13__["strategyLoader"].load('data/objects/strategy/level1/strategy.loader',callback));}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"StageStrategy",function(){return StageStrategy;});var _istrategy__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(96);var _sector__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(115);class StageStrategy extends _istrategy__WEBPACK_IMPORTED_MODULE_0__["iStrategy"]
{constructor()
{super();this.sectorAry=[];}
loadFromNode(strategyId,node,filePath,downloadFileCallback,finishCallback)
{let sectorNode=node.getElementsByTagName('sector');for(let i=0;i<sectorNode.length;++i)
{let sector=new _sector__WEBPACK_IMPORTED_MODULE_1__["Sector"];this.sectorAry.push(sector);sector.loadTransFromNode(sectorNode[i]);let sectorFile=sectorNode[i].getAttribute('file');downloadFileCallback(
'xml',strategyId,sectorFile,finishCallback,(group,xmlNode,filePath,finishCallback)=>
{sector.loadFromNode(group,xmlNode,filePath,finishCallback);});}
}
cleanUp()
{for(let i=0;i<this.sectorAry.length;++i)
this.sectorAry[i].cleanUp();}
get(name,index=0)
{let sector=this.sectorAry[index];if(!sector)
throw new Error(`Sector index can't be found(${name},${index})!`);return sector.get(name);}
update()
{for(let i=0;i<this.sectorAry.length;++i)
this.sectorAry[i].update();}
transform()
{for(let i=0;i<this.sectorAry.length;++i)
this.sectorAry[i].transform();}
render()
{for(let i=0;i<this.sectorAry.length;++i)
this.sectorAry[i].render(this.camera);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Sector",function(){return Sector;});var _3d_object3d__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(60);var _node_nodedatalist__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(97);var _node_nodefactory__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(99);class Sector extends _3d_object3d__WEBPACK_IMPORTED_MODULE_0__["Object3D"]
{constructor()
{super();this.nodeAry=[];this.nodeMap=new Map;}
loadFromNode(strategyId,node,filePath,finishCallback)
{let defaultGroup='';let defaultObjName='';let defaultAIName='';let defaultId=-1;let attr=node.getAttribute('defaultGroup');if(attr)
defaultGroup=attr;attr=node.getAttribute('defaultObjectName');if(attr)
defaultObjName=attr;attr=node.getAttribute('defaultAIName');if(attr)
defaultAIName=attr;attr=node.getAttribute('defaultId');if(attr)
defaultId=Number(attr);let sectorNode=node.children;for(let i=0;i<sectorNode.length;++i)
{let nodeAry=new _node_nodedatalist__WEBPACK_IMPORTED_MODULE_1__["NodeDataList"](sectorNode[i],defaultGroup,defaultObjName,defaultAIName,defaultId).dataAry;let headNode=null;for(let j=0;j<nodeAry.length;j++)
{let node=_node_nodefactory__WEBPACK_IMPORTED_MODULE_2__["create"](nodeAry[j],nodeAry[j].id);if(headNode===null)
headNode=node;else if(!headNode.addNode(node,nodeAry[j].nodeName))
throw new Error(`Parent node not found or node does not support adding children(${nodeAry[i].nodeName},${node.parentId})!`);}
this.nodeAry.push(headNode);if(headNode.nodeName)
this.nodeMap.set(headNode.nodeName,headNode);}
}
init()
{for(let i=0;i<this.nodeAry.length;++i)
this.nodeAry[i].init();}
cleanUp()
{for(let i=0;i<this.nodeAry.length;++i)
this.nodeAry[i].cleanUp();}
get(name)
{let node=this.nodeMap.get(name);if(!node)
throw new Error(`Sprite name can't be found(${name})!`);return node;}
destroy()
{this.cleanUp();this.nodeAry=[];}
update()
{for(let i=0;i<this.nodeAry.length;++i)
this.nodeAry[i].update();}
transform()
{super.transform();for(let i=0;i<this.nodeAry.length;++i)
this.nodeAry[i].transform(this);}
render(camera)
{for(let i=0;i<this.nodeAry.length;++i)
this.nodeAry[i].render(camera);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"SmartConfirmBtn",function(){return SmartConfirmBtn;});var _library_gui_ismartguibase__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(117);var _library_gui_menumanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(49);var _library_common_defs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(5);class SmartConfirmBtn extends _library_gui_ismartguibase__WEBPACK_IMPORTED_MODULE_0__["SmartGuiControl"]
{constructor(uiControl)
{super(uiControl);}
execute()
{let menu=_library_gui_menumanager__WEBPACK_IMPORTED_MODULE_1__["menuManager"].getMenu("confirmation_menu");let yesBtn=menu.getControl("yes_btn");let megLbl=menu.getControl("message_lbl");let smartGuiCtrl=null;let conformationMsg='';let executionAction='';let actionType=_library_common_defs__WEBPACK_IMPORTED_MODULE_2__["ECAT_BACK"];if(this.uiControl.name==='main_menu_btn')
{conformationMsg='Are you sure you|want to go back to|the main menu?';actionType=_library_common_defs__WEBPACK_IMPORTED_MODULE_2__["ECAT_GAME_STATE_CHANGE"];executionAction='title_screen_state';}
yesBtn.smartGui=smartGuiCtrl;yesBtn.actionType=actionType;yesBtn.executionAction=executionAction;megLbl.createFontStr(conformationMsg);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"SmartGuiMenu",function(){return SmartGuiMenu;});__webpack_require__.d(__webpack_exports__,"SmartGuiControl",function(){return SmartGuiControl;});class iSmartGui
{constructor()
{}
create()
{}
handleEvent(event)
{}
}
class SmartGuiMenu extends iSmartGui
{constructor(uiMenu)
{super();this.uiMenu=uiMenu;}
}
class SmartGuiControl extends iSmartGui
{constructor(uiControl)
{super();this.uiControl=uiControl;}
execute()
{}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"aiBall",function(){return aiBall;});var _library_common_iaibase__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(119);var _library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(93);class aiBall extends _library_common_iaibase__WEBPACK_IMPORTED_MODULE_0__["iaiBase"]
{constructor(node)
{super();this.node=node;this.sprite=node.sprite;this.strategy=_library_strategy_strategymanager__WEBPACK_IMPORTED_MODULE_1__["strategyManager"].get('_level-1-game_');}
update()
{if(this.sprite.object.pos.y<-600)
this.strategy.destroy(this.node);}
}
}),(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"iaiBase",function(){return iaiBase;});class iaiBase
{constructor()
{}
init()
{}
handleEvent(event)
{}
physics()
{}
update()
{}
}
})
]);