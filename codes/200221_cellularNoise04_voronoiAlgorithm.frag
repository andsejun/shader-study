#ifdef GL_ES
	precision mediump float;
#endif

#define PI 3.1415926535

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const int POINT_NUM = 12;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 points[POINT_NUM];
	
    float minimum = 1.0;
    vec2 point = vec2(0.0);
    vec3 color = vec3(0.0);
    for(int i = 0; i < POINT_NUM; i++){
        points[i] = random2(vec2(float(i), float(i)));
    }

	for(int i = 0; i < POINT_NUM; i++){
        float dist = length(points[i] - st);
        if(dist < minimum){
            minimum = dist;
           	point = points[i];
        }
    }
    
    color.rg = point;
    color -= length(point - st);
    color *= sin(length(point - st)*PI*50.0 + u_time);
    gl_FragColor = vec4(color, 1.0);
}