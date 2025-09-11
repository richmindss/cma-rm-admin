import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EducationDetailService } from "../../shared/services/education-detail/education-detail.service";
import { ConstantService } from "../../shared/services/constant/constant.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.scss"]
})
export class EducationComponent implements OnInit {
  public searchKey: any;
  public largeModal: any;
  data: any;
  testcenter: any;
  centerid: any;
  codes: any;
  eduDetail: any = {
    name: "",
    code: "",
    _id: "",
    sequence: "",
    subject_code: "",
    count: "",
    edu_sequence:'',
    multiple_subjects: false
  };
  error: any;
  stateResult: any = [];
  eduList: any;
  sequenceres: any;
  edudetails: any;
  showHelp:any  = false;

  constructor(
    private eduDetailServiceApi: EducationDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private constantApi: ConstantService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.centerid = params.get("id");
      if (this.centerid !== "new") {
        this.getEduDetailId(this.centerid);
      }
    });

    this.constantApi
      .getConstant()
      .pipe(first())
      .subscribe(res => {
        this.codes = res;
      });
  }

  getEduDetailId(id) {
    this.eduDetailServiceApi
      .getEducationDetailbyId(id)
      .pipe(first())
      .subscribe(res => {
        this.eduDetail = res;
      });
  }

  getEduDetailList() {
    this.eduDetailServiceApi
      .getEducationDetail()
      .pipe(first())
      .subscribe(res => {
        this.eduList = res;
      });
  }

  onClose() {
    window.history.back();
  }

  isNumber(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSave() {
    if (!this.eduDetail.name) {
      this.error = "Please enter the name of education";
      return;
    }

    if (!this.eduDetail.code) {
      this.error = "Please enter the code";
      return;
    }
    if (!this.eduDetail.sequence) {
      this.error = "Please select sequence";
      return;
    }
    if (!this.eduDetail.subject_code) {
      this.error = "Please enter subject code";
      return;
    }
    if (!this.eduDetail.count) {
      this.error = "Please enter the number of subjects";
      return;
    }
    if (!this.eduDetail.edu_sequence) {
      this.error = "Please enter the education sequence.";
      return;
    }
    

    //saving ....validate ..
    this.eduDetailServiceApi
      .saveEducationDetail(this.eduDetail)
      .pipe(first())
      .subscribe(res => {
        this.edudetails = res;
        if (this.edudetails.error) {
          this.error = this.edudetails.message.english;
          return;
        } else {
          this.getEduDetailList();
          this.router.navigate(["admin/education-detail"]);
        }
      });
  }
}
