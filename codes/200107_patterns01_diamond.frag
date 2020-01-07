#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415922653
    
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rect(vec2 st, float size)
{	
    // to replace center
    st -= 0.5;
    vec2 lUp =	step(-size/2.0, st); 
    vec2 rDown = 1.0 - step(size/2.0, st);
    vec2 val = lUp * rDown;
    return val.x*val.y;
}

mat3 rotate(float angle){
    return mat3(cos(angle), sin(angle), 0.0, // col1
                -sin(angle), cos(angle), 0.0, // col2
                0.0, 0.0, 1.0); // col3
}

vec2 tile(vec2 st, float repeatNum){
    return fract(st * repeatNum);
}

void main(void){
vec2 st = gl_FragCoord.xy/u_resolution;
st.x *= u_resolution.x/u_resolution.y;
st = tile(st, 5.0);
st -= 0.5;
st = (rotate(PI/4.0)*vec3(st, 1.0)).xy;
st += 0.5;
    
float color = rect(st, 0.5);
    
gl_FragColor = vec4(st.x + color , st.y + color, color, 1.0);
}