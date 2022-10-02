import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Isolate } from './isolate.entity';

@Entity()
export class ExecutedIsolate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  source: string;

  @ManyToOne(() => Isolate, (isolate) => isolate.executions)
  isolate: Isolate;
}
