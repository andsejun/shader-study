#ifdef GL_ES
	precision mediump float;
#endif

#define PI 3.1415926535

uniform vec2 u_resolution;
uniform float u_time;

vec2 rotate2D(vec2 st, float angle){
    vec2 val = st - 0.5;
    val = mat2(cos(angle), sin(angle),
              -sin(angle), cos(angle)) * val;
    val += 0.5;
    return val;
}

vec2 zoom(vec2 st, float zoom){
    vec2 val = st * zoom;
    return fract(val);
}

vec2 angleGrid(vec2 st, float angle){
    vec2 val = st*2.0;
    
    float index = 0.0; 
	index += step(1.0, val.x);
    index += step(1.0, val.y)*2.0;
    
    val = fract(val);
    if(index == 0.0) val = rotate2D(val, angle);
    if(index == 1.0) val = rotate2D(val, angle - PI/2.0);
    if(index == 2.0) val = rotate2D(val, angle - PI);
    if(index == 3.0) val = rotate2D(val, angle - PI*1.5);
    
    return val;
}
void main(){
    vec2 st = gl_FragCoord.xy / u_resolution;
    st = zoom(st, 2.0);
	st = angleGrid(st, u_time * 2.0);
    
    gl_FragColor = vec4(vec3(step(pow(st.x, mod(u_time*10.0, 10.0)), st.y), st.x, 1.0), 1.0);
}