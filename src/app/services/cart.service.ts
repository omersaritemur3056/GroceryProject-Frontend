import { CartItems } from './../models/cart/cart-items';
import { GetAllProductResponse } from 'src/app/models/product/get-all-product-response';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  addToCart(product:GetAllProductResponse){
    let item = CartItems.find(c => c.product.id === product.id);
    if(item){
      item.quantity += 1;
    }else{
      let cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
    }
  }

  removeFromCart(product:GetAllProductResponse){
    let item = CartItems.find(c => c.product.id === product.id);
    CartItems.splice(CartItems.indexOf(item),1)
  }

  list():CartItem[]{
    return CartItems;
  }
}
