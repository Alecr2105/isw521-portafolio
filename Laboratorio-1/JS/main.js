// =============================================
// NOCOVA — main.js
// =============================================
// Funcionalidades:
//   1. Toggle modo oscuro/claro + persistencia con localStorage
//   2. Guardar nombre del formulario de contacto con localStorage
//   3. Menú hamburguesa para móvil
// =============================================

const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');
const menuToggle  = document.getElementById('menu-toggle');
const navLinks    = document.getElementById('nav-links');

// ── 1. TEMA OSCURO / CLARO ─────────────────────────────────────────

function applyTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
    themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
  } else {
    document.body.classList.remove('dark-mode');
    themeIcon.textContent = '🌙';
    themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
  }
}

// Recuperar preferencia guardada al cargar la página
var savedTheme = localStorage.getItem('nocova-theme');
applyTheme(savedTheme === 'dark');

// Cambiar tema al hacer clic y guardar la nueva preferencia
themeToggle.addEventListener('click', function () {
  var isDark = document.body.classList.contains('dark-mode');
  applyTheme(!isDark);
  localStorage.setItem('nocova-theme', !isDark ? 'dark' : 'light');
});

// ── 2. MENÚ HAMBURGUESA ────────────────────────────────────────────

menuToggle.addEventListener('click', function () {
  var isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
  );
});

// Cerrar menú al navegar a una sección
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
  });
});

// ── 3. FORMULARIO DE CONTACTO + localStorage ──────────────────────

var nombreInput = document.getElementById('nombre');

// Restaurar nombre guardado si existe
if (nombreInput) {
  var savedName = localStorage.getItem('nocova-contacto-nombre');
  if (savedName) {
    nombreInput.value = savedName;
  }

  // Guardar nombre cada vez que el usuario escribe
  nombreInput.addEventListener('input', function () {
    localStorage.setItem('nocova-contacto-nombre', nombreInput.value.trim());
  });
}

// Manejar envío del formulario
var contactForm  = document.getElementById('contact-form');
var formFeedback = document.getElementById('form-feedback');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formFeedback.textContent = '✔ Solicitud enviada correctamente. Le contactaremos pronto.';

    setTimeout(function () {
      formFeedback.textContent = '';
    }, 6000);
  });
}
