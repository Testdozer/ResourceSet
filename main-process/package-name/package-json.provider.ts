import * as path from "path";
import { PackageJsonExistsProvider } from "./package-json-exists.provider";
import { PathParentIterator } from "./path-parent.iterator";

export class PackageJsonProvider {
  constructor(
    private join: typeof path.join,
    private pathParentIterator: PathParentIterator,
    private packageJsonExistsProvider: PackageJsonExistsProvider) {
  }

  public get(directory: string): string {
    for (const parent of this.pathParentIterator.paths(directory)) {
      if (this.packageJsonExistsProvider.isExists(parent)) {
        return this.join(parent, "package.json");
      }
    }
    return undefined;
  }
}
