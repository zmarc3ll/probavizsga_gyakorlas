/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import Payments from './entities/payments.entity';
import Members from './entities/member.entity';

const now = new Date();
function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}
  
  @Post('seed/:id')
  @HttpCode(201)
  async exampleDatasSeed(@Body() payments: Payments, @Param('id') memberId: number){
    const paymentsRepo = this.dataSource.getRepository(Payments);
    payments.id = undefined;
    const payment = new Payments();
    payment.amount = payments.amount;
    payment.paid_at = payments.paid_at;
    const memberRepo = this.dataSource.getRepository(Members);
    const member =  await memberRepo.findOneBy({ id: memberId })
    payment.member_ = member;
    payments.member_ = member;
    payment.member_ = payments.member_;
    await paymentsRepo.save(payment);
    return payment;
  }

  @Get('api/members')
  async membersData() {
    const memberRepo = this.dataSource.getRepository(Members);
    const members = await memberRepo.find();
    return {members: members};
  }

  @Post('api/members')
  @HttpCode(201)
  async addNewMember(@Body() members: Members) {
    const memberRepo = this.dataSource.getRepository(Members);
    const member = new Members();
    members.id = undefined;
    member.name = members.name;
    member.created_at = formatDate(now);
    member.birth_date = members.birth_date;
    await memberRepo.save(member);
    return  member;
  }

  @Post('api/members/:id/pay')
  @HttpCode(201)
  async memberPayment(@Body() payments: Payments, @Param('id') memberId: number){
    const paymentsRepo = this.dataSource.getRepository(Payments);
    const payment = new Payments();
    payments.id = undefined;
    payment.amount = 5000;
    payment.paid_at = formatDate(now);
    const memeberRepo = this.dataSource.getRepository(Members);
    const member = await memeberRepo.findOneBy({id: memberId});
    payment.member_ = member;
    payments.member_ = member;
    payment.member_ = payments.member_;
    await paymentsRepo.save(payment);
    return payment;
  }

  /* @Get('api/members/:id')
  async membersData(@Param('id') memberId: number) {
    const memberRepo = this.dataSource.getRepository(Members);
    const member = memberRepo.findBy({id: memberId});
    return member;
  } */
}
