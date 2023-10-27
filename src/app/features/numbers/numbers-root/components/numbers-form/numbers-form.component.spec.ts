import { ComponentFixture, TestBed } from '@angular/core/testing';

import NumbersFormComponent from './numbers-form.component';

describe('NumbersFormComponent', () => {
  let component: NumbersFormComponent;
  let fixture: ComponentFixture<NumbersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumbersFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NumbersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
