class Logger {
  constructor(element) {
    this.element = element;
    this.maxLines = 16;
  }

  info(msg) {
    this.append('Info', msg);
  }

  append(level, msg) {
    this.element.innerHTML += `<p>${level}: ${msg}</p>`;
    this.element.scrollTop = this.element.scrollHeight;

    if (this.element.childElementCount > this.maxLines) {
      this.element.removeChild(this.element.firstChild);
    }
  }
}

export default Logger;
