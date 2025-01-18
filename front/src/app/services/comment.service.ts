import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getCommentsByPostID(post_id: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`/api/comment/post/${post_id}`)
  }
}
