import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory',
  dropSchema: true,
  synchronize: true,
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
};

export default dbConfig;
