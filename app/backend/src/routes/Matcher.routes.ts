import { Router } from 'express';
import MatcherController from '../controller/Matcher.controller';

export default class MatcherRouter {
  private router: Router;

  private matcherController = new MatcherController();

  constructor() {
    this.router = Router();
  }

  buildRoutes() {
    this.router.get('/', (req, res) => this.matcherController.getAll(req, res));
    return this.router;
  }
}
