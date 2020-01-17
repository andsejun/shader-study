#ifdef GL_ES
	precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st){
    return fract(sin(dot(st, vec2(12.3424, 67.4535)))*43345.34352);
}

float random(float x){
    return fract(sin(x)*1e4);
}

float pattern(vec2 st, vec2 vel, float edge){
	vec2 pos = floor(st + vel);
    //we can made some patterns by mixing
    return step(edge, 1.4*random(pos.y*0.0001) + 
					  0.1*random(pos.y));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 grid = vec2(50.0, 50.0);
    st *= grid;
    vec2 iPos = floor(st);
    vec2 fPos = fract(st);
	
    vec2 vel = vec2(u_time*min(grid.x, grid.y)*0.5); // for magnitude
    vel *= vec2(0.0, -1.0) + vec2(0.0, -random(iPos.x));// for direction and speed offset
    
    vec2 offset = vec2(0.0, 0.1);
    
	vec3 color = vec3(0.0);
    color.r = pattern(st + offset, vel, 0.5 + u_mouse.y/u_resolution.y); 
    color.g = pattern(st, vel, 0.5 + u_mouse.y/u_resolution.y); 
    color.b = pattern(st - offset, vel, 0.5 + u_mouse.y/u_resolution.y); 
    
    color *= step(0.2, fPos.x);
    gl_FragColor = vec4(1.0 - color, 1.0);
}
