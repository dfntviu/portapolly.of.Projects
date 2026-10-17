import { CV } from './config.js';

let observador = null;

async function existe(url) {
  try {
    const destino = new URL(url, location.href);
    if (destino.origin !== location.origin) return true; // externo: no verificable por CORS
    const res = await fetch(destino, { method: 'HEAD', cache: 'no-cache' });
    // Algunos hostings devuelven index.html con 200 para rutas inexistentes: se valida el tipo
    return res.ok && (res.headers.get('content-type') ?? '').includes('pdf');
  } catch {
    return false;
  }
}

/**
 * - Rellena todos los [data-cv-link] (hero, sección CV, contacto) desde config.js.
 * - Comprueba que el PDF exista; si no, desactiva los enlaces y lo indica.
 * - El visor se carga en diferido: el iframe solo se crea cuando la sección
 *   está por entrar en pantalla, así el PDF no frena la carga inicial.
 * - Si el navegador no tiene visor de PDF integrado (común en móvil), se ofrece abrirlo.
 */
export async function initCV(lang) {
  const url = CV.url[lang] ?? CV.url.es;
  const enlaces = document.querySelectorAll('[data-cv-link]');
  enlaces.forEach((a) => {
    a.href = url;
    if (a.hasAttribute('download')) a.setAttribute('download', CV.nombreDescarga);
  });

  const visor = document.querySelector('[data-cv-viewer]');
  const estado = document.querySelector('[data-cv-status]');
  observador?.disconnect();

  if (!(await existe(url))) {
    enlaces.forEach((a) => { a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); });
    if (estado) { estado.textContent = estado.dataset.msgMissing; estado.classList.add('cv-status--error'); }
    return;
  }

  if (!visor) return;

  if (navigator.pdfViewerEnabled === false) {
    if (estado) estado.textContent = estado.dataset.msgNoInline;
    return;
  }

  const montar = () => {
    const iframe = document.createElement('iframe');
    iframe.className = 'cv-frame';
    iframe.title = visor.dataset.title ?? 'CV';
    iframe.src = `${url}#view=FitH`;
    visor.replaceChildren(iframe);
  };

  observador = new IntersectionObserver((entradas) => {
    if (entradas.some((e) => e.isIntersecting)) { observador.disconnect(); montar(); }
  }, { rootMargin: '400px 0px' });
  observador.observe(visor);
}
