import "core-js/es7/reflect";
import { ipcMain } from "electron";
import {ReflectiveInjector} from "injection-js";
import "zone.js/dist/zone-node";
import {ElectronApp} from "./core/electron.app";
import {RendererWindow} from "./core/renderer-window";
import { ActionBuilder } from "./message-bus/action-builder";
import { MessageBusHost } from "./message-bus/message-bus-host";
import { MessageBus } from "./message-bus/message.bus";
import { projectNameProviderFactory } from "./package-name/project-name-provider.factory";
import { ProjectNameProvider } from "./package-name/project-name.provider";

const args = process.argv.slice(1);
const serve = args.some(val => val === "--serve");

const injector = ReflectiveInjector.resolveAndCreate([
  ElectronApp,
  MessageBusHost,
  ActionBuilder,
  {provide: RendererWindow, useFactory: () => new RendererWindow(serve), deps: []},
  /* tslint:disable:no-var-requires */
  /* tslint:disable: no-require-imports */
  {provide: MessageBus, useFactory: () => new MessageBus(ipcMain), deps: []},
  /* tslint:enable: no-require-imports */
  /* tslint:enable:no-var-requires */
  {provide: ProjectNameProvider, useFactory: projectNameProviderFactory, deps: []}
]);

const instance = injector.get(ElectronApp);
