import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { buyCourses, clearCart, loadCart, removeFromCart, removeFromCartSuccess } from 'src/app/store/cart.actions';
import { Observable } from 'rxjs';
import { selectCart, selectCartLoading } from 'src/app/store/cart.selector';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from './cart-page.service';
import { SnackbarService } from 'src/app/components/snackbar.service';
import { DashboardService } from '../dashboard-page/dashboard.service';

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
  subsChk: String = 'Free';

  constructor(private store: Store, private authService: AuthService, private cartService: CartService, private snackBar: SnackbarService, private dash: DashboardService) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUser().userId;
    this.store.dispatch(loadCart({ userId }));
    this.cart$ = this.store.select(selectCart);
    this.cartData = this.store.select(selectCart).subscribe((cart) => {
      this.cartData = cart;
    })
    this.loading$ = this.store.select(selectCartLoading);
    this.currentUser = this.authService.getCurrentUser();
    this.subsChk = this.currentUser.subscription;
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

    this.cartService.buyCourses(userId, courseIds).subscribe(
      (response) => {
        this.snackBar.showSuccess("Course bought successfully");
        console.log('Response after course purchase:', response);
        
        this.dash.getCurrentUserData().subscribe((updatedUser) => {
          this.currentUser = updatedUser;
          console.log("Updated currentUser:", this.currentUser);

          this.cartService.updateLocalStorageCourses(this.currentUser);

          this.store.dispatch(clearCart({ userId }));
        });
      },
      (error) => {
        this.snackBar.showError("Error buying courses. Please try again.");
        console.error("Error during course purchase:", error);
      }
    );
  }

  private getCourseIdsFromCart(): string[] {
    return this.cartData.map((item: { courseDetails: { course_id: any; }; }) => item.courseDetails.course_id);
  }

  DiscountPrice(DisPrice: number):number{
    return Math.round(DisPrice *0.7 *100)/100;
  }
}
