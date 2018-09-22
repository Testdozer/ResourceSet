import * as fs from "fs";
import { Injectable } from "injection-js";
import { PackageJsonProvider } from "./package-json.provider";

@Injectable()
export class ProjectNameProvider {

  constructor(
    private packageJsonProvider: PackageJsonProvider,
    private readFileSync: typeof fs.readFileSync,
    private jsonParse: typeof JSON.parse) {
  }

  public get(directory: string): string {
    const fileName = this.packageJsonProvider.get(directory);
    if (fileName === undefined) {
      return undefined;
    }
    const content = this.readFileSync(fileName, "utf8");
    const manifest = this.jsonParse(content);
    return manifest.name;
  }
}
