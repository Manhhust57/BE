import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, ParseUUIDPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { SearchBlogDto, SearchBlogResponseDto } from './dto/searchBlog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  
  
  @Get("")
  public async getAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    return this.blogService.findAll(pageNum, limitNum);
  }

  @Post("create")
  public async create(@Body() dto: CreateBlogDto) {
    return this.blogService.create(dto)
  }
  @Get("id/:id")
  public async getById(@Param("id", ParseIntPipe) id: number){
    return this.blogService.findById(id);
  }
  @Delete("/id/delete/:id")
  public async delete(@Param("id", ParseIntPipe) id: number) {
    return  this.blogService.delete(id);
    
  }

  

  @Get('search')
  async search(
    @Query('keyword') keyword: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('authorId') authorId?: string
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    const authorIdNum = authorId ? parseInt(authorId) : undefined;

    return await this.blogService.search(keyword, pageNum, limitNum, {
      status,
      authorId: authorIdNum
    });
  }

  @Get('suggest')
  async getSuggestions(@Query('q') query: string) {
    return await this.blogService.getSuggestions(query);
  }
  @Get('status/:status')
  async getByStatus(
    @Param('status') status: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;

    return await this.blogService.findByStatus(status, pageNum, limitNum);
  }

  
}
