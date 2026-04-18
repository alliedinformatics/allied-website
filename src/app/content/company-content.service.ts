import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { CompanyContent } from "./models/company-content.models";
import { PageIntro } from "./models/shared-content.models";
import { CacheService } from "../shared/services/cache.service";

interface CompanyPayload extends CompanyContent {
  pageIntro: PageIntro;
}

@Injectable({ providedIn: "root" })
export class CompanyContentService {
  private readonly http = inject(HttpClient);
  private readonly cache = inject(CacheService);
  private readonly basePath = "assets/data";

  loadCompany(): Observable<CompanyContent> {
    return this.loadPayload().pipe(
      map(({ pageIntro: _pageIntro, ...company }) => company),
    );
  }

  loadPageIntro(): Observable<PageIntro> {
    return this.loadPayload().pipe(map((response) => response.pageIntro));
  }

  private loadPayload(): Observable<CompanyPayload> {
    const url = `${this.basePath}/company.json`;
    return this.cache.getOrSet(`http:${url}`, () =>
      this.http.get<CompanyPayload>(url),
    );
  }
}
