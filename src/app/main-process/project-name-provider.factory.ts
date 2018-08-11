import * as fs from "fs";
import * as path from "path";
import { PackageJsonExistsProvider } from "./package-json-exists.provider";
import { PackageJsonProvider } from "./package-json.provider";
import { PathParentIterator } from "./path-parent.iterator";
import { ProjectNameProvider } from "./project-name.provider";

export function projectNameProviderFactory () {

    return new ProjectNameProvider(
        new PackageJsonProvider(
            path.join,
            new PathParentIterator(path.dirname),
            new PackageJsonExistsProvider(path.join, fs.existsSync)
        ),
        fs.readFileSync,
        JSON.parse
    );

}
