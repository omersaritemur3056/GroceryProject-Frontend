export interface GetByIdEmployeeResponse {
    id: number;
    userId: number;
    imageId: number;
    firstName: string;
    lastName: string;
    gender: string
    nationalIdentity: string
    nationality: string
    birthYear: Date
    salary: number // double
  }