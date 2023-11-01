import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeMatcher from './SequelizeMatches';

class SequelizeTeam extends Model<InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

SequelizeTeam.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

SequelizeTeam.belongsToMany(SequelizeMatcher, {
  through: 'matches',
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});
SequelizeTeam.belongsToMany(SequelizeMatcher, {
  through: 'matches',
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

export default SequelizeTeam;
