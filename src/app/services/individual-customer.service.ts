import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndividualCustomerResponseModel } from '../models/individual-customer/individual-customer-response-model';

@Injectable({
  providedIn: 'root'
})
export class IndividualCustomerService {

  apiUrl = "http://localhost:8080/api/individualcustomer/getall";

  constructor(private httpClient:HttpClient) { }

  getCorporateCustomer():Observable<IndividualCustomerResponseModel>{
    return this.httpClient.get<IndividualCustomerResponseModel>(this.apiUrl);
  }
}
