import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent {

  categoryUpdateForm:FormGroup;
  id:number;

  constructor(private formBuilder:FormBuilder, private categoryService:CategoryService, 
    private toastrService:ToastrService, private route:ActivatedRoute) { }

  ngOnInit(): void {
      this.updateCategoryForm();
  }

  updateCategoryForm(){
    this.categoryUpdateForm = this.formBuilder.group({
      name:["", Validators.required]
    })
  }

  update(){
    if (this.categoryUpdateForm.valid) {
      let categoryModel = Object.assign({}, this.categoryUpdateForm.value);
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.categoryService.update(this.id, categoryModel).subscribe(response => {
          this.toastrService.success(response.message, "Başarılı!");
        }, error => {
          for(let key in error.error.data){
            this.toastrService.error(error.error.data[key], error.error.message)
          }
        })
      })
    } else {
      this.toastrService.error("Form bilgileri eksik ya da hatali!", "Dikkat!")
    }
  }

}
