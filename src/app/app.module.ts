import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot([
      {
        path: 'main',
        loadChildren: () => import('./features/main/main.module').then(x => x.MainModule)
      },
      {
        path: 'numbers',
        loadChildren: () => import('./features/numbers/numbers.module').then(x => x.NumbersModule)
      },
      { path: '', pathMatch: 'full', redirectTo: 'main' }
    ]),
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


