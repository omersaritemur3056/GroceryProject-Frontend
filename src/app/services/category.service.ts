import { GetAllCategoryResponse } from '../models/category/get-all-category-response';
import { ListResponseModel } from './../models/list-response-model';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCategoryRequest } from '../models/category/create-category-request';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<ListResponseModel<GetAllCategoryResponse>>{
    let newPath = this.apiUrl + "category/getall"
    return this.httpClient.get<ListResponseModel<GetAllCategoryResponse>>(newPath);
  }

  add(category:CreateCategoryRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "category/add", category);
  }
  
}
