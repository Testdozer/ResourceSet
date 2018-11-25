import { createSelector } from "@ngrx/store";
import { projectFeatureProjector } from "./project.feature-projector";

export const languagesProjector =
  createSelector(projectFeatureProjector, state => state.languages);
