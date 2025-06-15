// src/route/entities/route.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Stop } from './stop.entity';

@Entity()
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Stop, stop => stop.route, { cascade: true })
  stops: Stop[];
}
