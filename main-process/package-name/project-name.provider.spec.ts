import * as fs from "fs";
import { Mock } from "moq.ts";
import { PackageJsonProvider } from "./package-json.provider";
import { ProjectNameProvider } from "./project-name.provider";

describe("Project name provider", () => {

  it("Return project name", () => {
    const directory = "path to folder";

    const sep = "/";
    const filePath = `${directory}${sep}package.json`;
    const projectName = "project name";
    const fileContent = "package.json content";

    const packageJsonProvider = new Mock<PackageJsonProvider>()
      .setup(instance => instance.get(directory))
      .returns(filePath)
      .object();

    const readFileSync = new Mock< typeof fs.readFileSync>()
      .setup(instance => instance(filePath, "utf8"))
      .returns(fileContent)
      .object();

    const jsonParse = new Mock< typeof JSON.parse>()
      .setup(instance => instance(fileContent))
      .returns({name: projectName})
      .object();

    const provider = new ProjectNameProvider(packageJsonProvider, readFileSync, jsonParse);

    const actual = provider.get(directory);

    expect(actual).toBe(projectName);
  });

  it("Return undefined when package.json not found", () => {
    const directory = "path to folder";

    const packageJsonProvider = new Mock<PackageJsonProvider>()
      .setup(instance => instance.get(directory))
      .returns(undefined)
      .object();

    const provider = new ProjectNameProvider(packageJsonProvider, undefined, undefined);

    const actual = provider.get(directory);

    expect(actual).toBe(undefined);
  });
});
