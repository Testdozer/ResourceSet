import {app} from "electron";
import {Injectable} from "injection-js";
import {RendererWindow} from "./renderer-window";

@Injectable()
export class ElectronApp {
  constructor(
    private rendererWindow: RendererWindow) {

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
