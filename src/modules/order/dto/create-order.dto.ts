import { IsArray, IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateOrderDto {
    @IsInt()
    @IsPositive()
    userId: number;

    @IsArray()
    @IsNotEmpty()
    items: {
        productId: number;
        quantity: number;
    }[];
}
