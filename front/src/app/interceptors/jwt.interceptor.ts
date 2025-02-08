import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, resource } from "@angular/core";
import { environment } from "../../environments/environment";
import { SessionService } from "../services/session.service";
import { catchError, ObservableInput, throwError } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private snackbar: MatSnackBar,
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

    return next.handle(request).pipe(

      catchError((error: HttpErrorResponse) => {

        if (error) {
          switch (error.status) {

            case 401:
            case 403:
              this.sessionService.logOut();
              this.router.navigateByUrl("/login");
              this.snackbar.open("Session expired", "OK", { duration: 3000 })
              break;

            default:
              break;
          }
        }

        throw error;
      })
    );
  }
}
