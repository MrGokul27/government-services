document.addEventListener("DOMContentLoaded", () => {
  const role = sessionStorage.getItem("loggedInUserRole") || "citizen";
  const email =
    sessionStorage.getItem("loggedInUserEmail") || "user@example.com";
  const username = email.split("@")[0];

  // Update Profile UI
  const welcomeMsg = document.getElementById("welcomeMessage");
  const memberId = document.getElementById("memberId");
  const pillName = document.getElementById("userPillName");
  const pillAvatar = document.getElementById("userPillAvatar");

  if (welcomeMsg) welcomeMsg.innerText = `Welcome back, ${username}`;
  if (memberId)
    memberId.innerText = `Role: ${role.charAt(0).toUpperCase() + role.slice(1)}`;
  if (pillName) pillName.innerText = username;
  if (pillAvatar)
    pillAvatar.src = `https://ui-avatars.com/api/?name=${username}&background=c8102e&color=fff`;

  // Mobile Sidebar Toggle
  const dashSidebar = document.querySelector(".dash-sidebar");
  const dashSidebarToggle = document.getElementById("dashSidebarToggle");
  const dashOverlay = document.getElementById("dashOverlay");

  if (dashSidebarToggle && dashSidebar && dashOverlay) {
    dashSidebarToggle.addEventListener("click", () => {
      dashSidebar.classList.toggle("open");
      dashOverlay.classList.toggle("open");
    });

    dashOverlay.addEventListener("click", () => {
      dashSidebar.classList.remove("open");
      dashOverlay.classList.remove("open");
    });
  }

  // Role Filtering (Sidebar and Page Content)
  document.querySelectorAll("[data-roles]").forEach((el) => {
    const allowedRoles = el.getAttribute("data-roles");
    // Admin sees everything. Other roles are filtered by their data-roles attribute.
    if (
      role !== "admin" &&
      allowedRoles &&
      !allowedRoles.split(",").includes(role)
    ) {
      el.style.display = "none";
    }
  });

  // Active Link Highlighting
  const currentPath =
    window.location.pathname.split("/").pop() || "dashboard.html";
  document.querySelectorAll(".dash-nav a").forEach((a) => {
    if (a.getAttribute("href") === currentPath) {
      a.classList.add("active");
    } else {
      a.classList.remove("active");
    }
  });
});
