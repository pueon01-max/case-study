/* Luckin — Brew Your Luck
   01 Entry (glossy clover on water) → 02 Brewing (liquid vortex, hold to stir)
   → 03 Reveal (glass card flips over) → 04 Claim (reward in the app) → 05 Share (three luck cards) */

const REWARDS = [
  { icon: "latte",  name: "Free Upgrade",       sub: "Any drink, any size",     valid: "Valid for 7 days",  rarity: "common", weight: 30 },
  { icon: "latte",  name: "Buy 1 Get 1",        sub: "Any latte or cappuccino", valid: "Valid for 3 days",  rarity: "common", weight: 30 },
  { icon: "latte",  name: "Free Add-On",        sub: "Extra shot or syrup",     valid: "Valid for 14 days", rarity: "common", weight: 20 },
  { icon: "matcha", name: "Free Matcha Latte",  sub: "Regular · hot or iced",   valid: "Valid for 5 days",  rarity: "rare",   weight: 16 },
  { icon: "latte",  name: "50% Off Any Drink",  sub: "One use · all sizes",     valid: "Valid today only",  rarity: "rare",   weight: 12 },
  { icon: "gift",   name: "Mystery Reward",     sub: "Surprise on next order",  valid: "Valid for 2 days",  rarity: "epic",   weight: 6 }
];

const SHARE_CARDS = [
  { title: ["SWEET", "SIGNAL", "DETECTED"], c1: "#b9a0e8", c2: "#8a66c9", c3: "#c7a6dd" },
  { title: ["BLUE LUCK", "UNLOCKED"],       c1: "#2b56ff", c2: "#1229b8", c3: "#0a1a80" },
  { title: ["TODAY’S", "BREW", "SPECIAL"],  c1: "#f3d48a", c2: "#c99a3c", c3: "#e9c46e" }
];

const $ = id => document.getElementById(id);
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
let uid = 0;

/* ---------- GLOSSY CLOVER (SVG) ---------- */
function rot([x, y], a) { const c = Math.cos(a), s = Math.sin(a); return [x * c - y * s, x * s + y * c]; }

function buildClover(svg, light = false) {
  const p = "c" + (++uid);
  const leaf = [[0, -10], [-34, -44], [-92, -92], [-74, -140], [-62, -174], [-24, -182], [0, -164], [24, -182], [62, -174], [74, -140], [92, -92], [34, -44], [0, -10]];
  const stops = light
    ? [["0", "#ffffff"], [".3", "#eef3ff"], [".7", "#c3d2ff"], ["1", "#8ea8ff"]]
    : [["0", "#e4ecff"], [".16", "#8eabff"], [".42", "#3159f2"], [".72", "#1530c8"], ["1", "#08156e"]];
  let defs = `<filter id="${p}b8" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8"/></filter>
    <filter id="${p}b5" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
    <filter id="${p}b2"><feGaussianBlur stdDeviation="1.6"/></filter>
    <radialGradient id="${p}glow"><stop offset="0" stop-color="${light ? "#ffffff" : "#5b7fff"}" stop-opacity=".55"/><stop offset="1" stop-color="#5b7fff" stop-opacity="0"/></radialGradient>`;
  let body = `<circle r="190" fill="url(#${p}glow)"/>`;

  for (let k = 0; k < 4; k++) {
    const a = (Math.PI / 4) + k * Math.PI / 2;
    const pts = leaf.map(pt => rot(pt, a));
    const d = `M${pts[0]} C${pts[1]} ${pts[2]} ${pts[3]} C${pts[4]} ${pts[5]} ${pts[6]} C${pts[7]} ${pts[8]} ${pts[9]} C${pts[10]} ${pts[11]} ${pts[12]}Z`;
    const [cx, cy] = rot([0, -112], a);
    defs += `<clipPath id="${p}k${k}"><path d="${d}"/></clipPath>
      <radialGradient id="${p}g${k}" gradientUnits="userSpaceOnUse" cx="${cx - 30}" cy="${cy - 36}" r="170">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}</radialGradient>`;
    body += `<g clip-path="url(#${p}k${k})">
      <path d="${d}" fill="url(#${p}g${k})"/>
      <path d="${d}" fill="none" stroke="${light ? "rgba(70,100,220,.35)" : "rgba(4,12,80,.65)"}" stroke-width="22" filter="url(#${p}b8)"/>
      <ellipse cx="${cx - 16}" cy="${cy - 24}" rx="30" ry="15" transform="rotate(-38 ${cx - 16} ${cy - 24})" fill="#fff" opacity="${light ? .9 : .78}" filter="url(#${p}b5)"/>
      <ellipse cx="${cx + 22}" cy="${cy + 26}" rx="22" ry="8" transform="rotate(-38 ${cx + 22} ${cy + 26})" fill="#9fb8ff" opacity=".35" filter="url(#${p}b5)"/>
      <circle cx="${cx - 26}" cy="${cy - 34}" r="5" fill="#fff" filter="url(#${p}b2)"/>
    </g>
    <path d="${d}" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.4"/>`;
  }
  body += `<circle r="13" fill="${light ? "#dfe7ff" : "#0d1d9a"}"/><circle cx="-3" cy="-4" r="4" fill="#fff" opacity=".7" filter="url(#${p}b2)"/>`;
  svg.innerHTML = `<defs>${defs}</defs>${body}`;
}

/* ---------- REWARD ICONS ---------- */
function iconSVG(type) {
  const p = "i" + (++uid);
  if (type === "gift") {
    return `<svg viewBox="0 0 120 150"><defs><linearGradient id="${p}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d82ff"/><stop offset="1" stop-color="#1229b8"/></linearGradient></defs>
      <rect x="18" y="62" width="84" height="70" rx="8" fill="url(#${p}a)"/><rect x="12" y="48" width="96" height="22" rx="6" fill="#2a4cf0"/>
      <rect x="53" y="48" width="14" height="84" fill="#e8eeff"/>
      <path d="M60 48c-8-22-38-24-34-6 3 10 24 9 34 6zM60 48c8-22 38-24 34-6-3 10-24 9-34 6z" fill="#f4f7ff" stroke="#c9d6ff" stroke-width="2"/>
      <rect x="22" y="70" width="10" height="56" rx="5" fill="#fff" opacity=".18"/></svg>`;
  }
  const milk = type === "matcha" ? ["#d6ecb8", "#8fbf5e"] : ["#f3e6d4", "#b9814f"];
  return `<svg viewBox="0 0 120 150"><defs>
      <linearGradient id="${p}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${milk[0]}"/><stop offset=".55" stop-color="${milk[0]}"/><stop offset="1" stop-color="${milk[1]}"/></linearGradient>
      <linearGradient id="${p}g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".35" stop-color="#fff" stop-opacity=".05"/><stop offset=".85" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity=".5"/></linearGradient>
      <clipPath id="${p}k"><path d="M24 34h72l-8 104a8 8 0 0 1-8 7H40a8 8 0 0 1-8-7z"/></clipPath></defs>
    <g clip-path="url(#${p}k)">
      <rect x="0" y="30" width="120" height="120" fill="url(#${p}c)"/>
      <path d="M20 92c14 6 26-6 40 0s26 8 40 0v60H20z" fill="${milk[1]}" opacity=".55"/>
      <rect x="34" y="40" width="22" height="20" rx="5" fill="#fff" opacity=".55" transform="rotate(-12 45 50)"/>
      <rect x="60" y="46" width="22" height="20" rx="5" fill="#fff" opacity=".5" transform="rotate(14 71 56)"/>
      <rect x="44" y="64" width="20" height="18" rx="5" fill="#fff" opacity=".4" transform="rotate(6 54 73)"/>
      <rect x="0" y="30" width="120" height="120" fill="url(#${p}g)"/>
    </g>
    <path d="M24 34h72l-8 104a8 8 0 0 1-8 7H40a8 8 0 0 1-8-7z" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2"/>
    <ellipse cx="60" cy="34" rx="38" ry="7" fill="#fff" opacity=".85"/>
    <path d="M28 30c4-14 60-14 64 0" fill="#fff" opacity=".9"/>
    <circle cx="60" cy="104" r="11" fill="#1d40e6" opacity=".9"/><path d="M55 100c2 5 8 5 10 0" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`;
}

/* ---------- SOUND ---------- */
let audioCtx = null;
function tone(freq, dur, type = "sine", peak = .12) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(peak, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(.0001, audioCtx.currentTime + dur);
    o.connect(g).connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + dur);
  } catch (e) {}
}
const chime = r => (r === "epic" ? [660, 880, 1320] : r === "rare" ? [560, 840] : [520, 720]).forEach((f, i) => setTimeout(() => tone(f, .4, "triangle", .1), i * 90));

/* ---------- FX CANVAS ---------- */
const cv = $("fx"), ctx = cv.getContext("2d");
let W = 0, H = 0, DPR = 1, mode = "ripple", t = 0, extraRings = [];
function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  cv.width = W * DPR; cv.height = H * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  if (mode === "vortex") { ctx.fillStyle = "#f3f6ff"; ctx.fillRect(0, 0, W, H); }
}
addEventListener("resize", resize); resize();

function cloverAnchor() {
  const r = $("clover").getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height * .86, s: r.width };
}

/* 01 — water ripples under the clover */
function drawRipple() {
  ctx.clearRect(0, 0, W, H);
  const { x, y, s } = cloverAnchor();
  const maxR = Math.max(W, H) * .75;
  const glow = ctx.createRadialGradient(x, y, 0, x, y, s * .9);
  glow.addColorStop(0, "rgba(120,150,255,.22)"); glow.addColorStop(1, "rgba(120,150,255,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.ellipse(x, y, s * .9, s * .32, 0, 0, Math.PI * 2); ctx.fill();

  const ring = (rx, a, w = 1.4) => {
    const ry = rx * .26;
    ctx.lineWidth = w;
    ctx.strokeStyle = `rgba(255,255,255,${a})`;
    ctx.beginPath(); ctx.ellipse(x, y - 1, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = `rgba(70,100,210,${a * .45})`;
    ctx.beginPath(); ctx.ellipse(x, y + 1.6, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
  };
  const n = 9;
  for (let i = 0; i < n; i++) {
    const ph = ((t * .0016) + i / n) % 1;
    const rx = 40 + ph * maxR;
    ring(rx, Math.pow(1 - ph, 1.6) * .9);
  }
  extraRings = extraRings.filter(r => (r.p += .012) < 1);
  extraRings.forEach(r => r.p > 0 && ring(30 + r.p * maxR * .8, (1 - r.p) * 1.2, 2.2));
}

/* 02 — liquid vortex */
let parts = [], drops = [], hold = 0, holding = false, ringScale = .55;
function gauss() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
function initVortex() {
  parts = Array.from({ length: W < 700 ? 900 : 1500 }, () => ({
    a: Math.random() * Math.PI * 2,
    r: 1 + gauss() * .09,
    sp: .006 + Math.random() * .006,
    w: 1.2 + Math.random() * 4,
    hi: Math.random() < .14,
    ph: Math.random() * 6.28,
    px: null, py: null
  }));
  drops = []; ringScale = .55;
  ctx.fillStyle = "#f3f6ff"; ctx.fillRect(0, 0, W, H);
}
function drawVortex() {
  hold += ((holding ? 1 : 0) - hold) * .06;
  ringScale += (1 - ringScale) * .02;
  ctx.fillStyle = "rgba(243,246,255,.16)"; ctx.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2 + (W < 700 ? 40 : 10);
  const R = Math.min(W * (W < 700 ? .46 : .4), H * .78, 640) * ringScale, k = W < 700 ? .72 : .42;
  /* soft liquid body under the strokes */
  ctx.save(); ctx.translate(cx, cy); ctx.scale(1, k);
  const band = ctx.createRadialGradient(0, 0, R * .78, 0, 0, R * 1.2);
  band.addColorStop(0, "rgba(60,100,240,0)"); band.addColorStop(.45, "rgba(40,80,235,.05)"); band.addColorStop(1, "rgba(60,100,240,0)");
  ctx.fillStyle = band; ctx.beginPath(); ctx.arc(0, 0, R * 1.2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  const boost = 1 + hold * 1.8;
  ctx.lineCap = "round";
  for (const p of parts) {
    p.a += p.sp * boost / p.r;
    const wob = Math.sin(p.a * 3 + t * .03 + p.ph) * .035 + Math.sin(p.a * 7 - t * .02) * .015;
    const rr = R * (p.r + wob);
    const x = cx + Math.cos(p.a) * rr, y = cy + Math.sin(p.a) * rr * k + Math.sin(p.a * 2 + p.ph) * 6;
    if (p.px !== null) {
      const front = Math.sin(p.a) > 0;
      const d = Math.abs(p.r - 1) * 8;
      ctx.strokeStyle = p.hi ? `rgba(255,255,255,${.75 - d * .2})`
        : front ? `rgba(${18 + d * 40},${40 + d * 60},${200 + d * 20},${.5 - d * .12})`
                : `rgba(${70 + d * 50},${110 + d * 50},${235},${.32 - d * .08})`;
      ctx.lineWidth = p.w * (front ? 1.15 : .8);
      ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(x, y); ctx.stroke();
    }
    p.px = x; p.py = y;
    if (Math.random() < .0009 * boost) {
      const out = .6 + Math.random();
      drops.push({ x, y, vx: -Math.sin(p.a) * out * 3 + Math.cos(p.a) * out * 2, vy: -1.5 - Math.random() * 3, r: 1.5 + Math.random() * 3.5, life: 1 });
    }
  }
  drops = drops.filter(d => (d.life -= .012) > 0);
  for (const d of drops) {
    d.x += d.vx; d.y += d.vy; d.vy += .12;
    ctx.fillStyle = `rgba(40,80,230,${d.life * .7})`;
    ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(255,255,255,${d.life * .9})`;
    ctx.beginPath(); ctx.arc(d.x - d.r * .35, d.y - d.r * .35, d.r * .35, 0, Math.PI * 2); ctx.fill();
  }
}

/* 03–05 — soft light motes */
let motes = [];
function initMotes() {
  motes = Array.from({ length: 34 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: 2 + Math.random() * 10, vy: -.15 - Math.random() * .3, a: .08 + Math.random() * .25, ph: Math.random() * 6.28 }));
}
function drawMotes() {
  ctx.clearRect(0, 0, W, H);
  for (const m of motes) {
    m.y += m.vy; m.x += Math.sin(t * .01 + m.ph) * .2;
    if (m.y < -20) { m.y = H + 20; m.x = Math.random() * W; }
    const g = ctx.createRadialGradient(m.x - m.r * .3, m.y - m.r * .3, 0, m.x, m.y, m.r);
    g.addColorStop(0, `rgba(255,255,255,${m.a * 2.4})`); g.addColorStop(.6, `rgba(150,180,255,${m.a})`); g.addColorStop(1, "rgba(150,180,255,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fill();
  }
}

function loop() {
  t++;
  if (mode === "ripple") drawRipple();
  else if (mode === "vortex") drawVortex();
  else drawMotes();
  requestAnimationFrame(loop);
}

/* ---------- SCENES ---------- */
const TAGS = { s1: ["01", "ENTRY"], s2: ["02", "BREWING"], s3: ["03", "REVEAL"], s4: ["04", "CLAIM"], s5: ["05", "SHARE"] };
function go(id) {
  document.querySelectorAll(".scr").forEach(s => s.classList.toggle("active", s.id === id));
  document.body.dataset.scene = id;
  const [n, l] = TAGS[id];
  $("sceneTag").innerHTML = `<b>${n}</b><span>${l}</span>`;
  const idx = Object.keys(TAGS).indexOf(id);
  document.querySelectorAll("#steps i").forEach((d, i) => d.classList.toggle("on", i === idx));
  const m = id === "s1" ? "ripple" : id === "s2" ? "vortex" : "motes";
  if (m !== mode) { mode = m; if (m === "vortex") initVortex(); if (m === "motes") initMotes(); if (m === "ripple") ctx.clearRect(0, 0, W, H); }
}

let current = REWARDS[0], brewTimer = null, brewing = false;
function pick() {
  const total = REWARDS.reduce((s, r) => s + r.weight, 0);
  let roll = Math.random() * total;
  for (const r of REWARDS) { if (roll < r.weight) return r; roll -= r.weight; }
  return REWARDS[0];
}

function brew() {
  if (brewing) return;
  brewing = true;
  tone(520, .12, "sine", .12);
  extraRings.push({ p: 0 }, { p: -.15 });
  $("cloverBtn").classList.add("pop");
  setTimeout(() => { go("s2"); $("cloverBtn").classList.remove("pop"); runBrew(); }, reduced ? 0 : 520);
}

function runBrew() {
  let prog = 0, last = performance.now();
  cancelAnimationFrame(brewTimer);
  const step = now => {
    const dt = now - last; last = now;
    prog += dt / 3400 * (1 + hold * 1.4);
    if (prog >= 1) { brewing = false; holding = false; reveal(); return; }
    brewTimer = requestAnimationFrame(step);
  };
  brewTimer = requestAnimationFrame(step);
}

function reveal() {
  current = pick();
  const r = current;
  $("gIcon").innerHTML = iconSVG(r.icon);
  $("gName").textContent = r.name; $("gSub").textContent = r.sub; $("gValid").textContent = r.valid;
  const ra = $("gRarity"); ra.textContent = r.rarity.toUpperCase(); ra.className = `g-rarity g-rarity--${r.rarity}`;
  $("psIcon").innerHTML = iconSVG(r.icon);
  $("psName").textContent = r.name; $("psSub").textContent = r.sub; $("psValid").textContent = r.valid;
  $("useNow").classList.remove("done"); $("useNow").textContent = "Use Now";

  const card = $("gCard");
  card.classList.remove("shown", "flipping", "epic"); card.style.transform = "";
  void card.offsetWidth;
  card.classList.add("flipping");
  card.classList.toggle("epic", r.rarity === "epic");
  sparks();
  $("confettiEl").innerHTML = "";
  go("s3");
  setTimeout(() => { chime(r.rarity); if (r.rarity !== "common") confetti(r.rarity === "epic" ? 40 : 18); }, 650);
}
$("gCard").addEventListener("animationend", e => {
  if (e.animationName !== "flipIn") return;
  const c = $("gCard"); c.classList.remove("flipping"); c.classList.add("shown");
});

function sparks() {
  const el = $("sparksEl"); el.innerHTML = "";
  for (let i = 0; i < 16; i++) {
    const s = document.createElement("span");
    s.className = "spk" + (i % 3 === 0 ? " star" : "");
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;--dur:${1.6 + Math.random() * 1.6}s;--del:${Math.random() * 2}s`;
    el.appendChild(s);
  }
}
function confetti(n) {
  const el = $("confettiEl"); el.innerHTML = "";
  const cols = ["#1d40e6", "#7c9bff", "#ffffff", "#ffd36e", "#c77cff", "#7cffd8"];
  for (let i = 0; i < n; i++) {
    const c = document.createElement("span"), a = Math.random() * Math.PI * 2, d = 120 + Math.random() * 220, s = 5 + Math.random() * 6;
    c.className = "cf";
    c.style.cssText = `width:${s}px;height:${s * (Math.random() > .5 ? 1 : .45)}px;border-radius:${Math.random() > .5 ? "50%" : "2px"};background:${cols[i % cols.length]};
      --dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d * .7 + 50}px;--rot:${200 + Math.random() * 500}deg;--dur:${1.1 + Math.random() * .7}s;--del:${Math.random() * .15}s`;
    el.appendChild(c);
  }
}

/* card tilt after the flip */
$("cardScene").addEventListener("pointermove", e => {
  const c = $("gCard"); if (!c.classList.contains("shown")) return;
  const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
  c.style.transform = `rotateX(${14 - py * 18}deg) rotateY(${-16 + px * 26}deg) rotateZ(4deg)`;
});
$("cardScene").addEventListener("pointerleave", () => { $("gCard").style.transform = ""; });

/* phone tilt */
$("s4").addEventListener("pointermove", e => {
  const px = e.clientX / W - .5, py = e.clientY / H - .5;
  $("phone").style.transform = `rotateY(${-18 + px * 14}deg) rotateX(${6 - py * 8}deg) rotateZ(4deg)`;
});
$("useNow").addEventListener("click", () => { const b = $("useNow"); b.classList.add("done"); b.textContent = "Added to your next order ✓"; tone(880, .25, "triangle", .08); });

/* ---------- SHARE FAN ---------- */
let sel = 1;
function layoutFan() {
  document.querySelectorAll(".fc").forEach(c => {
    const i = +c.dataset.i, d = (i - sel + 3) % 3;
    c.dataset.pos = d === 0 ? "c" : d === 1 ? "r" : "l";
  });
}
document.querySelectorAll(".fc").forEach(c => c.addEventListener("click", () => { sel = +c.dataset.i; layoutFan(); tone(620, .1, "sine", .08); }));
layoutFan();

function roundRect(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
function renderShare() {
  const sc = SHARE_CARDS[sel], cvs = document.createElement("canvas");
  cvs.width = 1080; cvs.height = 1350;
  const c = cvs.getContext("2d");
  const bg = c.createLinearGradient(0, 0, 1080, 1350); bg.addColorStop(0, "#f6f8ff"); bg.addColorStop(1, "#dfe7ff");
  c.fillStyle = bg; c.fillRect(0, 0, 1080, 1350);
  c.save(); c.shadowColor = "rgba(10,20,90,.35)"; c.shadowBlur = 80; c.shadowOffsetY = 40;
  roundRect(c, 150, 170, 780, 975, 54);
  const g = c.createLinearGradient(150, 170, 930, 1145); g.addColorStop(0, sc.c1); g.addColorStop(.5, sc.c2); g.addColorStop(1, sc.c3);
  c.fillStyle = g; c.fill(); c.restore();
  c.save(); roundRect(c, 150, 170, 780, 975, 54); c.clip();
  for (let i = 0; i < 9; i++) { const cg = c.createRadialGradient(200 + Math.random() * 700, 220 + Math.random() * 880, 0, 540, 650, 260); cg.addColorStop(0, "rgba(255,255,255,.18)"); cg.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = cg; c.fillRect(150, 170, 780, 975); }
  c.restore();
  c.fillStyle = "#fff"; c.textAlign = "center";
  c.font = "600 74px Inter, sans-serif";
  sc.title.forEach((l, i) => c.fillText(l, 540, 340 + i * 86));
  c.font = "500 24px Inter, sans-serif"; c.globalAlpha = .85;
  c.fillText("SOMETHING SWEET WAS WAITING.", 540, 340 + sc.title.length * 86 + 20);
  c.globalAlpha = 1;
  roundRect(c, 260, 720, 560, 200, 30); c.fillStyle = "rgba(255,255,255,.16)"; c.fill();
  c.font = "700 46px Inter, sans-serif"; c.fillText(current.name, 540, 805);
  c.font = "400 28px Inter, sans-serif"; c.globalAlpha = .85; c.fillText(`${current.sub} · ${current.valid}`, 540, 862); c.globalAlpha = 1;
  c.font = "700 30px Inter, sans-serif"; c.fillText("luckin coffee  ·  #BrewYourLuck", 540, 1080);
  return cvs;
}
let toastT;
function toast(m) { const el = $("toast"); el.textContent = m; el.classList.add("is-visible"); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("is-visible"), 2200); }
const shareText = () => `I just unlocked ${current.name} on Luckin Coffee! #BrewYourLuck`;
function download() {
  renderShare().toBlob(b => { if (!b) return; const u = URL.createObjectURL(b), a = document.createElement("a"); a.href = u; a.download = "luckin-my-luck.png"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 2000); toast("Saved to your device"); });
}
$("socDownload").addEventListener("click", download);
$("socShare").addEventListener("click", () => renderShare().toBlob(async b => {
  const f = b && new File([b], "luckin-my-luck.png", { type: "image/png" });
  if (f && navigator.canShare && navigator.canShare({ files: [f] })) { try { await navigator.share({ files: [f], title: "Luckin Coffee", text: shareText() }); } catch (e) {} return; }
  download();
}));
$("socX").addEventListener("click", () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText())}&url=${encodeURIComponent(location.href)}`, "_blank", "noopener"));
$("socMore").addEventListener("click", async () => {
  const txt = `${shareText()} ${location.href}`;
  if (navigator.share) { try { await navigator.share({ title: "Luckin Coffee", text: txt }); } catch (e) {} return; }
  try { await navigator.clipboard.writeText(txt); toast("Copied to clipboard"); } catch (e) { toast("Copy failed"); }
});

/* ---------- WIRING ---------- */
$("tapBtn").addEventListener("click", brew);
$("cloverBtn").addEventListener("click", brew);
$("claimBtn").addEventListener("click", () => go("s4"));
$("tryAgainBtn").addEventListener("click", () => { go("s2"); brewing = true; runBrew(); });
$("toShareBtn").addEventListener("click", () => go("s5"));
$("againBtn").addEventListener("click", () => go("s1"));
$("storeA").addEventListener("click", e => { e.preventDefault(); toast("Opening the App Store…"); });
$("storeG").addEventListener("click", e => { e.preventDefault(); toast("Opening Google Play…"); });

/* hold to stir faster */
const s2 = $("s2");
s2.addEventListener("pointerdown", () => { holding = true; s2.classList.add("holding"); });
["pointerup", "pointerleave", "pointercancel"].forEach(ev => s2.addEventListener(ev, () => { holding = false; s2.classList.remove("holding"); }));

/* scroll / swipe down on the entry scene starts brewing */
let touchY = null;
$("s1").addEventListener("wheel", e => { if (e.deltaY > 30) brew(); }, { passive: true });
$("s1").addEventListener("touchstart", e => { touchY = e.touches[0].clientY; }, { passive: true });
$("s1").addEventListener("touchend", e => { if (touchY !== null && touchY - e.changedTouches[0].clientY > 50) brew(); touchY = null; });
addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && document.body.dataset.scene === "s1") { e.preventDefault(); brew(); } });

buildClover($("clover"));
buildClover($("cardClover"), true);
loop();
