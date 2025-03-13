import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // Obtiene todos los usuarios almacenados en la base de datos.
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  // Obtiene un usuario específico por su ID.
  // Se usa `ParseIntPipe` para convertir el parámetro a un número.
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  // Actualiza un usuario existente con los datos proporcionados en el DTO.
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  // Elimina un usuario de la base de datos por su ID.
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
