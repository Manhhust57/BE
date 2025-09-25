import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApartmentDto } from './dto/create-apartment-dto';

@Injectable()
export class ApartmentService {
    constructor(private readonly prismaService: PrismaService){}
    
   

}
