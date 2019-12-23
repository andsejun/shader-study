// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592
uniform vec2 u_resolution;

float rect(in vec2 st, in vec2 center, in vec2 size, in float feather)
{
    //vec2 bottomleft = step(center-size/2., st);
    vec2 bottomleft = smoothstep(center - size/2.0 - feather/2.0,
                                 center - size/2.0 + feather/2.0, st);
    //vec2 topright = 1.0 - step(center+size/2., st);
    vec2 topright = 1.0 - smoothstep(center + size/2.0 - feather/2.0, 
                                     center + size/2.0 + feather/2.0, st);
 	vec2 value = bottomleft * topright;
    return value.x * value.y;
}

void main()
{
    vec2 st = gl_FragCoord.xy/u_resolution;    
    vec3 color = vec3(rect(st, vec2(0.330,0.510), vec2(0.490,0.500), 0.090));
    gl_FragColor = vec4(color, 1.0);
}