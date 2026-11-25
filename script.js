/* ===== 1. DARK / LIGHT MODE TOGGLE ===== */
const themeBtn = document.getElementById("theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  // Button shows the mode you will switch TO
  themeBtn.textContent = theme === "dark" ? "Light" : "Dark";
}

// Load saved theme (falls back to dark if storage is unavailable)
let savedTheme = "dark";
try { savedTheme = localStorage.getItem("theme") || "dark"; } catch (e) {}
applyTheme(savedTheme);

themeBtn.addEventListener("click", function () {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

/* ===== 2. MOBILE NAVIGATION MENU ===== */
const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "Close" : "Menu";
}

menuBtn.addEventListener("click", function () {
  setMenu(!navLinks.classList.contains("open"));
});

// Close the menu after choosing a link
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () { setMenu(false); });
});

/* ===== 3. CONTACT FORM VALIDATION ===== */
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("form-success");

// Show or clear an error under a field
function setError(id, message) {
  document.getElementById(id + "-error").textContent = message;
  document.getElementById(id).classList.toggle("invalid", message !== "");
}

function validateForm() {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;

  if (name.length < 2) { setError("name", "Enter your name (at least 2 characters)."); valid = false; }
  else setError("name", "");

  if (!emailPattern.test(email)) { setError("email", "Enter a valid email, like name@example.com."); valid = false; }
  else setError("email", "");

  if (subject.length < 3) { setError("subject", "Enter a subject (at least 3 characters)."); valid = false; }
  else setError("subject", "");

  if (message.length < 10) { setError("message", "Write a message of at least 10 characters."); valid = false; }
  else setError("message", "");

  return valid;
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // No backend, so we stay on the page
  successMsg.hidden = true;

  if (validateForm()) {
    successMsg.textContent = "Thank you, " + form.name.value.trim() + ". Your message was sent.";
    successMsg.hidden = false;
    form.reset();
  }
});

/* ===== FOOTER YEAR ===== */
document.getElementById("year").textContent = new Date().getFullYear();
