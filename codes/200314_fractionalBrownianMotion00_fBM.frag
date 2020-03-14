#ifdef GL_ES
	precision mediump float;
#endif

uniform vec2 u_resolution;
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
    
    vec2 u = fPos*fPos*(3.0 - 2.0*fPos);
    
    return mix(a, b, u.x) + 
			(c-a)*(1.0-u.x)*u.y +
			(d-b)*u.x*u.y;
}

#define OCTAVES 5
float fBM(in vec2 st){
    float lacunarity = 2.0;
    float gain = 0.5;
    float frequency = 1.0;
    float amplitude = 0.5;
    float value = 0.0;
    for(int i = 0; i <= OCTAVES; i++){
        value += amplitude*noise(st*frequency);
       	frequency *= lacunarity;
        amplitude *= gain;
    }
    return value;
}
    
void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    st *= vec2(5.0);
    float color = fBM(st);
    gl_FragColor = vec4(vec3(color), 1.0);
}