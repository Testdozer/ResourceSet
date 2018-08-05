import * as path from "path";

export class PathParentIterator {
  constructor(
    private sep: string,
    private join: typeof path.join) {
  }

  public *paths(directory: string): IterableIterator<string> {
    for (let i = 0; i < directory.split(this.sep).length; i++) {
      const params = [directory];
      for (let j = 0; j < i ; j++) {
        params.push("..");
      }
      yield this.join(...params);
    }
  }
}
