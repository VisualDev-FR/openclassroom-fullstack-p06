import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenDTO } from '../dto/TokenDTO';
import { UserDTO } from '../dto/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<TokenDTO> {
    return this.http.post<TokenDTO>("/api/auth/login", {
      body: {
        username: username,
        password: password,
      }
    });
  }

  register(username: string, email: string, password: string): Observable<TokenDTO> {
    return this.http.post<TokenDTO>("/api/auth/register", {
      body: {
        username: username,
        email: email,
        password: password,
      }
    });
  }

  me(): Observable<UserDTO> {
    return this.http.get<UserDTO>("/api/auth/me");
  }
}
