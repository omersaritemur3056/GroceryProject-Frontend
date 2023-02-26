import { ToastrService } from 'ngx-toastr';
import { GetAllProductResponse } from 'src/app/models/product/get-all-product-response';
import { CartService } from './../../services/cart.service';
import { CartItem } from './../../models/cart/cart-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[] = [];

  constructor(private cartService:CartService, private toastrService:ToastrService){}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartItems = this.cartService.list()
  }

  removeFromCart(product:GetAllProductResponse){
    this.cartService.removeFromCart(product);
    this.toastrService.error(product.name + " sepetten çıkarıldı!")
  }

}
