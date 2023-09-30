export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
  nationality: string;
  birthday: Date;
  avatar: File | string;
  createdAt?: Date;
  profile: IProfile;
}

interface IProfile {
  _id?: string;
  username: string;
  email: string;
  bio: string;
  jobTitle: string;
}
