//------------------------ "shader.vert" ------------------------

// Specify which version of GLSL we are using.
#version 100

// Do not change the order of these
attribute vec3 in_position;
attribute vec3 in_normal;

// Camera view matrix
uniform mat4 cameraViewProjMatrix;

// normal matrix
uniform mat4 normalMatrix;

// Needs to be the same name as in the fragment shader
varying vec4 normal;

void main() 
{
    vec4 transNorm = normalize(normalMatrix * vec4(in_normal, 1.0));

    float nDot = abs(dot(vec3(1.0, 1.0, 1.0), transNorm.xyz));
    normal = vec4(nDot, nDot, nDot, 1.0);

    gl_Position = cameraViewProjMatrix * vec4(in_position, 1.0);
}

