import { Controller, Get, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { IndexService } from '../service/impl/index.service';

@Controller()
export class IndexController {
  private readonly logger = new Logger(IndexController.name);

  constructor(
    private readonly appService: IndexService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}
}
