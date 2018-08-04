import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { StartAction } from "../../actions/start.action";
import { IRouterState } from "../../reducers/router.reducer";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(private translate: TranslateService,
              store: Store<IRouterState>) {

    translate.setDefaultLang("en");
    store.dispatch(new StartAction());
  }
}
