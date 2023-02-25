import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { GetAllProductResponse } from 'src/app/models/product/get-all-product-response';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: GetAllProductResponse[] = [];
  dataLoaded = false;
  filterText="";

  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute, 
    private toastrService:ToastrService, private cartService:CartService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"])
      }else{
        this.getProductsBySortingNameAsc();
      }
    })
  }

  getProducts(){
    this.productService.getProducts().subscribe(response => {
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

  getProductsBySortingNameAsc(){
    this.productService.getProductsBySortingNameAsc().subscribe(response => {
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe(response => {
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

  addToCart(product:GetAllProductResponse){
    this.toastrService.success("Sepete eklendi", product.name)
    this.cartService.addToCart(product);
  }
}
