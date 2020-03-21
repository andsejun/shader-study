// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

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


float noise (in vec2 st){
    vec2 iPos = floor(st);
    vec2 fPos = fract(st);
    
    float a = random(iPos + vec2(0.0));
    float b = random(iPos + vec2(1.0, 0.0));
    float c = random(iPos + vec2(0.0, 1.0));
    float d = random(iPos + vec2(1.0));
    vec2 u = fPos*fPos*(3.0 - 2.0*fPos);
    
    return mix(a, b, u.x) + (c-a)*(1.0-u.x)*u.y + (d-b)*u.x*u.y;
}

#define OCTAVES 5
float fBM(in vec2 st){
    
    float amp = 0.5;
    float gain = 0.5;
    
    float fre = 1.0;
    float lac = 1.8;
    
    float val = 0.0;
    
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    vec2 shift = vec2(100.0);
    
    for(int i = 0; i <= OCTAVES; i++){
        val += noise(st*fre)*amp;
        st = rot*st + shift;
        fre *= lac;
        amp *= gain;
    }
    
    return val;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec3 color = vec3(0.0);
    vec2 q,r = vec2(0.);
    q.x = fBM( st + 0.00*u_time);
    q.y = fBM( st + vec2(1.0));

    r.x = fBM( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
    r.y = fBM( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

    float f = fBM(st+r);
    
    color = mix(vec3(0.534,0.667,0.274),
                vec3(0.343,0.379,0.667),
                clamp((f*f)*4.0,0.0,1.0));

    color = mix(color,
                vec3(0.165,0.129,0.123),
                clamp(length(q),0.0,1.0));

    color = mix(color,
                vec3(0.737,1.000,0.186),
                clamp(length(r.x),0.0,1.0));

    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
}

