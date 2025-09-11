import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCssComponent } from './template-css.component';

describe('TemplateCssComponent', () => {
  let component: TemplateCssComponent;
  let fixture: ComponentFixture<TemplateCssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
