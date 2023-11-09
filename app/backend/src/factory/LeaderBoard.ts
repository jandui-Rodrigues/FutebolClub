import { IMatcherWithTeams } from '../Interfaces/Matches/IMatcher';
import { GoalsTeams, ILeaderBoard } from '../Interfaces/LeaderBoard/ILeadersBoard';
import { IRulesClassification } from '../Interfaces/LeaderBoard/IRules';
import IsolationTeamMatches from './IsolationMatcherTeam.factory';
import RulesHome from './RuleHome.factory';
import RulesAll from './RuleAll.factory';
import RulesAway from './RuleAway.factory';

export interface IRuleMatchs {
  [key: string]: (team: string, matches: GoalsTeams[]) => IRulesClassification;
}

const rules: IRuleMatchs = {
  home: (team: string, matches: GoalsTeams[]) => new RulesHome(team, matches),
  All: (team: string, matches: GoalsTeams[]) => new RulesAll(team, matches),
  away: (team: string, matches: GoalsTeams[]) => new RulesAway(team, matches),
};

export default class LeadersBoard {
  private _leaders: ILeaderBoard[] = [];
  private isolation;
  constructor(
    private matches: IMatcherWithTeams[],
    private params: string,
    isolation?: IsolationTeamMatches,
  ) {
    this.isolation = isolation || new IsolationTeamMatches(this.matches, this.params);
  }

  private createBoard() {
    const classification = !this.params ? 'All' : this.params;
    const teamsMatch = !this.params
      ? this.isolation.isolateMatchesByTeam()
      : this.isolation.isolatesMatchesHomeOrAway();
    Object.keys(teamsMatch).forEach((team) => {
      const rule = rules[classification](team, teamsMatch[team]);
      this._leaders.push(rule.getClassification());
    });
  }

  get leaderBoardResult(): ILeaderBoard[] {
    this.createBoard();
    return this._leaders.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.goalsBalance === b.goalsBalance) {
          if (a.goalsFavor === b.goalsFavor) {
            return a.name.localeCompare(b.name);
          }
          return b.goalsFavor - a.goalsFavor;
        }
        return b.goalsBalance - a.goalsBalance;
      }
      return b.totalPoints - a.totalPoints;
    });
  }
}
