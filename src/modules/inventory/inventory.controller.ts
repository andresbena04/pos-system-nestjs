import {
  Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Post()
  // Crea un nuevo registro en el inventario.
  // Se validan los datos de entrada para asegurar que solo contengan los campos permitidos.
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    try {
      return await this.inventoryService.create(createInventoryDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  // Obtiene la lista completa de productos en el inventario.
  async findAll() {
    try {
      return await this.inventoryService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  // Obtiene un producto específico del inventario por su ID.
  // Se usa ParseIntPipe para convertir el parámetro a un número entero.
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.inventoryService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  // Actualiza un producto en el inventario según su ID.
  // Se valida que los datos enviados coincidan con el DTO de actualización.
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventoryDto: UpdateInventoryDto
  ) {
    try {
      return await this.inventoryService.update(id, updateInventoryDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  // Elimina un producto del inventario por su ID.
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.inventoryService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
