import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

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
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;
  authForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  get usernameLabel() { return this.isLogin ? "E-mail ou nom d'utilisateur" : "Nom d'utilisateur" };
  get submitButtonLabel() { return this.isLogin ? "Se connecter" : "S'inscrire" };

  ngOnInit(): void {
    this.isLogin = this.route.toString().includes("login")
    this.authForm = this.formBuilder.group({
      email: ["", [Validators.email, this.validatorEmailRequired(this.isLogin)]],
      password: ["", [Validators.required]],
      username: ["", [Validators.required]],
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

    if (this.authForm.valid) {
      alert("valid form!");
    }
    else {
      alert("invalid form!");
    }
  }

  navigateBack(): void {
    this.router.navigate(["/"]);
  }
}
