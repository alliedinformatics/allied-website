import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { SiteContentService } from "../../content/site-content.service";

@Component({
  selector: "app-header",
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
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

  protected readonly headerNavigation = computed(() =>
    this.siteContent().navigation.filter((item) => item.showInHeader),
  );
}
