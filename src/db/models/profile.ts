import { INTEGER, Model, STRING } from 'sequelize';
import db from '../../db/index';

class Profile extends Model {
  declare id: number;
  declare name: string;
  declare key: string;
}

Profile.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: STRING, allowNull: false },
    key: { type: STRING, allowNull: false },
  },
  { sequelize: db },
);

export default Profile;
