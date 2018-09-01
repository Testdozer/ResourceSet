import { It, Mock } from "moq.ts";
import * as path from "path";
import { PackageJsonExistsProvider } from "./package-json-exists.provider";
import { PackageJsonProvider } from "./package-json.provider";
import { PathParentIterator } from "./path-parent.iterator";

describe("Project name provider", () => {

  it("Returns project name", () => {
    const directory = "/";

    const sep = "/";
    const filePath = `${directory}${sep}package.json`;

    const join = new Mock<typeof path.join>()
      .setup(instance => instance(directory, "package.json"))
      .returns(filePath)
      .object();

    const pathParentIterator = new Mock<PathParentIterator>()
      .setup(instance => instance.paths(directory))
      .returns([directory])
      .object();

    const packageJsonExistsProvider = new Mock<PackageJsonExistsProvider>()
      .setup(instance => instance.isExists(directory))
      .returns(true)
      .object();

    const provider = new PackageJsonProvider(join, pathParentIterator, packageJsonExistsProvider);

    const actual = provider.get(directory);

    expect(actual).toBe(filePath);
  });

  it("Returns undefined when there is no package.json file", () => {
    const directory = "/";

    const sep = "/";
    const filePath = `${directory}${sep}package.json`;

    const join = new Mock<typeof path.join>()
      .setup(instance => instance(directory, "package.json"))
      .returns(filePath)
      .object();

    const pathParentIterator = new Mock<PathParentIterator>()
      .setup(instance => instance.paths(directory))
      .returns([directory])
      .object();

    const packageJsonExistsProvider = new Mock<PackageJsonExistsProvider>()
      .setup(instance => instance.isExists(directory))
      .returns(false)
      .object();

    const provider = new PackageJsonProvider(join, pathParentIterator, packageJsonExistsProvider);

    const actual = provider.get(directory);

    expect(actual).toBe(undefined);
  });

});
