import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private baseURL: string = "/api/topic"

  constructor(private httpClient: HttpClient) { }

  public getSubscribedTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>("/api/topic")
  }
}
