// Idioma activo y textos fijos de index.html (nav, título, meta).
// El contenido de cada sección vive en templates/es y templates/en.
const TEXTOS = {
  es: {
    'nav.proyectos': 'Proyectos', 'nav.tecnologias': 'Tecnologías', 'nav.sobreMi': 'Sobre mí',
    'nav.formacion': 'Formación', 'nav.cv': 'CV', 'nav.contacto': 'Contacto',
    'footer.stack': 'HTML, CSS y JavaScript', 'skip': 'Saltar al contenido',
    title: 'Christopher · Desarrollador Front-End (React · Vue · TypeScript)',
    description: 'Portafolio de Christopher, desarrollador Front-End con React, Vue 3 y TypeScript. Proyectos, tecnologías, CV y contacto.',
    toggleLabel: 'EN', toggleAria: 'Switch to English', themeAria: 'Cambiar tema',
    sectionError: 'No se pudo cargar esta sección',
  },
  en: {
    'nav.proyectos': 'Projects', 'nav.tecnologias': 'Tech stack', 'nav.sobreMi': 'About',
    'nav.formacion': 'Education', 'nav.cv': 'Résumé', 'nav.contacto': 'Contact',
    'footer.stack': 'HTML, CSS and JavaScript', 'skip': 'Skip to content',
    title: 'Christopher · Front-End Developer (React · Vue · TypeScript)',
    description: 'Portfolio of Christopher, Front-End developer working with React, Vue 3 and TypeScript. Projects, tech stack, résumé and contact.',
    toggleLabel: 'ES', toggleAria: 'Cambiar a español', themeAria: 'Toggle theme',
    sectionError: 'This section could not be loaded',
  },
};

function leer(clave) { try { return localStorage.getItem(clave); } catch { return null; } }
function guardar(clave, valor) { try { localStorage.setItem(clave, valor); } catch { /* modo privado */ } }

export function getLang() {
  const guardado = leer('lang');
  if (guardado === 'es' || guardado === 'en') return guardado;
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function setLang(lang) { guardar('lang', lang); }

export function t(lang, clave) { return TEXTOS[lang]?.[clave] ?? TEXTOS.es[clave] ?? clave; }

export function aplicarTextosFijos(lang) {
  document.documentElement.lang = lang;
  document.title = t(lang, 'title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t(lang, 'description'));
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(lang, el.dataset.i18n); });

  const boton = document.getElementById('lang-toggle');
  if (boton) { boton.textContent = t(lang, 'toggleLabel'); boton.setAttribute('aria-label', t(lang, 'toggleAria')); }
  document.getElementById('theme-toggle')?.setAttribute('aria-label', t(lang, 'themeAria'));
}
