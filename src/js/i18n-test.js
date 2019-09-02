import { expect } from '../../test/helpers.js'

import I18n from './i18n.js';

describe('I18n', () => {
  it('translate word Pause', () => {
    const type = typeof I18n.t('pause')
    expect(type).to.be.equal('string');
  });
});
