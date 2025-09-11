import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCandidateResultComponent } from './upload-candidate-result.component';

describe('UploadCandidateResultComponent', () => {
  let component: UploadCandidateResultComponent;
  let fixture: ComponentFixture<UploadCandidateResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCandidateResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCandidateResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
