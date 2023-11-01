import { Router } from 'express';
import TeamController from '../controller/Team.controller';

export default class ClassTeamRouter {
  private router: Router;

  private teamController = new TeamController();

  constructor() {
    this.router = Router();
    this.buildRoutes();
  }

  buildRoutes() {
    this.router.get('/', (req, res) => this.teamController.getAll(req, res));
    this.router.get('/:id', (req, res) => this.teamController.getById(req, res));
    return this.router;
  }
}
