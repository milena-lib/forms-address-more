import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateStoreService {
  stateObj = {
    mainProducts: {
      sims: [
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        }
      ],
      devices: [
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        }
      ],
      accessories: [
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        }
      ]
    },
    distribProducts0: {
      sims: [
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        }
      ],
      devices: [
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        }
      ],
      accessories: [
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        }
      ]
    },
    distribProducts1: {
      sims: [
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        }
      ],
      devices: [
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        }
      ],
      accessories: [
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        }
      ]
    },
    distribProducts2: {
      sims: [
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        }
      ],
      devices: [
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        }
      ],
      accessories: [
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        },
        {
          amount: 0,
          amountNew: 0
        }
      ]
    }
  }

  private readonly formStateSubject = new Subject<any>();
  readonly formState$ = this.formStateSubject.asObservable();

  constructor() { }

  setStateForm(obj: any) {
    // console.log("setStateForm: ", obj);

    if(obj.parentCtrl === 'mainProducts') {
      this.stateObj.mainProducts = obj.entityData;

      this.stateObj.distribProducts0 = obj.entityData;
      this.stateObj.distribProducts1 = obj.entityData;
      this.stateObj.distribProducts2 = obj.entityData;
    }

    // console.log("BBB stateObj: ", this.stateObj);
    // console.log("keys: ", Object.keys(this.stateObj));
    // const updObj = {parentCtrl: obj.parentCtrl, stateObj: this.stateObj};
    this.formStateSubject.next(this.stateObj);
  }

  getStateObj(){
    setTimeout(() => {
      this.formStateSubject.next(this.stateObj);
    }, 50);
  }
}
