import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, LoginDto } from './auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signUp(@Body() dto: SignUpDto) {
    await this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    await this.authService.login(loginDto);
  }
}
