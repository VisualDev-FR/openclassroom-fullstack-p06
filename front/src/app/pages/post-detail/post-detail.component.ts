import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { first, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Comment } from '../../interfaces/comment.interface';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommentService } from '../../services/comment.service';
import { BackArrowComponent } from '../../components/back-arrow/back-arrow.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-post',
  imports: [
    CommonModule,
    NavbarComponent,
    BackArrowComponent,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {

  maxCommentLength: number = 256;
  comments!: Comment[];
  comment: string = "";
  post!: Post;
  isMobile$!: Observable<Boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService,
    private snackBar: MatSnackBar,
    private layoutService: LayoutService,
  ) { }

  ngOnInit(): void {
    this.isMobile$ = this.layoutService.isMobile$();
    this.route.params.subscribe(params => {
      let post_id = +params["id"];
      this.refreshComments(post_id);
    });
  }

  refreshComments(post_id: number): void {
    this.postService.findByID(post_id)
      .pipe(first())
      .subscribe(post => {

        if (!post) {
          this.router.navigateByUrl("/404");
          return;
        }

        this.post = post;

        this.commentService.getCommentsByPostID(post.id)
          .pipe(first())
          .subscribe(comments => this.comments = comments);
      });
  }

  sendComment(): void {

    this.commentService.sendComment(this.comment, this.post.id)
      .pipe(first())
      .subscribe({
        next: comment => {
          this.refreshComments(this.post.id);
          this.snackBar.open("Envoyé !", "OK", { duration: 1000 });
          this.comment = "";
        },
        error: error => { }
      })

  }
}
