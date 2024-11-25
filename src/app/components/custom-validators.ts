import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator to disallow numbers in the name field
export function nameNoNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const name = control.value;
    const namePattern = /^[a-zA-Z\s]*$/;

    if (name && !namePattern.test(name)) {
      return { 'invalidName': { value: control.value } };
    }
    return null;
  };
}
