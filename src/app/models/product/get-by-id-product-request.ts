export interface GetByIdProductResponse{
    id:number;
    name:string;
    price:any; //double veri tipi bulunacak...
    categoryId:number;
    supplierId:number;
    producerId:number;
    imageIds:number[];
  }