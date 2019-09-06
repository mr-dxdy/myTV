import { expect, appDocument, NullWebapis, NullTizen } from '../../test/helpers.js'

import App from './app.js'

describe('App', () => {
  it('registerKeys', () => {
    const app = new App({
      document: appDocument,
      webapis: NullWebapis,
      tizen: NullTizen
    })

    expect(NullTizen.tvinputdevice.registerKeys.length).to.be.equal(app.usedKeys.length)
  });
});
