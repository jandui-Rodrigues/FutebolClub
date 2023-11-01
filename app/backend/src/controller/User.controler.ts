import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../service/User.service';

export default class UserController {
  constructor(

    private _userService = new UserService(),
  ) {}

  async getRole(req: Request, res: Response) :Promise<Response> {
    const { user } = res.locals;
    const { status, data } = await this._userService.getByRole(user.id);
    return res.status(mapStatusHTTP(status)).json({ role: data });
  }
}
