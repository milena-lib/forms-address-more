import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateStoreService {
  stateObj:any = {
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
    console.log("obj: ", obj);

    let keys = Object.keys(this.stateObj);
    const objEntities = keys.filter(item => item !== 'mainProducts');

    if(obj.parentCtrl === 'mainProducts') {
      // debugger;
      const prevMainAmount = this.stateObj.mainProducts[obj.entityType][obj.rowIndex].amount;      
      const diffMainAmount = obj.entityData.amount - prevMainAmount;

      this.stateObj.mainProducts[obj.entityType][obj.rowIndex].amount = obj.entityData.amount;

      for(let i=0; i<objEntities?.length; i++) {
        this.stateObj[objEntities[i]][obj.entityType][obj.rowIndex].amount = this.stateObj[objEntities[i]][obj.entityType][obj.rowIndex].amount + diffMainAmount;
      }
    
    }else if (obj.parentCtrl === 'distribProducts0' || obj.parentCtrl === 'distribProducts1' || obj.parentCtrl === 'distribProducts2'){
      let selectedAmounts: number = 0;
      let prevCurrAmountNew: number = 0;

      for(let i=0; i<objEntities?.length; i++) {
        if(objEntities[i] !== obj.parentCtrl) {
          selectedAmounts += (+this.stateObj[objEntities[i]][obj.entityType][obj.rowIndex].amountNew);
        }else{
          prevCurrAmountNew = this.stateObj[objEntities[i]][obj.entityType][obj.rowIndex].amountNew;
        }
      }

      selectedAmounts +=  + (+obj.entityData.amountNew);

      for(let i=0; i<objEntities?.length; i++) {
        
        if(objEntities[i] === obj.parentCtrl) {
          this.stateObj[objEntities[i]][obj.entityType][obj.rowIndex].amount = obj.entityData.amount;
          this.stateObj[objEntities[i]][obj.entityType][obj.rowIndex].amountNew = obj.entityData.amountNew;
        }else{
          const maxAmount: number = this.stateObj.mainProducts[obj.entityType][obj.rowIndex].amount;

          if((+this.stateObj[objEntities[i]][obj.entityType][obj.rowIndex].amountNew) > 0){
            if(prevCurrAmountNew === 0 || prevCurrAmountNew > (+obj.entityData.amountNew)){
              this.stateObj[objEntities[i]][obj.entityType][obj.rowIndex].amount = (+this.stateObj[objEntities[i]][obj.entityType][obj.rowIndex].amount) + ((+prevCurrAmountNew) - (+obj.entityData.amountNew));
            }else if(prevCurrAmountNew < (+obj.entityData.amountNew)){
              this.stateObj[objEntities[i]][obj.entityType][obj.rowIndex].amount = (+this.stateObj[objEntities[i]][obj.entityType][obj.rowIndex].amount) + (+obj.entityData.amountNew);
            }
          }else{
            this.stateObj[objEntities[i]][obj.entityType][obj.rowIndex].amount = maxAmount - selectedAmounts;
          }
          
        }        

        console.log("objEntities[i]: ",  objEntities[i]); //distribProducts1
        console.log("obj.entityType: ",  obj.entityType); //sims
        console.log("obj rowIndex: ",  obj.rowIndex); // 0

      }
    }

    console.log("STATE STORE stateObj: ", this.stateObj);
    this.formStateSubject.next(this.stateObj);
  }

  getSum(obj: any): number {
    const sum:number = obj.reduce((val: number, object:any) => {
      return val + (+object.amountNew);
    }, 0);
    return 0;
  }

  getStateObj(){
    setTimeout(() => {
      this.formStateSubject.next(this.stateObj);
    }, 50);
  }
}
