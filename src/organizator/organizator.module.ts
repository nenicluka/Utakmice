import { Module } from '@nestjs/common';
import { OrganizatorController } from './organizator.controller';
import { OrganizatorService } from './organizator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizator } from 'src/entities/organizator.entity';
import { User } from 'src/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/user/auth.module';

@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([Organizator, User]),JwtModule],
  controllers: [OrganizatorController],
  providers: [OrganizatorService]
})
export class OrganizatorModule {}
