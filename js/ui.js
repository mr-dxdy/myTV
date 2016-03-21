'use strict';

var UI = (function() {

  // Globals
  var log, selectedChannel, messageTimeout;
  var dom = {};

  function scrollChannels() {

    var channelList = dom.channels;
    var sidebar = dom.sidebar;
    
    // Get element parameters
    var nodeList = [].slice.call(channelList.children);
    var itemIndex = nodeList.indexOf(selectedChannel);
    var itemHeight = selectedChannel.offsetHeight;
    var listHeight = sidebar.offsetHeight;
    var itemCount = int(listHeight / itemHeight);
    
    // Calculate scroll position
    var scroll =
      int(itemIndex * itemHeight) - int(itemHeight * (itemCount / 2));
    // scroll = scroll >= 0 ? scroll : 0;
    sidebar.scrollTop = scroll;

  }

  // Round shortcut
  function int(number) {
    return Math.round(number);
  }

  // Return UI API
  return {
    init: function() {
      dom = {
        player: document.getElementById('av-player'),
        sidebar: document.querySelector('.sidebar'),
        channels: document.getElementById('channel-list'),
        message: document.getElementById('message'),
        log: document.getElementById('log')
      };
      log = new Logger('ui');
      log('ready');
    },
    playing: function(url) {
      var item;
      item = dom.channels.querySelector('li.playing');
      if (item) item.classList.remove('playing');
      if (!url) return;
      item = dom.channels.querySelector('li[data-url="' + url + '"]');
      if (item) item.classList.add('playing');
      this.message('Loading "' + item.dataset.name + '"...', 60000);
    },
    play: function() {
      this.message('Play');
    },
    stop: function() {
      this.message('Stop');
    },
    pause: function() {
      this.message('Pause');
    },
    buffering: function(state, data) {
      var message = dom.message;
      if (state == 'progress') {
        this.message('Buffering: ' + data + '%');
      } else if (state == 'complete') {
        this.message();
      }
    },
    message: function(data, timeout) {
      var message = dom.message;
      if (messageTimeout) clearTimeout(messageTimeout);
      if (!data) return message.classList.add('hide');
      message.innerHTML = data;
      message.classList.remove('hide');
      messageTimeout = setTimeout(function() {
        message.classList.add('hide');
      }, timeout || 3000);
    },
    fullscreen: function(is) {
      dom.player.classList[is ? 'add' : 'remove']('fullscreen');
    },
    setAudio: function(no) {
      this.message('Audio Track: ' + no);
    },
    // Set channel list
    setChannels: function(chennelList) {
      var channels = dom.channels;
      channels.innerHTML = '';
      for (var item in chennelList) {
        var li = document.createElement('li');
        item = chennelList[item];
        li.dataset.name = item.name;
        li.dataset.url = item.url;
        li.innerHTML = item.name;
        channels.appendChild(li);
      }
      this.next();
    },
    next: function() {
      var channelList = dom.channels;
      if (!selectedChannel) {
        selectedChannel = channelList.firstChild;
      } else {
        selectedChannel.classList.remove('selected');
        selectedChannel = selectedChannel.nextSibling;
      }
      if (!selectedChannel) selectedChannel = channelList.firstChild;
      selectedChannel.classList.add('selected');
      scrollChannels();
    },
    prev: function() {
      var channelList = dom.channels;
      if (!selectedChannel) {
        selectedChannel = channelList.firstChild;
        selectedChannel.classList.add('selected');
      } else {
        selectedChannel.classList.remove('selected');
        selectedChannel = selectedChannel.previousSibling;
        if (!selectedChannel) selectedChannel = channelList.lastChild;
        selectedChannel.classList.add('selected');
      }
      scrollChannels();
    },
    get: function(name) {
      return dom[name];
    },
    get channel() {
      return selectedChannel.dataset;
    },
  };
  
}());
