import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { GetAllCategoryResponse } from 'src/app/models/category/get-all-category-response';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { FileUploadOptions } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm:FormGroup;
  categories:GetAllCategoryResponse[] = [];

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    explanation: "Resimleri sürükleyin veya seçin...",
    accept: ".png, .jpg, .jpeg, .json"
  }

  constructor(private formBuilder:FormBuilder, private productService:ProductService,
    private toastrService:ToastrService, private categoryService:CategoryService){}

  ngOnInit(): void {
      this.createProductAddForm();
  }

  getCategories():Observable<GetAllCategoryResponse[]>{
    return this.categoryService.getCategories().pipe(
      map(response => response.data)
    );
  }

  getCategories2(){
    this.categoryService.getCategories().forEach(c => {
      this.categories = c.data;
    })
    return this.categories;
  }

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      name:["", Validators.required],
      price:["", Validators.required],
      description:[""],
      productionDate:["", Validators.required],
      expirationDate:["", Validators.required],
      stock:["", Validators.required],
      categoryId:["", Validators.required],
      producerId:["", Validators.required],
      supplierId:["", Validators.required],
      imageUrls: [[""]]
    })
  }

  add(){
    if(this.productAddForm.valid){
      let productModel = JSON.parse(JSON.stringify(this.productAddForm.value))
      this.productService.add(productModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarili")
      }, error => {
        for(let key in error.error.data){
          this.toastrService.error(error.error.data[key], "Başarısız!")
        }
      });
    }else{
      this.toastrService.error("Form bilgileri eksik ya da hatali!", "Dikkat!")
    }
  }
}
