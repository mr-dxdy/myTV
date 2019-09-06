const fs = require('fs');
const JSDOM = require('jsdom').JSDOM;
const chaiDom = require('chai-dom');
const chai = require('chai');
const sinon = require('sinon');

chai.use(chaiDom);

function loadFixture(filename) {
  return fs.readFileSync(__dirname + '/fixtures/' + filename, 'utf8');
}

const NullWebapis = {
  avplay: {
    setDisplayRect: function() {},
    play: function() {},
    stop: function() {},
    open: function(url) {},
    close: function() {},
    pause: function() {},
    jumpForward: function(num) {},
    jumpBackward: function(num) {},
    setSelectTrack: function(val) {},
    setStreamingProperty: function(key, val) {},
    getTotalTrackInfo: function() {
      return [];
    },
    setListener: function(listeners) {
      this.listeners = listeners;
    },
    setDisplayMethod: function(mode) {},
    prepareAsync: function() {}
  }
};

const NullTizen = {
  systeminfo: {
    getPropertyValue: function(value, callback) {}
  },
  tvinputdevice: {
    registerKeys: [],
    registerKey: function(key) {
      this.registerKeys.push(key);
    }
  }
};

const appDom = new JSDOM(`
  <body>
    <div class="section">
      <div class="sidebar">
        <ul id="channel-list"></ul>
      </div>
      <div class="screen">
        <div class="info">
          <div id="message" class="hide"></div>
        </div>
        <object id="av-player" type="application/avplayer"></object>
      </div>
    </div>
    <div id="log" class="hide"></div>
  </body>
`);

module.exports = {
  loadFixture: loadFixture,
  appDom: appDom,
  appDocument: appDom.window.document,
  expect: chai.expect,
  JSDOM: JSDOM,
  sinon: sinon,
  NullWebapis: NullWebapis,
  NullTizen: NullTizen
};
