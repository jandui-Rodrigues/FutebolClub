import { Router } from 'express';
import TeamRouter from './Team.routes';
import LoginRouter from './Login.routes';

const router = Router();
const teamRouter = new TeamRouter();
const loginRouter = new LoginRouter();

router.use('/teams', teamRouter.buildRoutes());
router.use('/login', loginRouter.buildRoutes());

export default router;
