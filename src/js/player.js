import I18n from './i18n.js'

class Player {
  constructor(config) {
    this.screen = null;
    this.playerUrl = null;

    this.ui = config.ui;
    this.logger = config.logger;
    this.webapis = config.webapis;
    this.is4k = config.is4k || false;
    this.audioTrack = config.audioTrack || 1;
    this.tv = config.tv;
  }

  updatePlayerScreen() {
    var playerBounds = this.ui.player.getBoundingClientRect();

    this.screen = [
      playerBounds.left, playerBounds.top,
      playerBounds.width, playerBounds.height
    ];

    this.logger.info('update player screen:' + this.screen.join(', '));

    return this.screen;
  }

  next() {
    this.ui.next();
    if (this.ui.isFullscreen()) this.toggleFullscreen();
  }

  prev() {
    this.ui.prev();
    if (this.ui.isFullscreen()) this.toggleFullscreen();
  }

  enter() {
    var channel = this.ui.selectedChannel.dataset;
    if (channel.url == this.playerUrl && this.state == 'PLAYING') {
      this.toggleFullscreen();
    } else {
      this.play(channel.url);
    }
  }

  play(url) {
    if (!url) {
      this.logger.info('play');
      this.ui.play();
      return this.webapis.avplay.play();
    }

    this.logger.info(`prepare and play: ${url}`);
    this.playerUrl = url;
    this.audioTrack = 1;
    this.ui.playing(url);
    this.webapis.avplay.close();
    this.webapis.avplay.open(url);

    this.webapis.avplay.setListener({
      onbufferingstart: () => {
        this.logger.info('buffering start');
      },
      onbufferingprogress: (percent) => {
        this.logger.info(`buffering progress: ${percent}`);
        this.ui.buffering(`progress ${percent}`);
      },
      onbufferingcomplete: () => {
        this.logger.info('buffering complete');
        this.ui.buffering('complete');
      },
      // oncurrentplaytime: function(time) {
      //   this.logger.info('current playtime:', time);
      // },
      onevent: (type, data) => {
        this.logger.info(`event type: ${type}, data: ${data}`);
      },
      onstreamcompleted: () => {
        this.logger.info('stream compited');
        this.stop();
      },
      onerror: (error) => {
        this.logger.info(`event error: ${error}`);
      }
    });
    this.webapis.avplay.setDisplayRect.apply(null, this.screen);
    this.webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_FULL_SCREEN');
    if (this.is4k) this.set4k(true);
    // this.webapis.avplay.prepare();
    this.webapis.avplay.prepareAsync(
      () => { this.webapis.avplay.play(); },
      () => {
        this.ui.message( I18n.t("UnableToOpenUrl", { url: url }) );
      }
    );
  }

  playPause() {
    this.logger.info('play/pause');
    return this.state == 'PLAYING' ? this.pause() : this.play();
  }

  pause() {
    this.logger.info('pause');
    this.ui.pause();
    this.webapis.avplay.pause();
  }

  stop() {
    this.logger.info('stop');
    this.ui.stop();
    this.webapis.avplay.stop();
  }

  foward(num) {
    num = num || 3000;
    this.logger.info(`foward: ${num}`);
    this.webapis.avplay.jumpForward(num);
  }

  rewind(num) {
    num = num || 3000;
    this.logger.info(`rewind: ${num}`);
    this.webapis.avplay.jumpBackward(num);
  }

  set4k(value) {
    this.logger.info(`set 4k: ${value}`);
    this.webapis.avplay.setStreamingProperty('SET_MODE_4K', value);
  }

  setTrack(type, index) {
    this.logger.info(`set track: ${type} ${index}`);
    this.webapis.avplay.setSelectTrack(type, index);
    this.ui.setAudio(index);
  }

  nextAudio() {
    var list = [];
    var trackList = this.getTracks();
    for (var i in trackList) {
      this.logger.info(`tracks: ${trackList[i].type}`);
      if (trackList[i].type == 'AUDIO') list.push(trackList[i]);
    }
    var length = list.length;
    this.audioTrack++
    if (this.audioTrack > length) this.audioTrack = 1;
    this.logger.info(`set audio: ${this.audioTrack}`);
    this.setTrack(`AUDIO: ${this.audioTrack}`);
  }

  getTracks() {
    this.logger.info('get tracks');
    return this.webapis.avplay.getTotalTrackInfo();
  }

  toggleFullscreen() {
    if (this.ui.isFullscreen()) {
      this.logger.info('fullscreen off:' + [this.screen[2], this.screen[3]].join('x'));
      this.ui.fullscreen(false);
      this.webapis.avplay.setDisplayRect.apply(null, this.screen);
    } else {
      this.logger.info('fullscreen on:' + [this.tv.width, this.tv.height].join('x'));
      this.ui.fullscreen(true);
      this.webapis.avplay.setDisplayRect(0, 0, this.tv.width, this.tv.height);
    }
  }

  get url() {
    return this.playerUrl;
  }

  get state() {
    return this.webapis.avplay.getState();
  }

  get tv() {
    return this.m_tv;
  }

  set tv(val) {
    this.m_tv = val;
    this.updatePlayerScreen();
  }
}

export default Player;
