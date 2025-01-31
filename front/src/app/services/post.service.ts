import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { PostCreationRequest } from '../interfaces/postCreationRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  public getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>("/api/post")
  }

  public findPostByID(post_id: number): Observable<Post | undefined> {
    return this.httpClient.get<Post | undefined>(`/api/post/${post_id}`)
  }

  public create(createRequest: PostCreationRequest): Observable<Post> {
    return this.httpClient.post<Post>("/api/post", createRequest)
  }
}
