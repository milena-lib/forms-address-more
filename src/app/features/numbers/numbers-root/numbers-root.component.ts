import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { NumbersMainComponentStoreService } from './store/numbers-main-component-store.service';

@Component({
  selector: 'app-numbers-root',
  templateUrl: './numbers-root.component.html',
  styleUrls: ['./numbers-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NumbersMainComponentStoreService]
})
export class NumbersRootComponent implements OnInit {

  // currentValue$ = this.store.currentValue$;
  // isBiggerThanMax$ = this.store.isBiggerThanMax$;
  // isLessThanMin$ = this.store.isLessThanMin$;

  state$ = combineLatest([this.store.currentValue$, this.store.isBiggerThanMax$, this.store.isLessThanMin$, this.store.minimum$, this.store.maximum$])
    .pipe(map(([currentValue, isBiggerThanMax, isLessThanMin, min, max]) => ({ currentValue, isBiggerThanMax, isLessThanMin, min, max })));


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: NumbersMainComponentStoreService
  ) { }

  ngOnInit(): void {

  }

  plus() {
    this.store.plus();
  }

  minus() {
    this.store.minus();
  }

}
