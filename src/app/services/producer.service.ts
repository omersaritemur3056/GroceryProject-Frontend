import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/list-response-model';
import { CreateProducerRequest } from '../models/producer/create-producer-request';
import { DeleteProducerRequest } from '../models/producer/delete-producer-request';
import { GetAllProducerResponse } from '../models/producer/get-all-producer-response';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient:HttpClient) { }

  getProducers():Observable<ListResponseModel<GetAllProducerResponse>>{
    let newPath = this.apiUrl + "producer/getall"
    return this.httpClient.get<ListResponseModel<GetAllProducerResponse>>(newPath);
  }

  getProducersBySortingNameAsc():Observable<ListResponseModel<GetAllProducerResponse>>{
    let newPath = this.apiUrl + "producer/getlistbysorting"
    return this.httpClient.get<ListResponseModel<GetAllProducerResponse>>(newPath);
  }

  getProducersByPaginationAndSortingNameAsc(pageNo:number):Observable<ListResponseModel<GetAllProducerResponse>>{
    let newPath = this.apiUrl + "producer/getlistbypaginationandsorting?pageNo=" + pageNo
    return this.httpClient.get<ListResponseModel<GetAllProducerResponse>>(newPath);
  }

  add(producer:CreateProducerRequest):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "producer/add", producer);
  }

  delete(producer:DeleteProducerRequest):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl + "producer/delete", {body:producer});
  }
}
