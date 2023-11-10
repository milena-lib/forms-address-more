import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Address, Works } from 'src/app/features/main/model/person.model';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressInputComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AddressInputComponent,
      multi: true
    },

  ]
})
export class AddressInputComponent implements OnInit, ControlValueAccessor, Validator {
  works: Works[] = [{ text: '', value: ''}];

  addressForm = this.fb.group({
    street: this.fb.control<string>('', [Validators.minLength(10)]),
    city: this.fb.control<string>(''),
    country: this.fb.control<string>(''),
    // works: this.fb.control<string>('')
  });

  changeCallBack: any;

  constructor(
    private readonly fb: FormBuilder
  ) { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    console.log('VALIDATE');
    if (this.addressForm.valid) {
      console.log('ADDRESS VALID');
      return null;
    }
    console.log('ADDRESS NOT VALID');
    return { 'addressNotValid': true };
  }

  registerOnValidatorChange?(fn: () => void): void {

  }


  writeValue(obj: any): void {
    this.addressForm.patchValue(obj as Address)
  }

  registerOnChange(fn: any): void {
    this.changeCallBack = fn;
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.addressForm.disable();
    } else {
      this.addressForm.enable();
    }
  }

  ngOnInit(): void {
    this.addressForm.valueChanges.subscribe(value => {
      if (this.changeCallBack) {
        this.changeCallBack(value);
      }
    });
  }

}
