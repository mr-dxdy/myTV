import Channel from './channel'
import Parser from './parser'
import Chain from './repository/chain'
import Playlist from './playlist.js'
import Settings from './settings.js'

class ChannelRepository {
  constructor(channels) {
    this.channels = channels;
  }

  startQuery() {
    return new Chain(this.channels);
  }

  static loadFromProfile(options = {}) {
    const playlistUrl = options.playlistUrl || Settings.profile.playlistUrl;
    const playlistPromise = Playlist.loadFromUrl(playlistUrl, options);

    return new Promise((resolve, reject) => {
      playlistPromise.then((playlist) => {
        const channelPromise = ChannelRepository.loadFromUrls(playlist.urls);

        channelPromise.then((repository) => { resolve(repository) })
        channelPromise.catch((xhr) => { reject(xhr) });
      });

      playlistPromise.catch((xhr) => { reject(xhr) });
    });
  }

  static loadFromUrls(urls, options = {}) {
    const parser = options.parser || new Parser();
    const parserPromise = parser.loadFromUrls(urls);

    return new Promise((resolve, reject) => {
      parserPromise.then((channelsJSON) => {
        const channels = channelsJSON.map((channelJSON) => { return new Channel(channelJSON); })
        resolve( new ChannelRepository(channels) );
      });

      parserPromise.catch((xhr) => { reject(xhr) });
    });
  }
}

export default ChannelRepository;
