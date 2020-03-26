#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise(in vec2 st){
    vec2 fPos = fract(st);
    vec2 iPos = floor(st);
    
    float a = random(iPos + vec2(0.0));
    float b = random(iPos + vec2(1.0, 0.0));
    float c = random(iPos + vec2(0.0, 1.0));
    float d = random(iPos + vec2(1.0));
    vec2 u = fPos*fPos*(3.0-2.0*fPos);
    
    return mix(a, b, u.x) + (c-a)*(1.0 - u.x)*u.y + (d-b)*u.x*u.y;
}

#define PI 3.1415926535
#define OCTAVES 5
float fBM(in vec2 st){
    float frequency = 1.0;
    float amplitude = 0.6;
    float lacunarity = 2.;
    float gain = 0.5;
    vec2 shift = vec2(100.0, 0.0);
    mat2 rotate = mat2(cos(PI/2.0), sin(PI/2.0), 
                       -sin(PI/2.0), cos(PI/2.0));
    float val = 0.0;
    for(int i=0; i<OCTAVES; i++){
        val += noise(st*frequency)*amplitude;
        st += shift;
        st = rotate * st;
        amplitude *= gain;
        frequency *= lacunarity;
    }
    return val;
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    st *= 4.0;
    vec2 q, r, s = vec2(0.0);
	q.x = fBM(st + vec2(0.0, -5.0)*u_time);
    q.y = fBM(st + vec2(3.0));
    r.x = fBM(st + q.x + noise(vec2(u_time/300.0, 0.0))*vec2(u_time, 0.0));
    r.y = fBM(st + q.x + noise(vec2(0.0, u_time/500.0))*vec2(0.0, u_time));
    float f = fBM(st + r);
    f = f*f*f + 0.5*f*f + 0.3*f;
 	vec3 colorA = vec3(0.0,0.0,0.2);
    vec3 colorB = vec3(0.7,0.2,0.2);
    vec3 color = mix(colorA, colorB, f);
    gl_FragColor = vec4(color, 1.0);
}
