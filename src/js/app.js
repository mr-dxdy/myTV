import tvKey from './tv-key';

class App {
  constructor(props) {
    this.document = props.document;
    this.tizen = props.tizen;
    this.player = props.player;
    this.logger = props.logger;

    this.registerKeys();
    this.document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown(e) {
    const key = e.keyCode;
    switch (key) {
      case tvKey.PLAYPAUSE:
      case tvKey.PLAY:
        this.logger.info('key: play/pause');
        this.player.playPause();
        break;
      case tvKey.PAUSE:
        this.logger.info('key: pause');
        this.player.pause();
        break;
      case tvKey.STOP:
        this.logger.info('key: stop');
        this.player.stop();
        break;
      case tvKey.FF:
        this.player.foward();
        break;
      case tvKey.RW:
        this.player.rewind();
        break;
      case tvKey.UP:
        this.logger.info('key: up');
        this.player.prev();
        break;
      case tvKey.DOWN:
        this.logger.info('key: down');
        this.player.next();
        break;
      case tvKey.ENTER:
        this.logger.info('key: enter');
        this.player.enter();
        break;
      case tvKey.INFO:
        this.logger.info(`video state: ${Player.state}`);
        this.player.nextAudio();
        break;
      case tvKey.N0:
        this.player.ui.toogleLog();
        break;
      case tvKey.N1:
        this.player.set4k(true)
        break;
      case tvKey.N2:
        this.player.set4k(false)
        break;
      case tvKey.N3:
      case tvKey.N4:
      case tvKey.N5:
      case tvKey.N6:
      case tvKey.N7:
      case tvKey.N8:
      case tvKey.N9:
        this.logger.info(`key: ${key}`);
        break;
    }
  }

  registerKeys() {
    const usedKeys = [
      'Info',
      'MediaPause', 'MediaPlay',
      'MediaPlayPause', 'MediaStop',
      'MediaFastForward', 'MediaRewind',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];

    usedKeys.forEach((key) => {
      this.tizen.tvinputdevice.registerKey(key);
    });
  }
}

export default App;
