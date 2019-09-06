import DoPrettyName from './channel/do-pretty-name';
import FindInBlackList from './channel/find-in-black-list';

class Channel {
  constructor(props) {
    this.name = props.name;
    this.url = props.url;
  }

  get prettyName() {
    return new DoPrettyName({ name: this.name }).perform();
  }

  existsInBlackList() {
    return new FindInBlackList({ channel: this }).perform();
  }
}

export default Channel;
