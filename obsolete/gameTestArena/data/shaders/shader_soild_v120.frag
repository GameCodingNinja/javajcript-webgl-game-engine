
/*----------------------- "shader.frag" -----------------------*/

// Specify which version of GLSL we are using.
#version 120

uniform vec4 color;
 
void main() 
{
    gl_FragColor = color;
}


