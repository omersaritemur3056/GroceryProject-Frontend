import { CategoryService } from './../../services/category.service';
import { GetAllCategoryResponse } from './../../models/category/get-all-category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories:GetAllCategoryResponse[] = [];
  currentCategory:GetAllCategoryResponse;

  constructor(private categoryService:CategoryService){}

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
    if(!this.currentCategory){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
}
