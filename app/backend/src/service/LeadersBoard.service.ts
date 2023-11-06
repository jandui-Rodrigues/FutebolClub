// import { log } from 'console';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { MatcherModel } from '../Interfaces/Matches/MatcherModel';
import SequelizeAdapterMatcher from '../model/MatchesAdpSequelize.module';
import { ILeaderBoard } from '../Interfaces/LeaderBoard/ILeadersBoard';
import LeadersBoard from '../utils/LeaderBoard';
import { IMatcherWithTeams } from '../Interfaces/Matches/IMatcher';

export default class LeadersBoardService {
  constructor(
    private matcherModel: MatcherModel = new SequelizeAdapterMatcher(),
  ) {}

  public async getBoard(params: string): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.matcherModel.findallQuery(false) as IMatcherWithTeams[];

    const leadersBoard = new LeadersBoard(matches, params).leaderBoardResult
      .sort((a, b) => {
        if (a.totalPoints === b.totalPoints) {
          if (a.goalsBalance === b.goalsBalance) {
            if (a.goalsFavor === b.goalsFavor) {
              return a.name.localeCompare(b.name);
            }
            return b.goalsFavor - a.goalsFavor;
          }
          return b.goalsBalance - a.goalsBalance;
        }
        return b.totalPoints - a.totalPoints;
      });
    return { status: 'SUCCESSFUL', data: leadersBoard };
  }
}
