const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.22 }
);

revealItems.forEach(item => revealObserver.observe(item));

const drawLines = document.querySelectorAll(".draw-line, .stock-line");

drawLines.forEach(line => {
  const length = line.getTotalLength();

  line.style.strokeDasharray = length;
  line.style.strokeDashoffset = length;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        line.style.transition =
          "stroke-dashoffset 2.2s cubic-bezier(.16,1,.3,1)";
        line.style.strokeDashoffset = "0";
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(line);
});

const bars = document.querySelectorAll(".bar-wrap i, .mini-bars i, .combo-bars i");

bars.forEach((bar, index) => {
  bar.style.transform = "scaleY(0)";
  bar.style.opacity = "0";

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        bar.style.transition =
          `transform .9s cubic-bezier(.16,1,.3,1) ${index * 0.08}s, opacity .6s ease ${index * 0.08}s`;
        bar.style.transform = "scaleY(1)";
        bar.style.opacity = "1";
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(bar);
});

const ratios = document.querySelectorAll(".ratio i");

ratios.forEach((ratio, index) => {
  const width = ratio.style.width;
  ratio.style.width = "0";

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        ratio.style.transition =
          `width 1.3s cubic-bezier(.16,1,.3,1) ${index * 0.12}s`;
        ratio.style.width = width;
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(ratio);
});
