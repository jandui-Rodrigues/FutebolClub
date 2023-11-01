import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatcher from '../database/models/SequelizeMatches';
import IMatcher from '../Interfaces/Matches/IMatcher';
import { MatcherModel } from '../Interfaces/Matches/MatcherModel';

export default class SequelizeAdapterMatcher implements MatcherModel {
  private model = SequelizeMatcher;
  async findAll(): Promise<IMatcher[]> {
    const matches = await this.model.findAll(
      { include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ] },

    );
    return matches;
  }
}
