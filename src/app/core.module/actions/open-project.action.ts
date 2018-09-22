import { Action } from "@ngrx/store";
import { SerializableAction } from "../../shared/serializable-actions/serializable-action.decorator";

@SerializableAction()
export class OpenProjectAction implements Action {
  public static readonly type = "[App] OpenProject";
  public readonly type = OpenProjectAction.type;

  constructor(public payload: { path: string }) {

  }
}
