import IMatcher from './IMatcher';

export type MatcherModel = {
  findAll(): Promise<IMatcher[]>;
  findallQuery(query: string): Promise<IMatcher[]>;
};
