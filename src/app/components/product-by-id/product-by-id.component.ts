import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetByIdProductResponse } from 'src/app/models/product/get-by-id-product-request';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-by-id',
  templateUrl: './product-by-id.component.html',
  styleUrls: ['./product-by-id.component.css']
})
export class ProductByIdComponent implements OnInit {

  product: GetByIdProductResponse;
  id: number;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
    private router: Router, private toastrService: ToastrService, private cartService: CartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      this.productService.getProductById(this.id).subscribe(response => {
        this.product = response.data
      })
    })
  }

  addToCart(product: GetByIdProductResponse) {
    const roles = localStorage.getItem("roles");
    if (!roles) {
      this.toastrService.error("Sisteme giriş yapmalısınız!")
      this.router.navigate(["login"]);
      return;
    }
    this.toastrService.success(product.name, "Sepete eklendi")
    this.cartService.addToCart(product);
  }
}
