import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  currentSubscription: string = 'Free'; 
  subscriptionProgress: number = 0;  

  constructor(private subs: SubscriptionService) { }

  ngOnInit(): void {
    const storedSubscription = localStorage.getItem('userSubscription');
    if (storedSubscription) {
      this.currentSubscription = storedSubscription;
      this.updateSubscriptionProgress(this.currentSubscription);
    } else {
      this.subs.getUserData().subscribe((user) => {
        this.currentSubscription = user.subscription;
        this.updateSubscriptionProgress(this.currentSubscription);
      });
    }
  }

  updateSubscriptionProgress(subscription: string) {
    if (subscription === 'Free') {
      this.subscriptionProgress = 0;
    } else if (subscription === 'Basic') {
      this.subscriptionProgress = 50;  
    } else if (subscription === 'Premium') {
      this.subscriptionProgress = 100; 
    }
  }

  onSubscriptionChange(subscription: string): void {
    this.subs.updateSubscription(subscription).subscribe((response) => {
      console.log('Subscription updated:', response);
      this.currentSubscription = subscription;
      this.updateSubscriptionProgress(subscription);
    });
  }
}
