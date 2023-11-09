import { IRulesClassification } from '../Interfaces/LeaderBoard/IRules';
import { GoalsTeams, ILeaderBoard } from '../Interfaces/LeaderBoard/ILeadersBoard';

export default class RulesAway implements IRulesClassification {
  private totalPoints = 0;
  private totalGames = 0;
  private totalVictories = 0;
  private totalDraws = 0;
  private totalLosses = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;
  private goalsBalance = 0;
  private efficiency = 0;
  constructor(
    private name: string,
    private matchesGoalsTeam: GoalsTeams[],
  ) {
  }

  checkStatusMatchers(home:number, away: number): void {
    if (home < away) {
      this.totalVictories += 1;
      this.totalPoints += 3;
      return;
    }
    if (away === home) {
      this.totalDraws += 1;
      this.totalPoints += 1;
      return;
    }
    this.totalLosses += 1;
  }

  checkGoals(home:number, away: number): void {
    this.goalsFavor += away;
    this.goalsOwn += home;
  }

  checkEfficiency(): void {
    this.efficiency += Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }

  generateClassification(): void {
    this.matchesGoalsTeam.forEach((match) => {
      this.totalGames += 1;
      this.checkStatusMatchers(match.homeTeamGoals, match.awayTeamGoals);
      this.checkGoals(match.homeTeamGoals, match.awayTeamGoals);
    });
    this.goalsBalance += this.goalsFavor - this.goalsOwn;
    this.checkEfficiency();
  }

  getClassification(): ILeaderBoard {
    this.generateClassification();
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }
}
