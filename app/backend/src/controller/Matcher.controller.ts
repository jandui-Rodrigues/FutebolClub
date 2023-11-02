import { Request, Response } from 'express';
import MatcherService from '../service/Matcher.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatcherController {
  constructor(
    private matcherService = new MatcherService(),
  ) {

  }

  async getAll(req: Request, res: Response) {
    const inProgress = req.query.inProgress as string;
    const { status, data } = await this.matcherService.getAll(inProgress);

    res.status(mapStatusHTTP(status)).json(data);
  }

  async finishedMatcher(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.matcherService.finishedMatcher(Number(id));

    res.status(mapStatusHTTP(status)).json(data);
  }

  async updateMatcher(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { status, data } = await this
      .matcherService.updateMatcher(Number(id), { homeTeamGoals, awayTeamGoals });

    res.status(mapStatusHTTP(status)).json(data);
  }

  async createMatcher(req: Request, res: Response) {
    const matcher = req.body;

    const { status, data } = await this.matcherService.createMatcher(matcher);

    res.status(mapStatusHTTP(status)).json(data);
  }
}
