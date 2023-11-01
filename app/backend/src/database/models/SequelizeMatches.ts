import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class SequelizeMatcher extends Model<InferAttributes<SequelizeMatcher>,
InferCreationAttributes<SequelizeMatcher>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatcher.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    field: 'away_team_goals',
  },
  awayTeamId: {
    type: DataTypes.NUMBER,
    field: 'away_team_id',
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    field: 'home_team_goals',
  },
  homeTeamId: {
    type: DataTypes.NUMBER,
    field: 'home_team_id',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatcher.hasOne(SequelizeMatcher, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

SequelizeMatcher.hasOne(SequelizeMatcher, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default SequelizeMatcher;
