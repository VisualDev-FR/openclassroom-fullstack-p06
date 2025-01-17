import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  public register(registerRequest: RegisterRequest): Observable<SessionInformation> {
    return this.http.post<SessionInformation>("/api/auth/register", registerRequest);
  }

  public login(loginRequest: LoginRequest): Observable<SessionInformation> {
    return this.http.post<SessionInformation>("/api/auth/login", loginRequest);
  }

  public me(): Observable<UserDTO> {
    return this.http.get<UserDTO>("/api/auth/me");
  }
}
