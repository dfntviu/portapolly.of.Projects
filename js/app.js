import { getLang, setLang, aplicarTextosFijos } from './i18n.js';
import { initTheme } from './theme.js';
import { cargarSecciones, SECCIONES } from './sections.js';
import { initCV } from './cv.js';
import { marcarEnlacesPendientes } from './enlaces.js';

let lang = getLang();

async function render() {
  aplicarTextosFijos(lang);
  const vigente = await cargarSecciones(lang);
  if (!vigente) return false;
  marcarEnlacesPendientes();
  initCV(lang);
  return true;
}

// Sección visible bajo el nav, para conservar la posición al cambiar de idioma
function seccionVisible() {
  const limite = 80;
  let actual = null;
  for (const nombre of SECCIONES) {
    const hueco = document.querySelector(`[data-section="${nombre}"]`);
    if (hueco && hueco.getBoundingClientRect().top <= limite) actual = hueco;
  }
  return actual;
}

function irA(el) { el?.scrollIntoView({ behavior: 'instant', block: 'start' }); }

document.getElementById('year').textContent = new Date().getFullYear();
initTheme();

render().then(() => {
  // El contenido llega después del primer pintado: se respeta el #ancla de la URL
  if (location.hash) irA(document.querySelector(location.hash));
});

document.getElementById('lang-toggle')?.addEventListener('click', async () => {
  const ancla = seccionVisible()?.dataset.section;
  lang = lang === 'es' ? 'en' : 'es';
  setLang(lang);
  // Se apunta al elemento con id (no al hueco) para que aplique scroll-margin-top
  if (await render() && ancla) irA(document.querySelector(`[data-section="${ancla}"] [id]`));
});
