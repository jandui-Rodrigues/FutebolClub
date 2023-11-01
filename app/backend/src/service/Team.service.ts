import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces';
import TeamModel from '../Interfaces/Team/TeamModel';
import TeamAdapterSequelie from '../model/TeamAdpSequelize.module';

export default class TeamService {
  constructor(
    private teamModel: TeamModel = new TeamAdapterSequelie(),
  ) {
  }

  public async getAll(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    return {
      status: 'SUCCESSFUL',
      data: teams,
    };
  }

  public async getById(id: ITeam['id']): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Team ${id} not Found` },
      };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}
