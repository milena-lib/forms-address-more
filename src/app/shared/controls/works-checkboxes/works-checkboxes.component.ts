import { CommonModule } from '@angular/common';
import { Component, OnInit, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-works-checkboxes',
  templateUrl: './works-checkboxes.component.html',
  styleUrls: ['./works-checkboxes.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: WorksCheckboxesComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: WorksCheckboxesComponent,
      multi: true
    }
  ]
})
export class WorksCheckboxesComponent implements OnInit, ControlValueAccessor {
  value = [];
  changeCallback: any;

  workForm = this.fb.group({
    work: this.fb.control<string>('')
  });

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    console.log('VALIDATE');
    if (this.workForm.valid) {
      // console.log('ADDRESS VALID');
      return null;
    }
    // console.log('ADDRESS NOT VALID');
    return { 'addressNotValid': true };
  }


  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.changeCallback = fn;
  }

  registerOnTouched(fn: any): void {

  }

}
