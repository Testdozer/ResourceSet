/* tslint:disable:no-var-requires */
/* tslint:disable: no-require-imports */
const Jasmine = require("jasmine");
/* tslint:enable: no-require-imports */
/* tslint:enable:no-var-requires */

import * as modulemock from "mock-require";
import "reflect-metadata";

modulemock("@angular/core", "../node_modules/@angular/core-builds");
modulemock("@angular/core/src/di/reflective_provider", "../node_modules/@angular/core-builds");
modulemock("@angular/core/src/di/injection_token", "../node_modules/@angular/core-builds");

const jasmine = new Jasmine({}) as any;

jasmine.loadConfig({
  helpers: [
    "components/**/*.js"
  ],
  spec_dir: "./",
  spec_files: [
    "**/*.[uU]nit[tT]ests.js",
    "**/*.[uU]nit-[tT]ests.js",
    "**/*.[sS]pec.js"
  ]
});

jasmine.execute();
