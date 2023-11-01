import IMatcher from './IMatcher';

export type MatcherModel = {
  findAll(email: string): Promise<IMatcher[]>;
};
