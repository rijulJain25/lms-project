import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
