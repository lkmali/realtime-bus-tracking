import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column({ default: 2 })
  wheelchairCapacity: number;

  @Column({ default: true })
  isActive: boolean;
}