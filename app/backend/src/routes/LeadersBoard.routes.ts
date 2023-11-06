import { Router } from 'express';
// import AuthValidation from '../middlewares/AuthToken';
import LeadersBoardController from '../controller/LeadersBoard.controller';

export default class LeadersBoardRouter {
  private router: Router;

  private leadersBoardController = new LeadersBoardController();

  constructor() {
    this.router = Router();
  }

  buildRoutes() {
    this.router.get('/:home', (req, res) => this.leadersBoardController.getBoard(req, res));
    return this.router;
  }
}
