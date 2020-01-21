#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in float x) { return fract(sin(x)*1e4); }
float random (in vec2 _st) { return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))* 43758.545312);}
                                          
                                          
void main(){
	//intial setting
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    //gird & pos
    vec2 grid = vec2(100.0, 50.0);
    st *= grid;
    vec2 iPos = floor(st);
    vec2 fPos = fract(st);
    //direction & vel
    vec2 direction = vec2((mod(iPos.y, 2.0) - 0.5) * 2.0, 0.0);
    float magnitude = random(iPos.y);
    vec2 velocity = magnitude * direction * u_time * 10.0;
    //time & head
    float totalNum = grid.x * grid.y;
    float time = mod(grid.x * u_time, totalNum);
    vec2 head = vec2(mod(time, grid.x),
    				 floor(time / grid.x));
	//percent
    vec3 color = vec3(1.0);
    color *= step(grid.y - head.y, st.y);
    color += step(iPos.x, head.x) * step(grid.y - (head.y+1.0), st.y);
    //to draw
    st += velocity;
    vec2 offset = vec2(0.1, 0.0);
    float edge = 0.2;
    color.r *= step(edge, random(floor(st + offset)));
    color.g *= step(edge, random(floor(st)));
    color.b *= step(edge, random(floor(st - offset)));
    //margin
    color *= step(0.2, fract(st.x)) * step(0.2, fract(st.y));
    gl_FragColor = vec4(1.0 - color, 1.0);
}
                            