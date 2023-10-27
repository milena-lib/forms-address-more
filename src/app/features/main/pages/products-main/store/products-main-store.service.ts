// import { ReturnStatement } from '@angular/compiler';
// import { Injectable, OnDestroy } from '@angular/core';
// import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, Subject, takeUntil, tap, withLatestFrom } from 'rxjs';
// import { Product, ProductFullDetails } from '../../../model/product.model';
// import { ProductsApiService } from '../api/products-api.service';
// import { ProductsMainComponent } from '../products-main.component';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductsMainStoreService implements OnDestroy {

//   private readonly destroy$ = new Subject<void>();
//   private readonly productsSubject = new BehaviorSubject<Product[]>([]);
//   private readonly selectedProductSubject = new BehaviorSubject<ProductFullDetails | null>(null);
//   private readonly isBusySubject = new BehaviorSubject<boolean>(false);
//   private readonly filterByShippingSubject = new BehaviorSubject<boolean>(false);

//   private readonly loadingProductIdSubject$ = new BehaviorSubject<number | null>(null);

//   readonly products$ = this.productsSubject.asObservable();
//   readonly filterProducts$ = combineLatest([this.filterByShippingSubject, this.products$]).pipe(map(([filterByShipping, currentList]) =>
//     currentList.filter(item => filterByShipping ? item.isFreeShipping : true)))

//   readonly productFreeShippingOnly$ = this.products$.pipe(map(o => o.filter(p => p.isFreeShipping)));

//   readonly selectedProduct$ = this.selectedProductSubject.asObservable();
//   readonly isBusy$ = this.isBusySubject.pipe(distinctUntilChanged());
//   readonly loadingProductId$ = this.loadingProductIdSubject$.asObservable();
//   readonly selectedProductId$ = this.selectedProduct$.pipe(filter(o => o !== null), map(o => o!.id));

//   constructor(private readonly api: ProductsApiService) { }

//   loadProducts() {
//     this.isBusySubject.next(true);
//     this.api.getProducts().pipe(
//       takeUntil(this.destroy$)).subscribe(p => {
//         this.productsSubject.next(p);
//         this.isBusySubject.next(false);
//       });
//   }

//   setSelectedProduct(productId: number) {
//     this.loadingProductIdSubject$.next(productId);
//     this.isBusySubject.next(true);
//     this.api.getProductById(productId).pipe(
//       takeUntil(this.destroy$)).subscribe(o => {
//         this.selectedProductSubject.next(o);
//         this.isBusySubject.next(false);
//         this.loadingProductIdSubject$.next(null);
//       });
//   }

//   updateProductDetails(product: ProductFullDetails) {
//     this.isBusySubject.next(true);
//     this.api.updateProduct(product).pipe(withLatestFrom(this.products$))
//       .subscribe(([p, currentList]) => {
//         this.isBusySubject.next(false);
//         this.updateProductInStore(p, currentList);
//       });
//   }

//   setFilter(filterByShipping: boolean) {
//     this.filterByShippingSubject.next(filterByShipping);
//   }

//   private updateProductInStore(p: Product, list: Product[]) {
//     const products = list.map(item => {
//       if (p.id === item.id) {
//         return { ...p };
//       }
//       return item;
//     });
//     this.productsSubject.next(products);
//   }

//   ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

// }
