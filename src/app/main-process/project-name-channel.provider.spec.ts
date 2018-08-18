import { Mock, Times } from "moq.ts";
import { cold, getTestScheduler } from "../../../node_modules/jasmine-marbles";
import { ChannelReader } from "./Channel/channel.reader";
import { ChannelWriter } from "./Channel/channel.writer";
import { ProjectNameChannelProvider } from "./project-name-channel.provider";
import { ProjectNameProvider } from "./project-name.provider";

describe("Project name channel provider", () => {

  it("Subscribes on channel reader", () => {

    const directoryName = "directoryName";
    const projectName = "projectName";
    const directory = cold("-a|", {a: directoryName});
    const channelReader = new Mock<ChannelReader>()
      .setup(instance => instance.read())
      .returns(directory);

    const projectNameProvider =  new Mock<ProjectNameProvider>()
      .setup(instance => instance.get(directoryName))
      .returns(projectName);

    const channelWriter =  new Mock<ChannelWriter>()
      .setup(instance => instance.write(projectName))
      .returns(undefined);

    const provider = new ProjectNameChannelProvider(
      channelReader.object(),
      projectNameProvider.object(),
      channelWriter.object());

    provider.start();

    getTestScheduler().flush();
    channelReader.verify(instance => instance.read(), Times.Once());
    projectNameProvider.verify(instance => instance.get(directoryName), Times.Once());
    channelWriter.verify(instance => instance.write(projectName), Times.Once());
  });
});
