import { INTEGER, Model, STRING } from 'sequelize';
import db from '../../db/index';

class Profile extends Model {
  declare id: number;
  declare name: string;
  declare token: string;
}

Profile.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: STRING, allowNull: false },
    token: { type: STRING, allowNull: false },
  },
  { sequelize: db },
);

export default Profile;
