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
    float shape(vec2 st, int N){
        st = st*2.-1.;
        float a = atan(st.x,st.y)+PI;
        float r = PI*2.0/float(N);
        return cos(floor(.5+a/r)*r-a)*length(st);
    }   

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

// random 1-demnsion
    // to make a random graph, but this is not ultimate random num
    // Also we can use chaotic by using pow(random(x), num), this is close to 0.0
    // or using sqrt(random(x), num), this is close to 1.0
    // Also this is like a pseudo-random. It is always return same value in response of x.
    y = fract(sin(x)*scale);

// random 2-dimension(0.0 ~ 1.0)
float random (vec2 st) {
    // rutern 2-dimension vector to random num, 0.0 to 1.0
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*43734.5453123);
    }

//1-dimensional noise(0.0 ~ 1.0)
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f); // this is custom cubic curve
    y = mix(rand(i), rand(i + 1.0), u);
    // y = mix(rand(i), rand(i + 1.0), smoothstep(0.0, 1.0, f));

//2-dimensional value noise(0.0 ~ 1.0)
float valueNoise(vec2 st){
    vec2 iPos = floor(st);
    vec2 fPos = fract(st);

    float a = random(iPos);
    float b = random(vec2(iPos.x + 1.0, iPos.y));
    float c = random(vec2(iPos.x, iPos.y + 1.0));
    float d = random(vec2(iPos.x + 1.0, iPos.y + 1.0));

    vec2 u = fPos * fPos * (3.0 - 2.0 * fPos);
    //this is same
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    //return mix(a, b, u.x) + (c - a)*(1.0 - u.x)*u.y + (d - b)*u.x*u.y;
    }

//2-dimensional random(-1.0 ~ 1.0)
vec2 random2D(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
               dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
	}

//2-dimensional gradient noise(-1.0 ~ 1.0)
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

// Cubic Hermite Curve.  Same as SmoothStep()
    y = x * x * (3.0-2.0 * x);
    
// Quintic interpolation curve
    y = x * x * x * (x * (x * 6.-15.) + 10.);

// Simplex Grid
    vec2 skew (vec2 st) {
        vec2 r = vec2(0.0);
        r.x = 1.1547*st.x;
        r.y = st.y+0.5*r.x;
        return r;
    }

    vec3 simplexGrid (vec2 st) {
        vec3 xyz = vec3(0.0);
        vec2 p = fract(skew(st));
        if (p.x > p.y) {
            xyz.xy = 1.0-vec2(p.x,p.y-p.x);
            xyz.z = p.y;
        } else {
            xyz.yz = 1.0-vec2(p.x-p.y,p.y);
            xyz.x = p.x;
        }
        return fract(xyz);
    }

// 2D Simplex Noise 
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                            0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                            -0.577350269189626,  // -1.0 + 2.0 * C.x
                            0.024390243902439); // 1.0 / 41.0
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i); // Avoid truncation effects in permutation
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));

        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

// 3D Simplex Noise
    vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        vec3 r;
        r.z = fract(512.0*j);
        j *= .125;
        r.x = fract(512.0*j);
        j *= .125;
        r.y = fract(512.0*j);
        return r-0.5;
    }

    const float F3 =  0.3333333;
    const float G3 =  0.1666667;
    float snoise(vec3 p) {

        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));

        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);

        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;

        vec4 w, d;

        w.x = dot(x, x);
        w.y = dot(x1, x1);
        w.z = dot(x2, x2);
        w.w = dot(x3, x3);

        w = max(0.6 - w, 0.0);

        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);

        w *= w;
        w *= w;
        d *= w;

        return dot(d, vec4(52.0));
    }

// Voronoi Algorithm With Border
    vec2 voronoiWithBorder(in vec2 st){
        vec2 fPos = fract(st);
        vec2 iPos = floor(st);
        
        vec2 near;
        vec2 coord;

        // to get center-point distance
        float dist = 10.0;
        for(int i = -1; i <= 1; i++){
            for(int j = -1; j <= 1; j++){
                vec2 n = vec2(i, j);
                vec2 p = random2D(iPos + n);
                vec2 c = n + p - fPos;
                float d = length(c);
                
                if(d < dist){
                    dist = d;
                    near = n;
                    coord = c;
                }
            }
        }
        
        // to get center-border distance
        float borderDist = 10.0;
        for(int i = -2; i <= 2; i++){
            for(int j = -2; j <= 2; j++){
                vec2 n = near + vec2(i, j);
                vec2 p = random2D(iPos + n);
                vec2 c = n + p - fPos;
                
                // not to select same point
                if(dot(coord - c, coord - c) > 0.00001)
                {
                    borderDist = min(borderDist, dot(0.5*(c + coord), normalize(c - coord)));
                }
            }
        }
        return vec2(dist, borderDist);
    }