import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimediaMessageComponent } from './multimedia-message.component';

describe('MultimediaMessageComponent', () => {
  let component: MultimediaMessageComponent;
  let fixture: ComponentFixture<MultimediaMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultimediaMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultimediaMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
