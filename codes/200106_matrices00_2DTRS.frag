#if GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float rect(vec2 st, vec2 pos, vec2 size){
    vec2 lBottom = step(pos - size/2., st);
    vec2 rUp = 1.0 - step(pos + size/2., st);
    vec2 val = lBottom * rUp;
    return val.x * val.y;
    
}

float cross(vec2 st, vec2 pos, vec2 size){
	return rect(st, pos, size) + 
           rect(st, pos, vec2(size.y, size.x));    
}

mat3 translate(vec2 t){
    return mat3(1.0, 0.0, 0.0, // col1
               	0.0, 1.0, 0.0, // col2
               	t.x, t.y, 1.0); // col3
}

mat3 scale(vec2 s){
    return mat3(s.x, 0.0, 0.0, // col1
               	0.0, s.y, 0.0, // col2
               	0.0, 0.0, 1.0); // col3
}

mat3 rotate(float angle){
    return mat3(cos(angle), sin(angle), 0.0, // col1
               	-sin(angle), cos(angle), 0.0, // col2
                0.0, 0.0, 1.0); // col3
}

void main()
{	
 	vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 nSt = vec2((st-0.5)*2.0);
    
    vec3 pos = vec3(0.5, 0.5, 1.0);
        
    mat3 T = translate(vec2(0.3,0.0));
    mat3 R = rotate(TWO_PI*u_time/10.0);
    mat3 S = scale(vec2(0.5, 0.5));
    
    vec3 mSt = (T*R*S)*vec3(nSt, 1.0);
    
	float color = cross(mSt.xy, pos.xy, vec2(0.2,0.05))
				  +	cross(st.xy, pos.xy, vec2(0.2,0.05))
        		  +	cross(nSt.xy, pos.xy, vec2(0.2,0.05));
    gl_FragColor = vec4(vec3(color, 0.0, color), 1.0);
}