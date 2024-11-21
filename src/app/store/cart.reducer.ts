import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';

export interface CartState {
  courses: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: CartState = {
  courses: [],
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialState,

  on(CartActions.loadCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CartActions.loadCartSuccess, (state, { courses }) => ({
    ...state,
    courses: courses, 
    loading: false,
    error: null,
  })),

  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    courses: [],
    loading: false,
    error: error,
  })),

  on(CartActions.addToCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CartActions.addToCartSuccess, (state, { courseId }) => ({
    ...state,
    loading: false,
    courses: [...state.courses, { courseId }],
  })),

  on(CartActions.addToCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(CartActions.removeFromCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CartActions.removeFromCartSuccess, (state, { courseId }) => {
    console.log(courseId);
    
    let newCourse = state.courses;
    newCourse = newCourse.filter(course => course.courseId !== courseId);
    return {
        ...state,
        loading: false,
        courses: newCourse,
    }
  }),
  

  on(CartActions.removeFromCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(CartActions.clearCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CartActions.clearCartSuccess, (state) => ({
    ...state,
    loading: false,
    courses: [],
  })),

  on(CartActions.clearCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(CartActions.clearCartSuccess, (state) => ({
    ...state,
    courses: [],  // Clear the cart on success
    loading: false,
    error: null,
  })),

  on(CartActions.clearCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(CartActions.buyCourses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CartActions.buyCoursesSuccess, (state) => ({
    ...state,
    loading: false,
    courses: [], 
    error: null,
  })),

  on(CartActions.buyCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
