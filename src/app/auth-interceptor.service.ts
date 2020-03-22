import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEventType
} from "@angular/common/http";

import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const new_req = req.clone({
      headers: req.headers.append("new_key", "new_val")
    });
    return next.handle(new_req);
  }
}
