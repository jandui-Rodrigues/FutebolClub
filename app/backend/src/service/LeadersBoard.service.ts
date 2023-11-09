// import { log } from 'console';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { MatcherModel } from '../Interfaces/Matches/MatcherModel';
import SequelizeAdapterMatcher from '../model/MatchesAdpSequelize.module';
import { ILeaderBoard } from '../Interfaces/LeaderBoard/ILeadersBoard';
import LeadersBoard from '../factory/LeaderBoard';
import { IMatcherWithTeams } from '../Interfaces/Matches/IMatcher';

export default class LeadersBoardService {
  constructor(
    private matcherModel: MatcherModel = new SequelizeAdapterMatcher(),
  ) {}

  public async getBoard(params: string): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.matcherModel.findallQuery(false) as IMatcherWithTeams[];

    const leadersBoard = new LeadersBoard(matches, params).leaderBoardResult;

    return { status: 'SUCCESSFUL', data: leadersBoard };
  }
}
