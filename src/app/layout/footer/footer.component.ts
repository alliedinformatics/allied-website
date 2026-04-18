import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";

import { SiteContentService } from "../../content/site-content.service";

@Component({
  selector: "app-footer",
  imports: [RouterLink],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly siteContentService = inject(SiteContentService);

  protected readonly siteContent = toSignal(
    this.siteContentService.loadContent(),
    {
      initialValue: {
        brand: {
          name: "",
          foundedYear: undefined,
          postalCode: "",
          tagline: "",
          logoUrl: "",
        },
        navigation: [],
      },
    },
  );

  protected readonly currentYear = new Date().getFullYear();
}
