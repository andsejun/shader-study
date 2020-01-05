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
  float size = 0.5;
  float smoothness = 0.1;

  //x축과 y축에 비해 대각선 축은 0.3 지점을 넘어가는 순간 빠르게 밝아지므로 꼭지점이
  //라운드가 이루어진다.
  float rectSize = 0.5;
  float dist = length(max(absSt - size, 0.0));  
  
  //smoothness -> 대각선으로 번져가는 지점 어디서 끊을지   
  float c = 1.0 - step(smoothness, dist);
  //float c = dist;  
  gl_FragColor = vec4(vec3(c), 1.0);
}