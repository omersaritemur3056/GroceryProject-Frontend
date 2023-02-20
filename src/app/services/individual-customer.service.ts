import { GetAllIndividualCustomerResponse } from './../models/individual-customer/get-all-individual-customer';
import { ListResponseModel } from './../models/list-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndividualCustomerService {

  apiUrl = "http://localhost:8080/api/individualcustomer/getall";

  constructor(private httpClient:HttpClient) { }

  getCorporateCustomer():Observable<ListResponseModel<GetAllIndividualCustomerResponse>>{
    return this.httpClient.get<ListResponseModel<GetAllIndividualCustomerResponse>>(this.apiUrl);
  }
}
