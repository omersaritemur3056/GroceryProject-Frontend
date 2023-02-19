import { ResponseModel } from './../response-model';
import { GetAllEmployeeResponse } from './get-all-employee';

export interface EmployeeResponseModel extends ResponseModel{
    data: GetAllEmployeeResponse[]
}