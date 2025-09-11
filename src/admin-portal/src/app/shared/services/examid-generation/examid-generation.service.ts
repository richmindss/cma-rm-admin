import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';


@Injectable({
  providedIn: 'root'
})
export class ExamidGenerationService {


  private path = '/examid-generation';


  constructor(private backendService: BackendService) { }



  saveExamGeneration(type: string, examidlength: string, prefixvalue: string, suffixvalue: string) {

    return this.backendService.post(this.path + '/', { type: type, examidlength: examidlength, prefixvalue: prefixvalue, suffixvalue: suffixvalue });

  }

  getExamgeneration() {
    return this.backendService.get(this.path);

  }


  saveExamwiseGeneration(examid: any, type: string, examidlength: string, prefixvalue: string, suffixvalue: string) {

    return this.backendService.post(this.path + '/examwise', { examid: examid, type: type, examidlength: examidlength, prefixvalue: prefixvalue, suffixvalue: suffixvalue });

  }

  getExamwisegeneration(id) {
    return this.backendService.get(this.path + '/' + id + '/examwiseid');

  }



}