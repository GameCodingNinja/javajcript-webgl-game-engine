
/*----------------------- "shader.frag" -----------------------*/

// Specify which version of GLSL we are using.
#version 100

// Needs to be the same name as in the vertex shader
varying lowp vec2 uv0;

uniform sampler2D text0;
uniform lowp vec4 color;
uniform lowp vec4 additive;
 
void main() 
{
    gl_FragColor = texture2D( text0, uv0.xy ) * color * additive;
}


