import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

  public intercept(request: HttpRequest<any>, next: HttpHandler) {

    console.log("interceptor runs!");

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
