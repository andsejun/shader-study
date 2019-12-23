// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592
uniform vec2 u_resolution;

void main()
{
    vec2 st = gl_FragCoord.xy/u_resolution;

    float left = 1.0 - smoothstep(0.5, 0.52, st.x);
    float bottom = 1.0 - smoothstep(0.5, 0.52, st.y);
    
    vec3 color = vec3(1.0, 0.0, 1.0) * 
        		 (left*bottom);
    gl_FragColor = vec4(color, 1.0);
}