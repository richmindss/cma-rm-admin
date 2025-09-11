import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  
  private path = '/category';
 

  constructor(private backendService: BackendService ) { }


  
  saveCategory(candidatecategory: string,categorydesc:string, candidateage: string, asondate:string, id: string, exp:string, qualification:string) {
    
    return this.backendService.post(this.path + '/save', {category: candidatecategory,description:categorydesc, experience:exp, age: candidateage,asonDate:asondate, minqualification: qualification, _id : id});
  }

  getCategory() {
    
    return this.backendService.get(this.path);
  }

  deleteCategoryData(Id) {
    
    return this.backendService.get(this.path + '/delete/'+ Id);
  }

  getCategorybyId(categoryid) {               
    return this.backendService.get(this.path + '/'+ categoryid);
  }
}