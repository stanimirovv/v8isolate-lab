import { Sequelize } from 'sequelize';

const db = new Sequelize('sqlite::memory:');
export default db;

export const teardownDb = async () => {
  await db.drop();
};

export const initializeDb = async () => {
  await db.sync();
};
