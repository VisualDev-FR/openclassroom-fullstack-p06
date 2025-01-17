import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { LoginRequest } from '../../interfaces/loginRequest.interface';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class AuthComponent implements OnInit {

  authForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    })
  }

  validatorEmailRequired(isLogin: boolean) {
    return (emailControl: AbstractControl): ValidationErrors | null => {
      if (!isLogin && emailControl.value === "") {
        return { "required": "Email is required" };
      }
      return null;
    };
  }

  onSubmit(): void {

    this.authService.login(this.authForm.value as LoginRequest)
      .pipe(first())
      .subscribe({
        next: (response: SessionInformation) => {
          this.sessionService.logIn(response);
          this.router.navigate(['/articles']);
        },
        error: (e: Error) => {
          console.log(e);
        },
      })
  }

  navigateBack(): void {
    this.router.navigate(["/"]);
  }
}
