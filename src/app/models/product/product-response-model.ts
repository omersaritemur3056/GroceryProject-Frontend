import { ResponseModel } from './../response-model';
import { GetAllProductResponse } from './get-all-product-response';

export interface ProductResponseModel extends ResponseModel {
  data: GetAllProductResponse[]
}
