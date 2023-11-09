import { TeamsMatch } from '../Interfaces/LeaderBoard/ILeadersBoard';
import { IMatcherWithTeams } from '../Interfaces/Matches/IMatcher';

export default class IsolationTeamMatches {
  constructor(
    private matches: IMatcherWithTeams[],
    private params: string,
  ) {
  }

  isolatesMatchesHomeOrAway(): TeamsMatch {
    const teamsMatch: TeamsMatch = {};
    this.matches.forEach((match) => {
      const teamName = this.params === 'home' ? match.homeTeam.teamName : match.awayTeam.teamName;
      if (!teamsMatch[teamName]) teamsMatch[teamName] = [];

      teamsMatch[teamName].push({
        awayTeamGoals: match.awayTeamGoals,
        homeTeamGoals: match.homeTeamGoals,
      });
    });
    return teamsMatch;
  }

  isolateMatchesByTeam(): TeamsMatch {
    const teamsMatch: TeamsMatch = {};
    this.matches.forEach((match) => {
      const homeName = match.homeTeam.teamName;
      const awayName = match.awayTeam.teamName;
      if (!teamsMatch[homeName]) teamsMatch[homeName] = [];
      if (!teamsMatch[awayName]) teamsMatch[awayName] = [];
      teamsMatch[homeName].push({
        homeTeamGoals: match.homeTeamGoals,
        awayTeamGoals: match.awayTeamGoals,
      });
      teamsMatch[awayName].push({
        homeTeamGoals: match.awayTeamGoals,
        awayTeamGoals: match.homeTeamGoals,
      });
    });
    return teamsMatch;
  }
}
