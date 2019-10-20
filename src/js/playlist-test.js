import xhrMock from 'xhr-mock';
import { expect, loadFixture } from '../../test/helpers.js'

import Playlist from './playlist.js'

describe('Playlist', () => {
  beforeEach(() => xhrMock.setup());
  afterEach(() => xhrMock.teardown());

  const dataRaw = loadFixture('playlist.json');
  const data = JSON.parse(dataRaw)

  it('returns urls', () => {
    const playlist = new Playlist(data);
    expect(playlist.urls.length).not.to.be.equal(0);
  });

  it('load from url', () => {
    xhrMock.get('/my-playlist.json', { status: 200, body: dataRaw });

    const promise = Playlist.loadFromUrl('/my-playlist.json', { crypted: false })
    promise.then((playlist) => {
      expect(playlist.urls.length).not.to.be.equal(0)
    });
  });
});
