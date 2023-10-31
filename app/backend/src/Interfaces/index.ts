import ITeam from './Team/ITeams';

export type NewEntity<T> = Omit<T, 'id'>;

export type ID = number;

export type Identifiable = { id: ID };

export {
  ITeam,
};
