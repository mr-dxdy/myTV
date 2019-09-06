import Channel from './channel'
import Parser from './parser'
import Chain from './repository/chain'

class ChannelRepository {
  constructor(channels) {
    this.channels = channels;
  }

  startQuery() {
    return new Chain(this.channels);
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
