import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Obtiene la lista de todos los usuarios almacenados en la base de datos.
  async findAll() {
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          lastName:true,
          email: true,
          role: true,
          createdAt: true
        }
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener la lista de usuarios.');
    }
  }

  // Busca un usuario por su ID. Si no existe, lanza una excepción de "Not Found".
  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          lastName:true,
          email: true,
          role: true,
          createdAt: true
        }
      });

      if (!user) {
        throw new NotFoundException(`Usuario con ID: #${id} no encontrado.`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener el usuario con ID: #${id}.`);
    }
  }

  // Actualiza los datos de un usuario existente por su ID.
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el usuario con ID: #${id}.`);
    }
  }

  // Elimina un usuario de la base de datos por su ID.
  async remove(id: number) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el usuario.');
    }
  }
}
