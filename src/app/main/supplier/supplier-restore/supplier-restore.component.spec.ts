import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRestoreComponent } from './supplier-restore.component';

describe('SupplierRestoreComponent', () => {
  let component: SupplierRestoreComponent;
  let fixture: ComponentFixture<SupplierRestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierRestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
