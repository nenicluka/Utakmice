import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from 'typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IgracModule } from './igrac/igrac.module';
import { ModeratorModule } from './moderator/moderator.module';
import { OrganizatorModule } from './organizator/organizator.module';
import { TimModule } from './tim/tim.module';
import { TurnirModule } from './turnir/turnir.module';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), IgracModule, ModeratorModule, OrganizatorModule, TimModule, TurnirModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
