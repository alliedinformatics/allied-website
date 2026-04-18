import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { TeamContentService } from "../../content/team-content.service";
import { PageHeroComponent } from "../../shared/ui/page-hero/page-hero.component";
import { takeFirst } from "../../shared/utils/collection.utils";

@Component({
  selector: "app-team-page",
  imports: [PageHeroComponent],
  templateUrl: "./team-page.component.html",
  styleUrl: "./team-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamPageComponent {
  private readonly teamContent = inject(TeamContentService);
  protected readonly team = toSignal(this.teamContent.loadTeam(), {
    initialValue: [],
  });

  protected readonly pageIntro = toSignal(this.teamContent.loadPageIntro(), {
    initialValue: null,
  });
  protected readonly members = computed(() => takeFirst(this.team(), 2));
}
