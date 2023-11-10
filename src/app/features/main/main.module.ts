import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainRootPageComponent } from './main-root-page/main-root-page.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalcComponent } from './components/calc/calc.component';
import { ProductsMainComponent } from './pages/products-main/products-main.component';
import { EditProductComponent } from './pages/products-main/components/edit-product/edit-product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { ProductListComponent } from './pages/products-main/components/product-list/product-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { EditPersonPageComponent } from './pages/edit-person-page/edit-person-page.component';
import { NumberUpDownComponent } from 'src/app/shared/controls/number-up-down/number-up-down.component';
import { AddressInputComponent } from 'src/app/shared/controls/address-input/address-input.component';
import { HobbiesInputComponent } from 'src/app/shared/controls/hobbies-input/hobbies-input.component';
import { WorksCheckboxesComponent } from 'src/app/shared/controls/works-checkboxes/works-checkboxes.component';

@NgModule({
  declarations: [
    MainRootPageComponent,
    SearchComponent,
    CalcComponent,
    ProductsMainComponent,
    EditProductComponent,
    ProductListComponent,
    EditPersonPageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    NumberUpDownComponent,
    AddressInputComponent,
    HobbiesInputComponent,
    WorksCheckboxesComponent

  ]
})
export class MainModule { }
