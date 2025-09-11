import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayVeriMainComponent } from './pay-veri-main.component';

describe('PayVeriMainComponent', () => {
  let component: PayVeriMainComponent;
  let fixture: ComponentFixture<PayVeriMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayVeriMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayVeriMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
