import { Mock } from "moq.ts";
import * as path from "path";
import { PathParentIterator } from "./path-parent.iterator";

describe("Path Parent Iterator", () => {

  it("Returns parent paths", () => {
    const root = "C:/";
    const parent = `${root}path1/`;
    const directory = `${parent}path2/`;
    const dirname = new Mock<typeof path.dirname>()
      .setup(instance => instance(root))
      .returns(root)
      .setup(instance => instance(parent))
      .returns(root)
      .setup(instance => instance(directory))
      .returns(parent)
      .object();

    const provider = new PathParentIterator(dirname);
    const actual = [...provider.paths(directory)];

    const expected = [ directory, parent, root ];
    expect(actual).toEqual(expected);
  });

  it("Returns root path", () => {
    const root = "C:/";
    const dirname = new Mock<typeof path.dirname>()
      .setup(instance => instance(root))
      .returns(root)
      .object();

    const provider = new PathParentIterator(dirname);
    const actual = [...provider.paths(root)];

    const expected = [root ];
    expect(actual).toEqual(expected);
  });

});
