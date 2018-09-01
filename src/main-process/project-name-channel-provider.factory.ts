import { ChannelReader } from "./Channel/channel.reader";
import { ChannelWriter } from "./Channel/channel.writer";
import { IpcMainProvider } from "./Channel/ipc-main.provider";
import { ProjectNameChannelProvider } from "./project-name-channel.provider";
import { projectNameProviderFactory } from "./project-name-provider.factory";

export function projectNameChannelProviderFactory() {
  return new ProjectNameChannelProvider(
    new ChannelReader(
      new IpcMainProvider()
    ),
    projectNameProviderFactory(),
    new ChannelWriter()
  );
}
