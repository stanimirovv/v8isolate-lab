import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory',
  synchronize: false,
};

export default dbConfig;
