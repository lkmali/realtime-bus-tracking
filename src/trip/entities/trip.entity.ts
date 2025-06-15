import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Bus } from '../../bus/entities/bus.entity';
import { Route } from '../../route/entities/route.entity';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bus)
  bus: Bus;

  @ManyToOne(() => Route)
  route: Route;

  @Column()
  startTime: Date;

  @Column({ default: 2 })
  availableWheelchairSlots: number;
}
