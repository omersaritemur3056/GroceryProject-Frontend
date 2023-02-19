import { CategoryResponseModel } from './../models/category/category-response-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "http://localhost:8080/api/category/getall";

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<CategoryResponseModel>{
    return this.httpClient.get<CategoryResponseModel>(this.apiUrl);
  }
  
}
