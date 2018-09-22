import {BrowserWindow, screen} from "electron";
import {Injectable} from "injection-js";
import * as path from "path";
import * as url from "url";

@Injectable()
export class RendererWindow {
  private instance = null;

  constructor(private serve: boolean) {
  }

  public createWindow() {
    if (this.instance !== null) return;

    const size = screen.getPrimaryDisplay().workAreaSize;

    this.instance = new BrowserWindow({
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      icon: path.join(__dirname, "src/favicon.ico")
    });

    if (this.serve) {
      require("electron-reload")(__dirname, {
        electron: path.join(__dirname, "node_modules", ".bin", "electron")
      });
      this.instance.loadURL("http://localhost:4200");
      this.instance.webContents.openDevTools();
    } else {
      this.instance.loadURL(url.format({
        pathname: path.join(__dirname, "../dist/client/index.html"),
        protocol: "file:",
        slashes: true
      }));
    }

    this.instance.on("closed", () => {
      this.instance = null;
    });
  }
}
