import IUser from './IUser';

export type UserModel = {
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: IUser['id']): Promise<IUser | null>;
};
