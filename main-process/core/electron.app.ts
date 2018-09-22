import { app } from "electron";
import { Injectable } from "injection-js";
import { Initializable } from "./core";
import { RendererWindow } from "./renderer-window";

@Injectable()
export class ElectronApp implements Initializable {
  constructor(
    private rendererWindow: RendererWindow) {

  }

  public onInit(): void {
    try {
      app.on("ready", () => this.rendererWindow.createWindow());
      app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
          app.quit();
        }
      });

      app.on("activate", () => this.rendererWindow.createWindow());

    } catch (e) {
      return undefined;
    }
  }
}
