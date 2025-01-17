import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../dto/UserDTO';
import { SessionInformation } from '../interfaces/sessionInformation.interface';
import { RegisterRequest } from '../interfaces/registerRequest.interface';
import { LoginRequest } from '../interfaces/loginRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient!: HttpClient;

  constructor(handler: HttpBackend) {
    // prevent requests to be intercepted by jwtInterceptor
    this.httpClient = new HttpClient(handler);
  }

  public register(registerRequest: RegisterRequest): Observable<SessionInformation> {
    return this.httpClient.post<SessionInformation>("/api/auth/register", registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<SessionInformation> {
    return this.httpClient.post<SessionInformation>("/api/auth/login", loginRequest);
  }

  public me(): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>("/api/auth/me");
  }
}
