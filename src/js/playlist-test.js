import xhrMock from 'xhr-mock';
import { expect, loadFixture } from '../../test/helpers.js'

import Playlist from './playlist.js'

describe('Playlist', () => {
  beforeEach(() => xhrMock.setup());
  afterEach(() => xhrMock.teardown());

  const data = JSON.parse( loadFixture('playlist.json') );

  it('returns urls', () => {
    const playlist = new Playlist(data);
    expect(playlist.urls.length).not.to.be.equal(0);
  });

  it('load from url', () => {
    xhrMock.get('/my-playlist.json', {
      status: 200,
      body: data
    })

    const promise = Playlist.loadFromUrl('/my-playlist.json', { crypted: false })
    promise.then((playlist) => {
      expect(playlist.urls.length).not.to.be.equal(0)
    });
  });
});
