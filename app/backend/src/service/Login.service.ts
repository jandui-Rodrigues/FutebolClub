import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { TokenPayload } from '../Interfaces/Login/PayLoad';
import { UserModel } from '../Interfaces/User/UserModel';
import UserAdapterSequelize from '../model/UserAdpSequelize.module';
import jwt from '../utils/jwt';
import Validate from './validations/Login.validation';
import Token from '../Interfaces/Login/Token';

export default class LoginService {
  constructor(
    private _userModel: UserModel = new UserAdapterSequelize(),

  ) {

  }

  public async login(email: string, password:string): Promise<ServiceResponse<Token>> {
    const invalidaEmailOrPassword = 'Invalid email or password';
    const validate = new Validate(email, password);
    const error = validate.buildValidates();
    if (error) return error;

    const user = await this._userModel.findByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: invalidaEmailOrPassword } };
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 'UNAUTHORIZED', data: { message: invalidaEmailOrPassword } };
    }
    const payload: TokenPayload = { id: user.id, username: user.username };

    const token = jwt.sign(payload);

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
