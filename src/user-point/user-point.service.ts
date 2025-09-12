import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserPointService {
    getUserPoints(userId: number): import("./dto/user-point.dto").UserPointDto {
        throw new Error('Method not implemented.');
    }
    constructor(private readonly prismaService: PrismaService) {}
    public async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },select: {
        name:true,
        email: true,
        role: true,
        dateOfBirth: true,
        address:true,
        gender: true,
        phoneNumber: true,
        avatar: true,
      }
    });
    return user;
  }
}
