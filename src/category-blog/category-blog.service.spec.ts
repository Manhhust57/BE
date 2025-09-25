import { Test, TestingModule } from '@nestjs/testing';
import { CategoryBlogService } from './category-blog.service';

describe('CategoryBlogService', () => {
  let service: CategoryBlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryBlogService],
    }).compile();

    service = module.get<CategoryBlogService>(CategoryBlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
