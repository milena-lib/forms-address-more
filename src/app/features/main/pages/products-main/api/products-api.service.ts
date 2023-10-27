import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Product, ProductFullDetails } from '../../../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
  arr: Product[] = [];

  getProducts(): Observable<Product[]> {

    return of(this.arr).pipe(delay(1500));
  }

  getProductById(id: number): Observable<ProductFullDetails | null> {
    const p = this.arr.find(x => id == x.id);
    if (p) {
      const pRes: ProductFullDetails = { ...p, description: 'ITEM DES' };
      return of(pRes).pipe(delay(500));
    }
    return of(null);
  }

  updateProduct(product: ProductFullDetails): Observable<Product> {
    const p = this.arr.find(x => product.id == x.id);
    if (p) {
      p.isFreeShipping = product.isFreeShipping;
      p.name = product.name;
      p.price = product.price;
    }
    return of({ ...p } as Product);
  }


  constructor(private http: HttpClient) {
    for (let index = 1; index < 6; index++) {
      this.arr.push({ id: index, name: 'Bamba' + index, price: 10.2 * index, isFreeShipping: index % 3 === 0 })
    }


  }
}

