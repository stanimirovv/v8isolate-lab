import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Isolate } from '../../isolate/entities/isolate.entity';

console.log(__filename, 'asd');
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  key: string;

  isolates: Isolate[];
}
