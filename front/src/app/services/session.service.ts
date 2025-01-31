import { Injectable } from '@angular/core';
import { SessionInformation } from '../interfaces/sessionInformation.interface';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged: boolean = false;

  public logIn(sessionInformation: SessionInformation): void {
    localStorage.setItem("token", sessionInformation.token)
    localStorage.setItem("username", sessionInformation.username)
    localStorage.setItem("email", sessionInformation.email)
    this.isLogged = true;

    console.log(sessionInformation.expiration);
  }

  public logOut(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    this.isLogged = false;
  }

  public getEmail(): string | null {
    return localStorage.getItem("email")
  }

  public getUsername(): string | null {
    return localStorage.getItem("username");
  }

  public getToken(): string | null {
    return localStorage.getItem("token");
  }
}
