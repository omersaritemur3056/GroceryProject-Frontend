import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { GetAllProductResponse } from 'src/app/models/product/get-all-product-response';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteProductRequest } from 'src/app/models/product/delete-product-request';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: GetAllProductResponse[] = [];
  dataLoaded = false;
  enablePageButton = false;
  filterText = "";
  pageSize = 10;

  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute, 
    private toastrService:ToastrService, private cartService:CartService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"]);
      }
      else if(params["pageNo"]){
        this.getProductsByPaginationAndSortingNameAsc(params["pageNo"]);
      }
      else{
        this.getProductsByPaginationAndSortingNameAsc(1);
      }
    })
  }

  getProducts():GetAllProductResponse[]{
    this.productService.getProducts().subscribe(response => {
      this.products = response.data;
      this.enablePageButton = false;
    })
    return this.products;
  }

  getAllProductsLength():number{
    return this.products.length;
  }

  getProductsBySortingNameAsc(){
    this.productService.getProductsBySortingNameAsc().subscribe(response => {
      this.products = response.data;
      this.dataLoaded = true;
      this.enablePageButton = true;
    })
  }

  getProductsByPaginationAndSortingNameAsc(page:number){
    let x = Math.ceil(page)
    this.productService.getProductsByPaginationAndSortingNameAsc(x - 1).subscribe(response => {
      this.products = response.data;
      this.dataLoaded = true;
      this.enablePageButton = true;
    })
  }

  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe(response => {
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

  deleteProduct(deleteProductId:number){
    if(!window.confirm("Silmek istediğinize emin misiniz?")){return;}
    let deleteProduct:DeleteProductRequest = {id:deleteProductId}
    this.productService.delete(deleteProduct).subscribe(response => {
      this.toastrService.error(response.message, deleteProduct.id.toString());
    })
  }

  addToCart(product:GetAllProductResponse){
    this.toastrService.success("Sepete eklendi", product.name)
    this.cartService.addToCart(product);
  }

}
