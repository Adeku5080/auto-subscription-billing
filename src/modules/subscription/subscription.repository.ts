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

  //   async findUserByEmailOrusername(identifier: string): Promise<User | null> {
  //     return this.findOne({
  //       where: [{ email: identifier }],
  //     });
  //   }

  //   async findUserById(userId: string): Promise<User | null> {
  //     return this.findOne({ where: { id: userId } });
  //   }

  async createSub(subData: CreateSub): Promise<Subscription> {}
}
