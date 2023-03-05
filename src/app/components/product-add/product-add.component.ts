import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private productService:ProductService,
    private toastrService:ToastrService){}

  ngOnInit(): void {
      this.createProductAddForm();
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
          this.toastrService.error(error.error.data[key], error.error.message)
        }
      });
    }else{
      this.toastrService.error("Form bilgileri eksik ya da hatali!", "Dikkat!")
    }
  }
}
