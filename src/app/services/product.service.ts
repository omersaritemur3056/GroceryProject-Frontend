import { GetAllProductResponse } from './../models/product/get-all-product-response';
import { ListResponseModel } from './../models/list-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<ListResponseModel<GetAllProductResponse>>{
    let newPath = this.apiUrl + "product/getall"
    return this.httpClient.get<ListResponseModel<GetAllProductResponse>>(newPath);
  }

  getProductsByCategory(categoryId:number):Observable<ListResponseModel<GetAllProductResponse>>{
    let newPath = this.apiUrl + "product/getallbycategory?categoryId=" + categoryId
    return this.httpClient.get<ListResponseModel<GetAllProductResponse>>(newPath);
  }
}
