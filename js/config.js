/**
 * Configuración central del portafolio.
 *
 * CV: se sirve como archivo estático desde el MISMO hosting (Netlify/Vercel/GitHub Pages).
 * Es la opción más rápida: mismo origen (sin DNS ni redirecciones extra), caché de CDN
 * y sin depender del navegador del visitante (localStorage solo existe en TU navegador).
 *
 * Para usar un CV externo, poner aquí la URL completa (p. ej. la vista "preview" de Google Drive).
 * Con una URL externa no se puede comprobar si existe (CORS), así que se asume disponible.
 */
export const CV = {
  url: {
    es: 'assets/cv/CV-Daniel-Gomez-Perez-Frontend-ES.pdf',
    en: 'assets/cv/CV-Daniel-Gomez-Perez-Frontend-EN.pdf',   // cambia a la versión en inglés cuando la obtenga
  },
  nombreDescarga: 'CV-Daniel-Gomez-Perez-Frontend-Vue.pdf',
};
