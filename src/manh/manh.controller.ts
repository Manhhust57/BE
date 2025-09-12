import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManhService } from './manh.service';
import { CreateManhDto } from './dto/create-manh.dto';
import { UpdateManhDto } from './dto/update-manh.dto';

@Controller('manh')
export class ManhController {
  constructor(private readonly manhService: ManhService) {}

  @Post()
  create(@Body() createManhDto: CreateManhDto) {
    return this.manhService.create(createManhDto);
  }

  @Get()
  findAll() {
    return this.manhService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manhService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManhDto: UpdateManhDto) {
    return this.manhService.update(+id, updateManhDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manhService.remove(+id);
  }
}
