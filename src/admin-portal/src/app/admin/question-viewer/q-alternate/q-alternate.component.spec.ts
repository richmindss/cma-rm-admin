import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QAlternateComponent } from './q-alternate.component';

describe('QAlternateComponent', () => {
  let component: QAlternateComponent;
  let fixture: ComponentFixture<QAlternateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QAlternateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QAlternateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
