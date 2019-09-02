import assets from './assets/index.js'
import css from './css/style.css'

import Logger from './js/logger.js'
import Parser from './js/parser.js'
import UI from './js/ui.js'
import Player from './js/player'
import App from './js/app.js'
import Playlist from './js/playlist.js'

window.document.addEventListener('DOMContentLoaded', () => {
  const logger = new Logger(window.document.getElementById('log'));

  const ui = new UI({
    document: window.document,
    logger: logger
  });

  const defaultTv = { width: 800, height: 600 };
  const parser = new Parser();
  const player = new Player({ tv: defaultTv, ui: ui, logger: logger, webapis: window.webapis });

  const app = new App({
    document: window.document,
    tizen: window.tizen,
    ui: ui,
    player: player,
    logger: logger
  })

  window.tizen.systeminfo.getPropertyValue('DISPLAY', (data) => {
    player.tv = { width: data.resolutionWidth, height: data.resolutionHeight };
    const promise = parser.loadFromUrls(Playlist.urls);

    promise.then((channels) => {
      ui.setChannels(channels);
    })

    promise.catch((xhr) => {
      logger.info(`Error loading playlist: ${xhr.status}`)
    });
  });

});
