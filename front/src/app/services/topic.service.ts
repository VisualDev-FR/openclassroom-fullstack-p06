import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private httpClient: HttpClient) { }

  public getAllTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>("/api/topic")
  }

  public getSubscribedTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>("/api/topic/subscribed")
  }

  public getTopicByID(topic_id: number): Observable<Topic> {
    return this.httpClient.get<Topic>(`/api/topic/${topic_id}`)
  }
}
