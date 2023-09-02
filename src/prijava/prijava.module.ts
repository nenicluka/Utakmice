import { Module } from '@nestjs/common';
import { PrijavaController } from './prijava.controller';
import { PrijavaService } from './prijava.service';

@Module({
  controllers: [PrijavaController],
  providers: [PrijavaService]
})
export class PrijavaModule {}
