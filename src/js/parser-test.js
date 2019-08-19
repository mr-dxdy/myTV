import { expect, loadFixture } from '../../test/helpers.js'
import { XMLHttpRequest as NodeXmlHttpRequest } from 'xmlhttprequest'

import Parser from './parser.js'

describe('Parser', () => {
  const parser = new Parser({
    adapter: NodeXmlHttpRequest
  });

  describe('file from site webarmen', () => {
    const m3uContent = loadFixture('webarmen.m3u');
    const channels = parser.parse(m3uContent)
    const countChannelsInWebarmen = 121;

    it('detects all channels', () => {
      expect(Object.keys(channels).length).to.be.equal(countChannelsInWebarmen);
    });
  });

  describe('load channels from urls', () => {
    const urls = [
      'https://webarmen.com/my/iptv/auto.nogrp.q.m3u',
      'http://iptv.sampo.ru/iptv.m3u'
    ];

    it('returns all channels', () => {
      const promise = parser.loadFromUrls(urls);
      promise.then((channels) => {
        expect(Object.keys(channels).length).not.to.equal(0)
      });
    });

  });
});
