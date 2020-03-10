#ifdef GL_ES
	precision mediump float;
#endif
#define PI 3.1415926535

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2D( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

vec2 grid(in vec2 st, in vec2 n){
    return st*n;
}

vec2 voronoiWithBorder(in vec2 st){
    vec2 fPos = fract(st);
	vec2 iPos = floor(st);
    
    vec2 near;
    vec2 coord;

    // to get center-point distance
    float dist = 10.0;
    for(int i = -1; i <= 1; i++){
        for(int j = -1; j <= 1; j++){
         	vec2 n = vec2(i, j);
            vec2 p = random2D(iPos + n);
            vec2 c = n + p - fPos;
            float d = length(c);
            
            if(d < dist){
                dist = d;
                near = n;
                coord = c;
            }
        }
    }
    
    // to get center-border distance
    float borderDist = 10.0;
    for(int i = -2; i <= 2; i++){
        for(int j = -2; j <= 2; j++){
            vec2 n = near + vec2(i, j);
            vec2 p = random2D(iPos + n);
            vec2 c = n + p - fPos;
            
            // not to select same point
            if(dot(coord - c, coord - c) > 0.00001)
            {
            	borderDist = min(borderDist, dot(0.5*(c + coord), normalize(c - coord)));
            }
        }
    }
    return vec2(dist, borderDist);
}


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    st = grid(st, vec2(10.0));
    
    vec2 voronoi = voronoiWithBorder(st);
    float color = voronoi.x;
    color = voronoi.y;
    
    gl_FragColor = vec4(vec3(color), 1.0);
}