import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  LocationStrategy,
  HashLocationStrategy,
  CommonModule
} from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { PagesModule } from "./pages/pages.module";
import { AdminModule } from "./admin/admin.module";
import {SharedModule} from './shared';
import {
  CoreService,
  BackendService,
  AuthenticationService,
  InterceptorService,
  SettingsService,
  StorageService,
  AuthguardService,
  CaptchaService,
  AppTabService,
  ReportsService
} from "./shared";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    PagesModule,
    AdminModule,
    SharedModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },

    CoreService,
    BackendService,
    AuthenticationService,
    SettingsService,
    StorageService,
    AuthguardService,
    CaptchaService,
    AppTabService,
    ReportsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
