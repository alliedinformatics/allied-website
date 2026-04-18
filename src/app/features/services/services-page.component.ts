import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { ServicesContentService } from "../../content/services-content.service";
import { ServicesPageContent } from "../../content/models/services-content.models";
import { PageHeroComponent } from "../../shared/ui/page-hero/page-hero.component";

const EMPTY_PAGE_CONTENT: ServicesPageContent = {};

@Component({
  selector: "app-services-page",
  imports: [PageHeroComponent],
  templateUrl: "./services-page.component.html",
  styleUrl: "./services-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPageComponent {
  private readonly servicesContent = inject(ServicesContentService);

  protected readonly pageIntro = toSignal(
    this.servicesContent.loadPageIntro(),
    {
      initialValue: null,
    },
  );
  protected readonly pageContent = toSignal(
    this.servicesContent.loadPageContent(),
    {
      initialValue: EMPTY_PAGE_CONTENT,
    },
  );
}
