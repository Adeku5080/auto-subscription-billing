import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subRepository: SubsscriptionRepository) {}
  async create() {}
}
