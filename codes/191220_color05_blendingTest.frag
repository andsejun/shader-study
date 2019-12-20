
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.283185
#define PI 3.141592

uniform vec2 u_resolution;
uniform float u_time;

float rect(in vec2 st, in vec2 size){
	size = 0.25-size*0.25;
    vec2 uv = smoothstep(size,size+size*vec2(0.002),st*(1.0-st));
	return uv.x*uv.y;
}

void main() {
    // x,y coordinates from 0.0 to 1.0
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 influenced_color = vec3(0.745,0.678,0.539);
    
    vec3 influencing_color_A = vec3(0.653,0.918,0.985); 
    vec3 influencing_color_B = vec3(0.980,0.576,0.113);

    
    vec3 color = mix(influencing_color_B, influencing_color_A, step(0.5, st.x));
    color = mix(color, influenced_color, rect(mod(abs(st)*5.0, 2.0), vec2(0.5, 0.1)));
    
    gl_FragColor = vec4(color, 1.0);
}
