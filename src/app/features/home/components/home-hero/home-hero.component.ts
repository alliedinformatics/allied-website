import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";

import { HomeContentService } from "../../../../content/home-content.service";
import { PlaceholderComponent } from "../../../../shared/ui/placeholder/placeholder.component";

@Component({
  selector: "app-home-hero",
  imports: [RouterLink, PlaceholderComponent],
  templateUrl: "./home-hero.component.html",
  styleUrl: "./home-hero.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeroComponent {
  private readonly homeContentService = inject(HomeContentService);

  private readonly content = toSignal(this.homeContentService.loadContent(), {
    initialValue: null,
  });

  protected readonly hero = computed(
    () => this.content()?.homepage.hero ?? null,
  );
  protected readonly spotlight = computed(
    () => this.content()?.homepage.spotlight ?? null,
  );
}
