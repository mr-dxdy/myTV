import Logger from './logger.js'
import I18n from './i18n.js'

function int(number) {
  return Math.round(number);
}

class UI {
  constructor(props) {
    this.document = props.document;
    this.logger = props.logger;

    this.dom = {
      player: this.document.getElementById('av-player'),
      sidebar: this.document.querySelector('.sidebar'),
      channels: this.document.getElementById('channel-list'),
      message: this.document.getElementById('message')
    };

    this.logger.info('ready');

    this.messageTimeout = null;
    this.selectedChannel = null;
  }

  toogleLog() {
    this.logger.element.classList.toggle('hide');
  }

  playing(url) {
    var item = this.dom.channels.querySelector('li.playing');
    if (item) item.classList.remove('playing');
    if (!url) return;
    item = this.dom.channels.querySelector('li[data-url="' + url + '"]');
    if (item) {
      item.classList.add('playing');
      this.message( I18n.t("loading", { url: item.dataset.name }), 60000);
    }

    return item;
  }

  play() {
    this.message( I18n.t("Play") );
  }

  stop() {
    this.message( I18n.t("Stop") );
  }

  pause() {
    this.message( I18n.t("Pause") );
  }

  buffering(state, progress) {
    var message = this.dom.message;
    if (state == 'progress') {
      this.message( I18n.t("buffering", { progress: progress }) );
    } else if (state == 'complete') {
      this.message();
    }
  }

  message(data, timeout) {
    var message = this.dom.message;
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
    if (!data) return message.classList.add('hide');
    message.innerHTML = data;
    message.classList.remove('hide');
    this.messageTimeout = setTimeout(function() {
      message.classList.add('hide');
    }, timeout || 3000);
  }

  fullscreen(is) {
    this.dom.player.classList[is ? 'add' : 'remove']('fullscreen');
  }

  isFullscreen() {
    return this.dom.player.classList.contains('fullscreen');
  }

  setAudio(no) {
    this.message( I18n.t("audioTrack", { name: no }) );
  }

  setChannels(channels) {
    this.dom.channels.innerHTML = '';

    for (var channel of channels) {
      var li = this.document.createElement('li');

      li.dataset.name = channel.prettyName;
      li.dataset.url = channel.url;
      li.innerHTML = channel.prettyName;
      this.dom.channels.appendChild(li);
    }
    this.next();
  }

  next() {
    var channelList = this.dom.channels;
    if (!this.selectedChannel) {
      this.selectedChannel = channelList.firstChild;
    } else {
      this.selectedChannel.classList.remove('selected');
      this.selectedChannel = this.selectedChannel.nextSibling;
    }
    if (!this.selectedChannel) this.selectedChannel = channelList.firstChild;
    this.selectedChannel.classList.add('selected');
    this.scrollChannels();
  }

  prev() {
    var channelList = this.dom.channels;
    if (!this.selectedChannel) {
      this.selectedChannel = channelList.firstChild;
      this.selectedChannel.classList.add('selected');
    } else {
      this.selectedChannel.classList.remove('selected');
      this.selectedChannel = this.selectedChannel.previousSibling;
      if (!this.selectedChannel) this.selectedChannel = channelList.lastChild;
      this.selectedChannel.classList.add('selected');
    }
    this.scrollChannels();
  }

  scrollChannels() {
    var channelList = this.dom.channels;
    var sidebar = this.dom.sidebar;

    // Get element parameters
    var nodeList = [].slice.call(channelList.children);
    var itemIndex = nodeList.indexOf(this.selectedChannel);
    var itemHeight = this.selectedChannel.offsetHeight;
    var listHeight = sidebar.offsetHeight;
    var itemCount = int(listHeight / itemHeight);

    // Calculate scroll position
    var scroll =
      int(itemIndex * itemHeight) - int(itemHeight * (itemCount / 2));
    // scroll = scroll >= 0 ? scroll : 0;
    sidebar.scrollTop = scroll;
  }

  get player() {
    return this.dom.player;
  }

  get selectedChannel() {
    return this.m_selectedChannel;
  }

  set selectedChannel(channel) {
    this.m_selectedChannel = channel;
  }
}

export default UI;
