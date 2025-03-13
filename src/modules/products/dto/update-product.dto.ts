import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsDecimal, IsInt, IsOptional, IsString, Min } from 'class-validator';


export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsDecimal()
    price?: number;
  
    @IsOptional()
    @IsInt()
    @Min(0)
    stock?: number;
}
