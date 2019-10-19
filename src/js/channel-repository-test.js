import xhrMock from 'xhr-mock';
import { expect, create, loadFixture } from '../../test/helpers.js'

import ChannelRepository from './channel-repository.js'

describe('Channel repository', () => {
  beforeEach(() => xhrMock.setup());
  afterEach(() => xhrMock.teardown());

  const webarmenPlaylist = create('webarmen-playlist')
  const sampoPlaylist = create('sampo-playlist')

  const webarmenM3U = loadFixture('webarmen.m3u');
  const sampoM3U = loadFixture('sampo.m3u');
  const playlist = JSON.parse(loadFixture('playlist.json'));

  describe('load channels from urls', () => {
    const urls = [webarmenPlaylist.url, sampoPlaylist.url];

    it('returns repository', () => {
      xhrMock.get(webarmenPlaylist.url, { status: 200, body: webarmenM3U })
      xhrMock.get(sampoPlaylist.url, { status: 200, body: sampoM3U })

      const promise = ChannelRepository.loadFromUrls(urls);

      promise.then((repository) => {
        expect(repository.channels.length).not.to.equal(0)
      });
    });
  });

  describe('loadFromProfile', () => {
    it('returns playlist from profile', () => {
      xhrMock.get(webarmenPlaylist.url, { status: 200, body: webarmenM3U })
      xhrMock.get('/profile/playlist.json', { status: 200, body: playlist })

      const promise = ChannelRepository.loadFromProfile({ playlistUrl: '/profile/playlist.json', crypted: false })

      promise.then((repository) => {
        expect(repository.channels.length).not.to.equal(0)
      });
    });
  });
});
