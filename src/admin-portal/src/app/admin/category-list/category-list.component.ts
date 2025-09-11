import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CategoryService } from "../../shared/services/category/category.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"]
})
export class CategoryListComponent implements OnInit {
  categoryData: any = [];

  constructor(
    private router: Router,
    private categoryServiceApi: CategoryService
  ) {}

  onAddCategory() {
    this.router.navigate(["admin/category/new"]);
  }
  getCategoryData() {
    this.categoryServiceApi
      .getCategory()
      .pipe(first())
      .subscribe(res => {
        console.log("test");
        this.categoryData = res;
      });
  }

  deleteData(category) {
    this.categoryServiceApi
      .deleteCategoryData(category._id)
      .pipe(first())
      .subscribe(res => {
        this.getCategoryData();
      });
  }

  open(category) {
    this.router.navigate(["admin/category/" + category._id]);
  }

  ngOnInit() {
    this.getCategoryData();
  }
}
