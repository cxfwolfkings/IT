import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditmessagelistComponent } from './auditmessagelist.component';

describe('AuditmessagelistComponent', () => {
  let component: AuditmessagelistComponent;
  let fixture: ComponentFixture<AuditmessagelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditmessagelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditmessagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
