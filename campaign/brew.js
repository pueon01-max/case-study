const REWARDS = [
  { icon: "cup", name: "Free Upgrade", sub: "Any drink, any size", valid: "Valid for 7 days", rarity: "common", weight: 30 },
  { icon: "cup", name: "Buy 1 Get 1", sub: "Any latte or cappuccino", valid: "Valid for 3 days", rarity: "common", weight: 30 },
  { icon: "cup", name: "Free Add-On", sub: "Extra shot or syrup", valid: "Valid for 14 days", rarity: "common", weight: 20 },
  { icon: "cup", name: "Free Matcha Latte", sub: "Regular · hot or iced", valid: "Valid for 5 days", rarity: "rare", weight: 16 },
  { icon: "cup", name: "50% Off Any Drink", sub: "One use · all sizes", valid: "Valid today only", rarity: "rare", weight: 12 },
  { icon: "gift", name: "Mystery Reward", sub: "Surprise on next order", valid: "Valid for 2 days", rarity: "epic", weight: 6 }
];

const ICON_SVG = {
  cup: `<svg viewBox="0 0 48 48" width="60%" height="60%">
    <defs>
      <linearGradient id="cupBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4f7bff"/>
        <stop offset="100%" stop-color="#0e1ea8"/>
      </linearGradient>
    </defs>
    <path d="M13 15h22l-2.6 24.5a3 3 0 0 1-3 2.5H18.6a3 3 0 0 1-3-2.5L13 15z" fill="url(#cupBody)"/>
    <path d="M15.5 22h17" stroke="rgba(255,255,255,.4)" stroke-width="1.4" stroke-linecap="round"/>
    <ellipse cx="24" cy="15" rx="12" ry="3.2" fill="#dce8ff"/>
    <path d="M15 13.4C15 11.5 19 10 24 10s9 1.5 9 3.4-4 3.4-9 3.4-9-1.5-9-3.4z" fill="#f2f6ff"/>
    <path d="M27 10.6 30.5 4.5" stroke="#0e1ea8" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="19.5" cy="19" rx="2.4" ry="4.5" fill="rgba(255,255,255,.3)"/>
  </svg>`,
  gift: `<svg viewBox="0 0 48 48" width="60%" height="60%">
    <defs>
      <linearGradient id="giftBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4f7bff"/>
        <stop offset="100%" stop-color="#0e1ea8"/>
      </linearGradient>
    </defs>
    <rect x="9" y="20" width="30" height="20" rx="2" fill="url(#giftBody)"/>
    <rect x="9" y="20" width="30" height="7" fill="#0a1590"/>
    <rect x="21" y="14" width="6" height="26" fill="#dce8ff"/>
    <path d="M24 14c-3-6-13-6-11 0 1.4 3 8 3 11 0z" fill="#f2f6ff"/>
    <path d="M24 14c3-6 13-6 11 0-1.4 3-8 3-11 0z" fill="#dce8ff"/>
  </svg>`
};

function pickReward() {
  const total = REWARDS.reduce((sum, reward) => sum + reward.weight, 0);
  let roll = Math.random() * total;

  for (const reward of REWARDS) {
    if (roll < reward.weight) return reward;
    roll -= reward.weight;
  }

  return REWARDS[REWARDS.length - 1];
}

/* SOUND (no external assets, generated via Web Audio) */
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (AudioCtor) audioCtx = new AudioCtor();
  }
  return audioCtx;
}

function playTone(freq, duration, type = "sine", peak = 0.16) {
  const ctx = getAudioCtx();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(peak, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function playTapSound() {
  playTone(520, 0.12, "sine", 0.14);
}

function playRevealChime(rarity) {
  const notes =
    rarity === "epic" ? [660, 880, 1320] :
    rarity === "rare" ? [560, 840] :
    [520, 720];

  notes.forEach((freq, index) => {
    setTimeout(() => playTone(freq, 0.35, "triangle", 0.12), index * 90);
  });
}

/* TOAST */
let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

let brewRaf = null;
let revealRaf = null;
let revealTimer = null;
let progressRaf = null;
let currentReward = REWARDS[0];

const tapBtn = document.getElementById("tapBtn");
const claimBtn = document.getElementById("claimBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");

tapBtn.addEventListener("click", brew);
tapBtn.addEventListener("touchend", event => {
  event.preventDefault();
  brew();
});

claimBtn.addEventListener("click", goShare);
tryAgainBtn.addEventListener("click", tryAgain);

/* MAGNETIC BUTTONS */
function initMagnetic(elements, strength = 0.3) {
  elements.forEach(el => {
    if (!el) return;

    el.addEventListener("mousemove", e => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      el.style.translate = `${relX * strength}px ${relY * strength}px`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.translate = "";
    });
  });
}

initMagnetic(document.querySelectorAll(".brew-btn, .btn-main, .soc-ic"));

/* REVEAL CARD 3D TILT (kicks in once the pop-in animation hands control back) */
const cardScene = document.querySelector(".card-scene");
const gCardEl = document.getElementById("gCard");
let cardTiltReady = false;

if (gCardEl) {
  gCardEl.addEventListener("animationend", event => {
    if (event.target !== gCardEl) return;
    gCardEl.style.animation = "none";
    cardTiltReady = true;
  });
}

if (cardScene && gCardEl) {
  cardScene.addEventListener("pointermove", e => {
    if (!cardTiltReady) return;

    const rect = gCardEl.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    gCardEl.style.transform = `rotateX(${py * -14}deg) rotateY(${px * 14}deg) scale(1.02)`;
  });

  cardScene.addEventListener("pointerleave", () => {
    if (!cardTiltReady) return;
    gCardEl.style.transform = "";
  });
}

function go(id) {
  document.querySelectorAll(".scr").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  const dark = id === "s2";
  const color = dark ? "rgba(255,255,255,.9)" : "#0b1680";

  document.getElementById("nd1").setAttribute("fill", color);
  document.getElementById("nd2").setAttribute("fill", color);
  document.getElementById("navTxt").style.color = color;
  document.getElementById("navLang").style.color = dark ? "rgba(255,255,255,.5)" : "#7080b8";
  document.getElementById("navRing").style.borderColor = color;
}

function brew() {
  clearTimeout(revealTimer);
  cancelAnimationFrame(brewRaf);
  cancelAnimationFrame(revealRaf);
  cancelAnimationFrame(progressRaf);

  playTapSound();

  go("s2");
  runBrewCanvas();
  runBrewProgress();

  revealTimer = setTimeout(reveal, 3000);
}

function runBrewProgress() {
  const fill = document.getElementById("brewProgressFill");
  const pct = document.getElementById("brewProgressPct");
  const start = performance.now();

  if (fill) fill.style.width = "0%";
  if (pct) pct.textContent = "0%";

  function step(now) {
    const ratio = Math.min(1, (now - start) / 3000);

    if (fill) fill.style.width = `${ratio * 100}%`;
    if (pct) pct.textContent = `${Math.round(ratio * 100)}%`;

    if (ratio < 1) {
      progressRaf = requestAnimationFrame(step);
    }
  }

  progressRaf = requestAnimationFrame(step);
}

function runBrewCanvas() {
  const canvas = document.getElementById("brewCvs");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2 + 35;
  let t = 0;

  const rings = [
    { rx: 60, ry: 24, spd: .016, br: .75, seed: 1.3 },
    { rx: 115, ry: 46, spd: .016, br: .62, seed: 2.7 },
    { rx: 178, ry: 71, spd: .016, br: .48, seed: 0.6 },
    { rx: 250, ry: 100, spd: .016, br: .35, seed: 3.4 },
    { rx: 332, ry: 133, spd: .016, br: .24, seed: 1.9 },
    { rx: 424, ry: 170, spd: .016, br: .15, seed: 4.1 },
    { rx: 526, ry: 210, spd: .016, br: .09, seed: 2.2 }
  ];

  const bubbles = [];
  for (let i = 0; i < 26; i++) {
    bubbles.push({
      angle: Math.random() * Math.PI * 2,
      dist: 20 + Math.random() * 220,
      speed: .012 + Math.random() * .02,
      size: 1 + Math.random() * 2.4,
      drift: Math.random() * Math.PI * 2,
      life: Math.random()
    });
  }

  function wobbleEllipse(rx, ry, wobbleT, seed) {
    const segments = 48;
    ctx.beginPath();

    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      const wobble = 1 + Math.sin(a * 3 + wobbleT * 1.4 + seed) * 0.035
        + Math.sin(a * 5 - wobbleT * 0.9 + seed * 2) * 0.02;

      const x = Math.cos(a) * rx * wobble;
      const y = Math.sin(a) * ry * wobble;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.closePath();
  }

  function frame() {
    ctx.fillStyle = "rgb(12,28,176)";
    ctx.fillRect(0, 0, W, H);

    const pool = ctx.createRadialGradient(cx, cy, 0, cx, cy, 155);
    pool.addColorStop(0, "rgba(55,95,255,.26)");
    pool.addColorStop(.5, "rgba(38,68,210,.1)");
    pool.addColorStop(1, "rgba(12,28,176,0)");
    ctx.fillStyle = pool;
    ctx.fillRect(0, 0, W, H);

    rings.forEach((ring, index) => {
      const phase = ((t * ring.spd - index * .52) % 4 + 4) % 4;
      const scale = .28 + phase * .185;
      let alpha = ring.br * (1 - phase / 4) * Math.sin(phase / 4 * Math.PI) * 1.9;
      alpha = Math.max(0, Math.min(1, alpha));

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      const gradient = ctx.createLinearGradient(0, -ring.ry, 0, ring.ry);
      gradient.addColorStop(0, `rgba(160,210,255,${alpha})`);
      gradient.addColorStop(.35, `rgba(110,170,255,${alpha * .7})`);
      gradient.addColorStop(.5, `rgba(80,140,235,${alpha * .5})`);
      gradient.addColorStop(.65, `rgba(110,170,255,${alpha * .7})`);
      gradient.addColorStop(1, `rgba(160,210,255,${alpha})`);

      wobbleEllipse(ring.rx, ring.ry, t * .05, ring.seed);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.4 / scale;
      ctx.shadowColor = `rgba(160,210,255,${alpha * .8})`;
      ctx.shadowBlur = 6 / scale;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();
    });

    bubbles.forEach(bubble => {
      bubble.life += bubble.speed * .012;
      if (bubble.life > 1) {
        bubble.life = 0;
        bubble.angle = Math.random() * Math.PI * 2;
        bubble.dist = 15 + Math.random() * 30;
      }

      const swirl = bubble.angle + t * .02 + bubble.life * 2.4;
      const radius = bubble.dist + bubble.life * 240;
      const wob = Math.sin(t * .04 + bubble.drift) * 6;

      const bx = cx + Math.cos(swirl) * radius * 2.5 + wob;
      const by = cy + Math.sin(swirl) * radius * .58;

      const bubbleAlpha = Math.sin(bubble.life * Math.PI) * .55;

      if (bubbleAlpha > 0.02) {
        ctx.beginPath();
        ctx.arc(bx, by, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225,240,255,${bubbleAlpha})`;
        ctx.fill();
      }
    });

    const fast = ((t * .026) % 4 + 4) % 4;
    const fScale = .28 + fast * .185;
    let fAlpha = .95 * (1 - fast / 4) * Math.sin(fast / 4 * Math.PI) * 1.9;
    fAlpha = Math.max(0, Math.min(1, fAlpha));

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(fScale, fScale);
    wobbleEllipse(54, 21, t * .06, 5.5);
    ctx.strokeStyle = `rgba(220,240,255,${fAlpha})`;
    ctx.shadowColor = `rgba(220,240,255,${fAlpha * .8})`;
    ctx.shadowBlur = 8 / fScale;
    ctx.lineWidth = 3 / fScale;
    ctx.stroke();
    ctx.restore();

    for (let j = 0; j < 24; j++) {
      const angle = (j / 24) * Math.PI * 2 + t * .025;
      const d1 = 44 + Math.sin(t * .18 + j * 1.1) * 14;
      const d2 = 108 + Math.sin(t * .14 + j * .9) * 24;
      const x1 = cx + Math.cos(angle) * d1 * 2.55;
      const y1 = cy + Math.sin(angle) * d1 * .58;
      const x2 = cx + Math.cos(angle) * d2 * 2.55;
      const y2 = cy + Math.sin(angle) * d2 * .58;
      const lineAlpha = .042 + Math.abs(Math.sin(t * .28 + j * .85)) * .06;

      const lineGradient = ctx.createLinearGradient(x1, y1, x2, y2);
      lineGradient.addColorStop(0, "rgba(140,195,255,0)");
      lineGradient.addColorStop(.45, `rgba(160,210,255,${lineAlpha})`);
      lineGradient.addColorStop(1, "rgba(140,195,255,0)");

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }

    t += .9;
    brewRaf = requestAnimationFrame(frame);
  }

  frame();
}

function reveal() {
  cancelAnimationFrame(brewRaf);
  cancelAnimationFrame(progressRaf);

  const reward = pickReward();
  currentReward = reward;

  document.getElementById("gIcon").innerHTML = ICON_SVG[reward.icon] || "";
  document.getElementById("gName").textContent = reward.name;
  document.getElementById("gSub").textContent = reward.sub;
  document.getElementById("gValid").textContent = reward.valid;

  const rarityEl = document.getElementById("gRarity");
  rarityEl.textContent = reward.rarity.toUpperCase();
  rarityEl.className = `g-rarity g-rarity--${reward.rarity}`;

  createSparks();

  const card = document.getElementById("gCard");
  card.classList.toggle("rarity-epic", reward.rarity === "epic");
  cardTiltReady = false;
  card.style.transform = "";
  card.style.animation = "none";
  void card.offsetWidth;
  card.style.animation = "";

  if (reward.rarity === "epic") {
    createConfetti();
  } else {
    const confettiEl = document.getElementById("confettiEl");
    if (confettiEl) confettiEl.innerHTML = "";
  }

  go("s3");
  runRevealCanvas();
  playRevealChime(reward.rarity);
}

function createConfetti() {
  const confettiEl = document.getElementById("confettiEl");
  if (!confettiEl) return;

  confettiEl.innerHTML = "";

  const colors = ["#7c3aed", "#f59e0b", "#2558ff", "#22d3aa", "#ff5fa8", "#ffffff"];

  for (let i = 0; i < 30; i++) {
    const el = document.createElement("div");
    el.className = "cf-piece";

    const angle = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 160;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist * 0.7 + 60;
    const rot = 180 + Math.random() * 540;
    const size = 5 + Math.random() * 5;
    const isCircle = Math.random() > 0.5;

    el.style.cssText = `
      width:${size}px;
      height:${size * (isCircle ? 1 : 0.5)}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${isCircle ? "50%" : "1px"};
      --dx:${dx}px;
      --dy:${dy}px;
      --rot:${rot}deg;
      --dur:${1 + Math.random() * 0.6}s;
      --del:${Math.random() * 0.15}s;
    `;

    confettiEl.appendChild(el);
  }
}

function createSparks() {
  const sparksEl = document.getElementById("sparksEl");
  sparksEl.innerHTML = "";

  const sparks = [
    { t: "9%", l: "3%", dx: "-16px", dy: "-22px", w: 7, dur: "2.1s", del: "0s", col: "255,255,255" },
    { t: "6%", l: "84%", dx: "14px", dy: "-18px", w: 5, dur: "2.4s", del: ".28s", col: "200,220,255" },
    { t: "78%", l: "5%", dx: "-12px", dy: "18px", w: 6, dur: "2s", del: ".62s", col: "255,255,255" },
    { t: "74%", l: "88%", dx: "16px", dy: "14px", w: 4, dur: "2.3s", del: "1s", col: "200,220,255" },
    { t: "42%", l: "95%", dx: "18px", dy: "-8px", w: 5, dur: "2.1s", del: ".46s", col: "255,255,255" },
    { t: "22%", l: "1%", dx: "-14px", dy: "-10px", w: 4, dur: "1.9s", del: ".9s", col: "200,220,255" },
    { t: "92%", l: "50%", dx: "0px", dy: "20px", w: 5, dur: "2.2s", del: "1.25s", col: "255,255,255" },
    { t: "12%", l: "54%", dx: "6px", dy: "-22px", w: 6, dur: "1.8s", del: ".18s", col: "200,220,255" },
    { t: "56%", l: "52%", dx: "-9px", dy: "-16px", w: 3, dur: "2.5s", del: ".7s", col: "255,255,255" }
  ];

  sparks.forEach(spark => {
    const el = document.createElement("div");
    el.className = "spk";
    el.style.cssText = `
      top:${spark.t};
      left:${spark.l};
      width:${spark.w}px;
      height:${spark.w}px;
      background:rgba(${spark.col},.92);
      --dx:${spark.dx};
      --dy:${spark.dy};
      --dur:${spark.dur};
      --del:${spark.del};
      animation-duration:${spark.dur};
      animation-delay:${spark.del};
    `;
    sparksEl.appendChild(el);
  });
}

function runRevealCanvas() {
  const canvas = document.getElementById("revealCvs");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H * .62;
  let t = 0;

  const motes = [];
  for (let i = 0; i < 45; i++) {
    motes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + .4,
      vx: (Math.random() - .5) * .22,
      vy: -Math.random() * .3 - .05,
      a: Math.random() * .3 + .06,
      life: Math.random()
    });
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < 6; i++) {
      const phase = ((t * .01 - i * .52) % 4 + 4) % 4;
      const scale = .32 + phase * .17;
      let alpha = .38 * (1 - phase / 4) * Math.sin(phase / 4 * Math.PI) * 1.9;
      alpha = Math.max(0, Math.min(.5, alpha));

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.beginPath();
      ctx.ellipse(0, 0, 90 + i * 24, 36 + i * 10, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(37,80,216,${alpha})`;
      ctx.lineWidth = 1.6 / scale;
      ctx.stroke();
      ctx.restore();
    }

    motes.forEach(mote => {
      mote.life += .0028;

      if (mote.life > 1) {
        mote.life = 0;
        mote.x = Math.random() * W;
        mote.y = H + 4;
      }

      mote.x += mote.vx;
      mote.y += mote.vy;

      const fade = Math.sin(mote.life * Math.PI) * mote.a;

      ctx.beginPath();
      ctx.arc(mote.x, mote.y, mote.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(80,130,230,${Math.max(0, fade)})`;
      ctx.fill();
    });

    t++;
    revealRaf = requestAnimationFrame(frame);
  }

  frame();
}

function tryAgain() {
  cancelAnimationFrame(revealRaf);
  brew();
}

function goShare() {
  cancelAnimationFrame(revealRaf);
  go("s4");
}

window.addEventListener("resize", () => {
  ["brewCvs", "revealCvs"].forEach(id => {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});

document.addEventListener("touchmove", event => {
  event.preventDefault();
}, { passive: false });

/* SHARE CARD RENDER (canvas, no external assets) */
function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function rarityBadgeColor(rarity) {
  if (rarity === "epic") return "#7c3aed";
  if (rarity === "rare") return "#2550d8";
  return "#7080b8";
}

function drawRewardIcon(ctx, type, cx, cy, size) {
  ctx.save();
  ctx.translate(cx - size / 2, cy - size / 2);

  const s = size / 48;
  const grad = ctx.createLinearGradient(0, 0, 0, 48 * s);
  grad.addColorStop(0, "#4f7bff");
  grad.addColorStop(1, "#0e1ea8");

  if (type === "gift") {
    ctx.fillStyle = grad;
    roundRectPath(ctx, 9 * s, 20 * s, 30 * s, 20 * s, 2 * s);
    ctx.fill();

    ctx.fillStyle = "#0a1590";
    ctx.fillRect(9 * s, 20 * s, 30 * s, 7 * s);

    ctx.fillStyle = "#dce8ff";
    ctx.fillRect(21 * s, 14 * s, 6 * s, 26 * s);

    ctx.beginPath();
    ctx.ellipse(18 * s, 14 * s, 5 * s, 4 * s, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#f2f6ff";
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(30 * s, 14 * s, 5 * s, 4 * s, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#dce8ff";
    ctx.fill();
  } else {
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(13 * s, 15 * s);
    ctx.lineTo(35 * s, 15 * s);
    ctx.lineTo(32.4 * s, 39.5 * s);
    ctx.quadraticCurveTo(32.4 * s, 42 * s, 29.9 * s, 42 * s);
    ctx.lineTo(18.6 * s, 42 * s);
    ctx.quadraticCurveTo(16.1 * s, 42 * s, 15.9 * s, 39.5 * s);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(24 * s, 15 * s, 12 * s, 3.2 * s, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#dce8ff";
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(24 * s, 13.4 * s, 9 * s, 3.4 * s, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#f2f6ff";
    ctx.fill();

    ctx.strokeStyle = "#0e1ea8";
    ctx.lineWidth = 2 * s;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(27 * s, 10.6 * s);
    ctx.lineTo(30.5 * s, 4.5 * s);
    ctx.stroke();
  }

  ctx.restore();
}

function renderShareCard(reward) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 800;

  const ctx = canvas.getContext("2d");

  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, "#c4d4ff");
  bg.addColorStop(1, "#f3f7ff");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cardX = 48;
  const cardY = 140;
  const cardW = canvas.width - cardX * 2;
  const cardH = 520;

  ctx.save();
  ctx.shadowColor = "rgba(37,80,216,.28)";
  ctx.shadowBlur = 60;
  ctx.shadowOffsetY = 30;
  roundRectPath(ctx, cardX, cardY, cardW, cardH, 40);
  ctx.fillStyle = "rgba(255,255,255,.94)";
  ctx.fill();
  ctx.restore();

  const cx = canvas.width / 2;

  ctx.fillStyle = rarityBadgeColor(reward.rarity);
  roundRectPath(ctx, cx - 74, cardY + 30, 148, 34, 17);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "700 14px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(reward.rarity.toUpperCase(), cx, cardY + 53);

  drawRewardIcon(ctx, reward.icon, cx, cardY + 165, 110);

  ctx.fillStyle = "#0b1680";
  ctx.font = "800 32px sans-serif";
  ctx.fillText(reward.name, cx, cardY + 275);

  ctx.fillStyle = "#5a6a9a";
  ctx.font = "500 19px sans-serif";
  ctx.fillText(reward.sub, cx, cardY + 308);

  ctx.fillStyle = "#8898c0";
  ctx.font = "400 15px sans-serif";
  ctx.fillText(reward.valid, cx, cardY + 340);

  ctx.fillStyle = "#2550d8";
  ctx.font = "700 17px sans-serif";
  ctx.fillText("luckin coffee · #BrewYourLuck", cx, cardY + cardH - 34);

  return canvas;
}

function shareCardBlob(callback) {
  const canvas = renderShareCard(currentReward);
  canvas.toBlob(callback, "image/png");
}

function downloadCard() {
  shareCardBlob(blob => {
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "luckin-my-luck.png";
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 2000);
    showToast("Saved to your device");
  });
}

async function shareCard() {
  shareCardBlob(async blob => {
    if (!blob) return;

    const file = new File([blob], "luckin-my-luck.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Luckin Coffee",
          text: `I just unlocked ${currentReward.name} on Luckin Coffee! #BrewYourLuck`
        });
        return;
      } catch (err) {
        return;
      }
    }

    downloadCard();
  });
}

function shareToX() {
  const text = encodeURIComponent(
    `I just unlocked ${currentReward.name} on Luckin Coffee! #BrewYourLuck`
  );
  const url = encodeURIComponent(location.href);

  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener");
}

async function shareMore() {
  const text = `I just unlocked ${currentReward.name} on Luckin Coffee! #BrewYourLuck ${location.href}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: "Luckin Coffee", text });
      return;
    } catch (err) {
      return;
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard");
  } catch (err) {
    showToast("Copy failed");
  }
}

const socShare = document.getElementById("socShare");
const socX = document.getElementById("socX");
const socDownload = document.getElementById("socDownload");
const socMore = document.getElementById("socMore");

if (socShare) socShare.addEventListener("click", shareCard);
if (socX) socX.addEventListener("click", shareToX);
if (socDownload) socDownload.addEventListener("click", downloadCard);
if (socMore) socMore.addEventListener("click", shareMore);
