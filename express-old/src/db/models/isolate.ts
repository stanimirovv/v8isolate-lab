import * as sequelize from 'sequelize';
import { Model } from 'sequelize';
import db from '../index';
import Profile from './profile';

export class IsolateModel extends Model {
  declare id: number;
  declare profileId: number;
  declare name: string;
  declare description: string;
  declare source: string;
}
IsolateModel.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: sequelize.STRING, allowNull: false },
    description: { type: sequelize.STRING, allowNull: false },
    source: { type: sequelize.STRING, allowNull: false },
  },
  { sequelize: db },
);
IsolateModel.belongsTo(Profile, {
  onDelete: 'CASCADE',
  foreignKey: { name: 'profileId', allowNull: false },
});

export default IsolateModel;
