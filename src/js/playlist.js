import data from './playlist.json'

class Playlist {
  constructor(data) {
    this.data = data;
  }

  get urls() {
    return this.data.map((item) => {
      return item.url;
    });
  }
}

export default new Playlist(data);
