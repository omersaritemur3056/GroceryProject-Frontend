import { GetAllIndividualCustomerResponse } from '../models/individual-customer/get-all-individual-customer-response';
import { ListResponseModel } from './../models/list-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateIndividualCustomerRequest } from '../models/individual-customer/create-individual-customer-request';
import { ResponseModel } from '../models/response-model';
import { DeleteIndividualCustomerRequest } from '../models/individual-customer/delete-individual-customer-request';
import { UpdateIndividualCustomerRequest } from '../models/individual-customer/update-individual-customer-request';

@Injectable({
  providedIn: 'root'
})
export class IndividualCustomerService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }

  getIndividualCustomers(): Observable<ListResponseModel<GetAllIndividualCustomerResponse>> {
    let newPath = this.apiUrl + "individualcustomer/getall"
    return this.httpClient.get<ListResponseModel<GetAllIndividualCustomerResponse>>(newPath);
  }

  getIndividualCustomersBySortingNameAsc(sortBy: string): Observable<ListResponseModel<GetAllIndividualCustomerResponse>> {
    let newPath = this.apiUrl + "individualcustomer/getlistbysorting?sortBy=" + sortBy
    return this.httpClient.get<ListResponseModel<GetAllIndividualCustomerResponse>>(newPath);
  }

  getIndividualCustomersByPaginationAndSortingNameAsc(pageNo: number, pageSize: number, sortBy: string): Observable<ListResponseModel<GetAllIndividualCustomerResponse>> {
    let newPath = this.apiUrl +
      `individualcustomer/getlistbypaginationandsorting?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    return this.httpClient.get<ListResponseModel<GetAllIndividualCustomerResponse>>(newPath);
  }

  add(individualcustomer: CreateIndividualCustomerRequest): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "individualcustomer/add", individualcustomer);
  }

  delete(individualcustomer: DeleteIndividualCustomerRequest): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "individualcustomer/delete", { body: individualcustomer });
  }

  update(id: number, individualCustomer: UpdateIndividualCustomerRequest): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + "individualcustomer/update?id=" + id, individualCustomer);
  }
}
