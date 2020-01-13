//st setting, range between -1 and 1
    vec2 st = gl_FragCoord.xy/u_resolution;
    st.x *= u_resolution.x/u_resolution.y;
    st = (st-vec2(0.5))*2.0;

//define PI & TWO_PI
    #define PI 3.14159265359
    #define TWO_PI 6.28318530718


//plot
float plot(vec2 st, float pct){
    return smoothstep( pct - 0.02, pct, st.y) -
        smoothstep( pct, pct + 0.02, st.y);
}

//rgb to hsp 
vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
}

//hsb to rgb
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,u
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

//to draw rect
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

//to draw rect2
    vec2 r = abs(center.xy);
    float s = step(.5,max(r.x,r.y));
    f = vec4(vec3(s),1.)

//to draw circle
float circle(in vec2 st, in vec2 center, in float radius, in float feather)
{	
    //float length = distance(center, st);
    //float value = 1.0 - smoothstep(radius - feather/2.0, 
    //                               radius + feather/2.0, length);
    
    //cheat way. dot funtion is more cheap because dot function doesn't use root.
    vec2 dist = st - center;
    float value = 1.0 - smoothstep(radius - feather/2.0, 
                                   radius + feather/2.0, dot(dist,dist)*4.0);
    
    return value;
}

//trigonometry graphs
    y = cos(x*3.);
    y = abs(cos(x*3.));
    y = abs(cos(x*2.5))*0.5+0.3;
    y = abs(cos(x*12.)*sin(x*3.))*.8+.1;
    y = smoothstep(-.5,1., cos(x*10.))*0.2+0.5;

//trigonometry graphs with atan
void main()
{
    //st setting
    float radiusScale = 1.0;
    float radius = length(st)*radiusScale;
    float angleScale = 3.0;
    float angle = atan(st.y, st.x)*angleScale;
    
    float color = step(radius, cos(angle));
    //color = step(radius, abs(cos(angle)));
    //color = step(radius, abs(cos(angle))*.5 + 0.2);
    //color = step(radius, abs(cos(angle)*sin(angle/1.5)));
    //color = step(radius, abs(cos(angle)*sin(angle/1.5))*0.5 + 0.5);    
    gl_FragColor = vec4(vec3(color), 1.0);
}

//to draw N-Polygon
    int N=7;
    float a = tan(nSt.x, nSt.y) + 0.2;
    float b = TWO_PI / float(N);
    float color = vec3(smoothstep(0.5, 0.51, cos(floor(0.5 + a/b) * b - a) 
                       * length(nSt.xy)))
    gl_FragColor = vec4(color, 1.0);

//2D TRS
    mat3 translate(vec2 t){
        return mat3(1.0, 0.0, 0.0, // col1
                    0.0, 1.0, 0.0, // col2
                    t.x, t.y, 1.0); // col3
    }

    mat3 scale(vec2 s){
        return mat3(s.x, 0.0, 0.0, // col1
                    0.0, s.y, 0.0, // col2
                    0.0, 0.0, 1.0); // col3
    }

    mat3 rotate(float angle){
        return mat3(cos(angle), sin(angle), 0.0, // col1
                    -sin(angle), cos(angle), 0.0, // col2
                    0.0, 0.0, 1.0); // col3
    }

// YUV is use for analog encoding systems.
// YUV to RGB matrix
mat3 yuv2rgb = mat3(1.0, 0.0, 1.13983,
                    1.0, -0.39465, -0.58060,
                    1.0, 2.03211, 0.0);

// RGB to YUV matrix
mat3 rgb2yuv = mat3(0.2126, 0.7152, 0.0722,
                    -0.09991, -0.33609, 0.43600,
                    0.615, -0.5586, -0.05639);

// Brick tile, offset in every odd row
vec2 brickTile(vec2 st, float zoom){
    vec2 val = st * zoom;
    //this is more fast because inner funtion in GLSL is suitable for GPU architecture
    float offset = step(1.0, mod(val.y, 2.0)) * 0.5;
    //float offset = mod(val.y, 2.0) < 1.0 ? 0.0 : 1.0 * 0.5;
    val.x += offset;
    return fract(val);
    }

// 2*2 grid Rotation
vec2 gridRotation(vec2 st){
    vec2 val = st*2.0;
    float index = 0.0;
    index += step(1., mod(val.x,2.0));
    index += step(1., mod(val.y,2.0))*2.0;
    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |
    val = fract(val);
    if(index == 0.0) val = rotate2D(val, 0.0);
	if(index == 1.0) val = rotate2D(val, PI * 0.5);
    if(index == 2.0) val = rotate2D(val, PI * 1.0);
    if(index == 3.0) val = rotate2D(val, PI * 1.5);
    return val;
    }