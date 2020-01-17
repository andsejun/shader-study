#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in float x) { return fract(sin(x)*1e4); }
float random (in vec2 _st) { return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))* 43758.545312);}
                                          

// grid
// direction & speed
// head & percent
// color & margin
                                          
void main(){
    //initial setting
    vec2 st = gl_FragCoord.xy/u_resolution;
    st *= u_resolution.x/u_resolution.y;
    
    //grid
    vec2 grid = vec2(100, 50.0);
    st *= grid;
    vec2 iPos = floor(st);
    vec2 fPos = fract(st);
    
    //dircetion & speed
    vec2 vel = vec2(0.1*u_time*grid.x, 0);
    vel.x *= (mod(iPos.y, 2.0) - 0.5) * 2.0;
    vel.x *= random(iPos.y + 0.1);
    // head
    float totalNum = grid.x * grid.y;
  	float t = mod(u_time * grid.x, totalNum);
    vec2 head = vec2(mod(t, grid.x), floor(t/grid.x));
    // percent
    vec3 color = vec3(1.0);
    color *= step(grid.y - head.y, iPos.y);
    color += step(grid.x - head.x, grid.x - iPos.x) * 
        	 step(grid.y - head.y, iPos.y + 1.0);
    color = clamp(color, 0.0, 1.0);
    // color & margin
    vec2 offset = vec2(0.1, 0.0);
	color.r *= step(0.5, random(floor(st + offset + vel)));
    color.g *= step(0.5, random(floor(st + vel)));
    color.b *= step(0.5, random(floor(st - offset + vel)));
    
    color *= step(0.2, fract(st.x + vel.x)) *
        	 step(0.2, fract(st.y + vel.y));
    gl_FragColor = vec4(1.0 -vec3(color), 1.0);
}
                            