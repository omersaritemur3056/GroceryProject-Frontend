export interface CreatePaymentRequest{
    cardNumber:string;
    fullName:string;
    cardExpirationYear:number;
    cardExpirationMonth:number;
    cardCvv:number;
    balance:number;
}