/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Payments from './payments.entity';
import { Exclude } from 'class-transformer';
import { Contains, IsDate, IsDefined, IsOptional } from 'class-validator';

@Entity()
export default class Members {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDefined()
  name: string;

  @Column()
  @IsOptional()
  @Contains('M'||'F')
  gender: string;

  @Column()
  @IsDate()
  @IsDefined()
  birth_date: string; //Date format YYYY-MM-DD;

  @Column()
  @Exclude()
  banned: boolean;

  @Column()
  created_at: string; //Date long format

  @OneToMany(() => Payments, (payment) => payment.member_)
  payments: Payments[]
}
