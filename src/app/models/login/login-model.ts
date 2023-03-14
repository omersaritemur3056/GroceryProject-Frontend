import { TokenModel } from "../token-model";

export interface LoginModel extends TokenModel{
    username:string;
    password:string;
}