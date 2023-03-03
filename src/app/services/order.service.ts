import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/list-response-model';
import { CreateOrderRequest } from '../models/order/create-order-request';
import { GetAllOrderResponse } from '../models/order/get-all-order-response';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient:HttpClient) { }

  getOrders():Observable<ListResponseModel<GetAllOrderResponse>>{
    let newPath = this.apiUrl + "order/getall"
    return this.httpClient.get<ListResponseModel<GetAllOrderResponse>>(newPath);
  }

  getOrdersBySortingNameAsc():Observable<ListResponseModel<GetAllOrderResponse>>{
    let newPath = this.apiUrl + "order/getlistbysorting"
    return this.httpClient.get<ListResponseModel<GetAllOrderResponse>>(newPath);
  }

  getOrdersByPaginationAndSortingNameAsc(pageNo:number):Observable<ListResponseModel<GetAllOrderResponse>>{
    let newPath = this.apiUrl + "order/getlistbypaginationandsorting?pageNo=" + pageNo
    return this.httpClient.get<ListResponseModel<GetAllOrderResponse>>(newPath);
  }

  add(order:CreateOrderRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "order/add", order);
  }

}
