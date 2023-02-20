import { GetAllCorporateCustomerResponse } from './../models/corporate-customer/get-all-corporate-customer';
import { ListResponseModel } from './../models/list-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorporateCustomerService {

  apiUrl = "http://localhost:8080/api/corporatecustomer/getall";

  constructor(private httpClient:HttpClient) { }

  getCorporateCustomer():Observable<ListResponseModel<GetAllCorporateCustomerResponse>>{
    return this.httpClient.get<ListResponseModel<GetAllCorporateCustomerResponse>>(this.apiUrl);
  }
  
}
