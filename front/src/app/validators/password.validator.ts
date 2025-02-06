import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(required: boolean = true): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const value: string = control.value || '';

    if (!value && required) {
      return { password: 'Le mot de passe est requis' };
    }

    if (!value && !required) {
      return null;
    }

    const hasMinLength = value.length >= 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /[\W_]/.test(value);

    if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar) {
      return { password: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial' };
    }

    return null;
  };
}
