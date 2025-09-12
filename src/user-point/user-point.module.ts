import { Module } from '@nestjs/common';
import { UserPointController } from './user-point.controller';
import { UserPointService } from './user-point.service';

@Module({
  controllers: [UserPointController],
  providers: [UserPointService]
})
export class UserPointModule {}
