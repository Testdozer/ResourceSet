import { ipcMain } from "electron";

export class IpcMainProvider {

  public on (channel: string, listener: (event, replyChannel) => void) {
    ipcMain.on(channel, listener);
  }

  public removeListener (channel: string) {
    ipcMain.removeAllListeners(channel);
  }
}
