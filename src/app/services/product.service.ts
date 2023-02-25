import { GetAllProductResponse } from './../models/product/get-all-product-response';
import { ListResponseModel } from './../models/list-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from './category.service';
import { GetAllCategoryResponse } from '../models/category/get-all-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  categories:GetAllCategoryResponse[] = [];

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient:HttpClient, private categoryService:CategoryService) { }

  getProducts():Observable<ListResponseModel<GetAllProductResponse>>{
    let newPath = this.apiUrl + "product/getall"
    return this.httpClient.get<ListResponseModel<GetAllProductResponse>>(newPath);
  }

  getProductsBySortingNameAsc():Observable<ListResponseModel<GetAllProductResponse>>{
    let newPath = this.apiUrl + "product/getlistbysorting"
    return this.httpClient.get<ListResponseModel<GetAllProductResponse>>(newPath);
  }

  getProductsByCategory(categoryId:number):Observable<ListResponseModel<GetAllProductResponse>>{
    let newPath = this.apiUrl + "product/getallbycategory?categoryId=" + categoryId
    return this.httpClient.get<ListResponseModel<GetAllProductResponse>>(newPath);
  }
}
