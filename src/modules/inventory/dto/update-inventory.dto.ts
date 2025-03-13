import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './create-inventory.dto';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
    @IsOptional()
    @IsInt()
    productId?: number;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    quantity?: number;
}
