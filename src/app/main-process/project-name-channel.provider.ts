import { ChannelReader } from "./Channel/channel.reader";
import { ChannelWriter } from "./Channel/channel.writer";
import { ProjectNameProvider } from "./project-name.provider";

export class ProjectNameChannelProvider {

  constructor(
    private channelReader: ChannelReader,
    private projectNameProvider: ProjectNameProvider,
    private channelWriter: ChannelWriter ) {
  }

  public start() {
   this.channelReader.read()
      .subscribe(directory => {
        const projectName =  this.projectNameProvider.get(directory);
        this.channelWriter.write(projectName);
      });

  }
}
