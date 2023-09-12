export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  address: string;
  gender: string;
  nationality: string;
  birthday: Date;
  avatar: File | string;
  createdAt?: Date;
}
