import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/list-response-model';
import { CreateOrderRequest } from '../models/order/create-order-request';
import { DeleteOrderRequest } from '../models/order/delete-order-request';
import { GetAllOrderResponse } from '../models/order/get-all-order-response';
import { UpdateOrderRequest } from '../models/order/update-order-request';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }

  getOrders(): Observable<ListResponseModel<GetAllOrderResponse>> {
    let newPath = this.apiUrl + "order/getall"
    return this.httpClient.get<ListResponseModel<GetAllOrderResponse>>(newPath);
  }

  getOrdersBySortingNameAsc(sortBy: string): Observable<ListResponseModel<GetAllOrderResponse>> {
    let newPath = this.apiUrl + "order/getlistbysorting?sortBy=" + sortBy
    return this.httpClient.get<ListResponseModel<GetAllOrderResponse>>(newPath);
  }

  getOrdersByPaginationAndSortingNameAsc(pageNo: number, pageSize: number, sortBy: string): Observable<ListResponseModel<GetAllOrderResponse>> {
    let newPath = this.apiUrl +
      `order/getlistbypaginationandsorting?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    return this.httpClient.get<ListResponseModel<GetAllOrderResponse>>(newPath);
  }

  add(order: CreateOrderRequest): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "order/add", order);
  }

  delete(order: DeleteOrderRequest): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "order/delete", { body: order });
  }

  update(id: number, order: UpdateOrderRequest): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + "order/update?id=" + id, order);
  }
}
