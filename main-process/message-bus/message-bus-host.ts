import { Injectable } from "injection-js";
import { filter, map, tap } from "rxjs/operators";
import { AddHistoryItemAction } from "src/app/core.module/ipc-actions/add-history-item.action";
import { OpenProjectAction } from "src/app/core.module/ipc-actions/open-project.action";
import { ProjectNameProvider } from "../package-name/project-name.provider";
import { ActionBuilder } from "./action-builder";
import { MessageBus } from "./message.bus";

@Injectable()
export class MessageBusHost {
  constructor(
    private messageBus: MessageBus,
    private actionBuilder: ActionBuilder,
    private projectNameProvider: ProjectNameProvider) {
  }

  public start() {
    this.messageBus.messages$()
      .pipe(
        map(({action, sender}) => ({action: this.actionBuilder.get(action), sender})),
        filter(value => value.action.type === OpenProjectAction.type),
        map(({action, sender}) => ({action: (action as OpenProjectAction), sender})),
        map(({action, sender}) => ({path: action.payload.path, sender})),
        map(({path, sender}) => ({path, name: this.projectNameProvider.get(path), sender})),
        map(({path, name, sender}) => ({action: new AddHistoryItemAction({name, path}), sender})),
        map(({action, sender}) => sender(action))
      )
     .subscribe( () => undefined );
  }
}
