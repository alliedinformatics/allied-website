import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { CareerOpening } from "./models/careers-content.models";
import { PageIntro } from "./models/shared-content.models";
import { CacheService } from "../shared/services/cache.service";

interface CareersPayload {
  pageIntro: PageIntro;
  openings: CareerOpening[];
}

@Injectable({ providedIn: "root" })
export class CareersContentService {
  private readonly http = inject(HttpClient);
  private readonly cache = inject(CacheService);
  private readonly basePath = "assets/data";

  loadCareers(): Observable<CareerOpening[]> {
    return this.loadPayload().pipe(map((response) => response.openings));
  }

  loadPageIntro(): Observable<PageIntro> {
    return this.loadPayload().pipe(map((response) => response.pageIntro));
  }

  loadCareerDetails(id: string | null): Observable<CareerOpening | null> {
    if (!id) {
      return this.loadCareers().pipe(map(() => null));
    }

    const normalizedId = id.trim().toLowerCase();
    return this.loadCareers().pipe(
      map(
        (careers) =>
          careers.find((career) => career.id === normalizedId) ?? null,
      ),
    );
  }

  private loadPayload(): Observable<CareersPayload> {
    const url = `${this.basePath}/careers.json`;
    return this.cache.getOrSet(`http:${url}`, () =>
      this.http.get<CareersPayload>(url),
    );
  }
}
