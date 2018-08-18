import { Observable } from "rxjs";
import { IpcMainProvider } from "./ipc-main.provider";

export class ChannelReader {
  public static readonly channelName: string = "projectName";
  constructor(private ipcMain: IpcMainProvider ) {
  }

  public read(): Observable<string> {
    return new Observable<string>(observer => {
      this.ipcMain.on(ChannelReader.channelName, (event, replyChannel) => {
        observer.next(replyChannel);
        observer.complete();
        this.ipcMain.removeListener(ChannelReader.channelName);
      });

    });
  }
}
