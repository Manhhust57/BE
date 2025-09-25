
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto, ContactResponseDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
    constructor(private prisma: PrismaService) { }

    // Tạo liên hệ mới
    async createContact(createContactDto: CreateContactDto): Promise<ContactResponseDto> {
        try {
            const newContact = await this.prisma.contact.create({
                data: createContactDto,
            });
            return newContact;
        } catch (error) {
            throw new BadRequestException('Failed to create contact');
        }   
    }
}
