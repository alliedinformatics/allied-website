import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";
import { HomeDeliveryModelsComponent } from "./components/home-delivery-models/home-delivery-models.component";
import { HomeFinalCtaComponent } from "./components/home-final-cta/home-final-cta.component";
import { HomeFocusPreviewComponent } from "./components/home-focus-preview/home-focus-preview.component";
import { HomeHeroComponent } from "./components/home-hero/home-hero.component";
import { HomeOperationalOverviewComponent } from "./components/home-operational-overview/home-operational-overview.component";
import { HomeServicesPreviewComponent } from "./components/home-services-preview/home-services-preview.component";

@Component({
  selector: "app-home-page",
  imports: [
    HomeHeroComponent,
    HomeServicesPreviewComponent,
    HomeFocusPreviewComponent,
    HomeOperationalOverviewComponent,
    HomeDeliveryModelsComponent,
    HomeFinalCtaComponent,
  ],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent {}
