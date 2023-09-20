import { Module } from '@nestjs/common';
import { TimController } from './tim.controller';
import { TimService } from './tim.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Igrac } from 'src/entities/igrac.entity';
import { Tim } from 'src/entities/tim.entity';
import { Turnir } from 'src/entities/turnir.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tim,Igrac,Turnir])],
  controllers: [TimController],
  providers: [TimService],
  exports: [TimService]

})
export class TimModule {}
