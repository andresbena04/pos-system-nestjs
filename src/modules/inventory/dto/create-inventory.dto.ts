import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateInventoryDto {
    @IsNotEmpty()
    @IsInt()
    productId: number;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    quantity: number;
}
