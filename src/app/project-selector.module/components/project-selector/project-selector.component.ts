import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-project-selector",
  templateUrl: "./project-selector.component.html",
  styleUrls: ["./project-selector.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSelectorComponent {
  @Output()
  public selectFolderRequested = new EventEmitter();

  public openFolder(): void {
    this.selectFolderRequested.emit();
  }
}
