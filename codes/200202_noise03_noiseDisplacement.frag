#ifdef GL_ES
precision mediump float;
#endif

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
    return mix( mix( random( i + vec2(0.0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
	
    float t = (noise(st*2.0 + u_time/10.0) - 0.5)*2.0;
   	st += t; 
    
    vec3 color = vec3(smoothstep(0.1, 0.2, noise(st * 2.)));
 	color.g  = smoothstep(0.6, 0.7, noise(st*vec2(5.0, 400.0)));
    color.r  = smoothstep(0.8, 1.0, noise(st*vec2(5.0, 400.0)));
    
    
    gl_FragColor = vec4(vec3(color), 1.0);
}