import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-number-up-down',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './number-up-down.component.html',
  styleUrls: ['./number-up-down.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberUpDownComponent,
      multi: true
    }
  ]
})
export class NumberUpDownComponent implements OnInit, ControlValueAccessor {
  value = 0;
  changeCallback: any;
  disabled = false;

  constructor() { }

  writeValue(obj: any): void {
    this.value = obj;
    console.log("writeValue: ", this.value);
  }

  registerOnChange(fn: any): void {
    this.changeCallback = fn;
    console.log("registerOnChange: ", this.changeCallback);
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    console.log("setDisabledState: ", this.disabled);
  }

  ngOnInit(): void {
  }

  plus() {
    this.value++;
    this.onChange();

  }

  minus() {
    this.value--;
    this.onChange();
  }

  private onChange() {
    if (this.changeCallback) {
      this.changeCallback(this.value);
    }
  }

}
