import { IUser } from '../Interfaces';
import { UserModel } from '../Interfaces/User/UserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserAdapterSequelize implements UserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { id } });
    return user;
  }
}
