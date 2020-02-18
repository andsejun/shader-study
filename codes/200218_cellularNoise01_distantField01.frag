// Cellular Noise
#ifdef GL_ES
	precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const int POINT_NUM = 20;

vec2 random(vec2 st){
    st = vec2(dot(st, vec2(124.32434, 239.32424)),
              dot(st, vec2(324.32412, 643.23421)));
    return fract(sin(st)*23912.24323);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 grid = vec2(3.0, 3.0);
    st *= grid;
    
    vec2 fPos = fract(st);
    vec2 iPos = floor(st);
    
    float minimum = 1.0;
    vec3 color = vec3(0.0);
    vec2 points[POINT_NUM];
    
	points[0] = u_mouse / u_resolution;
    for(int i = 1; i < POINT_NUM; i++){
        points[i] = random(vec2((iPos.x + iPos.y + float(i))*3.094, 
						   float(iPos.x + iPos.y + float(i))*2.23254));
    	float val = mod(iPos.x + iPos.y, 2.0) == 1.0 ? 1.0 : -1.0;
        points[i] += vec2(cos(u_time) * val, sin(u_time) * val) * 0.1;
    }
    
    for(int i = 0; i < POINT_NUM; i++){
        minimum = min(distance(fPos, points[i]), minimum);
		color = vec3(minimum);
    }

    float center = smoothstep(0.0, 0.023, color.r);
    color += 1.0 - vec3(center);
    gl_FragColor = vec4(color, 1.0);
}
