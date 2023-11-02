import { NewEntity } from '../Interfaces';
import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatcher from '../database/models/SequelizeMatches';
import IMatcher, { UpdateMatcher } from '../Interfaces/Matches/IMatcher';
import { MatcherModel } from '../Interfaces/Matches/MatcherModel';

export default class SequelizeAdapterMatcher implements MatcherModel {
  private model = SequelizeMatcher;
  async findallQuery(inProgress: boolean): Promise<IMatcher[]> {
    const matches = await this.model.findAll(
      {
        include: [
          {
            model: SequelizeTeam,
            as: 'homeTeam',
            attributes: ['teamName'],
          },
          { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
        ],
        where: {
          inProgress,
        },
      },

    );
    return matches;
  }

  async findAll(): Promise<IMatcher[]> {
    const matches = await this.model.findAll(
      {
        include: [
          {
            model: SequelizeTeam,
            as: 'homeTeam',
            attributes: ['teamName'],
          },
          { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
        ],
      },

    );
    return matches;
  }

  async findById(id: number): Promise<IMatcher | null> {
    const match = await this.model.findOne({
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: {
        id,
      },
    });
    return match;
  }

  async update(id: number, data: UpdateMatcher): Promise<IMatcher | null> {
    const [affectedRows] = await this.model.update(data, {
      where: {
        id,
      },
    });

    if (affectedRows === 0) return null;
    return this.findById(id);
  }

  create(data: NewEntity<IMatcher>): Promise<IMatcher> {
    const matcher = this.model.create(data);
    return matcher;
  }
}
