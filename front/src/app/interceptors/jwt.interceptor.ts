import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

  public intercept(request: HttpRequest<any>, next: HttpHandler) {

    if (environment.debug) {
      console.log(request.method, request.url);
    }

    const token = localStorage.getItem("token")

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
