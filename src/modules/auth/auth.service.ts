import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-users.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async logIn(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (!user) {
        throw new UnauthorizedException('Credenciales incorrectas.');
      }

      const isPasswordValid = await bcrypt.compare(createUserDto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciales incorrectas.');
      }

      const dataUser = {
        id: user.id,
        email: user.email,
        role: user.role
      }

      return {
        dataUser,
        token: this.generateToken(user.id, user.email, user.role),
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al iniciar sesión.');
    }
  }

  async register(createUserDto: CreateUserDto) {
    try {
      //  Verificar si el usuario ya existe
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('El usuario ya existe.');
      }

      //  Generar una contraseña aleatoria
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);


      //  Crear el usuario en la base de datos
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });

      //  Enviar correo con credenciales
      await this.sendCredentialsEmail(user.email, randomPassword);

      return { message: 'Usuario registrado exitosamente. Credenciales enviadas por correo.' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  //  Generar un token JWT
  private generateToken(userId: number, email: string, role: string): string {
    return this.jwtService.sign(
      { userId, email },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1h',
      },
    );
  }

  // 🔹 Enviar correo con credenciales
  private async sendCredentialsEmail(email: string, password: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: email,
      subject: 'Tu cuenta ha sido creada',
      text: `Tu cuenta ha sido creada exitosamente.\n\nEmail: ${email}\nContraseña: ${password}\n\nPor favor, cambia tu contraseña después de iniciar sesión.`,
    };

    await transporter.sendMail(mailOptions);
  }
}
