import { GetAllCorporateCustomerResponse } from './../models/corporate-customer/get-all-corporate-customer';
import { ListResponseModel } from './../models/list-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  
}
