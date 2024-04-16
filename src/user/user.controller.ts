import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put
} from '@nestjs/common';
import { UserService } from './user.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {CurrentUser} from "../auth/decorators/user.decorator";
import {UserDto} from "./user.dto";
//import {AuthDto} from "../auth/dto/auth.dto";

@Controller('user/profile')
//@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()

  async profile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id)
  }

  //validate income data
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()

  async updateProfile(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto)
  }

}
