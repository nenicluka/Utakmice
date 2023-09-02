import { Module } from '@nestjs/common';
import { TimController } from './tim.controller';
import { TimService } from './tim.service';

@Module({
  controllers: [TimController],
  providers: [TimService]
})
export class TimModule {}
