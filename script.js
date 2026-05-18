// Departments Slider
(function () {
  const track = document.getElementById("ovaDeptTrack");
  const dotsWrap = document.getElementById("ovaDeptDots");
  const slider = document.getElementById("ovaDeptSlider");
  if (!track) return;

  const cards = track.querySelectorAll(".ova-dept-card");
  const total = cards.length;
  let idx = 0;

  function getVisible() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    const pages = Math.ceil(total / getVisible());
    for (let i = 0; i < pages; i++) {
      const d = document.createElement("button");
      d.className = "ova-dept-dot" + (i === 0 ? " active" : "");
      d.addEventListener("click", () => {
        idx = i * getVisible();
        render();
      });
      dotsWrap.appendChild(d);
    }
  }

  function render() {
    const cardW = cards[0].offsetWidth + 30;
    track.style.transform = `translateX(-${idx * cardW}px)`;
    const dots = dotsWrap.querySelectorAll(".ova-dept-dot");
    const page = Math.floor(idx / getVisible());
    dots.forEach((d, i) => d.classList.toggle("active", i === page));
  }

  function next() {
    const visible = getVisible();
    idx = idx + visible >= total ? 0 : idx + 1;
    render();
  }

  buildDots();
  window.addEventListener("resize", buildDots);
  slider.addEventListener("mouseenter", () => clearInterval(deptTimer));
  slider.addEventListener("mouseleave", () => {
    deptTimer = setInterval(next, 3000);
  });
  let deptTimer = setInterval(next, 3000);
})();

// Stats Counter Animation
(function () {
  const counters = document.querySelectorAll(".ova-count");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const to = parseFloat(el.dataset.to);
        const decimal = parseInt(el.dataset.decimal || 0);
        const duration = 2000;
        const step = 16;
        const steps = duration / step;
        let current = 0;
        const increment = to / steps;
        const timer = setInterval(() => {
          current += increment;
          if (current >= to) {
            current = to;
            clearInterval(timer);
          }
          el.textContent = decimal
            ? current.toFixed(decimal)
            : Math.floor(current);
        }, step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.4 },
  );

  counters.forEach((c) => observer.observe(c));
})();

// News Slider
(function () {
  const track = document.getElementById("ovaNewsTrack");
  if (!track) return;
  const cards = track.querySelectorAll(".ova-news-card");
  const total = cards.length;
  let idx = 0;

  function getVisible() {
    return window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
  }

  function slide() {
    const visible = getVisible();
    const max = total - visible;
    idx = idx >= max ? 0 : idx + 1;
    const cardW = cards[0].offsetWidth + 30;
    track.style.transform = `translateX(-${idx * cardW}px)`;
  }

  const slider = document.getElementById("ovaNewsSlider");
  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", () => {
    timer = setInterval(slide, 3000);
  });
  let timer = setInterval(slide, 3000);
})();

// Hero Slider
(function () {
  const slides = document.querySelectorAll(".sr7-slide");
  const dots = document.querySelectorAll(".sr7-dot");
  let current = 0,
    timer;

  function goTo(n) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (n + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  window.srSlide = (dir) => {
    clearInterval(timer);
    goTo(current + dir);
    startAuto();
  };
  window.srGoTo = (n) => {
    clearInterval(timer);
    goTo(n);
    startAuto();
  };

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }
  startAuto();
})();

// Mobile canvas menu
const hamburger = document.getElementById("ovaHamburger");
const canvas = document.getElementById("ovaCanvas");
const canvasClose = document.getElementById("ovaCanvasClose");
const overlay = document.getElementById("ovaOverlay");

function openCanvas() {
  canvas.classList.add("open");
  overlay.classList.add("open");
}
function closeCanvas() {
  canvas.classList.remove("open");
  overlay.classList.remove("open");
}

if (hamburger) hamburger.addEventListener("click", openCanvas);
if (canvasClose) canvasClose.addEventListener("click", closeCanvas);
if (overlay) overlay.addEventListener("click", closeCanvas);

// Search service
function searchService() {
  const query = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const result = document.getElementById("searchResult");
  if (!query) {
    result.textContent = "";
    return;
  }

  const cards = document.querySelectorAll("[data-service]");
  let found = [];
  cards.forEach((card) => {
    const name = card.getAttribute("data-service").toLowerCase();
    if (name.includes(query)) found.push(card.getAttribute("data-service"));
  });

  result.textContent = found.length
    ? `Found: ${found.join(", ")}`
    : "No matching service found. Try a different keyword.";
}

// Allow Enter key to trigger search
document.getElementById("searchInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchService();
});

// Contact form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const msg = document.getElementById("formMsg");

  if (!name || !email || !message) {
    msg.textContent = "Please fill in all fields.";
    msg.className = "mt-3 text-center fw-semibold text-danger";
    return;
  }

  msg.textContent = `Thank you, ${name}! Your message has been sent.`;
  msg.className = "mt-3 text-center fw-semibold text-success";
  this.reset();
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
