import { ServiceResponseError } from '../../Interfaces/ServiceResponse';

export default class Validate {
  constructor(
    private _email: string,
    private _password: string,
  ) {

  }

  validateFieldsLogin(): ServiceResponseError | undefined {
    const receviedFiels = { email: this._email, password: this._password };
    const requeridFields = ['email', 'password'];
    const notFoundKey = requeridFields.find((key) => !(key in receviedFiels));
    if (notFoundKey || receviedFiels.email === '' || receviedFiels.password === '') {
      return { status: 'INVALID_DATA', data: { message: 'All fields must be filled' } };
    }
  }

  validateEmailAndPassword(): ServiceResponseError | undefined {
    // Emails com formato inválido: @exemplo.com, exemplo@exemplo, exemplo@.com, exemplo.exemplo.com
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(this._email) || this._password.length < 6) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
  }

  buildValidates() {
    if (this.validateFieldsLogin()) return this.validateFieldsLogin();
    if (this.validateEmailAndPassword()) return this.validateEmailAndPassword();
  }
}
