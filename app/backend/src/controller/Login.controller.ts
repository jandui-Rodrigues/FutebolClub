import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LoginService from '../service/Login.service';

export default class LoginController {
  constructor(

    private loginService = new LoginService(),
  ) {}

  async login(req: Request, res: Response) :Promise<Response> {
    const { email, password } = req.body;
    const { status, data } = await this.loginService.login(email, password);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
