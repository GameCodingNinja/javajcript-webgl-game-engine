
/*----------------------- "shader.frag" -----------------------*/

// Specify which version of GLSL we are using.
#version 100

// Needs to be the same name as in the vertex shader
varying highp vec2 uv0;
varying highp vec4 normal;

uniform sampler2D text0;
uniform highp vec4 color;
uniform lowp vec4 additive;
 
void main() 
{
    gl_FragColor = texture2D( text0, uv0.xy ) * color * additive * normal;
}
