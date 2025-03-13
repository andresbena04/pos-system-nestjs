import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  // Crea un nuevo producto en la base de datos.
  // Se validan los datos de entrada para asegurar que solo contengan los campos permitidos.
  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productsService.create(createProductDto)
    } catch (error) {
      throw error
    }
  }

  @Get()
  // Obtiene todos los productos almacenados en la base de datos.
  async findAll() {
    try {
      return await this.productsService.findAll()
    } catch (error) {
      throw error
    }
  }

  @Get(':id')
  // Obtiene un producto específico por su ID.
  // Se usa `ParseIntPipe` para convertir el parámetro a un número.
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.productsService.findOne(id)
    } catch (error) {
      throw error
    }
  }

  @Patch(':id')
  // Actualiza un producto existente con los datos proporcionados en el DTO.
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto) {
    try {
      return await this.productsService.update(id, updateProductDto)
    } catch (error) {
      throw error
    }
  }

  @Delete(':id')
  // Elimina un producto de la base de datos por su ID.
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.productsService.remove(id)
    } catch (error) {
      throw error
    }
  }
}
