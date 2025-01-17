import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { MddButtonComponent } from '../../components/mdd-button/mdd-button.component';

@Component({
  selector: 'app-articles',
  imports: [
    NavbarComponent,
    CommonModule,
    AsyncPipe,
    MddButtonComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {

  posts$!: Observable<Post[]>;

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getAllPosts();
  }

  getUser(user_id: number): string {
    return "";
  }
}
