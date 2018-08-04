import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { HistoryItem } from "../../store/history.item";

@Component({
  selector: "app-project-selector-history",
  templateUrl: "./project-selector.history.component.html",
  styleUrls: ["./project-selector.history.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSelectorHistoryComponent {

  @Input()
  public item: HistoryItem;

  @Output()
  public openItem = new EventEmitter<HistoryItem>();

  @Output()
  public deleteItem = new EventEmitter<HistoryItem>();
}
