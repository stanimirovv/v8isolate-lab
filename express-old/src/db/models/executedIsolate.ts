import * as sequelize from 'sequelize';
import { Model } from 'sequelize';
import db from '../index';
import Isolate from './isolate';
import Profile from './profile';

class ExecutedIsolate extends Model {
  declare id: number;
  declare profileId: number;
  declare isolateId: number;
  declare inputString: string;
  declare outputString: string;
}
ExecutedIsolate.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    inputString: { type: sequelize.STRING, allowNull: false },
    outputString: { type: sequelize.STRING, allowNull: false },
  },
  { sequelize: db },
);

ExecutedIsolate.belongsTo(Profile, {
  onDelete: 'CASCADE',
  foreignKey: { name: 'profileId', allowNull: false },
});
ExecutedIsolate.belongsTo(Isolate, {
  onDelete: 'CASCADE',
  foreignKey: { name: 'isolateId', allowNull: false },
});

export default ExecutedIsolate;
