import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items: []});
  cartQuantity = 0;

  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if(itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({items});
    this._snackBar.open('1 item added to the cart', 'Ok', { duration: 3000});
    this.cartQuantity += 1;
    }

    getTotal(items: Array<CartItem>): number {
      return items
        .map(item => item.price * item.quantity)
        .reduce((acc, current)=> { return current + acc}, 0)
    }

    clearCart(){
      this.cart.next({items: []});
      this._snackBar.open('Cleared all the items from cart.', 'Okay', {duration: 2000});
    }

    removeProduct(id: number): void{
      const items = [...this.cart.value.items];
      const filteredCart = items.filter(item => item.id !== id);
      this.cart.next({items: filteredCart});
      this._snackBar.open('One Item removed from cart.', 'Okay', {duration: 2000});
    }

    increaseOne(id: number):void {
      const items = [...this.cart.value.items];
      const updatedItems = items.map(item => {
        if(item.id === id){
          item.quantity += 1;
          this.cartQuantity += 1;
        }
        return item;
      })
      this.cart.next({items: updatedItems});
    }
    decreaseOne(id: number):void {
      const items = [...this.cart.value.items];
      const updatedItems = items.map(item => {
        if(item.id === id && item.quantity > 0){
          item.quantity -= 1;
          this.cartQuantity -= 1;
        }
        return item;
      })
      if(this.cartQuantity < 1){
        this.cart.next({items: []});
      }else{
        this.cart.next({items: updatedItems});
        this._snackBar.open('One Item removed from cart.', 'Okay', {duration: 2000});
      }
    }
}
