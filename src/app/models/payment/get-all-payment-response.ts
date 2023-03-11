export interface GetAllPaymentResponse{
    id:number;
    cardNumber:string;
    fullName:string;
    cardExpirationYear:number;
    cardExpirationMonth:number;
    cardCvv:string;
    balance:number;
}