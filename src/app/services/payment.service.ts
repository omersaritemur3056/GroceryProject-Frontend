import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/list-response-model';
import { CreatePaymentRequest } from '../models/payment/create-payment-request';
import { GetAllPaymentResponse } from '../models/payment/get-all-payment-response';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient:HttpClient) { }

  getPayments():Observable<ListResponseModel<GetAllPaymentResponse>>{
    let newPath = this.apiUrl + "payment/getall"
    return this.httpClient.get<ListResponseModel<GetAllPaymentResponse>>(newPath);
  }

  getPaymentsBySortingNameAsc():Observable<ListResponseModel<GetAllPaymentResponse>>{
    let newPath = this.apiUrl + "payment/getlistbysorting"
    return this.httpClient.get<ListResponseModel<GetAllPaymentResponse>>(newPath);
  }

  getPaymentsByPaginationAndSortingNameAsc(pageNo:number):Observable<ListResponseModel<GetAllPaymentResponse>>{
    let newPath = this.apiUrl + "payment/getlistbypaginationandsorting?pageNo=" + pageNo
    return this.httpClient.get<ListResponseModel<GetAllPaymentResponse>>(newPath);
  }

  add(payment:CreatePaymentRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "payment/add", payment);
  }

}
