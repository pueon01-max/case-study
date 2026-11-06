/* Luckin — real-time liquid (WebGL ray-marching)
   One full-screen shader draws everything wet:
   · 01 ENTRY   — a glossy, wobbling liquid clover floating over a water surface (with reflection + ripples)
   · 02 BREWING — the clover melts into a swirling, splashing water vortex
   · 03–05      — the vortex sinks, leaving a calm water surface under the cards
   The page tells it which scene is active; everything else (morphing, ripples, the droplet that
   follows the pointer and merges into the clover) is handled here. */
(function () {
  const cv = document.getElementById("water");
  let gl = null;
  try { gl = cv.getContext("webgl", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "high-performance" }); } catch (e) {}
  if (!gl) { document.body.classList.add("no-gl"); window.Water = null; return; }

  const VS = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
  const FS = `
precision highp float;
uniform vec2 uRes;uniform vec2 uAnchor;uniform float uScale;uniform float uTime;uniform float uPitch;
uniform float uMorph;uniform float uHover;uniform float uHold;uniform vec3 uDrop;uniform float uDropOn;
uniform vec4 uRip[6];
const float W0=-1.25;const float F=3.1;const float D=6.5;

mat2 r2(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float sdEll(vec3 p,vec3 r){float k0=length(p/r);float k1=length(p/(r*r));return k0*(k0-1.)/k1;}
float hash(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float noise(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
  return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}

/* ---- liquid clover: four inflated hearts, folded from one ---- */
float clover(vec3 p){
  float m=clamp(uMorph,0.,1.);
  p.y+=m*1.7; p.y-=sin(uTime*1.1)*.07;
  float sc=1.-m*.4; p/=sc;
  p.yz=r2(-.16)*p.yz; p.xz=r2(sin(uTime*.5)*.2)*p.xz; p.xy=r2(sin(uTime*.37)*.07)*p.xy;
  float w=.02+uHover*.035+m*.16;
  p+=w*vec3(sin(p.y*4.+uTime*1.7),sin(p.x*3.+p.z*4.+uTime*1.3),sin(p.x*4.-p.y*2.+uTime*1.9));
  float a=atan(p.y,p.x);const float sec=1.5707963;a=mod(a,sec)-sec*.5;float r=length(p.xy);
  vec3 q=vec3(cos(a)*r,sin(a)*r,p.z);
  float l1=sdEll(vec3(r2(.16)*(q.xy-vec2(.63,.18)),q.z),vec3(.37,.28,.22));
  float l2=sdEll(vec3(r2(-.16)*(q.xy-vec2(.63,-.18)),q.z),vec3(.37,.28,.22));
  float tp=sdEll(q-vec3(.27,0.,0.),vec3(.32,.17,.16));
  float d=smin(smin(l1,l2,.075),tp,.15);
  d=smin(d,length(p*vec3(1.,1.,1.4))-.17,.12);
  /* a few loose droplets drifting round it */
  for(int i=0;i<3;i++){float fi=float(i);vec3 c=vec3(cos(uTime*.42+fi*2.1)*1.62,sin(uTime*.7+fi*1.7)*.42+.15,sin(uTime*.42+fi*2.1)*.5);
    d=smin(d,length(p-c)-(.055+fi*.018),.04);}
  return d*sc;
}

/* ---- water vortex: a noisy, swirling ring sitting in the water ---- */
float vortex(vec3 p){
  float k=clamp(uMorph,0.,1.),out_=clamp(uMorph-1.,0.,1.);
  p.y-=W0+.1-out_*1.5;
  float spin=uTime*(1.15+uHold*1.8);
  float a=atan(p.z,p.x),rr=length(p.xz);
  float R=1.9*(.45+.55*k)*(1.-uHold*.07);
  float n=noise(vec3(a*2.6-spin*.9,p.y*3.,rr*2.)+vec3(0.,uTime*.5,0.));
  float wav=.13*sin(3.*a+spin*1.3)+.07*sin(7.*a-spin*2.)*(1.+uHold);
  vec2 c=vec2(rr-R*(1.+wav*.35),p.y-.2*sin(2.*a+spin)-.16*n-.06);
  float th=.15+.1*n+.05*sin(5.*a+spin*2.)+uHold*.05;
  float d=length(c*vec2(1.,1.3))-th;
  vec2 c2=vec2(rr-R*.74,p.y-.06*sin(4.*a-spin));
  d=smin(d,length(c2)-(.07+.06*n),.2);
  float sp=.38+uHold*.35;
  for(int i=0;i<6;i++){float fi=float(i);float tt=uTime*sp+fi*.19;float ph=fract(tt);float aa=fi*1.37+floor(tt)*2.3-spin*.2;
    vec3 dp=vec3(cos(aa)*R*(1.+ph*.55),ph*1.5-ph*ph*1.7+.15,sin(aa)*R*(1.+ph*.55));
    d=smin(d,length(p-dp)-.075*(1.-ph),.07);}
  return d*.72;
}

float map(vec3 p){
  float m=uMorph,d;
  if(m<=.02) d=clover(p);
  else if(m<1.) d=mix(clover(p),vortex(p),smoothstep(0.,1.,m));
  else if(m<1.97) d=vortex(p);
  else d=1e3;
  if(uDropOn>.01) d=smin(d,length(p-uDrop)-.13*uDropOn,.34);
  return d;
}
vec3 boundC(){return vec3(0.,mix(0.,W0+.15,clamp(uMorph,0.,1.)),0.);}
float boundR(){return mix(2.45,3.5,clamp(uMorph,0.,1.));}
vec2 sph(vec3 ro,vec3 rd,vec3 c,float r){vec3 oc=ro-c;float b=dot(oc,rd);float h=b*b-dot(oc,oc)+r*r;if(h<0.)return vec2(-1.);h=sqrt(h);return vec2(-b-h,-b+h);}
float march(vec3 ro,vec3 rd,float tmax,const int N){
  if(uMorph>1.97&&uDropOn<.01)return -1.;
  vec2 b=sph(ro,rd,boundC(),boundR());if(b.y<0.)return -1.;
  float t=max(b.x,0.),te=min(b.y,tmax);
  for(int i=0;i<90;i++){if(i>=N)break;vec3 p=ro+rd*t;float d=map(p);if(d<.0016*t)return t;t+=d;if(t>te)break;}
  return -1.;
}
vec3 nrm(vec3 p){const vec2 e=vec2(.0025,-.0025);
  return normalize(e.xyy*map(p+e.xyy)+e.yyx*map(p+e.yyx)+e.yxy*map(p+e.yxy)+e.xxx*map(p+e.xxx));}

vec3 sky(vec3 r){return mix(vec3(.80,.86,1.),vec3(1.),smoothstep(-.3,.7,r.y));}
const vec3 L=vec3(-.48,.74,.47);

vec3 shadeLiquid(vec3 p,vec3 rd,bool cheap){
  vec3 n=nrm(p),v=-rd,l=normalize(L);
  float clear=clamp(uMorph,0.,1.);
  float dif=dot(n,l)*.5+.5;
  vec3 deep=mix(vec3(.025,.09,.6),vec3(.09,.25,.9),clear*.55);
  vec3 mid=mix(vec3(.15,.35,1.),vec3(.32,.52,1.),clear*.5);
  vec3 col=mix(deep,mid,pow(dif,1.4));
  float fr=pow(1.-max(dot(n,v),0.),3.);
  if(!cheap){
    float thick=clamp(-map(p-n*.22)/.22,0.,1.);
    col=mix(col,vec3(.58,.72,1.),(1.-thick)*(.4+clear*.2));
  }
  vec3 r=reflect(rd,n);
  col+=sky(r)*fr*.75;
  col+=max(-n.y,0.)*vec3(.35,.5,1.)*.3;
  float s1=pow(max(dot(r,l),0.),70.),s2=pow(max(dot(r,normalize(vec3(.6,.35,.7))),0.),18.);
  col+=vec3(1.)*s1*1.7+vec3(.75,.85,1.)*s2*.32;
  if(clear>.05){col=mix(col,vec3(.72,.82,1.),fr*.6*clear);col+=vec3(.9,.95,1.)*pow(fr,1.5)*.35*clear;}
  return col;
}

float waterH(vec2 xz,out vec2 g){
  float d=length(xz);vec2 dir=xz/max(d,1e-3);
  float calm=1.-.45*clamp(uMorph-1.,0.,1.);
  float fq=6.2,ph=d*fq-uTime*(1.4+uHold*1.6);
  float env=exp(-d*.11)*smoothstep(.5,1.7,d)*(1.+uHold*.6)*calm;
  float amp=.012;
  float s0=sin(ph),c0=cos(ph);
  float h=s0*amp*env;g=dir*c0*fq*amp*env;
  float ph2=d*13.-uTime*2.1;h+=sin(ph2)*amp*.25*env;g+=dir*cos(ph2)*13.*amp*.25*env;
  for(int i=0;i<6;i++){vec4 rp=uRip[i];float age=uTime-rp.z;if(age<0.||age>5.5)continue;
    vec2 v=xz-rp.xy;float dd=length(v);float x=dd-age*1.7;float e=exp(-x*x*5.)*rp.w*(1.-age/5.5);
    float p2=x*8.;h+=sin(p2)*e*.028;g+=(v/max(dd,1e-3))*cos(p2)*8.*e*.028;}
  return h;
}

void main(){
  vec3 ro=vec3(0.,sin(uPitch)*D,cos(uPitch)*D);
  vec3 fw=normalize(-ro),rt=normalize(cross(fw,vec3(0.,1.,0.))),up=cross(rt,fw);
  vec2 uv=(gl_FragCoord.xy-uAnchor)/uScale;
  vec3 rd=normalize(rt*uv.x+up*uv.y+fw*F);
  vec3 bg=vec3(.955,.966,1.);
  vec3 col=bg;
  float tw=rd.y<0.?(W0-ro.y)/rd.y:1e4;
  float tl=march(ro,rd,min(tw,40.),90);
  if(tl>0.){
    col=shadeLiquid(ro+rd*tl,rd,false);
  }else if(tw<1e3){
    vec3 P=ro+rd*tw;vec2 g;waterH(P.xz,g);
    vec3 n=normalize(vec3(-g.x,1.,-g.y)),v=-rd,l=normalize(L);
    float fr=.03+.97*pow(1.-max(dot(n,v),0.),5.);
    vec3 body=vec3(.925,.945,1.);
    /* ripple relief: light facing slopes go white, the others pick up blue */
    float sl=dot(g,normalize(vec2(-.35,-.94)));
    col=body+vec3(.07,.055,.0)*clamp(sl*7.,-1.,1.)-vec3(.16,.12,.0)*clamp(-sl*7.,0.,1.);
    vec3 r=reflect(rd,n);
    col=mix(col,sky(r),fr*.6);
    col+=vec3(1.)*pow(max(dot(r,l),0.),160.)*.55;
    /* the liquid mirrored in the water */
    float tr=march(P+n*.01,r,12.,44);
    if(tr>0.){vec3 rc=shadeLiquid(P+n*.01+r*tr,r,true);col=mix(col,rc,.3*exp(-tr*.25));}
    /* soft blue glow + contact foam around whatever is floating */
    float s=map(vec3(P.x,W0+.02,P.z));
    if(s<5.){col=mix(col,vec3(.5,.62,1.),exp(-s*2.)*.3*(1.-clamp(uMorph-1.,0.,1.)));
      col=mix(col,vec3(.99,.995,1.),smoothstep(.12,.0,s)*.65*clamp(uMorph,0.,1.)*(1.-clamp(uMorph-1.,0.,1.)));}
    col=mix(col,bg,smoothstep(9.,26.,tw));
  }
  /* very light vignette for depth */
  vec2 q=gl_FragCoord.xy/uRes-.5;col*=1.-dot(q,q)*.12;
  gl_FragColor=vec4(pow(clamp(col,0.,1.),vec3(.98)),1.);
}`;

  function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(s)); return null; } return s; }
  const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  const prog = gl.createProgram();
  if (!vs || !fs) { document.body.classList.add("no-gl"); window.Water = null; return; }
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(prog)); document.body.classList.add("no-gl"); window.Water = null; return; }
  document.body.classList.add("gl");
  gl.useProgram(prog);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = {}; ["uRes", "uAnchor", "uScale", "uTime", "uPitch", "uMorph", "uHover", "uHold", "uDrop", "uDropOn", "uRip[0]"].forEach(n => U[n] = gl.getUniformLocation(prog, n));

  /* ---- sizing: render below native resolution and let CSS scale it up (liquid is soft anyway) ---- */
  let W = 0, H = 0, RS = 1;
  function resize() {
    W = innerWidth; H = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    RS = dpr * (W < 820 ? .6 : .72);
    const maxPx = 1.25e6; if (W * H * RS * RS > maxPx) RS = Math.sqrt(maxPx / (W * H));
    cv.width = Math.round(W * RS); cv.height = Math.round(H * RS);
    gl.viewport(0, 0, cv.width, cv.height);
  }
  addEventListener("resize", resize); resize();

  /* ---- scene targets ---- */
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let scene = "s1";
  const cur = { ax: W * .7, ay: H * .45, s: 400, pitch: .34, morph: 0 };
  function rectOf(sel) { const el = document.querySelector(sel); return el ? el.getBoundingClientRect() : null; }
  function targets() {
    const mob = W < 820;
    if (scene === "s1") { const r = rectOf("#cloverBtn"); if (r && r.width) return { ax: r.left + r.width / 2, ay: r.top + r.height * .47, s: r.width * .9, pitch: .34, morph: 0 }; }
    if (scene === "s2") { const s = Math.min(W * (mob ? .92 : .66), H * 1.1, 1000) / 2.15; return { ax: W / 2, ay: H / 2 + (mob ? 30 : 6) - s * .42, s, pitch: mob ? .78 : .64, morph: 1 }; }
    const sel = scene === "s3" ? "#cardScene" : scene === "s4" ? ".phone-wrap" : ".fan";
    const r = rectOf(sel); if (r && r.width) return { ax: r.left + r.width / 2, ay: r.top + r.height * .42, s: Math.max(r.width, 260) * .55, pitch: .55, morph: 2 };
    return { ax: W / 2, ay: H / 2, s: 300, pitch: .55, morph: 2 };
  }

  /* ---- camera math (same as the shader) so the pointer can be placed in the 3D world ---- */
  function ray(px, py) {
    const ro = [0, Math.sin(cur.pitch) * 6.5, Math.cos(cur.pitch) * 6.5];
    const l = Math.hypot(...ro), fw = ro.map(v => -v / l);
    let rt = [-fw[2], 0, fw[0]]; const rl = Math.hypot(...rt); rt = rt.map(v => v / rl);
    const up = [rt[1] * fw[2] - rt[2] * fw[1], rt[2] * fw[0] - rt[0] * fw[2], rt[0] * fw[1] - rt[1] * fw[0]];
    const u = (px - cur.ax) / cur.s, v = (cur.ay - py) / cur.s;
    let rd = [0, 1, 2].map(i => rt[i] * u + up[i] * v + fw[i] * 3.1); const dl = Math.hypot(...rd); rd = rd.map(x => x / dl);
    return { ro, rd, fw };
  }

  /* ---- interaction state ---- */
  const rip = new Float32Array(24); for (let i = 0; i < 6; i++) rip[i * 4 + 2] = -99;
  let ripI = 0, lastRip = 0, lastRipPos = [99, 99];
  function addRipple(x, z, amp, t) { rip[ripI * 4] = x; rip[ripI * 4 + 1] = z; rip[ripI * 4 + 2] = t; rip[ripI * 4 + 3] = amp; ripI = (ripI + 1) % 6; }
  let px = -1, py = -1, movedAt = -10, hover = 0, kick = 0, hold = 0, dropOn = 0;
  const drop = [0, 0, 1.2];
  addEventListener("pointermove", e => { px = e.clientX; py = e.clientY; movedAt = performance.now() / 1000; }, { passive: true });
  addEventListener("pointerdown", e => { px = e.clientX; py = e.clientY; movedAt = performance.now() / 1000; }, { passive: true });

  const t0 = performance.now();
  let last = t0;
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const time = reduced ? 3 : (now - t0) / 1000;
    const tg = targets(), k = 1 - Math.exp(-dt * 5), km = 1 - Math.exp(-dt * (tg.morph > cur.morph ? 1.6 : 2.4));
    cur.ax += (tg.ax - cur.ax) * k; cur.ay += (tg.ay - cur.ay) * k; cur.s += (tg.s - cur.s) * k; cur.pitch += (tg.pitch - cur.pitch) * (1 - Math.exp(-dt * 2.2));
    cur.morph += (tg.morph - cur.morph) * km; if (Math.abs(tg.morph - cur.morph) < .002) cur.morph = tg.morph;

    /* hover + the droplet that chases the pointer and merges into the clover */
    const nowS = now / 1000, active = scene === "s1" && px >= 0 && nowS - movedAt < 2.5;
    let wantDrop = 0;
    if (active) {
      const { ro, rd, fw } = ray(px, py);
      const tt = -(ro[0] * fw[0] + ro[1] * fw[1] + ro[2] * fw[2]) / (rd[0] * fw[0] + rd[1] * fw[1] + rd[2] * fw[2]);
      let P = [0, 1, 2].map(i => ro[i] + rd[i] * tt); const dist = Math.hypot(...P);
      if (dist < 2.9) { wantDrop = 1; if (dist > 1.72) P = P.map(v => v * 1.72 / dist); [0, 1, 2].forEach(i => drop[i] += (P[i] - drop[i]) * (1 - Math.exp(-dt * 7))); }
      /* pointer over the water leaves ripples */
      if (rd[1] < 0) { const tw = (-1.25 - ro[1]) / rd[1], wx = ro[0] + rd[0] * tw, wz = ro[2] + rd[2] * tw;
        if (time - lastRip > .22 && Math.hypot(wx - lastRipPos[0], wz - lastRipPos[1]) > .45 && Math.hypot(wx, wz) > 1.4) { addRipple(wx, wz, .55, time); lastRip = time; lastRipPos = [wx, wz]; } }
    }
    dropOn += (wantDrop - dropOn) * (1 - Math.exp(-dt * 4));
    const r = scene === "s1" ? document.getElementById("cloverBtn").getBoundingClientRect() : null;
    const over = r && px > r.left && px < r.right && py > r.top && py < r.bottom ? 1 : 0;
    hover += (over - hover) * (1 - Math.exp(-dt * 5)); kick *= Math.exp(-dt * 2.2);

    gl.uniform2f(U.uRes, cv.width, cv.height);
    gl.uniform2f(U.uAnchor, cur.ax * RS, (H - cur.ay) * RS);
    gl.uniform1f(U.uScale, cur.s * RS);
    gl.uniform1f(U.uTime, time);
    gl.uniform1f(U.uPitch, cur.pitch);
    gl.uniform1f(U.uMorph, cur.morph);
    gl.uniform1f(U.uHover, Math.min(2.5, hover + kick));
    gl.uniform1f(U.uHold, hold);
    gl.uniform3f(U.uDrop, drop[0], drop[1], drop[2]);
    gl.uniform1f(U.uDropOn, dropOn < .01 ? 0 : dropOn);
    gl.uniform4fv(U["uRip[0]"], rip);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!reduced || cur.morph !== tg.morph) requestAnimationFrame(frame); else setTimeout(() => requestAnimationFrame(frame), 250);
    timeNow = time;
  }
  let timeNow = 0;
  requestAnimationFrame(frame);

  window.Water = {
    scene(id) { scene = id; if (id === "s2") addRipple(0, 0, 1.2, timeNow); },
    splash() { kick = 2.2; addRipple(0, 0, 1.6, timeNow); addRipple(0, 0, 1, timeNow + .35); },
    setHold(v) { hold = v; },
    _state: cur
  };
})();
