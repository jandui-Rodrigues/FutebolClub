import { Router } from 'express';
import TeamRouter from './Team.routes';

const router = Router();
const teamRouter = new TeamRouter();

router.use('/teams', teamRouter.buildRoutes());

export default router;
