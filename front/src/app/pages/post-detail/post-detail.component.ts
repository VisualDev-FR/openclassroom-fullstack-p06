import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { first, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Comment } from '../../interfaces/comment.interface';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { CommentService } from '../../services/comment.service';
import { BackArrowComponent } from '../../components/back-arrow/back-arrow.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post',
  imports: [
    CommonModule,
    NavbarComponent,
    BackArrowComponent,
    FormsModule,
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {

  maxCommentLength: number = 256;
  post!: Post;
  comments$!: Observable<Comment[]>;
  comment: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let post_id = +params["id"];
      this.postService.findPostByID(post_id)
        .pipe(first())
        .subscribe(post => {

          if (!post) {
            this.router.navigateByUrl("/404")
            return;
          }

          this.post = post;
          this.comments$ = this.commentService.getCommentsByPostID(post.id);
        });
    });
  }

  getUser(user_id: number): Observable<User> {
    return this.userService.getUserByID(user_id);
  }

  sendComment() {
    this.snackBar.open("Envoyé !", "OK", { duration: 1000 })
    this.comment = "";
  }
}
