import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BackArrowComponent } from '../../components/back-arrow/back-arrow.component';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { first } from 'rxjs';
import { SessionInformation } from '../../interfaces/sessionInformation.interface';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MddButtonComponent } from '../../components/mdd-button/mdd-button.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-register',
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
    NavbarComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  authForm!: FormGroup;
  errorMessage: string = "";

  readonly username = new FormControl("", [Validators.required])
  readonly email = new FormControl("", [Validators.required, Validators.email])
  readonly password = new FormControl("", [Validators.required])

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
    })
  }

  onSubmit(): void {

    this.authService.register(this.authForm.value as RegisterRequest)
      .pipe(first())
      .subscribe({
        next: (response: SessionInformation) => {
          this.sessionService.logIn(response);
          this.router.navigate(['/articles']);
        },
        error: (error: HttpErrorResponse) => {

          if (error.status === 409) {
            this.errorMessage = "Un compte est déjà associé à cet email."
          }
          else {
            this.errorMessage = `Une erreur est survenue (${error.status})`;
          }
        },
      })
  }

}
