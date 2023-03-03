export interface UpdatePaymentRequest{
    cardNumber:string;
    fullName:string;
    cardExpirationYear:number;
    cardExpirationMonth:number;
    cardCvv:number;
    balance:number;
}