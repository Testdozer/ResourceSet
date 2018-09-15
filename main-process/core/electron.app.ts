import {app} from "electron";
import {Injectable} from "injection-js";
import { MessageBusHost } from "../message-bus/message-bus-host";
import {RendererWindow} from "./renderer-window";

@Injectable()
export class ElectronApp {
  constructor(
    private rendererWindow: RendererWindow,
    private messageBusHost: MessageBusHost) {

    this.messageBusHost.start();

    try {
      app.on("ready", rendererWindow.createWindow);
      app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
          app.quit();
        }
      });

      app.on("activate", rendererWindow.createWindow);

    } catch (e) {
      return undefined;
    }
  }
}
