import { Router } from 'express';
import TeamRouter from './Team.routes';
import LoginRouter from './Login.routes';
import MatcherRouter from './Matcher.routes';
import LeadersBoardRouter from './LeadersBoard.routes';

const router = Router();
const teamRouter = new TeamRouter();
const loginRouter = new LoginRouter();
const matcherRouter = new MatcherRouter();
const leardersBoadRouter = new LeadersBoardRouter();

router.use('/teams', teamRouter.buildRoutes());
router.use('/login', loginRouter.buildRoutes());
router.use('/matches', matcherRouter.buildRoutes());
router.use('/leaderboard', leardersBoadRouter.buildRoutes());

export default router;
