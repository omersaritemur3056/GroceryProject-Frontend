import { ProductService } from './../../services/product.service';
import { ProductResponseModel } from './../../models/product/product-response-model';
import { Component, OnInit } from '@angular/core';
import { GetAllProductResponse } from 'src/app/models/product/get-all-product-response';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: GetAllProductResponse[] = [];
  dataLoaded = false;

  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(response => {
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

}
