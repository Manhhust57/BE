import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BlogStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
export class SearchBlogDto {
  
  @Transform(({ value }) => value?.trim())
  keyword: string;

  
  
  page?: number = 1;

  
  limit?: number = 10;

  
  status?: BlogStatus;

  
  authorId?: number;

  
}

export class SearchBlogResponseDto {

}




export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;
}
