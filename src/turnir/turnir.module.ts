import { Module } from '@nestjs/common';
import { TurnirController } from './turnir.controller';
import { TurnirService } from './turnir.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Igrac } from 'src/entities/igrac.entity';
import { Turnir } from 'src/entities/turnir.entity';
import { Organizator } from 'src/entities/organizator.entity';
import { Tim } from 'src/entities/tim.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Tim,Igrac,Turnir,Organizator])],
  controllers: [TurnirController],
  providers: [TurnirService],
  exports: [TurnirService]

})
export class TurnirModule {}
