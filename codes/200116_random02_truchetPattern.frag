//truchet pattern
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926535
    
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random2D(vec2 st)
{
	return fract(sin(dot(st, vec2(12.34234, 67.34242)))*48395.2342
                + u_time/2.0);    
}

float digonal(vec2 st, float feather){
    return smoothstep(st.x - feather, st.x, st.y) - 
       	   smoothstep(st.x, st.x + feather, st.y) ;
}

vec2 zoom(vec2 st, float scale){
    return st*scale;
}

float circle(vec2 st, float feather){
	return smoothstep(0.45 - feather, 0.45, length(st)) -
           smoothstep(0.55, 0.55 + feather, length(st)) +
           smoothstep(0.45 - feather, 0.45, length(1.0 - st)) -
           smoothstep(0.55, 0.55 + feather, length(1.0 - st)) ;
}

vec2 truchetPattern(vec2 st, vec2 index){
    float fNum = fract((random2D(index) - 0.5) * 2.0);
    if(fNum > 0.75){
        return vec2(1.0 - st.x, st.y);
    } else if(fNum > 0.5){
        return vec2(st.x, 1.0 - st.y);
    } else if(fNum > 0.25){
        return 1.0 - st;
    } else{
        return st;
    }
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    st = zoom(st, 10.0);
    
    vec2 fPos = fract(st);
    vec2 iPos = floor(st);
    
    st = truchetPattern(fPos, iPos);
    
    float color = circle(st, 0.02);
    gl_FragColor = vec4(vec3(color), 1.0);
}