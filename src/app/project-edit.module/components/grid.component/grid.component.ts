import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RowItem } from "../../selectors/row-item";

@Component({
  selector: "app-project-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {
  @Input()
  public languages: string[];

  @Input()
  public dataSource: RowItem[];

  public get displayedColumns(): string[] {
    return ["key", ...this.languages];
  }
}
