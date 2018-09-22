import { Injectable } from "injection-js";
import { filter, tap } from "rxjs/operators";
import { AddHistoryItemAction } from "../../src/app/core.module/actions/add-history-item.action";
import { OpenProjectAction } from "../../src/app/core.module/actions/open-project.action";
import { Initializable } from "../core/core";
import { ProjectNameProvider } from "../package-name/project-name.provider";
import { MessageBus } from "./message.bus";

@Injectable()
export class OpenProjectMessageHandler implements Initializable {
  constructor(
    private messageBus: MessageBus,
    private projectNameProvider: ProjectNameProvider) {
  }

  public onInit(): void {
    this.messageBus.messages$()
      .pipe(
        filter(value => value.action instanceof OpenProjectAction),
        tap(message => {
          const action = message.action as OpenProjectAction;
          const projectName = this.projectNameProvider.get(action.payload.path);
          message.dispatch(new AddHistoryItemAction({path: action.payload.path, name: projectName}));
        })
      )
      .subscribe(() => undefined);
  }
}
