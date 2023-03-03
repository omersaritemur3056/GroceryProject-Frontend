export interface CreateProductRequest {
    name: string;
    price: any; //double veri tipi bulunacak...
    description: string;
    productionDate: Date;
    expirationDate: Date;
    stock: number;
    categoryId: number;
    supplierId: number;
    producerId: number;
    imageUrls: string[]; // burası null gidiyor...
}