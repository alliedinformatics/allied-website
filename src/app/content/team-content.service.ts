import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { TeamMember } from "./models/team-content.models";
import { PageIntro } from "./models/shared-content.models";
import { CacheService } from "../shared/services/cache.service";

interface TeamPayload {
  pageIntro: PageIntro;
  members: TeamMember[];
}

@Injectable({ providedIn: "root" })
export class TeamContentService {
  private readonly http = inject(HttpClient);
  private readonly cache = inject(CacheService);
  private readonly basePath = "assets/data";

  loadTeam(): Observable<TeamMember[]> {
    return this.loadPayload().pipe(map((response) => response.members));
  }

  loadPageIntro(): Observable<PageIntro> {
    return this.loadPayload().pipe(map((response) => response.pageIntro));
  }

  private loadPayload(): Observable<TeamPayload> {
    const url = `${this.basePath}/team.json`;
    return this.cache.getOrSet(`http:${url}`, () =>
      this.http.get<TeamPayload>(url),
    );
  }
}
