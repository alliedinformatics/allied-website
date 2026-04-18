import { Injectable } from "@angular/core";
import { Observable, catchError, shareReplay, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class CacheService {
  private readonly store = new Map<string, Observable<unknown>>();

  getOrSet<T>(key: string, sourceFactory: () => Observable<T>): Observable<T> {
    const cached = this.store.get(key) as Observable<T> | undefined;
    if (cached) {
      return cached;
    }

    const shared$ = sourceFactory().pipe(
      catchError((error) => {
        this.store.delete(key);
        return throwError(() => error);
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

    this.store.set(key, shared$);
    return shared$;
  }

  invalidate(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}
