import { Test, TestingModule } from '@nestjs/testing';
import { CategoryBlogController } from './category-blog.controller';

describe('CategoryBlogController', () => {
  let controller: CategoryBlogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryBlogController],
    }).compile();

    controller = module.get<CategoryBlogController>(CategoryBlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
