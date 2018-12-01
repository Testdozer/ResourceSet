import { createSelector, select } from "@ngrx/store";
import { languagesProjector } from "../projectors/languages.projector";

export const languagesSelector = select(createSelector(languagesProjector));
