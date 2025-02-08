import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackArrowComponent } from '../../components/back-arrow/back-arrow.component';
import { MddButtonComponent } from '../../components/mdd-button/mdd-button.component';
import { first, Observable } from 'rxjs';
import { Topic } from '../../interfaces/topic.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TopicService } from '../../services/topic.service';
import { PostCreationRequest } from '../../interfaces/postCreationRequest.interface';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-post-creation',
  imports: [
    MatInputModule,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    BackArrowComponent,
    MddButtonComponent,
    MatSelectModule,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './post-creation.component.html',
  styleUrl: './post-creation.component.scss'
})
export class PostCreationComponent {

  @Output() onCreate = new EventEmitter();

  postform!: FormGroup;
  topicControl!: FormControl<Topic | null>;
  titleControl!: FormControl<string | null>;
  contentControl!: FormControl<string | null>;
  topics$!: Observable<Topic[]>;
  errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private topicService: TopicService,
    private postService: PostService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.topicControl = new FormControl<Topic | null>(null, [Validators.required]);
    this.titleControl = new FormControl("", [Validators.required]);
    this.contentControl = new FormControl("", [Validators.required]);

    this.postform = this.formBuilder.group({
      topic: this.topicControl,
      title: this.titleControl,
      description: this.contentControl,
    })

    this.topics$ = this.topicService.getSubscribedTopics();
  }

  public createPost(): void {

    if (!this.postform.valid) return;

    const createRequest: PostCreationRequest = {
      topic_id: this.topicControl.value!.id,
      title: this.titleControl.value!,
      description: this.contentControl.value!,
    }

    console.log(createRequest);

    this.postService.create(createRequest)
      .pipe(first())
      .subscribe({
        next: post => {
          this.snackBar.open("Article créé !", "OK", { duration: 3000 });
          this.router.navigateByUrl("/posts")
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = `Une erreur est survenue. (${error.status})`
        },
      })
  }

  public formIsValid(): boolean {
    return this.postform.valid;
  }

}
