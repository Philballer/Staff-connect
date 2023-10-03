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

export interface IProfile {
  _id?: string;
  username: string;
  email: string;
  bio: string;
  jobTitle: string;
  userID: string;
  createdAt: string | Date;
}

export interface IUserCountry {
  name: { common: string; official: string };
  flag: string; //alt for flag
  flags: { png: string; svg: string; alt: string };
}
