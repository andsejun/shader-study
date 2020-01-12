#ifdef GL_ES
	precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 brickTile(vec2 st, float zoom)
{
    vec2 val = st * zoom;
    //this is more fast because inner funtion in GLSL is suitable for GPU architecture
    float offset = step(1.0, mod(val.y, 2.0)) * u_time;
    //float offset = mod(val.y, 2.0) < 1.0 ? 0.0 : 1.0 * 0.5;
    val.x += offset + u_time;
    return fract(val);
}

float rect(vec2 st, vec2 center, float size, float feather)
{	
    //left down
    vec2 val = smoothstep(center - size/2.0 - feather/2.0, 
						  center - size/2.0 + feather/2.0, st);
    //right up
    val *= 1.0 - smoothstep(center + size/2.0 - feather/2.0, 
							center + size/2.0 + feather/2.0, st);
    return val.x * val.y;    
}


void main(){
	vec2 st = gl_FragCoord.xy / u_resolution;
    st.x *= u_resolution.x / u_resolution.y;
	st *= vec2(1.0, 3.0);
    st = brickTile(st, 5.0);
    float color = rect(st, vec2(0.5), 0.9, 0.01);
    gl_FragColor = vec4(vec3(color), 1.0);
    //gl_FragColor = vec4(vec3(st, 0.0), 1.0);
}