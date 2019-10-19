import xhrMock from 'xhr-mock';
import { expect, loadFixture, create } from '../../test/helpers.js'

import Parser from './parser.js'

describe('Parser', () => {
  beforeEach(() => xhrMock.setup());
  afterEach(() => xhrMock.teardown());

  const webarmenPlaylist = create('webarmen-playlist')
  const sampoPlaylist = create('sampo-playlist')

  const webarmenM3U = loadFixture('webarmen.m3u');
  const sampoM3U = loadFixture('sampo.m3u');

  describe('file from site webarmen', () => {
    const parser = new Parser()
    const channels = parser.parse(webarmenM3U)
    const countChannelsInWebarmen = 121;

    it('detects all channels', () => {
      xhrMock.get(webarmenPlaylist.url, { status: 200, body: webarmenM3U })

      expect(channels.length).to.be.equal(countChannelsInWebarmen);
    });
  });

  describe('load channels from urls', () => {
    const urls = [webarmenPlaylist.url, sampoPlaylist.url];

    it('returns all channels', () => {
      xhrMock.get(webarmenPlaylist.url, { status: 200, body: webarmenM3U })
      xhrMock.get(sampoPlaylist.url, { status: 200, body: sampoM3U })

      const promise = new Parser().loadFromUrls(urls);
      promise.then((channels) => {
        expect(channels.length).not.to.equal(0)
      });
    });

  });
});
