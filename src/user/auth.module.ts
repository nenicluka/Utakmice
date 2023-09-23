import { Module } from '@nestjs/common';
import { AuthControler } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Moderator } from 'src/entities/moderator.entity';
import { Igrac } from 'src/entities/igrac.entity';
import { Organizator } from 'src/entities/organizator.entity';
import { Repository } from 'typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategy';
import { jwtConstants } from './strategy/constants';

@Module({
  imports: [
      PassportModule, JwtModule.register({
          secret: jwtConstants.ACCESS_TOKEN_KEY,
          signOptions: { expiresIn: '1d' },
      })],
  controllers: [AuthControler],
  providers: [AuthService, AtStrategy, RtStrategy, Repository]
})
export class AuthModule { }
