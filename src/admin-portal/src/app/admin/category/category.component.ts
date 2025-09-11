import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "../../shared/services/category/category.service";
import { ConstantService } from "../../shared/services/constant/constant.service";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";
import { EducationDetailService } from "../../shared/services/education-detail/education-detail.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  public searchKey: any;
  public largeModal: any;

  asondate: any;
  category: any;
  age: any;
  _id: any;
  experience: any;
  minqualification: any;
  error: any;
  categorydata: any;
  categoryid: any;
  data: any;
  minQualResult: any;
  categorydesc: any;
  successMessage: string;
  errorMessage: string;
  categoryres: any;
  eduList: any;
  //alerts

  dateOpts = {
    dateInputFormat: 'DD-MM-YYYY'
  };

  private _success = new Subject<string>();
  private _error = new Subject<string>();

  constructor(
    private categoryServiceApi: CategoryService,
    private constantApi: ConstantService,
    private route: ActivatedRoute,
    private router: Router,
    private eduDetailServiceApi: EducationDetailService
  ) {}

  ngOnInit() {
    this.getEduDetailList();
    this.initAlert();
    this.route.paramMap.subscribe(params => {
      this.categoryid = params.get("id");
    });
    if (this.categoryid !== "new") {
      this.getCategorybyId();
    }

    this.getMinQualiConstant();
  }

  getCategorybyId() {
    this.categoryServiceApi
      .getCategorybyId(this.categoryid)
      .pipe(first())
      .subscribe(res => {
        this.data = res;

        this.category = this.data.category;
        this.age = this.data.age;
        this._id = this.data._id;
        if (this.data.asonDate) {
          this.asondate = new Date(
            this.data.asonDate.year,
            this.data.asonDate.month,
            this.data.asonDate.day
          );
        }
        //this.asondate = this.data.asonDate;
        this.categorydesc = this.data.description;

        this.experience = this.data.experience;
        this.minqualification = this.data.minqualification;
      });
  }

  getMinQualiConstant() {
    this.constantApi
      .getConstantValue("EDUCATIONDETAILS")
      .pipe(first())
      .subscribe(res => {
        this.minQualResult = res;
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

  isNumber(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onDateChanged() {
    console.log("date is => ", this.asondate);
  }

  fixasdate() {
    if (this.asondate) {
      this.asondate = {
        year: this.asondate.getFullYear(),
        month: this.asondate.getMonth(),
        day: this.asondate.getDate()
      };
    }
  }

  onSave() {
    if (!this.category) {
      this.error = "Please enter the category name.";
      return;
    }

    if (!this.age) {
      this.error = "Please enter the eligible age limit";
      return;
    }
    if (!this.minqualification) {
      this.error =
        "Please select minimum qualification criteria for application";
      return;
    }
    if (!this.asondate) {
      this.error =
        "Please enter the date as on which the candidate as completed the eligible age limit";
      return;
    }

    this.fixasdate();

    this.categoryServiceApi
      .saveCategory(
        this.category,
        this.categorydesc,
        this.age,
        this.asondate,
        this._id,
        this.experience,
        this.minqualification
      )
      .pipe(first())
      .subscribe(res => {
        this.categoryres = res;
        if (this.categoryres.error) {
          this.error = this.categoryres.message.english;
          return;
        } else {
          this._success.next("content saved..");
        }
      });
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

  onCancel() {
    this.router.navigate(["admin/category-list"]);
  }
}
