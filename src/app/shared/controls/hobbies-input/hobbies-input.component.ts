import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Hobby } from 'src/app/features/main/model/person.model';

@Component({
  selector: 'app-hobbies-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './hobbies-input.component.html',
  styleUrls: ['./hobbies-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: HobbiesInputComponent,
      multi: true
    }
  ]
})
export class HobbiesInputComponent implements OnInit, ControlValueAccessor {

  mainGroup = this.fb.group({
    hobbiesFormArray: this.fb.array<FormGroup>([])
  })

  callBack: any;

  constructor(private readonly fb: FormBuilder) { }

  writeValue(obj: any): void {
    const values = obj as Hobby[];
    this.mainGroup.controls.hobbiesFormArray.clear();
    for (let index = 0; index < values.length; index++) {
      this.mainGroup.controls.hobbiesFormArray.push(this.fb.group({
        name: this.fb.control<string>(''),
        skill: this.fb.control<number>(1)
      }));
    }
    this.mainGroup.controls.hobbiesFormArray.setValue(obj);

    console.log("obj: ", obj);
    console.log("mainGroup.controls.hobbiesFormArray: ", this.mainGroup.controls.hobbiesFormArray.value);
  }

  registerOnChange(fn: any): void {
    this.callBack = fn;
  }

  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

  add() {
    this.mainGroup.controls.hobbiesFormArray.push(this.fb.group({
      name: this.fb.control<string>(''),
      skill: this.fb.control<number>(1)
    }));
    if (this.callBack) {
      this.callBack(this.mainGroup.controls.hobbiesFormArray.value);
    }
  }
  ngOnInit(): void {
    this.mainGroup.controls.hobbiesFormArray.valueChanges.subscribe(hobbiesValue => {
      console.log('CHANGED', hobbiesValue);
      if (this.callBack) {
        this.callBack(hobbiesValue);
      }
    })
  }

}
