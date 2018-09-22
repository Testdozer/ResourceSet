import { WebpackConfigOptions } from "@angular-devkit/build-angular/src/angular-cli-files/models/build-options";

var nodeExternals = require("webpack-node-externals");

export function getElectronConfig(wco: WebpackConfigOptions) {

  const config: any = {
    target: "electron-main",
    node: {
      __dirname: false,
      __filename: false
    },
  };

  if (wco.buildOptions.bundleDependencies == "all") {
    config.externals = [nodeExternals({
      // this WILL include `jquery` and `webpack/hot/dev-server` in the bundle, as well as `lodash/*`
      whitelist: [
        /^zone\.js/,
        /^core-js/,
        /^injection-js/,
        /^@ngrx/,
        /^mssql/,
        /^tedious/,
        /^rxjs/,
        /^babel-runtime/,
        /^sprintf-js/
      ]
    })];
  }

  return config;
}
