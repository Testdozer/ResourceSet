import { cold } from "../../../../node_modules/jasmine-marbles";
import { It } from "../../../../node_modules/moq.ts";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../unit-tests.components/moq/equal";
import { DialogElectron } from "./electron/dialog.electron";
import { SelectFolderService } from "./select-folder.service";

describe("Select folder service", () => {

  beforeEach(() => {
    createInjector(SelectFolderService);
  });

  it("Should be resolved", () => {
    const actual = get<SelectFolderService>();
    expect(actual).toEqual(jasmine.any(SelectFolderService));
  });

  it("Returns path for selected folder", () => {
    const path = "path";

    resolve<DialogElectron>(DialogElectron)
      .setup(instance => instance.showOpenDialog(Is.Eq<any>({properties: ["openDirectory"]}), It.IsAny()))
      .callback((arg, func: (filePaths: string[], bookmarks: string[]) => void) => {
        func([path], undefined);
      });

    const service = get<SelectFolderService>();
    const actual$ = service.select();
    const expected$ = cold("(a|", { a: path });
    expect(actual$).toBeObservable(expected$);
  });
});
