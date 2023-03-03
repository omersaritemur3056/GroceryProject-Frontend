export interface GetByIdPaymentResponse{
    id:number;
    cardNumber:string;
    fullName:string;
    cardExpirationYear:number;
    cardExpirationMonth:number;
    cardCvv:number;
    balance:number;
}