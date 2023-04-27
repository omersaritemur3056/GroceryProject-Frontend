import { GetAllProductResponse } from './../models/product/get-all-product-response';
import { ListResponseModel } from './../models/list-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllCategoryResponse } from '../models/category/get-all-category-response';
import { CreateProductRequest } from '../models/product/create-product-request';
import { ResponseModel } from '../models/response-model';
import { UpdateProductRequest } from '../models/product/update-product-request';
import { DeleteProductRequest } from '../models/product/delete-product-request';
import { GetByIdProductResponse } from '../models/product/get-by-id-product-request';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  categories: GetAllCategoryResponse[] = [];

  apiUrl: string = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ListResponseModel<GetAllProductResponse>> {
    let newPath = this.apiUrl + "product/getall"
    return this.httpClient.get<ListResponseModel<GetAllProductResponse>>(newPath);
  }

  getProductById(id: number): Observable<any> {
    let newPath = this.apiUrl + "product/getbyid?id="
    return this.httpClient.get<any>(newPath + id);
  }

  getProductsBySortingNameAsc(sortBy: string): Observable<ListResponseModel<GetAllProductResponse>> {
    let newPath = this.apiUrl + "product/getlistbysorting?sortBy=" + sortBy
    return this.httpClient.get<ListResponseModel<GetAllProductResponse>>(newPath);
  }

  getProductsByPaginationAndSortingNameAsc(pageNo: number, pageSize: number, sortBy: string): Observable<ListResponseModel<GetAllProductResponse>> {
    let newPath = this.apiUrl +
      `product/getlistbypaginationandsorting?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    return this.httpClient.get<ListResponseModel<GetAllProductResponse>>(newPath);
  }

  getProductsByCategory(categoryId: number): Observable<ListResponseModel<GetAllProductResponse>> {
    let newPath = this.apiUrl + "product/getallbycategory?categoryId=" + categoryId
    return this.httpClient.get<ListResponseModel<GetAllProductResponse>>(newPath);
  }

  add(product: CreateProductRequest): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "product/add", product);
  }

  update(product: UpdateProductRequest, id: number): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + "product/update?id=" + id, product);
  }

  delete(deleteProduct: DeleteProductRequest): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "product/delete", { body: deleteProduct });
  }
}
