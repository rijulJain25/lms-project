import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError, first } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

export function emailExistsValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return control.valueChanges.pipe(
      debounceTime(500), 
      switchMap(email => {
        return authService.checkEmailExists(email).pipe(
          map((exists: boolean) => {
            return exists ? { emailTaken: true } : null;
          }),
          catchError(() => of(null)) 
        );
      }),
      first()
    );
  };
}
