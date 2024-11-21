import { createAction, props } from '@ngrx/store';

export const loadCart = createAction(
  '[Cart] Load Cart',
  props<{ userId: string }>()
);

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ courses: any[] }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: string }>()
);

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ courseId: string; userId: string }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add To Cart Success',
  props<{ courseId: string }>()
);

export const addToCartFailure = createAction(
  '[Cart] Add To Cart Failure',
  props<{ error: string }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ courseId: string; userId: string }>()
);

export const removeFromCartSuccess = createAction(
  '[Cart] Remove From Cart Success',
  props<{ courseId: string }>()
);

export const removeFromCartFailure = createAction(
  '[Cart] Remove From Cart Failure',
  props<{ error: string }>()
);

export const clearCart = createAction(
    '[Cart] Clear Cart',
    props<{ userId: string }>()
  );
  
  export const clearCartSuccess = createAction(
    '[Cart] Clear Cart Success'
  );
  
  export const clearCartFailure = createAction(
    '[Cart] Clear Cart Failure',
    props<{ error: string }>()
  );

export const buyCourses = createAction(
    '[Cart] Buy Courses',
    props<{ userId: string; courseIds: string[] }>()
  );
  
  export const buyCoursesSuccess = createAction(
    '[Cart] Buy Courses Success',
    props<{ courseIds: string[] }>()
  );
  
  export const buyCoursesFailure = createAction(
    '[Cart] Buy Courses Failure',
    props<{ error: string }>()
  );