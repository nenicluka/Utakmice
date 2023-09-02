import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from 'typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IgracModule } from './igrac/igrac.module';
import { ModeratorModule } from './moderator/moderator.module';
import { OrganizatorModule } from './organizator/organizator.module';
import { PrijavaModule } from './prijava/prijava.module';
import { TimModule } from './tim/tim.module';
import { TurnirModule } from './turnir/turnir.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), IgracModule, ModeratorModule, OrganizatorModule, PrijavaModule, TimModule, TurnirModule], //UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
