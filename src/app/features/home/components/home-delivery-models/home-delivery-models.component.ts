import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NgOptimizedImage } from "@angular/common";

import { HomeContentService } from "../../../../content/home-content.service";
import { PlaceholderComponent } from "../../../../shared/ui/placeholder/placeholder.component";
import { takeFirst } from "../../../../shared/utils/collection.utils";

@Component({
  selector: "app-home-delivery-models",
  imports: [NgOptimizedImage, PlaceholderComponent],
  templateUrl: "./home-delivery-models.component.html",
  styleUrl: "./home-delivery-models.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDeliveryModelsComponent {
  private readonly previewLimit = 3;

  private readonly homeContentService = inject(HomeContentService);

  private readonly content = toSignal(this.homeContentService.loadContent(), {
    initialValue: null,
  });

  protected readonly eyebrow = computed(
    () => this.content()?.homepage.sections?.deliveryModels?.eyebrow,
  );
  protected readonly title = computed(
    () => this.content()?.homepage.sections?.deliveryModels?.title,
  );
  protected readonly items = computed(() =>
    takeFirst(this.content()?.operationalStructure, this.previewLimit),
  );
  protected readonly placeholderIndexes = computed(() =>
    Array.from(
      {
        length: Math.max(this.items().length, this.previewLimit),
      },
      (_value, index) => index,
    ),
  );
}
