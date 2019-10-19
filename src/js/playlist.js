import Crypt from './crypt.js'

class Playlist {
  constructor(data) {
    this.data = data;
  }

  get urls() {
    return this.data.map((item) => {
      return item.url;
    });
  }

  static loadFromUrl(url, options = {}) {
    if (!options.hasOwnProperty('crypted')) options.crypted = true;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
        var data = xhr.responseText;
        if (options.crypted) data = Crypt.decrypt(data);

        const parsedData = JSON.parse(data);
        resolve(new Playlist(parsedData));
      };

      xhr.onerror = () => reject(xhr);
      xhr.send(null);
    });
  }
}

export default Playlist;
