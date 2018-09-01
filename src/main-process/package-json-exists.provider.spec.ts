import * as fs from "fs";
import { Mock } from "moq.ts";
import * as path from "path";
import { PackageJsonExistsProvider } from "./package-json-exists.provider";

describe("Package Json Exists Provider", () => {

  it("Returns true if file exist", () => {
    const directory = "/";
    const fileExist = true;

    const sep = "/";
    const filePath = `${directory}${sep}package.json`;

    const join = new Mock<typeof path.join>()
      .setup(instance => instance(directory, "package.json"))
      .returns(filePath)
      .object();

    const existsSync = new Mock<typeof fs.existsSync>()
        .setup(instance => instance(filePath))
        .returns(fileExist)
        .object();

    const provider = new PackageJsonExistsProvider(join, existsSync);

    const actual = provider.isExists(directory);

    expect(actual).toBe(true);
  });

  it("Returns false if file does not exist", () => {
    const directory = "/";
    const fileExist = false;

    const sep = "/";
    const filePath = `${directory}${sep}package.json`;

    const join = new Mock<typeof path.join>()
      .setup(instance => instance(directory, "package.json"))
      .returns(filePath)
      .object();

    const existsSync = new Mock<typeof fs.existsSync>()
        .setup(instance => instance(filePath))
        .returns(fileExist)
        .object();

    const provider = new PackageJsonExistsProvider(join, existsSync);

    const actual = provider.isExists(directory);

    expect(actual).toBe(false);
  });

});
