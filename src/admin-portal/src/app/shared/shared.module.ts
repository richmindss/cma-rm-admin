import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Routes, RouterModule } from "@angular/router";
import { HomeHeaderComponent } from "./components/home-header/home-header.component";
import { HomeFooterComponent } from "./components/home-footer/home-footer.component";
import { SimpleLayoutComponent } from "../containers/simple-layout/simple-layout.component";
import { HomeCardConfigComponent } from "./home-card-config/home-card-config.component";
import { HomeCardConfigHeaderComponent } from "./home-card-config-header/home-card-config-header.component";
import { HomeCardConfigLeftComponent } from "./home-card-config-left/home-card-config-left.component";
import { HomeCardConfigRightComponent } from "./home-card-config-right/home-card-config-right.component";
import { TemplateEditorComponent } from "./template-editor/template-editor.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { EditorModule } from "@tinymce/tinymce-angular";
import { RmUploaderComponent } from "./rm-uploader/rm-uploader.component";
import { RecaptchaModule } from "ng-recaptcha";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { DatefieldComponent } from "./components/date-field/datefield.component";
import { AlertComponent } from "../shared/alert/alert.component";
import { FullLayoutComponent } from "../containers/full-layout/full-layout.component";
import { MainMenuComponent } from "../admin/main-menu/main-menu.component";
import { MenuHeaderComponent } from "../admin/menu-header/menu-header.component";
import { MenuFooterComponent } from "../admin/menu-footer/menu-footer.component";
import { MenuNavComponent } from "../admin/menu-nav/menu-nav.component";
import { MainBodyComponent } from "../admin/main-body/main-body.component";
import { RequiredComponent } from './components/required/required.component';
import { SearchComponent } from '../shared/search/search.component';


@NgModule({
  declarations: [
    HomeHeaderComponent,
    SimpleLayoutComponent,
    HomeFooterComponent,
    HomeCardConfigComponent,
    HomeCardConfigHeaderComponent,
    HomeCardConfigLeftComponent,
    HomeCardConfigRightComponent,
    TemplateEditorComponent,
    RmUploaderComponent,
    PaginationComponent,
    DatefieldComponent,
    AlertComponent,
    FullLayoutComponent,
    MainMenuComponent,
    MenuHeaderComponent,
    MenuFooterComponent,
    MenuNavComponent,
    MainBodyComponent,
    RequiredComponent,
    SearchComponent

  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    EditorModule,
    RecaptchaModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    FullLayoutComponent,
    MainMenuComponent,
    MenuHeaderComponent,
    MenuFooterComponent,
    MenuNavComponent,
    MainBodyComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    SimpleLayoutComponent,
    HomeCardConfigComponent,
    RmUploaderComponent,
    HomeCardConfigRightComponent,
    PaginationComponent,
    DatefieldComponent,
    AlertComponent,
    RequiredComponent,
    SearchComponent

  ]
})
export class SharedModule {}
