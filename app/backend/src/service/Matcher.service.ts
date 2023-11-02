import { MatcherModel } from '../Interfaces/Matches/MatcherModel';
import IMatcher from '../Interfaces/Matches/IMatcher';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import SequelizeAdapterMatcher from '../model/MatchesAdpSequelize.module';

export default class MatcherService {
  constructor(
    private matcherModel: MatcherModel = new SequelizeAdapterMatcher(),
  ) {

  }

  public async getAll(query: string): Promise<ServiceResponse<IMatcher[]>> {
    if (query === 'true') {
      const matches = await this.matcherModel.findallQuery(query);
      return { status: 'SUCCESSFUL', data: matches };
    }
    const matches = await this.matcherModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }
}
