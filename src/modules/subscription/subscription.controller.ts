import { Controller, Post, Body } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('/sub')
export class SubscriptionController {
  constructor(private readonly subService: SubscriptionService) {}

  @Post('create')
  async signUp() {
    await this.subService.create();
  }
}
