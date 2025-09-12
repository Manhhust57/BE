import { Module } from '@nestjs/common';
import { ManhService } from './manh.service';
import { ManhController } from './manh.controller';

@Module({
  controllers: [ManhController],
  providers: [ManhService],
})
export class ManhModule {}
