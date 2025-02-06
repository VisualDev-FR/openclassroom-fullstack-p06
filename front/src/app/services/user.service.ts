import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { UserUpdateRequest } from '../interfaces/userUpdateRequest.interface';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserByID(user_id: number): Observable<User> {
    return this.httpClient.get<User>(`/api/user/${user_id}`)
  }

}
