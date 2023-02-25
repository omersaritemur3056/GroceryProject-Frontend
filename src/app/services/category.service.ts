import { GetAllCategoryResponse } from './../models/category/get-all-category';
import { ListResponseModel } from './../models/list-response-model';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  
}
