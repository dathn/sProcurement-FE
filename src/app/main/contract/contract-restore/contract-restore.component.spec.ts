import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractRestoreComponent } from './contract-restore.component';

describe('ContractRestoreComponent', () => {
  let component: ContractRestoreComponent;
  let fixture: ComponentFixture<ContractRestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractRestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
