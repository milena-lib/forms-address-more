import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StateStoreService } from './store/state-store.service';

@Component({
  selector: 'app-update-nested-form',
  templateUrl: './update-nested-form.component.html',
  styleUrls: ['./update-nested-form.component.scss']
})
export class UpdateNestedFormComponent implements OnInit {

  simsMaxAmount = [];
  devicesMaxAmount = [];
  accessoriesMaxAmount = [];

  productsToEdit: any = {
    mainProducts:  {
      sims: [{ amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0},{ amount: 0, amountNew: 0 }],
      devices: [{ amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0 }],
      accessories: [{ amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0 }],
    },
    distribProducts0: {
      sims: [{ amount: 0, amountNew: 0 }, { amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0 }],
      devices: [{ amount: 0, amountNew: 0 }, { amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0 }],
      accessories: [{ amount: 0, amountNew: 0 }, { amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0 }],
    },
    distribProducts1: {
      sims: [{ amount: 0, amountNew: 0 }, { amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0 }],
      devices: [{ amount: 0, amountNew: 0 }, { amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0 }],
      accessories: [{ amount: 0, amountNew: 0 }, { amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0 }],
    },
    distribProducts2: {
      sims: [{ amount: 0, amountNew: 0 }, { amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0 }],
      devices: [{ amount: 0, amountNew: 0 }, { amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0 }],
      accessories: [{ amount: 0, amountNew: 0 }, { amount: 0, amountNew: 0 },{ amount: 0, amountNew: 0 }],
    }
  };

  productsForm = this.fb.group({
    mainProducts: this.fb.control<any>({}),
    distribProducts0: this.fb.control<any>({}),
    distribProducts1: this.fb.control<any>({}),
    distribProducts2: this.fb.control<any>({})
  })

  isShowDistribForm = false;

  readonly formState$ = this.stateStore.formState$;

  constructor(private fb: FormBuilder, private readonly stateStore: StateStoreService) { }

  ngOnInit(): void {
    this.productsForm.patchValue(this.productsToEdit);
    
    this.stateStore.formState$.subscribe((event: any) => {
      if(event) {
        // debugger;
        let keys = Object.keys(event);

        for(let i=0; i<keys?.length; i++) {
          // this.simsMaxAmount = event[keys[i]].sims;
          // this.devicesMaxAmount = event[keys[i]].devices;  
          // this.accessoriesMaxAmount = event[keys[i]].accessories;

          this.productsToEdit[keys[i]].sims = event[keys[i]].sims;
          this.productsToEdit[keys[i]].devices = event[keys[i]].devices;
          this.productsToEdit[keys[i]].accessories = event[keys[i]].accessories;
        }

        this.productsForm.patchValue(this.productsToEdit);
      }
    })
  }

  showDistribForm() {
    this.isShowDistribForm = true;

    this.stateStore.getStateObj();
    
  }
}
