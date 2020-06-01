import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchoutComponent } from './punchout.component';

describe('PunchoutComponent', () => {
  let component: PunchoutComponent;
  let fixture: ComponentFixture<PunchoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunchoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
