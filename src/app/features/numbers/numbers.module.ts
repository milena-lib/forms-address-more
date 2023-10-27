import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumbersRoutingModule } from './numbers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumbersRootComponent } from './numbers-root/numbers-root.component';
import { NumbersFormComponent } from './numbers-root/components/numbers-form/numbers-form.component';



@NgModule({
  declarations: [
    NumbersRootComponent,
    NumbersFormComponent
  ],
  imports: [
    CommonModule,
    NumbersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NumbersModule { }
