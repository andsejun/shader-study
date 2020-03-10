#ifdef GL_ES
	precision mediump float;
#endif
#define PI 3.1415926535

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2D(in vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
               dot(st,vec2(269.5,183.3)) );
    return fract(sin(st)*43758.5453123);
}

vec2 grid(in vec2 st, in vec2 n){
    return st*n;
}

vec2 voronoi(in vec2 st, out vec2 oA, out vec2 oB){
    vec2 fPos = fract(st);
	vec2 iPos = floor(st);
    vec2 minimum = vec2(10.0);
    
    for(int i = -1; i <= 1; i++){
        for(int j = -1; j <= 1; j++){
         	vec2 near = vec2(i, j);
            vec2 point = random2D(iPos + near);
            vec2 d = near + point - fPos;
            float dist = dot(d,d);
            
            if(dist < minimum.x){
                minimum.y = minimum.x;
                minimum.x = dist;
                oA = d;
            }else if(dist < minimum.y){
                minimum.y = dist;   
                oB = d;
            }
        }
    }
    return sqrt(minimum);
}


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    st = grid(st, vec2(3.0));
    
    vec2 a,b;
    float color = voronoi(st, a, b).x;
    //get border
    float dist = dot((a+b)/2.0, normalize(b-a)); 
    
    color += 1.0 - smoothstep(0.0, 0.05, dist);
    
    gl_FragColor = vec4(vec3(color), 1.0);
}