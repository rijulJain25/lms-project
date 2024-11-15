import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleRole } from 'src/app/store/role.actions';
import { selectIsInstructor } from 'src/app/store/role.selectors';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  isInstructor$ = this.store.select(selectIsInstructor); 

  constructor(private store: Store) {}

  ngOnInit(): void {}

  toggleForm(): void {
    this.store.dispatch(toggleRole()); 
  }
}
