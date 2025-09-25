import { IsString, IsOptional, IsBoolean, IsInt, IsHexColor, Length, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBlogCategoryDto {
    @IsString()
    @Length(1, 100)
    name: string;

    @IsString()
    @Length(1, 150)
    slug: string;

    @IsOptional()
    @IsString()
    @Length(0, 500)
    description?: string;

    @IsOptional()
    @IsHexColor()
    color?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    isActive?: boolean = true;

    @IsOptional()
    @IsInt()
    @Min(0)
    sortOrder?: number = 0;
}