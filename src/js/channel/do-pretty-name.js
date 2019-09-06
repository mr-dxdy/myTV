class DoPrettyName {
  constructor(props) {
    this.name = props.name;
    this.delimiters = props.delimiters || this.defaultDelimiters();
  }

  perform() {
    const filters = [
      this.splitByDelimiters,
      this.doTrim
    ];

    for(let filter of filters) {
      this.name = filter.call(this, this.name);
    }

    return this.name;
  }

  defaultDelimiters() {
    return ['|'];
  }

  splitByDelimiters(name) {
    let splitedName = name;

    for(let delimiter of this.delimiters) {
      let splited = splitedName.split(delimiter);
      splitedName = splited[splited.length - 1];
    }

    return splitedName;
  }

  doTrim(name) {
    return name.trim();
  }
}

export default DoPrettyName;
