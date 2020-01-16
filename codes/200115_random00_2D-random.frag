#ifdef GL_ES
precision mediump float;
#endif
    
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// rutern 2-dimension vector to random num, 0.0 to 1.0
float random2D(vec2 st, float scale){
	return fract(sin(dot(st.xy,
                    	vec2(12.3543, 61.2345)))*scale);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
	float color = random2D(st, 5433.2390432);
    gl_FragColor = vec4(vec3(color), 1.0);
}
