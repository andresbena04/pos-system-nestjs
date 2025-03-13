import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { AuthRequest } from '../interfaces/request.interface'; // Importar la interfaz personalizada

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Token no proporcionado.');
      }

      const token = authHeader.split(' ')[1];
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

      req.user = decoded; // Ahora TypeScript reconoce req.user
      next();
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado.');
    }
  }
}
