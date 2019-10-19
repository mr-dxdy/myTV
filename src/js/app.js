import Logger from './logger'
import ChannelRepository from './channel-repository'
import UI from './ui.js'
import Player from './player'
import TvKey from './tv-key';

class App {
  constructor(props) {
    this.document = props.document;
    this.tizen = props.tizen;
    this.webapis = props.webapis;

    this.logger = new Logger(this.document.getElementById('log'));
    this.ui = new UI({ document: this.document, logger: this.logger });

    this.player = new Player({ tv: this.defaultTvSize(), ui: this.ui, logger: this.logger, webapis: this.webapis });
    this.tizen.systeminfo.getPropertyValue('DISPLAY', (data) => {
      this.player.tv = { width: data.resolutionWidth, height: data.resolutionHeight };
    });

    this.registerKeys();
    this.document.addEventListener('keydown', (e) => this.onKeyDown(e));
  }

  loadChannels() {
    const promise = ChannelRepository.loadFromProfile();

    promise.then((repository) => {
      let channelsQuery = repository.startQuery();
      channelsQuery = channelsQuery.sortBy({ key: 'name', direction: 'asc' });
      channelsQuery = channelsQuery.rejectBy((channel) => channel.existsInBlackList());

      this.ui.setChannels(channelsQuery.all());
    })

    promise.catch((xhr) => {
      this.logger.info(`Error loading playlist: ${xhr.status}`)
    });
  }

  defaultTvSize() {
    return { width: 800, height: 600 };
  }

  onKeyDown(e) {
    const key = e.keyCode;
    switch (key) {
      case TvKey.PLAYPAUSE:
      case TvKey.PLAY:
        this.logger.info('key: play/pause');
        this.player.playPause();
        break;
      case TvKey.PAUSE:
        this.logger.info('key: pause');
        this.player.pause();
        break;
      case TvKey.STOP:
        this.logger.info('key: stop');
        this.player.stop();
        break;
      case TvKey.FF:
        this.player.foward();
        break;
      case TvKey.RW:
        this.player.rewind();
        break;
      case TvKey.UP:
        this.logger.info('key: up');
        this.player.prev();
        break;
      case TvKey.DOWN:
        this.logger.info('key: down');
        this.player.next();
        break;
      case TvKey.ENTER:
        this.logger.info('key: enter');
        this.player.enter();
        break;
      case TvKey.INFO:
        this.logger.info(`video state: ${Player.state}`);
        this.player.nextAudio();
        break;
      case TvKey.N0:
        this.player.ui.toogleLog();
        break;
      case TvKey.N1:
        this.player.set4k(true)
        break;
      case TvKey.N2:
        this.player.set4k(false)
        break;
      case TvKey.N3:
      case TvKey.N4:
      case TvKey.N5:
      case TvKey.N6:
      case TvKey.N7:
      case TvKey.N8:
      case TvKey.N9:
        this.logger.info(`key: ${key}`);
        break;
    }
  }

  get usedKeys() {
    return [
      'Info',
      'MediaPause', 'MediaPlay',
      'MediaPlayPause', 'MediaStop',
      'MediaFastForward', 'MediaRewind',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];
  }

  registerKeys() {
    this.usedKeys.forEach((key) => {
      this.tizen.tvinputdevice.registerKey(key);
    });
  }
}

export default App;
