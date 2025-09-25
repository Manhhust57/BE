import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto, ContactResponseDto } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    // Tạo liên hệ mới (public)
    @Post()
    async create(@Body() createContactDto: CreateContactDto): Promise<{
        success: boolean;
        message: string;
        data: ContactResponseDto;
    }> {
        const contact = await this.contactService.createContact(createContactDto);

        return {
            success: true,
            message: 'Liên hệ của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất có thể.',
            data: contact,
        };
    }

    // Lấy tất cả liên hệ với phân trang (admin)

}