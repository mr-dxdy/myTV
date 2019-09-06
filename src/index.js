import assets from './assets/index.js'
import css from './css/style.css'

import App from './js/app.js'

window.document.addEventListener('DOMContentLoaded', () => {
  const app = new App({
    document: window.document,
    tizen: window.tizen,
    webapis: window.webapis
  });

  app.loadChannels();
});
