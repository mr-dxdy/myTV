import { expect } from '../../../test/helpers.js'

import FindInBlackList from './find-in-black-list'
import Channel from '../channel'

describe('Channel service "Find in black list"', () => {
  const tests = [
    { channel: new Channel({ name: 'RTVI', url: 'http://myott.tv/stream/89GS19X9UJ/91.m3u8' }), result: false },
    { channel: new Channel({ name: 'Cat', url: 'https://my-site.site/assets/cat.mp4' }), result: true }
  ];

  for(let test of tests) {
    it(test.channel.name, () => {
      const service = new FindInBlackList({ channel: test.channel })
      expect(service.perform()).to.be.equal(test.result)
    });
  }
});
