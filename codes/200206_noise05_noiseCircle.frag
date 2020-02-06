#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 random(vec2 st){
    st = vec2(dot(st, vec2(1254.3242, 3923.1343)),
              dot(st, vec2(5923.2321, 2391.1232)));
    return -1.0 + 2.0*fract(sin(st)*32485.2342);
}

float noise(vec2 st){
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0 - 2.0*f);
    
    vec2 a = vec2(0.0, 0.0);
    vec2 b = vec2(1.0, 0.0);
    vec2 c = vec2(0.0, 1.0);
    vec2 d = vec2(1.0, 1.0);
    
    return mix(mix(dot(random(i + a), f - a), dot(random(i + b), f - b), u.x),
               mix(dot(random(i + c), f - c), dot(random(i + d), f - d), u.x), u.y);
}

float shape(vec2 st, float radius)
{
	st = vec2(0.5)-st;
    float r = length(st)*2.0;
    float a = atan(st.y,st.x);
    float m = abs(mod(a+u_time*2.,3.14*2.)-3.14)/3.6;
    float f = radius;
    //m += noise(st+u_time*0.1)*.5;
    // a *= 1.+abs(atan(u_time*0.200))*.1;
    // a *= 1.+noise(st+u_time*0.1)*0.1;
    //f += sin(a*50.)*noise(st*2. + u_time/2.)*.1;
    f += (sin(a*20.)*.1*pow(m,2.));
    return 1.-smoothstep(f,f+0.007,r);
}
void main()
{
    vec2 st = gl_FragCoord.xy / u_resolution;
    st.x *= u_resolution.x / u_resolution.y;
    
 	float color = shape(st, 0.8) - shape(st, 0.78);
    
    gl_FragColor = vec4(vec3(1.0 - color), 1.0);
}