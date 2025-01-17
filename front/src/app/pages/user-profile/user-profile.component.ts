import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MddButtonComponent } from '../../components/mdd-button/mdd-button.component';
import { Observable } from 'rxjs';
import { Topic } from '../../interfaces/topic.interface';
import { TopicService } from '../../services/topic.service';

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

  readonly username = new FormControl("", [])
  readonly email = new FormControl("", [Validators.email])

  constructor(
    private formBuilder: FormBuilder,
    private topicService: TopicService,
  ) { }

  ngOnInit(): void {
    this.topics$ = this.topicService.getSubscribedTopics();
    this.userForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
    })
  }

  logout(): void { }

  onSave(): void { }

  unsubscribe(topic: Topic): void { }
}
