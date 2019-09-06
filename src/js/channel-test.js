import { expect } from '../../test/helpers.js'

import Channel from './channel.js'

describe('Channel', () => {
  it('prettyName', () => {
    const props = { name: 'Q1 | MTV', url: 'my-mtv-url' };
    const channel = new Channel(props);

    expect(channel.prettyName).to.be.equal('MTV')
  });
});
