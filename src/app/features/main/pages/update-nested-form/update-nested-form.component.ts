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

    // this.stateStore.formState$.subscribe((event: any) => {
    //   if(event) {
        // if(event.parentCtrl === 'mainProducts') {
        //   this.simsMaxAmount = event.mainProducts.sims; 
        //   this.devicesMaxAmount = event.mainProducts.devices;  
        //   this.accessoriesMaxAmount = event.mainProducts.accessories;

        //   this.productsToEdit.distribProducts0.sims = event.mainProducts.sims;
        //   this.productsToEdit.distribProducts0.devices = event.mainProducts.devices;
        //   this.productsToEdit.distribProducts0.accessories = event.mainProducts.accessories;

        //   this.productsToEdit.distribProducts1.sims = event.mainProducts.sims;
        //   this.productsToEdit.distribProducts1.devices = event.mainProducts.devices;
        //   this.productsToEdit.distribProducts1.accessories = event.mainProducts.accessories;

        //   this.productsToEdit.distribProducts2.sims = event.mainProducts.sims;
        //   this.productsToEdit.distribProducts2.devices = event.mainProducts.devices;
        //   this.productsToEdit.distribProducts2.accessories = event.mainProducts.accessories;

        //   this.productsForm.patchValue(this.productsToEdit);
        // }
        

        // console.log("productsForm: ", this.productsForm);
      // }
    // })
  }

  showDistribForm() {
    this.isShowDistribForm = true;

    this.stateStore.getStateObj();
    
  }
}
