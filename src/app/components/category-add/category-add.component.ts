import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit{

  categoryAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private categoryService:CategoryService, 
    private toastrService:ToastrService) { }

  ngOnInit(): void {
      this.createCategoryAddForm();
  }

  createCategoryAddForm(){
    this.categoryAddForm = this.formBuilder.group({
      name:["", Validators.required]
    })
  }

  add(){
    if (this.categoryAddForm.valid) {
      let categoryModel = Object.assign({}, this.categoryAddForm.value);
      this.categoryService.add(categoryModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı!");
      }, error => {
        for(let key in error.error.data){
          this.toastrService.error(error.error.data[key], error.error.message)
        }
      })
    } else {
      this.toastrService.error("Form bilgileri eksik ya da hatali!", "Dikkat!")
    }
  }

}
