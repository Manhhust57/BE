import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryBlogService {
    constructor(private prisma: PrismaService) { }

    // Lấy tất cả categories
    async findAll() {
        return this.prisma.blogCategory.findMany({
            orderBy: { sortOrder: 'asc' },
            include: {
                posts: {
                    select: { id: true },
                    where: { status: 'PUBLISHED' }
                }
            }
        }).then(categories =>
            categories.map(category => ({
                ...category,
                postsCount: category.posts.length,
                posts: undefined
            }))
        );
    }

    // Lấy categories đang active
    async findActive() {
        return this.prisma.blogCategory.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            include: {
                posts: {
                    select: { id: true },
                    where: { status: 'PUBLISHED' }
                }
            }
        }).then(categories =>
            categories.map(category => ({
                ...category,
                postsCount: category.posts.length,
                posts: undefined
            }))
        );
    }

    // Lấy category theo slug
    async findBySlug(slug: string) {
        return this.prisma.blogCategory.findUnique({
            where: { slug },
            include: {
                posts: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        summary: true,
                        thumbnail: true,
                        createdAt: true
                    },
                    where: { status: 'PUBLISHED' },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
    }
}