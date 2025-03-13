import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  // Crea un nuevo elemento en el inventario con los datos proporcionados.
  async create(createInventoryDto: CreateInventoryDto) {
    try {
      return await this.prisma.inventory.create({
        data: createInventoryDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al agregar al inventario');
    }
  }

  // Obtiene todos los elementos almacenados en el inventario.
  async findAll() {
    try {
      return await this.prisma.inventory.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener el inventario');
    }
  }

  // Busca un elemento en el inventario por su ID.
  // Si el elemento no existe, lanza una excepción de "Not Found".
  async findOne(id: number) {
    try {
      const inventoryItem = await this.prisma.inventory.findUnique({
        where: { id },
      });

      if (!inventoryItem) {
        throw new NotFoundException(`Elemento de inventario con id: #${id} no encontrado`);
      }
      return inventoryItem;
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener el elemento con id: #${id}`);
    }
  }

  // Actualiza un elemento del inventario por su ID con los datos proporcionados.
  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    try {
      return await this.prisma.inventory.update({
        where: { id },
        data: updateInventoryDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el inventario con id: #${id}`);
    }
  }

  // Elimina un elemento del inventario por su ID.
  async remove(id: number) {
    try {
      return await this.prisma.inventory.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el elemento del inventario');
    }
  }
}
