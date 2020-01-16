#ifdef GL_ES
precision mediump float;
#endif
    
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// rutern 2-dimension vector to random num, 0.0 to 1.0
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,23.233)))*
        4375.5453123*fract(u_time));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float grid = 5.0;
    st *= grid;
    st *= vec2(1.0, 5.0);
    vec2 iPos = floor(st);
    vec2 fPos = fract(st);
    
    float color = random(iPos * fPos);
    gl_FragColor = vec4(vec3(color), 1.0);
}
