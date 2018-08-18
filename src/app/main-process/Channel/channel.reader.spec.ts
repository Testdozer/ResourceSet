import { cold } from "jasmine-marbles";
import { It, Mock, Times } from "moq.ts";
import { ChannelReader } from "./channel.reader";
import { IpcMainProvider } from "./ipc-main.provider";
import { ProjectNameEvent } from "./project-name.event";

describe("channel reader", () => {

  it("Returns subscription", () => {
    const channel = ChannelReader.channelName;
    const directoryName = "directoryName";
    const projectNameEvent: ProjectNameEvent = {
      directoryName,
      event: undefined
    };
    const ipcMainProvider = new Mock<IpcMainProvider>()
      .setup(instance => instance.on(channel, It.IsAny()))
      .callback((channelName, func: (event, replyChannel) => void) => {
        func(undefined, directoryName);
      });

    const service = new ChannelReader(ipcMainProvider.object());
    const actual$ = service.read();

    const expected$ = cold("(a", {a: projectNameEvent});
    expect(actual$).toBeObservable(expected$);
  });
});
