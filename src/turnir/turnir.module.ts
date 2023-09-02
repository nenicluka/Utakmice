import { Module } from '@nestjs/common';
import { TurnirController } from './turnir.controller';
import { TurnirService } from './turnir.service';

@Module({
  controllers: [TurnirController],
  providers: [TurnirService]
})
export class TurnirModule {}
