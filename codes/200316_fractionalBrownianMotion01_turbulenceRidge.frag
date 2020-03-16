#ifdef GL_ES
	precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }


float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                        -0.577350269189626,
                        0.024390243902439);

    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);

    vec2 i1 = vec2(0.0);
    i1 = (x0.x > x0.y)? vec2(1.0, 0.0):vec2(0.0, 1.0);
    vec2 x1 = x0.xy + C.xx - i1;
    vec2 x2 = x0.xy + C.zz;

    i = mod289(i);
    vec3 p = permute(
            permute( i.y + vec3(0.0, i1.y, 1.0))
                + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(
                        dot(x0,x0),
                        dot(x1,x1),
                        dot(x2,x2)
                        ), 0.0);

    m = m*m ;
    m = m*m ;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;


    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);

    vec3 g = vec3(0.0);
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * vec2(x1.x,x2.x) + h.yz * vec2(x1.y,x2.y);
    return 130.0 * dot(m, g);
}

// return -1 to 1 for gradient noise
float random(in vec2 st){
    return (-0.5 + fract(sin(dot(st, vec2(12.3425, 48.2342)))
                *75421.3425))*2.0;
}

float noise(in vec2 st){
    vec2 iPos = floor(st);
    vec2 fPos = fract(st);
    
    float a = random(iPos + vec2(0.0));
    float b = random(iPos + vec2(1.0, 0.0));
    float c = random(iPos + vec2(0.0, 1.0));
    float d = random(iPos + vec2(1.0));
    
    vec2 u = fPos * fPos * (3.0 - 2.0*fPos);
    
    return mix(a, b, u.x) +
        	(c - a)*(1.0 - u.x)*u.y +
        	(d - b)*u.x*u.y;
}

float ridge(float val, float offset, float slope){
    val = abs(val);
    val = offset - val;
    
    return pow(val, slope);  
}

float turbulence(float val, float slope){
    val = abs(val);
    return pow(val, slope);  
}

#define OCTAVES 3
float fBM(in vec2 st){
    float lacunarity = 2.;
    float gain = .5; 
    
    float frequency = 1.5;
    float amplitude = .5;
    
    float val = 0.0;
    for(int i = 0; i < OCTAVES; i++){
        val += ridge(snoise(st*frequency), 1.0, 2.0)*amplitude;
        //val += turbulence(snoise(st*frequency), 1.0)*amplitude;
        amplitude *= gain;
        frequency *= lacunarity;
        //frequency *= lacunarity;
    }
    return val;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    st *= vec2(3.0);
    float color = fBM(st);
    gl_FragColor = vec4(vec3(color), 1.0);
}
