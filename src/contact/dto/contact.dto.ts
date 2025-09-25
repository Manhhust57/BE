import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto {
    @IsNotEmpty({ message: 'Họ không được để trống' })
    @IsString({ message: 'Họ phải là chuỗi ký tự' })
    lastName: string;

    @IsNotEmpty({ message: 'Tên không được để trống' })
    @IsString({ message: 'Tên phải là chuỗi ký tự' })
    firstName: string;

    @IsNotEmpty({ message: 'Email không được để trống' })
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email: string;

    @IsNotEmpty({ message: 'Tin nhắn không được để trống' })
    @IsString({ message: 'Tin nhắn phải là chuỗi ký tự' })
    message: string;
}

export class ContactResponseDto {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;

    // Computed field - Họ và tên đầy đủ
    
}