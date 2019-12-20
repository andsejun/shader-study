
#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.283185
#define PI 3.141592

uniform vec2 u_resolution;
uniform float u_time;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main() {
    // x,y coordinates from 0.0 to 1.0
	vec2 st = gl_FragCoord.xy/u_resolution;
    // x,y coordinates from -1.0 to 1.0
    vec2 nst = (st-0.5)*2.0;
    
    // polar coordinates for HSB
    float dist = length(nst);
    float angle = atan(nst.y, nst.x)/TWO_PI 
        		  + u_time/5.0;
    
    vec3 color = hsb2rgb(vec3(angle, dist, 1.0));
    
    gl_FragColor = vec4(color, 1.0);
}
