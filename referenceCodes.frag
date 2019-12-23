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
float rect(in vec2 st, in vec2 center, in vec2 size, in float feather)
{
    //vec2 bottomleft = step(center-size/2., st);
    vec2 bottomleft = smoothstep(center - size/2.0 - feather/2.0,
                                 center - size/2.0 + feather/2.0, st);
    //vec2 topright = 1.0 - step(center+size/2., st);
    vec2 topright = 1.0 - smoothstep(center + size/2.0 - feather/2.0, 
                                     center + size/2.0 + feather/2.0, st);
 	vec2 value = bottomleft * topright;
    return value.x * value.y;
}

//to draw circle
float circle(in vec2 st, in vec2 center, in float radius, in float feather)
{
    float length = distance(center, st);
    float value = 1.0 - smoothstep(radius - feather/2.0, 
                                   radius + feather/2.0, length);
    return value;
}