import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";

import { CareersContentService } from "../../content/careers-content.service";
import { PageHeroComponent } from "../../shared/ui/page-hero/page-hero.component";
import { PlaceholderComponent } from "../../shared/ui/placeholder/placeholder.component";
import { takeFirst } from "../../shared/utils/collection.utils";

@Component({
  selector: "app-careers-page",
  imports: [RouterLink, PageHeroComponent, PlaceholderComponent],
  templateUrl: "./careers-page.component.html",
  styleUrl: "./careers-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareersPageComponent {
  private readonly openingsLimit = 5;

  private readonly careersContent = inject(CareersContentService);

  protected readonly careers = toSignal(this.careersContent.loadCareers(), {
    initialValue: [],
  });
  protected readonly pageIntro = toSignal(this.careersContent.loadPageIntro(), {
    initialValue: null,
  });
  protected readonly openings = computed(() =>
    takeFirst(this.careers(), this.openingsLimit),
  );
  protected readonly placeholderIndexes = computed(() =>
    Array.from(
      {
        length: Math.max(this.openings().length, this.openingsLimit),
      },
      (_value, index) => index,
    ),
  );
}
