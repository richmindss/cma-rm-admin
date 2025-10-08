import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QbSummaryComponent } from './qb-summary.component';

describe('QbSummaryComponent', () => {
  let component: QbSummaryComponent;
  let fixture: ComponentFixture<QbSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QbSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QbSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
