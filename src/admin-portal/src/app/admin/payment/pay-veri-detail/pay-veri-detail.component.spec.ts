import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayVeriDetailComponent } from './pay-veri-detail.component';

describe('PayVeriDetailComponent', () => {
  let component: PayVeriDetailComponent;
  let fixture: ComponentFixture<PayVeriDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayVeriDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayVeriDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
