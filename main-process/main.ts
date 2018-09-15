import "core-js/es7/reflect";
import {ReflectiveInjector} from "injection-js";
import "zone.js/dist/zone-node";
import {ElectronApp} from "./electron.app";
import {RendererWindow} from "./renderer-window";

const args = process.argv.slice(1);
const serve = args.some(val => val === "--serve");

const injector = ReflectiveInjector.resolveAndCreate([
  ElectronApp,
  {provide: RendererWindow, useFactory: () => new RendererWindow(serve), deps: []}
]);

const instance = injector.get(ElectronApp);
