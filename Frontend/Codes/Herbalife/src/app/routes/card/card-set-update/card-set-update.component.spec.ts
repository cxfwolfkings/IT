import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSetUpdateComponent } from './card-set-update.component';

describe('CardSetUpdateComponent', () => {
  let component: CardSetUpdateComponent;
  let fixture: ComponentFixture<CardSetUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSetUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
