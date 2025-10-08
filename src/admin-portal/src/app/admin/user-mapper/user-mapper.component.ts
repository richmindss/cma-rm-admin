import { Component, OnInit } from "@angular/core";
import { UserListService ,AuthenticationService} from "../../shared/services/";
import { Router, ActivatedRoute } from "@angular/router";
import { ConstantService } from "../../shared/services/constant/constant.service";
import { Subject } from "rxjs";
import { debounceTime, first } from "rxjs/operators";
import { AlertService } from "../../shared/services/alert/alert.service";

@Component({
  selector: "app-user-mapper",
  templateUrl: "./user-mapper.component.html",
  styleUrls: ["./user-mapper.component.scss"]
})
export class UserMapperComponent implements OnInit {
  mapUser: any = {
    _id: "",
    editor : {_id:"",Email:""},
    author: {_id:"",Email:""},
    reviewer: {_id:"",Email:""}
  };
  user: any = {};
  userId: string;
  sender = "users";
  roleResult: any = [];
  examArr : any = [];
  editorArr : any = []; 
  authorArr : any =[];
  reviewerArr : any = [];

  private _success = new Subject<string>();
  private _error = new Subject<string>();

  errorMessage: string | null = null;
  successMessage: string | null = null;
  error: any;
  checkRole:string ="";

  constructor(
    private userListService: UserListService,
    private router: Router,
    private route: ActivatedRoute,
    private constantService: ConstantService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
  //  this.getRole();
    this.getUserType();
    // this.getExamsList();
    this.initAlert();
    this.user = this.authenticationService.getUserDetails();
    this.route.paramMap.subscribe(params => {
      this.route.paramMap.subscribe(params => {
        this.userId = params.get("id") || "";
        if (this.userId !== "new") {
          this.mapUser._id = this.userId;
          this.getUserDetails(this.userId);
        }
      });
    });
  }

  getUserDetails(userId) {
    this.userListService
      .getUserMapperDetails(userId)
      .pipe(first())
      .subscribe(res => {
        this.mapUser = res["data"];
        console.log("this.userData.............",this.mapUser);
        // this.checkRole = res["data"].Role;
      });
  }

  validateEmail(eMail) {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(eMail)) {
      return true;
    } else {
      return false;
    }
  }

  onChangeRole(event: any) {
    //this.checkRole = this.userData.Role;
  }

  isNumber(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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

  fillcodesets() {
   // this.userData.role = this.userData.role || {};

  }

  getUserType(){
    this.userListService
      .getUserType()
      .pipe(first())
      .subscribe(res => {
        if (res["success"] == false) {
          alert(res["message"]);
          this.alertService.err(this.sender, res["message"]);
          return;
        }else{
          //console.log("resssssssssssssssssss",res);
          this.authorArr = res["authors"];
          this.reviewerArr = res["reviewers"];
          this.editorArr = res["editors"];
         
        }
       
      });
  }

  // getExamsList(){
  //   this.userListService
  //     .getExamsList()
  //     .pipe(first())
  //     .subscribe(res => {
  //       if (res["success"] == false) {
  //         alert(res["message"]);
  //         this.alertService.err(this.sender, res["message"]);
  //         return;
  //       }else{
  //         this.examArr = res["data"];
  //         console.log("this.examArr......",this.examArr);
  //       }
       
  //     });
  // }

  onSave() {
    this.error = "";
    
    if (!this.mapUser.author) {
      this.error = "Please Select Author";
      return false;
    }

    if (!this.mapUser.reviewer) {
      this.error = "Please Select Reviewer";
      return false;
    }


    this.userListService
      .saveUserMap(this.mapUser)
      .pipe(first())
      .subscribe(res => {
        console.log(res)
        if (res["success"] == false) {
          alert(res["message"]);
          this.alertService.err(this.sender, res["message"]);
          return;
        }else{
         alert("User Saved Successfully ...")
         this.alertService.show(this.sender, "User saved...");
        }
       
      });
  }

  onUpdate(){
 this.error = "";
     //alert("on save....");
    if (!this.mapUser.author) {
      this.error = "Please Select Author";
      return false;
    }

    if (!this.mapUser.reviewer) {
      this.error = "Please Select Reviewer";
      return false;
    }

    this.userListService
      .updateMappedUser(this.mapUser)
      .pipe(first())
      .subscribe(res => {
        console.log(res)
        if (res["success"] == false) {
          alert(res["message"]);
          this.alertService.err(this.sender, res["message"]);
          return;
        }else{
         alert("User Updated Successfully ...")
         this.alertService.show(this.sender, "User saved...");
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


  compareFn (a,b){
    if ( a && b){
      return a.code == b.code;
    }

    return false;
  }

  compareEditor(o1: any, o2: any): boolean {
  return o1 && o2 ? o1._id === o2._id : o1 === o2;
  }

  compareAuthor(o1: any, o2: any): boolean {
  return o1 && o2 ? o1._id === o2._id : o1 === o2;
  }

  compareReviewer(o1: any, o2: any): boolean {
  return o1 && o2 ? o1._id === o2._id : o1 === o2;
  }

  onClose() {
    this.router.navigate(["admin/user-mapper-list/"]);
  }
}
