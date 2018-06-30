import { ChangeDetectionStrategy, Component, EventEmitter } from "@angular/core";

@Component({
  selector: "app-project-selector",
  templateUrl: "./project-selector.component.html",
  styleUrls: ["./project-selector.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSelectorComponent {
  public selectFolderRequested = new EventEmitter();
}
