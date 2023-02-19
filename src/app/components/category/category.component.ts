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

  constructor(private categoryService:CategoryService){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
    })
  }
}
