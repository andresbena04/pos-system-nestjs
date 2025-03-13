import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Crea un nuevo producto en la base de datos.
  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.product.create({
        data: createProductDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  // Obtiene la lista de todos los productos almacenados.
  async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener la lista de productos');
    }
  }

  // Busca un producto por su ID. Si no existe, lanza una excepción de "Not Found".
  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Producto con id: #${id} no encontrado`);
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener el producto con id: #${id}`);
    }
  }

  // Actualiza los datos de un producto existente por su ID.
  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el producto con id: #${id}`);
    }
  }

  // Elimina un producto de la base de datos por su ID.
  async remove(id: number) {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el producto');
    }
  }
}
