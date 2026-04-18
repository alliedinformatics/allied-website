import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { SiteContent } from "./models/site-content.models";

@Injectable({ providedIn: "root" })
export class SiteContentService {
  loadContent(): Observable<SiteContent> {
    return of({
      brand: {
        name: "Allied Informatics",
        foundedYear: 1991,
        postalCode: "30097",
        tagline:
          "Allied Informatics is your trusted source in IT services, Since 30 Years",
        logoUrl: "assets/images/brand/logo.png",
      },
      navigation: [
        { label: "Home", path: "/", showInHeader: true },
        {
          label: "Company",
          path: "/company",
          showInHeader: true,
          showInFooter: true,
        },
        { label: "Team", path: "/team", showInHeader: true },
        {
          label: "Services",
          path: "/services",
          showInHeader: true,
        },
        {
          label: "Careers",
          path: "/careers",
          showInHeader: true,
        },
        {
          label: "Contact",
          path: "/contact",
          showInHeader: false,
        },
      ],
    });
  }
}
