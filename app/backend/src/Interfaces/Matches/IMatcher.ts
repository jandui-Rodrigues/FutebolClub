type IMatcher = {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number
  awayTeamGoals: number
  inProgress: boolean,
};

type IMatcherWithTeams = {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number
  awayTeamGoals: number
  inProgress: boolean,
  homeTeam: {
    teamName: string,
  },
  awayTeam: {
    teamName: string,
  }
};

type UpdateTeamsGoals = {
  homeTeamGoals: number,
  awayTeamGoals: number
};
type UpdateFinish = {
  inProgress: boolean
};
type UpdateMatcher = UpdateTeamsGoals | UpdateFinish;

export default IMatcher;

export {
  UpdateMatcher,
  UpdateTeamsGoals,
  UpdateFinish,
  IMatcherWithTeams,
};
