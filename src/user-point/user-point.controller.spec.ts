import { Test, TestingModule } from '@nestjs/testing';
import { UserPointController } from './user-point.controller';

describe('UserPointController', () => {
  let controller: UserPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPointController],
    }).compile();

    controller = module.get<UserPointController>(UserPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
