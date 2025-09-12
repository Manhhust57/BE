import { Injectable } from '@nestjs/common';
import { CreateManhDto } from './dto/create-manh.dto';
import { UpdateManhDto } from './dto/update-manh.dto';

@Injectable()
export class ManhService {
  create(createManhDto: CreateManhDto) {
    return 'This action adds a new manh';
  }

  findAll() {
    return `This action returns all manh`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manh`;
  }

  update(id: number, updateManhDto: UpdateManhDto) {
    return `This action updates a #${id} manh`;
  }

  remove(id: number) {
    return `This action removes a #${id} manh`;
  }
}
