import { Injectable } from "injection-js";
import { filter, map } from "rxjs/operators";
import { OpenProjectAction } from "src/app/core.module/actions/open-project.action";
import { AddHistoryItemAction } from "src/app/project-selector.module/actions/add-history-item.action";
import { ProjectNameProvider } from "../package-name/project-name.provider";
import { MessageBus } from "./message.bus";

@Injectable()
export class MessageBusHost {
  constructor(
    private messageBus: MessageBus,
    private projectNameProvider: ProjectNameProvider) {
  }

  public start() {
    this.messageBus.messages$()
      .pipe(
        filter(value => value.action.type === OpenProjectAction.type),
        map(({action, sender}) => ({action: (action as OpenProjectAction), sender})),
        map(({action, sender}) => ({path: action.payload.path, sender})),
        map(({path, sender}) => ({path, name: this.projectNameProvider.get(path), sender})),
        map(({name, path, sender}) => sender(new AddHistoryItemAction({name, path})))
      )
     .subscribe( () => undefined );
  }
}
