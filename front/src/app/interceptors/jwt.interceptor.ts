import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionService } from "../services/session.service";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler) {

    console.log("interceptor runs!");

    // const token = this.sessionService.getToken();
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMUBleGFtcGxlLmNvbSIsImlhdCI6MTczNzExNTcwOSwiZXhwIjoxNzM3MTE5MzA5fQ.xMe-22z6XJqUAsBccIxJLVtnDIjgdsP1bv3k4nFMiaE";

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
