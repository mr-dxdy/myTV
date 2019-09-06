import { expect } from '../../../test/helpers.js'

import DoPrettyName from './do-pretty-name'

describe('Channel service "Do pretty name"', () => {
  const tests = [
    { name: '1TV', result: '1TV' },
    { name: 'Q4 | Первый канал', result: 'Первый канал' },
    { name: '| Paramount Comedy",Q5 | Paramount Comedy', result: 'Paramount Comedy' }
  ];

  for(let test of tests) {
    it(test.name, () => {
      const service = new DoPrettyName({ name: test.name })
      expect(service.perform()).to.be.equal(test.result)
    });
  }
});
