import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainRootPageComponent } from './main-root-page/main-root-page.component';
import { EditPersonPageComponent } from './pages/edit-person-page/edit-person-page.component';
import { ProductsMainComponent } from './pages/products-main/products-main.component';
import { UpdateNestedFormComponent } from './pages/update-nested-form/update-nested-form.component';

const routes: Routes = [{
  path: '', component: MainRootPageComponent, children: [
    { path: 'products', component: ProductsMainComponent },
    { path: 'edit', component: EditPersonPageComponent },
    { path: 'update', component: UpdateNestedFormComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
