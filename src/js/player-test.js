import { expect, appDocument, NullWebapis } from '../../test/helpers.js'

import UI from './ui.js'
import Logger from './logger.js'
import Player from './player.js'
import Channel from './channel.js'

describe('Player', () => {
  def('channels', () => {
    return [
      new Channel({ url: '1-TV-url', name: "1-TV" }),
      new Channel({ url: '2-TV-url', name: "2-TV" }),
      new Channel({ url: '3-TV-url', name: "3-TV" })
    ];
  });

  def('logger', () => {
    return new Logger(appDocument.getElementById('log'))
  });

  def('ui', () => {
    const config = {
      document: appDocument,
      logger: $logger
    }

    var ui = new UI(config);
    ui.setChannels($channels);

    return ui;
  });

  def('player', () => {
    const config = {
      tv: {},
      ui: $ui,
      webapis: NullWebapis,
      logger: $logger
    };

    return new Player(config);
  });

  it('#updatePlayerScreen', () => {
    const result = [0, 0, 0, 0]; // left, right, top, bottom
    expect($player.updatePlayerScreen().length).to.be.equal(result.length);
  });


  it('#next', () => {
    $player.next();
    expect($ui.selectedChannel.dataset.name).to.be.equal('2-TV')
  });

  it('#prev', () => {
    $player.prev();
    expect($ui.selectedChannel.dataset.name).to.be.equal('3-TV')
  });

  it('#set4k', () => {
    $player.set4k(true);
    expect($logger.element.innerHTML).to.be.include('set 4k: true')
  });

  describe('#play', () => {
    it('when url is null', () => {
      $player.play();
      expect($ui.dom.message.innerHTML).to.be.equal('Play');
    });

    describe('when url is 2-TV', () => {
      beforeEach(() => {
        $player.play('2-TV-url');
      });

      it('#onbufferingstart', () => {
        $player.webapis.avplay.listeners.onbufferingstart();
        expect($logger.element.innerHTML).to.be.include('buffering start')
      });

      it('#onbufferingprogress', () => {
        $player.webapis.avplay.listeners.onbufferingprogress(34)
        expect($logger.element.innerHTML).to.be.include('buffering progress: 34')
      });

      it('#onbufferingcomplete', () => {
        $player.webapis.avplay.listeners.onbufferingcomplete();
        expect($logger.element.innerHTML).to.be.include('buffering complete')
      });

      it('#onevent', () => {
        $player.webapis.avplay.listeners.onevent('my-type', 'my-data');
        expect($logger.element.innerHTML).to.be.include('event type: my-type, data: my-data')
      });

      it('#onstreamcompleted', () => {
        $player.webapis.avplay.listeners.onstreamcompleted();

        expect($logger.element.innerHTML).to.be.include('stream compited')
        expect($logger.element.innerHTML).to.be.include('stop')
      });

      it('#onerror', () => {
        $player.webapis.avplay.listeners.onerror('custom-error');
        expect($logger.element.innerHTML).to.be.include('event error: custom-error')
      });
    });
  });

  it('#pause', () => {
    $player.pause();
    expect($logger.element.innerHTML).to.be.include('pause')
  });

  it('#stop', () => {
    $player.stop();
    expect($logger.element.innerHTML).to.be.include('stop')
  });

  it('#foward', () => {
    $player.foward(100);
    expect($logger.element.innerHTML).to.be.include('foward: 100')
  });

  it('#rewind', () => {
    $player.rewind(100);
    expect($logger.element.innerHTML).to.be.include('rewind: 100')
  });

  it('#setTrack', () => {
    $player.setTrack('my-type', 'my-index');
    expect($logger.element.innerHTML).to.be.include('set track: my-type my-index')
  });

  it('#getTracks', () => {
    const tracks = $player.getTracks();
    expect(Array.isArray(tracks)).to.be.equal(true)
  });

  it('#nextAudio', () => {
    $player.nextAudio();
    expect($logger.element.innerHTML).to.be.include('set audio: 1')
  });

  // describe('#enter', () => {
  //   it('when playing tv channel', () => {
  //   });
  // });

  describe('when player in fullscreen mode', () => {
    beforeEach(() => { $ui.fullscreen(true); })

    it('on command #next disables fullscreen mode', () => {
      $player.next();
      expect($ui.player).not.to.have.class('fullscreen')
    });

    it('on command #prev disables fullscreen mode', () => {
      $player.prev();
      expect($ui.player).not.to.have.class('fullscreen')
    });
  });
});
