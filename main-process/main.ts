import "core-js/es7/reflect";
import { ipcMain } from "electron";
import { ReflectiveInjector } from "injection-js";
import "zone.js/dist/zone-node";
import { SerializableActionDeserializer } from "../src/app/core.module/services/serializable-action.deserializer/serializable-action.deserializer";
import { Bootstrap } from "./core/bootstrap";
import { ElectronApp } from "./core/electron.app";
import { RendererWindow } from "./core/renderer-window";
import { MessageBus } from "./message-bus/message.bus";
import { OpenProjectMessageHandler } from "./message-bus/open-project.message-handler";
import { projectNameProviderFactory } from "./package-name/project-name-provider.factory";
import { ProjectNameProvider } from "./package-name/project-name.provider";

const args = process.argv.slice(1);
const serve = args.some(val => val === "--serve");

const injector = ReflectiveInjector.resolveAndCreate([
  ElectronApp,
  {provide: RendererWindow, useFactory: () => new RendererWindow(serve), deps: []},
  /* tslint:disable:no-var-requires */
  /* tslint:disable: no-require-imports */
  {
    provide: MessageBus,
    useFactory: deserializer => new MessageBus(ipcMain, deserializer),
    deps: [SerializableActionDeserializer]
  },
  /* tslint:enable: no-require-imports */
  /* tslint:enable:no-var-requires */
  OpenProjectMessageHandler,
  SerializableActionDeserializer,
  {provide: ProjectNameProvider, useFactory: projectNameProviderFactory, deps: []},
  {
    provide: Bootstrap, useFactory: (...services) => new Bootstrap(services), deps: [
      ElectronApp,
      OpenProjectMessageHandler
    ]
  }
]);

const instance = injector.get(Bootstrap) as Bootstrap;
instance.run();
