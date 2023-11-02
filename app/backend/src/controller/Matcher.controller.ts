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
    try {
      const { status, data } = await this.matcherService.getAll(inProgress);

      res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  }
}
