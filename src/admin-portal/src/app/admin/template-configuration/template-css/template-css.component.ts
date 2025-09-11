import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService, TemplateConfigurationService } from 'src/app/shared';

@Component({
  selector: 'app-template-css',
  templateUrl: './template-css.component.html',
  styleUrls: ['./template-css.component.sass']
})
export class TemplateCssComponent implements OnInit {

  templatecss:any = "";
  tabType = "TEMPLATE_CSS";
  open = false;

  constructor( 
    private alert: AlertService,
    private templateConfigurationService: TemplateConfigurationService) { }

  ngOnInit(): void {

    this.getCss ();
  }


  getCss (){
    this.templateConfigurationService.getTemplateConfigByType (this.tabType)
    .pipe (first())
    .subscribe ( (res:any)=>{
      if (res){
        this.templatecss = res.text;
      }else {
        this.templatecss = "";
      }
      
    });
  }
  saveCss (){
    this.templateConfigurationService.saveTemplateConfiguration (this.tabType, this.templatecss)
    .pipe (first())
    .subscribe ( (res:any)=>{
     
      this.alert.s ("Saved");
      
    });
  }

  toggle (){
    this.open = !this.open;
  }

}
