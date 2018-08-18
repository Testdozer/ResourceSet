import { cold } from "jasmine-marbles";
import { It, Mock, Times } from "moq.ts";
import { ChannelReader } from "./channel.reader";
import { IpcMainProvider } from "./ipc-main.provider";

describe("channel reader", () => {

  it("Returns subscription", () => {
    const channel = ChannelReader.channelName;
    const replyChannel = "replyChannel";
    const ipcMainProvider = new Mock<IpcMainProvider>()
      .setup(instance => instance.on(channel, It.IsAny()))
      .callback((channelName, func: (event, replyChannel) => void) => {
        console.log(func);
        func(undefined, replyChannel);
      })
      .setup(instance => instance.removeListener(channel))
      .returns(undefined);

    const service = new ChannelReader(ipcMainProvider.object());
    const actual$ = service.read();

    const expected$ = cold("(a|", {a: replyChannel});
    expect(actual$).toBeObservable(expected$);
    ipcMainProvider.verify(instance => instance.removeListener(channel), Times.Once());
  });
});
