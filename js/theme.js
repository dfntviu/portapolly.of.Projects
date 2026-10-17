// Tema claro/oscuro. Sin preferencia guardada se respeta la del sistema operativo.
export function initTheme() {
  const root = document.documentElement;
  const boton = document.getElementById('theme-toggle');
  if (!boton) return;

  boton.addEventListener('click', () => {
    const actual = root.dataset.theme
      ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const siguiente = actual === 'dark' ? 'light' : 'dark';
    root.dataset.theme = siguiente;
    try { localStorage.setItem('theme', siguiente); } catch { /* modo privado */ }
  });
}
