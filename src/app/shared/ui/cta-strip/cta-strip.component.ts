import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-cta-strip",
  imports: [RouterLink],
  templateUrl: "./cta-strip.component.html",
  styleUrl: "./cta-strip.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaStripComponent {
  readonly title = input.required<string>();
  readonly summary = input<string>();
  readonly ctaLabel = input.required<string>();
  readonly ctaRoute = input.required<string>();
}
