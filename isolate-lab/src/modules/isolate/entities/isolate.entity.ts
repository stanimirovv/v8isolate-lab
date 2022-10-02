import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ExecutedIsolate } from './executedIsolate.entity';

console.log(__filename, 'asd');
@Entity()
export class Isolate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  source: string;

  @ManyToOne(() => User, (user) => user.isolates)
  user: User;

  executions: ExecutedIsolate[];
}
