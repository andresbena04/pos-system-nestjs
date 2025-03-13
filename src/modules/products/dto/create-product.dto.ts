import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsString()
    description?: string;
  
    @IsNotEmpty()
    @IsNumber()
    price: number;
  
    @IsInt()
    @Min(0)
    stock: number;
}
