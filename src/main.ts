import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/custom-service-worker.js')
      .then((registration) => {
        console.log(
          'Custom Service Worker registered with scope:',
          registration.scope
        );
      })
      .catch((error) => {
        console.error('Custom Service Worker registration failed:', error);
      });
  });
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
