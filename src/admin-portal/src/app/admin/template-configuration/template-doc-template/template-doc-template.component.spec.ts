import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDocTemplateComponent } from './template-doc-template.component';

describe('TemplateDocTemplateComponent', () => {
  let component: TemplateDocTemplateComponent;
  let fixture: ComponentFixture<TemplateDocTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDocTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDocTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
