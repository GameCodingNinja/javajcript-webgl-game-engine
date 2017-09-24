//------------------------ "shader.vert" ------------------------

// Specify which version of GLSL we are using.
#version 100

// Do not change the order of these as they need to mach the order in the vertex buffer
attribute vec3 in_position;
attribute vec2 in_uv;

// Camera view matrix
uniform mat4 cameraViewProjMatrix;

// Needs to be the same name as in the fragment shader
varying vec2 uv0;

void main() 
{
    gl_Position = cameraViewProjMatrix * vec4(in_position, 1.0);

    uv0 = in_uv;
}

