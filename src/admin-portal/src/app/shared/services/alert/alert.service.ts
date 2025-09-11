import { Injectable } from '@angular/core'; 
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AlertService {
  
    
    
  private alertSubject = new Subject<any>(); 

  constructor() { }
   
  public getSuject (){
    return this.alertSubject;
  }
 
  public show (sender, msg){
    this.alertSubject.next ({sender: sender, msg: msg, type:'success'});
  }

  public err (sender, msg){
    this.alertSubject.next ({sender: sender, msg: msg, type:'error'});
  }

  public s ( msg){
    this.show ('appmain', msg);
  }

  public e (msg){
    this.err ('appmain', msg);
  }

   
   
      
}
 
 


