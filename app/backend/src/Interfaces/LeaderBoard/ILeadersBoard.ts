export type ILeaderBoard = {
  name: string,
  'totalPoints': number,
  'totalGames': number,
  'totalVictories': number,
  'totalDraws': number,
  'totalLosses': number,
  'goalsFavor': number,
  'goalsOwn': number,
  'goalsBalance': number,
  'efficiency' : number,
};

export type GoalsTeams = {
  awayTeamGoals: number,
  homeTeamGoals: number,
};

export type TeamsMatch = { [teamName: string]: GoalsTeams[] };
