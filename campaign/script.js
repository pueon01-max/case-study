/* HEADER */
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
});

/* HERO SOUND */
const heroVideo = document.getElementById("heroVideo");
const soundBtn = document.getElementById("soundBtn");

if (heroVideo && soundBtn) {
  soundBtn.addEventListener("click", async () => {
    try {
      if (heroVideo.muted) {
        heroVideo.muted = false;
        heroVideo.volume = 0.75;
        await heroVideo.play();

        soundBtn.textContent = "SOUND OFF";
        soundBtn.classList.add("is-on");
      } else {
        heroVideo.muted = true;

        soundBtn.textContent = "SOUND ON";
        soundBtn.classList.remove("is-on");
      }
    } catch (error) {
      console.warn(error);
    }
  });
}

/* MOBILE NAV TOGGLE */
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* MAGNETIC BUTTONS */
function initMagnetic(elements, strength = 0.28) {
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

initMagnetic(
  document.querySelectorAll(".hero-luck-btn, .sound-btn, .download-hotspot")
);

/* REVEAL */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach(el => {
  revealObserver.observe(el);
});

/* MAP TOOLTIP + SCROLL */
const mapBoard = document.getElementById("mapBoard");
const mapTooltip = document.getElementById("mapTooltip");
const mapMarkers = document.querySelectorAll(".map-marker");

function moveTooltip(x, y) {
  if (!mapTooltip) return;

  mapTooltip.style.left = `${x}px`;
  mapTooltip.style.top = `${y}px`;
}

if (mapBoard && mapTooltip) {
  mapMarkers.forEach(marker => {
    marker.addEventListener("mouseenter", e => {
      const rect = mapBoard.getBoundingClientRect();

      mapTooltip.textContent = marker.dataset.name;
      mapTooltip.classList.add("is-visible");

      moveTooltip(e.clientX - rect.left, e.clientY - rect.top);
    });

    marker.addEventListener("mousemove", e => {
      const rect = mapBoard.getBoundingClientRect();

      moveTooltip(e.clientX - rect.left, e.clientY - rect.top);
    });

    marker.addEventListener("mouseleave", () => {
      mapTooltip.classList.remove("is-visible");
    });

    marker.addEventListener("click", () => {
      const ripple = document.createElement("span");
      ripple.className = "marker-ripple";
      marker.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());

      const target = document.querySelector(marker.dataset.target);

      if (!target) return;

      const top =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        header.offsetHeight;

      window.scrollTo({
        top,
        behavior: "smooth"
      });
    });
  });
}

/* WORLD CANVAS - VISIBLE DOT MAP
   Continent silhouettes are real coastline data (Wikimedia Commons,
   File:Continents.svg, CIA World Factbook derived, public domain),
   loaded from world-map-data.js and sampled into a dot grid. */
const worldCanvas = document.getElementById("worldCanvas");

const worldMapPaths = (window.WORLD_MAP_PATHS || []).map(d => new Path2D(d));
const worldMapBox = window.WORLD_MAP_VIEWBOX || { w: 468, h: 239 };

function drawWorldCanvas() {
  if (!worldCanvas || !mapBoard || !worldMapPaths.length) return;

  const ctx = worldCanvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = mapBoard.getBoundingClientRect();

  worldCanvas.width = rect.width * dpr;
  worldCanvas.height = rect.height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const w = rect.width;
  const h = rect.height;

  ctx.clearRect(0, 0, w, h);

  /* fit the map's native viewBox into the board, preserving its aspect ratio */
  const boxRatio = worldMapBox.w / worldMapBox.h;
  const boardRatio = w / h;

  let drawW, drawH, offX, offY;

  if (boxRatio > boardRatio) {
    drawW = w;
    drawH = w / boxRatio;
    offX = 0;
    offY = (h - drawH) / 2;
  } else {
    drawH = h;
    drawW = h * boxRatio;
    offX = (w - drawW) / 2;
    offY = 0;
  }

  const scaleX = drawW / worldMapBox.w;
  const scaleY = drawH / worldMapBox.h;

  /* hit-test a dot grid (in board pixel space) against the real paths -
     the CTM maps the paths' native viewBox units into that same space */
  const step = 5;
  const hits = [];

  ctx.save();
  ctx.translate(offX, offY);
  ctx.scale(scaleX, scaleY);

  for (let x = 0; x < w; x += step) {
    for (let y = 0; y < h; y += step) {
      for (let i = 0; i < worldMapPaths.length; i++) {
        if (ctx.isPointInPath(worldMapPaths[i], x, y)) {
          hits.push(x, y);
          break;
        }
      }
    }
  }

  ctx.restore();

  ctx.fillStyle = "rgba(120, 130, 160, 0.62)";

  for (let i = 0; i < hits.length; i += 2) {
    ctx.beginPath();
    ctx.arc(hits[i], hits[i + 1], 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  positionMapMarkers(offX, offY, drawW, drawH);
}

function positionMapMarkers(offX, offY, drawW, drawH) {
  mapMarkers.forEach(marker => {
    const vx = parseFloat(marker.dataset.vx);
    const vy = parseFloat(marker.dataset.vy);

    if (Number.isNaN(vx) || Number.isNaN(vy)) return;

    marker.style.left = `${offX + vx * drawW}px`;
    marker.style.top = `${offY + vy * drawH}px`;
  });
}

if (worldCanvas) {
  drawWorldCanvas();
  window.addEventListener("resize", drawWorldCanvas);
}

/* CITY SCROLL-IN KEN BURNS */
const cityInViewObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".city-stage").forEach(stage => {
  cityInViewObserver.observe(stage);
});

/* CITY HOVER / CARD */
document.querySelectorAll(".city-stage").forEach(stage => {
  stage.addEventListener("mouseenter", () => {
    stage.classList.add("is-active");
  });

  stage.addEventListener("mouseleave", () => {
    stage.classList.remove("is-active");

    const card = stage.querySelector(".drag-card");

    if (card) {
      card.classList.remove("is-dragging");
      card.style.removeProperty("transform");

      const inner = card.querySelector(".drag-card__inner");
      if (inner) inner.style.transform = "";
    }

    const flows = stage.querySelectorAll(".flow");

    flows.forEach(flow => {
      flow.style.removeProperty("translate");
    });
  });

  stage.addEventListener("mousemove", e => {
    const rect = stage.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    const flows = stage.querySelectorAll(".flow");

    flows.forEach((flow, index) => {
      const depth = (index + 1) * 18;
      flow.style.translate = `${px * depth}px ${py * depth}px`;
    });

    const card = stage.querySelector(".drag-card:not(.is-dragging)");

    if (card) {
      const rotateY = px * 8;
      const rotateX = py * -7;

      card.style.transform = `
        translate(-50%, -50%)
        translateY(0)
        scale(1)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    }
  });
});

/* DRAG TO FLIP CARD */
document.querySelectorAll(".js-drag-card").forEach(card => {
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const inner = card.querySelector(".drag-card__inner");

  card.addEventListener("pointerdown", e => {
    isDragging = true;
    startX = e.clientX;
    currentX = 0;

    card.classList.add("is-dragging");
    card.setPointerCapture(e.pointerId);
  });

  card.addEventListener("pointermove", e => {
    if (!isDragging || !inner) return;

    currentX = e.clientX - startX;

    const limited = Math.max(-120, Math.min(120, currentX));
    inner.style.transform = `rotateY(${limited * 0.5}deg)`;
  });

  card.addEventListener("pointerup", e => {
    if (!isDragging || !inner) return;

    isDragging = false;
    card.classList.remove("is-dragging");

    if (Math.abs(currentX) > 55) {
      card.classList.toggle("is-flipped");
    }

    inner.style.transform = "";

    try {
      card.releasePointerCapture(e.pointerId);
    } catch (err) {}
  });

  card.addEventListener("pointercancel", () => {
    isDragging = false;
    card.classList.remove("is-dragging");

    if (inner) inner.style.transform = "";
  });

  card.addEventListener("click", () => {
    if (Math.abs(currentX) > 6) return;

    card.classList.toggle("is-flipped");
  });
});

/* SEOUL DROP + DRAG */
const seoulStage = document.querySelector(".seoul-stage");
const seoulLaunchWrap = document.getElementById("seoulLaunchWrap");
const seoulImpactRing = document.querySelector(".seoul-impact-ring");

if (seoulStage && seoulLaunchWrap) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          seoulLaunchWrap.classList.add("is-live");
          seoulStage.classList.add("is-live");
        }
      });
    },
    { threshold: 0.4 }
  );

  /* the stage image is taller than the viewport, so trigger off the
     ring's own position (near the sidewalk) rather than the stage as a
     whole - otherwise the "thud" fires and finishes while the viewer is
     still looking at the top of the section, long before they scroll
     down to where the ring actually sits */
  observer.observe(seoulImpactRing || seoulStage);

  seoulLaunchWrap.addEventListener("mouseenter", () => {
    seoulLaunchWrap.classList.add("is-hover");
  });

  seoulLaunchWrap.addEventListener("mouseleave", () => {
    if (!seoulLaunchWrap.classList.contains("is-dragging")) {
      seoulLaunchWrap.classList.remove("is-hover");
    }
  });

  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;
  let dragging = false;

  seoulLaunchWrap.addEventListener("pointerdown", e => {
    dragging = true;

    seoulLaunchWrap.classList.add("is-dragging");

    startX = e.clientX;
    startY = e.clientY;

    seoulLaunchWrap.setPointerCapture(e.pointerId);
  });

  seoulLaunchWrap.addEventListener("pointermove", e => {
    if (!dragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    seoulLaunchWrap.style.setProperty("--drag-x", `${baseX + dx}px`);
    seoulLaunchWrap.style.setProperty("--drag-y", `${baseY + dy}px`);
  });

  const stopDrag = e => {
    if (!dragging) return;

    dragging = false;

    const currentX =
      parseFloat(getComputedStyle(seoulLaunchWrap).getPropertyValue("--drag-x")) || 0;
    const currentY =
      parseFloat(getComputedStyle(seoulLaunchWrap).getPropertyValue("--drag-y")) || 0;

    baseX = currentX;
    baseY = currentY;

    seoulLaunchWrap.classList.remove("is-dragging");

    if (!seoulLaunchWrap.matches(":hover")) {
      seoulLaunchWrap.classList.remove("is-hover");
    }

    try {
      seoulLaunchWrap.releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  seoulLaunchWrap.addEventListener("pointerup", stopDrag);
  seoulLaunchWrap.addEventListener("pointercancel", stopDrag);
}

/* ANCHOR */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    const top =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      header.offsetHeight;

    window.scrollTo({
      top,
      behavior: "smooth"
    });
  });
});