import { expect, appDom } from '../../test/helpers.js'

import Logger from './logger.js'

describe('Logger', () => {
  const element = appDom.window.document.getElementById('log');
  const logger = new Logger(element);

  beforeEach(() => {
    element.innerHTML = '';
  });

  it('creates a first message', () => {
    logger.info('Hello');
    expect(element.childElementCount).to.be.equal(1);
  });

  describe('when limit of lines is full', () => {
    beforeEach(() => {
      [...Array(logger.maxLines).keys()].forEach(num => {
        logger.info(`Line ${num}`);
      });

      logger.info(`Line 100`);
    });

    it('count of children equals allowed max', () => {
      expect(element.childElementCount).to.be.equal(logger.maxLines);
    });


    it('saves a new message', () => {
      expect(element.childNodes[logger.maxLines - 1].innerHTML).to.be.equal('Info: Line 100');
    });

    it('removes first message', () => {
      expect(element.childNodes[0].innerHTML).to.be.equal('Info: Line 1');
    });
  });
});
