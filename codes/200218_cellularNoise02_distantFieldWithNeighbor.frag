// Cellular Noise
#ifdef GL_ES
	precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const int POINT_NUM = 30;

vec2 random(vec2 st){
    st = vec2(dot(st, vec2(124.32434, 239.32424)),
              dot(st, vec2(324.32412, 643.23421)));
    return fract(sin(st)*23912.24323);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
	st.x *= u_resolution.x/u_resolution.y;
    vec2 grid = vec2(3.0);
    st *= grid;
    
    vec2 fPos = fract(st);
    vec2 iPos = floor(st);

    float minimum = 1.0;
    
    
    for(float x=-1.0; x<=1.0; x++){
        for(float y = -1.0; y<=1.0; y++){
            vec2 neighbor = vec2(x, y);
            vec2 point = random(iPos + neighbor);
            float dist = length(point + neighbor - fPos);
            minimum = min(minimum, dist);
        }
    }
    
    float color = minimum;
    gl_FragColor = vec4(vec3(color), 1.0);
}
