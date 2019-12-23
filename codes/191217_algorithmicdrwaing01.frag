#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(float pct, vec2 st)
{
    return smoothstep(pct-0.02, pct, st.y) -
        smoothstep(pct, pct+0.02, st.y);
}

void main()
{
	vec2 st = gl_FragCoord.xy/u_resolution;
	float x = st.x;
    x = pow(x, 5.0);
	vec3 color = vec3(x);
    
    //plot 
    float pct = plot(x, st);
    color = (1.0 - pct)*color + pct*vec3(0.0, 1.0, 0.0);
    
	gl_FragColor = vec4(color, 1.0);    
}