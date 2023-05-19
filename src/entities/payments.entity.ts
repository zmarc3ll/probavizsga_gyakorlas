/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Members from './member.entity';

@Entity()
export default class Payments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  paid_at: string;

  @ManyToOne(() => Members, (member_) => member_.payments)
  member_: Members;
}
