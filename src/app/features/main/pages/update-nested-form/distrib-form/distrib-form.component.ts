import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-distrib-form',
  templateUrl: './distrib-form.component.html',
  styleUrls: ['./distrib-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DistribFormComponent,
      multi: true
    }
  ]
})
export class DistribFormComponent implements OnInit, ControlValueAccessor {
  @Input() parentCtrlName: string = "";
  @Input() isDistribution: boolean = false;

  distribForm = this.fb.group({
    sims: this.fb.control<any[]>([]),
    devices: this.fb.control<any[]>([]),
    accessories: this.fb.control<any[]>([])
  })

  callBack: any;

  constructor(private readonly fb: FormBuilder) { }

  writeValue(obj: any): void {
    this.distribForm.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this.callBack = fn;
  }

  registerOnTouched(fn: any): void {

  }
  ngOnInit(): void {
    this.distribForm.valueChanges.subscribe(entitiesValue => {
      // console.log('CHANGED', entitiesValue);
      if (this.callBack) {
        this.callBack(entitiesValue);
      }
    })
  }

}
