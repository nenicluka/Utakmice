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
import { AuthModule } from './user/auth.module';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard, RolesGuard } from './custom/guards';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), IgracModule, ModeratorModule, OrganizatorModule, TimModule, TurnirModule,AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
