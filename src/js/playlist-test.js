import { expect } from '../../test/helpers.js'

import Playlist from './playlist.js'

describe('Playlist', () => {
  it('returns urls', () => {
    expect(Playlist.urls.length).not.to.be.equal(0);
  });
});
