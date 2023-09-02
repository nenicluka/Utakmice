import { Module } from '@nestjs/common';
import { OrganizatorController } from './organizator.controller';
import { OrganizatorService } from './organizator.service';

@Module({
  controllers: [OrganizatorController],
  providers: [OrganizatorService]
})
export class OrganizatorModule {}
