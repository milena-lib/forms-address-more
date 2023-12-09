import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StateStoreService } from '../store/state-store.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MainFormComponent,
      multi: true
    }
  ]
})
export class MainFormComponent implements OnInit, ControlValueAccessor {
  @Input() parentCtrlName: string = "";
  
  mainGroup = this.fb.group({
    sims: this.fb.control<any[]>([]),
    devices: this.fb.control<any[]>([]),
    accessories: this.fb.control<any[]>([])
  })

  callBack: any;

  constructor(private readonly fb: FormBuilder, private readonly stateStore: StateStoreService) { }

  writeValue(obj: any): void {
    this.mainGroup.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this.callBack = fn;
  }

  registerOnTouched(fn: any): void {

  }
  ngOnInit(): void {
    this.mainGroup.valueChanges.subscribe(productsValue => {
      // console.log('CHANGED', productsValue);
      if (this.callBack) {
        this.callBack(productsValue);
      }

      const entityData = { parentCtrl: this.parentCtrlName, entityData: productsValue };
      this.stateStore.setStateForm(entityData);
    })
  }

}
