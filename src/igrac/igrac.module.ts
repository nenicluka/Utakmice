import { Module } from '@nestjs/common';
import { IgracController } from './igrac.controller';
import { IgracService } from './igrac.service';
import { TimModule } from 'src/tim/tim.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Igrac } from 'src/entities/igrac.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Igrac, User])],
  controllers: [IgracController],
  providers: [IgracService]
})
export class IgracModule {}
