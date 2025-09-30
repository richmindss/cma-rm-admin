import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserListService,AuthenticationService } from "../../shared/services";
import Swal from "sweetalert2";
import { first } from "rxjs/operators";

@Component({
  selector: "app-user-mapper-list",
  templateUrl: "./user-mapper-list.component.html",
  styleUrls: ["./user-mapper-list.component.scss"]
})
export class UsersMapperListComponent implements OnInit {
  userlist: any;
  error: string;

  filter: any = {
    key: ""
  };
  user:any = {};
  /*** for paginaton start */
  pageSize = 25;
  currentPage = 1;
  userCount = 0;

  /** end pagination */

  constructor(
    private router: Router,
    private userListServiceApi: UserListService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getUserList();
      this.user = this.authenticationService.getUserDetails();
  }

  open(user) {
    this.router.navigate(["admin/user-mapper/" + user._id]);
  }

  onAddUsers() {
    this.router.navigate(["admin/user-mapper/new"]);
  }

  getUserList() {
    this.userListServiceApi
      .getUserMappingList()
      .pipe(first())
      .subscribe(res => {
        this.userCount = res["data"].length;
        this.userlist = res["data"];
      });
  }

  fetchUserData(e) {
    this.currentPage = e;

    this.getUserList();
  }

  deleteUserList(user) {
    Swal.fire({
      title: "Are you sure?",
      text: "User data will be deleted. This action cant be reversed!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then(result => {
      if (result.value) {
        Swal.fire("Deleted!", "User is deleted.", "success");

        this.userListServiceApi
          .deleteUserList(user._id)
          .pipe(first())
          .subscribe(res => {
            this.getUserList();
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "User is Not Deleted:)", "error");
      }
    });
  }
}
