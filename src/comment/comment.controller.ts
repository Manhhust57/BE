import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Body, 
  Param, 
  NotFoundException,
  ParseIntPipe 
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto, CreateCommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('all')
  async getAllComments(): Promise<CommentDto[]> {
    return await this.commentService.getAllComments();
  }

  @Post('/createcomment')
  public async addComment(@Body() createCommentDto: CreateCommentDto): Promise<CommentDto> {
      return await this.commentService.addComment(createCommentDto);
  }

  @Get('user/:id')  // Route rõ ràng hơn
  async getCommentsByUserId(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<CommentDto[]> {
    return await this.commentService.getCommentsByUserId(userId);
  }

  

  @Get(':targetType/:targetId')
  async getComments(
    @Param('targetType') targetType: string,
    @Param('targetId', ParseIntPipe) targetId: number,
  ): Promise<CommentDto[]> {
    return await this.commentService.getComments(targetType, targetId);
  }

  @Delete(':id')
  async deleteComment(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.commentService.deleteComment(id);
    if  (!deleted) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
  }

  @Get(':id')
  async getCommentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CommentDto[]> {
    const comment = await this.commentService.getCommentById(id);

    if (!comment || comment.length === 0) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    return comment;
  }

  
}