// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float circle(in vec2 st, in vec2 center, in float radius, in float feather)
{
    float length = distance(center, st);
    float value = 1.0 - smoothstep(radius - feather/2.0, 
                                   radius + feather/2.0, length);
    return value;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(circle(st, vec2(0.400,0.610), 0.328, 0.02));
    gl_FragColor = vec4(color,1.0);
}