import { GetAllCategoryResponse } from './get-all-category';
import { ResponseModel } from './../response-model';

export interface CategoryResponseModel extends ResponseModel {
  data: GetAllCategoryResponse[]
}
