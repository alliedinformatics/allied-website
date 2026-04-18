import { NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-page-hero",
  imports: [NgOptimizedImage],
  templateUrl: "./page-hero.component.html",
  styleUrl: "./page-hero.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeroComponent {
  readonly eyebrow = input<string>();
  readonly title = input.required<string>();
  readonly summary = input<string>();
  readonly imageUrl = input<string>();
  readonly imageAlt = input<string>("");
  readonly meta = input<string[]>([]);
}
