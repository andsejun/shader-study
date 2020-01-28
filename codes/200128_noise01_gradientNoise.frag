#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

vec2 random2D(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
               dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
	}

float gradientNoise(vec2 st){
    vec2 iPos = floor(st);
    vec2 fPos = fract(st);
    
    vec2 a = vec2(0.0, 0.0);
	vec2 b = vec2(1.0, 0.0);
    vec2 c = vec2(0.0, 1.0);
    vec2 d = vec2(1.0, 1.0);
    
    vec2 u = fPos * fPos * (3.0 - 2.0 * fPos);

    return mix(mix(dot(random2D(iPos + a), fPos - a),
                   dot(random2D(iPos + b), fPos - b), u.x),
               mix(dot(random2D(iPos + c), fPos - c),
                   dot(random2D(iPos + d), fPos - d), u.x), 
               u.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    st *= 10.0;
    float color = gradientNoise(st)/2.0 + 0.5;
	gl_FragColor = vec4(vec3(color), 1.0);    
}