import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { LanguageService } from "../../shared/services/language/language.service";
import { AlertService } from "../../shared/services/alert/alert.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-language-list",
  templateUrl: "./language-list.component.html",
  styleUrls: ["./language-list.component.scss"]
})
export class LanguageListComponent implements OnInit {
  public searchKey: any;
  public largeModal: any;

  languages: any = [];
  currentLanguage = {
    code: "",
    name: "",
    _id: ""
  };

  error: any;
  languageCode: any;
  languageName: any;
  languageres: any;
  sender = "language-list";

  constructor(
    private modalService: NgbModal,
    private languageServiceApi: LanguageService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getLanguages();
  }

  open(content, lang) {
    this.error = "";
    this.currentLanguage = JSON.parse(JSON.stringify(lang));
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(result => { });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  getLanguages() {
    this.languageServiceApi
      .getLanguage()
      .pipe(first())
      .subscribe(res => {
        this.languages = res;
      });
  }

  deleteLanguage(lang) {
    this.languageServiceApi
      .deleteLanguage(lang._id)
      .pipe(first())
      .subscribe(res => {
        this.getLanguages();
      });
  }

  onSave() {
    if (!this.currentLanguage.code) {
      this.error = "Language Code cannot be Blank";
      return;
    }
    if (!this.currentLanguage.name) {
      this.error = "Language Name cannot be Blank";
      return;
    }
    this.languageServiceApi
      .saveLanguage(
        this.currentLanguage.code,
        this.currentLanguage.name,
        this.currentLanguage._id
      )
      .pipe(first())
      .subscribe(res => {
        this.languageres = res;
        if (this.languageres.error) {
          this.error = this.languageres.message.english;
          return;
        }

        this.alertService.show(
          this.sender,
          "Language added/updated successfully"
        );

        this.getLanguages();
        this.modalService.dismissAll();
      });
  }

  public notCopyPasteSpecialCharAndNum(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
      // invalid character, prevent input

    }
  }

  public notCopyPasteSpecialChar(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z0-9]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
      // invalid character, prevent input

    }
  }

  isChar(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;

    if (
      charCode > 31 &&
      ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122))
    ) {
      return false;
    }
    return true;
  }
}
