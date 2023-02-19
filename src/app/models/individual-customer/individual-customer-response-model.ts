import { ResponseModel } from "../response-model";
import { GetAllIndividualCustomerResponse } from "./get-all-individual-customer";

export interface IndividualCustomerResponseModel extends ResponseModel{
    data: GetAllIndividualCustomerResponse[]
}