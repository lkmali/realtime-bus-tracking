// src/route/entities/stop.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Route } from './route.entity';

@Entity()
export class Stop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  order: number;

  @ManyToOne(() => Route, route => route.stops)
  route: Route;
}
