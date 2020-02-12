#if GL_ES
	precision mediump float;
#endif

#define PI 3.1415926535

uniform vec2 u_resolution;
uniform float u_time;
float i = 0.0;
float shape(vec2 st, float N){
    st = (st - 0.5) * 2.0;
    float angle = atan(st.y, st.x) + PI;
    float r = 2.0*PI/N;
    return cos(floor(angle/r + 0.5)*r - angle) * length(st);
}

float box(vec2 st, vec2 size){
    return shape(st*size, 4.0);
}

float box(vec2 st){
    return shape(st, 4.0);
}

float hex(vec2 st, bool[6] state){
    st = st * vec2(2.0, 6.0);
    
    vec2 fPos = fract(st);
	vec2 iPos = floor(st);
    if(iPos.x == 1.0) fPos.x = 1.0 - fPos.x;
    
    if(st.y < 1.0){
        return state[0] ? box(fPos - vec2(0.03, 0.0)) : box(fPos, vec2(0.84, 1.0));
    } else if (st.y < 2.0){
        return state[1] ? box(fPos - vec2(0.03, 0.0)) : box(fPos, vec2(0.84, 1.0));
    } else if (st.y < 3.0){
        return state[2] ? box(fPos - vec2(0.03, 0.0)) : box(fPos, vec2(0.84, 1.0));
    } else if (st.y < 4.0){
        return state[3] ? box(fPos - vec2(0.03, 0.0)) : box(fPos, vec2(0.84, 1.0));
    } else if (st.y < 5.0){
        return state[4] ? box(fPos - vec2(0.03, 0.0)) : box(fPos, vec2(0.84, 1.0));
    } else if (st.y < 6.0){
    	return state[5] ? box(fPos - vec2(0.03, 0.0)) : box(fPos, vec2(0.84, 1.0));
    } else {
        return 1.0;
    }
}

float hex(vec2 st, float time){
    bool state[6];
    
    float remain = floor(mod(time, 64.0));
    for(int i = 0; i < 6; i ++){
        state[i] = mod(remain, 2.0) == 1.0 ? true : false;
        remain = ceil(remain/2.0);
    }
    return hex(st, state);
}

vec3 random3(vec3 c) {
    float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
    vec3 r;
    r.z = fract(512.0*j);
    j *= .125;
    r.x = fract(512.0*j);
    j *= .125;
    r.y = fract(512.0*j);
    return r-0.5;
}
const float F3 =  0.3333333;
const float G3 =  0.1666667;
float snoise(vec3 p) {

    vec3 s = floor(p + dot(p, vec3(F3)));
    vec3 x = p - s + dot(s, vec3(G3));

    vec3 e = step(vec3(0.0), x - x.yzx);
    vec3 i1 = e*(1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy*(1.0 - e);

    vec3 x1 = x - i1 + G3;
    vec3 x2 = x - i2 + 2.0*G3;
    vec3 x3 = x - 1.0 + 3.0*G3;

    vec4 w, d;

    w.x = dot(x, x);
    w.y = dot(x1, x1);
    w.z = dot(x2, x2);
    w.w = dot(x3, x3);

    w = max(0.6 - w, 0.0);

    d.x = dot(random3(s), x);
    d.y = dot(random3(s + i1), x1);
    d.z = dot(random3(s + i2), x2);
    d.w = dot(random3(s + 1.0), x3);

    w *= w;
    w *= w;
    d *= w;

    return dot(d, vec4(52.0));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
	float t = u_time * 0.5;
    float df = mix(hex(st, t), hex(st, t + 1.0), fract(t));
    df += snoise(vec3(st*100.0, t)) * 0.05;
    gl_FragColor = vec4(vec3(step(0.7, df)), 1.0);
}