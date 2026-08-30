export function registerServiceWorker(onSuccess?: () => void, onUpdate?: () => void) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = '/sw.js';

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('[PWA] Service Worker registrado com sucesso:', registration.scope);

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) return;

            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('[PWA] Conteúdo novo disponível; favor atualizar.');
                  if (onUpdate) onUpdate();
                } else {
                  console.log('[PWA] Conteúdo armazenado em cache para uso offline!');
                  if (onSuccess) onSuccess();
                }
              }
            };
          };
        })
        .catch((error) => {
          console.warn('[PWA] Erro ao registrar Service Worker:', error);
        });
    });
  }
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
