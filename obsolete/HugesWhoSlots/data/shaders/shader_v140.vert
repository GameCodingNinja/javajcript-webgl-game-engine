//------------------------ "shader.vert" ------------------------

// Specify which version of GLSL we are using.
#version 140

// Do not change the order of these as they need to mach the order in the vertex buffer
in vec3 in_position;
in vec2 in_uv;

// Needs to be the same name as in the fragment shader
out vec2 uv0;

void main() 
{
    gl_Position = vec4(in_position.x, in_position.y, in_position.z, 1.0);

    uv0 = in_uv;
}

