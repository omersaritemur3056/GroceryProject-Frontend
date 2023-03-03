export interface GetByIdOrderResponse{
    id:number;
    createdDate:Date;
    deliveredDate:Date;
    orderStatus:string;
    paymentId:number;
    customerId:number;
    productIds:Number[];
}