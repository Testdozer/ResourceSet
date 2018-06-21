import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-not-found-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>Hey! It looks like this page doesn't exist yet.</p>
  `,
  styles: [
      `
      :host {
        text-align: center;
      }
    `
  ]
})
export class NotFoundPageComponent {
}
