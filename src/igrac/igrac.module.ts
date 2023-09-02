import { Module } from '@nestjs/common';
import { IgracController } from './igrac.controller';
import { IgracService } from './igrac.service';

@Module({
  controllers: [IgracController],
  providers: [IgracService]
})
export class IgracModule {}
