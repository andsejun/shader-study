// Author:
// Title:

#if GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main()
{
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    st = (st-vec2(0.5))*2.0;
    
    float radiusScale = 1.0;
	float radius = length(st)*radiusScale;
    
    float angleScale = 3.0;
    float angle = atan(st.y, st.x)*angleScale;
    
    
    float color = step(radius, cos(angle));
    //color = step(radius, abs(cos(angle)));
    //color = step(radius, abs(cos(angle))*.5 + 0.2);
    //color = step(radius, abs(cos(angle)*sin(angle/1.5)));
    //color = step(radius, abs(cos(angle)*sin(angle/1.5))*0.5 + 0.5);    
	gl_FragColor = vec4(vec3(color), 1.0);
}