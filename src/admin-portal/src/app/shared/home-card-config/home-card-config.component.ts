import { Component, OnInit, Input } from "@angular/core";
import { ContentService } from "../../shared/services/content/content.service";
import { LanguageService } from "../services/language/language.service";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";
import { AlertService } from "../../shared/services/alert/alert.service";


@Component({
  selector: "app-home-card-config",
  templateUrl: "./home-card-config.component.html",
  styleUrls: ["./home-card-config.component.scss"]
})
export class HomeCardConfigComponent implements OnInit {
  @Input() contenttype: any;
  content: any;
  language: any;
  headerInfo: any = {
    contentMode: "NOW"
  };
  contentInfo: any;
  newContent: any;
  sender = "home-card-config";

  showLanguageOption = false;
  portalLanguages: any;
  showLeftBar = true;
  error: any;

  //alerts
  errorMessage = null;
  successMessage = null;

  private _success = new Subject<string>();
  private _error = new Subject<string>();

  constructor(
    private contentService: ContentService,
    private languageServiceApi: LanguageService,
    private alertService: AlertService,


  ) { }

  ngOnInit() {
    this.initAlert();
    this.loadLanguages();
  }

  initAlert() {
    this._success.subscribe(message => (this.successMessage = message));
    this._success
      .pipe(debounceTime(2000))
      .subscribe(() => (this.successMessage = null));

    this._error.subscribe(message => (this.errorMessage = message));
    this._error
      .pipe(debounceTime(2000))
      .subscribe(() => (this.errorMessage = null));
  }

  loadLanguages() {
    this.languageServiceApi
      .getPortalLanguages()
      .pipe(first())
      .subscribe(res => {
        this.portalLanguages = res;
        if (this.portalLanguages && this.portalLanguages.length == 1) {
          this.language = this.portalLanguages[0];
          this.showLeftBar = false;
          this.loadLangContent();
        }
        this.getContentInfo();
      });
  }

  getContentInfo() {
    this.contentService
      .getContent(this.contenttype)
      .pipe(first())
      .subscribe(res => {
        this.contentInfo = res;
        if (this.contentInfo) {
          var hasLater = false;
          for (var i = 0; i < this.contentInfo.length; i++) {
            if (this.contentInfo[i].content_mode == "LATER") {
              hasLater = true;
            }
          }

          if (this.headerInfo.contentMode == "LATER" && !hasLater) {
            this.showLanguageOption = false;
          } else {
            this.showLanguageOption = true;
          }

          this.loadLangContent();
        }
      });
  }

  loadLangContent() {
    if (!this.language) {
      return;
    }
    this.contentService
      .getContentLanguage(
        this.headerInfo.contentMode,
        this.contenttype,
        this.language.code
      )
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.content = res["text"] || "";
        } else {
          this.content = "";
        }
        this.newContent = this.content;
      });
  }
  onLanguageClicked(event) {
    //call api to load content of contenttype and certain language.
    this.language = event;
    this.loadLangContent();
  }

  onHeaderChanged(e) {
    this.headerInfo = e;

    if (e.contentMode == "NOW") {
      this.showLanguageOption = true;
      this.loadLangContent();
    } else {
      this.getContentInfo();
    }
  }

  onContentChanged(e) {
    this.newContent = e;

  }

  saveContent() {
    this.contentService
      .saveContentLanguage(
        this.headerInfo.contentMode,
        this.contenttype,
        this.language.code,
        this.newContent || this.content
      )
      .pipe(first()).subscribe(res => {

        if (res["status"] == "error") {
          this.alertService.err(this.sender, res["message"]);
          return;
        }
        this.alertService.show(this.sender, "Details updated successfully");
      });
  }


}
