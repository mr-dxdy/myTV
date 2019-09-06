import { expect } from '../../../test/helpers.js'

import Chain from './chain'

describe('Repository chain', () => {
  class Item {
    constructor(props) {
      this.name = props.name;
    }

    equal(other) {
      return this.name == other.name;
    }
  }

  describe('sort by', () => {
    const items = [
      new Item({ name: 'Item-D' }),
      new Item({ name: 'Item-A' }),
      new Item({ name: 'Item-C' })
    ];

    it('asc name', () => {
      const chain = new Chain(items);
      const sortedItems = chain.sortBy({ key: 'name', direction: 'asc' }).all();

      expect(sortedItems[0].equal(items[1])).to.be.equal(true)
      expect(sortedItems[1].equal(items[2])).to.be.equal(true)
      expect(sortedItems[2].equal(items[0])).to.be.equal(true)
    });

    it('desc name', () => {
      const chain = new Chain(items);
      const sortedItems = chain.sortBy({ key: 'name', direction: 'desc' }).all();

      expect(sortedItems[0].equal(items[0])).to.be.equal(true)
      expect(sortedItems[1].equal(items[2])).to.be.equal(true)
      expect(sortedItems[2].equal(items[1])).to.be.equal(true)
    });
  });

  describe('reject by', () => {
    const items = [
      new Item({ code: 3 }),
      new Item({ code: 2 }),
      new Item({ code: 1 })
    ];

    it('odd code', () => {
      const chain = new Chain(items);
      const selectedItems = chain.rejectBy((item) => { item.code % 2 != 0 }).all();

      expect(selectedItems[0].equal(items[0])).to.be.equal(true)
      expect(selectedItems[1].equal(items[2])).to.be.equal(true)
    });
  });
})
