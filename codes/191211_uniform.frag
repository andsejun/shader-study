#ifdef GL_ES
	precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
    
void main()
{
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mousePos = u_mouse/u_resolution;
    vec3 color = vec3(mousePos*st, sin(u_time));
    gl_FragColor = vec4(color, 1.0);
}