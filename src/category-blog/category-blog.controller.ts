import { Controller, Get, Param } from '@nestjs/common';
import { CategoryBlogService } from './category-blog.service';

@Controller('CategoryBlog')
export class CategoryBlogController {
    constructor(private readonly blogCategoryService: CategoryBlogService) { }

    // GET /blog-categories - Lấy tất cả
    @Get()
    findAll() {
        return this.blogCategoryService.findAll();
    }

    // GET /blog-categories/active - Chỉ lấy active
    @Get('active')
    findActive() {
        return this.blogCategoryService.findActive();
    }

    // GET /blog-categories/slug/:slug - Lấy theo slug
    @Get('slug/:slug')
    findBySlug(@Param('slug') slug: string) {
        return this.blogCategoryService.findBySlug(slug);
    }
}