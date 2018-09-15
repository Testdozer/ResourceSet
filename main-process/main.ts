import "core-js/es7/reflect";
import {ReflectiveInjector} from "injection-js";
import "zone.js/dist/zone-node";
import {ElectronApp} from "./core/electron.app";
import {MessageBus} from "./core/message.bus";
import {RendererWindow} from "./core/renderer-window";

const args = process.argv.slice(1);
const serve = args.some(val => val === "--serve");

const injector = ReflectiveInjector.resolveAndCreate([
  ElectronApp,
  {provide: RendererWindow, useFactory: () => new RendererWindow(serve), deps: []},
  /* tslint:disable:no-var-requires */
  /* tslint:disable: no-require-imports */
  {provide: MessageBus, useFactory: () => new MessageBus(require("electron").ipcMain)}
  /* tslint:enable: no-require-imports */
  /* tslint:enable:no-var-requires */

]);

const instance = injector.get(ElectronApp);
