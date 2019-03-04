
// 
//  FILE NAME: defs.js
//  DESC:      misc defines
//

"use strict";

export const DEG_TO_RAD = 0.0174532925199432957,
             RAD_TO_DEG = 57.29577951308232,
             EPSILON    = 8.854187817e-12,
             RGB_TO_DEC = 0.00390625;
     
export const SPRITE_DEFAULT_ID      = -1;
export const OBJECT_DEFAULT_ID      = -1;
export const NODE_DEFAULT_ID        = -1;
export const PARENT_NODE_DEFAULT_ID = -1;

export const RESET_VELOCITY = true;

// EGenerationType
export const EGT_NULL         = 0,
             EGT_QUAD         = 1,
             EGT_SPRITE_SHEET = 2,
             EGT_SCALED_FRAME = 3,
             EGT_MESH_FILE    = 4,
             EGT_FONT         = 5;

// EProjectionType
export const EPT_NULL         = 0,
             EPT_PERSPECTIVE  = 1,
             EPT_ORTHOGRAPHIC = 2;

// EHorzAlignment
export const EHA_HORZ_LEFT    = 0,
             EHA_HORZ_CENTER  = 1,
             EHA_HORZ_RIGHT   = 2;

// EVertAlignment
export const EVA_VERT_TOP     = 0,
             EVA_VERT_CENTER  = 1,
             EVA_VERT_BOTTOM  = 2;

// Character codes
export const CHAR_CODE_SPACE = 32,
             CHAR_CODE_PIPE  = 124;

// EActionPress
export const EAP_IDLE = 0,
             EAP_DOWN = 1,
             EAP_UP   = 2;

// EDeviceId
export const DEVICE_NULL = -1,
             KEYBOARD    = 0,
             MOUSE       = 1,
             GAMEPAD     = 2;

// Sprite transform Bitmask

// Transform parameters
export const TRANSLATE	        = 0x01,
             ROTATE             = 0x02,
             SCALE              = 0x04,
             CENTER_POINT       = 0x08,
             CROP_OFFSET        = 0x10;

// Translate parameters
export const TRANSFORM          = 0x20,
             WAS_TRANSFORMED    = 0x40;

// Matrix rotation
export const MATRIX_ROTATION    = 0x80;

// Visible bit
export const VISIBLE            = 0x100;

// Type bits
export const SPRITE2D           = 0x200,
             ACTOR2D            = 0x400;

// Sprite strategy command
export const ESSC_DELETE_SPRITE   = 0,
             ESSC_CREATE_SPRITE   = 1,
             ESSC_DELETE_PHYSICS  = 2;

// EGameEvent
// Menu events
export const EGE_MENU_TRANS_IN             = 100,
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

// ESpriteType
export const EST_NULL     = 0,
             EST_OBJECT2D = 1,
             EST_OBJECT3D = 2,
             EST_SPRITE2D = 3,
             EST_SPRITE3D = 4;
     
// ENodeType
export const ENT_NULL              = 0,
             ENT_OBJECT            = 1,
             ENT_SPRITE            = 2,
             ENT_OBJECT_MULTI_LIST = 3,
             ENT_SPRITE_MULTI_LIST = 4,
             ENT_UI_CONTROL        = 5;

// ESelection Message Arguments
export const ESMA_PRESS_TYPE  = 0,
             ESMA_DEVICE_TYPE = 1,
             ESMA_MOUSE_X     = 2,
             ESMA_MOUSE_Y     = 3;

// EMenu State Change Arguments
export const EMSC_STATE   = 0,
             EMSC_CONTROL = 1;

// EMenuTreeState
export const EMTS_INACTIVE             = 0,
             EMTS_IDLE                 = 1,
             EMTS_ACTIVE               = 2,
             EMTS_MAX_MENU_TREE_STATES = 3;

// EMenuState
export const EMS_INACTIVE        = 0,
             EMS_IDLE            = 1,
             EMS_ACTIVE          = 2,
             EMS_MAX_MENU_STATES = 3;

// EMenuNavigationState
export const EMNS_NULL             = 0,
             EMNS_MOUSE            = 1,
             EMNS_GAMEPAD_KEYBAORD = 2;

// ETransCode
export const ETC_RESET = 0,
             ETC_BEGIN = 1,
             ETC_END   = 2;

// EActiveControl
export const EAC_NULL                 = 0,
             EAC_FIRST_ACTIVE_CONTROL = 1,
             EAC_LAST_ACTIVE_CONTROL  = 2;

// EActionResponse
export const EAR_UP    = 1,
             EAR_DOWN  = 2,
             EAR_LEFT  = 4,
             EAR_RIGHT = 8;

// EDynamicOffset
export const EDO_NULL        = 0,
             EDO_LEFT        = 1,
             EDO_RIGHT       = 2,
             EDO_HORZ_CENTER = 4,
             EDO_TOP         = 8,
             EDO_BOTTOM      = 16,
             EDO_VERT_CENTER = 32;

// ENavNode
export const ENAV_NODE_UP    = 0,
             ENAV_NODE_DOWN  = 1,
             ENAV_NODE_LEFT  = 2,
             ENAV_NODE_RIGHT = 3;

export const TOGGLE_STATE_ON  = true,
             TOGGLE_STATE_OFF = false;

// Value for no active control
export const NO_ACTIVE_CONTROL = -1;

// Increment/Decement constants
export const BTN_DEC = 0,
             BTN_INC = 1;

// EControlType
export const ECT_NULL          = 0,
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

// EControlState
export const ECS_NULL     = 0,
             ECS_INIT     = 1,
             ECS_DISABLED = 2,
             ECS_INACTIVE = 3,
             ECS_ACTIVE   = 4,
             ECS_SELECTED = 5;

// EControlActionType
export const ECAT_NULL              = 0,
             ECAT_ACTION            = 1,
             ECAT_TO_TREE           = 2,
             ECAT_TO_MENU           = 3,
             ECAT_BACK              = 4,
             ECAT_CLOSE             = 5,
             ECAT_CHANGE_FOCUS      = 6,
             ECAT_GAME_STATE_CHANGE = 7,
             ECAT_QUIT_GAME         = 8;

// EControlScriptFunctions
export const ECSF_ON_ACTIVE   = 0,
             ECSF_ON_SELECTED = 1;

// EOrientation
export const EO_HORIZONTAL = 0,
             EO_VERTICAL   = 1;
     
// EMirror
export const EM_NULL                = 0,
             EM_HORIZONTAL          = 1,
             EM_VERTICAL            = 2,
             EM_HORIZONTAL_VERTICAL = 3;
     