import { expect } from '../../test/helpers.js'
import { XMLHttpRequest as NodeXmlHttpRequest } from 'xmlhttprequest'

import Parser from './parser.js'
import ChannelRepository from './channel-repository.js'

describe('Channel repository', () => {
  const parser = new Parser({
    adapter: NodeXmlHttpRequest
  });

  describe('load channels from urls', () => {
    const urls = [
      'https://webarmen.com/my/iptv/auto.nogrp.q.m3u',
      'http://iptv.sampo.ru/iptv.m3u'
    ];

    it('returns all channels', () => {
      const promise = ChannelRepository.loadFromUrls(urls, { parser: parser });

      promise.then((channels) => {
        expect(channels.length).not.to.equal(0)
      });
    });

  });
});
