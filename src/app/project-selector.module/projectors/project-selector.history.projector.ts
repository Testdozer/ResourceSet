import { createSelector } from "@ngrx/store";
import { projectSelectorFeatureProjector } from "./project-selector.feature-projector";

export const projectSelectorHistoryProjector =
  createSelector(projectSelectorFeatureProjector, state => state.history);
