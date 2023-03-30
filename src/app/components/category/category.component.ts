import { CategoryService } from './../../services/category.service';
import { GetAllCategoryResponse } from '../../models/category/get-all-category-response';
import { Component, OnInit } from '@angular/core';
import { DeleteCategoryRequest } from 'src/app/models/category/delete-category-request';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/customize-services/alertify.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories:GetAllCategoryResponse[] = [];
  currentCategory:GetAllCategoryResponse;

  constructor(private categoryService:CategoryService, private toastrService:ToastrService, 
    private authService:AuthService, private alertify: AlertifyService){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
    })
  }

  setCurrentCategory(category:GetAllCategoryResponse){
    this.currentCategory = category;
  }

  setAllCategory(){
    this.currentCategory = {id:0, name:""}
  }

  getCurrentCategoryClass(category:GetAllCategoryResponse){
    if(category == this.currentCategory){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  getAllCategoryClass(){
    if(!this.currentCategory || this.currentCategory.id == 0){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  deleteCategory(deleteCategoryId:number){
    this.alertify.confirm("Silme Uyarısı", "Silmek istediğinize enin misiniz?", () => {
      let deleteCategory: DeleteCategoryRequest = { id: deleteCategoryId }
       this.categoryService.delete(deleteCategory).subscribe(response => {
        this.toastrService.error(response.message, deleteCategory.id.toString());
      })
    }, () => {
      return;
    })
  }

  isAdmin(){
    if (this.authService.hasAutorized().role == "ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  isModerator(){
    if (this.authService.hasAutorized().role == "MODERATOR") {
      return true;
    } else {
      return false;
    }
  }
  
  isEditor(){
    if (this.authService.hasAutorized().role == "EDITOR") {
      return true;
    } else {
      return false;
    }
  }
}
