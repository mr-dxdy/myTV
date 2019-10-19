import M3U8FileParser from 'm3u8-file-parser'

class Parser {
  loadFromUrl(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
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
    const promises = urls.map((url) => { return this.loadFromUrl(url); });

    return new Promise((resolve, reject) => {
      const promise = Promise.all(promises);

      promise.then((responses) => {
        const channels = Object.keys(responses).reduce((channels, resKey) => {
          return channels.concat(responses[resKey]);
        }, []);

        resolve(channels);
      });

      promise.catch((xhr) => reject(xhr));
    });
  }

  parse(content) {
    const reader = new M3U8FileParser();
    reader.read(content);

    return reader.getResult().segments.map((segment) => {
      return { name: segment.inf.title, url: segment.url };
    });
  }
}

export default Parser;
