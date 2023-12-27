import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserStorageService } from '../services/browser-storage.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private browserStorageService: BrowserStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const access_token = this.browserStorageService.get('access_token');

    if (access_token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + access_token),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
