import { Component, OnInit } from '@angular/core';

import { Cart , CartItem} from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [
    {
      product: 'https://via.placeholder.com/150',
      name: 'sneakers',
      price: 150,
      quantity: 1,
      id: 1
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'sneakers',
      price: 150,
      quantity: 5,
      id: 2
    }
]}

  dataSource: Array<CartItem> = [];
  displayColumns: Array<string> = ['product', 'name', 'price', 'quantity', 'total', 'action'];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe(data => {
      this.cart = data;
      this.dataSource = this.cart.items;
    });

    
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(){
    this.cartService.clearCart();
  }

  removeOneProduct(id: number){
    this.cartService.removeProduct(id);
  }

  increaseOne(id: number):void {
    this.cartService.increaseOne(id);
  }

  decreaseOne(id: number):void {
    this.cartService.decreaseOne(id);
  }

}
