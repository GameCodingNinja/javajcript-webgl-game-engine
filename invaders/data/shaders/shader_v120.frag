
/*----------------------- "shader.frag" -----------------------*/

// Specify which version of GLSL we are using.
#version 120

// Needs to be the same name as in the vertex shader
varying vec2 uv0;

uniform sampler2D text0;
uniform vec4 color;
 
void main() 
{
    gl_FragColor = texture2D( text0, uv0.xy ) * color;
}


