import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {

  xControl = new FormControl<number>(22);
  yControl = new FormControl<number>(102);
  sum$ = combineLatest([
    this.xControl.valueChanges.pipe(startWith(this.xControl.value)),
    this.yControl.valueChanges.pipe(startWith(this.yControl.value))])
    .pipe(map(([x, y]) => x! + y!));

  constructor() { }

  ngOnInit(): void {
  }

}
