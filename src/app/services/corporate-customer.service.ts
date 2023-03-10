import { GetAllCorporateCustomerResponse } from '../models/corporate-customer/get-all-corporate-customer-request';
import { ListResponseModel } from './../models/list-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCorporateCustomerRequest } from '../models/corporate-customer/create-corporate-customer-request';
import { ResponseModel } from '../models/response-model';
import { DeleteCorporateCustomerRequest } from '../models/corporate-customer/delete-corporate-customer-request';

@Injectable({
  providedIn: 'root'
})
export class CorporateCustomerService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient:HttpClient) { }

  getCorporateCustomers():Observable<ListResponseModel<GetAllCorporateCustomerResponse>>{
    let newPath = this.apiUrl + "corporatecustomer/getall"
    return this.httpClient.get<ListResponseModel<GetAllCorporateCustomerResponse>>(newPath);
  }

  getCorporateCustomersBySortingNameAsc():Observable<ListResponseModel<GetAllCorporateCustomerResponse>>{
    let newPath = this.apiUrl + "corporatecustomer/getlistbysorting"
    return this.httpClient.get<ListResponseModel<GetAllCorporateCustomerResponse>>(newPath);
  }

  getCorporateCustomersByPaginationAndSortingNameAsc(pageNo:number):Observable<ListResponseModel<GetAllCorporateCustomerResponse>>{
    let newPath = this.apiUrl + "corporatecustomer/getlistbypaginationandsorting?pageNo=" + pageNo
    return this.httpClient.get<ListResponseModel<GetAllCorporateCustomerResponse>>(newPath);
  }

  add(corporateCustomer:CreateCorporateCustomerRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "corporatecustomer/add", corporateCustomer);
  }
  
  delete(corporateCustomer:DeleteCorporateCustomerRequest):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "corporatecustomer/delete", {body:corporateCustomer});
  }
}
