import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceProcessingComponent } from './invoice-processing.component';

describe('InvoiceProcessingComponent', () => {
  let component: InvoiceProcessingComponent;
  let fixture: ComponentFixture<InvoiceProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
