import { expect, appDom } from '../../test/helpers.js'

import Logger from './logger.js'
import UI from './ui.js'
import Channel from './channel.js'

describe('UI', () => {
  const logElement = appDom.window.document.getElementById('log');

  const config = {
    document: appDom.window.document,
    logger: new Logger(logElement)
  };

  const ui = new UI(config);
  const message = appDom.window.document.getElementById('message');
  const player = appDom.window.document.getElementById('av-player');
  const channelList = appDom.window.document.getElementById('channel-list');

  it('play', () => {
    ui.play();
    expect(message.innerHTML).to.be.equal('Play');
  });

  it('toogleLog', () => {
    ui.toogleLog();
    expect(logElement).not.to.have.class('hide')
    ui.toogleLog();
    expect(logElement).to.have.class('hide')
  });

  it('stop', () => {
    ui.stop();
    expect(message.innerHTML).to.be.equal('Stop');
  });

  it('pause', () => {
    ui.pause();
    expect(message.innerHTML).to.be.equal('Pause');
  });

  describe('buffering', () => {
    it('state is progress', () => {
      ui.buffering('progress', 50);
      expect(message.innerHTML).to.be.equal('Buffering: 50%')
    });

    it('state is complete', () => {
      ui.buffering('complete');
      expect(message).to.have.class('hide');
    });
  });

  describe('fullscreen', () => {
    it('is true', () => {
      ui.fullscreen(true);
      expect(player).to.have.class('fullscreen')
    });

    it('is false', () => {
      ui.fullscreen(false);
      expect(player).not.to.have.class('fullscreen')
    });
  });

  it('setAudio', () => {
    ui.setAudio('mp3');
    expect(message.innerHTML).to.be.equal('Audio Track: mp3')
  });

  describe('setChannels', () => {
    const channels = [ new Channel({ url: 'mtv-url', name: "MTV" }) ];

    xit('channels is empty array', () => {
      ui.setChannels({})
      expect(channelList.innerHTML).to.be.equal('')
    });

    it('channels is one channel', () => {
      ui.setChannels(channels);
      expect(channelList.innerHTML).to.be.equal('<li data-name="MTV" data-url="mtv-url" class="selected">MTV</li>')
    });
  });

  describe('channels', () => {
    const channels = [
      new Channel({ url: '1-TV-url', name: "1-TV" }),
      new Channel({ url: '2-TV-url', name: "2-TV" }),
      new Channel({ url: '3-TV-url', name: "3-TV" })
    ];

    beforeEach(() => { ui.setChannels(channels) });
    afterEach(() => { channelList.innerHTML = ''; });

    it('next', () => {
      const resultHTML = [
        '<li data-name="1-TV" data-url="1-TV-url" class="">1-TV</li>',
        '<li data-name="2-TV" data-url="2-TV-url" class="selected">2-TV</li>',
        '<li data-name="3-TV" data-url="3-TV-url">3-TV</li>'
      ].join('');

      ui.next();
      expect(channelList.innerHTML).to.be.equal(resultHTML);
    });

    it('prev', () => {
      const resultHTML = [
        '<li data-name="1-TV" data-url="1-TV-url" class="">1-TV</li>',
        '<li data-name="2-TV" data-url="2-TV-url">2-TV</li>',
        '<li data-name="3-TV" data-url="3-TV-url" class="selected">3-TV</li>'
      ].join('');

      ui.prev();
      expect(channelList.innerHTML).to.be.equal(resultHTML);
    });

    it('get selected channel', () => {
      expect(ui.selectedChannel.dataset.name).to.be.equal("1-TV")
    });

    it('playing', () => {
      const resultHTML = [
        '<li data-name="1-TV" data-url="1-TV-url" class="selected playing">1-TV</li>',
        '<li data-name="2-TV" data-url="2-TV-url">2-TV</li>',
        '<li data-name="3-TV" data-url="3-TV-url">3-TV</li>'
      ].join('');

      ui.playing('1-TV-url');
      expect(message.innerHTML).to.be.equal('Loading "1-TV"...')
      expect(channelList.innerHTML).to.be.equal(resultHTML);
    });
  });
});
