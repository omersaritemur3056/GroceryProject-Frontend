import { ResponseModel } from "../response-model";
import { GetAllCorporateCustomerResponse } from "./get-all-corporate-customer";

export interface CorporateCustomerResponseModel extends ResponseModel{
    data: GetAllCorporateCustomerResponse[]
}