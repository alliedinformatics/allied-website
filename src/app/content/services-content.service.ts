import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import {
  ServiceItem,
  ServicesPageContent,
} from "./models/services-content.models";
import { PageIntro } from "./models/shared-content.models";
import { CacheService } from "../shared/services/cache.service";

interface ServicesPayload {
  pageIntro: PageIntro;
  pageContent?: ServicesPageContent;
  items: ServiceItem[];
}

@Injectable({ providedIn: "root" })
export class ServicesContentService {
  private readonly http = inject(HttpClient);
  private readonly cache = inject(CacheService);
  private readonly basePath = "assets/data";

  loadServices(): Observable<ServiceItem[]> {
    return this.loadPayload().pipe(map((response) => response.items));
  }

  loadPageContent(): Observable<ServicesPageContent> {
    return this.loadPayload().pipe(
      map((response) => response.pageContent ?? {}),
    );
  }

  loadPageIntro(): Observable<PageIntro> {
    return this.loadPayload().pipe(map((response) => response.pageIntro));
  }

  private loadPayload(): Observable<ServicesPayload> {
    const url = `${this.basePath}/services.json`;
    return this.cache.getOrSet(`http:${url}`, () =>
      this.http.get<ServicesPayload>(url),
    );
  }
}
