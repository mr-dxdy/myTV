class FindInBlackList {
  constructor(props) {
    this.channel = props.channel;
  }

  perform() {
    const filters = [
      this.ignoreStaticStreaming
    ];

    let status = true;
    for(let filter of filters) {
      status = status && filter.call(this, this.channel);
    }

    return status;
  }

  ignoreStaticStreaming(channel) {
    return /\.mp4/i.test(channel.url);
  }
}

export default FindInBlackList;
