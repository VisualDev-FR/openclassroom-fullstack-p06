import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../interfaces/user.dto.interface';
import { SessionInformation } from '../interfaces/sessionInformation.interface';
import { RegisterRequest } from '../interfaces/registerRequest.interface';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { UserUpdateRequest } from '../interfaces/userUpdateRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClientPublic!: HttpClient;

  constructor(
    private httpClient: HttpClient,
    handler: HttpBackend,
  ) {
    // this http client will not be intercepted by jwtInterceptor
    this.httpClientPublic = new HttpClient(handler);
  }

  public register(registerRequest: RegisterRequest): Observable<SessionInformation> {
    return this.httpClientPublic.post<SessionInformation>("/api/auth/register", registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<SessionInformation> {
    return this.httpClientPublic.post<SessionInformation>("/api/auth/login", loginRequest);
  }

  public me(): Observable<UserDTO> {
    return this.httpClientPublic.get<UserDTO>("/api/auth/me");
  }

  public update(updateRequest: UserUpdateRequest): Observable<SessionInformation> {
    return this.httpClient.patch<SessionInformation>(`/api/auth/me`, updateRequest);
  }
}
