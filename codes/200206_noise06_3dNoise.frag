#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in float x) {
    return fract(sin(x)*1e4);
}

float noise (in vec3 p) {
	const vec3 step = vec3(110.0, 20.0, 171.0);
    
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f*f*(3.0-2.0*f);
    
    vec3 v1 = vec3(0.0, 0.0, 0.0);
    vec3 v2 = vec3(1.0, 0.0, 0.0);
    
    vec3 v3 = vec3(0.0, 1.0, 0.0);
    vec3 v4 = vec3(1.0, 1.0, 0.0);
    
    vec3 v5 = vec3(0.0, 0.0, 1.0);
    vec3 v6 = vec3(1.0, 0.0, 1.0);
    
    vec3 v7 = vec3(0.0, 1.0, 1.0);
    vec3 v8 = vec3(1.0, 1.0, 1.0);
    
    float n = dot(i, step);
    
    return mix(mix(mix(random(n + dot(step, v1)), random(n + dot(step, v2)), u.x),
                   mix(random(n + dot(step, v3)), random(n + dot(step, v4)), u.x), u.y),
               mix(mix(random(n + dot(step, v5)), random(n + dot(step, v6)), u.x),
                   mix(random(n + dot(step, v7)), random(n + dot(step, v8)), u.x), u.y),
               u.z);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

	vec3 pos = vec3(st*5.0, u_time);
    color = vec3(noise(pos));

    gl_FragColor = vec4(color,1.0);
}
