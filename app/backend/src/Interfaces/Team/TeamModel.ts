import ITeam from './ITeams';
import { ICRUDModelReader } from '../ICRUDModel';

type TeamModel = ICRUDModelReader<ITeam> & {
  findTeams(teamId1: number, teamId2: number): Promise<ITeam[]>;
};

export default TeamModel;
