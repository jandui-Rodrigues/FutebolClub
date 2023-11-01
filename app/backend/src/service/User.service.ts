import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUser } from '../Interfaces';
import UserAdapterSequelize from '../model/UserAdpSequelize.module';
import { UserModel } from '../Interfaces/User/UserModel';

export default class UserService {
  constructor(
    private _userModel: UserModel = new UserAdapterSequelize(),
  ) {
  }

  public async getByRole(id: IUser['id']): Promise<ServiceResponse<string>> {
    const user = await this._userModel.findById(id);
    if (!user) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Team ${id} not Found` },
      };
    }
    return { status: 'SUCCESSFUL', data: user.role };
  }
}
