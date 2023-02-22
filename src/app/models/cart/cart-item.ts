import { GetAllProductResponse } from 'src/app/models/product/get-all-product-response';

// ileride burası order olacak...
export class CartItem{
    product:GetAllProductResponse;
    quantity:number;
}