import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.model';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  cart: Cart = {items: []};

  constructor(private cartService: CartService){
  }

  ngOnInit(): void {
      this.cartService.cart.subscribe(data => this.cart = data);
  }
}
