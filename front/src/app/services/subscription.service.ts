import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private httpClient: HttpClient) { }

  public subscribe(topic_id: number): Observable<void> {
    return this.httpClient.post<void>(`/api/subscription/${topic_id}`, null);
  }

  public unsubscribe(topic_id: number): Observable<void> {
    return this.httpClient.delete<void>(`/api/subscription/${topic_id}`);
  }

}
