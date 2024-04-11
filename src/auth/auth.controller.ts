import {
  Controller,
  HttpCode,
  ValidationPipe,
  UsePipes,
  Post,
  Body,
  UnauthorizedException, Res, Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {Response, Request} from "express";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  //for frontend, by default it can be not 200 status, so we set dirrectly 200
  @HttpCode(200)
  //for login link - auth/login
  @Post('login')
  //important param - {passthrough: true}, without it not work, this means we are use manual settings for refresh token
  async login(@Body() dto: AuthDto, @Res({passthrough: true}) res: Response) {

   const {refreshToken, ...response} = await this.authService.login(dto)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto, @Res({passthrough: true}) res: Response) {

    const {refreshToken, ...response} = await this.authService.register(dto)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response;
  }

  //1 User logined, cookies saved in browser (sent in Headers)
  //2 this cokies will send with every request to server
  @HttpCode(200)
  @Post('login/access-token')
  //create new token
  async getNewTokens(
      @Req() req: Request,
      @Res({passthrough: true}) res: Response
  ) {

    const refreshTokenFromCookies = req.cookies[this.authService.REFRESH_TOKEN_NAME]

    //check if exist refresh token in cookies
    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res)
      throw new UnauthorizedException('Refresh token not passed')
    }

    const {refreshToken, ...response} =
        await this.authService.getNewTokens(refreshTokenFromCookies)


    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response;
  }

  //refresh token
  @HttpCode(200)
  @Post('logout')
  async logout(@Res({passthrough: true}) res: Response) {

    this.authService.removeRefreshTokenFromResponse(res);

    return true;
  }

}

