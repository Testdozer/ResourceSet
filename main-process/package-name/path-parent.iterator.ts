import * as path from "path";

export class PathParentIterator {
  constructor(
    private dirname: typeof path.dirname) {
  }

  public* paths(directory: string): IterableIterator<string> {
    let current = directory;
    yield current;
    while (true) {
      const parent = this.dirname(current);
      if (parent === current) {
        return;
      }
      current = parent;
      yield current;
    }
  }
}
