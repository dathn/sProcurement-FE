import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequisitionRestoreComponent } from './purchase-requisition-restore.component';

describe('PurchaseRequisitionRestoreComponent', () => {
  let component: PurchaseRequisitionRestoreComponent;
  let fixture: ComponentFixture<PurchaseRequisitionRestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequisitionRestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequisitionRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
