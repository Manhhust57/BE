import { PartialType } from '@nestjs/swagger';
import { CreateManhDto } from './create-manh.dto';

export class UpdateManhDto extends PartialType(CreateManhDto) {}
