import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    lastName: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @MinLength(6) // Se recomienda una contraseña de al menos 6 caracteres
    password: string;
  
    @IsEnum(Role)
    role?: Role; 
}
