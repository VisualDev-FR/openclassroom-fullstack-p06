import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MddButtonComponent } from '../../components/mdd-button/mdd-button.component';
import { first, Observable } from 'rxjs';
import { Topic } from '../../interfaces/topic.interface';
import { TopicService } from '../../services/topic.service';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../services/subscription.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  imports: [
    NavbarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MddButtonComponent,
    NavbarComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  topics$!: Observable<Topic[]>;
  userForm!: FormGroup;
  errorMessage: string = "";
  usernameControl!: FormControl;
  emailControl!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private topicService: TopicService,
    private sessionService: SessionService,
    private subscriptionService: SubscriptionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.usernameControl = new FormControl(this.sessionService.getUsername())
    this.emailControl = new FormControl(
      this.sessionService.getEmail(),
      [Validators.email]
    )

    this.topics$ = this.topicService.getSubscribedTopics();
    this.userForm = this.formBuilder.group({
      username: this.usernameControl,
      email: this.emailControl,
    })
  }

  logout(): void {
    this.sessionService.logOut();
    this.router.navigateByUrl("/login");
  }

  onSave(): void { }

  unsubscribe(topic: Topic): void {
    this.subscriptionService.unsubscribe(topic.id)
      .pipe(first())
      .subscribe({
        next: () => this.topics$ = this.topicService.getSubscribedTopics(),
        error: (error: HttpErrorResponse) => alert(error.message),
      });
  }
}
