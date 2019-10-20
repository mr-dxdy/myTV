import aesjs from 'aes-js'

import Settings from './settings.js'

const key = aesjs.utils.utf8.toBytes(Settings.crypt.passwordMD5);
const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

class Crypt {
  static encrypt(text) {
    const textBytes = aesjs.utils.utf8.toBytes(text);
    const encryptedBytes = aesCtr.encrypt(textBytes);

    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  static decrypt(encryptedHex) {
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);

    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }
}

export default Crypt;
