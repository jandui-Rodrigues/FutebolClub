import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeadersBoardService from '../service/LeadersBoard.service';

export default class LeadersBoardController {
  constructor(
    private leaderBoardService = new LeadersBoardService(),
  ) {

  }

  async getBoard(req: Request, res: Response) {
    try {
      const { home } = req.params;
      const { status, data } = await this.leaderBoardService.getBoard(home);
      res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}
