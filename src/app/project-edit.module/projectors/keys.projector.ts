import { createSelector } from "@ngrx/store";
import { projectFeatureProjector } from "./project.feature-projector";

export const keysProjector =
  createSelector(projectFeatureProjector, state => state.keys);
