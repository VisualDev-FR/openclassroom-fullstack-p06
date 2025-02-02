import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { MddButtonComponent } from '../../components/mdd-button/mdd-button.component';
import { Router } from '@angular/router';

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
  sortAscending$ = new BehaviorSubject<boolean>(true);

  constructor(
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.posts$ = combineLatest([this.postService.findAll(), this.sortAscending$])
      .pipe(
        map(([posts, ascending]) => posts.sort((a, b) => {

          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          const delta = dateB - dateA;

          return ascending ? delta : -delta;
        }))
      );
  }

  changeSortOrder(): void {
    this.sortAscending$.next(!this.sortAscending$.getValue());
  }

  getPostUrl(post: Post): string {
    return `post/${post.id}`
  }

  createPost(): void {
    this.router.navigateByUrl("/post/create");
  }

  openPost(post: Post): void {
    this.router.navigateByUrl(`/post/${post.id}`)
  }
}
