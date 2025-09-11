import { Component, OnInit, Input } from "@angular/core";
import { LanguageService, AlertService } from "src/app/shared";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";

@Component({
  selector: "app-portal-language",
  templateUrl: "./portal-language.component.html",
  styleUrls: ["./portal-language.component.scss"]
})
export class PortalLanguageComponent implements OnInit {
   selectedOption: any = {
    value: '',
    name: ''
  }; 
  @Input() tab: any; 
   opts = [
    { name: "Only English", value: "english" },
    { name: "Bi-Lingual", value: "bilingual" },
    { name: "Only Regional", value: "regional" }
  ];

  actions = [
    {
      icon: "fas fa-angle-double-right",
      class: "btn btn-primary",
      type: "SELECT_ALL"
    },
    { icon: "fas fa-angle-right", class: "btn btn-info", type: "SELECT_ONE" },
    { icon: "fas fa-angle-left", class: "btn btn-info", type: "REMOVE_ONE" },
    {
      icon: "fas fa-angle-double-left",
      class: "btn btn-danger",
      type: "REMOVE_ALL"
    }
  ];

  languages: any;
  portalLanguages: any;

  constructor(private languageService: LanguageService,
     private alert: AlertService
    
    ) {}

  ngOnInit() { 
    this.selectedOption = this.opts[0];
    this.loadAvailableLangs();
    this.languageService
      .getLangPreference()
      .pipe(first())
      .subscribe(res => {
        if (res["language"]) {
          for (var i = 0; i < this.opts.length; i++) {
            if (this.opts[i].value == res["language"]) {
              this.selectedOption = this.opts[i];
              break;
            }
          }
        }
      });
  }

  loadPortalLanguages() {
    this.languageService
      .getPortalLanguages()
      .pipe(first())
      .subscribe(res => {
        this.portalLanguages = res;

        if (this.portalLanguages && this.languages) {
          for (var i = 0; i < this.languages.length; i++) {
            for (var j = 0; j < this.portalLanguages.length; j++) {
              if (this.portalLanguages[j]._id === this.languages[i]._id) {
                this.languages[i].selected = true;
                break;
              }
            }
          }
        }
        //now match with the languages.
      });
  }

  loadAvailableLangs() {
    this.languageService
      .getLanguage()
      .pipe(first())
      .subscribe(res => {
        this.languages = res;
        this.loadPortalLanguages();
      });
  }

 
  onLangPrefClick(lang) {
    this.languageService
      .saveLangPreference(lang.value)
      .pipe(first())
      .subscribe(res => {
        this.selectedOption = lang;
        this.ensureEnglish();
      });
  }

  saveLangPref() {
    var langs = [];

    for (var i = 0; i < this.languages.length; i++) {
      if (this.languages[i].selected) {
        langs.push(this.languages[i].code);
      }
    }
    this.languageService
      .addPortalLanguage(langs)
      .pipe(first())
      .subscribe(res => {
        this.alert.s ("Languages updated sucessfully");
        
      });
  }

  selectAll() {
    for (var i = 0; i < this.languages.length; i++) {
      this.languages[i].selected = true;
      this.languages[i].leftSelected = false;
      this.languages[i].rightSelected = false;
    }
  }

  removeAll() {
    for (var i = 0; i < this.languages.length; i++) {
      this.languages[i].selected = false;
      this.languages[i].leftSelected = false;
      this.languages[i].rightSelected = false;
    }
  }

  selectOne() {
    for (var i = 0; i < this.languages.length; i++) {
      if (this.languages[i].leftSelected) {
        this.languages[i].selected = true;
        this.languages[i].leftSelected = false;
      }
    }
  }

  removeOne() {
    for (var i = 0; i < this.languages.length; i++) {
      if (this.languages[i].rightSelected) {
        this.languages[i].selected = false;
        this.languages[i].rightSelected = false;
      }
    }
  }

  onAction(action) {
    if (action.type == "SELECT_ALL") {
      this.selectAll();
    } else if (action.type == "SELECT_ONE") {
      this.selectOne();
    } else if (action.type == "REMOVE_ONE") {
      this.removeOne();
    } else if (action.type == "REMOVE_ALL") {
      this.removeAll();
    }

    this.saveLangPref();
  }

  onLeftLangClick(l) {
    l.leftSelected = !l.leftSelected;
  }

  onRightLangClick(l) {
    l.rightSelected = !l.rightSelected;
  }

  ensureEnglish() {
    if (!this.selectedOption) {
      return;
    }

    if (this.selectedOption.value == "regional") {
      return;
    }

    if (this.selectedOption.value == "english") {
      this.languageService
        .addPortalLanguage(["english"])
        .pipe(first())
        .subscribe(res => {});
    }
  }
}
