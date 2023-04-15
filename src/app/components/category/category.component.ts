import { CategoryService } from './../../services/category.service';
import { GetAllCategoryResponse } from '../../models/category/get-all-category-response';
import { Component, OnInit } from '@angular/core';
import { DeleteCategoryRequest } from 'src/app/models/category/delete-category-request';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/customize-services/alertify.service';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends BaseComponent implements OnInit {

  categories: GetAllCategoryResponse[] = [];
  currentCategory: GetAllCategoryResponse;

  constructor(private categoryService: CategoryService, private toastrService: ToastrService,
    private alertify: AlertifyService, authService: AuthService) {
    super(null, authService);
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
    })
  }

  setCurrentCategory(category: GetAllCategoryResponse) {
    this.currentCategory = category;
  }

  setAllCategory() {
    this.currentCategory = { id: 0, name: "" }
  }

  getCurrentCategoryClass(category: GetAllCategoryResponse) {
    if (category == this.currentCategory) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

  getAllCategoryClass() {
    if (!this.currentCategory || this.currentCategory.id == 0) {
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

  deleteCategory(deleteCategoryId: number) {
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteCategory: DeleteCategoryRequest = { id: deleteCategoryId }
      this.categoryService.delete(deleteCategory).subscribe(response => {
        this.toastrService.error(response.message, deleteCategory.id.toString());
      })
    }, () => {
      return;
    })
  }
}
