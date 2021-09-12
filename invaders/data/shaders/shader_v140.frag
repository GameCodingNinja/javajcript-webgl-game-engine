
/*----------------------- "shader.frag" -----------------------*/

// Specify which version of GLSL we are using.
version 140

// Video card drivers require this line to function properly
//precision highp float;

// Needs to be the same name as in the vertex shader
in vec2 uv0;
 
out vec4 out_color;

uniform sampler2D text0;
 
void main() 
{
    out_color = texture2D( text0, uv0 );
    //out_color = vec4( uv0.x, uv0.y, 1.0, 1.0 );
}


