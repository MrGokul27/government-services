document.addEventListener("DOMContentLoaded", () => {
  const role = sessionStorage.getItem("loggedInUserRole") || "citizen";
  const email =
    sessionStorage.getItem("loggedInUserEmail") || "user@example.com";
  const username = email.split("@")[0];
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  // Topbar welcome
  const welcomeMsg = document.getElementById("welcomeMessage");
  const memberId = document.getElementById("memberId");
  if (welcomeMsg && welcomeMsg.textContent.includes("Welcome")) {
    welcomeMsg.textContent = `Welcome back, ${username}`;
  }
  if (memberId && memberId.textContent.includes("Role:")) {
    memberId.textContent = `Role: ${roleLabel}`;
  }

  // User pill
  const pillName = document.getElementById("userPillName");
  const pillRole = document.getElementById("userPillRole");
  const pillAvatar = document.getElementById("userPillAvatar");
  if (pillName) pillName.textContent = username;
  if (pillRole) pillRole.textContent = roleLabel;
  if (pillAvatar)
    pillAvatar.src = `https://ui-avatars.com/api/?name=${username}&background=c8102e&color=fff`;

  // Mobile sidebar toggle
  const sidebar = document.querySelector(".dash-sidebar");
  const toggle = document.getElementById("dashSidebarToggle");
  const overlay = document.getElementById("dashOverlay");

  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("open");
  }
  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  }

  if (toggle)
    toggle.addEventListener("click", () =>
      sidebar.classList.contains("open") ? closeSidebar() : openSidebar(),
    );
  if (overlay) overlay.addEventListener("click", closeSidebar);

  // Close sidebar on nav link click (mobile)
  document.querySelectorAll(".dash-nav a").forEach((a) => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 900) closeSidebar();
    });
  });

  // Role filtering
  document.querySelectorAll("[data-roles]").forEach((el) => {
    const allowed = el.getAttribute("data-roles").split(",");
    if (role !== "admin" && !allowed.includes(role)) {
      el.style.display = "none";
    }
  });

  // Active link
  const currentPage =
    window.location.pathname.split("/").pop() || "dashboard.html";
  document.querySelectorAll(".dash-nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === currentPage);
  });
});
