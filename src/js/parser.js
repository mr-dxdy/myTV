import M3U8FileParser from 'm3u8-file-parser'

class Parser {
  constructor(props = {}) {
    this.adapter = props.adapter || window.XMLHttpRequest;
  }

  loadFromUrl(url) {
    return new Promise((resolve, reject) => {
      const xhr = new this.adapter();
      xhr.open('GET', url);
      xhr.onload = () => {
        const channels = this.parse(xhr.responseText);
        resolve(channels);
      };

      xhr.onerror = () => reject(xhr);
      xhr.send(null);
    });
  }

  loadFromUrls(urls) {
    const promises = urls.map(function(url) {
      return this.loadFromUrl(url);
    }.bind(this));

    return new Promise((resolve, reject) => {
      const promise = Promise.all(promises);

      promise.then((responses) => {
        const channels = Object.keys(responses).reduce((channels, resKey) => {
          return { ...channels, ...responses[resKey] };
        }, {});

        resolve(channels);
      });

      promise.catch((xhr) => reject(xhr));
    });
  }

  parse(content) {
    const reader = new M3U8FileParser();
    reader.read(content);

    var channels = {};
    reader.getResult().segments.forEach((segment) => {
      channels[segment.inf.title] = {
        name: segment.inf.title,
        url: segment.url
      }
    });

    return channels
  }
}

export default Parser;
