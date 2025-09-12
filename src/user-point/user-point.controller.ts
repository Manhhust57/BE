import { Controller, Get, Param } from '@nestjs/common';
import { UserPointService } from './user-point.service';
import { get } from 'axios';
import { User } from '@prisma/client';
@Controller('user-point')
export class UserPointController {
    constructor(private readonly userPointService: UserPointService) {}

    @Get(':userId')
    getUserPoints(@Param('userId') userId: number) {
        return this.userPointService.getUserPoints(userId);
        
    }
    // @Post('transactions')
    // addTransaction(@Body() dto: PointTransactionDTO): PointTransactionDTO {
    //     return this.userPointService.addPointTransaction(dto);
    // }

    // @Get('transactions/:userId')
    // getTransactions(@Param('userId') userId: number): PointTransactionDTO[] {
    //     return this.userPointService.getPointTransactions(userId);
    //}

}
