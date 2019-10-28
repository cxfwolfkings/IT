import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecordComponent } from './card-record.component';

describe('CardRecordComponent', () => {
  let component: CardRecordComponent;
  let fixture: ComponentFixture<CardRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
