import ITeam from './Team/ITeams';
import IUser from './User/IUser';

export type NewEntity<T> = Omit<T, 'id'>;

export type ID = number;

export type Identifiable = { id: ID };

export {
  ITeam,
  IUser,
};
