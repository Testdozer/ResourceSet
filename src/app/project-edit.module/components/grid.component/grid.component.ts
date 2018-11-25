import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { RowItem } from "../../selectors/row-item";

@Component({
  selector: "app-project-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {
  @Input()
  public dataSet: RowItem[];
}
