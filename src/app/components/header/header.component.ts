import { Component, OnInit, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = {items: []};
  count = this.cartService.cartQuantity;
  @Input() 
  get cart() {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.count = cart.items.map((item)=>item.quantity).reduce((acc, current) => acc + current ,0)
  }
  

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log('header: ', this.cart);
  }

  getTotal(items: Array<CartItem>): number{
    return this.cartService.getTotal(items);
  }

  onClearCart(){
    this.cartService.clearCart();
  }

}
