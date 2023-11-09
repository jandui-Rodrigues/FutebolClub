import { ILeaderBoard } from './ILeadersBoard';

export interface IRulesClassification {
  checkStatusMatchers(home:number, away: number): void,
  checkGoals(home:number, away: number): void,
  checkEfficiency(): void,
  generateClassification(): void,
  getClassification(): ILeaderBoard,
}
