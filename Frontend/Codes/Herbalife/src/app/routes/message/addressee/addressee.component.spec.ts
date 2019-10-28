import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresseeComponent } from './addressee.component';

describe('AddresseeComponent', () => {
  let component: AddresseeComponent;
  let fixture: ComponentFixture<AddresseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
