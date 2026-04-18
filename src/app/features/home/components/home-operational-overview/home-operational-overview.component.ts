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
import { takeFirst } from "../../../../shared/utils/collection.utils";

@Component({
  selector: "app-home-operational-overview",
  imports: [RouterLink, PlaceholderComponent],
  templateUrl: "./home-operational-overview.component.html",
  styleUrl: "./home-operational-overview.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeOperationalOverviewComponent {
  private readonly industriesLimit = 5;

  private readonly homeContentService = inject(HomeContentService);

  private readonly content = toSignal(this.homeContentService.loadContent(), {
    initialValue: null,
  });

  protected readonly operational = computed(
    () => this.content()?.homepage.sections?.operationalStructure,
  );
  protected readonly industries = computed(() =>
    takeFirst(this.content()?.industries, this.industriesLimit),
  );
  protected readonly placeholderIndexes = computed(() =>
    Array.from(
      {
        length: Math.max(this.industries().length, this.industriesLimit),
      },
      (_value, index) => index,
    ),
  );
}
