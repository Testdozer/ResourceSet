import { Observable } from "rxjs";
import { IpcMainProvider } from "./ipc-main.provider";
import { ProjectNameEvent } from "./project-name.event";

export class ChannelReader {
  public static readonly channelName: string = "projectName";
  constructor(private ipcMain: IpcMainProvider ) {
  }

  public read(): Observable<ProjectNameEvent> {
    return new Observable<ProjectNameEvent>(observer => {
      this.ipcMain.on(ChannelReader.channelName, (event, directoryName) => {
        const projectNameEvent: ProjectNameEvent = {
          directoryName,
          event
        };
        observer.next(projectNameEvent);
      }
    );
    });
  }
}
