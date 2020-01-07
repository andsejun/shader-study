#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
    
void main(void){
vec2 st = gl_FragCoord.xy/u_resolution;
st.x *= u_resolution.x/u_resolution.y;
    
vec2 nSt = (st-0.5)*2.0;
st *= 3.0;    
st = fract(st);
    
float color = 1.0 - step(0.3 , distance(st, vec2(0.5)));
    
gl_FragColor = vec4(st.x + color, st.y + color, color, 1.0);
}