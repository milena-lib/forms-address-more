import { Injectable, OnDestroy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, distinctUntilChanged, filter, map, Observable, pipe, Subject, switchMap, takeUntil, tap, toArray, withLatestFrom } from 'rxjs';

import { Product, ProductFullDetails } from '../../../model/product.model';
import { ProductsApiService } from '../api/products-api.service';

export interface ProductsMainState {
  products: Product[];
  selectedProduct: ProductFullDetails | null;
  isBusy: boolean;
  loadingProductId: number | null;
  filterByShipping: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsMainComponentStoreService extends ComponentStore<ProductsMainState> {

  readonly products$ = this.select(state => state.products);
  readonly selectedProduct$ = this.select(state => state.selectedProduct)
  readonly isBusy$ = this.select(state => state.isBusy).pipe(distinctUntilChanged());
  readonly selectedProductId$ = this.selectedProduct$.pipe(filter(o => o !== null), map(o => o!.id)); readonly loadingProductId$ = this.select(state => state.loadingProductId);
  readonly filterByShipping$ = this.select(state => state.filterByShipping);
  readonly filterProducts$ = combineLatest([this.filterByShipping$, this.products$]).pipe(map(([filterByShipping, currentList]) =>
    currentList.filter(item => filterByShipping ? item.isFreeShipping : true)))

  readonly productFreeShippingOnly$ = this.products$.pipe(map(o => o.filter(p => p.isFreeShipping)));

  constructor(private readonly api: ProductsApiService) {
    super({ products: [], selectedProduct: null, isBusy: false, loadingProductId: null, filterByShipping: false });
  }

  readonly setFilter = this.updater((state: ProductsMainState, newFilterByShippingValue: boolean) => {
    if (state.filterByShipping === newFilterByShippingValue) {
      return state;
    }
    return { ...state, filterByShipping: newFilterByShippingValue };
  })

  readonly loadProducts = this.effect<void>(pipe(
    tap(() => this.patchState({ isBusy: true })),
    switchMap(() => this.api.getProducts()),
    tap(products => this.patchState({ products, isBusy: false }))
  ));

  readonly setSelectedProduct = this.effect((productId$: Observable<number>) => productId$.pipe(
    tap(id => this.patchState({ loadingProductId: id, isBusy: true })),
    switchMap(id => this.api.getProductById(id)),
    tap(product => this.patchState({ selectedProduct: product, isBusy: false, loadingProductId: null }))
  ));

  readonly updateProductDetails = this.effect((product$: Observable<ProductFullDetails>) => product$.pipe(
    tap(() => this.patchState({ isBusy: true })),
    switchMap(product => this.api.updateProduct(product)),
    tap(product => {
      this.updateProductDetailsInStore(product);
      this.setSelectedProduct(product.id);
      this.patchState({ isBusy: false });
    })));

  private readonly updateProductDetailsInStore = this.updater((state: ProductsMainState, product: Product) => {
    const products = state.products.map(item => {
      if (product.id === item.id) {
        return { ...product };
      }
      return item;
    });
    return { ...state, products };
  });
}
