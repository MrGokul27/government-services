function componentPath(file) {
  const depth = location.pathname.split("/").filter(Boolean).length - 1;
  const prefix = depth > 0 ? "../".repeat(depth) : "";
  return prefix + "components/" + file;
}

async function loadComponent(selector, file, position = "innerHTML") {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(componentPath(file));
    const html = await res.text();
    if (position === "innerHTML") {
      el.innerHTML = html;
    } else {
      el.insertAdjacentHTML(position, html);
    }
  } catch (e) {
    console.warn("Could not load component:", file, e);
  }
}

function setActiveNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".ova-menu a, .ova-canvas-menu a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (href === page || (page === "" && href === "index.html")) {
      a.classList.add("nav-active");
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("#site-header", "header.html");
  await loadComponent("#site-footer", "footer.html");
  setActiveNav();

  // Re-init mobile canvas after header is injected
  const hamburger = document.getElementById("ovaHamburger");
  const canvas = document.getElementById("ovaCanvas");
  const canvasClose = document.getElementById("ovaCanvasClose");
  const overlay = document.getElementById("ovaOverlay");

  if (hamburger)
    hamburger.addEventListener("click", () => {
      canvas.classList.add("open");
      overlay.classList.add("open");
    });
  if (canvasClose)
    canvasClose.addEventListener("click", () => {
      canvas.classList.remove("open");
      overlay.classList.remove("open");
    });
  if (overlay)
    overlay.addEventListener("click", () => {
      canvas.classList.remove("open");
      overlay.classList.remove("open");
    });

  // Redirect placeholder links to 404 page
  document.querySelectorAll('a[href="#"], a:not([href])').forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent default behavior for placeholder links
      e.preventDefault();
      // Redirect to the 404 page
      window.location.href = "404.html";
    });
  });
});
