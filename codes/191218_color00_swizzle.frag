// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec3 yellow, magenta, green;
    
    yellow.rg = vec2(1.0);
    yellow[2] = 0.0;
    
    //swizzle
    magenta = yellow.rbg;
    green = yellow.bgb;
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    color = vec3(st.x,st.y,abs(sin(u_time)));

    gl_FragColor = vec4(green,1.0);
}