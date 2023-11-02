type IMatcher = {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number
  awayTeamGoals: number
  inProgress: boolean
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
};
