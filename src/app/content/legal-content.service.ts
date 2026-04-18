import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { LegalPageContent } from "./models/legal-content.models";
import { CacheService } from "../shared/services/cache.service";

@Injectable({ providedIn: "root" })
export class LegalContentService {
  private readonly http = inject(HttpClient);
  private readonly cache = inject(CacheService);
  private readonly basePath = "assets/data";

  loadPrivacyPolicy(): Observable<LegalPageContent> {
    const url = `${this.basePath}/privacy-policy.json`;
    return this.cache.getOrSet(`http:${url}`, () =>
      this.http.get<LegalPageContent>(url),
    );
  }

  loadTermsAndConditions(): Observable<LegalPageContent> {
    const url = `${this.basePath}/terms-and-conditions.json`;
    return this.cache.getOrSet(`http:${url}`, () =>
      this.http.get<LegalPageContent>(url),
    );
  }
}
