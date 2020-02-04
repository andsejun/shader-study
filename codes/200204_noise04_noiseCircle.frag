#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926535

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

vec2 random(vec2 st){
    st = vec2(dot(st, vec2(114.54334, 481.32456)),
              dot(st, vec2(234.24324, 372.32481)));
    return 1.0 + -2.0 * vec2(fract(sin(st)*49435.3241));
}

float noise(vec2 st){
	vec2 fPos = fract(st);
    vec2 iPos = floor(st);
    
    vec2 u = fPos * fPos * (3.0 - 2.0 * fPos);
    
    vec2 a = vec2(0.0, 0.0);
    vec2 b = vec2(1.0, 0.0);
    vec2 c = vec2(0.0, 1.0);
    vec2 d = vec2(1.0, 1.0);
    
    return mix( mix(dot(random(iPos + a), fPos - a ), dot(random(iPos + b), fPos - b), u.x),
                mix(dot(random(iPos + c), fPos - c ), dot(random(iPos + d), fPos - d), u.x),
    			u.y);
}

mat2 rotate(float angle){
    return mat2(cos(angle), sin(angle),
               -sin(angle), cos(angle));
}

float shape(vec2 st, float radius){
    st -= 0.5;
    
    float dist = length(st);
    float angle = atan(st.y, st.x);
    float f = radius / 2.0;
    //making angle move
    angle += atan(u_time);
    float m = mod(angle + u_time/20.0, PI * 2.0) - 3.14;
    //making graph
    f += sin(15.0 * m) * noise(st + u_time * 0.5) * 0.05;
    f += sin(30.0 * m) * noise(st + u_time * 0.7) * 0.10;
    
    return smoothstep(f, f + 0.005, dist);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    float color = shape(st, 0.8) - shape(st, 0.83);
    gl_FragColor = vec4(vec3(1.0 - color), 1.0);
}