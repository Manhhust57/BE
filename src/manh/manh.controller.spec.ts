import { Test, TestingModule } from '@nestjs/testing';
import { ManhController } from './manh.controller';
import { ManhService } from './manh.service';

describe('ManhController', () => {
  let controller: ManhController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManhController],
      providers: [ManhService],
    }).compile();

    controller = module.get<ManhController>(ManhController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
