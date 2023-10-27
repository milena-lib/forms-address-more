import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, of, share, switchMap } from 'rxjs';
import { Product } from '../../model/product.model';
import { ProductsMainComponentStoreService } from './store/products-main-component-store.service';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductsMainComponentStoreService]
})
export class ProductsMainComponent implements OnInit {

  readonly products$ = this.store.filterProducts$;
  readonly productFreeShippingOnly$ = this.store.productFreeShippingOnly$;

  readonly selectedProduct$ = this.store.selectedProduct$;
  readonly isBusy$ = this.store.isBusy$;

  readonly freeshippingControl = new FormControl<boolean>(false);
  constructor(private readonly store: ProductsMainComponentStoreService) { }

  ngOnInit(): void {
    this.store.loadProducts();
    const checkBoxValueChange$ = this.freeshippingControl.valueChanges.pipe(map(valueFromCheckbox => valueFromCheckbox!));
    this.store.setFilter(checkBoxValueChange$);
  }

  mapOnServer(b: boolean) {
    return of(b.toString());
  }
}
