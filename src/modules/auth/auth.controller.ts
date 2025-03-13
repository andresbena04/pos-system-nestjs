import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.logIn(createUserDto);
    } catch (error) {
      throw error;
    }
  }
}
