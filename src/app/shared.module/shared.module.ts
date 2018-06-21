import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { DescribePipe } from "./pipes/describe/describe.pipe";

const COMPONENTS = [
  DescribePipe
];

const SHARED_MODULES = [
  RouterModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule
];

@NgModule({
  imports: [
    ...SHARED_MODULES,
    TranslateModule.forChild()
  ],
  exports: [
    ...COMPONENTS,
    ...SHARED_MODULES
  ],
  declarations: COMPONENTS,
  // SharedModule should not have providers https://angular.io/guide/ngmodule-faq#sharedmodule
  providers: undefined
})

export class SharedModule {
}
