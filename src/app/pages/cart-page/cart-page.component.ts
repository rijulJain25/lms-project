import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { buyCourses, clearCart, loadCart, removeFromCart, removeFromCartSuccess } from 'src/app/store/cart.actions';
import { Observable } from 'rxjs';
import { selectCart, selectCartLoading } from 'src/app/store/cart.selector';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from './cart-page.service';
import { SnackbarService } from 'src/app/components/snackbar.service';

export interface CartItem {
  courseId: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart$!: Observable<any>;
  cartData!: any;
  loading$!: Observable<boolean>;
  currentUser: any;

  constructor(private store: Store, private authService: AuthService, private cartService: CartService, private snackBar: SnackbarService) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUser().userId;
    this.store.dispatch(loadCart({ userId }));
    this.cart$ = this.store.select(selectCart);
    this.cartData = this.store.select(selectCart).subscribe((cart) => {
      this.cartData = cart;
    })
    this.loading$ = this.store.select(selectCartLoading);
  }

  removeFromCart(courseId: string): void {
    const userId = this.authService.getCurrentUser().userId;
    this.store.dispatch(removeFromCart({ userId, courseId }));  
    window.location.reload();
  }

  buyCourses(): void {
    const userId = this.authService.getCurrentUser().userId;
    const courseIds = this.getCourseIdsFromCart();
    console.log("These are the course IDs:", courseIds);
    this.cartService.buyCourses(userId, courseIds).subscribe(() => {
      this.snackBar.showSuccess("Course bought successfully")
      this.cartService.updateLocalStorageCourses(this.currentUser);
      this.store.dispatch(clearCart({ userId }));
    });
  }

  private getCourseIdsFromCart(): string[] {
    return this.cartData.map((item: { courseDetails: { course_id: any; }; }) => item.courseDetails.course_id);
  }
}
