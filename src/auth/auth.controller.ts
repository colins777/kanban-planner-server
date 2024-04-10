import { Controller, HttpCode, ValidationPipe, UsePipes, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  //for frontend, by default it can be not 200 status, so we set dirrectly 200
  @HttpCode(200)
  //for login link - auth/login
  @Post('login')
  async login(@Body() dto: AuthDto) {

    return this.authService.login(dto)

    //return 'test!!!'
  }
}

