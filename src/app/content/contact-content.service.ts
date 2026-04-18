import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { ContactContent } from "./models/contact-content.models";
import { PageIntro } from "./models/shared-content.models";
import { CacheService } from "../shared/services/cache.service";

interface ContactPayload extends ContactContent {
  pageIntro: PageIntro;
}

@Injectable({ providedIn: "root" })
export class ContactContentService {
  private readonly http = inject(HttpClient);
  private readonly cache = inject(CacheService);
  private readonly basePath = "assets/data";

  loadContact(): Observable<ContactContent> {
    return this.loadPayload().pipe(
      map(({ pageIntro: _pageIntro, ...contact }) => contact),
    );
  }

  loadPageIntro(): Observable<PageIntro> {
    return this.loadPayload().pipe(map((response) => response.pageIntro));
  }

  private loadPayload(): Observable<ContactPayload> {
    const url = `${this.basePath}/contact.json`;
    return this.cache.getOrSet(`http:${url}`, () =>
      this.http.get<ContactPayload>(url),
    );
  }
}
