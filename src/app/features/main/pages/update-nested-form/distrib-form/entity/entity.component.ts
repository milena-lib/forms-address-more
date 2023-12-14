import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StateStoreService } from '../../store/state-store.service';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EntityComponent,
      multi: true
    }
  ]
})
export class EntityComponent implements OnInit, ControlValueAccessor {
  @Input() parentCtrlName: string = "";
  @Input() isDistribution: boolean = false;
  @Input() entityType: string = "";

  Object = Object;
  
  entityGroup = this.fb.group({
    entityFormArray: this.fb.array<FormGroup>([])
  })

  callBack: any;

  simsMaxAmount = [];
  devicesMaxAmount = [];
  accessoriesMaxAmount = [];

  // readonly formState$ = this.stateStore.formState$;

  constructor(private readonly fb: FormBuilder,
    private readonly stateStore: StateStoreService) { }

  writeValue(obj: any): void {
    const values = obj as any[];
    this.entityGroup.controls.entityFormArray.clear();
    for (let index = 0; index < values.length; index++) {
      
      this.entityGroup.controls.entityFormArray.push(this.fb.group({
        amount: this.fb.control<number>(0),
        amountNew: this.fb.control<number>(0)
      }));
      
      
    }
    this.entityGroup.controls.entityFormArray.setValue(obj);

    // console.log("obj: ", obj);
    // console.log("AAA entityGroup.controls.entityFormArray: ", this.entityGroup.controls.entityFormArray);
    // console.log("entityGroup.controls.entityFormArray.value: ", this.entityGroup.controls.entityFormArray.value);
  }

  registerOnChange(fn: any): void {
    this.callBack = fn;
  }

  registerOnTouched(fn: any): void {

  }
  ngOnInit(): void {
    this.entityGroup.controls.entityFormArray.valueChanges.subscribe(entityValue => {
      // console.log('CHANGED', entityValue);
      if (this.callBack) {
        this.callBack(entityValue);
      }      

      // const entityData = { parentCtrl: this.parentCtrlName, entityData: entityValue };
      // this.stateStore.setStateForm(entityData);
    });

    // this.stateStore.formState$.subscribe((event: any) => {
    //   if(event) {
    //     // console.log("EVENT: ", event);
        
    //     if(this.parentCtrlName !== 'mainProducts'){
    //       this.simsMaxAmount = event.mainProducts.sims; 
    //       this.devicesMaxAmount = event.mainProducts.devices;  
    //       this.accessoriesMaxAmount = event.mainProducts.accessories;         
    //     }
    //     // debugger;
    //     for (let i = 0; i < this.entityGroup.controls.entityFormArray.controls.length; i++) {
    //       if(this.entityType === 'sims') {
    //         this.entityGroup.controls.entityFormArray.controls[i].controls['amount'].setValue(event.mainProducts.sims[i].amount);
    //       }else if(this.entityType === 'devices') {
    //         this.entityGroup.controls.entityFormArray.controls[i].controls['amount'].setValue(event.mainProducts.devices[i].amount);
    //       }else if(this.entityType === 'accessories'){
    //         this.entityGroup.controls.entityFormArray.controls[i].controls['amount'].setValue(event.mainProducts.accessories[i].amount);
    //       }            
    //     }
        
    //     // this.onChange();
    //   }
    // });
  }

  onBlurAmount($event: any, index: number) {
    setTimeout(function(){
      console.log("document.activeElement id", document.activeElement?.id); // This is the element that has focus
      console.log("document.activeElement tagName", document.activeElement?.tagName);
   },1);
    const entityData = { 
      parentCtrl: this.parentCtrlName, 
      entityType: this.entityType, 
      rowIndex: index, 
      entityData: { 
        amount: this.entityGroup.controls.entityFormArray.controls[index].controls['amount'].value,
        amountNew: this.entityGroup.controls.entityFormArray.controls[index].controls['amountNew'].value
      }  
    };
    console.log("entityData: ", entityData);
    
    // debugger;
    this.stateStore.setStateForm(entityData);
  }

  // private onChange() {
  //   if (this.callBack) {
  //     this.callBack(this.entityGroup);
  //   }
  // }
}
