import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BackArrowComponent } from '../../components/back-arrow/back-arrow.component';
import { MddButtonComponent } from '../../components/mdd-button/mdd-button.component';

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
    CommonModule,
    BackArrowComponent,
    MddButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  authForm!: FormGroup;
  errorMessage: string = "";

  readonly email = new FormControl("", [Validators.required, Validators.email])
  readonly password = new FormControl("", [Validators.required])

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
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
        error: (error: HttpErrorResponse) => {

          if (error.status === 401) {
            this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect."
          }
          else {
            console.log("error status: ", error.status);
            this.errorMessage = "An error occured"
          }
        },
      })
  }

  navigateBack(): void {
  }
}
