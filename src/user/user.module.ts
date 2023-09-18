import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Moderator } from 'src/entities/moderator.entity';
import { Igrac } from 'src/entities/igrac.entity';
import { Organizator } from 'src/entities/organizator.entity';

@Module({
  imports:[PassportModule],
  controllers: [UserController],
  providers: [UserService,LocalStrategy],
})
export class UserModule {}
