import { Router } from 'express';
import AuthValidation from '../middlewares/AuthToken';
import MatcherController from '../controller/Matcher.controller';

export default class MatcherRouter {
  private router: Router;

  private matcherController = new MatcherController();

  constructor() {
    this.router = Router();
  }

  buildRoutes() {
    this.router.get('/', (req, res) => this.matcherController.getAll(req, res));
    this.router.patch(
      '/:id/finish',
      AuthValidation.validate,
      (req, res) => this.matcherController.finishedMatcher(req, res),
    );
    this.router.patch(
      '/:id',
      AuthValidation.validate,
      (req, res) => this.matcherController.updateMatcher(req, res),
    );
    this.router.post(
      '/',
      AuthValidation.validate,
      (req, res) => this.matcherController.createMatcher(req, res),
    );
    return this.router;
  }
}
