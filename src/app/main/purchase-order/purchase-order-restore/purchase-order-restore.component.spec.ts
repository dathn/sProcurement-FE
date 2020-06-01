import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderRestoreComponent } from './purchase-order-restore.component';

describe('PurchaseOrderRestoreComponent', () => {
  let component: PurchaseOrderRestoreComponent;
  let fixture: ComponentFixture<PurchaseOrderRestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderRestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
