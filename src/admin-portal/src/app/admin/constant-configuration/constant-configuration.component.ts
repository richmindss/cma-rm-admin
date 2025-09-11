import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConstantService } from "../../shared/services/constant/constant.service";
import { ExamListService } from "../../shared/services/exam-list/exam-list.service";
import { first } from "rxjs/operators";
@Component({
  selector: "app-constant-configuration",
  templateUrl: "./constant-configuration.component.html",
  styleUrls: ["./constant-configuration.component.scss"]
})
export class ConstantConfigurationComponent implements OnInit {
  error: string;
  constantResult: any = [];
  constantValueResult: any = [];
  isConstantValueVisible = false;
  saveResult: any = {};
  currentConstantId: any;
  currentConstant: any;
  search: any;
  searchval: any;
  constant: any = {
    code: "",
    name: "",
    _id: ""
  };
  constantvalue: any = {
    code: "",
    name: "",
    sequence: "",
    ext1: "",
    ext2: "",
    active: "",
    _id: ""
  };
  constantres: any;
  exams: any = [];
  filter: any = {
    key: ""
  };
  pageSize = 25;
  currentPage = 1;
  constructor(
    private modalService: NgbModal,
    private constantConfigurationApi: ConstantService,
    private examListServiceApi: ExamListService
  ) {}

  ngOnInit() {
    this.getConstant();
    this.getExamList();
  }

  open(content, value) {
    this.constantvalue = JSON.parse(JSON.stringify(value));
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(result => {});
  }

  openConstant(content, value) {
    this.constant = value;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(result => {});
  }

  view(constant) {
    this.currentConstant = constant;
    this.currentConstantId = constant._id;
    this.isConstantValueVisible = true;

    this.constantConfigurationApi
      .getConstantValueByConstantId(constant._id)
      .pipe(first())
      .subscribe(res => {
        this.searchval = "";
        if (res) {
          this.constantValueResult = res;
        }
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

  viewConstantVal(contantId) {
    this.isConstantValueVisible = true;
    this.constantConfigurationApi
      .getConstantValueByConstantId(contantId)
      .pipe(first())
      .subscribe(res => {
        if (res) {
          this.constantValueResult = res;
        }
      });
  }

  onSaveConstantValue() {
    this.error = null;
    if (!this.constantvalue.name) {
      this.error = "Please enter the name of the constant value";
      return;
    }
    if (!this.constantvalue.code) {
      this.error = "Please enter the code of the constant value";
      return;
    }
    if (!this.constantvalue.sequence) {
      this.error = "Please enter the sequence of the constant value";
      return;
    }

    this.constantvalue.constantid = this.currentConstantId;
    this.constantConfigurationApi
      .saveConstantValue(this.constantvalue)
      .pipe(first())
      .subscribe(res => {
        this.constantres = res;
        if (this.constantres.error) {
          this.error = this.constantres.message.english;
          return;
        }
        if (res) {
          this.saveResult = res;
          this.modalService.dismissAll();
          this.viewConstantVal(this.saveResult.constantid);
        }
      });
  }

  onSaveConstant() {
    this.error = null;
    if (!this.constant.name) {
      this.error = "Please enter the name of the constant";
      return;
    }
    if (!this.constant.code) {
      this.error = "Please enter the code of the constant";
      return;
    }
    if (!this.constant.sequence) {
      this.error = "Please enter the sequence of the constant";
      return;
    }
    this.constantConfigurationApi
      .saveConstant(this.constant)
      .pipe(first())
      .subscribe(res => {
        if(res["status"]=="error"){
         return alert(res["message"]);
        }
        this.constant = res;
        this.modalService.dismissAll();
        this.getConstant();
      });
  }

  deleteConstantValue(value) {
    this.constantConfigurationApi
      .deleteConstantValue(value._id)
      .pipe(first())
      .subscribe(res => {
        this.viewConstantVal(this.currentConstantId);
      });
  }

  deleteConstant(value) {
    this.constantConfigurationApi
      .deleteConstant(value._id)
      .pipe(first())
      .subscribe(res => {
        this.getConstant();
      });
  }

  getConstant() {
    this.constantConfigurationApi
      .getConstant()
      .pipe(first())
      .subscribe(res => {
        this.constantResult = res;
      });
  }

  searchConstant() {
    var key = this.search;
    this.constantConfigurationApi
      .searchConstant(key)
      .pipe(first())
      .subscribe(res => {
        this.constantResult = res;
      });
  }

  searchConstantValue() {
    var key = this.searchval;
    this.constantConfigurationApi
      .searchConstantValue(key, this.currentConstantId)
      .pipe(first())
      .subscribe(res => {
        this.constantValueResult = res;
      });
  }

  getExamList() {
    this.examListServiceApi
      .getExamList(this.currentPage, this.pageSize, this.filter)
      .pipe(first())
      .subscribe(res => {
       // console.log("resssssssssssssssssssssss",res);
       // this.examCount = res["count"];
        this.exams = res["data"];
      });
  }
}
