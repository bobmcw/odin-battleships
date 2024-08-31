export class ship {
  constructor(length) {
    if (length > 4 || length < 1 || length % 1 != 0) {
      throw new Error("Invalid ship length");
    }
    this.length = length;
    this.hits = 0;
  }
  hit() {
    this.hits = this.hits + 1;
  }
  isSunk() {
    return this.hits >= this.length ? true : false;
  }
  length() {
    return this.length;
  }
}
