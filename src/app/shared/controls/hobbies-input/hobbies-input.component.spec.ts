import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbiesInputComponent } from './hobbies-input.component';

describe('HobbiesInputComponent', () => {
  let component: HobbiesInputComponent;
  let fixture: ComponentFixture<HobbiesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HobbiesInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HobbiesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
