/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: defs.js
//  DESC:      misc defines
//



const DEG_TO_RAD = 0.0174532925199432957,
             RAD_TO_DEG = 57.29577951308232,
             EPSILON    = 8.854187817e-12,
             RGB_TO_DEC = 0.00390625;
/* harmony export (immutable) */ __webpack_exports__["g"] = DEG_TO_RAD;

/* unused harmony export RAD_TO_DEG */

/* unused harmony export EPSILON */

/* harmony export (immutable) */ __webpack_exports__["_59"] = RGB_TO_DEC;

     
const SPRITE_DEFAULT_ID = -1;
/* harmony export (immutable) */ __webpack_exports__["_63"] = SPRITE_DEFAULT_ID;


// EGenerationType
const EGT_NULL         = 0,
             EGT_QUAD         = 1,
             EGT_SPRITE_SHEET = 2,
             EGT_SCALED_FRAME = 3,
             EGT_MESH_FILE    = 4,
             EGT_FONT         = 5;
/* harmony export (immutable) */ __webpack_exports__["_20"] = EGT_NULL;

/* harmony export (immutable) */ __webpack_exports__["_21"] = EGT_QUAD;

/* harmony export (immutable) */ __webpack_exports__["_23"] = EGT_SPRITE_SHEET;

/* harmony export (immutable) */ __webpack_exports__["_22"] = EGT_SCALED_FRAME;

/* harmony export (immutable) */ __webpack_exports__["_19"] = EGT_MESH_FILE;

/* harmony export (immutable) */ __webpack_exports__["_18"] = EGT_FONT;


// EProjectionType
const EPT_NULL         = 0,
             EPT_PERSPECTIVE  = 1,
             EPT_ORTHOGRAPHIC = 2;
/* unused harmony export EPT_NULL */

/* harmony export (immutable) */ __webpack_exports__["_45"] = EPT_PERSPECTIVE;

/* harmony export (immutable) */ __webpack_exports__["_44"] = EPT_ORTHOGRAPHIC;


// EHorzAlignment
const EHA_HORZ_LEFT    = 0,
             EHA_HORZ_CENTER  = 1,
             EHA_HORZ_RIGHT   = 2;
/* harmony export (immutable) */ __webpack_exports__["_25"] = EHA_HORZ_LEFT;

/* harmony export (immutable) */ __webpack_exports__["_24"] = EHA_HORZ_CENTER;

/* harmony export (immutable) */ __webpack_exports__["_26"] = EHA_HORZ_RIGHT;


// EVertAlignment
const EVA_VERT_TOP     = 0,
             EVA_VERT_CENTER  = 1,
             EVA_VERT_BOTTOM  = 2;
/* harmony export (immutable) */ __webpack_exports__["_54"] = EVA_VERT_TOP;

/* harmony export (immutable) */ __webpack_exports__["_53"] = EVA_VERT_CENTER;

/* harmony export (immutable) */ __webpack_exports__["_52"] = EVA_VERT_BOTTOM;


// Character codes
const CHAR_CODE_SPACE = 32,
             CHAR_CODE_PIPE  = 124;
/* harmony export (immutable) */ __webpack_exports__["e"] = CHAR_CODE_SPACE;

/* harmony export (immutable) */ __webpack_exports__["d"] = CHAR_CODE_PIPE;


// EActionPress
const EAP_IDLE = 0,
             EAP_DOWN = 1,
             EAP_UP   = 2;
/* harmony export (immutable) */ __webpack_exports__["l"] = EAP_IDLE;

/* harmony export (immutable) */ __webpack_exports__["k"] = EAP_DOWN;

/* harmony export (immutable) */ __webpack_exports__["m"] = EAP_UP;


// EDeviceId
const DEVICE_NULL = -1,
             KEYBOARD    = 0,
             MOUSE       = 1,
             GAMEPAD     = 2;
/* harmony export (immutable) */ __webpack_exports__["h"] = DEVICE_NULL;

/* harmony export (immutable) */ __webpack_exports__["_56"] = KEYBOARD;

/* harmony export (immutable) */ __webpack_exports__["_57"] = MOUSE;

/* harmony export (immutable) */ __webpack_exports__["_55"] = GAMEPAD;


// Sprite transform Bitmask

// Transform parameters
const TRANSLATE	        = 0x01,
             ROTATE             = 0x02,
             SCALE              = 0x04,
             CENTER_POINT       = 0x08,
             CROP_OFFSET        = 0x10;
/* harmony export (immutable) */ __webpack_exports__["_66"] = TRANSLATE;

/* harmony export (immutable) */ __webpack_exports__["_60"] = ROTATE;

/* harmony export (immutable) */ __webpack_exports__["_61"] = SCALE;

/* harmony export (immutable) */ __webpack_exports__["c"] = CENTER_POINT;

/* harmony export (immutable) */ __webpack_exports__["f"] = CROP_OFFSET;


// Translate parameters
const TRANSFORM          = 0x20,
             WAS_TRANSFORMED    = 0x40;
/* harmony export (immutable) */ __webpack_exports__["_65"] = TRANSFORM;

/* harmony export (immutable) */ __webpack_exports__["_68"] = WAS_TRANSFORMED;


// Matrix rotation
const MATRIX_ROTATION    = 0x80;
/* unused harmony export MATRIX_ROTATION */


// Visible bit
const VISIBLE            = 0x100;
/* harmony export (immutable) */ __webpack_exports__["_67"] = VISIBLE;


// Type bits
const SPRITE2D           = 0x200,
             ACTOR2D            = 0x400;
/* harmony export (immutable) */ __webpack_exports__["_62"] = SPRITE2D;

/* unused harmony export ACTOR2D */


// EGameEvent
// Menu events
const EGE_MENU_TRANS_IN             = 100,
             EGE_MENU_TRANS_OUT            = 101,
             EGE_MENU_ESCAPE_ACTION        = 102,
             EGE_MENU_TOGGLE_ACTION        = 103,
             EGE_MENU_BACK_ACTION          = 104,
             EGE_MENU_TO_TREE              = 105,
             EGE_MENU_TO_MENU              = 106,
             EGE_MENU_GAME_STATE_CHANGE    = 107,
             EGE_MENU_UP_ACTION            = 108,
             EGE_MENU_DOWN_ACTION          = 109,
             EGE_MENU_LEFT_ACTION          = 110,
             EGE_MENU_RIGHT_ACTION         = 111,
             EGE_MENU_CONTROL_STATE_CHANGE = 112,
             EGE_MENU_SELECT_ACTION        = 113,
             EGE_MENU_SELECT_EXECUTE       = 114,
             EGE_MENU_SET_ACTIVE_CONTROL   = 115,
             EGE_MENU_REACTIVATE           = 116,
             EGE_MENU_SCROLL_UP            = 117,
             EGE_MENU_SCROLL_DOWN          = 118,
             EGE_MENU_SCROLL_LEFT          = 119,
             EGE_MENU_SCROLL_RIGHT         = 120,
             EGE_MENU_TAB_LEFT             = 121,
             EGE_MENU_TAB_RIGHT            = 122;
/* harmony export (immutable) */ __webpack_exports__["_15"] = EGE_MENU_TRANS_IN;

/* harmony export (immutable) */ __webpack_exports__["_16"] = EGE_MENU_TRANS_OUT;

/* harmony export (immutable) */ __webpack_exports__["Y"] = EGE_MENU_ESCAPE_ACTION;

/* harmony export (immutable) */ __webpack_exports__["_12"] = EGE_MENU_TOGGLE_ACTION;

/* harmony export (immutable) */ __webpack_exports__["V"] = EGE_MENU_BACK_ACTION;

/* harmony export (immutable) */ __webpack_exports__["_14"] = EGE_MENU_TO_TREE;

/* harmony export (immutable) */ __webpack_exports__["_13"] = EGE_MENU_TO_MENU;

/* harmony export (immutable) */ __webpack_exports__["Z"] = EGE_MENU_GAME_STATE_CHANGE;

/* harmony export (immutable) */ __webpack_exports__["_17"] = EGE_MENU_UP_ACTION;

/* harmony export (immutable) */ __webpack_exports__["X"] = EGE_MENU_DOWN_ACTION;

/* harmony export (immutable) */ __webpack_exports__["_0"] = EGE_MENU_LEFT_ACTION;

/* harmony export (immutable) */ __webpack_exports__["_2"] = EGE_MENU_RIGHT_ACTION;

/* harmony export (immutable) */ __webpack_exports__["W"] = EGE_MENU_CONTROL_STATE_CHANGE;

/* harmony export (immutable) */ __webpack_exports__["_7"] = EGE_MENU_SELECT_ACTION;

/* harmony export (immutable) */ __webpack_exports__["_8"] = EGE_MENU_SELECT_EXECUTE;

/* harmony export (immutable) */ __webpack_exports__["_9"] = EGE_MENU_SET_ACTIVE_CONTROL;

/* harmony export (immutable) */ __webpack_exports__["_1"] = EGE_MENU_REACTIVATE;

/* harmony export (immutable) */ __webpack_exports__["_6"] = EGE_MENU_SCROLL_UP;

/* harmony export (immutable) */ __webpack_exports__["_3"] = EGE_MENU_SCROLL_DOWN;

/* harmony export (immutable) */ __webpack_exports__["_4"] = EGE_MENU_SCROLL_LEFT;

/* harmony export (immutable) */ __webpack_exports__["_5"] = EGE_MENU_SCROLL_RIGHT;

/* harmony export (immutable) */ __webpack_exports__["_10"] = EGE_MENU_TAB_LEFT;

/* harmony export (immutable) */ __webpack_exports__["_11"] = EGE_MENU_TAB_RIGHT;


// ESelection Message Arguments
const ESMA_PRESS_TYPE  = 0,
             ESMA_DEVICE_TYPE = 1,
             ESMA_MOUSE_X     = 2,
             ESMA_MOUSE_Y     = 3;
/* harmony export (immutable) */ __webpack_exports__["_49"] = ESMA_PRESS_TYPE;

/* harmony export (immutable) */ __webpack_exports__["_46"] = ESMA_DEVICE_TYPE;

/* harmony export (immutable) */ __webpack_exports__["_47"] = ESMA_MOUSE_X;

/* harmony export (immutable) */ __webpack_exports__["_48"] = ESMA_MOUSE_Y;


// EMenu State Change Arguments
const EMSC_STATE   = 0,
             EMSC_CONTROL = 1;
/* harmony export (immutable) */ __webpack_exports__["_28"] = EMSC_STATE;

/* harmony export (immutable) */ __webpack_exports__["_27"] = EMSC_CONTROL;


// EMenuTreeState
const EMTS_INACTIVE             = 0,
             EMTS_IDLE                 = 1,
             EMTS_ACTIVE               = 2,
             EMTS_MAX_MENU_TREE_STATES = 3;
/* unused harmony export EMTS_INACTIVE */

/* harmony export (immutable) */ __webpack_exports__["_37"] = EMTS_IDLE;

/* harmony export (immutable) */ __webpack_exports__["_36"] = EMTS_ACTIVE;

/* unused harmony export EMTS_MAX_MENU_TREE_STATES */


// EMenuState
const EMS_INACTIVE        = 0,
             EMS_IDLE            = 1,
             EMS_ACTIVE          = 2,
             EMS_MAX_MENU_STATES = 3;
/* harmony export (immutable) */ __webpack_exports__["_35"] = EMS_INACTIVE;

/* harmony export (immutable) */ __webpack_exports__["_34"] = EMS_IDLE;

/* harmony export (immutable) */ __webpack_exports__["_33"] = EMS_ACTIVE;

/* unused harmony export EMS_MAX_MENU_STATES */


// EMenuNavigationState
const EMNS_NULL             = 0,
             EMNS_MOUSE            = 1,
             EMNS_GAMEPAD_KEYBAORD = 2;
/* unused harmony export EMNS_NULL */

/* unused harmony export EMNS_MOUSE */

/* unused harmony export EMNS_GAMEPAD_KEYBAORD */


// ETransCode
const ETC_RESET = 0,
             ETC_BEGIN = 1,
             ETC_END   = 2;
/* unused harmony export ETC_RESET */

/* harmony export (immutable) */ __webpack_exports__["_50"] = ETC_BEGIN;

/* harmony export (immutable) */ __webpack_exports__["_51"] = ETC_END;


// EActiveControl
const EAC_NULL                 = 0,
             EAC_FIRST_ACTIVE_CONTROL = 1,
             EAC_LAST_ACTIVE_CONTROL  = 2;
/* unused harmony export EAC_NULL */

/* harmony export (immutable) */ __webpack_exports__["i"] = EAC_FIRST_ACTIVE_CONTROL;

/* harmony export (immutable) */ __webpack_exports__["j"] = EAC_LAST_ACTIVE_CONTROL;


// EActionResponse
const EAR_UP    = 1,
             EAR_DOWN  = 2,
             EAR_LEFT  = 4,
             EAR_RIGHT = 8;
/* harmony export (immutable) */ __webpack_exports__["q"] = EAR_UP;

/* harmony export (immutable) */ __webpack_exports__["n"] = EAR_DOWN;

/* harmony export (immutable) */ __webpack_exports__["o"] = EAR_LEFT;

/* harmony export (immutable) */ __webpack_exports__["p"] = EAR_RIGHT;


// EDynamicOffset
const EDO_NULL        = 0,
             EDO_LEFT        = 1,
             EDO_RIGHT       = 2,
             EDO_HORZ_CENTER = 4,
             EDO_TOP         = 8,
             EDO_BOTTOM      = 16,
             EDO_VERT_CENTER = 32;
/* unused harmony export EDO_NULL */

/* harmony export (immutable) */ __webpack_exports__["R"] = EDO_LEFT;

/* harmony export (immutable) */ __webpack_exports__["S"] = EDO_RIGHT;

/* harmony export (immutable) */ __webpack_exports__["Q"] = EDO_HORZ_CENTER;

/* harmony export (immutable) */ __webpack_exports__["T"] = EDO_TOP;

/* harmony export (immutable) */ __webpack_exports__["P"] = EDO_BOTTOM;

/* harmony export (immutable) */ __webpack_exports__["U"] = EDO_VERT_CENTER;


// ENavNode
const ENAV_NODE_UP    = 0,
             ENAV_NODE_DOWN  = 1,
             ENAV_NODE_LEFT  = 2,
             ENAV_NODE_RIGHT = 3;
/* harmony export (immutable) */ __webpack_exports__["_41"] = ENAV_NODE_UP;

/* harmony export (immutable) */ __webpack_exports__["_38"] = ENAV_NODE_DOWN;

/* harmony export (immutable) */ __webpack_exports__["_39"] = ENAV_NODE_LEFT;

/* harmony export (immutable) */ __webpack_exports__["_40"] = ENAV_NODE_RIGHT;


const TOGGLE_STATE_ON  = true,
             TOGGLE_STATE_OFF = false;
/* harmony export (immutable) */ __webpack_exports__["_64"] = TOGGLE_STATE_ON;

/* unused harmony export TOGGLE_STATE_OFF */


// Value for no active control
const NO_ACTIVE_CONTROL = -1;
/* harmony export (immutable) */ __webpack_exports__["_58"] = NO_ACTIVE_CONTROL;


// Increment/Decement constants
const BTN_DEC = 0,
             BTN_INC = 1;
/* harmony export (immutable) */ __webpack_exports__["a"] = BTN_DEC;

/* harmony export (immutable) */ __webpack_exports__["b"] = BTN_INC;


// EControlType
const ECT_NULL          = 0,
             ECT_LABEL         = 1,
             ECT_BUTTON        = 2,
             ECT_BUTTON_LIST   = 3,
             ECT_CHECK_BOX     = 4,
             ECT_SLIDER        = 5,
             ECT_SCROLL_BOX    = 6,
             ECT_SUB_CONTROL   = 7,
             ECT_METER         = 8,
             ECT_TAB_CONTROL   = 9,
             ECT_PROGRESS_BAR  = 10,
             ECT_AMOUNT_BUTTON = 11;
/* unused harmony export ECT_NULL */

/* harmony export (immutable) */ __webpack_exports__["J"] = ECT_LABEL;

/* harmony export (immutable) */ __webpack_exports__["G"] = ECT_BUTTON;

/* harmony export (immutable) */ __webpack_exports__["H"] = ECT_BUTTON_LIST;

/* harmony export (immutable) */ __webpack_exports__["I"] = ECT_CHECK_BOX;

/* harmony export (immutable) */ __webpack_exports__["N"] = ECT_SLIDER;

/* harmony export (immutable) */ __webpack_exports__["M"] = ECT_SCROLL_BOX;

/* harmony export (immutable) */ __webpack_exports__["O"] = ECT_SUB_CONTROL;

/* harmony export (immutable) */ __webpack_exports__["K"] = ECT_METER;

/* unused harmony export ECT_TAB_CONTROL */

/* harmony export (immutable) */ __webpack_exports__["L"] = ECT_PROGRESS_BAR;

/* unused harmony export ECT_AMOUNT_BUTTON */


// EControlState
const ECS_NULL     = 0,
             ECS_INIT     = 1,
             ECS_DISABLED = 2,
             ECS_INACTIVE = 3,
             ECS_ACTIVE   = 4,
             ECS_SELECTED = 5;
/* harmony export (immutable) */ __webpack_exports__["E"] = ECS_NULL;

/* harmony export (immutable) */ __webpack_exports__["D"] = ECS_INIT;

/* harmony export (immutable) */ __webpack_exports__["B"] = ECS_DISABLED;

/* harmony export (immutable) */ __webpack_exports__["C"] = ECS_INACTIVE;

/* harmony export (immutable) */ __webpack_exports__["A"] = ECS_ACTIVE;

/* harmony export (immutable) */ __webpack_exports__["F"] = ECS_SELECTED;


// EControlActionType
const ECAT_NULL              = 0,
             ECAT_ACTION            = 1,
             ECAT_TO_TREE           = 2,
             ECAT_TO_MENU           = 3,
             ECAT_BACK              = 4,
             ECAT_CLOSE             = 5,
             ECAT_CHANGE_FOCUS      = 6,
             ECAT_GAME_STATE_CHANGE = 7,
             ECAT_QUIT_GAME         = 8;
/* harmony export (immutable) */ __webpack_exports__["w"] = ECAT_NULL;

/* harmony export (immutable) */ __webpack_exports__["r"] = ECAT_ACTION;

/* harmony export (immutable) */ __webpack_exports__["z"] = ECAT_TO_TREE;

/* harmony export (immutable) */ __webpack_exports__["y"] = ECAT_TO_MENU;

/* harmony export (immutable) */ __webpack_exports__["s"] = ECAT_BACK;

/* harmony export (immutable) */ __webpack_exports__["u"] = ECAT_CLOSE;

/* harmony export (immutable) */ __webpack_exports__["t"] = ECAT_CHANGE_FOCUS;

/* harmony export (immutable) */ __webpack_exports__["v"] = ECAT_GAME_STATE_CHANGE;

/* harmony export (immutable) */ __webpack_exports__["x"] = ECAT_QUIT_GAME;


// EControlScriptFunctions
const ECSF_ON_ACTIVE   = 0,
             ECSF_ON_SELECTED = 1;
/* unused harmony export ECSF_ON_ACTIVE */

/* unused harmony export ECSF_ON_SELECTED */

    
// EMeterScriptFunctions
const EMSF_ON_INIT  = 0,
             EMSF_ON_START = 1,
             EMSF_ON_STOP  = 2,
             EMSF_ON_CLEAR = 3;
/* harmony export (immutable) */ __webpack_exports__["_30"] = EMSF_ON_INIT;

/* harmony export (immutable) */ __webpack_exports__["_31"] = EMSF_ON_START;

/* harmony export (immutable) */ __webpack_exports__["_32"] = EMSF_ON_STOP;

/* harmony export (immutable) */ __webpack_exports__["_29"] = EMSF_ON_CLEAR;


// EOrientation
const EO_HORIZONTAL = 0,
             EO_VERTICAL   = 1;
/* harmony export (immutable) */ __webpack_exports__["_42"] = EO_HORIZONTAL;

/* harmony export (immutable) */ __webpack_exports__["_43"] = EO_VERTICAL;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME:  size.js
//  DESC:       size class
//



class Size
{
    constructor( w = 0, h = 0 )
    {
        this.w = w;
        this.h = h;
    }
    
    // 
    //  Copy the data
    //
    copy( obj )
    {
        this.w = obj.w;
        this.h = obj.h;
    }
    
    // 
    //  Set the size data
    //
    set( w = 0, h = 0 )
    {
        this.w = w;
        this.h = h;
    }
    
    // 
    //  DESC: Reset the data
    //
    reset()
    {
        this.w = 0;
        this.h = 0;
    }
    
    // 
    //  DESC: Does this size not have any data?
    //
    isEmpty()
    {
        if( (this.w == 0) && (this.h == 0) )
            return true;
        
        return false;
    }
    
    // 
    //  DESC: Round out the floating point number
    //
    round()
    {
        this.w = Math.round(this.w);
        this.h = Math.round(this.h);
    }
    
    // 
    //  DESC: Access members as UV data
    //
    set u(value) { this.w = value; }
    get u() { return this.w; }
    
    set v(value) { this.h = value; }
    get v() { return this.h; }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Size;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return device; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return gl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_settings__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_matrix__ = __webpack_require__(15);

// 
//  FILE NAME: device.js
//  DESC:      Singleton class used for openGL management
//






class Device
{
    constructor()
    {
        this.perspectiveMatrix = new __WEBPACK_IMPORTED_MODULE_1__utilities_matrix__["a" /* Matrix */];
        this.orthographicMatrix = new __WEBPACK_IMPORTED_MODULE_1__utilities_matrix__["a" /* Matrix */];
        this.canvas = null;
        this.glContext = null;
        
        // Create the OpenGL context
        this.create();
    }
    
    // 
    //  DESC: Create the OpenGL context
    //
    create()
    {
        this.canvas = document.getElementById('game-surface');
	this.glContext = this.canvas.getContext('webgl',{premultipliedAlpha: false, alpha: false, stencil:true, preserveDrawingBuffer: true});

	if( !this.glContext )
        {
            console.log('WebGL not supported, falling back on experimental-webgl');
            this.glContext = this.canvas.getContext('experimental-webgl',{premultipliedAlpha: false, alpha: false, stencil:true, preserveDrawingBuffer: true});
	}

	if( !this.glContext )
        {
            alert('Your browser does not support WebGL');
        }
    }
    
    // 
    //  DESC: Create the projection matrixes
    //
    createProjMatrix()
    {
        this.perspectiveMatrix.perspectiveFovRH(
            __WEBPACK_IMPORTED_MODULE_0__utilities_settings__["a" /* settings */].viewAngle,
            __WEBPACK_IMPORTED_MODULE_0__utilities_settings__["a" /* settings */].screenAspectRatio.w,
            __WEBPACK_IMPORTED_MODULE_0__utilities_settings__["a" /* settings */].minZdist,
            __WEBPACK_IMPORTED_MODULE_0__utilities_settings__["a" /* settings */].maxZdist );
            
        this.orthographicMatrix.orthographicRH(
            __WEBPACK_IMPORTED_MODULE_0__utilities_settings__["a" /* settings */].defaultSize.w,
            __WEBPACK_IMPORTED_MODULE_0__utilities_settings__["a" /* settings */].defaultSize.h,
            __WEBPACK_IMPORTED_MODULE_0__utilities_settings__["a" /* settings */].minZdist,
            __WEBPACK_IMPORTED_MODULE_0__utilities_settings__["a" /* settings */].maxZdist );
    }
}

var device = new Device;
var gl = device.glContext;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME:  point.js
//  DESC:       Point class
//





class Point
{
    constructor( x = 0, y = 0, z = 0 )
    {
        this.data = new Float32Array([x,y,z]);
    }
    
    set x(value) { this.data[0] = value; }
    get x() { return this.data[0]; }
    
    set y(value) { this.data[1] = value; }
    get y() { return this.data[1]; }
    
    set z(value) { this.data[2] = value; }
    get z() { return this.data[2]; }
    
    copy( obj )
    {
        this.data[0] = obj.data[0];
        this.data[1] = obj.data[1];
        this.data[2] = obj.data[2];
    }
    
    convertToRads()
    {
        this.x *= __WEBPACK_IMPORTED_MODULE_0__common_defs__["g" /* DEG_TO_RAD */];
        this.y *= __WEBPACK_IMPORTED_MODULE_0__common_defs__["g" /* DEG_TO_RAD */];
        this.z *= __WEBPACK_IMPORTED_MODULE_0__common_defs__["g" /* DEG_TO_RAD */];
    }
    
    setXYZ( x = 0, y = 0, z = 0 )
    {
        this.data[0] = x;
        this.data[1] = y;
        this.data[2] = z;
    }
    
    set( point )
    {
        this.data[0] = point.data[0];
        this.data[1] = point.data[1];
        this.data[2] = point.data[2];
    }
    
    incXYZ( x = 0, y = 0, z = 0 )
    {
        this.data[0] += x;
        this.data[1] += y;
        this.data[2] += z;
    }
    
    inc( point )
    {
        this.data[0] += point.data[0];
        this.data[1] += point.data[1];
        this.data[2] += point.data[2];
    }

    cap( value )
    {
        if( value > 0 )
        {
            if( this.x > value )
            {
                this.x -= value;
            }
            else if ( this.x < 0 )
            {
                this.x += value;
            }

            if( this.y > value )
            {
                this.y -= value;
            }
            else if ( this.y < 0 )
            {
                this.y += value;
            }

            if( this.z > value )
            {
                this.z -= value;
            }
            else if ( this.z < 0 )
            {
                this.z += value;
            }
        }
        else
        {
            if( this.x > value )
            {
                this.x += value;
            }
            else if ( this.x < 0 )
            {
                this.x -= value;
            }

            if( this.y > value )
            {
                this.y += value;
            }
            else if ( this.y < 0 )
            {
                this.y -= value;
            }

            if( this.z > value )
            {
                this.z += value;
            }
            else if ( this.z < 0 )
            {
                this.z -= value;
            }
        }
    }
    
    getInvert()
    {
        return new Point(-this.data[0], -this.data[1], -this.data[2]);
    }
    
    invert()
    {
        this.data[0] = -this.data[0];
        this.data[1] = -this.data[1];
        this.data[2] = -this.data[2];
    }
    
    isEmpty()
    {
        if( (this.x == 0) && (this.y == 0) && (this.z == 0) )
            return true;
        
        return false;
    }
    
    isXEmpty()
    {
        return (0 === this.x);
    }

    isYEmpty()
    {
        return (0 === this.y);
    }

    isZEmpty()
    {
        return (0 === this.z);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Point;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = downloadFile;
/* harmony export (immutable) */ __webpack_exports__["a"] = countStrOccurrence;
/* harmony export (immutable) */ __webpack_exports__["c"] = modulus;
/* unused harmony export randomInt */
/* unused harmony export randomArbitrary */
/* harmony export (immutable) */ __webpack_exports__["d"] = shuffle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__managers_signalmanager__ = __webpack_require__(25);

// 
//  FILE NAME: genfunc.js
//  DESC:      General mutipurpose functions
//





// 
//  DESC: Load files
//
function downloadFile( fileType, filepath, callback )
{
    let request = null;
    
    if( fileType !== 'img' )
        request = new XMLHttpRequest();
    
    if( fileType === 'xml' )
    {
        //console.log(`Load XML: ${filepath}`);
        request.responseType = 'document';
        request.overrideMimeType('text/xml');
    }
    else if( fileType === 'txt' )
    {
        //console.log(`Load Text: ${filepath}`);
        request.responseType = 'text';
        request.overrideMimeType('text/plain');
    }
    else if( fileType === 'binary' )
    {
        //console.log(`Load Binary: ${filepath}`);
        request.responseType = 'arraybuffer';
    }
    else if( fileType === 'img' )
    {
        //console.log(`Load Image: ${filepath}`);
    }

    if( request )
    {
        // Asynchronous reading of an xml file. Synchronous has been deprecated
        request.onreadystatechange =
            function()
            {
                if( this.readyState === 4 )
                {
                    if( (this.status >= 200 && this.status < 300) || this.status === 304 ) 
                    {
                        if( fileType === 'xml' )
                            callback(this.responseXML.childNodes[0]);

                        else if( fileType === 'txt' )
                            callback(this.responseText);

                        else if( fileType === 'binary' )
                            callback(this.response);
                        
                        __WEBPACK_IMPORTED_MODULE_0__managers_signalmanager__["a" /* signalManager */].broadcast_loadComplete();
                    }
                    else
                    {
                        throw new Error( `HTTP Request failed (${filepath}).` );
                    }
                }
            }

        // Define which file to open and send the request. True = asynchronous
        request.open('GET', filepath + '?please-dont-cache=' + Math.random(), true);
        request.send();
    }
    else
    {
        let image = new Image();
        
        image.onload = () => { callback(image); __WEBPACK_IMPORTED_MODULE_0__managers_signalmanager__["a" /* signalManager */].broadcast_loadComplete(); }
        image.onerror = ( event ) => { throw new Error( `Error downloading file (${filepath})!` ); }

        image.src = filepath;
    }
}

// 
//  DESC: Count the number of occurrences of sub string
//
function countStrOccurrence( searchStr, subStr )
{
    let result = 0;
    let found = -1;

    do
    {
        found = searchStr.indexOf( subStr, found+1 );

        if( found != -1 )
            ++result;
    }
    while( found != -1 );

    return result;
}

// 
//  DESC: Perform a modulus operation on the passed in floats
//
function modulus( v1, v2 )
{
    return (v1 - v2 * Math.floor(v1 / v2));
}

// 
//  DESC: Generate a random number
//
function randomInt( min, max )
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArbitrary( min, max )
{
    return Math.floor(Math.random() * (max - min)) + min;
}

// 
//  DESC: Shuffle array
//
function shuffle( array )
{
    if( array.length > 2 )
    {
        let currentIndex = array.length, temp, randomIndex;

        // Get the last sound that was just played
        let oldLastElement = array[array.length-1];

        // While there remain elements to shuffle...
        while (0 !== currentIndex)
        {
            // Pick a remaining element...
            randomIndex = Math.floor( Math.random() * currentIndex );
            currentIndex -= 1;

            // And swap it with the current element.
            temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }
        
        // Make sure the new first element is not the old last one.
        if( oldLastElement === array[0] )
        {
            randomIndex = Math.trunc(array.length / 2);
            array[0] = array[randomIndex];
            array[randomIndex] = oldLastElement;
        }
    }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return highResTimer; });

// 
//  FILE NAME: highresolutiontimer.js
//  DESC:      high resolution timer class
//



class HighResTimer
{
    constructor()
    {
        // Last recorded time
        this.lastTime = performance.now();

        // Timer time
        this.timer;

        // The amount of time that has elapsed between frames
        this.elapsedTime;

        // The frames per second
        this.fps;
    }
    
    //
    //  DESC: Simple timer start
    //
    timerStart()
    {
        // Get the current performance time
        this.timer = performance.now();
    }

    //
    //  DESC: Simple timer duration
    //
    timerStop()
    {
        // Get the elapsed time
        return (performance.now() - this.timer);
    }
    
    //
    //  DESC: Calc the elapsed time
    //
    calcElapsedTime()
    {
        // Get the current performance time
        let time = performance.now();

        // Set the elapsed time
        this.elapsedTime = time - this.lastTime;

        // Set the fps
        this.fps = 1000.0 / this.elapsedTime;

        // Catch any hickups - cap to about 10 fps
        // Elapsed time is not expected to get this 
        // high in  a game which is why it's capped
        if( this.elapsedTime > 100.0 )
            this.elapsedTime = 100.0;

        // Reset the last time
        this.lastTime = time;
    }

}

var highResTimer = new HighResTimer;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return objectDataManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__managers_managerbase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__managers_texturemanager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__managers_meshmanager__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__managers_vertexbuffermanager__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__managers_spritesheetmanager__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utilities_assetholder__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__objectdata2d__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__objectdata3d__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utilities_genfunc__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_defs__ = __webpack_require__(0);

//
//  FILE NAME: objactdatamanager.js
//  DESC:      Singlton that holds a map of all 2D/3D object data used for later loading
//














const LOAD_2D = 0;
const LOAD_3D = 1;

class ObjectDataManager extends __WEBPACK_IMPORTED_MODULE_0__managers_managerbase__["a" /* ManagerBase */]
{
    constructor()
    {
        super();

        this.loadType;
        this.objectDataMapMap = new Map;
    }

    //
    //  DESC: Load all XML's associated with this group
    //
    loadXMLGroup2D( groupAry, finishCallback )
    {
        this.loadType = LOAD_2D;
        super.loadGroup( 'Object data list', this.objectDataMapMap, groupAry, finishCallback );
    }
    
    loadXMLGroup3D( groupAry, finishCallback )
    {
        this.loadType = LOAD_3D;
        super.loadGroup( 'Object data list', this.objectDataMapMap, groupAry, finishCallback );
    }

    //
    //  DESC: Load all object information from an xml node
    //
    loadFromNode( group, node, filePath, finishCallback )
    {
        // Get the group map
        let groupMap = this.objectDataMapMap.get( group );
        
        let defaultData;
        if( this.loadType === LOAD_2D )
            defaultData = new __WEBPACK_IMPORTED_MODULE_6__objectdata2d__["a" /* ObjectData2D */];

        else
            defaultData = new __WEBPACK_IMPORTED_MODULE_7__objectdata3d__["a" /* ObjectData3D */];

        // Load the default data
        defaultData.loadObjData( node.getElementsByTagName('default')[0], '', '' );

        // Get the node to the list of objects
        let objNode = node.getElementsByTagName('object');

        for( let i = 0; i < objNode.length; ++i )
        {
            // Get the object's name
            let name = objNode[i].getAttribute( 'name' );
            
            // Check that this object doesn't already exist
            if( groupMap.get(name) === undefined )
            {
                // Make a copy of the default object
                let objData
                if( this.loadType === LOAD_2D )
                    objData = new __WEBPACK_IMPORTED_MODULE_6__objectdata2d__["a" /* ObjectData2D */];
                else
                    objData = new __WEBPACK_IMPORTED_MODULE_7__objectdata3d__["a" /* ObjectData3D */];
                
                objData.copy(defaultData);

                // Load in the object data
                objData.loadObjData( objNode[i], group, name );

                // Debug output
                //console.log(JSON.stringify(objData));

                // Save it to the map map
                groupMap.set( name, objData );
            }
            else
            {
                throw new Error( `Group object already exists (${group}, ${name})!` );
            }
        }

        // Debug output
        //console.log(JSON.stringify(defaultData));
    }
    
    //
    //  DESC: Load all the textures associated with this group
    //
    loadTextureGroup2D( groupAry, finishCallback )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Get the group map
            let groupMap = this.objectDataMapMap.get( group );
            if( groupMap !== undefined )
            {
                let dupPathCheck = [];

                for( let [ key, objData ] of groupMap.entries() )
                {
                    let filePath = objData.visualData.textureFilePath;

                    if( filePath && (dupPathCheck.indexOf(filePath) === -1) )
                    {
                        // Add to the array to check for duplication
                        dupPathCheck.push( filePath );

                        // Check if this file has already been loaded
                        if( !__WEBPACK_IMPORTED_MODULE_5__utilities_assetholder__["a" /* assetHolder */].has( group, filePath ) )
                        {
                            // Load the texture file
                            this.downloadFile( 'img', group, filePath, finishCallback,
                                ( group, image, filePath, finishCallback ) =>
                                {
                                    __WEBPACK_IMPORTED_MODULE_5__utilities_assetholder__["a" /* assetHolder */].set( group, filePath, image );

                                    __WEBPACK_IMPORTED_MODULE_1__managers_texturemanager__["a" /* textureManager */].load( group, filePath, image );
                                });
                        }
                        else
                        {
                            __WEBPACK_IMPORTED_MODULE_1__managers_texturemanager__["a" /* textureManager */].load( group, filePath, __WEBPACK_IMPORTED_MODULE_5__utilities_assetholder__["a" /* assetHolder */].get( group, filePath) );
                        }
                    }
                }

                // If there's nothing to load or it was loaded via assetHolder, call the complete callback
                if( this.loadCounter === 0 )
                    finishCallback();
            }
            else
            {
                throw new Error( `Can't create from data because object group does not exist (${group})!` );
            }
        }
    }

    //
    //  DESC: Load all the meshes associated with this group
    //
    loadMeshGroup2D( groupAry, finishCallback )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Get the group map
            let groupMap = this.objectDataMapMap.get( group );
            if( groupMap !== undefined )
            {
                let dupPathCheck = [];

                for( let [ key, objData ] of groupMap.entries() )
                {
                    let filePathAry = [objData.visualData.meshFilePath, objData.visualData.spriteSheetFilePath];

                    for( let i = 0; i < filePathAry.length; ++i )
                    {
                        if( filePathAry[i] && (dupPathCheck.indexOf(filePathAry[i]) === -1) )
                        {
                            // Add to the array to check for duplication
                            dupPathCheck.push( filePathAry[i] );

                            // Check if this file has already been loaded
                            if( !__WEBPACK_IMPORTED_MODULE_5__utilities_assetholder__["a" /* assetHolder */].has( group, filePathAry[i] ) )
                            {
                                // Load the mesh file
                                this.downloadFile( 'xml', group, filePathAry[i], finishCallback,
                                    ( group, xmlNode, filePath, finishCallback ) =>
                                    {
                                        __WEBPACK_IMPORTED_MODULE_5__utilities_assetholder__["a" /* assetHolder */].set( group, filePath, xmlNode );

                                        if( filePath === objData.visualData.spriteSheetFilePath )
                                            __WEBPACK_IMPORTED_MODULE_4__managers_spritesheetmanager__["a" /* spriteSheetManager */].loadFromNode( filePath, xmlNode );
                                    });
                            }
                            else
                            {
                                if( filePathAry[i] === objData.visualData.spriteSheetFilePath )
                                    __WEBPACK_IMPORTED_MODULE_4__managers_spritesheetmanager__["a" /* spriteSheetManager */].loadFromNode( filePathAry[i], __WEBPACK_IMPORTED_MODULE_5__utilities_assetholder__["a" /* assetHolder */].get( group, filePathAry[i] ) );
                            }
                        }
                    }
                }

                // If there's nothing to load or it was loaded via assetHolder, call the complete callback
                if( this.loadCounter === 0 )
                    finishCallback();
            }
            else
            {
                throw new Error( `Can't create load mesh data because object group does not exist (${group})!` );
            }
        }
    }
    
    //
    //  DESC: Load all the meshes associated with this group
    //
    loadMeshGroup3D( groupAry, finishCallback )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Get the group map
            let groupMap = this.objectDataMapMap.get( group );
            if( groupMap !== undefined )
            {
                let dupPathCheck = [];

                for( let [ key, objData ] of groupMap.entries() )
                {
                    let filePath = objData.visualData.meshFilePath;

                    if( filePath && (dupPathCheck.indexOf(filePath) === -1) )
                    {
                        // Add to the array to check for duplication
                        dupPathCheck.push( filePath );

                        // Check if this file has already been loaded
                        if( !__WEBPACK_IMPORTED_MODULE_5__utilities_assetholder__["a" /* assetHolder */].has( group, filePath ) )
                        {
                            // Load the mesh file
                            this.downloadFile( 'binary', group, filePath, finishCallback,
                                ( group, binaryFile, filePath, finishCallback ) =>
                                {
                                    __WEBPACK_IMPORTED_MODULE_5__utilities_assetholder__["a" /* assetHolder */].set( group, filePath, binaryFile );

                                    objData.visualData.meshGrp =
                                        __WEBPACK_IMPORTED_MODULE_2__managers_meshmanager__["a" /* meshManager */].load( group, filePath, binaryFile );
                                });
                        }
                        else
                        {
                            objData.visualData.meshGrp =
                                __WEBPACK_IMPORTED_MODULE_2__managers_meshmanager__["a" /* meshManager */].load( group, filePath, __WEBPACK_IMPORTED_MODULE_5__utilities_assetholder__["a" /* assetHolder */].get( group, filePath ) );
                        }
                    }
                }

                // If there's nothing to load or it was loaded via assetHolder, call the complete callback
                if( this.loadCounter === 0 )
                    finishCallback();
            }
            else
            {
                throw new Error( `Can't load mesh data because object group does not exist (${group})!` );
            }
        }
    }
    
    //
    //  DESC: Load all the textures associated with this group
    //
    loadTextureGroup3D( groupAry, finishCallback )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Get the group map
            let groupMap = this.objectDataMapMap.get( group );
            if( groupMap !== undefined )
            {
                let dupPathCheck = [];

                for( let [ key, objData ] of groupMap.entries() )
                {
                    let filePath = objData.visualData.meshFilePath;

                    if( filePath && (dupPathCheck.indexOf(filePath) === -1) )
                    {
                        // Add to the array to check for duplication
                        dupPathCheck.push( filePath );

                        for( let i = 0; i < objData.visualData.meshGrp.uniqueTexturePathAry.length; ++i )
                        {
                            filePath = objData.visualData.meshGrp.uniqueTexturePathAry[i].path;

                            // Check if this file has already been loaded
                            if( !__WEBPACK_IMPORTED_MODULE_5__utilities_assetholder__["a" /* assetHolder */].has( group, filePath ) )
                            {
                                // Load the texture file
                                this.downloadFile( 'img', group, filePath, finishCallback,
                                    ( group, image, filePath, finishCallback ) =>
                                    {
                                        __WEBPACK_IMPORTED_MODULE_5__utilities_assetholder__["a" /* assetHolder */].set( group, filePath, image );

                                        __WEBPACK_IMPORTED_MODULE_1__managers_texturemanager__["a" /* textureManager */].load( group, filePath, image );
                                    });
                            }
                            else
                            {
                                __WEBPACK_IMPORTED_MODULE_1__managers_texturemanager__["a" /* textureManager */].load( group, filePath, __WEBPACK_IMPORTED_MODULE_5__utilities_assetholder__["a" /* assetHolder */].get( group, filePath) );
                            }
                        }
                    }
                }

                // If there's nothing to load or it was loaded via assetHolder, call the complete callback
                if( this.loadCounter === 0 )
                    finishCallback();
            }
            else
            {
                throw new Error( `Can't create from data because object group does not exist (${group})!` );
            }
        }
    }
    
    //
    //  DESC: Create OpenGL objects from data
    //
    createFromData( groupAry, callback )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Get the group map
            let groupMap = this.objectDataMapMap.get( group );
            if( groupMap !== undefined )
            {
                // Create OpenGL objects from data
                for( let [ key, objData ] of groupMap.entries() )
                    objData.createFromData( group );
            }
        }

        callback();
    }
    
    //
    //  DESC: Free all of the meshes materials and data of a specific group
    //
    freeGroup( groupAry )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for exists
            if( this.listTableMap.get( group ) === undefined )
                throw new Error( `Object data list group name can't be found (${group})!` );

            // Get the group map
            if( this.objectDataMapMap.has( group ) )
            {
                __WEBPACK_IMPORTED_MODULE_1__managers_texturemanager__["a" /* textureManager */].deleteGroup( group );
                __WEBPACK_IMPORTED_MODULE_3__managers_vertexbuffermanager__["a" /* vertexBufferManager */].deleteGroup( group );
                __WEBPACK_IMPORTED_MODULE_2__managers_meshmanager__["a" /* meshManager */].deleteGroup( group );

                this.objectDataMapMap.delete( group );
            }
        }
    }
    
    //
    //  DESC: Get a specific object data
    //
    getData( group, name )
    {
        // Get the group map
        let groupMap = this.objectDataMapMap.get( group );
        if( groupMap !== undefined )
        {
            let objData = groupMap.get( name );
            if( objData )
                return objData;
            else
                throw new Error( `Object data not found (${group}, ${name})!` );
        }
        else
            throw new Error( `Object group not found (${group}, ${name})!` );
        
        return null;
    }
}

var objectDataManager = new ObjectDataManager;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["l"] = loadVertex2d;
/* harmony export (immutable) */ __webpack_exports__["e"] = loadPosition;
/* harmony export (immutable) */ __webpack_exports__["h"] = loadRotation;
/* harmony export (immutable) */ __webpack_exports__["i"] = loadScale;
/* harmony export (immutable) */ __webpack_exports__["a"] = loadCenterPos;
/* unused harmony export loadXYZ */
/* harmony export (immutable) */ __webpack_exports__["b"] = loadColor;
/* harmony export (immutable) */ __webpack_exports__["j"] = loadSize;
/* harmony export (immutable) */ __webpack_exports__["f"] = loadRect;
/* harmony export (immutable) */ __webpack_exports__["g"] = loadRectFromChild;
/* harmony export (immutable) */ __webpack_exports__["d"] = loadHorzAlignment;
/* harmony export (immutable) */ __webpack_exports__["k"] = loadVertAlignment;
/* harmony export (immutable) */ __webpack_exports__["c"] = loadDynamicOffset;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_color__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_rect__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_vertex2d__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_dynamicoffset__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: xmlparsehelper.js
//  DESC:      General xml parse helper functions
//             NOTE: Nonexistant attributes return null
//










// 
//  DESC: Load the 2d vertex
//
function loadVertex2d( node )
{
    if( node )
    {
        let vert2d = new __WEBPACK_IMPORTED_MODULE_4__common_vertex2d__["a" /* Vertex2d */];
        
        let attr = node.getAttribute('x');
        if( attr )
            vert2d.x = Number( attr );

        attr = node.getAttribute('y');
        if( attr )
            vert2d.y = Number( attr );

        attr = node.getAttribute('z');
        if( attr )
            vert2d.z = Number( attr );

        attr = node.getAttribute('u');
        if( attr )
            vert2d.u = Number( attr );

        attr = node.getAttribute('v');
        if( attr )
            vert2d.v = Number( attr );
        
        return vert2d;
    }

    return null;
}

// 
//  DESC: Load the position
//
function loadPosition( node )
{
    let positionNode = node.getElementsByTagName( 'position' );

    if( positionNode.length )
    {
        let point = new __WEBPACK_IMPORTED_MODULE_2__common_point__["a" /* Point */];
        
        let attr = positionNode[0].getAttribute( 'x' );
        if( attr )
            point.x = Number( attr );
        
        attr = positionNode[0].getAttribute( 'y' );
        if( attr )
            point.y = Number( attr );
        
        attr = positionNode[0].getAttribute( 'z' );
        if( attr )
            point.z = Number( attr );
        
        return point;
    }

    return null;
}

// 
//  DESC: Load the position
//
function loadRotation( node )
{
    let rotationNode = node.getElementsByTagName( 'rotation' );

    if( rotationNode.length )
    {
        let rotation = new __WEBPACK_IMPORTED_MODULE_2__common_point__["a" /* Point */];
        
        let attr = rotationNode[0].getAttribute( 'x' );
        if( attr )
            rotation.x = Number( attr );
        
        attr = rotationNode[0].getAttribute( 'y' );
        if( attr )
            rotation.y = Number( attr );
        
        attr = rotationNode[0].getAttribute( 'z' );
        if( attr )
            rotation.z = Number( attr );
        
        return rotation;
    }

    return null;
}

// 
//  DESC: Load the scale
//
function loadScale( node )
{
    let scaleNode = node.getElementsByTagName( 'scale' );

    if( scaleNode.length )
    {
        let scale = new __WEBPACK_IMPORTED_MODULE_2__common_point__["a" /* Point */];
        
        let attr = scaleNode[0].getAttribute( 'x' );
        if( attr )
            scale.x = Number( attr );
        
        attr = scaleNode[0].getAttribute( 'y' );
        if( attr )
            scale.y = Number( attr );
        
        attr = scaleNode[0].getAttribute( 'z' );
        if( attr )
            scale.z = Number( attr );
        
        return scale;
    }

    return null;
}

// 
//  DESC: Load the center position
//
function loadCenterPos( node )
{
    let centerPosNode = node.getElementsByTagName( 'centerPos' );

    if( centerPosNode.length )
    {
        let centerPos = new __WEBPACK_IMPORTED_MODULE_2__common_point__["a" /* Point */];
        
        let attr = centerPosNode[0].getAttribute( 'x' );
        if( attr )
            centerPos.x = Number( attr );
        
        attr = centerPosNode[0].getAttribute( 'y' );
        if( attr )
            centerPos.y = Number( attr );
    
        attr = centerPosNode[0].getAttribute( 'z' );
        if( attr )
            centerPos.z = Number( attr );
        
        return centerPos;
    }

    return null;
}

// 
//  DESC: Load the generic x, y, z values
//
function loadXYZ( node )
{
    let point = new __WEBPACK_IMPORTED_MODULE_2__common_point__["a" /* Point */];

    let attr = node.getAttribute('x');
    if( attr )
        point.x = Number( attr );

    attr = node.getAttribute('y');
    if( attr )
        point.y = Number( attr );

    attr = node.getAttribute('z');
    if( attr )
        point.z = Number( attr );

    return point;

}   // LoadScale

// 
//  DESC: Load the color
//
function loadColor( node, currentColor = null )
{
    let color = new __WEBPACK_IMPORTED_MODULE_0__common_color__["a" /* Color */];
    
    if( currentColor )
        color.copy( currentColor );

    let colorNode = node.getElementsByTagName( 'color' );
    if( colorNode.length )
    {
        let attr = colorNode[0].getAttribute('r');
        if( attr )
            color.r = Number(attr);

        attr = colorNode[0].getAttribute('g');
        if( attr )
            color.g = Number(attr);

        attr = colorNode[0].getAttribute('b');
        if( attr )
            color.b = Number(attr);

        attr = colorNode[0].getAttribute('a');
        if( attr )
            color.a = Number(attr);

        // Convert if in RGBA format
        color.convert();
    }

    return color;
}

// 
//  DESC: Load the size
//
function loadSize( node, currentSize = null )
{
    let size = new __WEBPACK_IMPORTED_MODULE_1__common_size__["a" /* Size */];
    
    if( currentSize )
        size.copy( currentSize );

    let sizeNode = node.getElementsByTagName( 'size' );
    if( sizeNode.length )
    {
        let attr = sizeNode[0].getAttribute('width');
        if( attr )
            size.w = Number(attr);

        attr = sizeNode[0].getAttribute('height');
        if( attr )
            size.h = Number(attr);
    }

    return size;
}

// 
//  DESC: Load the rect
//
function loadRect( node )
{
    let rectNode = node.getElementsByTagName( 'rect' );
    
    if( rectNode.length )
        return loadRectFromChild( rectNode[0] );

    return new __WEBPACK_IMPORTED_MODULE_3__common_rect__["a" /* Rect */];
}

function loadRectFromChild( node )
{
    let rect = new __WEBPACK_IMPORTED_MODULE_3__common_rect__["a" /* Rect */];
    
    let attr = node.getAttribute('x1');
        if( attr )
            rect.x1 = Number(attr);
        
    attr = node.getAttribute('y1');
        if( attr )
            rect.y1 = Number(attr);
        
    attr = node.getAttribute('x2');
        if( attr )
            rect.x2 = Number(attr);

    attr = node.getAttribute('y2');
        if( attr )
            rect.y2 = Number(attr);

    return rect;
}

// 
//  DESC: Load the horizontal alignment
//
function loadHorzAlignment( node, aHorzAlign )
{
    let horzAlign = aHorzAlign;

    let horzAlignAttr = node.getAttribute( 'horzAlign' );
    if( horzAlignAttr )
    {
        if( horzAlignAttr === 'left' )
            horzAlign = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_25" /* EHA_HORZ_LEFT */];

        else if( horzAlignAttr === 'center' )
            horzAlign = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_24" /* EHA_HORZ_CENTER */];

        else if( horzAlignAttr === 'right' )
            horzAlign = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_26" /* EHA_HORZ_RIGHT */];
    }

    return horzAlign;
}

// 
//  DESC: Load the vertical alignment
//
function loadVertAlignment( node, aVertAlign )
{
    let vertAlign = aVertAlign;

    let vertAlignAttr = node.getAttribute( 'vertAlign' );
    if( vertAlignAttr )
    {
        if( vertAlignAttr === 'top' )
            vertAlign = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_54" /* EVA_VERT_TOP */];

        else if( vertAlignAttr === 'center' )
            vertAlign = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_53" /* EVA_VERT_CENTER */];

        else if( vertAlignAttr === 'bottom' )
            vertAlign = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_52" /* EVA_VERT_BOTTOM */];
    }

    return vertAlign;
}

// 
//  DESC: Load the dynamic offset
//
function loadDynamicOffset( node )
{
    let dynamicOffsetNode = node.getElementsByTagName( 'dynamicOffset' );

    if( dynamicOffsetNode.length )
    {
        let dynamicOffset = new __WEBPACK_IMPORTED_MODULE_5__common_dynamicoffset__["a" /* DynamicOffset */];
        
        let attr = dynamicOffsetNode[0].getAttribute('left');
        if( attr )
        {
            dynamicOffset.add( __WEBPACK_IMPORTED_MODULE_6__common_defs__["R" /* EDO_LEFT */] );
            dynamicOffset.setX( Number( attr ) );
        }
        else
        {
            attr = dynamicOffsetNode[0].getAttribute('right');
            if( attr )
            {
                dynamicOffset.add( __WEBPACK_IMPORTED_MODULE_6__common_defs__["S" /* EDO_RIGHT */] );
                dynamicOffset.setX( Number( attr ) );
            }
            else
            {
                attr = dynamicOffsetNode[0].getAttribute('horzCenter');
                if( attr )
                {
                    dynamicOffset.add( __WEBPACK_IMPORTED_MODULE_6__common_defs__["Q" /* EDO_HORZ_CENTER */] );
                    dynamicOffset.setX( Number( attr ) );
                }
            }
        }
        
        attr = dynamicOffsetNode[0].getAttribute('top');
        if( attr )
        {
            dynamicOffset.add( __WEBPACK_IMPORTED_MODULE_6__common_defs__["T" /* EDO_TOP */] );
            dynamicOffset.setY( Number( attr ) );
        }
        else
        {
            attr = dynamicOffsetNode[0].getAttribute('bottom');
            if( attr )
            {
                dynamicOffset.add( __WEBPACK_IMPORTED_MODULE_6__common_defs__["P" /* EDO_BOTTOM */] );
                dynamicOffset.setY( Number( attr ) );
            }
            else
            {
                attr = dynamicOffsetNode[0].getAttribute('vertCenter');
                if( attr )
                {
                    dynamicOffset.add( __WEBPACK_IMPORTED_MODULE_6__common_defs__["U" /* EDO_VERT_CENTER */] );
                    dynamicOffset.setX( Number( attr ) );
                }
            }
        }
        
        return dynamicOffset;
    }

    return null;
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__visualcomponent2d__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__physics_physicscomponent2d__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__script_scriptcomponent__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__script_scriptmanager__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__object2d__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utilities_matrix__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME:  sprite2d.js
//  DESC:       2D sprite class
//











class Sprite2D extends __WEBPACK_IMPORTED_MODULE_4__object2d__["a" /* Object2D */]
{
    constructor( objData, id = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_63" /* SPRITE_DEFAULT_ID */] )
    {
        super();
        
        // The object data
        this.objData = objData;
        
        // The visual part of the 2d sprite
        this.visualComponent = new __WEBPACK_IMPORTED_MODULE_0__visualcomponent2d__["a" /* VisualComponent2D */]( objData.visualData );
        
        // The visual part of the 2d sprite
        if( objData.physicsData.isActive() )
            this.physicsComponent = new __WEBPACK_IMPORTED_MODULE_1__physics_physicscomponent2d__["a" /* PhysicsComponent2D */]( objData.physicsData );
        
        // The script part of the 2d sprite
        this.scriptComponent = new __WEBPACK_IMPORTED_MODULE_2__script_scriptcomponent__["a" /* ScriptComponent */];
        
        // Unique Id number
        this.id = id;
        
        // AI
        this.ai = null;
        
        // Script object map. Prepare scripts by name
        this.scriptFactoryMap = new Map;
        
        // If there's no visual data, set the hide flag
        this.setVisible( objData.visualData.isActive() );
        
        if( objData.visualData.genType === __WEBPACK_IMPORTED_MODULE_6__common_defs__["_23" /* EGT_SPRITE_SHEET */] )
            this.setCropOffset( objData.visualData.spriteSheet.getGlyph().cropOffset );
        
        // Set the sprite type
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_6__common_defs__["_62" /* SPRITE2D */] );
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
                this.scriptFactoryMap.set( attr.name, __WEBPACK_IMPORTED_MODULE_3__script_scriptmanager__["a" /* scriptManager */].get(attr.value) );
        }
    }
    
    // 
    //  DESC: Prepare the script factory function to run
    //
    prepareScriptFactoryFunction( scriptFactoryId, forceUpdate = false )
    {
        let scriptFactory = this.scriptFactoryMap.get( scriptFactoryId );
        if( scriptFactory )
        {
            this.scriptComponent.set( scriptFactory(this) );
            
            if( forceUpdate )
                this.scriptComponent.update();
        }
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
    }
    
    // 
    //  DESC: Init the physics
    //
    initPhysics()
    {
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
    setFrame( index )
    {
        if( this.visualComponent.frameIndex != index )
        {
            this.visualComponent.setFrame( index );

            if( this.objData.visualData.genType === __WEBPACK_IMPORTED_MODULE_6__common_defs__["_23" /* EGT_SPRITE_SHEET */] )
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Sprite2D;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return assetHolder; });

// 
//  FILE NAME: assetholder.js
//  DESC:      Class for holding loaded file data
//



class AssetHolder
{
    constructor()
    {
        this.loadMapMap = new Map;
    }
    
    // 
    //  DESC: Check for the data
    //
    has( group, name )
    {
        // Get the group map
        let groupMap = this.loadMapMap.get( group );
        if( groupMap === undefined )
            return false;
        
        return groupMap.has(name);
    }
    
    // 
    //  DESC: Set the data
    //
    set( group, name, data = null )
    {
        let groupMap = this.loadMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.loadMapMap.set( group, groupMap );
        }
        
        groupMap.set( name, data );
    }
    
    // 
    //  DESC: Get the data
    //
    get( group, name )
    {
        let groupMap = this.loadMapMap.get( group );
        if( groupMap === undefined )
            throw new Error( `Group does not exist! (${group}).` );
            
        let data = groupMap.get( name );
        if( data === undefined )
            throw new Error( `Data does not exist! (${name}).` );
        
        return data;
    }
    
    // 
    //  DESC: Delete the group
    //
    deleteGroup( groupAry )
    {
        for( let i = 0; i < groupAry.length; ++i )
            this.loadMapMap.delete( groupAry[i] );
    }
    
    // 
    //  DESC: Clear the group data
    //
    clear()
    {
        this.loadMapMap = new Map;
    }
}

var assetHolder = new AssetHolder;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return eventManager; });

//
//  FILE NAME: eventmanager.js
//  DESC:      event manager class singleton
//



class EventManager
{
    constructor()
    {
        this.canvas = document.getElementById('game-surface');
        this.queue = [];
        
        // Init with the most common events

        // Event handlers
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this) );
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this) );
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this) );
        
        // Using document for key listener because canvas needs the focus before
        // it will trap key events. There's no good solution for force the focus
        // onto the canvas
        document.addEventListener('keydown', this.onKeyDown.bind(this) );
        document.addEventListener('keyup', this.onKeyUp.bind(this) );
        
        document.addEventListener('scroll', this.onScroll.bind(this) );
        
        //this.canvas.addEventListener('keydown', this.onKeyDown.bind(this) );
        //this.canvas.addEventListener('keyup', this.onKeyUp.bind(this) );
        
        // Mouse move relative offset data types
        this.lastMouseMoveX = 0;
        this.lastMouseMoveY = 0;
        
        this.mouseMoveRelX = 0;
        this.mouseMoveRelY = 0;
        
        this.mouseMoveOffsetX = (document.documentElement.scrollLeft - this.canvas.offsetLeft);
        this.mouseMoveOffsetY = (document.documentElement.scrollTop - this.canvas.offsetTop);
    }
    
    get mouseX() { return this.lastMouseMoveX; }
    get mouseY() { return this.lastMouseMoveY; }
    
    get mouseRelX() { return this.mouseMoveRelX; }
    get mouseRelY() { return this.mouseMoveRelY; }
    
    get mouseOffsetX() { return this.mouseMoveOffsetX; }
    get mouseOffsetY() { return this.mouseMoveOffsetY; }
    
    pollEvent()
    {
        if( this.queue.length )
            return this.queue.shift();
        
        return null;
    }
    
    dispatchEvent( _type, ...args )
    {
        let event = new CustomEvent('customEvent',
            {
                detail:
                {
                    type: _type,
                    arg: args
                }
            });
        
        this.queue.push( event );
    }
    
    onScroll( event )
    {
        this.mouseMoveOffsetX = (document.documentElement.scrollLeft - this.canvas.offsetLeft);
        this.mouseMoveOffsetY = (document.documentElement.scrollTop - this.canvas.offsetTop);
    }
    
    onMouseDown( event )
    {
        this.queue.push( event );
        
        //console.log( event.type + ', ' + event.button );
    }
    
    onMouseUp( event )
    {
        this.queue.push( event );
    }
    
    onMouseMove( event )
    {
        this.queue.push( event );
        
        this.mouseMoveRelX = event.movementX;
        this.mouseMoveRelY = event.movementY;
        
        this.lastMouseMoveX = event.clientX + this.mouseMoveOffsetX;
        this.lastMouseMoveY = event.clientY + this.mouseMoveOffsetY;
        
        //console.log( `Mouse move - ClientX: ${event.clientX}, ClientY: ${event.clientY}, OffsetX: ${event.offsetX}, OffsetY: ${event.offsetY}, RelX: ${event.movementX}, RelY: ${event.movementY}` );
        //console.log(`Canvas Offset: ${this.canvas.offsetLeft} x ${this.canvas.offsetTop}`);
        //console.log(`Document Offset: ${document.documentElement.scrollLeft} x ${document.documentElement.scrollTop}`);
    }
    
    onKeyDown( event )
    {
        if( event.repeat === false )
        {
            this.queue.push( event );
            
            //console.log( event.type + ', ' + event.key + ', ' + event.keyCode );
        }
    }
    
    onKeyUp( event )
    {
        this.queue.push( event );
    }
    
    onCustomEvent( event )
    {
        this.queue.push( event );
        
        //console.log( `Custom Event was sent. ${event.detail.type}, ${event.detail.arg[0]}, ${event.detail.arg[1]}` );
    }
}

var eventManager = new EventManager;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: slotdefs.js
//  DESC:      misc slot defines
//



// ESlotDevice
const ED_NULL  = 0,
             ED_REEL  = 1,
             ED_WHEEL = 2;
/* unused harmony export ED_NULL */

/* harmony export (immutable) */ __webpack_exports__["c"] = ED_REEL;

/* harmony export (immutable) */ __webpack_exports__["d"] = ED_WHEEL;


// ESpinDirection
const ESD_UP               = 0,
             ESD_DOWN             = 1,
             ESD_LEFT             = 2,
             ESD_RIGHT            = 3,
             EDS_CLOCKWISE        = 4,
             EDS_COUNTERCLOCKWISE = 5;
/* harmony export (immutable) */ __webpack_exports__["j"] = ESD_UP;

/* harmony export (immutable) */ __webpack_exports__["g"] = ESD_DOWN;

/* harmony export (immutable) */ __webpack_exports__["h"] = ESD_LEFT;

/* harmony export (immutable) */ __webpack_exports__["i"] = ESD_RIGHT;

/* harmony export (immutable) */ __webpack_exports__["a"] = EDS_CLOCKWISE;

/* harmony export (immutable) */ __webpack_exports__["b"] = EDS_COUNTERCLOCKWISE;


// EPayType
const EP_PAYLINE = 0,
             EP_SCATTER = 1;
/* harmony export (immutable) */ __webpack_exports__["e"] = EP_PAYLINE;

/* harmony export (immutable) */ __webpack_exports__["f"] = EP_SCATTER;

    
// ESpinState
const ESS_STOPPED         = 0,
             ESS_SPIN_STARTING   = 1,
             ESS_SPINNING        = 2,
             ESS_PREPARE_TO_STOP = 3,
             ESS_SPIN_STOPPING   = 4;
/* harmony export (immutable) */ __webpack_exports__["E"] = ESS_STOPPED;

/* harmony export (immutable) */ __webpack_exports__["C"] = ESS_SPIN_STARTING;

/* harmony export (immutable) */ __webpack_exports__["B"] = ESS_SPINNING;

/* harmony export (immutable) */ __webpack_exports__["A"] = ESS_PREPARE_TO_STOP;

/* harmony export (immutable) */ __webpack_exports__["D"] = ESS_SPIN_STOPPING;

    
// ESlotState
const ESLOT_IDLE                    = 0,
             ESLOT_WAIT_CYCLE_RESULTS_STOP = 1,
             ESLOT_PLACE_WAGER             = 2,
             ESLOT_GENERATE_STOPS          = 3,
             ESLOT_EVALUATE                = 4,
             ESLOT_PRE_SPIN                = 5,
             ESLOT_SPIN                    = 6,
             ESLOT_POST_SPIN               = 7,
             ESLOT_PRE_AWARD_WIN           = 8,
             ESLOT_BONUS_DECISION          = 9,
             ESLOT_PRE_BONUS               = 10,
             ESLOT_BONUS                   = 11,
             ESLOT_POST_BONUS              = 12,
             ESLOT_POST_AWARD_WIN          = 13,
             ESLOT_WAIT_FOR_AWARD          = 14,
             ESLOT_END                     = 15;
/* harmony export (immutable) */ __webpack_exports__["p"] = ESLOT_IDLE;

/* harmony export (immutable) */ __webpack_exports__["y"] = ESLOT_WAIT_CYCLE_RESULTS_STOP;

/* harmony export (immutable) */ __webpack_exports__["q"] = ESLOT_PLACE_WAGER;

/* harmony export (immutable) */ __webpack_exports__["o"] = ESLOT_GENERATE_STOPS;

/* harmony export (immutable) */ __webpack_exports__["n"] = ESLOT_EVALUATE;

/* harmony export (immutable) */ __webpack_exports__["w"] = ESLOT_PRE_SPIN;

/* harmony export (immutable) */ __webpack_exports__["x"] = ESLOT_SPIN;

/* harmony export (immutable) */ __webpack_exports__["t"] = ESLOT_POST_SPIN;

/* harmony export (immutable) */ __webpack_exports__["u"] = ESLOT_PRE_AWARD_WIN;

/* harmony export (immutable) */ __webpack_exports__["l"] = ESLOT_BONUS_DECISION;

/* harmony export (immutable) */ __webpack_exports__["v"] = ESLOT_PRE_BONUS;

/* harmony export (immutable) */ __webpack_exports__["k"] = ESLOT_BONUS;

/* harmony export (immutable) */ __webpack_exports__["s"] = ESLOT_POST_BONUS;

/* harmony export (immutable) */ __webpack_exports__["r"] = ESLOT_POST_AWARD_WIN;

/* harmony export (immutable) */ __webpack_exports__["z"] = ESLOT_WAIT_FOR_AWARD;

/* harmony export (immutable) */ __webpack_exports__["m"] = ESLOT_END;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return textureManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_texture__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__system_device__ = __webpack_require__(2);

//
//  FILE NAME: texturemanager.js
//  DESC:      texture class singleton
//





class TextureManager
{
    constructor()
    {
        // Map containing a group of texture handles
        this.textureForMapMap = new Map;

        // Current texture
        this.currentTexture = null;
    }

    //
    //  DESC: Load the image file as a texture
    //
    load( group, filePath, image )
    {
        if( !image.complete )
            throw new Error( `Image file not completely loaded! (${group}, ${filePath}).` );

        // Create the group map if it doesn't already exist
        let groupMap = this.textureForMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.textureForMapMap.set( group, groupMap );
        }

        let texture = groupMap.get( filePath );
        if( texture === undefined )
        {
            let texture = new __WEBPACK_IMPORTED_MODULE_0__common_texture__["a" /* Texture */];
            texture.id = __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].createTexture();
            texture.size.w = image.width;
            texture.size.h = image.height;

            __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].bindTexture( __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].TEXTURE_2D, texture.id );
            __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].texParameteri( __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].TEXTURE_WRAP_S, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].CLAMP_TO_EDGE );
            __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].texParameteri( __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].TEXTURE_WRAP_T, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].CLAMP_TO_EDGE );
            __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].texParameteri( __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].TEXTURE_MIN_FILTER, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].LINEAR );
            __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].texParameteri( __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].TEXTURE_2D, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].TEXTURE_MAG_FILTER, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].LINEAR );
            __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].texImage2D( __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].TEXTURE_2D, 0, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].RGBA, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].RGBA, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].UNSIGNED_BYTE, image );
            __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].bindTexture( __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].TEXTURE_2D, null );

            groupMap.set( filePath, texture );
        }
        
        return texture;
    }

    //
    //  DESC: Delete the group of textures
    //
    deleteGroup( group )
    {
        let groupMap = this.textureForMapMap.get( group );
        if( groupMap !== undefined )
        {
            for( let [ key, texture ] of groupMap.entries() )
                __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].deleteTexture( texture.id );
            
            this.textureForMapMap.delete( group );
        }
    }

    //
    //  DESC: Get the 2D texture class
    //
    getTexture( group, filePath )
    {
        let groupMap = this.textureForMapMap.get( group );
        if( groupMap !== undefined )
        {
            let texture = groupMap.get( filePath );
            if( texture !== undefined )
                return texture;
            
            throw new Error( `Texture does not exists! (${group}, ${filePath}).` );
        }
        // Santy check.
        else
        {
            throw new Error( `Texture group does not exists! (${group}, ${filePath}).` );
        }

        return null;
    }

    //
    //  DESC: Create OpenGL objects from data
    //
    bind( textureId )
    {
        if( this.currentTexture != textureId )
        {
            // save the current binding
            this.currentTexture = textureId;

            // Have OpenGL bind this texture now
            __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].TEXTURE_2D, textureId);
        }
    }

    //
    //  DESC: Unbind the texture and reset the flag
    //
    unbind()
    {
        this.currentTexture = null;
        __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].bindTexture(__WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].TEXTURE_2D, null);
    }
}

var textureManager = new TextureManager;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return settings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: settings.js
//  DESC:      game settings singleton class
//





class Settings
{
    constructor()
    {
        this.size = new __WEBPACK_IMPORTED_MODULE_0__common_size__["a" /* Size */];
        this.size_half = new __WEBPACK_IMPORTED_MODULE_0__common_size__["a" /* Size */];
        this.nativeSize = new __WEBPACK_IMPORTED_MODULE_0__common_size__["a" /* Size */];
        this.screenAspectRatio = new __WEBPACK_IMPORTED_MODULE_0__common_size__["a" /* Size */];
        this.orthoAspectRatio = new __WEBPACK_IMPORTED_MODULE_0__common_size__["a" /* Size */];
        this.defaultSize = new __WEBPACK_IMPORTED_MODULE_0__common_size__["a" /* Size */];
        this.defaultSize_half = new __WEBPACK_IMPORTED_MODULE_0__common_size__["a" /* Size */];
        
        this.enableDepthBuffer = false;
        this.createStencilBuffer = false;
        this.clearStencilBuffer = false;
        this.stencilBufferBitSize = 1;
        this.clearTargetBuffer = true;
        this.projectionType = __WEBPACK_IMPORTED_MODULE_1__common_defs__["_45" /* EPT_PERSPECTIVE */];
        this.viewAngle = 45.0 * __WEBPACK_IMPORTED_MODULE_1__common_defs__["g" /* DEG_TO_RAD */];
        this.minZdist = 5.0;
        this.maxZdist = 1000.5;
        
        // the sector size
        this.sectorSize = 0;
        this.sectorSizeHalf = 0;
    }
    
    // 
    //  DESC: Load data from XML node
    //
    load( node )
    {
        if( node )
        {
            let display = node.getElementsByTagName('display');
            if( display.length )
            {
                let resolution = display[0].getElementsByTagName('resolution');
                if( resolution.length )
                {
                    this.size.w = Number(resolution[0].getAttribute('width'));
                    this.size.h = Number(resolution[0].getAttribute('height'));
                }
                
                let defaultRes = display[0].getElementsByTagName('default');
                if( defaultRes.length )
                {
                    this.nativeSize.w = Number(defaultRes[0].getAttribute('width'));
                    this.nativeSize.h = Number(defaultRes[0].getAttribute('height'));
                    this.defaultSize.h = this.nativeSize.h;
                }
            }
            
            let device = node.getElementsByTagName('device');
            if( device.length )
            {
                let projection = device[0].getElementsByTagName('projection');
                if( projection.length )
                {
                    let attr = projection[0].getAttribute('projectType');
                    if( attr && (attr === 'orthographic') )
                        this.projectionType = __WEBPACK_IMPORTED_MODULE_1__common_defs__["_44" /* EPT_ORTHOGRAPHIC */];
                    
                    attr = projection[0].getAttribute('minZDist');
                    if( attr )
                        this.minZdist = Number(attr);
                    
                    attr = projection[0].getAttribute('maxZDist');
                    if( attr )
                        this.maxZdist = Number(attr);
                    
                    attr = projection[0].getAttribute('view_angle');
                    if( attr )
                        this.viewAngle = Number(attr) * __WEBPACK_IMPORTED_MODULE_1__common_defs__["g" /* DEG_TO_RAD */];
                }
                    
                let depthStencilBuffer = device[0].getElementsByTagName('depthStencilBuffer');
                if( depthStencilBuffer.length )
                {
                    this.enableDepthBuffer = (depthStencilBuffer[0].getAttribute('enableDepthBuffer') === 'true');
                    this.createStencilBuffer = (depthStencilBuffer[0].getAttribute('createStencilBuffer') === 'true');
                    this.clearStencilBuffer = (depthStencilBuffer[0].getAttribute('clearStencilBuffer') === 'true');
                    this.stencilBufferBitSize = Number(depthStencilBuffer[0].getAttribute('stencilBufferBitSize'));
                }
                
                let targetBuffer = device[0].getElementsByTagName('targetBuffer');
                if( targetBuffer.length )
                    this.clearTargetBuffer = (targetBuffer[0].getAttribute('clear') === 'true');
            }
            
            let worldNode = node.getElementsByTagName('world');
            if( worldNode.length )
            {
                this.sectorSize = Number(worldNode[0].getAttribute('sectorSize'));
                this.sectorSizeHalf = Math.trunc(this.sectorSize / 2);
            }
        }
        
        this.calcRatio();
    }
    
    // 
    //  DESC: Calculate the ratios
    //
    calcRatio()
    {
        // Height and width screen ratio for perspective projection
        this.screenAspectRatio.w = this.size.w / this.size.h;
        this.screenAspectRatio.h = this.size.h / this.size.w;
        
        // NOTE: The default width is based on the current aspect ratio
        // NOTE: Make sure the width does not have a floating point component
        this.defaultSize.w = Math.floor((this.screenAspectRatio.w * this.defaultSize.h) + 0.5);
        
        // Get half the size for use with screen boundries
        this.defaultSize_half.w = this.defaultSize.w / 2;
        this.defaultSize_half.h = this.defaultSize.h / 2;

        // Screen size devided by two
        this.size_half.w = this.size.w / 2;
        this.size_half.h = this.size.h / 2;
        
        // Precalculate the aspect ratios for orthographic projection
        this.orthoAspectRatio.h = this.size.h / this.defaultSize.h;
        this.orthoAspectRatio.w = this.size.w / this.defaultSize.w;
    }
}

var settings = new Settings;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return scriptManager; });

//
//  FILE NAME: scriptmanager.js
//  DESC:      Class for managing game scripts
//



class ScriptManager
{
    constructor()
    {
        this.scriptMap = new Map;
    }
    
    //
    //  DESC: Set the script by name
    //
    set( name, factory )
    {
        // Sanity check to make sure the script has not already been added in
        if( this.scriptMap.has( name ) )
        {
            throw new Error( `Script name has already been added (${name}).` );
            return;
        }
        
        this.scriptMap.set( name, factory );
    }
    
    //
    //  DESC: Get the script by name
    //
    get( name )
    {
        let scriptFactory = this.scriptMap.get( name );
        
        if( scriptFactory === undefined )
        {
            throw new Error( `Script name could not be found! (${name})` );
            return null;
        }
        
        return scriptFactory;
    }
}

var scriptManager = new ScriptManager;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME:  matrix.js
//  DESC:       4x4 Matrix math class
//



const NO_ROT = 0;
const ROT_Z  = 1;
const ROT_Y  = 2;
const ROT_X  = 4;
const ROT_ALL = ROT_Z | ROT_Y | ROT_X;

class Matrix
{
    constructor( matrix = null )
    {
        this.matrix = new Float32Array(16);
        
        if( matrix === null )
            this.initilizeMatrix();
        else
            this.copy( matrix );
    }
    
    copy( obj )
    {
        let i = this.matrix.length;
        
        while( i-- )
            this.matrix[i] = obj.matrix[i];  
    }
    
    //
    //  DESC: Init the matrix to the identity matrix
    //
    initilizeMatrix()
    {
        this.initIdentityMatrix( this.matrix );
    }
    
    initIdentityMatrix( mat )
    {
        // Initializes a specific matrix to the identity matrix:
        mat[0]  = 1.0;   mat[1] = 0.0;   mat[2]  = 0.0;   mat[3] = 0.0;
        mat[4]  = 0.0;   mat[5] = 1.0;   mat[6]  = 0.0;   mat[7] = 0.0;
        mat[8]  = 0.0;   mat[9] = 0.0;   mat[10] = 1.0;  mat[11] = 0.0;
        mat[12] = 0.0;  mat[13] = 0.0;   mat[14] = 0.0;  mat[15] = 1.0;
    }
    
    //
    //  DESC: Merge matrix into master matrix
    //  
    mergeMatrix( matrix )
    {
        let temp = new Float32Array(16);

        for( let i = 0; i < 4; ++i )
        {
            for( let j = 0; j < 4; ++j )
            { 
                temp[(i*4)+j] = (this.matrix[i*4] * matrix[j])
                + (this.matrix[(i*4)+1] * matrix[4+j])
                + (this.matrix[(i*4)+2] * matrix[8+j])
                + (this.matrix[(i*4)+3] * matrix[12+j]);
            }
        }

        // Let the temp be the new master matrix
        this.matrix = temp;
    }
    
    //
    //  DESC: Generate 3D rotation matrix
    //
    rotate( point )
    {
        let flags = NO_ROT;
        let rMatrix = new Float32Array(16);
        
        // init the rotation matrix
        this.initIdentityMatrix( rMatrix );

        // Apply Z rotation
        if( !point.isZEmpty() )
        {
            this.rotateZRad( rMatrix, point.z, flags );
            flags |= ROT_Z;
        }

        // Apply Y rotation
        if( !point.isYEmpty() )
        {
            this.rotateYRad( rMatrix, point.y, flags );
            flags |= ROT_Y;
        }

        // Apply X rotation
        if( !point.isXEmpty() )
        {
            this.rotateXRad( rMatrix, point.x, flags );
            flags |= ROT_X;
        }

        // Merg the rotation into the master matrix
        this.mergeMatrix( rMatrix );
    }
     
    //
    //  DESC: Rotate the matrix along the z axis
    //
    rotateZRad( dest, value )
    {
        let cos = Math.cos(value);
        let sin = Math.sin(value);

        dest[0] = cos;
        dest[1] = sin;
        dest[4] = -sin;
        dest[5] = cos;
    }
 
    //
    //  DESC: Rotate the matrix along the y axis
    //
    rotateYRad( dest, value, rotFlags )
    {
        let cos = Math.cos(value);
        let sin = Math.sin(value);

        switch( rotFlags )
        {
            case ROT_Z:
            {
                let tmp0, tmp1, tmp8, tmp9;
                tmp0 = dest[0] * cos;
                tmp1 = dest[1] * cos;
                tmp8 = dest[0] * sin;
                tmp9 = dest[1] * sin;
                dest[0] = tmp0;
                dest[1] = tmp1;
                dest[2] = -sin;
                dest[8] = tmp8;
                dest[9] = tmp9;
                dest[10] = cos;
                break;
            }
            case NO_ROT:
            {
                dest[0]  =  cos;
                dest[2]  = -sin;
                dest[8]  =  sin;
                dest[10] =  cos;
                break;
            }
        }
    }
  
    //
    //  DESC: Rotate the matrix along the x axis
    //
    rotateXRad( dest, value, rotFlags )
    {
        let cos = Math.cos(value);
        let sin = Math.sin(value);

        switch( rotFlags )
        {
            case ROT_Z:
            {
                let tmp4, tmp5, tmp8, tmp9;
                tmp4 = dest[4] * cos;
                tmp5 = dest[5] * cos;
                tmp8 = dest[4] * -sin;
                tmp9 = dest[5] * -sin;
                dest[4] = tmp4;
                dest[5] = tmp5;
                dest[6] = sin;
                dest[8] = tmp8;
                dest[9] = tmp9;
                dest[10] = cos;
                break;
            }

            case ROT_Y:
            {
                let tmp4, tmp6, tmp8, tmp10;
                tmp4 = dest[8] * sin;
                tmp6 = dest[10] * sin;
                tmp8 = dest[8] * cos;
                tmp10 = dest[10] * cos;
                dest[4] = tmp4;
                dest[5] = cos;
                dest[6] = tmp6;
                dest[8] = tmp8;
                dest[9] = -sin;
                dest[10] = tmp10;
                break;
            }

            case ROT_Z | ROT_Y:
            {
                let tmp4, tmp5, tmp6, tmp8, tmp9, tmp10;
                tmp4 = ( dest[4] * cos ) + ( dest[8] * sin );
                tmp5 = ( dest[5] * cos ) + ( dest[9] * sin );
                tmp6 = dest[10] * sin;
                tmp8 = ( dest[4] * -sin ) + ( dest[8] * cos );
                tmp9 = ( dest[5] * -sin ) + ( dest[9] * cos );
                tmp10 = dest[10] * cos;
                dest[4] = tmp4;
                dest[5] = tmp5;
                dest[6] = tmp6;
                dest[8] = tmp8;
                dest[9] = tmp9;
                dest[10] = tmp10;
                break;
            }

            case NO_ROT:
            {
                dest[5]  =  cos;
                dest[6]  =  sin;
                dest[9]  = -sin;
                dest[10] =  cos;
                break;
            }
        }
    }
    
    //
    //  DESC: Translate the point
    //
    translate( point )
    {
        this.matrix[12] += point.x;
        this.matrix[13] += point.y;
        this.matrix[14] += point.z;
    }
    
    translateSize( size )
    {
        this.matrix[12] += size.w;
        this.matrix[13] += size.h;
    }
    
    //
    //  DESC: Transform the type
    //
    transformPoint( dest, source )
    {
        dest.x = ( source.x * this.matrix[ 0 ] )
               + ( source.y * this.matrix[ 4 ] )
               + ( source.z * this.matrix[ 8 ] )
               + this.matrix[ 12 ];

        dest.y = ( source.x * this.matrix[ 1 ] )
               + ( source.y * this.matrix[ 5 ] )
               + ( source.z * this.matrix[ 9 ] )
               + this.matrix[ 13 ];

        dest.z = ( source.x * this.matrix[ 2 ] )
               + ( source.y * this.matrix[ 6 ] )
               + ( source.z * this.matrix[ 10 ] )
               + this.matrix[ 14 ];
    }
    
    transformRect( dest, source )
    {
        // Transform vertex by master matrix:
        dest.x1 = ( source.x1 * this.matrix[ 0 ] )
                + ( source.y1 * this.matrix[ 4 ] )
                + this.matrix[ 12 ];

        dest.y1 = ( source.x1 * this.matrix[ 1 ] )
                + ( source.y1 * this.matrix[ 5 ] )
                + this.matrix[ 13 ];

        dest.x2 = ( source.x2 * this.matrix[ 0 ] )
                + ( source.y2 * this.matrix[ 4 ] )
                + this.matrix[ 12 ];

        dest.y2 = ( source.x2 * this.matrix[ 1 ] )
                + ( source.y2 * this.matrix[ 5 ] )
                + this.matrix[ 13 ];
    }
    
    transformQuad( dest, source )
    {
        for( let i = 0; i < 4; ++i )
            this.transformPoint( dest.point[i], source.point[i] );
    }
    
    //
    //  DESC: Set the scale to the master matrix
    //
    setScaleFromPoint( point )
    {
        // Initialize scaling matrix:
        this.matrix[0]  *= point.x;
        this.matrix[5]  *= point.y;
        this.matrix[10] *= point.z;
    }
    
    setScaleFromSize( size )
    {
        // Initialize scaling matrix:
        this.matrix[0]  *= size.w;
        this.matrix[5]  *= size.h;
        this.matrix[10] *= 1.0;
    }
    
    setScaleFromValue( scale )
    {
        // Initialize scaling matrix:
        this.matrix[0]  *= scale;
        this.matrix[5]  *= scale;
        this.matrix[10] *= 1.0;
    }
    
    //
    //  DESC: Set the scale to the master matrix
    //
    scaleFromPoint( point )
    {
        this.mergeScale( point.x, point.y, point.z );
    }
    
    scaleFromSize( size )
    {
        this.mergeScale( size.w, size.h, 1.0 );
    }
    
    scaleFromValue( scale )
    {
        this.mergeScale( scale, scale, scale );
    }
    
    //
    //  DESC: scale and merge 
    //
    mergeScale( x, y, z )
    {
        let temp = new Float32Array(16);
        
        // init the matrix
        this.initIdentityMatrix( temp );

        // Initialize scaling matrix:
        temp[0]  = x;
        temp[5]  = y;
        temp[10] = z;

        // Merge the scale into the master matrix
        this.mergeMatrix( temp );
    }
    
    //
    //  DESC: Calulate an orthographic matrix 
    //
    orthographicRH( w, h, zn, zf )
    {
        // Formula for a right handed orthographic matrix
        //  2/w  0    0           0
        //  0    2/h  0           0
        //  0    0    1/(zn-zf)   0
        //  0    0    zn/(zn-zf)  1

        this.matrix[0] = 2 / w;
        this.matrix[5] = 2 / h;
        this.matrix[10] = 1 / (zn-zf);
        this.matrix[14] = zn / (zn-zf);
    }
    
    //
    //  DESC: Calulate an perspective matrix 
    //
    perspectiveFovRH( fovy, aspect, zn, zf )
    {
        // Formula for a right handed perspective matrix
        //  yScale = cot(fovY/2)
        //  xScale = yScale / aspect ratio
        //  xScale     0          0              0
        //  0        yScale       0              0
        //  0        0        zf/(zn-zf)        -1
        //  0        0        zn*zf/(zn-zf)      0

        let yScale = 1 / Math.tan(fovy/2);
        let xScale = yScale / aspect;

        this.matrix[0] = xScale;
        this.matrix[5] = yScale;
        this.matrix[10] = zf / (zn-zf);
        this.matrix[11] = -1;
        this.matrix[14] = zn * zf / (zn-zf);
    }
    
    //
    //  DESC: Inverse the X 
    //
    invertX()
    {
        this.matrix[12] = -this.matrix[12];
    }

    //
    //  DESC: Inverse the Y 
    //
    invertY()
    {
        this.matrix[13] = -this.matrix[13];
    }

    //
    //  DESC: Inverse the Z 
    //
    invertZ()
    {
        this.matrix[14] = -this.matrix[14];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Matrix;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return shaderManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_shaderdata__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__system_device__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_genfunc__ = __webpack_require__(4);

// 
//  FILE NAME: shadermanager.js
//  DESC:      shader class singleton
//







class ShaderManager
{
    constructor()
    {
        this.shaderMap = new Map;
        this.currentShaderData = null;
        this.currentAttributeCount = 0;
        this.loadCompleteCallback = null;
        this.loadCounter = 0;
        this.initShaderCallback = null;
    }
    
    // 
    //  DESC: Load the shader from xml node
    //
    load( xmlNode, callback )
    {
        if( xmlNode )
        {
            let shader = xmlNode.getElementsByTagName('shader');
            if( shader )
            {
                this.loadCompleteCallback = callback;
                
                for( let i = 0; i < shader.length; ++i )
                {
                    // Use a counter to determine when the load is done because there's
                    // no garentee they will finish in the order executed
                    // Always do this before the load
                    ++this.loadCounter;
                    
                    this.createShader( shader[i] );
                }
            }
        }
    }
    
    // 
    //  DESC: Setup the load request to load the shader files from the server
    //
    createShader( node )
    {
        let shaderTxtId = node.getAttribute('Id');
        
        let vertexNode = node.getElementsByTagName('vertDataLst');
        let fragmentNode = node.getElementsByTagName('fragDataLst');
        
        // Check for duplicate
        if( this.shaderMap.has(shaderTxtId) )
            throw new Error( `Shader of this name already exists (${shaderTxtId}).` );
        
        // Add an entry to the map
        let shaderData = new __WEBPACK_IMPORTED_MODULE_0__common_shaderdata__["a" /* ShaderData */];
        this.shaderMap.set( shaderTxtId, shaderData );
        
        // Create the vertex shader
        __WEBPACK_IMPORTED_MODULE_2__utilities_genfunc__["b" /* downloadFile */]( 'txt', vertexNode[0].getAttribute('file'),
            ( vertText ) =>
            {
                this.create( __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].VERTEX_SHADER, shaderData, shaderTxtId, vertText );
                
                __WEBPACK_IMPORTED_MODULE_2__utilities_genfunc__["b" /* downloadFile */]( 'txt', fragmentNode[0].getAttribute('file'),
                    ( fragText ) =>
                    {
                        // Create the shaders from the shader files
                        this.create( __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].FRAGMENT_SHADER, shaderData, shaderTxtId, fragText );
                        
                        // Combine the shaders into a program
                        this.createProgram( shaderData );
                        
                        // Find the location of the custom shader variables
                        this.locateShaderVariables( shaderData, vertexNode[0].getElementsByTagName('dataType'), fragmentNode[0].getElementsByTagName('dataType') );
                        
                        // Send out a signal to init this shader
                        this.initShaderCallback( shaderTxtId );
                        
                        // Always do this after the load
                        --this.loadCounter;

                        if( this.loadCounter === 0 )
                            this.loadCompleteCallback();
                    });
            });
    }
    
    // 
    //  DESC: Create the shaders from the shader files
    //
    create( shaderType, shaderData, shaderTxtId, shaderTxt )
    {
        let id = __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].createShader(shaderType);
        if( id === 0 )
            throw new Error( `Error creating shader (${shaderTxtId}).` );
        
        // Load the shader text
        __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].shaderSource(id, shaderTxt);
        
        // Compile the shader and check for error
        __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].compileShader(id);
	if( !__WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].getShaderParameter(id, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].COMPILE_STATUS) )
            throw new Error( `ERROR compiling shader! (${__WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].getShaderInfoLog(id)}).` );
        
        if( shaderType === __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].VERTEX_SHADER )
            shaderData.vertexId = id;

        else
            shaderData.fragmentId = id;
    }
    
    // 
    //  DESC: Create the programs
    //
    createProgram( shaderData )
    {
        // Combine the shaders into a program
        shaderData.programId = __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].createProgram();
        __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].attachShader( shaderData.programId, shaderData.vertexId );
        __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].attachShader( shaderData.programId, shaderData.fragmentId );
        
        // Link the shader program
        __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].linkProgram( shaderData.programId );
            
        if( !__WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].getProgramParameter( shaderData.programId, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].LINK_STATUS ) )
            throw new Error( `ERROR linking program! (${__WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].getProgramInfoLog(shaderData.programId)}).` );

        __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].validateProgram( shaderData.programId );

        if( !__WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].getProgramParameter( shaderData.programId, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].VALIDATE_STATUS ) )
            throw new Error( `ERROR validating program! (${__WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].getProgramInfoLog(shaderData.programId)}).` );
    }
    
    // 
    //  DESC: Locate the indexes of the shader variables
    //
    locateShaderVariables( shaderData, vertNode, fragNode )
    {
        for( let i = 0; i < vertNode.length; ++i )
        {
            let name = vertNode[i].getAttribute('name');
            
            if( vertNode[i].getAttribute('location') )
            {
                shaderData.locationMap.set( name, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].getAttribLocation(shaderData.programId, name) );
                ++shaderData.attributeCount;
            }
            else
            {
                shaderData.locationMap.set( name, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].getUniformLocation(shaderData.programId, name) );
            }
        }
        
        for( let i = 0; i < fragNode.length; ++i )
        {
            let name = fragNode[i].getAttribute('name');
            shaderData.locationMap.set( name, __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].getUniformLocation(shaderData.programId, name) );
        }
    }
    
    // 
    //  DESC: Bind the shader program attribute variables
    //
    bind( shaderData )
    {
        if( this.currentShaderData != shaderData )
        {
            let gl = __WEBPACK_IMPORTED_MODULE_1__system_device__["a" /* device */].glContext;
            
            if( this.currentShaderData === null )
            {
                this.currentAttributeCount = shaderData.attributeCount;
                
                for( let i = 0; i < this.currentAttributeCount; ++i )
                    gl.enableVertexAttribArray(i);
            }
            else if( this.currentAttributeCount != shaderData.attributeCount )
            {
                if( this.currentAttributeCount < shaderData.attributeCount )
                {
                    for( let i = this.currentAttributeCount; i < shaderData.attributeCount; ++i )
                        gl.enableVertexAttribArray(i);
                }
                else
                {
                    for( let i = shaderData.attributeCount; i < this.currentAttributeCount; ++i )
                        gl.disableVertexAttribArray(i);
                }

                this.currentAttributeCount = shaderData.attributeCount;
            }
            
            // save the current binding
            this.currentShaderData = shaderData;
            
            // Have OpenGL bind this shader now
            gl.useProgram( shaderData.programId );
        }
    }
    
    // 
    //  DESC: Unbind the shader program attribute variables
    //
    unbind()
    {
        for( let i = 0; i < this.currentAttributeCount; ++i )
            __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].disableVertexAttribArray(i);
    
        this.currentShaderData = null;
        this.currentAttributeCount = 0;
        __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].useProgram( null );
    }
    
    // 
    //  DESC: Get the shader data
    //
    getShaderData( shaderId )
    {
        let shader = this.shaderMap.get( shaderId );
        if( shader !== undefined )
            return shader;
        else
            throw new Error( `ERROR Shader has not been created! (${shaderId}).` );
        
        return null;
    }
    
    // 
    //  DESC: Set the shader member varaible
    //
    setShaderValue4fv( shaderId, locationId, data )
    {
        let shaderData = this.getShaderData( shaderId );

        if( shaderData.hasLocation( locationId ) )
        {
            // Get the location of the variable
            let location = shaderData.getLocation( locationId );

            // Bind the shader so that we can change the value of the member
            this.bind( shaderData );

            __WEBPACK_IMPORTED_MODULE_1__system_device__["b" /* gl */].uniform4fv( location, data );

            // Unbind now that we are done
            this.unbind();
        }
    }
    
    // 
    //  DESC: Set the shader member varaible
    //
    setAllShaderValue4fv( locationId, data )
    {
        for( let [ key, shaderData ] of this.shaderMap.entries() )
            this.setShaderValue4fv( key, locationId, data );
    }
}

var shaderManager = new ShaderManager;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_object__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_matrix__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME:  object2d.js
//  DESC:       object 2D class
//







class Object2D extends __WEBPACK_IMPORTED_MODULE_0__common_object__["a" /* Object */]
{
    constructor()
    {
        super();
        
        // local matrix
        this.matrix = new __WEBPACK_IMPORTED_MODULE_1__utilities_matrix__["a" /* Matrix */];
    }
    
    //
    //  DESC: Transform the object in local space
    //
    transformLocal( matrix )
    {
        // Reset the matrices
        matrix.initilizeMatrix();

        // Apply the crop offset
        if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_2__common_defs__["f" /* CROP_OFFSET */] ) )
            matrix.translateSize( this.cropOffset );

        // Apply the scale
        if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_61" /* SCALE */] ) )
            this.applyScale( matrix );

        // Apply the rotation
        if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_60" /* ROTATE */] ) )
            this.applyRotation( matrix );

        // Apply the translation
        if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_66" /* TRANSLATE */] ) )
            matrix.translate( this.pos );

        // Clear the check parameter
        this.parameters.remove( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_65" /* TRANSFORM */] );

        // Indicate that translation was done
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_68" /* WAS_TRANSFORMED */] );
    }
    
    //
    //  DESC: Transform
    //
    transform( matrix = null, tranformWorldPos = null )
    {
        this.parameters.remove( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_68" /* WAS_TRANSFORMED */] );
        
        if( matrix )
        {
            if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_65" /* TRANSFORM */] ) || tranformWorldPos )
            {
                this.transformLocal( this.matrix );

                this.matrix.mergeMatrix( matrix.matrix );
            }
        }
        else
        {
            if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_65" /* TRANSFORM */] ) )
                this.transformLocal( this.matrix );
        }
    }

    //
    //  DESC: Apply the scale
    //
    applyScale( matrix )
    {
        this.matrix.setScaleFromPoint( this.scale );
    }

    //
    //  DESC: Apply the scale
    //
    applyRotation( matrix )
    {
        // Add in the center point prior to rotation
        if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_2__common_defs__["c" /* CENTER_POINT */] ) )
            this.matrix.translate( this.centerPos );

        this.matrix.rotate( this.rot );

        // Subtract the center point after rotation to put back in original position
        // Doing two inverts keeps us from having to new up a point that would be garbage collected
        if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_2__common_defs__["c" /* CENTER_POINT */] ) )
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
        return this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_68" /* WAS_TRANSFORMED */] );
    }

    //
    //  DESC: Was the world position transformed?
    //
    forceTransform()
    {
        this.parameters.Add( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_65" /* TRANSFORM */] );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Object2D;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controlbase__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scrollparam__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__2d_sprite2d__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_quad__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_rect__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utilities_matrix__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utilities_settings__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__objectdatamanager_objectdatamanager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__managers_eventmanager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__managers_actionmanager__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__script_scriptcomponent__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__script_scriptmanager__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__utilities_xmlparsehelper__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: uicontrol.js
//  DESC:      class for user interface controls
//




















class UIControl extends __WEBPACK_IMPORTED_MODULE_0__controlbase__["a" /* ControlBase */]
{
    constructor( group )
    {
        super( group );
        
        // sprite array
        this.spriteAry = [];

        // Script component object
        this.scriptComponent = new __WEBPACK_IMPORTED_MODULE_12__script_scriptcomponent__["a" /* ScriptComponent */];

        // control's default state
        this.defaultState;

        // control's current state
        this.state = __WEBPACK_IMPORTED_MODULE_15__common_defs__["E" /* ECS_NULL */];
        this.lastState = __WEBPACK_IMPORTED_MODULE_15__common_defs__["E" /* ECS_NULL */];

        // Name of the action to perform under the correct circumstances
        this.executionAction;

        // How the control should respond when selected
        this.actionType = __WEBPACK_IMPORTED_MODULE_15__common_defs__["w" /* ECAT_NULL */];

        // This control's size
        this.size = new __WEBPACK_IMPORTED_MODULE_3__common_size__["a" /* Size */];

        // This is the size modifier
        // when calculating the collision rect
        this.sizeModifier = new __WEBPACK_IMPORTED_MODULE_6__common_rect__["a" /* Rect */];

        // Collision rect
        this.collisionQuad = new __WEBPACK_IMPORTED_MODULE_5__common_quad__["a" /* Quad */];

        // Collision center
        this.collisionCenter = new __WEBPACK_IMPORTED_MODULE_4__common_point__["a" /* Point */];

        // Smart Gui object
        this.smartGui = null;

        // Mouse selection type
        this.mouseSelectType = __WEBPACK_IMPORTED_MODULE_15__common_defs__["m" /* EAP_UP */];

        // On state script factory map
        this.scriptFactoryMap = new Map;

        // Scrolling parameters
        this.scrollParam = null;

        // Execution callbacks
        this.executionActionCallback = null;
    }
    
    // 
    //  DESC: Load the control info from XML node
    //
    loadFromNode( node )
    {
        super.loadFromNode( node );

        // Set the default state of the control
        let attr = node.getAttribute( 'defaultState' );
        if( attr )
            this.setDefaultState( attr );

        // Set if mouse selection is the down message
        attr = node.getAttribute( 'mouseSelectDown' );
        if( attr && (attr === 'true') )
            this.mouseSelectType = __WEBPACK_IMPORTED_MODULE_15__common_defs__["k" /* EAP_DOWN */];

        // Setup the action
        let actionNode = node.getElementsByTagName( 'action' );
        if( actionNode.length )
        {
            // Set the action type
            attr = actionNode[0].getAttribute( 'actionType' )
            if( attr )
                this.setActionType( attr );

            // Set the execution action
            attr = actionNode[0].getAttribute( 'executionAction' )
            if( attr )
                this.executionAction = attr;
        }

        // Setup the action
        let stateScriptNode = node.getElementsByTagName( 'stateScript' );
        if( stateScriptNode.length )
        {
            let attr = stateScriptNode[0].getAttribute( "onDisabled" );
            if( attr )
                this.scriptFactoryMap.set( __WEBPACK_IMPORTED_MODULE_15__common_defs__["B" /* ECS_DISABLED */], __WEBPACK_IMPORTED_MODULE_13__script_scriptmanager__["a" /* scriptManager */].get(attr) );

            attr = stateScriptNode[0].getAttribute( "onInactive" );
            if( attr )
                this.scriptFactoryMap.set( __WEBPACK_IMPORTED_MODULE_15__common_defs__["C" /* ECS_INACTIVE */], __WEBPACK_IMPORTED_MODULE_13__script_scriptmanager__["a" /* scriptManager */].get(attr) );

            attr = stateScriptNode[0].getAttribute( "onActive" );
            if( attr )
                this.scriptFactoryMap.set( __WEBPACK_IMPORTED_MODULE_15__common_defs__["A" /* ECS_ACTIVE */], __WEBPACK_IMPORTED_MODULE_13__script_scriptmanager__["a" /* scriptManager */].get(attr) );

            attr = stateScriptNode[0].getAttribute( "onSelect" );
            if( attr )
                this.scriptFactoryMap.set( __WEBPACK_IMPORTED_MODULE_15__common_defs__["F" /* ECS_SELECTED */], __WEBPACK_IMPORTED_MODULE_13__script_scriptmanager__["a" /* scriptManager */].get(attr) );
        }

        // Load the scroll data from node
        let scrollParamNode = node.getElementsByTagName( 'scroll' );
        if( scrollParamNode.length )
        {
            this.scrollParam = new __WEBPACK_IMPORTED_MODULE_1__scrollparam__["a" /* ScrollParam */];
            this.scrollParam.loadFromNode( scrollParamNode );
        }

        // Get the size modifier info
        this.sizeModifier = __WEBPACK_IMPORTED_MODULE_14__utilities_xmlparsehelper__["f" /* loadRect */]( node );

        // Init to the default state
        this.revertToDefaultState();
    }

    // 
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( node )
    {
        // Get the list of object data associated with this button
        let spriteNode = node.getElementsByTagName( 'sprite' );
        if( spriteNode.length )
        {
            // This is to get around the fact that objects are passed by "copy of reference".
            // This simulates passing an int by reference.
            let fontSpriteCount = [0];

            // Load the sprite from node
            for( let i = 0; i < spriteNode.length; ++i )
                this.loadSpriteFromNode( spriteNode[i], fontSpriteCount );
        }
    }

    // 
    //  DESC: Load a sprite from an XML node
    //
    loadSpriteFromNode( node, fontSpriteCount )
    {
        // Get the type of object
        let objectName = node.getAttribute( 'objectName' );

        // allocate the sprite in the array
        let sprite = new __WEBPACK_IMPORTED_MODULE_2__2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_9__objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( this.group, objectName ) );
        this.spriteAry.push( sprite );

        // Load the transform data
        sprite.loadTransFromNode( node );

        // Init the script factory functions
        sprite.initScriptFactoryFunctions( node );

        // See if this sprite is used for rendering a font string
        if( sprite.visualComponent.isFontSprite() )
        {
            // Load the font properties from XML node
            sprite.visualComponent.loadFontPropFromNode( node );

            // Set the font string to be created later
            if( this.stringAry.length && (fontSpriteCount[0] < this.stringAry.length) )
                sprite.visualComponent.setFontString( this.stringAry[ fontSpriteCount[0] ] );

            // set the color if it is different
            sprite.visualComponent.color = __WEBPACK_IMPORTED_MODULE_14__utilities_xmlparsehelper__["b" /* loadColor */]( node, sprite.visualComponent.color );

            ++fontSpriteCount[0];
        }
        else
        {
            // Find the largest size width and height of the different sprites for the controls size
            let width = sprite.objData.size.w + Math.abs( sprite.pos.x );
            let height = sprite.objData.size.h + Math.abs( sprite.pos.y );

            if( width > this.size.w )
                this.size.w = width;

            if( height > this.size.h )
                this.size.h = height;
        }
    }
    
    // 
    //  DESC: Load a sprite from an array
    //  NOTE: Used to init the progress bar manually
    //
    loadSpriteFromArray( objectNameAry )
    {
        for( let i = 0; i < objectNameAry.length; ++i )
        {
            // allocate the sprite in the array
            this.spriteAry.push( new __WEBPACK_IMPORTED_MODULE_2__2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_9__objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( this.group, objectNameAry[i] ) ) );
        }
    }
    
    // 
    //  DESC: Update the control
    //
    update()
    {
        this.scriptComponent.update();

        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].update();
    }

    // 
    //  DESC: Transform the control
    //
    doTransform( object = null )
    {
        if( object )
            this.transform( object.matrix, object.wasWorldPosTranformed() );
        else
            this.transform();

        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].transform( this.matrix, this.wasWorldPosTranformed() );

        this.transformCollision();
    }

    // 
    //  DESC: Transform the collision
    //
    transformCollision()
    {
        if( this.wasWorldPosTranformed() && !this.size.isEmpty() )
        {
            let finalMatrix = new __WEBPACK_IMPORTED_MODULE_7__utilities_matrix__["a" /* Matrix */]( this.matrix );
            finalMatrix.scaleFromValue( __WEBPACK_IMPORTED_MODULE_8__utilities_settings__["a" /* settings */].orthoAspectRatio.h );
            finalMatrix.invertY();

            // Get half the screen size to convert to screen coordinates
            let screenHalf = __WEBPACK_IMPORTED_MODULE_8__utilities_settings__["a" /* settings */].size_half;

            // Create the rect of the control based on half it's size
            let halfwidth = this.size.w * 0.5;
            let halfHeight = this.size.h * 0.5;

            let quad = new __WEBPACK_IMPORTED_MODULE_5__common_quad__["a" /* Quad */];
            quad.point[0].x = -halfwidth + -this.sizeModifier.x1;
            quad.point[0].y = -halfHeight + -this.sizeModifier.y1;
            quad.point[1].x = halfwidth + this.sizeModifier.x2;
            quad.point[1].y = -halfHeight + -this.sizeModifier.y1;
            quad.point[2].x = halfwidth + this.sizeModifier.x2;
            quad.point[2].y = halfHeight + this.sizeModifier.y2;
            quad.point[3].x = -halfwidth + -this.sizeModifier.x1;
            quad.point[3].y = halfHeight + this.sizeModifier.y2;

            finalMatrix.transformQuad( this.collisionQuad, quad );

            // Convert the translated rect to screen coordinates
            this.collisionQuad.point[0].x += screenHalf.w;
            this.collisionQuad.point[0].y += screenHalf.h;
            this.collisionQuad.point[1].x += screenHalf.w;
            this.collisionQuad.point[1].y += screenHalf.h;
            this.collisionQuad.point[2].x += screenHalf.w;
            this.collisionQuad.point[2].y += screenHalf.h;
            this.collisionQuad.point[3].x += screenHalf.w;
            this.collisionQuad.point[3].y += screenHalf.h;

            finalMatrix.transformPoint( this.collisionCenter, new __WEBPACK_IMPORTED_MODULE_4__common_point__["a" /* Point */] );

            // Convert to screen coordinates
            this.collisionCenter.x += screenHalf.w;
            this.collisionCenter.y += screenHalf.h;
        }
    }

    // 
    //  DESC: do the render
    //
    render( matrix )
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].render( matrix );
    }

    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        if( event.detail.type === __WEBPACK_IMPORTED_MODULE_15__common_defs__["W" /* EGE_MENU_CONTROL_STATE_CHANGE */] )
        {
            this.onStateChange( event );
        }
        else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_15__common_defs__["_8" /* EGE_MENU_SELECT_EXECUTE */] )
        {
            this.onSelectExecute( event );
        }
        else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_15__common_defs__["_9" /* EGE_MENU_SET_ACTIVE_CONTROL */] )
        {
            this.onSetActiveControl( event );
        }
        else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_15__common_defs__["_1" /* EGE_MENU_REACTIVATE */] )
        {
            this.onReactivate( event );
        }
        else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_15__common_defs__["_15" /* EGE_MENU_TRANS_IN */] )
        {
            this.onTransIn( event );
        }
        else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_15__common_defs__["_16" /* EGE_MENU_TRANS_OUT */] )
        {
            this.onTransOut( event );
        }

        // Do any smart event handling
        this.smartHandleEvent( event );
    }

    // 
    //  DESC: Handle OnTransIn message
    //
    onTransIn( event )
    {
        if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_15__common_defs__["_50" /* ETC_BEGIN */] )
        {
            // Set the script functions for the current displayed state
            if( this.lastState != this.state )
                this.setDisplayState();
        }
    }

    // 
    //  DESC: Handle OnTransOut message
    //
    onTransOut( event )
    {
        if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_15__common_defs__["_50" /* ETC_BEGIN */] )
        {
            // Reset the control
            this.reset();

            // Reset the sprite scripts
            this.resetSpriteScript();

            // Set the script functions for the current displayed state
            if( this.lastState != this.state )
                this.setDisplayState();
        }
    }

    // 
    //  DESC: Handle OnStateChange message
    //
    onStateChange( event )
    {
        // This control is the focus of the state change
        // The control's "this" pointer is used as a means of identification
        if( event.detail.arg[1] === this )
            this.changeState( event.detail.arg[0] );
        else
            this.deactivateControl();
    }

    // 
    //  DESC: Handle OnSelectExecute message
    //
    onSelectExecute( event )
    {
        if( this.state === __WEBPACK_IMPORTED_MODULE_15__common_defs__["F" /* ECS_SELECTED */] )
        {
            if( this.actionType === __WEBPACK_IMPORTED_MODULE_15__common_defs__["z" /* ECAT_TO_TREE */] )
                __WEBPACK_IMPORTED_MODULE_10__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_15__common_defs__["_14" /* EGE_MENU_TO_TREE */], this.executionAction );

            else if( this.actionType === __WEBPACK_IMPORTED_MODULE_15__common_defs__["y" /* ECAT_TO_MENU */] )
                __WEBPACK_IMPORTED_MODULE_10__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_15__common_defs__["_13" /* EGE_MENU_TO_MENU */], this.executionAction, this );

            else if( this.actionType === __WEBPACK_IMPORTED_MODULE_15__common_defs__["s" /* ECAT_BACK */] )
                __WEBPACK_IMPORTED_MODULE_10__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_15__common_defs__["V" /* EGE_MENU_BACK_ACTION */] );

            else if( this.actionType === __WEBPACK_IMPORTED_MODULE_15__common_defs__["u" /* ECAT_CLOSE */] )
                __WEBPACK_IMPORTED_MODULE_10__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_15__common_defs__["_12" /* EGE_MENU_TOGGLE_ACTION */] );

            else if( this.actionType === __WEBPACK_IMPORTED_MODULE_15__common_defs__["v" /* ECAT_GAME_STATE_CHANGE */] )
                __WEBPACK_IMPORTED_MODULE_10__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_15__common_defs__["Z" /* EGE_MENU_GAME_STATE_CHANGE */], __WEBPACK_IMPORTED_MODULE_15__common_defs__["_50" /* ETC_BEGIN */], this.executionAction );

            //else if( this.actionType === defs.ECAT_QUIT_GAME )
                //eventManager.dispatchEvent( SDL_QUIT );

            // Smart gui execution
            this.smartExecuteAction();

            // Boost signal execute action
            if( this.executionActionCallback !== null )
                for( let i = 0; i < this.executionActionCallback.length; ++i )
                    this.executionActionCallback[i](this);
        }
    }

    // 
    //  DESC: Handle OnSetActiveControl message
    //
    onSetActiveControl( event )
    {
        // Set the last active control to be active again
        if( (event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_15__common_defs__["j" /* EAC_LAST_ACTIVE_CONTROL */]) &&
            (this.lastState > __WEBPACK_IMPORTED_MODULE_15__common_defs__["C" /* ECS_INACTIVE */]))
        {
            this.lastState = this.state = __WEBPACK_IMPORTED_MODULE_15__common_defs__["A" /* ECS_ACTIVE */];

            // Don't animate the control if the mouse was used
            if( !__WEBPACK_IMPORTED_MODULE_11__managers_actionmanager__["a" /* actionManager */].wasLastDeviceMouse() )
            {
                this.resetSpriteScript();
                this.setDisplayState();
            }
        }
    }

    // 
    //  DESC: Handle OnReactivate message
    //
    onReactivate( event )
    {
        // Set the last active control to be active again
        if( this.state > __WEBPACK_IMPORTED_MODULE_15__common_defs__["C" /* ECS_INACTIVE */] )
        {
            this.lastState = this.state = __WEBPACK_IMPORTED_MODULE_15__common_defs__["A" /* ECS_ACTIVE */];

            // Don't animate the control if the mouse was used
            if( !__WEBPACK_IMPORTED_MODULE_11__managers_actionmanager__["a" /* actionManager */].wasLastDeviceMouse() ||
                this.isPointInControl( __WEBPACK_IMPORTED_MODULE_10__managers_eventmanager__["a" /* eventManager */].mouseX, __WEBPACK_IMPORTED_MODULE_10__managers_eventmanager__["a" /* eventManager */].mouseY ) )
            {
                this.resetSpriteScript();
                this.setDisplayState();
            }
        }
    }

    // 
    //  DESC: Handle the mouse move
    //
    onMouseMove( event )
    {
        let result = false;

        if( !this.isDisabled() && this.isPointInControl( event.clientX + __WEBPACK_IMPORTED_MODULE_10__managers_eventmanager__["a" /* eventManager */].mouseOffsetX, event.clientY + __WEBPACK_IMPORTED_MODULE_10__managers_eventmanager__["a" /* eventManager */].mouseOffsetY ) )
        {
            result = true;

            // Only send the message if it's not already active
            if( !this.isActive() )
            {
                __WEBPACK_IMPORTED_MODULE_10__managers_eventmanager__["a" /* eventManager */].dispatchEvent(
                    __WEBPACK_IMPORTED_MODULE_15__common_defs__["W" /* EGE_MENU_CONTROL_STATE_CHANGE */],
                    __WEBPACK_IMPORTED_MODULE_15__common_defs__["A" /* ECS_ACTIVE */],
                    this );
            }
        }

        return result;
    }

    // 
    //  DESC: Change the control state
    //
    changeState( state )
    {
        if( this.state !== state )
        {
            this.state = state;

            // Prepare any script functions associated with the state change
            this.prepareControlScriptFactory( this.state );

            this.resetSpriteScript();
            this.setDisplayState();

            this.lastState = this.state;
        }
    }

    // 
    //  DESC: Activate the control
    //
    activateControl()
    {
        // The focus has switched to this control
        if( !this.isDisabled() )
        {
            this.lastState = this.state = __WEBPACK_IMPORTED_MODULE_15__common_defs__["A" /* ECS_ACTIVE */];

            this.resetSpriteScript();
            this.setDisplayState();

            return true;
        }

        return false;
    }

    // 
    //  DESC: Deactivate the control
    //
    deactivateControl()
    {
        // The focus has switched away from this control
        if( (this.lastState === __WEBPACK_IMPORTED_MODULE_15__common_defs__["E" /* ECS_NULL */]) ||
            (this.lastState > __WEBPACK_IMPORTED_MODULE_15__common_defs__["C" /* ECS_INACTIVE */]) )
        {
            // Reset the control
            this.reset();

            this.resetSpriteScript();
            this.setDisplayState();

            this.lastState = this.state;
        }
    }

    // 
    //  DESC: Disable the control
    //
    disableControl()
    {
        if( (this.lastState === __WEBPACK_IMPORTED_MODULE_15__common_defs__["E" /* ECS_NULL */]) ||
            (this.lastState > __WEBPACK_IMPORTED_MODULE_15__common_defs__["B" /* ECS_DISABLED */]) )
        {
            this.lastState = this.state = __WEBPACK_IMPORTED_MODULE_15__common_defs__["B" /* ECS_DISABLED */];

            this.resetSpriteScript();
            this.setDisplayState();
        }
    }

    // 
    //  DESC: Enable the control to the inactive state
    //
    enableControl()
    {
        if( this.lastState <= __WEBPACK_IMPORTED_MODULE_15__common_defs__["B" /* ECS_DISABLED */] )
        {
            this.lastState = this.state = __WEBPACK_IMPORTED_MODULE_15__common_defs__["C" /* ECS_INACTIVE */];

            this.resetSpriteScript();
            this.setDisplayState();
        }
    }

    // 
    //  DESC: Set the sprite's display based on it's current state
    //
    setDisplayState()
    {
        // Set the script function
        this.prepareSpriteScriptFactoryFunction( this.state );
    }

    // 
    //  DESC: Set the sprite's display based on it's current state
    //
    init()
    {
        // Create any font strings
        // This allows for delayed VBO create so that the fonts can be allocated during a load screen
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].init();

        // Call any init scripts
        this.prepareSpriteScriptFactoryFunction( __WEBPACK_IMPORTED_MODULE_15__common_defs__["D" /* ECS_INIT */] );
    }

    // 
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        // Free the font VBO
        // This allows for early VBO delete so that the menu manager can be freed from a thread
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].cleanUp();
    }

    // 
    //  DESC: Prepare the sprite script factory function
    //
    prepareSpriteScriptFactoryFunction( controlState )
    {
        let scriptFactoryMapKey;
        let forceUpdate = false;

        switch( controlState )
        {
            case __WEBPACK_IMPORTED_MODULE_15__common_defs__["D" /* ECS_INIT */]:
                scriptFactoryMapKey = "init";
                forceUpdate = true;
            break;

            case __WEBPACK_IMPORTED_MODULE_15__common_defs__["B" /* ECS_DISABLED */]:
                scriptFactoryMapKey = "disabled";
                forceUpdate = true;
            break;

            case __WEBPACK_IMPORTED_MODULE_15__common_defs__["C" /* ECS_INACTIVE */]:
                scriptFactoryMapKey = "inactive";
                forceUpdate = true;
            break;

            case __WEBPACK_IMPORTED_MODULE_15__common_defs__["A" /* ECS_ACTIVE */]:
                scriptFactoryMapKey = "active";
            break;

            case __WEBPACK_IMPORTED_MODULE_15__common_defs__["F" /* ECS_SELECTED */]:
                scriptFactoryMapKey = "selected";
            break;
        };

        this.prepareSpriteScriptFactory( scriptFactoryMapKey, forceUpdate );
    }

    // 
    //  DESC: Call a script function map key for sprite
    //
    prepareSpriteScriptFactory( scriptFactoryMapKey, forceUpdate )
    {    
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].prepareScriptFactoryFunction( scriptFactoryMapKey, forceUpdate );
    }

    // 
    //  DESC: Prepare the script function to run
    //
    prepareControlScriptFactory( controlState )
    {
        let scriptFactory = this.scriptFactoryMap.get( controlState );
        if( scriptFactory )
            this.scriptComponent.set( scriptFactory(this) );
    }

    // 
    //  DESC: Reset and recycle the contexts
    //
    reset( complete = false )
    {
        if( this.state > __WEBPACK_IMPORTED_MODULE_15__common_defs__["C" /* ECS_INACTIVE */] )
            this.state = __WEBPACK_IMPORTED_MODULE_15__common_defs__["C" /* ECS_INACTIVE */];

        if( complete )
            this.lastState = this.state;
    }

    // 
    //  DESC: Reset the sprite script
    //
    resetSpriteScript()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].scriptComponent.reset();
    }

    // 
    //  DESC: Set the default state of this control
    //
    setDefaultState( value )
    {
        if( value === 'inactive' )
            this.defaultState = __WEBPACK_IMPORTED_MODULE_15__common_defs__["C" /* ECS_INACTIVE */];

        else if( value === 'active' )
            this.defaultState = __WEBPACK_IMPORTED_MODULE_15__common_defs__["A" /* ECS_ACTIVE */];

        else if( value === 'disabled' )
            this.defaultState = __WEBPACK_IMPORTED_MODULE_15__common_defs__["B" /* ECS_DISABLED */];

        else if( value === 'selected' )
            this.defaultState = __WEBPACK_IMPORTED_MODULE_15__common_defs__["F" /* ECS_SELECTED */];
    }
    
    // 
    //  DESC: Do any smart create
    //
    smartCreate()
    {
        if( this.smartGui )
            this.smartGui.create();
    }

    // 
    //  DESC: Do any smart event handling
    //
    smartHandleEvent( event )
    {
        if( this.smartGui )
            this.smartGui.handleEvent( event );
    }

    // 
    //  DESC: Smart execute the action
    //
    smartExecuteAction()
    {
        if( this.smartGui )
            this.smartGui.execute();
    }

    // 
    //  DESC: Set the control to their default behavior
    //
    revertToDefaultState()
    {
        this.state = this.defaultState;
    }

    // 
    //  DESC: Set the state of this control
    //
    setState( state, setLastState )
    {
        this.state = state;

        if( setLastState )
            this.lastState = state;
    }

    // 
    //  DESC: Set the control's action type
    //
    setActionType( value )
    {
        if( value === 'action' )
            this.actionType = __WEBPACK_IMPORTED_MODULE_15__common_defs__["r" /* ECAT_ACTION */];

        else if( value === 'to_tree' )
            this.actionType = __WEBPACK_IMPORTED_MODULE_15__common_defs__["z" /* ECAT_TO_TREE */];

        else if( value === 'to_menu' )
            this.actionType = __WEBPACK_IMPORTED_MODULE_15__common_defs__["y" /* ECAT_TO_MENU */];

        else if( value === 'back' )
            this.actionType = __WEBPACK_IMPORTED_MODULE_15__common_defs__["s" /* ECAT_BACK */];

        else if( value === 'close' )
            this.actionType = __WEBPACK_IMPORTED_MODULE_15__common_defs__["u" /* ECAT_CLOSE */];

        else if( value === 'change_focus' )
            this.actionType = __WEBPACK_IMPORTED_MODULE_15__common_defs__["t" /* ECAT_CHANGE_FOCUS */];

        else if( value === 'game_state_change' )
            this.actionType = __WEBPACK_IMPORTED_MODULE_15__common_defs__["v" /* ECAT_GAME_STATE_CHANGE */];

        else if( value === 'quit_game' )
            this.actionType = __WEBPACK_IMPORTED_MODULE_15__common_defs__["x" /* ECAT_QUIT_GAME */];
    }

    // 
    //  DESC: Create the font string
    //
    createFontStr( fontString, spriteIndex = 0 )
    {
        let fontSpriteCounter = 0;

        for( let i = 0; i < this.spriteAry.length; ++i )
        {
            if( this.spriteAry[i].visualComponent.isFontSprite() )
            {
                if( fontSpriteCounter === spriteIndex )
                {
                    this.spriteAry[i].visualComponent.createFontString( fontString );
                    break;
                }

                ++fontSpriteCounter;
            }
        }
    }

    createFontString( stringIndex = 0, spriteIndex = 0 )
    {
        if( this.stringAry.length )
            this.createFontStr( this.stringAry[stringIndex], spriteIndex );
    }

    // 
    //  DESC: Set the font string
    //
    setFontString( fontString, spriteIndex = 0 )
    {
        let fontSpriteCounter = 0;

        for( let i = 0; i < this.spriteAry.length; ++i )
        {
            if( this.spriteAry[i].visualComponent.isFontSprite() )
            {
                if( fontSpriteCounter === spriteIndex )
                {
                    this.spriteAry[i].visualComponent.setFontString( fontString );
                    break;
                }

                ++fontSpriteCounter;
            }
        }
    }

    // 
    //  DESC: Handle the select action
    //  NOTE: Only process this message if it's keyboard/gamepad down or mouse up
    //
    handleSelectAction( event )
    {
        if( (this.isSelectable() &&
            (event.detail.arg[__WEBPACK_IMPORTED_MODULE_15__common_defs__["_46" /* ESMA_DEVICE_TYPE */]] === __WEBPACK_IMPORTED_MODULE_15__common_defs__["_57" /* MOUSE */]) &&
            (event.detail.arg[__WEBPACK_IMPORTED_MODULE_15__common_defs__["_49" /* ESMA_PRESS_TYPE */]] === this.mouseSelectType) &&
            this.isPointInControl( event.detail.arg[__WEBPACK_IMPORTED_MODULE_15__common_defs__["_47" /* ESMA_MOUSE_X */]], event.detail.arg[__WEBPACK_IMPORTED_MODULE_15__common_defs__["_48" /* ESMA_MOUSE_Y */]] ) ) ||

            (this.isActive() && (event.detail.arg[__WEBPACK_IMPORTED_MODULE_15__common_defs__["_46" /* ESMA_DEVICE_TYPE */]] !== __WEBPACK_IMPORTED_MODULE_15__common_defs__["_57" /* MOUSE */]) && (event.detail.arg[__WEBPACK_IMPORTED_MODULE_15__common_defs__["_49" /* ESMA_PRESS_TYPE */]] === __WEBPACK_IMPORTED_MODULE_15__common_defs__["k" /* EAP_DOWN */])) )
        {
            __WEBPACK_IMPORTED_MODULE_10__managers_eventmanager__["a" /* eventManager */].dispatchEvent(
                __WEBPACK_IMPORTED_MODULE_15__common_defs__["W" /* EGE_MENU_CONTROL_STATE_CHANGE */],
                __WEBPACK_IMPORTED_MODULE_15__common_defs__["F" /* ECS_SELECTED */],
                this );

            return true;
        }

        return false;
    }

    // 
    //  DESC: Set the first inactive control to be active
    //  NOTE: This is mainly here to be virtual for sub controls
    //
    activateFirstInactiveControl()
    {
        // If a mouse was used, set the control as active but don't animate it.
        // This allows us to use the keys to scroll when pressed
        if( __WEBPACK_IMPORTED_MODULE_11__managers_actionmanager__["a" /* actionManager */].wasLastDeviceMouse() )
        {
            if( !this.isDisabled() )
            {
                this.lastState = this.state = __WEBPACK_IMPORTED_MODULE_15__common_defs__["A" /* ECS_ACTIVE */];

                return true;
            }

            return false;
        }

        return this.activateControl();
    }

    // 
    //  DESC: Is the point in the control
    //
    isPointInControl( x, y )
    {
        return this.collisionQuad.isPointInQuad( x, y );
    }

    // 
    //  DESC: Get the pointer to the control if found
    //  NOTE: These function is mainly for sub controls
    //
    findControlByName( name )
    {
        if( this.name === name )
            return this;

        return null;
    }

    findControlByRef( ctrl )
    {
        if( ctrl === this )
            return this;

        return null;
    }

    // 
    //  DESC: Set the string to vector
    //
    setStringToList( str )
    {
        this.stringAry.push( str );
    }

    // 
    //  DESC: Is this control disabled/active/selected
    //
    isDisabled()
    {
        return this.state === __WEBPACK_IMPORTED_MODULE_15__common_defs__["B" /* ECS_DISABLED */];
    }

    isInactive()
    {
        return this.state === __WEBPACK_IMPORTED_MODULE_15__common_defs__["C" /* ECS_INACTIVE */];
    }

    isActive()
    {
        return (this.state === __WEBPACK_IMPORTED_MODULE_15__common_defs__["A" /* ECS_ACTIVE */]);
    }

    isSelected()
    {
        return (this.state === __WEBPACK_IMPORTED_MODULE_15__common_defs__["F" /* ECS_SELECTED */]);
    }

    isSelectable()
    {
        return ((this.state === __WEBPACK_IMPORTED_MODULE_15__common_defs__["C" /* ECS_INACTIVE */]) || (this.state === __WEBPACK_IMPORTED_MODULE_15__common_defs__["A" /* ECS_ACTIVE */]));
    }

    // 
    //  DESC: Check if control is a sub control
    //
    isSubControl()
    {
        return false;
    }

    // 
    //  DESC: Connect to the execution action signal
    //
    connect_ExecutionAction( callback )
    {
        if( this.executionActionCallback === null )
            this.executionActionCallback = [];
        
        this.executionActionCallback.push( callback );
    }
    
    // 
    //  DESC: Get the pointer to the active control
    //  NOTE: This is mostly needed for sub controls
    //
    getActiveControl()
    {
        return this;
    }

    // 
    //  DESC: Set the alpha value of this control
    //
    setAlpha( alpha )
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].setAlpha( alpha );
    }
    
    // 
    //  DESC: Check if this control can scroll
    //
    canScroll( msg )
    {
        if( this.isActive() && this.scrollParam && this.scrollParam.canScroll(msg) )
            return true;
        
        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UIControl;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return vertexBufferManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__system_device__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_quad2d__ = __webpack_require__(64);

//
//  FILE NAME: vertexbuffermanager.js
//  DESC:      vertex buffer manager class singleton
//








class VertexBufferManager
{
    constructor()
    {
        // Map containing a group of VBO handles
        this.vertexBufMapMap = new Map;

        // Map containing a group of IBO handles
        this.indexBufMapMap = new Map;

        // Current vbo
        this.currentVBO = null;

        // Current ibo
        this.currentIBO = null;

        // Current dynamic font IBO indices size
        this.currentMaxFontIndices = 0;
    }

    //
    //  DESC: Load all the textures associated with this group
    //
    createVBO( group, name, vertAry )
    {
        // Create the group map if it doesn't already exist
        let groupMap = this.vertexBufMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.vertexBufMapMap.set( group, groupMap );
        }

        // See if this vertex buffer ID has already been created
        let vboID = groupMap.get( name );
        if( vboID === undefined )
        {
            vboID = __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].createBuffer();
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ARRAY_BUFFER, vboID );
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bufferData( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ARRAY_BUFFER, new Float32Array(vertAry), __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].STATIC_DRAW );
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ARRAY_BUFFER, null );

            groupMap.set( name, vboID );
        }

        return vboID;
    }

    //
    //  DESC: Load all the textures associated with this group
    //
    createIBO( group, name, indexAry, intAs8bit )
    {
        // Create the group map if it doesn't already exist
        let groupMap = this.indexBufMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.indexBufMapMap.set( group, groupMap );
        }

        // See if this vertex buffer ID has already been created
        let iboID = groupMap.get( name );
        if( iboID === undefined )
        {
            iboID = __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].createBuffer();
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ELEMENT_ARRAY_BUFFER, iboID);

            if( intAs8bit )
                __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bufferData( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ELEMENT_ARRAY_BUFFER, new Uint8Array(indexAry), __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].STATIC_DRAW );
            else
                __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bufferData( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ELEMENT_ARRAY_BUFFER, new Uint16Array(indexAry), __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].STATIC_DRAW );

            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ELEMENT_ARRAY_BUFFER, null );

            groupMap.set( name, iboID );
        }

        return iboID;
    }
    
    //
    //  DESC: Create a dynamic font IBO buffer
    //
    createDynamicFontIBO( group, name, indexAry, maxIndicies )
    {
        // Create the group map if it doesn't already exist
        let groupMap = this.indexBufMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.indexBufMapMap.set( group, groupMap );
        }

        // If it's not found, create the intex buffer and add it to the list
        let iboID = groupMap.get( name );
        if( iboID === undefined )
        {
            iboID = __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].createBuffer();

            groupMap.set( name, iboID );
        }    

        // If the new indices are greater then the current, init the IBO with the newest
        if( maxIndicies > this.currentMaxFontIndices )
        {
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer(__WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ELEMENT_ARRAY_BUFFER, iboID);
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bufferData( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ELEMENT_ARRAY_BUFFER, new Uint16Array(indexAry), __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].STATIC_DRAW );
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ELEMENT_ARRAY_BUFFER, null );

            // Save the number of indices for later to compare and expand this size of this IBO
            this.currentMaxFontIndices = maxIndicies;
        }

        return iboID;
    }

    //
    //  DESC: Create a scaled frame
    //
    createScaledFrame( group, name, scaledFrame, textureSize, glyphSize, frameSize, spriteSheetOffset, meshFileVertAry = null )
    {
        // Create the group map if it doesn't already exist
        let groupMap = this.vertexBufMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.vertexBufMapMap.set( group, groupMap );
        }
        
        // See if this vertex buffer ID has already been created
        let vboID = groupMap.get( name );
        if( vboID === undefined )
        {
            let vertAry = [];
            
            // Generate the scaled frame
            this.generateScaledFrame( vertAry, scaledFrame, textureSize, glyphSize, frameSize, spriteSheetOffset );
            
            if( meshFileVertAry !== null )
                Array.prototype.push.apply( vertAry, meshFileVertAry );
            
            vboID = __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].createBuffer();
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ARRAY_BUFFER, vboID );
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bufferData( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ARRAY_BUFFER, new Float32Array(vertAry), __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].STATIC_DRAW );
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ARRAY_BUFFER, null );

            groupMap.set( name, vboID );
        }

        return vboID;
    }
    
    //
    //  DESC: Create a scaled frame
    //
    generateScaledFrame( vertAry, scaledFrame, textureSize, glyphSize, frameSize, spriteSheetOffset )
    {
        // Offsets to center the mesh
        let center = new __WEBPACK_IMPORTED_MODULE_1__common_point__["a" /* Point */](frameSize.w / 2, frameSize.h / 2);
        let frameLgth = new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */]( frameSize.w - (scaledFrame.frame.w * 2.0), frameSize.h - (scaledFrame.frame.h * 2.0) );
        let uvLgth = new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */]( glyphSize.w - (scaledFrame.frame.w * 2.0), glyphSize.h - (scaledFrame.frame.h * 2.0) );

        let quadBuf = [new __WEBPACK_IMPORTED_MODULE_3__common_quad2d__["a" /* Quad2d */], new __WEBPACK_IMPORTED_MODULE_3__common_quad2d__["a" /* Quad2d */], new __WEBPACK_IMPORTED_MODULE_3__common_quad2d__["a" /* Quad2d */], new __WEBPACK_IMPORTED_MODULE_3__common_quad2d__["a" /* Quad2d */], new __WEBPACK_IMPORTED_MODULE_3__common_quad2d__["a" /* Quad2d */], new __WEBPACK_IMPORTED_MODULE_3__common_quad2d__["a" /* Quad2d */], new __WEBPACK_IMPORTED_MODULE_3__common_quad2d__["a" /* Quad2d */], new __WEBPACK_IMPORTED_MODULE_3__common_quad2d__["a" /* Quad2d */]];

        // Left frame
        this.createQuad( 
            new __WEBPACK_IMPORTED_MODULE_1__common_point__["a" /* Point */](-center.x, center.y-scaledFrame.frame.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, -frameLgth.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](0, scaledFrame.frame.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, uvLgth.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[0] );

        // top left
        this.createQuad(
            new __WEBPACK_IMPORTED_MODULE_1__common_point__["a" /* Point */](-center.x, center.y),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, -scaledFrame.frame.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](0, 0),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, scaledFrame.frame.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[1] );

        // top
        this.createQuad(
            new __WEBPACK_IMPORTED_MODULE_1__common_point__["a" /* Point */](-(center.x-scaledFrame.frame.w), center.y),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](frameLgth.w, -scaledFrame.frame.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, 0),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](uvLgth.w, scaledFrame.frame.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[2] );

        // top right
        this.createQuad(
            new __WEBPACK_IMPORTED_MODULE_1__common_point__["a" /* Point */](center.x-scaledFrame.frame.w, center.y),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, -scaledFrame.frame.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w + uvLgth.w, 0),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, scaledFrame.frame.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[3] );

        // right frame
        this.createQuad(
            new __WEBPACK_IMPORTED_MODULE_1__common_point__["a" /* Point */](center.x-scaledFrame.frame.w, center.y-scaledFrame.frame.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, -frameLgth.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w + uvLgth.w, scaledFrame.frame.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, uvLgth.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[4] );

        // bottom right
        this.createQuad(
            new __WEBPACK_IMPORTED_MODULE_1__common_point__["a" /* Point */](center.x-scaledFrame.frame.w, -(center.y-scaledFrame.frame.h)),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, -scaledFrame.frame.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w + uvLgth.w, scaledFrame.frame.h + uvLgth.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, scaledFrame.frame.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[5] );

        // bottom frame
        this.createQuad(
            new __WEBPACK_IMPORTED_MODULE_1__common_point__["a" /* Point */](-(center.x-scaledFrame.frame.w), -(center.y-scaledFrame.frame.h)),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](frameLgth.w, -scaledFrame.frame.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, scaledFrame.frame.h + uvLgth.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](uvLgth.w, scaledFrame.frame.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[6] );

        // bottom left
        this.createQuad(
            new __WEBPACK_IMPORTED_MODULE_1__common_point__["a" /* Point */](-center.x, -(center.y-scaledFrame.frame.h)),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, -scaledFrame.frame.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](0, scaledFrame.frame.h + uvLgth.h),
            new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](scaledFrame.frame.w, scaledFrame.frame.h),
            textureSize,
            frameSize,
            spriteSheetOffset,
            quadBuf[7] );

        // Piece together the needed unique verts
        Array.prototype.push.apply( vertAry, quadBuf[0].vert[0].data );
        Array.prototype.push.apply( vertAry, quadBuf[0].vert[1].data );
        Array.prototype.push.apply( vertAry, quadBuf[0].vert[2].data );
        Array.prototype.push.apply( vertAry, quadBuf[0].vert[3].data );
        Array.prototype.push.apply( vertAry, quadBuf[1].vert[1].data );
        Array.prototype.push.apply( vertAry, quadBuf[1].vert[2].data );
        Array.prototype.push.apply( vertAry, quadBuf[2].vert[1].data );
        Array.prototype.push.apply( vertAry, quadBuf[2].vert[3].data );
        Array.prototype.push.apply( vertAry, quadBuf[3].vert[1].data );
        Array.prototype.push.apply( vertAry, quadBuf[3].vert[3].data );
        Array.prototype.push.apply( vertAry, quadBuf[4].vert[0].data );
        Array.prototype.push.apply( vertAry, quadBuf[4].vert[3].data );
        Array.prototype.push.apply( vertAry, quadBuf[5].vert[0].data );
        Array.prototype.push.apply( vertAry, quadBuf[5].vert[3].data );
        Array.prototype.push.apply( vertAry, quadBuf[6].vert[0].data );
        Array.prototype.push.apply( vertAry, quadBuf[7].vert[0].data );
    }
    
    //
    //  DESC: Create a quad
    //
    createQuad( vert, vSize, uv, uvSize, textureSize, frameSize, spriteSheetOffset, quadBuf )
    {
        // For OpenGL pixel perfect rendering is an even size graphic,
        // for DirectX, it's an odd size graphic.

        // Check if the width or height is odd. If so, we offset 
        // by 0.5 for proper orthographic rendering
        // speed enhancement - if( Math.trunc(frameSize.w) % 2 != 0 )
        let additionalOffsetX = 0;
        if( Math.trunc(frameSize.w) & 1 !== 0 )
            additionalOffsetX = 0.5;

        let additionalOffsetY = 0;
        if( Math.trunc(frameSize.h) & 2 !== 0 )
            additionalOffsetY = 0.5;

        // Calculate the third vertex of the first face
        quadBuf.vert[0].x = vert.x + additionalOffsetX;
        quadBuf.vert[0].y = vert.y + additionalOffsetY + vSize.h;
        quadBuf.vert[0].u = spriteSheetOffset.x1 + (uv.u / textureSize.w);
        quadBuf.vert[0].v = spriteSheetOffset.y1 + ((uv.v + uvSize.h) / textureSize.h);

        // Calculate the second vertex of the first face
        quadBuf.vert[1].x = vert.x + additionalOffsetX + vSize.w;
        quadBuf.vert[1].y = vert.y + additionalOffsetY;
        quadBuf.vert[1].u = spriteSheetOffset.x1 + ((uv.u + uvSize.w) / textureSize.w);
        quadBuf.vert[1].v = spriteSheetOffset.y1 + (uv.v / textureSize.h);

        // Calculate the first vertex of the first face
        quadBuf.vert[2].x = quadBuf.vert[0].x;
        quadBuf.vert[2].y = quadBuf.vert[1].y;
        quadBuf.vert[2].u = quadBuf.vert[0].u;
        quadBuf.vert[2].v = quadBuf.vert[1].v;

        // Calculate the second vertex of the second face
        quadBuf.vert[3].x = quadBuf.vert[1].x;
        quadBuf.vert[3].y = quadBuf.vert[0].y;
        quadBuf.vert[3].u = quadBuf.vert[1].u;
        quadBuf.vert[3].v = quadBuf.vert[0].v;
    }
    
    //
    //  DESC: Delete the group of buffers
    //
    deleteGroup( group )
    {
        let groupMap = this.vertexBufMapMap.get( group );
        if( groupMap !== undefined )
        {
            for( let [ key, vboID ] of groupMap.entries() )
                __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].deleteBuffer( vboID );
            
            this.vertexBufMapMap.delete( group );
        }
        
        groupMap = this.indexBufMapMap.get( group );
        if( groupMap !== undefined )
        {
            for( let [ key, iboID ] of groupMap.entries() )
                __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].deleteBuffer( iboID );
            
            this.indexBufMapMap.delete( group );
        }
    }
    
    //
    //  DESC: See if a VBO already exists
    //
    isVBO( group, name )
    {
        // See if the group exists
        let groupMap = this.vertexBufMapMap.get( group );
        if( groupMap === undefined )
            return null;

        // See if this vertex buffer ID has already been created
        let vboId = groupMap.get( name );
        if( vboId === undefined )
            return null;

        return vboId;
    }

    //
    //  DESC: Bind the buffers
    //
    bind( vbo, ibo )
    {
        if( this.currentVBO != vbo )
        {
            // save the current binding
            this.currentVBO = vbo;

            // Have OpenGL bind this buffer now
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ARRAY_BUFFER, vbo );
        }

        if( this.currentIBO != ibo )
        {
            // save the current binding
            this.currentIBO = ibo;

            // Have OpenGL bind this buffer now
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ELEMENT_ARRAY_BUFFER, ibo );
        }
    }
    
    //
    //  DESC: Bind the buffers
    //
    unbind()
    {
        this.currentVBO = null;
        this.currentIBO = null;
        __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ARRAY_BUFFER, null );
        __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ELEMENT_ARRAY_BUFFER, null );
    }
}

var vertexBufferManager = new VertexBufferManager;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME:  rect.js
//  DESC:       rect class
//



class Rect
{
    constructor( x1 = 0, y1 = 0, x2 = 0, y2 = 0 )
    {
        this.data = new Float32Array([x1,y1,x2,y2]);
    }
    
    set( x1 = 0, y1 = 0, x2 = 0, y2 = 0 )
    {
        this.data[0] = x1;
        this.data[1] = y1;
        this.data[2] = x2;
        this.data[3] = y2;
    }
    
    set x1(value) { this.data[0] = value; }
    get x1() { return this.data[0]; }
    
    set y1(value) { this.data[1] = value; }
    get y1() { return this.data[1]; }
    
    set x2(value) { this.data[2] = value; }
    get x2() { return this.data[2]; }
    
    set y2(value) { this.data[3] = value; }
    get y2() { return this.data[3]; }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Rect;



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_assetholder__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_genfunc__ = __webpack_require__(4);

//
//  FILE NAME: managerbase.js
//  DESC:      Base class for common manager behaviors
//






class ManagerBase
{
    constructor()
    {
        this.listTableMap = new Map;
        
        // load counter
        this.loadCounter = 0;
    }
    
    // 
    //  DESC: Load the data list tables
    //
    loadListTable( xmlNode )
    {
        if( xmlNode )
        {
            let groupLst = xmlNode.getElementsByTagName('groupList');
            
            for( let i = 0; i < groupLst.length; ++i )
            {
                let groupName = groupLst[i].getAttribute('groupName');

                let fileLst = groupLst[i].getElementsByTagName('file');
                if( fileLst.length )
                {
                    let pathAry = [];
                    for( let j = 0; j < fileLst.length; ++j )
                    {
                        pathAry.push( fileLst[j].getAttribute('path') );
                    }

                    this.listTableMap.set( groupName, pathAry );
                }
            }
        }
    }
    
    //
    //  DESC: Load the XML file
    //
    downloadFile( fileType, group, filePath, finishCallback, loadCallback )
    {
        // Use a counter to determine when the load is done because there's
        // no garentee they will finish in the order executed
        // Always do this before the load
        ++this.loadCounter;
                    
        __WEBPACK_IMPORTED_MODULE_1__utilities_genfunc__["b" /* downloadFile */]( fileType, filePath,
            ( fileData ) =>
            {
                // Load all object information from an xml node
                loadCallback( group, fileData, filePath, finishCallback );

                // Always do this after the load
                --this.loadCounter;

                if( this.loadCounter === 0 )
                    finishCallback();
            });
    }
    
    //
    //  DESC: Load all XML's associated with this group
    //
    loadGroup( groupNameStr, groupMapMap, groupAry, finishCallback )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for has been defined in the list table file
            let pathAry = this.listTableMap.get( group );
            if( pathAry !== undefined )
            {
                // Load the group data if it doesn't already exist
                if( groupMapMap.get( group ) === undefined )
                {
                    // Create a new group map inside of our map
                    groupMapMap.set( group, new Map );

                    this.load( group, finishCallback );
                }
                else
                {
                    throw new Error( `${groupNameStr} group has alread been loaded (${group})!` );
                }
            }
            else
            {
                throw new Error( `${groupNameStr} group name can't be found (${group})!` );
            }
        }
    }
    
    //
    //  DESC: Load all XML's associated with this group
    //
    load( group, finishCallback )
    {
        // Make sure the group we are looking for has been defined in the list table file
        let pathAry = this.listTableMap.get( group );
        if( pathAry !== undefined )
        {
            for( let i = 0; i < pathAry.length; ++i )
            {
                // Check if this file has already been loaded
                if( !__WEBPACK_IMPORTED_MODULE_0__utilities_assetholder__["a" /* assetHolder */].has( group, pathAry[i] ) )
                {
                    this.downloadFile( 'xml', group, pathAry[i], finishCallback,
                        ( group, xmlNode, filePath, finishCallback ) => 
                        {
                            // Store the preloaded XML file
                            __WEBPACK_IMPORTED_MODULE_0__utilities_assetholder__["a" /* assetHolder */].set( group, filePath, xmlNode );

                            // Call the class function to load the data
                            this.loadFromNode( group, xmlNode, filePath, finishCallback );
                        });
                }
                else
                {
                    this.loadFromNode( group, __WEBPACK_IMPORTED_MODULE_0__utilities_assetholder__["a" /* assetHolder */].get( group, pathAry[i]), pathAry[i], null );
                }
            }

            // If there's nothing to load, call the complete callback
            if( this.loadCounter === 0 )
                finishCallback();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ManagerBase;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__defs__ = __webpack_require__(0);

// 
//  FILE NAME:  color.js
//  DESC:       color class
//




class Color
{
    constructor( r = 1, g = 1, b = 1, a = 1 )
    {
        this.data = new Float32Array([r,g,b,a]);
    }
    
    set( r = 1, g = 1, b = 1, a = 1 )
    {
        this.data[0] = r;
        this.data[1] = g;
        this.data[2] = b;
        this.data[3] = a;
    }
    
    copy( obj )
    {
        this.data[0] = obj.data[0];
        this.data[1] = obj.data[1];
        this.data[2] = obj.data[2];
        this.data[3] = obj.data[3];
    }
    
    set r(value)
    {
        if( value > 1.5 )
            value *= __WEBPACK_IMPORTED_MODULE_0__defs__["_59" /* RGB_TO_DEC */];
        
        this.data[0] = value;
    }
    get r() { return this.data[0]; }
    
    set g(value)
    {
        if( value > 1.5 )
            value *= __WEBPACK_IMPORTED_MODULE_0__defs__["_59" /* RGB_TO_DEC */];
        
        this.data[1] = value;
    }
    get g() { return this.data[1]; }
    
    set b(value)
    {
        if( value > 1.5 )
            value *= __WEBPACK_IMPORTED_MODULE_0__defs__["_59" /* RGB_TO_DEC */];
        
        this.data[2] = value;
    }
    get b() { return this.data[2]; }
    
    set a(value)
    {
        if( value > 1.5 )
            value *= __WEBPACK_IMPORTED_MODULE_0__defs__["_59" /* RGB_TO_DEC */];
        
        this.data[3] = value;
    }
    get a() { return this.data[3]; }
    
    // 
    //  DESC: Convert from integer to decimal
    //
    convert()
    {
        // 0.00390625f = 1 / 256;
        if( this.r > 1.5 )
            this.r *= __WEBPACK_IMPORTED_MODULE_0__defs__["_59" /* RGB_TO_DEC */];

        if( this.g > 1.5 )
            this.g *= __WEBPACK_IMPORTED_MODULE_0__defs__["_59" /* RGB_TO_DEC */];;

        if( this.b > 1.5 )
            this.b *= __WEBPACK_IMPORTED_MODULE_0__defs__["_59" /* RGB_TO_DEC */];

        if( this.a > 1.5 )
            this.a *= __WEBPACK_IMPORTED_MODULE_0__defs__["_59" /* RGB_TO_DEC */];
    }
    
    // 
    //  DESC: HSV transformation
    //  
    //  param: type hue - hue shift (in degrees)
    //  param: type sat - saturation multiplier (scalar)
    //  param: type val - value multiplier (scalar)
    //
    transformHSV( hue, sat, val )
    {
        let VSU = val * sat * Math.cos(hue * __WEBPACK_IMPORTED_MODULE_0__defs__["g" /* DEG_TO_RAD */]);
        let VSW = val * sat * Math.sin(hue * __WEBPACK_IMPORTED_MODULE_0__defs__["g" /* DEG_TO_RAD */]);

        let _r = this.data[0], _g = this.data[1], _b = this.data[2];

        this.data[0] = (.299 * val + .701 * VSU + .168 * VSW) * _r
                     + (.587 * val - .587 * VSU + .330 * VSW) * _g
                     + (.114 * val - .114 * VSU - .497 * VSW) * _b;
        this.data[1] = (.299 * val - .299 * VSU - .328 * VSW) * _r
                     + (.587 * val + .413 * VSU + .035 * VSW) * _g
                     + (.114 * val - .114 * VSU + .292 * VSW) * _b;
        this.data[2] = (.299 * val - .3   * VSU + 1.25 * VSW) * _r
                     + (.587 * val - .588 * VSU - 1.05 * VSW) * _g
                     + (.114 * val + .886 * VSU - .203 * VSW) * _b;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Color;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

//
//  FILE NAME: scriptcomponent.js
//  DESC:      Class for handling game scripting
//



class ScriptComponent
{
    constructor()
    {
        this.scriptAry = [];
    }
    
    // 
    //  DESC: Update the script
    //
    set( script )
    {
        this.scriptAry.push( script );
    }
    
    // 
    //  DESC: Update the script
    //
    update()
    {
        // Call the active scripts
        for( let i = this.scriptAry.length - 1; i > -1; --i )
        {
            this.scriptAry[i].execute();
            
            // If the script is finished, remove it
            if( this.scriptAry[i].isFinished )
                this.scriptAry.splice( i, 1 );
        }
    }
    
    // 
    //  DESC: Is this component active?
    //
    isActive()
    {
        return (this.scriptAry.length > 0);
    }
    
    // 
    //  DESC: clear out the scripts
    //
    reset()
    {
        this.scriptAry = [];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ScriptComponent;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__statemessage__ = __webpack_require__(106);

// 
//  FILE NAME: gamestate.js
//  DESC:      game state base class
//





const GAME_STATE_NULL         = 0,
             GAME_STATE_STARTUP      = 1,
             GAME_STATE_LOBBY        = 2,
             GAME_STATE_LOAD         = 3,
             GAME_STATE_BIG_PAY_BACK = 4;
/* unused harmony export GAME_STATE_NULL */

/* harmony export (immutable) */ __webpack_exports__["d"] = GAME_STATE_STARTUP;

/* harmony export (immutable) */ __webpack_exports__["c"] = GAME_STATE_LOBBY;

/* harmony export (immutable) */ __webpack_exports__["b"] = GAME_STATE_LOAD;

/* harmony export (immutable) */ __webpack_exports__["a"] = GAME_STATE_BIG_PAY_BACK;


class GameState
{
    constructor( gameState, nextState, callback )
    {
        this.stateChange = false;
        this.gameState = gameState;
        this.nextState = nextState;
        this.callback = callback;
        
        // Message to send to next state
        this.stateMessage = new __WEBPACK_IMPORTED_MODULE_0__statemessage__["a" /* StateMessage */];
    }
    
    init()
    {
        // Empty function to be overwritten
    }
    
    cleanUp()
    {
        // Empty function to be overwritten
    }
    
    handleEvent( event )
    {
        // Empty function to be overwritten
    }
    
    doStateChange()
    {
        // Empty function to be overwritten
        return this.stateChange;
    }
    
    miscProcess()
    {
        // Empty function to be overwritten
    }
    
    physics()
    {
        // Empty function to be overwritten
    }
    
    update()
    {
        // Empty function to be overwritten
    }
    
    transform()
    {
        // Empty function to be overwritten
    }
    
    preRender()
    {
        // Empty function to be overwritten
    }
    
    postRender()
    {
        // Empty function to be overwritten
    }
}
/* harmony export (immutable) */ __webpack_exports__["e"] = GameState;



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return signalManager; });

// 
//  FILE NAME: signalmanager.js
//  DESC:      Class for handling messaging
//



class SignalManager
{
    constructor()
    {
        this.smartGuiControlSignal = [];
        this.smartMenuSignal = [];
        this.aiCreateSignal = [];
        this.loadCompleteSignal = [];
        this.resolutionChangeSignal = [];
    }
    
    // 
    //  DESC: Connect to the smart gui control signal
    //
    connect_smartGui( slot )
    {
        this.smartGuiControlSignal.push( slot );
    }
    
    // 
    //  DESC: Connect to the smart gui menu signal
    //
    connect_smartMenu( slot )
    {
        this.smartMenuSignal.push( slot );
    }
    
    // 
    //  DESC: Connect to the Ai Sprite create signal
    //
    connect_aiCreate( slot )
    {
        this.aiCreateSignal.push( slot );
    }
    
    // 
    //  DESC: Connect to the load signal
    //
    connect_loadComplete( slot )
    {
        this.loadCompleteSignal.push( slot );
    }
    
    // 
    //  DESC: Connect to the resolution change signal
    //
    connect_resolutionChange( slot )
    {
        this.resolutionChangeSignal.push( slot );
    }
    
    // 
    //  DESC: disconnect to the load signal
    //
    clear_loadComplete( slot )
    {
        this.loadCompleteSignal = [];
    }
    
    // 
    //  DESC: Broadcast smart gui control signal
    //
    broadcast_smartGui( control )
    {
        for( let i = 0; i < this.smartGuiControlSignal.length; ++i )
            this.smartGuiControlSignal[i](control);
    }
    
    // 
    //  DESC: Broadcast smart gui control signal
    //
    broadcast_smartMenu( menu )
    {
        for( let i = 0; i < this.smartMenuSignal.length; ++i )
            this.smartMenuSignal[i](menu);
    }
    
    // 
    //  DESC: Broadcast AI Actor create signal
    //
    broadcast_aiCreate( aiName, actorSprite )
    {
        for( let i = 0; i < this.aiCreateSignal.length; ++i )
            this.aiCreateSignal[i](aiName, actorSprite);
    }
    
    // 
    //  DESC: Broadcast the load signal
    //
    broadcast_loadComplete()
    {
        for( let i = 0; i < this.loadCompleteSignal.length; ++i )
            this.loadCompleteSignal[i]();
    }
    
    // 
    //  DESC: Broadcast the resolution change
    //
    broadcast_resolutionChange()
    {
        for( let i = 0; i < this.resolutionChangeSignal.length; ++i )
            this.resolutionChangeSignal[i]();
    }
}

var signalManager = new SignalManager;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return menuManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__managers_managerbase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__managers_actionmanager__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__managers_signalmanager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utilities_assetholder__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__gui_menu__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__gui_menutree__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utilities_genfunc__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: menumanager.js
//  DESC:      menu manager class singleton
//













class MenuManager extends __WEBPACK_IMPORTED_MODULE_0__managers_managerbase__["a" /* ManagerBase */]
{
    constructor()
    {
        super();
        
        // Map map of menu trees
        this.menuTreeMapMap = new Map;

        // Map of the menus
        this.menuMapMap = new Map;

        // Array of active menu trees
        this.activeMenuTreeAry = [];

        // Array of active interface trees
        this.activeInterTreeAry = [];

        // menu manager state
        this.active = false;

        // Actions
        this.backAction;
        this.toggleAction;
        this.escapeAction;
        this.selectAction;
        this.upAction;
        this.downAction;
        this.leftAction;
        this.rightAction;
        this.tabLeft;
        this.tabRight;
        this.defaultTree;

        // scroll timer Id
        this.scrollTimerId = 0;

        // Allow message processing
        this.allow = false;
    }
    
    // 
    //  DESC: Load the menu group
    //
    preloadGroup( groupAry, finishCallback )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for has been defined in the list table file
            let pathAry = this.listTableMap.get( group );
            if( pathAry !== undefined )
            {
                // Load the group data if it doesn't already exist
                if( this.menuMapMap.get( group ) === undefined )
                {
                    // Create a new group map inside of our maps
                    this.menuMapMap.set( group, new Map );
                    this.menuTreeMapMap.set( group, new Map );

                    for( let i = 0; i < pathAry.length; ++i )
                        this.downloadFile( 'xml', group, pathAry[i], finishCallback, this.preload.bind(this) );
                }
                else
                {
                    throw new Error( `Menu group has alread been loaded (${group})!` );
                }
            }
            else
            {
                throw new Error( `Menu Manager list group name can't be found (${group})!` );
            }
        }
    }
    
    //
    //  DESC: Load all object information from an xml node
    //
    preload( group, node, filePath, finishCallback )
    {
        // Load the menus from node
        this.preloadMenuXML( group, node, finishCallback );

        // Load the trees from node
        this.loadTreesFromNode( group, node );
    }
    
    //
    //  DESC: preload all object information from an xml node
    //
    preloadMenuXML( group, node, finishCallback )
    {
        // Get the menu group map
        let groupMap = this.menuMapMap.get( group );
        
        let menuNode = node.getElementsByTagName('menu');

        for( let i = 0; i < menuNode.length; ++i )
        {
            // Get the name of the menu
            let name = menuNode[i].getAttribute( 'name' );

            // Get the menu file path
            let filePath = menuNode[i].getAttribute( 'file' );

            // Check for duplicates
            if( groupMap.get( name ) !== undefined )
                throw new Error( `Duplicate menu name! (${name}).` );

            // Allocate a new menu
            let menu = new __WEBPACK_IMPORTED_MODULE_5__gui_menu__["a" /* Menu */]( name, group, filePath );

            // Insert the menu into the group map
            groupMap.set( name, menu );

            // Load the transform from node
            menu.loadTransFromNode( menuNode[i] );

            // Load the dynamic offset from node
            menu.loadDynamicOffsetFromNode( menuNode[i] );

            // Check if this file has already been loaded
            if( !__WEBPACK_IMPORTED_MODULE_4__utilities_assetholder__["a" /* assetHolder */].has( group, filePath ) )
            {
                // Set a place holder for the data to be loaded
                __WEBPACK_IMPORTED_MODULE_4__utilities_assetholder__["a" /* assetHolder */].set( group, filePath );

                // Load the menu XML file
                this.downloadFile( 'xml', group, filePath, finishCallback,
                    ( group, xmlNode, filePath, finishCallback ) => 
                    {
                        // Store the preloaded XML file
                        __WEBPACK_IMPORTED_MODULE_4__utilities_assetholder__["a" /* assetHolder */].set( group, filePath, xmlNode );

                        // Recurse back until all XML files are loaded
                        this.preloadControlXML( group, xmlNode, finishCallback );
                    });
            }
        }
    }
    
    //
    //  DESC: Load the trees from node
    //
    loadTreesFromNode( group, node )
    {
        // Get the menu group map
        let menuGroupMap = this.menuMapMap.get( group );
        
        // Get the tree group map
        let treeGroupMap = this.menuTreeMapMap.get( group );
        
        // Get the node to the list of trees
        let treeNode = node.getElementsByTagName('tree');

        for( let i = 0; i < treeNode.length; ++i )
        {
            // Get the name
            let name = treeNode[i].getAttribute( 'name' );

            // Get the root menu
            let rootMenu = treeNode[i].getAttribute( 'root' );

            // Get the default menu
            let defaultMenu = treeNode[i].getAttribute( 'default' );

            // Is this menu an interface menu?
            let interfaceMenu = (treeNode[i].getAttribute( 'interfaceMenu' ) === 'true');

            // Check for duplicate names
            if( treeGroupMap.get( name ) !== undefined )
                throw new Error( `Duplicate tree name! (${name}).` );

            // Add the tree data to the map
            treeGroupMap.set( name, new __WEBPACK_IMPORTED_MODULE_6__gui_menutree__["a" /* MenuTree */]( name, menuGroupMap, rootMenu, defaultMenu, interfaceMenu ) );

            // Check that the root menu exists
            if( rootMenu !== '' )
            {
                if( menuGroupMap.get( rootMenu ) === undefined )
                    throw new Error( `Root menu doesn't exist! (${name}).` );
            }
            else if( defaultMenu !== '' )
            {
                if( menuGroupMap.get( defaultMenu ) === undefined )
                    throw new Error( `Default menu doesn't exist! (${name}).` );
            }
        }
    }
    
    //
    //  DESC: preload the menu controls from menu node
    //
    preloadControlXML( group, node, finishCallback )
    {
        let controlLst = ['staticMenuControls', 'mouseOnlyControls', 'menuControls', 'subControlList', 'scrollBoxControlList'];
        
        // Load the control XML files
        for( let i = 0; i < controlLst.length; ++i )
        {
            let nodeLst = node.getElementsByTagName( controlLst[i] );
            if( nodeLst.length )
            {
                let controlNode = nodeLst[0].getElementsByTagName( 'control' );

                for( let j = 0; j < controlNode.length; ++j )
                {
                    let filePathNode = controlNode[j].getElementsByTagName( 'filePath' );
                    if( filePathNode.length )
                    {
                        let filePath = filePathNode[0].getAttribute('file');
                        if( filePath )
                        {
                            // Check if this file has already been loaded
                            if( !__WEBPACK_IMPORTED_MODULE_4__utilities_assetholder__["a" /* assetHolder */].has( group, filePath ) )
                            {
                                // Set a place holder for the data to be loaded
                                __WEBPACK_IMPORTED_MODULE_4__utilities_assetholder__["a" /* assetHolder */].set( group, filePath );
                                
                                this.downloadFile( 'xml', group, filePath, finishCallback,
                                    ( group, xmlNode, filePath, finishCallback ) => 
                                    {
                                        // Store the preloaded XML file
                                        __WEBPACK_IMPORTED_MODULE_4__utilities_assetholder__["a" /* assetHolder */].set( group, filePath, xmlNode );

                                        // Recurse back until all XML files are loaded for this control
                                        this.preloadControlXML( group, xmlNode, finishCallback );
                                    });
                            }
                        }
                    }
                }
            }
        }
    }
    
    //
    //  DESC: Load all object information from an xml node
    //
    createGroup( groupAry, doInit = true )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Get the menu group map
            let groupMap = this.menuMapMap.get( group );
            if( groupMap === undefined )
                throw new Error( `Group map can't be found! (${group}).` );

            for( let [ key, menu ] of groupMap.entries() )
            {
                // Get the menu XML node
                let node = __WEBPACK_IMPORTED_MODULE_4__utilities_assetholder__["a" /* assetHolder */].get( group, menu.filePath );

                // Have the menu load it's share
                menu.loadFromNode( node );

                // Broadcast signal to let the game handle smart menu inits
                __WEBPACK_IMPORTED_MODULE_3__managers_signalmanager__["a" /* signalManager */].broadcast_smartMenu( menu );

                // Handle any smart menu creates
                menu.smartCreate();
            }

            if( doInit )
                this.initGroup( group );
        }
    }

    //
    //  DESC: Free the menu group
    //
    freeGroup( groupAry )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for exists
            if( this.listTableMap.get( group ) === undefined )
                throw new Error( `Object data list group name can't be found (${group})!` );

            // Get the group map
            let groupMap = this.menuTreeMapMap.get( group );
            if( groupMap !== undefined )
            {
                // Remove it from the tree vectors if it is there
                for( let [ key, menuTree ] of groupMap.entries() )
                {
                    if( menuTree.interfaceMenu )
                    {
                        let index = this.activeInterTreeAry.indexOf( menuTree );

                        if( index > -1 )
                            this.activeInterTreeAry.splice( index, 1 );
                    }
                    else
                    {
                        let index = this.activeMenuTreeAry.indexOf( menuTree );

                        if( index > -1 )
                            this.activeMenuTreeAry.splice( index, 1 );
                    }
                }

                // Free the menu group
                this.menuTreeMapMap.delete( group );
                this.menuMapMap.delete( group );
            }
        }
    }
    
    // 
    //  DESC: Init a menu group
    //  NOTE: This allows certain actions to be done after the group load
    //
    initGroup( group )
    {
        let groupMap = this.menuMapMap.get( group );
        if( groupMap !== undefined )
        {
            for( let [ key, menu ] of groupMap.entries() )
                menu.init();
        }
        else
        {
            throw new Error( `Menu group name can't be found to init (${group})!` );
        }
    }

    // 
    //  DESC: Clean up a menu group
    //  NOTE: This allows certain actions to be done after the group load
    //
    cleanUpGroup( group )
    {
        let groupMap = this.menuMapMap.get( group );
        if( groupMap !== undefined )
        {
            for( let [ key, menu ] of groupMap.entries() )
                menu.cleanUp();
        }
        else
        {
            throw new Error( `Menu group name can't be found to clean up (${group})!` );
        }
    }

    // 
    //  DESC: Load the menu action list from XML
    //
    loadMenuAction( node )
    {
        this.backAction = node.getElementsByTagName( 'backAction' )[0].childNodes[0].nodeValue;
        this.toggleAction = node.getElementsByTagName( 'toggleAction' )[0].childNodes[0].nodeValue;
        this.escapeAction = node.getElementsByTagName( 'escapeAction' )[0].childNodes[0].nodeValue;
        this.selectAction = node.getElementsByTagName( 'selectAction' )[0].childNodes[0].nodeValue;
        this.upAction = node.getElementsByTagName( 'upAction' )[0].childNodes[0].nodeValue;
        this.downAction = node.getElementsByTagName( 'downAction' )[0].childNodes[0].nodeValue;
        this.leftAction = node.getElementsByTagName( 'leftAction' )[0].childNodes[0].nodeValue;
        this.rightAction = node.getElementsByTagName( 'rightAction' )[0].childNodes[0].nodeValue;
        this.tabLeft = node.getElementsByTagName( 'tabLeft' )[0].childNodes[0].nodeValue;
        this.tabRight = node.getElementsByTagName( 'tabRight' )[0].childNodes[0].nodeValue;
        this.defaultTree = node.getElementsByTagName( 'defaultTree' )[0].childNodes[0].nodeValue;
    }
    
    // 
    //  DESC: Activate a tree to be used by tree name only
    //        NOTE: Assumes unique tree names
    //
    activateTree( treeAry )
    {
        for( let tree = 0; tree < treeAry.length; ++tree )
        {
            let treeStr = treeAry[tree];
            let found = false;
            
            for( let [ groupKey, groupMap ] of this.menuTreeMapMap.entries() )
            {
                for( let [ key, tree ] of groupMap.entries() )
                {
                    if( key === treeStr )
                    {
                        this.activateTreeGroup( groupKey, key );
                        found = true;
                        break;
                    }
                }
                
                if( found )
                    break;
            }

            // If you got this far, it's a problem
            if( !found )
                throw new Error( `Menu tree doesn't exist (${treeStr})!` );
        }
    }
    
    // 
    //  DESC: Activate a tree to be used
    //
    activateTreeGroup( group, treeStr )
    {
        let groupMap = this.menuTreeMapMap.get( group );
        if( groupMap !== undefined )
        {
            // Find the tree in the map
            let tree = groupMap.get( treeStr );
            if( tree !== undefined )
            {
                if( tree.interfaceMenu )
                {
                    if( this.activeInterTreeAry.indexOf( tree ) !== -1 )
                        throw new Error( `Menu tree already active (${group} - ${treeStr})!` );

                    this.activeInterTreeAry.push( tree );
                }
                else
                {
                    if( this.activeMenuTreeAry.indexOf( tree ) !== -1 )
                        throw new Error( `Menu tree already active (${group} - ${treeStr})!` );

                    this.activeMenuTreeAry.push( tree );
                }

                // Init the tree for use
                tree.init();
            }
            else
            {
                throw new Error( `Menu tree doesn't exist (${group} - ${treeStr})!` );
            }
        }
        else
        {
            throw new Error( `Menu tree group doesn't exist (${group} - ${treeStr})!` );
        }

        // See if we are active
        this.setActiveState();
    }
    
    // 
    //  DESC: Deactivate a tree to be used by tree name only
    //        NOTE: Assumes unique tree names
    //
    deactivateTree( treeStr )
    {
        for( let [ groupKey, groupMap ] of this.menuTreeMapMap.entries() )
        {
            for( let [ key, tree ] of groupMap.entries() )
            {
                if( key === treeStr )
                {
                    ActivateTree( groupIter.first, treeIter.first );
                    return;
                }
            }
        }

        // If you got this far, it's a problem
        throw new Error( `Menu tree doesn't exist (${treeStr})!` );
    }

    // 
    //  DESC: Deactivate a tree that's in use
    //
    deactivateTreeGroup( group, treeStr )
    {
        let groupMap = this.menuTreeMapMap.get( group );
        if( groupMap !== undefined )
        {
            // Find the tree in the map
            let tree = groupMap.get( treeStr );
            if( tree !== undefined )
            {
                // Remove the tree from the vector
                if( tree.interfaceMenu )
                {
                    let index = this.activeInterTreeAry.indexOf( tree );
                    if( index > -1 )
                        this.activeInterTreeAry.splice( index, 1 );
                }
                else
                {
                    let index = this.activeMenuTreeAry.indexOf( tree );
                    if( index > -1 )
                        this.activeMenuTreeAry.splice( index, 1 );
                }
            }
            else
            {
                throw new Error( `Menu tree doesn't exist (${group} - ${treeStr})!` );
            }
        }
        else
        {
            throw new Error( `Menu tree group doesn't exist (${group} - ${treeStr})!` );
        }

        // See if we are still active
        this.setActiveState();
    }
    
    // 
    //  DESC: Clear the active trees
    //
    clearActiveTrees()
    {
        this.active = false;
        
        if( this.scrollTimerId !== 0 )
            clearInterval( this.scrollTimerId );

        this.activeMenuTreeAry = [];
        this.activeInterTreeAry = [];
    }
    
    // 
    //  DESC: Handle input events and dispatch menu events
    //
    handleEvent( event )
    {
        if( this.allow )
        {
            // Convert keyboard, mouse and controller messages in action type messages
            if( event instanceof CustomEvent )
            {
                // Are we doing menu actions? May need to do some scrolling
                if( (event.detail.type >= __WEBPACK_IMPORTED_MODULE_8__common_defs__["_17" /* EGE_MENU_UP_ACTION */]) && (event.detail.type <= __WEBPACK_IMPORTED_MODULE_8__common_defs__["_2" /* EGE_MENU_RIGHT_ACTION */]) )
                {
                    // Free a timer if one happens to be running
                    if( this.scrollTimerId != 0 )
                        clearTimeout( this.scrollTimerId );
                    
                    this.scrollTimerId = 0;

                    if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_8__common_defs__["k" /* EAP_DOWN */] )
                        this.handleEventForScrolling( event );
                }
                
                this.handleEventForTrees( event );

                // Set the active state
                this.setActiveState();
            }
            else
            {
                // Only the default tree can execute an escape or toggle when none are active.
                if( __WEBPACK_IMPORTED_MODULE_1__managers_actionmanager__["a" /* actionManager */].wasActionPress( event, this.escapeAction, __WEBPACK_IMPORTED_MODULE_8__common_defs__["k" /* EAP_DOWN */] ) )
                {
                    let tree = this.getActiveTree();

                    if( tree === null )
                        __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_8__common_defs__["Y" /* EGE_MENU_ESCAPE_ACTION */], this.defaultTree );
                    else
                        __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_8__common_defs__["Y" /* EGE_MENU_ESCAPE_ACTION */], tree.name );
                }
                else if( __WEBPACK_IMPORTED_MODULE_1__managers_actionmanager__["a" /* actionManager */].wasActionPress( event, this.toggleAction, __WEBPACK_IMPORTED_MODULE_8__common_defs__["k" /* EAP_DOWN */] ) )
                {
                    let tree = this.getActiveTree();

                    if( tree === null )
                        __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_8__common_defs__["_12" /* EGE_MENU_TOGGLE_ACTION */], this.defaultTree );
                    else
                        __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_8__common_defs__["_12" /* EGE_MENU_TOGGLE_ACTION */], tree.name );
                }
                else if( this.active )
                {
                    let pressType;

                    // common and can result in many messages which is why it's specifically defined here
                    if( event.type === 'mousemove' )
                    {
                        // Allow the mouse move message to get eaten when action handling is disabled.
                        this.handleEventForTrees( event );
                    }
                    // Select action based on input device
                    else if( (pressType = __WEBPACK_IMPORTED_MODULE_1__managers_actionmanager__["a" /* actionManager */].wasAction( event, this.selectAction )) > __WEBPACK_IMPORTED_MODULE_8__common_defs__["l" /* EAP_IDLE */] )
                    {
                        if( event instanceof KeyboardEvent )
                        {
                            __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_8__common_defs__["_7" /* EGE_MENU_SELECT_ACTION */], pressType, __WEBPACK_IMPORTED_MODULE_8__common_defs__["_56" /* KEYBOARD */] );
                        }
                        else if( event instanceof MouseEvent )
                        {
                            __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent(
                                __WEBPACK_IMPORTED_MODULE_8__common_defs__["_7" /* EGE_MENU_SELECT_ACTION */],
                                pressType,
                                __WEBPACK_IMPORTED_MODULE_8__common_defs__["_57" /* MOUSE */],
                                event.clientX + __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].mouseOffsetX,
                                event.clientY + __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].mouseOffsetY );
                        }
                    }
                    else if( __WEBPACK_IMPORTED_MODULE_1__managers_actionmanager__["a" /* actionManager */].wasActionPress( event, this.backAction, __WEBPACK_IMPORTED_MODULE_8__common_defs__["k" /* EAP_DOWN */] ) )
                        __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_8__common_defs__["V" /* EGE_MENU_BACK_ACTION */] );

                    else if( (pressType = __WEBPACK_IMPORTED_MODULE_1__managers_actionmanager__["a" /* actionManager */].wasAction( event, this.upAction )) > __WEBPACK_IMPORTED_MODULE_8__common_defs__["l" /* EAP_IDLE */] )
                        __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_8__common_defs__["_17" /* EGE_MENU_UP_ACTION */], pressType );

                    else if( (pressType = __WEBPACK_IMPORTED_MODULE_1__managers_actionmanager__["a" /* actionManager */].wasAction( event, this.downAction )) > __WEBPACK_IMPORTED_MODULE_8__common_defs__["l" /* EAP_IDLE */] )
                        __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_8__common_defs__["X" /* EGE_MENU_DOWN_ACTION */], pressType );

                    else if( (pressType = __WEBPACK_IMPORTED_MODULE_1__managers_actionmanager__["a" /* actionManager */].wasAction( event, this.leftAction )) > __WEBPACK_IMPORTED_MODULE_8__common_defs__["l" /* EAP_IDLE */] )
                        __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_8__common_defs__["_0" /* EGE_MENU_LEFT_ACTION */], pressType );

                    else if( (pressType = __WEBPACK_IMPORTED_MODULE_1__managers_actionmanager__["a" /* actionManager */].wasAction( event, this.rightAction )) > __WEBPACK_IMPORTED_MODULE_8__common_defs__["l" /* EAP_IDLE */] )
                        __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_8__common_defs__["_2" /* EGE_MENU_RIGHT_ACTION */], pressType );

                    else if( (pressType = __WEBPACK_IMPORTED_MODULE_1__managers_actionmanager__["a" /* actionManager */].wasAction( event, this.tabLeft )) > __WEBPACK_IMPORTED_MODULE_8__common_defs__["l" /* EAP_IDLE */] )
                        __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_8__common_defs__["_10" /* EGE_MENU_TAB_LEFT */], pressType );

                    else if( (pressType = __WEBPACK_IMPORTED_MODULE_1__managers_actionmanager__["a" /* actionManager */].wasAction( event, this.tabRight )) > __WEBPACK_IMPORTED_MODULE_8__common_defs__["l" /* EAP_IDLE */] )
                        __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_8__common_defs__["_11" /* EGE_MENU_TAB_RIGHT */], pressType );

                    // If none of the predefined actions have been hit, just send the message for processing
                    else
                    {
                        this.handleEventForTrees( event );
                    }
                }
            }
        }
    }
    
    // 
    //  DESC: Handle input events depending on if this is a menu or interface tree
    //
    handleEventForTrees( event )
    {
        let menuActive = false;

        for( let i = 0; i < this.activeMenuTreeAry.length; ++i )
        {
            // See if there's an active tree
            menuActive |= this.activeMenuTreeAry[i].isActive();

            // Even if a menu tree is not active, it needs to receive events to become active
            this.activeMenuTreeAry[i].handleEvent( event );
        }

        // Only allow event handling for interface menus when regular menus are not active
        if( !menuActive )
        {
            for( let i = 0; i < this.activeInterTreeAry.length; ++i )
            {
                if( this.activeInterTreeAry[i].isActive() )
                    this.activeInterTreeAry[i].handleEvent( event );
            }
        }
    }
    
    // 
    //  DESC: Handle input events depending on if this is a menu or interface tree
    //
    handleEventForScrolling( event )
    {
        if( this.active )
        {
            if( !this.handleMenuScrolling( event, this.activeMenuTreeAry ) )
            {
                // Only allow event handling for interface menus when regular menus are not active
                this.handleMenuScrolling( event, this.activeInterTreeAry );
            }
        }
    }
    
    // 
    //  DESC: Handle input events for menu scrolling
    //
    handleMenuScrolling( event, activeTreeAry )
    {
        let menuActive = false;

        for( let i = 0; i < activeTreeAry.length; ++i )
        {
            // See if there's an active menu
            if( activeTreeAry[i].isActive() )
            {
                menuActive = true;

                let scrollParam = activeTreeAry[i].getScrollParam( event.detail.type );

                // If scrolling is allowed, start the timer
                if( scrollParam.canScroll( event.detail.type ) )
                {
                    this.scrollTimerId = setTimeout(
                        () =>
                        {
                            this.scrollTimerId = setInterval(
                                () => __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( scrollParam.msg ),
                                scrollParam.scrollDelay );
                                
                            __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent( scrollParam.msg );
                        }, 
                        scrollParam.startDelay );
                        
                    break;
                }
            }
        }

        return menuActive;
    }
    
    // 
    //  DESC: Update the menu
    //
    update()
    {
        if( this.active )
        {
            if( !this.updateMenu( this.activeMenuTreeAry ) )
            {
                // Only allow Updating for interface menus when regular menus are not active
                this.updateMenu( this.activeInterTreeAry );
            }
        }
    }

    // 
    //  DESC: Update the menu
    //
    updateMenu( activeTreeAry )
    {
        let menuActive = false;

        for( let i = 0; i < activeTreeAry.length; ++i )
        {
            // See if there's an active menu
            if( activeTreeAry[i].isActive() )
            {
                menuActive = true;
                activeTreeAry[i].update();
            }
        }

        return menuActive;
    }
    
    // 
    //  DESC: Transform the menu
    //
    transform()
    {
        if( this.active )
        {
            if( !this.transformMenu( this.activeMenuTreeAry ) )
            {
                // Only allow Updating for interface menus when regular menus are not active
                this.transformMenu( this.activeInterTreeAry );
            }
        }

    }

    // 
    //  DESC: Transform the menu
    //
    transformMenu( activeTreeAry )
    {
        let menuActive = false;

        for( let i = 0; i < activeTreeAry.length; ++i )
        {
            // See if there's an active menu
            if( activeTreeAry[i].isActive() )
            {
                menuActive = true;
                activeTreeAry[i].doTransform();
            }
        }

        return menuActive;
    }
    
    // 
    //  DESC: Render menus
    //
    render( matrix )
    {
        if( this.active )
        {
            for( let i = 0; i < this.activeMenuTreeAry.length; ++i )
                if( this.activeMenuTreeAry[i].isActive() )
                    this.activeMenuTreeAry[i].render( matrix );
        }
    }

    // 
    //  DESC: Render interface menus
    //
    renderInterface( matrix )
    {
        if( this.active )
        {
            for( let i = 0; i < this.activeInterTreeAry.length; ++i )
                if( this.activeInterTreeAry[i].isActive() )
                    this.activeInterTreeAry[i].render( matrix );
        }
    }
    
    // 
    //  DESC: Is this standard menu system active?
    //
    isMenuActive()
    {
        if( this.active )
            for( let i = 0; i < this.activeMenuTreeAry.length; ++i )
                if( this.activeMenuTreeAry[i].isActive() )
                    return true;

        return false;
    }

    // 
    //  Is a menu item active
    //
    isMenuItemActive()
    {
        let result = false;

        if( this.active )
        {
            for( let i = 0; i < this.activeMenuTreeAry.length; ++i )
            {
                if( this.activeMenuTreeAry[i].isActive() )
                {
                    result = this.activeMenuTreeAry[i].isMenuItemActive();

                    break;
                }
            }
        }

        return result;
    }

    // 
    //  Is a interface item active
    //
    isInterfaceItemActive()
    {
        let result = false;

        if( this.active )
        {
            for( let i = 0; i < this.activeInterTreeAry.length; ++i )
            {
                if( this.activeInterTreeAry[i].isActive() )
                {
                    result = this.activeInterTreeAry[i].isMenuItemActive();

                    break;
                }
            }
        }

        return result;
    }

    // 
    //  Set the active state
    //
    setActiveState()
    {
        this.active = false;

        for( let i = 0; i < this.activeMenuTreeAry.length; ++i )
        {
            if( this.activeMenuTreeAry[i].isActive() )
            {
                this.active = true;
                break;
            }
        }

        if( !this.active )
        {
            for( let i = 0; i < this.activeInterTreeAry.length; ++i )
            {
                if( this.activeInterTreeAry[i].isActive() )
                {
                    this.active = true;
                    break;
                }
            }
        }
    }
    
    // 
    //  Get the menu in question
    //
    getMenu( name )
    {
        let menu = undefined;

        for( let [ groupKey, groupMap ] of this.menuMapMap.entries() )
        {
            menu = groupMap.get( name );
            if( menu !== undefined )
                break;
        }

        if( menu === undefined )
            throw new Error( `Menu being asked for is missing (${name})!` );

        return menu;
    }
    
    // 
    //  Get the reference to the control in question
    //
    getMenuControl( name, controlName )
    {
        let menu = this.getMenu( name );
        let control = menu.getControl( controlName );
        
        if( control === null )
            throw new Error( `Menu control being asked for is missing (${name})!` );

        return control;
    }

    // 
    //  Get the pointer to the active control - can return null
    //
    getActiveControl( name )
    {
        let menu = this.getMenu(name);
        return menu.GetActiveControl();
    }

    // 
    //  Get the first active menu
    //  NOTE: Only call this function if you are certain it will not fail
    //
    getActiveMenu()
    {
        let menu = null;

        for( let i = 0; i < this.activeMenuTreeAry.length; ++i )
        {
            if( this.activeMenuTreeAry[i].isActive() )
            {
                menu = this.activeMenuTreeAry[i].getActiveMenu();
                break;
            }
        }

        if( menu === null )
            throw new Error( 'There is no active menu!' );

        return menu;
    }

    // 
    //  Get a pointer to the active tree
    //
    getActiveTree()
    {
        let tree = null;

        for( let i = 0; i < this.activeMenuTreeAry.length; ++i )
        {
            if( this.activeMenuTreeAry[i].isActive() )
            {
                tree = this.activeMenuTreeAry[i];
                break;
            }
        }

        return tree;
    }

    // 
    //  Reset the transform
    //
    resetTransform()
    {
        for( let [ groupKey, groupMap ] of this.menuMapMap.entries() )
            for( let [ key, menu ] of groupMap.entries() )
                menu.forceTransform();
    }

    // 
    //  Reset the dynamic positions of menus
    //
    resetDynamicOffset()
    {
        for( let [ groupKey, groupMap ] of this.menuMapMap.entries() )
            for( let [ key, menu ] of groupMap.entries() )
                menu.resetDynamicPos();
    }
    
    // 
    //  DESC: allow event handling access function
    //
    get allowEventHandling() { return this.allow; }
    set allowEventHandling( value ) { this.allow = value; }
}

var menuManager = new MenuManager;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: timer.js
//  DESC:      timer class
//



class Timer
{
    constructor( interval = 0, startExpired = false )
    {
        // Expired time
        this.expiredTime = false;

        // time interval
        this.timeInterval = interval;

        // Disabled flag
        this.disabled = false;

        // Disabled return value.
        // This value allows a disabled timer to act as expired or not
        this.disableValue = false;
        
        if( startExpired )
            this.setExpired();
        else
            this.reset();
    }
    
    //
    //  DESC: Reset the timer to start over
    //
    reset()
    {
        this.expiredTime = this.timeInterval + performance.now();
        this.disabled = false;
    }

    //
    //  DESC: Set the time to have expired
    //
    setExpired()
    {
        this.expiredTime = performance.now();
    }

    //
    //  DESC: Set the timer interval
    //
    set( interval )
    {
        this.timeInterval = interval;
        this.reset();
    }

    //
    //  DESC: Has the timer expired?
    //
    expired( resetOnExpire )
    {
        // Has the timer been disabled
        if( this.disabled )
            return this.disableValue;

        let result = false;

        if( performance.now() > this.expiredTime )
        {
            result = true;

            if( resetOnExpire )
                this.reset();
        }

        return result;
    }

    //
    //  DESC: Disable this timer
    //
    disable( disabled )
    {
        this.disabled = disabled;
    }

    //
    //  DESC: Set the value returned by Expired when the timer is disabled
    //
    setDisableValue( disableValue )
    {
        this.disableValue = disableValue;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Timer;



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return betManager; });

// 
//  FILE NAME: betmanager.js
//  DESC:      Singleton to manage the bet
//



class BetManager
{
    constructor()
    {
        // line bet
        this.lineBet = 0;

        // Total bet
        this.totalBet = 0;

        // Total number of lines being bet
        this.totalLines = 0;

        // Total credits
        this.credits = 0;
    }
    
    //
    //  DESC: Set the line bet
    //
    setLineBet( lineBet )
    {
        this.lineBet = lineBet;
    }
    
    //
    //  DESC: Set the total lines being bet
    //
    setTotalLines( totalLines )
    {
        this.totalLines = totalLines;
    }

    //
    //  DESC: Set the total lines being bet
    //
    getTotalBet()
    {
        return this.lineBet * this.totalLines;
    }

    //
    //  DESC: Set/Get the total lines being bet
    //
    setCredits( credits )
    {
        this.credits = credits;
    }

    getCredits()
    {
        return this.credits;
    }

    //
    //  DESC: Is there anough credits to play?
    //
    allowPlay()
    {
        return ((this.credits > 0) && (this.credits >= this.getTotalBet()));
    }

    //
    //  DESC: Deduct the bet amount from the credits
    //
    deductBet()
    {
        if( this.allowPlay() )
            this.credits -= this.getTotalBet();
    }


    /************************************************************************
    *    desc:  Add in the award
    ************************************************************************/
    addAward( award )
    {
        this.credits += award;
    }
}

var betManager = new BetManager;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME:  vertex2d.js
//  DESC:       vertex 2d class
//



class Vertex2d
{
    constructor( x = 0, y = 0, z = 0, u = 0, v = 0 )
    {
        this.data = [x,y,z,u,v];
    }
    
    set x(value) { this.data[0] = value; }
    get x() { return this.data[0]; }
    
    set y(value) { this.data[1] = value; }
    get y() { return this.data[1]; }
    
    set z(value) { this.data[2] = value; }
    get z() { return this.data[2]; }
    
    set u(value) { this.data[3] = value; }
    get u() { return this.data[3]; }
    
    set v(value) { this.data[4] = value; }
    get v() { return this.data[4]; }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vertex2d;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uicontrol__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gui_uicontrolnavnode__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uicontrolfactory__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: uisubcontrol.js
//  DESC:      Class for user interface controls with sub-controls
//







class UISubControl extends __WEBPACK_IMPORTED_MODULE_0__uicontrol__["a" /* UIControl */]
{
    constructor( group )
    {
        super( group );
        
        this.type = __WEBPACK_IMPORTED_MODULE_3__common_defs__["O" /* ECT_SUB_CONTROL */];
        
        // Arry of sub-controls
        this.subControlAry = [];

        // Array list of navigation nodes
        this.controlNodeAry = [];

        // Current active node
        // NOTE: This variable does not own it's pointers.
        this.activeNode = null;

        // A sub control is a container for other controls so normally
        // it doesn't respont to select messages. There can be a case
        // where this control needs to respond.
        this.respondsToSelectMsg = false;
    }
    
    // 
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( node )
    {
        // Have the parent load it's stuff
        super.loadControlFromNode( node );

        // Get the sub-control settings
        let subControlSettingsNode = node.getElementsByTagName( 'subControlSettings' );
        if( subControlSettingsNode.length )
        {
            // Does this sub control respond to select? The default is false.
            let attr = subControlSettingsNode[0].getAttribute( 'respondsToSelectMsg' );
            if( attr === 'true' )
                this.respondsToSelectMsg = true;
        }

        // Get the menu controls node
        let controlListNode = node.getElementsByTagName( 'subControlList' );
        if( controlListNode.length )
        {
            // map to help setup the node pointers
            let navNodeMap = new Map;
            
            let controlNode = controlListNode[0].getElementsByTagName( 'control' );

            for( let i = 0; i < controlNode.length; ++i )
            {
                // The reference is placed within an array for all controls
                let control = __WEBPACK_IMPORTED_MODULE_2__uicontrolfactory__["a" /* create */]( controlNode[i], this.group );
                
                this.subControlAry.push( control );

                // Does this control have a name then create a node and add it to the map
                if( control.name )
                {
                    // Add a node to the vector with it's control
                    let navNode = new __WEBPACK_IMPORTED_MODULE_1__gui_uicontrolnavnode__["a" /* UIControlNavNode */]( control );
                    this.controlNodeAry.push( navNode );

                    // Map of menu control nodes
                    navNodeMap.set( control.name, navNode );
                }
            }

            // Find the reference nodes
            if( navNodeMap.size > 0 )
            {
                for( let i = 0; i < controlNode.length; ++i )
                    this.findNodes( controlNode[i], i, navNodeMap );
            }
        }
    }

    // 
    //  DESC: Init the control
    //
    init()
    {
        super.init();

        // Init all controls
        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].init();
    }

    // 
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        super.cleanUp();

        // Init all controls
        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].cleanUp();
    }

    // 
    //  DESC: Find the reference nodes
    //
    findNodes( node, nodeIndex, navNodeMap )
    {
        let navNode = node.getElementsByTagName( 'navigate' );
        if( navNode.length )
        {
            this.setNodes( navNode, nodeIndex, 'up',    __WEBPACK_IMPORTED_MODULE_3__common_defs__["_41" /* ENAV_NODE_UP */],    navNodeMap );
            this.setNodes( navNode, nodeIndex, 'down',  __WEBPACK_IMPORTED_MODULE_3__common_defs__["_38" /* ENAV_NODE_DOWN */],  navNodeMap );
            this.setNodes( navNode, nodeIndex, 'left',  __WEBPACK_IMPORTED_MODULE_3__common_defs__["_39" /* ENAV_NODE_LEFT */],  navNodeMap );
            this.setNodes( navNode, nodeIndex, 'right', __WEBPACK_IMPORTED_MODULE_3__common_defs__["_40" /* ENAV_NODE_RIGHT */], navNodeMap );
        }
    }

    // 
    //  DESC: Find the reference nodes
    //
    setNodes( node, nodeIndex, attrStr, navId, navNodeMap )
    {
        let attr = node[0].getAttribute( attrStr );
        if( attr )
        {
            let ctrlNode = navNodeMap.get( attr );
            if( ctrlNode !== undefined )
                this.controlNodeAry[nodeIndex].setNode( navId, ctrlNode );
            else
                throw new Error( `Control node doesn't exist! (${name})` );
        }
    }

    // 
    //  DESC: Update the control
    //
    update()
    {
        // Call the parent
        super.update();

        // Update all controls
        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].update();
    }

    // 
    //  DESC: Transform the control
    //
    doTransform( object )
    {
        // Call the parent
        super.doTransform( object );

        // Update all controls
        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].doTransform( this );
    }

    // 
    //  DESC: Render the sub control
    //
    render( matrix )
    {
        // Call the parent
        super.render( matrix );

        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].render( matrix );
    }

    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        // Call the parent
        super.handleEvent( event );

        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].handleEvent( event );

        if( this.isActive() && (event instanceof CustomEvent) )
        {
            if( (event.detail.type >= __WEBPACK_IMPORTED_MODULE_3__common_defs__["_17" /* EGE_MENU_UP_ACTION */]) &&
                (event.detail.type <= __WEBPACK_IMPORTED_MODULE_3__common_defs__["_2" /* EGE_MENU_RIGHT_ACTION */]) )
            {
                if( event.detail.type === __WEBPACK_IMPORTED_MODULE_3__common_defs__["_17" /* EGE_MENU_UP_ACTION */] )
                {
                    this.onUpAction( event );
                }
                else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_3__common_defs__["X" /* EGE_MENU_DOWN_ACTION */] )
                {
                    this.onDownAction( event );
                }
                if( event.detail.type === __WEBPACK_IMPORTED_MODULE_3__common_defs__["_0" /* EGE_MENU_LEFT_ACTION */] )
                {
                    this.onLeftAction( event );
                }
                else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_3__common_defs__["_2" /* EGE_MENU_RIGHT_ACTION */] )
                {
                    this.onRightAction( event );
                }
            }
            else if( (event.detail.type >= __WEBPACK_IMPORTED_MODULE_3__common_defs__["_6" /* EGE_MENU_SCROLL_UP */]) &&
                     (event.detail.type <= __WEBPACK_IMPORTED_MODULE_3__common_defs__["_5" /* EGE_MENU_SCROLL_RIGHT */]) )
            {
                if( event.detail.type === __WEBPACK_IMPORTED_MODULE_3__common_defs__["_6" /* EGE_MENU_SCROLL_UP */] )
                {
                    this.onUpScroll( event );
                }
                else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_3__common_defs__["_3" /* EGE_MENU_SCROLL_DOWN */] )
                {
                    this.onDownScroll( event );
                }
                else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_3__common_defs__["_4" /* EGE_MENU_SCROLL_LEFT */] )
                {
                    this.onLeftScroll( event );
                }
                else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_3__common_defs__["_5" /* EGE_MENU_SCROLL_RIGHT */] )
                {
                    this.onRightScroll( event );
                }
            }
            else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_3__common_defs__["_10" /* EGE_MENU_TAB_LEFT */] )
            {
                this.onTabLeft( event );
            }
            else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_3__common_defs__["_11" /* EGE_MENU_TAB_RIGHT */] )
            {
                this.onTabRight( event );
            }
        }
    }

    // 
    //  DESC: Handle OnUpAction message
    //
    onUpAction( event )
    {
        this.navigateMenu( __WEBPACK_IMPORTED_MODULE_3__common_defs__["_41" /* ENAV_NODE_UP */] );
    }

    // 
    //  DESC: Handle OnMenuDown message
    //
    onDownAction( event )
    {
        this.navigateMenu( __WEBPACK_IMPORTED_MODULE_3__common_defs__["_38" /* ENAV_NODE_DOWN */] );
    }

    // 
    //  DESC: Handle OnMenuLeft message
    //
    onLeftAction( event )
    {
        this.navigateMenu( __WEBPACK_IMPORTED_MODULE_3__common_defs__["_39" /* ENAV_NODE_LEFT */] );
    }

    // 
    //  DESC: Handle OnRightAction message
    //
    onRightAction( event )
    {
        this.navigateMenu( __WEBPACK_IMPORTED_MODULE_3__common_defs__["_40" /* ENAV_NODE_RIGHT */] );
    }

    // 
    //  DESC: Handle OnUpScroll message
    //
    onUpScroll( event )
    {
        this.navigateMenu( __WEBPACK_IMPORTED_MODULE_3__common_defs__["_41" /* ENAV_NODE_UP */] );
    }

    // 
    //  DESC: Handle OnUpScroll message
    //
    onDownScroll( event )
    {
        this.navigateMenu( __WEBPACK_IMPORTED_MODULE_3__common_defs__["_38" /* ENAV_NODE_DOWN */] );
    }

    // 
    //  DESC: Handle OnRightScroll message
    //
    onLeftScroll( event )
    {
        this.navigateMenu( __WEBPACK_IMPORTED_MODULE_3__common_defs__["_39" /* ENAV_NODE_LEFT */] );
    }

    // 
    //  DESC: Handle OnRightScroll message
    //
    onRightScroll( event )
    {
        this.navigateMenu( __WEBPACK_IMPORTED_MODULE_3__common_defs__["_40" /* ENAV_NODE_RIGHT */] );
    }

    // 
    //  DESC: Handle OnTabLeft message
    //
    onTabLeft( event )
    {
        // Do nothing
    }

    // 
    //  DESC: Handle OnTabRight message
    //
    onTabRight( event )
    {
        // Do nothing
    }

    // 
    //  DESC: Navigate the menu. Find the next control node that isn't
    //        disabled and make it the active control node
    //
    navigateMenu( navNode )
    {
        if( this.activeNode !== null )
        {
            let navNode = this.activeNode;

            do
            {
                navNode = navNode.getNode( navNode );
                
                if( navNode === null )
                {
                    break;
                }
                else if( !navNode.uiControl.isDisabled() )
                {
                    this.activeNode = navNode;

                    eventManager.dispatchEvent(
                        __WEBPACK_IMPORTED_MODULE_3__common_defs__["W" /* EGE_MENU_CONTROL_STATE_CHANGE */],
                        __WEBPACK_IMPORTED_MODULE_3__common_defs__["A" /* ECS_ACTIVE */],
                        navNode.uiControl );

                    break;
                }
            }
            while( true );
        }
    }

    // 
    //  DESC: Handle OnStateChange message
    //
    onStateChange( event )
    {
        if( this.respondsToSelectMsg )
        {
            super.onStateChange( event );
        }
        else
        {
            let state = event.detail.arg[__WEBPACK_IMPORTED_MODULE_3__common_defs__["_28" /* EMSC_STATE */]];

            let ctrl = this.findSubControlByRef( event.detail.arg[__WEBPACK_IMPORTED_MODULE_3__common_defs__["_27" /* EMSC_CONTROL */]] );

            // Restart the active state of the sub control if something
            // changed in the child controls or their children controls
            if( (state === __WEBPACK_IMPORTED_MODULE_3__common_defs__["A" /* ECS_ACTIVE */]) && (ctrl !== null) )
            {
                if( ctrl.state != state )
                {
                    this.setState(state, true);

                    this.resetSpriteScript();

                    this.setDisplayState();
                }
            }
            // The sub control doesn't respond to selected message
            else if( state < __WEBPACK_IMPORTED_MODULE_3__common_defs__["F" /* ECS_SELECTED */] )
                super.onStateChange( event );
        }
    }

    // 
    //  DESC: Reset and recycle the contexts
    //
    reset( complete )
    {
        super.reset( complete );
        
        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].reset( complete );
    }

    // 
    //  DESC: Handle the mouse move
    //
    onMouseMove( event )
    {
        let result = super.onMouseMove( event );

        let found = this.onSubControlMouseMove( event );

        // If the sub control is not found, deactivate them
        if( result && !found )
            this.deactivateSubControl();

        return result || found;
    }

    // 
    //  DESC: Handle the sub control mouse move
    //
    onSubControlMouseMove( event )
    {
        let result = false;

        for( let i = 0; i < this.subControlAry.length && !result; ++i )
            result = this.subControlAry[i].onMouseMove( event );

        return result;
    }

    // 
    //  DESC: Handle the select action
    //
    handleSelectAction( event )
    {
        if( this.respondsToSelectMsg )
        {
            return super.handleSelectAction( event );
        }
        else
        {
            for( let i = 0; i < this.subControlAry.length; ++i )
                if( this.subControlAry[i].handleSelectAction( event ) )
                    return true;
        }

        return false;
    }

    // 
    //  DESC: Get the reference to the control if found
    //
    findControlByName( name )
    {
        let ctrl = super.findControlByName( name );

        if( ctrl === null )
            ctrl = this.findSubControlByName( name );

        return ctrl;
    }

    findControlByRef( control )
    {
        let ctrl = super.findControlByRef( control );

        if( ctrl === null )
            ctrl = this.findSubControlByRef( control );

        return ctrl;
    }

    // 
    //  DESC: Get the pointer to the subcontrol if found
    //
    findSubControlByName( name )
    {
        let ctrl = null;

        for( let i = 0; i < this.subControlAry.length && !ctrl; ++i )
            ctrl = this.subControlAry[i].findControlByName( name );

        return ctrl;
    }

    findSubControlByRef( control )
    {
        let ctrl = null;

        for( let i = 0; i < this.subControlAry.length && !ctrl; ++i )
            ctrl = this.subControlAry[i].findControlByRef( control );

        return ctrl;
    }

    // 
    //  DESC: Set the first inactive control to be active
    //  NOTE: This is mainly here to be virtual for sub controls
    //
    activateFirstInactiveControl()
    {
        if( super.activateFirstInactiveControl() )
        {
            let found = false;

            for( let i = 0; i < this.controlNodeAry.length; ++i )
            {
                if( !found && this.controlNodeAry[i].uiControl.activateFirstInactiveControl() )
                {
                    this.activeNode = controlNodeAry[i];

                    found = true;
                }
                else
                {
                    this.controlNodeAry[i].uiControl.deactivateControl();
                }
            }

            return true;
        }

        return false;
    }
    
    baseActivateFirstInactiveControl()
    {
        return super.activateFirstInactiveControl();
    }

    // 
    //  DESC: Deactivate the control
    //
    deactivateControl()
    {
        super.deactivateControl();

        this.deactivateSubControl();
    }

    // 
    //  DESC: Deactivate the sub control
    //
    deactivateSubControl()
    {
        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].deactivateControl();
    }

    // 
    //  DESC: Check if control is a sub control
    //
    isSubControl()
    {
        return true;
    }

    // 
    //  DESC: Disable the control
    //
    disableControl()
    {
        super.disableControl();

        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].disableControl();
    }

    // 
    //  DESC: Enable the control to the inactive state
    //
    enableControl()
    {
        super.enableControl();

        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].enableControl();
    }

    // 
    //  DESC: Set the alpha value of this control
    //
    setAlpha( alpha )
    {
        super.setAlpha( alpha );

        for( let i = 0; i < this.subControlAry.length; ++i )
            this.subControlAry[i].setAlpha( alpha );
    }

    // 
    //  DESC: Get the pointer to the active control
    //  NOTE: This is mostly needed for sub controls
    //
    getActiveControl()
    {
        let result = null;

        for( let i = 0; i < this.subControlAry.length; ++i )
        {
            if( this.subControlAry[i].getState() > __WEBPACK_IMPORTED_MODULE_3__common_defs__["C" /* ECS_INACTIVE */] )
            {
                result = this.subControlAry[i].getActiveControl();
                break;
            }
        }
        
        return result;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UISubControl;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loadManager; });

// 
//  FILE NAME: loadmanager.js
//  DESC:      LoadManager class
//



class LoadManager
{
    constructor()
    {
        this.objects = [];
        this.loadCompleteCallback = null;
    }
    
    add(obj)
    {
        this.objects.push(obj);
    }
    
    load()
    {
        if( this.objects.length === 0 )
        {
            if( this.loadCompleteCallback === null )
                throw new Error( 'LoadManager: Load complete callback has not been set!' );
            else
                this.loadCompleteCallback();
        }
        else
        {
            let obj = this.objects.shift();
            obj( this.load.bind(this) );
        }
    }
}

var loadManager = new LoadManager;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_bitmask__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_defs__ = __webpack_require__(0);
// 
//  FILE NAME: dynamicoffset.js
//  DESC:      Dynamic Offset class
//







class DynamicOffset
{
    constructor()
    {
        // bit mask parameters
        this.parameters = new __WEBPACK_IMPORTED_MODULE_0__utilities_bitmask__["a" /* BitMask */];

        // offset
        this.point = new __WEBPACK_IMPORTED_MODULE_1__point__["a" /* Point */];
    }
    
    // 
    //  DESC: Add to the bit mask
    //
    add( value )
    {
        this.parameters.add( value );
    }

    // 
    //  Set/Get X
    //
    setX( value )
    {
        this.point.x = value;
    }

    setY( value )
    {
        this.point.y = value;
    }
    
    // 
    //  DESC: Is the dynamic offset being used
    //
    isEmpty()
    {
        return this.parameters.isEmpty();
    }
    
    // 
    //  DESC: Get the dynamic position
    //
    getPos( defaultHalfSize )
    {
        let pos = new __WEBPACK_IMPORTED_MODULE_1__point__["a" /* Point */];
        
        let halfSize = new __WEBPACK_IMPORTED_MODULE_2__size__["a" /* Size */]( defaultHalfSize.w, defaultHalfSize.h );
        
        // Strip out any fractional component for correct rendering
        halfSize.round();

        if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["R" /* EDO_LEFT */] ) )
            pos.x = -(halfSize.w - this.point.x);

        else if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["S" /* EDO_RIGHT */] ) )
            pos.x = halfSize.w - this.point.x;

        else if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["Q" /* EDO_HORZ_CENTER */] ) )
            pos.x = this.point.x;

        if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["T" /* EDO_TOP */] ) )
            pos.y = halfSize.h - this.point.y;
            
        else if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["P" /* EDO_BOTTOM */] ) )
            pos.y = -(halfSize.h - this.point.y);

        else if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["U" /* EDO_VERT_CENTER */] ) )
            pos.y = this.point.y;

        return pos;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DynamicOffset;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: bitmask.js
//  DESC:      Class to handle a bit mask
//



class BitMask
{
    constructor( value = 0 )
    {
        this.bitmask = value;
    }
    
    // 
    //  DESC: Add the parameters to the bitmask
    //
    add( args )
    {
        this.bitmask |= args;
    }

    // 
    //  DESC: Remove the parameters from the bitmask
    //
    remove( args )
    {
        this.bitmask &= args ^ -1;
    }

    // 
    //  DESC: Remove all parameters except for the ones passed in
    //
    removeAllExcept( args )
    {
        this.bitmask &= args;
    }

    // 
    //  DESC: Set the bitmask to zero
    //
    clear()
    {
        this.bitmask = 0;
    }
    
    // 
    //  DESC: Check if all of the parameters are set
    //
    isEmpty()
    {
        return (this.bitmask === 0);
    }

    // 
    //  DESC: Check if one of the parameters is set
    //
    isSet( args )
    {
        return (this.bitmask & args) !== 0;
    }

    // 
    //  DESC: Check if all of the parameters are set
    //
    areAllSet( args )
    {
        return (this.bitmask & args) === args;
    }

    // 
    //  DESC: Get a copy of the bitmask including the parameters
    //
    getIncluding( args )
    {
        return this.bitmask | args;
    }

    // 
    //  DESC: Get a copy of the bitmask excluding the parameters
    //
    getExcluding( args )
    {
        return this.bitmask & (args ^ -1);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BitMask;

    




/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/*
 * Planck.js v0.1.34
 * 
 * Copyright (c) 2016-2017 Ali Shakiba http://shakiba.me/planck.js
 * Copyright (c) 2006-2013 Erin Catto  http://www.gphysics.com
 * 
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * 
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */
!function(t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i;"undefined"!=typeof window?i=window:"undefined"!=typeof global?i=global:"undefined"!=typeof self&&(i=self),i.planck=t()}}(function(){return function t(i,o,e){function s(r,m){if(!o[r]){if(!i[r]){var a="function"==typeof require&&require;if(!m&&a)return require(r,!0);if(n)return n(r,!0);var h=new Error("Cannot find module '"+r+"'");throw h.code="MODULE_NOT_FOUND",h}var c=o[r]={exports:{}};i[r][0].call(c.exports,function(t){var o=i[r][1][t];return s(o?o:t)},c,c.exports,t,i,o,e)}return o[r].exports}for(var n="function"==typeof require&&require,r=0;r<e.length;r++)s(e[r]);return s}({1:[function(t,i,o){o.internal={},o.Math=t("./common/Math"),o.Vec2=t("./common/Vec2"),o.Transform=t("./common/Transform"),o.Rot=t("./common/Rot"),o.AABB=t("./collision/AABB"),o.Shape=t("./Shape"),o.Fixture=t("./Fixture"),o.Body=t("./Body"),o.Contact=t("./Contact"),o.Joint=t("./Joint"),o.World=t("./World"),o.Circle=t("./shape/CircleShape"),o.Edge=t("./shape/EdgeShape"),o.Polygon=t("./shape/PolygonShape"),o.Chain=t("./shape/ChainShape"),o.Box=t("./shape/BoxShape"),t("./shape/CollideCircle"),t("./shape/CollideEdgeCircle"),o.internal.CollidePolygons=t("./shape/CollidePolygon"),t("./shape/CollideCirclePolygone"),t("./shape/CollideEdgePolygon"),o.DistanceJoint=t("./joint/DistanceJoint"),o.FrictionJoint=t("./joint/FrictionJoint"),o.GearJoint=t("./joint/GearJoint"),o.MotorJoint=t("./joint/MotorJoint"),o.MouseJoint=t("./joint/MouseJoint"),o.PrismaticJoint=t("./joint/PrismaticJoint"),o.PulleyJoint=t("./joint/PulleyJoint"),o.RevoluteJoint=t("./joint/RevoluteJoint"),o.RopeJoint=t("./joint/RopeJoint"),o.WeldJoint=t("./joint/WeldJoint"),o.WheelJoint=t("./joint/WheelJoint"),o.internal.Sweep=t("./common/Sweep"),o.internal.stats=t("./common/stats"),o.internal.Manifold=t("./Manifold"),o.internal.Distance=t("./collision/Distance"),o.internal.TimeOfImpact=t("./collision/TimeOfImpact"),o.internal.DynamicTree=t("./collision/DynamicTree"),o.internal.Settings=t("./Settings")},{"./Body":2,"./Contact":3,"./Fixture":4,"./Joint":5,"./Manifold":6,"./Settings":7,"./Shape":8,"./World":10,"./collision/AABB":11,"./collision/Distance":13,"./collision/DynamicTree":14,"./collision/TimeOfImpact":15,"./common/Math":18,"./common/Rot":20,"./common/Sweep":21,"./common/Transform":22,"./common/Vec2":23,"./common/stats":26,"./joint/DistanceJoint":27,"./joint/FrictionJoint":28,"./joint/GearJoint":29,"./joint/MotorJoint":30,"./joint/MouseJoint":31,"./joint/PrismaticJoint":32,"./joint/PulleyJoint":33,"./joint/RevoluteJoint":34,"./joint/RopeJoint":35,"./joint/WeldJoint":36,"./joint/WheelJoint":37,"./shape/BoxShape":38,"./shape/ChainShape":39,"./shape/CircleShape":40,"./shape/CollideCircle":41,"./shape/CollideCirclePolygone":42,"./shape/CollideEdgeCircle":43,"./shape/CollideEdgePolygon":44,"./shape/CollidePolygon":45,"./shape/EdgeShape":46,"./shape/PolygonShape":47}],2:[function(t,i,o){function e(t,i){i=n(i,d),this.m_world=t,this.m_awakeFlag=i.awake,this.m_autoSleepFlag=i.allowSleep,this.m_bulletFlag=i.bullet,this.m_fixedRotationFlag=i.fixedRotation,this.m_activeFlag=i.active,this.m_islandFlag=!1,this.m_toiFlag=!1,this.m_userData=i.userData,this.m_type=i.type,this.m_type==y?(this.m_mass=1,this.m_invMass=1):(this.m_mass=0,this.m_invMass=0),this.m_I=0,this.m_invI=0,this.m_xf=h.identity(),this.m_xf.p=r.clone(i.position),this.m_xf.q.setAngle(i.angle),this.m_sweep=new a,this.m_sweep.setTransform(this.m_xf),this.c_velocity=new c,this.c_position=new _,this.m_force=r.zero(),this.m_torque=0,this.m_linearVelocity=r.clone(i.linearVelocity),this.m_angularVelocity=i.angularVelocity,this.m_linearDamping=i.linearDamping,this.m_angularDamping=i.angularDamping,this.m_gravityScale=i.gravityScale,this.m_sleepTime=0,this.m_jointList=null,this.m_contactList=null,this.m_fixtureList=null,this.m_prev=null,this.m_next=null}function s(){this.mass=0,this.center=r.zero(),this.I=0}DEBUG=!1,ASSERT=!1,i.exports=e;var n=(t("./util/common"),t("./util/options")),r=t("./common/Vec2"),m=t("./common/Rot"),a=(t("./common/Math"),t("./common/Sweep")),h=t("./common/Transform"),c=t("./common/Velocity"),_=t("./common/Position"),l=t("./Fixture"),u=(t("./Shape"),t("./World"),e.STATIC="static"),p=e.KINEMATIC="kinematic",y=e.DYNAMIC="dynamic",d={type:u,position:r.zero(),angle:0,linearVelocity:r.zero(),angularVelocity:0,linearDamping:0,angularDamping:0,fixedRotation:!1,bullet:!1,gravityScale:1,allowSleep:!0,awake:!0,active:!0,userData:null};e.prototype.isWorldLocked=function(){return!(!this.m_world||!this.m_world.isLocked())},e.prototype.getWorld=function(){return this.m_world},e.prototype.getNext=function(){return this.m_next},e.prototype.setUserData=function(t){this.m_userData=t},e.prototype.getUserData=function(){return this.m_userData},e.prototype.getFixtureList=function(){return this.m_fixtureList},e.prototype.getJointList=function(){return this.m_jointList},e.prototype.getContactList=function(){return this.m_contactList},e.prototype.isStatic=function(){return this.m_type==u},e.prototype.isDynamic=function(){return this.m_type==y},e.prototype.isKinematic=function(){return this.m_type==p},e.prototype.setStatic=function(){return this.setType(u),this},e.prototype.setDynamic=function(){return this.setType(y),this},e.prototype.setKinematic=function(){return this.setType(p),this},e.prototype.getType=function(){return this.m_type},e.prototype.setType=function(t){if(1!=this.isWorldLocked()&&this.m_type!=t){this.m_type=t,this.resetMassData(),this.m_type==u&&(this.m_linearVelocity.setZero(),this.m_angularVelocity=0,this.m_sweep.forward(),this.synchronizeFixtures()),this.setAwake(!0),this.m_force.setZero(),this.m_torque=0;for(var i=this.m_contactList;i;){var o=i;i=i.next,this.m_world.destroyContact(o.contact)}this.m_contactList=null;for(var e=this.m_world.m_broadPhase,s=this.m_fixtureList;s;s=s.m_next)for(var n=s.m_proxyCount,r=0;r<n;++r)e.touchProxy(s.m_proxies[r].proxyId)}},e.prototype.isBullet=function(){return this.m_bulletFlag},e.prototype.setBullet=function(t){this.m_bulletFlag=!!t},e.prototype.isSleepingAllowed=function(){return this.m_autoSleepFlag},e.prototype.setSleepingAllowed=function(t){this.m_autoSleepFlag=!!t,0==this.m_autoSleepFlag&&this.setAwake(!0)},e.prototype.isAwake=function(){return this.m_awakeFlag},e.prototype.setAwake=function(t){t?0==this.m_awakeFlag&&(this.m_awakeFlag=!0,this.m_sleepTime=0):(this.m_awakeFlag=!1,this.m_sleepTime=0,this.m_linearVelocity.setZero(),this.m_angularVelocity=0,this.m_force.setZero(),this.m_torque=0)},e.prototype.isActive=function(){return this.m_activeFlag},e.prototype.setActive=function(t){if(t!=this.m_activeFlag)if(this.m_activeFlag=!!t,this.m_activeFlag)for(var i=this.m_world.m_broadPhase,o=this.m_fixtureList;o;o=o.m_next)o.createProxies(i,this.m_xf);else{for(var i=this.m_world.m_broadPhase,o=this.m_fixtureList;o;o=o.m_next)o.destroyProxies(i);for(var e=this.m_contactList;e;){var s=e;e=e.next,this.m_world.destroyContact(s.contact)}this.m_contactList=null}},e.prototype.isFixedRotation=function(){return this.m_fixedRotationFlag},e.prototype.setFixedRotation=function(t){this.m_fixedRotationFlag!=t&&(this.m_fixedRotationFlag=!!t,this.m_angularVelocity=0,this.resetMassData())},e.prototype.getTransform=function(){return this.m_xf},e.prototype.setTransform=function(t,i){if(1!=this.isWorldLocked()){this.m_xf.set(t,i),this.m_sweep.setTransform(this.m_xf);for(var o=this.m_world.m_broadPhase,e=this.m_fixtureList;e;e=e.m_next)e.synchronize(o,this.m_xf,this.m_xf)}},e.prototype.synchronizeTransform=function(){this.m_sweep.getTransform(this.m_xf,1)},e.prototype.synchronizeFixtures=function(){var t=h.identity();this.m_sweep.getTransform(t,0);for(var i=this.m_world.m_broadPhase,o=this.m_fixtureList;o;o=o.m_next)o.synchronize(i,t,this.m_xf)},e.prototype.advance=function(t){this.m_sweep.advance(t),this.m_sweep.c.set(this.m_sweep.c0),this.m_sweep.a=this.m_sweep.a0,this.m_sweep.getTransform(this.m_xf,1)},e.prototype.getPosition=function(){return this.m_xf.p},e.prototype.setPosition=function(t){this.setTransform(t,this.m_sweep.a)},e.prototype.getAngle=function(){return this.m_sweep.a},e.prototype.setAngle=function(t){this.setTransform(this.m_xf.p,t)},e.prototype.getWorldCenter=function(){return this.m_sweep.c},e.prototype.getLocalCenter=function(){return this.m_sweep.localCenter},e.prototype.getLinearVelocity=function(){return this.m_linearVelocity},e.prototype.getLinearVelocityFromWorldPoint=function(t){var i=r.sub(t,this.m_sweep.c);return r.add(this.m_linearVelocity,r.cross(this.m_angularVelocity,i))},e.prototype.getLinearVelocityFromLocalPoint=function(t){return this.getLinearVelocityFromWorldPoint(this.getWorldPoint(t))},e.prototype.setLinearVelocity=function(t){this.m_type!=u&&(r.dot(t,t)>0&&this.setAwake(!0),this.m_linearVelocity.set(t))},e.prototype.getAngularVelocity=function(){return this.m_angularVelocity},e.prototype.setAngularVelocity=function(t){this.m_type!=u&&(t*t>0&&this.setAwake(!0),this.m_angularVelocity=t)},e.prototype.getLinearDamping=function(){return this.m_linearDamping},e.prototype.setLinearDamping=function(t){this.m_linearDamping=t},e.prototype.getAngularDamping=function(){return this.m_angularDamping},e.prototype.setAngularDamping=function(t){this.m_angularDamping=t},e.prototype.getGravityScale=function(){return this.m_gravityScale},e.prototype.setGravityScale=function(t){this.m_gravityScale=t},e.prototype.getMass=function(){return this.m_mass},e.prototype.getInertia=function(){return this.m_I+this.m_mass*r.dot(this.m_sweep.localCenter,this.m_sweep.localCenter)},e.prototype.getMassData=function(t){t.mass=this.m_mass,t.I=this.getInertia(),t.center.set(this.m_sweep.localCenter)},e.prototype.resetMassData=function(){if(this.m_mass=0,this.m_invMass=0,this.m_I=0,this.m_invI=0,this.m_sweep.localCenter.setZero(),this.isStatic()||this.isKinematic())return this.m_sweep.c0.set(this.m_xf.p),this.m_sweep.c.set(this.m_xf.p),void(this.m_sweep.a0=this.m_sweep.a);for(var t=r.zero(),i=this.m_fixtureList;i;i=i.m_next)if(0!=i.m_density){var o=new s;i.getMassData(o),this.m_mass+=o.mass,t.wAdd(o.mass,o.center),this.m_I+=o.I}this.m_mass>0?(this.m_invMass=1/this.m_mass,t.mul(this.m_invMass)):(this.m_mass=1,this.m_invMass=1),this.m_I>0&&0==this.m_fixedRotationFlag?(this.m_I-=this.m_mass*r.dot(t,t),this.m_invI=1/this.m_I):(this.m_I=0,this.m_invI=0);var e=r.clone(this.m_sweep.c);this.m_sweep.setLocalCenter(t,this.m_xf),this.m_linearVelocity.add(r.cross(this.m_angularVelocity,r.sub(this.m_sweep.c,e)))},e.prototype.setMassData=function(t){if(1!=this.isWorldLocked()&&this.m_type==y){this.m_invMass=0,this.m_I=0,this.m_invI=0,this.m_mass=t.mass,this.m_mass<=0&&(this.m_mass=1),this.m_invMass=1/this.m_mass,t.I>0&&0==this.m_fixedRotationFlag&&(this.m_I=t.I-this.m_mass*r.dot(t.center,t.center),this.m_invI=1/this.m_I);var i=r.clone(this.m_sweep.c);this.m_sweep.setLocalCenter(t.center,this.m_xf),this.m_linearVelocity.add(r.cross(this.m_angularVelocity,r.sub(this.m_sweep.c,i)))}},e.prototype.applyForce=function(t,i,o){this.m_type==y&&(o&&0==this.m_awakeFlag&&this.setAwake(!0),this.m_awakeFlag&&(this.m_force.add(t),this.m_torque+=r.cross(r.sub(i,this.m_sweep.c),t)))},e.prototype.applyForceToCenter=function(t,i){this.m_type==y&&(i&&0==this.m_awakeFlag&&this.setAwake(!0),this.m_awakeFlag&&this.m_force.add(t))},e.prototype.applyTorque=function(t,i){this.m_type==y&&(i&&0==this.m_awakeFlag&&this.setAwake(!0),this.m_awakeFlag&&(this.m_torque+=t))},e.prototype.applyLinearImpulse=function(t,i,o){this.m_type==y&&(o&&0==this.m_awakeFlag&&this.setAwake(!0),this.m_awakeFlag&&(this.m_linearVelocity.wAdd(this.m_invMass,t),this.m_angularVelocity+=this.m_invI*r.cross(r.sub(i,this.m_sweep.c),t)))},e.prototype.applyAngularImpulse=function(t,i){this.m_type==y&&(i&&0==this.m_awakeFlag&&this.setAwake(!0),this.m_awakeFlag&&(this.m_angularVelocity+=this.m_invI*t))},e.prototype.shouldCollide=function(t){if(this.m_type!=y&&t.m_type!=y)return!1;for(var i=this.m_jointList;i;i=i.next)if(i.other==t&&0==i.joint.m_collideConnected)return!1;return!0},e.prototype.createFixture=function(t,i){if(1==this.isWorldLocked())return null;var o=new l(this,t,i);if(this.m_activeFlag){var e=this.m_world.m_broadPhase;o.createProxies(e,this.m_xf)}return o.m_next=this.m_fixtureList,this.m_fixtureList=o,o.m_density>0&&this.resetMassData(),this.m_world.m_newFixture=!0,o},e.prototype.destroyFixture=function(t){if(1!=this.isWorldLocked()){for(var i=this.m_fixtureList,o=!1;null!=i;){if(i==t){i=t.m_next,o=!0;break}i=i.m_next}for(var e=this.m_contactList;e;){var s=e.contact;e=e.next;var n=s.getFixtureA(),r=s.getFixtureB();t!=n&&t!=r||this.m_world.destroyContact(s)}if(this.m_activeFlag){var m=this.m_world.m_broadPhase;t.destroyProxies(m)}t.m_body=null,t.m_next=null,this.m_world.publish("remove-fixture",t),this.resetMassData()}},e.prototype.getWorldPoint=function(t){return h.mul(this.m_xf,t)},e.prototype.getWorldVector=function(t){return m.mul(this.m_xf.q,t)},e.prototype.getLocalPoint=function(t){return h.mulT(this.m_xf,t)},e.prototype.getLocalVector=function(t){return m.mulT(this.m_xf.q,t)}},{"./Fixture":4,"./Shape":8,"./World":10,"./common/Math":18,"./common/Position":19,"./common/Rot":20,"./common/Sweep":21,"./common/Transform":22,"./common/Vec2":23,"./common/Velocity":25,"./util/common":50,"./util/options":52}],3:[function(t,i,o){function e(t){this.contact=t,this.prev,this.next,this.other}function s(t,i,o,s,n){this.m_nodeA=new e(this),this.m_nodeB=new e(this),this.m_fixtureA=t,this.m_fixtureB=o,this.m_indexA=i,this.m_indexB=s,this.m_evaluateFcn=n,this.m_manifold=new y,this.m_prev=null,this.m_next=null,this.m_toi=1,this.m_toiCount=0,this.m_toiFlag=!1,this.m_friction=r(this.m_fixtureA.m_friction,this.m_fixtureB.m_friction),this.m_restitution=m(this.m_fixtureA.m_restitution,this.m_fixtureB.m_restitution),this.m_tangentSpeed=0,this.m_enabledFlag=!0,this.m_islandFlag=!1,this.m_touchingFlag=!1,this.m_filterFlag=!1,this.m_bulletHitFlag=!1,this.v_points=[],this.v_normal=c.zero(),this.v_normalMass=new l,this.v_K=new l,this.v_pointCount,this.v_tangentSpeed,this.v_friction,this.v_restitution,this.v_invMassA,this.v_invMassB,this.v_invIA,this.v_invIB,this.p_localPoints=[],this.p_localNormal=c.zero(),this.p_localPoint=c.zero(),this.p_localCenterA=c.zero(),this.p_localCenterB=c.zero(),this.p_type,this.p_radiusA,this.p_radiusB,this.p_pointCount,this.p_invMassA,this.p_invMassB,this.p_invIA,this.p_invIB}function n(){this.rA=c.zero(),this.rB=c.zero(),this.normalImpulse=0,this.tangentImpulse=0,this.normalMass=0,this.tangentMass=0,this.velocityBias=0}function r(t,i){return h.sqrt(t*i)}function m(t,i){return t>i?t:i}DEBUG=!1,ASSERT=!1;var a=!1,h=(t("./util/common"),t("./common/Math")),c=t("./common/Vec2"),_=t("./common/Transform"),l=t("./common/Mat22"),u=t("./common/Rot"),p=t("./Settings"),y=t("./Manifold"),d=t("./collision/Distance");i.exports=s,s.prototype.initConstraint=function(t){var i=this.m_fixtureA,o=this.m_fixtureB,e=i.getShape(),s=o.getShape(),r=i.getBody(),m=o.getBody(),a=this.getManifold(),h=a.pointCount;this.v_invMassA=r.m_invMass,this.v_invMassB=m.m_invMass,this.v_invIA=r.m_invI,this.v_invIB=m.m_invI,this.v_friction=this.m_friction,this.v_restitution=this.m_restitution,this.v_tangentSpeed=this.m_tangentSpeed,this.v_pointCount=h,this.v_K.setZero(),this.v_normalMass.setZero(),this.p_invMassA=r.m_invMass,this.p_invMassB=m.m_invMass,this.p_invIA=r.m_invI,this.p_invIB=m.m_invI,this.p_localCenterA=c.clone(r.m_sweep.localCenter),this.p_localCenterB=c.clone(m.m_sweep.localCenter),this.p_radiusA=e.m_radius,this.p_radiusB=s.m_radius,this.p_type=a.type,this.p_localNormal=c.clone(a.localNormal),this.p_localPoint=c.clone(a.localPoint),this.p_pointCount=h;for(var _=0;_<h;++_){var l=a.points[_],u=this.v_points[_]=new n;t.warmStarting?(u.normalImpulse=t.dtRatio*l.normalImpulse,u.tangentImpulse=t.dtRatio*l.tangentImpulse):(u.normalImpulse=0,u.tangentImpulse=0),u.rA.setZero(),u.rB.setZero(),u.normalMass=0,u.tangentMass=0,u.velocityBias=0,this.p_localPoints[_]=c.clone(l.localPoint)}},s.prototype.getManifold=function(){return this.m_manifold},s.prototype.getWorldManifold=function(t){var i=this.m_fixtureA.getBody(),o=this.m_fixtureB.getBody(),e=this.m_fixtureA.getShape(),s=this.m_fixtureB.getShape();return this.m_manifold.getWorldManifold(t,i.getTransform(),e.m_radius,o.getTransform(),s.m_radius)},s.prototype.setEnabled=function(t){this.m_enabledFlag=!!t},s.prototype.isEnabled=function(){return this.m_enabledFlag},s.prototype.isTouching=function(){return this.m_touchingFlag},s.prototype.getNext=function(){return this.m_next},s.prototype.getFixtureA=function(){return this.m_fixtureA},s.prototype.getFixtureB=function(){return this.m_fixtureB},s.prototype.getChildIndexA=function(){return this.m_indexA},s.prototype.getChildIndexB=function(){return this.m_indexB},s.prototype.flagForFiltering=function(){this.m_filterFlag=!0},s.prototype.setFriction=function(t){this.m_friction=t},s.prototype.getFriction=function(){return this.m_friction},s.prototype.resetFriction=function(){this.m_friction=r(this.m_fixtureA.m_friction,this.m_fixtureB.m_friction)},s.prototype.setRestitution=function(t){this.m_restitution=t},s.prototype.getRestitution=function(){return this.m_restitution},s.prototype.resetRestitution=function(){this.m_restitution=m(this.m_fixtureA.m_restitution,this.m_fixtureB.m_restitution)},s.prototype.setTangentSpeed=function(t){this.m_tangentSpeed=t},s.prototype.getTangentSpeed=function(){return this.m_tangentSpeed},s.prototype.evaluate=function(t,i,o){this.m_evaluateFcn(t,i,this.m_fixtureA,this.m_indexA,o,this.m_fixtureB,this.m_indexB)},s.prototype.update=function(t){this.m_enabledFlag=!0;var i=!1,o=this.m_touchingFlag,e=this.m_fixtureA.isSensor(),s=this.m_fixtureB.isSensor(),n=e||s,r=this.m_fixtureA.getBody(),m=this.m_fixtureB.getBody(),a=r.getTransform(),h=m.getTransform();if(n){var c=this.m_fixtureA.getShape(),_=this.m_fixtureB.getShape();i=d.testOverlap(c,this.m_indexA,_,this.m_indexB,a,h),this.m_manifold.pointCount=0}else{var l=this.m_manifold;this.m_manifold=new y,this.evaluate(this.m_manifold,a,h),i=this.m_manifold.pointCount>0;for(var u=0;u<this.m_manifold.pointCount;++u){var p=this.m_manifold.points[u];p.normalImpulse=0,p.tangentImpulse=0;for(var v=0;v<l.pointCount;++v){var f=l.points[v];if(f.id.key==p.id.key){p.normalImpulse=f.normalImpulse,p.tangentImpulse=f.tangentImpulse;break}}}i!=o&&(r.setAwake(!0),m.setAwake(!0))}this.m_touchingFlag=i,0==o&&1==i&&t&&t.beginContact(this),1==o&&0==i&&t&&t.endContact(this),0==n&&i&&t&&t.preSolve(this,l)},s.prototype.solvePositionConstraint=function(t){return this._solvePositionConstraint(t,!1)},s.prototype.solvePositionConstraintTOI=function(t,i,o){return this._solvePositionConstraint(t,!0,i,o)},s.prototype._solvePositionConstraint=function(t,i,o,e){var s=this.m_fixtureA,n=this.m_fixtureB,r=s.getBody(),m=n.getBody(),a=(r.c_velocity,m.c_velocity,r.c_position),l=m.c_position,d=c.clone(this.p_localCenterA),v=c.clone(this.p_localCenterB),f=0,A=0;i&&r!=o&&r!=e||(f=this.p_invMassA,A=this.p_invIA);var x=0,g=0;i&&m!=o&&m!=e||(x=this.p_invMassB,g=this.p_invIB);for(var b=c.clone(a.c),B=a.a,w=c.clone(l.c),S=l.a,C=0,M=0;M<this.p_pointCount;++M){var I=_.identity(),T=_.identity();I.q.set(B),T.q.set(S),I.p=c.sub(b,u.mul(I.q,d)),T.p=c.sub(w,u.mul(T.q,v));var P,V,z;switch(this.p_type){case y.e_circles:var L=_.mul(I,this.p_localPoint),R=_.mul(T,this.p_localPoints[0]);P=c.sub(R,L),P.normalize(),V=c.wAdd(.5,L,.5,R),z=c.dot(c.sub(R,L),P)-this.p_radiusA-this.p_radiusB;break;case y.e_faceA:P=u.mul(I.q,this.p_localNormal);var F=_.mul(I,this.p_localPoint),D=_.mul(T,this.p_localPoints[M]);z=c.dot(c.sub(D,F),P)-this.p_radiusA-this.p_radiusB,V=D;break;case y.e_faceB:P=u.mul(T.q,this.p_localNormal);var F=_.mul(T,this.p_localPoint),D=_.mul(I,this.p_localPoints[M]);z=c.dot(c.sub(D,F),P)-this.p_radiusA-this.p_radiusB,V=D,P.mul(-1)}var q=c.sub(V,b),E=c.sub(V,w);C=h.min(C,z);var k=i?p.toiBaugarte:p.baumgarte,j=p.linearSlop,J=p.maxLinearCorrection,O=h.clamp(k*(z+j),-J,0),N=c.cross(q,P),G=c.cross(E,P),U=f+x+A*N*N+g*G*G,W=U>0?-O/U:0,Y=c.mul(W,P);b.wSub(f,Y),B-=A*c.cross(q,Y),w.wAdd(x,Y),S+=g*c.cross(E,Y)}return a.c.set(b),a.a=B,l.c.set(w),l.a=S,C},s.prototype.initVelocityConstraint=function(t){var i=this.m_fixtureA,o=this.m_fixtureB,e=i.getBody(),s=o.getBody(),n=e.c_velocity,r=s.c_velocity,m=e.c_position,a=s.c_position,h=this.p_radiusA,l=this.p_radiusB,y=this.getManifold(),d=this.v_invMassA,v=this.v_invMassB,f=this.v_invIA,A=this.v_invIB,x=c.clone(this.p_localCenterA),g=c.clone(this.p_localCenterB),b=c.clone(m.c),B=m.a,w=c.clone(n.v),S=n.w,C=c.clone(a.c),M=a.a,I=c.clone(r.v),T=r.w,P=_.identity(),V=_.identity();P.q.set(B),V.q.set(M),P.p.wSet(1,b,-1,u.mul(P.q,x)),V.p.wSet(1,C,-1,u.mul(V.q,g));var z=y.getWorldManifold(null,P,h,V,l);this.v_normal.set(z.normal);for(var L=0;L<this.v_pointCount;++L){var R=this.v_points[L];R.rA.set(c.sub(z.points[L],b)),R.rB.set(c.sub(z.points[L],C));var F=c.cross(R.rA,this.v_normal),D=c.cross(R.rB,this.v_normal),q=d+v+f*F*F+A*D*D;R.normalMass=q>0?1/q:0;var E=c.cross(this.v_normal,1),k=c.cross(R.rA,E),j=c.cross(R.rB,E),J=d+v+f*k*k+A*j*j;R.tangentMass=J>0?1/J:0,R.velocityBias=0;var O=c.dot(this.v_normal,I)+c.dot(this.v_normal,c.cross(T,R.rB))-c.dot(this.v_normal,w)-c.dot(this.v_normal,c.cross(S,R.rA));O<-p.velocityThreshold&&(R.velocityBias=-this.v_restitution*O)}if(2==this.v_pointCount&&t.blockSolve){var N=this.v_points[0],G=this.v_points[1],U=c.cross(N.rA,this.v_normal),W=c.cross(N.rB,this.v_normal),Y=c.cross(G.rA,this.v_normal),H=c.cross(G.rB,this.v_normal),Z=d+v+f*U*U+A*W*W,K=d+v+f*Y*Y+A*H*H,X=d+v+f*U*Y+A*W*H,Q=1e3;Z*Z<Q*(Z*K-X*X)?(this.v_K.ex.set(Z,X),this.v_K.ey.set(X,K),this.v_normalMass.set(this.v_K.getInverse())):this.v_pointCount=1}m.c.set(b),m.a=B,n.v.set(w),n.w=S,a.c.set(C),a.a=M,r.v.set(I),r.w=T},s.prototype.warmStartConstraint=function(t){for(var i=this.m_fixtureA,o=this.m_fixtureB,e=i.getBody(),s=o.getBody(),n=e.c_velocity,r=s.c_velocity,m=(e.c_position,s.c_position,this.v_invMassA),a=this.v_invIA,h=this.v_invMassB,_=this.v_invIB,l=c.clone(n.v),u=n.w,p=c.clone(r.v),y=r.w,d=this.v_normal,v=c.cross(d,1),f=0;f<this.v_pointCount;++f){var A=this.v_points[f],x=c.wAdd(A.normalImpulse,d,A.tangentImpulse,v);u-=a*c.cross(A.rA,x),l.wSub(m,x),y+=_*c.cross(A.rB,x),p.wAdd(h,x)}n.v.set(l),n.w=u,r.v.set(p),r.w=y},s.prototype.storeConstraintImpulses=function(t){for(var i=this.m_manifold,o=0;o<this.v_pointCount;++o)i.points[o].normalImpulse=this.v_points[o].normalImpulse,i.points[o].tangentImpulse=this.v_points[o].tangentImpulse},s.prototype.solveVelocityConstraint=function(t){for(var i=this.m_fixtureA.m_body,o=this.m_fixtureB.m_body,e=i.c_velocity,s=(i.c_position,o.c_velocity),n=(o.c_position,this.v_invMassA),r=this.v_invIA,m=this.v_invMassB,_=this.v_invIB,u=c.clone(e.v),p=e.w,y=c.clone(s.v),d=s.w,v=this.v_normal,f=c.cross(v,1),A=this.v_friction,x=0;x<this.v_pointCount;++x){var g=this.v_points[x],b=c.zero();b.wAdd(1,y,1,c.cross(d,g.rB)),b.wSub(1,u,1,c.cross(p,g.rA));var B=c.dot(b,f)-this.v_tangentSpeed,w=g.tangentMass*-B,S=A*g.normalImpulse,C=h.clamp(g.tangentImpulse+w,-S,S);w=C-g.tangentImpulse,g.tangentImpulse=C;var M=c.mul(w,f);u.wSub(n,M),p-=r*c.cross(g.rA,M),y.wAdd(m,M),d+=_*c.cross(g.rB,M)}if(1==this.v_pointCount||0==t.blockSolve)for(var I=0;I<this.v_pointCount;++I){var g=this.v_points[I],b=c.zero();b.wAdd(1,y,1,c.cross(d,g.rB)),b.wSub(1,u,1,c.cross(p,g.rA));var T=c.dot(b,v),w=-g.normalMass*(T-g.velocityBias),C=h.max(g.normalImpulse+w,0);w=C-g.normalImpulse,g.normalImpulse=C;var M=c.mul(w,v);u.wSub(n,M),p-=r*c.cross(g.rA,M),y.wAdd(m,M),d+=_*c.cross(g.rB,M)}else{var P=this.v_points[0],V=this.v_points[1],z=c.neo(P.normalImpulse,V.normalImpulse),L=c.zero().add(y).add(c.cross(d,P.rB)).sub(u).sub(c.cross(p,P.rA)),R=c.zero().add(y).add(c.cross(d,V.rB)).sub(u).sub(c.cross(p,V.rA)),F=c.dot(L,v),D=c.dot(R,v),q=c.neo(F-P.velocityBias,D-V.velocityBias);q.sub(l.mul(this.v_K,z));for(;;){var E=c.neg(l.mul(this.v_normalMass,q));if(E.x>=0&&E.y>=0){var k=c.sub(E,z),j=c.mul(k.x,v),J=c.mul(k.y,v);u.wSub(n,j,n,J),p-=r*(c.cross(P.rA,j)+c.cross(V.rA,J)),y.wAdd(m,j,m,J),d+=_*(c.cross(P.rB,j)+c.cross(V.rB,J)),P.normalImpulse=E.x,V.normalImpulse=E.y,a&&(L=y+c.cross(d,P.rB)-u-c.cross(p,P.rA),R=y+c.cross(d,V.rB)-u-c.cross(p,V.rA),F=Dot(L,v),D=Dot(R,v));break}if(E.x=-P.normalMass*q.x,E.y=0,F=0,D=this.v_K.ex.y*E.x+q.y,E.x>=0&&D>=0){var k=c.sub(E,z),j=c.mul(k.x,v),J=c.mul(k.y,v);if(u.wSub(n,j,n,J),p-=r*(c.cross(P.rA,j)+c.cross(V.rA,J)),y.wAdd(m,j,m,J),d+=_*(c.cross(P.rB,j)+c.cross(V.rB,J)),P.normalImpulse=E.x,V.normalImpulse=E.y,a){var O=c.add(y,c.cross(d,P.rB)),N=c.add(u,c.cross(p,P.rA)),L=c.sub(O,N);F=c.dot(L,v)}break}if(E.x=0,E.y=-V.normalMass*q.y,F=this.v_K.ey.x*E.y+q.x,D=0,E.y>=0&&F>=0){var k=c.sub(E,z),j=c.mul(k.x,v),J=c.mul(k.y,v);if(u.wSub(n,j,n,J),p-=r*(c.cross(P.rA,j)+c.cross(V.rA,J)),y.wAdd(m,j,m,J),d+=_*(c.cross(P.rB,j)+c.cross(V.rB,J)),P.normalImpulse=E.x,V.normalImpulse=E.y,a){var G=c.add(y,c.cross(d,V.rB)),U=c.add(u,c.cross(p,V.rA)),L=c.sub(G,U);D=c.dot(R,v)}break}if(E.x=0,E.y=0,F=q.x,D=q.y,F>=0&&D>=0){var k=c.sub(E,z),j=c.mul(k.x,v),J=c.mul(k.y,v);u.wSub(n,j,n,J),p-=r*(c.cross(P.rA,j)+c.cross(V.rA,J)),y.wAdd(m,j,m,J),d+=_*(c.cross(P.rB,j)+c.cross(V.rB,J)),P.normalImpulse=E.x,V.normalImpulse=E.y;break}break}}e.v.set(u),e.w=p,s.v.set(y),s.w=d};var v=[];s.addType=function(t,i,o){v[t]=v[t]||{},v[t][i]=o},s.create=function(t,i,o,e){var n,r,m=t.getType(),a=o.getType();if(r=v[m]&&v[m][a])n=new s(t,i,o,e,r);else{if(!(r=v[a]&&v[a][m]))return null;n=new s(o,e,t,i,r)}t=n.getFixtureA(),o=n.getFixtureB(),i=n.getChildIndexA(),e=n.getChildIndexB();var h=t.getBody(),c=o.getBody();return n.m_nodeA.contact=n,n.m_nodeA.other=c,n.m_nodeA.prev=null,n.m_nodeA.next=h.m_contactList,null!=h.m_contactList&&(h.m_contactList.prev=n.m_nodeA),h.m_contactList=n.m_nodeA,n.m_nodeB.contact=n,n.m_nodeB.other=h,n.m_nodeB.prev=null,n.m_nodeB.next=c.m_contactList,null!=c.m_contactList&&(c.m_contactList.prev=n.m_nodeB),c.m_contactList=n.m_nodeB,0==t.isSensor()&&0==o.isSensor()&&(h.setAwake(!0),c.setAwake(!0)),n},s.destroy=function(t,i){var o=t.m_fixtureA,e=t.m_fixtureB,s=o.getBody(),n=e.getBody();t.isTouching()&&i.endContact(t),t.m_nodeA.prev&&(t.m_nodeA.prev.next=t.m_nodeA.next),t.m_nodeA.next&&(t.m_nodeA.next.prev=t.m_nodeA.prev),t.m_nodeA==s.m_contactList&&(s.m_contactList=t.m_nodeA.next),t.m_nodeB.prev&&(t.m_nodeB.prev.next=t.m_nodeB.next),t.m_nodeB.next&&(t.m_nodeB.next.prev=t.m_nodeB.prev),t.m_nodeB==n.m_contactList&&(n.m_contactList=t.m_nodeB.next),t.m_manifold.pointCount>0&&0==o.isSensor()&&0==e.isSensor()&&(s.setAwake(!0),n.setAwake(!0));var r=o.getType(),m=e.getType(),a=v[r][m].destroyFcn;"function"==typeof a&&a(t)}},{"./Manifold":6,"./Settings":7,"./collision/Distance":13,"./common/Mat22":16,"./common/Math":18,"./common/Rot":20,"./common/Transform":22,"./common/Vec2":23,"./util/common":50}],4:[function(t,i,o){function e(t,i){this.aabb=new m,this.fixture=t,this.childIndex=i,this.proxyId}function s(t,i,o){i.shape?(o=i,i=i.shape):"number"==typeof o&&(o={density:o}),o=n(o,a),this.m_body=t,this.m_friction=o.friction,this.m_restitution=o.restitution,this.m_density=o.density,this.m_isSensor=o.isSensor,this.m_filterGroupIndex=o.filterGroupIndex,this.m_filterCategoryBits=o.filterCategoryBits,this.m_filterMaskBits=o.filterMaskBits,this.m_shape=i,this.m_next=null,this.m_proxies=[],this.m_proxyCount=0;for(var s=this.m_shape.getChildCount(),r=0;r<s;++r)this.m_proxies[r]=new e(this,r);this.m_userData=o.userData}DEBUG=!1,ASSERT=!1,i.exports=s;var n=(t("./util/common"),t("./util/options")),r=t("./common/Vec2"),m=t("./collision/AABB"),a={userData:null,friction:.2,restitution:0,density:0,isSensor:!1,filterGroupIndex:0,filterCategoryBits:1,filterMaskBits:65535};s.prototype.getType=function(){return this.m_shape.getType()},s.prototype.getShape=function(){return this.m_shape},s.prototype.isSensor=function(){return this.m_isSensor},s.prototype.setSensor=function(t){t!=this.m_isSensor&&(this.m_body.setAwake(!0),this.m_isSensor=t)},s.prototype.getUserData=function(){return this.m_userData},s.prototype.setUserData=function(t){this.m_userData=t},s.prototype.getBody=function(){return this.m_body},s.prototype.getNext=function(){return this.m_next},s.prototype.getDensity=function(){return this.m_density},s.prototype.setDensity=function(t){this.m_density=t},s.prototype.getFriction=function(){return this.m_friction},s.prototype.setFriction=function(t){this.m_friction=t},s.prototype.getRestitution=function(){return this.m_restitution},s.prototype.setRestitution=function(t){this.m_restitution=t},s.prototype.testPoint=function(t){return this.m_shape.testPoint(this.m_body.getTransform(),t)},s.prototype.rayCast=function(t,i,o){return this.m_shape.rayCast(t,i,this.m_body.getTransform(),o)},s.prototype.getMassData=function(t){this.m_shape.computeMass(t,this.m_density)},s.prototype.getAABB=function(t){return this.m_proxies[t].aabb},s.prototype.createProxies=function(t,i){this.m_proxyCount=this.m_shape.getChildCount();for(var o=0;o<this.m_proxyCount;++o){var e=this.m_proxies[o];this.m_shape.computeAABB(e.aabb,i,o),e.proxyId=t.createProxy(e.aabb,e)}},s.prototype.destroyProxies=function(t){for(var i=0;i<this.m_proxyCount;++i){var o=this.m_proxies[i];t.destroyProxy(o.proxyId),o.proxyId=null}this.m_proxyCount=0},s.prototype.synchronize=function(t,i,o){for(var e=0;e<this.m_proxyCount;++e){var s=this.m_proxies[e],n=new m,a=new m;this.m_shape.computeAABB(n,i,s.childIndex),this.m_shape.computeAABB(a,o,s.childIndex),s.aabb.combine(n,a);var h=r.sub(o.p,i.p);t.moveProxy(s.proxyId,s.aabb,h)}},s.prototype.setFilterData=function(t){this.m_filterGroupIndex=t.groupIndex,this.m_filterCategoryBits=t.categoryBits,this.m_filterMaskBits=t.maskBits,this.refilter()},s.prototype.getFilterGroupIndex=function(){return this.m_filterGroupIndex},s.prototype.getFilterCategoryBits=function(){return this.m_filterCategoryBits},s.prototype.getFilterMaskBits=function(){return this.m_filterMaskBits},s.prototype.refilter=function(){if(null!=this.m_body){for(var t=this.m_body.getContactList();t;){var i=t.contact,o=i.getFixtureA(),e=i.getFixtureB();o!=this&&e!=this||i.flagForFiltering(),t=t.next}var s=this.m_body.getWorld();if(null!=s)for(var n=s.m_broadPhase,r=0;r<this.m_proxyCount;++r)n.touchProxy(this.m_proxies[r].proxyId)}},s.prototype.shouldCollide=function(t){if(t.m_filterGroupIndex==this.m_filterGroupIndex&&0!=t.m_filterGroupIndex)return t.m_filterGroupIndex>0;var i=0!=(t.m_filterMaskBits&this.m_filterCategoryBits)&&0!=(t.m_filterCategoryBits&this.m_filterMaskBits);return i}},{"./collision/AABB":11,"./common/Vec2":23,"./util/common":50,"./util/options":52}],5:[function(t,i,o){function e(){this.other=null,this.joint=null,this.prev=null,this.next=null}function s(t,i,o){i=t.bodyA||i,o=t.bodyB||o,this.m_type="unknown-joint",this.m_bodyA=i,this.m_bodyB=o,this.m_index=0,this.m_collideConnected=!!t.collideConnected,this.m_prev=null,this.m_next=null,this.m_edgeA=new e,this.m_edgeB=new e,this.m_islandFlag=!1,this.m_userData=t.userData}DEBUG=!1,ASSERT=!1,i.exports=s;t("./util/common");s.prototype.isActive=function(){return this.m_bodyA.isActive()&&this.m_bodyB.isActive()},s.prototype.getType=function(){return this.m_type},s.prototype.getBodyA=function(){return this.m_bodyA},s.prototype.getBodyB=function(){return this.m_bodyB},s.prototype.getNext=function(){return this.m_next},s.prototype.getUserData=function(){return this.m_userData},s.prototype.setUserData=function(t){this.m_userData=t},s.prototype.getCollideConnected=function(){return this.m_collideConnected},s.prototype.getAnchorA=function(){},s.prototype.getAnchorB=function(){},s.prototype.getReactionForce=function(t){},s.prototype.getReactionTorque=function(t){},s.prototype.shiftOrigin=function(t){},s.prototype.initVelocityConstraints=function(t){},s.prototype.solveVelocityConstraints=function(t){},s.prototype.solvePositionConstraints=function(t){}},{"./util/common":50}],6:[function(t,i,o){function e(){this.type,this.localNormal=_.zero(),this.localPoint=_.zero(),
this.points=[new s,new s],this.pointCount=0}function s(){this.localPoint=_.zero(),this.normalImpulse=0,this.tangentImpulse=0,this.id=new n}function n(){this.cf=new r,this.key}function r(){this.indexA,this.indexB,this.typeA,this.typeB}function m(){this.normal,this.points=[],this.separations=[]}function a(t,i,o,e){for(var s=0;s<o.pointCount;++s){var n=o.points[s].id;t[s]=y.removeState;for(var r=0;r<e.pointCount;++r)if(e.points[r].id.key==n.key){t[s]=y.persistState;break}}for(var s=0;s<e.pointCount;++s){var n=e.points[s].id;i[s]=y.addState;for(var r=0;r<o.pointCount;++r)if(o.points[r].id.key==n.key){i[s]=y.persistState;break}}}function h(){this.v=_.zero(),this.id=new n}function c(t,i,o,e,s){var n=0,m=_.dot(o,i[0].v)-e,a=_.dot(o,i[1].v)-e;if(m<=0&&t[n++].set(i[0]),a<=0&&t[n++].set(i[1]),m*a<0){var h=m/(m-a);t[n].v.wSet(1-h,i[0].v,h,i[1].v),t[n].id.cf.indexA=s,t[n].id.cf.indexB=i[0].id.cf.indexB,t[n].id.cf.typeA=r.e_vertex,t[n].id.cf.typeB=r.e_face,++n}return n}DEBUG=!1,ASSERT=!1;var _=(t("./util/common"),t("./common/Vec2")),l=t("./common/Transform"),u=t("./common/Math"),p=t("./common/Rot");i.exports=e,i.exports.clipSegmentToLine=c,i.exports.clipVertex=h,i.exports.getPointStates=a,i.exports.PointState=y,e.e_circles=0,e.e_faceA=1,e.e_faceB=2,e.e_vertex=0,e.e_face=1,n.prototype.set=function(t){this.key=t.key,this.cf.set(t.cf)},r.prototype.set=function(t){this.indexA=t.indexA,this.indexB=t.indexB,this.typeA=t.typeA,this.typeB=t.typeB},e.prototype.getWorldManifold=function(t,i,o,s,n){if(0!=this.pointCount){t=t||new m;var r=t.normal,a=t.points,h=t.separations;switch(this.type){case e.e_circles:r=_.neo(1,0);var c=l.mul(i,this.localPoint),y=l.mul(s,this.points[0].localPoint),d=_.sub(y,c);_.lengthSquared(d)>u.EPSILON*u.EPSILON&&(r.set(d),r.normalize()),a[0]=_.mid(c,y),h[0]=-n-o,a.length=1,h.length=1;break;case e.e_faceA:r=p.mul(i.q,this.localNormal);for(var v=l.mul(i,this.localPoint),f=0;f<this.pointCount;++f){var A=l.mul(s,this.points[f].localPoint),x=_.clone(A).wAdd(o-_.dot(_.sub(A,v),r),r),g=_.clone(A).wSub(n,r);a[f]=_.mid(x,g),h[f]=_.dot(_.sub(g,x),r)}a.length=this.pointCount,h.length=this.pointCount;break;case e.e_faceB:r=p.mul(s.q,this.localNormal);for(var v=l.mul(s,this.localPoint),f=0;f<this.pointCount;++f){var A=l.mul(i,this.points[f].localPoint),g=_.zero().wSet(1,A,n-_.dot(_.sub(A,v),r),r),x=_.zero().wSet(1,A,-o,r);a[f]=_.mid(x,g),h[f]=_.dot(_.sub(x,g),r)}a.length=this.pointCount,h.length=this.pointCount,r.mul(-1)}return t.normal=r,t.points=a,t.separations=h,t}};var y={nullState:0,addState:1,persistState:2,removeState:3};h.prototype.set=function(t){this.v.set(t.v),this.id.set(t.id)}},{"./common/Math":18,"./common/Rot":20,"./common/Transform":22,"./common/Vec2":23,"./util/common":50}],7:[function(t,i,o){DEBUG=!1,ASSERT=!1;var e=o;e.maxManifoldPoints=2,e.maxPolygonVertices=12,e.aabbExtension=.1,e.aabbMultiplier=2,e.linearSlop=.005,e.linearSlopSquared=e.linearSlop*e.linearSlop,e.angularSlop=2/180*Math.PI,e.polygonRadius=2*e.linearSlop,e.maxSubSteps=8,e.maxTOIContacts=32,e.maxTOIIterations=20,e.maxDistnceIterations=20,e.velocityThreshold=1,e.maxLinearCorrection=.2,e.maxAngularCorrection=8/180*Math.PI,e.maxTranslation=2,e.maxTranslationSquared=e.maxTranslation*e.maxTranslation,e.maxRotation=.5*Math.PI,e.maxRotationSquared=e.maxRotation*e.maxRotation,e.baumgarte=.2,e.toiBaugarte=.75,e.timeToSleep=.5,e.linearSleepTolerance=.01,e.linearSleepToleranceSqr=Math.pow(e.linearSleepTolerance,2),e.angularSleepTolerance=2/180*Math.PI,e.angularSleepToleranceSqr=Math.pow(e.angularSleepTolerance,2)},{}],8:[function(t,i,o){function e(){this.m_type,this.m_radius}DEBUG=!1,ASSERT=!1,i.exports=e;t("./common/Math");e.isValid=function(t){return!!t},e.prototype.getRadius=function(){return this.m_radius},e.prototype.getType=function(){return this.m_type},e.prototype._clone=function(){},e.prototype.getChildCount=function(){},e.prototype.testPoint=function(t,i){},e.prototype.rayCast=function(t,i,o,e){},e.prototype.computeAABB=function(t,i,o){},e.prototype.computeMass=function(t,i){},e.prototype.computeDistanceProxy=function(t){}},{"./common/Math":18}],9:[function(t,i,o){function e(){this.solveInit,this.solveVelocity,this.solvePosition}function s(t){this.dt=0,this.inv_dt=0,this.velocityIterations=0,this.positionIterations=0,this.warmStarting=!1,this.blockSolve=!0,this.inv_dt0=0,this.dtRatio=1}function n(t){this.m_world=t,this.m_profile=new e,this.m_stack=[],this.m_bodies=[],this.m_contacts=[],this.m_joints=[]}function r(){this.normalImpulses=[],this.tangentImpulses=[]}DEBUG=!1,ASSERT=!1,i.exports=n,i.exports.TimeStep=s;var m=t("./Settings"),a=t("./util/common"),h=t("./util/Timer"),c=t("./common/Vec2"),_=t("./common/Math"),l=(t("./Body"),t("./Contact"),t("./Joint"),t("./collision/TimeOfImpact")),u=l.Input,p=l.Output,y=t("./collision/Distance");y.Input,y.Output,y.Proxy,y.Cache;s.prototype.reset=function(t){this.dt>0&&(this.inv_dt0=this.inv_dt),this.dt=t,this.inv_dt=0==t?0:1/t,this.dtRatio=t*this.inv_dt0},n.prototype.clear=function(){this.m_stack.length=0,this.m_bodies.length=0,this.m_contacts.length=0,this.m_joints.length=0},n.prototype.addBody=function(t){this.m_bodies.push(t)},n.prototype.addContact=function(t){this.m_contacts.push(t)},n.prototype.addJoint=function(t){this.m_joints.push(t)},n.prototype.solveWorld=function(t){var i=this.m_world,o=this.m_profile;o.solveInit=0,o.solveVelocity=0,o.solvePosition=0;for(var e=i.m_bodyList;e;e=e.m_next)e.m_islandFlag=!1;for(var s=i.m_contactList;s;s=s.m_next)s.m_islandFlag=!1;for(var n=i.m_jointList;n;n=n.m_next)n.m_islandFlag=!1;for(var r=this.m_stack,m=-1,a=i.m_bodyList;a;a=a.m_next)if(m++,!a.m_islandFlag&&0!=a.isAwake()&&0!=a.isActive()&&!a.isStatic()){for(this.clear(),r.push(a),a.m_islandFlag=!0;r.length>0;){var e=r.pop();if(this.addBody(e),e.setAwake(!0),!e.isStatic()){for(var h=e.m_contactList;h;h=h.next){var c=h.contact;if(!c.m_islandFlag&&0!=c.isEnabled()&&0!=c.isTouching()){var _=c.m_fixtureA.m_isSensor,l=c.m_fixtureB.m_isSensor;if(!_&&!l){this.addContact(c),c.m_islandFlag=!0;var u=h.other;u.m_islandFlag||(r.push(u),u.m_islandFlag=!0)}}}for(var p=e.m_jointList;p;p=p.next)if(1!=p.joint.m_islandFlag){var u=p.other;0!=u.isActive()&&(this.addJoint(p.joint),p.joint.m_islandFlag=!0,u.m_islandFlag||(r.push(u),u.m_islandFlag=!0))}}}this.solveIsland(t);for(var y=0;y<this.m_bodies.length;++y){var e=this.m_bodies[y];e.isStatic()&&(e.m_islandFlag=!1)}}},n.prototype.solveIsland=function(t){for(var i=this.m_world,o=this.m_profile,e=i.m_gravity,s=i.m_allowSleep,n=h.now(),r=t.dt,l=0;l<this.m_bodies.length;++l){var u=this.m_bodies[l],p=c.clone(u.m_sweep.c),y=u.m_sweep.a,d=c.clone(u.m_linearVelocity),v=u.m_angularVelocity;u.m_sweep.c0.set(u.m_sweep.c),u.m_sweep.a0=u.m_sweep.a,u.isDynamic()&&(d.wAdd(r*u.m_gravityScale,e),d.wAdd(r*u.m_invMass,u.m_force),v+=r*u.m_invI*u.m_torque,d.mul(1/(1+r*u.m_linearDamping)),v*=1/(1+r*u.m_angularDamping)),a.debug("A: ",y,p.x,p.y,v,d.x,d.y),u.c_position.c=p,u.c_position.a=y,u.c_velocity.v=d,u.c_velocity.w=v}n=h.now();for(var l=0;l<this.m_contacts.length;++l){var f=this.m_contacts[l];f.initConstraint(t)}for(var l=0;l<this.m_contacts.length;++l){var f=this.m_contacts[l];f.initVelocityConstraint(t)}if(t.warmStarting)for(var l=0;l<this.m_contacts.length;++l){var f=this.m_contacts[l];f.warmStartConstraint(t)}for(var l=0;l<this.m_joints.length;++l){var A=this.m_joints[l];A.initVelocityConstraints(t)}o.solveInit=h.diff(n),n=h.now();for(var l=0;l<t.velocityIterations;++l){for(var x=0;x<this.m_joints.length;++x){var A=this.m_joints[x];A.solveVelocityConstraints(t)}for(var x=0;x<this.m_contacts.length;++x){var f=this.m_contacts[x];f.solveVelocityConstraint(t)}}for(var l=0;l<this.m_contacts.length;++l){var f=this.m_contacts[l];f.storeConstraintImpulses(t)}o.solveVelocity=h.diff(n);for(var l=0;l<this.m_bodies.length;++l){var u=this.m_bodies[l],p=c.clone(u.c_position.c),y=u.c_position.a,d=c.clone(u.c_velocity.v),v=u.c_velocity.w,g=c.mul(r,d);if(c.lengthSquared(g)>m.maxTranslationSquared){var b=m.maxTranslation/g.length();d.mul(b)}var B=r*v;if(B*B>m.maxRotationSquared){var b=m.maxRotation/_.abs(B);v*=b}p.wAdd(r,d),y+=r*v,u.c_position.c.set(p),u.c_position.a=y,u.c_velocity.v.set(d),u.c_velocity.w=v}n=h.now();for(var w=!1,l=0;l<t.positionIterations;++l){for(var S=0,x=0;x<this.m_contacts.length;++x){var f=this.m_contacts[x],C=f.solvePositionConstraint(t);S=_.min(S,C)}for(var M=S>=-3*m.linearSlop,I=!0,x=0;x<this.m_joints.length;++x){var A=this.m_joints[x],T=A.solvePositionConstraints(t);I=I&&T}if(M&&I){w=!0;break}}for(var l=0;l<this.m_bodies.length;++l){var u=this.m_bodies[l];u.m_sweep.c.set(u.c_position.c),u.m_sweep.a=u.c_position.a,u.m_linearVelocity.set(u.c_velocity.v),u.m_angularVelocity=u.c_velocity.w,u.synchronizeTransform()}if(o.solvePosition=h.diff(n),this.postSolveIsland(),s){for(var P=1/0,V=m.linearSleepToleranceSqr,z=m.angularSleepToleranceSqr,l=0;l<this.m_bodies.length;++l){var u=this.m_bodies[l];u.isStatic()||(0==u.m_autoSleepFlag||u.m_angularVelocity*u.m_angularVelocity>z||c.lengthSquared(u.m_linearVelocity)>V?(u.m_sleepTime=0,P=0):(u.m_sleepTime+=r,P=_.min(P,u.m_sleepTime)))}if(P>=m.timeToSleep&&w)for(var l=0;l<this.m_bodies.length;++l){var u=this.m_bodies[l];u.setAwake(!1)}}},n.prototype.printBodies=function(t){for(var i=0;i<this.m_bodies.length;++i){var o=this.m_bodies[i];a.debug(t,o.c_position.a,o.c_position.c.x,o.c_position.c.y,o.c_velocity.w,o.c_velocity.v.x,o.c_velocity.v.y)}};var d=new s;n.prototype.solveWorldTOI=function(t){var i=this.m_world;this.m_profile;if(i.m_stepComplete){for(var o=i.m_bodyList;o;o=o.m_next)o.m_islandFlag=!1,o.m_sweep.alpha0=0;for(var e=i.m_contactList;e;e=e.m_next)e.m_toiFlag=!1,e.m_islandFlag=!1,e.m_toiCount=0,e.m_toi=1}for(var e;;){for(var s=null,n=1,e=i.m_contactList;e;e=e.m_next)if(0!=e.isEnabled()&&!(e.m_toiCount>m.maxSubSteps)){var r=1;if(e.m_toiFlag)r=e.m_toi;else{var a=e.getFixtureA(),h=e.getFixtureB();if(a.isSensor()||h.isSensor())continue;var c=a.getBody(),y=h.getBody(),v=c.isAwake()&&!c.isStatic(),f=y.isAwake()&&!y.isStatic();if(0==v&&0==f)continue;var A=c.isBullet()||!c.isDynamic(),x=y.isBullet()||!y.isDynamic();if(0==A&&0==x)continue;var g=c.m_sweep.alpha0;c.m_sweep.alpha0<y.m_sweep.alpha0?(g=y.m_sweep.alpha0,c.m_sweep.advance(g)):y.m_sweep.alpha0<c.m_sweep.alpha0&&(g=c.m_sweep.alpha0,y.m_sweep.advance(g));var b=e.getChildIndexA(),B=e.getChildIndexB(),w=(c.m_sweep,y.m_sweep,new u);w.proxyA.set(a.getShape(),b),w.proxyB.set(h.getShape(),B),w.sweepA.set(c.m_sweep),w.sweepB.set(y.m_sweep),w.tMax=1;var S=new p;l(S,w);var C=S.t;r=S.state==p.e_touching?_.min(g+(1-g)*C,1):1,e.m_toi=r,e.m_toiFlag=!0}r<n&&(s=e,n=r)}if(null==s||1-10*_.EPSILON<n){i.m_stepComplete=!0;break}var a=s.getFixtureA(),h=s.getFixtureB(),c=a.getBody(),y=h.getBody(),M=c.m_sweep.clone(),I=y.m_sweep.clone();if(c.advance(n),y.advance(n),s.update(i),s.m_toiFlag=!1,++s.m_toiCount,0!=s.isEnabled()&&0!=s.isTouching()){c.setAwake(!0),y.setAwake(!0),this.clear(),this.addBody(c),this.addBody(y),this.addContact(s),c.m_islandFlag=!0,y.m_islandFlag=!0,s.m_islandFlag=!0;for(var T=[c,y],P=0;P<T.length;++P){var V=T[P];if(V.isDynamic())for(var z=V.m_contactList;z;z=z.next){var L=z.contact;if(!L.m_islandFlag){var R=z.other;if(!R.isDynamic()||V.isBullet()||R.isBullet()){var F=L.m_fixtureA.m_isSensor,D=L.m_fixtureB.m_isSensor;if(!F&&!D){var q=R.m_sweep.clone();0==R.m_islandFlag&&R.advance(n),L.update(i),0!=L.isEnabled()&&0!=L.isTouching()?(L.m_islandFlag=!0,this.addContact(L),R.m_islandFlag||(R.m_islandFlag=!0,R.isStatic()||R.setAwake(!0),this.addBody(R))):(R.m_sweep.set(q),R.synchronizeTransform())}}}}}d.reset((1-n)*t.dt),d.dtRatio=1,d.positionIterations=20,d.velocityIterations=t.velocityIterations,d.warmStarting=!1,this.solveIslandTOI(d,c,y);for(var P=0;P<this.m_bodies.length;++P){var V=this.m_bodies[P];if(V.m_islandFlag=!1,V.isDynamic()){V.synchronizeFixtures();for(var z=V.m_contactList;z;z=z.next)z.contact.m_toiFlag=!1,z.contact.m_islandFlag=!1}}if(i.findNewContacts(),i.m_subStepping){i.m_stepComplete=!1;break}}else s.setEnabled(!1),c.m_sweep.set(M),y.m_sweep.set(I),c.synchronizeTransform(),y.synchronizeTransform()}var o,e},n.prototype.solveIslandTOI=function(t,i,o){for(var e=(this.m_world,this.m_profile,0);e<this.m_bodies.length;++e){var s=this.m_bodies[e];s.c_position.c.set(s.m_sweep.c),s.c_position.a=s.m_sweep.a,s.c_velocity.v.set(s.m_linearVelocity),s.c_velocity.w=s.m_angularVelocity}for(var e=0;e<this.m_contacts.length;++e){var n=this.m_contacts[e];n.initConstraint(t)}for(var e=0;e<t.positionIterations;++e){for(var r=0,a=0;a<this.m_contacts.length;++a){var n=this.m_contacts[a],h=n.solvePositionConstraintTOI(t,i,o);r=_.min(r,h)}var l=r>=-1.5*m.linearSlop;if(l)break}var e,u;i.m_sweep.c0.set(i.c_position.c),i.m_sweep.a0=i.c_position.a,o.m_sweep.c0.set(o.c_position.c),o.m_sweep.a0=o.c_position.a;for(var e=0;e<this.m_contacts.length;++e){var n=this.m_contacts[e];n.initVelocityConstraint(t)}for(var e=0;e<t.velocityIterations;++e)for(var a=0;a<this.m_contacts.length;++a){var n=this.m_contacts[a];n.solveVelocityConstraint(t)}for(var p=t.dt,e=0;e<this.m_bodies.length;++e){var s=this.m_bodies[e],u=c.clone(s.c_position.c),y=s.c_position.a,d=c.clone(s.c_velocity.v),v=s.c_velocity.w,f=c.mul(p,d);if(c.dot(f,f)>m.maxTranslationSquared){var A=m.maxTranslation/f.length();d.mul(A)}var x=p*v;if(x*x>m.maxRotationSquared){var A=m.maxRotation/_.abs(x);v*=A}u.wAdd(p,d),y+=p*v,s.c_position.c=u,s.c_position.a=y,s.c_velocity.v=d,s.c_velocity.w=v,s.m_sweep.c=u,s.m_sweep.a=y,s.m_linearVelocity=d,s.m_angularVelocity=v,s.synchronizeTransform()}this.postSolveIsland()},n.prototype.postSolveIsland=function(){for(var t=new r,i=0;i<this.m_contacts.length;++i){for(var o=this.m_contacts[i],e=0;e<o.v_points.length;++e)t.normalImpulses.push(o.v_points[e].normalImpulse),t.tangentImpulses.push(o.v_points[e].tangentImpulse);this.m_world.postSolve(o,t)}}},{"./Body":2,"./Contact":3,"./Joint":5,"./Settings":7,"./collision/Distance":13,"./collision/TimeOfImpact":15,"./common/Math":18,"./common/Vec2":23,"./util/Timer":49,"./util/common":50}],10:[function(t,i,o){function e(t){return this instanceof e?(t&&n.isValid(t)&&(t={gravity:t}),t=s(t,c),this.m_solver=new m(this),this.m_broadPhase=new r,this.m_contactList=null,this.m_contactCount=0,this.m_bodyList=null,this.m_bodyCount=0,this.m_jointList=null,this.m_jointCount=0,this.m_stepComplete=!0,this.m_allowSleep=t.allowSleep,this.m_gravity=n.clone(t.gravity),this.m_clearForces=!0,this.m_newFixture=!1,this.m_locked=!1,this.m_warmStarting=t.warmStarting,this.m_continuousPhysics=t.continuousPhysics,this.m_subStepping=t.subStepping,this.m_blockSolve=t.blockSolve,this.m_velocityIterations=t.velocityIterations,this.m_positionIterations=t.positionIterations,this.m_t=0,this.m_stepCount=0,void(this.addPair=this.createContact.bind(this))):new e(t)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("./util/options"),n=(t("./util/common"),t("./util/Timer"),t("./common/Vec2")),r=t("./collision/BroadPhase"),m=t("./Solver"),a=t("./Body"),h=t("./Contact"),c={gravity:n.zero(),allowSleep:!0,warmStarting:!0,continuousPhysics:!0,subStepping:!1,blockSolve:!0,velocityIterations:8,positionIterations:3};e.prototype.getBodyList=function(){return this.m_bodyList},e.prototype.getJointList=function(){return this.m_jointList},e.prototype.getContactList=function(){return this.m_contactList},e.prototype.getBodyCount=function(){return this.m_bodyCount},e.prototype.getJointCount=function(){return this.m_jointCount},e.prototype.getContactCount=function(){return this.m_contactCount},e.prototype.setGravity=function(t){this.m_gravity=t},e.prototype.getGravity=function(){return this.m_gravity},e.prototype.isLocked=function(){return this.m_locked},e.prototype.setAllowSleeping=function(t){if(t!=this.m_allowSleep&&(this.m_allowSleep=t,0==this.m_allowSleep))for(var i=this.m_bodyList;i;i=i.m_next)i.setAwake(!0)},e.prototype.getAllowSleeping=function(){return this.m_allowSleep},e.prototype.setWarmStarting=function(t){this.m_warmStarting=t},e.prototype.getWarmStarting=function(){return this.m_warmStarting},e.prototype.setContinuousPhysics=function(t){this.m_continuousPhysics=t},e.prototype.getContinuousPhysics=function(){return this.m_continuousPhysics},e.prototype.setSubStepping=function(t){this.m_subStepping=t},e.prototype.getSubStepping=function(){return this.m_subStepping},e.prototype.setAutoClearForces=function(t){this.m_clearForces=t},e.prototype.getAutoClearForces=function(){return this.m_clearForces},e.prototype.clearForces=function(){for(var t=this.m_bodyList;t;t=t.getNext())t.m_force.setZero(),t.m_torque=0},e.prototype.queryAABB=function(t,i){var o=this.m_broadPhase;this.m_broadPhase.query(t,function(t){var e=o.getUserData(t);return i(e.fixture)})},e.prototype.rayCast=function(t,i,o){var e=this.m_broadPhase;this.m_broadPhase.rayCast({maxFraction:1,p1:t,p2:i},function(t,i){var s=e.getUserData(i),r=s.fixture,m=s.childIndex,a={},h=r.rayCast(a,t,m);if(h){var c=a.fraction,_=n.add(n.mul(1-c,t.p1),n.mul(c,t.p2));return o(r,_,a.normal,c)}return t.maxFraction})},e.prototype.getProxyCount=function(){return this.m_broadPhase.getProxyCount()},e.prototype.getTreeHeight=function(){return this.m_broadPhase.getTreeHeight()},e.prototype.getTreeBalance=function(){return this.m_broadPhase.getTreeBalance()},e.prototype.getTreeQuality=function(){return this.m_broadPhase.getTreeQuality()},e.prototype.shiftOrigin=function(t){if(!this.m_locked){for(var i=this.m_bodyList;i;i=i.m_next)i.m_xf.p.sub(t),i.m_sweep.c0.sub(t),i.m_sweep.c.sub(t);for(var o=this.m_jointList;o;o=o.m_next)o.shiftOrigin(t);this.m_broadPhase.shiftOrigin(t)}},e.prototype.createBody=function(t,i){if(this.isLocked())return null;t&&n.isValid(t)&&(t={position:t,angle:i});var o=new a(this,t);return o.m_prev=null,o.m_next=this.m_bodyList,this.m_bodyList&&(this.m_bodyList.m_prev=o),this.m_bodyList=o,++this.m_bodyCount,o},e.prototype.createDynamicBody=function(t,i){return t?n.isValid(t)&&(t={position:t,angle:i}):t={},t.type="dynamic",this.createBody(t)},e.prototype.createKinematicBody=function(t,i){return t?n.isValid(t)&&(t={position:t,angle:i}):t={},t.type="kinematic",this.createBody(t)},e.prototype.destroyBody=function(t){if(!this.isLocked()){if(t.m_destroyed)return!1;for(var i=t.m_jointList;i;){var o=i;i=i.next,this.publish("remove-joint",o.joint),this.destroyJoint(o.joint),t.m_jointList=i}t.m_jointList=null;for(var e=t.m_contactList;e;){var s=e;e=e.next,this.destroyContact(s.contact),t.m_contactList=e}t.m_contactList=null;for(var n=t.m_fixtureList;n;){var r=n;n=n.m_next,this.publish("remove-fixture",r),r.destroyProxies(this.m_broadPhase),t.m_fixtureList=n}return t.m_fixtureList=null,t.m_prev&&(t.m_prev.m_next=t.m_next),t.m_next&&(t.m_next.m_prev=t.m_prev),t==this.m_bodyList&&(this.m_bodyList=t.m_next),t.m_destroyed=!0,--this.m_bodyCount,!0}},e.prototype.createJoint=function(t){if(this.isLocked())return null;if(t.m_prev=null,t.m_next=this.m_jointList,this.m_jointList&&(this.m_jointList.m_prev=t),this.m_jointList=t,++this.m_jointCount,t.m_edgeA.joint=t,t.m_edgeA.other=t.m_bodyB,t.m_edgeA.prev=null,t.m_edgeA.next=t.m_bodyA.m_jointList,t.m_bodyA.m_jointList&&(t.m_bodyA.m_jointList.prev=t.m_edgeA),t.m_bodyA.m_jointList=t.m_edgeA,t.m_edgeB.joint=t,t.m_edgeB.other=t.m_bodyA,t.m_edgeB.prev=null,t.m_edgeB.next=t.m_bodyB.m_jointList,t.m_bodyB.m_jointList&&(t.m_bodyB.m_jointList.prev=t.m_edgeB),t.m_bodyB.m_jointList=t.m_edgeB,0==t.m_collideConnected)for(var i=t.m_bodyB.getContactList();i;i=i.next)i.other==t.m_bodyA&&i.contact.flagForFiltering();return t},e.prototype.destroyJoint=function(t){if(!this.isLocked()){t.m_prev&&(t.m_prev.m_next=t.m_next),t.m_next&&(t.m_next.m_prev=t.m_prev),t==this.m_jointList&&(this.m_jointList=t.m_next);var i=t.m_bodyA,o=t.m_bodyB;if(i.setAwake(!0),o.setAwake(!0),t.m_edgeA.prev&&(t.m_edgeA.prev.next=t.m_edgeA.next),t.m_edgeA.next&&(t.m_edgeA.next.prev=t.m_edgeA.prev),t.m_edgeA==i.m_jointList&&(i.m_jointList=t.m_edgeA.next),t.m_edgeA.prev=null,t.m_edgeA.next=null,t.m_edgeB.prev&&(t.m_edgeB.prev.next=t.m_edgeB.next),t.m_edgeB.next&&(t.m_edgeB.next.prev=t.m_edgeB.prev),t.m_edgeB==o.m_jointList&&(o.m_jointList=t.m_edgeB.next),t.m_edgeB.prev=null,t.m_edgeB.next=null,--this.m_jointCount,0==t.m_collideConnected)for(var e=o.getContactList();e;)e.other==i&&e.contact.flagForFiltering(),e=e.next;this.publish("remove-joint",t)}};var _=new m.TimeStep;e.prototype.step=function(t,i,o){if((0|i)!==i&&(i=0),i=i||this.m_velocityIterations,o=o||this.m_positionIterations,this.m_stepCount++,this.m_newFixture&&(this.findNewContacts(),this.m_newFixture=!1),this.m_locked=!0,_.reset(t),_.velocityIterations=i,_.positionIterations=o,_.warmStarting=this.m_warmStarting,_.blockSolve=this.m_blockSolve,this.updateContacts(),this.m_stepComplete&&t>0){this.m_solver.solveWorld(_);for(var e=this.m_bodyList;e;e=e.getNext())0!=e.m_islandFlag&&(e.isStatic()||e.synchronizeFixtures());this.findNewContacts()}this.m_continuousPhysics&&t>0&&this.m_solver.solveWorldTOI(_),this.m_clearForces&&this.clearForces(),this.m_locked=!1},e.prototype.findNewContacts=function(){this.m_broadPhase.updatePairs(this.addPair)},e.prototype.createContact=function(t,i){var o=t.fixture,e=i.fixture,s=t.childIndex,n=i.childIndex,r=o.getBody(),m=e.getBody();if(r!=m){for(var a=m.getContactList();a;){if(a.other==r){var c=a.contact.getFixtureA(),_=a.contact.getFixtureB(),l=a.contact.getChildIndexA(),u=a.contact.getChildIndexB();if(c==o&&_==e&&l==s&&u==n)return;if(c==e&&_==o&&l==n&&u==s)return}a=a.next}if(0!=m.shouldCollide(r)&&0!=e.shouldCollide(o)){var p=h.create(o,s,e,n);null!=p&&(p.m_prev=null,null!=this.m_contactList&&(p.m_next=this.m_contactList,this.m_contactList.m_prev=p),this.m_contactList=p,++this.m_contactCount)}}},e.prototype.updateContacts=function(){for(var t,i=this.m_contactList;t=i;){i=t.getNext();var o=t.getFixtureA(),e=t.getFixtureB(),s=t.getChildIndexA(),n=t.getChildIndexB(),r=o.getBody(),m=e.getBody();if(t.m_filterFlag){if(0==m.shouldCollide(r)){this.destroyContact(t);continue}if(0==e.shouldCollide(o)){this.destroyContact(t);continue}t.m_filterFlag=!1}var a=r.isAwake()&&!r.isStatic(),h=m.isAwake()&&!m.isStatic();if(0!=a||0!=h){var c=o.m_proxies[s].proxyId,_=e.m_proxies[n].proxyId,l=this.m_broadPhase.testOverlap(c,_);0!=l?t.update(this):this.destroyContact(t)}}},e.prototype.destroyContact=function(t){h.destroy(t,this),t.m_prev&&(t.m_prev.m_next=t.m_next),t.m_next&&(t.m_next.m_prev=t.m_prev),t==this.m_contactList&&(this.m_contactList=t.m_next),--this.m_contactCount},e.prototype._listeners=null,e.prototype.on=function(t,i){return"string"!=typeof t||"function"!=typeof i?this:(this._listeners||(this._listeners={}),this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(i),this)},e.prototype.off=function(t,i){if("string"!=typeof t||"function"!=typeof i)return this;var o=this._listeners&&this._listeners[t];if(!o||!o.length)return this;var e=o.indexOf(i);return e>=0&&o.splice(e,1),this},e.prototype.publish=function(t,i,o,e){var s=this._listeners&&this._listeners[t];if(!s||!s.length)return 0;for(var n=0;n<s.length;n++)s[n].call(this,i,o,e);return s.length},e.prototype.beginContact=function(t){this.publish("begin-contact",t)},e.prototype.endContact=function(t){this.publish("end-contact",t)},e.prototype.preSolve=function(t,i){this.publish("pre-solve",t,i)},e.prototype.postSolve=function(t,i){this.publish("post-solve",t,i)}},{"./Body":2,"./Contact":3,"./Solver":9,"./collision/BroadPhase":12,"./common/Vec2":23,"./util/Timer":49,"./util/common":50,"./util/options":52}],11:[function(t,i,o){function e(t,i){return this instanceof e?(this.lowerBound=n.zero(),this.upperBound=n.zero(),"object"==typeof t&&this.lowerBound.set(t),void("object"==typeof i&&this.upperBound.set(i))):new e(t,i)}DEBUG=!1,ASSERT=!1;var s=(t("../Settings"),t("../common/Math")),n=t("../common/Vec2");i.exports=e,e.prototype.isValid=function(){return e.isValid(this)},e.isValid=function(t){var i=n.sub(t.upperBound,t.lowerBound),o=i.x>=0&&i.y>=0&&n.isValid(t.lowerBound)&&n.isValid(t.upperBound);return o},e.prototype.getCenter=function(){return n.neo(.5*(this.lowerBound.x+this.upperBound.x),.5*(this.lowerBound.y+this.upperBound.y))},e.prototype.getExtents=function(){return n.neo(.5*(this.upperBound.x-this.lowerBound.x),.5*(this.upperBound.y-this.lowerBound.y))},e.prototype.getPerimeter=function(){return 2*(this.upperBound.x-this.lowerBound.x+this.upperBound.y-this.lowerBound.y)},e.prototype.combine=function(t,i){i=i||this,this.lowerBound.set(s.min(t.lowerBound.x,i.lowerBound.x),s.min(t.lowerBound.y,i.lowerBound.y)),this.upperBound.set(s.max(t.upperBound.x,i.upperBound.x),s.max(t.upperBound.y,i.upperBound.y))},e.prototype.combinePoints=function(t,i){this.lowerBound.set(s.min(t.x,i.x),s.min(t.y,i.y)),this.upperBound.set(s.max(t.x,i.x),s.max(t.y,i.y))},e.prototype.set=function(t){this.lowerBound.set(t.lowerBound.x,t.lowerBound.y),this.upperBound.set(t.upperBound.x,t.upperBound.y)},e.prototype.contains=function(t){var i=!0;return i=i&&this.lowerBound.x<=t.lowerBound.x,i=i&&this.lowerBound.y<=t.lowerBound.y,i=i&&t.upperBound.x<=this.upperBound.x,i=i&&t.upperBound.y<=this.upperBound.y},e.prototype.extend=function(t){e.extend(this,t)},e.extend=function(t,i){t.lowerBound.x-=i,t.lowerBound.y-=i,t.upperBound.x+=i,t.upperBound.y+=i},e.testOverlap=function(t,i){var o=i.lowerBound.x-t.upperBound.x,e=t.lowerBound.x-i.upperBound.x,s=i.lowerBound.y-t.upperBound.y,n=t.lowerBound.y-i.upperBound.y;return!(o>0||s>0||e>0||n>0)},e.areEqual=function(t,i){return n.areEqual(t.lowerBound,i.lowerBound)&&n.areEqual(t.upperBound,i.upperBound)},e.diff=function(t,i){var o=s.max(0,s.min(t.upperBound.x,i.upperBound.x)-s.max(i.lowerBound.x,t.lowerBound.x)),e=s.max(0,s.min(t.upperBound.y,i.upperBound.y)-s.max(i.lowerBound.y,t.lowerBound.y)),n=t.upperBound.x-t.lowerBound.x,r=t.upperBound.y-t.lowerBound.y,m=i.upperBound.y-i.lowerBound.y,m=i.upperBound.y-i.lowerBound.y;return n*r+wB*m-o*e},e.prototype.rayCast=function(t,i){for(var o=-(1/0),e=1/0,r=i.p1,m=n.sub(i.p2,i.p1),a=n.abs(m),h=n.zero(),c="x";null!==c;c="x"===c?"y":null)if(a.x<s.EPSILON){if(r[c]<this.lowerBound[c]||this.upperBound[c]<r[c])return!1}else{var _=1/m[c],l=(this.lowerBound[c]-r[c])*_,u=(this.upperBound[c]-r[c])*_,p=-1;if(l>u){var y=l;l=u,u=y,p=1}if(l>o&&(h.setZero(),h[c]=p,o=l),e=s.min(e,u),o>e)return!1}return!(o<0||i.maxFraction<o)&&(t.fraction=o,t.normal=h,!0)},e.prototype.toString=function(){return JSON.stringify(this)}},{"../Settings":7,"../common/Math":18,"../common/Vec2":23}],12:[function(t,i,o){function e(){this.m_tree=new r,this.m_proxyCount=0,this.m_moveBuffer=[],this.queryCallback=this.queryCallback.bind(this)}DEBUG=!1,ASSERT=!1;var s=(t("../Settings"),t("../util/common"),t("../common/Math")),n=t("./AABB"),r=t("./DynamicTree");i.exports=e,e.prototype.getUserData=function(t){return this.m_tree.getUserData(t)},e.prototype.testOverlap=function(t,i){var o=this.m_tree.getFatAABB(t),e=this.m_tree.getFatAABB(i);return n.testOverlap(o,e)},e.prototype.getFatAABB=function(t){return this.m_tree.getFatAABB(t)},e.prototype.getProxyCount=function(){return this.m_proxyCount},e.prototype.getTreeHeight=function(){return this.m_tree.getHeight()},e.prototype.getTreeBalance=function(){return this.m_tree.getMaxBalance()},e.prototype.getTreeQuality=function(){return this.m_tree.getAreaRatio()},e.prototype.query=function(t,i){this.m_tree.query(t,i)},e.prototype.rayCast=function(t,i){this.m_tree.rayCast(t,i)},e.prototype.shiftOrigin=function(t){this.m_tree.shiftOrigin(t)},e.prototype.createProxy=function(t,i){var o=this.m_tree.createProxy(t,i);return this.m_proxyCount++,this.bufferMove(o),o},e.prototype.destroyProxy=function(t){this.unbufferMove(t),this.m_proxyCount--,this.m_tree.destroyProxy(t)},e.prototype.moveProxy=function(t,i,o){var e=this.m_tree.moveProxy(t,i,o);e&&this.bufferMove(t)},e.prototype.touchProxy=function(t){this.bufferMove(t)},e.prototype.bufferMove=function(t){this.m_moveBuffer.push(t)},e.prototype.unbufferMove=function(t){for(var i=0;i<this.m_moveBuffer.length;++i)this.m_moveBuffer[i]==t&&(this.m_moveBuffer[i]=null)},e.prototype.updatePairs=function(t){for(this.m_callback=t;this.m_moveBuffer.length>0;)if(this.m_queryProxyId=this.m_moveBuffer.pop(),null!==this.m_queryProxyId){var i=this.m_tree.getFatAABB(this.m_queryProxyId);this.m_tree.query(i,this.queryCallback)}},e.prototype.queryCallback=function(t){if(t==this.m_queryProxyId)return!0;var i=s.min(t,this.m_queryProxyId),o=s.max(t,this.m_queryProxyId),e=this.m_tree.getUserData(i),n=this.m_tree.getUserData(o);return this.m_callback(e,n),!0}},{"../Settings":7,"../common/Math":18,"../util/common":50,"./AABB":11,"./DynamicTree":14}],13:[function(t,i,o){function e(){this.proxyA=new m,this.proxyB=new m,this.transformA=null,this.transformB=null,this.useRadii=!1}function s(){this.pointA=u.zero(),this.pointB=u.zero(),this.distance,this.iterations}function n(){this.metric=0,this.indexA=[],this.indexB=[],this.count=0}function r(t,i,o){++_.gjkCalls;var e=o.proxyA,s=o.proxyB,n=o.transformA,r=o.transformB,m=new h;m.readCache(i,e,n,s,r);for(var a=m.m_v,d=c.maxDistnceIterations,v=[],f=[],A=0,x=1/0,g=1/0,b=0;b<d;){A=m.m_count;for(var B=0;B<A;++B)v[B]=a[B].indexA,f[B]=a[B].indexB;if(m.solve(),3==m.m_count)break;var w=m.getClosestPoint();g=w.lengthSquared(),x=g;var S=m.getSearchDirection();if(S.lengthSquared()<l.EPSILON*l.EPSILON)break;var C=a[m.m_count];C.indexA=e.getSupport(p.mulT(n.q,u.neg(S))),C.wA=y.mul(n,e.getVertex(C.indexA)),C.indexB=s.getSupport(p.mulT(r.q,S)),C.wB=y.mul(r,s.getVertex(C.indexB)),C.w=u.sub(C.wB,C.wA),++b,++_.gjkIters;for(var M=!1,B=0;B<A;++B)if(C.indexA==v[B]&&C.indexB==f[B]){M=!0;break}if(M)break;++m.m_count}if(_.gjkMaxIters=l.max(_.gjkMaxIters,b),m.getWitnessPoints(t.pointA,t.pointB),t.distance=u.distance(t.pointA,t.pointB),t.iterations=b,m.writeCache(i),o.useRadii){var I=e.m_radius,T=s.m_radius;if(t.distance>I+T&&t.distance>l.EPSILON){t.distance-=I+T;var P=u.sub(t.pointB,t.pointA);P.normalize(),t.pointA.wAdd(I,P),t.pointB.wSub(T,P)}else{var w=u.mid(t.pointA,t.pointB);t.pointA.set(w),t.pointB.set(w),t.distance=0}}}function m(){this.m_buffer=[],this.m_vertices=[],this.m_count=0,this.m_radius=0}function a(){this.indexA,this.indexB,this.wA=u.zero(),this.wB=u.zero(),this.w=u.zero(),this.a}function h(){this.m_v1=new a,this.m_v2=new a,this.m_v3=new a,this.m_v=[this.m_v1,this.m_v2,this.m_v3],this.m_count}DEBUG=!1,ASSERT=!1,i.exports=r,i.exports.Input=e,i.exports.Output=s,i.exports.Proxy=m,i.exports.Cache=n;var c=t("../Settings"),_=(t("../util/common"),t("../util/Timer"),t("../common/stats")),l=t("../common/Math"),u=t("../common/Vec2"),p=(t("../common/Vec3"),t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),y=(t("../common/Sweep"),t("../common/Transform"));t("../common/Velocity"),t("../common/Position");_.gjkCalls=0,_.gjkIters=0,_.gjkMaxIters=0,m.prototype.getVertexCount=function(){return this.m_count},m.prototype.getVertex=function(t){return this.m_vertices[t]},m.prototype.getSupport=function(t){for(var i=0,o=u.dot(this.m_vertices[0],t),e=0;e<this.m_count;++e){var s=u.dot(this.m_vertices[e],t);s>o&&(i=e,o=s)}return i},m.prototype.getSupportVertex=function(t){return this.m_vertices[this.getSupport(t)]},m.prototype.set=function(t,i){t.computeDistanceProxy(this,i)},a.prototype.set=function(t){this.indexA=t.indexA,this.indexB=t.indexB,this.wA=u.clone(t.wA),this.wB=u.clone(t.wB),this.w=u.clone(t.w),this.a=t.a},h.prototype.print=function(){return 3==this.m_count?["+"+this.m_count,this.m_v1.a,this.m_v1.wA.x,this.m_v1.wA.y,this.m_v1.wB.x,this.m_v1.wB.y,this.m_v2.a,this.m_v2.wA.x,this.m_v2.wA.y,this.m_v2.wB.x,this.m_v2.wB.y,this.m_v3.a,this.m_v3.wA.x,this.m_v3.wA.y,this.m_v3.wB.x,this.m_v3.wB.y].toString():2==this.m_count?["+"+this.m_count,this.m_v1.a,this.m_v1.wA.x,this.m_v1.wA.y,this.m_v1.wB.x,this.m_v1.wB.y,this.m_v2.a,this.m_v2.wA.x,this.m_v2.wA.y,this.m_v2.wB.x,this.m_v2.wB.y].toString():1==this.m_count?["+"+this.m_count,this.m_v1.a,this.m_v1.wA.x,this.m_v1.wA.y,this.m_v1.wB.x,this.m_v1.wB.y].toString():"+"+this.m_count},h.prototype.readCache=function(t,i,o,e,s){this.m_count=t.count;for(var n=0;n<this.m_count;++n){var r=this.m_v[n];r.indexA=t.indexA[n],
r.indexB=t.indexB[n];var m=i.getVertex(r.indexA),a=e.getVertex(r.indexB);r.wA=y.mul(o,m),r.wB=y.mul(s,a),r.w=u.sub(r.wB,r.wA),r.a=0}if(this.m_count>1){var h=t.metric,c=this.getMetric();(c<.5*h||2*h<c||c<l.EPSILON)&&(this.m_count=0)}if(0==this.m_count){var r=this.m_v[0];r.indexA=0,r.indexB=0;var m=i.getVertex(0),a=e.getVertex(0);r.wA=y.mul(o,m),r.wB=y.mul(s,a),r.w=u.sub(r.wB,r.wA),r.a=1,this.m_count=1}},h.prototype.writeCache=function(t){t.metric=this.getMetric(),t.count=this.m_count;for(var i=0;i<this.m_count;++i)t.indexA[i]=this.m_v[i].indexA,t.indexB[i]=this.m_v[i].indexB},h.prototype.getSearchDirection=function(){switch(this.m_count){case 1:return u.neg(this.m_v1.w);case 2:var t=u.sub(this.m_v2.w,this.m_v1.w),i=u.cross(t,u.neg(this.m_v1.w));return i>0?u.cross(1,t):u.cross(t,1);default:return u.zero()}},h.prototype.getClosestPoint=function(){switch(this.m_count){case 0:return u.zero();case 1:return u.clone(this.m_v1.w);case 2:return u.wAdd(this.m_v1.a,this.m_v1.w,this.m_v2.a,this.m_v2.w);case 3:return u.zero();default:return u.zero()}},h.prototype.getWitnessPoints=function(t,i){switch(this.m_count){case 0:break;case 1:t.set(this.m_v1.wA),i.set(this.m_v1.wB);break;case 2:t.wSet(this.m_v1.a,this.m_v1.wA,this.m_v2.a,this.m_v2.wA),i.wSet(this.m_v1.a,this.m_v1.wB,this.m_v2.a,this.m_v2.wB);break;case 3:t.wSet(this.m_v1.a,this.m_v1.wA,this.m_v2.a,this.m_v2.wA),t.wAdd(this.m_v3.a,this.m_v3.wA),i.set(t)}},h.prototype.getMetric=function(){switch(this.m_count){case 0:return 0;case 1:return 0;case 2:return u.distance(this.m_v1.w,this.m_v2.w);case 3:return u.cross(u.sub(this.m_v2.w,this.m_v1.w),u.sub(this.m_v3.w,this.m_v1.w));default:return 0}},h.prototype.solve=function(){switch(this.m_count){case 1:break;case 2:this.solve2();break;case 3:this.solve3()}},h.prototype.solve2=function(){var t=this.m_v1.w,i=this.m_v2.w,o=u.sub(i,t),e=-u.dot(t,o);if(e<=0)return this.m_v1.a=1,void(this.m_count=1);var s=u.dot(i,o);if(s<=0)return this.m_v2.a=1,this.m_count=1,void this.m_v1.set(this.m_v2);var n=1/(s+e);this.m_v1.a=s*n,this.m_v2.a=e*n,this.m_count=2},h.prototype.solve3=function(){var t=this.m_v1.w,i=this.m_v2.w,o=this.m_v3.w,e=u.sub(i,t),s=u.dot(t,e),n=u.dot(i,e),r=n,m=-s,a=u.sub(o,t),h=u.dot(t,a),c=u.dot(o,a),_=c,l=-h,p=u.sub(o,i),y=u.dot(i,p),d=u.dot(o,p),v=d,f=-y,A=u.cross(e,a),x=A*u.cross(i,o),g=A*u.cross(o,t),b=A*u.cross(t,i);if(m<=0&&l<=0)return this.m_v1.a=1,void(this.m_count=1);if(r>0&&m>0&&b<=0){var B=1/(r+m);return this.m_v1.a=r*B,this.m_v2.a=m*B,void(this.m_count=2)}if(_>0&&l>0&&g<=0){var w=1/(_+l);return this.m_v1.a=_*w,this.m_v3.a=l*w,this.m_count=2,void this.m_v2.set(this.m_v3)}if(r<=0&&f<=0)return this.m_v2.a=1,this.m_count=1,void this.m_v1.set(this.m_v2);if(_<=0&&v<=0)return this.m_v3.a=1,this.m_count=1,void this.m_v1.set(this.m_v3);if(v>0&&f>0&&x<=0){var S=1/(v+f);return this.m_v2.a=v*S,this.m_v3.a=f*S,this.m_count=2,void this.m_v1.set(this.m_v3)}var C=1/(x+g+b);this.m_v1.a=x*C,this.m_v2.a=g*C,this.m_v3.a=b*C,this.m_count=3},r.testOverlap=function(t,i,o,m,a,h){var c=new e;c.proxyA.set(t,i),c.proxyB.set(o,m),c.transformA=a,c.transformB=h,c.useRadii=!0;var _=new n,u=new s;return r(u,_,c),u.distance<10*l.EPSILON}},{"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../common/stats":26,"../util/Timer":49,"../util/common":50}],14:[function(t,i,o){function e(t){this.id=t,this.aabb=new c,this.userData=null,this.parent=null,this.child1=null,this.child2=null,this.height=-1,this.toString=function(){return this.id+": "+this.userData}}function s(){this.m_root=null,this.m_nodes={},this.m_lastProxyId=0,this.m_pool=new m({create:function(){return new e}})}function n(){var t=[],i=[];return{preorder:function(o){return t.length=0,t.push(o),i.length=0,i.push(0),this},next:function(){for(;t.length>0;){var o=t.length-1,e=t[o];if(0===i[o])return i[o]=1,e;if(1===i[o]&&(i[o]=2,e.child1))return t.push(e.child1),i.push(1),e.child1;if(2===i[o]&&(i[o]=3,e.child2))return t.push(e.child2),i.push(1),e.child2;t.pop(),i.pop()}},close:function(){t.length=0}}}DEBUG=!1,ASSERT=!1;var r=t("../Settings"),m=(t("../util/common"),t("../util/Pool")),a=t("../common/Vec2"),h=t("../common/Math"),c=t("./AABB");i.exports=s,e.prototype.isLeaf=function(){return null==this.child1},s.prototype.getUserData=function(t){var i=this.m_nodes[t];return i.userData},s.prototype.getFatAABB=function(t){var i=this.m_nodes[t];return i.aabb},s.prototype.allocateNode=function(){var t=this.m_pool.allocate();return t.id=++this.m_lastProxyId,t.userData=null,t.parent=null,t.child1=null,t.child2=null,t.height=-1,this.m_nodes[t.id]=t,t},s.prototype.freeNode=function(t){this.m_pool.release(t),t.height=-1,delete this.m_nodes[t.id]},s.prototype.createProxy=function(t,i){var o=this.allocateNode();return o.aabb.set(t),c.extend(o.aabb,r.aabbExtension),o.userData=i,o.height=0,this.insertLeaf(o),o.id},s.prototype.destroyProxy=function(t){var i=this.m_nodes[t];this.removeLeaf(i),this.freeNode(i)},s.prototype.moveProxy=function(t,i,o){var e=this.m_nodes[t];return!e.aabb.contains(i)&&(this.removeLeaf(e),e.aabb.set(i),i=e.aabb,c.extend(i,r.aabbExtension),o.x<0?i.lowerBound.x+=o.x*r.aabbMultiplier:i.upperBound.x+=o.x*r.aabbMultiplier,o.y<0?i.lowerBound.y+=o.y*r.aabbMultiplier:i.upperBound.y+=o.y*r.aabbMultiplier,this.insertLeaf(e),!0)},s.prototype.insertLeaf=function(t){if(null==this.m_root)return this.m_root=t,void(this.m_root.parent=null);for(var i=t.aabb,o=this.m_root;0==o.isLeaf();){var e=o.child1,s=o.child2,n=o.aabb.getPerimeter(),r=new c;r.combine(o.aabb,i);var m,a=r.getPerimeter(),_=2*a,l=2*(a-n);if(e.isLeaf()){var u=new c;u.combine(i,e.aabb),m=u.getPerimeter()+l}else{var u=new c;u.combine(i,e.aabb);var p=e.aabb.getPerimeter(),y=u.getPerimeter();m=y-p+l}var d;if(s.isLeaf()){var u=new c;u.combine(i,s.aabb),d=u.getPerimeter()+l}else{var u=new c;u.combine(i,s.aabb);var p=s.aabb.getPerimeter(),y=u.getPerimeter();d=y-p+l}if(_<m&&_<d)break;o=m<d?e:s}var v=o,f=v.parent,A=this.allocateNode();for(A.parent=f,A.userData=null,A.aabb.combine(i,v.aabb),A.height=v.height+1,null!=f?(f.child1==v?f.child1=A:f.child2=A,A.child1=v,A.child2=t,v.parent=A,t.parent=A):(A.child1=v,A.child2=t,v.parent=A,t.parent=A,this.m_root=A),o=t.parent;null!=o;){o=this.balance(o);var e=o.child1,s=o.child2;o.height=1+h.max(e.height,s.height),o.aabb.combine(e.aabb,s.aabb),o=o.parent}},s.prototype.removeLeaf=function(t){if(t==this.m_root)return void(this.m_root=null);var i,o=t.parent,e=o.parent;if(i=o.child1==t?o.child2:o.child1,null!=e){e.child1==o?e.child1=i:e.child2=i,i.parent=e,this.freeNode(o);for(var s=e;null!=s;){s=this.balance(s);var n=s.child1,r=s.child2;s.aabb.combine(n.aabb,r.aabb),s.height=1+h.max(n.height,r.height),s=s.parent}}else this.m_root=i,i.parent=null,this.freeNode(o)},s.prototype.balance=function(t){var i=t;if(i.isLeaf()||i.height<2)return t;var o=i.child1,e=i.child2,s=e.height-o.height;if(s>1){var n=e.child1,r=e.child2;return e.child1=i,e.parent=i.parent,i.parent=e,null!=e.parent?e.parent.child1==t?e.parent.child1=e:e.parent.child2=e:this.m_root=e,n.height>r.height?(e.child2=n,i.child2=r,r.parent=i,i.aabb.combine(o.aabb,r.aabb),e.aabb.combine(i.aabb,n.aabb),i.height=1+h.max(o.height,r.height),e.height=1+h.max(i.height,n.height)):(e.child2=r,i.child2=n,n.parent=i,i.aabb.combine(o.aabb,n.aabb),e.aabb.combine(i.aabb,r.aabb),i.height=1+h.max(o.height,n.height),e.height=1+h.max(i.height,r.height)),e}if(s<-1){var m=o.child1,a=o.child2;return o.child1=i,o.parent=i.parent,i.parent=o,null!=o.parent?o.parent.child1==i?o.parent.child1=o:o.parent.child2=o:this.m_root=o,m.height>a.height?(o.child2=m,i.child1=a,a.parent=i,i.aabb.combine(e.aabb,a.aabb),o.aabb.combine(i.aabb,m.aabb),i.height=1+h.max(e.height,a.height),o.height=1+h.max(i.height,m.height)):(o.child2=a,i.child1=m,m.parent=i,i.aabb.combine(e.aabb,m.aabb),o.aabb.combine(i.aabb,a.aabb),i.height=1+h.max(e.height,m.height),o.height=1+h.max(i.height,a.height)),o}return i},s.prototype.getHeight=function(){return null==this.m_root?0:this.m_root.height},s.prototype.getAreaRatio=function(){if(null==this.m_root)return 0;for(var t,i=this.m_root,o=i.aabb.getPerimeter(),e=0,s=u.allocate().preorder();t=s.next();)t.height<0||(e+=t.aabb.getPerimeter());return u.release(s),e/o},s.prototype.computeHeight=function(t){var i;if(i="undefined"!=typeof t?this.m_nodes[t]:this.m_root,i.isLeaf())return 0;var o=ComputeHeight(i.child1),e=ComputeHeight(i.child2);return 1+h.max(o,e)},s.prototype.validateStructure=function(t){if(null!=t){t==this.m_root;var i=t.child1,o=t.child2;t.isLeaf()||(this.validateStructure(i),this.validateStructure(o))}},s.prototype.validateMetrics=function(t){if(null!=t){var i=t.child1,o=t.child2;if(!t.isLeaf()){var e=this.m_nodes[i].height,s=this.m_nodes[o].height,n=(1+h.max(e,s),new c);n.combine(i.aabb,o.aabb),this.validateMetrics(i),this.validateMetrics(o)}}},s.prototype.validate=function(){ValidateStructure(this.m_root),ValidateMetrics(this.m_root)},s.prototype.getMaxBalance=function(){for(var t,i=0,o=u.allocate().preorder();t=o.next();)if(!(t.height<=1)){var e=h.abs(t.child2.height-t.child1.height);i=h.max(i,e)}return u.release(o),i},s.prototype.rebuildBottomUp=function(){for(var t,i=[],o=0,e=u.allocate().preorder();t=e.next();)t.height<0||(t.isLeaf()?(t.parent=null,i[o]=t,++o):this.freeNode(t));for(u.release(e);o>1;){for(var s=1/0,n=-1,r=-1,m=0;m<o;++m)for(var a=i[m].aabb,_=m+1;_<o;++_){var l=i[_].aabb,p=new c;p.combine(a,l);var y=p.getPerimeter();y<s&&(n=m,r=_,s=y)}var d=i[n],v=i[r],f=this.allocateNode();f.child1=d,f.child2=v,f.height=1+h.max(d.height,v.height),f.aabb.combine(d.aabb,v.aabb),f.parent=null,d.parent=f,v.parent=f,i[r]=i[o-1],i[n]=f,--o}this.m_root=i[0],this.validate()},s.prototype.shiftOrigin=function(t){for(var i,o=u.allocate().preorder();i=o.next();){var e=i.aabb;e.lowerBound.x-=t.x,e.lowerBound.y-=t.y,e.lowerBound.x-=t.x,e.lowerBound.y-=t.y}u.release(o)},s.prototype.query=function(t,i){var o=l.allocate();for(o.push(this.m_root);o.length>0;){var e=o.pop();if(null!=e&&c.testOverlap(e.aabb,t))if(e.isLeaf()){var s=i(e.id);if(0==s)return}else o.push(e.child1),o.push(e.child2)}l.release(o)},s.prototype.rayCast=function(t,i){var o=t.p1,e=t.p2,s=a.sub(e,o);s.normalize();var n=a.cross(1,s),r=a.abs(n),m=t.maxFraction,u=new c,p=a.wAdd(1-m,o,m,e);u.combinePoints(o,p);var y=l.allocate(),d=_.allocate();for(y.push(this.m_root);y.length>0;){var v=y.pop();if(null!=v&&0!=c.testOverlap(v.aabb,u)){var f=v.aabb.getCenter(),A=v.aabb.getExtents(),x=h.abs(a.dot(n,a.sub(o,f)))-a.dot(r,A);if(!(x>0))if(v.isLeaf()){d.p1=a.clone(t.p1),d.p2=a.clone(t.p2),d.maxFraction=m;var g=i(d,v.id);if(0==g)return;g>0&&(m=g,p=a.wAdd(1-m,o,m,e),u.combinePoints(o,p))}else y.push(v.child1),y.push(v.child2)}}l.release(y),_.release(d)};var _=new m({create:function(){return{}},release:function(t){}}),l=new m({create:function(){return[]},release:function(t){t.length=0}}),u=new m({create:function(){return new n},release:function(t){t.close()}})},{"../Settings":7,"../common/Math":18,"../common/Vec2":23,"../util/Pool":48,"../util/common":50,"./AABB":11}],15:[function(t,i,o){function e(){this.proxyA=new f,this.proxyB=new f,this.sweepA=new u,this.sweepB=new u,this.tMax}function s(){this.state,this.t}function n(t,i){var o=a.now();++h.toiCalls,t.state=s.e_unknown,t.t=i.tMax;var e=i.proxyA,n=i.proxyB,_=i.sweepA,l=i.sweepB;_.normalize(),l.normalize();var u=i.tMax,f=e.m_radius+n.m_radius,x=c.max(m.linearSlop,f-3*m.linearSlop),g=.25*m.linearSlop,b=0,B=m.maxTOIIterations,w=0,S=new A,C=new d;for(C.proxyA=i.proxyA,C.proxyB=i.proxyB,C.useRadii=!1;;){var M=p.identity(),I=p.identity();_.getTransform(M,b),l.getTransform(I,b),C.transformA=M,C.transformB=I;var T=new v;if(y(T,S,C),T.distance<=0){t.state=s.e_overlapped,t.t=0;break}if(T.distance<x+g){t.state=s.e_touching,t.t=b;break}var P=new r;P.initialize(S,e,_,n,l,b);for(var V=!1,z=u,L=0;;){var R=P.findMinSeparation(z);P.indexA,P.indexB;if(R>x+g){t.state=s.e_separated,t.t=u,V=!0;break}if(R>x-g){b=z;break}var F=P.evaluate(b);P.indexA,P.indexB;if(F<x-g){t.state=s.e_failed,t.t=b,V=!0;break}if(F<=x+g){t.state=s.e_touching,t.t=b,V=!0;break}for(var D=0,q=b,E=z;;){var k;k=1&D?q+(x-F)*(E-q)/(R-F):.5*(q+E),++D,++h.toiRootIters;var j=P.evaluate(k);P.indexA,P.indexB;if(c.abs(j-x)<g){z=k;break}if(j>x?(q=k,F=j):(E=k,R=j),50==D)break}if(h.toiMaxRootIters=c.max(h.toiMaxRootIters,D),++L,L==m.maxPolygonVertices)break}if(++w,++h.toiIters,V)break;if(w==B){t.state=s.e_failed,t.t=b;break}}h.toiMaxIters=c.max(h.toiMaxIters,w);var J=a.diff(o);h.toiMaxTime=c.max(h.toiMaxTime,J),h.toiTime+=J}function r(){this.m_proxyA=new f,this.m_proxyB=new f,this.m_sweepA,this.m_sweepB,this.m_type,this.m_localPoint=_.zero(),this.m_axis=_.zero()}DEBUG=!1,ASSERT=!1,i.exports=n,i.exports.Input=e,i.exports.Output=s;var m=t("../Settings"),a=(t("../util/common"),t("../util/Timer")),h=t("../common/stats"),c=t("../common/Math"),_=t("../common/Vec2"),l=(t("../common/Vec3"),t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),u=t("../common/Sweep"),p=t("../common/Transform"),y=(t("../common/Velocity"),t("../common/Position"),t("./Distance")),d=y.Input,v=y.Output,f=y.Proxy,A=y.Cache;s.e_unknown=0,s.e_failed=1,s.e_overlapped=2,s.e_touching=3,s.e_separated=4,h.toiTime=0,h.toiMaxTime=0,h.toiCalls=0,h.toiIters=0,h.toiMaxIters=0,h.toiRootIters=0,h.toiMaxRootIters=0;var x=1,g=2,b=3;r.prototype.initialize=function(t,i,o,e,s,n){this.m_proxyA=i,this.m_proxyB=e;var r=t.count;this.m_sweepA=o,this.m_sweepB=s;var m=p.identity(),a=p.identity();if(this.m_sweepA.getTransform(m,n),this.m_sweepB.getTransform(a,n),1==r){this.m_type=x;var h=this.m_proxyA.getVertex(t.indexA[0]),c=this.m_proxyB.getVertex(t.indexB[0]),u=p.mul(m,h),y=p.mul(a,c);this.m_axis.wSet(1,y,-1,u);var d=this.m_axis.normalize();return d}if(t.indexA[0]==t.indexA[1]){this.m_type=b;var v=e.getVertex(t.indexB[0]),f=e.getVertex(t.indexB[1]);this.m_axis=_.cross(_.sub(f,v),1),this.m_axis.normalize();var A=l.mul(a.q,this.m_axis);this.m_localPoint=_.mid(v,f);var y=p.mul(a,this.m_localPoint),h=i.getVertex(t.indexA[0]),u=p.mul(m,h),d=_.dot(u,A)-_.dot(y,A);return d<0&&(this.m_axis=_.neg(this.m_axis),d=-d),d}this.m_type=g;var B=this.m_proxyA.getVertex(t.indexA[0]),w=this.m_proxyA.getVertex(t.indexA[1]);this.m_axis=_.cross(_.sub(w,B),1),this.m_axis.normalize();var A=l.mul(m.q,this.m_axis);this.m_localPoint=_.mid(B,w);var u=p.mul(m,this.m_localPoint),c=this.m_proxyB.getVertex(t.indexB[0]),y=p.mul(a,c),d=_.dot(y,A)-_.dot(u,A);return d<0&&(this.m_axis=_.neg(this.m_axis),d=-d),d},r.prototype.compute=function(t,i){var o=p.identity(),e=p.identity();switch(this.m_sweepA.getTransform(o,i),this.m_sweepB.getTransform(e,i),this.m_type){case x:if(t){var s=l.mulT(o.q,this.m_axis),n=l.mulT(e.q,_.neg(this.m_axis));this.indexA=this.m_proxyA.getSupport(s),this.indexB=this.m_proxyB.getSupport(n)}var r=this.m_proxyA.getVertex(this.indexA),m=this.m_proxyB.getVertex(this.indexB),a=p.mul(o,r),h=p.mul(e,m),c=_.dot(h,this.m_axis)-_.dot(a,this.m_axis);return c;case g:var u=l.mul(o.q,this.m_axis),a=p.mul(o,this.m_localPoint);if(t){var n=l.mulT(e.q,_.neg(u));this.indexA=-1,this.indexB=this.m_proxyB.getSupport(n)}var m=this.m_proxyB.getVertex(this.indexB),h=p.mul(e,m),c=_.dot(h,u)-_.dot(a,u);return c;case b:var u=l.mul(e.q,this.m_axis),h=p.mul(e,this.m_localPoint);if(t){var s=l.mulT(o.q,_.neg(u));this.indexB=-1,this.indexA=this.m_proxyA.getSupport(s)}var r=this.m_proxyA.getVertex(this.indexA),a=p.mul(o,r),c=_.dot(a,u)-_.dot(h,u);return c;default:return t&&(this.indexA=-1,this.indexB=-1),0}},r.prototype.findMinSeparation=function(t){return this.compute(!0,t)},r.prototype.evaluate=function(t){return this.compute(!1,t)}},{"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../common/stats":26,"../util/Timer":49,"../util/common":50,"./Distance":13}],16:[function(t,i,o){function e(t,i,o,e){"object"==typeof t&&null!==t?(this.ex=s.clone(t),this.ey=s.clone(i)):"number"==typeof t?(this.ex=s.neo(t,o),this.ey=s.neo(i,e)):(this.ex=s.zero(),this.ey=s.zero())}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Math"),t("./Vec2"));e.prototype.toString=function(){return JSON.stringify(this)},e.isValid=function(t){return t&&s.isValid(t.ex)&&s.isValid(t.ey)},e.assert=function(t){},e.prototype.set=function(t,i,o,e){"number"==typeof t&&"number"==typeof i&&"number"==typeof o&&"number"==typeof e?(this.ex.set(t,o),this.ey.set(i,e)):"object"==typeof t&&"object"==typeof i?(this.ex.set(t),this.ey.set(i)):"object"==typeof t&&(this.ex.set(t.ex),this.ey.set(t.ey))},e.prototype.setIdentity=function(){this.ex.x=1,this.ey.x=0,this.ex.y=0,this.ey.y=1},e.prototype.setZero=function(){this.ex.x=0,this.ey.x=0,this.ex.y=0,this.ey.y=0},e.prototype.getInverse=function(){var t=this.ex.x,i=this.ey.x,o=this.ex.y,s=this.ey.y,n=t*s-i*o;0!=n&&(n=1/n);var r=new e;return r.ex.x=n*s,r.ey.x=-n*i,r.ex.y=-n*o,r.ey.y=n*t,r},e.prototype.solve=function(t){var i=this.ex.x,o=this.ey.x,e=this.ex.y,n=this.ey.y,r=i*n-o*e;0!=r&&(r=1/r);var m=s.zero();return m.x=r*(n*t.x-o*t.y),m.y=r*(i*t.y-e*t.x),m},e.mul=function(t,i){if(i&&"x"in i&&"y"in i){var o=t.ex.x*i.x+t.ey.x*i.y,n=t.ex.y*i.x+t.ey.y*i.y;return s.neo(o,n)}if(i&&"ex"in i&&"ey"in i)return new e(s.mul(t,i.ex),s.mul(t,i.ey))},e.mulT=function(t,i){if(i&&"x"in i&&"y"in i)return s.neo(s.dot(i,t.ex),s.dot(i,t.ey));if(i&&"ex"in i&&"ey"in i){var o=s.neo(s.dot(t.ex,i.ex),s.dot(t.ey,i.ex)),n=s.neo(s.dot(t.ex,i.ey),s.dot(t.ey,i.ey));return new e(o,n)}},e.abs=function(t){return new e(s.abs(t.ex),s.abs(t.ey))},e.add=function(t,i){return new e(s.add(t.ex+i.ex),s.add(t.ey+i.ey))}},{"../util/common":50,"./Math":18,"./Vec2":23}],17:[function(t,i,o){function e(t,i,o){"object"==typeof t&&null!==t?(this.ex=n.clone(t),this.ey=n.clone(i),this.ez=n.clone(o)):(this.ex=n(),this.ey=n(),this.ez=n())}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Math"),t("./Vec2")),n=t("./Vec3");e.prototype.toString=function(){return JSON.stringify(this)},e.isValid=function(t){return t&&n.isValid(t.ex)&&n.isValid(t.ey)&&n.isValid(t.ez)},e.assert=function(t){},e.prototype.setZero=function(){return this.ex.setZero(),this.ey.setZero(),this.ez.setZero(),this},e.prototype.solve33=function(t){var i=n.dot(this.ex,n.cross(this.ey,this.ez));0!=i&&(i=1/i);var o=new n;return o.x=i*n.dot(t,n.cross(this.ey,this.ez)),o.y=i*n.dot(this.ex,n.cross(t,this.ez)),o.z=i*n.dot(this.ex,n.cross(this.ey,t)),o},e.prototype.solve22=function(t){var i=this.ex.x,o=this.ey.x,e=this.ex.y,n=this.ey.y,r=i*n-o*e;0!=r&&(r=1/r);var m=s.zero();return m.x=r*(n*t.x-o*t.y),m.y=r*(i*t.y-e*t.x),m},e.prototype.getInverse22=function(t){var i=this.ex.x,o=this.ey.x,e=this.ex.y,s=this.ey.y,n=i*s-o*e;0!=n&&(n=1/n),t.ex.x=n*s,t.ey.x=-n*o,t.ex.z=0,t.ex.y=-n*e,t.ey.y=n*i,t.ey.z=0,t.ez.x=0,t.ez.y=0,t.ez.z=0},e.prototype.getSymInverse33=function(t){var i=n.dot(this.ex,n.cross(this.ey,this.ez));0!=i&&(i=1/i);var o=this.ex.x,e=this.ey.x,s=this.ez.x,r=this.ey.y,m=this.ez.y,a=this.ez.z;t.ex.x=i*(r*a-m*m),t.ex.y=i*(s*m-e*a),t.ex.z=i*(e*m-s*r),t.ey.x=t.ex.y,t.ey.y=i*(o*a-s*s),t.ey.z=i*(s*e-o*m),t.ez.x=t.ex.z,t.ez.y=t.ey.z,t.ez.z=i*(o*r-e*e)},e.mul=function(t,i){if(i&&"z"in i&&"y"in i&&"x"in i){var o=t.ex.x*i.x+t.ey.x*i.y+t.ez.x*i.z,e=t.ex.y*i.x+t.ey.y*i.y+t.ez.y*i.z,r=t.ex.z*i.x+t.ey.z*i.y+t.ez.z*i.z;return new n(o,e,r)}if(i&&"y"in i&&"x"in i){var o=t.ex.x*i.x+t.ey.x*i.y,e=t.ex.y*i.x+t.ey.y*i.y;return s.neo(o,e)}},e.add=function(t,i){return new n(t.x+i.x,t.y+i.y,t.z+i.z)}},{"../util/common":50,"./Math":18,"./Vec2":23,"./Vec3":24}],18:[function(t,i,o){DEBUG=!1,ASSERT=!1;var e=(t("../util/common"),t("../util/create")),s=Math,n=i.exports=e(s);n.EPSILON=1e-9,n.isFinite=function(t){return"number"==typeof t&&isFinite(t)&&!isNaN(t)},n.assert=function(t){},n.invSqrt=function(t){return 1/s.sqrt(t)},n.nextPowerOfTwo=function(t){return t|=t>>1,t|=t>>2,t|=t>>4,t|=t>>8,t|=t>>16,t+1},n.isPowerOfTwo=function(t){return t>0&&0==(t&t-1)},n.mod=function(t,i,o){return"undefined"==typeof i?(o=1,i=0):"undefined"==typeof o&&(o=i,i=0),o>i?(t=(t-i)%(o-i),t+(t<0?o:i)):(t=(t-o)%(i-o),t+(t<=0?i:o))},n.clamp=function(t,i,o){return t<i?i:t>o?o:t},n.random=function(t,i){return"undefined"==typeof t?(i=1,t=0):"undefined"==typeof i&&(i=t,t=0),t==i?t:s.random()*(i-t)+t}},{"../util/common":50,"../util/create":51}],19:[function(t,i,o){function e(){this.c=s.zero(),this.a=0}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("./Vec2"),n=t("./Rot");e.prototype.getTransform=function(t,i){return t.q.set(this.a),t.p.set(s.sub(this.c,n.mul(t.q,i))),t}},{"./Rot":20,"./Vec2":23}],20:[function(t,i,o){function e(t){return this instanceof e?void("number"==typeof t?this.setAngle(t):"object"==typeof t?this.set(t):this.setIdentity()):new e(t)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Vec2")),n=t("./Math");e.neo=function(t){var i=Object.create(e.prototype);return i.setAngle(t),i},e.clone=function(t){Object.create(e.prototype);return ojb.s=t.s,ojb.c=t.c,ojb},e.identity=function(t){var i=Object.create(e.prototype);return i.s=0,i.c=1,i},e.isValid=function(t){return t&&n.isFinite(t.s)&&n.isFinite(t.c)},e.assert=function(t){},e.prototype.setIdentity=function(){this.s=0,this.c=1},e.prototype.set=function(t){"object"==typeof t?(this.s=t.s,this.c=t.c):(this.s=n.sin(t),this.c=n.cos(t))},e.prototype.setAngle=function(t){this.s=n.sin(t),this.c=n.cos(t)},e.prototype.getAngle=function(){return n.atan2(this.s,this.c)},e.prototype.getXAxis=function(){return s.neo(this.c,this.s)},e.prototype.getYAxis=function(){return s.neo(-this.s,this.c)},e.mul=function(t,i){if("c"in i&&"s"in i){var o=e.identity();return o.s=t.s*i.c+t.c*i.s,o.c=t.c*i.c-t.s*i.s,o}if("x"in i&&"y"in i)return s.neo(t.c*i.x-t.s*i.y,t.s*i.x+t.c*i.y)},e.mulSub=function(t,i,o){var e=t.c*(i.x-o.x)-t.s*(i.y-o.y),n=t.s*(i.x-o.y)+t.c*(i.y-o.y);return s.neo(e,n)},e.mulT=function(t,i){if("c"in i&&"s"in i){var o=e.identity();return o.s=t.c*i.s-t.s*i.c,o.c=t.c*i.c+t.s*i.s,o}if("x"in i&&"y"in i)return s.neo(t.c*i.x+t.s*i.y,-t.s*i.x+t.c*i.y)}},{"../util/common":50,"./Math":18,"./Vec2":23}],21:[function(t,i,o){function e(t,i){this.localCenter=n.zero(),this.c=n.zero(),this.a=0,this.alpha0=0,this.c0=n.zero(),this.a0=0}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Math")),n=t("./Vec2"),r=t("./Rot"),m=t("./Transform");e.prototype.setTransform=function(t){var i=m.mul(t,this.localCenter);this.c.set(i),this.c0.set(i),this.a=t.q.getAngle(),this.a0=t.q.getAngle()},e.prototype.setLocalCenter=function(t,i){this.localCenter.set(t);var o=m.mul(i,this.localCenter);this.c.set(o),this.c0.set(o)},e.prototype.getTransform=function(t,i){i="undefined"==typeof i?0:i,t.q.setAngle((1-i)*this.a0+i*this.a),t.p.wSet(1-i,this.c0,i,this.c),t.p.sub(r.mul(t.q,this.localCenter))},e.prototype.advance=function(t){var i=(t-this.alpha0)/(1-this.alpha0);this.c0.wSet(i,this.c,1-i,this.c0),this.a0=i*this.a+(1-i)*this.a0,this.alpha0=t},e.prototype.forward=function(){this.a0=this.a,this.c0.set(this.c)},e.prototype.normalize=function(){var t=s.mod(this.a0,-s.PI,+s.PI);this.a-=this.a0-t,this.a0=t},e.prototype.clone=function(){var t=new e;return t.localCenter.set(this.localCenter),t.alpha0=this.alpha0,t.a0=this.a0,t.a=this.a,t.c0.set(this.c0),t.c.set(this.c),t},e.prototype.set=function(t){this.localCenter.set(t.localCenter),this.alpha0=t.alpha0,this.a0=t.a0,this.a=t.a,this.c0.set(t.c0),this.c.set(t.c)}},{"../util/common":50,"./Math":18,"./Rot":20,"./Transform":22,"./Vec2":23}],22:[function(t,i,o){function e(t,i){return this instanceof e?(this.p=s.zero(),this.q=n.identity(),"undefined"!=typeof t&&this.p.set(t),void("undefined"!=typeof i&&this.q.set(i))):new e(t,i)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Vec2")),n=t("./Rot");e.clone=function(t){var i=Object.create(e.prototype);return i.p=s.clone(t.p),i.q=n.clone(t.q),i},e.neo=function(t,i){var o=Object.create(e.prototype);return o.p=s.clone(t),o.q=n.clone(i),o},e.identity=function(){var t=Object.create(e.prototype);return t.p=s.zero(),t.q=n.identity(),t},e.prototype.setIdentity=function(){this.p.setZero(),this.q.setIdentity()},e.prototype.set=function(t,i){e.isValid(t)?(this.p.set(t.p),this.q.set(t.q)):(this.p.set(t),this.q.set(i))},e.isValid=function(t){return t&&s.isValid(t.p)&&n.isValid(t.q)},e.assert=function(t){},e.mul=function(t,i){if(Array.isArray(i)){for(var o=[],r=0;r<i.length;r++)o[r]=e.mul(t,i[r]);return o}if("x"in i&&"y"in i){var m=t.q.c*i.x-t.q.s*i.y+t.p.x,a=t.q.s*i.x+t.q.c*i.y+t.p.y;return s.neo(m,a)}if("p"in i&&"q"in i){var h=e.identity();return h.q=n.mul(t.q,i.q),h.p=s.add(n.mul(t.q,i.p),t.p),h}},e.mulT=function(t,i){if("x"in i&&"y"in i){var o=i.x-t.p.x,r=i.y-t.p.y,m=t.q.c*o+t.q.s*r,a=-t.q.s*o+t.q.c*r;return s.neo(m,a)}if("p"in i&&"q"in i){var h=e.identity();return h.q.set(n.mulT(t.q,i.q)),h.p.set(n.mulT(t.q,s.sub(i.p,t.p))),h}}},{"../util/common":50,"./Rot":20,"./Vec2":23}],23:[function(t,i,o){function e(t,i){return this instanceof e?void("undefined"==typeof t?(this.x=0,this.y=0):"object"==typeof t?(this.x=t.x,this.y=t.y):(this.x=t,this.y=i)):new e(t,i)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Math"));e.zero=function(){var t=Object.create(e.prototype);return t.x=0,t.y=0,t},e.neo=function(t,i){var o=Object.create(e.prototype);return o.x=t,o.y=i,o},e.clone=function(t,i){return e.neo(t.x,t.y)},e.prototype.toString=function(){return JSON.stringify(this)},e.isValid=function(t){return t&&s.isFinite(t.x)&&s.isFinite(t.y)},e.assert=function(t){},e.prototype.clone=function(t){return e.clone(this,t)},e.prototype.setZero=function(){return this.x=0,this.y=0,this},e.prototype.set=function(t,i){return"object"==typeof t?(this.x=t.x,this.y=t.y):(this.x=t,this.y=i),this},e.prototype.wSet=function(t,i,o,e){var s=t*i.x,n=t*i.y;return"undefined"==typeof o&&"undefined"==typeof e||(s+=o*e.x,n+=o*e.y),this.x=s,this.y=n,this},e.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},e.prototype.wAdd=function(t,i,o,e){var s=t*i.x,n=t*i.y;return"undefined"==typeof o&&"undefined"==typeof e||(s+=o*e.x,n+=o*e.y),this.x+=s,this.y+=n,this},e.prototype.wSub=function(t,i,o,e){var s=t*i.x,n=t*i.y;return"undefined"==typeof o&&"undefined"==typeof e||(s+=o*e.x,n+=o*e.y),this.x-=s,this.y-=n,this},e.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this},e.prototype.mul=function(t){return this.x*=t,this.y*=t,this},e.prototype.length=function(){return e.lengthOf(this)},e.prototype.lengthSquared=function(){return e.lengthSquared(this)},e.prototype.normalize=function(){var t=this.length();if(t<s.EPSILON)return 0;var i=1/t;return this.x*=i,this.y*=i,t},e.lengthOf=function(t){return s.sqrt(t.x*t.x+t.y*t.y)},e.lengthSquared=function(t){return t.x*t.x+t.y*t.y},e.distance=function(t,i){var o=t.x-i.x,e=t.y-i.y;return s.sqrt(o*o+e*e)},e.distanceSquared=function(t,i){var o=t.x-i.x,e=t.y-i.y;return o*o+e*e},e.areEqual=function(t,i){return t==i||"object"==typeof i&&null!==i&&t.x==i.x&&t.y==i.y},e.skew=function(t){return e.neo(-t.y,t.x)},e.dot=function(t,i){return t.x*i.x+t.y*i.y},e.cross=function(t,i){return"number"==typeof i?e.neo(i*t.y,-i*t.x):"number"==typeof t?e.neo(-t*i.y,t*i.x):t.x*i.y-t.y*i.x},e.addCross=function(t,i,o){return"number"==typeof o?e.neo(o*i.y+t.x,-o*i.x+t.y):"number"==typeof i?e.neo(-i*o.y+t.x,i*o.x+t.y):void 0},e.add=function(t,i){return e.neo(t.x+i.x,t.y+i.y)},e.wAdd=function(t,i,o,s){var n=e.zero();return n.wAdd(t,i,o,s),n},e.sub=function(t,i){return e.neo(t.x-i.x,t.y-i.y)},e.mul=function(t,i){return"object"==typeof t?e.neo(t.x*i,t.y*i):"object"==typeof i?e.neo(t*i.x,t*i.y):void 0},e.prototype.neg=function(){return this.x=-this.x,this.y=-this.y,this},e.neg=function(t){return e.neo(-t.x,-t.y)},e.abs=function(t){return e.neo(s.abs(t.x),s.abs(t.y))},e.mid=function(t,i){return e.neo(.5*(t.x+i.x),.5*(t.y+i.y))},e.upper=function(t,i){return e.neo(s.max(t.x,i.x),s.max(t.y,i.y))},e.lower=function(t,i){return e.neo(s.min(t.x,i.x),s.min(t.y,i.y))},e.prototype.clamp=function(t){var i=this.x*this.x+this.y*this.y;if(i>t*t){var o=s.invSqrt(i);this.x*=o*t,this.y*=o*t}return this},e.clamp=function(t,i){return t=e.neo(t.x,t.y),t.clamp(i),t}},{"../util/common":50,"./Math":18}],24:[function(t,i,o){function e(t,i,o){return this instanceof e?void("undefined"==typeof t?(this.x=0,this.y=0,this.z=0):"object"==typeof t?(this.x=t.x,this.y=t.y,this.z=t.z):(this.x=t,this.y=i,this.z=o)):new e(t,i,o)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("./Math"));e.prototype.toString=function(){return JSON.stringify(this)},e.isValid=function(t){return t&&s.isFinite(t.x)&&s.isFinite(t.y)&&s.isFinite(t.z)},e.assert=function(t){},e.prototype.setZero=function(){return this.x=0,this.y=0,this.z=0,this},e.prototype.set=function(t,i,o){return this.x=t,this.y=i,this.z=o,this},e.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this},e.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this},e.prototype.mul=function(t){return this.x*=t,this.y*=t,this.z*=t,this},e.areEqual=function(t,i){return t==i||"object"==typeof i&&null!==i&&t.x==i.x&&t.y==i.y&&t.z==i.z},e.dot=function(t,i){return t.x*i.x+t.y*i.y+t.z*i.z},e.cross=function(t,i){return new e(t.y*i.z-t.z*i.y,t.z*i.x-t.x*i.z,t.x*i.y-t.y*i.x)},e.add=function(t,i){return new e(t.x+i.x,t.y+i.y,t.z+i.z)},e.sub=function(t,i){return new e(t.x-i.x,t.y-i.y,t.z-i.z)},e.mul=function(t,i){return new e(i*t.x,i*t.y,i*t.z)},e.prototype.neg=function(t){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this},e.neg=function(t){return new e((-t.x),(-t.y),(-t.z))}},{"../util/common":50,"./Math":18}],25:[function(t,i,o){function e(){this.v=s.zero(),this.w=0}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("./Vec2")},{"./Vec2":23}],26:[function(t,i,o){DEBUG=!1,ASSERT=!1,o.toString=function(t){t="string"==typeof t?t:"\n";var i="";for(var o in this)"function"!=typeof this[o]&&"object"!=typeof this[o]&&(i+=o+": "+this[o]+t);return i}},{}],27:[function(t,i,o){function e(t,i,o,n,r){return this instanceof e?(t=s(t,_),c.call(this,t,i,n),this.m_type=e.TYPE,this.m_localAnchorA=t.localAnchorA||i.getLocalPoint(o),this.m_localAnchorB=t.localAnchorB||n.getLocalPoint(r),this.m_length=a.distance(r,o),this.m_frequencyHz=t.frequencyHz,this.m_dampingRatio=t.dampingRatio,this.m_impulse=0,this.m_gamma=0,this.m_bias=0,this.m_u,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,void this.m_mass):new e(t,i,o,n,r)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("../util/options"),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=(t("../common/Vec3"),t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),c=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="distance-joint",e._super=c,e.prototype=n(e._super.prototype);var _={frequencyHz:0,dampingRatio:0};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.setLength=function(t){this.m_length=t},e.prototype.getLength=function(){return this.m_length},e.prototype.setFrequency=function(t){this.m_frequencyHz=t},e.prototype.getFrequency=function(){return this.m_frequencyHz},e.prototype.setDampingRatio=function(t){this.m_dampingRatio=t},e.prototype.getDampingRatio=function(){return this.m_dampingRatio},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){var i=a.mul(t*this.m_impulse,this.m_u);return i},e.prototype.getReactionTorque=function(t){return 0},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,
this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,n=this.m_bodyB.c_position.c,c=this.m_bodyB.c_position.a,_=this.m_bodyB.c_velocity.v,l=this.m_bodyB.c_velocity.w,u=h.neo(o),p=h.neo(c);this.m_rA=h.mul(u,a.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=h.mul(p,a.sub(this.m_localAnchorB,this.m_localCenterB)),this.m_u=a.sub(a.add(n,this.m_rB),a.add(i,this.m_rA));var y=this.m_u.length();y>r.linearSlop?this.m_u.mul(1/y):this.m_u.set(0,0);var d=a.cross(this.m_rA,this.m_u),v=a.cross(this.m_rB,this.m_u),f=this.m_invMassA+this.m_invIA*d*d+this.m_invMassB+this.m_invIB*v*v;if(this.m_mass=0!=f?1/f:0,this.m_frequencyHz>0){var A=y-this.m_length,x=2*m.PI*this.m_frequencyHz,g=2*this.m_mass*this.m_dampingRatio*x,b=this.m_mass*x*x,B=t.dt;this.m_gamma=B*(g+B*b),this.m_gamma=0!=this.m_gamma?1/this.m_gamma:0,this.m_bias=A*B*b*this.m_gamma,f+=this.m_gamma,this.m_mass=0!=f?1/f:0}else this.m_gamma=0,this.m_bias=0;if(t.warmStarting){this.m_impulse*=t.dtRatio;var w=a.mul(this.m_impulse,this.m_u);e.wSub(this.m_invMassA,w),s-=this.m_invIA*a.cross(this.m_rA,w),_.wAdd(this.m_invMassB,w),l+=this.m_invIB*a.cross(this.m_rB,w)}else this.m_impulse=0;this.m_bodyA.c_velocity.v.set(e),this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v.set(_),this.m_bodyB.c_velocity.w=l},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=a.add(i,a.cross(o,this.m_rA)),r=a.add(e,a.cross(s,this.m_rB)),m=a.dot(this.m_u,r)-a.dot(this.m_u,n),h=-this.m_mass*(m+this.m_bias+this.m_gamma*this.m_impulse);this.m_impulse+=h;var c=a.mul(h,this.m_u);i.wSub(this.m_invMassA,c),o-=this.m_invIA*a.cross(this.m_rA,c),e.wAdd(this.m_invMassB,c),s+=this.m_invIB*a.cross(this.m_rB,c),this.m_bodyA.c_velocity.v.set(i),this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v.set(e),this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){if(this.m_frequencyHz>0)return!0;var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyB.c_position.c,s=this.m_bodyB.c_position.a,n=h.neo(o),c=h.neo(s),_=h.mulSub(n,this.m_localAnchorA,this.m_localCenterA),l=h.mulSub(c,this.m_localAnchorB,this.m_localCenterB),u=a.sub(a.add(e,l),a.add(i,_)),p=u.normalize(),y=p-this.m_length;y=m.clamp(y,-r.maxLinearCorrection,r.maxLinearCorrection);var d=-this.m_mass*y,v=a.mul(d,u);return i.wSub(this.m_invMassA,v),o-=this.m_invIA*a.cross(_,v),e.wAdd(this.m_invMassB,v),s+=this.m_invIB*a.cross(l,v),this.m_bodyA.c_position.c.set(i),this.m_bodyA.c_position.a=o,this.m_bodyB.c_position.c.set(e),this.m_bodyB.c_position.a=s,m.abs(y)<r.linearSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":51,"../util/options":52}],28:[function(t,i,o){function e(t,i,o,n){return this instanceof e?(t=s(t,_),c.call(this,t,i,o),this.m_type=e.TYPE,n?(this.m_localAnchorA=i.getLocalPoint(n),this.m_localAnchorB=o.getLocalPoint(n)):(this.m_localAnchorA=m.zero(),this.m_localAnchorB=m.zero()),this.m_linearImpulse=m.zero(),this.m_angularImpulse=0,this.m_maxForce=t.maxForce,this.m_maxTorque=t.maxTorque,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,this.m_linearMass,void this.m_angularMass):new e(t,i,o,n)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=(t("../Settings"),t("../common/Math")),m=t("../common/Vec2"),a=(t("../common/Vec3"),t("../common/Mat22")),h=(t("../common/Mat33"),t("../common/Rot")),c=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="friction-joint",e._super=c,e.prototype=n(e._super.prototype);var _={maxForce:0,maxTorque:0};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.setMaxForce=function(t){this.m_maxForce=t},e.prototype.getMaxForce=function(){return this.m_maxForce},e.prototype.setMaxTorque=function(t){this.m_maxTorque=t},e.prototype.getMaxTorque=function(){return this.m_maxTorque},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){return t*this.m_linearImpulse},e.prototype.getReactionTorque=function(t){return t*this.m_angularImpulse},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.a,o=this.m_bodyA.c_velocity.v,e=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_position.a,n=this.m_bodyB.c_velocity.v,r=this.m_bodyB.c_velocity.w,c=h.neo(i),_=h.neo(s);this.m_rA=h.mul(c,m.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=h.mul(_,m.sub(this.m_localAnchorB,this.m_localCenterB));var l=this.m_invMassA,u=this.m_invMassB,p=this.m_invIA,y=this.m_invIB,d=new a;if(d.ex.x=l+u+p*this.m_rA.y*this.m_rA.y+y*this.m_rB.y*this.m_rB.y,d.ex.y=-p*this.m_rA.x*this.m_rA.y-y*this.m_rB.x*this.m_rB.y,d.ey.x=d.ex.y,d.ey.y=l+u+p*this.m_rA.x*this.m_rA.x+y*this.m_rB.x*this.m_rB.x,this.m_linearMass=d.getInverse(),this.m_angularMass=p+y,this.m_angularMass>0&&(this.m_angularMass=1/this.m_angularMass),t.warmStarting){this.m_linearImpulse.mul(t.dtRatio),this.m_angularImpulse*=t.dtRatio;var v=m.neo(this.m_linearImpulse.x,this.m_linearImpulse.y);o.wSub(l,v),e-=p*(m.cross(this.m_rA,v)+this.m_angularImpulse),n.wAdd(u,v),r+=y*(m.cross(this.m_rB,v)+this.m_angularImpulse)}else this.m_linearImpulse.setZero(),this.m_angularImpulse=0;this.m_bodyA.c_velocity.v=o,this.m_bodyA.c_velocity.w=e,this.m_bodyB.c_velocity.v=n,this.m_bodyB.c_velocity.w=r},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=this.m_invMassA,h=this.m_invMassB,c=this.m_invIA,_=this.m_invIB,l=t.dt,u=s-o,p=-this.m_angularMass*u,y=this.m_angularImpulse,d=l*this.m_maxTorque;this.m_angularImpulse=r.clamp(this.m_angularImpulse+p,-d,d),p=this.m_angularImpulse-y,o-=c*p,s+=_*p;var u=m.sub(m.add(e,m.cross(s,this.m_rB)),m.add(i,m.cross(o,this.m_rA))),p=m.neg(a.mul(this.m_linearMass,u)),y=this.m_linearImpulse;this.m_linearImpulse.add(p);var d=l*this.m_maxForce;this.m_linearImpulse.lengthSquared()>d*d&&(this.m_linearImpulse.normalize(),this.m_linearImpulse.mul(d)),p=m.sub(this.m_linearImpulse,y),i.wSub(n,p),o-=c*m.cross(this.m_rA,p),e.wAdd(h,p),s+=_*m.cross(this.m_rB,p),this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){return!0}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],29:[function(t,i,o){function e(t,i,o,n,r,l){if(!(this instanceof e))return new e(t,i,o,n,r,l);t=s(t,_),h.call(this,t,i,o),this.m_type=e.TYPE,this.m_joint1=n,this.m_joint2=r,this.m_type1=this.m_joint1.getType(),this.m_type2=this.m_joint2.getType();var u,p;this.m_bodyC=this.m_joint1.getBodyA(),this.m_bodyA=this.m_joint1.getBodyB();var y=this.m_bodyA.m_xf,d=this.m_bodyA.m_sweep.a,v=this.m_bodyC.m_xf,f=this.m_bodyC.m_sweep.a;if(this.m_type1==c.TYPE){var A=n;this.m_localAnchorC=A.m_localAnchorA,this.m_localAnchorA=A.m_localAnchorB,this.m_referenceAngleA=A.m_referenceAngle,this.m_localAxisC=m.zero(),u=d-f-this.m_referenceAngleA}else{var x=n;this.m_localAnchorC=x.m_localAnchorA,this.m_localAnchorA=x.m_localAnchorB,this.m_referenceAngleA=x.m_referenceAngle,this.m_localAxisC=x.m_localXAxisA;var g=this.m_localAnchorC,b=a.mulT(v.q,m.add(a.mul(y.q,this.m_localAnchorA),m.sub(y.p,v.p)));u=m.dot(b,this.m_localAxisC)-m.dot(g,this.m_localAxisC)}this.m_bodyD=this.m_joint2.getBodyA(),this.m_bodyB=this.m_joint2.getBodyB();var B=this.m_bodyB.m_xf,w=this.m_bodyB.m_sweep.a,S=this.m_bodyD.m_xf,C=this.m_bodyD.m_sweep.a;if(this.m_type2==c.TYPE){var A=r;this.m_localAnchorD=A.m_localAnchorA,this.m_localAnchorB=A.m_localAnchorB,this.m_referenceAngleB=A.m_referenceAngle,this.m_localAxisD=m.zero(),p=w-C-this.m_referenceAngleB}else{var x=r;this.m_localAnchorD=x.m_localAnchorA,this.m_localAnchorB=x.m_localAnchorB,this.m_referenceAngleB=x.m_referenceAngle,this.m_localAxisD=x.m_localXAxisA;var M=this.m_localAnchorD,I=a.mulT(S.q,m.add(a.mul(B.q,this.m_localAnchorB),m.sub(B.p,S.p)));p=m.dot(I,this.m_localAxisD)-m.dot(M,this.m_localAxisD)}this.m_ratio=l||t.ratio,this.m_constant=u+this.m_ratio*p,this.m_impulse=0,this.m_lcA,this.m_lcB,this.m_lcC,this.m_lcD,this.m_mA,this.m_mB,this.m_mC,this.m_mD,this.m_iA,this.m_iB,this.m_iC,this.m_iD,this.m_JvAC,this.m_JvBD,this.m_JwA,this.m_JwB,this.m_JwC,this.m_JwD,this.m_mass}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=t("../Settings"),m=(t("../common/Math"),t("../common/Vec2")),a=(t("../common/Vec3"),t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),h=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint")),c=t("./RevoluteJoint");t("./PrismaticJoint");e.TYPE="gear-joint",e._super=h,e.prototype=n(e._super.prototype);var _={ratio:1};e.prototype.getJoint1=function(){return this.m_joint1},e.prototype.getJoint2=function(){return this.m_joint2},e.prototype.setRatio=function(t){this.m_ratio=t},e.prototype.setRatio=function(){return this.m_ratio},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){var i=this.m_impulse*this.m_JvAC;return t*i},e.prototype.getReactionTorque=function(t){var i=this.m_impulse*this.m_JwA;return t*i},e.prototype.initVelocityConstraints=function(t){this.m_lcA=this.m_bodyA.m_sweep.localCenter,this.m_lcB=this.m_bodyB.m_sweep.localCenter,this.m_lcC=this.m_bodyC.m_sweep.localCenter,this.m_lcD=this.m_bodyD.m_sweep.localCenter,this.m_mA=this.m_bodyA.m_invMass,this.m_mB=this.m_bodyB.m_invMass,this.m_mC=this.m_bodyC.m_invMass,this.m_mD=this.m_bodyD.m_invMass,this.m_iA=this.m_bodyA.m_invI,this.m_iB=this.m_bodyB.m_invI,this.m_iC=this.m_bodyC.m_invI,this.m_iD=this.m_bodyD.m_invI;var i=this.m_bodyA.c_position.a,o=this.m_bodyA.c_velocity.v,e=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_position.a,n=this.m_bodyB.c_velocity.v,r=this.m_bodyB.c_velocity.w,h=this.m_bodyC.c_position.a,_=this.m_bodyC.c_velocity.v,l=this.m_bodyC.c_velocity.w,u=this.m_bodyD.c_position.a,p=this.m_bodyD.c_velocity.v,y=this.m_bodyD.c_velocity.w,d=a.neo(i),v=a.neo(s),f=a.neo(h),A=a.neo(u);if(this.m_mass=0,this.m_type1==c.TYPE)this.m_JvAC=m.zero(),this.m_JwA=1,this.m_JwC=1,this.m_mass+=this.m_iA+this.m_iC;else{var x=a.mul(f,this.m_localAxisC),g=a.mulSub(f,this.m_localAnchorC,this.m_lcC),b=a.mulSub(d,this.m_localAnchorA,this.m_lcA);this.m_JvAC=x,this.m_JwC=m.cross(g,x),this.m_JwA=m.cross(b,x),this.m_mass+=this.m_mC+this.m_mA+this.m_iC*this.m_JwC*this.m_JwC+this.m_iA*this.m_JwA*this.m_JwA}if(this.m_type2==c.TYPE)this.m_JvBD=m.zero(),this.m_JwB=this.m_ratio,this.m_JwD=this.m_ratio,this.m_mass+=this.m_ratio*this.m_ratio*(this.m_iB+this.m_iD);else{var x=a.mul(A,this.m_localAxisD),B=a.mulSub(A,this.m_localAnchorD,this.m_lcD),w=a.mulSub(v,this.m_localAnchorB,this.m_lcB);this.m_JvBD=m.mul(this.m_ratio,x),this.m_JwD=this.m_ratio*m.cross(B,x),this.m_JwB=this.m_ratio*m.cross(w,x),this.m_mass+=this.m_ratio*this.m_ratio*(this.m_mD+this.m_mB)+this.m_iD*this.m_JwD*this.m_JwD+this.m_iB*this.m_JwB*this.m_JwB}this.m_mass=this.m_mass>0?1/this.m_mass:0,t.warmStarting?(o.wAdd(this.m_mA*this.m_impulse,this.m_JvAC),e+=this.m_iA*this.m_impulse*this.m_JwA,n.wAdd(this.m_mB*this.m_impulse,this.m_JvBD),r+=this.m_iB*this.m_impulse*this.m_JwB,_.wSub(this.m_mC*this.m_impulse,this.m_JvAC),l-=this.m_iC*this.m_impulse*this.m_JwC,p.wSub(this.m_mD*this.m_impulse,this.m_JvBD),y-=this.m_iD*this.m_impulse*this.m_JwD):this.m_impulse=0,this.m_bodyA.c_velocity.v.set(o),this.m_bodyA.c_velocity.w=e,this.m_bodyB.c_velocity.v.set(n),this.m_bodyB.c_velocity.w=r,this.m_bodyC.c_velocity.v.set(_),this.m_bodyC.c_velocity.w=l,this.m_bodyD.c_velocity.v.set(p),this.m_bodyD.c_velocity.w=y},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=this.m_bodyC.c_velocity.v,r=this.m_bodyC.c_velocity.w,a=this.m_bodyD.c_velocity.v,h=this.m_bodyD.c_velocity.w,c=m.dot(this.m_JvAC,i)-m.dot(this.m_JvAC,n)+m.dot(this.m_JvBD,e)-m.dot(this.m_JvBD,a);c+=this.m_JwA*o-this.m_JwC*r+(this.m_JwB*s-this.m_JwD*h);var _=-this.m_mass*c;this.m_impulse+=_,i.wAdd(this.m_mA*_,this.m_JvAC),o+=this.m_iA*_*this.m_JwA,e.wAdd(this.m_mB*_,this.m_JvBD),s+=this.m_iB*_*this.m_JwB,n.wSub(this.m_mC*_,this.m_JvAC),r-=this.m_iC*_*this.m_JwC,a.wSub(this.m_mD*_,this.m_JvBD),h-=this.m_iD*_*this.m_JwD,this.m_bodyA.c_velocity.v.set(i),this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v.set(e),this.m_bodyB.c_velocity.w=s,this.m_bodyC.c_velocity.v.set(n),this.m_bodyC.c_velocity.w=r,this.m_bodyD.c_velocity.v.set(a),this.m_bodyD.c_velocity.w=h},e.prototype.solvePositionConstraints=function(t){var i,o,e,s,n,h,_,l,u=this.m_bodyA.c_position.c,p=this.m_bodyA.c_position.a,y=this.m_bodyB.c_position.c,d=this.m_bodyB.c_position.a,v=this.m_bodyC.c_position.c,f=this.m_bodyC.c_position.a,A=this.m_bodyD.c_position.c,x=this.m_bodyD.c_position.a,g=a.neo(p),b=a.neo(d),B=a.neo(f),w=a.neo(x),S=0,C=0;if(this.m_type1==c.TYPE)e=m.zero(),n=1,_=1,C+=this.m_iA+this.m_iC,i=p-f-this.m_referenceAngleA;else{var M=a.mul(B,this.m_localAxisC),I=a.mulSub(B,this.m_localAnchorC,this.m_lcC),T=a.mulSub(g,this.m_localAnchorA,this.m_lcA);e=M,_=m.cross(I,M),n=m.cross(T,M),C+=this.m_mC+this.m_mA+this.m_iC*_*_+this.m_iA*n*n;var P=this.m_localAnchorC-this.m_lcC,V=a.mulT(B,m.add(T,m.sub(u,v)));i=Dot(V-P,this.m_localAxisC)}if(this.m_type2==c.TYPE)s=m.zero(),h=this.m_ratio,l=this.m_ratio,C+=this.m_ratio*this.m_ratio*(this.m_iB+this.m_iD),o=d-x-this.m_referenceAngleB;else{var M=a.mul(w,this.m_localAxisD),z=a.mulSub(w,this.m_localAnchorD,this.m_lcD),L=a.mulSub(b,this.m_localAnchorB,this.m_lcB);s=m.mul(this.m_ratio,M),l=this.m_ratio*m.cross(z,M),h=this.m_ratio*m.cross(L,M),C+=this.m_ratio*this.m_ratio*(this.m_mD+this.m_mB)+this.m_iD*l*l+this.m_iB*h*h;var R=m.sub(this.m_localAnchorD,this.m_lcD),F=a.mulT(w,m.add(L,m.sub(y,A)));o=m.dot(F,this.m_localAxisD)-m.dot(R,this.m_localAxisD)}var D=i+this.m_ratio*o-this.m_constant,q=0;return C>0&&(q=-D/C),u.wAdd(this.m_mA*q,e),p+=this.m_iA*q*n,y.wAdd(this.m_mB*q,s),d+=this.m_iB*q*h,v.wAdd(this.m_mC*q,e),f-=this.m_iC*q*_,A.wAdd(this.m_mD*q,s),x-=this.m_iD*q*l,this.m_bodyA.c_position.c.set(u),this.m_bodyA.c_position.a=p,this.m_bodyB.c_position.c.set(y),this.m_bodyB.c_position.a=d,this.m_bodyC.c_position.c.set(v),this.m_bodyC.c_position.a=f,this.m_bodyD.c_position.c.set(A),this.m_bodyD.c_position.a=x,S<r.linearSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52,"./PrismaticJoint":32,"./RevoluteJoint":34}],30:[function(t,i,o){function e(t,i,o){if(!(this instanceof e))return new e(t,i,o);t=s(t,_),c.call(this,t,i,o),this.m_type=e.TYPE;var n=o.getPosition();this.m_linearOffset=i.getLocalPoint(n);var r=i.getAngle(),a=o.getAngle();this.m_angularOffset=a-r,this.m_linearImpulse=m.zero(),this.m_angularImpulse=0,this.m_maxForce=t.maxForce,this.m_maxTorque=t.maxTorque,this.m_correctionFactor=t.correctionFactor,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_linearError,this.m_angularError,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,this.m_linearMass,this.m_angularMass}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=(t("../Settings"),t("../common/Math")),m=t("../common/Vec2"),a=(t("../common/Vec3"),t("../common/Mat22")),h=(t("../common/Mat33"),t("../common/Rot")),c=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="motor-joint",e._super=c,e.prototype=n(e._super.prototype);var _={maxForce:1,maxTorque:1,correctionFactor:.3};e.prototype.setMaxForce=function(t){this.m_maxForce=t},e.prototype.getMaxForce=function(){return this.m_maxForce},e.prototype.setMaxTorque=function(t){this.m_maxTorque=t},e.prototype.getMaxTorque=function(){return this.m_maxTorque},e.prototype.setCorrectionFactor=function(t){this.m_correctionFactor=t},e.prototype.getCorrectionFactor=function(){return this.m_correctionFactor},e.prototype.setLinearOffset=function(t){t.x==this.m_linearOffset.x&&t.y==this.m_linearOffset.y||(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_linearOffset=t)},e.prototype.getLinearOffset=function(){return this.m_linearOffset},e.prototype.setAngularOffset=function(t){t!=this.m_angularOffset&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_angularOffset=t)},e.prototype.getAngularOffset=function(){return this.m_angularOffset},e.prototype.getAnchorA=function(){return this.m_bodyA.getPosition()},e.prototype.getAnchorB=function(){return this.m_bodyB.getPosition()},e.prototype.getReactionForce=function(t){return t*this.m_linearImpulse},e.prototype.getReactionTorque=function(t){return t*this.m_angularImpulse},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,n=this.m_bodyB.c_position.c,r=this.m_bodyB.c_position.a,c=this.m_bodyB.c_velocity.v,_=this.m_bodyB.c_velocity.w,l=h.neo(o),u=h.neo(r);this.m_rA=h.mul(l,m.neg(this.m_localCenterA)),this.m_rB=h.mul(u,m.neg(this.m_localCenterB));var p=this.m_invMassA,y=this.m_invMassB,d=this.m_invIA,v=this.m_invIB,f=new a;if(f.ex.x=p+y+d*this.m_rA.y*this.m_rA.y+v*this.m_rB.y*this.m_rB.y,f.ex.y=-d*this.m_rA.x*this.m_rA.y-v*this.m_rB.x*this.m_rB.y,f.ey.x=f.ex.y,f.ey.y=p+y+d*this.m_rA.x*this.m_rA.x+v*this.m_rB.x*this.m_rB.x,this.m_linearMass=f.getInverse(),this.m_angularMass=d+v,this.m_angularMass>0&&(this.m_angularMass=1/this.m_angularMass),this.m_linearError=m.zero(),this.m_linearError.wAdd(1,n,1,this.m_rB),this.m_linearError.wSub(1,i,1,this.m_rA),this.m_linearError.sub(h.mul(l,this.m_linearOffset)),this.m_angularError=r-o-this.m_angularOffset,t.warmStarting){this.m_linearImpulse.mul(t.dtRatio),this.m_angularImpulse*=t.dtRatio;var A=m.neo(this.m_linearImpulse.x,this.m_linearImpulse.y);e.wSub(p,A),s-=d*(m.cross(this.m_rA,A)+this.m_angularImpulse),c.wAdd(y,A),_+=v*(m.cross(this.m_rB,A)+this.m_angularImpulse)}else this.m_linearImpulse.setZero(),this.m_angularImpulse=0;this.m_bodyA.c_velocity.v=e,this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v=c,this.m_bodyB.c_velocity.w=_},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=this.m_invMassA,h=this.m_invMassB,c=this.m_invIA,_=this.m_invIB,l=t.dt,u=t.inv_dt,p=s-o+u*this.m_correctionFactor*this.m_angularError,y=-this.m_angularMass*p,d=this.m_angularImpulse,v=l*this.m_maxTorque;this.m_angularImpulse=r.clamp(this.m_angularImpulse+y,-v,v),y=this.m_angularImpulse-d,o-=c*y,s+=_*y;var p=m.zero();p.wAdd(1,e,1,m.cross(s,this.m_rB)),p.wSub(1,i,1,m.cross(o,this.m_rA)),p.wAdd(u*this.m_correctionFactor,this.m_linearError);var y=m.neg(a.mul(this.m_linearMass,p)),d=m.clone(this.m_linearImpulse);this.m_linearImpulse.add(y);var v=l*this.m_maxForce;this.m_linearImpulse.clamp(v),y=m.sub(this.m_linearImpulse,d),i.wSub(n,y),o-=c*m.cross(this.m_rA,y),e.wAdd(h,y),s+=_*m.cross(this.m_rB,y),this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){return!0}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],31:[function(t,i,o){function e(t,i,o,n){return this instanceof e?(t=s(t,l),_.call(this,t,i,o),this.m_type=e.TYPE,this.m_targetA=m.clone(n),this.m_localAnchorB=c.mulT(this.m_bodyB.getTransform(),this.m_targetA),this.m_maxForce=t.maxForce,this.m_impulse=m.zero(),this.m_frequencyHz=t.frequencyHz,this.m_dampingRatio=t.dampingRatio,this.m_beta=0,this.m_gamma=0,this.m_rB=m.zero(),this.m_localCenterB=m.zero(),this.m_invMassB=0,this.m_invIB=0,this.mass=new a,void(this.m_C=m.zero())):new e(t,i,o,n)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=t("../common/Math"),m=t("../common/Vec2"),a=(t("../common/Vec3"),t("../common/Mat22")),h=(t("../common/Mat33"),t("../common/Rot")),c=(t("../common/Sweep"),t("../common/Transform")),_=(t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="mouse-joint",e._super=_,e.prototype=n(e._super.prototype);var l={maxForce:0,frequencyHz:5,dampingRatio:.7};e.prototype.setTarget=function(t){0==this.m_bodyB.isAwake()&&this.m_bodyB.setAwake(!0),this.m_targetA=m.clone(t)},e.prototype.getTarget=function(){return this.m_targetA},e.prototype.setMaxForce=function(t){this.m_maxForce=t},e.getMaxForce=function(){return this.m_maxForce},e.prototype.setFrequency=function(t){this.m_frequencyHz=t},e.prototype.getFrequency=function(){return this.m_frequencyHz},e.prototype.setDampingRatio=function(t){this.m_dampingRatio=t},e.prototype.getDampingRatio=function(){return this.m_dampingRatio},e.prototype.getAnchorA=function(){return m.clone(this.m_targetA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){return m.mul(t,this.m_impulse)},e.prototype.getReactionTorque=function(t){return 0*t},e.prototype.shiftOrigin=function(t){this.m_targetA.sub(t)},e.prototype.initVelocityConstraints=function(t){this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyB.c_position,o=this.m_bodyB.c_velocity,e=i.c,s=i.a,n=o.v,c=o.w,_=h.neo(s),l=this.m_bodyB.getMass(),u=2*r.PI*this.m_frequencyHz,p=2*l*this.m_dampingRatio*u,y=l*(u*u),d=t.dt;this.m_gamma=d*(p+d*y),0!=this.m_gamma&&(this.m_gamma=1/this.m_gamma),this.m_beta=d*y*this.m_gamma,this.m_rB=h.mul(_,m.sub(this.m_localAnchorB,this.m_localCenterB));var v=new a;v.ex.x=this.m_invMassB+this.m_invIB*this.m_rB.y*this.m_rB.y+this.m_gamma,v.ex.y=-this.m_invIB*this.m_rB.x*this.m_rB.y,v.ey.x=v.ex.y,v.ey.y=this.m_invMassB+this.m_invIB*this.m_rB.x*this.m_rB.x+this.m_gamma,this.m_mass=v.getInverse(),this.m_C.set(e),this.m_C.wAdd(1,this.m_rB,-1,this.m_targetA),this.m_C.mul(this.m_beta),c*=.98,t.warmStarting?(this.m_impulse.mul(t.dtRatio),n.wAdd(this.m_invMassB,this.m_impulse),c+=this.m_invIB*m.cross(this.m_rB,this.m_impulse)):this.m_impulse.setZero(),o.v.set(n),o.w=c},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyB.c_velocity,o=m.clone(i.v),e=i.w,s=m.cross(e,this.m_rB);s.add(o),s.wAdd(1,this.m_C,this.m_gamma,this.m_impulse),s.neg();var n=a.mul(this.m_mass,s),r=m.clone(this.m_impulse);this.m_impulse.add(n);var h=t.dt*this.m_maxForce;this.m_impulse.clamp(h),n=m.sub(this.m_impulse,r),o.wAdd(this.m_invMassB,n),e+=this.m_invIB*m.cross(this.m_rB,n),i.v.set(o),i.w=e},e.prototype.solvePositionConstraints=function(t){return!0}},{"../Joint":5,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],32:[function(t,i,o){function e(t,i,o,n,r){return this instanceof e?(t=s(t,f),u.call(this,t,i,o),this.m_type=e.TYPE,this.m_localAnchorA=t.localAnchorA||i.getLocalPoint(n),this.m_localAnchorB=t.localAnchorB||o.getLocalPoint(n),this.m_localXAxisA=t.localAxisA||i.getLocalVector(r),this.m_localXAxisA.normalize(),this.m_localYAxisA=a.cross(1,this.m_localXAxisA),this.m_referenceAngle=o.getAngle()-i.getAngle(),this.m_impulse=h(),this.m_motorMass=0,this.m_motorImpulse=0,this.m_lowerTranslation=t.lowerTranslation,this.m_upperTranslation=t.upperTranslation,this.m_maxMotorForce=t.maxMotorForce,this.m_motorSpeed=t.motorSpeed,this.m_enableLimit=t.enableLimit,this.m_enableMotor=t.enableMotor,this.m_limitState=p,this.m_axis=a.zero(),this.m_perp=a.zero(),this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,this.m_axis,this.m_perp,this.m_s1,this.m_s2,this.m_a1,this.m_a2,this.m_K=new _,void this.m_motorMass):new e(t,i,o,n,r)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=t("../common/Vec3"),c=t("../common/Mat22"),_=t("../common/Mat33"),l=t("../common/Rot"),u=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint")),p=0,y=1,d=2,v=3;e.TYPE="prismatic-joint",e._super=u,e.prototype=n(e._super.prototype);var f={enableLimit:!1,lowerTranslation:0,upperTranslation:0,enableMotor:!1,maxMotorForce:0,motorSpeed:0};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.getLocalAxisA=function(){return this.m_localXAxisA},e.prototype.getReferenceAngle=function(){return this.m_referenceAngle},e.prototype.getJointTranslation=function(){var t=this.m_bodyA.getWorldPoint(this.m_localAnchorA),i=this.m_bodyB.getWorldPoint(this.m_localAnchorB),o=a.sub(i,t),e=this.m_bodyA.getWorldVector(this.m_localXAxisA),s=a.dot(o,e);return s},e.prototype.getJointSpeed=function(){var t=this.m_bodyA,i=this.m_bodyB,o=Mul(t.m_xf.q,this.m_localAnchorA-t.m_sweep.localCenter),e=Mul(i.m_xf.q,this.m_localAnchorB-i.m_sweep.localCenter),s=t.m_sweep.c+o,n=i.m_sweep.c+e,r=n-s,m=Mul(t.m_xf.q,this.m_localXAxisA),a=t.m_linearVelocity,h=i.m_linearVelocity,c=t.m_angularVelocity,_=i.m_angularVelocity,l=Dot(r,Cross(c,m))+Dot(m,h+Cross(_,e)-a-Cross(c,o));return l},e.prototype.isLimitEnabled=function(){return this.m_enableLimit},e.prototype.enableLimit=function(t){t!=this.m_enableLimit&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableLimit=t,this.m_impulse.z=0)},e.prototype.getLowerLimit=function(){return this.m_lowerTranslation},e.prototype.getUpperLimit=function(){return this.m_upperTranslation},e.prototype.setLimits=function(t,i){t==this.m_lowerTranslation&&i==this.m_upperTranslation||(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_lowerTranslation=t,this.m_upperTranslation=i,this.m_impulse.z=0)},e.prototype.isMotorEnabled=function(){return this.m_enableMotor},e.prototype.enableMotor=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableMotor=t},e.prototype.setMotorSpeed=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_motorSpeed=t},e.prototype.setMaxMotorForce=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_maxMotorForce=t},e.prototype.getMotorSpeed=function(){return this.m_motorSpeed},e.prototype.getMotorForce=function(t){return t*this.m_motorImpulse},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){return t*(this.m_impulse.x*this.m_perp+(this.m_motorImpulse+this.m_impulse.z)*this.m_axis)},e.prototype.getReactionTorque=function(t){return t*this.m_impulse.y},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,n=this.m_bodyB.c_position.c,h=this.m_bodyB.c_position.a,c=this.m_bodyB.c_velocity.v,_=this.m_bodyB.c_velocity.w,u=l.neo(o),f=l.neo(h),A=l.mul(u,a.sub(this.m_localAnchorA,this.m_localCenterA)),x=l.mul(f,a.sub(this.m_localAnchorB,this.m_localCenterB)),g=a.zero();g.wAdd(1,n,1,x),g.wSub(1,i,1,A);var b=this.m_invMassA,B=this.m_invMassB,w=this.m_invIA,S=this.m_invIB;this.m_axis=l.mul(u,this.m_localXAxisA),this.m_a1=a.cross(a.add(g,A),this.m_axis),this.m_a2=a.cross(x,this.m_axis),this.m_motorMass=b+B+w*this.m_a1*this.m_a1+S*this.m_a2*this.m_a2,this.m_motorMass>0&&(this.m_motorMass=1/this.m_motorMass),this.m_perp=l.mul(u,this.m_localYAxisA),this.m_s1=a.cross(a.add(g,A),this.m_perp),this.m_s2=a.cross(x,this.m_perp);var C=(a.cross(A,this.m_perp),b+B+w*this.m_s1*this.m_s1+S*this.m_s2*this.m_s2),M=w*this.m_s1+S*this.m_s2,I=w*this.m_s1*this.m_a1+S*this.m_s2*this.m_a2,T=w+S;0==T&&(T=1);var P=w*this.m_a1+S*this.m_a2,V=b+B+w*this.m_a1*this.m_a1+S*this.m_a2*this.m_a2;if(this.m_K.ex.set(C,M,I),this.m_K.ey.set(M,T,P),this.m_K.ez.set(I,P,V),this.m_enableLimit){var z=a.dot(this.m_axis,g);m.abs(this.m_upperTranslation-this.m_lowerTranslation)<2*r.linearSlop?this.m_limitState=v:z<=this.m_lowerTranslation?this.m_limitState!=y&&(this.m_limitState=y,this.m_impulse.z=0):z>=this.m_upperTranslation?this.m_limitState!=d&&(this.m_limitState=d,this.m_impulse.z=0):(this.m_limitState=p,this.m_impulse.z=0)}else this.m_limitState=p,this.m_impulse.z=0;if(0==this.m_enableMotor&&(this.m_motorImpulse=0),t.warmStarting){this.m_impulse.mul(t.dtRatio),this.m_motorImpulse*=t.dtRatio;var L=a.wAdd(this.m_impulse.x,this.m_perp,this.m_motorImpulse+this.m_impulse.z,this.m_axis),R=this.m_impulse.x*this.m_s1+this.m_impulse.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_a1,F=this.m_impulse.x*this.m_s2+this.m_impulse.y+(this.m_motorImpulse+this.m_impulse.z)*this.m_a2;e.wSub(b,L),s-=w*R,c.wAdd(B,L),_+=S*F}else this.m_impulse.setZero(),this.m_motorImpulse=0;this.m_bodyA.c_velocity.v.set(e),this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v.set(c),this.m_bodyB.c_velocity.w=_},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=this.m_invMassA,r=this.m_invMassB,c=this.m_invIA,_=this.m_invIB;if(this.m_enableMotor&&this.m_limitState!=v){var l=a.dot(this.m_axis,a.sub(e,i))+this.m_a2*s-this.m_a1*o,u=this.m_motorMass*(this.m_motorSpeed-l),f=this.m_motorImpulse,A=t.dt*this.m_maxMotorForce;this.m_motorImpulse=m.clamp(this.m_motorImpulse+u,-A,A),u=this.m_motorImpulse-f;var x=a.zero().wSet(u,this.m_axis),g=u*this.m_a1,b=u*this.m_a2;i.wSub(n,x),o-=c*g,e.wAdd(r,x),s+=_*b}var B=a.zero();if(B.x+=a.dot(this.m_perp,e)+this.m_s2*s,B.x-=a.dot(this.m_perp,i)+this.m_s1*o,B.y=s-o,this.m_enableLimit&&this.m_limitState!=p){
var w=0;w+=a.dot(this.m_axis,e)+this.m_a2*s,w-=a.dot(this.m_axis,i)+this.m_a1*o;var l=h(B.x,B.y,w),S=h(this.m_impulse),C=this.m_K.solve33(h.neg(l));this.m_impulse.add(C),this.m_limitState==y?this.m_impulse.z=m.max(this.m_impulse.z,0):this.m_limitState==d&&(this.m_impulse.z=m.min(this.m_impulse.z,0));var M=a.wAdd(-1,B,-(this.m_impulse.z-S.z),a.neo(this.m_K.ez.x,this.m_K.ez.y)),I=a.add(this.m_K.solve22(M),a.neo(S.x,S.y));this.m_impulse.x=I.x,this.m_impulse.y=I.y,C=h.sub(this.m_impulse,S);var x=a.wAdd(C.x,this.m_perp,C.z,this.m_axis),g=C.x*this.m_s1+C.y+C.z*this.m_a1,b=C.x*this.m_s2+C.y+C.z*this.m_a2;i.wSub(n,x),o-=c*g,e.wAdd(r,x),s+=_*b}else{var C=this.m_K.solve22(a.neg(B));this.m_impulse.x+=C.x,this.m_impulse.y+=C.y;var x=a.zero().wAdd(C.x,this.m_perp),g=C.x*this.m_s1+C.y,b=C.x*this.m_s2+C.y;i.wSub(n,x),o-=c*g,e.wAdd(r,x),s+=_*b}this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyB.c_position.c,s=this.m_bodyB.c_position.a,n=l.neo(o),u=l.neo(s),p=this.m_invMassA,y=this.m_invMassB,d=this.m_invIA,v=this.m_invIB,f=l.mul(n,a.sub(this.m_localAnchorA,this.m_localCenterA)),A=l.mul(u,a.sub(this.m_localAnchorB,this.m_localCenterB)),x=a.sub(a.add(e,A),a.add(i,f)),g=l.mul(n,this.m_localXAxisA),b=a.cross(a.add(x,f),g),B=a.cross(A,g),w=l.mul(n,this.m_localYAxisA),S=a.cross(a.add(x,f),w),C=a.cross(A,w),M=h(),I=a.zero();I.x=a.dot(w,x),I.y=s-o-this.m_referenceAngle;var T=m.abs(I.x),P=m.abs(I.y),V=r.linearSlop,z=r.maxLinearCorrection,L=!1,R=0;if(this.m_enableLimit){var F=a.dot(g,x);m.abs(this.m_upperTranslation-this.m_lowerTranslation)<2*V?(R=m.clamp(F,-z,z),T=m.max(T,m.abs(F)),L=!0):F<=this.m_lowerTranslation?(R=m.clamp(F-this.m_lowerTranslation+V,-z,0),T=m.max(T,this.m_lowerTranslation-F),L=!0):F>=this.m_upperTranslation&&(R=m.clamp(F-this.m_upperTranslation-V,0,z),T=m.max(T,F-this.m_upperTranslation),L=!0)}if(L){var D=p+y+d*S*S+v*C*C,q=d*S+v*C,E=d*S*b+v*C*B,k=d+v;0==k&&(k=1);var j=d*b+v*B,J=p+y+d*b*b+v*B*B,O=new _;O.ex.set(D,q,E),O.ey.set(q,k,j),O.ez.set(E,j,J);var N=h();N.x=I.x,N.y=I.y,N.z=R,M=O.solve33(h.neg(N))}else{var D=p+y+d*S*S+v*C*C,q=d*S+v*C,k=d+v;0==k&&(k=1);var O=new c;O.ex.set(D,q),O.ey.set(q,k);var G=O.solve(a.neg(I));M.x=G.x,M.y=G.y,M.z=0}var U=a.wAdd(M.x,w,M.z,g),W=M.x*S+M.y+M.z*b,Y=M.x*C+M.y+M.z*B;return i.wSub(p,U),o-=d*W,e.wAdd(y,U),s+=v*Y,this.m_bodyA.c_position.c=i,this.m_bodyA.c_position.a=o,this.m_bodyB.c_position.c=e,this.m_bodyB.c_position.a=s,T<=r.linearSlop&&P<=r.angularSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],33:[function(t,i,o){function e(t,i,o,n,r,m,h,c){return this instanceof e?(t=s(t,l),_.call(this,t,i,o),this.m_type=e.TYPE,this.m_groundAnchorA=n,this.m_groundAnchorB=r,this.m_localAnchorA=i.getLocalPoint(m),this.m_localAnchorB=o.getLocalPoint(h),this.m_lengthA=a.distance(m,n),this.m_lengthB=a.distance(h,r),this.m_ratio=t.ratio||c,this.m_constant=this.m_lengthA+this.m_ratio*this.m_lengthB,this.m_impulse=0,this.m_uA,this.m_uB,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,void this.m_mass):new e(t,i,o,n,r,m,h,c)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=t("../common/Vec3"),c=(t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),_=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="pulley-joint",e.MIN_PULLEY_LENGTH=2,e._super=_,e.prototype=n(e._super.prototype);var l={collideConnected:!0};e.prototype.getGroundAnchorA=function(){return this.m_groundAnchorA},e.prototype.getGroundAnchorB=function(){return this.m_groundAnchorB},e.prototype.getLengthA=function(){return this.m_lengthA},e.prototype.getLengthB=function(){return this.m_lengthB},e.prototype.setRatio=function(){return this.m_ratio},e.prototype.getCurrentLengthA=function(){var t=this.m_bodyA.getWorldPoint(this.m_localAnchorA),i=this.m_groundAnchorA;return a.distance(t,i)},e.prototype.getCurrentLengthB=function(){var t=this.m_bodyB.getWorldPoint(this.m_localAnchorB),i=this.m_groundAnchorB;return a.distance(t,i)},e.prototype.shiftOrigin=function(t){this.m_groundAnchorA-=t,this.m_groundAnchorB-=t},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){return h.mul(t*this.m_impulse,this.m_uB)},e.prototype.getReactionTorque=function(t){return 0},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,n=this.m_bodyB.c_position.c,m=this.m_bodyB.c_position.a,h=this.m_bodyB.c_velocity.v,_=this.m_bodyB.c_velocity.w,l=c.neo(o),u=c.neo(m);this.m_rA=c.mul(l,a.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=c.mul(u,a.sub(this.m_localAnchorB,this.m_localCenterB)),this.m_uA=a.sub(a.add(i,this.m_rA),this.m_groundAnchorA),this.m_uB=a.sub(a.add(n,this.m_rB),this.m_groundAnchorB);var p=this.m_uA.length(),y=this.m_uB.length();p>10*r.linearSlop?this.m_uA.mul(1/p):this.m_uA.setZero(),y>10*r.linearSlop?this.m_uB.mul(1/y):this.m_uB.setZero();var d=a.cross(this.m_rA,this.m_uA),v=a.cross(this.m_rB,this.m_uB),f=this.m_invMassA+this.m_invIA*d*d,A=this.m_invMassB+this.m_invIB*v*v;if(this.m_mass=f+this.m_ratio*this.m_ratio*A,this.m_mass>0&&(this.m_mass=1/this.m_mass),t.warmStarting){this.m_impulse*=t.dtRatio;var x=a.mul(-this.m_impulse,this.m_uA),g=a.mul(-this.m_ratio*this.m_impulse,this.m_uB);e.wAdd(this.m_invMassA,x),s+=this.m_invIA*a.cross(this.m_rA,x),h.wAdd(this.m_invMassB,g),_+=this.m_invIB*a.cross(this.m_rB,g)}else this.m_impulse=0;this.m_bodyA.c_velocity.v=e,this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v=h,this.m_bodyB.c_velocity.w=_},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=a.add(i,a.cross(o,this.m_rA)),r=a.add(e,a.cross(s,this.m_rB)),m=-a.dot(this.m_uA,n)-this.m_ratio*a.dot(this.m_uB,r),h=-this.m_mass*m;this.m_impulse+=h;var c=a.zero().wSet(-h,this.m_uA),_=a.zero().wSet(-this.m_ratio*h,this.m_uB);i.wAdd(this.m_invMassA,c),o+=this.m_invIA*a.cross(this.m_rA,c),e.wAdd(this.m_invMassB,_),s+=this.m_invIB*a.cross(this.m_rB,_),this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyB.c_position.c,s=this.m_bodyB.c_position.a,n=c.neo(o),h=c.neo(s),_=c.mul(n,a.sub(this.m_localAnchorA,this.m_localCenterA)),l=c.mul(h,a.sub(this.m_localAnchorB,this.m_localCenterB)),u=a.sub(a.add(i,this.m_rA),this.m_groundAnchorA),p=a.sub(a.add(e,this.m_rB),this.m_groundAnchorB),y=u.length(),d=p.length();y>10*r.linearSlop?u.mul(1/y):u.setZero(),d>10*r.linearSlop?p.mul(1/d):p.setZero();var v=a.cross(_,u),f=a.cross(l,p),A=this.m_invMassA+this.m_invIA*v*v,x=this.m_invMassB+this.m_invIB*f*f,g=A+this.m_ratio*this.m_ratio*x;g>0&&(g=1/g);var b=this.m_constant-y-this.m_ratio*d,B=m.abs(b),w=-g*b,S=a.zero().wSet(-w,u),C=a.zero().wSet(-this.m_ratio*w,p);return i.wAdd(this.m_invMassA,S),o+=this.m_invIA*a.cross(_,S),e.wAdd(this.m_invMassB,C),s+=this.m_invIB*a.cross(l,C),this.m_bodyA.c_position.c=i,this.m_bodyA.c_position.a=o,this.m_bodyB.c_position.c=e,this.m_bodyB.c_position.a=s,B<r.linearSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],34:[function(t,i,o){function e(t,i,o,n){return this instanceof e?(t=s(t,f),u.call(this,t,i,o),this.m_type=e.TYPE,this.m_localAnchorA=t.localAnchorA||i.getLocalPoint(n),this.m_localAnchorB=t.localAnchorB||o.getLocalPoint(n),this.m_referenceAngle=o.getAngle()-i.getAngle(),this.m_impulse=h(),this.m_motorImpulse=0,this.m_lowerAngle=t.lowerAngle,this.m_upperAngle=t.upperAngle,this.m_maxMotorTorque=t.maxMotorTorque,this.m_motorSpeed=t.motorSpeed,this.m_enableLimit=t.enableLimit,this.m_enableMotor=t.enableMotor,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,this.m_mass=new _,this.m_motorMass,void(this.m_limitState=p)):new e(t,i,o,n)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/options")),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=t("../common/Vec3"),c=t("../common/Mat22"),_=t("../common/Mat33"),l=t("../common/Rot"),u=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint")),p=0,y=1,d=2,v=3;e.TYPE="revolute-joint",e._super=u,e.prototype=n(e._super.prototype);var f={lowerAngle:0,upperAngle:0,maxMotorTorque:0,motorSpeed:0,enableLimit:!1,enableMotor:!1};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.getReferenceAngle=function(){return this.m_referenceAngle},e.prototype.getJointAngle=function(){var t=this.m_bodyA,i=this.m_bodyB;return i.m_sweep.a-t.m_sweep.a-this.m_referenceAngle},e.prototype.getJointSpeed=function(){var t=this.m_bodyA,i=this.m_bodyB;return i.m_angularVelocity-t.m_angularVelocity},e.prototype.isMotorEnabled=function(){return this.m_enableMotor},e.prototype.enableMotor=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableMotor=t},e.prototype.getMotorTorque=function(t){return t*this.m_motorImpulse},e.prototype.setMotorSpeed=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_motorSpeed=t},e.prototype.getMotorSpeed=function(){return this.m_motorSpeed},e.prototype.setMaxMotorTorque=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_maxMotorTorque=t},e.prototype.isLimitEnabled=function(){return this.m_enableLimit},e.prototype.enableLimit=function(t){t!=this.m_enableLimit&&(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableLimit=t,this.m_impulse.z=0)},e.prototype.getLowerLimit=function(){return this.m_lowerAngle},e.prototype.getUpperLimit=function(){return this.m_upperAngle},e.prototype.setLimits=function(t,i){t==this.m_lowerAngle&&i==this.m_upperAngle||(this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_impulse.z=0,this.m_lowerAngle=t,this.m_upperAngle=i)},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){var i=a.neo(this.m_impulse.x,this.m_impulse.y);return t*i},e.prototype.getReactionTorque=function(t){return t*this.m_impulse.z},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.a,o=this.m_bodyA.c_velocity.v,e=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_position.a,n=this.m_bodyB.c_velocity.v,h=this.m_bodyB.c_velocity.w,c=l.neo(i),_=l.neo(s);this.m_rA=l.mul(c,a.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=l.mul(_,a.sub(this.m_localAnchorB,this.m_localCenterB));var u=this.m_invMassA,f=this.m_invMassB,A=this.m_invIA,x=this.m_invIB,g=A+x==0;if(this.m_mass.ex.x=u+f+this.m_rA.y*this.m_rA.y*A+this.m_rB.y*this.m_rB.y*x,this.m_mass.ey.x=-this.m_rA.y*this.m_rA.x*A-this.m_rB.y*this.m_rB.x*x,this.m_mass.ez.x=-this.m_rA.y*A-this.m_rB.y*x,this.m_mass.ex.y=this.m_mass.ey.x,this.m_mass.ey.y=u+f+this.m_rA.x*this.m_rA.x*A+this.m_rB.x*this.m_rB.x*x,this.m_mass.ez.y=this.m_rA.x*A+this.m_rB.x*x,this.m_mass.ex.z=this.m_mass.ez.x,this.m_mass.ey.z=this.m_mass.ez.y,this.m_mass.ez.z=A+x,this.m_motorMass=A+x,this.m_motorMass>0&&(this.m_motorMass=1/this.m_motorMass),(0==this.m_enableMotor||g)&&(this.m_motorImpulse=0),this.m_enableLimit&&0==g){var b=s-i-this.m_referenceAngle;m.abs(this.m_upperAngle-this.m_lowerAngle)<2*r.angularSlop?this.m_limitState=v:b<=this.m_lowerAngle?(this.m_limitState!=y&&(this.m_impulse.z=0),this.m_limitState=y):b>=this.m_upperAngle?(this.m_limitState!=d&&(this.m_impulse.z=0),this.m_limitState=d):(this.m_limitState=p,this.m_impulse.z=0)}else this.m_limitState=p;if(t.warmStarting){this.m_impulse.mul(t.dtRatio),this.m_motorImpulse*=t.dtRatio;var B=a.neo(this.m_impulse.x,this.m_impulse.y);o.wSub(u,B),e-=A*(a.cross(this.m_rA,B)+this.m_motorImpulse+this.m_impulse.z),n.wAdd(f,B),h+=x*(a.cross(this.m_rB,B)+this.m_motorImpulse+this.m_impulse.z)}else this.m_impulse.setZero(),this.m_motorImpulse=0;this.m_bodyA.c_velocity.v=o,this.m_bodyA.c_velocity.w=e,this.m_bodyB.c_velocity.v=n,this.m_bodyB.c_velocity.w=h},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=this.m_invMassA,r=this.m_invMassB,c=this.m_invIA,_=this.m_invIB,l=c+_==0;if(this.m_enableMotor&&this.m_limitState!=v&&0==l){var u=s-o-this.m_motorSpeed,f=-this.m_motorMass*u,A=this.m_motorImpulse,x=t.dt*this.m_maxMotorTorque;this.m_motorImpulse=m.clamp(this.m_motorImpulse+f,-x,x),f=this.m_motorImpulse-A,o-=c*f,s+=_*f}if(this.m_enableLimit&&this.m_limitState!=p&&0==l){var g=a.zero();g.wAdd(1,e,1,a.cross(s,this.m_rB)),g.wSub(1,i,1,a.cross(o,this.m_rA));var b=s-o,u=h(g.x,g.y,b),f=h.neg(this.m_mass.solve33(u));if(this.m_limitState==v)this.m_impulse.add(f);else if(this.m_limitState==y){var B=this.m_impulse.z+f.z;if(B<0){var w=a.wAdd(-1,g,this.m_impulse.z,a.neo(this.m_mass.ez.x,this.m_mass.ez.y)),S=this.m_mass.solve22(w);f.x=S.x,f.y=S.y,f.z=-this.m_impulse.z,this.m_impulse.x+=S.x,this.m_impulse.y+=S.y,this.m_impulse.z=0}else this.m_impulse.add(f)}else if(this.m_limitState==d){var B=this.m_impulse.z+f.z;if(B>0){var w=a.wAdd(-1,g,this.m_impulse.z,a.neo(this.m_mass.ez.x,this.m_mass.ez.y)),S=this.m_mass.solve22(w);f.x=S.x,f.y=S.y,f.z=-this.m_impulse.z,this.m_impulse.x+=S.x,this.m_impulse.y+=S.y,this.m_impulse.z=0}else this.m_impulse.add(f)}var C=a.neo(f.x,f.y);i.wSub(n,C),o-=c*(a.cross(this.m_rA,C)+f.z),e.wAdd(r,C),s+=_*(a.cross(this.m_rB,C)+f.z)}else{var u=a.zero();u.wAdd(1,e,1,a.cross(s,this.m_rB)),u.wSub(1,i,1,a.cross(o,this.m_rA));var f=this.m_mass.solve22(a.neg(u));this.m_impulse.x+=f.x,this.m_impulse.y+=f.y,i.wSub(n,f),o-=c*a.cross(this.m_rA,f),e.wAdd(r,f),s+=_*a.cross(this.m_rB,f)}this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyB.c_position.c,s=this.m_bodyB.c_position.a,n=l.neo(o),h=l.neo(s),_=0,u=0,f=this.m_invIA+this.m_invIB==0;if(this.m_enableLimit&&this.m_limitState!=p&&0==f){var A=s-o-this.m_referenceAngle,x=0;if(this.m_limitState==v){var g=m.clamp(A-this.m_lowerAngle,-r.maxAngularCorrection,r.maxAngularCorrection);x=-this.m_motorMass*g,_=m.abs(g)}else if(this.m_limitState==y){var g=A-this.m_lowerAngle;_=-g,g=m.clamp(g+r.angularSlop,-r.maxAngularCorrection,0),x=-this.m_motorMass*g}else if(this.m_limitState==d){var g=A-this.m_upperAngle;_=g,g=m.clamp(g-r.angularSlop,0,r.maxAngularCorrection),x=-this.m_motorMass*g}o-=this.m_invIA*x,s+=this.m_invIB*x}n.set(o),h.set(s);var b=l.mul(n,a.sub(this.m_localAnchorA,this.m_localCenterA)),B=l.mul(h,a.sub(this.m_localAnchorB,this.m_localCenterB)),g=a.zero();g.wAdd(1,e,1,B),g.wSub(1,i,1,b),u=g.length();var w=this.m_invMassA,S=this.m_invMassB,C=this.m_invIA,M=this.m_invIB,I=new c;I.ex.x=w+S+C*b.y*b.y+M*B.y*B.y,I.ex.y=-C*b.x*b.y-M*B.x*B.y,I.ey.x=I.ex.y,I.ey.y=w+S+C*b.x*b.x+M*B.x*B.x;var T=a.neg(I.solve(g));return i.wSub(w,T),o-=C*a.cross(b,T),e.wAdd(S,T),s+=M*a.cross(B,T),this.m_bodyA.c_position.c.set(i),this.m_bodyA.c_position.a=o,this.m_bodyB.c_position.c.set(e),this.m_bodyB.c_position.a=s,u<=r.linearSlop&&_<=r.angularSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/common":50,"../util/create":51,"../util/options":52}],35:[function(t,i,o){function e(t,i,o,n){return this instanceof e?(t=s(t,u),c.call(this,t,i,o),this.m_type=e.TYPE,this.m_localAnchorA=t.localAnchorA||i.getLocalPoint(n),this.m_localAnchorB=t.localAnchorB||o.getLocalPoint(n),this.m_maxLength=t.maxLength,this.m_mass=0,this.m_impulse=0,this.m_length=0,this.m_state=_,this.m_u,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,void this.m_mass):new e(t,i,o,n)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("../util/options"),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=(t("../common/Vec3"),t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),c=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint")),_=0,l=2;e.TYPE="rope-joint",e._super=c,e.prototype=n(e._super.prototype);var u={maxLength:0};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.setMaxLength=function(t){this.m_maxLength=t},e.prototype.getMaxLength=function(){return this.m_maxLength},e.prototype.getLimitState=function(){return this.m_state},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){var i=t*this.m_impulse*this.m_u;return i},e.prototype.getReactionTorque=function(t){return 0},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyA.c_velocity.v,s=this.m_bodyA.c_velocity.w,n=this.m_bodyB.c_position.c,m=this.m_bodyB.c_position.a,c=this.m_bodyB.c_velocity.v,u=this.m_bodyB.c_velocity.w,p=h.neo(o),y=h.neo(m);this.m_rA=h.mulSub(p,this.m_localAnchorA,this.m_localCenterA),this.m_rB=h.mulSub(y,this.m_localAnchorB,this.m_localCenterB),this.m_u=a.zero(),this.m_u.wAdd(1,n,1,this.m_rB),this.m_u.wSub(1,i,1,this.m_rA),this.m_length=this.m_u.length();var d=this.m_length-this.m_maxLength;if(d>0?this.m_state=l:this.m_state=_,!(this.m_length>r.linearSlop))return this.m_u.setZero(),this.m_mass=0,void(this.m_impulse=0);this.m_u.mul(1/this.m_length);var v=a.cross(this.m_rA,this.m_u),f=a.cross(this.m_rB,this.m_u),A=this.m_invMassA+this.m_invIA*v*v+this.m_invMassB+this.m_invIB*f*f;if(this.m_mass=0!=A?1/A:0,t.warmStarting){this.m_impulse*=t.dtRatio;var x=a.mul(this.m_impulse,this.m_u);e.wSub(this.m_invMassA,x),s-=this.m_invIA*a.cross(this.m_rA,x),c.wAdd(this.m_invMassB,x),u+=this.m_invIB*a.cross(this.m_rB,x)}else this.m_impulse=0;this.m_bodyA.c_velocity.v.set(e),this.m_bodyA.c_velocity.w=s,this.m_bodyB.c_velocity.v.set(c),this.m_bodyB.c_velocity.w=u},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=a.addCross(i,o,this.m_rA),r=a.addCross(e,s,this.m_rB),h=this.m_length-this.m_maxLength,c=a.dot(this.m_u,a.sub(r,n));h<0&&(c+=t.inv_dt*h);var _=-this.m_mass*c,l=this.m_impulse;this.m_impulse=m.min(0,this.m_impulse+_),_=this.m_impulse-l;var u=a.mul(_,this.m_u);i.wSub(this.m_invMassA,u),o-=this.m_invIA*a.cross(this.m_rA,u),e.wAdd(this.m_invMassB,u),s+=this.m_invIB*a.cross(this.m_rB,u),this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyB.c_position.c,s=this.m_bodyB.c_position.a,n=h.neo(o),c=h.neo(s),_=h.mulSub(n,this.m_localAnchorA,this.m_localCenterA),l=h.mulSub(c,this.m_localAnchorB,this.m_localCenterB),u=a.zero();u.wAdd(1,e,1,l),u.wSub(1,i,1,_);var p=u.normalize(),y=p-this.m_maxLength;y=m.clamp(y,0,r.maxLinearCorrection);var d=-this.m_mass*y,v=a.mul(d,u);return i.wSub(this.m_invMassA,v),o-=this.m_invIA*a.cross(_,v),e.wAdd(this.m_invMassB,v),s+=this.m_invIB*a.cross(l,v),this.m_bodyA.c_position.c.set(i),this.m_bodyA.c_position.a=o,this.m_bodyB.c_position.c.set(e),this.m_bodyB.c_position.a=s,p-this.m_maxLength<r.linearSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":51,"../util/options":52}],36:[function(t,i,o){function e(t,i,o,n){return this instanceof e?(t=s(t,u),l.call(this,t,i,o),this.m_type=e.TYPE,this.m_localAnchorA=i.getLocalPoint(n),this.m_localAnchorB=o.getLocalPoint(n),this.m_referenceAngle=o.getAngle()-i.getAngle(),this.m_frequencyHz=t.frequencyHz,this.m_dampingRatio=t.dampingRatio,this.m_impulse=h(),this.m_bias=0,this.m_gamma=0,this.m_rA,this.m_rB,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,void(this.m_mass=new c)):new e(t,i,o,n)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("../util/options"),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=t("../common/Vec3"),c=(t("../common/Mat22"),t("../common/Mat33")),_=t("../common/Rot"),l=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="weld-joint",e._super=l,e.prototype=n(e._super.prototype);var u={frequencyHz:0,dampingRatio:0};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.getReferenceAngle=function(){return this.m_referenceAngle},e.prototype.setFrequency=function(t){this.m_frequencyHz=t},e.prototype.getFrequency=function(){return this.m_frequencyHz},e.prototype.setDampingRatio=function(t){this.m_dampingRatio=t},e.prototype.getDampingRatio=function(){return this.m_dampingRatio},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){var i=a.neo(this.m_impulse.x,this.m_impulse.y);return t*i},e.prototype.getReactionTorque=function(t){return t*this.m_impulse.z},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_bodyA.c_position.a,o=this.m_bodyA.c_velocity.v,e=this.m_bodyA.c_velocity.w,s=this.m_bodyB.c_position.a,n=this.m_bodyB.c_velocity.v,r=this.m_bodyB.c_velocity.w,h=_.neo(i),l=_.neo(s);this.m_rA=_.mul(h,a.sub(this.m_localAnchorA,this.m_localCenterA)),this.m_rB=_.mul(l,a.sub(this.m_localAnchorB,this.m_localCenterB));var u=this.m_invMassA,p=this.m_invMassB,y=this.m_invIA,d=this.m_invIB,v=new c;if(v.ex.x=u+p+this.m_rA.y*this.m_rA.y*y+this.m_rB.y*this.m_rB.y*d,v.ey.x=-this.m_rA.y*this.m_rA.x*y-this.m_rB.y*this.m_rB.x*d,v.ez.x=-this.m_rA.y*y-this.m_rB.y*d,v.ex.y=v.ey.x,v.ey.y=u+p+this.m_rA.x*this.m_rA.x*y+this.m_rB.x*this.m_rB.x*d,v.ez.y=this.m_rA.x*y+this.m_rB.x*d,v.ex.z=v.ez.x,v.ey.z=v.ez.y,v.ez.z=y+d,this.m_frequencyHz>0){v.getInverse22(this.m_mass);var f=y+d,A=f>0?1/f:0,x=s-i-this.m_referenceAngle,g=2*m.PI*this.m_frequencyHz,b=2*A*this.m_dampingRatio*g,B=A*g*g,w=t.dt;this.m_gamma=w*(b+w*B),this.m_gamma=0!=this.m_gamma?1/this.m_gamma:0,this.m_bias=x*w*B*this.m_gamma,f+=this.m_gamma,this.m_mass.ez.z=0!=f?1/f:0}else 0==v.ez.z?(v.getInverse22(this.m_mass),this.m_gamma=0,this.m_bias=0):(v.getSymInverse33(this.m_mass),this.m_gamma=0,this.m_bias=0);if(t.warmStarting){this.m_impulse.mul(t.dtRatio);var S=a.neo(this.m_impulse.x,this.m_impulse.y);o.wSub(u,S),e-=y*(a.cross(this.m_rA,S)+this.m_impulse.z),n.wAdd(p,S),r+=d*(a.cross(this.m_rB,S)+this.m_impulse.z)}else this.m_impulse.setZero();this.m_bodyA.c_velocity.v=o,this.m_bodyA.c_velocity.w=e,this.m_bodyB.c_velocity.v=n,this.m_bodyB.c_velocity.w=r},e.prototype.solveVelocityConstraints=function(t){var i=this.m_bodyA.c_velocity.v,o=this.m_bodyA.c_velocity.w,e=this.m_bodyB.c_velocity.v,s=this.m_bodyB.c_velocity.w,n=this.m_invMassA,r=this.m_invMassB,m=this.m_invIA,_=this.m_invIB;if(this.m_frequencyHz>0){var l=s-o,u=-this.m_mass.ez.z*(l+this.m_bias+this.m_gamma*this.m_impulse.z);this.m_impulse.z+=u,o-=m*u,s+=_*u;var p=a.zero();p.wAdd(1,e,1,a.cross(s,this.m_rB)),p.wSub(1,i,1,a.cross(o,this.m_rA));var y=a.neg(c.mul(this.m_mass,p));this.m_impulse.x+=y.x,this.m_impulse.y+=y.y;var d=a.clone(y);i.wSub(n,d),o-=m*a.cross(this.m_rA,d),e.wAdd(r,d),s+=_*a.cross(this.m_rB,d)}else{var p=a.zero();p.wAdd(1,e,1,a.cross(s,this.m_rB)),p.wSub(1,i,1,a.cross(o,this.m_rA));var l=s-o,v=h(p.x,p.y,l),f=h.neg(c.mul(this.m_mass,v));this.m_impulse.add(f);var d=a.neo(f.x,f.y);i.wSub(n,d),o-=m*(a.cross(this.m_rA,d)+f.z),e.wAdd(r,d),s+=_*(a.cross(this.m_rB,d)+f.z)}this.m_bodyA.c_velocity.v=i,this.m_bodyA.c_velocity.w=o,this.m_bodyB.c_velocity.v=e,this.m_bodyB.c_velocity.w=s},e.prototype.solvePositionConstraints=function(t){var i,o,e=this.m_bodyA.c_position.c,s=this.m_bodyA.c_position.a,n=this.m_bodyB.c_position.c,l=this.m_bodyB.c_position.a,u=_.neo(s),p=_.neo(l),y=this.m_invMassA,d=this.m_invMassB,v=this.m_invIA,f=this.m_invIB,A=_.mul(u,a.sub(this.m_localAnchorA,this.m_localCenterA)),x=_.mul(p,a.sub(this.m_localAnchorB,this.m_localCenterB)),g=new c;if(g.ex.x=y+d+A.y*A.y*v+x.y*x.y*f,g.ey.x=-A.y*A.x*v-x.y*x.x*f,g.ez.x=-A.y*v-x.y*f,g.ex.y=g.ey.x,g.ey.y=y+d+A.x*A.x*v+x.x*x.x*f,g.ez.y=A.x*v+x.x*f,g.ex.z=g.ez.x,g.ey.z=g.ez.y,g.ez.z=v+f,this.m_frequencyHz>0){var b=a.zero();b.wAdd(1,n,1,x),b.wSub(1,e,1,A),i=b.length(),o=0;var B=a.neg(g.solve22(b));e.wSub(y,B),s-=v*a.cross(A,B),n.wAdd(d,B),l+=f*a.cross(x,B)}else{var b=a.zero();b.wAdd(1,n,1,x),b.wSub(1,e,1,A);var w=l-s-this.m_referenceAngle;i=b.length(),o=m.abs(w);var S=h(b.x,b.y,w),C=h();if(g.ez.z>0)C=h.neg(g.solve33(S));else{var M=a.neg(g.solve22(b));C.set(M.x,M.y,0)}var B=a.neo(C.x,C.y);e.wSub(y,B),s-=v*(a.cross(A,B)+C.z),n.wAdd(d,B),l+=f*(a.cross(x,B)+C.z)}return this.m_bodyA.c_position.c=e,this.m_bodyA.c_position.a=s,this.m_bodyB.c_position.c=n,this.m_bodyB.c_position.a=l,i<=r.linearSlop&&o<=r.angularSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":51,"../util/options":52}],37:[function(t,i,o){function e(t,i,o,n,r){return this instanceof e?(t=s(t,_),c.call(this,t,i,o),this.m_type=e.TYPE,this.m_localAnchorA=i.getLocalPoint(n),this.m_localAnchorB=o.getLocalPoint(n),this.m_localXAxisA=i.getLocalVector(r||a.neo(1,0)),this.m_localYAxisA=a.cross(1,this.m_localXAxisA),this.m_mass=0,this.m_impulse=0,this.m_motorMass=0,this.m_motorImpulse=0,this.m_springMass=0,this.m_springImpulse=0,this.m_maxMotorTorque=t.maxMotorTorque,this.m_motorSpeed=t.motorSpeed,this.m_enableMotor=t.enableMotor,this.m_frequencyHz=t.frequencyHz,this.m_dampingRatio=t.dampingRatio,this.m_bias=0,this.m_gamma=0,this.m_localCenterA,this.m_localCenterB,this.m_invMassA,this.m_invMassB,this.m_invIA,this.m_invIB,this.m_ax=a.zero(),this.m_ay=a.zero(),this.m_sAx,this.m_sBx,this.m_sAy,void this.m_sBy):new e(t,i,o,n,r)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("../util/options"),n=t("../util/create"),r=t("../Settings"),m=t("../common/Math"),a=t("../common/Vec2"),h=(t("../common/Vec3"),t("../common/Mat22"),t("../common/Mat33"),t("../common/Rot")),c=(t("../common/Sweep"),t("../common/Transform"),t("../common/Velocity"),t("../common/Position"),t("../Joint"));e.TYPE="wheel-joint",e._super=c,e.prototype=n(e._super.prototype);var _={enableMotor:!1,maxMotorTorque:0,motorSpeed:0,frequencyHz:2,dampingRatio:.7};e.prototype.getLocalAnchorA=function(){return this.m_localAnchorA},e.prototype.getLocalAnchorB=function(){return this.m_localAnchorB},e.prototype.getLocalAxisA=function(){return this.m_localXAxisA},e.prototype.getJointTranslation=function(){var t=this.m_bodyA,i=this.m_bodyB,o=t.getWorldPoint(this.m_localAnchorA),e=i.getWorldPoint(this.m_localAnchorB),s=e-o,n=t.getWorldVector(this.m_localXAxisA),r=Dot(s,n);return r},e.prototype.getJointSpeed=function(){var t=this.m_bodyA.m_angularVelocity,i=this.m_bodyB.m_angularVelocity;return i-t},e.prototype.isMotorEnabled=function(){return this.m_enableMotor},e.prototype.enableMotor=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_enableMotor=t},e.prototype.setMotorSpeed=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_motorSpeed=t},e.prototype.getMotorSpeed=function(){return this.m_motorSpeed},e.prototype.setMaxMotorTorque=function(t){this.m_bodyA.setAwake(!0),this.m_bodyB.setAwake(!0),this.m_maxMotorTorque=t},e.prototype.getMaxMotorTorque=function(){return this.m_maxMotorTorque},e.prototype.getMotorTorque=function(t){return t*this.m_motorImpulse},e.prototype.setSpringFrequencyHz=function(t){this.m_frequencyHz=t},e.prototype.getSpringFrequencyHz=function(){return this.m_frequencyHz},e.prototype.setSpringDampingRatio=function(t){this.m_dampingRatio=t},e.prototype.getSpringDampingRatio=function(){return this.m_dampingRatio},e.prototype.getAnchorA=function(){return this.m_bodyA.getWorldPoint(this.m_localAnchorA)},e.prototype.getAnchorB=function(){return this.m_bodyB.getWorldPoint(this.m_localAnchorB)},e.prototype.getReactionForce=function(t){return t*(this.m_impulse*this.m_ay+this.m_springImpulse*this.m_ax)},e.prototype.getReactionTorque=function(t){return t*this.m_motorImpulse},e.prototype.initVelocityConstraints=function(t){this.m_localCenterA=this.m_bodyA.m_sweep.localCenter,this.m_localCenterB=this.m_bodyB.m_sweep.localCenter,this.m_invMassA=this.m_bodyA.m_invMass,this.m_invMassB=this.m_bodyB.m_invMass,this.m_invIA=this.m_bodyA.m_invI,this.m_invIB=this.m_bodyB.m_invI;var i=this.m_invMassA,o=this.m_invMassB,e=this.m_invIA,s=this.m_invIB,n=this.m_bodyA.c_position.c,r=this.m_bodyA.c_position.a,c=this.m_bodyA.c_velocity.v,_=this.m_bodyA.c_velocity.w,l=this.m_bodyB.c_position.c,u=this.m_bodyB.c_position.a,p=this.m_bodyB.c_velocity.v,y=this.m_bodyB.c_velocity.w,d=h.neo(r),v=h.neo(u),f=h.mul(d,a.sub(this.m_localAnchorA,this.m_localCenterA)),A=h.mul(v,a.sub(this.m_localAnchorB,this.m_localCenterB)),x=a.zero();if(x.wAdd(1,l,1,A),x.wSub(1,n,1,f),this.m_ay=h.mul(d,this.m_localYAxisA),this.m_sAy=a.cross(a.add(x,f),this.m_ay),this.m_sBy=a.cross(A,this.m_ay),this.m_mass=i+o+e*this.m_sAy*this.m_sAy+s*this.m_sBy*this.m_sBy,
this.m_mass>0&&(this.m_mass=1/this.m_mass),this.m_springMass=0,this.m_bias=0,this.m_gamma=0,this.m_frequencyHz>0){this.m_ax=h.mul(d,this.m_localXAxisA),this.m_sAx=a.cross(a.add(x,f),this.m_ax),this.m_sBx=a.cross(A,this.m_ax);var g=i+o+e*this.m_sAx*this.m_sAx+s*this.m_sBx*this.m_sBx;if(g>0){this.m_springMass=1/g;var b=a.dot(x,this.m_ax),B=2*m.PI*this.m_frequencyHz,x=2*this.m_springMass*this.m_dampingRatio*B,w=this.m_springMass*B*B,S=t.dt;this.m_gamma=S*(x+S*w),this.m_gamma>0&&(this.m_gamma=1/this.m_gamma),this.m_bias=b*S*w*this.m_gamma,this.m_springMass=g+this.m_gamma,this.m_springMass>0&&(this.m_springMass=1/this.m_springMass)}}else this.m_springImpulse=0;if(this.m_enableMotor?(this.m_motorMass=e+s,this.m_motorMass>0&&(this.m_motorMass=1/this.m_motorMass)):(this.m_motorMass=0,this.m_motorImpulse=0),t.warmStarting){this.m_impulse*=t.dtRatio,this.m_springImpulse*=t.dtRatio,this.m_motorImpulse*=t.dtRatio;var C=a.wAdd(this.m_impulse,this.m_ay,this.m_springImpulse,this.m_ax),M=this.m_impulse*this.m_sAy+this.m_springImpulse*this.m_sAx+this.m_motorImpulse,I=this.m_impulse*this.m_sBy+this.m_springImpulse*this.m_sBx+this.m_motorImpulse;c.wSub(this.m_invMassA,C),_-=this.m_invIA*M,p.wAdd(this.m_invMassB,C),y+=this.m_invIB*I}else this.m_impulse=0,this.m_springImpulse=0,this.m_motorImpulse=0;this.m_bodyA.c_velocity.v.set(c),this.m_bodyA.c_velocity.w=_,this.m_bodyB.c_velocity.v.set(p),this.m_bodyB.c_velocity.w=y},e.prototype.solveVelocityConstraints=function(t){var i=this.m_invMassA,o=this.m_invMassB,e=this.m_invIA,s=this.m_invIB,n=this.m_bodyA.c_velocity.v,r=this.m_bodyA.c_velocity.w,h=this.m_bodyB.c_velocity.v,c=this.m_bodyB.c_velocity.w,_=a.dot(this.m_ax,h)-a.dot(this.m_ax,n)+this.m_sBx*c-this.m_sAx*r,l=-this.m_springMass*(_+this.m_bias+this.m_gamma*this.m_springImpulse);this.m_springImpulse+=l;var u=a.zero().wSet(l,this.m_ax),p=l*this.m_sAx,y=l*this.m_sBx;n.wSub(i,u),r-=e*p,h.wAdd(o,u),c+=s*y;var _=c-r-this.m_motorSpeed,l=-this.m_motorMass*_,d=this.m_motorImpulse,v=t.dt*this.m_maxMotorTorque;this.m_motorImpulse=m.clamp(this.m_motorImpulse+l,-v,v),l=this.m_motorImpulse-d,r-=e*l,c+=s*l;var _=a.dot(this.m_ay,h)-a.dot(this.m_ay,n)+this.m_sBy*c-this.m_sAy*r,l=-this.m_mass*_;this.m_impulse+=l;var u=a.zero().wSet(l,this.m_ay),p=l*this.m_sAy,y=l*this.m_sBy;n.wSub(i,u),r-=e*p,h.wAdd(o,u),c+=s*y,this.m_bodyA.c_velocity.v.set(n),this.m_bodyA.c_velocity.w=r,this.m_bodyB.c_velocity.v.set(h),this.m_bodyB.c_velocity.w=c},e.prototype.solvePositionConstraints=function(t){var i=this.m_bodyA.c_position.c,o=this.m_bodyA.c_position.a,e=this.m_bodyB.c_position.c,s=this.m_bodyB.c_position.a,n=h.neo(o),c=h.neo(s),_=h.mul(n,a.sub(this.m_localAnchorA,this.m_localCenterA)),l=h.mul(c,a.sub(this.m_localAnchorB,this.m_localCenterB)),u=a.zero();u.wAdd(1,e,1,l),u.wSub(1,i,1,_);var p,y=h.mul(n,this.m_localYAxisA),d=a.cross(a.sub(u,_),y),v=a.cross(l,y),f=a.dot(u,y),A=this.m_invMassA+this.m_invMassB+this.m_invIA*this.m_sAy*this.m_sAy+this.m_invIB*this.m_sBy*this.m_sBy;p=0!=A?-f/A:0;var x=a.zero().wSet(p,y),g=p*d,b=p*v;return i.wSub(this.m_invMassA,x),o-=this.m_invIA*g,e.wAdd(this.m_invMassB,x),s+=this.m_invIB*b,this.m_bodyA.c_position.c.set(i),this.m_bodyA.c_position.a=o,this.m_bodyB.c_position.c.set(e),this.m_bodyB.c_position.a=s,m.abs(f)<=r.linearSlop}},{"../Joint":5,"../Settings":7,"../common/Mat22":16,"../common/Mat33":17,"../common/Math":18,"../common/Position":19,"../common/Rot":20,"../common/Sweep":21,"../common/Transform":22,"../common/Vec2":23,"../common/Vec3":24,"../common/Velocity":25,"../util/create":51,"../util/options":52}],38:[function(t,i,o){function e(t,i,o,s){if(!(this instanceof e))return new e(t,i,o,s);if(e._super.call(this),this.m_vertices[0]=m.neo(-t,-i),this.m_vertices[1]=m.neo(t,-i),this.m_vertices[2]=m.neo(t,i),this.m_vertices[3]=m.neo(-t,i),this.m_normals[0]=m.neo(0,-1),this.m_normals[1]=m.neo(1,0),this.m_normals[2]=m.neo(0,1),this.m_normals[3]=m.neo(-1,0),this.m_count=4,o&&"x"in o&&"y"in o){s=s||0,this.m_centroid.set(o);var a=n.identity();a.p.set(o),a.q.set(s);for(var h=0;h<this.m_count;++h)this.m_vertices[h]=n.mul(a,this.m_vertices[h]),this.m_normals[h]=r.mul(a.q,this.m_normals[h])}}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/create")),n=(t("../util/options"),t("../common/Math"),t("../common/Transform")),r=t("../common/Rot"),m=t("../common/Vec2"),a=(t("../collision/AABB"),t("../Settings"),t("./PolygonShape"));e._super=a,e.prototype=s(e._super.prototype),e.TYPE="polygon"},{"../Settings":7,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"../util/options":52,"./PolygonShape":47}],39:[function(t,i,o){function e(t,i){return this instanceof e?(e._super.call(this),this.m_type=e.TYPE,this.m_radius=m.polygonRadius,this.m_vertices=[],this.m_count=0,this.m_prevVertex=null,this.m_nextVertex=null,this.m_hasPrevVertex=!1,this.m_hasNextVertex=!1,void(t&&t.length&&(i?this._createLoop(t):this._createChain(t)))):new e(t,i)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/create")),n=(t("../util/options"),t("../common/Math"),t("../common/Transform")),r=(t("../common/Rot"),t("../common/Vec2")),m=(t("../collision/AABB"),t("../Settings")),a=t("../Shape"),h=t("./EdgeShape");e._super=a,e.prototype=s(e._super.prototype),e.TYPE="chain",e.prototype._createLoop=function(t){for(var i=1;i<t.length;++i){t[i-1],t[i]}this.m_vertices.length=0,this.m_count=t.length+1;for(var i=0;i<t.length;++i)this.m_vertices[i]=t[i].clone();return this.m_vertices[t.length]=t[0].clone(),this.m_prevVertex=this.m_vertices[this.m_count-2],this.m_nextVertex=this.m_vertices[1],this.m_hasPrevVertex=!0,this.m_hasNextVertex=!0,this},e.prototype._createChain=function(t){for(var i=1;i<t.length;++i){t[i-1],t[i]}this.m_count=t.length;for(var i=0;i<t.length;++i)this.m_vertices[i]=t[i].clone();return this.m_hasPrevVertex=!1,this.m_hasNextVertex=!1,this.m_prevVertex=null,this.m_nextVertex=null,this},e.prototype._setPrevVertex=function(t){this.m_prevVertex=t,this.m_hasPrevVertex=!0},e.prototype._setNextVertex=function(t){this.m_nextVertex=t,this.m_hasNextVertex=!0},e.prototype._clone=function(){var t=new e;return t.createChain(this.m_vertices),t.m_type=this.m_type,t.m_radius=this.m_radius,t.m_prevVertex=this.m_prevVertex,t.m_nextVertex=this.m_nextVertex,t.m_hasPrevVertex=this.m_hasPrevVertex,t.m_hasNextVertex=this.m_hasNextVertex,t},e.prototype.getChildCount=function(){return this.m_count-1},e.prototype.getChildEdge=function(t,i){t.m_type=h.TYPE,t.m_radius=this.m_radius,t.m_vertex1=this.m_vertices[i],t.m_vertex2=this.m_vertices[i+1],i>0?(t.m_vertex0=this.m_vertices[i-1],t.m_hasVertex0=!0):(t.m_vertex0=this.m_prevVertex,t.m_hasVertex0=this.m_hasPrevVertex),i<this.m_count-2?(t.m_vertex3=this.m_vertices[i+2],t.m_hasVertex3=!0):(t.m_vertex3=this.m_nextVertex,t.m_hasVertex3=this.m_hasNextVertex)},e.prototype.getVertex=function(t){return t<this.m_count?this.m_vertices[t]:this.m_vertices[0]},e.prototype.testPoint=function(t,i){return!1},e.prototype.rayCast=function(t,i,o,e){var s=new h(this.getVertex(e),this.getVertex(e+1));return s.rayCast(t,i,o,0)},e.prototype.computeAABB=function(t,i,o){var e=n.mul(i,this.getVertex(o)),s=n.mul(i,this.getVertex(o+1));t.combinePoints(e,s)},e.prototype.computeMass=function(t,i){t.mass=0,t.center=r.neo(),t.I=0},e.prototype.computeDistanceProxy=function(t,i){t.m_buffer[0]=this.getVertex(i),t.m_buffer[1]=this.getVertex(i+1),t.m_vertices=t.m_buffer,t.m_count=2,t.m_radius=this.m_radius}},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"../util/options":52,"./EdgeShape":46}],40:[function(t,i,o){function e(t,i){return this instanceof e?(e._super.call(this),this.m_type=e.TYPE,this.m_p=m.zero(),this.m_radius=1,void("object"==typeof t&&m.isValid(t)?(this.m_p.set(t),"number"==typeof i&&(this.m_radius=i)):"number"==typeof t&&(this.m_radius=t))):new e(t,i)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=(t("../util/common"),t("../util/create")),n=(t("../util/options"),t("../common/Math")),r=(t("../common/Transform"),t("../common/Rot")),m=t("../common/Vec2"),a=(t("../collision/AABB"),t("../Settings"),t("../Shape"));e._super=a,e.prototype=s(e._super.prototype),e.TYPE="circle",e.prototype.getRadius=function(){return this.m_radius},e.prototype.getCenter=function(){return this.m_p},e.prototype.getSupportVertex=function(t){return this.m_p},e.prototype.getVertex=function(t){return this.m_p},e.prototype.getVertexCount=function(t){return 1},e.prototype._clone=function(){var t=new e;return t.m_type=this.m_type,t.m_radius=this.m_radius,t.m_p=this.m_p.clone(),t},e.prototype.getChildCount=function(){return 1},e.prototype.testPoint=function(t,i){var o=m.add(t.p,r.mul(t.q,this.m_p)),e=m.sub(i,o);return m.dot(e,e)<=this.m_radius*this.m_radius},e.prototype.rayCast=function(t,i,o,e){var s=m.add(o.p,r.mul(o.q,this.m_p)),a=m.sub(i.p1,s),h=m.dot(a,a)-this.m_radius*this.m_radius,c=m.sub(i.p2,i.p1),_=m.dot(a,c),l=m.dot(c,c),u=_*_-l*h;if(u<0||l<n.EPSILON)return!1;var p=-(_+n.sqrt(u));return 0<=p&&p<=i.maxFraction*l&&(p/=l,t.fraction=p,t.normal=m.add(a,m.mul(p,c)),t.normal.normalize(),!0)},e.prototype.computeAABB=function(t,i,o){var e=m.add(i.p,r.mul(i.q,this.m_p));t.lowerBound.set(e.x-this.m_radius,e.y-this.m_radius),t.upperBound.set(e.x+this.m_radius,e.y+this.m_radius)},e.prototype.computeMass=function(t,i){t.mass=i*n.PI*this.m_radius*this.m_radius,t.center=this.m_p,t.I=t.mass*(.5*this.m_radius*this.m_radius+m.dot(this.m_p,this.m_p))},e.prototype.computeDistanceProxy=function(t){t.m_vertices.push(this.m_p),t.m_count=1,t.m_radius=this.m_radius}},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"../util/options":52}],41:[function(t,i,o){function e(t,i,o,e,n,r,m){s(t,o.getShape(),i,r.getShape(),n)}function s(t,i,o,e,s){t.pointCount=0;var m=n.mul(o,i.m_p),h=n.mul(s,e.m_p),c=r.distanceSquared(h,m),_=i.m_radius,l=e.m_radius,u=_+l;c>u*u||(t.type=a.e_circles,t.localPoint.set(i.m_p),t.localNormal.setZero(),t.pointCount=1,t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0)}DEBUG=!1,ASSERT=!1;var n=(t("../util/common"),t("../util/create"),t("../common/Math"),t("../common/Transform")),r=t("../common/Vec2"),m=(t("../Settings"),t("../Shape"),t("../Contact")),a=t("../Manifold"),h=t("./CircleShape");m.addType(h.TYPE,h.TYPE,e),o.CollideCircles=s},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../common/Math":18,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"./CircleShape":40}],42:[function(t,i,o){function e(t,i,o,e,n,r,m){s(t,o.getShape(),i,r.getShape(),n)}function s(t,i,o,e,s){t.pointCount=0;for(var h=r.mul(s,e.m_p),c=r.mulT(o,h),_=0,l=-(1/0),u=i.m_radius+e.m_radius,p=i.m_count,y=i.m_vertices,d=i.m_normals,v=0;v<p;++v){var f=m.dot(d[v],m.sub(c,y[v]));if(f>u)return;f>l&&(l=f,_=v)}var A=_,x=A+1<p?A+1:0,g=y[A],b=y[x];if(l<n.EPSILON)return t.pointCount=1,t.type=a.e_faceA,t.localNormal.set(d[_]),t.localPoint.wSet(.5,g,.5,b),t.points[0].localPoint=e.m_p,void(t.points[0].id.key=0);var B=m.dot(m.sub(c,g),m.sub(b,g)),w=m.dot(m.sub(c,b),m.sub(g,b));if(B<=0){if(m.distanceSquared(c,g)>u*u)return;t.pointCount=1,t.type=a.e_faceA,t.localNormal.wSet(1,c,-1,g),t.localNormal.normalize(),t.localPoint=g,t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0}else if(w<=0){if(m.distanceSquared(c,b)>u*u)return;t.pointCount=1,t.type=a.e_faceA,t.localNormal.wSet(1,c,-1,b),t.localNormal.normalize(),t.localPoint.set(b),t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0}else{var S=m.mid(g,b),l=m.dot(c,d[A])-m.dot(S,d[A]);if(l>u)return;t.pointCount=1,t.type=a.e_faceA,t.localNormal.set(d[A]),t.localPoint.set(S),t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0}}DEBUG=!1,ASSERT=!1;var n=(t("../util/common"),t("../common/Math")),r=t("../common/Transform"),m=(t("../common/Rot"),t("../common/Vec2")),a=(t("../collision/AABB"),t("../Settings"),t("../Manifold")),h=t("../Contact"),c=(t("../Shape"),t("./CircleShape")),_=t("./PolygonShape");h.addType(_.TYPE,c.TYPE,e)},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"./CircleShape":40,"./PolygonShape":47}],43:[function(t,i,o){function e(t,i,o,e,s,r,m){var a=o.getShape(),h=r.getShape();n(t,a,i,h,s)}function s(t,i,o,e,s,r,m){var a=o.getShape(),h=new c;a.getChildEdge(h,e);var _=h,l=r.getShape();n(t,_,i,l,s)}function n(t,i,o,e,s){t.pointCount=0;var n=r.mulT(o,r.mul(s,e.m_p)),a=i.m_vertex1,c=i.m_vertex2,_=m.sub(c,a),l=m.dot(_,m.sub(c,n)),u=m.dot(_,m.sub(n,a)),p=i.m_radius+e.m_radius;if(u<=0){var y=m.clone(a),d=m.sub(n,y),v=m.dot(d,d);if(v>p*p)return;if(i.m_hasVertex0){var f=i.m_vertex0,A=a,x=m.sub(A,f),g=m.dot(x,m.sub(A,n));if(g>0)return}return t.type=h.e_circles,t.localNormal.setZero(),t.localPoint.set(y),t.pointCount=1,t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0,t.points[0].id.cf.indexA=0,t.points[0].id.cf.typeA=h.e_vertex,t.points[0].id.cf.indexB=0,void(t.points[0].id.cf.typeB=h.e_vertex)}if(l<=0){var y=m.clone(c),d=m.sub(n,y),v=m.dot(d,d);if(v>p*p)return;if(i.m_hasVertex3){var b=i.m_vertex3,B=c,w=m.sub(b,B),S=m.dot(w,m.sub(n,B));if(S>0)return}return t.type=h.e_circles,t.localNormal.setZero(),t.localPoint.set(y),t.pointCount=1,t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0,t.points[0].id.cf.indexA=1,t.points[0].id.cf.typeA=h.e_vertex,t.points[0].id.cf.indexB=0,void(t.points[0].id.cf.typeB=h.e_vertex)}var C=m.dot(_,_),y=m.wAdd(l/C,a,u/C,c),d=m.sub(n,y),v=m.dot(d,d);if(!(v>p*p)){var M=m.neo(-_.y,_.x);m.dot(M,m.sub(n,a))<0&&M.set(-M.x,-M.y),M.normalize(),t.type=h.e_faceA,t.localNormal=M,t.localPoint.set(a),t.pointCount=1,t.points[0].localPoint.set(e.m_p),t.points[0].id.key=0,t.points[0].id.cf.indexA=0,t.points[0].id.cf.typeA=h.e_face,t.points[0].id.cf.indexB=0,t.points[0].id.cf.typeB=h.e_vertex}}DEBUG=!1,ASSERT=!1;var r=(t("../util/common"),t("../util/create"),t("../common/Math"),t("../common/Transform")),m=t("../common/Vec2"),a=(t("../common/Rot"),t("../Settings"),t("../Shape"),t("../Contact")),h=t("../Manifold"),c=t("./EdgeShape"),_=t("./ChainShape"),l=t("./CircleShape");a.addType(c.TYPE,l.TYPE,e),a.addType(_.TYPE,l.TYPE,s)},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"./ChainShape":39,"./CircleShape":40,"./EdgeShape":46}],44:[function(t,i,o){function e(t,i,o,e,s,n,r){a(t,o.getShape(),i,n.getShape(),s)}function s(t,i,o,e,s,n,r){var m=o.getShape(),h=new d;m.getChildEdge(h,e),a(t,h,i,n.getShape(),s)}function n(){this.type,this.index,this.separation}function r(){this.vertices=[],this.normals=[],this.count=0}function m(){this.i1,this.i2,this.v1,this.v2,this.normal=_.zero(),this.sideNormal1=_.zero(),this.sideOffset1,this.sideNormal2=_.zero(),this.sideOffset2}function a(t,i,o,e,s){var n=c.mulT(o,s),r=c.mul(n,e.m_centroid),m=i.m_vertex0,a=i.m_vertex1,p=i.m_vertex2,d=i.m_vertex3,v=i.m_hasVertex0,f=i.m_hasVertex3,C=_.sub(p,a);C.normalize();var M=_.neo(C.y,-C.x),I=_.dot(M,_.sub(r,a)),T=0,P=0,V=!1,z=!1;if(v){var L=_.sub(a,m);L.normalize();var R=_.neo(L.y,-L.x);V=_.cross(L,C)>=0,T=_.dot(R,r)-_.dot(R,m)}if(f){var F=_.sub(d,p);F.normalize();var D=_.neo(F.y,-F.x);z=_.cross(C,F)>0,P=_.dot(D,r)-_.dot(D,p)}var q,E=_.zero(),k=_.zero(),j=_.zero();v&&f?V&&z?(q=T>=0||I>=0||P>=0,q?(E.set(M),k.set(R),j.set(D)):(E.wSet(-1,M),k.wSet(-1,M),j.wSet(-1,M))):V?(q=T>=0||I>=0&&P>=0,q?(E.set(M),k.set(R),j.set(M)):(E.wSet(-1,M),k.wSet(-1,D),j.wSet(-1,M))):z?(q=P>=0||T>=0&&I>=0,q?(E.set(M),k.set(M),j.set(D)):(E.wSet(-1,M),k.wSet(-1,M),j.wSet(-1,R))):(q=T>=0&&I>=0&&P>=0,q?(E.set(M),k.set(M),j.set(M)):(E.wSet(-1,M),k.wSet(-1,D),j.wSet(-1,R))):v?V?(q=T>=0||I>=0,q?(E.set(M),k.set(R),j.wSet(-1,M)):(E.wSet(-1,M),k.set(M),j.wSet(-1,M))):(q=T>=0&&I>=0,q?(E.set(M),k.set(M),j.wSet(-1,M)):(E.wSet(-1,M),k.set(M),j.wSet(-1,R))):f?z?(q=I>=0||P>=0,q?(E.set(M),k.wSet(-1,M),j.set(D)):(E.wSet(-1,M),k.wSet(-1,M),j.set(M))):(q=I>=0&&P>=0,q?(E.set(M),k.wSet(-1,M),j.set(M)):(E.wSet(-1,M),k.wSet(-1,D),j.set(M))):(q=I>=0,q?(E.set(M),k.wSet(-1,M),j.wSet(-1,M)):(E.wSet(-1,M),k.set(M),j.set(M))),w.count=e.m_count;for(var J=0;J<e.m_count;++J)w.vertices[J]=c.mul(n,e.m_vertices[J]),w.normals[J]=l.mul(n.q,e.m_normals[J]);var O=2*u.polygonRadius;t.pointCount=0,b.type=x,b.index=q?0:1,b.separation=1/0;for(var J=0;J<w.count;++J){var N=_.dot(E,_.sub(w.vertices[J],a));N<b.separation&&(b.separation=N)}if(b.type!=A&&!(b.separation>O)){B.type=A,B.index=-1,B.separation=-(1/0);for(var G=_.neo(-E.y,E.x),J=0;J<w.count;++J){var U=_.neg(w.normals[J]),W=_.dot(U,_.sub(w.vertices[J],a)),Y=_.dot(U,_.sub(w.vertices[J],p)),N=h.min(W,Y);if(N>O){B.type=g,B.index=J,B.separation=N;break}if(_.dot(U,G)>=0){if(_.dot(_.sub(U,j),E)<-u.angularSlop)continue}else if(_.dot(_.sub(U,k),E)<-u.angularSlop)continue;N>B.separation&&(B.type=g,B.index=J,B.separation=N)}if(!(B.type!=A&&B.separation>O)){var H,Z=.98,K=.001;H=B.type==A?b:B.separation>Z*b.separation+K?B:b;var X=[new y.clipVertex,new y.clipVertex];if(H.type==x){t.type=y.e_faceA;for(var Q=0,$=_.dot(E,w.normals[0]),J=1;J<w.count;++J){var tt=_.dot(E,w.normals[J]);tt<$&&($=tt,Q=J)}var it=Q,ot=it+1<w.count?it+1:0;X[0].v=w.vertices[it],X[0].id.cf.indexA=0,X[0].id.cf.indexB=it,X[0].id.cf.typeA=y.e_face,X[0].id.cf.typeB=y.e_vertex,X[1].v=w.vertices[ot],X[1].id.cf.indexA=0,X[1].id.cf.indexB=ot,X[1].id.cf.typeA=y.e_face,X[1].id.cf.typeB=y.e_vertex,q?(S.i1=0,S.i2=1,S.v1=a,S.v2=p,S.normal.set(M)):(S.i1=1,S.i2=0,S.v1=p,S.v2=a,S.normal.wSet(-1,M))}else t.type=y.e_faceB,X[0].v=a,X[0].id.cf.indexA=0,X[0].id.cf.indexB=H.index,X[0].id.cf.typeA=y.e_vertex,X[0].id.cf.typeB=y.e_face,X[1].v=p,X[1].id.cf.indexA=0,X[1].id.cf.indexB=H.index,X[1].id.cf.typeA=y.e_vertex,X[1].id.cf.typeB=y.e_face,S.i1=H.index,S.i2=S.i1+1<w.count?S.i1+1:0,S.v1=w.vertices[S.i1],S.v2=w.vertices[S.i2],S.normal.set(w.normals[S.i1]);S.sideNormal1.set(S.normal.y,-S.normal.x),S.sideNormal2.wSet(-1,S.sideNormal1),S.sideOffset1=_.dot(S.sideNormal1,S.v1),S.sideOffset2=_.dot(S.sideNormal2,S.v2);var et,st=[new y.clipVertex,new y.clipVertex],nt=[new y.clipVertex,new y.clipVertex];if(et=y.clipSegmentToLine(st,X,S.sideNormal1,S.sideOffset1,S.i1),!(et<u.maxManifoldPoints||(et=y.clipSegmentToLine(nt,st,S.sideNormal2,S.sideOffset2,S.i2),et<u.maxManifoldPoints))){H.type==x?(t.localNormal=_.clone(S.normal),t.localPoint=_.clone(S.v1)):(t.localNormal=_.clone(e.m_normals[S.i1]),t.localPoint=_.clone(e.m_vertices[S.i1]));for(var rt=0,J=0;J<u.maxManifoldPoints;++J){var mt=_.dot(S.normal,_.sub(nt[J].v,S.v1));if(mt<=O){var at=t.points[rt];H.type==x?(at.localPoint=c.mulT(n,nt[J].v),at.id=nt[J].id):(at.localPoint=nt[J].v,at.id.cf.typeA=nt[J].id.cf.typeB,at.id.cf.typeB=nt[J].id.cf.typeA,at.id.cf.indexA=nt[J].id.cf.indexB,at.id.cf.indexB=nt[J].id.cf.indexA),++rt}}t.pointCount=rt}}}}DEBUG=!1,ASSERT=!1;var h=(t("../util/common"),t("../util/create"),t("../common/Math")),c=t("../common/Transform"),_=t("../common/Vec2"),l=t("../common/Rot"),u=t("../Settings"),p=(t("../Shape"),t("../Contact")),y=t("../Manifold"),d=t("./EdgeShape"),v=t("./ChainShape"),f=t("./PolygonShape");p.addType(d.TYPE,f.TYPE,e),p.addType(v.TYPE,f.TYPE,s);var A=-1,x=1,g=2,b=new n,B=new n,w=new r,S=new m},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"./ChainShape":39,"./EdgeShape":46,"./PolygonShape":47}],45:[function(t,i,o){function e(t,i,o,e,s,n,m){r(t,o.getShape(),i,n.getShape(),s)}function s(t,i,o,e){for(var n=t.m_count,r=o.m_count,c=t.m_normals,_=t.m_vertices,l=o.m_vertices,u=m.mulT(e,i),p=0,y=-(1/0),d=0;d<n;++d){for(var v=a.mul(u.q,c[d]),f=m.mul(u,_[d]),A=1/0,x=0;x<r;++x){var g=h.dot(v,l[x])-h.dot(v,f);g<A&&(A=g)}A>y&&(y=A,p=d)}s._maxSeparation=y,s._bestIndex=p}function n(t,i,o,e,s,n){for(var r=i.m_normals,c=s.m_count,l=s.m_vertices,u=s.m_normals,p=a.mulT(n.q,a.mul(o.q,r[e])),y=0,d=1/0,v=0;v<c;++v){var f=h.dot(p,u[v]);f<d&&(d=f,y=v)}var A=y,x=A+1<c?A+1:0;t[0].v=m.mul(n,l[A]),t[0].id.cf.indexA=e,t[0].id.cf.indexB=A,t[0].id.cf.typeA=_.e_face,t[0].id.cf.typeB=_.e_vertex,t[1].v=m.mul(n,l[x]),t[1].id.cf.indexA=e,t[1].id.cf.indexB=x,t[1].id.cf.typeA=_.e_face,t[1].id.cf.typeB=_.e_vertex}function r(t,i,o,e,r){t.pointCount=0;var l=i.m_radius+e.m_radius;s(i,o,e,r);var u=s._bestIndex,p=s._maxSeparation;if(!(p>l)){s(e,r,i,o);var y=s._bestIndex,d=s._maxSeparation;if(!(d>l)){var v,f,A,x,g,b,B=.1*c.linearSlop;d>p+B?(v=e,f=i,A=r,x=o,g=y,t.type=_.e_faceB,b=1):(v=i,f=e,A=o,x=r,g=u,t.type=_.e_faceA,b=0);var w=[new _.clipVertex,new _.clipVertex];n(w,v,A,g,f,x);var S=v.m_count,C=v.m_vertices,M=g,I=g+1<S?g+1:0,T=C[M],P=C[I],V=h.sub(P,T);V.normalize();var z=h.cross(V,1),L=h.wAdd(.5,T,.5,P),R=a.mul(A.q,V),F=h.cross(R,1);T=m.mul(A,T),P=m.mul(A,P);var D,q=h.dot(F,T),E=-h.dot(R,T)+l,k=h.dot(R,P)+l,j=[new _.clipVertex,new _.clipVertex],J=[new _.clipVertex,new _.clipVertex];if(D=_.clipSegmentToLine(j,w,h.neg(R),E,M),!(D<2||(D=_.clipSegmentToLine(J,j,R,k,I),D<2))){t.localNormal=z,t.localPoint=L;for(var O=0,N=0;N<J.length;++N){var G=h.dot(F,J[N].v)-q;if(G<=l){var U=t.points[O];if(U.localPoint.set(m.mulT(x,J[N].v)),U.id=J[N].id,b){var W=U.id.cf,Y=W.indexA,H=W.indexB,Z=W.typeA,K=W.typeB;W.indexA=H,W.indexB=Y,W.typeA=K,W.typeB=Z}++O}}t.pointCount=O}}}}DEBUG=!1,ASSERT=!1;var m=(t("../util/common"),t("../common/Math"),t("../common/Transform")),a=t("../common/Rot"),h=t("../common/Vec2"),c=(t("../collision/AABB"),t("../Settings")),_=t("../Manifold"),l=t("../Contact"),u=(t("../Shape"),t("./PolygonShape"));i.exports=r,l.addType(u.TYPE,u.TYPE,e)},{"../Contact":3,"../Manifold":6,"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"./PolygonShape":47}],46:[function(t,i,o){function e(t,i){return this instanceof e?(e._super.call(this),this.m_type=e.TYPE,this.m_radius=n.polygonRadius,this.m_vertex1=t?h.clone(t):h.zero(),this.m_vertex2=i?h.clone(i):h.zero(),this.m_vertex0=h.zero(),this.m_vertex3=h.zero(),this.m_hasVertex0=!1,void(this.m_hasVertex3=!1)):new e(t,i)}DEBUG=!1,ASSERT=!1,i.exports=e;var s=t("../util/create"),n=(t("../util/options"),t("../Settings")),r=t("../Shape"),m=(t("../common/Math"),t("../common/Transform")),a=t("../common/Rot"),h=t("../common/Vec2");t("../collision/AABB");e._super=r,e.prototype=s(e._super.prototype),e.TYPE="edge",e.prototype.setNext=function(t){return t?(this.m_vertex3.set(t),this.m_hasVertex3=!0):(this.m_vertex3.setZero(),this.m_hasVertex3=!1),this},e.prototype.setPrev=function(t){return t?(this.m_vertex0.set(t),this.m_hasVertex0=!0):(this.m_vertex0.setZero(),this.m_hasVertex0=!1),this},e.prototype._set=function(t,i){return this.m_vertex1.set(t),this.m_vertex2.set(i),this.m_hasVertex0=!1,this.m_hasVertex3=!1,this},e.prototype._clone=function(){var t=new e;return t.m_type=this.m_type,t.m_radius=this.m_radius,t.m_vertex1.set(this.m_vertex1),t.m_vertex2.set(this.m_vertex2),t.m_vertex0.set(this.m_vertex0),t.m_vertex3.set(this.m_vertex3),t.m_hasVertex0=this.m_hasVertex0,t.m_hasVertex3=this.m_hasVertex3,t},e.prototype.getChildCount=function(){return 1},e.prototype.testPoint=function(t,i){return!1},e.prototype.rayCast=function(t,i,o,e){var s=a.mulT(o.q,h.sub(i.p1,o.p)),n=a.mulT(o.q,h.sub(i.p2,o.p)),r=h.sub(n,s),m=this.m_vertex1,c=this.m_vertex2,_=h.sub(c,m),l=h.neo(_.y,-_.x);l.normalize();var u=h.dot(l,h.sub(m,s)),p=h.dot(l,r);if(0==p)return!1;var y=u/p;if(y<0||i.maxFraction<y)return!1;var d=h.add(s,h.mul(y,r)),v=h.sub(c,m),f=h.dot(v,v);if(0==f)return!1;var A=h.dot(h.sub(d,m),v)/f;return!(A<0||1<A)&&(t.fraction=y,u>0?t.normal=a.mul(o.q,l).neg():t.normal=a.mul(o.q,l),!0)},e.prototype.computeAABB=function(t,i,o){var e=m.mul(i,this.m_vertex1),s=m.mul(i,this.m_vertex2);t.combinePoints(e,s),t.extend(this.m_radius)},e.prototype.computeMass=function(t,i){t.mass=0,t.center.wSet(.5,this.m_vertex1,.5,this.m_vertex2),t.I=0},e.prototype.computeDistanceProxy=function(t){t.m_vertices.push(this.m_vertex1),t.m_vertices.push(this.m_vertex2),t.m_count=2,t.m_radius=this.m_radius}},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/create":51,"../util/options":52}],47:[function(t,i,o){function e(t){return this instanceof e?(e._super.call(this),this.m_type=e.TYPE,this.m_radius=c.polygonRadius,this.m_centroid=h.zero(),this.m_vertices=[],this.m_normals=[],this.m_count=0,void(t&&t.length&&this._set(t))):new e(t)}function s(t,i){for(var o,e=h.zero(),s=0,n=h.zero(),r=1/3,o=0;o<i;++o){var m=n,a=t[o],c=o+1<i?t[o+1]:t[0],_=h.sub(a,m),l=h.sub(c,m),u=h.cross(_,l),p=.5*u;s+=p,e.wAdd(p*r,m),e.wAdd(p*r,a),e.wAdd(p*r,c)}return e.mul(1/s),e}DEBUG=!1,ASSERT=!1,i.exports=e;var n=(t("../util/common"),t("../util/create")),r=(t("../util/options"),t("../common/Math")),m=t("../common/Transform"),a=t("../common/Rot"),h=t("../common/Vec2"),c=(t("../collision/AABB"),t("../Settings")),_=t("../Shape");e._super=_,e.prototype=n(e._super.prototype),e.TYPE="polygon",e.prototype.getVertex=function(t){return this.m_vertices[t]},e.prototype._clone=function(){var t=new e;t.m_type=this.m_type,t.m_radius=this.m_radius,t.m_count=this.m_count,t.m_centroid.set(this.m_centroid);for(var i=0;i<this.m_count;i++)t.m_vertices.push(this.m_vertices[i].clone());for(var i=0;i<this.m_normals.length;i++)t.m_normals.push(this.m_normals[i].clone());return t},e.prototype.getChildCount=function(){return 1},e.prototype._set=function(t){if(t.length<3)return void SetAsBox(1,1);for(var i=r.min(t.length,c.maxPolygonVertices),o=[],e=0,n=0;n<i;++n){for(var m=t[n],a=!0,_=0;_<e;++_)if(h.distanceSquared(m,o[_])<.25*c.linearSlopSquared){a=!1;break}a&&(o[e++]=m)}if(i=e,i<3)return void SetAsBox(1,1);for(var l=0,u=o[0].x,n=1;n<i;++n){var p=o[n].x;(p>u||p==u&&o[n].y<o[l].y)&&(l=n,u=p)}for(var y=[],d=0,v=l;;){y[d]=v;for(var f=0,_=1;_<i;++_)if(f!=v){var A=h.sub(o[f],o[y[d]]),m=h.sub(o[_],o[y[d]]),x=h.cross(A,m);x<0&&(f=_),0==x&&m.lengthSquared()>A.lengthSquared()&&(f=_)}else f=_;if(++d,v=f,f==l)break}if(d<3)return void SetAsBox(1,1);this.m_count=d;for(var n=0;n<d;++n)this.m_vertices[n]=o[y[n]];for(var n=0;n<d;++n){var g=n,b=n+1<d?n+1:0,B=h.sub(this.m_vertices[b],this.m_vertices[g]);this.m_normals[n]=h.cross(B,1),this.m_normals[n].normalize()}this.m_centroid=s(this.m_vertices,d)},e.prototype.testPoint=function(t,i){for(var o=a.mulT(t.q,h.sub(i,t.p)),e=0;e<this.m_count;++e){var s=h.dot(this.m_normals[e],h.sub(o,this.m_vertices[e]));if(s>0)return!1}return!0},e.prototype.rayCast=function(t,i,o,e){for(var s=a.mulT(o.q,h.sub(i.p1,o.p)),n=a.mulT(o.q,h.sub(i.p2,o.p)),r=h.sub(n,s),m=0,c=i.maxFraction,_=-1,l=0;l<this.m_count;++l){var u=h.dot(this.m_normals[l],h.sub(this.m_vertices[l],s)),p=h.dot(this.m_normals[l],r);if(0==p){if(u<0)return!1}else p<0&&u<m*p?(m=u/p,_=l):p>0&&u<c*p&&(c=u/p);if(c<m)return!1}return _>=0&&(t.fraction=m,t.normal=a.mul(o.q,this.m_normals[_]),!0)},e.prototype.computeAABB=function(t,i,o){for(var e=1/0,s=1/0,n=-(1/0),a=-(1/0),h=0;h<this.m_count;++h){var c=m.mul(i,this.m_vertices[h]);e=r.min(e,c.x),n=r.max(n,c.x),s=r.min(s,c.y),a=r.max(a,c.y)}t.lowerBound.set(e,s),t.upperBound.set(n,a),t.extend(this.m_radius)},e.prototype.computeMass=function(t,i){for(var o=h.zero(),e=0,s=0,n=h.zero(),r=0;r<this.m_count;++r)n.add(this.m_vertices[r]);n.mul(1/this.m_count);for(var m=1/3,r=0;r<this.m_count;++r){var a=h.sub(this.m_vertices[r],n),c=r+1<this.m_count?h.sub(this.m_vertices[r+1],n):h.sub(this.m_vertices[0],n),_=h.cross(a,c),l=.5*_;e+=l,o.wAdd(l*m,a,l*m,c);var u=a.x,p=a.y,y=c.x,d=c.y,v=u*u+y*u+y*y,f=p*p+d*p+d*d;s+=.25*m*_*(v+f)}t.mass=i*e,o.mul(1/e),t.center.wSet(1,o,1,n),t.I=i*s,t.I+=t.mass*(h.dot(t.center,t.center)-h.dot(o,o))},e.prototype.validate=function(){for(var t=0;t<this.m_count;++t)for(var i=t,o=t<this.m_count-1?i+1:0,e=this.m_vertices[i],s=h.sub(this.m_vertices[o],e),n=0;n<this.m_count;++n)if(n!=i&&n!=o){var r=h.sub(this.m_vertices[n],e),m=h.cross(s,r);if(m<0)return!1}return!0},e.prototype.computeDistanceProxy=function(t){t.m_vertices=this.m_vertices,t.m_count=this.m_count,t.m_radius=this.m_radius}},{"../Settings":7,"../Shape":8,"../collision/AABB":11,"../common/Math":18,"../common/Rot":20,"../common/Transform":22,"../common/Vec2":23,"../util/common":50,"../util/create":51,"../util/options":52}],48:[function(t,i,o){function e(t){var i=[],o=t.max||1/0,e=t.create,s=t.allocate,n=t.release,r=t.discard,m=0,a=0,h=0,c=0;this.max=function(t){return"number"==typeof t?(o=t,this):o},this.size=function(){return i.length},this.allocate=function(){var t;return i.length>0?t=i.shift():(m++,t="function"==typeof e?e():{}),a++,"function"==typeof s&&s(t),t},this.release=function(t){i.length<o?(h++,"function"==typeof n&&n(t),i.push(t)):(c++,"function"==typeof r&&(t=r(t)))},this.toString=function(){return" +"+m+" >"+a+" <"+h+" -"+c+" ="+i.length+"/"+o}}DEBUG=!1,ASSERT=!1,i.exports=e},{}],49:[function(t,i,o){DEBUG=!1,ASSERT=!1,i.exports.now=function(){return Date.now()},i.exports.diff=function(t){return Date.now()-t}},{}],50:[function(t,i,o){DEBUG=!1,ASSERT=!1,o.debug=function(){},o.assert=function(t,i,o){}},{}],51:[function(t,i,o){function e(){}"function"==typeof Object.create?i.exports=function(t,i){return Object.create.call(Object,t,i)}:i.exports=function(t,i){if(i)throw Error("Second argument is not supported!");if("object"!=typeof t||null===t)throw Error("Invalid prototype!");return e.prototype=t,new e}},{}],52:[function(t,i,o){DEBUG=!1,ASSERT=!1;Object.prototype.propertyIsEnumerable;i.exports=function(t,i){null!==t&&"undefined"!=typeof t||(t={});for(var o in i)i.hasOwnProperty(o)&&"undefined"==typeof t[o]&&(t[o]=i[o]);if("function"==typeof Object.getOwnPropertySymbols)for(var e=Object.getOwnPropertySymbols(i),s=0;s<e.length;s++){var n=e[s];i.propertyIsEnumerable(n)&&"undefined"==typeof t[o]&&(t[n]=i[n])}return t}},{}]},{},[1])(1)});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__2d_spritechild2d__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__2d_object2d__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_matrix__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objectdatamanager_objectdatamanager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: symbol2d.js
//  DESC:      Class for rendering a symbol and it's animations
//









class Symbol2d extends __WEBPACK_IMPORTED_MODULE_1__2d_object2d__["a" /* Object2D */]
{
    constructor( spriteDataAry, id )
    {
        super();
        
        // Id of this symbol
        this.id = id;
        
        // Array of sprites this symbol renders
        this.spriteAry = [];
        
        // Final matrix
        this.finalMatrix = new __WEBPACK_IMPORTED_MODULE_2__utilities_matrix__["a" /* Matrix */];
        
        // This symbol's visual representation
        for( let i = 0; i < spriteDataAry.length; ++i )
        {
            let sprite = new __WEBPACK_IMPORTED_MODULE_0__2d_spritechild2d__["a" /* SpriteChild2D */]( __WEBPACK_IMPORTED_MODULE_3__objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( spriteDataAry[i].group, spriteDataAry[i].objectName ) );
            
            sprite.setVisible( spriteDataAry[i].isVisible() );
            
            if( spriteDataAry[i].fontData && sprite.visualComponent.isFontSprite() )
                sprite.visualComponent.fontData.copy( spriteDataAry[i].fontData );
            
            sprite.copyTransform( spriteDataAry[i] );
            
            this.spriteAry.push( sprite );
        }
    }
    
    // 
    //  DESC: Init the sprite. This only matters if it's a sprite font.
    //
    init()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].init();
    }
    
    //
    //  DESC: Do some cleanup. This only matters if it's a sprite font.
    //
    cleanUp()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].cleanUp();
    }
    
    // 
    //  DESC: Do the update
    //
    update()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].update();
    }
    
    //
    //  DESC: Transform the symbol
    //
    transform( matrix = null, tranformWorldPos = null )
    {
        this.parameters.remove( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_68" /* WAS_TRANSFORMED */] );

        if( matrix )
        {
            if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] ) )
                this.transformLocal( this.matrix );
        
            if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_68" /* WAS_TRANSFORMED */] ) || tranformWorldPos )
            {
                this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_68" /* WAS_TRANSFORMED */] );
                
                this.finalMatrix.copy( this.matrix );

                this.finalMatrix.mergeMatrix( matrix.matrix );
            }
        }
        else
        {
            if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_68" /* WAS_TRANSFORMED */] ) )
                this.transformLocal( this.finalMatrix );
        }
        
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].transform( this.finalMatrix, this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_68" /* WAS_TRANSFORMED */] ) );
    }
    
    // 
    //  DESC: do the render
    //
    render( matrix )
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].render( matrix );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Symbol2d;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return slotMathManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__managers_managerbase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_assetholder__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__slotmath__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__paylineset__ = __webpack_require__(91);

//
//  FILE NAME: slotmathmanager.js
//  DESC:      Singlton for managing slot math data
//








class SlotMathManager extends __WEBPACK_IMPORTED_MODULE_0__managers_managerbase__["a" /* ManagerBase */]
{
    constructor()
    {
        super();
        
        // Map of a map of all the reel group data
        this.slotMathMapMap = new Map;

        // Payline description
        this.paylineSetMap = new Map;
    }
    
    //
    //  DESC: Get the symbol set view data
    //
    getSlotMath( group, id )
    {
        // Get the group map
        let groupMap = this.slotMathMapMap.get( group );
        if( groupMap !== undefined )
        {
            let slotMath = groupMap.get( id );
            if( slotMath )
                return slotMath;
            else
                throw new Error( `Slot Math name can't be found (${group}, ${name})!` );
        }
        else
            throw new Error( `Slot Math group can't be found (${group}, ${name})!` );
        
        return null;
    }
    
    //
    //  DESC: Load all XML's associated with this group
    //
    loadGroup( groupAry, finishCallback )
    {
        super.loadGroup( 'Slot math', this.slotMathMapMap, groupAry, finishCallback );
    }
    
    //
    //  DESC: Load all slot math data from an xml node
    //
    loadFromNode( group, node, filePath, finishCallback )
    {
        // Get the id
        let id = node.getAttribute( "id" );
    
        // Get the group map
        let groupMap = this.slotMathMapMap.get( group );
        
        // Check for duplicate names
        if( groupMap.has(id) )
            throw new Error( `Duplicate math group id (${id}, ${group}, ${filePath})!` );
        
        // Allocate the math group data to the map
        let slotMath = new __WEBPACK_IMPORTED_MODULE_2__slotmath__["a" /* SlotMath */](group, id);
        groupMap.set( id, slotMath );
        
        // Load the data from node
        slotMath.loadFromNode( node );
    }

    //
    //  DESC: Load the payline configuration from XML file
    //
    loadPaylineSetFromNode( node )
    {
        // Get the node to the payline set list
        let paylineSetNode = node.children;

        for( let i = 0; i < paylineSetNode.length; ++i )
        {
            // Get the id
            let id = paylineSetNode[i].getAttribute( 'id' );
            
            // Check for duplicate names
            if( this.paylineSetMap.has( id ) )
                throw new Error( `Duplicate payline set id (${id}, ${this.group})!` );

            let payline = new __WEBPACK_IMPORTED_MODULE_3__paylineset__["a" /* PaylineSet */];
            this.paylineSetMap.set( id, payline );
            
            // Get the line nodes
            let lineNode = paylineSetNode[i].getElementsByTagName( 'line' );

            for( let j = 0; j < lineNode.length; ++j )
            {
                let lineAry = [];
                payline.line.push( lineAry );
                
                for( let w = 0; w < lineNode[j].attributes.length; ++w )
                    lineAry.push( Number(lineNode[j].attributes[w].value) );
            }
            
            // Get the scatter nodes
            let scatterNode = paylineSetNode[i].getElementsByTagName( 'scatter' );

            for( let j = 0; j < scatterNode.length; ++j )
            {
                let scatterAry = [];
                payline.scatter.push( scatterAry );
                
                for( let w = 0; w < scatterNode[j].attributes.length; ++w )
                    scatterAry.push( Number(scatterNode[j].attributes[w].value) );
            }
        }
    }

    //
    //  DESC: Get the payline set
    //
    getPaylineSet( id )
    {
        let paylineSet = this.paylineSetMap.get( id );
        if( !paylineSet )
            throw new Error( `Payline Set id can't be found (${this.group}, ${id})!` );

        return paylineSet;
    }
    
    //
    //  DESC: Free a symbol group
    //
    freeGroup( groupAry )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for exists
            if( this.listTableMap.get( group ) === undefined )
                throw new Error( `Slot math group name can't be found (${group})!` );

            // Get the group map
            if( this.slotMathMapMap.has( group ) )
                this.slotMathMapMap.delete( group );
        }
    }
    
    //
    //  DESC: Free the payline set
    //
    freePaylineSet()
    {
        this.paylineSetMap.clear();
    }
    
    //
    //  DESC: Clear out all the data
    //
    clear()
    {
        this.freePaylineSet();
        this.slotMathMapMap.clear();
    }
}

var slotMathManager = new SlotMathManager;


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return actionManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_keycodeaction__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_defs__ = __webpack_require__(0);
// 
//  FILE NAME: actionmanager.js
//  DESC:      Class for handling action mapping
//






class ActionManager
{
    constructor()
    {
        this.keyboardKeyCodeMap = new Map;
        this.mouseKeyCodeMap = new Map;
        //this.gamepadKeyCodeMap = new Map;
        
        // Action maps
        this.keyboardActionMap = new Map;
        this.mouseActionMap = new Map;
        this.gamepadActionMap = new Map;
        
        // Flag to allow action handling
        this.allowAction = true;
        
        // Last device used
        this.lastDeviceUsed = __WEBPACK_IMPORTED_MODULE_2__common_defs__["h" /* DEVICE_NULL */];
        
        this.keyboardKeyCodeMap.set( '---', -1 );
        this.keyboardKeyCodeMap.set( 'RETURN', 13 );
        this.keyboardKeyCodeMap.set( 'ESCAPE', 27 );
        
        this.keyboardKeyCodeMap.set( 'ARROW UP',    38 );
        this.keyboardKeyCodeMap.set( 'ARROW DOWN',  40 );
        this.keyboardKeyCodeMap.set( 'ARROW LEFT',  37 );
        this.keyboardKeyCodeMap.set( 'ARROW RIGHT', 39 );

        this.keyboardKeyCodeMap.set( 'A', 'A'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'B', 'B'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'C', 'C'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'D', 'D'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'E', 'E'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'F', 'F'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'G', 'G'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'H', 'H'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'I', 'I'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'J', 'J'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'K', 'K'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'L', 'L'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'M', 'M'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'N', 'N'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'O', 'O'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'P', 'P'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'Q', 'Q'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'R', 'R'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'S', 'S'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'T', 'T'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'U', 'U'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'V', 'V'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'W', 'W'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'X', 'X'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'Y', 'Y'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( 'Z', 'Z'.charCodeAt(0) );
        
        this.keyboardKeyCodeMap.set( '0', '0'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '1', '1'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '2', '2'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '3', '3'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '4', '4'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '5', '5'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '6', '6'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '7', '7'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '8', '8'.charCodeAt(0) );
        this.keyboardKeyCodeMap.set( '9', '9'.charCodeAt(0) );
        
        this.keyboardKeyCodeMap.set( 'F1',  112 );
        this.keyboardKeyCodeMap.set( 'F2',  113 );
        this.keyboardKeyCodeMap.set( 'F3',  114 );
        this.keyboardKeyCodeMap.set( 'F4',  115 );
        this.keyboardKeyCodeMap.set( 'F5',  116 );
        this.keyboardKeyCodeMap.set( 'F6',  117 );
        this.keyboardKeyCodeMap.set( 'F7',  118 );
        this.keyboardKeyCodeMap.set( 'F8',  119 );
        this.keyboardKeyCodeMap.set( 'F9',  120 );
        this.keyboardKeyCodeMap.set( 'F10', 121 );
        this.keyboardKeyCodeMap.set( 'F11', 122 );
        this.keyboardKeyCodeMap.set( 'F12', 123 );
        
        this.keyboardKeyCodeMap.set( 'NUMPAD 0', 96 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 1', 97 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 2', 98 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 3', 99 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 4', 100 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 5', 101 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 6', 102 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 7', 103 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 8', 104 );
        this.keyboardKeyCodeMap.set( 'NUMPAD 9', 105 );
        
        this.keyboardKeyCodeMap.set( 'NUM LOCK',     144 );
        this.keyboardKeyCodeMap.set( 'NUMPAD /',     111 );
        this.keyboardKeyCodeMap.set( 'NUMPAD *',     106 );
        this.keyboardKeyCodeMap.set( 'NUMPAD -',     109 );
        this.keyboardKeyCodeMap.set( 'NUMPAD +',     107 );
        this.keyboardKeyCodeMap.set( 'NUMPAD ENTER', 13 );
        this.keyboardKeyCodeMap.set( 'NUMPAD .',     110 );
        
        this.keyboardKeyCodeMap.set( 'CTRL',  17 );
        this.keyboardKeyCodeMap.set( 'SHIFT', 16 );
        this.keyboardKeyCodeMap.set( 'ALT',   18 );
        
        this.keyboardKeyCodeMap.set( 'PRINT SCREEN', 42 );
        this.keyboardKeyCodeMap.set( 'SCROLL LOCK',  145 );
        this.keyboardKeyCodeMap.set( 'PAUSE',        19 );
        
        this.keyboardKeyCodeMap.set( 'END',       35 );
        this.keyboardKeyCodeMap.set( 'INSERT',    45 );
        this.keyboardKeyCodeMap.set( 'DELETE',    46 );
        this.keyboardKeyCodeMap.set( 'HOME',      36 );
        this.keyboardKeyCodeMap.set( 'PAGE UP',   33 );
        this.keyboardKeyCodeMap.set( 'PAGE DOWN', 34 );
        
        this.keyboardKeyCodeMap.set( 'BACKSPACE', 8 );
        this.keyboardKeyCodeMap.set( 'TAB',       9 );
        this.keyboardKeyCodeMap.set( 'SPACE',     32 );
        this.keyboardKeyCodeMap.set( ',',         188 );
        this.keyboardKeyCodeMap.set( '-',         173 );
        this.keyboardKeyCodeMap.set( '.',         190 );
        this.keyboardKeyCodeMap.set( '/',         191 );
        this.keyboardKeyCodeMap.set( '=',         61 );
        
        this.keyboardKeyCodeMap.set( ';',  59 );
        this.keyboardKeyCodeMap.set( '[',  219 );
        this.keyboardKeyCodeMap.set( '\\', 220 );
        this.keyboardKeyCodeMap.set( ']',  221 );
        this.keyboardKeyCodeMap.set( '`',  192 );
        this.keyboardKeyCodeMap.set( "'",  222 );
        
        this.mouseKeyCodeMap.set( '---',  -1 );
        this.mouseKeyCodeMap.set( 'LEFT MOUSE',   0 );
        this.mouseKeyCodeMap.set( 'MIDDLE MOUSE', 1 );
        this.mouseKeyCodeMap.set( 'RIGHT MOUSE',  2 );
    }
    
    // 
    //  DESC: Load data from XML node
    //
    load( node )
    {
        if( node )
        {
            // Load the keyboard/mouse/gamepad mapping
            this.loadKeyboardMappingFromNode( node.getElementsByTagName('keyboardMapping') );
            this.loadMouseMappingFromNode( node.getElementsByTagName( 'mouseMapping' ) );
            //this.loadGamepadMappingFromNode( node.getElementsByTagName( 'gamepadMapping' ) );
        }
    }
    
    // 
    //  DESC: Load the keyboard mapping from node
    //
    loadKeyboardMappingFromNode( node )
    {
        // Load the player hidden controls
        this.loadActionFromNode( node[0].getElementsByTagName('playerHidden'), this.keyboardKeyCodeMap, this.keyboardActionMap );

        // Load the player visible controls
        this.loadActionFromNode( node[0].getElementsByTagName('playerVisible'), this.keyboardKeyCodeMap, this.keyboardActionMap );
    }

    // 
    //  DESC: Load the keyboard mapping from node
    //
    loadMouseMappingFromNode( node )
    {
        // Load the player hidden controls
        this.loadActionFromNode( node[0].getElementsByTagName('playerHidden'), this.mouseKeyCodeMap, this.mouseActionMap );

        // Load the player visible controls
        this.loadActionFromNode( node[0].getElementsByTagName('playerVisible'), this.mouseKeyCodeMap, this.mouseActionMap );
    }

    // 
    //  DESC: Load the keyboard mapping from node
    //
    /*loadGamepadMappingFromNode( node )
    {
        // Load the player hidden controls
        LoadActionFromNode( node[0].getElementsByTagName("playerHidden"), this.gamepadKeyCodeMap, this.gamepadActionMap );

        // Load the player visible controls
        LoadActionFromNode( node[0].getElementsByTagName("playerVisible"), this.gamepadKeyCodeMap, this.gamepadActionMap );
    }*/
    
    // 
    //  DESC: Load action data from xml node
    //
    loadActionFromNode( node, keyCodeMap, actionMap )
    {
        if( node.length )
        {
            let actionNode = node[0].getElementsByTagName('actionMap');

            for( let i = 0; i < actionNode.length; ++i )
            {
                // See if we can find the string that represents the key code id
                let componentIdStr = actionNode[i].getAttribute( 'componetId' );
                let keyCode = keyCodeMap.get( componentIdStr );

                // Add it in if we found it
                if( keyCode !== undefined )
                {
                    let actionStr = actionNode[i].getAttribute( 'action' );

                    // See if the controller action string has already been added
                    let action = actionMap.get( actionStr );

                    if( action !== undefined )
                    {
                        // If it's found, add another id to this map
                        action.setId( keyCode );
                    }
                    else
                    {
                        // Add new action to the map
                        actionMap.set( actionStr, new __WEBPACK_IMPORTED_MODULE_0__common_keycodeaction__["a" /* KeyCodeAction */](keyCode) );
                    }
                }
            }
        }
    }
    
    // 
    //  DESC: Was this an action
    //
    wasActionPress( event, actionStr, actionPress )
    {
        if( this.wasAction( event, actionStr ) === actionPress )
            return true;

        return false;
    }
    
    // 
    //  DESC: Was this an action
    //
    wasAction( event, actionStr )
    {
        let result = __WEBPACK_IMPORTED_MODULE_2__common_defs__["l" /* EAP_IDLE */];

        if( this.allowAction )
        {
            // Check for keyboard event
            if( event instanceof KeyboardEvent )
            {
                this.lastDeviceUsed = __WEBPACK_IMPORTED_MODULE_2__common_defs__["_56" /* KEYBOARD */];

                if( this.wasActionMap( event.keyCode, actionStr, this.keyboardActionMap ) )
                {
                    result = __WEBPACK_IMPORTED_MODULE_2__common_defs__["m" /* EAP_UP */];

                    // Check for the "D" character code for keydown
                    if( event.type.charCodeAt(3) === 100 )
                    {
                        result = __WEBPACK_IMPORTED_MODULE_2__common_defs__["k" /* EAP_DOWN */];
                    }
                }
            }
            // Check for mouse event
            else if( event instanceof MouseEvent )
            {
                this.lastDeviceUsed = __WEBPACK_IMPORTED_MODULE_2__common_defs__["_57" /* MOUSE */];

                if( this.wasActionMap( event.button, actionStr, this.mouseActionMap ) )
                {
                    result = __WEBPACK_IMPORTED_MODULE_2__common_defs__["m" /* EAP_UP */];

                    // Check for the "D" character code for mousedown
                    if( event.type.charCodeAt(5) === 100 )
                    {
                        result = __WEBPACK_IMPORTED_MODULE_2__common_defs__["k" /* EAP_DOWN */];
                    }
                }
            }
        }

        return result;
    }
    
    // 
    //  DESC: Was this an action
    //
    wasActionMap( id, actionStr, actionMap )
    {
        let result = false;

        // See if the action has already been added
        let action = actionMap.get( actionStr );

        // If it's found, see if this is the correct action
        if( action !== undefined )
        {
            result = action.wasAction( id );
        }

        return result;
    }
    
    // 
    //  DESC: What was the last device
    //
    wasLastDeviceGamepad()
    {
        return (this.lastDeviceUsed === __WEBPACK_IMPORTED_MODULE_2__common_defs__["_55" /* GAMEPAD */]);
    }

    wasLastDeviceKeyboard()
    {
        return (this.lastDeviceUsed === __WEBPACK_IMPORTED_MODULE_2__common_defs__["_56" /* KEYBOARD */]);
    }

    wasLastDeviceMouse()
    {
        return (this.lastDeviceUsed === __WEBPACK_IMPORTED_MODULE_2__common_defs__["_57" /* MOUSE */]);
    }
}

var actionManager = new ActionManager;


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = create;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__managers_signalmanager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__uilabel__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uibutton__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uisubcontrol__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__uibuttonlist__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__uicheckbox__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__uislider__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__uiscrollbox__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__uimeter__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__uiprogressbar__ = __webpack_require__(52);
// 
//  FILE NAME: uicontrolfactory.js
//  DESC:      factory for control creation
//













// 
//  DESC: Load the control info from XML node
//
function create( node, group )
{
    let control = null;

    // Get the control type. This is required
    let ctrlType = node.getAttribute( 'controlType' );

    // New up the control with its respected control type
    if( ctrlType === 'label' )
        control = new __WEBPACK_IMPORTED_MODULE_1__uilabel__["a" /* UILabel */]( group );

    else if( ctrlType === 'button' )
        control = new __WEBPACK_IMPORTED_MODULE_2__uibutton__["a" /* UIButton */]( group );

    else if( ctrlType === 'sub_control' )
        control = new __WEBPACK_IMPORTED_MODULE_3__uisubcontrol__["a" /* UISubControl */]( group );

    else if( ctrlType === 'button_list' )
        control = new __WEBPACK_IMPORTED_MODULE_4__uibuttonlist__["a" /* UIButtonList */]( group );

    else if( ctrlType === 'check_box' )
        control = new __WEBPACK_IMPORTED_MODULE_5__uicheckbox__["a" /* UICheckBox */]( group );

    else if( ctrlType === 'slider' )
        control = new __WEBPACK_IMPORTED_MODULE_6__uislider__["a" /* UISlider */]( group );

    else if( ctrlType === 'scroll_box' )
        control = new __WEBPACK_IMPORTED_MODULE_7__uiscrollbox__["a" /* UIScrollBox */]( group );

    else if( ctrlType === 'meter' )
        control = new __WEBPACK_IMPORTED_MODULE_8__uimeter__["a" /* UIMeter */]( group );

    else if( ctrlType === 'progress_bar' )
        control = new __WEBPACK_IMPORTED_MODULE_9__uiprogressbar__["a" /* UIProgressBar */]( group );

    else
        throw new Error( `UI Control not defined! (${ctrlType})` );

    // Have the control load it's share
    control.loadFromNode( node );

    // Broadcast signal to let the game handle smart gui inits
    __WEBPACK_IMPORTED_MODULE_0__managers_signalmanager__["a" /* signalManager */].broadcast_smartGui( control );

    // Do any smart gui Create
    control.smartCreate();

    return control;

}


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = load;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commonstate__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_2d_sprite2d__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_objectdatamanager_objectdatamanager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__library_managers_shadermanager__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__library_gui_menumanager__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__library_system_device__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__library_script_scriptcomponent__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__library_utilities_highresolutiontimer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__library_script_scriptmanager__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__library_slot_betmanager__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__gamestate__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__library_common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: lobbystate.js
//  DESC:      lobby state class
//

















const group = '(lobby)';

class LobbyState extends __WEBPACK_IMPORTED_MODULE_0__commonstate__["a" /* CommonState */]
{
    constructor( gameLoopCallback = null )
    {
        super( __WEBPACK_IMPORTED_MODULE_11__gamestate__["c" /* GAME_STATE_LOBBY */], __WEBPACK_IMPORTED_MODULE_11__gamestate__["b" /* GAME_STATE_LOAD */], gameLoopCallback );
        
        this.background = new __WEBPACK_IMPORTED_MODULE_1__library_2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_2__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( group, 'background' ) );
        this.background.transform();
        
        // Create the script component and add a script
        this.scriptComponent = new __WEBPACK_IMPORTED_MODULE_6__library_script_scriptcomponent__["a" /* ScriptComponent */];
        this.scriptComponent.set( __WEBPACK_IMPORTED_MODULE_8__library_script_scriptmanager__["a" /* scriptManager */].get('ScreenFade')( 0, 1, 500 ) );
    }
    
    // 
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        // Unblock the menu messaging and activate needed trees
        __WEBPACK_IMPORTED_MODULE_4__library_gui_menumanager__["a" /* menuManager */].allowEventHandling = true;
        __WEBPACK_IMPORTED_MODULE_4__library_gui_menumanager__["a" /* menuManager */].activateTree( ['confirmation_tree', 'lobby_tree'] );
        
        // Init the credit meter
        __WEBPACK_IMPORTED_MODULE_4__library_gui_menumanager__["a" /* menuManager */].getMenuControl( "lobby_menu", "credit_meter" ).set( __WEBPACK_IMPORTED_MODULE_10__library_slot_betmanager__["a" /* betManager */].getCredits() );
        
        // Reset the elapsed time before entering the render loop
        __WEBPACK_IMPORTED_MODULE_7__library_utilities_highresolutiontimer__["a" /* highResTimer */].calcElapsedTime();
        
        // Start the game loop
        requestAnimationFrame( this.callback );
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
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
            if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__library_common_defs__["Z" /* EGE_MENU_GAME_STATE_CHANGE */] )
            {
                if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_12__library_common_defs__["_50" /* ETC_BEGIN */] )
                    this.scriptComponent.set( __WEBPACK_IMPORTED_MODULE_8__library_script_scriptmanager__["a" /* scriptManager */].get('ScreenFade')( 1, 0, 500, true ) );
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
        
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        super.transform();
    }
    
    // 
    //  DESC: 2D/3D Render of game content
    //
    preRender()
    {
        this.background.render( __WEBPACK_IMPORTED_MODULE_5__library_system_device__["a" /* device */].orthographicMatrix );
        
        super.preRender();
    }
    
    // 
    //  DESC: 2D/3D Render of game content
    //
    postRender()
    {
        super.postRender();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LobbyState;



// 
//  DESC: Unload files
//
function unload()
{
    __WEBPACK_IMPORTED_MODULE_2__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].freeGroup( [group] );
    __WEBPACK_IMPORTED_MODULE_4__library_gui_menumanager__["a" /* menuManager */].freeGroup( [group] );
}

// 
//  DESC: Load files
//
function load()
{
    // Load the xml group
    __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => __WEBPACK_IMPORTED_MODULE_2__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].loadXMLGroup2D( [group], callback ) );

    // Load all the textures associated with this group
    __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => __WEBPACK_IMPORTED_MODULE_2__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].loadTextureGroup2D( [group], callback ) );

    // Load all the meshes associated with this group
    __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => __WEBPACK_IMPORTED_MODULE_2__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].loadMeshGroup2D( [group], callback ) );

    // Create OpenGL objects from the loaded data
    __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => __WEBPACK_IMPORTED_MODULE_2__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].createFromData( [group], callback ) );

    // Preload the menu group
    __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => __WEBPACK_IMPORTED_MODULE_4__library_gui_menumanager__["a" /* menuManager */].preloadGroup( [group], callback ) );
    
    // Create the lobby menu group
    __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => { __WEBPACK_IMPORTED_MODULE_4__library_gui_menumanager__["a" /* menuManager */].createGroup( [group] ); callback(); });
}


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slotdefs__ = __webpack_require__(11);

// 
//  FILE NAME: spinprofile.js
//  DESC:      Spin profile data
//             Movement is in pixels per second.
//             Time is in milliseconds.
//





class SpinProfile
{
    constructor()
    {
        // Start delay
        this.startDelay = 0;

        // Acceleration
        this.accelation = 0.0004;

        // Impulse
        this.impulse = 0;

        // max velocity
        this.maxVelocity = 2.5;

        // max velocity time
        this.maxVelocityTime = 700;

        // Bounce correction
        this.bounceDrag = 0;

        // Bounce correction
        this.bounceCorrection = 0;

        // Time out delay is used as safty valve in the 
        // event of an error to force the reel to stop
        this.timeOutDelay = 0;
        
        // For a wheel, number of 360 rotations before stopping
        this.decelerationRotationCount = 1;
        
        // For a wheel to divide against the wedge size for max and min safety checks
        this.safetyCheckDivisor = 0;
    }
    
    copy( obj )
    {
        this.startDelay = obj.startDelay;
        this.accelation = obj.accelation;
        this.impulse = obj.impulse;
        this.maxVelocity = obj.maxVelocity;
        this.maxVelocityTime = obj.maxVelocityTime;
        this.bounceDrag = obj.bounceDrag;
        this.bounceCorrection = obj.bounceCorrection;
        this.timeOutDelay = obj.timeOutDelay;
        this.decelerationRotationCount = obj.decelerationRotationCount;
        this.safetyCheckDivisor = obj.safetyCheckDivisor;
    }
    
    //
    //  DESC: Load thes reel strip data from node
    //
    loadFromNode( node )
    {
        // Get the symbols per reel
        let attr = node.getAttribute( 'startDelay' );
        if( attr )
            this.startDelay = Number(attr);

        // Get the acceleration
        attr = node.getAttribute( 'accelation' );
        if( attr )
            this.accelation = Number(attr) / 1000.0;

        // Get the impulse
        attr = node.getAttribute( 'impulse' );
        if( attr )
            this.impulse = Number(attr) / 1000.0;

        // Get the max velocity
        attr = node.getAttribute( 'maxVelocity' );
        if( attr )
            this.maxVelocity = Number(attr) / 1000.0;

        // Get the max speed time
        attr = node.getAttribute( 'maxVelocityTime' );
        if( attr )
            this.maxVelocityTime = Number(attr);

        // Get the bounce drag
        attr = node.getAttribute( 'bounceDrag' );
        if( attr )
            this.bounceDrag = Number(attr) / 1000.0;

        // Get the bounce distance
        attr = node.getAttribute( 'bounceCorrection' );
        if( attr )
            this.bounceCorrection = Number(attr);

        // Get the time out delay
        attr = node.getAttribute( 'timeOutDelay' );
        if( attr )
            this.timeOutDelay = Number(attr);

        // For a wheel, number of 360 rotations before stopping
        attr = node.getAttribute( 'decelerationRotationCount' );
        if( attr )
            this.decelerationRotationCount = Number(attr);
        
        // For a wheel to divide against the wedge size for max and min ssfty checks
        attr = node.getAttribute( 'safetyCheckDivisor' );
        if( attr )
            this.safetyCheckDivisor = Number(attr);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpinProfile;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__size__ = __webpack_require__(1);

//
//  FILE NAME: texture.js
//  DESC:      Class for holding texture data
//





class Texture
{
    constructor()
    {
        // OpenGL texture ID
        this.id = 0;
        
        // Texture type (diffuse, normal, specular, displacement, etc)
        this.type = 0;

        // Texture size - mostly needed for 2D
        this.size = new __WEBPACK_IMPORTED_MODULE_0__size__["a" /* Size */];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Texture;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return meshManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__system_device__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_uv__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_meshbinaryfileheader__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_mesh3d__ = __webpack_require__(63);

//
//  FILE NAME: meshmanager.js
//  DESC:      mesh manager class singleton
//









class MeshManager
{
    constructor()
    {
        // Map containing a group array of vbo, ibo and texture id's
        this.meshBufMapMap = new Map;

        // Map for collision mesh
        //this.collisionMeshBufMapMap = new Map;

        // Current vbo
        this.currentVBO = null;

        // Current IBO ID
        this.currentIBO = null;
        
        // counter for indexing into binary data when loading
        this.counter = 0;
    }
    
    //
    //  DESC: Load the binary mesh data
    //  NOTE: To keep it simple, loading the textures is done seperately
    //
    load( group, filePath, binaryData )
    {
        // Create the group map if it doesn't already exist
        let groupMap = this.meshBufMapMap.get( group );
        if( groupMap === undefined )
        {
            groupMap = new Map;
            this.meshBufMapMap.set( group, groupMap );
        }
        
        let meshGrp = groupMap.get( filePath );
        if( meshGrp === undefined )
        {
            meshGrp = new __WEBPACK_IMPORTED_MODULE_4__common_mesh3d__["b" /* MeshGroup */];
            groupMap.set( filePath, meshGrp );
            
            this.loadData( group, filePath, binaryData, meshGrp );
        }
        
        return meshGrp;
    }
    
    //
    //  DESC: Load the binary mesh data
    //
    loadData( group, filePath, binaryData, meshGrp )
    {
        this.counter = 0;

        // Load the binary data into the data view for easy access to different data types
        let dataView = new DataView( binaryData );
        
        // Load the binary mesh file header
        let fileHeader = this.loadFileHeader( dataView, group, filePath );
        
        
        // Check to insure we are in the correct spot in the binary file
        this.tagCheck( dataView, (fileHeader.text_count > 0), group, filePath );
        
        // Load the texture file paths
        this.loadTexturePaths( dataView, fileHeader, meshGrp );
        
        
        // Check to insure we are in the correct spot in the binary file
        this.tagCheck( dataView, true, group, filePath );
        
        // Load the verts
        let vertAry = [];
        this.loadVerts( dataView, fileHeader, vertAry );
        
        
        // Check to insure we are in the correct spot in the binary file
        this.tagCheck( dataView, true, group, filePath );
        
        // Load the normals
        let normAry = [];
        this.loadNormals( dataView, fileHeader, normAry );
        
        
        // Check to insure we are in the correct spot in the binary file
        this.tagCheck( dataView, (fileHeader.uv_count > 0), group, filePath );
        
        // Load the uv's
        let uvAry = [];
        this.loadUVs( dataView, fileHeader, uvAry );
        
        // Build the meshes
        this.buildMeshes( dataView, group, filePath, fileHeader, meshGrp, vertAry, normAry, uvAry );
    }
    
    //
    //  DESC: Load the binary mesh file header
    //
    loadFileHeader( dataView, group, filePath )
    {
        let fileHeader = new __WEBPACK_IMPORTED_MODULE_3__common_meshbinaryfileheader__["e" /* MeshBinaryFileHeader */];
        
        fileHeader.file_header      = dataView.getUint32( this.counter, true ); this.counter += 4;
        fileHeader.vert_count       = dataView.getUint16( this.counter, true ); this.counter += 2;
        fileHeader.uv_count         = dataView.getUint16( this.counter, true ); this.counter += 2;
        fileHeader.vert_norm_count  = dataView.getUint16( this.counter, true ); this.counter += 2;
        fileHeader.face_group_count = dataView.getUint16( this.counter, true ); this.counter += 2;
        fileHeader.text_count       = dataView.getUint16( this.counter, true ); this.counter += 2;
        fileHeader.joint_count      = dataView.getUint16( this.counter, true ); this.counter += 2;
        
        // Check to make sure we're loading in the right kind of file
        if( fileHeader.file_header !== __WEBPACK_IMPORTED_MODULE_3__common_meshbinaryfileheader__["d" /* MESH_FILE_HEADER */] )
            throw new Error( `File header mismatch! (${group}, ${filePath}).` );
        
        return fileHeader;
    }
    
    //
    //  DESC: Load the binary mesh file header
    //
    loadTexturePaths( dataView, fileHeader, meshGrp )
    {
        for( let i = 0; i < fileHeader.text_count; ++i )
        {
            let uniqueTextAry = new __WEBPACK_IMPORTED_MODULE_3__common_meshbinaryfileheader__["b" /* BinaryTexture */];
            meshGrp.uniqueTexturePathAry.push( uniqueTextAry );

            uniqueTextAry.type = dataView.getInt8( this.counter, true ); this.counter += 1;

            for( let j = 0; j < __WEBPACK_IMPORTED_MODULE_3__common_meshbinaryfileheader__["g" /* TEXT_PATH_SIZE */]; ++j )
            {
                let charCode = dataView.getInt8( this.counter, true ); this.counter += 1;

                if( charCode )
                {
                    uniqueTextAry.path += String.fromCharCode(charCode);
                }
                else
                {
                    this.counter += __WEBPACK_IMPORTED_MODULE_3__common_meshbinaryfileheader__["g" /* TEXT_PATH_SIZE */] - j - 1;
                    break;
                }
            }
        }
    }
    
    //
    //  DESC: Load the verts
    //
    loadVerts( dataView, fileHeader, vertAry )
    {
        // Load the verts
        for( let i = 0; i < fileHeader.vert_count; ++i )
        {
            let data = [0,0,0];
            vertAry.push( data );
            
            for( let j = 0; j < 3; ++j )
            {
                data[j] = dataView.getFloat32( this.counter, true ); this.counter += 4;
            }
        }
    }
    
    //
    //  DESC: Load the normals
    //
    loadNormals( dataView, fileHeader, normAry )
    {
        for( let i = 0; i < fileHeader.vert_norm_count; ++i )
        {
            let data = [0,0,0];
            normAry.push( data );
            
            for( let j = 0; j < 3; ++j )
            {
                data[j] = dataView.getFloat32( this.counter, true ); this.counter += 4;
            }
        }
    }
    
    //
    //  DESC: Load the uv's
    //
    loadUVs( dataView, fileHeader, uvAry )
    {
        // Load the normals
        for( let i = 0; i < fileHeader.uv_count; ++i )
        {
            let data = [0,0];
            uvAry.push( data );
            
            for( let j = 0; j < 2; ++j )
            {
                data[j] = dataView.getFloat32( this.counter, true ); this.counter += 4;
            }
        }
    }
    
    //
    //  DESC: Build the meshes
    //
    buildMeshes( dataView, group, filePath, fileHeader, meshGrp, vertAry, normAry, uvAry )
    {
        let faceGroup = new __WEBPACK_IMPORTED_MODULE_3__common_meshbinaryfileheader__["a" /* BinaryFaceGroup */];
        
        // Read in each face group
        for( let i = 0; i < fileHeader.face_group_count; ++i )
        {
            // Check to insure we are in the correct spot in the binary file
            this.tagCheck( dataView, true, group, filePath );
            
            // Allocate the mesh storage
            let mesh = new __WEBPACK_IMPORTED_MODULE_4__common_mesh3d__["a" /* Mesh */];
            meshGrp.meshAry.push( mesh );
            
            faceGroup.groupFaceCount = dataView.getUint16( this.counter, true ); this.counter += 2;
            faceGroup.vertexBufCount = dataView.getUint16( this.counter, true ); this.counter += 2;
            faceGroup.indexBufCount  = dataView.getUint16( this.counter, true ); this.counter += 2;
            faceGroup.textureCount   = dataView.getUint16( this.counter, true ); this.counter += 2;
            
            // Read in the indexes that are the textures
            for( let j = 0; j < faceGroup.textureCount; ++j )
            {
                mesh.textureIndexAry.push( dataView.getUint16( this.counter, true ) );
                this.counter += 2;
            }

            // Read in the indexes used to create the VBO
            let vertBufAry = [];
            for( let j = 0; j < faceGroup.vertexBufCount; ++j )
            {
                let binaryVertex = new __WEBPACK_IMPORTED_MODULE_3__common_meshbinaryfileheader__["c" /* BinaryVertex */];
                vertBufAry.push( binaryVertex );
                
                binaryVertex.vert = dataView.getUint16( this.counter, true ); this.counter += 2;
                binaryVertex.norm = dataView.getUint16( this.counter, true ); this.counter += 2;
                
                if( fileHeader.uv_count )
                {
                    binaryVertex.uv = dataView.getUint16( this.counter, true ); this.counter += 2;
                }
            }

            // Read in the indexes that are the IBO
            let iboAry = [];
            for( let j = 0; j < faceGroup.indexBufCount; ++j )
            {
                iboAry.push( dataView.getUint16( this.counter, true ) );
                this.counter += 2;
            }
            
            // Create a temporary array for building the VBO
            let vboAry = [];

            // Build the VBO
            for( let j = 0; j < faceGroup.vertexBufCount; ++j )
            {
                Array.prototype.push.apply( vboAry, vertAry[ vertBufAry[j].vert ] );
                Array.prototype.push.apply( vboAry, normAry[ vertBufAry[j].norm ] );
                
                if( fileHeader.uv_count )
                    Array.prototype.push.apply( vboAry, uvAry[ vertBufAry[j].uv ] );
            }
            
            // Create the vbo
            mesh.vbo = __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].createBuffer();
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ARRAY_BUFFER, mesh.vbo );
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bufferData( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ARRAY_BUFFER, new Float32Array(vboAry), __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].STATIC_DRAW );
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ARRAY_BUFFER, null );
            
            // Create the ibo
            mesh.ibo = __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].createBuffer();
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ELEMENT_ARRAY_BUFFER, mesh.ibo );
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bufferData( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ELEMENT_ARRAY_BUFFER, new Uint16Array(iboAry), __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].STATIC_DRAW );
            __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].ELEMENT_ARRAY_BUFFER, null );
            
            // Save the number of indexes in the IBO buffer - Will need this for the render call
            mesh.iboCount = faceGroup.indexBufCount;
        }
    }
    
    //
    //  DESC: Load the binary mesh file header
    //
    tagCheck( dataView, allowCheck, group, filePath )
    {
        if( allowCheck )
        {
            let tag = dataView.getUint32( this.counter, true ); this.counter += 4;
            if( tag !== __WEBPACK_IMPORTED_MODULE_3__common_meshbinaryfileheader__["f" /* TAG_CHECK */] )
                throw new Error( `Tag check mismatch! (${group}, ${filePath}).` );
        }
    }
    
    //
    //  DESC: Delete the group of textures
    //
    deleteGroup( group )
    {
        let groupMap = this.meshBufMapMap.get( group );
        if( groupMap !== undefined )
        {
            for( let [ key, meshGrp ] of groupMap.entries() )
            {
                for( let i = 0; i < meshGrp.meshAry.length; ++i )
                {
                    __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].deleteBuffer( meshGrp.meshAry[i].vbo );
                    __WEBPACK_IMPORTED_MODULE_0__system_device__["b" /* gl */].deleteBuffer( meshGrp.meshAry[i].ibo );
                }
            }

            this.meshBufMapMap.delete( group );
        }
    }
}

var meshManager = new MeshManager;


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fontManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__2d_font__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_genfunc__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__managers_texturemanager__ = __webpack_require__(12);

//
//  FILE NAME: fontmanager.js
//  DESC:      font manager class singleton
//






class FontManager
{
    constructor()
    {
        // map list of fonts
        this.fontMap = new Map;

        // Group name
        this.group = '';
        
        // Load helpers
        this.loadCompleteCallback = null;
        this.loadCounter = 0;
    }
    
    //
    //  DESC: Load the fonts from xml node
    //
    load( node, callback )
    {
        if( node )
        {
            this.loadCompleteCallback = callback;

            // Get the group the textures will be saves as
            let listGroupNode = node.getElementsByTagName('listGroup');
            this.group = listGroupNode[0].getAttribute( 'name' );

            // Get the list of font info
            let fontNode = node.getElementsByTagName('font');

            for( let i = 0; i < fontNode.length; ++i )
            {
                // Get the name of the font
                let name = fontNode[i].getAttribute( 'name' );

                // Sanity check to make sure the font has not already been added in
                if( this.fontMap.has( name ) )
                {
                    throw new Error( `Font name has already been loaded (${name}).` );
                    return;
                }

                // Add the font to our list
                this.fontMap.set( name, new __WEBPACK_IMPORTED_MODULE_0__2d_font__["a" /* Font */] );
                
                // Use a counter to determine when the load is done because there's
                // no garentee they will finish in the order executed.
                // Always do this before the load
                ++this.loadCounter;

                // Load the character info from file
                this.downloadFontFiles( name, fontNode[i].getAttribute( 'file' ) );
            }
        }
    }
    
    //
    //  DESC: Download the XML and texture via file path
    //
    downloadFontFiles( name, filePath )
    {
        // Create the vertex shader
        __WEBPACK_IMPORTED_MODULE_1__utilities_genfunc__["b" /* downloadFile */]( 'img', filePath + '.png',
            ( image ) =>
            {
                // Load the image as a texture in the texture manager
                __WEBPACK_IMPORTED_MODULE_2__managers_texturemanager__["a" /* textureManager */].load( this.group, name, image );
                
                __WEBPACK_IMPORTED_MODULE_1__utilities_genfunc__["b" /* downloadFile */]( 'xml', filePath + '.fnt',
                    ( xmlNode ) =>
                    {
                        // Load the font
                        this.loadFont( name, xmlNode );

                        // Always do this after the load
                        --this.loadCounter;
                        
                        if( this.loadCounter === 0 )
                        {
                            this.loadCompleteCallback();
                        }
                    });
            });
    }
    
    //
    //  DESC: Load the font
    //
    loadFont( name, xmlNode )
    {
        let font = this.fontMap.get( name );
        if( font === undefined )
            throw new Error( `Font name has not been added to the map (${name}).` );
        
        font.loadFromNode( this.group, name, xmlNode );
    }
    
    //
    //  DESC: Get the font
    //
    getFont( name )
    {
        let font = this.fontMap.get( name );
        if( font === undefined )
            throw new Error( `Font name can't be found (${name}).` );

        return font;
    }
    
    // 
    //  DESC: allow event handling access function
    //
    get groupName() { return this.group; }
}

var fontManager = new FontManager;


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return spriteSheetManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_spritesheet__ = __webpack_require__(45);

//
//  FILE NAME: spritesheetmanager.js
//  DESC:      Temporary container for loading sprite sheet data
//             so that the same large complex xml is not reloaded.
//




class SpriteSheetManager
{
    constructor()
    {
        this.spriteSheetMap = new Map;
    }
    
    //
    //  DESC: Load the glyph data from XML node
    //
    loadFromNode( filePath, node )
    {
        let spriteSheet = this.spriteSheetMap.get( filePath );
        if( spriteSheet === undefined )
        {
            spriteSheet = new __WEBPACK_IMPORTED_MODULE_0__common_spritesheet__["a" /* SpriteSheet */];
            
            // Load the glyph data from XML node
            spriteSheet.loadFromNode( node );
            
            // Add a new entry to the map
            this.spriteSheetMap.set( filePath, spriteSheet );
        }
    }
    
    //
    //  DESC: Load the glyph data from XML node
    //
    getSpriteSheet( filePath )
    {
        let spriteSheet = this.spriteSheetMap.get( filePath );
        if( spriteSheet === undefined )
            throw new Error( 'Sprite sheet mesh file missing (' + filePath + ')!' );

        return spriteSheet;
    }
    
    //
    //  DESC: Clear all the sprite sheet data
    //
    clear()
    {
        this.spriteSheetMap.clear();
    }
}

var spriteSheetManager = new SpriteSheetManager;


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_spritesheetglyph__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_rect__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_xmlparsehelper__ = __webpack_require__(7);

// 
//  FILE NAME:  spritesheet.js
//  DESC:       Class for holding sprite sheet data
//







class SpriteSheet
{
    constructor( defaultIndex = 0, glyphCount = 0, columns = 0 )
    {
        // Sprite Sheet default index
        this.defaultIndex = defaultIndex;

        // Sprite Sheet element count
        this.glyphCount = glyphCount;

        // Sprite Sheet columns
        this.columns = columns;
        
        // An array of all the glyphs built manually that are of the same size
        this.glyphAry = null;

        // A map of all the glyphs
        this.glyphMap = null;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.defaultIndex = obj.defaultIndex;
        this.glyphCount = obj.glyphCount;
        this.columns = obj.columns;
        
        if( obj.glyphAry )
        {
            if( this.glyphAry === null )
                this.glyphAry = [];
            
            for( let i = 0; i < obj.glyphAry.length; ++i )
            {
                let glyph = obj.glyphAry[i];
                let size = new __WEBPACK_IMPORTED_MODULE_1__common_size__["a" /* Size */]( glyph.size.w, glyph.size.h );
                let rect = new __WEBPACK_IMPORTED_MODULE_2__common_rect__["a" /* Rect */]( glyph.uv.x1, glyph.uv.y1, glyph.uv.x2, glyph.uv.y2 );
                let cropOffset = null;
                if( glyph.cropOffset )
                    cropOffset = new __WEBPACK_IMPORTED_MODULE_1__common_size__["a" /* Size */]( glyph.cropOffset.w, glyph.cropOffset.h );
                
                this.glyphAry.push( new __WEBPACK_IMPORTED_MODULE_0__common_spritesheetglyph__["a" /* SpriteSheetGlyph */]( size, rect, cropOffset ) );
            }
        }
    }
    
    // 
    //  DESC: Build the simple (grid) sprite sheet data
    //
    build( sheetSize )
    {
        if( (this.glyphCount != 0) && (this.columns != 0) )
        {
            this.glyphAry = [];
            
            let rows = Math.trunc(this.glyphCount / this.columns);

            if( (this.glyphCount % this.columns) > 0 )
                ++rows;

            // Calculate the size of the individual glyph. They are all the same size
            let size = new __WEBPACK_IMPORTED_MODULE_1__common_size__["a" /* Size */]( sheetSize.w / this.columns, sheetSize.h / rows );

            for( let i = 0; i < rows; ++i )
            {
                for( let j = 0; j < this.columns; ++j )
                {
                    let rect = new __WEBPACK_IMPORTED_MODULE_2__common_rect__["a" /* Rect */](
                        (j * size.w) / sheetSize.w,
                        (i * size.h) / sheetSize.h,
                        size.w / sheetSize.w,
                        size.h / sheetSize.h );
                    
                    this.glyphAry.push( new __WEBPACK_IMPORTED_MODULE_0__common_spritesheetglyph__["a" /* SpriteSheetGlyph */]( size, rect ) );

                    // Break out after all the gylphs have been defined
                    if( this.glyphAry.length === this.glyphCount )
                        break;
                }
            }
        }
    }
    
    // 
    //  DESC: Load the glyph data from XML node
    //
    loadFromNode( node )
    {
        this.glyphMap = new Map;
        
        let sheetSize = new __WEBPACK_IMPORTED_MODULE_1__common_size__["a" /* Size */];
        let attr = node.getAttribute('width');
        if( attr )
            sheetSize.w = Number(attr);

        attr = node.getAttribute('height');
        if( attr )
            sheetSize.h = Number(attr);

        let rectNode = node.getElementsByTagName('rect');
        if( rectNode.length )
        {
            for( let i = 0; i < rectNode.length; ++i )
            {
                let rect = __WEBPACK_IMPORTED_MODULE_3__utilities_xmlparsehelper__["g" /* loadRectFromChild */]( rectNode[i] );

                let size = new __WEBPACK_IMPORTED_MODULE_1__common_size__["a" /* Size */]( rect.x2, rect.y2 );

                let uv = new __WEBPACK_IMPORTED_MODULE_2__common_rect__["a" /* Rect */](
                    rect.x1 / sheetSize.w,
                    rect.y1 / sheetSize.h,
                    rect.x2 / sheetSize.w,
                    rect.y2 / sheetSize.h );

                let cropOffset = new __WEBPACK_IMPORTED_MODULE_1__common_size__["a" /* Size */](
                    Number(rectNode[i].getAttribute( 'cx' )),
                    Number(rectNode[i].getAttribute( 'cy' )) );

                // Add to the map
                let strId = rectNode[i].getAttribute( 'name' );
                this.glyphMap.set( strId, new __WEBPACK_IMPORTED_MODULE_0__common_spritesheetglyph__["a" /* SpriteSheetGlyph */]( size, uv, cropOffset) );
            }
        }
    }
    
    // 
    //  DESC: Load the glyph data from XML node
    //
    getGlyph( index = -1 )
    {
        if( index > -1 )
            return this.glyphAry[ index ];

        else
            return this.glyphAry[ this.defaultIndex ];
    }
    
    
    // 
    //  DESC: Find the glyph by Id
    //
    findGlyph( glyphId )
    {
        let glyph = this.glyphMap.get( glyphId );
        if( glyph === undefined )
        {
            throw new Error( 'Glyph name is missing (' + glyphId + ')!' );
        }
        
        return glyph;
    }
    
    
    // 
    //  DESC: Set the gylph data
    //
    setGlyph( spriteSheet, glyphId )
    {
        let glyph = this.glyphMap.get( glyphId );
        if( glyph !== undefined )
        {
            if( spriteSheet.glyphAry === null )
                spriteSheet.glyphAry = [];
            
            spriteSheet.glyphAry.push( glyph );
        }
        else
        {
            throw new Error( 'Glyph name is missing (' + glyphId + ')!' );
        }
    }
    
    // 
    //  DESC: Get the number of gylphs in this sprite sheet
    //
    getCount()
    {
        if( (this.glyphAry !== null) && (this.glyphAry.length) )
            return this.glyphAry.length;
        
        else if( (this.glyphMap !== null) && (this.glyphMap.length) )
            return this.glyphMap.length;

        return this.glyphCount;
    }
    
    // 
    //  DESC: Copy over the gylph data
    //
    copyTo( spriteSheet, strIdAry )
    {
        if( strIdAry.length === 0 )
        {
            spriteSheet.glyphAry = this.glyphAry;
        }
        else if( this.glyphMap.size )
        {
            // Init the sprite sheet class when each glyph is defined in the object data
            if( spriteSheet.glyphCount === 0 )
            {
                for( let i = 0; i < strIdAry.length; ++i )
                    this.setGlyph( spriteSheet, strIdAry[i] );
            }
            // Init the sprite sheet class with an animation that is one glyph defined with a format code
            else
            {
                // Should only be one entry
                if( strIdAry.length === 1 )
                {
                    for( let i = 0; i < spriteSheet.glyphCount; ++i )
                        this.setGlyph( spriteSheet, strIdAry[0] + i );
                }
                else
                {
                    throw new Error( 'Sprite Sheet Incorrect configuration!' );
                }
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpriteSheet;



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return symbolSetViewManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__symbolsetview__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_assetholder__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__managers_managerbase__ = __webpack_require__(21);

//
//  FILE NAME: symbolsetviewmanager.js
//  DESC:      Singleton for managing different symbol view sets
//







class SymbolSetViewManager extends __WEBPACK_IMPORTED_MODULE_2__managers_managerbase__["a" /* ManagerBase */]
{
    constructor()
    {
        super();
        
        // Map in a map of all the symbol sets
        this.symbolSetViewDataMap = new Map;
    }
    
    //
    //  DESC: Get the symbol set view data
    //
    getViewData( group, name )
    {
        // Get the group map
        let groupMap = this.symbolSetViewDataMap.get( group );
        if( groupMap !== undefined )
        {
            let objData = groupMap.get( name );
            if( objData )
                return objData;
            else
                throw new Error( `Symbol set name can't be found (${group}, ${name})!` );
        }
        else
            throw new Error( `Symbol set group can't be found (${group}, ${name})!` );
        
        return null;
    }
    
    //
    //  DESC: Load all XML's associated with this group
    //
    loadGroup( groupAry, finishCallback )
    {
        super.loadGroup( 'Symbol set view data', this.symbolSetViewDataMap, groupAry, finishCallback );
    }
    
    //
    //  DESC: Load all slot math data from an xml node
    //
    loadFromNode( group, node, filePath, finishCallback )
    {
        // Get the group map
        let groupMap = this.symbolSetViewDataMap.get( group );
        
        // Get the node to the symbol set list
        let symbSetNode = node.children;
        
        for( let i = 0; i < symbSetNode.length; ++i )
        {
            // Get the symbols set name
            let name = symbSetNode[i].getAttribute( "name" );
            
            // Check for duplicate names
            if( groupMap.has( name ) )
                throw new Error( `Duplicate symbol set (${name}, ${group}, ${filePath})!` );
            
            // Allocate
            let symbSetViewData = new __WEBPACK_IMPORTED_MODULE_0__symbolsetview__["a" /* SymbolSetView */];
            groupMap.set( name, symbSetViewData );
            
            // Load in the symbol set data
            symbSetViewData.loadFromNode( symbSetNode[i], group, name );
        }
    }
    
    //
    //  DESC: Free a symbol group
    //
    freeGroup( groupAry )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for exists
            if( this.listTableMap.get( group ) === undefined )
                throw new Error( `Object data list group name can't be found (${group})!` );

            // Get the group map
            let symbolSetView = this.symbolSetViewDataMap.get( group );
            if( symbolSetView )
            {
                symbolSetView.cleanUp();
                this.symbolSetViewDataMap.delete( group );
            }
        }
    }
    
    //
    //  DESC: Clear all data
    //
    clear()
    {
        for( let [ symbolSetViewKey, symbolSetViewMap ] of this.symbolSetViewDataMap.entries() )
            for( let [ key, symbol2D ] of symbolSetViewMap.entries() )
                symbol2D.cleanUp();
        
        this.symbolSetViewDataMap.clear();
    }
}

var symbolSetViewManager = new SymbolSetViewManager;


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_bitmask__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_xmlparsehelper__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME:  object.js
//  DESC:       object class
//








class Object
{
    constructor()
    {
        // Bitmask settings to record if the object needs to be transformed
        this.parameters = new __WEBPACK_IMPORTED_MODULE_2__utilities_bitmask__["a" /* BitMask */](__WEBPACK_IMPORTED_MODULE_4__common_defs__["_67" /* VISIBLE */]);
    
        // Local position
        this.pos = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* Point */];

        // Local Rotation in radians
        this.rot = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* Point */];

        // Local scale
        this.scale = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* Point */]( 1, 1, 1 );

        // The center point. Point of rotation
        // This is used for defining a different center point
        this.centerPos = new __WEBPACK_IMPORTED_MODULE_0__point__["a" /* Point */];

        // Offset due to a sprite sheet crop.
        this.cropOffset = new __WEBPACK_IMPORTED_MODULE_1__size__["a" /* Size */];
    }

    //
    //  DESC: Set the object's position
    //
    setPos( pos )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_66" /* TRANSLATE */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

        this.pos.set( pos );
    }
    
    setPosXYZ( x = 0, y = 0, z = 0 )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_66" /* TRANSLATE */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

        this.pos.setXYZ( x, y, z );
    }
    
    incPos( pos )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_66" /* TRANSLATE */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

        this.pos.inc( pos );
    }
    
    incPosXYZ( x = 0, y = 0, z = 0 )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_66" /* TRANSLATE */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

        this.pos.incXYZ( x, y, z );
    }
    
    //
    //  DESC: Set the pre-translation matrix
    //
    setRot( rot, convertToRadians = true )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_60" /* ROTATE */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );
        
        if( convertToRadians )
            this.rot.setXYZ( rot.x * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */], rot.y * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */], rot.z * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */] );
        else
            this.rot.set( rot );
    }
    
    setRotXYZ( x = 0, y = 0, z = 0, convertToRadians = true )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_60" /* ROTATE */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

        if( convertToRadians )
            this.rot.setXYZ( x * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */], y * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */], z * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */] );
        else
            this.rot.setXYZ( x, y, z );
    }
    
    incRot( rot, convertToRadians = true )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_60" /* ROTATE */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

        if( convertToRadians )
            this.rot.incXYZ( rot.x * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */], rot.y * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */], rot.z * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */] );
        else
            this.rot.inc( rot );
        
        this.rot.cap( 360 * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */] );
    }
    
    incRotXYZ( x = 0, y = 0, z = 0, convertToRadians = true )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_60" /* ROTATE */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

        if( convertToRadians )
            this.rot.incXYZ( x * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */], y * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */], z * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */] );
        else
            this.rot.incXYZ( x, y, z );
        
        this.rot.cap( 360 * __WEBPACK_IMPORTED_MODULE_4__common_defs__["g" /* DEG_TO_RAD */] );
    }
    
    //
    //  DESC: Set the pre-translation matrix
    //
    setScale( scale )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_61" /* SCALE */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

        this.scale.set( scale );
    }
    
    setScaleXYZ( x = 1, y = 1, z = 1 )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_61" /* SCALE */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

        this.scale.setXYZ( x, y, z );
    }
    
    incScale( scale )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_61" /* SCALE */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

        this.scale.inc( scale );
    }
    
    incScaleXYZ( x = 1, y = 1, z = 1 )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_61" /* SCALE */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

        this.scale.incXYZ( x, y, z );
    }
    
    //
    //  DESC: Set the object's center position
    //
    setCenterPos( pos )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["c" /* CENTER_POINT */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

        this.centerPos = pos;
    }
    
    setCenterPosXYZ( x = 0, y = 0, z = 0 )
    {
        this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["c" /* CENTER_POINT */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

        this.centerPos.setXYZ( x, y, z );
    }

    //
    //  DESC: Set the object's crop offset
    //
    setCropOffset( offset )
    {
        if( !this.centerPos.isEmpty() || ((offset !== null) && (!offset.isEmpty())) )
        {
            this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["f" /* CROP_OFFSET */] | __WEBPACK_IMPORTED_MODULE_4__common_defs__["_65" /* TRANSFORM */] );

            this.cropOffset = offset;
        }
    }

    //
    //  DESC: Set the object visible
    //
    setVisible( value )
    {
        if( value )
            this.parameters.add( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_67" /* VISIBLE */] );
        else
            this.parameters.remove( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_67" /* VISIBLE */] );
    }

    //
    //  DESC: Is the object visible
    //
    isVisible()
    {
        return this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_67" /* VISIBLE */] );
    }
    
    //
    //  DESC: Copy the transform to the passed in object
    //
    copyTransform( object )
    {
        if( object.parameters.isSet( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_66" /* TRANSLATE */] ) )
            this.setPos( object.pos );

        if( object.parameters.isSet( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_60" /* ROTATE */] ) )
            this.setRot( object.rot );

        if( object.parameters.isSet( __WEBPACK_IMPORTED_MODULE_4__common_defs__["_61" /* SCALE */] ) )
            this.setScale( object.scale );

        if( object.parameters.isSet( __WEBPACK_IMPORTED_MODULE_4__common_defs__["c" /* CENTER_POINT */] ) )
            this.setCenterPos( object.centerPos );

        if( object.parameters.isSet( __WEBPACK_IMPORTED_MODULE_4__common_defs__["f" /* CROP_OFFSET */] ) )
            this.setCropOffset( object.cropOffset );
    }
    
    //
    //  DESC: Load the transform data from node
    //
    loadTransFromNode( node )
    {
        let pos = __WEBPACK_IMPORTED_MODULE_3__utilities_xmlparsehelper__["e" /* loadPosition */]( node );
        if( pos )
            this.setPos( pos );

        let rot = __WEBPACK_IMPORTED_MODULE_3__utilities_xmlparsehelper__["h" /* loadRotation */]( node );
        if( rot )
            this.setRot( rot );

        let scale = __WEBPACK_IMPORTED_MODULE_3__utilities_xmlparsehelper__["i" /* loadScale */]( node );
        if( scale )
            this.setScale( scale );

        let centerPos = __WEBPACK_IMPORTED_MODULE_3__utilities_xmlparsehelper__["a" /* loadCenterPos */]( node );
        if( centerPos )
            this.setCenterPos( centerPos );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Object;



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fontproperties__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__size__ = __webpack_require__(1);

// 
//  FILE NAME:  fontdata.js
//  DESC:       font data class
//





class FontData
{
    constructor()
    {
        // Displayed font string
        this.fontString = '';

        // Font members
        this.fontProp = new __WEBPACK_IMPORTED_MODULE_0__fontproperties__["a" /* FontProperties */];

        // Font string size
        // Not usefull for multiline strings
        this.fontStrSize = new __WEBPACK_IMPORTED_MODULE_1__size__["a" /* Size */];
    }
    
    // 
    //  Copy the data
    //
    copy( obj )
    {
        this.fontString = obj.fontString;
        this.fontProp.copy( obj.fontProp );
        this.fontStrSize.copy( obj.fontStrSize );
    }
    
    //
    //  DESC: Load the font properties from XML node
    //
    loadFromNode( node )
    {
        let fontNode = node.getElementsByTagName( 'font' );
        if( fontNode.length )
        {
            // See if a font string has been defined
            let attr = fontNode[0].getAttribute( 'fontString' );
            if( attr )
                this.fontString = attr;

            this.fontProp.loadFromNode( fontNode[0] );
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FontData;



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: valuetable.js
//  DESC:      Class for holding the value table
//



class ValueTable
{
    constructor( valueAry )
    {
        // value array
        this.valueAry = valueAry;
    }
    
    // 
    //  DESC: Get the value from the value table
    //
    getValue( index )
    {
        return this.valueAry[index];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ValueTable;



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_defs__ = __webpack_require__(0);
// 
//  FILE NAME: scrollparam.js
//  DESC:      Class for handling scroll parameter data
//




class ScrollParam
{
    constructor()
    {
        // Array that holds the scroll messages allows by this menu or control
        this.scrollTypesMap = null;

        // The delay of the first scroll message
        this.startDelay = -1;

        // The delay of the rest of the scroll messages
        this.scrollDelay = -1;

        // The scroll message to send from the timer
        this.msg = -1;
    }
    
    // 
    //  DESC: Load the scroll data from node
    //
    loadFromNode( node )
    {
        if( node.length )
        {
            this.scrollTypesMap = new Map;
            
            this.startDelay = Number(node[0].getAttribute( 'startDelay' ));
            this.scrollDelay = Number(node[0].getAttribute( 'scrollDelay' ));
            
            if( node[0].getAttribute( 'up' ) === 'true' )
                this.scrollTypesMap.set( __WEBPACK_IMPORTED_MODULE_0__common_defs__["_17" /* EGE_MENU_UP_ACTION */], __WEBPACK_IMPORTED_MODULE_0__common_defs__["_6" /* EGE_MENU_SCROLL_UP */] );

            if( node[0].getAttribute( 'down' ) === 'true' )
                this.scrollTypesMap.set( __WEBPACK_IMPORTED_MODULE_0__common_defs__["X" /* EGE_MENU_DOWN_ACTION */], __WEBPACK_IMPORTED_MODULE_0__common_defs__["_3" /* EGE_MENU_SCROLL_DOWN */] );

            if( node[0].getAttribute( 'left' ) === 'true' )
                this.scrollTypesMap.set( __WEBPACK_IMPORTED_MODULE_0__common_defs__["_0" /* EGE_MENU_LEFT_ACTION */], __WEBPACK_IMPORTED_MODULE_0__common_defs__["_4" /* EGE_MENU_SCROLL_LEFT */] );

            if( node[0].getAttribute( 'right' ) === 'true' )
                this.scrollTypesMap.set( __WEBPACK_IMPORTED_MODULE_0__common_defs__["_2" /* EGE_MENU_RIGHT_ACTION */], __WEBPACK_IMPORTED_MODULE_0__common_defs__["_5" /* EGE_MENU_SCROLL_RIGHT */] );
        }
    }
    
    // 
    //  DESC: Does this menu or control support scrolling this message?
    //
    canScroll( msg )
    {
        if( this.scrollTypesMap )
        {
            this.msg = -1;

            let result = this.scrollTypesMap.get( msg );

            if( result )
            {
                this.msg = result;
                return true;
            }
        }

        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ScrollParam;


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uicontrol__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: uicontrolnavnode.js
//  DESC:      UI Control Navigation Node
//





class UIControlNavNode
{
    constructor( uiControl = null )
    {
        // UI Control pointer
        this.uiControl = uiControl;

        // Navigation node pointers
        this.upNode = null;
        this.downNode = null;
        this.leftNode = null;
        this.rightNode = null;
    }
    
    // 
    //  DESC: Set/Get Right Node
    //
    setNode( navId, node )
    {
        if( navId === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_41" /* ENAV_NODE_UP */] )
            this.upNode = node;
        else if( navId === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_38" /* ENAV_NODE_DOWN */] )
            this.downNode = node;
        else if( navId === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_39" /* ENAV_NODE_LEFT */] )
            this.leftNode = node;
        else if( navId === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_40" /* ENAV_NODE_RIGHT */] )
            this.rightNode = node;
    }

    getNode( navNode )
    {
        if( navNode === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_41" /* ENAV_NODE_UP */] )
            return this.upNode;
        else if( navNode === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_38" /* ENAV_NODE_DOWN */] )
            return this.downNode;
        else if( navNode === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_39" /* ENAV_NODE_LEFT */] )
            return this.leftNode;
        else if( navNode === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_40" /* ENAV_NODE_RIGHT */] )
            return this.rightNode;

        return null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UIControlNavNode;



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uicontrol__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__2d_sprite2d__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__objectdatamanager_objectdatamanager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__system_device__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: uiprogressbar.js
//  DESC:      Class for user interface progress bar
//










class UIProgressBar extends __WEBPACK_IMPORTED_MODULE_0__uicontrol__["a" /* UIControl */]
{
    constructor( group )
    {
        super( group );
        
        this.type = __WEBPACK_IMPORTED_MODULE_6__common_defs__["L" /* ECT_PROGRESS_BAR */];
        
        // stencil mask sprite
        this.stencilMaskSprite;

        // current value of progress bar
        this.curValue = 0;

        // Minimum value
        this.minValue = 0;

        // Max value of progress bar
        this.maxValue = 0;

        // Sprite index to apply stencil mask to
        this.spriteApplyIndex = -1;

        // Orentation
        this.orentation = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_42" /* EO_HORIZONTAL */];
        
        // alignment of this progress bar
        this.alignment = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_25" /* EHA_HORZ_LEFT */];

        // progress bar size
        this.progressBarSize = new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */];

        // progress bar pos
        this.progressBarPos = new __WEBPACK_IMPORTED_MODULE_3__common_point__["a" /* Point */];
        
        // progress bar scale
        this.progressBarScale = new __WEBPACK_IMPORTED_MODULE_3__common_point__["a" /* Point */];
    }
    
    //
    //  DESC: Load the control info from XML node
    //
    loadFromNode( node )
    {
        super.loadFromNode( node );

        // See if a range of values was specified
        let rangeNode = node.getElementsByTagName( 'range' );
        if( rangeNode.length )
        {
            let attr = rangeNode[0].getAttribute( 'cur' );
            if( attr )
                this.curValue = Number( attr );

            attr = rangeNode[0].getAttribute( 'min' );
            if( attr )
                this.minValue = Number( attr );

            attr = rangeNode[0].getAttribute( 'max' );
            if( attr )
                this.maxValue = Number( attr );
        }

        let orentNode = node.getElementsByTagName( "orentation" );
        if( orentNode.length )
        {
            let attr = orentNode[0].getAttribute("type");
            if( attr === 'vert' )
                this.orentation = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_43" /* EO_VERTICAL */];

            attr = orentNode[0].getAttribute("alignment");
            if( attr )
            {
                if( this.orentation === __WEBPACK_IMPORTED_MODULE_6__common_defs__["_42" /* EO_HORIZONTAL */] )
                {
                    if( attr === 'right' )
                        this.alignment = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_26" /* EHA_HORZ_RIGHT */];

                    else if( attr === 'center' )
                        this.alignment = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_24" /* EHA_HORZ_CENTER */];
                }
                else
                {
                    if( attr === 'bottom' )
                        this.alignment = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_52" /* EVA_VERT_BOTTOM */];

                    else if( attr === 'center' )
                        this.alignment = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_53" /* EVA_VERT_CENTER */];
                }
            }
        }

        // Calculate the progress bar size and position
        this.setSizePos();
    }

    //
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( controlNode )
    {
        super.loadControlFromNode( controlNode );

        // Get the stencil mask node
        let stencilMaskNode = controlNode.getElementsByTagName( "stencilMask" );
        if( stencilMaskNode.length )
        {
            let objectName = stencilMaskNode[0].getAttribute( "objectName" );

            this.spriteApplyIndex = Number(stencilMaskNode[0].getAttribute( "spriteIndex" ));

            if( objectName && objectName.length )
            {
                this.stencilMaskSprite = new __WEBPACK_IMPORTED_MODULE_1__2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_4__objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( this.group, objectName ) );

                // Load the transform data
                this.stencilMaskSprite.loadTransFromNode( stencilMaskNode[0] );

                // Get the size
                this.progressBarSize.copy( this.stencilMaskSprite.objData.size );

                // Get the initial position
                this.progressBarPos.copy( this.stencilMaskSprite.pos );
                
                // Get the initial scale
                this.progressBarScale.copy( this.stencilMaskSprite.scale );
            }
            else
            {
                // Get the size
                this.progressBarSize.copy( this.spriteAry[this.spriteApplyIndex].objData.size );

                // Get the initial position
                this.progressBarPos.copy( this.spriteAry[this.spriteApplyIndex].pos );
                
                // Get the initial scale
                this.progressBarScale.copy( this.spriteAry[this.spriteApplyIndex].scale );
            }
        }
    }
    
    // 
    //  DESC: Init the progress bar
    //  NOTE: Used to init this control manually
    //
    initProgressBar( max = 0, cur = 0, min = 0, orentation = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_42" /* EO_HORIZONTAL */], alignment = __WEBPACK_IMPORTED_MODULE_6__common_defs__["_25" /* EHA_HORZ_LEFT */] )
    {
        this.maxValue = max;
        this.curValue = cur;
        this.minValue = min;
        this.orentation = orentation;
        this.alignment = alignment;
        
        this.setSizePos();
    }
    
    // 
    //  DESC: Load a sprite from an array
    //  NOTE: Used to init this control manually
    //
    loadSpriteFromArray( objectNameAry, spriteApplyIndex, stencilMaskSprite = null )
    {
        super.loadSpriteFromArray( objectNameAry );
        
        this.spriteApplyIndex = spriteApplyIndex;
        
        if( stencilMaskSprite )
        {
            this.stencilMaskSprite = new __WEBPACK_IMPORTED_MODULE_1__2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_4__objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( this.group, stencilMaskSprite ) );
            
            // Get the size
            this.progressBarSize.copy( this.stencilMaskSprite.objData.size );

            // Get the initial position
            this.progressBarPos.copy( this.stencilMaskSprite.pos );

            // Get the initial scale
            this.progressBarScale.copy( this.stencilMaskSprite.scale );
        }
        else
        {
            // Get the size
            this.progressBarSize.copy( this.spriteAry[this.spriteApplyIndex].objData.size );

            // Get the initial position
            this.progressBarPos.copy( this.spriteAry[this.spriteApplyIndex].pos );

            // Get the initial scale
            this.progressBarScale.copy( this.spriteAry[this.spriteApplyIndex].scale );
        }
    }
    
    // 
    //  DESC: Inc the current value
    //
    incCurrentValue( cur )
    {
        this.curValue = cur;
        
        this.setSizePos();
    }

    //
    //  DESC: Transform the control
    //
    doTransform( object )
    {
        super.doTransform( object );

        if( this.stencilMaskSprite )
            this.stencilMaskSprite.transform( this.matrix, this.wasWorldPosTranformed() );
    }
    
    // 
    //  DESC: Transform the collision
    //  NOTE: This object has no collision
    //
    transformCollision()
    {
    }

    //
    //  DESC: do the render
    //
    render( matrix )
    { 
        if( this.stencilMaskSprite )
        {
            for( let i  = 0; i < this.spriteAry.length; ++i )
            {
                if( i === this.spriteApplyIndex )
                {
                    // Disable rendering to the color buffer
                    // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
                    __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].colorMask( false, false, false, false );

                    // Disable rendering to the depth mask
                    __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].depthMask( false );

                    // Start using the stencil
                    __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].enable( __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].STENCIL_TEST );

                    __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].stencilFunc( __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].ALWAYS, 0x1, 0x1 );
                    __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].stencilOp( __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].REPLACE, __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].REPLACE, __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].REPLACE );
        

                    this.stencilMaskSprite.render( matrix );
                    
                    
                    // Re-enable color
                    // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
                    __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].colorMask( true, true, true, true );

                    // Where a 1 was not rendered
                    __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].stencilFunc( __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].EQUAL, 0x1, 0x1 );

                    // Keep the pixel
                    __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].stencilOp( __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].KEEP, __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].KEEP, __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].KEEP );

                    // Enable rendering to the depth mask
                    __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].depthMask( true );


                    this.spriteAry[i].render( matrix );


                    // Finished using stencil
                    __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].disable( __WEBPACK_IMPORTED_MODULE_5__system_device__["b" /* gl */].STENCIL_TEST );
                }
                else
                    this.spriteAry[i].render( matrix );
            }
        }
        else
        {
            super.render( matrix );
        }
    }

    //
    //  DESC: Calculate the progress bar size and position
    //
    setSizePos()
    {
        let scaleX = this.progressBarScale.x;
        let scaleY = this.progressBarScale.y;
        let posX = this.progressBarPos.x;
        let posY = this.progressBarPos.y;

        // Calculate the new scale for the progress bar
        let scaler = (this.curValue - this.minValue) / (this.maxValue - this.minValue);

        if( this.orentation == __WEBPACK_IMPORTED_MODULE_6__common_defs__["_42" /* EO_HORIZONTAL */] )
        {
            scaleX = this.progressBarScale.x * scaler;
            
            let offset = this.progressBarSize.w * scaler;

            if( this.alignment == __WEBPACK_IMPORTED_MODULE_6__common_defs__["_25" /* EHA_HORZ_LEFT */] )
                posX -= (this.progressBarSize.w - offset) / 2;

            else if( m_alignment.horz == __WEBPACK_IMPORTED_MODULE_6__common_defs__["_26" /* EHA_HORZ_RIGHT */] )
                posX += (this.progressBarSize.w - offset) / 2;
        }
        else
        {
            scaleY = this.progressBarScale.y * scaler;
            
            let offset = this.progressBarSize.h * scaler;

            if( this.alignment === __WEBPACK_IMPORTED_MODULE_6__common_defs__["_54" /* EVA_VERT_TOP */] )
                posY += (this.progressBarSize.h - offset) / 2;

            else if( this.alignment === __WEBPACK_IMPORTED_MODULE_6__common_defs__["_52" /* EVA_VERT_BOTTOM */] )
                posY -= (this.progressBarSize.h - offset) / 2;
        }

        if( this.stencilMaskSprite )
        {
            this.stencilMaskSprite.setScaleXYZ( scaleX, scaleY, 1 );
            this.stencilMaskSprite.setPosXYZ( posX, posY );
        }
        else
        {
            this.spriteAry[this.spriteApplyIndex].setScaleXYZ( scaleX, scaleY, 1 );
            this.spriteAry[this.spriteApplyIndex].setPosXYZ( posX, posY, 0 );
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UIProgressBar;



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return soundManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__managers_managerbase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_sound__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_playlist__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_assetholder__ = __webpack_require__(9);

// 
//  FILE NAME: soundmanager.js
//  DESC:      Sound Manager class singleton
//








class SoundManager extends __WEBPACK_IMPORTED_MODULE_0__managers_managerbase__["a" /* ManagerBase */]
{
    constructor()
    {
        super();
        
        this.context = null;
        
        if( typeof AudioContext !== 'undefined' )
            this.context = new AudioContext();
        
        else if( typeof webkitAudioContext !== 'undefined' ) 
            this.context = new webkitAudioContext();
        
        else
            throw new Error('AudioContext not supported.');
        
        // Map containing a group of sound ID's
        this.soundMapMap = new Map;

        // Map containing a group of play list ID's
        // Do not free the sounds copied to the play list
        this.playListMapMap = new Map;
    }
    
    //
    //  DESC: Load all XML's associated with this group
    //
    loadGroup( groupAry, finishCallback )
    {
        super.loadGroup( 'Sound', this.soundMapMap, groupAry, finishCallback );
    }
    
    //
    //  DESC: Load sound data from an xml node
    //
    loadFromNode( group, node, filePath, finishCallback )
    {
        // Get the group map
        let groupMap = this.soundMapMap.get( group );
        
        // Get the node to the sound files to be loaded into a buffer
        let loadFilesNode = node.getElementsByTagName( 'load' );
        
        // Load the buffered sounds
        for( let i = 0; i < loadFilesNode.length; ++i )
        {
            let id = loadFilesNode[i].getAttribute( 'id' );
            let filePath = loadFilesNode[i].getAttribute( 'file' );
            
            // Check for duplicate names
            if( groupMap.has(id) )
                throw new Error( `Duplicate sound group id (${id}, ${group}, ${filePath})!` );
            
            let snd = new __WEBPACK_IMPORTED_MODULE_1__common_sound__["a" /* Sound */];
            groupMap.set( id, snd );
            
            // Load from node
            snd.loadFromNode( loadFilesNode[i] );
            
            // Check if this file has already been loaded
            if( !__WEBPACK_IMPORTED_MODULE_3__utilities_assetholder__["a" /* assetHolder */].has( group, filePath ) )
            {
                this.downloadFile( 'binary', group, filePath, finishCallback,
                    ( group, audioData, filePath, finishCallback ) => 
                    {
                        // Store the preloaded XML file
                        __WEBPACK_IMPORTED_MODULE_3__utilities_assetholder__["a" /* assetHolder */].set( group, filePath, audioData );

                        // Call the class function to load the data
                        this.loadFromBinaryData( group, id, audioData, filePath, finishCallback );
                    });
            }
            else
            {
                this.loadFromBinaryData( group, id, __WEBPACK_IMPORTED_MODULE_3__utilities_assetholder__["a" /* assetHolder */].get( group, filePath), filePath );
            }
        }
        
        // Get the node to the sound files
        let playListNode = node.getElementsByTagName( 'playList' );
        if( playListNode.length )
        {
            let groupMap = new Map;
            this.playListMapMap.set( group, groupMap );
            
            for( let i = 0; i < playListNode.length; ++i )
            {
                // Get the id
                let id = playListNode[i].getAttribute( 'id' );
                
                // Check for duplicate names
                if( groupMap.has(id) )
                    throw new Error( `Duplicate playlist group id (${id}, ${group}, ${filePath})!` );
                
                // Add the playlist data to the map
                let playLst = new __WEBPACK_IMPORTED_MODULE_2__common_playlist__["a" /* PlayList */];
                groupMap.set( id, playLst );
                
                // Load the playlist from node
                playLst.loadFromNode( playListNode[i], this.soundMapMap.get( group ), group, filePath );
            }
        }
    }
    
    //
    //  DESC: Load from binary data
    //
    loadFromBinaryData( group, id, audioData, filePath, finishCallback )
    {
        // Increment the load counter because the decoder is asynchronous
        ++this.loadCounter;
        
        // Get the group map
        let groupMap = this.soundMapMap.get( group );
        
        // Get the sound
        let sound = groupMap.get( id );
        
        // Create a sound buffer and decode
        this.context.decodeAudioData( audioData,
            (soundBuffer) =>
            {
                sound.init( this.context, soundBuffer );
                
                // Decrement the load counter
                --this.loadCounter;
                
                if( this.loadCounter === 0 )
                    finishCallback();
            },
            (error) => console.log(`Error decoding audio data (${error.err})!`) );
    }
    
    //
    //  DESC: Free a symbol group
    //
    freeGroup( groupAry )
    {
        for( let grp = 0; grp < groupAry.length; ++grp )
        {
            let group = groupAry[grp];
            
            // Make sure the group we are looking for exists
            if( this.listTableMap.get( group ) === undefined )
                throw new Error( `Sound group name can't be found (${group})!` );

            // Erase the group
            if( this.soundMapMap.has( group ) )
                this.soundMapMap.delete( group );
            
            if( this.playListMapMap.has( group ) )
                this.playListMapMap.delete( group );
        }
    }
    
    //
    //  DESC: Get the sound
    //
    getSound( group, soundID )
    {
        // Check if this is a playlist sound ID
        let playLst = this.getPlayList( group, soundID );
        if( playLst )
        {
            return playLst.getSound();
        }

        let groupMap = this.soundMapMap.get( group );
        if( !groupMap )
            throw new Error( `Sound group name can't be found (${group})!` );

        let snd = groupMap.get( soundID );
        if( !snd )
            throw new Error( `Sound ID can't be found (${group}, ${soundID})!` );

        return snd;
    }

    //
    //  DESC: Get the playlist
    //
    getPlayList( group, playLstID )
    {
        // Check if this is a playlist sound ID
        let groupMap = this.playListMapMap.get( group );
        if( groupMap )
        {
            return groupMap.get( playLstID );
        }
        
        return undefined;
    }
    
    //
    //  DESC: Play a sound
    //
    play( group, soundID, loop = false )
    {
        this.getSound( group, soundID ).play( loop );
    }

    //
    //  DESC: Pause a sound
    //
    pause( group, soundID )
    {
        this.getSound( group, soundID ).pause();
    }

    //
    //  DESC: Resume a sound
    //
    resume( group, soundID )
    {
        this.getSound( group, soundID ).resume();
    }

    //
    //  DESC: Resume a sound
    //
    stop( group, soundID )
    {
        this.getSound( group, soundID ).stop();
    }
    
    //
    //  DESC: Set/Get the volume for music or channel
    //
    setVolume( group, soundID, volume )
    {
        this.getSound( group, soundID ).setVolume( volume );
    }

    getVolume( group, soundID )
    {
        return this.getSound( group, soundID ).getVolume();
    }

    //
    //  DESC: Is music or channel playing?
    //
    isPlaying( group, soundID )
    {
        return this.getSound( group, soundID ).isPlaying();
    }

    //
    //  DESC: Is music or channel paused?
    //
    isPaused( group, soundID )
    {
        return this.getSound( group, soundID ).isPaused();
    }
}

var soundManager = new SoundManager;


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_system_device__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gamestate__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__library_common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: commonstate.js
//  DESC:      CommonState Class State
//








class CommonState extends __WEBPACK_IMPORTED_MODULE_2__gamestate__["e" /* GameState */]
{
    constructor( gameState, nextState, callBack )
    {
        super( gameState, nextState, callBack );
    }
    
    // 
    //  DESC: handle events
    //
    handleEvent( event )
    {
        // Have the menu manager handle events
        __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].handleEvent( event );

        if( event instanceof CustomEvent )
        {
            // Check for the "game change state" message
            if( event.detail.type === __WEBPACK_IMPORTED_MODULE_3__library_common_defs__["Z" /* EGE_MENU_GAME_STATE_CHANGE */] )
            {
                if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_3__library_common_defs__["_50" /* ETC_BEGIN */] )
                {
                    // Block all message processing in the menu manager
                    __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].allowEventHandling = false;

                    // Set the message to load and unload the states
                    this.stateMessage.setMsg( this.getLoadState(event.detail.arg[1]), this.gameState );
                }
                else if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_3__library_common_defs__["_51" /* ETC_END */] )
                {
                    // Clear out all the trees
                    __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].clearActiveTrees();

                    // Set the flag to change the state
                    this.stateChange = true;
                }
            }
        }
    }
    
    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        // Update the menus
        __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].update();
    }

    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        // Transform the menus
        __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].transform();
    }

    // 
    //  DESC: 2D/3D Render of game content
    //
    preRender()
    {
        __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].renderInterface( __WEBPACK_IMPORTED_MODULE_1__library_system_device__["a" /* device */].orthographicMatrix );
    }

    // 
    //  DESC: 2D/3D Render of game content
    //
    postRender()
    {
        __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].render( __WEBPACK_IMPORTED_MODULE_1__library_system_device__["a" /* device */].orthographicMatrix );
    }
    
    // 
    //  DESC: Get the load state
    //
    getLoadState( loadStateStr )
    {
        if( loadStateStr === 'lobby_state' )
            return __WEBPACK_IMPORTED_MODULE_2__gamestate__["c" /* GAME_STATE_LOBBY */];
        
        else if( loadStateStr === 'big_pay_back_state' )
            return __WEBPACK_IMPORTED_MODULE_2__gamestate__["a" /* GAME_STATE_BIG_PAY_BACK */];
        
        throw new Error( `State does not exist!. (${loadStateStr})` );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CommonState;



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = loadScripts;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_utilities_highresolutiontimer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_managers_shadermanager__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_script_scriptmanager__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__library_managers_eventmanager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__library_common_color__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__library_common_defs__ = __webpack_require__(0);

//
//  FILE NAME: utilityscripts.js
//  DESC:      script for fading the screen
//










//
//  DESC: Script for fading in the menu
//
class FadeTo
{
    constructor( current, final, time )
    {
        this.current = current;
        this.final = final;
        this.time = time;
        this.inc = (this.final - this.current) / this.time;
        this.finished = false;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.time -= __WEBPACK_IMPORTED_MODULE_0__library_utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;

        if( this.time < 0 )
        {
            this.finished = true;
        }
        else
        {
            this.current += (this.inc * __WEBPACK_IMPORTED_MODULE_0__library_utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = FadeTo;


//
//  DESC: Color to the final color in time
//
class ColorTo
{
    constructor()
    {
        this.current = new __WEBPACK_IMPORTED_MODULE_4__library_common_color__["a" /* Color */];
        this.inc = new __WEBPACK_IMPORTED_MODULE_4__library_common_color__["a" /* Color */];
        this.final;
        this.time;
    }
    
    init( current, final, time )
    {
        this.time = time;
        this.final = final;
        this.current.copy( current );
        
        for( let i = 0; i < 4; ++i )
            this.inc.data[i] = (this.final.data[i] - this.current.data[i]) / this.time;
        
        this.finished = false;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        let elapsedTime = __WEBPACK_IMPORTED_MODULE_0__library_utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;
        this.time -= elapsedTime;

        if( this.time < 0 )
        {
            this.finished = true;
        }
        else
        {
            for( let i = 0; i < 4; ++i )
                this.current.data[i] += this.inc.data[i] * elapsedTime;
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
    
    // 
    //  DESC: Finished access function
    //
    get color()
    {
        if( this.finished )
            return this.final;
        else
            return this.current;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ColorTo;


//
//  DESC: Script for fading the screen
//
class ScreenFade extends FadeTo
{
    constructor( current, final, time, gameStateChangeMsg )
    {
        super( current, final, time );
        
        this.gameStateChangeMsg = gameStateChangeMsg;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();

        if( this.finished )
        {
            __WEBPACK_IMPORTED_MODULE_1__library_managers_shadermanager__["a" /* shaderManager */].setAllShaderValue4fv( 'additive', [this.final, this.final, this.final, 1] );
            
            if( this.gameStateChangeMsg )
                __WEBPACK_IMPORTED_MODULE_3__library_managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_5__library_common_defs__["Z" /* EGE_MENU_GAME_STATE_CHANGE */], __WEBPACK_IMPORTED_MODULE_5__library_common_defs__["_51" /* ETC_END */] );
        }
        else
        {
            __WEBPACK_IMPORTED_MODULE_1__library_managers_shadermanager__["a" /* shaderManager */].setAllShaderValue4fv( 'additive', [this.current, this.current, this.current, 1] );
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

// 
//  DESC: Load the scripts in this file
//
function loadScripts()
{
    __WEBPACK_IMPORTED_MODULE_2__library_script_scriptmanager__["a" /* scriptManager */].set( 'ScreenFade',
            ( current, final, time, gameStateChangeMsg = false ) => { return new ScreenFade( current, final, time, gameStateChangeMsg ); } );
}


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = load;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_utilities_highresolutiontimer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_script_scriptcomponent__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__library_script_scriptmanager__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__library_utilities_assetholder__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__library_objectdatamanager_objectdatamanager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__library_managers_loadmanager__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__library_slot_betmanager__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__library_2d_sprite2d__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__library_system_device__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__commonstate__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__library_slot_slotmathmanager__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__library_slot_symbolsetviewmanager__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__library_slot_simplecycleresults__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__library_slot_slotgame__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__game_frontpanel__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__gamestate__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__library_common_defs__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__library_utilities_genfunc__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__library_slot_slotdefs__ = __webpack_require__(11);

// 
//  FILE NAME: bigpaybackstate.js
//  DESC:      Slot game state
//
























const group = '(big_pay_back)';

class BigPayBackState extends __WEBPACK_IMPORTED_MODULE_10__commonstate__["a" /* CommonState */]
{
    constructor( gameLoopCallback = null )
    {
        super( __WEBPACK_IMPORTED_MODULE_16__gamestate__["a" /* GAME_STATE_BIG_PAY_BACK */], __WEBPACK_IMPORTED_MODULE_16__gamestate__["b" /* GAME_STATE_LOAD */], gameLoopCallback );
        
        this.background = new __WEBPACK_IMPORTED_MODULE_8__library_2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_5__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( group, 'background' ) );
        this.background.transform();

        // Create the script component and add a script
        this.scriptComponent = new __WEBPACK_IMPORTED_MODULE_2__library_script_scriptcomponent__["a" /* ScriptComponent */];
        this.scriptComponent.set( __WEBPACK_IMPORTED_MODULE_3__library_script_scriptmanager__["a" /* scriptManager */].get('ScreenFade')( 0, 1, 500 ) );
        
        // Allocate the slot game
        this.slotGame = new __WEBPACK_IMPORTED_MODULE_14__library_slot_slotgame__["a" /* SlotGame */]( group );
        
        // Allocate the front panel
        this.frontPanel = new __WEBPACK_IMPORTED_MODULE_15__game_frontpanel__["a" /* FrontPanel */];
    }
    
    // 
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        // Unblock the menu messaging and activate needed trees
        __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].allowEventHandling = true;
        __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].activateTree( ['confirmation_tree', 'base_game_tree'] );
        
        // Load the slot config
        this.slotGame.loadSlotConfig( __WEBPACK_IMPORTED_MODULE_4__library_utilities_assetholder__["a" /* assetHolder */].get( group, 'slotCfg' ) );
        
        // Create the slot group
        this.slotGame.createSlotGroup(
            __WEBPACK_IMPORTED_MODULE_19__library_slot_slotdefs__["c" /* ED_REEL */],
            'main_reel_strip',
            'main_paytable',
            __WEBPACK_IMPORTED_MODULE_11__library_slot_slotmathmanager__["a" /* slotMathManager */].getSlotMath( group, "slot" ),
            __WEBPACK_IMPORTED_MODULE_4__library_utilities_assetholder__["a" /* assetHolder */].get( group, 'reelgroup' ),
            __WEBPACK_IMPORTED_MODULE_4__library_utilities_assetholder__["a" /* assetHolder */].get( group, 'spinProfile' ),
            __WEBPACK_IMPORTED_MODULE_12__library_slot_symbolsetviewmanager__["a" /* symbolSetViewManager */].getViewData( group, "base_game" ),
            new __WEBPACK_IMPORTED_MODULE_13__library_slot_simplecycleresults__["a" /* SimpleCycleResults */] );
            
        // Init after all slot groups have been created. Currently used for setting up the font sprites
        this.slotGame.init();
            
        // Hook the Play button to the reel group
        let playBtn = __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].getMenuControl( 'base_game_menu', 'play_btn' );
        playBtn.connect_ExecutionAction( this.slotGame.playGame.bind(this.slotGame) );
        
        this.frontPanel.setMeters(
            __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].getMenuControl( 'base_game_menu', 'win_meter' ),
            __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].getMenuControl( 'base_game_menu', 'credit_meter' ) );
            
        this.slotGame.setFrontPanel( this.frontPanel );
        
        // Init the meters
        this.frontPanel.initGame( __WEBPACK_IMPORTED_MODULE_7__library_slot_betmanager__["a" /* betManager */].getCredits() );
        
        // Set the line bet and the total numvber of lines bet
        __WEBPACK_IMPORTED_MODULE_7__library_slot_betmanager__["a" /* betManager */].setLineBet(1);
        __WEBPACK_IMPORTED_MODULE_7__library_slot_betmanager__["a" /* betManager */].setTotalLines( __WEBPACK_IMPORTED_MODULE_11__library_slot_slotmathmanager__["a" /* slotMathManager */].getPaylineSet('15_3x5').line.length );
        
        __WEBPACK_IMPORTED_MODULE_4__library_utilities_assetholder__["a" /* assetHolder */].deleteGroup( [group] );
        
        // Reset the elapsed time before entering the render loop
        __WEBPACK_IMPORTED_MODULE_1__library_utilities_highresolutiontimer__["a" /* highResTimer */].calcElapsedTime();
        
        requestAnimationFrame( this.callback );
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        // Currently used for cleaning up after the font sprites
        this.slotGame.cleanUp();
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
            if( event.detail.type === __WEBPACK_IMPORTED_MODULE_17__library_common_defs__["Z" /* EGE_MENU_GAME_STATE_CHANGE */] )
            {
                if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_17__library_common_defs__["_50" /* ETC_BEGIN */] )
                    this.scriptComponent.set( __WEBPACK_IMPORTED_MODULE_3__library_script_scriptmanager__["a" /* scriptManager */].get('ScreenFade')( 1, 0, 500, true ) );
            }
        }
    }

    // 
    //  DESC: Handle any misc processing before the real work is started
    //
    miscProcess()
    {
        this.slotGame.processGameState();
    }
    
    // 
    //  DESC: Update objects that require them
    //
    update()
    {
        super.update();
        
        this.scriptComponent.update();
        
        if( !__WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].isMenuActive() )
        {
            this.slotGame.update();
        }
    }
    
    // 
    //  DESC: Transform the game objects
    //
    transform()
    {
        super.transform();
        
        this.slotGame.transform();
    }
    
    // 
    //  DESC: 2D/3D Render of game content
    //
    preRender()
    {
        let matrix = __WEBPACK_IMPORTED_MODULE_9__library_system_device__["a" /* device */].orthographicMatrix;
        
        this.background.render( matrix );
        
        this.slotGame.render( matrix );
        
        super.preRender();
    }
    
    // 
    //  DESC: 2D/3D Render of game content
    //
    postRender()
    {
        super.postRender();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BigPayBackState;


// 
//  DESC: Unload files
//
function unload()
{
    __WEBPACK_IMPORTED_MODULE_5__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].freeGroup( [group] );
    __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].freeGroup( [group] );
    __WEBPACK_IMPORTED_MODULE_12__library_slot_symbolsetviewmanager__["a" /* symbolSetViewManager */].clear();
    __WEBPACK_IMPORTED_MODULE_11__library_slot_slotmathmanager__["a" /* slotMathManager */].clear();
}

// 
//  DESC: Load files
//
function load()
{
    // Load the xml group
    __WEBPACK_IMPORTED_MODULE_6__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => __WEBPACK_IMPORTED_MODULE_5__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].loadXMLGroup2D( [group], callback ) );

    // Load all the textures associated with this group
    __WEBPACK_IMPORTED_MODULE_6__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => __WEBPACK_IMPORTED_MODULE_5__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].loadTextureGroup2D( [group], callback ) );

    // Load all the meshes associated with this group
    __WEBPACK_IMPORTED_MODULE_6__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => __WEBPACK_IMPORTED_MODULE_5__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].loadMeshGroup2D( [group], callback ) );

    // Create OpenGL objects from the loaded data
    __WEBPACK_IMPORTED_MODULE_6__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => __WEBPACK_IMPORTED_MODULE_5__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].createFromData( [group], callback ) );
        
    // Load the slot math manager list table
    __WEBPACK_IMPORTED_MODULE_6__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => __WEBPACK_IMPORTED_MODULE_11__library_slot_slotmathmanager__["a" /* slotMathManager */].loadGroup( [group], callback ) );

    // Load the symbol set view data manager list table
    __WEBPACK_IMPORTED_MODULE_6__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => __WEBPACK_IMPORTED_MODULE_12__library_slot_symbolsetviewmanager__["a" /* symbolSetViewManager */].loadGroup( [group], callback ) );

    // Preload the menu group
    __WEBPACK_IMPORTED_MODULE_6__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].preloadGroup( [group], callback ) );
    
    // Create the lobby menu group
    __WEBPACK_IMPORTED_MODULE_6__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) => { __WEBPACK_IMPORTED_MODULE_0__library_gui_menumanager__["a" /* menuManager */].createGroup( [group] ); callback(); });

    // Load the payline config
    __WEBPACK_IMPORTED_MODULE_6__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) =>
        {
            __WEBPACK_IMPORTED_MODULE_18__library_utilities_genfunc__["b" /* downloadFile */]( 'xml', 'data/objects/2d/slot/payline_15_3x5.cfg',
                ( xmlNode ) =>
                {
                    __WEBPACK_IMPORTED_MODULE_11__library_slot_slotmathmanager__["a" /* slotMathManager */].loadPaylineSetFromNode( xmlNode );

                    callback();
                });
        });
        
    // Load the reel group config
    __WEBPACK_IMPORTED_MODULE_6__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) =>
        {
            __WEBPACK_IMPORTED_MODULE_18__library_utilities_genfunc__["b" /* downloadFile */]( 'xml', 'data/objects/2d/slot/games/bigPayBack/reelgroup.cfg',
                ( xmlNode ) =>
                {
                    __WEBPACK_IMPORTED_MODULE_4__library_utilities_assetholder__["a" /* assetHolder */].set( group, 'reelgroup', xmlNode );

                    callback();
                });
        });
        
    // Load the spin profile config
    __WEBPACK_IMPORTED_MODULE_6__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) =>
        {
            __WEBPACK_IMPORTED_MODULE_18__library_utilities_genfunc__["b" /* downloadFile */]( 'xml', 'data/objects/2d/slot/games/bigPayBack/spinProfile.cfg',
                ( xmlNode ) =>
                {
                    __WEBPACK_IMPORTED_MODULE_4__library_utilities_assetholder__["a" /* assetHolder */].set( group, 'spinProfile', xmlNode );

                    callback();
                });
        });
        
    // Load the slot config
    __WEBPACK_IMPORTED_MODULE_6__library_managers_loadmanager__["a" /* loadManager */].add(
        ( callback ) =>
        {
            __WEBPACK_IMPORTED_MODULE_18__library_utilities_genfunc__["b" /* downloadFile */]( 'xml', 'data/objects/2d/slot/games/bigPayBack/slot.cfg',
                ( xmlNode ) =>
                {
                    __WEBPACK_IMPORTED_MODULE_4__library_utilities_assetholder__["a" /* assetHolder */].set( group, 'slotCfg', xmlNode );

                    callback();
                });
        });
}


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__2d_object2d__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spinprofile__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__2d_sprite2d__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objectdatamanager_objectdatamanager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__slotdefs__ = __webpack_require__(11);

// 
//  FILE NAME: slotgroupview.js
//  DESC:      View base class for the slot group
//









class SlotGroupView extends __WEBPACK_IMPORTED_MODULE_0__2d_object2d__["a" /* Object2D */]
{
    constructor( slotGroupModel )
    {
        super();
        
        // Array of slot strip views
        this.slotStripViewAry = [];
        
        // Hold a reference to the slot group model
        this.slotGroupModel = slotGroupModel;
        
        // Spin profile map
        this.spinProfileMapAry = new Map;

        // Default spin profile
        this.defaultSpinProfile;

        // Cycle result symb vectors
        this.cycleResultSymbAry = [];

        // cycle results text sprite
        this.cycleResultsTxtSprite = null;
    }
    
    //
    //  DESC: Create the group view
    //
    create( node, symbolSetView )
    {
        // Get the group name
        let group = node.getAttribute( 'group' );
        
        // Load the transform data from node
        let attr = node.getElementsByTagName( 'translation' );
        if( attr )
            this.loadTransFromNode( attr[0] );
        
        // Get the cycle results text node and object data
        let cycleResultsTxtNode = node.getElementsByTagName( 'cycleResultsText' );
        let objectName = cycleResultsTxtNode[0].getAttribute( 'objectName' );

        // Allocate the cycle results text
        this.cycleResultsTxtSprite = new __WEBPACK_IMPORTED_MODULE_2__2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_3__objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( group, objectName ) );
        this.cycleResultsTxtSprite.setVisible( false );
        this.cycleResultsTxtSprite.loadTransFromNode( cycleResultsTxtNode[0] );
        
        // Load the font properties from XML node
        this.cycleResultsTxtSprite.visualComponent.loadFontPropFromNode( cycleResultsTxtNode[0] );
    }
    
    //
    //  DESC: Init the sprite. This only matters if it's a sprite font.
    //
    init()
    {
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
            this.slotStripViewAry[i].init();
    }
    
    //
    //  DESC: Do some cleanup. This only matters if it's a sprite font.
    //
    cleanUp()
    {
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
            this.slotStripViewAry[i].cleanUp();
        
        // Do clean up and free the memory allocated for the cycle result symbols
        this.freeCycleResultSymbs();
        
        // Free the OpenGL font data
        if( this.cycleResultsTxtSprite )
            this.cycleResultsTxtSprite.cleanUp();
    }
    
    //
    //  DESC: Do clean up and free the memory allocated for the cycle result symbols
    //
    freeCycleResultSymbs()
    {
        for( let reel = 0; reel < this.cycleResultSymbAry.length; ++reel )
        {
            for( let symb = 0; symb < this.cycleResultSymbAry[reel].length; ++symb )
            {
                if( this.cycleResultSymbAry[reel][symb] )
                {
                    this.cycleResultSymbAry[reel][symb].cleanUp();
                    this.cycleResultSymbAry[reel][symb] = null;
                }
            }
        }
    }
    
    //
    //  DESC: Set the cycle results text
    //
    setCycleResultText( visible, pay )
    {
        this.cycleResultsTxtSprite.setVisible( visible );

        if( visible && (pay !== null) )
        {
            let text;

            if( pay.payType == __WEBPACK_IMPORTED_MODULE_4__slotdefs__["e" /* EP_PAYLINE */] )
            {
                text = `Line ${pay.payLine+1} Pays ${pay.getFinalAward()}`;
            }
            else
            {
                if( pay.bonusCode > 0 )
                    text = `Bonus Pays ${pay.getFinalAward()}`;
                else
                    text = `Scatter Pays ${pay.getFinalAward()}`;
            }

            this.cycleResultsTxtSprite.visualComponent.createFontString(text);
        }
    }
    
    //
    //  DESC: Load the spin profile from XML node
    //
    loadSpinProfileFromNode( node )
    {
        // Sanity check
        this.defaultSpinProfile = node.getAttribute( "default" );
        if( !this.defaultSpinProfile )
            throw new Error( `Spin profile default attribute not set!` );
        
        let profileLstNode = node.children;

        for( let i = 0; i < profileLstNode.length; ++i )
        {
            // Get the spin profile id
            let profileId = profileLstNode[i].getAttribute( "id" );
            
            // Check for duplicate names
            if( this.spinProfileMapAry.has( profileId ) )
                throw new Error( `Duplicate spin profile id (${profileId})!` );

            // Create a new spin profile
            let spinProfileAry = []
            this.spinProfileMapAry.set( profileId, spinProfileAry );

            let profileNode = profileLstNode[i].children;

            for( let j = 0; j < profileNode.length; ++j )
            {
                let spinProfile = new __WEBPACK_IMPORTED_MODULE_1__spinprofile__["a" /* SpinProfile */];
                spinProfileAry.push( spinProfile );

                spinProfile.loadFromNode( profileNode[j] );
            }
        }
    }
    
    //
    //  DESC: Update the reel group
    //
    update()
    {
        if( this.isVisible() )
        {
            for( let i = 0; i < this.slotStripViewAry.length; ++i )
                this.slotStripViewAry[i].update();
        }
    }

    //
    //  DESC: Transform the reel group
    //
    transform()
    {
        if( this.isVisible() )
        {
            super.transform();

            for( let i = 0; i < this.slotStripViewAry.length; ++i )
                this.slotStripViewAry[i].transform( this.matrix, this.wasWorldPosTranformed() );

            this.cycleResultsTxtSprite.transform( this.matrix, this.wasWorldPosTranformed() );
        }
    }

    //
    //  DESC: do the render
    //
    render( matrix )
    {
        if( this.isVisible() )
        {
            for( let i = 0; i < this.slotStripViewAry.length; ++i )
                this.slotStripViewAry[i].render( matrix );

            this.cycleResultsTxtSprite.render( matrix );
        }
    }
    
    //
    //  DESC: Start the reels spinning
    //
    startSpin()
    {
        if( this.isSpinState( __WEBPACK_IMPORTED_MODULE_4__slotdefs__["E" /* ESS_STOPPED */] ) )
        {
            let spinProfile = this.spinProfileMapAry.get( this.defaultSpinProfile );
            if( !spinProfile )
                throw new Error( `Spin profile does not exist!` );

            // Init the reels with the spin profile
            for( let i = 0; i < this.slotStripViewAry.length; ++i )
                this.slotStripViewAry[i].setSpinProfile( spinProfile[i] );

            // Start the spin
            for( let i = 0; i < this.slotStripViewAry.length; ++i )
                this.slotStripViewAry[i].startSpin();
        }
    }
    
    //
    //  DESC: Stop the reels spinning
    //
    stopSpin()
    {
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
            this.slotStripViewAry[i].stopSpin();
    }

    //
    //  DESC: Is the spin state
    //
    isSpinState( state )
    {
        let result = true;

        for( let i = 0; i < this.slotStripViewAry.length; ++i )
        {
            if( this.slotStripViewAry[i].spinState !== state )
            {
                result = false;
                break;
            }
        }

        return result;
    }

    //
    //  DESC: Do we allow the stop sounds?
    //
    allowStopSounds( allow )
    {
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
            this.slotStripViewAry.allowStopSounds( allow );
    }
    
    //
    //  DESC: Clear the cycle results symbols?
    //
    clearCycleResultSymbs()
    {
        // Empty by design. Clearing may not be required
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SlotGroupView;



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(59);

// 
//  FILE NAME: main.js
//  DESC:      main function
//





//console.log('main: Create game.');
//console.time('for');
//console.timeEnd('for');

// Create the game
var game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* Game */];



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Game; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_managers_signalmanager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_system_basegame__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_utilities_settings__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__library_utilities_genfunc__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__library_managers_shadermanager__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__state_startupstate__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__state_lobbystate__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__state_loadstate__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__state_bigpaybackstate__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__smartGUI_smartconfirmbtn__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__library_slot_betmanager__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__state_gamestate__ = __webpack_require__(24);

// 
//  FILE NAME: game.js
//  DESC:      CGame class
//
















class Game extends __WEBPACK_IMPORTED_MODULE_1__library_system_basegame__["a" /* Basegame */]
{
    constructor()
    {
        super();
        
        // Set the shader init callback
        __WEBPACK_IMPORTED_MODULE_4__library_managers_shadermanager__["a" /* shaderManager */].initShaderCallback = this.shaderInitCallBack.bind(this);
        
        // Set the smart gui call back
        __WEBPACK_IMPORTED_MODULE_0__library_managers_signalmanager__["a" /* signalManager */].connect_smartGui( this.smartGuiControlCreateCallBack.bind(this) );

        // Load the settings
        Object(__WEBPACK_IMPORTED_MODULE_3__library_utilities_genfunc__["b" /* downloadFile */])( 'xml', 'data/settings/settings.cfg',
            ( xmlNode ) =>
            {
                __WEBPACK_IMPORTED_MODULE_2__library_utilities_settings__["a" /* settings */].load( xmlNode );
                this.init();
            });
    }
    
    // 
    //  DESC: Init the game
    //
    init()
    {
        super.init();
        
        __WEBPACK_IMPORTED_MODULE_10__library_slot_betmanager__["a" /* betManager */].setCredits(5000);
        
        // Create the startup state
        this.gameState = new __WEBPACK_IMPORTED_MODULE_5__state_startupstate__["a" /* StartUpState */]( this.gameLoop.bind(this) );
        this.gameState.init();
    }
    
    // 
    //  DESC: Callback for when a smart gui control is created
    //
    smartGuiControlCreateCallBack( control )
    {
        if( control.faction === "decision_btn" )
            control.smartGui = new __WEBPACK_IMPORTED_MODULE_9__smartGUI_smartconfirmbtn__["a" /* SmartConfirmBtn */]( control );
    }
    
    // 
    //  DESC: Callback for shader init
    //
    shaderInitCallBack( shaderId )
    {
        __WEBPACK_IMPORTED_MODULE_4__library_managers_shadermanager__["a" /* shaderManager */].setShaderValue4fv( shaderId, 'additive', [0,0,0,1] );
    }
    
    // 
    //  DESC: Handle the state change
    //
    doStateChange()
    {
        if( this.gameState.doStateChange() )
        {
            this.gameState.cleanUp();
            
            if( this.gameState.nextState === __WEBPACK_IMPORTED_MODULE_11__state_gamestate__["c" /* GAME_STATE_LOBBY */] )
                this.gameState = new __WEBPACK_IMPORTED_MODULE_6__state_lobbystate__["a" /* LobbyState */]( this.gameLoop.bind(this) );
            
            else if( this.gameState.nextState === __WEBPACK_IMPORTED_MODULE_11__state_gamestate__["b" /* GAME_STATE_LOAD */] )
                this.gameState = new __WEBPACK_IMPORTED_MODULE_7__state_loadstate__["a" /* LoadState */]( this.gameState.stateMessage, this.doStateChange.bind(this) );
            
            else if( this.gameState.nextState === __WEBPACK_IMPORTED_MODULE_11__state_gamestate__["a" /* GAME_STATE_BIG_PAY_BACK */] )
                this.gameState = new __WEBPACK_IMPORTED_MODULE_8__state_bigpaybackstate__["a" /* BigPayBackState */]( this.gameLoop.bind(this) );
            
            // Do any pre-game loop init's
            this.gameState.init();
            
            return true;
        }
        
        return false;
    }
    
    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        this.gameState.handleEvent( event );
    }
    
    // 
    //  DESC: Handle any misc processing before the real work is started
    //
    miscProcess()
    {
        this.gameState.miscProcess();
    }
    
    // 
    //  DESC: Handle the physics
    //
    physics()
    {
        this.gameState.physics();
    }
    
    // 
    //  DESC: Update animations
    //
    update()
    {
        this.gameState.update();
    }
    
    // 
    //  DESC: Transform game objects
    //
    transform()
    {
        this.gameState.transform();
    }
    
    // 
    //  DESC: Render of game content
    //
    preRender()
    {
        this.gameState.preRender();
    }
    
    // 
    //  DESC: Render of content after post process effects
    //
    postRender()
    {
        this.gameState.postRender();
    }
}




/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__device__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__managers_texturemanager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__managers_meshmanager__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__managers_vertexbuffermanager__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__managers_shadermanager__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__managers_eventmanager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utilities_settings__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utilities_highresolutiontimer__ = __webpack_require__(5);

// 
//  FILE NAME: basegame.js
//  DESC:      base game class
//











class Basegame
{
    constructor()
    {
        this.clearBufferMask = 0;
    }
    
    // 
    //  DESC: Init the game
    //
    init()
    {
        // Create the projection matrixes
        __WEBPACK_IMPORTED_MODULE_0__device__["a" /* device */].createProjMatrix();
        
        // Do we add stencil buffer
        if( __WEBPACK_IMPORTED_MODULE_6__utilities_settings__["a" /* settings */].createStencilBuffer )
            __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].stencilOp(__WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].KEEP, __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].KEEP, __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].REPLACE);
        
        // Depth testing is off by default. Enable it?
        if( __WEBPACK_IMPORTED_MODULE_6__utilities_settings__["a" /* settings */].enableDepthBuffer )
            __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].enable(__WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].DEPTH_TEST);
    
        // Init the clear color
        __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].clearColor(0.0, 0.0, 0.0, 1.0);
        
        // Init the stencil clear mask based on the bit size of the mask
        // Stencil buffer can only be 1 or 8 bits per pixel
        if( __WEBPACK_IMPORTED_MODULE_6__utilities_settings__["a" /* settings */].stencilBufferBitSize === 1 )
        {
            __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].stencilFunc(__WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].ALWAYS, 1, 0x1);
            __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].stencilMask(0x1);
        }
        else if( __WEBPACK_IMPORTED_MODULE_6__utilities_settings__["a" /* settings */].stencilBufferBitSize === 8 )
        {
            __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].stencilFunc(__WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].ALWAYS, 1, 0xFF);
            __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].stencilMask(0xff);
        }
        
        // Cull the back face
        __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].frontFace(__WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].CCW);
        __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].cullFace(__WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].BACK);
        __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].enable(__WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].CULL_FACE);
        
        // Enable alpha blending
        __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].enable(__WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].BLEND);
        __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].blendFunc(__WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].SRC_ALPHA, __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].ONE_MINUS_SRC_ALPHA);

        // Make the zero texture the active texture
        __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].activeTexture(__WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].TEXTURE0);
        
        // Init the clear buffer mask
        if( __WEBPACK_IMPORTED_MODULE_6__utilities_settings__["a" /* settings */].clearTargetBuffer )
            this.clearBufferMask |= __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].COLOR_BUFFER_BIT;

        if( __WEBPACK_IMPORTED_MODULE_6__utilities_settings__["a" /* settings */].enableDepthBuffer )
            this.clearBufferMask |= __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].DEPTH_BUFFER_BIT;

        if( __WEBPACK_IMPORTED_MODULE_6__utilities_settings__["a" /* settings */].clearStencilBuffer )
            this.clearBufferMask |= __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].STENCIL_BUFFER_BIT;
        
        __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].clear( this.clearBufferMask );
    }
    
    //
    //  DESC: Poll for game events
    //
    pollEvents()
    {
        let event = null;
        
        // Handle events on the queue
        while( (event = __WEBPACK_IMPORTED_MODULE_5__managers_eventmanager__["a" /* eventManager */].pollEvent()) )
            this.handleEvent( event );
    }
    
    handleEvent( event )
    {
        // Empty function to be overwritten
    }
    
    doStateChange()
    {
        // Empty function to be overwritten
    }
    
    miscProcess()
    {
        // Empty function to be overwritten
    }
    
    physics()
    {
        // Empty function to be overwritten
    }
    
    update()
    {
        // Empty function to be overwritten
    }
    
    transform()
    {
        // Empty function to be overwritten
    }
    
    render()
    {
        __WEBPACK_IMPORTED_MODULE_0__device__["b" /* gl */].clear( this.clearBufferMask );
        
        this.preRender();
        this.postRender();
    }
    
    preRender()
    {
        // Empty function to be overwritten
    }
    
    postRender()
    {
        // Empty function to be overwritten
    }
    
    // 
    //  DESC: Main game loop
    //
    gameLoop()
    {
        // Break out of the game loop and handle the state change
        if( this.doStateChange() )
            return;
        
        // Poll the events
        this.pollEvents();
        
        // Get our elapsed time
        __WEBPACK_IMPORTED_MODULE_7__utilities_highresolutiontimer__["a" /* highResTimer */].calcElapsedTime();
        
        // Handle any misc processing before the real work is started
        this.miscProcess();
        
        // Handle the physics
        this.physics();
        
        // Update animations, Move sprites, Check for collision
        this.update();

        // Transform game objects
        this.transform();

        // Do the rendering
        this.render();

        // Continues the loop
        requestAnimationFrame( this.gameLoop.bind(this) );

        // Apparently it's a good practice to do this at the end of a render cycle
        __WEBPACK_IMPORTED_MODULE_4__managers_shadermanager__["a" /* shaderManager */].unbind();
        __WEBPACK_IMPORTED_MODULE_1__managers_texturemanager__["a" /* textureManager */].unbind();
        __WEBPACK_IMPORTED_MODULE_3__managers_vertexbuffermanager__["a" /* vertexBufferManager */].unbind();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Basegame;



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME:  uv.js
//  DESC:       uv class
//



class UV
{
    constructor( u = 0, v = 0 )
    {
        this.data = new Float32Array([u,v]);
    }
    
    set u(value) { this.data[0] = value; }
    get u() { return this.data[0]; }
    
    set v(value) { this.data[1] = value; }
    get v() { return this.data[1]; }
}
/* unused harmony export UV */



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

//
//  FILE NAME: meshbinaryfileheader.js
//  DESC:      mesh binary file headers
//



// Hex for RSS (Rabbid Squirrel Sprite)
const MESH_FILE_HEADER = 0x415382AE;
/* harmony export (immutable) */ __webpack_exports__["d"] = MESH_FILE_HEADER;


// Hex for tag check
const TAG_CHECK = 0x6A82Fc4d;
/* harmony export (immutable) */ __webpack_exports__["f"] = TAG_CHECK;


// Max character sizes for the texture path and joint name
const TEXT_PATH_SIZE = 128;
/* harmony export (immutable) */ __webpack_exports__["g"] = TEXT_PATH_SIZE;

const JOINT_NAME_SIZE = 20;
/* unused harmony export JOINT_NAME_SIZE */


class MeshBinaryFileHeader
{
    constructor()
    {
        this.file_header      = 0; // uint32
        this.vert_count       = 0; // uint16
        this.uv_count         = 0; // uint16
        this.vert_norm_count  = 0; // uint16
        this.face_group_count = 0; // uint16
        this.text_count       = 0; // uint16
        this.joint_count      = 0; // uint16
    }
}
/* harmony export (immutable) */ __webpack_exports__["e"] = MeshBinaryFileHeader;


// class for reading in texture info
class BinaryTexture
{
    constructor()
    {
        this.type = 0;       // int8
        this.path = '';      // file path [TEXT_PATH_SIZE]
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = BinaryTexture;
;

// Class for reading and writing the total face count within a group and the material
// it belongs to
class BinaryFaceGroup
{
    constructor()
    {
        this.groupFaceCount = 0; // uint16
        this.vertexBufCount = 0; // uint16
        this.indexBufCount  = 0; // uint16
        this.textureCount   = 0; // uint16
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BinaryFaceGroup;
;

// Class for reading and writing face information
class BinaryFace
{
    constructor()
    {
        this.vert = [];
        this.norm = [];
        this.uv = [];
    }
}
/* unused harmony export BinaryFace */
;

// Class for reading and writing face information
class BinaryVertex
{
    constructor()
    {
        this.vert = 0;
        this.norm = 0;
        this.uv = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = BinaryVertex;
;

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

//
//  FILE NAME: mesh3d.js
//  DESC:      3D mesh class
//



class MeshGroup
{
    constructor()
    {
        // Array texture paths for loading
        this.uniqueTexturePathAry = [];
        
        // Array of loaded textures
        this.meshAry = [];
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = MeshGroup;


class Mesh
{
    constructor()
    {
        // Texture indexes into the uniqueTexturePathAry
        this.textureIndexAry = [];
        
        // Loaded texture data
        this.textureAry = [];

        // VBO
        this.vbo = null;

        // IBO
        this.ibo = null;

        // Number of IBOs needed for rendering
        this.iboCount = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mesh;



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_vertex2d__ = __webpack_require__(29);

// 
//  FILE NAME:  quad2d.js
//  DESC:       quad 2d class
//




class Quad2d
{
    constructor()
    {
        this.vert = [new __WEBPACK_IMPORTED_MODULE_0__common_vertex2d__["a" /* Vertex2d */], new __WEBPACK_IMPORTED_MODULE_0__common_vertex2d__["a" /* Vertex2d */], new __WEBPACK_IMPORTED_MODULE_0__common_vertex2d__["a" /* Vertex2d */], new __WEBPACK_IMPORTED_MODULE_0__common_vertex2d__["a" /* Vertex2d */]];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Quad2d;



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: shaderdata.js
//  DESC:      shader data class
//



class ShaderData
{
    constructor()
    {
        // OpenGL ID's
        this.programId = 0;
        this.vertexId = 0;
        this.fragmentId = 0;
        this.attributeCount = 0;
        
        // location shader map
        this.locationMap = new Map;
    }
    
    //
    //  DESC: Get the shader location variable
    //
    getLocation( id )
    {
        let loc = this.locationMap.get( id );
        if( loc !== undefined )
            return loc;
        else
            throw new Error( 'ERROR Shader variable location does not exist! (' + id + ').' );
        
        return null;
    }
    
    //
    //  DESC: Check for the shader location variable
    //
    hasLocation( id )
    {
        return this.locationMap.has( id );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ShaderData;



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_managers_shadermanager__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_managers_texturemanager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_managers_vertexbuffermanager__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__library_managers_fontmanager__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__library_slot_symbolsetviewmanager__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__library_slot_slotmathmanager__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__library_managers_actionmanager__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__library_gui_menumanager__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__library_managers_signalmanager__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__library_managers_soundmanager__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__library_2d_sprite2d__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__library_system_device__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__library_utilities_highresolutiontimer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__library_utilities_assetholder__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__library_gui_uiprogressbar__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__state_lobbystate__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__scripts_utilityscripts__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__scripts_menuscripts__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__gamestate__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__library_utilities_genfunc__ = __webpack_require__(4);

// 
//  FILE NAME: startupstate.js
//  DESC:      startup state class
//


























const STARTUP_ASSET_COUNT = 55,
      LOGO_DISPLAY_DELAY = 2000;

class StartUpState extends __WEBPACK_IMPORTED_MODULE_20__gamestate__["e" /* GameState */]
{
    constructor( gameLoopCallback = null )
    {
        super( __WEBPACK_IMPORTED_MODULE_20__gamestate__["d" /* GAME_STATE_STARTUP */], __WEBPACK_IMPORTED_MODULE_20__gamestate__["c" /* GAME_STATE_LOBBY */], gameLoopCallback );
        
        this.stateChange = true;
        
        // Logo to fade in and out during the load
        this.spriteLogo;
        
        // progress bar to show loading
        this.progressBar;
        
        // Init fade members
        this.current = 0.0;
        this.final = 1.0;
        this.time = 500.0;
        this.inc = (this.final - this.current) / this.time;
        this.fadeCompleteCallback = this.assetLoad.bind(this);
        
        this.progressCounter = 0;
    }
    
    // 
    //  DESC: progress bar update
    //
    progressbarUpdate()
    {
        __WEBPACK_IMPORTED_MODULE_13__library_system_device__["b" /* gl */].clear(__WEBPACK_IMPORTED_MODULE_13__library_system_device__["b" /* gl */].COLOR_BUFFER_BIT);
        
        this.spriteLogo.render( __WEBPACK_IMPORTED_MODULE_13__library_system_device__["a" /* device */].orthographicMatrix );
        
        this.progressBar.incCurrentValue( ++this.progressCounter );
        this.progressBar.doTransform();
        this.progressBar.render( __WEBPACK_IMPORTED_MODULE_13__library_system_device__["a" /* device */].orthographicMatrix );
        
        // Unbind everything after a round of rendering
        __WEBPACK_IMPORTED_MODULE_0__library_managers_shadermanager__["a" /* shaderManager */].unbind();
        __WEBPACK_IMPORTED_MODULE_1__library_managers_texturemanager__["a" /* textureManager */].unbind();
        __WEBPACK_IMPORTED_MODULE_2__library_managers_vertexbuffermanager__["a" /* vertexBufferManager */].unbind();
    }
    
    // 
    //  DESC: Do start up init
    //
    init()
    {
        let groupAry = ['(startup)'];
        
        // Set the load manager's callback when everything is loaded
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].loadCompleteCallback = this.startFade.bind(this);
        
        // Load the shaders
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) =>
            {
                __WEBPACK_IMPORTED_MODULE_21__library_utilities_genfunc__["b" /* downloadFile */]( 'xml', 'data/shaders/shader.cfg',
                    ( xmlNode ) => __WEBPACK_IMPORTED_MODULE_0__library_managers_shadermanager__["a" /* shaderManager */].load( xmlNode, callback ) );
            });

        // Load the object data list table and (startup) group
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) =>
            {
                __WEBPACK_IMPORTED_MODULE_21__library_utilities_genfunc__["b" /* downloadFile */]( 'xml', 'data/objects/2d/objectDataList/dataListTable.lst',
                    ( xmlNode ) =>
                    {
                        // Load the object data list table
                        __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].loadListTable( xmlNode );
                        
                        // Load the object data XML's
                        __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].loadXMLGroup2D( groupAry, callback );
                    });
            });
            
        // Load all the textures associated with this group
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) => __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].loadTextureGroup2D( groupAry, callback ) );
            
        // Load all the mesh files associated with this group
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) => __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].loadMeshGroup2D( groupAry, callback ) );
            
        // Create OpenGL objects from the loaded data
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) => __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].createFromData( groupAry, callback ) );
            
        // Start the load
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].load();
    }
    
    // 
    //  DESC: Start the fade
    //
    startFade()
    {
        // Create the logo to fade in and out
        this.spriteLogo = new __WEBPACK_IMPORTED_MODULE_12__library_2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( '(startup)', 'logo' ) );
        this.spriteLogo.transform();
        
        this.progressBar = new __WEBPACK_IMPORTED_MODULE_16__library_gui_uiprogressbar__["a" /* UIProgressBar */]( '(startup)' );
        this.progressBar.setPosXYZ( 0, -350, 0 );
        this.progressBar.loadSpriteFromArray( ['progress_frame', 'progress_solid'], 1 );
        this.progressBar.initProgressBar( STARTUP_ASSET_COUNT );
        this.progressBar.doTransform();
        
        // Reset the elapsed time before entering the render loop
        __WEBPACK_IMPORTED_MODULE_14__library_utilities_highresolutiontimer__["a" /* highResTimer */].calcElapsedTime();
        
        // Start the fade
        requestAnimationFrame( this.fade.bind(this) );
    }
    
    // 
    //  DESC: handle the logo fade in
    //
    fade()
    {
        __WEBPACK_IMPORTED_MODULE_14__library_utilities_highresolutiontimer__["a" /* highResTimer */].calcElapsedTime();
        this.time -= __WEBPACK_IMPORTED_MODULE_14__library_utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;
        
        if( this.time < 0 )
        {
            this.renderFade( this.final );
            this.fadeCompleteCallback();
        }
        else
        {
            this.current += this.inc * __WEBPACK_IMPORTED_MODULE_14__library_utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;
            this.renderFade( this.current );
            
            // Continues the loop
            requestAnimationFrame( this.fade.bind(this) );
        }
    }
    
    // 
    //  DESC: Render the fade
    //
    renderFade( value )
    {
        for( let [ key, shaderData ] of __WEBPACK_IMPORTED_MODULE_0__library_managers_shadermanager__["a" /* shaderManager */].shaderMap.entries() )
            __WEBPACK_IMPORTED_MODULE_0__library_managers_shadermanager__["a" /* shaderManager */].setShaderValue4fv( key, 'additive', [value, value, value, 1] );
        
        __WEBPACK_IMPORTED_MODULE_13__library_system_device__["b" /* gl */].clear(__WEBPACK_IMPORTED_MODULE_13__library_system_device__["b" /* gl */].COLOR_BUFFER_BIT);
        
        this.spriteLogo.render( __WEBPACK_IMPORTED_MODULE_13__library_system_device__["a" /* device */].orthographicMatrix );
        this.progressBar.render( __WEBPACK_IMPORTED_MODULE_13__library_system_device__["a" /* device */].orthographicMatrix );
        
        // Unbind everything after a round of rendering
        __WEBPACK_IMPORTED_MODULE_0__library_managers_shadermanager__["a" /* shaderManager */].unbind();
        __WEBPACK_IMPORTED_MODULE_1__library_managers_texturemanager__["a" /* textureManager */].unbind();
        __WEBPACK_IMPORTED_MODULE_2__library_managers_vertexbuffermanager__["a" /* vertexBufferManager */].unbind();
    }
    
    // 
    //  DESC: Load the assets
    //
    assetLoad()
    {
        // Set the function to be called to update the progress bar during the download
        __WEBPACK_IMPORTED_MODULE_10__library_managers_signalmanager__["a" /* signalManager */].connect_loadComplete( this.progressbarUpdate.bind(this) );
        
        // Use the simple timer to see how long the download is
        __WEBPACK_IMPORTED_MODULE_14__library_utilities_highresolutiontimer__["a" /* highResTimer */].timerStart();
        
        let groupAry = ['(menu)','(loadingScreen)'];
        
        // Set the load manager's callback when everything is loaded
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].loadCompleteCallback = this.loadComplete.bind(this);
        
        // Load the menu assets
        // Load the xml group
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) => __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].loadXMLGroup2D( groupAry, callback ) );

        // Load all the textures associated with this group
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) => __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].loadTextureGroup2D( groupAry, callback ) );

        // Load all the meshes associated with this group
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) => __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].loadMeshGroup2D( groupAry, callback ) );

        // Create OpenGL objects from the loaded data
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) => __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].createFromData( groupAry, callback ) );
    
        // Load the sound list table and (menu) group
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) =>
            {
                __WEBPACK_IMPORTED_MODULE_21__library_utilities_genfunc__["b" /* downloadFile */]( 'xml', 'data/sound/soundListTable.lst',
                    ( xmlNode ) =>
                    {
                        // Load the object data list table
                        __WEBPACK_IMPORTED_MODULE_11__library_managers_soundmanager__["a" /* soundManager */].loadListTable( xmlNode );
                        
                        // Preload the menu group
                        __WEBPACK_IMPORTED_MODULE_11__library_managers_soundmanager__["a" /* soundManager */].loadGroup( ['(menu)'], callback );
                    });
            });
            
        // Load the fonts
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) =>
            {
                __WEBPACK_IMPORTED_MODULE_21__library_utilities_genfunc__["b" /* downloadFile */]( 'xml', 'data/textures/fonts/font.lst',
                    ( xmlNode ) => __WEBPACK_IMPORTED_MODULE_3__library_managers_fontmanager__["a" /* fontManager */].load( xmlNode, callback ) );
            });
            
        // Load the action manager
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) =>
            {
                __WEBPACK_IMPORTED_MODULE_21__library_utilities_genfunc__["b" /* downloadFile */]( 'xml', 'data/settings/controllerMapping.cfg',
                    ( xmlNode ) =>
                    {
                        __WEBPACK_IMPORTED_MODULE_7__library_managers_actionmanager__["a" /* actionManager */].load( xmlNode );
                        callback();
                    });
            });
            
        // Preload the menu group
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) =>
            {
                __WEBPACK_IMPORTED_MODULE_21__library_utilities_genfunc__["b" /* downloadFile */]( 'xml', 'data/objects/2d/menu/menuListTable.lst',
                    ( xmlNode ) =>
                    {
                        // Load the object data list table
                        __WEBPACK_IMPORTED_MODULE_8__library_gui_menumanager__["a" /* menuManager */].loadListTable( xmlNode );
                        
                        __WEBPACK_IMPORTED_MODULE_21__library_utilities_genfunc__["b" /* downloadFile */]( 'xml', 'data/objects/2d/menu/menu_action.list',
                            ( xmlNode ) =>
                            {
                                // Load the menu action table
                                __WEBPACK_IMPORTED_MODULE_8__library_gui_menumanager__["a" /* menuManager */].loadMenuAction( xmlNode );
                                
                                // Preload the menu group
                                __WEBPACK_IMPORTED_MODULE_8__library_gui_menumanager__["a" /* menuManager */].preloadGroup( ['(menu)'], callback );
                            });
                    });
            });
            
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) =>
            {
                // Load the menu scripts before creating the menus
                __WEBPACK_IMPORTED_MODULE_19__scripts_menuscripts__["a" /* loadScripts */]();
                __WEBPACK_IMPORTED_MODULE_18__scripts_utilityscripts__["c" /* loadScripts */]();
        
                // Create the menu group
                __WEBPACK_IMPORTED_MODULE_8__library_gui_menumanager__["a" /* menuManager */].createGroup( ['(menu)'] );
                
                callback();
            });
            
        // Load the symbol set view data list table
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) =>
            {
                __WEBPACK_IMPORTED_MODULE_21__library_utilities_genfunc__["b" /* downloadFile */]( 'xml', 'data/objects/2d/slot/symbolSetListTable.lst',
                    ( xmlNode ) =>
                    {
                        // Load the symbol set view data list table
                        __WEBPACK_IMPORTED_MODULE_5__library_slot_symbolsetviewmanager__["a" /* symbolSetViewManager */].loadListTable( xmlNode );
                        
                        callback();
                    });
            });
            
        // Load the slot math manager list table
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].add(
            ( callback ) =>
            {
                __WEBPACK_IMPORTED_MODULE_21__library_utilities_genfunc__["b" /* downloadFile */]( 'xml', 'data/objects/2d/slot/mathListTable.lst',
                    ( xmlNode ) =>
                    {
                        // Load the symbol set view data list table
                        __WEBPACK_IMPORTED_MODULE_6__library_slot_slotmathmanager__["a" /* slotMathManager */].loadListTable( xmlNode );
                        
                        callback();
                    });
            });
            
        // Load the state specific assets
        __WEBPACK_IMPORTED_MODULE_17__state_lobbystate__["b" /* load */]();
        
        // Start the load
        __WEBPACK_IMPORTED_MODULE_9__library_managers_loadmanager__["a" /* loadManager */].load();
    }
    
    // 
    //  DESC: Load is completed so fade the logo out
    //
    loadComplete()
    {
        __WEBPACK_IMPORTED_MODULE_10__library_managers_signalmanager__["a" /* signalManager */].clear_loadComplete();
        console.log(`StartUp State Download Count: ${this.progressCounter}`);
        
        // Init fade members
        this.current = 1.0;
        this.final = 0.0;
        this.time = 500.0;
        this.inc = (this.final - this.current) / this.time;
        this.fadeCompleteCallback = this.callback;
        
        // Reset the elapsed time before entering the render loop
        __WEBPACK_IMPORTED_MODULE_14__library_utilities_highresolutiontimer__["a" /* highResTimer */].calcElapsedTime();
        
        let downloadTime = __WEBPACK_IMPORTED_MODULE_14__library_utilities_highresolutiontimer__["a" /* highResTimer */].timerStop();
        
        if( downloadTime > LOGO_DISPLAY_DELAY )
            requestAnimationFrame( this.fade.bind(this) );
        else
            setTimeout( () => requestAnimationFrame( this.fade.bind(this) ), LOGO_DISPLAY_DELAY - downloadTime );
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].freeGroup( ['(startup)'] );
        __WEBPACK_IMPORTED_MODULE_15__library_utilities_assetholder__["a" /* assetHolder */].deleteGroup( ['(startup)','(menu)'] );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StartUpState;



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_rect__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_texture__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__managers_texturemanager__ = __webpack_require__(12);

// 
//  FILE NAME:  font.js
//  DESC:       font class
//








class CharData
{
    constructor()
    {
        // Character offsets
        this.offset = new __WEBPACK_IMPORTED_MODULE_0__common_size__["a" /* Size */];

        // Character rect
        this.rect = new __WEBPACK_IMPORTED_MODULE_1__common_rect__["a" /* Rect */];

        // Amount to advance
        this.xAdvance = 0;
    }
}
/* unused harmony export CharData */


class Font
{
    constructor()
    {
        // map list of character data
        this.charDataMap = new Map;

        // Line height
        this.lineHeight = 0;

        // base line offset
        this.baselineOffset = 0;

        // Horizontal padding
        this.horzPadding = 0;

        // Vertival padding
        this.vertPadding = 0;

        // The texture
        this.texture = null;
    }
    
    // 
    //  DESC: Load from XML node
    //
    loadFromNode( group, name, xmlNode )
    {
        // load the texture
        this.texture = __WEBPACK_IMPORTED_MODULE_3__managers_texturemanager__["a" /* textureManager */].getTexture( group, name );

        // Get the padding
        let padding = xmlNode.getElementsByTagName('info')[0].getAttribute('padding');
        this.horzPadding = Number(padding.substr(6,1));
        this.vertPadding = Number(padding.substr(0,1));

        // Get the common font info
        let commonNode = xmlNode.getElementsByTagName( 'common' );

        // get the line height
        this.lineHeight = Number(commonNode[0].getAttribute('lineHeight'));

        // get the baseline offset
        this.baselineOffset = Number(commonNode[0].getAttribute('base'));

        // Get the list of character info
        let charNode = xmlNode.getElementsByTagName( 'char' );

        // Load in the individual character data
        for( let i = 0; i < charNode.length; ++i )
        {
            let charData = new CharData;

            // Get the offset of the character
            charData.offset.w = Number(charNode[i].getAttribute( 'xoffset' ));
            charData.offset.h = Number(charNode[i].getAttribute( 'yoffset' ));

            // Get the x advance of the character
            charData.xAdvance = Number(charNode[i].getAttribute( 'xadvance' ));

            // Get the rect of the character
            charData.rect.x1 = Number(charNode[i].getAttribute( 'x' ));
            charData.rect.y1 = Number(charNode[i].getAttribute( 'y' ));
            charData.rect.x2 = Number(charNode[i].getAttribute( 'width' ));
            charData.rect.y2 = Number(charNode[i].getAttribute( 'height' ));

            // Get the character ID which is the ascii value of the character.
            let id = Number(charNode[i].getAttribute( 'id' ));

            // Add the character to our list
            this.charDataMap.set( id, charData );
        }
    }
    
    // 
    //  DESC: Get the data for this character
    //
    getCharData( id )
    {
        // See if this character is part of the map
        let charData = this.charDataMap.get( id );

        if( charData === undefined )
            throw new Error( `Font character ID can't be found (${id}).` );

        return charData;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Font;



/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_rect__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_size__ = __webpack_require__(1);

// 
//  FILE NAME:  spritesheetglyph.js
//  DESC:       Class to hold sprite sheet glyph data
//





class SpriteSheetGlyph
{
    constructor( size, uv, cropOffset = null )
    {
        // Size of the sprite on the sheet
        this.size = size;

        // UV coordinates RECT
        this.uv = uv;

        // Crop Offset
        this.cropOffset = cropOffset;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpriteSheetGlyph;



/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__objectphysicsdata2d__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objectvisualdata2d__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_xmlparsehelper__ = __webpack_require__(7);

// 
//  FILE NAME: objectdata2d.js
//  DESC:      Class that holds a 2D object data
//








class ObjectData2D
{
    constructor()
    {
        // Visual data of the object
        this.visualData = new __WEBPACK_IMPORTED_MODULE_1__objectvisualdata2d__["a" /* ObjectVisualData2D */];

        // Physics data of the object
        this.physicsData = new __WEBPACK_IMPORTED_MODULE_0__objectphysicsdata2d__["a" /* ObjectPhysicsData2D */];

        // The name of the object data
        this.name = null;

        // The group the object data is in
        this.group = null;

        // The initial size of the object
        this.size = new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */];
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.visualData.copy( obj.visualData );
        this.physicsData.copy( obj.physicsData );
        this.size.copy( obj.size );
    }
    
    // 
    //  DESC: Load the object data from the passed in node
    //
    loadObjData( node, group, name )
    {
        this.name = name;
        this.group = group;

        // Load the size
        this.size = __WEBPACK_IMPORTED_MODULE_3__utilities_xmlparsehelper__["j" /* loadSize */]( node, this.size );

        // Load the visual data
        this.visualData.loadObjData( node );

        // Load the physics data
        this.physicsData.loadObjData( node );
    }
    
    // 
    //  DESC: Create OpenGL objects from data
    //
    createFromData( group )
    {
        // Create the visuales
        this.visualData.createFromData( group, this.size );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectData2D;



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Box2D_planck_min__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Box2D_planck_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Box2D_planck_min__);

// 
//  FILE NAME:  objectphysicsdata2d.js
//  DESC:       Class containing the 2D object's physics data
//





class Fixture
{
    constructor()
    {
        // Shape of the fixture
        this.shape = null;

        // Radius if shape is a circle
        this.radius = 0.0;

        // The friction is how much drag this object has on another object  
        this.friction = 0.2;

        // The density is how much the object resists movement  
        this.density = 0.2;

        // The percetange of velocity retained upon colliding with this object
        this.restitution = 0.2;

        // Amount to adjust the top, bottom, left, and right side size of the mesh
        this.topMod = 0;
        this.bottomMod = 0;
        this.leftMod = 0;
        this.rightMod = 0;

        // Flag to define if chain shape is a loop
        this.chainLoop = false;

        // Flag to indicate if fixture is a sensor. Reports collision but doesn't react to it
        this.sensor = false;

        // Collision filter
        this.filterGroupIndex = 0;
        this.filterCategoryBits = 1;
        this.filterMaskBits = 65535;

        // Polygon point vector
        this.vertAry = [];
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.shape = obj.shape;
        this.radius = obj.radius;  
        this.friction = obj.friction;  
        this.density = obj.density;
        this.restitution = obj.restitution;
        this.topMod = obj.topMod;
        this.bottomMod = obj.bottomMod;
        this.leftMod = obj.leftMod;
        this.rightMod = obj.rightMod;
        this.chainLoop = obj.chainLoop;
        this.sensor = obj.sensor;
        this.filterGroupIndex = obj.filterGroupIndex;
        this.filterCategoryBits = obj.filterCategoryBits;
        this.filterMaskBits = obj.filterMaskBits;
        
        for( let i = 0; i < obj.vertAry.length; ++i )
        {
            let vert = obj.vertAry[i];
            this.vertAry.push( new __WEBPACK_IMPORTED_MODULE_0__Box2D_planck_min__["Vec2"]( vert.x, vert.y ) );
        }
    }
}
/* unused harmony export Fixture */


class ObjectPhysicsData2D
{
    constructor()
    {
        // The name of the physics world
        this.world = null;

        // Type of physics body
        this.bodyType = null;

        // The constant decceleration of movement and rotation
        this.linearDamping = 0;
        this.angularDamping = 0;

        // If we want to prevent the object from rotating due to physicss
        this.fixedRotation = false;

        // vector of fixtures
        this.fixtureAry = [];
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.world = obj.world;
        this.bodyType = obj.bodyType;
        this.linearDamping = obj.linearDamping;
        this.angularDamping = obj.angularDamping;
        this.fixedRotation = obj.fixedRotation;
        
        for( let i = 0; i < obj.fixtureAry.length; ++i )
        {
            let fixture = new Fixture;
            fixture.copy( obj.fixtureAry[i] );
            this.fixtureAry.push(fixture);
        }
    }
    
    // 
    //  DESC: Load the object data
    //
    loadObjData( node )
    {
        let physicsNode = node.getElementsByTagName( 'physics' );

        // Check if the object has any physics data
        if( physicsNode.length )
        {
            let attr = physicsNode[0].getAttribute( 'world' );
            if( attr )
                this.world = attr;

            // The body of the physics sprite used for physics
            let bodyNode = physicsNode[0].getElementsByTagName( 'body' );
            if( bodyNode.length )
            {
                // Get the body type - default is static
                attr = bodyNode[0].getAttribute( 'type' );
                if( attr )
                    this.bodyType = attr;

                // The damping is the constant decceleration of movement
                attr = bodyNode[0].getAttribute( 'linearDamping' );
                if( attr )
                    this.linearDamping = Number( attr );

                // The angular damping is the constant decceleration of rotation
                attr = bodyNode[0].getAttribute( 'angularDamping' );
                if( attr )
                    this.angularDamping = Number( attr );

                // Whether the rotation due to physicss is fixed
                attr = bodyNode[0].getAttribute( 'fixedRotation' );
                if( attr )
                    this.fixedRotation = (attr === 'true');
            }

            // The body of the physics sprite used for physics
            let fixtureNode = physicsNode[0].getElementsByTagName( 'fixture' );

            for( let i = 0; i < fixtureNode.length; ++i )
            {
                let fixture = this.fixtureAry[i];

                if( fixture === undefined )
                {
                    fixture = new Fixture;
                    this.fixtureAry.push(fixture);
                }

                // Get the fixture shape
                attr = fixtureNode[i].getAttribute( 'shape' );
                if( attr )
                    fixture.shape = attr;

                // The friction is how much drag this object has on another object
                attr = fixtureNode[i].getAttribute( 'friction' );
                if( attr )
                    fixture.friction = Number( attr );

                // The density is how much the object resists movement
                attr = fixtureNode[i].getAttribute( 'density' );
                if( attr )
                    fixture.density = Number( attr );

                // The restitution is the percentage of velocity retained upon physics
                attr = fixtureNode[i].getAttribute( 'restitution' );
                if( attr )
                    fixture.restitution = Number( attr );

                // Radius if shape is a circle
                attr = fixtureNode[i].getAttribute( 'radius' );
                if( attr )
                    fixture.radius = Number( attr );

                // Is chain shape a loop?
                attr = fixtureNode[i].getAttribute( 'chainLoop' );
                if( attr )
                    fixture.chainLoop = (attr === 'true');

                // Is fixture a sensor?
                attr = fixtureNode[i].getAttribute( 'sensor' );
                if( attr )
                    fixture.sensor = (attr === 'true');

                // See if there is a vert list
                let vertNode = fixtureNode[i].getElementsByTagName( 'vert' );

                for( let j = 0; j < vertNode.length; ++j )
                {
                    fixture.vertAry.push( 
                        new __WEBPACK_IMPORTED_MODULE_0__Box2D_planck_min__["Vec2"](
                            Number( vertNode[j].getAttribute('x') ),
                            Number( vertNode[j].getAttribute('y') ) ) );
                }

                // See if the filter is defined
                let filterNode = fixtureNode[i].getElementsByTagName( 'collisionFilter' );
                if( filterNode.length )
                {
                    attr = filterNode[0].getAttribute('categoryBits');
                    if( attr )
                        fixture.filterGroupIndex = Number( attr );

                    attr = filterNode[0].getAttribute('maskBits');
                    if( attr )
                        fixture.filterMaskBits = Number( attr );

                    attr = filterNode[0].getAttribute('groupIndex');
                    if( attr )
                        fixture.filterGroupIndex = Number( attr );
                }

                // The size mod is how much the mesh size should be adjusted on each side
                let sizeModNode = fixtureNode[i].getElementsByTagName( 'sizeMod' );
                if( sizeModNode.length )
                {
                    attr = sizeModNode[0].getAttribute('top');
                    if( attr )
                        fixture.topMod = Number( attr );

                    attr = sizeModNode[0].getAttribute('bottom');
                    if( attr )
                        fixture.bottomMod = Number( attr );

                    attr = sizeModNode[0].getAttribute('left');
                    if( attr )
                        fixture.leftMod = Number( attr );

                    attr = sizeModNode[0].getAttribute('right');
                    if( attr )
                        fixture.rightMod = Number( attr );
                }
            }
        }
    }
    
    // 
    //  DESC: Is this genType active
    //
    isActive()
    {
        return (this.bodyType !== null);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectPhysicsData2D;



/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_rect__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_color__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_vertex2d__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_scaledframe__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_spritesheet__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__managers_texturemanager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__managers_vertexbuffermanager__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__managers_spritesheetmanager__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utilities_assetholder__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__common_defs__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utilities_xmlparsehelper__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utilities_genfunc__ = __webpack_require__(4);

// 
//  FILE NAME: ojectvisualdata2d.js
//  DESC:      Class containing the 2D object's visual data
//

















class ObjectVisualData2D
{
    constructor()
    {
        // texture id
        this.texture = null;

        // VBO
        this.vbo = null;

        // IBO
        this.ibo = null;

        // VBO/IBO generation type
        this.genType = __WEBPACK_IMPORTED_MODULE_10__common_defs__["_20" /* EGT_NULL */];

        // Name of the shader
        this.shaderID = null;

        // Initial color of the object
        this.color = new __WEBPACK_IMPORTED_MODULE_1__common_color__["a" /* Color */];

        // texture file path
        this.textureFilePath = '';

        // mesh file path
        this.meshFilePath = null;
        
        // Sprite sheet file path
        this.spriteSheetFilePath = null;

        // ibo count
        this.iboCount = 0;

        // The vertex scale of the object
        this.vertexScale = new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */];

        // Scaled frame
        this.scaledFrame = null;

        // Sprite Sheet
        this.spriteSheet = null;

        // String of glyph ids
        this.glyphIDs = null;

        // Default scale
        this.defaultUniformScale = 1;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.genType = obj.genType;
        this.shaderID = obj.shaderID;
        this.textureFilePath = obj.textureFilePath;
        this.meshFilePath = obj.meshFilePath;
        this.spriteSheetFilePath = obj.spriteSheetFilePath;
        this.defaultUniformScale = obj.defaultUniformScale;
        this.color.copy( obj.color );
        
        if( obj.glyphIDs )
        {
            if( this.glyphIDs === null )
                this.glyphIDs = [];
            
            for( let i = 0; i < obj.glyphIDs.length; ++i )
                this.glyphIDs[i] = obj.glyphIDs[i];
        }
        
        if( obj.scaledFrame )
        {
            this.scaledFrame = new __WEBPACK_IMPORTED_MODULE_4__common_scaledframe__["a" /* ScaledFrame */];
            this.scaledFrame.copy( obj.scaledFrame );
        }
        
        if( obj.spriteSheet )
        {
            this.spriteSheet = new __WEBPACK_IMPORTED_MODULE_5__common_spritesheet__["a" /* SpriteSheet */];
            this.spriteSheet.copy( obj.spriteSheet );
        }
    }
    
    // 
    //  DESC: Load the object data
    //
    loadObjData( node )
    {
        let visualNode = node.getElementsByTagName( 'visual' );
        if( visualNode.length )
        {
            let attr = visualNode[0].getAttribute( 'defaultUniformScale' );
            if( attr )
                this.defaultUniformScale = Number(attr);
            
            // See if we have a texture to load
            let textureNode = visualNode[0].getElementsByTagName( 'texture' );
            if( textureNode.length )
            {
                let file = textureNode[0].getAttribute( 'file' );
                if( file )
                    this.textureFilePath = file;
            }

            // Get the mesh node
            let meshNode = visualNode[0].getElementsByTagName( 'mesh' );
            if( meshNode.length )
            {
                let genTypeStr = meshNode[0].getAttribute('genType');
                if( genTypeStr )
                {
                    if( genTypeStr === 'quad' )
                        this.genType = __WEBPACK_IMPORTED_MODULE_10__common_defs__["_21" /* EGT_QUAD */];

                    else if( genTypeStr === 'sprite_sheet' )
                        this.genType = __WEBPACK_IMPORTED_MODULE_10__common_defs__["_23" /* EGT_SPRITE_SHEET */];

                    else if( genTypeStr === 'scaled_frame' )
                        this.genType = __WEBPACK_IMPORTED_MODULE_10__common_defs__["_22" /* EGT_SCALED_FRAME */];

                    else if( genTypeStr === 'mesh_file' )
                        this.genType = __WEBPACK_IMPORTED_MODULE_10__common_defs__["_19" /* EGT_MESH_FILE */];

                    else if( genTypeStr === 'font' )
                        this.genType = __WEBPACK_IMPORTED_MODULE_10__common_defs__["_18" /* EGT_FONT */];
                }

                let spriteSheetNode = meshNode[0].getElementsByTagName( 'spriteSheet' );
                if( spriteSheetNode.length )
                {
                    let defaultIndex = 0;
                    let glyphCount = 0;
                    let columns = 0;
                    
                    let attr = spriteSheetNode[0].getAttribute( 'defIndex' );
                    if( attr )
                        defaultIndex = Number(attr);

                    // Make sure all elements are defined for manually building the sprite sheet data
                    attr = spriteSheetNode[0].getAttribute( 'glyphCount' );
                    if( attr )
                    {
                        glyphCount = Number(attr);

                        attr = spriteSheetNode[0].getAttribute( 'columns' );
                        if( attr )
                            columns = Number(attr);
                    }
                    
                    // Get the sprite sheet glyph file
                    attr = spriteSheetNode[0].getAttribute( 'file' );
                    if( attr )
                        this.spriteSheetFilePath = attr;

                    // See if any glyph Id's have been defined
                    let glyphNode = spriteSheetNode[0].getElementsByTagName( 'glyph' );
                    if( glyphNode.length )
                    {
                        this.glyphIDs = [];
                        for( let i = 0; i < glyphNode.length; ++i )
                            this.glyphIDs.push( glyphNode[i].getAttribute( 'id' ) );
                    }
                    
                    // make sure this is a valid sprite sheet before allocating
                    if( (this.spriteSheet === null) && (this.glyphIDs || defaultIndex || glyphCount || columns) )
                        this.spriteSheet = new __WEBPACK_IMPORTED_MODULE_5__common_spritesheet__["a" /* SpriteSheet */]( defaultIndex, glyphCount, columns );
                }

                let scaledFrameNode = meshNode[0].getElementsByTagName( 'scaledFrame' );
                if( scaledFrameNode.length )
                {
                    if( this.scaledFrame === null )
                        this.scaledFrame = new __WEBPACK_IMPORTED_MODULE_4__common_scaledframe__["a" /* ScaledFrame */];
                    
                    this.scaledFrame.frame.w = Number(scaledFrameNode[0].getAttribute( 'thicknessWidth' ));
                    this.scaledFrame.frame.h = Number(scaledFrameNode[0].getAttribute( 'thicknessHeight' ));

                    let centerQuadAttr = scaledFrameNode[0].getAttribute( 'centerQuad' );
                    if( centerQuadAttr )
                        this.scaledFrame.centerQuad = (centerQuadAttr === 'true');

                    let frameBottomAttr = scaledFrameNode[0].getAttribute('frameBottom');
                    if( frameBottomAttr )
                        this.scaledFrame.bottomFrame = (frameBottomAttr === 'true');
                }

                let fileNode = meshNode[0].getElementsByTagName( 'file' );
                if( fileNode.length )
                    this.meshFilePath = fileNode[0].getAttribute( 'name' );
            }

            // The shader node determines which shader to use
            let shaderNode = visualNode[0].getElementsByTagName( 'shader' );
            if( shaderNode.length )
            {
                this.shaderID = shaderNode[0].getAttribute( 'id' );
            }

            // Load the color
            this.color = __WEBPACK_IMPORTED_MODULE_11__utilities_xmlparsehelper__["b" /* loadColor */]( visualNode[0], this.color );

            // Raise an exception if there's a genType but no shader
            if( (this.genType != __WEBPACK_IMPORTED_MODULE_10__common_defs__["_20" /* EGT_NULL */]) && (this.shaderID === null) )
                throw new Error( 'Shader effect or techique not set!' );
        }
    }
    
    // 
    //  DESC: Create the objects from data
    //
    createFromData( group, size )
    {
        // Set the texture ID if one exists
        if( this.textureFilePath.length )
        {
            // Get the texture for this object
            this.texture = __WEBPACK_IMPORTED_MODULE_6__managers_texturemanager__["a" /* textureManager */].getTexture( group, this.textureFilePath );
            
            // If the passed in size is empty, set it to the texture size
            if( size.isEmpty() )
                size.copy( this.texture.size );
        }
        
        if( this.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_21" /* EGT_QUAD */] )
        {
            this.generateQuad( group );
            
            this.vertexScale.w = size.w * this.defaultUniformScale;
            this.vertexScale.h = size.h * this.defaultUniformScale;
            size.w = Math.trunc(this.vertexScale.w);
            size.h = Math.trunc(this.vertexScale.h);
        }
        else if( this.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_23" /* EGT_SPRITE_SHEET */] )
        {
            // Build the simple (grid) sprite sheet from XML data
            if( this.spriteSheetFilePath === null )
                this.spriteSheet.build( size );

            // Load complex sprite sheet data from the manager. It's assumed
            // that string Id's are for complex sprite sheets that are shared
            // among many sprites
            else
            {
                // This will return the sprite sheet if it's been loaded
                let spriteSheet = __WEBPACK_IMPORTED_MODULE_8__managers_spritesheetmanager__["a" /* spriteSheetManager */].getSpriteSheet( this.spriteSheetFilePath );

                // Copy the needed glyph data from the manager
                spriteSheet.copyTo( this.spriteSheet, this.glyphIDs );
            }

            // Generate a quad
            this.generateQuad( group );

            // For this generation type, the glyph size is the default scale
            let glyphSize = this.spriteSheet.getGlyph().size;

            this.vertexScale.w = glyphSize.w * this.defaultUniformScale;
            this.vertexScale.h = glyphSize.h * this.defaultUniformScale;
            size.w = Math.trunc(this.vertexScale.w);
            size.h = Math.trunc(this.vertexScale.h);
        }
        else if( this.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_22" /* EGT_SCALED_FRAME */] )
        {
            if( this.glyphIDs !== null )
            {
                // This will return the sprite sheet
                let spriteSheet = __WEBPACK_IMPORTED_MODULE_8__managers_spritesheetmanager__["a" /* spriteSheetManager */].getSpriteSheet( this.spriteSheetFilePath );

                // Get the glyph to make the frame with
                let glyph = spriteSheet.findGlyph( this.glyphIDs[0] );
                
                // Create the scaled frame using glyph info
                if( this.meshFilePath )
                    this.generateScaledFrameMeshFile( group, this.texture.size, glyph.size, size, glyph.uv );
                else
                    this.generateScaledFrame( group, this.texture.size, glyph.size, size, glyph.uv );
            }
            else if( this.meshFilePath )
                this.generateScaledFrameMeshFile( group, this.texture.size, this.texture.size, size, new __WEBPACK_IMPORTED_MODULE_0__common_rect__["a" /* Rect */] );

            else
                // Generate a scaled frame
                this.generateScaledFrame( group, this.texture.size, this.texture.size, size, new __WEBPACK_IMPORTED_MODULE_0__common_rect__["a" /* Rect */] );
        }
    }
    
    // 
    //  DESC: Generate a quad
    //
    generateQuad( group )
    {
        // VBO data
        // The order of the verts is counter clockwise
        // 1----0
        // |   /|
        // |  / |
        // | /  |
        // 2----3
        let vertAry =
        [
             0.5,  0.5, 0.0,   1.0, 0.0,
            -0.5,  0.5, 0.0,   0.0, 0.0,
            -0.5, -0.5, 0.0,   0.0, 1.0,
             0.5, -0.5, 0.0,   1.0, 1.0
        ];
        
        this.vbo = __WEBPACK_IMPORTED_MODULE_7__managers_vertexbuffermanager__["a" /* vertexBufferManager */].createVBO( group, 'guad_0011', vertAry );
        this.ibo = __WEBPACK_IMPORTED_MODULE_7__managers_vertexbuffermanager__["a" /* vertexBufferManager */].createIBO( group, 'quad_0123', [0, 1, 2, 3], true );
        
        this.iboCount = 4;
    }
    
    // 
    //  DESC: Generate a scaled frame
    //
    generateScaledFrame( group, textureSize, glyphSize, frameSize, spriteSheetOffset )
    {
        let frame = this.scaledFrame.frame;
        let tSize = textureSize;
        let gSize = glyphSize;
        let vboName = 'scaled_frame_' + frameSize.w + '_' + frameSize.h + '_' + frame.w + '_' + frame.h + '_' + tSize.w + '_' + tSize.h + '_' + gSize.w + '_' + gSize.h;

        this.vbo = __WEBPACK_IMPORTED_MODULE_7__managers_vertexbuffermanager__["a" /* vertexBufferManager */].createScaledFrame(
            group, vboName, this.scaledFrame, textureSize, glyphSize, frameSize, spriteSheetOffset );

        let iboAry = [
            0,1,2,     0,3,1,
            2,4,5,     2,1,4,
            1,6,4,     1,7,6,
            7,8,6,     7,9,8,
            10,9,7,    10,11,9,
            12,11,10,  12,13,11,
            14,10,3,   14,12,10,
            15,3,0,    15,14,3,
            3,7,1,     3,10,7 ];

        // Create the reusable IBO buffer
        this.ibo = __WEBPACK_IMPORTED_MODULE_7__managers_vertexbuffermanager__["a" /* vertexBufferManager */].createIBO( group, 'scaled_frame', iboAry, true );

        // Set the ibo count depending on the number of quads being rendered
        // If the center quad is not used, just adjust the ibo count because
        // the center quad is just reused verts anyways and is that last 6 in the IBO
        // If the frame bottom is not being use, just subtract.
        // Center quad and no frame bottom can't co-exist.
        this.iboCount = 6 * 8;
        if( this.scaledFrame.centerQuad )
            this.iboCount += 6;

        else if( !this.scaledFrame.bottomFrame )
            this.iboCount -= 6 * 3;
    }

    // 
    //  DESC: Generate a scaled frame with a mesh file
    //
    generateScaledFrameMeshFile( group, textureSize, glyphSize, frameSize, spriteSheetOffset )
    {
        // Construct the name used for vbo and ibo
        let name = 'scaled_frame_mesh_' + this.meshFilePath;
        
        let iboAry = [
                0,1,2,     0,3,1,
                2,4,5,     2,1,4,
                1,6,4,     1,7,6,
                7,8,6,     7,9,8,
                10,9,7,    10,11,9,
                12,11,10,  12,13,11,
                14,10,3,   14,12,10,
                15,3,0,    15,14,3 ];

        if( this.scaledFrame.centerQuad )
            Array.prototype.push.apply( iboAry, [ 3,7,1, 3,10,7 ] );

        // See if it already exists before loading the mesh file
        this.vbo = __WEBPACK_IMPORTED_MODULE_7__managers_vertexbuffermanager__["a" /* vertexBufferManager */].isVBO( group, name );
        if( this.vbo === null )
        {
            // Load a mesh from XML file
            let meshFileVertAry = [];
            this.loadMeshFromXML( group, textureSize, frameSize, spriteSheetOffset, 16, meshFileVertAry, iboAry );

            // create the vbo
            this.vbo = __WEBPACK_IMPORTED_MODULE_7__managers_vertexbuffermanager__["a" /* vertexBufferManager */].createScaledFrame(
                group, name, this.scaledFrame, textureSize, glyphSize, frameSize, new __WEBPACK_IMPORTED_MODULE_0__common_rect__["a" /* Rect */], meshFileVertAry );
        }
        
        // Create the reusable IBO buffer
        this.ibo = __WEBPACK_IMPORTED_MODULE_7__managers_vertexbuffermanager__["a" /* vertexBufferManager */].createIBO( group, name, iboAry, true );
        this.iboCount = iboAry.length;
    }
    
    // 
    //  DESC: Load a mesh from XML file
    //
    loadMeshFromXML( group, textureSize, frameSize, spriteSheetOffset, iboOffset, vertAry, iboAry )
    {
        // Check if the width or height is odd. If so, we offset 
        // by 0.5 for proper orthographic rendering
        let additionalOffsetX = 0;
        if( Math.trunc(frameSize.w) % 2 != 0 )
            additionalOffsetX = 0.5;

        let additionalOffsetY = 0;
        if( Math.trunc(frameSize.h) % 2 != 0 )
            additionalOffsetY = 0.5;

        // This converts the data to a center aligned vertex buffer
        let centerAlignSize = new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](-(frameSize.w / 2), (frameSize.h / 2));

        // Open and parse the XML file:
        let node = __WEBPACK_IMPORTED_MODULE_9__utilities_assetholder__["a" /* assetHolder */].get( group, this.meshFilePath );
        let vboNode = node.getElementsByTagName( 'vbo' );
        
        if( vboNode.length )
        {
            let vertNode = vboNode[0].getElementsByTagName( 'vert' );

            for( let i = 0; i < vertNode.length; ++i )
            {
                // Load the 2D vert
                let vert = __WEBPACK_IMPORTED_MODULE_11__utilities_xmlparsehelper__["l" /* loadVertex2d */]( vertNode[i] );
                
                // This converts the data to a center aligned vertex buffer
                vertAry.push( centerAlignSize.w + vert.x + additionalOffsetX );
                vertAry.push( centerAlignSize.h - vert.y + additionalOffsetY );
                vertAry.push( vert.z );
                vertAry.push( spriteSheetOffset.x1 + (vert.u / textureSize.w) );
                vertAry.push( spriteSheetOffset.y1 + (vert.v / textureSize.h) );
            }
        }

        let iboNode = node.getElementsByTagName( 'ibo' );
        if( iboNode.length )
        {
            let iNode = iboNode[0].getElementsByTagName( 'i' );
            
            for( let i = 0; i < iNode.length; ++i )
                iboAry.push( iboOffset + Number(iNode[i].childNodes[0].nodeValue) );
        }
    }
    
    // 
    //  DESC: Is this genType active
    //
    isActive()
    {
        return (this.genType !== __WEBPACK_IMPORTED_MODULE_10__common_defs__["_20" /* EGT_NULL */]);
    }
    
    // 
    //  DESC: Get the frame count
    //
    getFrameCount()
    {
        if( this.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_23" /* EGT_SPRITE_SHEET */] )
            return this.spriteSheet.getCount();
        
        else if( this.texture !== null )
            return 1;

        return 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectVisualData2D;



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_size__ = __webpack_require__(1);

// 
//  FILE NAME:  scaledframe.js
//  DESC:       Class for holding scaled frame data
//




class ScaledFrame
{
    constructor()
    {
        // Size of the frame
        this.frame = new __WEBPACK_IMPORTED_MODULE_0__common_size__["a" /* Size */];

        // Is there a center quad?
        this.centerQuad = true;
    
        // Is there a bottom frame?
        this.bottomFrame = true;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.frame.copy( obj.frame );
        this.centerQuad = obj.centerQuad;
        this.bottomFrame = obj.bottomFrame;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ScaledFrame;



/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__objectvisualdata3d__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_xmlparsehelper__ = __webpack_require__(7);

// 
//  FILE NAME: objectdata3d.js
//  DESC:      Class that holds a 3D object data
//



//import { ObjectPhysicsData3D } from '../objectdatamanager/objectphysicsdata3d';



class ObjectData3D
{
    constructor()
    {
        // Visual data of the object
        this.visualData = new __WEBPACK_IMPORTED_MODULE_0__objectvisualdata3d__["a" /* ObjectVisualData3D */];

        // Physics data of the object
        //CObjectPhysicsData2D m_physicsData;

        // The name of the object data
        this.name = null;

        // The group the object data is in
        this.group = null;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.visualData.copy( obj.visualData );
    }
    
    // 
    //  DESC: Load the object data from the passed in node
    //
    loadObjData( node, group, name )
    {
        this.name = name;
        this.group = group;

        // Load the visual data
        this.visualData.loadObjData( node );

        // Load the physics data
        //m_physicsData.LoadFromNode( node );

    }
    
    // 
    //  DESC: Add the textures to the mesh with the "createFromData" call
    //
    createFromData( group )
    {
        // Create the visuales
        this.visualData.addTexturesToMesh( group );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectData3D;



/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_color__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__managers_texturemanager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_xmlparsehelper__ = __webpack_require__(7);

// 
//  FILE NAME: ojectvisualdata3d.js
//  DESC:      Class containing the 3D object's visual data
//







class ObjectVisualData3D
{
    constructor()
    {
        // Mesh group object
        this.meshGrp = null;

        // Name of the shader
        this.shaderID = null;

        // Initial color of the object
        this.color = new __WEBPACK_IMPORTED_MODULE_0__common_color__["a" /* Color */];

        // mesh file path
        this.meshFilePath = null;
    }
    
    // 
    //  DESC: Copy the passed in data
    //
    copy( obj )
    {
        this.shaderID = obj.shaderID;
        this.meshFilePath = obj.meshFilePath;
        this.color.copy( obj.color );
        this.meshGrp = obj.meshGrp;
    }
    
    // 
    //  DESC: Load the object data
    //
    loadObjData( node )
    {
        let visualNode = node.getElementsByTagName('visual');
        if( visualNode.length )
        {
            let attr = visualNode[0].getAttribute('file');
            if( attr )
                this.meshFilePath = attr;
                
            // The shader node determines which shader to use
            let shaderNode = visualNode[0].getElementsByTagName( 'shader' );
            if( shaderNode.length )
            {
                this.shaderID = shaderNode[0].getAttribute( 'id' );
            }

            // Load the color
            this.color = __WEBPACK_IMPORTED_MODULE_2__utilities_xmlparsehelper__["b" /* loadColor */]( visualNode[0], this.color );
        }
    }
    
    // 
    //  DESC: Add the textures to the mesh
    //
    addTexturesToMesh( group )
    {
        for( let i = 0; i < this.meshGrp.meshAry.length; ++i )
        {
            for( let j = 0; j < this.meshGrp.meshAry[i].textureIndexAry.length; ++j )
            {
                let textIndex = this.meshGrp.meshAry[i].textureIndexAry[j]
                
                let textPath = this.meshGrp.uniqueTexturePathAry[textIndex].path;
                
                this.meshGrp.meshAry[i].textureAry.push( __WEBPACK_IMPORTED_MODULE_1__managers_texturemanager__["a" /* textureManager */].getTexture( group, textPath ) );
            }
        }
    }
    
    // 
    //  DESC: Is this genType active
    //
    isActive()
    {
        return (this.meshGrp !== null);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectVisualData3D;



/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_spritedata__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__symbol2d__ = __webpack_require__(35);

// 
//  FILE NAME: symbolsetview.js
//  DESC:      Symbol set view
//






class SymbolSetView
{
    constructor()
    {
        // Map of the data for creating symbols
        this.symbolSetDataMap = new Map;
        
        // Map of symbols created by the data
        this.symbolSetMap = new Map;
    }
    
    //
    //  DESC: Load thes reel group data from node
    //
    loadFromNode( node, group, name )
    {
        // Get the childern of this node
        let symbolNode = node.children;

        for( let i = 0; i < symbolNode.length; ++i )
        {
            // Get the symbols string id
            let id = symbolNode[i].getAttribute( 'id' );
            
            // Check for duplicate id's
            if( this.symbolSetDataMap.has( id ) )
                throw new Error( `Duplicate symbol id (${id}, ${group}, ${name})!` );

            // Add the array to the map
            let symbViewDataAry = [];
            this.symbolSetDataMap.set( id, symbViewDataAry );
            
            let spriteNode = symbolNode[i].children;

            for( let j = 0; j < spriteNode.length; ++j )
                symbViewDataAry.push( new __WEBPACK_IMPORTED_MODULE_0__common_spritedata__["a" /* SpriteData */]( spriteNode[j], group ) );
        }
    }
    
    //
    //  DESC: Build the visible symbol set
    //
    buildSymbolSetView()
    {
        // Build the symbol set when asked for this group
        if( this.symbolSetMap.size === 0 )
        {
            // Make a visual symbol set for this reel strip.
            for( let [ key, spriteDataAry ] of this.symbolSetDataMap.entries() )
            {
                // Check for duplicate names
                if( this.symbolSetMap.has( key ) )
                    throw new Error( `Duplicate symbol name (${key})!` );

                let symbol = new __WEBPACK_IMPORTED_MODULE_1__symbol2d__["a" /* Symbol2d */]( spriteDataAry, key );
                symbol.init();
                
                this.symbolSetMap.set( key, symbol );
            }
        }
    }
    
    //
    //  DESC: Clean  up the visual symbols
    //
    cleanUp()
    {
        for( let [ key, symbol2D ] of this.symbolSetMap.entries() )
            symbol2D.cleanUp();
    }
    
    //
    //  DESC: Get the vector of sprite data
    //
    getSpriteData( symb )
    {
        let spriteDataAry = this.symbolSetDataMap.get( symb );
        if( !spriteDataAry )
            throw new Error( `View symbol data not found in symbol set (${symb})!` );

        return spriteDataAry;
    }

    //
    //  DESC: Get the symbol set created by the data
    //
    getSymbol( symb )
    {
        // Use the math symbol ID to find the visual symbol
        let symbol = this.symbolSetMap.get( symb );
        if( !symbol )
            throw new Error( `View symbol not found in symbol set (${symb})!` );

        return symbol;

    }   // GetSymbol
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SymbolSetView;



/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_object__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_fontdata__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: spritedata.js
//  DESC:      Sprite data class
//







class SpriteData extends __WEBPACK_IMPORTED_MODULE_0__common_object__["a" /* Object */]
{
    constructor( node, defGroup, defObjName, defAIName, defId = __WEBPACK_IMPORTED_MODULE_2__common_defs__["_63" /* SPRITE_DEFAULT_ID */] )
    {
        super();
        
        this.fontData = null;
        this.name = null;
        this.group = defGroup;
        this.objectName = defObjName;
        this.aiName = defAIName;
        this.id = defId;
        
        // Get the name of this specific sprite instance
        let attr = node.getAttribute( "name" );
        if( attr )
            this.name = attr;
        
        // Get the group this sprite belongs to
        attr = node.getAttribute( "group" );
        if( attr )
            this.group = attr;
        
        // Get the object data name
        attr = node.getAttribute( "objectName" );
        if( attr )
            this.objectName = attr;

        // Get the sprite's AI name
        attr = node.getAttribute( "aiName" );
        if( attr )
            this.aiName = attr;

        // Get the sprite's unique id number
        attr = node.getAttribute( "id" );
        if( attr )
            this.id = Number(attr);
        
        // visible property
        attr = node.getAttribute( 'visible' );
        if( attr )
            this.setVisible( attr === 'true' );
        
        // Need to check if the font node is present
        let fontNode = node.getElementsByTagName( 'font' );
        if( fontNode.length )
        {
            this.fontData = new __WEBPACK_IMPORTED_MODULE_1__common_fontdata__["a" /* FontData */];
            
            // FontData class loads via getElementsByTagName( 'font' )
            // so just pass in the node and NOT the font node
            this.fontData.loadFromNode( node );
        }

        // Load the transform data from node
        this.loadTransFromNode( node );
    }
    
    copy( obj )
    {
        this.group = obj.group;
        this.objectName = obj.objectName;
        this.aiName = obj.aiName;
        this.id = obj.id;
        
        copyTransform( obj );
        
        if( this.fontData )
            this.fontData.copy( obj.fontData );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpriteData;


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_xmlparsehelper__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__defs__ = __webpack_require__(0);

// 
//  FILE NAME: fontproperties.js
//  DESC:      font properties class
//






class FontProperties
{
    constructor( fontName = null, hAlign = __WEBPACK_IMPORTED_MODULE_1__defs__["_24" /* EHA_HORZ_CENTER */], vAlign = __WEBPACK_IMPORTED_MODULE_1__defs__["_53" /* EVA_VERT_CENTER */], kerning = 0, spaceCharKerning = 0, lineWrapWidth = -1, lineWrapHeight = 0 )
    {
        // font to use
        this.fontName = fontName;

        // horzontal alignment
        this.hAlign = hAlign;

        // vertical alignment
        this.vAlign = vAlign;

        // distance between each character
        this.kerning = kerning;

        // special kerning just for the space character
        this.spaceCharKerning = spaceCharKerning;

        // width of line to force wrap
        this.lineWrapWidth = lineWrapWidth;

        // add spacing to the lines
        this.lineWrapHeight = 0;
    }
    
    // 
    //  Copy the data
    //
    copy( obj )
    {
        this.fontName = obj.fontName;
        this.hAlign = obj.hAlign;
        this.vAlign = obj.vAlign;
        this.kerning = obj.kerning;
        this.spaceCharKerning = obj.spaceCharKerning;
        this.lineWrapWidth = obj.lineWrapWidth;
        this.lineWrapHeight = obj.lineWrapHeight;
    }
    
    //
    //  DESC: Load the font properties from XML node
    //
    loadFromNode( node )
    {
        // Get the must have font name
        let attr = node.getAttribute( 'fontName' );
        if( attr )
            this.fontName = attr;

        // Get the attributes node
        let attrNode = node.getElementsByTagName( 'attributes' );
        if( attrNode.length )
        {
            attr = attrNode[0].getAttribute( 'kerning' );
            if( attr )
                this.kerning = Number(attr);

            attr = attrNode[0].getAttribute( 'spaceCharKerning' );
            if( attr )
                this.spaceCharKerning = Number(attr);

            attr = attrNode[0].getAttribute( 'lineWrapWidth' );
            if( attr )
                this.lineWrapWidth = Number(attr);

            attr = attrNode[0].getAttribute( 'lineWrapHeight' );
            if( attr )
                this.lineWrapHeight = Number(attr);
        }

        // Get the alignment node
        let alignmentNode = node.getElementsByTagName( 'alignment' );
        if( alignmentNode.length )
        {
            // Set the default alignment
            this.hAlign = __WEBPACK_IMPORTED_MODULE_0__utilities_xmlparsehelper__["d" /* loadHorzAlignment */]( alignmentNode[0], __WEBPACK_IMPORTED_MODULE_1__defs__["_24" /* EHA_HORZ_CENTER */] );
            this.vAlign = __WEBPACK_IMPORTED_MODULE_0__utilities_xmlparsehelper__["k" /* loadVertAlignment */]( alignmentNode[0], __WEBPACK_IMPORTED_MODULE_1__defs__["_53" /* EVA_VERT_CENTER */] );
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FontProperties;




/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__2d_sprite2d__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_matrix__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: spritechild2d.js
//  DESC:      Class specific for child sprites where the parent does
//             a lot of movement to optimize matrix translations for the
//             child and parent.
//







class SpriteChild2D extends __WEBPACK_IMPORTED_MODULE_0__2d_sprite2d__["a" /* Sprite2D */]
{
    constructor( objData, id = __WEBPACK_IMPORTED_MODULE_2__common_defs__["_63" /* SPRITE_DEFAULT_ID */] )
    {
        super( objData, id );
        
        // final matrix
        this.finalMatrix = new __WEBPACK_IMPORTED_MODULE_1__utilities_matrix__["a" /* Matrix */];
    }
    
    //
    //  DESC: Transform
    //
    transform( matrix = null, tranformWorldPos = null )
    {
        this.parameters.remove( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_68" /* WAS_TRANSFORMED */] );

        if( matrix )
        {
            if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_65" /* TRANSFORM */] ) )
                this.transformLocal( this.matrix );
        
            if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_68" /* WAS_TRANSFORMED */] ) || tranformWorldPos )
            {
                this.parameters.add( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_68" /* WAS_TRANSFORMED */] );
                
                this.finalMatrix.copy( this.matrix );

                this.finalMatrix.mergeMatrix( matrix.matrix );
            }
        }
        else
        {
            if( this.parameters.isSet( __WEBPACK_IMPORTED_MODULE_2__common_defs__["_68" /* WAS_TRANSFORMED */] ) )
                this.transformLocal( this.finalMatrix );
        }
    }
    
    // 
    //  DESC: do the render
    //
    render( matrix )
    {
        if( this.isVisible() )
        {
            this.visualComponent.render( this.finalMatrix, matrix );
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpriteChild2D;



/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__managers_shadermanager__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__managers_texturemanager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__managers_vertexbuffermanager__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__managers_fontmanager__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_fontdata__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utilities_matrix__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_color__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_vertex2d__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__system_device__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__common_defs__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utilities_genfunc__ = __webpack_require__(4);

// 
//  FILE NAME:  visualcomponent2d.js
//  DESC:       Class for handling the visual part of the sprite
//
















// Global final matrix to be reused by every render call so that an object specific
// one doesn't have to be created each time a render call is made or a perminate one
// allocated and heald within each class
var gFinalMatrix = new __WEBPACK_IMPORTED_MODULE_5__utilities_matrix__["a" /* Matrix */];

class VisualComponent2D
{
    constructor( visualData )
    {
        this.visualData = visualData;
        this.shaderData = null;
        this.vertexLocation = null;
        this.text0Location = null;
        this.uvLocation = null;
        this.matrixLocation = null;
        this.colorLocation = null;
        this.glyphLocation = null;
        this.fontData = null;
        this.VERTEX_BUF_SIZE = 20;
        this.drawMode = ((visualData.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_21" /* EGT_QUAD */]) || (visualData.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_23" /* EGT_SPRITE_SHEET */])) ? __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].TRIANGLE_FAN : __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].TRIANGLES;
        this.indiceType = (visualData.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_18" /* EGT_FONT */]) ? __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].UNSIGNED_SHORT : __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].UNSIGNED_BYTE;
        this.frameIndex = 0;
        this.glyphUV = null;
        this.vbo = visualData.vbo;
        this.ibo = visualData.ibo;
        this.iboCount = visualData.iboCount;
        this.texture = visualData.texture;
        this.color = new __WEBPACK_IMPORTED_MODULE_6__common_color__["a" /* Color */];
        
        if( visualData.isActive() )
        {
            this.shaderData = __WEBPACK_IMPORTED_MODULE_0__managers_shadermanager__["a" /* shaderManager */].getShaderData( visualData.shaderID );

            // Common shader members
            this.vertexLocation = this.shaderData.getLocation( 'in_position' );
            this.matrixLocation = this.shaderData.getLocation( 'cameraViewProjMatrix' );
            this.colorLocation = this.shaderData.getLocation( 'color' );
            
            // Do we have a texture? This could be a solid rect
            if( (this.texture !== null) || (visualData.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_18" /* EGT_FONT */]) )
            {
                this.uvLocation = this.shaderData.getLocation( 'in_uv' );
                this.text0Location = this.shaderData.getLocation( 'text0' );
            }

            // Is this a sprite sheet? Get the glyph rect position
            if( visualData.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_23" /* EGT_SPRITE_SHEET */] )
            {
                this.glyphLocation = this.shaderData.getLocation( 'glyphRect' );

                this.glyphUV = visualData.spriteSheet.getGlyph().uv;
                this.frameIndex = visualData.spriteSheet.defaultIndex;
                
                // Local vertex scale for sprite sheets that might have glyphs of different sizes
                this.vertexScale = new __WEBPACK_IMPORTED_MODULE_7__common_size__["a" /* Size */];
                this.vertexScale.copy( this.visualData.vertexScale );
            }

            // Allocate the storage for the font if this is a font sprite
            if( visualData.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_18" /* EGT_FONT */] )
                this.fontData = new __WEBPACK_IMPORTED_MODULE_4__common_fontdata__["a" /* FontData */];
            
            this.color.copy( this.visualData.color );
        }
    }
    
    //
    //  DESC: Delete the custom VBO for this font
    //
    deleteFontVBO()
    {
        // Delete the VBO if this is a font
        if( (this.visualData.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_18" /* EGT_FONT */]) && (this.vbo !== null) )
        {
            __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].deleteBuffer( this.vbo );
            this.vbo = null;
        }

        // The IBO for the font is managed by the vertex buffer manager.
        // Font IBO are all the same with the only difference being
        // length of the character string.
    }

    //
    //  DESC: do the render
    //
    render( objMatrix, projMatrix )
    {
        if( this.allowRender() )
        {
            // Bind the VBO and IBO
            __WEBPACK_IMPORTED_MODULE_2__managers_vertexbuffermanager__["a" /* vertexBufferManager */].bind( this.vbo, this.ibo );

            // Bind the shader.
            __WEBPACK_IMPORTED_MODULE_0__managers_shadermanager__["a" /* shaderManager */].bind( this.shaderData );
            
            // Setup the vertex attribute shader data
            __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].vertexAttribPointer( this.vertexLocation, 3, __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].FLOAT, false, this.VERTEX_BUF_SIZE, 0 );
            
            if( this.texture )
            {
                // Bind the texture
                __WEBPACK_IMPORTED_MODULE_1__managers_texturemanager__["a" /* textureManager */].bind( this.texture.id );
                __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].uniform1i( this.text0Location, 0 ); // 0 = TEXTURE0

                // Setup the UV attribute shade data
                __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].vertexAttribPointer( this.uvLocation, 2, __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].FLOAT, false, this.VERTEX_BUF_SIZE, 12 );
            }
            
            // Send the color to the shader
            __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].uniform4fv( this.colorLocation, this.color.data );
            
            // If this is a quad, we need to take into account the vertex scale
            if( this.visualData.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_21" /* EGT_QUAD */] )
            {
                // Calculate the final matrix
                gFinalMatrix.initilizeMatrix();
                gFinalMatrix.setScaleFromSize( this.visualData.vertexScale );
                gFinalMatrix.mergeMatrix( objMatrix.matrix );
                gFinalMatrix.mergeMatrix( projMatrix.matrix );

                // Send the final matrix to the shader
                __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].uniformMatrix4fv( this.matrixLocation, false, gFinalMatrix.matrix );
            }
            // If this is a sprite sheet, we need to take into account the vertex scale and glyph rect
            else if( this.visualData.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_23" /* EGT_SPRITE_SHEET */] )
            {
                // Calculate the final matrix
                gFinalMatrix.initilizeMatrix();
                gFinalMatrix.setScaleFromSize( this.vertexScale );
                gFinalMatrix.mergeMatrix( objMatrix.matrix );
                gFinalMatrix.mergeMatrix( projMatrix.matrix );

                // Send the final matrix to the shader
                __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].uniformMatrix4fv( this.matrixLocation, false, gFinalMatrix.matrix );

                // Send the glyph rect
                __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].uniform4fv( this.glyphLocation, this.glyphUV.data );
            }
            // this is for scaled frame and font rendering
            else
            {
                gFinalMatrix.initilizeMatrix();
                gFinalMatrix.mergeMatrix( objMatrix.matrix );
                gFinalMatrix.mergeMatrix( projMatrix.matrix );
                
                __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].uniformMatrix4fv( this.matrixLocation, false, gFinalMatrix.matrix );
            }
            
            __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].drawElements(this.drawMode, this.iboCount, this.indiceType, 0);
        }
    }

    //
    //  DESC: Load the font properties from XML node
    //
    loadFontPropFromNode( node )
    {
        if( this.fontData )
            this.fontData.loadFromNode( node );
    }
    
    //
    //  DESC: Set the font properties
    //
    setFontProperties( fontName, hAlign = null, vAlign = null, kerning = null, sKern = null, lineWrapWidth = null, lineWrapHeight = null )
    {
        if( this.fontData )
        {
            this.fontData.fontProp.fontName = fontName;
            
            if( hAlign )
                this.fontData.fontProp.hAlign = hAlign;
            
            if( vAlign )
                this.fontData.fontProp.hAlign = vAlign;
            
            if( kerning )
                this.fontData.fontProp.kerning = kerning;
            
            if( sKern )
                this.fontData.fontProp.spaceCharKerning = sKern;
            
            if( lineWrapWidth )
                this.fontData.fontProp.lineWrapWidth = lineWrapWidth;
            
            if( lineWrapHeight )
                this.fontData.fontProp.lineWrapHeight = lineWrapHeight;
        }
    }
    
    //
    //  DESC: Create the font string from data
    //
    createFontStringFromData()
    {
        if( (this.fontData !== null) && this.fontData.fontString )
            this.createFontString( this.fontData.fontString );
    }

    //
    //  DESC: Create the font string
    //
    createFontString( fontString )
    {
        // Qualify if we want to build the font string
        if( (this.fontData !== null) &&
            (fontString !== '') &&
            (this.fontData.fontProp.fontName !== null) &&
            ((fontString !== this.fontData.fontString) || (this.vbo === null)) )
        {
            this.fontData.fontStrSize.reset();
            let lastCharDif = 0;

            let font = __WEBPACK_IMPORTED_MODULE_3__managers_fontmanager__["a" /* fontManager */].getFont( this.fontData.fontProp.fontName );

            this.texture = font.texture;

            this.fontData.fontString = fontString;

            // count up the number of space characters
            let spaceCharCount = __WEBPACK_IMPORTED_MODULE_11__utilities_genfunc__["a" /* countStrOccurrence */]( this.fontData.fontString, ' ' );

            // count up the number of bar | characters
            let barCharCount = __WEBPACK_IMPORTED_MODULE_11__utilities_genfunc__["a" /* countStrOccurrence */]( this.fontData.fontString, '|' );

            // Size of the allocation
            const charCount = this.fontData.fontString.length - spaceCharCount - barCharCount;
            this.iboCount = charCount * 6;
            
            // Set a flag to indicate if the IBO should be built
            const BUILD_FONT_IBO = (this.iboCount > __WEBPACK_IMPORTED_MODULE_2__managers_vertexbuffermanager__["a" /* vertexBufferManager */].currentMaxFontIndices);
            
            // Allocate the vert array
            let vertAry = new Array(charCount * 4 * 5);

            // Create a buffer to hold the indicies
            let indexAry = null;
            
            // Should we build or rebuild the font IBO
            if( BUILD_FONT_IBO )
                indexAry = new Array(this.iboCount);

            let xOffset = 0;
            let width = 0;
            let lineHeightOffset = 0;
            let lineHeightWrap = font.lineHeight + font.vertPadding + this.fontData.fontProp.lineWrapHeight;
            let initialHeightOffset = font.baselineOffset + font.vertPadding;
            let lineSpace = font.lineHeight - font.baselineOffset;

            let counter = 0;
            let vertAryIndex = 0;
            let lineCount = 0;

            // Get the size of the texture
            let textureSize = font.texture.size;

            // Handle the horizontal alignment
            let lineWidthOffsetAry = this.calcLineWidthOffset( font, this.fontData.fontString );

            // Set the initial line offset
            xOffset = lineWidthOffsetAry[lineCount++];

            // Handle the vertical alighnmenrt
            if( this.fontData.fontProp.vAlign === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_54" /* EVA_VERT_TOP */] )
                lineHeightOffset = -initialHeightOffset;

            if( this.fontData.fontProp.vAlign === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_53" /* EVA_VERT_CENTER */] )
            {
                lineHeightOffset = -(initialHeightOffset - ((font.baselineOffset-lineSpace) / 2) - font.vertPadding);

                if( lineWidthOffsetAry.length > 1 )
                    lineHeightOffset = ((lineHeightWrap * lineWidthOffsetAry.length) / 2) - font.baselineOffset;
            }

            else if( this.fontData.fontProp.vAlign === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_52" /* EVA_VERT_BOTTOM */] )
            {
                lineHeightOffset = -(initialHeightOffset - font.baselineOffset - font.vertPadding);

                if( lineWidthOffsetAry.length > 1 )
                    lineHeightOffset += (lineHeightWrap * (lineWidthOffsetAry.length-1));
            }

            // Remove any fractional component of the line height offset
            lineHeightOffset = Math.trunc(lineHeightOffset);

            // Setup each character in the vertex buffer
            for( let i = 0; i < this.fontData.fontString.length; ++i )
            {
                let id = this.fontData.fontString.charCodeAt(i);

                // Line wrap if '|' character was used
                if( id === __WEBPACK_IMPORTED_MODULE_10__common_defs__["d" /* CHAR_CODE_PIPE */] )
                {
                    xOffset = lineWidthOffsetAry[lineCount];
                    width = 0;

                    lineHeightOffset += -lineHeightWrap;
                    ++lineCount;
                }
                else
                {
                    // See if we can find the character
                    let charData = font.getCharData(id);

                    // Ignore space characters
                    if( id != __WEBPACK_IMPORTED_MODULE_10__common_defs__["e" /* CHAR_CODE_SPACE */] )
                    {
                        let rect = charData.rect;

                        let yOffset = (font.lineHeight - rect.y2 - charData.offset.h) + lineHeightOffset;

                        // Check if the width or height is odd. If so, we offset
                        // by 0.5 for proper orthographic rendering
                        // speed enhancement - if( Math.trunc(rect.x2) % 2 != 0 )
                        let additionalOffsetX = 0;
                        if( Math.trunc(rect.x2) & 1 !== 0 )
                            additionalOffsetX = 0.5;

                        let additionalOffsetY = 0;
                        if( Math.trunc(rect.y2) & 1 !== 0 )
                            additionalOffsetY = 0.5;
                        
                        vertAry[vertAryIndex]   = xOffset + charData.offset.w + additionalOffsetX;
                        vertAry[vertAryIndex+1] = yOffset + additionalOffsetY;
                        vertAry[vertAryIndex+2] = 0;
                        vertAry[vertAryIndex+3] = rect.x1 / textureSize.w;
                        vertAry[vertAryIndex+4] = (rect.y1 + rect.y2) / textureSize.h;

                        // Calculate the second vertex of the first face
                        vertAry[vertAryIndex+5] = xOffset + rect.x2 + charData.offset.w + additionalOffsetX;
                        vertAry[vertAryIndex+6] = yOffset + rect.y2 + additionalOffsetY;
                        vertAry[vertAryIndex+7] = 0;
                        vertAry[vertAryIndex+8] = (rect.x1 + rect.x2) / textureSize.w;
                        vertAry[vertAryIndex+9] = rect.y1 / textureSize.h;

                        // Calculate the third vertex of the first face
                        vertAry[vertAryIndex+10] = vertAry[vertAryIndex];
                        vertAry[vertAryIndex+11] = vertAry[vertAryIndex+6];
                        vertAry[vertAryIndex+12] = 0;
                        vertAry[vertAryIndex+13] = vertAry[vertAryIndex+3];
                        vertAry[vertAryIndex+14] = vertAry[vertAryIndex+9];

                        // Calculate the second vertex of the second face
                        vertAry[vertAryIndex+15] = vertAry[vertAryIndex+5];
                        vertAry[vertAryIndex+16] = vertAry[vertAryIndex+1];
                        vertAry[vertAryIndex+17] = 0;
                        vertAry[vertAryIndex+18] = vertAry[vertAryIndex+8];
                        vertAry[vertAryIndex+19] = vertAry[vertAryIndex+4];
                        
                        vertAryIndex += 20;

                        if( BUILD_FONT_IBO )
                        {
                            // Create the indicies into the VBO
                            let arrayIndex = counter * 6;
                            let vertIndex = counter * 4;

                            indexAry[arrayIndex]   = vertIndex;
                            indexAry[arrayIndex+1] = vertIndex+1;
                            indexAry[arrayIndex+2] = vertIndex+2;

                            indexAry[arrayIndex+3] = vertIndex;
                            indexAry[arrayIndex+4] = vertIndex+3;
                            indexAry[arrayIndex+5] = vertIndex+1;
                        }

                        ++counter;
                    }

                    // Inc the font position
                    let inc = charData.xAdvance + this.fontData.fontProp.kerning + font.horzPadding;

                    // Add in any additional spacing for the space character
                    if( id === __WEBPACK_IMPORTED_MODULE_10__common_defs__["e" /* CHAR_CODE_SPACE */] )
                        inc += this.fontData.fontProp.spaceCharKerning;

                    width += inc;
                    xOffset += inc;

                    // Get the longest width of this font string
                    if( this.fontData.fontStrSize.w < width )
                    {
                        this.fontData.fontStrSize.w = width;

                        // This is the space between this character and the next.
                        // Save this difference so that it can be subtracted at the end
                        lastCharDif = inc - charData.rect.x2;
                    }

                    // Wrap to another line
                    if( (id === __WEBPACK_IMPORTED_MODULE_10__common_defs__["e" /* CHAR_CODE_SPACE */] ) && (this.fontData.fontProp.lineWrapWidth > 0) )
                    {
                        let nextWord = 0;

                        // Get the length of the next word to see if if should wrap
                        for( let j = i+1; j < this.fontData.fontString.length; ++j )
                        {
                            id = this.fontData.fontString[j];

                            if( id != __WEBPACK_IMPORTED_MODULE_10__common_defs__["d" /* CHAR_CODE_PIPE */] )
                            {
                                // See if we can find the character
                                let anotherCharData = font.getCharData(id);

                                // Break here when space is found
                                // Don't add the space to the size of the next word
                                if( id === __WEBPACK_IMPORTED_MODULE_10__common_defs__["e" /* CHAR_CODE_SPACE */] )
                                    break;

                                // Don't count the
                                nextWord += anotherCharData.xAdvance + this.fontData.fontProp.kerning + font.horzPadding;
                            }
                        }

                        if( width + nextWord >= this.fontData.fontProp.lineWrapWidth )
                        {
                            xOffset = lineWidthOffsetAry[lineCount++];
                            width = 0;

                            lineHeightOffset += -lineHeightWrap;
                        }
                    }
                }
            }

            // Subtract the extra space after the last character
            this.fontData.fontStrSize.w -= lastCharDif;
            this.fontData.fontStrSize.h = font.lineHeight;

            // Save the data
            // If one doesn't exist, create the VBO and IBO for this font
            if( this.vbo === null )
                this.vbo = __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].createBuffer();

            __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].ARRAY_BUFFER, this.vbo );
            __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].bufferData( __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].ARRAY_BUFFER, new Float32Array(vertAry), __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].STATIC_DRAW );
            __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].bindBuffer( __WEBPACK_IMPORTED_MODULE_9__system_device__["b" /* gl */].ARRAY_BUFFER, null );

            // All fonts share the same IBO because it's always the same and the only difference is it's length
            // This updates the current IBO if it exceeds the current max
            this.ibo = __WEBPACK_IMPORTED_MODULE_2__managers_vertexbuffermanager__["a" /* vertexBufferManager */].createDynamicFontIBO( __WEBPACK_IMPORTED_MODULE_3__managers_fontmanager__["a" /* fontManager */].groupName, 'dynamic_font_ibo', indexAry, this.iboCount );
        }
        else if( (this.fontData !== null) &&
                 (fontString !== '') &&
                 (fontString !== this.fontData.fontString) &&
                 (this.vbo !== null) )
        {
            this.fontData.fontString = '';
        }
    }

    //
    //  DESC: Add up all the character widths
    //
    calcLineWidthOffset( font, str )
    {
        let firstCharOffset = 0;
        let lastCharOffset = 0;
        let spaceWidth = 0;
        let width = 0;
        let counter = 0;
        let lineWidthOffsetAry = [];

        for( let i = 0; i < str.length; ++i )
        {
            let id = str.charCodeAt(i);

            // Line wrap if '|' character was used
            if( id === __WEBPACK_IMPORTED_MODULE_10__common_defs__["d" /* CHAR_CODE_PIPE */] )
            {
                // Add the line width to the vector based on horz alignment
                this.addLineWithToAry( font, lineWidthOffsetAry, this.fontData.fontProp.hAlign, width, firstCharOffset, lastCharOffset );

                counter = 0;
                width = 0;
            }
            else
            {
                // Get the next character
                let charData = font.getCharData( id );

                if(counter === 0)
                    firstCharOffset = charData.offset.w;

                spaceWidth = charData.xAdvance + this.fontData.fontProp.kerning + font.horzPadding;

                // Add in any additional spacing for the space character
                if( id === __WEBPACK_IMPORTED_MODULE_10__common_defs__["e" /* CHAR_CODE_SPACE */] )
                    spaceWidth += this.fontData.fontProp.spaceCharKerning;

                width += spaceWidth;

                if( id != __WEBPACK_IMPORTED_MODULE_10__common_defs__["e" /* CHAR_CODE_SPACE */] )
                    lastCharOffset = charData.offset.w;

                ++counter;
            }

            // Wrap to another line
            if( (id === __WEBPACK_IMPORTED_MODULE_10__common_defs__["e" /* CHAR_CODE_SPACE */]) && (this.fontData.fontProp.lineWrapWidth > 0) )
            {
                let nextWord = 0;

                // Get the length of the next word to see if if should wrap
                for( let j = i+1; j < str.length; ++j )
                {
                    id = str[j];

                    if( id != __WEBPACK_IMPORTED_MODULE_10__common_defs__["d" /* CHAR_CODE_PIPE */] )
                    {
                        // See if we can find the character
                        let charData = font.getCharData(id);

                        // Break here when space is found
                        // Don't add the space to the size of the next word
                        if( id === __WEBPACK_IMPORTED_MODULE_10__common_defs__["e" /* CHAR_CODE_SPACE */] )
                            break;

                        // Don't count the
                        nextWord += charData.xAdvance + this.fontData.fontProp.kerning + font.horzPadding;
                    }
                }

                if( width + nextWord >= this.fontData.fontProp.lineWrapWidth )
                {
                    // Add the line width to the vector based on horz alignment
                    this.addLineWithToAry( font, lineWidthOffsetAry, this.fontData.fontProp.hAlign, width-spaceWidth, firstCharOffset, lastCharOffset );

                    counter = 0;
                    width = 0;
                }
            }
        }

        // Add the line width to the vector based on horz alignment
        this.addLineWithToAry( font, lineWidthOffsetAry, this.fontData.fontProp.hAlign, width, firstCharOffset, lastCharOffset );

        return lineWidthOffsetAry;
    }

    //
    //  DESC: Add the line width to the array based on horz alignment
    //
    addLineWithToAry( font, lineWidthOffsetAry, hAlign, width, firstCharOffset, lastCharOffset )
    {
        if( hAlign === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_25" /* EHA_HORZ_LEFT */] )
            lineWidthOffsetAry.push(-(firstCharOffset + font.horzPadding));

        else if( hAlign === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_24" /* EHA_HORZ_CENTER */] )
            lineWidthOffsetAry.push(-((width - font.horzPadding) / 2));

        else if( hAlign === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_26" /* EHA_HORZ_RIGHT */] )
            lineWidthOffsetAry.push(-(width - lastCharOffset - font.horzPadding));

        // Remove any fractional component of the last index
        lineWidthOffsetAry[lineWidthOffsetAry.length-1] = Math.trunc(lineWidthOffsetAry[lineWidthOffsetAry.length-1]);
    }
    
    //
    //  DESC: Get/Set the displayed font string
    //
    getFontString()
    {
        if( this.fontData === null )
            throw new Error( `Can't ask for the font string from a sprite that is not a sprite font!` );

        return this.fontData.fontString;
    }

    setFontString( fontString )
    {
        if( this.fontData === null )
            throw new Error( `Can't set a font string for a sprite that is not a sprite font!` );
        
        this.fontData.fontString = fontString;
    }
    
    //
    //  DESC: Is rendering allowed?
    //
    allowRender()
    {
        return ((this.visualData.genType > __WEBPACK_IMPORTED_MODULE_10__common_defs__["_20" /* EGT_NULL */]) && (this.visualData.genType < __WEBPACK_IMPORTED_MODULE_10__common_defs__["_18" /* EGT_FONT */])) ||
               ((this.visualData.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_18" /* EGT_FONT */]) && this.fontData.fontString);
    }
    
    //
    //  DESC: Is this a font sprite
    //
    isFontSprite()
    {
        return (this.visualData.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_18" /* EGT_FONT */]);
    }
    
    //
    //  DESC: Set the frame ID from index
    //
    setFrame( index )
    {
        // Only sprite sheet animations currently supported.
        if( this.visualData.genType === __WEBPACK_IMPORTED_MODULE_10__common_defs__["_23" /* EGT_SPRITE_SHEET */] )
        {
            let glyph = this.visualData.spriteSheet.getGlyph( index );
            
            this.vertexScale.w = glyph.size.w * this.visualData.defaultUniformScale;
            this.vertexScale.h = glyph.size.h * this.visualData.defaultUniformScale;
            
            this.glyphUV = glyph.uv;
            
            this.frameIndex = index;
        }
    }
    
    //
    //  DESC: Get the font size
    //
    getFontSize()
    {
        if( !this.fontData )
        {
            throw new Error( `Can't ask for the font size from a sprite that is not a sprite font!` );
            return null;
        }

        return this.fontData.fontStrSize;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VisualComponent2D;



/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__physicsworldmanager__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__);

// 
//  FILE NAME: physicscomponent2d.js
//  DESC:      Class for handling the physics part of the sprite.
//







class PhysicsComponent2D
{
    constructor( physicsData )
    {
        // Body type
        this.bodyType = null;

        // The physics body the sprite belongs to
        this.body = null;

        // Pixels to meters conversion
        this.pixelsToMeters = 0;
        this.metersToPixels = 0;

        // Pointer to the world
        // NOTE: Do not free. We don't own this pointer.
        this.world = null;
        
        if( physicsData.isActive() )
        {
            this.world = __WEBPACK_IMPORTED_MODULE_0__physicsworldmanager__["a" /* physicsWorldManager */].getWorld( physicsData.world );

            // Re-init the constants to the values needed
            this.metersToPixels = this.world.pixelsPerMeter;
            this.pixelsToMeters = 1.0 / this.metersToPixels;
        }
    }
    
    // 
    //  DESC: Init the physics by creating the body and fixture
    //  NOTE: Function must be called externally at the right time
    //        when the sprite has been setup with it's initial offsets
    //
    init( sprite )
    {
        if( this.world !== null )
        {
            this.createBody( sprite );
            this.createFixture( sprite );
        }
    }
    
    // 
    //  DESC: Create the body
    //
    createBody( sprite )
    {
        let physicsData = sprite.objData.physicsData;
        let worldDef = {
            type : physicsData.bodyType,
            position : __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Vec2"]( sprite.pos.x * this.pixelsToMeters, -(sprite.pos.y * this.pixelsToMeters) ),
            angle : -sprite.rot.z,

            linearVelocity : __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Vec2"].zero(),
            angularVelocity : 0.0,

            linearDamping : physicsData.linearDamping,
            angularDamping : physicsData.angularDamping,

            fixedRotation : physicsData.fixedRotation,
            bullet : false,
            gravityScale : 1.0,

            allowSleep : true,
            awake : true,
            active : true,

            userData : sprite };

        // Create the body
        this.body = this.world.createBody( worldDef );
    }

    // 
    //  DESC: Create the fixture
    //
    createFixture( sprite )
    {
        let fixtureAry = sprite.objData.physicsData.fixtureAry;

        for( let i = 0; i < fixtureAry.length; ++i )
        {
            // Create the fixture
            if( fixtureAry[i].shape === __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Circle"].TYPE )
                this.createCircularShapeFixture( sprite, fixtureAry[i] );

            else if( fixtureAry[i].shape === __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Edge"].TYPE )
                this.createEdgeShapeFixture( sprite, fixtureAry[i] );

            else if( fixtureAry[i].shape === __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Polygon"].TYPE )
                this.createPolygonShapeFixture( sprite, fixtureAry[i] );

            else if( fixtureAry[i].shape === __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Chain"].TYPE )
                this.createChainShapeFixture( sprite, fixtureAry[i] );
        }
    }
    
    // 
    //  DESC: Create the circular shape fixture
    //
    getFixtureDef( sprite, fixture )
    {
        let fixtureDef = {
            userData : sprite,
            friction : fixture.friction,
            restitution : fixture.restitution,
            density : fixture.density,
            isSensor : fixture.sensor,

            filterGroupIndex : 0,
            filterCategoryBits : 0x0001,
            filterMaskBits : 0xFFFF };
        
        return fixtureDef;
    }
    
    // 
    //  DESC: Create the circular shape fixture
    //
    createCircularShapeFixture( sprite, fixture )
    {
        this.body.createFixture(
            __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Circle"]( (fixture.radius * sprite.scale.x) * this.pixelsToMeters ),
            this.getFixtureDef( sprite, fixture ) );
    }

    // 
    //  DESC: Create the edge shape fixture
    //  NOTE: An edge is a line segment of two points
    //        This is no different then making a polygon from points
    //
    createEdgeShapeFixture( sprite, fixture )
    {
        // Do a sanity check because we need two points to define an edge
        if( fixture.vertAry.length !== 2 )
            throw new Error( `Physics object has incorrect number of points defined (${fixture.vertAry.length})!` );

        // Apply scale to the size and divide by 2
        let size = new __WEBPACK_IMPORTED_MODULE_1__common_size__["a" /* Size */](
            sprite.objData.size.w * sprite.scale.x * 0.5,
            sprite.objData.size.h * sprite.scale.y * 0.5 );

        // Convert the points to world location in meters
        let Vec2Ary = [];
        this.convertPoints( Vec2Ary, fixture, size, sprite.scale );

        this.body.createFixture(
            __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Edge"]( Vec2Ary[0], Vec2Ary[1] ),
            this.getFixtureDef( sprite, fixture ) );
    }

    // 
    //  DESC: Create the polygon shape fixture
    //
    createPolygonShapeFixture( sprite, fixture )
    {
        let Vec2Ary = [];

        // Apply scale to the size and divide by 2
        let size = new __WEBPACK_IMPORTED_MODULE_1__common_size__["a" /* Size */](
            sprite.objData.size.w * sprite.scale.x * 0.5,
            sprite.objData.size.h * sprite.scale.y * 0.5 );

        // Is this polygon shape defined by a vector of points?
        if( fixture.vertAry.length )
        {
            // Convert the points to world location in meters
            this.convertPoints( Vec2Ary, fixture, size, sprite.scale );
        }
        
        // If vector points are not supplied, build a square based on the object size
        else
        {
            // Bottom and left mod have their signs flipped so that a positive mod always means
            // expansion of the side, and a negative mod always means a contraction of the side
            let topMod = fixture.topMod * sprite.scale.y;
            let bottomMod = -fixture.bottomMod * sprite.scale.y;
            let leftMod = -fixture.leftMod * sprite.scale.x;
            let rightMod = fixture.rightMod * sprite.scale.x;

            // Convert to meters
            // Box2D polygons are defined using Counter Clockwise Winding (CCW)
            Vec2Ary.push(
                __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Vec2"](
                    (-size.w + leftMod) * this.pixelsToMeters,
                    (size.h + topMod) * this.pixelsToMeters ) );

            Vec2Ary.push(
                __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Vec2"](
                    (-size.w + leftMod) * this.pixelsToMeters,
                    (-size.h + bottomMod) * this.pixelsToMeters ) );

            Vec2Ary.push(
                __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Vec2"](
                    (size.w + rightMod) * this.pixelsToMeters,
                    (-size.h + bottomMod) * this.pixelsToMeters ) );

            Vec2Ary.push(
                __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Vec2"](
                    (size.w + rightMod) * this.pixelsToMeters,
                    (size.h + topMod) * this.pixelsToMeters ) );
        }

        this.body.createFixture(
            __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Polygon"]( Vec2Ary ),
            this.getFixtureDef( sprite, fixture ) );
    }

    // 
    //  DESC: Create the chain shape fixture
    //
    createChainShapeFixture( sprite, fixture )
    {
        // Do a sanity check because we need more then 1 point to define a chain
        if( fixture.vertAry.length > 1 )
            throw new Error( `Physics object has incorrect number of points defined (${fixture.vertAry.length})!` );
        
        // Apply scale to the size and divide by 2
        let size = new __WEBPACK_IMPORTED_MODULE_1__common_size__["a" /* Size */](
            sprite.objData.size.w * sprite.scale.x * 0.5,
            sprite.objData.size.h * sprite.scale.y * 0.5 );

        // Convert the points to world location in meters
        let Vec2Ary = [];
        this.convertPoints( Vec2Ary, fixture, size, sprite.scale );

        this.body.createFixture(
            __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Chain"]( Vec2Ary, fixture.chainLoop ),
            this.getFixtureDef( sprite, fixture ) );
    }

    // 
    //  DESC: Convert the points to world location in meters
    //
    convertPoints( polyPointAry, fixture, size, scale )
    {
        // Convert to meters and world coordinates
        // Box2D polygons are defined using Counter Clockwise Winding (CCW)
        for( let i = 0; i < fixture.vertAry.length; ++i )
        {
            polyPointAry.push(
                __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Vec2"]( ((fixture.vertAry[i].x * scale.x) - size.w) * this.pixelsToMeters,
                             ((fixture.vertAry[i].y * scale.y) - size.h) * this.pixelsToMeters ) );
        }
    }

    // 
    //  DESC: Update the physics
    //
    update( sprite )
    {
        if( this.isActive() )
        {
            //CStatCounter::Instance().IncPhysicsObjectsCounter();

            //if( (BODY_TYPE > b2_staticBody) && m_pBody->IsAwake() )
            if( this.body.isAwake() )
            {
                let pos = this.body.getPosition();
                let angle = this.body.getAngle();
                sprite.setPosXYZ( pos.x * this.metersToPixels, -(pos.y * this.metersToPixels) );
                sprite.setRotXYZ( 0, 0, -angle, false );
            }
        }
    }
    
    // 
    //  DESC: Is this component active?
    //
    isActive()
    {
        return (this.body !== null);
    }

    // 
    //  DESC: Update the physics
    //
    destroyBody()
    {
        if( this.body !== null )
        {
            this.world.destroyBody( this.body );
            this.body = null;
        }
    }

    // 
    //  DESC: Set the physics position and rotation
    //
    setTransform( x, y, angle, resetVelocity )
    {
        if( this.body !== null )
        {
            this.body.setTransform( __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Vec2"]( x * this.pixelsToMeters, -(y * this.pixelsToMeters) ), angle );

            if( resetVelocity )
            {
                this.body.setLinearVelocity( __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Vec2"].zero() );
                this.body.setAngularVelocity( 0 );
            }
        }
    }

    // 
    //  DESC: Set the linear velocity
    //
    setLinearVelocity( x, y )
    {
        if( this.body !== null )
            this.body.setLinearVelocity( __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Vec2"]( x * this.pixelsToMeters, -(y * this.pixelsToMeters) ) );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhysicsComponent2D;



/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return physicsWorldManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__managers_managerbase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_assetholder__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__physicsworld2d__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__physicsworld3d__ = __webpack_require__(83);

// 
//  FILE NAME: physicsworldmanager.js
//  DESC:      Physics manager class singleton
//








const LOAD_2D = 0;
const LOAD_3D = 1;

class PhysicsWorldManager extends __WEBPACK_IMPORTED_MODULE_0__managers_managerbase__["a" /* ManagerBase */]
{
    constructor()
    {
        super();
        
        this.worldMap = new Map;
    }
    
    //
    //  DESC: Load all XML's associated with this group
    //
    loadWorldGroup2D( group, finishCallback )
    {
        this.loadWorldGroup( LOAD_2D, group, finishCallback );
    }
    
    loadWorldGroup3D( group, finishCallback )
    {
        this.loadWorldGroup( LOAD_3D, group, finishCallback );
    }
    
    loadWorldGroup( loadType, group, finishCallback )
    {
        // Make sure the group we are looking for has been defined in the list table file
        let pathAry = this.listTableMap.get( group );
        if( pathAry !== undefined )
        {
            // Load the group data if it doesn't already exist
            if( this.worldMap.get( group ) === undefined )
            {
                // Create a new physics world inside of our map
                if( loadType === LOAD_2D )
                    this.worldMap.set( group, new __WEBPACK_IMPORTED_MODULE_2__physicsworld2d__["a" /* PhysicsWorld2D */] );
                else
                    this.worldMap.set( group, new __WEBPACK_IMPORTED_MODULE_3__physicsworld3d__["a" /* PhysicsWorld3D */] );

                // There will only be one xml per physics world
                let filePath = pathAry[0];
                
                // Check if this file has already been loaded
                if( !__WEBPACK_IMPORTED_MODULE_1__utilities_assetholder__["a" /* assetHolder */].has( group, filePath ) )
                {
                    this.downloadFile( 'xml', group, filePath, finishCallback,
                        ( group, xmlNode, filePath, finishCallback ) => 
                        {
                            // Store the preloaded XML file
                            __WEBPACK_IMPORTED_MODULE_1__utilities_assetholder__["a" /* assetHolder */].set( group, filePath, xmlNode );

                            // Load from an xml node
                            this.loadFromNode( group, xmlNode, filePath );
                        });
                }
                else
                {
                    this.loadFromNode( group, __WEBPACK_IMPORTED_MODULE_1__utilities_assetholder__["a" /* assetHolder */].get( group, filePath), filePath );
                }
                
                // If there's nothing to load, call the complete callback
                if( this.loadCounter === 0 )
                    finishCallback();
            }
            else
            {
                throw new Error( `Physics world group has alread been loaded (${group})!` );
            }
        }
        else
        {
            throw new Error( `Physics world list group name can't be found (${group})!` );
        }
    }
    
    //
    //  DESC: Load from an xml node
    //
    loadFromNode( group, node, filePath )
    {
        // Get the physics world
        let world = this.worldMap.get( group );
        if( world === undefined )
            throw new Error( `Physics World doesn't exist (${group}, ${filePath})!` );
        
        world.loadFromNode( node );
    }
    
    //
    //  DESC: Get the physics world
    //
    getWorld( group )
    {
        let world = this.worldMap.get( group );
        if( world === undefined )
            throw new Error( `Physics World doesn't exist (${group})!` );

        return world;
    }
    
    //
    //  DESC: Destroy the physics world
    //
    destroyWorld( group )
    {
        this.worldMap.delete( group );
    }
}

var physicsWorldManager = new PhysicsWorldManager;


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_highresolutiontimer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_genfunc__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__);

// 
//  FILE NAME: physicsworld2d.js
//  DESC:      Wrapper class for Box2D's b2World
//







class PhysicsWorld2D
{
    constructor()
    {
        // Box2D world
        this.world = __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["World"]();
        
        // All bodies that are handled by this physics world
        this.bodyAry = [];

        // If we're actively running simulations
        this.active = false;

        // If we're going to start a step this frame
        this.beginStep = 0;

        // Timer to let us know when to do another step
        this.timer = 0;

        // The ammount of time to simulate in milliseconds
        this.stepTime = 0;

        // The ammount of time to simulate in Seconds
        this.stepTimeSec = 0;

        // The number of velocity and position steps to calculate
        this.velStepCount = 0;
        this.posStepCount = 0;

        // pixels per meter scaler
        this.pixelsPerMeter = 0;
    }
    
    //
    //  DESC: Load the physics world from XML node
    //
    loadFromNode( node )
    {
        // Get the world's settings, if any are set
        let settingsNode = node.getElementsByTagName( "settings" );
        if( settingsNode.length )
        {
            let attr = settingsNode[0].getAttribute( 'active' );
            if( attr )
                this.active = (attr === 'true');
        }

        // Get the world's gravity, if any are set
        let gravityNode = node.getElementsByTagName( "gravity" );
        if( gravityNode.length )
        {
            let gravity = __WEBPACK_IMPORTED_MODULE_2__Box2D_planck_min__["Vec2"](
                Number( gravityNode[0].getAttribute( "x" ) ),
                Number( gravityNode[0].getAttribute( "y" ) ) );

            this.world.setGravity( gravity );
        }

        // Get the stepping which determins how accurate the physics are
        let steppingNode = node.getElementsByTagName( "stepping" );
        if( steppingNode.length )
        {
            this.velStepCount = Number( steppingNode[0].getAttribute( "velocity" ) );
            this.posStepCount = Number( steppingNode[0].getAttribute( "position" ) );

            let fps = Number( steppingNode[0].getAttribute( "fps" ) );

            // If the number is negative, get the current refresh rate
            /*if( fps < 0.0 )
            {
                SDL_DisplayMode dm;
                SDL_GetDesktopDisplayMode(0, &dm);

                if( dm.refresh_rate == 0 )
                    fps = 60.f;
                else
                    fps = dm.refresh_rate;
            }*/

            this.setFPS( fps );
        }

        // Get the conversion of pixels per meter because Box2D works in meters
        let conversionNode = node.getElementsByTagName( "conversion" );
        if( conversionNode.length )
            this.pixelsPerMeter = Number( conversionNode[0].getAttribute( "pixelsPerMeter" ) );
    }
    
    //
    //  DESC: Create a physics body
    //  NOTE: Function should only be called from physics component
    //
    createBody( def )
    {
        let body = this.world.createBody( def );

        if( body === null )
            throw new Error( `Error creating physics body!` );

        this.bodyAry.push( body );

        return body;
    }
    
    //
    //  DESC: Destroy a physics body
    //  NOTE: Function should only be called from physics component
    //
    destroyBody( body )
    {
        let index = this.bodySet.indexOf( body );

        if( index !== -1 )
        {
            // Destroy the body
            this.world.destroyBody( body );

            // Remove the body from the array
            this.bodyAry.splice( index, 1 );
        }
    }
    
    //
    //  DESC: Perform fixed time step physics simulation
    //
    fixedTimeStep()
    {
        if( this.active )
        {
            // Increment the timer
            this.timer += __WEBPACK_IMPORTED_MODULE_0__utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;

            if( this.timer > this.stepTime )
            {
                this.timer = __WEBPACK_IMPORTED_MODULE_1__utilities_genfunc__["c" /* modulus */]( this.timer, this.stepTime );

                // Begin the physics world step
                this.world.step( this.stepTimeSec, this.velStepCount, this.posStepCount );
            }

            //this.timeRatio = this.timer / this.stepTime;
        }
    }

    //
    //  DESC: Perform variable time step physics simulation
    //
    variableTimeStep()
    {
        if( this.active )
        {
            // Begin the physics world step
            this.world.step( __WEBPACK_IMPORTED_MODULE_0__utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime / 1000.0, this.velStepCount, this.posStepCount );
        }
    }
    
    //
    //  DESC: Set the fps to run the simulation at
    //
    setFPS( fps )
    {
        // Make sure we don't have a negative or zero fps
        if( fps > 1.0 )
        {
            // Calculate the step paramaters
            this.stepTimeSec = 1.0 / fps;
            this.stepTime = this.stepTimeSec * 1000.0;

            // Set the timer so that we'll begin a step next time we call Update
            this.timer = this.stepTime;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhysicsWorld2D;



/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: physicsworld3d.js
//  DESC:      Wrapper class for Bullet physics
//

class PhysicsWorld3D
{
    constructor()
    {
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhysicsWorld3D;



/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mathsymbol__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stripset__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stripstop__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__paycombo__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__paytableset__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__weightedtable__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__valuetable__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__slotdefs__ = __webpack_require__(11);

// 
//  FILE NAME: slotmath.js
//  DESC:      Class to hold math data
//












class SlotMath
{
    constructor( group, id )
    {
        // The group the math data is in
        // Mainly used for error reporting for easier identification 
        // of which math file is causing a problem.
        this.group = group;

        // The name of the math id
        this.id = id;
        
        // The name of the payline set id
        this.paylineSetId;

        // The math percentage
        this.percenatge;

        // Map of math symbol set
        this.symbolSetMapMap = new Map;

        // Map of slot strips - Stores a pointer from m_symbolSetMapMap
        this.stripMapAry = new Map;

        // Map of strip sets
        this.stripSetMapAry = new Map;

        // Map of payline combo data
        this.payComboMapAry = new Map;

        // Map of paytable set lists
        this.paytableSetMapAry = new Map;

        // Map of weighted table data
        this.weightedTableMap = new Map;

        // Map of value table data
        this.valueTableMap = new Map;
    }
    
    //
    //  DESC: LGet the symbol set
    //
    getSymbolSet( id )
    {
        let symbSet = this.symbolSetMapMap.get( id );
        if( !symbSet )
            throw new Error( `Math symbol set not found (${this.group}, ${id})!` );

        return symbSet;
    }

    //
    //  DESC: Get the slot strip
    //
    getSlotStrip( id )
    {
        let strip = this.stripMapAry.get( id );
        if( !strip )
            throw new Error( `Slot strip not found (${this.group}, ${id})!` );

        return strip;
    }

    //
    //  DESC: Get the strip set
    //
    getSlotStripSet( id )
    {
        let stripSet = this.stripSetMapAry.get( id );
        if( !stripSet )
            throw new Error( `Strip set not found (${this.group}, ${id})!` );

        return stripSet;
    }

    //
    //  DESC: Get the pay combo set
    //
    getPayComboSet( id )
    {
        let payCombo = this.payComboMapAry.get( id );
        if( !payCombo )
            throw new Error( `Pay combo set not found (${this.group}, ${id})!` );

        return payCombo;
    }

    //
    //  DESC: Get the paytable set
    //
    getPaytableSet( id )
    {
        let paytableSet = this.paytableSetMapAry.get( id );
        if( !paytableSet )
            throw new Error( `Paytable set not found (${this.group}, ${id})!` );

        return paytableSet;
    }

    //
    //  DESC: Get the weighted table
    //
    getWeightedTable( id )
    {
        let weightedTable = this.weightedTableMap.get( id );
        if( !weightedTable )
            throw new Error( `Weighted table not found (${this.group}, ${id})!` );

        return weightedTable;
    }

    //
    //  DESC: Get the value table
    //
    getValueTable( id )
    {
        let valueTable = this.valueTableMap.get( id );
        if( !valueTable )
            throw new Error( `Valuetable not found (${this.group}, ${id})!` );

        return valueTable;
    }

    //
    //  DESC: Load thes slot group data from node
    //
    loadFromNode( node )
    {
        // Get the payline id
        this.paylineSetId = node.getAttribute( 'paylineSetId' );

        // Get the math percentage
        this.percenatge = Number(node.getAttribute( 'percentage' ));

        // Load thes symbol set data from node
        this.loadSymbolSetsFromNode( node );

        // Load the slot strip data from node
        this.loadStripFromNode( node );

        // Load the slot strip set list data from node
        this.loadStripSetListFromNode( node );

        // Load the pay combo data from node
        this.loadPayComboFromNode( node );

        // Load the paytable set list data from node
        this.loadPaytableSetListFromNode( node );

        // Load the weighted table data from node
        this.loadWeightedTableFromNode( node );

        // Load the value table data from node
        this.loadValueTableFromNode( node );
    }

    //
    //  DESC: Load the symbol set data from node
    //
    loadSymbolSetsFromNode( node )
    {
        // Get the node to the symbol set list
        let symbSetNode = node.getElementsByTagName( 'symbolSetList' )[0].children;

        for( let symbLst = 0; symbLst < symbSetNode.length; ++symbLst )
        {
            // Get the symbol set id
            let setId = symbSetNode[symbLst].getAttribute( 'id' );
            
            // Check for duplicate names
            if( this.symbolSetMapMap.has( setId ) )
                throw new Error( `Duplicate symbol set name (${setId}, ${this.group})!` );

            // Create a new symbol set map inside of our map
            let symbolSetMap = new Map;
            this.symbolSetMapMap.set( setId, symbolSetMap );

            // Get the wild list node
            let wildLstNode = symbSetNode[symbLst].getElementsByTagName( 'wildSymbolList' );

            // map of wild matches
            let wildMatchesMap = new Map;

            // Load up the wild matches first to feed the constructor
            if( wildLstNode.length )
            {
                // Get the wild node
                let wildNode = wildLstNode[0].children;
                    
                for( let wildLst = 0; wildLst < wildNode.length; ++wildLst )
                {
                    // Get the wild id
                    let wildId = wildNode[wildLst].getAttribute( 'id' );
                    
                    // Check for any duplications
                    if( wildMatchesMap.has( wildId ) )
                        throw new Error( `Duplicate wild symbol in math file (${wildId}, ${this.group})!` );

                    // Add an array that will be filled with symbols that are wild for this id
                    let symbAry = [];
                    wildMatchesMap.set( wildId, symbAry );

                    // Get the wild symbol node
                    let symbNode = wildNode[wildLst].children;
                        
                    for( let symb = 0; symb < symbNode.length; ++symb )
                    {
                        // Get the wild symbol id
                        let id = symbNode[symb].getAttribute( 'id' );

                        // Add to the symbol's wild list
                        symbAry.push( id );
                    }
                }
            }

            // Get the symbol list node
            let symbNode = symbSetNode[symbLst].getElementsByTagName( 'symbolList' )[0].children;

            for( let symb = 0; symb < symbNode.length; ++symb )
            {
                // Get the symbol id
                let symbId = symbNode[symb].getAttribute( 'id' );
                
                // Check for duplicate names
                if( symbolSetMap.has( symbId ) )
                    throw new Error( `Duplicate symbol name (${symbId}, ${this.group})!` );

                // See if this symbol has a wild match
                let wildMatchAry = wildMatchesMap.get( symbId );
                
                // If none exist, create an empty array
                if( wildMatchAry === undefined )
                    wildMatchAry = [];

                // Create the math symbol
                symbolSetMap.set( symbId, new __WEBPACK_IMPORTED_MODULE_0__mathsymbol__["a" /* MathSymbol */]( symbId, wildMatchAry ) );

                // If a wild was found, erase it from the map
                if( wildMatchAry.length )
                    wildMatchesMap.delete( symbId );
            }

            // Check for any dangling wild defines
            if( wildMatchesMap.length )
                throw new Error( `Wild symbol defined but doesn not exist in symbol set (${this.group})!` );
        }
    }

    //
    //  DESC: Load the slot strip data from node
    //        Stores a reference from symbolSetMapMap
    //
    loadStripFromNode( node )
    {
        // Get the node to the math strip list
        let stripNode = node.getElementsByTagName( 'stripList' )[0].children;

        for( let i = 0; i < stripNode.length; ++i )
        {
            // Get the math strip id
            let stripId = stripNode[i].getAttribute( 'id' );

            // Get the symbol set id
            let symbSetId = stripNode[i].getAttribute( 'symbSetId' );

            // Find the symbol set this math strip is using
            let symbolSetMap = this.symbolSetMapMap.get( symbSetId );
            if( symbolSetMap === undefined )
                throw new Error( `Can't find reel strip symbol set name (${symbSetId}, ${this.group})!` );
            
            // Check for duplicate names
            if( this.stripMapAry.has( stripId ) )
                throw new Error( `Duplicate math strip name (${stripId}, ${this.group})!` );

            // Create a new math strip inside the map
            let mathSymbolAry = [];
            this.stripMapAry.set( stripId, mathSymbolAry );
            
            let symbolNode = stripNode[i].children;

            for( let j = 0; j < symbolNode.length; ++j )
            {
                // Get the symbol id
                let symbId = symbolNode[j].getAttribute( 'id' );

                let mathSymbol = symbolSetMap.get( symbId );
                if( mathSymbol === undefined )
                    throw new Error( `Math symbol not found in symbol set (${stripId}, ${this.group})!` );
                
                // Check for a weight
                let weight = 1;
                let attr = symbolNode[j].getAttribute( 'weight' );
                if( attr )
                    weight = Number( attr );
                
                // Add symbol to math strip
                mathSymbolAry.push( new __WEBPACK_IMPORTED_MODULE_2__stripstop__["a" /* StripStop */]( mathSymbol, weight ) );
            }
        }
    }

    //
    //  DESC: Load the strip set list data from node
    //
    loadStripSetListFromNode( node )
    {
        // Get the node to the strip set list
        let stripSetNode = node.getElementsByTagName( 'stripSetList' )[0].children;

        for( let set = 0; set < stripSetNode.length; ++set )
        {
            // Get the strip id
            let stripSetId = stripSetNode[set].getAttribute( 'id' );
            
            // Check for duplicate names
            if( this.stripSetMapAry.has( stripSetId ) )
                throw new Error( `Duplicate strip set name (${stripSetId}, ${this.group})!` );

            // Create a new strip inside the map
            let stripSetAry = [];
            this.stripSetMapAry.set( stripSetId, stripSetAry );

            // Get the strip node
            let stripNode = stripSetNode[set].children;

            for( let tbl = 0; tbl < stripNode.length; ++tbl )
            {
                // Get the strip id
                let stripId = stripNode[tbl].getAttribute( 'id' );

                // Check that this strip exists in the strip map array
                if( !this.stripMapAry.has( stripId ) )
                    throw new Error( `Strip not found in strip list (${stripId}, ${this.group})!` );
                
                // Get the evaluation symbol indexes. Reels tend to be in succession but wheels can be disbursed.
                let evalSymbIndexAry = [];
                let evalIndexNode = stripNode[tbl].children;
                for( let i = 0; i < evalIndexNode.length; ++i )
                    evalSymbIndexAry.push( Number(evalIndexNode[i].getAttribute( 'index' )) );

                // Add the strip id
                stripSetAry.push( new __WEBPACK_IMPORTED_MODULE_1__stripset__["a" /* StripSet */]( stripId, evalSymbIndexAry ) );
            }
        }
    }

    //
    //  DESC: Load the pay combo data from node
    //
    loadPayComboFromNode( node )
    {
        // Get the node to the strip set list
        let payComboSetLstNode = node.getElementsByTagName( 'comboSetList' );

        if( payComboSetLstNode.length )
        {
            // Get the pay combo set node
            let payComboSetNode = payComboSetLstNode[0].children;
                
            for( let set = 0; set < payComboSetNode.length; ++set )
            {
                // Get the pay combo set id
                let payComboSetId = payComboSetNode[set].getAttribute( 'id' );
                
                // Check for duplicate names
                if( this.payComboMapAry.has( payComboSetId ) )
                    throw new Error( `Duplicate pay combo set name (${payComboSetId}, ${this.group})!` );

                // Create a new pay combo in the map
                let payComboAry = [];
                this.payComboMapAry.set( payComboSetId, payComboAry );

                // Get the pay combo node
                let payComboNode = payComboSetNode[set].children;

                for( let pay = 0; pay < payComboNode.length; ++pay )
                {
                    // Get the symbol
                    let symb = payComboNode[pay].getAttribute( 'symb' );

                    // Get the count
                    let count = Number(payComboNode[pay].getAttribute( 'count' ));

                    // Get the value
                    let award = Number(payComboNode[pay].getAttribute( 'award' ));

                    // Get the value
                    let bonusCode = 0;
                    let attr = payComboNode[pay].getAttribute( 'bonusCode' );
                    if( attr )
                        bonusCode = Number(attr);

                    // Add the combo pay
                    payComboAry.push( new __WEBPACK_IMPORTED_MODULE_3__paycombo__["a" /* PayCombo */]( symb, count, award, bonusCode ) );
                }
            }
        }
    }

    //
    //  DESC: Load the paytable set list data from node
    //
    loadPaytableSetListFromNode( node )
    {
        // Get the node to the paytable set list
        let paytableSetNode = node.getElementsByTagName( 'paytableSetList' )[0].children;

        for( let set = 0; set < paytableSetNode.length; ++set )
        {
            // Get the paytable id
            let paytableSetId = paytableSetNode[set].getAttribute( 'id' );
            
            // Check for duplicate names
            if( this.paytableSetMapAry.has( paytableSetId ) )
                throw new Error( `Duplicate paytable set name (${paytableSetId}, ${this.group})!` );

            // Create a new paytable inside the map
            let paytableSetAry = [];
            this.paytableSetMapAry.set( paytableSetId, paytableSetAry );
            
            // Get the paytable node
            let paytableNode = paytableSetNode[set].children;

            for( let tbl = 0; tbl < paytableNode.length; ++tbl )
            {
                // Get the paytable type
                let paytableType = __WEBPACK_IMPORTED_MODULE_7__slotdefs__["e" /* EP_PAYLINE */];
                if( paytableNode[tbl].getAttribute('type') === 'scatter' )
                    paytableType = __WEBPACK_IMPORTED_MODULE_7__slotdefs__["f" /* EP_SCATTER */];

                // Get the paytable id
                let paytableStrId = paytableNode[tbl].getAttribute( 'id' );

                // Check that this pay combo exists in the pay combo map array
                if( !this.payComboMapAry.has( paytableStrId ) )
                    throw new Error( `Pay combo not found in paytable list (${paytableStrId}, ${this.group})!` );

                // Add the paytable id
                paytableSetAry.push( new __WEBPACK_IMPORTED_MODULE_4__paytableset__["a" /* PaytableSet */]( paytableType, paytableStrId ) );
            }
        }
    }

    //
    //  DESC: Load the weighted table data from node
    //
    loadWeightedTableFromNode( node )
    {
        // Get the node to the weighted table list
        let weightedTableLstNode = node.getElementsByTagName( 'weightedTableList' );
        
        if( weightedTableLstNode.length )
        {
            // Get the weighted table node
            let weightedTableNode = weightedTableLstNode[0].children;
                
            for( let set = 0; set < weightedTableNode.length; ++set )
            {
                // Get the weighted table id
                let weightedTableId = weightedTableNode[set].getAttribute( 'id' );
                
                // Check for duplicate names
                if( this.weightedTableMap.has( weightedTableId ) )
                    throw new Error( `uplicate weighted table name (${weightedTableId}, ${this.group})!` );

                let totalWeight = 0;
                let weightAry = [];
                let valueAry = [];
                
                // Get the table node
                let tableNode = weightedTableNode[set].children;

                for( let tbl = 0; tbl < tableNode.length; ++tbl )
                {
                    // Get the weight
                    let weight = Number(tableNode[tbl].getAttribute( 'weight' ));

                    // Get the value
                    let value = Number(tableNode[tbl].getAttribute( 'value' ));

                    totalWeight += weight;
                    weightAry.push( weight );
                    valueAry.push( value );
                }

                // Create a new weighted table inside the map
                this.weightedTableMap.set( weightedTableId, new __WEBPACK_IMPORTED_MODULE_5__weightedtable__["a" /* WeightedTable */]( totalWeight, weightAry, valueAry ) );
            }
        }
    }

    //
    //  DESC: Load the value table data from node
    //
    loadValueTableFromNode( node )
    {
        // Get the node to the value table list
        let valueTableLstNode = node.getElementsByTagName( 'valueTableList' );
        
        if( valueTableLstNode.length )
        {
            // Get the weighted table node
            let valueTableNode = valueTableLstNode[0].children;
            
            for( let set = 0; set < valueTableNode.length; ++set )
            {
                // Get the value table id
                let valueTableId = valueTableNode[set].getAttribute( 'id' );
                
                // Check for duplicate names
                if( this.valueTableMap.has( valueTableId ) )
                    throw new Error( `uplicate value table name (${valueTableId}, ${this.group})!` );

                let valueAry = [];
                
                // Get the table node
                let tableNode = valueTableNode[set].children;

                for( let tbl = 0; tbl < tableNode.length; ++tbl )
                {
                    // Get the value
                    let value = Number(tableNode[tbl].getAttribute( 'value' ));

                    // Add table element
                    valueAry.push( value );
                }

                // Create a new value table inside the map
                this.valueTableMap.set( valueTableId, new __WEBPACK_IMPORTED_MODULE_6__valuetable__["a" /* ValueTable */]( valueAry ) );
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SlotMath;



/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: mathsymbol.js
//  DESC:      Class for holding a math symbol
//



class MathSymbol
{
    constructor( id, wildMatches )
    {
        // Symbol string ID
        this.id = id;

        // ID's of other math symbols that this symbol is wild for
        this.wildMatches = wildMatches;
    }
    
    //
    //  DESC: Is this a wild symbol?
    //
    isWild()
    {
        return (this.wildMatches.length > 0);
    }

    //
    //  DESC: Is wild for this symbol?
    //
    isWildFor( symbolID )
    {
        return (this.wildMatches.indexOf( symbolID ) !== -1);
    }

    //
    //  DESC: Does symbol match?
    //
    isMatch( symbolID )
    {
        return ((this.id === symbolID) || this.isWildFor( symbolID ));
    }

    //
    //  DESC: Is this the same symbol?
    //
    isEquil( symbolID )
    {
        if( this.id == symbolID )
            return true;

        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MathSymbol;



/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: stripset.js
//  DESC:      strip set math class
//



class StripSet
{
    constructor( id, evalSymbIndexAry )
    {
        // Paytable string id
        this.id = id;

        // Evaluation symbol count
        this.evalSymbIndexAry = evalSymbIndexAry;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StripSet;



/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: stripstop.js
//  DESC:      Class for holding the math strip stop
//



class StripStop
{
    constructor( mathSymbol, weight )
    {
        // Math symbol
        this.mathSymbol = mathSymbol;

        // Math symbol weight
        this.weight = weight;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StripStop;



/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: paycombo.js
//  DESC:      Class for holding the pay combo
//



class PayCombo
{
    constructor( symbol, count, award, bonusCode )
    {
        // Symbol for this pay (string)
        this.symbol = symbol;

        // Number of symbols in this pay
        this.count = count;

        // Credit award
        this.award = award;

        // Bonus code
        this.bonusCode = bonusCode;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PayCombo;



/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: paytableset.js
//  DESC:      Paytable set math class
//



class PaytableSet
{
    constructor( type, id )
    {
        // Paytable type (enum)
        this.type = type;

        // Paytable string id
        this.id = id;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PaytableSet;



/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__valuetable__ = __webpack_require__(49);

// 
//  FILE NAME: weightedtable.js
//  DESC:      Class for holding the weighted table
//





class WeightedTable extends __WEBPACK_IMPORTED_MODULE_0__valuetable__["a" /* ValueTable */]
{
    constructor( totalWeight, weightAry, valueAry )
    {
        super( valueAry );
        
        // total weight
        this.totalWeight = totalWeight;

        // weight
        this.weightAry = weightAry;
    }
    
    //
    //  DESC: Get the value from the weighted table
    //
    getWeightedValue( rngValue )
    {
        let index = 0;
        let weightCount = 0;

        for( let i = 0; i < this.weightAry.length; ++i )
        {
            weightCount += this.weightAry[i];

            if( rngValue <= weightCount )
                break;

            ++index;
        }

        return getValue( index );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WeightedTable;



/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: paylineset.js
//  DESC:      Class for holding the payline and scatter eval symbol 
//             positions that are allowed for evaluation
//



class PaylineSet
{
    constructor()
    {
        // Array of line offsets
        this.line = [];

        // Array of scatter offsets
        this.scatter = [];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PaylineSet;



/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// 
//  FILE NAME: keycodeaction.js
//  DESC:      Class for holding key codes to test for action events
//



class KeyCodeAction
{
    constructor( id )
    {
        this.idAry = [id];
    }
    
    // Set additional id's
    setId( id )
    {
        // Only set id's that are positive numbers
        if( id > -1 )
            this.idAry.push( id );
    }
    
    // Remove an id
    removeId( id )
    {
        var index = this.idAry.indexOf( id );
        
        if( index > -1 )
            this.idAry.splice( index, 1 );
    }

    // Check for action
    wasAction( id )
    {
        if( this.idAry.indexOf( id ) > -1 )
            return true;

        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyCodeAction;



/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__2d_object2d__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_dynamicoffset__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scrollparam__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_settings__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__2d_sprite2d__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__managers_eventmanager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__gui_uicontrolnavnode__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__objectdatamanager_objectdatamanager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__script_scriptcomponent__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__script_scriptmanager__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__uicontrolfactory__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utilities_xmlparsehelper__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__common_defs__ = __webpack_require__(0);
// 
//  FILE NAME: menu.js
//  DESC:      Class for user interface menu
//
















class Menu extends __WEBPACK_IMPORTED_MODULE_0__2d_object2d__["a" /* Object2D */]
{
    constructor( name, group, filePath )
    {
        super();
        
        // This menu's name
        this.name = name;
        
        // Group name
        this.group = group;
        
        // File path
        this.filePath = filePath;
        
        // Array of menu static sprites
        this.spriteAry = [];

        // Array list of static controls
        this.staticControlAry = [];

        // Array list of mouse only controls
        this.mouseOnlyControlAry = [];

        // Array list of controls
        this.controlAry = [];

        // Array list of navigation nodes
        this.controlNodeAry = [];

        // Map container of controls for easy name access
        // NOTE: This container does not own it's pointers.
        this.controlMap = new Map;

        // Current active node
        this.activeNode = null;

        // menu state
        this.state = __WEBPACK_IMPORTED_MODULE_12__common_defs__["E" /* ECS_NULL */];

        // Dynamic offset
        this.dynamicOffset = new __WEBPACK_IMPORTED_MODULE_1__common_dynamicoffset__["a" /* DynamicOffset */];

        // Scrolling parameters
        this.scrollParam = new __WEBPACK_IMPORTED_MODULE_2__scrollparam__["a" /* ScrollParam */];

        // Base smart Gui control scoped pointer
        this.smartGui = null;
        
        // menu alpha value
        this.alpha = 0;

        // The script conponent
        this.scriptComponent = new __WEBPACK_IMPORTED_MODULE_8__script_scriptcomponent__["a" /* ScriptComponent */];
        
        // Script object map. Prepare scripts by name
        this.scriptFactoryMap = new Map;
        
        // The menu needs to default hidden
        this.setVisible(false);
    }
    
    // 
    //  DESC: Load the menu info from file
    //
    loadFromNode( node )
    {
        // Init the script factory functions
        this.initScriptFactoryFunctions( node );
        
        // Load the scroll data from node
        this.scrollParam.loadFromNode( node.getElementsByTagName( 'scroll' ) );

        // Get the static sprite
        let nodeLst = node.getElementsByTagName( 'spriteList' );
        if( nodeLst.length )
        {
            let spriteNode = nodeLst[0].children;
            
            for( let i = 0; i < spriteNode.length; ++i )
                this.loadStaticSpriteFromNode( spriteNode[i] );
        }

        // Get the static menu controls node
        nodeLst = node.getElementsByTagName( 'staticMenuControls' );
        if( nodeLst.length )
        {
            let controlNode = nodeLst[0].children;
            
            for( let i = 0; i < controlNode.length; ++i )
                this.loadStaticControlFromNode( controlNode[i] );
        }

        // Get the mouse only menu controls node
        nodeLst = node.getElementsByTagName( 'mouseOnlyControls' );
        if( nodeLst.length )
        {
            let controlNode = nodeLst[0].children;
            
            for( let i = 0; i < controlNode.length; ++i )
                this.loadMouseOnlyControlFromNode( controlNode[i] );
        }

        // Get the menu controls
        nodeLst = node.getElementsByTagName( 'menuControls' );
        if( nodeLst.length )
        {
            let controlNode = nodeLst[0].children;
            
            // map to help setup the node pointers
            let navNodeMap = new Map;

            // Load the controls
            for( let i = 0; i < controlNode.length; ++i )
                this.loadControlFromNode( controlNode[i], navNodeMap );

            // Map the controls to their respective nodes
            for( let i = 0; i < controlNode.length; ++i )
                this.findNodes( controlNode[i], i, navNodeMap );
        }
    }
    
    // 
    //  DESC: Init the script factory functions and add them to the map
    //        This function loads the attribute info reguardless of what it is
    //
    initScriptFactoryFunctions( node )
    {
        // Check for scripting
        let scriptLst = node.getElementsByTagName( 'scriptLst' );
        if( scriptLst.length )
        {
            let scriptNode = scriptLst[0].children;
            
            for( let i = 0; i < scriptNode.length; ++i )
            {
                let attr = scriptNode[i].attributes[0];
                
                if( attr )
                {
                    this.scriptFactoryMap.set( attr.name, __WEBPACK_IMPORTED_MODULE_9__script_scriptmanager__["a" /* scriptManager */].get(attr.value) );
                }
            }
        }
    }
    
    // 
    //  DESC: Load a static sprite from an XML node
    //
    loadStaticSpriteFromNode( node )
    {
        // Get the type of object
        let objectName = node.getAttribute( 'objectName' );

        // Allocate the static sprite and add it to the array
        let sprite = new __WEBPACK_IMPORTED_MODULE_4__2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_7__objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( this.group, objectName ) );
        this.spriteAry.push( sprite );

        // Load the transform data
        sprite.loadTransFromNode( node );

        // Init the script factory functions
        sprite.initScriptFactoryFunctions( node );
    }

    // 
    //  DESC: Load static controls from an XML node
    //
    loadStaticControlFromNode( node )
    {
        // New up the control with its respected control type
        let control = __WEBPACK_IMPORTED_MODULE_10__uicontrolfactory__["a" /* create */]( node, this.group );
        this.staticControlAry.push( control );

        // Does this control have a name then add it to the map
        if( control.name )
            this.controlMap.set( control.name, control );
    }

    // 
    //  DESC: Load mouse only controls from an XML node
    //
    loadMouseOnlyControlFromNode( node )
    {
        // New up the control with its respected control type
        let control = __WEBPACK_IMPORTED_MODULE_10__uicontrolfactory__["a" /* create */]( node, this.group );
        this.mouseOnlyControlAry.push( control );

        // Does this control have a name then add it to the map
        if( control.name )
            this.controlMap.set( control.name, control );
    }

    // 
    //  DESC: Load a control from an XML node
    //
    loadControlFromNode( node, navNodeMap )
    {
        // New up the control with its respected control type
        let control = __WEBPACK_IMPORTED_MODULE_10__uicontrolfactory__["a" /* create */]( node, this.group );
        this.controlAry.push( control );

        // Does this control have a name then add it to the map
        if( control.name )
        {
            // Check for duplicate names
            if( this.controlMap.has( control.name ) )
                throw new Error( `Duplicate control name! (${control.name})` );
            
            // Map of menu controls
            this.controlMap.set( control.name, control );

            // Add a node to the array with it's control
            let navNode = new __WEBPACK_IMPORTED_MODULE_6__gui_uicontrolnavnode__["a" /* UIControlNavNode */]( control );
            this.controlNodeAry.push( navNode );

            // Map of menu control nodes
            navNodeMap.set( control.name, navNode );
        }
    }
    
    // 
    //  DESC: Load the dynamic offset data from node
    //
    loadDynamicOffsetFromNode( node )
    {
        // Load the dynamic offset
        this.dynamicOffset = __WEBPACK_IMPORTED_MODULE_11__utilities_xmlparsehelper__["c" /* loadDynamicOffset */]( node );

        // Set the dynamic position
        this.setDynamicPos();
    }

    // 
    //  DESC: Set the dynamic position
    //
    setDynamicPos()
    {
        // Position the menu based on the dynamic offset
        if( this.dynamicOffset )
            this.setPos( this.dynamicOffset.getPos( __WEBPACK_IMPORTED_MODULE_3__utilities_settings__["a" /* settings */].defaultSize_half ) );
    } 

    // 
    //  DESC: Reset the dynamic position
    //
    resetDynamicPos()
    {
        this.setDynamicPos();

        for( let i = 0; i < this.staticControlAry.length; ++i )
            this.staticControlAry[i].setDynamicPos();
        
        for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
            this.mouseOnlyControlAry[i].setDynamicPos();

        for( let i = 0; i < this.controlAry.length; ++i )
            this.controlAry[i].setDynamicPos();
    }

    // 
    //  DESC: Find the reference nodes
    //
    findNodes( node, nodeIndex, navNodeMap )
    {
        let navNode = node.getElementsByTagName( 'navigate' );
        if( navNode.length )
        {
            this.setNodes( navNode, nodeIndex, 'up',    __WEBPACK_IMPORTED_MODULE_12__common_defs__["_41" /* ENAV_NODE_UP */],    navNodeMap );
            this.setNodes( navNode, nodeIndex, 'down',  __WEBPACK_IMPORTED_MODULE_12__common_defs__["_38" /* ENAV_NODE_DOWN */],  navNodeMap );
            this.setNodes( navNode, nodeIndex, 'left',  __WEBPACK_IMPORTED_MODULE_12__common_defs__["_39" /* ENAV_NODE_LEFT */],  navNodeMap );
            this.setNodes( navNode, nodeIndex, 'right', __WEBPACK_IMPORTED_MODULE_12__common_defs__["_40" /* ENAV_NODE_RIGHT */], navNodeMap );
        }
    }

    // 
    //  DESC: Find the reference nodes
    //
    setNodes( node, nodeIndex, attrStr, navId, navNodeMap )
    {
        let attr = node[0].getAttribute( attrStr );
        if( attr )
        {
            let ctrlNode = navNodeMap.get( attr );
            if( ctrlNode !== undefined )
                this.controlNodeAry[nodeIndex].setNode( navId, ctrlNode );
            else
                throw new Error( `Control node doesn't exist! (${attr}, ${attrStr})` );
        }
    }
    
    // 
    //  DESC: Init the menu controls
    //
    init()
    {
        for( let i = 0; i < this.staticControlAry.length; ++i )
            this.staticControlAry[i].init();

        for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
            this.mouseOnlyControlAry[i].init();

        for( let i = 0; i < this.controlAry.length; ++i )
            this.controlAry[i].init();

    }   // Init

    // 
    //  DESC: Init the menu controls
    //
    cleanUp()
    {
        for( let i = 0; i < this.staticControlAry.length; ++i )
            this.staticControlAry[i].cleanUp();

        for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
            this.mouseOnlyControlAry[i].cleanUp();

        for( let i = 0; i < this.controlAry.length; ++i )
            this.controlAry[i].cleanUp();

    }   // CleanUp
    
    // 
    //  DESC: Activate this menu because it's probably a root menu
    //
    activateMenu()
    {
        this.state = __WEBPACK_IMPORTED_MODULE_12__common_defs__["_34" /* EMS_IDLE */];
        this.setVisible(true);
        this.setAlpha(1);
        this.activateFirstInactiveControl();
    }

    // 
    //  DESC: Update the menu
    //
    update()
    {
        this.scriptComponent.update();

        if( this.isVisible() )
        {
            for( let i = 0; i < this.spriteAry.length; ++i )
                this.spriteAry[i].update();
            
            for( let i = 0; i < this.staticControlAry.length; ++i )
                this.staticControlAry[i].update();
            
            for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
                this.mouseOnlyControlAry[i].update();
            
            for( let i = 0; i < this.controlAry.length; ++i )
                this.controlAry[i].update();
        }
    }

    // 
    //  DESC: Transform the menu
    //
    doTransform()
    {
        if( this.isVisible() )
        {
            this.transform();
            
            for( let i = 0; i < this.spriteAry.length; ++i )
                this.spriteAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
            
            for( let i = 0; i < this.staticControlAry.length; ++i )
                this.staticControlAry[i].doTransform( this );
            
            for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
                this.mouseOnlyControlAry[i].doTransform( this );
            
            for( let i = 0; i < this.controlAry.length; ++i )
                this.controlAry[i].doTransform( this );
        }
    }

    // 
    //  DESC: do the render
    //
    render( matrix )
    {
        if( this.isVisible() )
        {
            for( let i = 0; i < this.spriteAry.length; ++i )
                this.spriteAry[i].render( matrix );
            
            for( let i = 0; i < this.staticControlAry.length; ++i )
                this.staticControlAry[i].render( matrix );
            
            for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
                this.mouseOnlyControlAry[i].render( matrix );
            
            for( let i = 0; i < this.controlAry.length; ++i )
                this.controlAry[i].render( matrix );
        }
    }

    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        if( event instanceof CustomEvent )
        {
            // Have the controls handle events
            for( let i = 0; i < this.controlAry.length; ++i )
                this.controlAry[i].handleEvent( event );

            for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
                    this.mouseOnlyControlAry[i].handleEvent( event );
            
            if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_15" /* EGE_MENU_TRANS_IN */] )
            {
                this.onTransIn( event );
            }
            else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_16" /* EGE_MENU_TRANS_OUT */] )
            {
                this.onTransOut( event );
            }
            else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_1" /* EGE_MENU_REACTIVATE */] )
            {
                this.onReactivate( event );
            }
            else if( this.state === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_34" /* EMS_IDLE */] )
            {
                if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_7" /* EGE_MENU_SELECT_ACTION */] )
                {
                    this.onSelectAction( event );
                }
                else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_9" /* EGE_MENU_SET_ACTIVE_CONTROL */] )
                {
                    this.onSetActiveControl( event );
                }
                else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_6" /* EGE_MENU_SCROLL_UP */] )
                {
                    this.onUpAction( event );
                }
                else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_3" /* EGE_MENU_SCROLL_DOWN */] )
                {
                    this.onDownAction( event );
                }
                else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_4" /* EGE_MENU_SCROLL_LEFT */] )
                {
                    this.onLeftAction( event );
                }
                else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_5" /* EGE_MENU_SCROLL_RIGHT */] )
                {
                    this.onRightAction( event );
                }
                else if( (event.detail.type >= __WEBPACK_IMPORTED_MODULE_12__common_defs__["_17" /* EGE_MENU_UP_ACTION */]) &&
                         (event.detail.type <= __WEBPACK_IMPORTED_MODULE_12__common_defs__["_2" /* EGE_MENU_RIGHT_ACTION */]) )
                {
                    if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_12__common_defs__["k" /* EAP_DOWN */] )
                    {
                        if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_17" /* EGE_MENU_UP_ACTION */] )
                        {
                            this.onUpAction( event );
                        }
                        else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__common_defs__["X" /* EGE_MENU_DOWN_ACTION */] )
                        {
                            this.onDownAction( event );
                        }
                        if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_0" /* EGE_MENU_LEFT_ACTION */] )
                        {
                            this.onLeftAction( event );
                        }
                        else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_2" /* EGE_MENU_RIGHT_ACTION */] )
                        {
                            this.onRightAction( event );
                        }
                    }
                }
            }
        }
        else if( this.state === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_34" /* EMS_IDLE */] )
        {
            if( event.type === 'mousemove' )
            {
                this.onMouseMove( event );
            }
        }

        // Handle any smart menu events
        this.smartHandleEvent( event );
    }

    // 
    //  DESC: Handle OnUpAction message
    //
    onUpAction( event )
    {
        this.navigateMenu( __WEBPACK_IMPORTED_MODULE_12__common_defs__["_41" /* ENAV_NODE_UP */] );
    }

    // 
    //  DESC: Handle OnMenuDown message
    //
    onDownAction( event )
    {
        this.navigateMenu( __WEBPACK_IMPORTED_MODULE_12__common_defs__["_38" /* ENAV_NODE_DOWN */] );
    }

    // 
    //  DESC: Handle OnMenuLeft message
    //
    onLeftAction( event )
    {
        this.navigateMenu( __WEBPACK_IMPORTED_MODULE_12__common_defs__["_39" /* ENAV_NODE_LEFT */] );
    }

    // 
    //  DESC: Handle OnRightAction message
    //
    onRightAction( event )
    {
        this.navigateMenu( __WEBPACK_IMPORTED_MODULE_12__common_defs__["_40" /* ENAV_NODE_RIGHT */] );
    }

    // 
    //  DESC: Navigate the menu. Find the next control node that isn't
    //        disabled and make it the active control node
    //
    navigateMenu( navNodeAction )
    {
        if( this.activeNode !== null )
        {
            let navNode = this.activeNode;

            do
            {
                navNode = navNode.getNode( navNodeAction );
                
                if( navNode === null )
                {
                    break;
                }
                else if( !navNode.uiControl.isDisabled() )
                {
                    this.activeNode = navNode;

                    __WEBPACK_IMPORTED_MODULE_5__managers_eventmanager__["a" /* eventManager */].dispatchEvent(
                        __WEBPACK_IMPORTED_MODULE_12__common_defs__["W" /* EGE_MENU_CONTROL_STATE_CHANGE */],
                        __WEBPACK_IMPORTED_MODULE_12__common_defs__["A" /* ECS_ACTIVE */],
                        navNode.uiControl );

                    break;
                }
            }
            while( true );
        }
    }

    // 
    //  DESC: Handle OnMouseMove message
    //
    onMouseMove( event )
    {
        for( let i = 0; i < this.controlNodeAry.length; ++i )
        {
            if( this.controlNodeAry[i].uiControl.onMouseMove( event ) )
                this.activeNode = this.controlNodeAry[i];
            else
                this.controlNodeAry[i].uiControl.deactivateControl();
        }

        for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
            if( !this.mouseOnlyControlAry[i].onMouseMove( event ) )
                this.mouseOnlyControlAry[i].deactivateControl();
    }

    // 
    //  DESC: Handle OnSelectAction message
    //
    onSelectAction( event )
    {
        let selectionFound = false;

        if( (this.activeNode !== null) &&
            (this.activeNode.uiControl.handleSelectAction( event )) )
        {
            selectionFound = true;

            // Set the state to active which will block all messages until the state is reset to idle
            if( this.activeNode.uiControl.actionType > __WEBPACK_IMPORTED_MODULE_12__common_defs__["w" /* ECAT_NULL */] )
                this.state = __WEBPACK_IMPORTED_MODULE_12__common_defs__["_33" /* EMS_ACTIVE */];
        }
        else if( event.detail.arg[ __WEBPACK_IMPORTED_MODULE_12__common_defs__["_46" /* ESMA_DEVICE_TYPE */] ] === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_57" /* MOUSE */] )
        {
            // For mouse only controls
            for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
            {
                if( this.mouseOnlyControlAry[i].handleSelectAction( event ) )
                {
                    selectionFound = true;

                    // Set the state to active which will block all messages until the state is reset to idle
                    if( this.mouseOnlyControlAry[i].actionType > __WEBPACK_IMPORTED_MODULE_12__common_defs__["w" /* ECAT_NULL */] )
                        this.state = __WEBPACK_IMPORTED_MODULE_12__common_defs__["_33" /* EMS_ACTIVE */];

                    break;
                }
            }
        }

        // Try to handle touch presses on a non-active control
        // The mouse just happends to be clicked over a non-active control
        if( !selectionFound && event.detail.arg[ __WEBPACK_IMPORTED_MODULE_12__common_defs__["_46" /* ESMA_DEVICE_TYPE */] ] === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_57" /* MOUSE */] )
        {
            // Deactivate the control that should be active
            if( (this.activeNode !== null) &&
                (event.detail.arg[ __WEBPACK_IMPORTED_MODULE_12__common_defs__["_49" /* ESMA_PRESS_TYPE */] ] === this.activeNode.uiControl.mouseSelectType) )
            {
                this.activeNode.uiControl.deactivateControl();

                // Go through all the controls on this menu to try to find the one clicked on
                for( let i = 0; i < this.controlAry.length; ++i )
                {
                    if( this.controlAry[i].handleSelectAction( event ) )
                    {
                        // Set the state to active which will block all messages until the state is reset to idle
                        if( this.activeNode.uiControl.actionType > __WEBPACK_IMPORTED_MODULE_12__common_defs__["w" /* ECAT_NULL */] )
                            this.state = __WEBPACK_IMPORTED_MODULE_12__common_defs__["_33" /* EMS_ACTIVE */];

                        break;
                    }
                }
            }
        }
    }

    // 
    //  DESC: Handle OnSetActiveControl message
    //
    onSetActiveControl( event )
    {
        // Set the first inactive control to active
        if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_12__common_defs__["i" /* EAC_FIRST_ACTIVE_CONTROL */] )
            this.activateFirstInactiveControl();
    }

    // 
    //  DESC: Handle OnReactivate message
    //
    onReactivate( event )
    {
        this.state = __WEBPACK_IMPORTED_MODULE_12__common_defs__["_34" /* EMS_IDLE */];
    }

    // 
    //  DESC: Handle OnTransIn message
    //
    onTransIn( event )
    {
        if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_50" /* ETC_BEGIN */] )
        {
            this.prepare( 'transIn' );

            this.state = __WEBPACK_IMPORTED_MODULE_12__common_defs__["_33" /* EMS_ACTIVE */];
        }
        else if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_51" /* ETC_END */] )
        {
            this.state = __WEBPACK_IMPORTED_MODULE_12__common_defs__["_34" /* EMS_IDLE */];
        }
    }

    // 
    //  DESC: Handle OnTransOut message
    //
    onTransOut( event )
    {
        if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_50" /* ETC_BEGIN */] )
        {
            this.prepare( 'transOut' );

            this.state = __WEBPACK_IMPORTED_MODULE_12__common_defs__["_33" /* EMS_ACTIVE */];
        }
        else if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_51" /* ETC_END */] )
        {
            this.state = __WEBPACK_IMPORTED_MODULE_12__common_defs__["_35" /* EMS_INACTIVE */];
        }
    }

    // 
    //  DESC: Prepare the script function to run
    //
    prepare( scriptFactoryId )
    {
        let scriptFactory = this.scriptFactoryMap.get( scriptFactoryId );
        if( scriptFactory )
            this.scriptComponent.set( scriptFactory(this) );
    }

    // 
    //  DESC: Set the first inactive control to be active
    //
    activateFirstInactiveControl()
    {
        let found = false;

        // Activate the first control found and deactivate all the rest
        for( let i = 0; i < this.controlNodeAry.length; ++i )
        {
            if( !found && this.controlNodeAry[i].uiControl.activateFirstInactiveControl() )
            {
                this.activeNode = this.controlNodeAry[i];

                found = true;
            }
            else
            {
                this.controlNodeAry[i].uiControl.deactivateControl();
            }
        }
    }

    // 
    //  DESC: Reset all controls
    //
    reset()
    {
        for( let i = 0; i < this.controlAry.length; ++i )
            this.controlAry[i].reset( true );

        for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
            this.mouseOnlyControlAry[i].reset( true );
    }

    // 
    //  DESC: Get the control in question
    //
    getControl( name )
    {
        // See if the control can be found
        let control = this.controlMap.get( name );

        // Make sure control is available
        if( control === undefined )
            throw new Error( `Control being asked for is missing! (${name}).` );

        // Pass back the control if found
        return control;
    }

    // 
    //  DESC: Get the pointer to the active control
    //
    getActiveControl()
    {
        let result = null;

        for( let i = 0; i < this.controlAry.length; ++i )
        {
            if( this.controlAry[i].state > __WEBPACK_IMPORTED_MODULE_12__common_defs__["C" /* ECS_INACTIVE */] )
            {
                result = this.controlAry[i].getActiveControl();
                break;
            }
        }

        return result;
    }

    // 
    //  DESC: Does this menu use dynamic offsets
    //
    isDynamicOffset()
    {
        return !this.dynamicOffset.isEmpty();
    }

    // 
    //  DESC: Get the scroll params
    //
    getScrollParam( msg )
    {
        if( (this.activeNode != null) &&
            this.activeNode.uiControl.canScroll(msg) )
        {
            return this.activeNode.uiControl.scrollParam;
        }

        return this.scrollParam;
    }
    
    // 
    //  DESC: Do any smart create
    //
    smartCreate()
    {
        if( this.smartGui )
            this.smartGui.create();
    }

    // 
    //  DESC: Do any smart event handling
    //
    smartHandleEvent( event )
    {
        if( this.smartGui )
            this.smartGui.handleEvent( event );
    }

    // 
    //  DESC: Set the alpha value of this menu
    //
    setAlpha( alpha )
    {
        if( this.isVisible() )
        {
            for( let i = 0; i < this.spriteAry.length; ++i )
                this.spriteAry[i].setAlpha( alpha );

            for( let i = 0; i < this.staticControlAry.length; ++i )
                this.staticControlAry[i].setAlpha( alpha );

            for( let i = 0; i < this.mouseOnlyControlAry.length; ++i )
                this.mouseOnlyControlAry[i].setAlpha( alpha );

            for( let i = 0; i < this.controlAry.length; ++i )
                this.controlAry[i].setAlpha( alpha );
        }

        this.alpha = alpha;
    }
    
    // 
    //  DESC: Get the alpha value of this menu
    //
    getAlpha()
    {
        return this.alpha;
    }

    // 
    //  DESC: Is the menu idle
    //
    isIdle()
    {
        return (this.state === __WEBPACK_IMPORTED_MODULE_12__common_defs__["_34" /* EMS_IDLE */]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Menu;



/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__2d_object2d__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_settings__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_dynamicoffset__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_assetholder__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utilities_xmlparsehelper__ = __webpack_require__(7);

// 
//  FILE NAME: controlbase.js
//  DESC:      Control base class
//









class ControlBase extends __WEBPACK_IMPORTED_MODULE_0__2d_object2d__["a" /* Object2D */]
{
    constructor( group )
    {
        super();
        
        // Object data group name
        this.group = group;

        // Unique string id
        this.name = null;

        // The type of control
        this.type = null;

        // Control string list
        this.stringAry = [];

        // A name that is applied to similar controls.
        // Provides a way to check for many controls without having to use unique names
        this.faction = null;

        // Dynamic offset
        this.dynamicOffset = null;
    }
    
    // 
    //  DESC: Load the control info from XML node
    //
    loadFromNode( node )
    {
        // Set the controls name
        let attr = node.getAttribute( 'name' );
        if( attr )
            this.name = attr;

        // Set the faction name
        attr = node.getAttribute( 'faction' );
        if( attr )
            this.faction = attr;

        // Load the transform data
        this.loadTransFromNode( node );

        // Load the dynamic offset from node
        this.loadDynamicOffsetFromNode( node );

        // See if we have a list of strings
        let stringLstNode = node.getElementsByTagName( 'fontStringLst' );
        if( stringLstNode.length )
        {
            let stringNode = stringLstNode[0].getElementsByTagName( 'string' );
            
            for( let i = 0; i < stringNode.length; ++i )
                this.stringAry.push( stringNode[i].getAttribute( 'text' ) );
        }

        // Load the control specific xml file
        // Get the file path node to the control specific xml code
        let filePathNode = node.getElementsByTagName( 'filePath' );
        if( filePathNode.length )
        {
            // Get the control's file path
            let controlFilePath = filePathNode[0].getAttribute( 'file' );

            // Load xml specific control code
            // Use the preloaded since many controls reuse xml files
            this.loadControlFromNode( __WEBPACK_IMPORTED_MODULE_3__utilities_assetholder__["a" /* assetHolder */].get( this.group, controlFilePath ) );
        }
    }
    
    // 
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( node )
    {
        // Empty function to be overwritten
    }

    // 
    //  DESC: Load the dynamic offset data from node
    //
    loadDynamicOffsetFromNode( node )
    {
        // Load the dynamic offset
        this.dynamicOffset = __WEBPACK_IMPORTED_MODULE_4__utilities_xmlparsehelper__["c" /* loadDynamicOffset */]( node );

        // Set the dynamic position
        this.setDynamicPos();
    }

    // 
    //  DESC: Set the dynamic position
    //
    setDynamicPos()
    {
        // Position the menu based on the dynamic offset
        if( this.dynamicOffset )
            this.setPos( this.dynamicOffset.getPos( __WEBPACK_IMPORTED_MODULE_1__utilities_settings__["a" /* settings */].defaultSize_half ) );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ControlBase;


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_point__ = __webpack_require__(3);

// 
//  FILE NAME:  quad.js
//  DESC:       quad class
//




class Quad
{
    constructor()
    {
        this.point = [new __WEBPACK_IMPORTED_MODULE_0__common_point__["a" /* Point */], new __WEBPACK_IMPORTED_MODULE_0__common_point__["a" /* Point */], new __WEBPACK_IMPORTED_MODULE_0__common_point__["a" /* Point */], new __WEBPACK_IMPORTED_MODULE_0__common_point__["a" /* Point */]];
    }
    
    // 
    //  DESC: Is the point in the Quad
    //  Note: Fast but does not work when quad is rotated
    //
    isPointInQuad( x, y )
    {
        let result = false;
        
        //console.log( `isPointInQuad - X: ${x}, Y: ${y}` );
        
        for( let i = 0, j = 3; i < 4; j = i++ )
        {
            if( ((this.point[i].y > y) != (this.point[j].y > y)) && 
                (x < (this.point[j].x - this.point[i].x) * (y - this.point[i].y) / (this.point[j].y - this.point[i].y) + this.point[i].x) )
            {
                result = !result;
            }
        }

        return result;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Quad;



/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uicontrol__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: uilabel.js
//  DESC:      Class for user interface labels
//





class UILabel extends __WEBPACK_IMPORTED_MODULE_0__uicontrol__["a" /* UIControl */]
{
    constructor( group )
    {
        super( group );
        
        this.type = __WEBPACK_IMPORTED_MODULE_1__common_defs__["J" /* ECT_LABEL */];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UILabel;




/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uicontrol__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: uibutton.js
//  DESC:      Class for user interface buttons
//





class UIButton extends __WEBPACK_IMPORTED_MODULE_0__uicontrol__["a" /* UIControl */]
{
    constructor( group )
    {
        super( group );
        
        this.type = __WEBPACK_IMPORTED_MODULE_1__common_defs__["G" /* ECT_BUTTON */];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UIButton;



/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uisubcontrol__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_bitmask__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: uibuttonlist.js
//  DESC:      Class for user interface buttons
//







class UIButtonList extends __WEBPACK_IMPORTED_MODULE_0__uisubcontrol__["a" /* UISubControl */]
{
    constructor( group )
    {
        super( group );
        
        this.type = __WEBPACK_IMPORTED_MODULE_3__common_defs__["H" /* ECT_BUTTON_LIST */];
        
        // Active index into the list
        this.activeIndex = 0;

        // Index of the image list
        this.imageLstIndex = -1;

        // Indicates if the control responds to up, down, left or right
        this.actionMask = new __WEBPACK_IMPORTED_MODULE_1__utilities_bitmask__["a" /* BitMask */];
    }
    
    // 
    //  DESC: Load the control info from XML node
    //
    loadFromNode( node )
    {
        // Call the parent
        super.loadFromNode( node );

        // See what the control will respond to
        let actionResponseNode = node.getElementsByTagName( 'actionResponse' );
        let attr = actionResponseNode[0].getAttribute('up');
        if( attr && (attr === 'true') )
        {
            this.actionMask.add( __WEBPACK_IMPORTED_MODULE_3__common_defs__["q" /* EAR_UP */] );
        }

        attr = actionResponseNode[0].getAttribute('down');
        if( attr && (attr === 'true') )
        {
            this.actionMask.add( __WEBPACK_IMPORTED_MODULE_3__common_defs__["n" /* EAR_DOWN */] );
        }

        attr = actionResponseNode[0].getAttribute('left');
        if( attr && (attr === 'true') )
        {
            this.actionMask.add( __WEBPACK_IMPORTED_MODULE_3__common_defs__["o" /* EAR_LEFT */] );
        }

        attr = actionResponseNode[0].getAttribute('right');
        if( attr && (attr === 'true') )
        {
            this.actionMask.add( __WEBPACK_IMPORTED_MODULE_3__common_defs__["p" /* EAR_RIGHT */] );
        }
    }

    // 
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( node )
    {
        // Call the parent
        super.loadControlFromNode( node );

        // See if there is an image list
        for( let i = 0; i < this.spriteAry.length; ++i )
        {
            if( this.spriteAry[i].objData.visualData.getFrameCount() > 1 )
            {
                this.imageLstIndex = i;
                break;
            }
        }
    }

    // 
    //  DESC: Inc/Dec control
    //
    inc()
    {
        __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent(
            __WEBPACK_IMPORTED_MODULE_3__common_defs__["W" /* EGE_MENU_CONTROL_STATE_CHANGE */],
            __WEBPACK_IMPORTED_MODULE_3__common_defs__["F" /* ECS_SELECTED */],
            this.subControlAry[__WEBPACK_IMPORTED_MODULE_3__common_defs__["b" /* BTN_INC */]] );
    }

    dec()
    {
        __WEBPACK_IMPORTED_MODULE_2__managers_eventmanager__["a" /* eventManager */].dispatchEvent(
            __WEBPACK_IMPORTED_MODULE_3__common_defs__["W" /* EGE_MENU_CONTROL_STATE_CHANGE */],
            __WEBPACK_IMPORTED_MODULE_3__common_defs__["F" /* ECS_SELECTED */],
            this.subControlAry[__WEBPACK_IMPORTED_MODULE_3__common_defs__["a" /* BTN_DEC */]] );
    }

    // 
    //  DESC: Handle Onmessage
    //
    onDownAction( event )
    {
        if( (event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_3__common_defs__["k" /* EAP_DOWN */]) && this.actionMask.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["n" /* EAR_DOWN */] ) )
            this.dec();
    }

    onUpAction( event )
    {
        if( (event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_3__common_defs__["k" /* EAP_DOWN */]) && this.actionMask.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["q" /* EAR_UP */] ) )
            this.inc();
    }

    onLeftAction( event )
    {
        if( (event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_3__common_defs__["k" /* EAP_DOWN */]) && this.actionMask.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["o" /* EAR_LEFT */] ) )
            this.dec();

    }

    onRightAction( event )
    {
        if( (event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_3__common_defs__["k" /* EAP_DOWN */]) && this.actionMask.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["p" /* EAR_RIGHT */] ) )
            this.inc();
    }

    // 
    //  DESC: Handle OnLeftScroll message
    //
    onDownScroll( event )
    {
        if( this.actionMask.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["n" /* EAR_DOWN */] ) )
            this.dec();
    }

    onUpScroll( event )
    {
        if( this.actionMask.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["q" /* EAR_UP */] ) )
            this.inc();
    }

    onLeftScroll( event )
    {
        if( this.actionMask.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["o" /* EAR_LEFT */] ) )
            this.dec();
    }

    onRightScroll( event )
    {
        if( this.actionMask.isSet( __WEBPACK_IMPORTED_MODULE_3__common_defs__["p" /* EAR_RIGHT */] ) )
            this.inc();
    }

    // 
    //  DESC: Handle OnStateChange message
    //
    onStateChange( event )
    {
        super.onStateChange( event );

        let state = event.detail.arg[0];

        if( state === __WEBPACK_IMPORTED_MODULE_3__common_defs__["F" /* ECS_SELECTED */] )
        {
            if( this.subControlAry[__WEBPACK_IMPORTED_MODULE_3__common_defs__["a" /* BTN_DEC */]] == event.detail.arg[1] )
            {
                // Dec the list
                this.decList();

                // Update the display
                this.updateDisplay( this.activeIndex );

                // Execute smart gui
                this.smartExecuteAction();
            }
            else if( this.subControlAry[__WEBPACK_IMPORTED_MODULE_3__common_defs__["b" /* BTN_INC */]] == event.detail.arg[1] )
            {
                // Inc the list
                this.incList();

                // Update the display
                this.updateDisplay( this.activeIndex );

                // Execute smart gui
                this.smartExecuteAction();
            }
        }
    }

    // 
    //  DESC: Inc the list
    //
    incList()
    {
        if( this.stringAry.length )
            this.activeIndex = (this.activeIndex + 1) % this.stringAry.length;
    }

    decList()
    {
        if( this.stringAry.length )
        {
            if( this.activeIndex > 0 )
                this.activeIndex = (this.activeIndex - 1) % this.stringAry.length;
            else
                this.activeIndex = this.stringAry.length - 1;
        }
    }

    // 
    //  DESC: Update the display
    //
    updateDisplay( index )
    {
        this.activeIndex = index;

        this.createFontString( this.activeIndex );

        if( this.imageLstIndex > -1 )
            this.spriteAry[this.imageLstIndex].visualComponent.setFrame( this.activeIndex );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UIButtonList;



/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uicontrol__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: uicheckbox.js
//  DESC:      Class for user interface check box buttons
//





class UICheckBox extends __WEBPACK_IMPORTED_MODULE_0__uicontrol__["a" /* UIControl */]
{
    constructor( group )
    {
        super( group );
        
        this.type = __WEBPACK_IMPORTED_MODULE_1__common_defs__["I" /* ECT_CHECK_BOX */];
        
        // Select state
        this.toggleState = false;
    }
    
    // 
    //  DESC: Handle OnSelectExecute message
    //
    onSelectExecute( event )
    {
        if( this.state === __WEBPACK_IMPORTED_MODULE_1__common_defs__["F" /* ECS_SELECTED */] )
            this.toggleState = !this.toggleState;

        super.onSelectExecute( event );
    }

    // 
    //  DESC: Render the control
    //
    render( matrix )
    {
        for( let i = 0; i < this.spriteAry.length-1; ++i )
            this.spriteAry[i].render( matrix );

        if( this.toggleState === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_64" /* TOGGLE_STATE_ON */] )
            this.spriteAry[this.spriteAry.length-1].render( matrix );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UICheckBox;





/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uisubcontrol__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_settings__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__managers_eventmanager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: uislider.js
//  DESC:      Class for user interface slider
//








class UISlider extends __WEBPACK_IMPORTED_MODULE_0__uisubcontrol__["a" /* UISubControl */]
{
    constructor( group )
    {
        super( group );
        
        this.type = __WEBPACK_IMPORTED_MODULE_4__common_defs__["N" /* ECT_SLIDER */];
        
        // Slider travel distance in pixels
        this.travelDistPixels = 0;

        // Slider Orientation
        this.orientation = __WEBPACK_IMPORTED_MODULE_4__common_defs__["_42" /* EO_HORIZONTAL */];

        // Min value
        this.minValue = 0;

        // Max value
        this.maxValue = 0;

        // Current value
        this.curValue = 0;

        // inc value
        this.incValue = 0;

        // Flag to indicate to display the value as an int
        this.displayValueAsInt = false;

        // Default position of the slider button
        this.defaultPos = new __WEBPACK_IMPORTED_MODULE_1__common_point__["a" /* Point */];

        // slider button hold flag
        this.sliderBtnHold = false;

        // The current press type
        this.pressType = __WEBPACK_IMPORTED_MODULE_4__common_defs__["l" /* EAP_IDLE */];
    }
    
    // 
    //  DESC: Load the control info from XML node
    //
    loadFromNode( node )
    {
        super.loadFromNode( node );

        // Get the slider specific settings
        let settingsNode = node.getElementsByTagName( 'settings' );
        if( settingsNode.length )
        {
            let attr = settingsNode[0].getAttribute( 'orientation' );
            if( attr && (attr === 'VERT') )
                this.orientation = __WEBPACK_IMPORTED_MODULE_4__common_defs__["_43" /* EO_VERTICAL */];

            attr = settingsNode[0].getAttribute( 'minValue' );
            if( attr )
                this.minValue = Number(attr);

            attr = settingsNode[0].getAttribute( 'maxValue' );
            if( attr )
                this.maxValue = Number(attr);

            attr = settingsNode[0].getAttribute( 'incValue' );
            if( attr )
                this.incValue = Number(attr);

            attr = settingsNode[0].getAttribute( 'defValue' );
            if( attr )
                this.curValue = Number(attr);

            attr = settingsNode[0].getAttribute( 'displayValueAsInt' );
            if( attr && (attr === 'true') )
                this.displayValueAsInt = true;
        }
    }

    // 
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( node )
    {
        // Have the parent load it's stuff
        super.loadControlFromNode( node );

        // Get the position of the slider button as the default position
        this.defaultPos.copy( this.subControlAry[0].pos );

        // Get the slider specific settings
        let settingsNode = node.getElementsByTagName( 'settings' );
        if( settingsNode.length )
        {
            let attr = settingsNode[0].getAttribute( 'maxTravelDistPixels' );
            if( attr )
                this.travelDistPixels = Number(attr);
        }
    }

    // 
    //  DESC: Init the control
    //
    init()
    {
        super.init();

        this.updateSlider();
    }

    // 
    //  DESC: Handle OnLeftAction message
    //
    onLeftAction( event )
    {
        // Handle the slider change
        if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_4__common_defs__["k" /* EAP_DOWN */] )
            this.handleSliderChange( -this.incValue, true );
    }

    // 
    //  DESC: Handle OnRightAction message
    //
    onRightAction( event )
    {
        // Handle the slider change
        if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_4__common_defs__["k" /* EAP_DOWN */] )
            this.handleSliderChange( this.incValue, true );
    }

    // 
    //  DESC: Handle OnRightScroll message
    //
    onLeftScroll( event )
    {
        this.handleSliderChange( -this.incValue );
    }

    // 
    //  DESC: Handle OnRightScroll message
    //
    onRightScroll( event )
    {
        this.handleSliderChange( this.incValue );
    }

    // 
    //  DESC: Handle OnMouseMove message
    //
    onMouseMove( event )
    {
        let result = super.onMouseMove( event );

        if( this.isActive() && (this.pressType === __WEBPACK_IMPORTED_MODULE_4__common_defs__["k" /* EAP_DOWN */]) )
        {
            let oneOverAspectRatio = 1.0 / __WEBPACK_IMPORTED_MODULE_2__utilities_settings__["a" /* settings */].orthoAspectRatio.h;

            if( this.orientation === __WEBPACK_IMPORTED_MODULE_4__common_defs__["_42" /* EO_HORIZONTAL */] )
                this.incSliderMovePos( event.movementX * oneOverAspectRatio );
            else
                this.incSliderMovePos( event.movementY * oneOverAspectRatio );

            this.smartExecuteAction();
        }

        return result;
    }

    // 
    //  DESC: Handle the select action
    //
    handleSelectAction( event )
    {
        let result = this.isActive() &&
                     (event.detail.arg[__WEBPACK_IMPORTED_MODULE_4__common_defs__["_46" /* ESMA_DEVICE_TYPE */]] === __WEBPACK_IMPORTED_MODULE_4__common_defs__["_57" /* MOUSE */]) &&
                     this.isPointInControl( event.detail.arg[__WEBPACK_IMPORTED_MODULE_4__common_defs__["_47" /* ESMA_MOUSE_X */]], event.detail.arg[__WEBPACK_IMPORTED_MODULE_4__common_defs__["_48" /* ESMA_MOUSE_Y */]] );
             
        if( result && (event.detail.arg[__WEBPACK_IMPORTED_MODULE_4__common_defs__["_49" /* ESMA_PRESS_TYPE */]] === this.mouseSelectType) )
        {
            // Get the press type to know if we need to move the slider 
            // along with the mouse move
            this.pressType = this.mouseSelectType;

            if( event.detail.arg[__WEBPACK_IMPORTED_MODULE_4__common_defs__["_49" /* ESMA_PRESS_TYPE */]] === __WEBPACK_IMPORTED_MODULE_4__common_defs__["k" /* EAP_DOWN */] )
            {
                this.prepareControlScriptFactory( __WEBPACK_IMPORTED_MODULE_4__common_defs__["F" /* ECS_SELECTED */] );

                let ratio = 1.0 / __WEBPACK_IMPORTED_MODULE_2__utilities_settings__["a" /* settings */].orthoAspectRatio.h;

                if( this.orientation === __WEBPACK_IMPORTED_MODULE_4__common_defs__["_42" /* EO_HORIZONTAL */] )
                    this.incSliderMovePos( (event.detail.arg[__WEBPACK_IMPORTED_MODULE_4__common_defs__["_47" /* ESMA_MOUSE_X */]] - this.subControlAry[0].collisionCenter.x) * ratio );
                else
                    this.incSliderMovePos( (event.detail.arg[__WEBPACK_IMPORTED_MODULE_4__common_defs__["_48" /* ESMA_MOUSE_Y */]] - this.subControlAry[0].collisionCenter.y) * ratio );

                this.smartExecuteAction();
            }
        }
        else if( event.detail.arg[__WEBPACK_IMPORTED_MODULE_4__common_defs__["_49" /* ESMA_PRESS_TYPE */]] !== this.mouseSelectType )
        {
            this.pressType = __WEBPACK_IMPORTED_MODULE_4__common_defs__["l" /* EAP_IDLE */];
        }

        return result;
    }

    // 
    //  DESC: Deactivate the control
    //
    deactivateControl()
    {
        super.deactivateControl();

        this.pressType = __WEBPACK_IMPORTED_MODULE_4__common_defs__["l" /* EAP_IDLE */];
    }

    // 
    //  DESC: Handle the slider change
    //
    handleSliderChange( value, prepareOnSelect = false )
    {
        if( this.isActive() )
        {
            if( prepareOnSelect )
                this.prepareControlScriptFactory( __WEBPACK_IMPORTED_MODULE_4__common_defs__["F" /* ECS_SELECTED */] );

            // Send a message to blink the button
            __WEBPACK_IMPORTED_MODULE_3__managers_eventmanager__["a" /* eventManager */].dispatchEvent( 
                __WEBPACK_IMPORTED_MODULE_4__common_defs__["W" /* EGE_MENU_CONTROL_STATE_CHANGE */],
                __WEBPACK_IMPORTED_MODULE_4__common_defs__["F" /* ECS_SELECTED */],
                this.subControlAry[0] );

            this.incSlider( value );

            this.smartExecuteAction();
        }
    }

    // 
    //  DESC: Set the slider inc value
    //
    setSlider( value = 0 )
    {
        this.curValue = value;

        // Update the slider
        this.updateSlider();
    }

    // 
    //  DESC: Set the slider inc value
    //
    incSlider( value = 0 )
    {
        this.curValue += value;

        // Update the slider
        this.updateSlider();
    }

    // 
    //  DESC: Inc the slider based on mouse movement
    //
    incSliderMovePos( value )
    {
        this.curValue += value * ((this.maxValue - this.minValue) / this.travelDistPixels);

        // Update the slider
        this.updateSlider();
    }

    // 
    //  DESC: Update the slider
    //
    updateSlider()
    {
        // Cap current value to it's range
        this.capSliderValue();

        // Set the position of the slider
        this.setSliderPos();

        // Set the slider label if there is one
        if( this.stringAry.length )
        {
            // Format for display
            let valueStr;

            if( this.displayValueAsInt )
                valueStr = this.stringAry[this.stringAry.length-1].replace(/%d/i, Math.trunc(this.curValue));
            else
                valueStr = this.stringAry[this.stringAry.length-1].replace(/%d/i, this.curValue);

            this.createFontStr( valueStr );
        }
    }

    // 
    //  DESC: Cap the slider value
    //
    capSliderValue()
    {
        // Cap current value to range
        if( this.curValue < this.minValue )
            this.curValue = this.minValue;

        else if( this.curValue > this.maxValue )
            this.curValue = this.maxValue;
    }

    // 
    //  DESC: Set the position of the slider
    //
    setSliderPos()
    {
        if( Math.abs(this.maxValue) > 0.001 )
        {
            let startPos = -(this.travelDistPixels / 2);
            let pixelsPerValue = this.travelDistPixels / (this.maxValue - this.minValue);
            let pos = startPos + (pixelsPerValue * (this.curValue - this.minValue));

            if( this.orientation === __WEBPACK_IMPORTED_MODULE_4__common_defs__["_42" /* EO_HORIZONTAL */] )
                this.subControlAry[0].setPosXYZ( this.defaultPos.x + pos, this.defaultPos.y );
            else
                this.subControlAry[0].setPosXYZ( this.defaultPos.x, this.defaultPos.y + -pos );
        }
    }

    // 
    //  DESC: Is the mouse down
    //
    isMouseDown()
    {
        return (this.pressType === __WEBPACK_IMPORTED_MODULE_4__common_defs__["k" /* EAP_DOWN */]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UISlider;



/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__uisubcontrol__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__2d_sprite2d__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objectdatamanager_objectdatamanager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__system_device__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__managers_eventmanager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utilities_highresolutiontimer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utilities_xmlparsehelper__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__uicontrolfactory__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: uiscrollbox.js
//  DESC:      Class for user interface scroll boxes
//













const IN_VIEWABLE_AREA = 1;
const NEW_ACTIVE_CTRL = 2;

class UIScrollBox extends __WEBPACK_IMPORTED_MODULE_0__uisubcontrol__["a" /* UISubControl */]
{
    constructor( group )
    {
        super( group );
        
        this.type = __WEBPACK_IMPORTED_MODULE_9__common_defs__["M" /* ECT_SCROLL_BOX */];

        // Array list of controls in scroll box
        this.scrollControlAry = [];

        // Initial scroll box control offset
        this.initialOffset = new __WEBPACK_IMPORTED_MODULE_1__common_point__["a" /* Point */];

        // Height to cull
        this.cullHeight = 0;

        // height of control
        this.controlHeight = 0;

        // Scroll move counter
        this.scrollCurPos = 0;

        // Number of controls visible in scroll box
        this.visibleCount = 0;

        // Visible start pos
        this.visStartPos = 0;
        this.visEndPos = 0;

        // Max scroll amount
        this.maxMoveAmount = 0;

        // stencil mask sprite
        this.stencilMaskSprite;

        // Active scroll control index in this control
        this.activeScrollCtrl = __WEBPACK_IMPORTED_MODULE_9__common_defs__["_58" /* NO_ACTIVE_CONTROL */];

        // index of first control in scroll box
        this.firstScrollCtrlIndex = 0;

        // Default offsets
        this.defaultOffsetAry = [];

        // speed members
        this.scrollSpeed = 0.05;
        this.pageSpeed = 0.05;

        // Scroll vector to indicate the control is scrolling
        this.scrollVector = 0;

        // Flag to indicate the control is paging
        this.paging = 0;

        // Scroll counter
        this.scrollCounter = 0;

        // Scroll distance
        this.scrollDistance = 0;

        // Flag to indicate scrolling needs to stop
        // but allows the scrolling to finish
        this.endScroll = false;

        // Flag to indicate that the scroll message has been sent
        this.scrollMsg = false;

        // Flag to allow for end scroll selection
        this.endScrollSelection = false;
    }
    
    // 
    //  DESC: Load the control info from XML node
    //
    loadFromNode( node )
    {
        super.loadFromNode( node );

        // Init the slider
        this.subControlAry[0].maxValue = this.maxMoveAmount;
        this.subControlAry[0].setSlider();

        // Get the scrolling info
        let scrollNode = node.getElementsByTagName( 'scroll' );
        if( scrollNode.length )
        {
            let attr = scrollNode[0].getAttribute( 'scrollSpeed' );
            if( attr )
                this.scrollSpeed = Number( attr );

            attr = scrollNode[0].getAttribute( 'pageSpeed' );
            if( attr )
                this.pageSpeed = Number( attr );
        }

        // Calc the start and end positions of what should
        // be viewable in the scroll box
        this.setStartEndPos();
    }

    // 
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( node )
    {
        super.loadControlFromNode( node );

        // Get the menu controls node
        let menuControlsNode = node.getElementsByTagName( "scrollBoxControlList" );
        if( menuControlsNode.length )
        {
            // Get the initial offset of the first control in the scroll box
            this.initialOffset = __WEBPACK_IMPORTED_MODULE_7__utilities_xmlparsehelper__["e" /* loadPosition */]( menuControlsNode[0] );

            // Get the scroll boc info node
            let controlInfoNode = menuControlsNode[0].getElementsByTagName( "controlInfo" );
            this.controlHeight = Number( controlInfoNode[0].getAttribute( "height" ) );
            this.visibleCount = Number( controlInfoNode[0].getAttribute( "visibleInScrollBox" ) );

            // Get the number of controls in this scroll box
            let scrollControlNode = menuControlsNode[0].getElementsByTagName( "control" );

            // Add the scroll control from node
            for( let i = 0; i < scrollControlNode.length; ++i )
                this.addScrollControlFromNode( scrollControlNode[i] );
        }

        // Get the stencil mask node
        let stencilMaskNode = node.getElementsByTagName( "stencilMask" );
        if( stencilMaskNode.length )
        {
            let objectName = stencilMaskNode[0].getAttribute( "objectName" );

            this.stencilMaskSprite = new __WEBPACK_IMPORTED_MODULE_2__2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_3__objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( this.group, objectName ) );

            // Get the cull height
            this.cullHeight = (this.stencilMaskSprite.objData.size.w + this.controlHeight) / 2;

            // Load the transform data
            this.stencilMaskSprite.loadTransFromNode( stencilMaskNode[0] );
        }
    }

    // 
    //  DESC: Add the scroll control from node
    //  NOTE: This function recalculates the scroll box members because
    //        it is also used for run-time dynamic scroll boxes
    //
    addScrollControlFromNode( node )
    {
        // The reference is placed within a array for all controls
        let ctrl = __WEBPACK_IMPORTED_MODULE_8__uicontrolfactory__["a" /* create */]( node, this.group );
        this.scrollControlAry.push( ctrl );

        // Get the position for this control
        let posY = this.initialOffset.y - (this.controlHeight * (this.scrollControlAry.length-1));

        // Record the default y offset
        this.defaultOffsetAry.push( posY );

        // Set the position
        ctrl.setPosXYZ( this.initialOffset.x, posY, this.initialOffset.z );

        // Init the control visual state
        ctrl.deactivateControl();

        // Calculate the maximum scroll amount in pixels
        if( this.scrollControlAry.length > this.visibleCount )
            this.maxMoveAmount = (this.scrollControlAry.length - this.visibleCount) * this.controlHeight;

        return ctrl;
    }

    // 
    //  DESC: Init the control
    //
    init()
    {
        super.init();

        // Init all controls
        for( let i = 0; i < this.scrollControlAry.length; ++i )
            this.scrollControlAry[i].init();
    }

    // 
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        super.cleanUp();

        // Init all controls
        for( let i = 0; i < this.scrollControlAry.length; ++i )
            this.scrollControlAry[i].cleanUp();
    }

    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        super.handleEvent( event );

        for( let i = this.visStartPos; i < this.visEndPos; ++i )
            this.scrollControlAry[i].handleEvent( event );
    }

    // 
    //  DESC: Handle OnUpAction message
    //
    onUpAction( event )
    {
        if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_9__common_defs__["k" /* EAP_DOWN */] )
            this.handleKeyboardGamepadScroll( -1 );

        else if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_9__common_defs__["m" /* EAP_UP */] )
            this.endScroll = true;
    }

    // 
    //  DESC: Handle OnDownAction message
    //
    onDownAction( event )
    {
        if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_9__common_defs__["k" /* EAP_DOWN */] )
            this.handleKeyboardGamepadScroll( 1 );

        else if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_9__common_defs__["m" /* EAP_UP */] )
            this.endScroll = true;
    }

    // 
    //  DESC: Handle OnUpScroll message
    //
    onUpScroll( event )
    {
        this.handleKeyboardGamepadScroll( -1 );
        this.scrollMsg = true;
    }

    // 
    //  DESC: Handle OnDownScroll message
    //
    onDownScroll( event )
    {
        this.handleKeyboardGamepadScroll( 1 );
        this.scrollMsg = true;

    }   // OnDownScroll

    // 
    //  DESC: Handle OnTabLeft message
    //
    onTabLeft( event )
    {
        if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_9__common_defs__["k" /* EAP_DOWN */] )
            this.handlePageScroll( -1 );
    }

    // 
    //  DESC: Handle OnTabRight message
    //
    onTabRight( event )
    {
        if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_9__common_defs__["k" /* EAP_DOWN */] )
            this.handlePageScroll( 1 );
    }

    // 
    //  DESC: Handle the mouse move
    //
    onMouseMove( event )
    {
        let result = super.onMouseMove( event );

        // Invalidate the active control
        this.activeScrollCtrl = __WEBPACK_IMPORTED_MODULE_9__common_defs__["_58" /* NO_ACTIVE_CONTROL */];

        if( this.subControlAry[0].isMouseDown() )
        {
            // Get the current scroll position
            this.scrollCurPos = this.subControlAry[0].curValue;

            // Set the bounds
            this.setStartEndPos();

            // Reposition the scroll controlls
            this.repositionScrollControls();
        }

        return result;
    }

    // 
    //  DESC: Update the control
    //
    update()
    {
        super.update();

        // Update all controls
        for( let i = this.visStartPos; i < this.visEndPos; ++i )
            this.scrollControlAry[i].update();

        // Handle any scrolling
        this.handleScrollUpdate();
    }

    // 
    //  DESC: Transform the control
    //
    doTransform( object )
    {
        // Call the parent
        super.doTransform( object );

        // Transform all controls
        for( let i = this.visStartPos; i < this.visEndPos; ++i )
            this.scrollControlAry[i].doTransform( this );

        // Transform the mask
        this.stencilMaskSprite.transform( this.matrix, this.wasWorldPosTranformed() );
    }

    // 
    //  DESC: Render the sub control
    //
    render( matrix )
    {
        // Call the parent
        super.render( matrix );
        

        // Disable rendering to the color buffer
        // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
        __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].colorMask( false, false, false, false );
        
        // Disable rendering to the depth mask
        __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].depthMask( false );

        // Start using the stencil
        __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].enable( __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].STENCIL_TEST );

        __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].stencilFunc( __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].ALWAYS, 0x1, 0x1 );
        __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].stencilOp( __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].REPLACE, __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].REPLACE, __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].REPLACE );


        this.stencilMaskSprite.render( matrix );


        // Re-enable color
        // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
        __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].colorMask( true, true, true, true );

        // Where a 1 was not rendered
        __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].stencilFunc( __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].EQUAL, 0x1, 0x1 );

        // Keep the pixel
        __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].stencilOp( __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].KEEP, __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].KEEP, __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].KEEP );

        // Enable rendering to the depth mask
        __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].depthMask( true );


        for( let i = this.visStartPos; i < this.visEndPos; ++i )
            this.scrollControlAry[i].render( matrix );


        // Finished using stencil
        __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].disable( __WEBPACK_IMPORTED_MODULE_4__system_device__["b" /* gl */].STENCIL_TEST );
    }

    // 
    //  DESC: Set the first inactive control to be active
    //  NOTE: Don't want this functuality for the scroll box buttons and slider
    //
    activateFirstInactiveControl()
    {
        if( super.baseActivateFirstInactiveControl() )
        {
            for( let i = 0; i < this.scrollControlAry.length; ++i )
            {
                if( this.scrollControlAry[i].activateFirstInactiveControl() )
                {
                    this.activeScrollCtrl = i;
                    break;
                }
            }
        }

        return this.activeScrollCtrl != __WEBPACK_IMPORTED_MODULE_9__common_defs__["_58" /* NO_ACTIVE_CONTROL */];
    }

    // 
    //  DESC: Handle the select action
    //
    handleSelectAction( event )
    {
        let result = super.handleSelectAction( event );

        // Let the scroll controls handle any selection
        for( let i = 0; i < this.scrollControlAry.length; ++i )
            this.scrollControlAry[i].handleSelectAction( event );

        if( (event.detail.arg[__WEBPACK_IMPORTED_MODULE_9__common_defs__["_46" /* ESMA_DEVICE_TYPE */]] === __WEBPACK_IMPORTED_MODULE_9__common_defs__["_57" /* MOUSE */]) &&
            (event.detail.arg[__WEBPACK_IMPORTED_MODULE_9__common_defs__["_49" /* ESMA_PRESS_TYPE */]] === __WEBPACK_IMPORTED_MODULE_9__common_defs__["k" /* EAP_DOWN */]) )
        {
            // Get the current scroll position
            this.scrollCurPos = this.subControlAry[0].curValue;

            // Set the bounds
            this.setStartEndPos();

            // Reposition the scroll controlls
            this.repositionScrollControls();
        }

        return result;
    }

    // 
    //  DESC: Handle the page scrolling
    //
    handlePageScroll( scrollVector )
    {
        if( this.scrollVector == 0 )
        {
            // If there's no controls to select or reposition, do the scroll
            if( !this.selectAndRepositionCtrl( scrollVector ) )
            {
                const SCROLL_DOWN = (scrollVector > 0);
                const SCROLL_UP = (scrollVector < 0);

                // Make sure we have some place to page to
                if( (SCROLL_UP && (this.firstScrollCtrlIndex > 0)) ||
                    (SCROLL_DOWN && (this.firstScrollCtrlIndex + this.visibleCount < this.scrollControlAry.length)) )
                {
                    let visibleCount = this.visibleCount;

                    // Cap the scroll amount to what is capable
                    if( SCROLL_UP && (visibleCount > this.firstScrollCtrlIndex) )
                    {
                        visibleCount = this.firstScrollCtrlIndex;
                    }
                    else if( SCROLL_DOWN &&
                           ((visibleCount + this.firstScrollCtrlIndex + this.visibleCount - 1) >= this.scrollControlAry.length) )
                    {
                        visibleCount = this.scrollControlAry.length - this.firstScrollCtrlIndex - this.visibleCount;
                    }

                    // Init the scroll
                    this.initScrolling( scrollVector, this.controlHeight * visibleCount, true, true );

                    // Deactivate the last control if the scrolling has been activated
                    if( this.scrollVector )
                    {
                        if( this.activeScrollCtrl != __WEBPACK_IMPORTED_MODULE_9__common_defs__["_58" /* NO_ACTIVE_CONTROL */] )
                            this.scrollControlAry[this.activeScrollCtrl].deactivateControl();
                    }
                }
                else
                {
                    this.activeScrollCtrl = this.firstScrollCtrlIndex;

                    if( SCROLL_DOWN )
                        this.activeScrollCtrl += this.visibleCount - 1;

                    // If the first control can't be selected, then find one that can
                    if( !this.activateScrollCtrl( this.activeScrollCtrl ) )
                        this.selectNextControl( -scrollVector );
                }
            }
        }
    }

    // 
    //  DESC: Handle the keyboard/Gamepad scrolling
    //
    handleKeyboardGamepadScroll( scrollVector )
    {
        // If there's no controls to select or reposition, do the scroll
        if( !this.selectAndRepositionCtrl( scrollVector ) )
        {
            // Try to select the next control
            let scrollResult = this.selectNextControl( scrollVector );

            // Scroll the contents of the scroll box if we need to activate a control
            // that's outside of the viewable area of the scroll box.
            if( !(scrollResult & IN_VIEWABLE_AREA) )
            {
                this.initScrolling( scrollVector, this.controlHeight );
            }
        }
    }

    // 
    //  DESC: Select the next control
    //
    selectNextControl( scrollVector )
    {
        // Set the active control to the viewable area
        this.setActiveCtrlToViewableArea( scrollVector );

        // Scroll to the next control in the viewable area
        let scrollResult = this.scrollToTheNextCtrlInViewableArea( scrollVector );

        // If we are still in the viewable area but have no active control,
        // try to activate the current control
        if( (scrollResult & IN_VIEWABLE_AREA) && !(scrollResult & NEW_ACTIVE_CTRL) )
        {
            __WEBPACK_IMPORTED_MODULE_5__managers_eventmanager__["a" /* eventManager */].dispatchEvent(
                __WEBPACK_IMPORTED_MODULE_9__common_defs__["W" /* EGE_MENU_CONTROL_STATE_CHANGE */],
                __WEBPACK_IMPORTED_MODULE_9__common_defs__["A" /* ECS_ACTIVE */],
                this.scrollControlAry[this.activeScrollCtrl] );
        }

        return scrollResult;
    }

    // 
    //  DESC: Do we need to select and reposition the control
    //
    selectAndRepositionCtrl( scrollVector )
    {
        // If there's no selected control, don't scroll
        // just select the first selectable control
        if( this.setActiveCtrlToViewableArea( scrollVector ) )
        {
            // If the first control can't be selected, then find one that can
            if( !this.activateScrollCtrl( this.activeScrollCtrl ) )
                this.selectNextControl( 1 );

            // Get the alignment to see if it needs to be adjusted
            let diff = this.getControlAlignment();
            if( diff > 0.1 )
            {
                let pos = this.scrollCurPos / this.controlHeight;

                let nextCtrl = (this.activeScrollCtrl - this.firstScrollCtrlIndex) * this.controlHeight;

                if( nextCtrl || (this.firstScrollCtrlIndex > pos) )
                    this.initScrolling( 1, this.controlHeight - diff, false );
                else
                    this.initScrolling( -1, diff, false );
            }

            return true;
        }

        return false;
    }

    // 
    //  DESC: Select the paged control
    //
    selectPagedControl( scrollVector )
    {
        this.activeScrollCtrl += scrollVector * this.visibleCount;

        // Cap the control index
        if( this.activeScrollCtrl <= 0 )
        {
            this.activeScrollCtrl = 0;
            scrollVector = 1;
        }
        else if( this.activeScrollCtrl >= this.scrollControlAry.length - 1 )
        {
            this.activeScrollCtrl = this.scrollControlAry.size() -1;
            scrollVector = -1;
        }

        // If the first control can't be selected, then find one that can
        if( !this.activateScrollCtrl( this.activeScrollCtrl ) )
            this.selectNextControl( scrollVector );
    }

    // 
    //  DESC: Set the active control to the viewable area
    //        This also deactivates the last known active control
    //
    setActiveCtrlToViewableArea( scrollVector )
    {
        // If the active control is not within the active area, make it so that it will be the first one selected
        if( (this.activeScrollCtrl < this.firstScrollCtrlIndex) || (this.activeScrollCtrl >= (this.firstScrollCtrlIndex + this.visibleCount)) )
        {
            if( this.activeScrollCtrl != __WEBPACK_IMPORTED_MODULE_9__common_defs__["_58" /* NO_ACTIVE_CONTROL */] )
                this.scrollControlAry[this.activeScrollCtrl].deactivateControl();

            this.activeScrollCtrl = this.firstScrollCtrlIndex;

            return true;
        }

        return false;
    }

    // 
    //  DESC: Scroll to the next control in the viewable area
    //
    scrollToTheNextCtrlInViewableArea( scrollVector )
    {
        let newActiveCtrl = 0;
        let inView = this.inView( this.activeScrollCtrl, scrollVector );

        // Only scroll within the viewable area
        if( inView )
        {
            // Set a temp variable to the active scroll control
            let tmpScrollCtrl = this.activeScrollCtrl;

            // Loop until we hit a selectable control
            do
            {
                tmpScrollCtrl += scrollVector;

                if( this.activateScrollCtrl( tmpScrollCtrl ) )
                {
                    newActiveCtrl = NEW_ACTIVE_CTRL;

                    this.activeScrollCtrl = tmpScrollCtrl;
                    break;
                }

                inView = this.inView( tmpScrollCtrl, scrollVector );
            }
            while( inView );
        }

        let result = inView | newActiveCtrl;

        return result;
    }

    // 
    //  DESC: See if we can activate this scroll control
    //
    activateScrollCtrl( scrollControlIndex )
    {
        if( (scrollControlIndex != __WEBPACK_IMPORTED_MODULE_9__common_defs__["_58" /* NO_ACTIVE_CONTROL */]) &&
            (scrollControlIndex < this.scrollControlAry.length) &&
            !this.scrollControlAry[scrollControlIndex].isDisabled() )
        {
            __WEBPACK_IMPORTED_MODULE_5__managers_eventmanager__["a" /* eventManager */].dispatchEvent(
                __WEBPACK_IMPORTED_MODULE_9__common_defs__["W" /* EGE_MENU_CONTROL_STATE_CHANGE */],
                __WEBPACK_IMPORTED_MODULE_9__common_defs__["A" /* ECS_ACTIVE */],
                this.scrollControlAry[scrollControlIndex] );

            return true;
        }

        return false;
    }

    // 
    //  DESC: Init the variables that scroll the contents of the scroll box
    //
    initScrolling( scrollVector, distance, endScrollSelection = true, paging = false )
    {
        if( this.scrollVector === 0 )
        {
            const SCROLL_DOWN = (scrollVector > 0);
            const SCROLL_UP = (scrollVector < 0);

            if( ((SCROLL_UP && (this.scrollCurPos > 0)) ||
                (SCROLL_DOWN && (this.scrollCurPos < this.maxMoveAmount))) )
            {
                this.scrollVector = scrollVector;
                this.scrollCounter = 0;
                this.endScroll = false;
                this.scrollMsg = false;
                this.paging = paging;
                this.endScrollSelection = endScrollSelection;
                this.scrollDistance = distance;
            }
        }
    }

    // 
    //  DESC: Handle the time based Scrolling of the contents of the scroll box
    //
    handleScrollUpdate()
    {
        if( this.scrollVector )
        {
            let dist = __WEBPACK_IMPORTED_MODULE_6__utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime * this.scrollSpeed;

            if( this.paging )
                dist = __WEBPACK_IMPORTED_MODULE_6__utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime * this.pageSpeed;

            if( this.scrollVector > 0 )
                this.scrollCurPos += dist;
            else
                this.scrollCurPos -= dist;

            this.subControlAry[0].setSlider(this.scrollCurPos);

            this.scrollCounter += dist;

            // Set the bounds
            this.setStartEndPos();

            if( this.scrollCounter >= this.scrollDistance )
            {
                if( this.endScroll || !this.scrollMsg || this.paging )
                {
                    this.alignScrollPostion();

                    if( this.endScrollSelection )
                    {
                        if( this.paging )
                            this.selectPagedControl( this.scrollVector );
                        else
                            this.selectNextControl( this.scrollVector );
                    }

                    // This has to be last
                    this.scrollVector = 0;
                }
                else
                {
                    this.scrollDistance += this.controlHeight;
                }
            }
            // Sanity check
            else if( (this.scrollCurPos < 0) || (this.scrollCurPos > this.maxMoveAmount) )
            {
                this.alignScrollPostion();
                this.scrollVector = 0;
            }

            // Reposition the scroll controls
            this.repositionScrollControls();
        }
    }

    // 
    //  DESC: Get the fractional amount the controls are off within the scroll box
    //
    getControlAlignment()
    {
        let pos = this.scrollCurPos / this.controlHeight;
        return this.controlHeight * Math.trunc(pos);
    }

    // 
    //  DESC: Is the scroll index in view
    //
    inView( scrollIndex, scrollVector )
    {
        return ((scrollVector < 0) && (scrollIndex > this.firstScrollCtrlIndex)) ||
               (((scrollVector > 0)) && (scrollIndex < (this.firstScrollCtrlIndex + this.visibleCount - 1)));
    }

    // 
    //  DESC: Get the reference to the subcontrol if found
    //
    findSubControlByName( name )
    {
        let ctrl = super.findSubControlByName( name );

        for( let i = this.visStartPos; i < this.visEndPos && (ctrl === null); ++i )
            ctrl = this.scrollControlAry[i].findControlByName( name );

        return ctrl;
    }

    // 
    //  DESC: Find the sub control via is pointer
    //
    findSubControlByRef( control )
    {
        let ctrl = super.findSubControlByRef( control );

        for( let i = this.visStartPos; i < this.visEndPos && (ctrl === null); ++i )
            if( this.scrollControlAry[i] === control )
                ctrl = this.scrollControlAry[i];

        return ctrl;
    }

    // 
    //  DESC: Handle the sub control mouse move
    //
    onSubControlMouseMove( event )
    {
        let result = super.onSubControlMouseMove( event );

        // We only care about the scroll controls if the point is within the scroll box
        if( !result && this.isPointInControl( event.clientX + __WEBPACK_IMPORTED_MODULE_5__managers_eventmanager__["a" /* eventManager */].mouseOffsetX, event.clientY + __WEBPACK_IMPORTED_MODULE_5__managers_eventmanager__["a" /* eventManager */].mouseOffsetY ) )
        {
            for( let i = this.visStartPos; i < this.visEndPos && !result; ++i )
            {
                result = this.scrollControlAry[i].onMouseMove( event );

                if( result )
                    this.activeScrollCtrl = i;
            }
        }

        return result;
    }

    // 
    //  DESC: Deactivate the sub control
    //
    deactivateSubControl()
    {
        super.deactivateSubControl();

        for( let i = this.visStartPos; i < this.visEndPos; ++i )
            this.scrollControlAry[i].deactivateControl();
    }

    // 
    //  DESC: Set the start and end positions
    //
    setStartEndPos()
    {
        let pos = this.scrollCurPos / this.controlHeight;

        // Push the ceiling so that the starting index is viewable
        this.firstScrollCtrlIndex = Math.trunc(pos + 0.7);

        this.visStartPos = Math.trunc(pos);
        this.visEndPos = this.visStartPos + this.visibleCount + 1;

        // Sanity checks
        if( this.visStartPos < 0 )
            this.visStartPos = 0;

        if( this.visEndPos > this.scrollControlAry.length )
            this.visEndPos = this.scrollControlAry.length;
    }

    // 
    //  DESC: Reposition the scroll controls
    //
    repositionScrollControls()
    {
        for( let i = this.visStartPos; i < this.visEndPos; ++i )
        {
            let pos = this.scrollControlAry[i].pos;
            let y = this.defaultOffsetAry[i] + this.scrollCurPos;
            this.scrollControlAry[i].setPosXYZ( pos.x, y, pos.z );
        }
    }

    // 
    //  DESC: Align the scroll box to it's proper stopping point
    //        to account for floating point movement
    //
    alignScrollPostion()
    {
        // Do bounds checking just for sanity reasons
        if( this.firstScrollCtrlIndex < 0 )
            this.firstScrollCtrlIndex = 0;

        else if( (this.firstScrollCtrlIndex + this.visibleCount) > this.scrollControlAry.length )
            this.firstScrollCtrlIndex = this.scrollControlAry.length - this.visibleCount;

        // Recalucate the scroll position which will wipe the fractional component
        this.scrollCurPos = this.firstScrollCtrlIndex * this.controlHeight;
    }

    // 
    //  DESC: Only deactivate sub controls
    //
    deactivateControl()
    {
        this.deactivateSubControl();
    }

    // 
    //  DESC: Set the alpha value of this control
    //
    setAlpha( alpha )
    {
        super.setAlpha( alpha );

        for( let i = this.visStartPos; i < this.visEndPos; ++i )
            this.scrollControlAry[i].setAlpha( alpha );
    }

    // 
    //  DESC: Get the pointer to the active control
    //
    getActiveControl()
    {
        let result = super.getActiveControl();

        if( result === null )
        {
            for( let i = 0; i < this.scrollControlAry.length; ++i )
            {
                if( this.scrollControlAry[i].state > __WEBPACK_IMPORTED_MODULE_9__common_defs__["C" /* ECS_INACTIVE */] )
                {
                    result = scrollControlAry[i].getActiveControl();
                    break;
                }
            }
        }

        return result;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UIScrollBox;



/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_timer__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_highresolutiontimer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_size__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uicontrol__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__script_scriptmanager__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_defs__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utilities_xmlparsehelper__ = __webpack_require__(7);

// 
//  FILE NAME: uimeter.js
//  DESC:      Class for user interface meters
//











// EBangType
const EBT_RAMP_UP = 0,
      EBT_LINEAR  = 1,
      EBT_HYBRID  = 2;
    
// EScaleType
const EST_AXIS     = 0,
      EST_ACCURATE = 1;
      
class BangRange
{
    constructor( target, bangType, velocity, estimatedTime, slowStartTime )
    {
        this.target = target;
        this.bangType = bangType;
        this.velocity = velocity;
        this.estimatedTime = estimatedTime;
        this.slowStartTime = slowStartTime;
    }
}

class UIMeter extends __WEBPACK_IMPORTED_MODULE_3__uicontrol__["a" /* UIControl */]
{
    constructor( group )
    {
        super( group );
        
        this.type = __WEBPACK_IMPORTED_MODULE_5__common_defs__["K" /* ECT_METER */];
        
        // Current value
        this.currentValue = 0;

        // Target value
        this.targetValue = 0;

        // Velocity value
        this.velocity = 0;

        // Terminal velocity value
        this.terminalVelocity = 0;

        // Acceleration value
        this.acceleration = 0;

        // Impulse value
        this.impulse = 0;

        // last value
        this.lastValue = 0;

        // fast bang time amount
        this.fastBangTime = 0;

        // bang up flag
        this.bangUp = false;

        // spin timer
        this.startUpTimer = new __WEBPACK_IMPORTED_MODULE_0__utilities_timer__["a" /* Timer */];

        // Current bang range
        this.bangRange = new BangRange;

        // Sprite reference to font
        this.fontSprite = null;

        // Bang range value
        this.bangRangeAry = [];

        // Max Font string size for this meter
        this.maxFontStrSize = null;

        // The amount to scale the font by to fit within the meter
        this.bangScaleAdjustment = new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */];

        // Scale on axis or accurate
        this.scaleType = EST_AXIS;

        // On meter script function names
        this.meterScriptFunction = new Map;
    }
    
    //
    //  DESC: Load the control info from XML node
    //
    loadFromNode( node )
    {
        super.loadFromNode( node );

        // Get the bang range info
        let bangRangeNode = node.getElementsByTagName( 'bangRange' );
        if( bangRangeNode.length )
        {
            // Get the fast bang time
            this.fastBangTime = Number(bangRangeNode[0].getAttribute( 'fastBangTime' ));

            // Set the scale type - How the font is scaled to fit within the meter
            if( bangRangeNode[0].getAttribute('scaleType') === 'accurate' )
                this.scaleType = EST_ACCURATE;

            let rangeNode = bangRangeNode[0].getElementsByTagName( 'range' );
            
            for( let i = 0; i < rangeNode.length; ++i )
            {
                let attr = rangeNode[i].getAttribute( 'bangUpType' );
                let bangType = EBT_RAMP_UP;
                if( attr === 'linear' )
                    bangType = EBT_LINEAR;
                else if( attr === 'hybrid' )
                    bangType = EBT_HYBRID;

                this.bangRangeAry.push( new BangRange(
                    Number(rangeNode[i].getAttribute( 'target' )),
                    bangType,
                    Number(rangeNode[i].getAttribute( 'velocity' )),
                    Number(rangeNode[i].getAttribute( 'estimatedTime' )),
                    Number(rangeNode[i].getAttribute( 'slowStartTime' )) ) );
            }
        }

        // Get the meter script functions
        let meterScriptNode = node.getElementsByTagName( 'meterScript' );
        if( meterScriptNode.length )
        {
            let attr = meterScriptNode[0].getAttribute( "onInit" )
            if( attr )
                this.meterScriptFunction.set( __WEBPACK_IMPORTED_MODULE_5__common_defs__["_30" /* EMSF_ON_INIT */], __WEBPACK_IMPORTED_MODULE_4__script_scriptmanager__["a" /* scriptManager */].get(attr) );

            attr = meterScriptNode[0].getAttribute( "onStart" )
            if( attr )
                this.meterScriptFunction.set( __WEBPACK_IMPORTED_MODULE_5__common_defs__["_31" /* EMSF_ON_START */], __WEBPACK_IMPORTED_MODULE_4__script_scriptmanager__["a" /* scriptManager */].get(attr) );
            
            attr = meterScriptNode[0].getAttribute( "onStop" )
            if( attr )
                this.meterScriptFunction.set( __WEBPACK_IMPORTED_MODULE_5__common_defs__["_32" /* EMSF_ON_STOP */], __WEBPACK_IMPORTED_MODULE_4__script_scriptmanager__["a" /* scriptManager */].get(attr) );
            
            attr = meterScriptNode[0].getAttribute( "onClear" )
            if( attr )
                this.meterScriptFunction.set( __WEBPACK_IMPORTED_MODULE_5__common_defs__["_29" /* EMSF_ON_CLEAR */], __WEBPACK_IMPORTED_MODULE_4__script_scriptmanager__["a" /* scriptManager */].get(attr) );
        }

        // Get the max size of the font string to fit within this meter.
        // As the string get's bigger, it will be scaled to fit.
        this.maxFontStrSize = __WEBPACK_IMPORTED_MODULE_6__utilities_xmlparsehelper__["j" /* loadSize */]( node );
    }

    //
    //  DESC: Load the control specific info from XML node
    //
    loadControlFromNode( controlNode )
    {
        // Call the parent
        super.loadControlFromNode( controlNode );

        // Find the sprite that renders the font
        this.findFontSprite();
    }
    
    // 
    //  DESC: Init the meter
    //  NOTE: Used to init this control manually
    //
    initMeter( fastBangTime, scaleType, sizeW, sizeH )
    {
        this.fastBangTime = fastBangTime;
        this.scaleType = scaleType;
        this.maxFontStrSize = new __WEBPACK_IMPORTED_MODULE_2__common_size__["a" /* Size */](sizeW, sizeH);
    }
    
    // 
    //  DESC: Set the bang range
    //  NOTE: Used to init this control manually
    //
    setBangeRange( target, bangUpType, velocity, estimatedTime, slowStartTime )
    {
        this.bangRangeAry.push( 
            new BangRange( target, bangUpType, velocity, estimatedTime, slowStartTime ) );
    }
    
    // 
    //  DESC: Load a sprite from an array
    //  NOTE: Used to init this control manually
    //
    loadSpriteFromArray( objectNameAry, spriteApplyIndex, stencilMaskSprite = null )
    {
        super.loadSpriteFromArray( objectNameAry );
        
        // Find the sprite that renders the font
        this.findFontSprite();
    }
    
    //
    //  DESC: Find the sprite that renders the font
    //
    findFontSprite()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
        {
            if( this.spriteAry[i].visualComponent.isFontSprite() )
            {
                this.fontSprite = this.spriteAry[i];
                break;
            }
        }

        if( this.fontSprite == null )
            throw new Error( `UI Meter doesn't have a sprite for rendering a font string (${this.name}).` );
    }

    //
    //  DESC: Set the amount to the meter without banging up
    //
    set( amount )
    {
        if( (amount > 0) && (amount !== this.currentValue) )
        {
            this.lastValue = this.currentValue;
            this.currentValue = this.targetValue = amount;

            // Display the value in the meter
            this.displayValue();
        }
    }

    //
    //  DESC: Start the bang range
    //
    startBangUp( amount )
    {
        if( amount !== this.currentValue )
        {
            this.targetValue = amount;
            this.bangUp = true;

            this.setBangRange();
        }
    }

    //
    //  DESC: Set the bang range
    //
    setBangRange()
    {
        let found = false;

        for( let i = 0; i < this.bangRangeAry.length; ++i )
        {
            if( (this.targetValue - this.currentValue) <= this.bangRangeAry[i].target )
            {
                found = true;
                this.initBangRange( this.bangRangeAry[i] );
                break;
            }
        }

        if( !found )
            this.initBangRange( this.bangRangeAry[this.bangRangeAry.length-1] );
    }

    //
    //  DESC: Init the bang range
    //
    initBangRange( bangRange )
    {
        this.bangRange = bangRange;
        this.terminalVelocity = 0.0;
        this.acceleration = 0.0;
        this.impulse = 0.0;
        this.bangScaleAdjustment.set(1,1);

        this.fontSprite.setScaleXYZ( 1, 1, 1 );

        this.velocity = bangRange.velocity / 1000.0;

        let range = this.targetValue - this.currentValue;

        // Ramp up from start to finish
        if( bangRange.bangType === EBT_RAMP_UP )
        {
            this.impulse = range / (bangRange.estimatedTime * bangRange.estimatedTime * 1000.0);
            this.acceleration = this.impulse;
        }
        // Linear bang up from the start
        else if( bangRange.bangType === EBT_LINEAR )
        {
            this.acceleration = range / (bangRange.estimatedTime * 1000.0);
        }
        // combination of ramp up and linear
        else if( bangRange.bangType === EBT_HYBRID )
        {
            this.terminalVelocity = range / (bangRange.estimatedTime * 1000.0);
            this.impulse = range / (bangRange.estimatedTime * bangRange.estimatedTime * 500.0);
            this.acceleration = impulse;
        }

        // Set the timer to allow the bang-up to start off slowly
        this.startUpTimer.set( bangRange.slowStartTime );

        let scriptFunc = this.meterScriptFunction.get( __WEBPACK_IMPORTED_MODULE_5__common_defs__["_31" /* EMSF_ON_START */] );
        if( scriptFunc )
            this.fontSprite.prepareScriptFactory( scriptFunc );
    }

    //
    //  DESC: Do a fast bang
    //
    fastBang()
    {
        if( this.bangUp )
        {
            let acceleration = (this.targetValue - this.currentValue) / this.fastBangTime;

            // use the fast bang acceleration if the current one is less
            if( this.acceleration < acceleration )
                this.acceleration = acceleration;
        }
    }

    //
    //  DESC: Update the control
    //
    update()
    {
        super.update();

        if( this.bangUp )
        {
            let elapsedTime = __WEBPACK_IMPORTED_MODULE_1__utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;

            // Ramp up from start to finish
            if( this.bangRange.bangType === EBT_RAMP_UP )
            {
                this.currentValue += this.velocity * elapsedTime;

                if( this.startUpTimer.expired() )
                {
                    this.velocity += this.acceleration * elapsedTime;
                    this.acceleration += this.impulse * elapsedTime;
                }
                else
                {
                    this.velocity += this.acceleration * elapsedTime;
                }
            }
            // Linear bang up from the start
            else if( this.bangRange.this.bangType === EBT_LINEAR )
            {
                this.currentValue += this.velocity;

                if( this.startUpTimer.expired() )
                    this.velocity += this.acceleration * elapsedTime;
            }
            // combination of ramp up and linear
            else if( this.bangRange.bangType === EBT_HYBRID )
            {
                this.currentValue += this.velocity;

                if( this.startUpTimer.expired() )
                {
                    if( this.terminalVelocity > this.acceleration )
                    {
                        this.velocity += this.acceleration * elapsedTime;
                        this.acceleration += this.impulse * elapsedTime;
                    }
                    else
                    {
                        this.velocity += this.acceleration * elapsedTime;
                    }
                }
                else
                {
                    this.velocity += this.acceleration * elapsedTime;
                }
            }

            // Only update the meter if the value is different
            if( this.lastValue != this.currentValue )
            {
                this.lastValue = this.currentValue;

                // check if the bang up has finished
                if( this.currentValue > this.targetValue )
                {
                    this.currentValue = this.targetValue;
                    this.bangUp = false;

                    // Call the script function if one is defined
                    let scriptFunc = this.meterScriptFunction.get( __WEBPACK_IMPORTED_MODULE_5__common_defs__["_31" /* EMSF_ON_START */] );
                    if( scriptFunc )
                        this.fontSprite.prepareScriptFactory( scriptFunc );
                }

                // Display the value in the meter
                this.displayValue();
            }
        }
    }

    //
    //  DESC: Display the value in the meter
    //
    displayValue()
    {
        // Display the new value
        this.fontSprite.visualComponent.createFontString( Math.trunc(this.currentValue).toString() );

        // Get the font size
        let size = this.fontSprite.visualComponent.getFontSize();

        // Check if the font string size is greater then what is allowed
        if( (size.w > this.maxFontStrSize.w) || (size.h > this.maxFontStrSize.h) )
        {
            let difW = this.maxFontStrSize.w / size.w;
            let difH = this.maxFontStrSize.h / size.h;

            // Is the difference less then the last size change
            if( (difW < this.bangScaleAdjustment.w) || (difH < this.bangScaleAdjustment.h) )
            {
                this.bangScaleAdjustment.set( difW, difH );

                let scaleX = this.fontSprite.scale.x;
                let scaleY = this.fontSprite.scale.y;
                if( difW < difH )
                {
                    scaleX = difW;
                    
                    if( this.scaleType !== EST_AXIS )
                        scaleY = difW;
                }
                else
                {
                    scaleY = difH;
                    
                    if( this.scaleType !== EST_AXIS )
                        scaleX = difH;
                }

                this.fontSprite.setScaleXYZ( scaleX, scaleY );
            }
        }
    }

    //
    //  DESC: Clear the meter
    //
    clear()
    {
        this.lastValue = this.currentValue = this.targetValue = 0;
        this.bangUp = false;
        
        let scriptFunc = this.meterScriptFunction.get( __WEBPACK_IMPORTED_MODULE_5__common_defs__["_29" /* EMSF_ON_CLEAR */] );
        if( scriptFunc )
            this.fontSprite.prepareScriptFactory( scriptFunc );
        else
            this.fontSprite.visualComponent.createFontString( this.currentValue.toString() );
    }
    
    //
    //  DESC: Is the meter banging
    //
    isBanging()
    {
        return this.bangUp;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UIMeter;



/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__managers_eventmanager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_defs__ = __webpack_require__(0);
// 
//  FILE NAME: menutree.js
//  DESC:      Class that hold a tree of menus
//





class MenuTree
{
    constructor( name, menuMap, rootMenu, defaultMenu, interfaceMenu = false )
    {
        // Name of the tree
        this.name = name;

        // Map of the menus
        this.menuMap = menuMap;

        // root menu
        this.rootMenu = menuMap.get( rootMenu );

        // default menu
        this.defaultMenu = menuMap.get( defaultMenu );

        // Is interface menu?
        this.interfaceMenu = interfaceMenu;

        // Name of menu we are transitioning to
        this.toMenu = '';

        // Array of the path taken through the menu
        this.menuPathAry = [];

        // menu tree state
        this.state = __WEBPACK_IMPORTED_MODULE_1__common_defs__["_37" /* EMTS_IDLE */];
    }
    
    // 
    //  DESC: Init the tree for use
    //
    init()
    {
        this.menuPathAry = [];

        if( this.rootMenu !== undefined )
        {
            // If we have a root menu, add it to the path
            this.menuPathAry.push( this.rootMenu );

            this.rootMenu.activateMenu();
        }
    }

    // 
    //  DESC: Update the menu tree
    //
    update()
    {
        if( this.menuPathAry.length )
            this.menuPathAry[this.menuPathAry.length-1].update();
    }
    
    // 
    //  DESC: Transform the menu tree
    //
    doTransform()
    {
        if( this.menuPathAry.length )
            this.menuPathAry[this.menuPathAry.length-1].doTransform();
    }
    
    // 
    //  DESC: do the render
    //
    render( matrix )
    {
        if( this.menuPathAry.length )
            this.menuPathAry[this.menuPathAry.length-1].render( matrix );
    }
    
    // 
    //  DESC: Is a menu active?
    //
    isActive()
    {
        return (this.menuPathAry.length > 0);

    }
    
    // 
    //  DESC: Does this tee have a root menu
    //
    hasRootMenu()
    {
        return (this.rootMenu != undefined);
    }
    
    // 
    //  DESC: Handle events
    //
    handleEvent( event )
    {
        // Trap only controller events to check for actions
        if( !this.interfaceMenu )
        {
            if( this.menuPathAry.length )
                this.menuPathAry[this.menuPathAry.length-1].handleEvent( event );

            if( event instanceof CustomEvent )
            {
                if( this.state === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_37" /* EMTS_IDLE */] )
                {
                    if( event.detail.type === __WEBPACK_IMPORTED_MODULE_1__common_defs__["Y" /* EGE_MENU_ESCAPE_ACTION */] )
                    {
                        this.onEscape( event );
                    }
                    else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_12" /* EGE_MENU_TOGGLE_ACTION */] )
                    {
                        this.onToggle( event );
                    }
                    else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_1__common_defs__["V" /* EGE_MENU_BACK_ACTION */] )
                    {
                        this.onBack( event );
                    }
                    else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_14" /* EGE_MENU_TO_TREE */] )
                    {
                        this.onToTree( event );
                    }
                    else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_13" /* EGE_MENU_TO_MENU */] )
                    {
                        this.onToMenu( event );
                    }
                }
                else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_15" /* EGE_MENU_TRANS_IN */] )
                {
                    this.onTransIn( event );
                }
                else if( event.detail.type === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_16" /* EGE_MENU_TRANS_OUT */] )
                {
                    this.onTransOut( event );
                }
            }
        }
        else
        {
            // Don't process menu specific messages for an interface menu
            if( (event instanceof CustomEvent) && event.detail.type <= __WEBPACK_IMPORTED_MODULE_1__common_defs__["Z" /* EGE_MENU_GAME_STATE_CHANGE */] )
                return;
                
            if( this.menuPathAry.length )
                this.menuPathAry[this.menuPathAry.length-1].handleEvent( event );
        }
    }
    
    // 
    //  DESC: Transition the menu
    //
    transitionMenu()
    {
        // If the path array is empty, transition to the default menu
        if( this.menuPathAry.length === 0 )
        {
            // Make sure the menu exists
            if( this.defaultMenu === undefined )
                throw new Error( 'Default menu does not exist!' );

            // Add the default menu to the path
            this.menuPathAry.push( this.defaultMenu );

            // Get the name of the menu we are transitioning to
            // This is also used as a flag to indicate moving up the menu tree
            this.toMenu = this.defaultMenu.name;

            // Set the state as "active" so that input messages are ignored
            this.state = __WEBPACK_IMPORTED_MODULE_1__common_defs__["_36" /* EMTS_ACTIVE */];

            // Start the transition in
            __WEBPACK_IMPORTED_MODULE_0__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_1__common_defs__["_15" /* EGE_MENU_TRANS_IN */], __WEBPACK_IMPORTED_MODULE_1__common_defs__["_50" /* ETC_BEGIN */] );
        }
        else
        {
            // If this isn't the root menu, start the transition out
            if( this.menuPathAry[this.menuPathAry.length-1] != this.rootMenu )
            {
                // Set the state as "active" so that input messages are ignored
                this.state = __WEBPACK_IMPORTED_MODULE_1__common_defs__["_36" /* EMTS_ACTIVE */];

                // Start the transition out
                __WEBPACK_IMPORTED_MODULE_0__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_1__common_defs__["_16" /* EGE_MENU_TRANS_OUT */], __WEBPACK_IMPORTED_MODULE_1__common_defs__["_50" /* ETC_BEGIN */] );
            }
        }
    }
    
    // 
    //  DESC: Handle OnEscape message
    //
    onEscape( event )
    {
        let nameStr = event.detail.arg[0];
        if( this.menuPathAry.length || ((nameStr !== null) && (nameStr === this.name)))
        {
            this.transitionMenu();
        }
    }
    
    // 
    //  DESC: Handle OnToggle message
    //
    onToggle( event )
    {
        let nameStr = event.detail.arg[0];
        if( this.menuPathAry.length || ((nameStr !== null) && (nameStr === this.name)))
        {
            // Toggle "on" only works when there is no root menu
            if( this.rootMenu === undefined )
            {
                this.transitionMenu();

                // For toggle, clear out the path array except for the current menu
                // The current menu will then be used for the transitions out
                if( this.menuPathAry.length > 1 )
                {
                    let curMenu = this.menuPathAry[this.menuPathAry.length-1];
                    this.menuPathAry = [];
                    this.menuPathAry.push( curMenu );
                }
            }
            else
            {
                if( this.menuPathAry.length > 1 )
                    this.transitionMenu();

                // For toggle, clear out the path array except for the current and root menu
                // The current menu will then be used for the transitions out
                if( this.menuPathAry.length > 2 )
                {
                    let curMenu = this.menuPathAry[this.menuPathAry.length-1];
                    this.menuPathAry = [];
                    this.menuPathAry.push( this.rootMenu );
                    this.menuPathAry.push( curMenu );
                }
            }
        }
    }
    
    // 
    //  DESC: Handle OnBack message
    //
    onBack( event )
    {
        // Going back one require there to be a active menu that is not root
        if( this.menuPathAry.length && (this.menuPathAry[this.menuPathAry.length-1] != this.rootMenu) )
        {
            this.transitionMenu();
        }
    }
    
    // 
    //  DESC: Handle OnToTree message
    //
    onToTree( event )
    {
        let nameStr = event.detail.arg[0];
        if( (nameStr !== null) && (nameStr === this.name) )
        {
            // Only works when there is no root menu
            if( this.rootMenu === undefined )
                this.transitionMenu();
        }
    }
    
    // 
    //  DESC: Handle OnToMenu message
    //
    onToMenu( event )
    {
        // Going to a menu require there to be a active menu
        // and the calling control is on a menu on this tree
        if( this.menuPathAry.length && 
            (this.menuPathAry[this.menuPathAry.length-1].getActiveControl() == event.detail.arg[1]) )
        {
            // Set the state as "active" so that input messages are ignored
            this.state = __WEBPACK_IMPORTED_MODULE_1__common_defs__["_36" /* EMTS_ACTIVE */];

            // Get the name of the menu we are transitioning to
            // This is also used as a flag to indicate moving deaper into the menu tree
            this.toMenu = event.detail.arg[0];

            // Do a sanity check to make sure the menu exists
            if( this.menuMap.get(this.toMenu) === undefined )
                throw new Error( `Menu does not exist! (${this.toMenu}).` );

            // Start the transition out
            __WEBPACK_IMPORTED_MODULE_0__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_1__common_defs__["_16" /* EGE_MENU_TRANS_OUT */], __WEBPACK_IMPORTED_MODULE_1__common_defs__["_50" /* ETC_BEGIN */] );
        }
    }
    
    // 
    //  DESC: Handle OnTransOut message
    //
    onTransOut( event )
    {
        if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_51" /* ETC_END */] )
        {
            if( this.toMenu.length )
            {
                this.menuPathAry.push( this.menuMap.get(this.toMenu) );
                __WEBPACK_IMPORTED_MODULE_0__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_1__common_defs__["_15" /* EGE_MENU_TRANS_IN */], __WEBPACK_IMPORTED_MODULE_1__common_defs__["_50" /* ETC_BEGIN */] );
            }
            else if( this.menuPathAry.length && (this.menuPathAry[this.menuPathAry.length-1] !== this.rootMenu) )
            {
                // Pop it off the array because this menu is done
                let menu = this.menuPathAry.pop();
                
                // Do a full reset on all the controls
                menu.reset();

                if( this.menuPathAry.length )
                    __WEBPACK_IMPORTED_MODULE_0__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_1__common_defs__["_15" /* EGE_MENU_TRANS_IN */], __WEBPACK_IMPORTED_MODULE_1__common_defs__["_50" /* ETC_BEGIN */] );
            }

            // Normally, after one menu transitions out, the next menu transitions in
            // Only set the idle state if this transition out is final
            if( this.menuPathAry.length === 0 )
                this.state = __WEBPACK_IMPORTED_MODULE_1__common_defs__["_37" /* EMTS_IDLE */];
        }
    }
    
    // 
    //  DESC: Handle OnTransIn message
    //
    onTransIn( event )
    {
        if( event.detail.arg[0] === __WEBPACK_IMPORTED_MODULE_1__common_defs__["_51" /* ETC_END */] )
        {
            // m_toMenu is also used as a flag to indicate moving up the menu tree
            // When moving up the menu tree, activate the first control on the menu
            // When backing out of the menu tree, activate the last control used
            __WEBPACK_IMPORTED_MODULE_0__managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_1__common_defs__["_9" /* EGE_MENU_SET_ACTIVE_CONTROL */], 
                (this.toMenu.length === 0) ? __WEBPACK_IMPORTED_MODULE_1__common_defs__["j" /* EAC_LAST_ACTIVE_CONTROL */] : __WEBPACK_IMPORTED_MODULE_1__common_defs__["i" /* EAC_FIRST_ACTIVE_CONTROL */] );

            // Set to idle to allow for input messages to come through
            this.state = __WEBPACK_IMPORTED_MODULE_1__common_defs__["_37" /* EMTS_IDLE */];

            // Clear in the event we start backing out of the menu tree
            this.toMenu = '';
        }
    }
    
    // 
    //  DESC: Get the active menu
    //
    getActiveMenu()
    {
        if( this.menuPathAry.length === 0 )
            throw new Error( 'There is no active menu!' );

        return this.menuPathAry[this.menuPathAry.length-1];
    }
    
    // 
    //  DESC: Get the scroll param data
    //
    getScrollParam( msg )
    {
        if( this.menuPathAry.length === 0 )
            throw new Error( 'There is no active menu!' );

        return this.menuPathAry[this.menuPathAry.length-1].getScrollParam( msg );
    }
    
    // 
    //  DESC: Is a menu item active
    //
    isMenuItemActive()
    {
        if( this.isActive() )
        {
            if( this.getActiveMenu().getActiveControl() !== null )
                return false;
        }

        return false;
    }
    
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MenuTree;



/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: sound.js
//  DESC:      Class to hold the sound reference and type
//



class Sound
{
    constructor( type = 0 )
    {
        // Sound type - loaded or stream
        this.type = type;
        
        // Audio context
        this.context = null;
        
        // Sound buffer
        this.buffer = null;

        // Sound source that needs to be recreated
        // each time the sound is played
        this.source = null;
        
        // Default volume of sound
        this.defaultVolume = 1;

        // Gain node for volume
        this.gainNode = null;
        
        // The time the sound started
        this.startTime = null;
        
        // Pause flag
        this.paused = false;
        
        // The play time
        this.playDuration = 0;
    }
    
    //
    //  DESC: Init the sound
    //
    loadFromNode( node )
    {
        // Set the volume if defined
        let attr = node.getAttribute( 'volume' );
        if( attr )
            this.defaultVolume = Number( attr );
    }
    
    //
    //  DESC: Init the sound
    //
    init( context, buffer )
    {
        this.context = context;
        this.buffer = buffer;
        
        this.gainNode = this.context.createGain();
        this.gainNode.gain.value = this.defaultVolume;
    }
    
    //
    //  DESC: Play the sound
    //
    play( loop = false, offset = 0 )
    {
        this.stop();
        
        this.playDuration = offset;
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;

        this.source.loop = loop;
        
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        
        this.startTime = this.context.currentTime;
        this.source.start(0, offset);
    }
    
    //
    //  DESC: Stop the sound
    //
    stop()
    {
        if( this.startTime )
        {
            this.startTime = null;
            this.paused = false;
            this.playDuration = 0;
            this.source.stop();
        }
    }
    
    //
    //  DESC: Pause the sound
    //
    pause()
    {
        if( !this.paused && this.startTime )
        {
            this.paused = true;
            this.playDuration += (this.context.currentTime - this.startTime);
            this.source.stop();
        }
    }
    
    //
    //  DESC: Resume the sound
    //
    resume()
    {
        if( this.paused )
        {
            this.paused = false;
            this.play(false, this.playDuration);
        }
    }
    
    //
    //  DESC: Set/get the volume (0..1)
    //
    setVolume( volume )
    {
        if( this.gainNode )
            this.gainNode.gain.value = volume;
    }
    
    setVolume( volume )
    {
        if( this.gainNode )
            return this.gainNode.gain.value;
        
        return 0;
    }

    //
    //  DESC: Is playing?
    //
    isPlaying()
    {
        return (this.startTime !== null);
    }

    //
    //  DESC: Is paused?
    //
    isPaused()
    {
        return this.paused;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sound;




/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_genfunc__ = __webpack_require__(4);

// 
//  FILE NAME: playlist.js
//  DESC:      Play list class
//





// EPlayListType
const EST_NULL       = 0,
             EST_RANDOM     = 1,
             EST_SEQUENTIAL = 2;
/* unused harmony export EST_NULL */

/* unused harmony export EST_RANDOM */

/* unused harmony export EST_SEQUENTIAL */


class PlayList
{
    constructor()
    {
        // Counter
        this.counter = 0;

        // current index
        this.current = 0;

        // playlist type - random or sequential
        this.type = EST_NULL;

        // array of sounds
        this.soundAry = [];
    }
    
    // 
    //  DESC: load the playlist from node
    //
    loadFromNode( node, soundGroupMap, group, filePath )
    {
        // Get the play type
        let playtype = node.getAttribute( 'playtype' );
        if( playtype )
        {
            if( playtype === 'random' )
                this.type = EST_RANDOM;
            
            else if( playtype === 'sequential' )
                this.type = EST_SEQUENTIAL;
        }
        
        // Get the sound list node
        let soundNode = node.children;
        if( soundNode.length )
        {
            for( let i = 0; i < soundNode.length; ++i )
            {
                // Get the id
                let id = soundNode[i].getAttribute( "id" );
                
                // Add the sound to the playlist
                let snd = soundGroupMap.get( id );
                if( snd )
                    this.soundAry.push( snd );
                else
                    throw new Error( `Playlist sound Id does not exist (${id}, ${group}, ${filePath})!` );
            }
        }
    }
    
    // 
    //  DESC: Get the sound for the playlist
    //
    getSound()
    {
        // Is it time to shuffle?
        if( (this.type === EST_RANDOM) && (this.counter === 0) )
            __WEBPACK_IMPORTED_MODULE_0__utilities_genfunc__["d" /* shuffle */]( this.soundAry );

        this.current = this.counter;
        this.counter = (this.counter + 1) % this.soundAry.length;

        return this.soundAry[this.current];
    }

    // 
    //  DESC: Play the play list
    //
    play( channel, loopCount )
    {
        if( (this.type === EST_RANDOM) && (this.counter === 0) )
            __WEBPACK_IMPORTED_MODULE_0__utilities_genfunc__["d" /* shuffle */]( this.soundAry );

        this.current = this.counter;
        this.soundAry[tihs.current].play( channel, loopCount );
        this.counter = (this.counter + 1) % this.soundAry.length;
    }

    // 
    //  DESC: Stop the sound
    //
    stop()
    {
        this.soundAry[this.current].stop();
    }

    // 
    //  DESC: Pause the sound
    //
    pause()
    {
        this.soundAry[this.current].pause();
    }

    // 
    //  DESC: Resume the sound
    //
    resume()
    {
        this.soundAry[this.current].resume();
    }

    // 
    //  DESC: Set/Get the volume for music or channel
    //
    setVolume( volume )
    {
        this.soundAry[this.current].setVolume( volume );
    }

    getVolume()
    {
        return this.soundAry[this.current].getVolume();
    }

    // 
    //  DESC: Is music or channel playing?
    //
    isPlaying()
    {
        return this.soundAry[this.current].isPlaying();
    }

    // 
    //  DESC: Is music or channel paused?
    //
    isPaused()
    {
        return this.soundAry[this.current].isPaused();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayList;



/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: statemessage.js
//  DESC:      This class is custom per game project
//



class StateMessage
{
    constructor()
    {
        this.loadState = 0;
        this.unloadState = 0;
    }
    
    setMsg( loadState, unloadState )
    {
        this.loadState = loadState;
        this.unloadState = unloadState;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StateMessage;



/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadScripts;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_utilities_highresolutiontimer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_managers_eventmanager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__library_managers_soundmanager__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__library_common_color__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utilityscripts__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__library_common_defs__ = __webpack_require__(0);

//
//  FILE NAME: menuscripts.js
//  DESC:      script for the menus
//











//
//  DESC: Script for playing the active sound
//
class Control_OnActive
{
    constructor( control )
    {
        this.control = control;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        __WEBPACK_IMPORTED_MODULE_3__library_managers_soundmanager__["a" /* soundManager */].play( '(menu)', 'active' );
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return true; }
}

//
//  DESC: Script for playing the select sound
//
class Control_OnSelect
{
    constructor( control )
    {
        this.control = control;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        __WEBPACK_IMPORTED_MODULE_3__library_managers_soundmanager__["a" /* soundManager */].play( '(menu)', 'select' );
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return true; }
}

//
//  DESC: Script for fading in the menu
//
class Menu_TransIn extends __WEBPACK_IMPORTED_MODULE_5__utilityscripts__["b" /* FadeTo */]
{
    constructor( menu )
    {
        super( 0, 1, 250 );
        
        this.menu = menu;
        this.menu.setAlpha( this.current );
        this.menu.setVisible( true );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
        {
            this.menu.setAlpha( this.final );
            
            __WEBPACK_IMPORTED_MODULE_2__library_managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_6__library_common_defs__["_15" /* EGE_MENU_TRANS_IN */], __WEBPACK_IMPORTED_MODULE_6__library_common_defs__["_51" /* ETC_END */] );
        }
        else
        {
            this.menu.setAlpha( this.current );
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

//
//  DESC: Script for fading out the menu
//
class Menu_TransOut extends __WEBPACK_IMPORTED_MODULE_5__utilityscripts__["b" /* FadeTo */]
{
    constructor( menu )
    {
        super( 1, 0, 250 );
        
        this.menu = menu;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
        {
            this.menu.setAlpha( this.final );
            this.menu.setVisible( false );
            
            __WEBPACK_IMPORTED_MODULE_2__library_managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_6__library_common_defs__["_16" /* EGE_MENU_TRANS_OUT */], __WEBPACK_IMPORTED_MODULE_6__library_common_defs__["_51" /* ETC_END */] );
        }
        else
        {
            this.menu.setAlpha( this.current );
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}


//
//  DESC: Script for setting the look of the disabled state
//
class Control_Disabled
{
    constructor( sprite )
    {
        this.sprite = sprite;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        let color = new __WEBPACK_IMPORTED_MODULE_4__library_common_color__["a" /* Color */];
        color.copy( this.sprite.getDefaultColor() );
        color.transformHSV( 0, 0, 1 );

        this.sprite.setColor( color );
        
        this.finished = true;
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

//
//  DESC: Script for setting the look of the inactive state
//
class Control_Inactive
{
    constructor( sprite )
    {
        this.sprite = sprite;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.sprite.setColor( this.sprite.getDefaultColor() );
        
        this.finished = true;
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

//
//  DESC: Script for setting the look of the hidden state
//
class Control_Hidden
{
    constructor( sprite )
    {
        this.sprite = sprite;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.sprite.setVisible( false );
        
        this.finished = true;
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}


//
//  DESC: Base script for animating the look of the active state
//
class Base_Control_Active
{
    constructor( sprite, hiHSV, lowHSV )
    {
        this.sprite = sprite;
        
        sprite.setVisible( true );

        this.hiColor = new __WEBPACK_IMPORTED_MODULE_4__library_common_color__["a" /* Color */];
        this.hiColor.copy( sprite.getDefaultColor() );
        this.hiColor.transformHSV( 0, 1, hiHSV );
        
        this.lowColor = new __WEBPACK_IMPORTED_MODULE_4__library_common_color__["a" /* Color */];
        this.lowColor.copy( sprite.getDefaultColor() );
        this.lowColor.transformHSV( 0, 1, lowHSV );
        
        this.colorTo = new __WEBPACK_IMPORTED_MODULE_5__utilityscripts__["a" /* ColorTo */];
        this.colorTo.init( sprite.getColor(), this.hiColor, 500 );
        
        this.toggle = false;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.colorTo.execute();
        
        this.sprite.setColor( this.colorTo.color );
        
        if( this.colorTo.isFinished )
        {
            if( this.toggle )
                this.colorTo.init( this.sprite.getColor(), this.hiColor, 500 );
            else
                this.colorTo.init( this.sprite.getColor(), this.lowColor, 500 );
            
            this.toggle = !this.toggle;
        }
    }
}

class Control_Active extends Base_Control_Active
{
    constructor( sprite )
    {
        super( sprite, 1.3, .5 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return false; }
}

class Control_Solid_Active extends Base_Control_Active
{
    constructor( sprite )
    {
        super( sprite, 1.1, .5 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return false; }
}


//
//  DESC: Base script for animating the look of the selected state
//        NOTE: Start the button on the hi color, transition
//              to the low color and then back to the hi color
//
class Base_Control_Selected
{
    constructor( sprite, hiHSV, lowHSV )
    {
        this.sprite = sprite;
        
        sprite.setVisible( true );

        this.hiColor = new __WEBPACK_IMPORTED_MODULE_4__library_common_color__["a" /* Color */];
        this.hiColor.copy( sprite.getDefaultColor() );
        this.hiColor.transformHSV( 0, 1, hiHSV );
        
        this.lowColor = new __WEBPACK_IMPORTED_MODULE_4__library_common_color__["a" /* Color */];
        this.lowColor.copy( sprite.getDefaultColor() );
        this.lowColor.transformHSV( 0, 1, lowHSV );
        
        this.colorTo = new __WEBPACK_IMPORTED_MODULE_5__utilityscripts__["a" /* ColorTo */];
        this.colorTo.init( this.hiColor, this.lowColor, 120 );
        
        this.toggle = false;
        this.finished = false;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.colorTo.execute();
        
        this.sprite.setColor( this.colorTo.color );
        
        if( this.colorTo.isFinished )
        {
            if( this.toggle )
            {
                this.sprite.setColor( this.sprite.getDefaultColor() );
                this.finished = true;
            }
            else
            {
                this.colorTo.init( this.sprite.getColor(), this.hiColor, 100 );
                
                this.toggle = true;
            }
        }
    }
}

//
//  DESC: Animates the selected state and sends a message
//
class Control_Selected_Dispatch_Exe extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite, 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
        {
            __WEBPACK_IMPORTED_MODULE_2__library_managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_6__library_common_defs__["_8" /* EGE_MENU_SELECT_EXECUTE */] );
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

class Control_Selected_Dispatch_Exe_Act extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite, 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
        {
            __WEBPACK_IMPORTED_MODULE_2__library_managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_6__library_common_defs__["_8" /* EGE_MENU_SELECT_EXECUTE */] );
            __WEBPACK_IMPORTED_MODULE_2__library_managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_6__library_common_defs__["_1" /* EGE_MENU_REACTIVATE */] );
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

class Control_Selected_Visible extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite, 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}


//
//  DESC: Animates the selected state and sends a message
//
class Control_Solid_Selected_visible extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite, 1.5, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

class Control_Selected extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite, 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
            this.sprite.setVisible( false );
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

class Control_Solid_Selected extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite, 1.5, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
            this.sprite.setVisible( false );
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

class Control_Selected_frame_highlight extends Base_Control_Selected
{
    constructor( sprite )
    {
        super( sprite, 1.7, 0.6 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        super.execute();
        
        if( this.finished )
            this.sprite.setRGBA( 1, 1, 1, 1 );
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}


//
//  DESC: Fast display of selected state
//
class Base_Control_Fast_Selected
{
    constructor( sprite, hiHSV )
    {
        this.sprite = sprite;
        
        sprite.setVisible( true );

        this.hiColor = new __WEBPACK_IMPORTED_MODULE_4__library_common_color__["a" /* Color */];
        this.hiColor.copy( sprite.getDefaultColor() );
        this.hiColor.transformHSV( 0, 1, hiHSV );
        this.finished = false;
        
        this.sprite.setColor( this.hiColor );
    }
}

class Control_Fast_Face_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite, 1.7 );
        
        this.time = 80;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.time -= __WEBPACK_IMPORTED_MODULE_0__library_utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;

        if( this.time < 0 )
        {
            this.sprite.setDefaultColor();
            this.finished = true;
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

class Control_Fast_Face_Selected_Act extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite, 1.7 );
        
        this.time = 80;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.time -= __WEBPACK_IMPORTED_MODULE_0__library_utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;

        if( this.time < 0 )
        {
            this.sprite.setDefaultColor();
            __WEBPACK_IMPORTED_MODULE_2__library_managers_eventmanager__["a" /* eventManager */].dispatchEvent( __WEBPACK_IMPORTED_MODULE_6__library_common_defs__["_1" /* EGE_MENU_REACTIVATE */] );
            this.finished = true;
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

class Control_Fast_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite, 1.7 );
        
        this.time = 80;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.time -= __WEBPACK_IMPORTED_MODULE_0__library_utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;

        if( this.time < 0 )
        {
            this.sprite.setVisible( false );
            this.finished = true;
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

class Control_Fast_Solid_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite, 1.7 );
        
        this.time = 80;
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
        this.time -= __WEBPACK_IMPORTED_MODULE_0__library_utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;

        if( this.time < 0 )
        {
            this.sprite.setVisible( false );
            this.finished = true;
        }
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return this.finished; }
}

class Control_slider_btn_Selected extends Base_Control_Fast_Selected
{
    constructor( sprite )
    {
        super( sprite, 1.7 );
    }
    
    // 
    //  DESC: Execute this script object
    //
    execute()
    {
    }
    
    // 
    //  DESC: Finished access function
    //
    get isFinished() { return true; }
}


// 
//  DESC: Load XML files
//
function loadScripts()
{
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_OnActive',
            ( control ) => { return new Control_OnActive( control ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_OnSelect',
            ( control ) => { return new Control_OnSelect( control ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Menu_TransIn',
            ( menu ) => { return new Menu_TransIn( menu ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Menu_TransOut',
            ( menu ) => { return new Menu_TransOut( menu ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Disabled',
            ( sprite ) => { return new Control_Disabled( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Inactive',
            ( sprite ) => { return new Control_Inactive( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Hidden',
            ( sprite ) => { return new Control_Hidden( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Active',
            ( sprite ) => { return new Control_Active( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Solid_Active',
            ( sprite ) => { return new Control_Solid_Active( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Selected_Dispatch_Exe',
            ( sprite ) => { return new Control_Selected_Dispatch_Exe( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Selected_Dispatch_Exe_Act',
            ( sprite ) => { return new Control_Selected_Dispatch_Exe_Act( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Selected_Visible',
            ( sprite ) => { return new Control_Selected_Visible( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Solid_Selected_visible',
            ( sprite ) => { return new Control_Solid_Selected_visible( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Selected',
            ( sprite ) => { return new Control_Selected( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Solid_Selected',
            ( sprite ) => { return new Control_Solid_Selected( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Selected_frame_highlight',
            ( sprite ) => { return new Control_Selected_frame_highlight( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Fast_Face_Selected',
            ( sprite ) => { return new Control_Fast_Face_Selected( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Fast_Face_Selected_Act',
            ( sprite ) => { return new Control_Fast_Face_Selected_Act( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Fast_Selected',
            ( sprite ) => { return new Control_Fast_Selected( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_Fast_Solid_Selected',
            ( sprite ) => { return new Control_Fast_Solid_Selected( sprite ); } );
            
    __WEBPACK_IMPORTED_MODULE_1__library_script_scriptmanager__["a" /* scriptManager */].set( 'Control_slider_btn_Selected',
            ( sprite ) => { return new Control_slider_btn_Selected( sprite ); } );
}


/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_managers_shadermanager__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_managers_texturemanager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_managers_vertexbuffermanager__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__library_managers_loadmanager__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__library_utilities_settings__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__library_2d_sprite2d__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__library_utilities_highresolutiontimer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__library_system_device__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__state_lobbystate__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__state_bigpaybackstate__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__gamestate__ = __webpack_require__(24);

// 
//  FILE NAME: loadstate.js
//  DESC:      All this state does is unload/load and does a state change.
//
















const MIN_LOAD_TIME = 1000;

class LoadState extends __WEBPACK_IMPORTED_MODULE_11__gamestate__["e" /* GameState */]
{
    constructor( stateMessage, stateChangeCallback )
    {
        super( __WEBPACK_IMPORTED_MODULE_11__gamestate__["b" /* GAME_STATE_LOAD */], stateMessage.loadState, stateChangeCallback );
        
        this.stateMessage.loadState = stateMessage.loadState;
        this.stateMessage.unloadState = stateMessage.unloadState;
        
        this.loadAnim = new __WEBPACK_IMPORTED_MODULE_6__library_2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_4__library_objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( '(loadingScreen)', 'loadAnim' ) );
        this.loadAnim.setPosXYZ( __WEBPACK_IMPORTED_MODULE_5__library_utilities_settings__["a" /* settings */].defaultSize_half.w - 150, -(__WEBPACK_IMPORTED_MODULE_5__library_utilities_settings__["a" /* settings */].defaultSize_half.h - 150), 0 );
        this.loadAnim.transform();
        
        this.frameCount = this.loadAnim.getFrameCount();
        
        this.loadFrameCounter = 0;
        
        this.stateChange = true;
        
        this.loadAnimInterval = 0;
    }
    
    // 
    //  DESC: Do any pre-game loop init's
    //
    init()
    {
        // Use the simple timer to see how long the download is
        __WEBPACK_IMPORTED_MODULE_7__library_utilities_highresolutiontimer__["a" /* highResTimer */].timerStart();
        
        let loadAnim = this.loadAnimUpdate.bind(this);
        this.loadAnimInterval = setInterval( () => loadAnim(), 83 );
        
        __WEBPACK_IMPORTED_MODULE_0__library_managers_shadermanager__["a" /* shaderManager */].setShaderValue4fv( 'shader_2d_spriteSheet', 'additive', [1, 1, 1, 1] );
        
        // Set the load manager's callback when everything is loaded
        __WEBPACK_IMPORTED_MODULE_3__library_managers_loadmanager__["a" /* loadManager */].loadCompleteCallback = this.loadFinished.bind(this);
        
        if( this.stateMessage.loadState === __WEBPACK_IMPORTED_MODULE_11__gamestate__["c" /* GAME_STATE_LOBBY */] )
            __WEBPACK_IMPORTED_MODULE_9__state_lobbystate__["b" /* load */]();
        
        else if( this.stateMessage.loadState === __WEBPACK_IMPORTED_MODULE_11__gamestate__["a" /* GAME_STATE_BIG_PAY_BACK */] )
            __WEBPACK_IMPORTED_MODULE_10__state_bigpaybackstate__["b" /* load */]();
        
        // Start the load
        __WEBPACK_IMPORTED_MODULE_3__library_managers_loadmanager__["a" /* loadManager */].load();
    }
    
    // 
    //  DESC: Load is completed so fade the logo out
    //
    loadFinished()
    {
        let loadTime = __WEBPACK_IMPORTED_MODULE_7__library_utilities_highresolutiontimer__["a" /* highResTimer */].timerStop();
        
        if( loadTime > MIN_LOAD_TIME )
        {
            this.displayComplete();
        }
        else
        {
            let displayCompleteCallback = this.displayComplete.bind(this);
            setTimeout( () => displayCompleteCallback(), MIN_LOAD_TIME - loadTime );
        }
    }
    
    // 
    //  DESC: Load is completed so fade the logo out
    //
    displayComplete()
    {
        if( this.loadAnimInterval !== 0 )
            clearInterval( this.loadAnimInterval );

        // Load is complete so continue onto the next state
        this.callback();
    }
    
    // 
    //  DESC: Clean up after the startup state
    //
    cleanUp()
    {
        __WEBPACK_IMPORTED_MODULE_0__library_managers_shadermanager__["a" /* shaderManager */].setShaderValue4fv( 'shader_2d_spriteSheet', 'additive', [0, 0, 0, 1] );
    }
    
    // 
    //  DESC: progress bar update
    //
    loadAnimUpdate()
    {
        __WEBPACK_IMPORTED_MODULE_8__library_system_device__["b" /* gl */].clear(__WEBPACK_IMPORTED_MODULE_8__library_system_device__["b" /* gl */].COLOR_BUFFER_BIT);
        
        this.loadAnim.render( __WEBPACK_IMPORTED_MODULE_8__library_system_device__["a" /* device */].orthographicMatrix );
        
        ++this.loadFrameCounter;
        
        this.loadAnim.setFrame( this.loadFrameCounter % this.frameCount );
        
        // Unbind everything after a round of rendering
        __WEBPACK_IMPORTED_MODULE_0__library_managers_shadermanager__["a" /* shaderManager */].unbind();
        __WEBPACK_IMPORTED_MODULE_1__library_managers_texturemanager__["a" /* textureManager */].unbind();
        __WEBPACK_IMPORTED_MODULE_2__library_managers_vertexbuffermanager__["a" /* vertexBufferManager */].unbind();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LoadState;



/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_timer__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icycleresults__ = __webpack_require__(110);

// 
//  FILE NAME: simplecycleresults.js
//  DESC:      Simple cycle results implementation
//






class SimpleCycleResults extends __WEBPACK_IMPORTED_MODULE_1__icycleresults__["a" /* iCycleResults */]
{
    constructor()
    {
        super();
        
        // cycle results timer
        this.cycleResultsTimer = new __WEBPACK_IMPORTED_MODULE_0__utilities_timer__["a" /* Timer */];
    }
    
    //
    //  DESC: Do some inits
    //
    init( slotGroupView, playResult )
    {
        this.slotGroupView = slotGroupView;
        this.playResult = playResult;
    }
    
    //
    //  DESC: Update the cycle results
    //
    update()
    {
        
    }
    
    //
    //  DESC: Start the cycle results
    //
    start()
    {
        if( this.playResult.getPayCount() > 0 )
        {
            super.start();

            this.slotGroupView.generateCycleResultSymbs();
        }
    }

    //
    //  DESC: Start the cycle results animation
    //
    startAnimation()
    {
        if( this.cycleResultsActive )
        {
            this.cycleResultsTimer.set( 1000 );

            let cycleResultSymbAry = this.slotGroupView.cycleResultSymbAry;

            let pay = this.playResult.getPay( this.cyclePayCounter );
            let symbPosAry = pay.symbPosAry;
            this.cyclePayCounter = (this.cyclePayCounter + 1) % this.playResult.getPayCount();

            // Set them all to a low alphs
            for( let i = 0; i < cycleResultSymbAry.length; ++i )
                for( let j = 0; j < cycleResultSymbAry[i].length; ++j )
                        cycleResultSymbAry[i][j].spriteAry[0].setAlpha( 0.2 );

            // Set only the winners to default color
            for( let i = 0; i < symbPosAry.length; ++i )
                cycleResultSymbAry[symbPosAry[i].reel][symbPosAry[i].pos].spriteAry[0].setDefaultColor();

            this.slotGroupView.setCycleResultText( true, pay );
        }
    }

    //
    //  DESC: Stop the cycle results animation
    //
    stopAnimation()
    {
        if(this.cycleResultsActive )
        {
            this.cycleResultsTimer.setExpired();

            let cycleResultSymbAry = this.slotGroupView.cycleResultSymbAry;
            
            // Set it all back to normal
            for( let i = 0; i < cycleResultSymbAry.length; ++i )
                for( let j = 0; j < cycleResultSymbAry[i].length; ++j )
                    cycleResultSymbAry[i][j].spriteAry[0].setDefaultColor();

            this.slotGroupView.setCycleResultText( false );

            this.slotGroupView.clearCycleResultSymbs();
        }
    }

    //
    //  DESC: Are we still animating
    //
    isAnimating()
    {
        return !this.cycleResultsTimer.expired();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SimpleCycleResults;



/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: icycleresults.js
//  DESC:      Interface for cycle results animations
//



class iCycleResults
{
    constructor()
    {
        // Pointer to the play result. NOTE: We don't own this pointer
        this.playResult = null;

        // Pointer to slot group view. NOTE: We don't own this pointer
        this.slotGroupView = null;

        // index into pay
        this.cyclePayCounter = 0;

        // Did we complete one animation cycle of all the pays
        this.firstCycleComplete = false;

        // Cycle results flag
        this.cycleResultsActive = false;
    }
    
    //
    //  DESC: Start the cycle results
    //
    start()
    {
        this.cycleResultsActive = true;
        this.firstCycleComplete = false;
        this.cyclePayCounter = 0;
    }
    
    //
    //  DESC: Stop the cycle results
    //
    stop()
    {
        this.cycleResultsActive = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = iCycleResults;



/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slotresults__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slotgroup__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__betmanager__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_timer__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__script_scriptcomponent__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__slotdefs__ = __webpack_require__(11);

// 
//  FILE NAME: slotgame.js
//  DESC:      Class for handling the slot game
//










class SlotGame
{
    constructor( group )
    {
        // Slot results class
        this.slotResults = new __WEBPACK_IMPORTED_MODULE_0__slotresults__["a" /* SlotResults */];

        // Slot group array
        this.slotGroupAry = [];

        // slot state
        this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["p" /* ESLOT_IDLE */];

        // stop spin music timer
        this.stopSpinMusicTimer = new __WEBPACK_IMPORTED_MODULE_3__utilities_timer__["a" /* Timer */];

        // For scripting needs
        this.scriptComponent = new __WEBPACK_IMPORTED_MODULE_4__script_scriptcomponent__["a" /* ScriptComponent */];

        // Slot group
        this.group = group;

        // Class for holding interface items
        // Does not own pointer. Do Not Free
        this.frontPanel = null;

        // bool to control the spotting of the spin music
        this.waitForSpinMusicTimer = false;

        // Spin start and stop music function calls
        this.spinMusicStartFunc = '';
        this.spinMusicStopFunc = '';
        this.spinMusicTimeOut = 0;

        // Flag to indicate spin music can be played
        this.allowSpinMusic = true;

        // Flag to indicate stop sounds can be played
        this.allowStopSounds = true;
        
        // Cycle results flag
        this.cycleResultsActive = false;
    }
    
    //
    //  DESC: Create the reel group. Math and video reel strips
    //
    createSlotGroup(
        slotDevice,
        slotStripSetId,
        paytableSetId,
        slotMath,
        viewReelCfgNode,
        viewSpinProfileCfgNode,
        symbolSetView,
        cycleResults )
    {
        let slotGroup = new __WEBPACK_IMPORTED_MODULE_1__slotgroup__["a" /* SlotGroup */]( slotDevice, slotMath, this.slotResults.create() );
        this.slotGroupAry.push( slotGroup );

        slotGroup.create(
            slotStripSetId,
            paytableSetId,
            viewReelCfgNode,
            viewSpinProfileCfgNode,
            symbolSetView,
            cycleResults );
    }

    //
    //  DESC: Load the slot config file
    //
    loadSlotConfig( node )
    {
        let spinMusicScriptFunNode = node.getElementsByTagName( 'spinMusicScriptFun' );
        if( spinMusicScriptFunNode.length )
        {
            this.spinMusicStartFunc = spinMusicScriptFunNode[0].getAttribute( "startMusic" );
            this.spinMusicStopFunc = spinMusicScriptFunNode[0].getAttribute( "stopMusic" );
            this.spinMusicTimeOut = Number(spinMusicScriptFunNode[0].getAttribute( "timeOut" ));
        }
    }
    
    //
    //  DESC: Init the sprite. This only matters if it's a sprite font.
    //
    init()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].init();
    }
    
    //
    //  DESC: Do some cleanup. This only matters if it's a sprite font.
    //
    cleanUp()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].cleanUp();
    }

    //
    //  DESC: Do we play the spin music
    //
    allowSpinMusic( allow )
    {
        this.allowSpinMusic = allow;
    }

    //
    //  DESC: Do we play the spin music
    //
    allowStopSounds( allow )
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].slotGroupView.allowStopSounds( allow );
    }

    //
    //  DESC: Go through the game state
    //
    processGameState()
    {
        switch( this.slotState )
        {
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["p" /* ESLOT_IDLE */]:                    this.stateIdle();                 break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["y" /* ESLOT_WAIT_CYCLE_RESULTS_STOP */]: this.stateWaitCycleResultsStop(); break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["q" /* ESLOT_PLACE_WAGER */]:             this.statePlaceWager();           break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["o" /* ESLOT_GENERATE_STOPS */]:          this.stateGenerateStops();        break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["n" /* ESLOT_EVALUATE */]:                this.stateEvaluate();             break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["w" /* ESLOT_PRE_SPIN */]:                this.statePreSpin();              break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["x" /* ESLOT_SPIN */]:                    this.stateSpin();                 break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["t" /* ESLOT_POST_SPIN */]:               this.statePostSpin();             break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["u" /* ESLOT_PRE_AWARD_WIN */]:           this.statePreAwardWin();          break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["l" /* ESLOT_BONUS_DECISION */]:          this.stateBonusDecision();        break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["v" /* ESLOT_PRE_BONUS */]:               this.statePreBonus();             break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["k" /* ESLOT_BONUS */]:                   this.stateBonus();                break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["s" /* ESLOT_POST_BONUS */]:              this.statePostBonus();            break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["r" /* ESLOT_POST_AWARD_WIN */]:          this.statePostAwardWin();         break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["z" /* ESLOT_WAIT_FOR_AWARD */]:          this.stateWaitForAward();         break;
            case __WEBPACK_IMPORTED_MODULE_5__slotdefs__["m" /* ESLOT_END */]:                     this.stateEnd();                  break;
        };
    }

    //
    //  DESC: State Idle slot
    //
    stateIdle()
    {
        // Fade down the music if the player is not spinning
        if( this.allowSpinMusic && this.waitForSpinMusicTimer && this.spinMusicStopFunc.length )
        {
            if( this.stopSpinMusicTimer.expired() )
            {
                //m_scriptComponent.Prepare( m_group, m_spinMusicStopFunc );
                this.waitForSpinMusicTimer = false;
            }
        }
    }
    
    //
    //  DESC: State Wait for the cycle results to stop
    //
    stateWaitCycleResultsStop()
    {
        if( !this.isCycleResultsAnimating() )
        {
            this.cycleResultsActive = false;

            for( let i = 0; i < this.slotGroupAry.length; ++i )
                this.slotGroupAry[i].stopCycleResults();

            this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["q" /* ESLOT_PLACE_WAGER */];
        }
    }

    //
    //  DESC: State Place Wager
    //
    statePlaceWager()
    {
        __WEBPACK_IMPORTED_MODULE_2__betmanager__["a" /* betManager */].deductBet();

        if( this.frontPanel )
            this.frontPanel.initGame( __WEBPACK_IMPORTED_MODULE_2__betmanager__["a" /* betManager */].getCredits() );

        this.slotResults.clear();

        /*if( this.allowSpinMusic && this.spinMusicStartFunc.length )
        {
            this.scriptComponent.StopAndRecycle( m_spinMusicStopFunc );
            this.scriptComponent.Prepare( m_group, m_spinMusicStartFunc );
        }*/

        this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["o" /* ESLOT_GENERATE_STOPS */];
    }

    //
    //  DESC: State Generate Stops
    //
    stateGenerateStops()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].slotGroupModel.generateStops();

        this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["n" /* ESLOT_EVALUATE */];
    }

    //
    //  DESC: State Evaluate
    //
    stateEvaluate()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].slotGroupModel.evaluate();

        this.slotResults.sortPays();
        this.slotResults.addUpWin();
        
        // console.log(`Total Win: ${this.slotResults.getTotalWin()}`);

        this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["w" /* ESLOT_PRE_SPIN */];
    }

    //
    //  DESC: State Pre Spin
    //
    statePreSpin()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].slotGroupView.startSpin();

        this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["x" /* ESLOT_SPIN */];
    }

    //
    //  DESC: State Spin
    //
    stateSpin()
    {
        let stopped = true;
        
        for( let i = 0; i < this.slotGroupAry.length; ++i )
        {
            if( !this.slotGroupAry[i].slotGroupView.isSpinState( __WEBPACK_IMPORTED_MODULE_5__slotdefs__["E" /* ESS_STOPPED */] ) )
            {
                stopped = false;
                break;
            }
        }

        if( stopped )
            this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["t" /* ESLOT_POST_SPIN */];
    }

    //
    //  DESC: State Post Spin
    //
    statePostSpin()
    {
        this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["u" /* ESLOT_PRE_AWARD_WIN */];
    }

    //
    //  DESC: State Pre Award Win
    //
    statePreAwardWin()
    {
        this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["l" /* ESLOT_BONUS_DECISION */];
    }

    //
    //  DESC: State Bonus Decision
    //
    stateBonusDecision()
    {
        this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["v" /* ESLOT_PRE_BONUS */];
    }

    //
    //  DESC: State Bonus Decision
    //
    statePreBonus()
    {
        this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["k" /* ESLOT_BONUS */];
    }

    //
    //  DESC: State Bonus
    //
    stateBonus()
    {
        this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["s" /* ESLOT_POST_BONUS */];
    }

    //
    //  DESC: State Post Bonus
    //
    statePostBonus()
    {
        this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["r" /* ESLOT_POST_AWARD_WIN */];
    }

    //
    //  DESC: State Post Award Win
    //
    statePostAwardWin()
    {
        if( this.slotResults.isWin() )
        {
            __WEBPACK_IMPORTED_MODULE_2__betmanager__["a" /* betManager */].addAward( this.slotResults.getTotalWin() );

            if( this.frontPanel )
                this.frontPanel.startBangUp( 
                    this.slotResults.getTotalWin(), __WEBPACK_IMPORTED_MODULE_2__betmanager__["a" /* betManager */].getCredits() );

            // Start the cycle results
            for( let i = 0; i < this.slotGroupAry.length; ++i )
                this.slotGroupAry[i].startCycleResults();

            // Start the cycle results
            this.cycleResultsActive = true;
        }

        this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["z" /* ESLOT_WAIT_FOR_AWARD */];
    }

    //
    //  DESC: State wait for the award to finish it's display
    //
    stateWaitForAward()
    {
        if( this.frontPanel )
        {
            if( !this.frontPanel.isBanging() )
                this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["m" /* ESLOT_END */];
        }
        else
        {
            this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["m" /* ESLOT_END */];
        }
    }

    //
    //  DESC: State End
    //
    stateEnd()
    {
        if( this.frontPanel )
            this.frontPanel.enableButtons( __WEBPACK_IMPORTED_MODULE_2__betmanager__["a" /* betManager */].allowPlay() );

        // Set the timer that waits to see if the music should time out
        this.stopSpinMusicTimer.set( this.spinMusicTimeOut );
        this.waitForSpinMusicTimer = true;

        this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["p" /* ESLOT_IDLE */];
    }

    //
    //  DESC: Handle events
    //
    handleEvent( event )
    {
    }

    //
    //  DESC: Update objects that require them
    //
    update()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].slotGroupView.update();
        
        // Start the cycle results animation if not currently animating
        if( this.cycleResultsActive )
        {
            if( !this.isCycleResultsAnimating() )
                for( let i = 0; i < this.slotGroupAry.length; ++i )
                    this.slotGroupAry[i].startCycleResultsAnimation();
        }

        this.scriptComponent.update();
    }

    //
    //  DESC: Transform the game objects
    //
    transform()
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].transform();
    }

    //
    //  DESC: 2D/3D Render of game content
    //
    render( matrix )
    {
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            this.slotGroupAry[i].render( matrix );
    }

    //
    //  DESC: Play a game
    //
    playGame( control )
    {
        if( this.slotState === __WEBPACK_IMPORTED_MODULE_5__slotdefs__["p" /* ESLOT_IDLE */] )
        {
            if( __WEBPACK_IMPORTED_MODULE_2__betmanager__["a" /* betManager */].allowPlay() )
            {
                if( this.cycleResultsActive )
                {
                    // Stop the cycle results
                    for( let i = 0; i < this.slotGroupAry.length; ++i )
                        this.slotGroupAry[i].stopCycleResultsAnimation();

                    this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["y" /* ESLOT_WAIT_CYCLE_RESULTS_STOP */];
                }
                else
                    this.slotState = __WEBPACK_IMPORTED_MODULE_5__slotdefs__["q" /* ESLOT_PLACE_WAGER */];
            }
        }
        else if( this.slotState === __WEBPACK_IMPORTED_MODULE_5__slotdefs__["x" /* ESLOT_SPIN */] )
        {
            for( let i = 0; i < this.slotGroupAry.length; ++i )
                this.slotGroupAry[i].slotGroupView.stopSpin();
        }
        else if( this.slotState === __WEBPACK_IMPORTED_MODULE_5__slotdefs__["z" /* ESLOT_WAIT_FOR_AWARD */] )
        {
            if( this.frontPanel )
                this.frontPanel.fastBang();
        }
    }

    //
    //  DESC: Set the front panel
    //
    setFrontPanel( frontPanel )
    {
        this.frontPanel = frontPanel;
    }
    
    //
    //  DESC: Is the cycle results animating
    //
    isCycleResultsAnimating()
    {
        let animating = false;
        
        for( let i = 0; i < this.slotGroupAry.length; ++i )
            animating |= this.slotGroupAry[i].isCycleResultsAnimating();

        return animating;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SlotGame;



/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__playresult__ = __webpack_require__(113);

// 
//  FILE NAME: slotresults.js
//  DESC:      Class of slot result's
//





class SlotResults
{
    constructor()
    {
        // Play result vector
        this.playResultAry = [];

        // Total win amount
        this.totalWinAmount = 0;
    }
    
    //
    //  DESC: Create a new play results entry into the vector
    //
    create()
    {
        let playResult = new __WEBPACK_IMPORTED_MODULE_0__playresult__["a" /* PlayResult */];
        this.playResultAry.push( playResult );

        return playResult;
    }

    //
    //  DESC: Clear the pays
    //
    clear()
    {
        this.totalWinAmount = 0;

        for( let i = 0; i < this.playResultAry.length; ++i )
            this.playResultAry[i].clear();
    }

    //
    //  DESC: Sort the pays
    //
    sortPays()
    {
        for( let i = 0; i < this.playResultAry.length; ++i )
            this.playResultAry[i].sortPays();
    }

    //
    //  DESC: Add up the win
    //
    addUpWin()
    {
        this.totalWinAmount = 0;
        
        for( let i = 0; i < this.playResultAry.length; ++i )
            this.totalWinAmount += this.playResultAry[i].addUpWin();
    }

    //
    //  DESC: Get the total win
    //
    getTotalWin()
    {
        return this.totalWinAmount;
    }

    //
    //  DESC: Do we have a win
    //
    isWin()
    {
        return (this.totalWinAmount > 0);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SlotResults;



/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pay__ = __webpack_require__(114);

// 
//  FILE NAME: playresult.js
//  DESC:      Class for holding pays
//





class PlayResult
{
    constructor()
    {
        // Array of pays
        this.payAry = [];

        // Total win amount
        this.totalWinAmount = 0;
    }
    
    //
    //  DESC: Add a slot pay
    //
    addPay( payType, payCombo, multiplier, winLine, symbPosAry )
    {
        this.payAry.push(
            new __WEBPACK_IMPORTED_MODULE_0__pay__["a" /* Pay */]( payType, payCombo.award, payCombo.bonusCode, multiplier, winLine, symbPosAry ) );
    }
    
    //
    //  DESC: Sort the pays
    //
    sortPays()
    {
        this.payAry.sort( ( a, b ) => { return (b.award - a.award); } );
    }

    //
    //  DESC: Add up the win
    //
    addUpWin()
    {
        this.totalWinAmount = 0;

        for( let i = 0; i < this.payAry.length; ++i )
            this.totalWinAmount += this.payAry[i].getFinalAward();

        return this.totalWinAmount;
    }

    //
    //  DESC: Clear the pays
    //
    clear()
    {
        this.totalWinAmount = 0;
        this.payAry = [];
    }

    //
    //  DESC: Get the pay
    //
    getPay( index )
    {
        return this.payAry[ index ];
    }

    //
    //  DESC: Get the number of pays
    //
    getPayCount()
    {
        return this.payAry.length;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayResult;



/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: pay.js
//  DESC:      Slot pay
//



class Pay
{
    constructor( payType, award, bonusCode, multiplier, payLine, symbPosAry )
    {
        // Type of pay that's being awarded
        this.payType = payType;

        // The amount of the win
        this.award = award;

        // bonus code
        this.bonusCode = bonusCode;

        // multiplier
        this.multiplier = multiplier;

        // Pay line the award was on
        this.payLine = payLine;

        // Array of symbol positions per reel that contribute to the win
        this.symbPosAry = symbPosAry;
    }
    
    //
    //  DESC: Get the final award
    //
    getFinalAward()
    {
        return this.award * this.multiplier;

    }   // GetAward
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pay;



/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slotgroupmodel__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reelgroupview__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wheelgroupview__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__slotdefs__ = __webpack_require__(11);

// 
//  FILE NAME: slotgroup.js
//  DESC:      Controller class for the slot group
//








class SlotGroup
{
    constructor( slotDevice, slotMath, playResult )
    {
        // Slot group model
        this.slotGroupModel = new __WEBPACK_IMPORTED_MODULE_0__slotgroupmodel__["a" /* SlotGroupModel */]( slotMath, playResult );

        // Slot group view
        if( slotDevice === __WEBPACK_IMPORTED_MODULE_3__slotdefs__["c" /* ED_REEL */] )
            this.slotGroupView = new __WEBPACK_IMPORTED_MODULE_1__reelgroupview__["a" /* ReelGroupView */]( this.slotGroupModel );
        
        else if( slotDevice === __WEBPACK_IMPORTED_MODULE_3__slotdefs__["d" /* ED_WHEEL */] )
            this.slotGroupView = new __WEBPACK_IMPORTED_MODULE_2__wheelgroupview__["a" /* WheelGroupView */]( this.slotGroupModel );
        
        else
            throw new Error( `Undefined slot device!` );

        // The reel group has it's own copy of the play result reference
        this.playResult = playResult;
        
        // Cycle results interface
        this.cycleResults = null;
    }
    
    //
    //  DESC: Create the slot group. Math and video slot strips
    //
    create(
        slotStripSetId,
        paytableSetId,
        viewSlotCfgNode,
        viewSpinProfileCfgNode,
        symbolSetView,
        cycleResults )
    {
        // Create the group model
        this.slotGroupModel.create( slotStripSetId, paytableSetId );

        // Create the group view
        this.slotGroupView.create( viewSlotCfgNode, symbolSetView );

        // Load the spin profile from XML node
        this.slotGroupView.loadSpinProfileFromNode( viewSpinProfileCfgNode );
        
        if( cycleResults )
        {
            this.cycleResults = cycleResults;
            this.cycleResults.init( this.slotGroupView, this.playResult );
        }
    }
    
    //
    //  DESC: Init the sprite. This only matters if it's a sprite font.
    //
    init()
    {
        this.slotGroupView.init();
    }
    
    //
    //  DESC: Do some cleanup. This only matters if it's a sprite font.
    //
    cleanUp()
    {
        this.slotGroupView.cleanUp();
    }

    //
    //  DESC: Start the cycle results
    //
    startCycleResults()
    {
        if( this.cycleResults )
            this.cycleResults.start();
    }

    //
    //  DESC: Stop the cycle results
    //
    stopCycleResults()
    {
        if( this.cycleResults )
            this.cycleResults.stop();
    }

    //
    //  DESC: Stop the cycle results animation
    //
    startCycleResultsAnimation()
    {
        if( this.cycleResults )
            this.cycleResults.startAnimation();
    }

    //
    //  DESC: Stop the cycle results animation
    //
    stopCycleResultsAnimation()
    {
        if( this.cycleResults )
            this.cycleResults.stopAnimation();
    }

    //
    //  DESC: Is the cycle results animating
    //
    isCycleResultsAnimating()
    {
        if( this.cycleResults )
            return this.cycleResults.isAnimating();

        return false;
    }
    
    //
    //  DESC: Transform the game objects
    //
    transform()
    {
        this.slotGroupView.transform();
    }
    
    //
    //  DESC: 2D/3D Render of game content
    //
    render( matrix )
    {
        this.slotGroupView.render( matrix );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SlotGroup;



/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_mersenne_twister__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slotstripmodel__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__symbolposition__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__betmanager__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__slotmathmanager__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__slotdefs__ = __webpack_require__(11);

// 
//  FILE NAME: slotgroupmodel.js
//  DESC:      Model class for the slot group
//










class SlotGroupModel
{
    constructor( slotMath, playResult )
    {
        // slot math reference
        this.slotMath = slotMath;

        // play result reference
        this.playResult = playResult;

        // Payline set
        this.paylineSet = __WEBPACK_IMPORTED_MODULE_4__slotmathmanager__["a" /* slotMathManager */].getPaylineSet( slotMath.paylineSetId );

        // Array of slot strip models
        this.slotStripModelAry = [];

        // Evaluation symbol arays
        this.evalMathSymbs = [];

        // Random number generation based on the Mersenne Twister algorithm
        this.rng = new __WEBPACK_IMPORTED_MODULE_0__utilities_mersenne_twister__["a" /* MersenneTwister */];

        // Paytable Set Id
        this.paytableSetId;
    }
    
    //
    //  DESC: Create the model strips
    //
    create( stripSetId, paytableSetId )
    {
        this.paytableSetId = paytableSetId;

        // Get the slot strip set
        let slotStripSetAry = this.slotMath.getSlotStripSet( stripSetId );

        // Create the model strips
        for( let i = 0; i < slotStripSetAry.length; ++i )
            this.slotStripModelAry.push(
                new __WEBPACK_IMPORTED_MODULE_1__slotstripmodel__["a" /* SlotStripModel */]( this.slotMath.getSlotStrip( slotStripSetAry[i].id ), this.rng, slotStripSetAry[i].evalSymbIndexAry ) );

        // Setup the evaluation arrays
        for( let i = 0; i < slotStripSetAry.length; ++i )
        {
            let evalSymbAry = [];
            this.evalMathSymbs.push( evalSymbAry );
            
            for( let j = 0; j < slotStripSetAry[i].evalSymbIndexAry.length; ++j )
                evalSymbAry.push(0);
        }
    }

    //
    //  DESC: Generate the stops
    //
    generateStops()
    {
        for( let i = 0; i < this.slotStripModelAry.length; ++i )
            this.slotStripModelAry[i].generateStop();
    }

    //
    //  DESC: Evaluate the strips
    //
    evaluate()
    {
        this.generateEvalSymbs();

        // Get the paytable set and evaluate as line pay or scatter
        let paytableSetAry = this.slotMath.getPaytableSet( this.paytableSetId );
        for( let i = 0; i < paytableSetAry.length; ++i )
        {
            if( paytableSetAry[i].type === __WEBPACK_IMPORTED_MODULE_5__slotdefs__["e" /* EP_PAYLINE */] )
                this.evaluateLinePays( paytableSetAry[i].id );

            else if( paytableSetAry[i].type === __WEBPACK_IMPORTED_MODULE_5__slotdefs__["f" /* EP_SCATTER */] )
                this.evaluateScatters( paytableSetAry[i].id );
        }
    }

    //
    //  DESC: Generate the evaluation symbols
    //
    generateEvalSymbs()
    {
        for( let strip = 0; strip < this.slotStripModelAry.length; ++strip )
        {
            let stop = this.slotStripModelAry[strip].stop;
            let evalSymbIndexAry = this.slotStripModelAry[strip].evalSymbIndexAry;

            for( let symb = 0; symb < evalSymbIndexAry.length; ++symb )
                this.evalMathSymbs[strip][symb] = this.slotStripModelAry[strip].getSymbol( stop + evalSymbIndexAry[symb] );
        }
    }

    //
    //  DESC: Evaluate the line pays
    //
    evaluateLinePays( paytable )
    {
        let payComboAry = this.slotMath.getPayComboSet( paytable );

        // An array of flags to indicate a payline has been awarded and is no longer checked
        let awarded = Array( this.paylineSet.line.length );

        for( let cbo = 0; cbo < payComboAry.length; ++cbo )
        {
            for( let payline = 0; payline < this.paylineSet.line.length; ++payline )
            {
                // Continue if this payline has already been awarded
                if( awarded[payline] )
                    continue;

                for( let strip = 0; strip < this.paylineSet.line[payline].length; ++strip )
                {
                    let pos = this.paylineSet.line[payline][strip];

                    let mathSymb = this.evalMathSymbs[strip][pos];

                    // Break here if not a match to start checking the next payline
                    if( !mathSymb.isMatch( payComboAry[cbo].symbol ) )
                        break;

                    // If we made it this far and the below condition is true, then it's a match
                    if( strip === payComboAry[cbo].count - 1 )
                    {
                        awarded[payline] = true;

                        this.addLinePay( payComboAry[cbo], payline, this.paylineSet );

                        break;
                    }
                }
            }
        }
    }

    //
    //  DESC: Add line pay to slot result
    //
    addLinePay( payCombo, payline, paylineSet )
    {
        let symbPos = [];

        // Copy over the symbol offsets for the number of strips effected by the win
        for( let i = 0; i < payCombo.count; ++i )
            symbPos.push( new __WEBPACK_IMPORTED_MODULE_2__symbolposition__["a" /* SymbolPosition */]( i, paylineSet.line[payline][i] ) );

        // Add the win to the play result
        this.playResult.addPay( __WEBPACK_IMPORTED_MODULE_5__slotdefs__["e" /* EP_PAYLINE */], payCombo, __WEBPACK_IMPORTED_MODULE_3__betmanager__["a" /* betManager */].lineBet, payline, symbPos );
    }

    //
    //  DESC: Evaluate the scatter pays
    //
    evaluateScatters( paytable )
    {
        let payComboAry = this.slotMath.getPayComboSet( paytable );

        // An array of each unique scatter symbol name in the paytable
        let symbAry = [];
        // A multi-dementional array to record the position of scatter symbols
        let posAryAry = [];

        // Record each unique scatter symbol and setup a multi-dementional array
        // to hold the list of positions of each scatter symbol found on the strips.
        for( let i = 0; i < payComboAry.length; ++i )
        {
            if( symbAry.indexOf( payComboAry[i].symbol ) === -1 )
            {
                symbAry.push( payComboAry[i].symbol );
                posAryAry.push([]);
            }
        }

        // Go through the eval symbols to find these symbols
        for( let strip = 0; strip < this.evalMathSymbs.length; ++strip )
        {
            for( let pos = 0; pos < this.evalMathSymbs[strip].length; ++pos )
            {
                // Check if these scatter positions are allowed
                if( this.paylineSet.scatter[strip].indexOf(pos) !== -1 )
                {
                    let mathSymb = this.evalMathSymbs[strip][pos];

                    for( let symb = 0; symb < symbAry.length; ++symb )
                    {
                        // If the symbol is a match, record it's position
                        if( mathSymb.isMatch( symbAry[symb] )  )
                        {
                            posAryAry[symb].push( new __WEBPACK_IMPORTED_MODULE_2__symbolposition__["a" /* SymbolPosition */]( strip, pos ) );
                        }
                    }
                }
            }
        }

        // Go throught the combo, check for the symbol and see if any of the counts match
        for( let i = 0; i < payComboAry.length; ++i )
        {
            for( let symb = 0; symb < symbAry.length; ++symb )
            {
                if( (payComboAry[i].symbol === symbAry[symb]) &&
                    (posAryAry[symb].length === payComboAry[i].count) )
                {
                    // Add the win to the play result
                    this.playResult.addPay( __WEBPACK_IMPORTED_MODULE_5__slotdefs__["f" /* EP_SCATTER */], payComboAry[i], __WEBPACK_IMPORTED_MODULE_3__betmanager__["a" /* betManager */].getTotalBet(), -1, posAryAry[symb] );
                }
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SlotGroupModel;



/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MersenneTwister; });

/*
  I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.
  
  If you want to use this as a substitute for Math.random(), use the random()
  method like so:
  
  var m = new MersenneTwister();
  var randomNumber = m.random();
  
  You can also call the other genrand_{foo}() methods on the instance.

  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:

  var m = new MersenneTwister(123);

  and that will always produce the same random sequence.

  Sean McCullough (banksean@gmail.com)
*/

/* 
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.
 
   Before using, initialize the state by using init_genrand(seed)  
   or init_by_array(init_key, key_length).
 
   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.                          
 
   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:
 
     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
 
     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
 
     3. The names of its contributors may not be used to endorse or promote 
        products derived from this software without specific prior written 
        permission.
 
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 
 
   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

var MersenneTwister = function(seed) {
  if (seed == undefined) {
    seed = new Date().getTime();
  } 
  /* Period parameters */  
  this.N = 624;
  this.M = 397;
  this.MATRIX_A = 0x9908b0df;   /* constant vector a */
  this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
  this.LOWER_MASK = 0x7fffffff; /* least significant r bits */
 
  this.mt = new Array(this.N); /* the array for the state vector */
  this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

  this.init_genrand(seed);
}  
 
/* initializes mt[N] with a seed */
MersenneTwister.prototype.init_genrand = function(s) {
  this.mt[0] = s >>> 0;
  for (this.mti=1; this.mti<this.N; this.mti++) {
      var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
   this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
  + this.mti;
      /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
      /* In the previous versions, MSBs of the seed affect   */
      /* only MSBs of the array mt[].                        */
      /* 2002/01/09 modified by Makoto Matsumoto             */
      this.mt[this.mti] >>>= 0;
      /* for >32 bit machines */
  }
}
 
/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
  var i, j, k;
  this.init_genrand(19650218);
  i=1; j=0;
  k = (this.N>key_length ? this.N : key_length);
  for (; k; k--) {
    var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30)
    this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
      + init_key[j] + j; /* non linear */
    this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
    i++; j++;
    if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
    if (j>=key_length) j=0;
  }
  for (k=this.N-1; k; k--) {
    var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
    this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
      - i; /* non linear */
    this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
    i++;
    if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
  }

  this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */ 
}
 
/* generates a random number on [0,0xffffffff]-interval */
MersenneTwister.prototype.genrand_int32 = function() {
  var y;
  var mag01 = new Array(0x0, this.MATRIX_A);
  /* mag01[x] = x * MATRIX_A  for x=0,1 */

  if (this.mti >= this.N) { /* generate N words at one time */
    var kk;

    if (this.mti == this.N+1)   /* if init_genrand() has not been called, */
      this.init_genrand(5489); /* a default initial seed is used */

    for (kk=0;kk<this.N-this.M;kk++) {
      y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
      this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    for (;kk<this.N-1;kk++) {
      y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
      this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
    this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

    this.mti = 0;
  }

  y = this.mt[this.mti++];

  /* Tempering */
  y ^= (y >>> 11);
  y ^= (y << 7) & 0x9d2c5680;
  y ^= (y << 15) & 0xefc60000;
  y ^= (y >>> 18);

  return y >>> 0;
}
 
/* generates a random number on [0,0x7fffffff]-interval */
MersenneTwister.prototype.genrand_int31 = function() {
  return (this.genrand_int32()>>>1);
}
 
/* generates a random number on [0,1]-real-interval */
MersenneTwister.prototype.genrand_real1 = function() {
  return this.genrand_int32()*(1.0/4294967295.0); 
  /* divided by 2^32-1 */ 
}

/* generates a random number on [0,1)-real-interval */
MersenneTwister.prototype.random = function() {
  return this.genrand_int32()*(1.0/4294967296.0); 
  /* divided by 2^32 */
}
 
/* generates a random number on (0,1)-real-interval */
MersenneTwister.prototype.genrand_real3 = function() {
  return (this.genrand_int32() + 0.5)*(1.0/4294967296.0); 
  /* divided by 2^32 */
}
 
/* generates a random number on [0,1) with 53-bit resolution*/
MersenneTwister.prototype.genrand_res53 = function() { 
  var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6; 
  return(a*67108864.0+b)*(1.0/9007199254740992.0); 
} 

/* These real versions are due to Isaku Wada, 2002/01/09 added */


/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: slotstripmodel.js
//  DESC:      Slot strip model
//



class SlotStripModel
{
    constructor( mathStripAry, rng, evalSymbIndexAry )
    {
        // Slot strip math symbols
        this.mathStripAry = mathStripAry;

        // Random number generator: Mersenne Twister algorithm
        this.rng = rng;

        // Array of eval indexes on this reel/wheel
        this.evalSymbIndexAry = evalSymbIndexAry;

        // last reel stop
        this.lastStop = 0;

        // reel stop
        this.stop = 0;
        
        // Get the total weight of the slot strip
        this.totalWeight = 0;
        for( let i = 0; i < this.mathStripAry.length; ++i )
            this.totalWeight += this.mathStripAry[i].weight;
    }
    
    //
    //  DESC: Generate the reel stop
    //
    generateStop()
    {
        this.lastStop = this.stop;
        this.stop = 0;
        let weightCount = 0;
        
        let awardedWeight = this.rng.genrand_int32() % (this.totalWeight + 1);
        
        for( let i = 0; i < this.mathStripAry.length; ++i )
        {
            weightCount += this.mathStripAry[i].weight;

            if( awardedWeight <= weightCount )
                break;

            ++this.stop;
        }
    }
    
    //
    //  DESC: Get the math symbol
    //
    getSymbol( stop )
    {
        let index = this.getSymbolIndex( stop );

        return this.mathStripAry[index].mathSymbol;
    }
    
    //
    //  DESC: Get the math symbol
    //
    getSymbolIndex( stop )
    {
        let index = Math.abs(stop) % this.mathStripAry.length;

        if( (stop < 0) && (index != 0) )
            index = this.mathStripAry.length - index;

        return index;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SlotStripModel;



/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: symbolposition.js
//  DESC:      Class for holding the symbol position on the reel strip
//



class SymbolPosition
{
    constructor( reel, pos )
    {
        // Reel index
        this.reel = reel;

        // Symbol position
        this.pos = pos;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SymbolPosition;



/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slotgroupview__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reelstripview__ = __webpack_require__(121);

// 
//  FILE NAME: reelgroupview.js
//  DESC:      View class for the reel group
//






class ReelGroupView extends __WEBPACK_IMPORTED_MODULE_0__slotgroupview__["a" /* SlotGroupView */]
{
    constructor( slotGroupModel )
    {
        super( slotGroupModel );
    }
    
    //
    //  DESC: Create the group views
    //
    create( node, symbolSetView )
    {
        super.create( node, symbolSetView );
        
        // Get the group name
        let group = node.getAttribute( 'group' );

        // Do some santy checks
        let reelNode = node.getElementsByTagName( 'reelstrip' );
        if( reelNode.length === 0 )
            throw new Error( 'Reel strip list node is empty!' );
        
        if( this.slotGroupModel.slotStripModelAry.length !== reelNode.length )
            throw new Error( 'Reelstrip model count does not match view count!' );
        
        // Build the visible symbol set
        symbolSetView.buildSymbolSetView();
        
        // Create the view reel strips
        for( let reel = 0; reel < reelNode.length; ++reel )
        {
            let reelStripView = new __WEBPACK_IMPORTED_MODULE_1__reelstripview__["a" /* ReelStripView */]( this.slotGroupModel.slotStripModelAry[reel], symbolSetView, reel );

            // Add the model reel strip to the view reel strip
            this.slotStripViewAry.push( reelStripView );
            reelStripView.create( reelNode[reel], group );
        }
        
        // Setup the cycle result symbol arrays
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
        {
            let cycleResultAry = [];
            this.cycleResultSymbAry.push( cycleResultAry );
            
            for( let j = 0; j < this.slotStripViewAry[i].visibleSymbCount; ++j )
                cycleResultAry.push(null);
        }
    }
    
    //
    //  DESC: Generate the cycle results symbols
    //
    generateCycleResultSymbs()
    {
        for( let reel = 0; reel < this.cycleResultSymbAry.length; ++reel )
        {
            let evalSymbIndexAry = this.slotGroupModel.slotStripModelAry[reel].evalSymbIndexAry;

            for( let symb = 0; symb < evalSymbIndexAry.length; ++symb )
                this.cycleResultSymbAry[reel][symb] = this.slotStripViewAry[reel].getCycleResultSymbol( evalSymbIndexAry[symb] );
        }
    }
    
    //
    //  DESC: Clear the cycle results symbols
    //
    clearCycleResultSymbs()
    {
        // This replaces the temporary cycle symbols with the ones used for spinning
        for( let reel = 0; reel < this.slotStripViewAry.length; ++reel )
            this.slotStripViewAry[reel].clearCycleResultSymbs();

        // Do clean up and free the memory allocated for the cycle result symbols
        this.freeCycleResultSymbs();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ReelGroupView;



/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__2d_object2d__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_timer__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spinprofile__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__symbol2d__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__2d_sprite2d__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_point__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__objectdatamanager_objectdatamanager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utilities_highresolutiontimer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__system_device__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__slotdefs__ = __webpack_require__(11);

// 
//  FILE NAME: reelstripview.js
//  DESC:      Reel strip view
//














class ReelStripView extends __WEBPACK_IMPORTED_MODULE_0__2d_object2d__["a" /* Object2D */]
{
    constructor( slotStripModel, symbolSetView, reelId )
    {
        super();
        
        // Spin state callback
        this.spinStateCallback = null;

        // Reel strip model
        this.slotStripModel = slotStripModel;
        
        // Symbol set view
        this.symbolSetView = symbolSetView;

        // The reel id
        this.reelId = reelId;

        // Number of visible symbols that are evaluated on this reel
        this.visibleSymbCount = slotStripModel.evalSymbIndexAry.length;

        // Number of buffer symbols
        this.bufferSymbols = 0;

        // Spin direction
        this.spinDir = __WEBPACK_IMPORTED_MODULE_9__slotdefs__["g" /* ESD_DOWN */];

        // Active display symbols
        this.symbolAry = [];

        // Symbol offsets
        this.symPosAry = [];

        // stencil mask sprite
        this.stencilMaskSprite;

        // sprite array
        this.spriteAry = [];

        // spin the reel
        this.spin = false;

        // spin distance
        this.spinDistance = 0;

        // Velocity of the spin
        this.velocity = 0;

        // Acceleration
        this.acceleration = 0;

        // Spin direction vector
        this.spinDirVector = -1;

        // Spin distance of the size of a symbol
        this.spinSymbDist = 0;

        // Stop for getting then next math symbol to spin
        this.spinStop = 0;

        // Close symbol alignment
        this.symbAlign = false;

        // Symbol alignment counter
        this.symbAlignCounter = 0;

        // Spin state
        this.spinState = __WEBPACK_IMPORTED_MODULE_9__slotdefs__["E" /* ESS_STOPPED */];

        // Spin Profile
        this.spinProfile = new __WEBPACK_IMPORTED_MODULE_2__spinprofile__["a" /* SpinProfile */];

        // Flag to disable spin timer
        this.disableSpinTimer = false;

        // Pointer to spin stop sound
        //CSound * pSpinStopSnd;

        // Do we allow stop sounds
        this.allowStopSounds = true;
        
        // spin timer
        this.spinTimer = new __WEBPACK_IMPORTED_MODULE_1__utilities_timer__["a" /* Timer */];
        // Set the value returned by Expired when the timer is disabled
        this.spinTimer.setDisableValue( true );
    }
    
    //
    //  DESC: Create the reel strip from data node
    //
    create( node, group )
    {
        // Get the number of buffer symbols
        this.bufferSymbols = Number(node.getAttribute( 'bufferSymbols' ));

        // Get the size of the symbol
        let symbolSizeW = Number(node.getAttribute( 'symbolWidth' ));
        let symbolSizeH = Number(node.getAttribute( 'symbolHeight' ));

        // Get the spin direction and set the spin direction vector
        this.spinDir = Number(node.getAttribute( 'spinDirection' ));
        this.spinSymbDist = symbolSizeH;

        if( (this.spinDir === __WEBPACK_IMPORTED_MODULE_9__slotdefs__["j" /* ESD_UP */]) || (this.spinDir === __WEBPACK_IMPORTED_MODULE_9__slotdefs__["i" /* ESD_RIGHT */])  )
            this.spinDirVector = 1;

        if( this.spinDir >= __WEBPACK_IMPORTED_MODULE_9__slotdefs__["h" /* ESD_LEFT */] )
            this.spinSymbDist = symbolSizeW;

        // Load the transform data from node
        this.loadTransFromNode( node );

        // Get the stencil mask object name
        let stencilMaskNode = node.getElementsByTagName( 'stencilMask' );
        if( stencilMaskNode.length )
        {
            let objectName = stencilMaskNode[0].getAttribute( 'objectName' );

            // Allocate the stencil
            this.stencilMaskSprite = new __WEBPACK_IMPORTED_MODULE_4__2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_6__objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( group, objectName ) );

            // Load the transform data
            this.stencilMaskSprite.loadTransFromNode( stencilMaskNode[0] );
        }

        // Get the sprite list if any
        let spriteLstNode = node.getElementsByTagName( 'spriteList' );
        if( spriteLstNode.length )
        {
            let spriteNode = spriteLstNode[0].children;
            for( let i = 0; i < spriteNode.length; ++i )
            {
                // Get the type of object
                let objectName = spriteNode[i].getAttribute( 'objectName' );

                let sprite = new __WEBPACK_IMPORTED_MODULE_4__2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_6__objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( group, objectName ) );
                this.spriteAry.push( sprite );

                // Load the transform data
                sprite.loadTransFromNode( spriteNode[i] );
            }
        }

        // Get the sprite list if any
        let stopSoundNode = node.getElementsByTagName( 'stopSound' );
        if( stopSoundNode.length )
        {
            let group = stopSoundNode[0].getAttribute( 'group' );
            let soundId = stopSoundNode[0].getAttribute( 'soundId' );

            //pSpinStopSnd = &CSoundMgr::Instance().GetSound( group, soundId );
        }
        
        // Init the reel strip with symbols
        this.initReelStrip();
    }

    //
    //  DESC: Init the reel strip with symbols
    //
    initReelStrip()
    {
        let totalSymbols = this.visibleSymbCount + (this.bufferSymbols * 2);
        let offset = (((totalSymbols - 1) * this.spinSymbDist) / 2);
        
        // Check that all the symbols on the reel strips have a visual symbol partner
        let mathStripAry = this.slotStripModel.mathStripAry;
        for( let i = 0; i < mathStripAry.length; ++i )
            this.symbolSetView.getSymbol( mathStripAry[i].mathSymbol.id );

        for( let i = 0; i < totalSymbols; ++i )
        {
            // Push it into the deque and set it's position
            // Get the current stop minus the buffer symbols because we render from top to bottom
            this.symbolAry.push( this.getSymbol( this.slotStripModel.lastStop - this.bufferSymbols + i ) );

            // Are we spinning up/down or left/right?
            if( this.spinDir <= __WEBPACK_IMPORTED_MODULE_9__slotdefs__["g" /* ESD_DOWN */] )
                this.symPosAry.push( new __WEBPACK_IMPORTED_MODULE_5__common_point__["a" /* Point */]( 0, -(i * this.spinSymbDist) + offset ) );
            else
                this.symPosAry.push( new __WEBPACK_IMPORTED_MODULE_5__common_point__["a" /* Point */]( -offset + (i * this.spinSymbDist), 0 ) );
        }
    }
    
    //
    //  DESC: Init the sprite. This only matters if it's a sprite font.
    //
    init()
    {
        // init the sprites
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].init();
    }
    
    //
    //  DESC: Do some cleanup. This only matters if it's a sprite font.
    //
    cleanUp()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].cleanUp();
    }

    //
    //  DESC: Get the symbol from the reel strip offset
    //
    getSymbol( stop )
    {
        // Get the math symbol
        let mathSymb = this.slotStripModel.getSymbol( stop );

        return this.symbolSetView.getSymbol( mathSymb.id );
    }
    
    //
    //  DESC: Get the cycle result symbol for this spot on the reel strip
    //        NOTE: Index assumes visible symbol that can animate
    //
    getCycleResultSymbol( index )
    {
        // Get the current symbol ID
        let symbId = this.symbolAry[this.bufferSymbols + index].id;

        // allocate a new symbol for the cycle results
        // NOTE: Recipient of this pointer is responsible for deleting it
        let symbol = new __WEBPACK_IMPORTED_MODULE_3__symbol2d__["a" /* Symbol2d */]( this.symbolSetView.getSpriteData( symbId ), symbId );

        // Replace the current symbol reference with the allocated one
        this.symbolAry[this.bufferSymbols + index] = symbol;

        return symbol;
    }
    
    //
    //  DESC: This replaces the temporary cycle symbols with the ones used for spinning
    //
    clearCycleResultSymbs()
    {
        for( let i = 0; i < this.visibleSymbCount; ++i )
        {
            let symbId = this.symbolAry[this.bufferSymbols + i].id;

            this.symbolAry[this.bufferSymbols + i] = this.symbolSetView.getSymbol( symbId );
        }
    }

    //
    //  DESC: Set the spin profile
    //
    setSpinProfile( spinProfile )
    {
        this.spinProfile.copy( spinProfile );
    }

    //
    //  DESC: Update the reel strip
    //
    update()
    {
        if( this.spin )
        {
            switch( this.spinState )
            {
                // Do the spin init and let it fall through to start the spin
                case __WEBPACK_IMPORTED_MODULE_9__slotdefs__["E" /* ESS_STOPPED */]:
                {
                    this.spinStop = this.slotStripModel.lastStop;

                    // Set the spin stop to the current stop with offset adjustments
                    if( (this.spinDir === __WEBPACK_IMPORTED_MODULE_9__slotdefs__["g" /* ESD_DOWN */]) || (this.spinDir === __WEBPACK_IMPORTED_MODULE_9__slotdefs__["i" /* ESD_RIGHT */]) )
                        this.spinStop -= this.bufferSymbols;
                    else
                        this.spinStop += this.visibleSymbCount + this.bufferSymbols;

                    this.velocity = 0.0;
                    this.acceleration = this.spinProfile.accelation;
                    this.spinTimer.set( this.spinProfile.startDelay );
                    this.spinState = __WEBPACK_IMPORTED_MODULE_9__slotdefs__["C" /* ESS_SPIN_STARTING */];
                }

                case __WEBPACK_IMPORTED_MODULE_9__slotdefs__["C" /* ESS_SPIN_STARTING */]:
                {
                    if( this.spinTimer.expired() )
                    {
                        // Increment the velocity and accelation
                        let elapsedTime = __WEBPACK_IMPORTED_MODULE_7__utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;
                        this.velocity += this.acceleration * elapsedTime;
                        this.acceleration += this.spinProfile.impulse * elapsedTime;

                        // Cap the velocity at the max speed
                        if( this.velocity >= this.spinProfile.maxVelocity )
                        {
                            this.velocity = this.spinProfile.maxVelocity;
                            this.spinTimer.set( this.spinProfile.maxVelocityTime );
                            this.spinState = __WEBPACK_IMPORTED_MODULE_9__slotdefs__["B" /* ESS_SPINNING */];
                        }

                        this.incSpin( this.velocity );
                    }

                    break;
                }

                case __WEBPACK_IMPORTED_MODULE_9__slotdefs__["B" /* ESS_SPINNING */]:
                {
                    this.incSpin( this.velocity );

                    // Disable the timer if fast stop is needed
                    this.spinTimer.disable( this.disableSpinTimer );

                    // Wait for the spin to expire
                    if( this.spinTimer.expired() && this.symbAlign )
                    {
                        // Set the new stop to start splicing at the end of the rendered strip
                        this.spinStop = this.slotStripModel.stop;

                        // Set the spin stop to the current stop with offset adjustments
                        if( (this.spinDir === __WEBPACK_IMPORTED_MODULE_9__slotdefs__["g" /* ESD_DOWN */]) || (this.spinDir === __WEBPACK_IMPORTED_MODULE_9__slotdefs__["i" /* ESD_RIGHT */]) )
                            this.spinStop += this.visibleSymbCount + this.bufferSymbols;
                        else
                            this.spinStop -= this.bufferSymbols + 1;

                        this.symbAlignCounter = 0;
                        
                        this.spinState = __WEBPACK_IMPORTED_MODULE_9__slotdefs__["A" /* ESS_PREPARE_TO_STOP */];
                    }

                    break;
                }

                case __WEBPACK_IMPORTED_MODULE_9__slotdefs__["A" /* ESS_PREPARE_TO_STOP */]:
                {
                    this.incSpin( this.velocity );

                    if( this.symbAlign )
                    {
                        // Wait for all but the last symbol to get into place
                        if( ++this.symbAlignCounter >= (this.visibleSymbCount + (this.bufferSymbols * 2) - 1) )
                        {
                            // Set a negative accelation slow down the spin to slightly pass that last symbol and cause a bounce up into position
                            this.acceleration = -(this.spinProfile.maxVelocity / (this.spinSymbDist + this.spinProfile.bounceCorrection));

                            // Set the spin timer as an eror catch for the next state
                            this.spinTimer.set( this.spinProfile.timeOutDelay );

                            this.spinState = __WEBPACK_IMPORTED_MODULE_9__slotdefs__["D" /* ESS_SPIN_STOPPING */];
                        }
                    }

                    break;
                }

                case __WEBPACK_IMPORTED_MODULE_9__slotdefs__["D" /* ESS_SPIN_STOPPING */]:
                {  
                    let elapsedTime = __WEBPACK_IMPORTED_MODULE_7__utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;
                    this.velocity += this.acceleration * elapsedTime;

                    // Add in the drag but keep it from turning the value positive
                    let drag = this.spinProfile.bounceDrag * elapsedTime;
                    if( (this.acceleration + drag) < -0.0 )
                        this.acceleration += drag;

                    // Once spin distance goes negative, we are coming back from the bounce.
                    // Spin has completed. This will also catch errors
                    // The spin timer here is also used as safty valve in the event of an error
                    // to force the reel to stop
                    if( (this.spinDistance < 0.0) || this.spinTimer.expired() )
                    {
                        // Stop the spin
                        this.velocity = 0.0;
                        this.spin = false;
                        this.disableSpinTimer = false;

                        // Hard set the final position of the symbols
                        this.finalizeSymbPos();

                        this.spinState = __WEBPACK_IMPORTED_MODULE_9__slotdefs__["E" /* ESS_STOPPED */];

                        // Send the signal of the spin state
                        if( this.spinStateCallback )
                            for( let i = 0; i < this.spinStateSignal.length; ++i )
                                this.spinStateSignal[i](this.reelId, __WEBPACK_IMPORTED_MODULE_9__slotdefs__["E" /* ESS_STOPPED */]);

                        /*if( this.allowStopSounds && (pSpinStopSnd != nullptr) )
                        {
                            const int channel = CSoundMgr::Instance().GetNextChannel();
                            pSpinStopSnd->Play( channel );
                        }*/

                        break;
                    }

                    this.incSpin( this.velocity );

                    break;
                }
            }
        }
    }

    //
    //  DESC: Inc the reel spin
    //
    incSpin( velocity )
    {
        // Get the distance traveled
        let dist = velocity * __WEBPACK_IMPORTED_MODULE_7__utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;

        // Are we spinning up/down or left/right?
        if( this.spinDir <= __WEBPACK_IMPORTED_MODULE_9__slotdefs__["g" /* ESD_DOWN */] )
        {
            // Increment the position of all the symbols
            for( let i = 0; i < this.symPosAry.length; ++i )
                this.symPosAry[i].incXYZ( 0, dist * this.spinDirVector );
        }
        else
        {
            // Increment the position of all the symbols
            for( let i = 0; i < this.symPosAry.length; ++i )
                this.symPosAry[i].incXYZ( dist * this.spinDirVector );
        }

        // Inc for distance checking
        this.spinDistance += dist;

        // Clear the alignment flag
        this.symbAlign = false;

        if( this.spinDistance >= this.spinSymbDist )
        {
            // Get the new symbol and set it's position
            if( this.spinDir <= __WEBPACK_IMPORTED_MODULE_9__slotdefs__["g" /* ESD_DOWN */] )
            {
                this.spinStop += this.spinDirVector;
            }
            else
            {
                this.spinStop -= this.spinDirVector;
            }
            
            dist = this.spinSymbDist;

            let symbol = this.getSymbol( this.spinStop );

            // Pop the old symbol and push the new one on based on the way it's spinning
            // Invert the spin direction vector to set the offset of the new symbol
            if( (this.spinDir === __WEBPACK_IMPORTED_MODULE_9__slotdefs__["g" /* ESD_DOWN */]) || (this.spinDir === __WEBPACK_IMPORTED_MODULE_9__slotdefs__["i" /* ESD_RIGHT */]) )
            {
                this.symbolAry.pop();
                this.symbolAry.unshift( symbol );
                
                let symPos = this.symPosAry.pop();
                
                if( this.spinDir <= __WEBPACK_IMPORTED_MODULE_9__slotdefs__["g" /* ESD_DOWN */] )
                    symPos.y = this.symPosAry[0].y + (dist * -this.spinDirVector);
                else
                    symPos.x = this.symPosAry[0].x + (dist * -this.spinDirVector);
                    
                this.symPosAry.unshift( symPos );
            }
            else
            {
                this.symbolAry.shift();
                this.symbolAry.push( symbol );
                
                let symPos = this.symPosAry.shift();
                
                if( this.spinDir <= __WEBPACK_IMPORTED_MODULE_9__slotdefs__["g" /* ESD_DOWN */] )
                    symPos.y = this.symPosAry[this.symPosAry.length-1].y + (dist * -this.spinDirVector);
                else
                    symPos.x = this.symPosAry[this.symPosAry.length-1].x + (dist * -this.spinDirVector);
                
                this.symPosAry.push( symPos );
            }

            // Reset the spin distance with the remainder
            this.spinDistance -= this.spinSymbDist;

            // Set the flag that indicates the reel is close to alignment
            // and a symbol was pushed on and popped off.
            this.symbAlign = true;
        }
    }

    //
    //  DESC: Hard set the final position of the symbols
    //
    finalizeSymbPos()
    {
        let offset = (((this.symPosAry.length - 1) * this.spinSymbDist) / 2);

        // Reset the position and the symbols of the strip
        for( let i = 0; i < this.symPosAry.length; ++i )
        {
            this.symbolAry[i] = this.getSymbol( this.slotStripModel.stop - this.bufferSymbols + i );

            // Are we spinning up/down or left/right?
            if( this.spinDir <= __WEBPACK_IMPORTED_MODULE_9__slotdefs__["g" /* ESD_DOWN */] )
                this.symPosAry[i].setXYZ( 0, -(i * this.spinSymbDist) + offset );
            else
                this.symPosAry[i].setXYZ( -offset + (i * this.spinSymbDist) );
        }
    }

    //
    //  DESC: Transform the reel strip
    //
    transform( matrix, tranformWorldPos )
    {
        super.transform( matrix, tranformWorldPos );

        // Transform the mask
        this.stencilMaskSprite.transform( this.matrix, this.wasWorldPosTranformed() );

        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
    }

    //
    //  DESC: do the render
    //
    render( matrix )
    {
        if( this.isVisible() )
        {
            for( let i = 0; i < this.spriteAry.length; ++i )
                this.spriteAry[i].render( matrix );

            // Disable rendering to the color buffer
            // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
            __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].colorMask( false, false, false, false );

            // Disable rendering to the depth mask
            __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].depthMask( false );

            // Start using the stencil
            __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].enable( __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].STENCIL_TEST );

            __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].stencilFunc( __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].ALWAYS, 0x1, 0x1 );
            __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].stencilOp( __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].REPLACE, __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].REPLACE, __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].REPLACE );


            this.stencilMaskSprite.render( matrix );


            // Re-enable color
            // NOTE: Using gl.FALSE or gl.TRUE causes a problem with this function call
            __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].colorMask( true, true, true, true );

            // Where a 1 was not rendered
            __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].stencilFunc( __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].EQUAL, 0x1, 0x1 );

            // Keep the pixel
            __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].stencilOp( __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].KEEP, __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].KEEP, __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].KEEP );

            // Enable rendering to the depth mask
            __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].depthMask( true );


            for( let i = 0; i < this.symbolAry.length; ++i )
            {
                this.symbolAry[i].setPos( this.symPosAry[i] );
                this.symbolAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
                this.symbolAry[i].render( matrix );
            }

            // Finished using stencil
            __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].disable( __WEBPACK_IMPORTED_MODULE_8__system_device__["b" /* gl */].STENCIL_TEST );
        }
    }

    //
    //  DESC: Start the spin
    //
    startSpin()
    {
        this.spin = true;
    }

    //
    //  DESC: Stop the spin
    //
    stopSpin()
    {
        if( this.spin && this.spinState < __WEBPACK_IMPORTED_MODULE_9__slotdefs__["A" /* ESS_PREPARE_TO_STOP */] )
            this.disableSpinTimer = true;
    }

    //
    //  DESC: Connect to the spin state callback
    //
    connect_SpinState( callback )
    {
        if( this.spinStateCallback === null )
            this.spinStateCallback = [];
        
        this.spinStateCallback.push( callback );
    }

    //
    //  DESC: Do we allow the stop sounds?
    //
    allowStopSounds( allow )
    {
        this.allowStopSounds = allow;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ReelStripView;



/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slotgroupview__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wheelview__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__slotdefs__ = __webpack_require__(11);

// 
//  FILE NAME: wheelgroupview.js
//  DESC:      Class for wheel group view
//







class WheelGroupView extends __WEBPACK_IMPORTED_MODULE_0__slotgroupview__["a" /* SlotGroupView */]
{
    constructor( slotGroupModel )
    {
        super( slotGroupModel );
    }
    
    //
    //  DESC: Create the group views
    //
    create( node, symbolSetView )
    {
        super.create( node, symbolSetView );
        
        let slotStripModelAry = this.slotGroupModel.slotStripModelAry;
        
        // Get the group name
        let group = node.getAttribute( 'group' );
        
        // Santy checks
        let wheelLstNode = node.getElementsByTagName( 'wheel' );
        if( wheelLstNode.length === 0 )
            throw new Error( 'Wheel list node is empty!' );
        
        // Create the wheel views
        for( let wheel = 0; wheel < wheelLstNode.length; ++wheel )
        {
            let wheelView = new __WEBPACK_IMPORTED_MODULE_1__wheelview__["a" /* WheelView */]( slotStripModelAry[wheel], symbolSetView, wheel );

            // Add the model slot strip to the wheel view
            this.slotStripViewAry.push( wheelView );
            wheelView.create( wheelLstNode[wheel], group );
        }
        
        // Setup the cycle result symbol arrays.
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
        {
            let cycleResultAry = [];
            this.cycleResultSymbAry.push( cycleResultAry );
            
            for( let symb = 0; symb < this.slotStripViewAry[i].symbolAry.length; ++symb )
                cycleResultAry.push(null);
        }
    }
    
    //
    //  DESC: Init the sprite. This only matters if it's a sprite font.
    //
    init()
    {
        super.init();
        
        // Do a one time transform of the non-rotating sprites
        this.transform();
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
            this.slotStripViewAry[i].preTransform();
    }
    
    //
    //  DESC: Generate the cycle results symbols
    //        NOTE: For a wheel, this is all of the symbol in a specific order
    //
    generateCycleResultSymbs()
    {
        for( let i = 0; i < this.slotStripViewAry.length; ++i )
        {
            let evalSymbIndexAry = this.slotGroupModel.slotStripModelAry[i].evalSymbIndexAry;
            
            // Get the first symbol index array as the starting point
            // NOTE: It is assumed these values as listed in the math file are in order from lowest to highest
            let evalStartPoint = evalSymbIndexAry[0];
            
            for( let symb = 0; symb < this.slotStripViewAry[i].symbolAry.length; ++symb )
                this.cycleResultSymbAry[i][symb] = this.slotStripViewAry[i].getSymbol( evalStartPoint + symb );
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WheelGroupView;



/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__2d_object2d__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__2d_sprite2d__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__slot_symbol2d__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spinprofile__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utilities_timer__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__objectdatamanager_objectdatamanager__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utilities_highresolutiontimer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__slotdefs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: wheelview.js
//  DESC:      View class for the wheel implementation
//             NOTE: Even though this is a wheel class and wheels have wedges, we're 
//                   using the Symbol2D as the wedge because it does the same thing.
//













class WheelView extends __WEBPACK_IMPORTED_MODULE_0__2d_object2d__["a" /* Object2D */]
{
    constructor( slotStripModel, symbolSetView, wheelId )
    {
        super();
        
        // Spin state callback
        this.spinStateCallback = null;
        
        // Slot strip model
        this.slotStripModel = slotStripModel;
        
        // Symbol set view
        this.symbolSetView = symbolSetView;
        
        // The degrees per math wedge
        this.degreePerWedge = (Math.PI * 2) / slotStripModel.mathStripAry.length;
        this.saftyCheckDegree = 0;

        // The wheel id
        this.wheelId = wheelId;

        // sprite array
        this.spriteAry = [];
        
        // sprite array
        this.wheelSpriteAry = [];
        
        // symbol array
        this.symbolAry = [];
        
        // Spin direction
        this.spinDir = __WEBPACK_IMPORTED_MODULE_7__slotdefs__["a" /* EDS_CLOCKWISE */];
        
        // Spin Profile
        this.spinProfile = new __WEBPACK_IMPORTED_MODULE_3__spinprofile__["a" /* SpinProfile */];
        
        // spin the wheel
        this.spinWheel = false;
        
        // Spin state
        this.spinState = __WEBPACK_IMPORTED_MODULE_7__slotdefs__["E" /* ESS_STOPPED */];
        
        // Velocity of the spin
        this.velocity = 0;

        // Acceleration
        this.acceleration = 0;

        // Spin direction vector
        this.spinDirVector = -1;
        
        // Flag to disable spin timer
        this.disableSpinTimer = false;
        
        // spin timer
        this.spinTimer = new __WEBPACK_IMPORTED_MODULE_4__utilities_timer__["a" /* Timer */];
        
        // Set the value returned by Expired when the timer is disabled
        this.spinTimer.setDisableValue( true );
        
        // The win point on the wheel
        this.winPointDegree;
        
        // The rotation amount that includes correction
        this.rotation = 0;
        
        // The rotation amount that does not include correction
        this.currentRotation = 0;
        
        // 360 degrees in radians
        this.PI_2 = Math.PI * 2;
    }
    
    //
    //  DESC: Create the wheel view from data node
    //
    create( node, group )
    {
        // Load the transform data from node
        let attr = node.getElementsByTagName( 'translation' );
        if( attr )
            this.loadTransFromNode( attr[0] );
        
        // Set the spin direction
        attr = node.getAttribute( 'spinDirection' );
        if( attr && (Number( attr ) === __WEBPACK_IMPORTED_MODULE_7__slotdefs__["b" /* EDS_COUNTERCLOCKWISE */]) )
        {
            this.spinDir = __WEBPACK_IMPORTED_MODULE_7__slotdefs__["b" /* EDS_COUNTERCLOCKWISE */];
            this.spinDirVector = 1;
        }
        
        // Load the wheel sprites from node
        this.loadWheelSprites( node, group );
        
        // Load the wheel wedges from node
        this.loadWedges( node, group );
        
        // Load the sprites from node. These are sprites that don't spin with the wheel
        this.loadSprites( node, group );
    }
    
    // 
    //  DESC: Load the wheel sprites from node.
    //        NOTE: These sprites spin with the wheel
    //
    loadWheelSprites( node, group )
    {
        let wheelSpriteLstNode = node.getElementsByTagName( 'wheelSpriteList' );
        if( wheelSpriteLstNode.length )
        {
            let spriteNode = wheelSpriteLstNode[0].getElementsByTagName( 'sprite' );
            
            for( let i = 0; i < spriteNode.length; ++i )
            {
                let objName = spriteNode[i].getAttribute( 'objectName' );
                if( !objName )
                    throw new Error( `Wheel sprite object name missing (${group})!` );
                
                // Allocate the sprite and add it to the array
                let sprite = new __WEBPACK_IMPORTED_MODULE_1__2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_5__objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( group, objName ) );
                this.wheelSpriteAry.push( sprite );
                
                // Load the transform data from node
                sprite.loadTransFromNode( spriteNode[i] );
            }
        }
    }
    
    // 
    //  DESC: Load the wheel wedges from node
    //
    loadWedges( node, group )
    {
        let wedgeNode = node.getElementsByTagName( 'wedge' );
        
        for( let i = 0; i < wedgeNode.length; ++i )
        {
            let symbId = wedgeNode[i].getAttribute( 'symb' );
            
            // Symbol, wedge, it's all the same thing... a container for sprites
            let symbol = new __WEBPACK_IMPORTED_MODULE_2__slot_symbol2d__["a" /* Symbol2d */]( this.symbolSetView.getSpriteData( symbId ), symbId );
            symbol.loadTransFromNode( wedgeNode[i] );
            
            this.symbolAry.push( symbol );
        }
    }
    
    // 
    //  DESC: Load the sprites from node.
    //        NOTE: These are sprites that don't spin with the wheel
    //
    loadSprites( node, group )
    {
        let spriteLstNode = node.getElementsByTagName( 'nonRotateSpriteList' );
        if( spriteLstNode.length )
        {
            let spriteNode = spriteLstNode[0].getElementsByTagName( 'sprite' );
            
            for( let i = 0; i < spriteNode.length; ++i )
            {
                let objName;
                let attr = spriteNode[i].getAttribute( 'objectName' );
                if( attr )
                    objName = attr;
                
                // Allocate the sprite and add it to the array
                let sprite = new __WEBPACK_IMPORTED_MODULE_1__2d_sprite2d__["a" /* Sprite2D */]( __WEBPACK_IMPORTED_MODULE_5__objectdatamanager_objectdatamanager__["a" /* objectDataManager */].getData( group, objName ) );
                this.spriteAry.push( sprite );
                
                // Load the transform data from node
                sprite.loadTransFromNode( spriteNode[i] );
            }
        }
    }
    
    //
    //  DESC: Do a one time transform of the non-rotating sprites
    //
    preTransform()
    {
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
    }
    
    // 
    //  DESC: Init the sprite
    //
    init()
    {
        for( let i = 0; i < this.wheelSpriteAry.length; ++i )
            this.wheelSpriteAry[i].init();
        
        for( let i = 0; i < this.symbolAry.length; ++i )
            this.symbolAry[i].init();
        
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].init();
    }
    
    //
    //  DESC: Do some cleanup
    //
    cleanUp()
    {
        for( let i = 0; i < this.wheelSpriteAry.length; ++i )
            this.wheelSpriteAry[i].cleanUp();
        
        for( let i = 0; i < this.symbolAry.length; ++i )
            this.symbolAry[i].cleanUp();
        
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].cleanUp();
    }
    
    //
    //  DESC: Get the symbol from the reel strip offset
    //
    getSymbol( index )
    {
        let stop = this.slotStripModel.stop + index;
        
        // Are the number of visual and math symbols equil?
        if( this.symbolAry.length === this.slotStripModel.mathStripAry.length )
        {
            let index = this.slotStripModel.getSymbolIndex( stop );

            return this.symbolAry[index];
        }

        // TODO: Need to handle this condition of unmatched math and visual symbol counts
        return this.symbolAry[0];
    }
    
    //
    //  DESC: Set the spin profile
    //
    setSpinProfile( spinProfile )
    {
        this.spinProfile.copy( spinProfile );
    }
    
    // 
    //  DESC: React to what the player is doing
    //
    update()
    {
        if( this.spinWheel )
        {
            switch( this.spinState )
            {
                // Do the spin init and let it fall through to start the spin
                case __WEBPACK_IMPORTED_MODULE_7__slotdefs__["E" /* ESS_STOPPED */]:
                {
                    if( this.spinDir === __WEBPACK_IMPORTED_MODULE_7__slotdefs__["a" /* EDS_CLOCKWISE */] )
                        this.winPointDegree = this.PI_2 - (this.degreePerWedge * (this.slotStripModel.stop));
                    else
                    {
                        // Special condition for stop zero checks
                        if( this.slotStripModel.stop === 0 )
                            this.winPointDegree = this.PI_2;
                        else
                            this.winPointDegree = this.degreePerWedge * this.slotStripModel.stop;
                    }

                    this.velocity = 0.0;
                    this.acceleration = this.spinProfile.accelation;
                    this.saftyCheckDegree = this.degreePerWedge / this.spinProfile.safetyCheckDivisor;
                    this.spinTimer.set( this.spinProfile.startDelay );
                    this.spinState = __WEBPACK_IMPORTED_MODULE_7__slotdefs__["C" /* ESS_SPIN_STARTING */];
                }

                case __WEBPACK_IMPORTED_MODULE_7__slotdefs__["C" /* ESS_SPIN_STARTING */]:
                {
                    if( this.spinTimer.expired() )
                    {
                        // Increment the velocity and acceleration
                        let elapsedTime = __WEBPACK_IMPORTED_MODULE_6__utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;
                        this.velocity += this.acceleration * elapsedTime;
                        this.acceleration += this.spinProfile.impulse * elapsedTime;

                        // Cap the velocity at the max speed
                        if( this.velocity >= this.spinProfile.maxVelocity )
                        {
                            this.velocity = this.spinProfile.maxVelocity;
                            this.spinTimer.set( this.spinProfile.maxVelocityTime );
                            this.spinState = __WEBPACK_IMPORTED_MODULE_7__slotdefs__["B" /* ESS_SPINNING */];
                        }

                        this.incSpin( this.velocity );
                    }

                    break;
                }

                case __WEBPACK_IMPORTED_MODULE_7__slotdefs__["B" /* ESS_SPINNING */]:
                {
                    this.incSpin( this.velocity );

                    // Disable the timer if fast stop is needed
                    this.spinTimer.disable( this.disableSpinTimer );

                    // Wait for the spin to expire and the rotation to be less then the win point degree
                    if( this.spinTimer.expired() && (this.rotation < this.winPointDegree) )
                        this.spinState = __WEBPACK_IMPORTED_MODULE_7__slotdefs__["A" /* ESS_PREPARE_TO_STOP */];

                    break;
                }

                case __WEBPACK_IMPORTED_MODULE_7__slotdefs__["A" /* ESS_PREPARE_TO_STOP */]:
                {
                    this.incSpin( this.velocity );
                    
                    // Wait for the unadjusted rotation to exceed the win point to start slowing down
                    if( (this.currentRotation > this.winPointDegree) )
                    {
                        // A velocity(4) / PI is the exact deceleration to slow down within 1 rotation
                        let vel = this.spinProfile.maxVelocity * 1000.0;
                        this.acceleration = 
                            (this.velocity / ((Math.PI * (4.0 / vel)) * this.spinProfile.decelerationRotationCount)) / 1000.0;

                        this.spinState = __WEBPACK_IMPORTED_MODULE_7__slotdefs__["D" /* ESS_SPIN_STOPPING */];
                    }

                    break;
                }

                case __WEBPACK_IMPORTED_MODULE_7__slotdefs__["D" /* ESS_SPIN_STOPPING */]:
                {
                    // Decrement the velocity and accelation
                    let elapsedTime = __WEBPACK_IMPORTED_MODULE_6__utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;
                    this.velocity -= this.acceleration * elapsedTime;

                    if( this.velocity < 0.0 )
                    {
                        // Stop the spin
                        this.velocity = 0.0;
                        this.spinWheel = false;
                        this.disableSpinTimer = false;
                        
                        // Sanity check the bounds in which we stopped and reset if needed
                        let maxRot = this.winPointDegree + this.saftyCheckDegree;
                        let minRot = this.winPointDegree - this.saftyCheckDegree;
                        
                        // There's a special case for the first stop
                        if( (this.slotStripModel.stop === 0) && (this.rotation < 6.0) )
                        {
                            if( this.rotation > this.saftyCheckDegree )
                            {
                                this.rotation = maxRot;
                                this.incSpin( this.velocity );
                            }
                        }
                        else
                        {
                            if( this.rotation > maxRot )
                            {
                                this.rotation = maxRot;
                                this.incSpin( this.velocity );
                            }
                            else if( this.rotation < minRot )
                            {
                                this.rotation = minRot;
                                this.incSpin( this.velocity );
                            }
                        }

                        this.spinState = __WEBPACK_IMPORTED_MODULE_7__slotdefs__["E" /* ESS_STOPPED */];

                        // Send the signal of the spin state
                        if( this.spinStateCallback )
                            for( let i = 0; i < this.spinStateSignal.length; ++i )
                                this.spinStateSignal[i](this.reelId, __WEBPACK_IMPORTED_MODULE_7__slotdefs__["E" /* ESS_STOPPED */]);

                        /*if( this.allowStopSounds && (pSpinStopSnd != nullptr) )
                        {
                            const int channel = CSoundMgr::Instance().GetNextChannel();
                            pSpinStopSnd->Play( channel );
                        }*/

                        break;
                    }

                    this.incSpin( this.velocity );

                    break;
                }
            }
        }
    }
    
    //
    //  DESC: Inc the reel spin
    //
    incSpin( velocity )
    {
        // Get the rotation traveled
        this.rotation += velocity * __WEBPACK_IMPORTED_MODULE_6__utilities_highresolutiontimer__["a" /* highResTimer */].elapsedTime;
        this.currentRotation = this.rotation;
        
        if( this.rotation >= this.PI_2 )
            this.rotation -= this.PI_2;
        
        this.setRotXYZ( 0, 0, this.rotation * this.spinDirVector, false );
    }
    
    //
    //  DESC: Transform
    //
    transform( matrix, tranformWorldPos )
    {
        super.transform( matrix, tranformWorldPos );
        
        for( let i = 0; i < this.wheelSpriteAry.length; ++i )
            this.wheelSpriteAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
        
        for( let i = 0; i < this.symbolAry.length; ++i )
            this.symbolAry[i].transform( this.matrix, this.wasWorldPosTranformed() );
    }
    
    // 
    //  DESC: do the render
    //
    render( matrix )
    {
        for( let i = 0; i < this.wheelSpriteAry.length; ++i )
            this.wheelSpriteAry[i].render( matrix );
        
        for( let i = 0; i < this.symbolAry.length; ++i )
            this.symbolAry[i].render( matrix );
        
        for( let i = 0; i < this.spriteAry.length; ++i )
            this.spriteAry[i].render( matrix );
    }
    
    //
    //  DESC: Start the spin
    //
    startSpin()
    {
        this.spinWheel = true;
    }

    //
    //  DESC: Stop the spin
    //
    stopSpin()
    {
        if( this.spin && this.spinState < __WEBPACK_IMPORTED_MODULE_7__slotdefs__["A" /* ESS_PREPARE_TO_STOP */] )
            this.disableSpinTimer = true;
    }

    //
    //  DESC: Connect to the spin state callback
    //
    connect_SpinState( callback )
    {
        if( this.spinStateCallback === null )
            this.spinStateCallback = [];
        
        this.spinStateCallback.push( callback );
    }

    //
    //  DESC: Do we allow the stop sounds?
    //
    allowStopSounds( allow )
    {
        this.allowStopSounds = allow;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WheelView;




/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_slot_ifrontpanel__ = __webpack_require__(125);

// 
//  FILE NAME: frontpanel.js
//  DESC:      front panel class
//





class FrontPanel extends __WEBPACK_IMPORTED_MODULE_0__library_slot_ifrontpanel__["a" /* iFrontPanel */]
{
    constructor()
    {
        super();
        
        // Win meter
        this.winMeter = null;

        // Credit meter
        this.creditMeter = null;
    }
    
    // 
    //  DESC: Set the meters
    //
    setMeters( winMeter, creditMeter )
    {
        this.winMeter = winMeter;
        this.creditMeter = creditMeter;
    }
    
    // 
    //  DESC: Init a new game
    //
    initGame( credits )
    {
        if( this.winMeter )
            this.winMeter.clear();

        if( this.creditMeter )
            this.creditMeter.set( credits );

        //for( auto iter : m_pOtherBtnVec )
        //    iter->DisableControl();
    }

    // 
    //  DESC: Start the bang up
    //
    startBangUp( win, credits )
    {
        if( this.winMeter )
            this.winMeter.startBangUp( win );

        if( this.creditMeter )
            this.creditMeter.startBangUp( credits );
    }

    // 
    //  DESC: Are the meters banging
    //
    isBanging()
    {
        let result = false;

        if( this.winMeter )
            result |= this.winMeter.isBanging();

        if( this.creditMeter )
            result |= this.creditMeter.isBanging();

        return result;
    }

    // 
    //  DESC: Start the fast bang
    //
    fastBang()
    {
        if( this.winMeter )
            this.winMeter.fastBang();

        if( this.creditMeter )
            this.creditMeter.fastBang();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FrontPanel;



/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// 
//  FILE NAME: ifrontpanel.js
//  DESC:      front panel interface class
//



class iFrontPanel
{
    constructor()
    {
    }
    
    initGame( credits )
    {
        // Empty function to be overwritten
    }
    
    startBangUp( credits, win )
    {
        // Empty function to be overwritten
    }
    
    isBanging()
    {
        // Empty function to be overwritten
    }
    
    fastBang()
    {
        // Empty function to be overwritten
    }
    
    enableButtons( allowPlay )
    {
        // Empty function to be overwritten
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = iFrontPanel;



/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__library_gui_ismartguibase__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__library_gui_menumanager__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__library_common_defs__ = __webpack_require__(0);

// 
//  FILE NAME: smartconfirmbtn.js
//  DESC:      Class CSmartExitBtn
//







class SmartConfirmBtn extends __WEBPACK_IMPORTED_MODULE_0__library_gui_ismartguibase__["a" /* SmartGuiControl */]
{
    constructor( uiControl )
    {
        super( uiControl );
    }
    
    //
    //  DESC: Called when the control is executed
    //
    execute()
    {
        let menu = __WEBPACK_IMPORTED_MODULE_1__library_gui_menumanager__["a" /* menuManager */].getMenu("confirmation_menu");
        let yesBtn = menu.getControl("yes_btn");
        let megLbl = menu.getControl("message_lbl");
        
        let smartGuiCtrl = null;
        let conformationMsg = '';
        let executionAction = '';
        let actionType = __WEBPACK_IMPORTED_MODULE_2__library_common_defs__["s" /* ECAT_BACK */];
        
        if( this.uiControl.name === 'home_btn' )
        {
            conformationMsg = 'Are you sure you|want to go back to|the lobby?';
            actionType = __WEBPACK_IMPORTED_MODULE_2__library_common_defs__["v" /* ECAT_GAME_STATE_CHANGE */];
            executionAction = 'lobby_state';
        }
        else if( this.uiControl.name === 'big_pay_back_btn' )
        {
            conformationMsg = 'Are you sure you|want to play|"The Big Payback"?';
            actionType = __WEBPACK_IMPORTED_MODULE_2__library_common_defs__["v" /* ECAT_GAME_STATE_CHANGE */];
            executionAction = 'big_pay_back_state';
        }
        
        // Set the conformation menu
        yesBtn.smartGui = smartGuiCtrl;
        yesBtn.actionType = actionType;
        yesBtn.executionAction = executionAction;
        megLbl.createFontStr( conformationMsg );
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SmartConfirmBtn;

    

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

//
//  FILE NAME: ismartguibase.js
//  DESC:      Smart Gui interface & Base Classes
//



// 
//  DESC: Smart GUI interface class
//
class iSmartGui
{
    constructor()
    {
    }
    
    // 
    //  DESC: Called when the control is created
    //
    create()
    {
        // Empty function to be overwritten
    }

    // 
    //  DESC: Called during the handle user imput
    //
    handleEvent( event )
    {
        // Empty function to be overwritten
    }
}

// 
//  DESC: Smart GUI Menu class
//
class SmartGuiMenu extends iSmartGui
{
    constructor( uiMenu )
    {
        super();
        
        this.uiMenu = uiMenu;
    }
}
/* unused harmony export SmartGuiMenu */


// 
//  DESC: Smart GUI Control
//
class SmartGuiControl extends iSmartGui
{
    constructor( uiControl )
    {
        super();
        
        this.uiControl = uiControl;
    }

    // 
    //  DESC: Called when the control is executed
    //
    execute()
    {
        // Empty function to be overwritten
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SmartGuiControl;



/***/ })
/******/ ]);