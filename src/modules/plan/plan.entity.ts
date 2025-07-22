import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Subscription } from '../subscription/subscription.entity';
import { BaseEntity } from 'src/common/entities/Base.entity';

@Entity('plans')
export class Plan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: ['monthly', 'yearly'],
  })
  billingCycle: 'monthly' | 'yearly';

  @OneToMany(() => Subscription, (sub) => sub.plan)
  subscriptions: Subscription[];
}
