import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponseModel } from '../models/product/product-response-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "http://localhost:8080/api/product/getall";

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<ProductResponseModel>{
    return this.httpClient.get<ProductResponseModel>(this.apiUrl);
  }
}
