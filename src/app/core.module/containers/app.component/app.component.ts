import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { Start } from "../../actions/app.actions";
import { IRouterState } from "../../reducers/router.reducer";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private translate: TranslateService,
              store: Store<IRouterState>) {

    translate.setDefaultLang("en");
    store.dispatch(new Start());
  }
}
