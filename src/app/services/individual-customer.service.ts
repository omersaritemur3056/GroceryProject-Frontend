import { GetAllIndividualCustomerResponse } from './../models/individual-customer/get-all-individual-customer';
import { ListResponseModel } from './../models/list-response-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndividualCustomerService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient:HttpClient) { }

  getIndividualCustomers():Observable<ListResponseModel<GetAllIndividualCustomerResponse>>{
    let newPath = this.apiUrl + "individualcustomer/getall"
    return this.httpClient.get<ListResponseModel<GetAllIndividualCustomerResponse>>(newPath);
  }
}
