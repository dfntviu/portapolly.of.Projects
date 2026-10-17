import { t } from './i18n.js';

// Orden = orden en la página. Cada nombre corresponde a templates/<lang>/<nombre>.html
export const SECCIONES = ['hero', 'proyectos', 'tecnologias', 'sobre-mi', 'estudios', 'certificaciones', 'cv', 'contacto'];

let peticionActual = 0;

async function obtenerPlantilla(lang, nombre) {
  const url = `templates/${lang}/${nombre}.html`;
  const res = await fetch(url, { cache: 'no-cache' });
  // fetch() no falla con 404: sin esto se inyectaría la página de error del servidor
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} (${url})`);
  return res.text();
}

/**
 * Carga todas las secciones en paralelo y las inyecta en su hueco [data-section].
 * Una plantilla que falla muestra el error en su propio hueco; las demás se pintan igual.
 * Devuelve false si mientras tanto se pidió otra carga (p. ej. cambio rápido de idioma).
 */
export async function cargarSecciones(lang) {
  const miPeticion = ++peticionActual;
  const resultados = await Promise.allSettled(SECCIONES.map((n) => obtenerPlantilla(lang, n)));
  if (miPeticion !== peticionActual) return false;

  resultados.forEach((r, i) => {
    const hueco = document.querySelector(`[data-section="${SECCIONES[i]}"]`);
    if (!hueco) return;
    if (r.status === 'fulfilled') {
      hueco.innerHTML = r.value;
    } else {
      console.error('[secciones]', r.reason);
      hueco.innerHTML = `<div class="container section-error" role="alert">${t(lang, 'sectionError')}: ${r.reason.message}</div>`;
    }
  });
  return true;
}
