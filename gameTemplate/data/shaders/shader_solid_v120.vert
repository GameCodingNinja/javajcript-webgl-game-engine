//------------------- "shader_solid_v2.vert" -------------------

// Specify which version of GLSL we are using.
#version 120

// Do not change the order of these as they need to mach the order in the vertex buffer
attribute vec3 in_position;

// Camera view matrix
uniform mat4 cameraViewProjMatrix;

void main() 
{
    gl_Position = cameraViewProjMatrix * vec4(in_position, 1.0);
}

