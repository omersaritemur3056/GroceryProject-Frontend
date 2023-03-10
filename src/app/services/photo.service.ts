import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllImageResponse } from '../models/image/get-all-image-response';
import { ListResponseModel } from '../models/list-response-model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient:HttpClient) { }

  getPhotos():Observable<ListResponseModel<GetAllImageResponse>>{
    let newPath = this.apiUrl + "image/getall"
    return this.httpClient.get<ListResponseModel<GetAllImageResponse>>(newPath);
  }

  getPhotosBySortingNameAsc():Observable<ListResponseModel<GetAllImageResponse>>{
    let newPath = this.apiUrl + "image/getlistbysorting"
    return this.httpClient.get<ListResponseModel<GetAllImageResponse>>(newPath);
  }

  getPhotosByPaginationAndSortingNameAsc(pageNo:number):Observable<ListResponseModel<GetAllImageResponse>>{
    let newPath = this.apiUrl + "image/getlistbypaginationandsorting?pageNo=" + pageNo
    return this.httpClient.get<ListResponseModel<GetAllImageResponse>>(newPath);
  }
}
