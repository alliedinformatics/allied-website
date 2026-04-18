import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { HomeContent } from "./models/home-content.models";
import { CacheService } from "../shared/services/cache.service";

@Injectable({ providedIn: "root" })
export class HomeContentService {
  private readonly http = inject(HttpClient);
  private readonly cache = inject(CacheService);
  private readonly basePath = "assets/data";

  loadContent(): Observable<HomeContent> {
    return forkJoin({
      homepage: this.loadHomepage(),
      focusAreas: this.loadFocusAreas(),
      operationalStructure: this.loadOperationalStructure(),
      industries: this.loadIndustries(),
    });
  }

  private loadHomepage(): Observable<HomeContent["homepage"]> {
    return this.loadJson<HomeContent["homepage"]>("homepage.json");
  }

  private loadFocusAreas(): Observable<HomeContent["focusAreas"]> {
    return this.loadJson<HomeContent["focusAreas"]>("focusAreas.json");
  }

  private loadOperationalStructure(): Observable<
    HomeContent["operationalStructure"]
  > {
    return this.loadJson<HomeContent["operationalStructure"]>(
      "operationalStructure.json",
    );
  }

  private loadIndustries(): Observable<HomeContent["industries"]> {
    return this.loadJson<HomeContent["industries"]>("industries.json");
  }

  private loadJson<T>(fileName: string): Observable<T> {
    const url = `${this.basePath}/${fileName}`;
    return this.cache.getOrSet(`http:${url}`, () => this.http.get<T>(url));
  }
}
