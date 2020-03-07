#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_time;

vec2 random2( in vec2 p ){
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

vec2 voronoi( in vec2 st){
    vec2 fPos = fract(st);
    vec2 iPos = floor(st);
    
    vec2 minimum = vec2(8.0);
    
    for(int i = -1; i <= 1; i++){
        for(int j = -1; j <= 1; j++){
            vec2 near = vec2(float(i),float(j));
            vec2 pos = near - fPos + random2(iPos + near);
            float dist = dot(pos, pos);
            if(dist < minimum.x){
                minimum.y = minimum.x;
             	minimum.x = dist;  
            } else if(dist < minimum.y){
                minimum.y = dist;
            }
        }
    }
    
    return sqrt(minimum);
} 

float getBorder( vec2 dist ){
    float dif = dist.y - dist.x;
    return 1.0- smoothstep(0.0, 0.1, dif);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 grid = vec2(10.0);
    st.x *= u_resolution.x/u_resolution.y;
	st *= grid;
    
    vec2 d = voronoi(st);
    float c = d.x;
    c -= getBorder(d);
    vec3 color = vec3(c);
    gl_FragColor = vec4(color, 1.0);
}