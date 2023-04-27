export interface GetByIdProductResponse{
  id:number;
  name:string;
  price:any; //double veri tipi bulunacak...
  description:string;
  productionDate:Date;
  expirationDate:Date;
  stock:number;
  categoryId:number;
  categoryName:string;
  supplierId:number;
  supplierName:string;
  producerId:number;
  producerName:string;
  imageIds:number[];
  urls:string[];
  }