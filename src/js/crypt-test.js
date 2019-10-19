import { expect } from '../../test/helpers.js'

import Settings from './settings.js'
import Crypt from './crypt.js'

describe('Crypt', () => {
  it('encrypt and decrypt', () => {
    const text = 'hello world'
    const encryptedText = Crypt.encrypt(text);

    expect(Crypt.decrypt(encryptedText)).to.be.equal(text);
  });
});
