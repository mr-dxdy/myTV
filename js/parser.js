'use strict';

var Parser = (function() {
  return {
    // Very simple m3u parser
    parse: function(data) {
      var lastName;
      var channels = {};
      data = data.split('\r\n');
      for (var i in data) {
        var line = data[i];
        if (line.indexOf('#EXTINF:') != -1) {
          var set = line.split(':')[1].split(',');
          var name = set[1];
          channels[name] = { no: set[0], name: name };
          lastName = name;
        } else if (line.indexOf('http') != -1 && lastName) {
          channels[lastName].url = line;
          lastName = null;
        }
      }
      return channels;
    }
  };
}());
