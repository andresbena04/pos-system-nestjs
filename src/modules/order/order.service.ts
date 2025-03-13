import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { error } from 'console';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      const { userId, items } = createOrderDto;

      // Verificar si el usuario existe
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('Usuario no encontrado.');

      // Verificar si los productos existen
      const productIds = items.map((item) => item.productId);
      const products = await this.prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      if (products.length !== items.length) {
        throw new BadRequestException('Uno o más productos no existen.');
      }

      // Calcular el total de la orden
      const totalPrice = items.reduce((total, item) => {
        const product = products.find((p) => p.id === item.productId);
        return total + (product ? Number(product.price) * item.quantity : 0);
      }, 0);

      // Crear la orden
      const order = await this.prisma.order.create({
        data: {
          userId,
          totalPrice,
          orderItems: {
            create: items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              const price = product ? product.price : 0;
              return {
                productId: item.productId,
                quantity: item.quantity,
                subTotal: Number(price) * item.quantity, 
              };
            }),
          },
        },
      });

      return order;
    } catch (error) {
      console.error('Error al crear la orden:', error);
      throw new InternalServerErrorException('No se pudo crear la orden.');
    }
  }

  async getOrders() {
    try {
      return await this.prisma.order.findMany({
        include: { 
          orderItems: true,
          user: {select: {
            id: true,
            name: true,
            lastName: true,
            email: true,
            role: true
          }}
         }
      });
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
      throw new InternalServerErrorException('No se pudieron obtener las órdenes.');
    }
  }
  async getOrderOne(id:number){
    try {
      const order = this.prisma.order.findUnique({
        where: { id },
        include: { 
          orderItems: true,
          user: {select: {
            id: true,
            name: true,
            lastName: true,
            email: true,
            role: true
          }}
         }
      });

      if(!order){
        throw new NotFoundException(`Orden con id: #${1} no encontada`);
      }

      return order
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener el elemento con id: #${id}`);
    }
  }
}
