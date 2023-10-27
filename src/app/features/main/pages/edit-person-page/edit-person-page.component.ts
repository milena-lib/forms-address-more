import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Address, Hobby, Person } from '../../model/person.model';

@Component({
  selector: 'app-edit-person-page',
  templateUrl: './edit-person-page.component.html',
  styleUrls: ['./edit-person-page.component.scss']
})
export class EditPersonPageComponent implements OnInit {

  personToEdit: Person = {
    id: 1, lastName: 'Dahan', firstName: 'Tal', age: 13,
    address: { street: 'HaAmal', city: 'Rosh Ha', country: 'Israel' },
    hobbies: [{ name: 'C#', skill: 2 }, { name: 'COLBOL', skill: 9 }]
  };
  personForm = this.fb.group({
    id: this.fb.control<number>(-1),
    firstName: this.fb.control<string>(''),
    lastName: this.fb.control<string>(''),
    age: this.fb.control<number>(0),
    address: this.fb.control<Address | null>(null),
    hobbies: this.fb.control<Hobby[]>([])
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.personForm.patchValue(this.personToEdit);
    this.personForm.controls.age.disable();

    setTimeout(() => {
      this.personForm.controls.age.enable();
    }, 5000);
  }

}
