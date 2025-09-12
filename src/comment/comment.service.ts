import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentDto, CreateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) { }

    async addComment(createCommentDto: CreateCommentDto): Promise<CommentDto> {
        return await this.prisma.comment.create({
            data: createCommentDto,
        });
    }

    async getComments(targetType: string, targetId: number): Promise<CommentDto[]> {
        return await this.prisma.comment.findMany({
            where: {
                targetType,
                targetId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async getCommentById(id:number): Promise<CommentDto[]> {
        return await this.prisma.comment.findMany({
            where: {
                id
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        
    }
    async getAllComments(): Promise<CommentDto[]> {  // Bỏ id parameter
        return await this.prisma.comment.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getCommentsByUserId(userId: number): Promise<CommentDto[]> {
        return await this.prisma.comment.findMany({
            where: {
                userId  // Dùng id để filter theo user
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async deleteComment(id: number): Promise<boolean> {
        try {
            await this.prisma.comment.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}
