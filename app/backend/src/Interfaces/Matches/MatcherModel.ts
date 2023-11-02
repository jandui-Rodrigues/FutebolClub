import { NewEntity } from '..';
import IMatcher, { UpdateMatcher } from './IMatcher';

export type MatcherModel = {
  findAll(): Promise<IMatcher[]>;
  findallQuery(query: boolean): Promise<IMatcher[]>;
  findById(id: number): Promise<IMatcher | null>;
  update(id: number, data: UpdateMatcher): Promise<IMatcher | null>;
  create(data: NewEntity<IMatcher>): Promise<IMatcher>;
};
