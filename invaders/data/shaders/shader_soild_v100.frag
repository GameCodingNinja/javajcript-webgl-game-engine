
/*----------------------- "shader.frag" -----------------------*/

// Specify which version of GLSL we are using.
#version 100

uniform lowp vec4 color;
uniform lowp vec4 additive;
 
void main() 
{
    gl_FragColor = color * additive;
}


