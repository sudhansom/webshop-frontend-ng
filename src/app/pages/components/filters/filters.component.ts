import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: Array<string> | undefined;

  categorySubs?: Subscription;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.categorySubs = this.storeService.getAllCategories().subscribe(data => {
      this.categories = data;
    })
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
      this.categorySubs?.unsubscribe();
  }

}
