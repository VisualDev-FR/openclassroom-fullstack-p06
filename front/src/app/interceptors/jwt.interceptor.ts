import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { SessionService } from "../services/session.service";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private sessionService: SessionService,
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler) {

    if (environment.debug) {
      console.log(request.method, request.url);
    }

    const token = this.sessionService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    else {
      console.warn("No session data available");
    }

    return next.handle(request);
  }
}
