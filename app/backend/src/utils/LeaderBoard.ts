import { IMatcherWithTeams } from '../Interfaces/Matches/IMatcher';
import { ILeaderBoard, TeamsMatch } from '../Interfaces/LeaderBoard/ILeadersBoard';
import ClassificationRules from './ClassificationRules';

export default class LeadersBoard {
  private _leaders: ILeaderBoard[] = [];
  constructor(
    private matches: IMatcherWithTeams[],
    private params: string,
  ) {
  }

  private teamsMatchersFinally(): TeamsMatch {
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

  private leaderBoard() {
    const teamsMatch = this.teamsMatchersFinally();
    Object.keys(teamsMatch).forEach((team) => {
      const rules = new ClassificationRules(team, teamsMatch[team]);
      this._leaders.push(rules.getClassification());
    });
  }

  get leaderBoardResult(): ILeaderBoard[] {
    this.leaderBoard();
    return this._leaders;
  }
}
