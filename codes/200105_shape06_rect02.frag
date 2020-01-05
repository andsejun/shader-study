#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec2 absSt = abs((st-0.5)*2.0);
    
  float rectSize = 0.5;
  float maxVal = max(absSt.x, absSt.y);  
    
  float c = (1.0 - step(rectSize, maxVal))
      		* step(rectSize - 0.05, maxVal);
  gl_FragColor = vec4(vec3(c), 1.0);
}