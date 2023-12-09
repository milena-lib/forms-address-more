import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StateStoreService } from '../../store/state-store.service';

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
    });

    this.stateStore.formState$.subscribe((event: any) => {
      if(event) {
        // console.log("EVENT: ", event);
        
        if(this.parentCtrlName !== 'mainProducts'){
          this.simsMaxAmount = event.mainProducts.sims; 
          this.devicesMaxAmount = event.mainProducts.devices;  
          this.accessoriesMaxAmount = event.mainProducts.accessories;

          for (let i = 0; i < this.entityGroup.controls.entityFormArray.controls.length; i++) {
            if(this.entityType === 'sims') {
              this.entityGroup.controls.entityFormArray.controls[i].controls['amount'].setValue(event.mainProducts.sims[i]);
            }else if(this.entityType === 'devices') {
              this.entityGroup.controls.entityFormArray.controls[i].controls['amount'].setValue(event.mainProducts.devices[i]);
            }else if(this.entityType === 'accessories'){
              this.entityGroup.controls.entityFormArray.controls[i].controls['amount'].setValue(event.mainProducts.accessories[i]);
            }            
          }
        } 
      }
    })
  }

  onBlurAmountMain($event: any) {
    // console.log("onBlurAmountMain: ", $event);
  }
}
