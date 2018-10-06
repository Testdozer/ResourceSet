import { Action } from "@ngrx/store";
import { IpcMainDispatchableAction } from "../../shared/ipc-main-dispatchable.actions/ipc-main-dispatchable.decorator";
import { SerializableAction } from "../../shared/serializable-actions/serializable-action.decorator";

@SerializableAction()
@IpcMainDispatchableAction()
export class LoadProjectAction implements Action {
  public static type = "[Project Edit] Load project";
  public readonly type = LoadProjectAction.type;

  constructor(public payload: { path: string }) {

  }
}
