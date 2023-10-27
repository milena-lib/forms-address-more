import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { Product } from 'src/app/features/main/model/product.model';
import { ProductsMainComponentStoreService } from '../../store/products-main-component-store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {

  @Input() products!: Product[];
  readonly dataSource = new MatTableDataSource<Product>();
  readonly displayedColumns = ['id', 'name', 'price'];
  readonly selectedId$ = this.store.selectedProductId$;
  readonly loadingProductId$ = this.store.loadingProductId$;

  constructor(private readonly store: ProductsMainComponentStoreService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.dataSource.data = this.products;
    }
  }

  ngOnInit(): void {

  }


  setSelectedProduct(product: Product) {
    this.store.setSelectedProduct(product.id);
  }




}
