import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSetComponent } from './card-set.component';

describe('CardSetComponent', () => {
  let component: CardSetComponent;
  let fixture: ComponentFixture<CardSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
