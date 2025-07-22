import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { CreateUser } from './user.interface';
import { Subscription } from './subscription.entity';
import { CreateSub } from './subscription.interface';

@Injectable()
export class SubsscriptionRepository extends Repository<Subscription> {
  constructor(datasource: DataSource) {
    super(Subscription, datasource.createEntityManager());
  }
}
