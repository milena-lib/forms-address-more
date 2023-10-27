import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, map } from 'rxjs';
import { NumbersMainComponentStoreService } from '../../store/numbers-main-component-store.service';

@Component({
  selector: 'app-numbers-form',
  templateUrl: './numbers-form.component.html',
  styleUrls: ['./numbers-form.component.scss']
})
export class NumbersFormComponent implements OnInit, OnChanges {

  @Input() data!: { min: number, max: number };

  mainForm = this.formBuilder.group({
    min: this.formBuilder.control<number>(0, [Validators.min(-5)]),
    max: this.formBuilder.control<number>(0)
  })

  constructor(
    private store: NumbersMainComponentStoreService,
    private formBuilder: FormBuilder) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.mainForm.patchValue(this.data);
    }
  }

  ngOnInit(): void {
    this.store.setMaximum(this.mainForm.controls.max.valueChanges.pipe(map(o => o!)));
    this.store.setMinumum(this.mainForm.controls.min.valueChanges.pipe(
      filter(x => this.mainForm.controls.min.valid),
      map(o => o!)));
  }

}
