import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces';
import TeamModel from '../Interfaces/Team/TeamModel';

export default class TeamAdapterSequelie implements TeamModel {
  private model = SequelizeTeam;
  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    if (team == null) return team;

    return team;
  }

  async findTeams(teamId1: number, teamId2: number) {
    const teams = await this.model.findAll({
      where: {
        id: [teamId1, teamId2],
      },
    });
    return teams;
  }
}
