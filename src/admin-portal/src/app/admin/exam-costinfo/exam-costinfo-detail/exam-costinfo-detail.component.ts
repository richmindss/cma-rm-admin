import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ExamListService } from "../../../shared/services/exam-list/exam-list.service";
import { ConstantService } from "../../../shared/services/constant/constant.service";
import { Subject } from "rxjs";
import { concatAll, debounceTime, first } from "rxjs/operators";
import { EducationDetailService } from "../../../shared/services/education-detail/education-detail.service";

@Component({
  selector: "app-exam-costinfo-detail",
  templateUrl: "./exam-costinfo-detail.component.html",
  styleUrls: ["./exam-costinfo-detail.component.scss"]
})
export class ExamCostinfoDetailComponent implements OnInit {

  costInfoDetail: any = {
    _id: "",
    examid: "",
    category: { id: "", code: "", name: "" },
    gender: { id: "", code: "", name: "" },
    misc_criteria: { id: "", code: "", name: "" },
    locationObj: { id: "", code: "", name: "" },
    minqualification: { id: "", code: "", name: "" },
    minworkexp: "",
    ispwd: false,
    minipassing: [],
    agelimit: "",
    asondate: "",
    price: "",
    pwd_min_perc: '',
    pwd_max_perc: '',
    pwd_type: [],
  };

  isConstantValueVisible:any=false;
  setVal:any = "";
  genderResult: any = [];
  categoryResult: any = [];
  miscResult: any = [];
  eduList: any = [];
  pwd_type: any = [];
  costInfoId: any;
  costInfores: any;
  examId: any;
  feeType: any;
  locationList: any = [];

  private _success = new Subject<string>();
  private _error = new Subject<string>();
  error: any;
  successMessage: string;
  errorMessage: string;

  constructor(
    private examListService: ExamListService,
    private constantService: ConstantService,
    private route: ActivatedRoute,
    private router: Router,
    private eduDetailServiceApi: EducationDetailService
  ) {}

  ngOnInit() {
    this.getEduDetailList();
    this.getGender();
    this.getCategory();
    this.getMisc();
    this.initAlert();
    this.loadPWDTypes ();
    this.viewConstantVal("LS");
    this.getLocationList();
    this.route.paramMap.subscribe(params => {
      this.costInfoId = params.get("id");
      this.examId = params.get("examid");
      this.feeType = params.get("feeType");
     
    });
   
  }


  loadPWDTypes (){
    this.constantService.getConstantValue('PWD_TYPE').pipe(first()).subscribe(res => {
      if (res) {
        this.pwd_type = res;
        this.prepPwdType ();
      }
    });
  }


  prepPwdType (){
    if (!this.pwd_type || this.pwd_type.length == 0){
      return; //wait until we have it ..
    }
    var merged = [];
    var item = {};
    if (!this.costInfoDetail.pwd_type || this.costInfoDetail.pwd_type.length == 0){
      for (var i=0; i<this.pwd_type.length; i++){
        var curr = this.pwd_type [i];
      
         item = {
          code: curr.code,
          name: curr.name,
          min: '',
          max: ''
        };
        merged.push (item);
      }
      this.costInfoDetail.pwd_type = merged;
      return;
    }

    //at this time we have both .... lets merge .. 
  
    for (var i=0; i<this.pwd_type.length; i++){

      var curr = this.pwd_type [i];
        item = this.costInfoDetail.pwd_type.find (x => x.code == curr.code);
      if (!item){
        item = {
          code: curr.code,
          name: curr.name,
          min: '',
          max: ''
        };
       
      } 

      merged.push (item);

    }
    
    this.costInfoDetail.pwd_type = merged;
  
  }


  getGender() {
    this.constantService
      .getConstantValue("GENDER")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.genderResult = res;
        }
      });
  }

  getCategory() {
    this.constantService
      .getConstantValue("CATEGORY")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.categoryResult = res;
        }
      });
  }

  getMisc() {
    this.constantService
      .getConstantValue("MISCCRITERIA")
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.miscResult = res;
        }
      });
  }

  getLocationList(){
    this.constantService
    .getConstantValue("LS")
    .pipe(first())
    .subscribe(res => {
      if (res) {
        console.log("ressssssssssssssssssssssss",res);
        this.locationList = res;
      }
    });
  }

  viewConstantVal(contantId) {
    this.constantService
      .getContantById(contantId)
      .pipe(first())
      .subscribe(res => {
        if (res) {
          if(res && res['active'] && res['active'] == true){
            this.isConstantValueVisible = res['active'];
          }

        }
      });
  }

  getEduDetailList() {
    this.eduDetailServiceApi
      .getEducationDetail()
      .pipe(first())
      .subscribe(res => {
        this.eduList = res;
        this.costInfoDetail.minipassing = this.eduList;
       if (this.costInfoId !== "new") {
        this.getCostInfobyId();
      }
      });
  }

  fixasdate(data) {
    if (this.costInfoDetail.asondate) {
      data.asondate = {
        year: this.costInfoDetail.asondate.getFullYear(),
        month: this.costInfoDetail.asondate.getMonth(),
        day: this.costInfoDetail.asondate.getDate()
      };
    }
  }

  getMinipassing(miniquali) {
    this.costInfoDetail.minipassing = this.eduList;
    for (var i = 0; i < miniquali.length; i++) {
      for (var j = 0; j < this.costInfoDetail.minipassing.length; j++) {
        if (
          miniquali[i]._id.toString() ==
          this.costInfoDetail.minipassing[j]._id.toString()
        ) {
          this.costInfoDetail.minipassing[j].percentage =
            miniquali[i].percentage;
        }
      }
    }
  }

  getCostInfobyId() {
    this.examListService
      .getExamCostInfobyId(this.costInfoId)
      .pipe(first())
      .subscribe(res => {
        this.costInfoDetail = res;
        var miniquali = this.costInfoDetail.minipassing;
        this.getMinipassing(miniquali);
        if(!this.costInfoDetail.locationObj){
          this.costInfoDetail.locationObj={ id: "", code: "", name: "" };
        }
        if (this.costInfoDetail.asondate) {
          this.costInfoDetail.asondate = new Date(
            this.costInfoDetail.asondate.year,
            this.costInfoDetail.asondate.month,
            this.costInfoDetail.asondate.day
          );
        }

        this.prepPwdType ();
      });
  }

  getName(codes, id, field) {
    for (var i = 0; i < codes.length; i++) {
      if (codes[i]._id == id || codes[i].code == id) {
        if (field) {
          return codes[i][field];
        }
        return codes[i]["name"];
      }
    }
    return {};
  }

  getCode(codes, id, field) {
    for (var i = 0; i < codes.length; i++) {
      if (codes[i]._id == id || codes[i].code == id) {
        if (field) {
          return codes[i][field];
        }
        return codes[i]["code"];
      }
    }
    return {};
  }

  getSequence(codes, id, field) {
    for (var i = 0; i < codes.length; i++) {
      if (codes[i]._id == id || codes[i].code == id) {
        if (field) {
          return codes[i][field];
        }
        return codes[i]["sequence"];
      }
    }
    return {};
  }

  fillcodesets(data) {
    data.gender.name = this.getName(
      this.genderResult,
      this.costInfoDetail.gender.id,
      null
    );
    data.gender.code = this.getCode(
      this.genderResult,
      this.costInfoDetail.gender.id,
      null
    );

    // if (this.costInfoDetail.location.id) {
      data.locationObj.name = this.getName(
        this.locationList,
        this.costInfoDetail.locationObj.id,
        null
      );
      data.locationObj.code = this.getCode(
        this.locationList,
        this.costInfoDetail.locationObj.id,
        null
      );
   // }

    if (this.costInfoDetail.misc_criteria.id) {
      data.misc_criteria.name = this.getName(
        this.miscResult,
        this.costInfoDetail.misc_criteria.id,
        null
      );
      data.misc_criteria.code = this.getCode(
        this.miscResult,
        this.costInfoDetail.misc_criteria.id,
        null
      );
    }

    data.category.name = this.getName(
      this.categoryResult,
      this.costInfoDetail.category.id,
      null
    );
    data.category.code = this.getCode(
      this.categoryResult,
      this.costInfoDetail.category.id,
      null
    );
    if (this.costInfoDetail.minqualification.id) {
      data.minqualification.name = this.getName(
        this.eduList,
        this.costInfoDetail.minqualification.id,
        null
      );
      data.minqualification.code = this.getCode(
        this.eduList,
        this.costInfoDetail.minqualification.id,
        null
      );
      data.minqualification.sequence = this.getSequence(
        this.eduList,
        this.costInfoDetail.minqualification.id,
        null
      );
    }
  }

  onSave() {
    this.error = " ";

    var data = Object.assign ({}, this.costInfoDetail);
    this.fillcodesets(data);
    this.fixasdate(data);
    if (!this.costInfoDetail.category.id) {
      this.error = "Category Name cannot be left Blank";
      return false;
    }
    // if (!this.costInfoDetail.locationObj.id) {
    //   this.error = "location selection cannot be left Blank";
    //   return false;
    // }
    if (!this.costInfoDetail.gender.id) {
      this.error = "Please select Gender";
      return false;
    }

    if (!this.costInfoDetail.minqualification.id) {
      this.error =
        "Please select minimum qualification criteria for application";
      return false;
    }

    if (this.costInfoDetail.agelimit && !this.costInfoDetail.asondate) {
      this.error = "Please enter As on Date";
      return false;
    }

    if (this.feeType == "categorywise" && !this.costInfoDetail.price) {
      this.error = "Please enter correct Fee Amount for Category";
      return false;
    }

   // console.log ("lets check it ..", data);
    if (this.costInfoDetail.ispwd){
    //   var p = this.costInfoDetail.pwd_min_perc;
    //  // console.log ("P ==", p);
    //   if (p == null || p === '' || p.toString().trim() == '' || isNaN (p) ){
    //     this.error = "Please enter PWD min Percentage";
    //     return false;
    //   }
    //   if (+p > 100 || +p <0){
    //     this.error = "PWD min percentage should be between 0-100";
    //     return false;
    //   }

    //   data.pwd_min_perc = +data.pwd_min_perc;


    //   var p2 = this.costInfoDetail.pwd_max_perc;
    //   // console.log ("P ==", p);
    //    if (p2 == null || p2 === '' || p2.toString().trim() == '' || isNaN (p2) ){
    //      this.error = "Please enter PWD max Percentage";
    //      return false;
    //    }
    //    if (+p2 > 100 || +p2 <0){
    //      this.error = "PWD max percentage should be between 0-100";
    //      return false;
    //    }
 
    //    data.pwd_max_perc = +data.pwd_max_perc; 

    console.log ("see this .... valdiate ...");
      if (!this.validatePWD()){
        return false;
      }

    }

    

    if (this.examId) {
      data.examid = this.examId;
    }
     

    this.examListService
      .saveCostInfo(data)
      .pipe(first())
      .subscribe( (res:any) => {
       // this.costInfoDetail = res;
        if (res.error) {
          this.error = res.message.english || res.message;
          return;
        } else {
          this._success.next("Cost Info saved..");
          this.router.navigate(["admin/exam/" + this.examId]);
        }
      });
  }


  validatePWD (){

    if (!this.costInfoDetail.ispwd){
       
      return true;
    }

    var numValid = 0;

    for (var i=0; i<this.costInfoDetail.pwd_type.length; i++){
      var item = this.costInfoDetail.pwd_type [i];

 

      if (item.min != ""){
        if (isNaN (item.min)){
          this.error = "pwd min must be a number";
          return false;
        } 
      }
      if (item.max != ""){
        if (isNaN (item.min)){
          this.error = "pwd max must be a number";
          return false;
        }
      }

      if (+item.min > +item.max){
        this.error = "pwd max must be greater than min";
          return false;
      }

      if (item.min != "" && item.max != "" &&  !isNaN (item.min) 
          && !isNaN (item.max) &&  
          +item.max >=0  
          && +item.min >=0
          && +item.max >= +item.min){
        numValid ++;
      }
     


    }

    if (numValid == 0){
      this.error = "add at least one pwd min/max";
          return false;
    }

    return true;

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

  isNumber(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  validateFloatKeyPress(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    let el = evt.target.value;
    var number = el.split(".");
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    //just one dot
    if (number.length > 1 && charCode == 46) {
      return false;
    }
    //get the current position
    var caratPos = el.lastIndexOf(document.getSelection());
    var dotPos = el.indexOf(".");
    if (caratPos > dotPos && dotPos > -1 && number[1].length > 1) {
      return false;
    }
    return true;
  }

  onCancel() {
    this.router.navigate(["admin/exam/" + this.examId]);
  }
}
