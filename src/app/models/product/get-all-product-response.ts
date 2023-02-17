export interface GetAllProductResponse{
  id:number;
  name:string;
  price:any; //double veri tipi bulunacak...
  description:string;
  productionDate:Date;
  expirationDate:Date;
  stock:number;
  categoryId:number;
  supplierId:number;
  producerId:number;
  imageIds:number[];
}
