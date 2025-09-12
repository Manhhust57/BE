import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BlogStatus } from '@prisma/client';
import { CreateBlogDto } from './dto/create-blog.dto';
import { SearchBlogResponseDto } from './dto/searchBlog.dto';


@Injectable()
export class BlogService {
  
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateBlogDto) {
    return this.prismaService.blogPost.create({
      data,
    });
  }

  async findAll(pageNum: number, limitNum: number) {
    return this.prismaService.blogPost.findMany({
        where: {}
    });
  }

  async findById(id: number) {
    return this.prismaService.blogPost.findUnique({
      where: { id },
    });
  }

  async delete(id: number) {
    try {
      const deleted = await this.prismaService.blogPost.delete({
        where: { id },
      });
      return {
        success: true,
        message: `Blog with id ${id} deleted successfully`,
        data: deleted, // nếu cần trả luôn dữ liệu blog vừa xóa
      };
    } catch (error) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
  }

  async search(keyword: string, page: number = 1, limit: number = 10, filters: any = {}) {
    if (!keyword || keyword.trim().length < 2) {
      return {
        data: [],
        total: 0,
        page,
        limit,
        message: 'Từ khóa tìm kiếm phải có ít nhất 2 ký tự'
      };
    }

    const skip = (page - 1) * limit;
    const { status, authorId } = filters;

    const where: any = {
      OR: [
        { title: { contains: keyword.trim(), mode: 'insensitive' } },
        { content: { contains: keyword.trim(), mode: 'insensitive' } },
        { summary: { contains: keyword.trim(), mode: 'insensitive' } }
      ]
    };

    if (status) where.status = status;
    if (authorId) where.authorId = authorId;

    try {
      const [blogs, total] = await Promise.all([
        this.prismaService.blogPost.findMany({
          where,
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit
        }),
        this.prismaService.blogPost.count({ where })
      ]);

      return {
        data: blogs,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        keyword: keyword.trim()
      };
    } catch (error) {
      throw new BadRequestException('Lỗi tìm kiếm: ' + error.message);
    }
  }

  // Gợi ý tìm kiếm
  async getSuggestions(query: string, limit: number = 10) {
    if (!query || query.trim().length < 1) {
      return { suggestions: [] };
    }

    try {
      const blogs = await this.prismaService.blogPost.findMany({
        where: {
          title: {
            contains: query.trim(),
            mode: 'insensitive'
          },
          status: BlogStatus.PUBLISHED
        },
        select: { title: true },
        take: limit,
        orderBy: { createdAt: 'desc' }
      });
      return {
        query: query.trim(),
        
      };
    } catch (error) {
      return { suggestions: [] };
    }
  }

  //tìm kiếm blog theo status
  async findByStatus(status: string, page: number = 1, limit: number = 10) {
    // Validate status
    const validStatuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];
    const statusUpper = status.toUpperCase();

    if (!validStatuses.includes(statusUpper)) {
      throw new BadRequestException(`Status không hợp lệ. Chỉ chấp nhận: ${validStatuses.join(', ')}`);
    }

    const skip = (page - 1) * limit;

    try {
      const [blogs, total] = await Promise.all([
        this.prismaService.blogPost.findMany({
          where: {
            status: statusUpper as any
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit
        }),
        this.prismaService.blogPost.count({
          where: {
            status: statusUpper as any
          }
        })
      ]);

      return {
        data: blogs,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        status: statusUpper
      };
    } catch (error) {
      throw new BadRequestException('Lỗi lấy blog theo status: ' + error.message);
    }
  }
//   async findBySlug(slug: string) {
//     return this.prismaService.blogPost.findUnique({
//       where: { slug },
//     });
//   }

//   async findByStatus(status: BlogStatus) {
//     return this.prisma.blogPost.findMany({
//       where: { status },
//     });
//   }

//   async findByUser(userId: number) {
//     return this.prisma.blogPost.findMany({
//       where: { createdBy },
//     });
//   }

//   async deleteById(id: number) {
//     return this.prisma.blogPost.delete({
//       where: { id },
//     });
//   }

//   async update(id: number, data: UpdateBlogPostDto) {
//     return this.prisma.blogPost.update({
//       where: { id },
//       data,
//     });
//   }
}