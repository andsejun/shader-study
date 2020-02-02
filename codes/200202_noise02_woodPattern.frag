#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926535

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}

mat2 rotate2d(float angle){
    return mat2(cos(angle), sin(angle),
                -sin(angle), cos(angle));
}

float line(in vec2 st, float scale){
	st *= scale;
	return smoothstep(0.9,
                      1.0,                  
    				  abs(sin(st.y*PI)));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 grid = vec2(1.0, 3.0);
	vec2 pos = st * grid;
    pos = rotate2d( noise(pos) * PI) * pos;
    gl_FragColor = vec4(vec3(line(pos, 5.0)), 1.0);
}