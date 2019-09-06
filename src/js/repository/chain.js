class Chain {
  constructor(items) {
    this.items = [...items];
  }

  sortBy(options) {
    const { key, direction } = options;

    const sorter = (a, b) => {
      if (a[key] > b[key]) { return 1; }
      if (a[key] < b[key]) { return -1; }
      return 0;
    }

    const koeff = direction == 'asc' ? 1 : -1;
    this.items = this.items.sort((a, b) => koeff * sorter(a, b) );

    return this;
  }

  rejectBy(condition) {
    this.items = this.items.filter((item) => !condition(item) );
    return this;
  }

  all() {
    return this.items;
  }
}

export default Chain;
