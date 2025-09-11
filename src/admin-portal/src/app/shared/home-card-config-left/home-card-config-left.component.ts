import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LanguageService } from "../../shared/services/language/language.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-home-card-config-left",
  templateUrl: "./home-card-config-left.component.html",
  styleUrls: ["./home-card-config-left.component.scss"]
})
export class HomeCardConfigLeftComponent implements OnInit {
  @Output() onLanguageClicked = new EventEmitter<any>();

  languages: any = [];
  currentLanguage: any = {};

  constructor(private languageServiceApi: LanguageService) {}

  getLanguages() {
    this.languageServiceApi
      .getPortalLanguages()
      .pipe(first())
      .subscribe(res => {
        this.languages = res;
        if (this.languages && this.languages.length > 0) {
          this.currentLanguage = this.languages[0];
          this.onLangClick(this.currentLanguage);
        }
      });
  }

  ngOnInit() {
    this.getLanguages();
  }

  onLangClick(lang) {
    this.currentLanguage = lang;
    this.onLanguageClicked.emit(lang);
  }
}
