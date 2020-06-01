import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyMceComponent } from './tiny-mce.component';

describe('TinyMceComponent', () => {
  let component: TinyMceComponent;
  let fixture: ComponentFixture<TinyMceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinyMceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinyMceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
