// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.0);
vec3 colorB = vec3(1.0);

float  plot(vec2 st, float pct){
 return smoothstep(pct-0.02, pct, st.y) -
     smoothstep(pct, pct + 0.02, st.y);
}

void main() {
    
    vec2 st = gl_FragCoord.xy/u_resolution;
    //st.x *= u_resolution.x/u_resolution.y;
    
    vec3 pct = vec3(st.x);
    pct.r = mod(pct.r*5.0, 2.0);
    pct.g = mod(sin(PI*pct.g)*5., 2.0);
    pct.b = fract(pow(pct.b, 1.5)*5.0);
    
    //mix with vec3 type
    vec3 color = mix(colorA, colorB, pct);
    
    //
    color = mix(color, vec3(1.0, 0.0, 0.0), plot(st, pct.r));
    color = mix(color, vec3(0.0, 1.0, 0.0), plot(st, pct.g));
    color = mix(color, vec3(0.0, 0.0, 1.0), plot(st, pct.b));
    gl_FragColor = vec4(color,1.0);
}