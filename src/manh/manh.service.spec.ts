import { Test, TestingModule } from '@nestjs/testing';
import { ManhService } from './manh.service';

describe('ManhService', () => {
  let service: ManhService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManhService],
    }).compile();

    service = module.get<ManhService>(ManhService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
