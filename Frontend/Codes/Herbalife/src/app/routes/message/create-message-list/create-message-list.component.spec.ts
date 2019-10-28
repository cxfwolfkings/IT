import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMessageListComponent } from './create-message-list.component';

describe('CreateMessageListComponent', () => {
  let component: CreateMessageListComponent;
  let fixture: ComponentFixture<CreateMessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMessageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
