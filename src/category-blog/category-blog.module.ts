import { Module } from '@nestjs/common';
import { CategoryBlogService } from './category-blog.service';
import { CategoryBlogController } from './category-blog.controller';

@Module({
  providers: [CategoryBlogService],
  controllers: [CategoryBlogController]
})
export class CategoryBlogModule {}
