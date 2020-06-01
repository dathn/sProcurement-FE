import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRestoreComponent } from './product-restore.component';

describe('ProductRestoreComponent', () => {
  let component: ProductRestoreComponent;
  let fixture: ComponentFixture<ProductRestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
