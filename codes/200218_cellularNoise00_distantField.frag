// Cellular Noise
#ifdef GL_ES
	precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const int POINT_NUM = 10;

vec2 random(vec2 st){
    st = vec2(dot(st, vec2(124.32434, 239.32424)),
              dot(st, vec2(324.32412, 643.23421)));
    return fract(sin(st)*23912.24323);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    float minimum = 1.0;
    float color = 0.0;
    vec2 points[POINT_NUM];
    
	points[0] = u_mouse / u_resolution;
    for(int i = 1; i < POINT_NUM; i++){
        points[i] = random(vec2(float(i+2)*3.094, float(i)*2.23254));
    }
    
    for(int i = 0; i < POINT_NUM; i++){
        minimum = min(distance(st, points[i]), minimum);
        color = minimum;
    }

    gl_FragColor = vec4(vec3(color), 1.0);
}
