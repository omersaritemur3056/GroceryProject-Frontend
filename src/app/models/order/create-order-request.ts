export interface CreateOrderRequest{
    createdDate:Date;
    deliveredDate:Date;
    orderStatus:string;
    paymentId:number;
    customerId:number;
    productIds:Number[];
}