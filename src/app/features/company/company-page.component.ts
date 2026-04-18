import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { CompanyContentService } from "../../content/company-content.service";
import { ServicesContentService } from "../../content/services-content.service";
import { SiteContentService } from "../../content/site-content.service";
import { TeamContentService } from "../../content/team-content.service";
import { PageHeroComponent } from "../../shared/ui/page-hero/page-hero.component";

@Component({
  selector: "app-company-page",
  imports: [PageHeroComponent],
  templateUrl: "./company-page.component.html",
  styleUrl: "./company-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyPageComponent {
  private readonly companyContent = inject(CompanyContentService);
  private readonly servicesContent = inject(ServicesContentService);
  private readonly teamContent = inject(TeamContentService);
  private readonly siteContent = inject(SiteContentService);

  protected readonly content = toSignal(this.siteContent.loadContent(), {
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
  });
  protected readonly company = toSignal(this.companyContent.loadCompany(), {
    initialValue: {
      overview: [],
      philosophy: [],
      whoWeAre: [],
    },
  });
  protected readonly pageIntro = toSignal(this.companyContent.loadPageIntro(), {
    initialValue: null,
  });
  protected readonly services = toSignal(this.servicesContent.loadServices(), {
    initialValue: [],
  });
  protected readonly team = toSignal(this.teamContent.loadTeam(), {
    initialValue: [],
  });
}
