import { IsEmail, IsOptional, IsString, IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
export class CommentDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsNotEmpty()
    @IsString()
    content: string;

    
    targetType: string | null;
    
    targetId: number | null;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export class CreateCommentDto {
    
    @IsNotEmpty()
    @IsString()
    content: string
    
    @IsNotEmpty()
    @IsString()
    targetType?: string

    @IsNumber()
    @IsOptional()
    targetId?: number

    @IsNumber()
    @IsOptional()
    userId: number
}