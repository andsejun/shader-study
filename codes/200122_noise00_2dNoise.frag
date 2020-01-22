#ifdef GL_ES
precision mediump float;
#endif	

#define PI 3.1415926535

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_time;

float random(vec2 st){
    return fract(sin(dot(st, vec2(12.34542, 68.32445)))*46234.34323);
}

float noise(vec2 st){
    vec2 iPos = floor(st);
    vec2 fPos = fract(st);
    
    float a = random(iPos);
    float b = random(vec2(iPos.x + 1.0, iPos.y));
    float c = random(vec2(iPos.x, iPos.y + 1.0));
    float d = random(vec2(iPos.x + 1.0, iPos.y + 1.0));
                     
    vec2 u = fPos * fPos * (3.0 - 2.0 * fPos);
    
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    //return mix(a, b, u.x) + (c - a)*(1.0 - u.x)*u.y + (d - b)*u.x*u.y;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st *= u_resolution.x/u_resolution.y;
    vec2 grid = vec2(5.0, 5.0);
    st *= grid;
    float color = noise(st);
    gl_FragColor = vec4(vec3(color), 1.0);
}