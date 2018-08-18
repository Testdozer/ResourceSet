import { Mock, Times } from "moq.ts";
import { cold, getTestScheduler } from "../../../node_modules/jasmine-marbles";
import { ChannelReader } from "./Channel/channel.reader";
import { ChannelWriter } from "./Channel/channel.writer";
import { ProjectNameEvent } from "./Channel/project-name.event";
import { ProjectNameChannelProvider } from "./project-name-channel.provider";
import { ProjectNameProvider } from "./project-name.provider";

describe("Project name channel provider", () => {

  it("Subscribes on channel reader", () => {

    const directoryName = "directoryName";
    const projectName = "projectName";
    const projectNameEvent: ProjectNameEvent = {
      directoryName,
      event: undefined
    };
    const projectNameEvents = cold("-a|", {a: projectNameEvent});
    const channelReader = new Mock<ChannelReader>()
      .setup(instance => instance.read())
      .returns(projectNameEvents);

    const projectNameProvider =  new Mock<ProjectNameProvider>()
      .setup(instance => instance.get(directoryName))
      .returns(projectName);

    const channelWriter =  new Mock<ChannelWriter>()
      .setup(instance => instance.write(projectNameEvent, projectName))
      .returns(undefined);

    const provider = new ProjectNameChannelProvider(
      channelReader.object(),
      projectNameProvider.object(),
      channelWriter.object());

    provider.start();

    getTestScheduler().flush();
    channelReader.verify(instance => instance.read(), Times.Once());
    projectNameProvider.verify(instance => instance.get(directoryName), Times.Once());
    channelWriter.verify(instance => instance.write(projectNameEvent, projectName), Times.Once());
  });
});
