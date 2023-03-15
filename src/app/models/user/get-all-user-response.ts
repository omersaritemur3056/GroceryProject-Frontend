export interface GetAllUserResponse{
    id:number;
    username:string;
    password:string;
    email:string;
    roles:string[];
    createdDate:Date;
    updatedDate:Date;
    active:boolean;
}