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
    
    vec2 center = vec2(0.5,0.5);
    vec2 absSt = abs(st);
	float scale = 1.;
    float dist = distance(absSt, center) * scale; 
    
    ///// per x,y min(vec2(0.4, 0.5), 0.45) -> vec2(0.4, 0.45)
    // float len = length(min(absSt - 0.5, 0.));
    // float len = length(max(absSt - 0.5, 0.));

	//vec3 color = vec3(fract(dist));
	vec3 color = vec3(step(dist, 0.45)*
        			 (1.0 - step(dist, 0.3)));
    gl_FragColor = vec4(color, 1.0);    
}