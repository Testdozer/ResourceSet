import { ProjectNameEvent } from "./project-name.event";

export class ChannelWriter {

  public static readonly channelName: string = "projectName:reply";

  public write(projectNameEvent: ProjectNameEvent, projectName: string) {
    projectNameEvent.event.sender.send(ChannelWriter.channelName, projectName);
  }

}
