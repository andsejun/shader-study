// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 yellow, magenta, green;

void main() {
    
    yellow.rg = vec2(1.0);
    yellow[2] = 0.0;
    
    //swizzle
    magenta = yellow.rbg;
    green = yellow.bgb;
    
    //color Mix pct
    float pct = abs(sin(u_time));

    vec3 color = mix(magenta, green, pct);
    gl_FragColor = vec4(color,1.0);
}