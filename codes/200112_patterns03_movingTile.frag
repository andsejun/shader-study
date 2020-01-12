#ifdef GL_ES
precision mediump float;
#endif
#ifdef GL_ES
	precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 brickTile(in vec2 _st, in float _zoom, in float _speed)
{
    vec2 st = _st * _zoom;
    float speed = mod(u_time * _speed, 2.0);
    //this is more fast because inner funtion in GLSL is suitable for GPU architecture
    if(speed > 1.0){
    float offset = step(1.0, mod(st.y, 2.0)) * speed;
    st.x += offset;
   	}
    else{
    float offset = step(1.0, mod(st.x, 2.0)) * speed;
    st.y += offset;        
    }
    return fract(st);
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
    st = brickTile(st, 10.0, 2.0);
    float color = rect(st, vec2(0.5), 0.9, 0.01);
    color -=  1.0 - step(0.2, length(st - vec2(0.5)));
    gl_FragColor = vec4(vec3(color), 1.0);
    //gl_FragColor = vec4(vec3(st, 0.0), 1.0);
}