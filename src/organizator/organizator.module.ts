import { Module } from '@nestjs/common';
import { OrganizatorController } from './organizator.controller';
import { OrganizatorService } from './organizator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizator } from 'src/entities/organizator.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organizator, User])],
  controllers: [OrganizatorController],
  providers: [OrganizatorService]
})
export class OrganizatorModule {}
