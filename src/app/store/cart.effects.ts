import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CartActions from './cart.actions';
import { CartService } from '../pages/cart-page/cart-page.service';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartService
  ) {}

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      mergeMap((action) =>
        this.cartService.getCart(action.userId).pipe(
          map((response) => {
            console.log('Loaded courses:', response); 
            return CartActions.loadCartSuccess({ courses: response }); 
          }),
          catchError((error) => of(CartActions.loadCartFailure({ error: error.message })))
        )
      )
    )
  );
  

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      mergeMap((action) =>
        this.cartService.addCourseToCart(action.userId, action.courseId).pipe(
          map(() => CartActions.addToCartSuccess({ courseId: action.courseId })),
          catchError((error) => of(CartActions.addToCartFailure({ error: error.message })))
        )
      )
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeFromCart),
      mergeMap((action) =>
        this.cartService.removeCourseFromCart(action.userId, action.courseId).pipe(
          map(() =>             
            CartActions.removeFromCartSuccess({ courseId: action.courseId }),
          ),
          catchError((error) =>
            of(CartActions.removeFromCartFailure({ error: error.message }))
          )
        )
      )
    )
  );
  

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      mergeMap((action) =>
        this.cartService.clearCart(action.userId).pipe(
          map(() => CartActions.clearCartSuccess()),  // Dispatch success action when cart is cleared
          catchError((error) => of(CartActions.clearCartFailure({ error: error.message })))
        )
      )
    )
  );
  

  buyCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.buyCourses),
      mergeMap((action) =>
        this.cartService.buyCourses(action.userId, action.courseIds).pipe(
          map(() => CartActions.buyCoursesSuccess({ courseIds: action.courseIds })),
          catchError((error) => of(CartActions.buyCoursesFailure({ error: error.message })))
        )
      )
    )
  );
}
