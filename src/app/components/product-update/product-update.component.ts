import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {

  productUpdateForm:FormGroup;
  id:number;

  constructor(private formBuilder:FormBuilder, private productService:ProductService,
    private toastrService:ToastrService, private route:ActivatedRoute){}

  ngOnInit(): void {
      this.createProductUpdateForm();
  }

  createProductUpdateForm(){
    this.productUpdateForm = this.formBuilder.group({
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

  update(){
    if(this.productUpdateForm.valid){
      let productModel = JSON.parse(JSON.stringify(this.productUpdateForm.value))
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.productService.update(productModel, this.id).subscribe(response => {
          this.toastrService.success(response.message, "Başarili")
        }, error => {
          for(let key in error.error.data){
            this.toastrService.error(error.error.data[key], error.error.message)
          }
        });
      })
    }else{
      this.toastrService.error("Form bilgileri eksik ya da hatali!", "Dikkat!")
    }
  }
}
