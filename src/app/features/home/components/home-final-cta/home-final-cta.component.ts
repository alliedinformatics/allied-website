import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";

import { HomeContentService } from "../../../../content/home-content.service";

@Component({
  selector: "app-home-final-cta",
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: "./home-final-cta.component.html",
  styleUrl: "./home-final-cta.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFinalCtaComponent {
  private readonly homeContentService = inject(HomeContentService);

  private readonly content = toSignal(this.homeContentService.loadContent(), {
    initialValue: null,
  });

  protected readonly finalCta = computed(
    () => this.content()?.homepage.finalCta ?? null,
  );
}
