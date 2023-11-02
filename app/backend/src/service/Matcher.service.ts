import { MatcherModel } from '../Interfaces/Matches/MatcherModel';
import IMatcher, { UpdateTeamsGoals } from '../Interfaces/Matches/IMatcher';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import SequelizeAdapterMatcher from '../model/MatchesAdpSequelize.module';
import TeamModel from '../Interfaces/Team/TeamModel';
import TeamAdapterSequelie from '../model/TeamAdpSequelize.module';

export default class MatcherService {
  constructor(
    private matcherModel: MatcherModel = new SequelizeAdapterMatcher(),
    private teamModel: TeamModel = new TeamAdapterSequelie(),
  ) {

  }

  public async getAll(query: string): Promise<ServiceResponse<IMatcher[]>> {
    if (query) {
      const matches = await this.matcherModel.findallQuery(query === 'true');
      return { status: 'SUCCESSFUL', data: matches };
    }
    const matches = await this.matcherModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishedMatcher(id: IMatcher['id'])
    : Promise<ServiceResponse<{ message: string }>> {
    const matcherFound = await this.matcherModel.findById(id);
    if (!matcherFound) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Matcher ${id} not Found` },
      };
    }
    const matcherUpdated = await this.matcherModel.update(id, { inProgress: false });
    if (!matcherUpdated) {
      return {
        status: 'CONFLICT',
        data: { message: 'There are no updates to perform in Matcher' },
      };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatcher(id: IMatcher['id'], date: UpdateTeamsGoals)
    : Promise<ServiceResponse<{ message: string, matcher: IMatcher }>> {
    const matcherFound = await this.matcherModel.findById(id);
    const [homeTeamGoals, awayTeamGoals] = [date.homeTeamGoals, date.awayTeamGoals];
    if (!matcherFound) {
      return { status: 'NOT_FOUND', data: { message: `Matcher ${id} not Found` } };
    }
    if (homeTeamGoals < matcherFound.homeTeamGoals
       || awayTeamGoals < matcherFound.awayTeamGoals) {
      return { status: 'CONFLICT', data: { message: 'The goals are higher than the original' } };
    }
    const matcherUpdated = await this.matcherModel.update(id, date);
    if (!matcherUpdated) {
      return {
        status: 'CONFLICT',
        data: { message: 'There are no updates to perform in Matcher' },
      };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Matcher Update', matcher: matcherUpdated } };
  }

  public async createMatcher(matcher: IMatcher)
    : Promise<ServiceResponse<IMatcher>> {
    if (matcher.homeTeamId === matcher.awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }
    const teamsFound = await this.teamModel.findTeams(matcher.homeTeamId, matcher.awayTeamId);
    if (teamsFound.length !== 2) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }
    const matcherCreated = await this.matcherModel.create({ ...matcher, inProgress: true });
    return { status: 'CREATED', data: matcherCreated };
  }
}
