import { Routes } from "@angular/router";

import { AppShellComponent } from "./layout/app-shell/app-shell.component";

export const appRoutes: Routes = [
  {
    path: "",
    component: AppShellComponent,
    children: [
      {
        path: "",
        title: "Allied Informatics",
        loadComponent: () =>
          import("./features/home/home-page.component").then(
            (module) => module.HomePageComponent,
          ),
      },
      {
        path: "company",
        title: "Company | Allied Informatics",
        loadComponent: () =>
          import("./features/company/company-page.component").then(
            (module) => module.CompanyPageComponent,
          ),
      },
      {
        path: "team",
        title: "Team | Allied Informatics",
        loadComponent: () =>
          import("./features/team/team-page.component").then(
            (module) => module.TeamPageComponent,
          ),
      },
      {
        path: "services",
        title: "Services | Allied Informatics",
        loadComponent: () =>
          import("./features/services/services-page.component").then(
            (module) => module.ServicesPageComponent,
          ),
      },
      {
        path: "careers",
        title: "Careers | Allied Informatics",
        loadComponent: () =>
          import("./features/careers/careers-page.component").then(
            (module) => module.CareersPageComponent,
          ),
      },
      {
        path: "careers/:id",
        title: "Career Details | Allied Informatics",
        loadComponent: () =>
          import("./features/careers/details/career-details-page.component").then(
            (module) => module.CareerDetailsPageComponent,
          ),
      },
      {
        path: "contact",
        title: "Contact | Allied Informatics",
        loadComponent: () =>
          import("./features/contact/contact-page.component").then(
            (module) => module.ContactPageComponent,
          ),
      },
      {
        path: "privacy-policy",
        title: "Privacy Policy | Allied Informatics",
        loadComponent: () =>
          import("./features/legal/privacy-policy/privacy-policy-page.component").then(
            (module) => module.PrivacyPolicyPageComponent,
          ),
      },
      {
        path: "terms-and-conditions",
        title: "Terms and Conditions | Allied Informatics",
        loadComponent: () =>
          import("./features/legal/terms-and-conditions/terms-and-conditions-page.component").then(
            (module) => module.TermsAndConditionsPageComponent,
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "",
  },
];
