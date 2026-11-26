
/*----------------------- "shader.frag" -----------------------*/

// Specify which version of GLSL we are using.
#version 100

// Needs to be the same name as in the vertex shader
varying highp vec4 normal;

uniform lowp vec4 color;
uniform lowp vec4 additive;
 
void main() 
{
    gl_FragColor = color * additive * normal;
}


