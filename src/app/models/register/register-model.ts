import { TokenModel } from "../token-model";

export interface RegisterModel extends TokenModel{
    username:string;
    email:string;
    password:string;
}