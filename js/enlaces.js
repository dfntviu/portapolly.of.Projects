/**
 * Enlaces pendientes: href="#" (dato aún no definido) o localhost en producción.
 * En vez de llevar al reclutador a una página rota, se desactivan y se rotulan
 * con el texto de data-pending (definido en cada plantilla, ya traducido).
 */
export function marcarEnlacesPendientes(raiz = document) {
  const host = location.hostname;
  const enProduccion = host !== 'localhost' && host !== '127.0.0.1';

  // Los enlaces del CV los gestiona js/cv.js
  raiz.querySelectorAll('main a[href]:not([data-cv-link])').forEach((a) => {
    const href = a.getAttribute('href');
    const esPlaceholder = href === '#';
    const esLocal = enProduccion && /\/\/(localhost|127\.0\.0\.1)/.test(href);
    if (!esPlaceholder && !esLocal) return;

    a.removeAttribute('href');
    a.removeAttribute('target');
    a.setAttribute('aria-disabled', 'true'); // desactivamos la etiqueta
    const destino = a.querySelector('[data-pending-target]') ?? a;
    if (a.dataset.pending) destino.textContent = a.dataset.pending;
  });
}
