// Home Page Scroll Animations
(function () {
  if (!document.body.classList.contains("home-page")) return;

  const targets = [
    ".ova-feature-box",
    ".ova-welcome-video",
    ".ova-welcome-content",
    ".ova-news-header",
    ".ova-news-card",
    ".ova-counter-item",
    ".ova-mayor-img",
    ".ova-mayor-content",
    ".ova-dept-header",
    ".ova-events-header",
    ".ova-event-card",
    ".ova-discover-inner",
    ".ova-team-header",
    ".ova-team-card",
    ".ova-partner-logo",
    ".ova-newsletter-left",
    ".ova-newsletter-right",
  ];

  const els = document.querySelectorAll(targets.join(","));
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("hx-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  els.forEach((el) => observer.observe(el));
})();

// Scroll Reveal Logic
(function () {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  reveals.forEach((el) => observer.observe(el));
})();

// Preloader logic
(function () {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const fill = document.getElementById("ldrBarFill");
  const status = document.getElementById("ldrStatus");
  const pct = document.getElementById("ldrPct");

  const steps = [
    { at: 10, label: "Connecting to server..." },
    { at: 28, label: "Loading resources..." },
    { at: 50, label: "Fetching city data..." },
    { at: 72, label: "Preparing portal..." },
    { at: 90, label: "Almost ready..." },
    { at: 100, label: "Welcome!" },
  ];

  let current = 0;
  const totalMs = 1200;
  const intervalMs = 16;
  const totalSteps = totalMs / intervalMs;
  let tick = 0;

  const timer = setInterval(() => {
    tick++;
    const progress = Math.min(Math.round((tick / totalSteps) * 100), 100);
    if (fill) fill.style.width = progress + "%";
    if (pct) pct.textContent = progress + "%";

    // Update status label at each milestone
    if (current < steps.length && progress >= steps[current].at) {
      if (status) status.textContent = steps[current].label;
      current++;
    }

    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        preloader.classList.add("fade-out");
        document.body.classList.add("loader-done");
        setTimeout(() => preloader.remove(), 400);
      }, 200);
    }
  }, intervalMs);
})();

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

// Blog Pagination Logic
(function () {
  const grid = document.querySelector(".ova-wrap-grid");
  const paginationUl = document.querySelector(".blog_pagination .pagination");
  if (!grid || !paginationUl) return;

  const articles = grid.querySelectorAll("article");
  const itemsPerPage = 6;
  let currentPage = 1;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  function showPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    articles.forEach((article, index) => {
      if (index >= start && index < end) {
        article.style.display = "block";
        article.style.animation = "none";
        article.offsetHeight;
        article.style.animation = "";
      } else {
        article.style.display = "none";
      }
    });

    updatePaginationUI();
  }

  function updatePaginationUI() {
    const lis = paginationUl.querySelectorAll("li");
    lis.forEach((li) => {
      li.classList.remove("active");
      const a = li.querySelector("a");
      if (a && a.textContent == currentPage) {
        li.classList.add("active");
      }
    });
  }

  paginationUl.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    e.preventDefault();

    const li = a.parentElement;
    if (li.classList.contains("next")) {
      showPage(currentPage + 1);
    } else {
      const pageNum = parseInt(a.textContent);
      if (!isNaN(pageNum)) {
        showPage(pageNum);
      }
    }
  });

  showPage(1);
})();

// Events Filter Logic
(function () {
  const form = document.getElementById("evSearchForm");
  const typeSelect = document.getElementById("evTypeSelect");
  const dateFromInput = document.getElementById("evDateFrom");
  const dateToInput = document.getElementById("evDateTo");
  const cards = document.querySelectorAll(".ev-card");

  if (!form || !typeSelect || !cards.length) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const filterType = typeSelect.value.toLowerCase();

    // Parse input dates as local midnight
    const fromDate = dateFromInput.value
      ? new Date(dateFromInput.value + "T00:00:00")
      : null;
    const toDate = dateToInput.value
      ? new Date(dateToInput.value + "T00:00:00")
      : null;

    cards.forEach((card) => {
      const category = card.querySelector(".ev-cat").textContent.toLowerCase();

      // Parse card date as local midnight
      const day = card.querySelector(".ev-day").textContent.trim();
      const month = card.querySelector(".ev-month").textContent.trim();
      const year = card.querySelector(".ev-year").textContent.trim();
      const cardDate = new Date(`${month} ${day} ${year}`);
      cardDate.setHours(0, 0, 0, 0);

      const matchesType = filterType === "" || category.includes(filterType);
      let matchesDate = true;

      if (fromDate && cardDate < fromDate) matchesDate = false;
      if (toDate && cardDate > toDate) matchesDate = false;

      if (matchesType && matchesDate) {
        card.style.display = "block";
        card.style.animation = "none";
        card.offsetHeight;
        card.style.animation = "";
      } else {
        card.style.display = "none";
      }
    });
  });
})();

// Hero Slider
(function () {
  const slides = document.querySelectorAll(".sr7-slide");
  const dots = document.querySelectorAll(".sr7-dot");
  let current = 0,
    timer;

  function goTo(n) {
    // Reset content of current slide before leaving
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
  const input = document.getElementById("searchInput");
  const result = document.getElementById("searchResult");
  if (!input || !result) return;
  const query = input.value.trim().toLowerCase();
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
const _searchInput = document.getElementById("searchInput");
if (_searchInput) {
  _searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchService();
  });
}

// Contact form
const _contactForm = document.getElementById("contactForm");
if (_contactForm) {
  _contactForm.addEventListener("submit", function (e) {
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
}

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
