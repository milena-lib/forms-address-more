import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumbersRootComponent } from './numbers-root/numbers-root.component';

const routes: Routes = [{
  path: '', component: NumbersRootComponent, children: [
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NumbersRoutingModule { }
