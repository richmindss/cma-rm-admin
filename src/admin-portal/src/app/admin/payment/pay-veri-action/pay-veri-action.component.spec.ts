import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayVeriActionComponent } from './pay-veri-action.component';

describe('PayVeriActionComponent', () => {
  let component: PayVeriActionComponent;
  let fixture: ComponentFixture<PayVeriActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayVeriActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayVeriActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
