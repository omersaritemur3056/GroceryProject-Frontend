export interface GetAllEmployeeResponse {
  id: number;
  userId: number;
  imageUrl: string;
  firstName: string;
  lastName: string;
  gender: string
  nationalIdentity: string
  nationality: string
  birthYear: Date
  salary: number // double
}