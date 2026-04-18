import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NgOptimizedImage } from "@angular/common";

import { HomeContentService } from "../../../../content/home-content.service";
import { ServicesContentService } from "../../../../content/services-content.service";
import { PlaceholderComponent } from "../../../../shared/ui/placeholder/placeholder.component";
import { takeFirst } from "../../../../shared/utils/collection.utils";

@Component({
  selector: "app-home-services-preview",
  imports: [NgOptimizedImage, PlaceholderComponent],
  templateUrl: "./home-services-preview.component.html",
  styleUrl: "./home-services-preview.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeServicesPreviewComponent {
  private readonly previewLimit = 3;

  private readonly homeContentService = inject(HomeContentService);
  private readonly servicesContentService = inject(ServicesContentService);

  private readonly content = toSignal(this.homeContentService.loadContent(), {
    initialValue: null,
  });

  protected readonly services = toSignal(
    this.servicesContentService.loadServices(),
    {
      initialValue: [],
    },
  );

  protected readonly eyebrow = computed(
    () => this.content()?.homepage.sections?.services?.eyebrow,
  );
  protected readonly title = computed(
    () => this.content()?.homepage.sections?.services?.title,
  );
  protected readonly servicesPreview = computed(() =>
    takeFirst(this.services(), this.previewLimit),
  );
  protected readonly placeholderIndexes = computed(() =>
    Array.from(
      {
        length: Math.max(this.servicesPreview().length, this.previewLimit),
      },
      (_value, index) => index,
    ),
  );
}
