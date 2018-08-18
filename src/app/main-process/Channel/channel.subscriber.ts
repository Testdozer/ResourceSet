import { Observable } from "rxjs";
import { IpcMainProvider } from "./ipc-main.provider";

export class ChannelSubscriber {
  public static readonly channelName: string = "projectName";
  constructor(private ipcMain: IpcMainProvider ) {
  }

  public subscribe(): Observable<string> {
    return new Observable<string>(observer => {
      this.ipcMain.on(ChannelSubscriber.channelName, (event, replyChannel) => {
        observer.next(replyChannel);
        observer.complete();
        this.ipcMain.removeListener(ChannelSubscriber.channelName);
      });

    });
  }
}
