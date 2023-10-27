import { Injectable, OnDestroy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, distinctUntilChanged, filter, map, Observable, pipe, Subject, switchMap, takeUntil, tap, toArray, withLatestFrom } from 'rxjs';


export interface NumbersMainState {
  currentValue: number;
  maximum: number;
  minimum: number;
}

@Injectable({
  providedIn: 'root'
})
export class NumbersMainComponentStoreService extends ComponentStore<NumbersMainState> {

  readonly currentValue$ = this.select(state => state.currentValue);
  readonly minimum$ = this.select(state => state.minimum);
  readonly maximum$ = this.select(state => state.maximum);

  readonly isBiggerThanMax$ = combineLatest([this.currentValue$, this.maximum$]).pipe(map(([value, max]) => value > max), distinctUntilChanged());
  readonly isLessThanMin$ = combineLatest([this.currentValue$, this.minimum$]).pipe(map(([value, min]) => value < min), distinctUntilChanged());
  //readonly isLessThanMin$ = this.minimum$.pipe(withLatestFrom(this.currentValue$), map(([value, min]) => value < min), distinctUntilChanged());


  readonly plus = this.updater((state: NumbersMainState) => {
    return { ...state, currentValue: state.currentValue + 1 };
  });

  readonly minus = this.updater((state: NumbersMainState) => {
    return { ...state, currentValue: state.currentValue - 1 };
  });

  readonly setMaximum = this.updater((state: NumbersMainState, maximum: number) => {
    return { ...state, maximum };
  });

  readonly setMinumum = this.updater((state: NumbersMainState, minimum: number) => {
    return { ...state, minimum };
  });

  constructor() {
    super({ currentValue: 5, maximum: 10, minimum: 0 })
  }



}
