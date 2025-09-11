import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PagesRoutingModule} from './pages-routes.module';
import {LoginComponent} from './login/login.component';
import {ForgotpassComponent} from './forgotpass/forgotpass.component';
import {RegisterComponent} from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoNameConfigComponent } from './logo-name-config/logo-name-config.component'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UseriddefinitionComponent } from './useriddefinition/useriddefinition.component'; 
import { ChangepassComponent } from './changepass/changepass.component'
// import { EmailSmsComponent } from './email-sms/email-sms.component';
import { DateEditorComponent } from './date-editor/date-editor.component';
import {SharedModule} from '../shared/shared.module';

import { RecaptchaModule } from 'ng-recaptcha';

import {TemplateEditorComponent} from '../pages/template-editor/template-editor.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoNameConfigComponent, 
    UseriddefinitionComponent, 
    TemplateEditorComponent,
    DateEditorComponent,
    ForgotpassComponent,
    ChangepassComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    RecaptchaModule
  ]
})
export class PagesModule { }
