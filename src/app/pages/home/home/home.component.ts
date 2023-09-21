import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT:{ [id:number]:number} ={1: 400, 3: 335, 4:350}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  columnCount = 3;
  category?: string;
  rowHeight = ROWS_HEIGHT[this.columnCount];
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe(data => {
      this.products = data;
    });
  }

  updateColCountChange(colsCountChange: number):void {
    this.columnCount = colsCountChange;
    this.rowHeight = ROWS_HEIGHT[this.columnCount];
  }

  onShowCategory(category: string): void {
    this.category = category;
    this.getProducts();
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

  onItemCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }
  onSortChange(sort: string):void {
    this.sort = sort;
    this.getProducts();
  }

  ngOnDestroy(): void {
      this.productSubscription?.unsubscribe();
  }

}
