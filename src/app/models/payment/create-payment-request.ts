export interface CreatePaymentRequest{
    cardNumber:string;
    fullName:string;
    cardExpirationYear:number;
    cardExpirationMonth:number;
    cardCvv:string;
    balance:number;
}