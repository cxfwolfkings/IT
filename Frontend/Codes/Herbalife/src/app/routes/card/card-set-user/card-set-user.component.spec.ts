import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSetUserComponent } from './card-set-user.component';

describe('CardSetUserComponent', () => {
  let component: CardSetUserComponent;
  let fixture: ComponentFixture<CardSetUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSetUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSetUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
