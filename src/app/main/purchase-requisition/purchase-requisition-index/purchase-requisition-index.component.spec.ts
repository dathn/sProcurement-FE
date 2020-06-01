import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequisitionIndexComponent } from './purchase-requisition-index.component';

describe('PurchaseRequisitionIndexComponent', () => {
  let component: PurchaseRequisitionIndexComponent;
  let fixture: ComponentFixture<PurchaseRequisitionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequisitionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequisitionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
