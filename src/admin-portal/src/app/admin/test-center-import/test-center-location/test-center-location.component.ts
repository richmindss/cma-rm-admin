import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { TestcenterService } from "../../../shared/services/test-center/test-center.service";
import { ConstantService } from "../../../shared/services/constant/constant.service";
import Swal from "sweetalert2";
import { first } from "rxjs/operators";
import { CoreService } from "../../../shared/services/core/core.service";
import { AlertService } from "../../../shared/services/alert/alert.service";


@Component({
  selector: "app-test-center-location",
  templateUrl: "./test-center-location.component.html",
  styleUrls: ["./test-center-location.component.scss"]
})
export class TestCenterLocationComponent implements OnInit {
  public searchKey: any;
  public largeModal: any;
  data: any;
  testcenter: any;
  centerid: any;
  testLocation: any = {
    city: "",
    name: "",
    state: "",
    _id: "",
    testcenterid: "",
    testcentercapacity: "",
    bookedseatingcapacity: "",
    buffercapacity: "",
    contactnumber: "",
    address: ""
  };
  error: any;
  stateResult: any = [];
  testlocation: any;
  sender = "test-center-location";

  constructor(
    private modalService: NgbModal,
    private testcenterServiceApi: TestcenterService,
    private route: ActivatedRoute,
    private router: Router,
    private constantApi: ConstantService,
    private coreService: CoreService,
    private alertService: AlertService,


  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.centerid = params.get("id");
    });
    if (this.centerid !== "new") {
      this.getTestcenterbyId(this.centerid);
    }
    this.getState();
  }

  getTestcenterbyId(id) {
    this.testcenterServiceApi
      .getTestcenterbyId(id)
      .pipe(first())
      .subscribe(res => {
        this.testLocation = res;
      });
  }

  isNotAlphabet(evt) {
    return this.coreService.isNotAlphabet(evt);
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

  getTestcenter() {
    this.testcenterServiceApi
      .getTestcenter()
      .pipe(first())
      .subscribe(res => {
        this.testcenter = res;
      });
  }

  public isNotCopyPasteNumAndSpecialChar(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
      // invalid character, prevent input

    }
  }

  getState() {
    this.testcenterServiceApi
      .getStates()
      .pipe(first())
      .subscribe(res => {
        this.stateResult = res;
      });
  }

  onClose() {
    window.history.back();
  }

  validatePhone(phone) {
    if (/^((\+)?(\d{2}))?(\d{10}){1}?$/.test(phone)) {
      return true;
    } else {
      return false;
    }
  }

  validateCapacity(capacity) {
    if (/^[0-9]*$/.test(capacity)) {
      return true;
    } else {
      return false;
    }
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


    if (!this.testLocation.name) {
      this.alertService.err(this.sender, "Invalid test location name");
      return false;
    }

    if (!this.testLocation.testcenterid) {
      this.alertService.err(this.sender, "Invalid test location testcenterid");
      return false;
    }

    if (
      !this.validateCapacity(this.testLocation.testcentercapacity) ||
      !this.testLocation.testcentercapacity
    ) {
      this.alertService.err(this.sender, "Invalid test center seating capacity");
      return false;

    }
    if (
      !this.validateCapacity(this.testLocation.bookedseatingcapacity) ||
      !this.testLocation.bookedseatingcapacity
    ) {

      this.alertService.err(this.sender, "Invalid booked seating capacity");
      return false;
    }
    if (
      this.testLocation.bookedseatingcapacity >=
      this.testLocation.testcentercapacity
    ) {

      this.alertService.err(this.sender, "Booking capacity cannot be greater than test center capacity");
      return false;
    }
    if (
      !this.validateCapacity(this.testLocation.buffercapacity) ||
      !this.testLocation.buffercapacity
    ) {
      this.alertService.err(this.sender, "Invalid  buffer capacity");
      return false;

    }
    if (
      !this.validatePhone(this.testLocation.contactnumber) ||
      !this.testLocation.contactnumber
    ) {

      this.alertService.err(this.sender, "Invalid Mobile Number");
      return false;
    }
    if (!this.testLocation.city) {

      this.alertService.err(this.sender, "Invalid test location city");
      return false;
    }

    if (!this.testLocation.state) {
      this.alertService.err(this.sender, "Invalid test location state");
      return false;
    }

    if (!this.testLocation.address) {
      this.alertService.err(this.sender, "Invalid test location address");
      return false;

    }

    //saving ....validate ..

    this.testcenterServiceApi
      .saveTestcenter(this.testLocation)
      .pipe(first())
      .subscribe(res => {
        this.testlocation = res;

        if (res["status"] == "error") {
          this.alertService.err(this.sender, res["message"]);
          return;
        }
        this.alertService.show(this.sender, "Test center Data Saved");
        console.log("sender", this.sender);

        setTimeout(() => {
          this.router.navigate(["admin/test-center-location-import-list"]);
        }, 1000);
      });
  }

  onDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "TestCenter data will be deleted. This action cant be reversed!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
        Swal.fire("Deleted!", "Testcenter is deleted.", "success");

        this.testcenterServiceApi
          .deleteTestcenter(this.centerid)
          .pipe(first())
          .subscribe(res => {
            this.getTestcenterbyId(this.centerid);
            this.router.navigate(["admin/test-center-location-import-list"]);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Testcenter is Not Deleted:)", "error");
      }
    });
  }
}
