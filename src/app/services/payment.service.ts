import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/list-response-model';
import { CreatePaymentRequest } from '../models/payment/create-payment-request';
import { DeletePaymentRequest } from '../models/payment/delete-payment-request';
import { GetAllPaymentResponse } from '../models/payment/get-all-payment-response';
import { UpdatePaymentRequest } from '../models/payment/update-payment-request';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }

  getPayments(): Observable<ListResponseModel<GetAllPaymentResponse>> {
    let newPath = this.apiUrl + "payment/getall"
    return this.httpClient.get<ListResponseModel<GetAllPaymentResponse>>(newPath);
  }

  getPaymentsBySortingNameAsc(sortBy: string): Observable<ListResponseModel<GetAllPaymentResponse>> {
    let newPath = this.apiUrl + "payment/getlistbysorting?sortBy=" + sortBy
    return this.httpClient.get<ListResponseModel<GetAllPaymentResponse>>(newPath);
  }

  getPaymentsByPaginationAndSortingNameAsc(pageNo: number, pageSize: number, sortBy: string): Observable<ListResponseModel<GetAllPaymentResponse>> {
    let newPath = this.apiUrl +
      `payment/getlistbypaginationandsorting?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    return this.httpClient.get<ListResponseModel<GetAllPaymentResponse>>(newPath);
  }

  add(payment: CreatePaymentRequest): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "payment/add", payment);
  }

  delete(payment: DeletePaymentRequest): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "payment/delete", { body: payment });
  }

  update(id: number, payment: UpdatePaymentRequest): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + "payment/update?id=" + id, payment);
  }
}
