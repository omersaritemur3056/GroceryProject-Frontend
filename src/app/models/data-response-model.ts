import { ResponseModel } from './response-model';

export interface DataResponseModel<T> extends ResponseModel{
    data:T;
}