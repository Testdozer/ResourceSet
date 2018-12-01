/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Builder, BuilderConfiguration, BuilderContext, BuildEvent } from "@angular-devkit/architect";
import { getBrowserLoggingCb } from "@angular-devkit/build-angular";
import { WebpackConfigOptions } from "@angular-devkit/build-angular/src/angular-cli-files/models/build-options";
import {
  getAotConfig,
  getCommonConfig,
  getNonAotConfig,
  getServerConfig,
  getStatsConfig,
  getStylesConfig
} from "@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs";
import { readTsconfig } from "@angular-devkit/build-angular/src/angular-cli-files/utilities/read-tsconfig";
import { requireProjectModule } from "@angular-devkit/build-angular/src/angular-cli-files/utilities/require-project-module";
import { defaultProgress, normalizeFileReplacements } from "@angular-devkit/build-angular/src/utils";
import { WebpackBuilder } from "@angular-devkit/build-webpack";
import { getSystemPath, normalize, Path, resolve, virtualFs } from "@angular-devkit/core";
import { Stats } from "fs";
import { concat, Observable, of } from "rxjs";
import { concatMap, last, tap } from "rxjs/operators";
import * as ts from "typescript";
import { getElectronConfig } from "../webpack-configs/electron"; // tslint:disable-line:no-implicit-dependencies
import { BuildWebpackServerSchema } from "./schema";

const webpackMerge = require("webpack-merge");

export class MainProcessBuilder implements Builder<BuildWebpackServerSchema> {

  constructor(public context: BuilderContext) {
  }

  public run(builderConfig: BuilderConfiguration<BuildWebpackServerSchema>): Observable<BuildEvent> {
    const options = builderConfig.options;
    const root = this.context.workspace.root;
    const projectRoot = resolve(root, builderConfig.root);
    const host = new virtualFs.AliasHost(this.context.host as virtualFs.Host<Stats>) as virtualFs.Host<Stats>;
    const webpackBuilder = new WebpackBuilder({...this.context, host});

    // TODO: verify using of(null) to kickstart things is a pattern.
    return of(null).pipe(
      concatMap(() => options.deleteOutputPath
        ? this._deleteOutputDir(root, normalize(options.outputPath), this.context.host)
        : of(null)),
      concatMap(() => normalizeFileReplacements(options.fileReplacements, host, root)),
      tap(fileReplacements => options.fileReplacements = fileReplacements),
      concatMap(() => {
        const webpackConfig = this.buildWebpackConfig(root, projectRoot, host, options);
        return webpackBuilder.runWebpack(webpackConfig, getBrowserLoggingCb(options.verbose));
      })
    );
  }

  public buildWebpackConfig(root: Path, projectRoot: Path,
                            host: virtualFs.Host<Stats>,
                            options: BuildWebpackServerSchema) {
    let wco: WebpackConfigOptions;

    // TODO: make target defaults into configurations instead
    // options = this.addTargetDefaults(options);

    const tsConfigPath = getSystemPath(normalize(resolve(root, normalize(options.tsConfig))));
    const tsConfig = readTsconfig(tsConfigPath);

    const projectTs = requireProjectModule(getSystemPath(projectRoot), "typescript") as typeof ts;

    const supportES2015 = tsConfig.options.target !== projectTs.ScriptTarget.ES3
      && tsConfig.options.target !== projectTs.ScriptTarget.ES5;

    const buildOptions: typeof wco["buildOptions"] = {
      ...options as {} as typeof wco["buildOptions"]
    };

    wco = {
      root: getSystemPath(root),
      logger: this.context.logger,
      projectRoot: getSystemPath(projectRoot),
      // TODO: use only this.options, it contains all flags and configs items already.
      buildOptions: {
        ...buildOptions,
        buildOptimizer: false,
        // aot: true,
        platform: "server",
        scripts: [],
        styles: []
      },
      tsConfig,
      tsConfigPath,
      supportES2015
    };

    wco.buildOptions.progress = defaultProgress(wco.buildOptions.progress);

    const webpackConfigs: {}[] = [
      getCommonConfig(wco),
      getServerConfig(wco),
      getElectronConfig(wco),
      getStylesConfig(wco),
      getStatsConfig(wco)
    ];

    if (wco.buildOptions.main || wco.buildOptions.polyfills) {
      const typescriptConfigPartial = wco.buildOptions.aot
        ? getAotConfig(wco, host)
        : getNonAotConfig(wco, host);
      webpackConfigs.push(typescriptConfigPartial);
    }

    return webpackMerge(webpackConfigs);
  }

  private _deleteOutputDir(root: Path, outputPath: Path, host: virtualFs.Host) {
    const resolvedOutputPath = resolve(root, outputPath);
    if (resolvedOutputPath === root) {
      throw new Error("Output path MUST not be project root directory!");
    }

    return host.exists(resolvedOutputPath).pipe(
      concatMap(exists => exists
        // TODO: remove this concat once host ops emit an event.
        ? concat(host.delete(resolvedOutputPath), of(null)).pipe(last())
        // ? of(null)
        : of(null))
    );
  }
}

export default MainProcessBuilder;
