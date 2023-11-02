import { Router } from 'express';
import UserController from '../controller/User.controler';
import LoginController from '../controller/Login.controller';
import AuthValidation from '../middlewares/AuthToken';

export default class ClassLoginRouter {
  private router: Router;

  private teamController = new LoginController();
  private userController = new UserController();

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  buildRoutes() {
    this.router.post('/', (req, res) => this.teamController.login(req, res));
    this.router.get(
      '/role',
      AuthValidation.validate,
      (req, res) => this.userController.getRole(req, res),
    );
    return this.router;
  }
}
