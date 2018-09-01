import * as fs from "fs";
import * as path from "path";

export class PackageJsonExistsProvider {
  constructor(
    private join: typeof path.join,
    private existsSync: typeof fs.existsSync) {
  }

  public isExists(directory: string): boolean {
    const filePath = this.join(directory, "package.json");

    return this.existsSync(filePath);
  }
}
