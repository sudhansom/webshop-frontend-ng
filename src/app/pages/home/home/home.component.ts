import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

const ROWS_HEIGHT:{ [id:number]:number} ={1: 400, 3: 335, 4:350}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  columnCount = 3;
  category?: string;
  rowHeight = ROWS_HEIGHT[this.columnCount];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  updateColCountChange(colsCountChange: number):void {
    this.columnCount = colsCountChange;
    this.rowHeight = ROWS_HEIGHT[this.columnCount];
  }

  onShowCategory(category: string): void {
    this.category = category;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }

}
