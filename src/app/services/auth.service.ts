import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponseModel } from '../models/data-response-model';
import { LoginModel } from '../models/login/login-model';
import { TokenModel } from '../models/token-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://localhost:8080/api/";

  constructor(private httpClient:HttpClient) { }

  register(){
    let newPath = this.apiUrl + "user/signup"

  }

  login(user:LoginModel){
    let newPath = this.apiUrl + "user/signin"
    return this.httpClient.post<DataResponseModel<LoginModel>>(newPath, user);
  }

  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }else{
      return false;
    }
  }
}
