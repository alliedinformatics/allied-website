import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { HomeContentService } from "../../../../content/home-content.service";
import { PlaceholderComponent } from "../../../../shared/ui/placeholder/placeholder.component";
import { takeFirst } from "../../../../shared/utils/collection.utils";

@Component({
  selector: "app-home-focus-preview",
  imports: [PlaceholderComponent],
  templateUrl: "./home-focus-preview.component.html",
  styleUrl: "./home-focus-preview.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFocusPreviewComponent {
  private readonly previewLimit = 3;

  private readonly homeContentService = inject(HomeContentService);

  private readonly content = toSignal(this.homeContentService.loadContent(), {
    initialValue: null,
  });

  protected readonly eyebrow = computed(
    () => this.content()?.homepage.sections?.focusAreas?.eyebrow,
  );
  protected readonly title = computed(
    () => this.content()?.homepage.sections?.focusAreas?.title,
  );
  protected readonly focusAreas = computed(() =>
    takeFirst(this.content()?.focusAreas, this.previewLimit),
  );
  protected readonly placeholderIndexes = computed(() =>
    Array.from(
      {
        length: Math.max(this.focusAreas().length, this.previewLimit),
      },
      (_value, index) => index,
    ),
  );
}
