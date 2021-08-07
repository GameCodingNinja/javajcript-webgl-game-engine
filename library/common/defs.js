
// 
//  FILE NAME: defs.js
//  DESC:      misc defines
//

"use strict";

export const DEG_TO_RAD = 0.0174532925199432957,
             RAD_TO_DEG = 57.29577951308232,
             EPSILON    = 8.854187817e-12,
             RGB_TO_DEC = 0.00390625,
             M_PI       = 3.14159265358979323846, // pi
             M_PI_2     = 1.57079632679489661923, // pi/2
             M_PI_4     = 0.78539816339744830962, // pi/4
             M_1_PI     = 0.31830988618379067154, // 1/pi
             M_2_PI     = 0.63661977236758134308, // 2/pi
             M_2_SQRTPI = 1.12837916709551257390, // 2/sqrt(pi)
             M_SQRT2    = 1.41421356237309504880, // sqrt(2)
             M_SQRT1_2  = 0.70710678118654752440; // 1/sqrt(2)
     
export const DEFAULT_ID = -1;

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
export const TRANSLATE	  = 0x01,
             ROTATE       = 0x02,
             SCALE        = 0x04,
             CENTER_POINT = 0x08,
             CROP_OFFSET  = 0x10;

// Translate parameters
export const TRANSFORM       = 0x20,
             WAS_TRANSFORMED = 0x40;

// Matrix rotation
export const MATRIX_ROTATION = 0x80;

// Visible bit
export const VISIBLE         = 0x100;
     
// ENodeType
export const ENT_NULL       = 0,
             ENT_OBJECT     = 1,
             ENT_SPRITE     = 2,
             ENT_UI_CONTROL = 3;

// ESelection Message Arguments
export const ESMA_PRESS_TYPE  = 0,
             ESMA_DEVICE_TYPE = 1,
             ESMA_MOUSE_X     = 2,
             ESMA_MOUSE_Y     = 3;

// EMenu State Change Arguments
export const EMSC_STATE   = 0,
             EMSC_CONTROL = 1;

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
     